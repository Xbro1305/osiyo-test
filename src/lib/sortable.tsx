// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

// ===== Sortable table helpers =====
//
// useSortableRows / SortableTh / cycleSort give any table column-header
// click-to-sort with three states (none → asc → desc → none). The hook does
// the sorting client-side; the component renders the header with the right
// arrow indicator.
//
// Usage:
//   const [sort, setSort] = useState<{ key: string; dir: "asc"|"desc" } | null>(null);
//   const sorted = useSortableRows(rows, sort, {
//     // optional accessors for derived/numeric columns
//     available: (r) => r.available,
//   });
//   <SortableTh sortKey="available" label="Available" sort={sort} setSort={setSort} numeric />

export type SortDir = "asc" | "desc";
export type SortSpec = { key: string; dir: SortDir } | null;

// cycleSort — three-state click handler: none → asc → desc → none.
export function cycleSort(current: SortSpec, key: string): SortSpec {
  if (!current || current.key !== key) return { key, dir: "asc" };
  if (current.dir === "asc") return { key, dir: "desc" };
  return null;
}

// useSortableRows — returns a stably-sorted copy of `rows` according to `sort`.
// `accessors` lets the caller pull values from derived fields (e.g. when the
// column displays a computed value rather than a direct field).
export function useSortableRows<T>(
  rows: T[],
  sort: SortSpec,
  accessors: Record<string, (r: T) => any> = {},
): T[] {
  return useMemo(() => {
    if (!sort) return rows;
    const get = accessors[sort.key] ?? ((r: T) => (r as any)[sort.key]);
    // We sort a copy so the caller's array isn't mutated.
    const copy = [...rows];
    const dir = sort.dir === "asc" ? 1 : -1;
    copy.sort((a, b) => {
      const va = get(a);
      const vb = get(b);
      // null/undefined sink to the bottom regardless of direction.
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      // Numbers compare numerically; strings use locale-aware compare.
      if (typeof va === "number" && typeof vb === "number") {
        return (va - vb) * dir;
      }
      return String(va).localeCompare(String(vb)) * dir;
    });
    return copy;
  }, [rows, sort?.key, sort?.dir]);
}

// SortableTh — clickable <th> with arrow indicator.
export function SortableTh({
  sortKey,
  label,
  sort,
  setSort,
  numeric = false,
  className = "",
}: {
  sortKey: string;
  label: string;
  sort: SortSpec;
  setSort: (s: SortSpec) => void;
  numeric?: boolean;
  className?: string;
}) {
  const active = sort?.key === sortKey;
  const Arrow = !active
    ? ArrowUpDown
    : sort!.dir === "asc"
      ? ArrowUp
      : ArrowDown;
  return (
    <th
      onClick={() => setSort(cycleSort(sort, sortKey))}
      className={`text-left p-3 font-medium text-slate-600 cursor-pointer select-none hover:bg-slate-100 transition-colors ${className}`}
      title={
        active
          ? `Sorted ${sort!.dir === "asc" ? "ascending" : "descending"} — click to ${sort!.dir === "asc" ? "reverse" : "clear"}`
          : "Click to sort"
      }
    >
      <span className={`inline-flex items-center gap-1 ${numeric ? "" : ""}`}>
        {label}
        <Arrow
          size={12}
          className={active ? "text-slate-700" : "text-slate-400"}
        />
      </span>
    </th>
  );
}
