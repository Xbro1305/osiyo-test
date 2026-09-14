// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadPageSize, savePageSize } from "../lib/prefs";
import { getToken, storage } from "../lib/storage";
import type { Customer } from "../types/app";

// ===== Signed-in user, for pages outside AppInner =====
// /orders and /loading are standalone routes declared before AppInner's
// catch-all, so they never see the `ctx.user` the rest of the app passes
// around. They still need the role to decide who may edit or delete an order,
// so they ask the API who this token belongs to.
//
// The role is re-checked on the server for every write — this is only about
// which buttons are worth showing. `null` while the request is in flight, and
// `null` again if it fails, so a page renders its read-only shape rather than
// flashing buttons the server would refuse.
export function useMe() {
  const [me, setMe] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!getToken()) return;
    storage
      .fetchMe()
      .then((u) => {
        if (!cancelled) setMe(u);
      })
      .catch(() => {
        /* read-only shape is the safe fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return me;
}

// ===== Debounced value hook =====
// Returns the input value after `delay` ms of stillness. Used for free-text
// search inputs so we don't fire a request on every keystroke.
export function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// ===== useUrlState hook =====
// Backs a state object with the URL's query string so F5 (and shareable
// links) preserve filters/pagination across reloads.
//
// Usage:
//   const [state, setState] = useUrlState({
//     search: "", shift: "", dateFrom: "", offset: 0, limit: 50,
//   });
//
// What it does:
//   - Initial value comes from window.location.search merged on top of the
//     defaults. Strings stay strings; numeric defaults get parseFloat applied.
//   - setState({...partial}) merges, serialises back to ?key=value pairs,
//     and updates the URL via React Router's navigate (default: replaceState
//     so debounced typing doesn't pollute history).
//   - Empty/undefined/null values are STRIPPED from the URL so the bar stays
//     readable (`?search=foo` not `?search=foo&shift=&fabricType=`).
//
// Why I scope this per-component (not via Context):
//   Each station page has its own filter shape. Sharing a global store would
//   leak Customer's filters into Printing's URL. Per-component state +
//   per-component URL keys keeps each page's URL clean.
export function useUrlState<T extends Record<string, any>>(
  defaults: T,
): [T, (patch: Partial<T>, opts?: { push?: boolean }) => void] {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse current URL → typed state. Re-runs whenever the search string
  // changes (e.g. back button) so the hook always reflects the URL.
  const state = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const out: Record<string, any> = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const v = params.get(key);
      if (v === null) continue;
      // Coerce based on default type — numbers stay numbers, everything else strings.
      if (typeof defaults[key] === "number") {
        const n = Number(v);
        out[key] = Number.isFinite(n) ? n : defaults[key];
      } else {
        out[key] = v;
      }
    }
    return out as T;
    // location.search is the only thing that should trigger a re-read.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // setState — merges, serialises, navigates.
  // Default behaviour is replaceState (no history entry) — appropriate for
  // typing and filter changes. Pass { push: true } to add a history entry
  // (e.g. for explicit Prev/Next pagination so back button is useful).
  const setState = (patch: Partial<T>, opts?: { push?: boolean }) => {
    const next: Record<string, any> = { ...state, ...patch };
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (v === undefined || v === null || v === "" || v === 0) {
        // 0 is intentionally stripped — it's the default for offset/limit
        // in practice, and we'd rather have a clean URL than a literal `&offset=0`.
        // Callers that need 0 in the URL should serialise to a string themselves.
        continue;
      }
      params.set(k, String(v));
    }
    const qs = params.toString();
    const url = qs ? `${location.pathname}?${qs}` : location.pathname;
    navigate(url, { replace: !opts?.push });
  };

  return [state, setState];
}

// ===== useAuthReadyEffect =====
// Like useEffect but waits until the user session is restored (token present
// AND a user object is set in the auth context). This avoids the "Ctrl+R race"
// where a component fetches immediately on mount, before fetchMe() returns,
// causing every request to silently 401 and the page to render empty.
//
// Use this in place of `useEffect(fn, [])` for any component that fetches
// authenticated data on mount.
export function useAuthReadyEffect(fn: () => void | (() => void), deps: any[] = []) {
  const token = typeof window !== "undefined" ? getToken() : null;
  // We don't have a direct hook to the user state from this scope. The proxy
  // is: token is set after login, and fetchMe runs synchronously enough that
  // by the time the token is in localStorage, any subsequent API call has
  // valid auth. So: gate on `token` being present, plus any custom deps.
  useEffect(() => {
    if (!token && storage.isApiMode) return;
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ...deps]);
}

// ===== useStationData hook =====
// One hook per station page. Owns:
//   - The paginated slice of the main table for this page
//   - Compact reads of related tables (for in-memory lookups)
//   - An optional compact read of the FULL main table (for number
//     generation and aggregate stats that must see every row)
//   - Page/limit state (limit persisted per page key)
//   - A `refresh()` function callers can call after save/delete
//
// Args:
//   stationKey   – the underlying records key, e.g. "input", "printing"
//   related      – array of { prefix, fields, as } describing related tables
//                  to load compact, exposed under the returned `related` map
//   compactMain  – optional array of field names. If given, hook also loads
//                  every row of the main table with just those fields, made
//                  available as `allCompact`. Use this for next-number
//                  generation and total-usage aggregates that must see every
//                  row regardless of which page is currently visible.
//   pageKey      – string used to persist page-size choice (e.g. "page:input")
//   defaultLimit – starting page size if nothing persisted (default 50)
//
// Returns:
//   { items, total, offset, limit, setOffset, setLimit, related,
//     allCompact, loading, refresh }
export function useStationData(opts: {
  stationKey: string;
  related?: { prefix: string; fields: string[]; as: string }[];
  compactMain?: string[];
  // Free-form filters forwarded as query params to the backend. The hook
  // re-fetches when these change. Use `useDebouncedValue` upstream for text
  // inputs you don't want firing on every keystroke.
  filters?: Record<string, string | number | undefined | null>;
  // Controlled-mode pagination: pass externalOffset/externalLimit + onChange
  // when the caller wants pagination state to live in the URL (via
  // useUrlState). When omitted, the hook owns offset/limit internally.
  externalOffset?: number;
  externalLimit?: number;
  onPageChange?: (next: { offset: number; limit: number }) => void;
  pageKey: string;
  defaultLimit?: number;
}) {
  const {
    stationKey,
    related = [],
    compactMain,
    filters,
    externalOffset,
    externalLimit,
    onPageChange,
    pageKey,
    defaultLimit = 50,
  } = opts;
  // Controlled vs uncontrolled pagination. If the caller passes
  // externalOffset/externalLimit we use them directly; otherwise the hook
  // keeps its own state (legacy behaviour for any unmigrated caller).
  const controlled =
    externalOffset !== undefined && externalLimit !== undefined;
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [internalOffset, setInternalOffset] = useState(0);
  const [internalLimit, setInternalLimit] = useState(() =>
    loadPageSize(pageKey, defaultLimit),
  );
  const offset = controlled ? (externalOffset as number) : internalOffset;
  const limit = controlled ? (externalLimit as number) : internalLimit;
  const [relatedData, setRelatedData] = useState<Record<string, any[]>>({});
  const [allCompact, setAllCompact] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Tick increments to force a manual refresh.
  const [tick, setTick] = useState(0);

  // Persist limit changes. In controlled mode we also notify the caller so
  // they can write the new value into the URL.
  const setLimit = (n: number) => {
    savePageSize(pageKey, n);
    if (controlled) {
      onPageChange?.({ offset, limit: n });
    } else {
      setInternalLimit(n);
    }
  };
  const setOffset = (n: number) => {
    const safe = Math.max(0, n);
    if (controlled) {
      onPageChange?.({ offset: safe, limit });
    } else {
      setInternalOffset(safe);
    }
  };

  // Stringify filters for the effect dependency array. Comparing the object
  // identity would re-fire on every render (since callers usually build a
  // fresh object each render); a stable JSON string only changes when the
  // contents actually change.
  const filtersKey = JSON.stringify(filters || {});

  // Re-fetch on dep changes. Related tables and compactMain don't depend on
  // page; they're loaded once per mount and on manual refresh.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      // Forward filters as query params alongside pagination. fetchPage
      // accepts arbitrary string/number values and serialises them via
      // apiFetch's third-arg query support.
      const mainPromise = storage.fetchPage(`rec_${stationKey}:`, {
        limit,
        offset,
        ...((filters || {}) as Record<string, string | number | undefined>),
      });
      const relatedPromise = Promise.all(
        related.map((r) =>
          storage
            .fetchCompact(r.prefix, r.fields)
            .then((data) => [r.as, data] as const),
        ),
      );
      const compactPromise = compactMain
        ? storage.fetchCompact(`rec_${stationKey}:`, compactMain)
        : Promise.resolve([] as any[]);
      try {
        const [page, rel, comp] = await Promise.all([
          mainPromise,
          relatedPromise,
          compactPromise,
        ]);
        if (cancelled) return;
        setItems(page.items);
        setTotal(page.total);
        const relMap: Record<string, any[]> = {};
        for (const [k, v] of rel) relMap[k] = v;
        setRelatedData(relMap);
        if (compactMain) setAllCompact(comp);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationKey, limit, offset, tick, filtersKey]);

  const refresh = () => setTick((t) => t + 1);
  return {
    items,
    total,
    offset,
    limit,
    setOffset,
    setLimit,
    related: relatedData,
    allCompact,
    loading,
    refresh,
  };
}
