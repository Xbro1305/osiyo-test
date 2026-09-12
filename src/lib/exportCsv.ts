// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { Store } from "lucide-react";
import { todayISO } from "../lib/dates";
import { resolveDesignImage } from "../lib/storage";
import type { Design } from "../types/app";

export function exportToCSV(rows: any[], filename: string) {
  if (!rows || !rows.length) {
    alert("Nothing to export");
    return;
  }
  // Collect all keys across all rows
  const headerSet = new Set<string>();
  rows.forEach((r) => Object.keys(r).forEach((k) => headerSet.add(k)));
  const headers = [...headerSet];
  const escape = (v: any) => {
    if (v === null || v === undefined) return "";
    let s;
    if (Array.isArray(v)) s = v.join(" | ");
    else if (typeof v === "object") s = JSON.stringify(v);
    else s = String(v);
    return `"${s.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  };
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\r\n");
  try {
    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}_${todayISO()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (e) {
    console.error("Export failed:", e);
    alert("Export failed: " + e.message);
  }
}

// ===== Photo-embedded xlsx export (printing department) =====
//
// Used by station exports where each row corresponds to a design and we
// want the design's photo embedded inline in the spreadsheet. Mirrors the
// Local Market Store on-hand export's image treatment: object-fit:cover
// pre-crop to 100×60, drawn into a canvas, then embedded as PNG.
//
// Signature:
//   rows           = the operator-built row data (objects with keys
//                    matching the `columns` config).
//   columns        = array of { header, key, width? }. Order = column
//                    order in the sheet. The image column slot is decided
//                    by `imageColumn` (see below).
//   imageColumn    = optional. When present, an extra Image column is
//                    inserted at `imageColumn.position` (0-based) with
//                    header `imageColumn.header`. For each row, the
//                    image is resolved via `imageColumn.getDesignId(row)`
//                    → look up in `designById` → fetch + canvas-crop.
//   filename       = download filename prefix (date suffix appended).
//   sheetName      = worksheet name (clamped/cleaned for Excel rules).
//
// Lazy-imports exceljs so the dep is only loaded when an export runs.
// Errors during image fetch are non-fatal — that row's image cell stays
// blank rather than failing the whole export.
async function exportStationXlsx({
  rows,
  columns,
  imageColumn,
  filename,
  sheetName,
}: {
  rows: any[];
  columns: { header: string; key: string; width?: number }[];
  imageColumn?: {
    header: string;
    position: number; // 0-based slot index in the final column order
    width?: number;
    getDesignId: (row: any) => string | null | undefined;
    designById: Record<string, any>;
    resolveDesignImage: (d: any) => string;
    // Optional swatch fallback for rows with no design image (typically
    // color/dyed rows). Return a hex string like "#a03fca" and the export
    // draws a solid-color PNG in the image cell. Returning null / empty
    // leaves the cell blank as before.
    getSwatchColor?: (row: any) => string | null | undefined;
  };
  filename: string;
  sheetName?: string;
}) {
  if (!rows || !rows.length) {
    alert("Nothing to export");
    return;
  }
  try {
    const ExcelJSMod: any = await import("exceljs");
    const ExcelJS = ExcelJSMod.default || ExcelJSMod;
    const wb = new ExcelJS.Workbook();

    // Excel-safe sheet name: at most 31 chars, no : \ / ? * [ ].
    const cleanedSheet = (sheetName || "Sheet1")
      .replace(/[:\\/\?\*\[\]]/g, "_")
      .slice(0, 31);
    const ws = wb.addWorksheet(cleanedSheet);

    // Build the final columns array, splicing the image slot in if needed.
    // exceljs requires unique keys per column; we reserve "__image" as the
    // image column's key to avoid collisions with operator-supplied keys.
    const finalColumns: any[] = columns.map((c) => ({ ...c }));
    if (imageColumn) {
      const insertAt = Math.max(
        0,
        Math.min(imageColumn.position, finalColumns.length),
      );
      finalColumns.splice(insertAt, 0, {
        header: imageColumn.header,
        key: "__image",
        width: imageColumn.width ?? 18,
      });
    }
    ws.columns = finalColumns;
    ws.getRow(1).font = { bold: true };
    ws.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
    ws.getRow(1).height = 22;

    // ===== Image transformers =====
    // Identical to the Local Market Store on-hand export: each image is
    // pre-cropped via canvas with object-fit:cover math so it lands in
    // Excel at 100×60 without horizontal squeeze. Wrapped in try/catch
    // so a single bad image doesn't kill the whole export.
    const IMG_W = 100;
    const IMG_H = 60;

    async function bufferToCovered(
      buf: ArrayBuffer,
    ): Promise<ArrayBuffer | null> {
      try {
        const blob = new Blob([buf]);
        const url = URL.createObjectURL(blob);
        try {
          const img = await new Promise<HTMLImageElement>((res, rej) => {
            const im = new Image();
            im.onload = () => res(im);
            im.onerror = () => rej(new Error("image load failed"));
            im.src = url;
          });
          const canvas = document.createElement("canvas");
          canvas.width = IMG_W;
          canvas.height = IMG_H;
          const cx = canvas.getContext("2d");
          if (!cx) return null;
          const scale = Math.max(IMG_W / img.width, IMG_H / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const dx = (IMG_W - drawW) / 2;
          const dy = (IMG_H - drawH) / 2;
          cx.drawImage(img, dx, dy, drawW, drawH);
          const dataUrl = canvas.toDataURL("image/png");
          const base64 = dataUrl.split(",")[1];
          const bin = atob(base64);
          const out = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
          return out.buffer;
        } finally {
          URL.revokeObjectURL(url);
        }
      } catch {
        return null;
      }
    }

    // ===== Resolve image buffers (parallel fetch) =====
    // Pre-resolve every row's image up front so we can decorate cells in
    // a tight loop afterwards. Resolves to null for any row where the
    // design has no image, the fetch fails, or the canvas pipeline errors.
    //
    // Two image-source shapes are possible:
    //   1. `imageData` — a `data:image/...;base64,...` URL embedded in the
    //      Design record. No network call needed; decode directly.
    //   2. `imageUrl`  — an absolute or relative URL pointing at the
    //      backend's `/uploads/designs/...` route. Fetched over the wire.
    //
    // Fallback: when the row has no design or the image resolves to
    // nothing, and getSwatchColor returns a valid hex, synthesize a
    // solid-color PNG. Used by the sales dashboard so dyed rows get a
    // visible color chip in the Image column instead of an empty cell.
    //
    // Counts are tracked so we can surface a helpful warning if photos
    // didn't make it (the previous version silently failed).

    // Draw a solid color into an offscreen canvas and return raw PNG
    // bytes. Reused by the swatch fallback. Kept close to the design
    // image size for visual consistency in the sheet.
    function hexSwatchBuffer(hex: string): ArrayBuffer | null {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = IMG_W;
        canvas.height = IMG_H;
        const cx = canvas.getContext("2d");
        if (!cx) return null;
        cx.fillStyle = hex;
        cx.fillRect(0, 0, IMG_W, IMG_H);
        const dataUrl = canvas.toDataURL("image/png");
        const base64 = dataUrl.split(",")[1];
        const bin = atob(base64);
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out.buffer;
      } catch {
        return null;
      }
    }

    let imageBuffers: (ArrayBuffer | null)[] = [];
    let imgAttempted = 0;
    let imgFailedFetch = 0;
    let imgFailedDecode = 0;
    let imgMissingDesign = 0;
    if (imageColumn) {
      imageBuffers = await Promise.all(
        rows.map(async (r) => {
          // Swatch fallback helper — invoked when there's no design or
          // no image but a hex was supplied.
          const trySwatch = (): ArrayBuffer | null => {
            if (!imageColumn.getSwatchColor) return null;
            const hex = imageColumn.getSwatchColor(r);
            if (!hex || typeof hex !== "string") return null;
            // Reject anything that doesn't look like a hex color to
            // avoid feeding garbage into canvas.fillStyle (which would
            // silently default to black).
            if (!/^#?[0-9a-fA-F]{3,8}$/.test(hex)) return null;
            const normalized = hex.startsWith("#") ? hex : `#${hex}`;
            return hexSwatchBuffer(normalized);
          };
          const designId = imageColumn.getDesignId(r);
          if (!designId) return trySwatch(); // no design → try swatch
          const d = imageColumn.designById[designId];
          if (!d) {
            imgMissingDesign++;
            return trySwatch();
          }
          const src = imageColumn.resolveDesignImage(d);
          if (!src) return trySwatch();
          imgAttempted++;
          try {
            // Data-URL fast path: convert base64 to bytes directly, no
            // network round-trip. Works in any browser.
            if (src.startsWith("data:")) {
              const commaIdx = src.indexOf(",");
              if (commaIdx === -1) return trySwatch();
              const meta = src.slice(5, commaIdx); // "image/png;base64"
              const payload = src.slice(commaIdx + 1);
              if (!meta.includes("base64")) return trySwatch();
              const bin = atob(payload);
              const out = new Uint8Array(bin.length);
              for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
              try {
                return await bufferToCovered(out.buffer);
              } catch (e) {
                imgFailedDecode++;
                return trySwatch();
              }
            }
            // HTTP(S) URL — fetch without credentials. The /uploads route
            // is typically public; sending credentials here was the
            // common cause of silent failures (CORS preflight rejection
            // when the backend didn't set Access-Control-Allow-Credentials).
            const res = await fetch(src);
            if (!res.ok) {
              imgFailedFetch++;
              console.warn(
                `[xlsx export] image fetch ${res.status} for design ${designId}: ${src}`,
              );
              return trySwatch();
            }
            const raw = await res.arrayBuffer();
            return await bufferToCovered(raw);
          } catch (e: any) {
            imgFailedFetch++;
            console.warn(
              `[xlsx export] image fetch error for design ${designId}:`,
              e?.message || e,
            );
            return trySwatch();
          }
        }),
      );
      // If we got nothing back and we tried, raise a visible warning.
      // Operators previously had no way to know photos hadn't embedded.
      const successCount = imageBuffers.filter(Boolean).length;
      if (imgAttempted > 0 && successCount === 0) {
        console.warn(
          `[xlsx export] All ${imgAttempted} image fetches failed. ` +
            `Likely cause: CORS / public-uploads route blocked. ` +
            `Check the network tab for /uploads/designs/* requests.`,
        );
      } else if (imgAttempted > 0 && successCount < imgAttempted) {
        console.info(
          `[xlsx export] embedded ${successCount}/${imgAttempted} images ` +
            `(failed fetch: ${imgFailedFetch}, decode: ${imgFailedDecode}, ` +
            `missing design: ${imgMissingDesign})`,
        );
      }
    }

    // ===== Write rows =====
    rows.forEach((r, i) => {
      const rowNumber = i + 2; // 1 is the header
      // Project operator-row to a column-key keyed object. Unknown columns
      // are left blank; extra row fields are ignored.
      const rowData: Record<string, any> = {};
      for (const c of columns) {
        rowData[c.key] = r[c.key];
      }
      if (imageColumn) rowData.__image = ""; // populated via addImage below
      ws.addRow(rowData);

      // Tall row to host the image. 50pt is the same value used by the
      // Local Market Store export → keeps the visual proportions matched
      // across the app.
      if (imageColumn) {
        ws.getRow(rowNumber).height = 50;
        ws.getRow(rowNumber).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        const buf = imageBuffers[i];
        if (buf) {
          const imgId = wb.addImage({
            buffer: buf as any,
            extension: "png",
          });
          // Pixel-perfect placement: column index (0-based) for the image
          // slot, offset 0.1 on column + 0.05 on row for a subtle inset.
          ws.addImage(imgId, {
            tl: {
              col: imageColumn.position + 0.1,
              row: rowNumber - 1 + 0.05,
            } as any,
            ext: { width: IMG_W, height: IMG_H },
          });
        }
      }
    });

    const out = await wb.xlsx.writeBuffer();
    const blob = new Blob([out], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}_${todayISO()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 200);
  } catch (e: any) {
    console.error("xlsx export failed:", e);
    alert(
      "Export failed. If exceljs is missing, run `npm install exceljs`. Details in console.",
    );
  }
}
