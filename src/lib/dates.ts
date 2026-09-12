// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

export const monthCode = (d = new Date()) =>
  [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ][d.getMonth()];
export const todayISO = () => new Date().toISOString().slice(0, 10);

// ============================================================================
//  Default date-range helper for printing station filters
// ----------------------------------------------------------------------------
//  Printing station lists default to "the last 90 days" rather than "all
//  time". With months of records accumulated, all-time queries return
//  thousands of rows the operator doesn't care about. The 90-day window
//  is just a default value on the date filter inputs — operators can
//  clear the dates to see everything, or change them freely.
//
//  Returns { dateFrom, dateTo } as YYYY-MM-DD strings.
// ============================================================================
export function defaultDateRange(windowDays = 90) {
  const today = new Date();
  const from = new Date();
  from.setDate(from.getDate() - windowDays);
  const fmt = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  };
  return { dateFrom: fmt(from), dateTo: fmt(today) };
}
export const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
