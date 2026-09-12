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
}

export interface QrOrder {
  id: number;
  order_no: string;
  customer_name: string | null;
  design_number: string | null;
  fabric_type: string | null;
  planned_rolls: number;
  status: string;
  lines?: QrOrderLine[];
  codes_issued?: number;
  rolls_loaded?: number;
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

  // ---------------------------------------------------------------------
  //  The label sheet.
  //
  //  This CANNOT be a plain window.open() of the endpoint: the route is behind
  //  `authenticate`, and a browser navigation sends no Authorization header,
  //  so the tab would just show a 401. Fetch it with the token, then hand the
  //  browser a blob: URL it can render and print.
  //
  //  apiFetch is not usable here either — it parses every response as JSON and
  //  would choke on the PDF bytes.
  // ---------------------------------------------------------------------
  labelsPdfBlob: async (orderId: number): Promise<Blob> => {
    const token = getToken();
    const res = await fetch(`${API_BASE_URL}/qr/orders/${orderId}/labels.pdf`, {
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
  },
};

export default qrApi;
