// ---------------------------------------------------------------------------
// Client for the roll-QR / loading endpoints.
//
// Rides on the same apiFetch as everything else, so it inherits the JWT header
// and the 401 → back-to-login behaviour for free.
//
// NOTE ON scanRoll: the backend answers 200 for every scan it evaluated,
// including rejections, with the verdict in `result`. That is deliberate — a
// roll from the wrong order is a business outcome the scanner has to render,
// not a transport error. So this function RESOLVES on a rejection; check
// `.ok` / `.result`, don't rely on a throw.
// ---------------------------------------------------------------------------

import { API_BASE_URL, apiFetch, getToken } from "./storage";

export type ScanResult =
  | "accepted"
  | "duplicate"
  | "wrong_order"
  | "unknown_code"
  | "already_shipped"
  | "void"
  | "unreadable"
  | "session_closed";

export interface Progress {
  scanned: number;
  total: number;
  remaining: number;
}

export interface ScannedRoll {
  serial: number;
  code: string;
  roll_index: number;
}

export interface ScanResponse {
  ok: boolean;
  result: ScanResult;
  message: string;
  roll?: ScannedRoll;
  belongsToOrderNo?: string;
  progress: Progress;
}

// One design's worth of an order: which design, how long each roll is, and
// how many of them. An order is a list of these.
export interface QrOrderLine {
  id?: number;
  line_index?: number;
  design_id: string | null;
  design_number: string | null;
  roll_length: number | string | null;   // NUMERIC arrives as a string
  rolls: number;
  fabric_type?: string | null;
  notes?: string | null;
}

// What the form sends. Distinct from QrOrderLine because the server derives
// line_index and returns NUMERIC as text.
export interface QrOrderLineInput {
  designId: string | null;
  designNumber: string | null;
  rollLength: number | string | null;
  rolls: number;
  // Typed by hand rather than picked: the gallery knows the print, not what it
  // is printed on, and the same design runs on several fabrics.
  fabricType?: string | null;
}

export interface QrOrder {
  id: number;
  order_no: string;
  customer_name: string | null;
  design_number: string | null;
  fabric_type: string | null;
  notes?: string | null;
  planned_rolls: number;
  status: string;
  lines?: QrOrderLine[];
  codes_issued?: number;
  rolls_loaded?: number;
}

// ---------------------------------------------------------------------------
//  One trip's story: every session opened against the order, every roll with
//  whether it was scanned, and every rejection. A trip IS an order — one truck
//  loads one order — so this hangs off the order id, not a session id.
// ---------------------------------------------------------------------------
export interface TripRoll {
  id: number;
  serial: number;
  code: string;
  roll_index: number;
  status: "issued" | "loaded" | "void";
  design_number: string | null;
  roll_length: number | string | null;
  fabric_type: string | null;
  scanned_at: string | null;
  scanned_by: string | null;
  session_id: number | null;
  // Status of the session the last scan belongs to. An aborted session keeps
  // its scans, so a scan alone does not mean the roll is on a truck.
  session_status: "open" | "closed" | "aborted" | null;
  // Shipped, or counted by a session that is open right now. The server
  // decides this so the screen and the export cannot drift apart.
  on_truck: boolean;
}

export interface TripSession {
  id: number;
  status: "open" | "closed" | "aborted";
  vehicle: string | null;
  driver: string | null;
  opened_at: string;
  opened_by: string | null;
  closed_at: string | null;
  closed_by: string | null;
  scanned: number;
}

export interface TripRejection {
  raw_code: string;
  reason: string;
  detail: string | null;
  rejected_at: string;
  rejected_by: string | null;
  session_id: number | null;
}

export interface TripStatus {
  order: QrOrder;
  sessions: TripSession[];
  rolls: TripRoll[];
  rejections: TripRejection[];
  progress: {
    total: number;
    loaded: number;    // shipped: a session closed with the roll counted
    on_truck: number;  // shipped, or scanned by a session that is open now
    remaining: number; // total - on_truck
  };
}

// A gallery entry, as the designs endpoint returns it.
export interface Design {
  id: string;
  designNumber: string;
  name?: string | null;
  imageUrl?: string | null;
  imageData?: string | null;
}

export interface LoadingSession {
  id: number;
  order_id: number;
  status: "open" | "closed" | "aborted";
  vehicle: string | null;
  driver: string | null;
  order_no?: string;
  planned_rolls?: number;
  customer_name?: string | null;
  design_number?: string | null;
}

export const qrApi = {
  listOrders: (): Promise<{ items: QrOrder[] }> => apiFetch("/qr/orders"),

  getOrder: (id: number): Promise<{ order: QrOrder; codes: any[] }> =>
    apiFetch(`/qr/orders/${id}`),

  issueCodes: (id: number): Promise<{ count: number; alreadyIssued: boolean }> =>
    apiFetch(`/qr/orders/${id}/codes`, { method: "POST" }),

  createOrder: (body: {
    order_no: string;
    customer_name?: string | null;
    fabric_type?: string | null;
    notes?: string | null;
    lines: QrOrderLineInput[];
  }): Promise<QrOrder> =>
    apiFetch("/qr/orders", { method: "POST", body: JSON.stringify(body) }),

  // Edit. The server decides what is still editable: before labels exist that
  // is everything, afterwards only the customer and the notes. Sending a
  // frozen field unchanged is fine — it only rejects an actual change.
  updateOrder: (
    id: number,
    body: {
      order_no?: string;
      customer_name?: string | null;
      fabric_type?: string | null;
      notes?: string | null;
      lines?: QrOrderLineInput[];
    },
  ): Promise<QrOrder> =>
    apiFetch(`/qr/orders/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  // Super-admin only, and refused outright while a truck is being loaded
  // against the order. Takes the codes and the loading history with it.
  deleteOrder: (
    id: number,
  ): Promise<{ deleted: boolean; order_no: string; codes: number; scans: number }> =>
    apiFetch(`/qr/orders/${id}`, { method: "DELETE" }),

  // Everything that happened to one trip — for the preview on the loading
  // screen and for the Excel export built from it.
  orderLoading: (id: number): Promise<TripStatus> =>
    apiFetch(`/qr/orders/${id}/loading`),

  // The gallery, for the design picker. Unpaginated — the list is a few
  // hundred entries and the picker filters client-side, which keeps typing
  // instant instead of round-tripping per keystroke.
  listDesigns: (): Promise<Design[]> => apiFetch("/designs"),

  // Designs store `imageUrl` as a server path ("/uploads/designs/x.png"), so
  // it has to be resolved against the API origin rather than the page origin —
  // in production the two are different hosts.
  imageSrc: (d: Design): string | null => {
    if (d.imageUrl) return `${API_BASE_URL.replace(/\/api\/?$/, "")}${d.imageUrl}`;
    return d.imageData || null;
  },

  openSession: (
    order_id: number,
    vehicle?: string,
    driver?: string,
  ): Promise<{ session: LoadingSession; order: QrOrder; joined: boolean; progress: Progress }> =>
    apiFetch("/qr/loading/sessions", {
      method: "POST",
      body: JSON.stringify({ order_id, vehicle, driver }),
    }),

  getSession: (
    id: number,
  ): Promise<{
    session: LoadingSession;
    progress: Progress;
    scans: (ScannedRoll & { scanned_at: string; scanned_by: string | null; roll_code_id: number })[];
    missing: (ScannedRoll & { id: number })[];
    rejections: { raw_code: string; reason: string; detail: string | null; rejected_at: string }[];
  }> => apiFetch(`/qr/loading/sessions/${id}`),

  scanRoll: (sessionId: number, code: string): Promise<ScanResponse> =>
    apiFetch(`/qr/loading/sessions/${sessionId}/scan`, {
      method: "POST",
      body: JSON.stringify({ code }),
    }),

  undoScan: (sessionId: number, rollCodeId: number): Promise<{ removed: boolean; progress: Progress }> =>
    apiFetch(`/qr/loading/sessions/${sessionId}/scans/${rollCodeId}`, { method: "DELETE" }),

  closeSession: (
    sessionId: number,
    force = false,
    reason = "",
  ): Promise<{ closed: boolean; complete: boolean; progress: Progress }> =>
    apiFetch(`/qr/loading/sessions/${sessionId}/close`, {
      method: "POST",
      body: JSON.stringify(force ? { force, reason } : {}),
    }),

  abortSession: (sessionId: number): Promise<{ aborted: boolean }> =>
    apiFetch(`/qr/loading/sessions/${sessionId}/abort`, { method: "POST" }),

  // The label sheet: one sticker per page, in roll order. Fetched as a blob
  // rather than navigated to — see authedBlob below for why.
  labelsPdfBlob: (orderId: number): Promise<Blob> =>
    authedBlob(`/qr/orders/${orderId}/labels.pdf`),

  // The same labels split into one PDF per design / fabric / length, zipped.
  // The print room runs one unit at a time; the single sheet makes them hunt
  // for the page range where each design starts.
  labelsZipBlob: (orderId: number): Promise<Blob> =>
    authedBlob(`/qr/orders/${orderId}/labels.zip`),
};

// Fetch a binary response with the auth header.
//
// This CANNOT be a plain window.open() of the endpoint: the routes are behind
// `authenticate`, and a browser navigation sends no Authorization header, so
// the tab would just show a 401. apiFetch is not usable either — it parses
// every response as JSON and would choke on the PDF or ZIP bytes.
async function authedBlob(path: string): Promise<Blob> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    // The error path DOES return JSON, so surface the server's message.
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* not JSON — keep the status */
    }
    throw new Error(message);
  }
  return res.blob();
}

// Hand the browser a blob it can render, download or print. The URL is
// released on a timer rather than immediately: revoking it before the tab or
// the download has taken it produces an empty file.
export function openBlob(blob: Blob, filename: string, download: boolean) {
  const url = URL.createObjectURL(blob);
  if (download) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  } else {
    window.open(url, "_blank", "noopener");
  }
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export default qrApi;
