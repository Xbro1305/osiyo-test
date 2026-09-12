// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { storage } from "../lib/storage";

// ===== Page-size preference storage =====
// We persist the user's chosen rows-per-page per logical page key in
// localStorage so it sticks across reloads. Default is 50.
export function loadPageSize(pageKey: string, fallback = 50): number {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`pageSize:${pageKey}`);
    const n = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : fallback;
  } catch {
    return fallback;
  }
}
export function savePageSize(pageKey: string, size: number): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(`pageSize:${pageKey}`, String(size));
  } catch {
    /* ignore */
  }
}
