// ---------------------------------------------------------------------------
//  One trip, as a spreadsheet.
//
//  A trip is an order: one truck loads one order, which is the rule the whole
//  QR feature rests on. So "export this trip" means "export this order's rolls
//  and what happened to each of them".
//
//  WHAT IT IS FOR
//  ──────────────
//  The screen answers "can I close this load?". The spreadsheet answers the
//  questions that come afterwards and off-site: which rolls actually went,
//  which did not, who scanned them and when, and what was refused at the ramp.
//  That is the paperwork a dispute over a shipment is settled with, so it has
//  to carry the rejections too — a roll from another order turned away at the
//  door is exactly the event that used to be invisible.
//
//  THREE SHEETS
//    Rolls       — every code of the order, one row each, loaded or not.
//    Trips       — every loading session opened against it (vehicle, driver,
//                  who opened and closed it, how many rolls it took).
//    Rejected    — refused scans, only when there were any.
//
//  exceljs is imported lazily: it is a ~900 kB chunk, and the loading screen
//  runs on a phone at a truck ramp that should not pay for it until someone
//  actually asks for the file.
// ---------------------------------------------------------------------------

import { todayISO } from "./dates";
import type { TripStatus } from "./qrApi";

// NUMERIC arrives from Postgres as "30.00". Excel should get a number it can
// sum, not that string — but only when it really is one.
function num(v: number | string | null | undefined): number | string {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : String(v);
}

// Timestamps come back as ISO strings. Handing Excel a real Date lets the
// reader sort and filter by time; a string only sorts lexically, which happens
// to work for ISO and breaks the moment the format is localised.
function when(v: string | null | undefined): Date | string {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? String(v) : d;
}

// Excel-safe sheet name: at most 31 chars, no : \ / ? * [ ].
function sheetName(name: string) {
  return name.replace(/[:\\/?*[\]]/g, "_").slice(0, 31);
}

export async function exportTripXlsx(trip: TripStatus) {
  const { order, rolls, sessions, rejections, progress } = trip;

  try {
    const ExcelJSMod: any = await import("exceljs");
    const ExcelJS = ExcelJSMod.default || ExcelJSMod;
    const wb = new ExcelJS.Workbook();

    // ===== Rolls =====
    const ws = wb.addWorksheet(sheetName("Rolls"));

    // A short header block before the table. Whoever opens this file a month
    // later needs to know which shipment it is without reading the filename,
    // which by then has been renamed twice and mailed on.
    ws.addRow([`Order ${order.order_no}`]);
    ws.getRow(1).font = { bold: true, size: 14 };
    ws.addRow([
      "Customer", order.customer_name || "",
      "Status", order.status,
    ]);
    ws.addRow([
      "Rolls planned", progress.total,
      "Shipped", progress.loaded,
      "On truck now", progress.on_truck,
      "Remaining", progress.remaining,
    ]);
    ws.addRow([]);

    const headerRowIndex = ws.rowCount + 1;
    ws.addRow([
      "#", "Code", "Serial", "Design", "Fabric", "Length, m",
      "Status", "On truck", "Scanned at", "Scanned by", "Scan session",
    ]);
    ws.getRow(headerRowIndex).font = { bold: true };

    for (const r of rolls) {
      ws.addRow([
        r.roll_index,
        r.code,
        String(r.serial).padStart(9, "0"),
        r.design_number || order.design_number || "",
        r.fabric_type || order.fabric_type || "",
        num(r.roll_length),
        // Three related but different facts, all of which have been asked
        // for after a shipment: what the roll's own record says, whether it
        // is on a truck right now, and which session touched it last. A scan
        // belonging to an ABORTED session is why the last column is here —
        // without it the timestamp reads as proof the roll went.
        r.status,
        r.on_truck ? "yes" : "no",
        when(r.scanned_at),
        r.scanned_by || "",
        r.session_status || "",
      ]);
    }

    ws.columns = [
      { width: 6 }, { width: 14 }, { width: 13 }, { width: 18 }, { width: 20 },
      { width: 11 }, { width: 10 }, { width: 10 }, { width: 20 },
      { width: 16 }, { width: 14 },
    ];
    // Filters on the table header, not on the title block above it.
    ws.autoFilter = {
      from: { row: headerRowIndex, column: 1 },
      to: { row: headerRowIndex + rolls.length, column: 11 },
    };

    // ===== Trips =====
    const ts = wb.addWorksheet(sheetName("Trips"));
    ts.addRow([
      "Session", "Status", "Vehicle", "Driver", "Rolls scanned",
      "Opened at", "Opened by", "Closed at", "Closed by",
    ]);
    ts.getRow(1).font = { bold: true };
    for (const s of sessions) {
      ts.addRow([
        s.id, s.status, s.vehicle || "", s.driver || "", s.scanned,
        when(s.opened_at), s.opened_by || "",
        when(s.closed_at), s.closed_by || "",
      ]);
    }
    ts.columns = [
      { width: 9 }, { width: 10 }, { width: 16 }, { width: 18 }, { width: 14 },
      { width: 20 }, { width: 16 }, { width: 20 }, { width: 16 },
    ];

    // ===== Rejected =====
    // Only when there were any: an empty sheet reads as "nothing recorded"
    // rather than "nothing happened".
    if (rejections.length) {
      const rs = wb.addWorksheet(sheetName("Rejected"));
      rs.addRow(["Rejected at", "Code as scanned", "Reason", "Detail", "By", "Session"]);
      rs.getRow(1).font = { bold: true };
      for (const r of rejections) {
        rs.addRow([
          when(r.rejected_at), r.raw_code, r.reason, r.detail || "",
          r.rejected_by || "", r.session_id ?? "",
        ]);
      }
      rs.columns = [
        { width: 20 }, { width: 18 }, { width: 18 }, { width: 36 },
        { width: 16 }, { width: 9 },
      ];
    }

    const out = await wb.xlsx.writeBuffer();
    const blob = new Blob([out], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trip_${order.order_no.replace(/[^\w.-]+/g, "_")}_${todayISO()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 200);
    return { ok: true as const };
  } catch (e: any) {
    console.error("Trip xlsx export failed:", e);
    return { ok: false as const, error: e?.message || "Export failed" };
  }
}

export default exportTripXlsx;
