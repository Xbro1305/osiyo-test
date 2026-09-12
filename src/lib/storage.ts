// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { X } from "lucide-react";
import React from "react";
import { Route } from "react-router-dom";
import type { Design } from "../types/app";

// ============================================================
// ============== STORAGE LAYER (DUAL MODE) ===================
// ============================================================
// The artifact runs in two environments:
//   1. claude.ai  — uses window.storage (a key-value store provided by the host)
//   2. deployed app — uses an HTTP backend with JWT auth
//
// We detect mode at startup and route every storage call to the right place.
// All keys follow conventions: "user:abc", "rec_input:xyz", "config:lists",
// "app:numbering", "store_sale:foo", etc.
//
// In API mode, a request like storage.getAll('user:') maps to GET /api/users.
// The mapping table is in API_ROUTES below.

// Detect API mode: if window.storage isn't available, we must use HTTP.
// In a Vite build, you can also force API mode by setting window.__API_MODE = true
// before the bundle loads (e.g. in a <script> tag in index.html).
export const IS_API_MODE = (() => {
  if (typeof window === "undefined") return false;
  // Explicit override (set in index.html before the bundle runs)
  if ((window as any).__API_MODE === true) return true;
  // Fallback: window.storage is the artifact host. If absent, assume API mode.
  return !(
    (window as any).storage && typeof (window as any).storage.get === "function"
  );
})();

// Where the API lives. In production this is typically "/api" (same-origin via
// reverse proxy) or the explicit absolute URL of your backend.
export const API_BASE_URL: string = (() => {
  if (typeof window === "undefined") return "/api";
  // Allow override via window.__API_URL set before the bundle loads.
  const fromWindow = (window as any).__API_URL as string | undefined;
  if (fromWindow) return fromWindow.replace(/\/$/, "");
  // Vite-style env (only present when bundled by Vite; ignored in claude.ai)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromEnv = (typeof (import.meta as any) !== "undefined" &&
    (import.meta as any).env?.VITE_API_URL) as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "/api";
})();

// Token storage helpers — survive page reloads via localStorage.
export const TOKEN_KEY = "app:token";
export function getToken(): string | null {
  try {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem(TOKEN_KEY)
      : null;
  } catch {
    return null;
  }
}
export function setToken(token: string | null) {
  try {
    if (typeof localStorage === "undefined") return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

// Hook for the React tree to listen for "logout" events (e.g. token expired).
// When we get a 401 from any request we dispatch this so the App can drop the
// user back to the login screen.
export const AUTH_EVENT = "app:auth-required";
export function notifyAuthRequired() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  }
}

// ============== Key → API endpoint mapping ==============
// Each storage key prefix maps to a REST collection on the backend.
// Special-case keys (singletons) are listed separately.
//
// Examples:
//   "user:abc"       → /users (id=abc)
//   "rec_input:xyz"  → /records/input (id=xyz)
//   "config:lists"   → /lists (singleton — POST replaces whole object)
//   "app:numbering"  → /config/numbering (singleton via /config/:key)
//   "trash:42"       → /trash (id=42)
//
// "app:prefs" is intentionally LOCAL ONLY — language and theme are stored in
// localStorage even in API mode. We don't want to hit the network for every
// theme toggle.
export const PREFIX_TO_PATH: Record<string, string> = {
  "user:": "/users",
  "design:": "/designs",
  "machine:": "/machines",
  "program:": "/programs",
  "customer:": "/customers",
  "store_sale:": "/store/sales",
  "store_pay:": "/store/payments",
  "store_in:": "/store/stockin",
  "qc_defcode:": "/qc/defcode",
  "qc_deflog:": "/qc/deflog",
  "qc_fishbone:": "/qc/fishbone",
  "qc_5why:": "/qc/fivewhy",
  "qc_pfmea:": "/qc/pfmea",
  "qc_8d:": "/qc/eightd",
  "trash:": "/trash",
};
export function recPath(stationKey: string): string {
  return `/records/${stationKey}`;
}

// HTTP helper. Adds Authorization header, parses JSON, raises 401 → notifyAuthRequired.
//
// New: third arg `query` lets callers attach ?limit=&offset=&... without
// hand-stringifying URLs. Values that are null/undefined are dropped.
// New: `init.body` may be a FormData instance; in that case we DO NOT set the
// Content-Type header — the browser sets it with the correct boundary.
export async function apiFetch(
  path: string,
  init: RequestInit = {},
  query?: Record<string, string | number | null | undefined>,
): Promise<any> {
  const isFormData =
    typeof FormData !== "undefined" && init.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...((init.headers as Record<string, string>) || {}),
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Build query string if provided.
  let fullPath = path;
  if (query) {
    const qs = Object.entries(query)
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .map(
        ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
      )
      .join("&");
    if (qs) fullPath += (path.includes("?") ? "&" : "?") + qs;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${fullPath}`, { ...init, headers });
  } catch (err) {
    // Network error — let the caller decide; don't kick out the user.
    throw err;
  }
  if (res.status === 401) {
    setToken(null);
    notifyAuthRequired();
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      /* not JSON */
    }
    throw new Error((body && body.error) || `HTTP ${res.status}`);
  }
  // Some routes return 204; guard against empty body.
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Normalize either a legacy plain-array response or the new paginated shape
// { items, total, limit, offset } down to a plain array. Callers that need
// the total can use apiFetchPage() below instead.
export function unwrapList(resp: any): any[] {
  if (Array.isArray(resp)) return resp;
  if (resp && Array.isArray(resp.items)) return resp.items;
  return [];
}

// Parse a key like "user:abc" → { prefix: 'user:', id: 'abc' }
export function splitKey(key: string): { prefix: string; id: string } {
  const idx = key.indexOf(":");
  return idx < 0
    ? { prefix: key, id: "" }
    : { prefix: key.slice(0, idx + 1), id: key.slice(idx + 1) };
}

// resolveDesignImage(design) — produces a src string usable in an <img> tag.
// Prefers the new server-side `imageUrl`; falls back to legacy inline
// `imageData` for records that haven't been migrated yet. Relative paths
// returned by the backend (e.g. "/uploads/designs/x.png") are prefixed with
// the host so they resolve correctly when the SPA is mounted under /api.
export function resolveDesignImage(d: any): string {
  if (!d) return "";
  if (d.imageUrl) {
    if (/^(https?:|data:|blob:)/.test(d.imageUrl)) return d.imageUrl;
    const host = API_BASE_URL.replace(/\/api\/?$/, "");
    return `${host}${d.imageUrl}`;
  }
  return d.imageData || "";
}

// ============== The dual-mode storage object ==============
export const storage = {
  // Used elsewhere to know whether to enable polling and other API-mode features.
  isApiMode: IS_API_MODE as boolean,

  async get(key: string): Promise<any> {
    if (!IS_API_MODE) {
      try {
        const r = await (window as any).storage.get(key, true);
        return r ? JSON.parse(r.value) : null;
      } catch {
        return null;
      }
    }
    // API mode dispatch
    if (key === "config:lists") return apiFetch("/lists").catch(() => null);
    if (key.startsWith("app:")) {
      // app:numbering, app:prefs, etc. Route through /config/:key.
      // Special: app:prefs stays in localStorage (lang/theme); skip network.
      if (key === "app:prefs") {
        try {
          const v = localStorage.getItem("app:prefs");
          return v ? JSON.parse(v) : null;
        } catch {
          return null;
        }
      }
      const ck = key.slice("app:".length);
      return apiFetch(`/config/${encodeURIComponent(ck)}`).catch(() => null);
    }
    // Per-id GET — not commonly used by the artifact, but supported.
    const { prefix, id } = splitKey(key);
    if (prefix.startsWith("rec_")) {
      // No per-id GET endpoint by design — pull the whole list and filter.
      const station = prefix.slice("rec_".length, -1);
      const all = unwrapList(await apiFetch(recPath(station)).catch(() => []));
      return all.find((r: any) => r.id === id) || null;
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return null;
    const all = unwrapList(await apiFetch(path).catch(() => []));
    return all.find((r: any) => r.id === id) || null;
  },

  async set(key: string, val: any): Promise<boolean> {
    if (!IS_API_MODE) {
      try {
        await (window as any).storage.set(key, JSON.stringify(val), true);
        return true;
      } catch {
        return false;
      }
    }
    if (key === "config:lists") {
      await apiFetch("/lists", { method: "POST", body: JSON.stringify(val) });
      return true;
    }
    if (key.startsWith("app:")) {
      if (key === "app:prefs") {
        try {
          localStorage.setItem("app:prefs", JSON.stringify(val));
          return true;
        } catch {
          return false;
        }
      }
      const ck = key.slice("app:".length);
      await apiFetch(`/config/${encodeURIComponent(ck)}`, {
        method: "POST",
        body: JSON.stringify(val),
      });
      return true;
    }
    const { prefix } = splitKey(key);
    if (prefix.startsWith("rec_")) {
      const station = prefix.slice("rec_".length, -1);
      await apiFetch(recPath(station), {
        method: "POST",
        body: JSON.stringify(val),
      });
      return true;
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return false;
    await apiFetch(path, { method: "POST", body: JSON.stringify(val) });
    return true;
  },

  async list(prefix: string): Promise<string[]> {
    if (!IS_API_MODE) {
      try {
        const r = await (window as any).storage.list(prefix, true);
        return r?.keys || [];
      } catch {
        return [];
      }
    }
    // In API mode, "list" doesn't really apply — getAll() does the equivalent in one call.
    // We still support it: return the synthetic keys so legacy callers work.
    const items = await this.getAll(prefix);
    return items.map((it: any) => `${prefix}${it.id}`);
  },

  // getAll(prefix) — fetches the whole collection mapped from `prefix`.
  //
  // New: optional `opts` { limit, offset, ... } forwards as query params.
  // The backend is free to return either a plain array (legacy) or
  // { items, total, limit, offset } (new). Either way the caller gets an array.
  // To read the total, use storage.fetchPage() below.
  async getAll(
    prefix: string,
    opts?: {
      limit?: number;
      offset?: number;
      [k: string]: string | number | undefined;
    },
  ): Promise<any[]> {
    if (!IS_API_MODE) {
      const keys: string[] = await this.list(prefix);
      const items = await Promise.all(keys.map((k: string) => this.get(k)));
      return items.filter(Boolean);
    }
    if (prefix.startsWith("rec_")) {
      const station = prefix.slice("rec_".length, -1);
      try {
        return unwrapList(await apiFetch(recPath(station), {}, opts));
      } catch (err) {
        // Return null (not []) so callers can distinguish "genuinely
        // empty" from "fetch failed". Callers that use this for state
        // updates (loadStationRecords) should preserve prior state on
        // null. Callers that need an array shape can `?? []` the result.
        console.warn(
          `[storage.getAll] rec_${station} fetch failed:`,
          (err as any)?.message || err,
        );
        return null as unknown as any[];
      }
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return [];
    try {
      return unwrapList(await apiFetch(path, {}, opts));
    } catch {
      return [];
    }
  },

  // fetchPage(prefix, opts) — like getAll but returns the full page envelope
  // { items, total, limit, offset } so callers can show "showing X of Y" UIs.
  // If the backend returns a plain array, we fabricate the envelope so the
  // caller still has a uniform shape to work with.
  async fetchPage(
    prefix: string,
    opts?: {
      limit?: number;
      offset?: number;
      [k: string]: string | number | undefined;
    },
  ): Promise<{ items: any[]; total: number; limit: number; offset: number }> {
    if (!IS_API_MODE) {
      const items = await this.getAll(prefix);
      return {
        items,
        total: items.length,
        limit: opts?.limit ?? items.length,
        offset: opts?.offset ?? 0,
      };
    }
    let path: string | null = null;
    if (prefix.startsWith("rec_")) {
      path = recPath(prefix.slice("rec_".length, -1));
    } else {
      path = PREFIX_TO_PATH[prefix] || null;
    }
    if (!path) {
      return { items: [], total: 0, limit: 0, offset: 0 };
    }
    try {
      const resp = await apiFetch(path, {}, opts);
      if (Array.isArray(resp)) {
        return {
          items: resp,
          total: resp.length,
          limit: opts?.limit ?? resp.length,
          offset: opts?.offset ?? 0,
        };
      }
      return {
        items: resp?.items || [],
        total: resp?.total ?? (resp?.items?.length || 0),
        limit: resp?.limit ?? opts?.limit ?? 0,
        offset: resp?.offset ?? opts?.offset ?? 0,
      };
    } catch {
      return {
        items: [],
        total: 0,
        limit: opts?.limit ?? 0,
        offset: opts?.offset ?? 0,
      };
    }
  },

  // ----- Home stats summary -----
  // One round-trip to /stats returns { counts: { input: 12, printing: 4, ... },
  // customers, sales, stockIn, ... } so the home page doesn't have to fetch
  // every records table just to display counters on the dept tiles.
  // In artifact mode we synthesize the same shape from local storage.
  async fetchStats(): Promise<{
    counts: Record<string, number>;
    sums?: Record<string, Record<string, number>>;
    customers?: number;
    sales?: number;
    payments?: number;
    stockIn?: number;
    designs?: number;
    machines?: number;
    programs?: number;
    storeTotals?: {
      stockInQty?: number;
      salesQty?: number;
      salesValue?: number;
      paidAmount?: number;
      paymentsTotal?: number;
    };
  }> {
    if (!IS_API_MODE) {
      // Cheap local approximation — we don't have a real backend in artifact mode.
      return { counts: {} };
    }
    try {
      return (await apiFetch("/stats")) || { counts: {} };
    } catch {
      return { counts: {} };
    }
  },

  async delete(key: string): Promise<boolean> {
    if (!IS_API_MODE) {
      try {
        await (window as any).storage.delete(key, true);
        return true;
      } catch {
        return false;
      }
    }
    const { prefix, id } = splitKey(key);
    if (prefix.startsWith("rec_")) {
      const station = prefix.slice("rec_".length, -1);
      // We deliberately let apiFetch errors propagate so callers know the
      // delete didn't take effect. Previously this was silently swallowed,
      // making backend delete failures look like "the record came back from
      // polling 15 seconds later". Now the caller can show a real error.
      await apiFetch(`${recPath(station)}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      return true;
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return false;
    await apiFetch(`${path}/${encodeURIComponent(id)}`, { method: "DELETE" });
    return true;
  },

  // ============== Auth helpers (API mode only) ==============
  // In artifact mode these are unused — login compares plaintext locally.
  async loginApi(
    login: string,
    passcode: string,
  ): Promise<{ token: string; user: any } | null> {
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ login, passcode }),
      });
      if (data?.token) setToken(data.token);
      return data;
    } catch {
      return null;
    }
  },
  // Change YOUR OWN passcode. This deliberately does NOT go through
  // POST /users — that route upserts the document, and if the backend uses
  // findOneAndUpdate the model's pre-save bcrypt hook never runs, which
  // would write the passcode in PLAINTEXT and lock the account out (login
  // compares with bcrypt). The dedicated route does assign + save().
  // Note: the backend must answer a wrong current passcode with 400, not
  // 401 — apiFetch treats 401 as "session dead" and signs the user out.
  async changePasscodeApi(
    currentPasscode: string,
    newPasscode: string,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      await apiFetch("/auth/change-passcode", {
        method: "POST",
        body: JSON.stringify({ currentPasscode, newPasscode }),
      });
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || "Request failed" };
    }
  },
  async fetchMe(): Promise<any | null> {
    if (!getToken()) return null;
    try {
      const data = await apiFetch("/auth/me");
      return data?.user || null;
    } catch {
      return null;
    }
  },
  logoutApi() {
    setToken(null);
  },

  // ----- Design image upload (multipart) -----
  // Sends the file to POST /designs/upload. Backend writes it to disk and
  // returns { imageUrl: "/uploads/designs/<filename>" } which is stored in
  // the design record's `imageUrl` field — never the bytes themselves.
  // Falls back to data URL in artifact mode (no server to save to).
  async uploadDesign(file: File): Promise<{ imageUrl: string } | null> {
    if (!IS_API_MODE) {
      // Artifact mode: read as data URL and pretend it's a path.
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ imageUrl: reader.result as string });
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    }
    try {
      const fd = new FormData();
      fd.append("file", file);
      return await apiFetch("/designs/upload", {
        method: "POST",
        body: fd,
      });
    } catch (e) {
      console.error("Design upload failed:", e);
      return null;
    }
  },

  // ===== Fetch related-table records in compact mode =====
  // Returns just the fields a station page needs for cross-referencing
  // (e.g. printing page needs batching's batchNo, id, and date). Backend
  // is expected to honour ?fields=a,b,c and only project those columns.
  // If the backend ignores it, this gracefully degrades to full rows.
  async fetchCompact(prefix: string, fields: string[]): Promise<any[]> {
    if (!IS_API_MODE) {
      return this.getAll(prefix);
    }
    let path: string | null = null;
    if (prefix.startsWith("rec_")) {
      path = recPath(prefix.slice("rec_".length, -1));
    } else {
      path = PREFIX_TO_PATH[prefix] || null;
    }
    if (!path) return [];
    try {
      return unwrapList(await apiFetch(path, {}, { fields: fields.join(",") }));
    } catch {
      return [];
    }
  },
};
