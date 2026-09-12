// ---------------------------------------------------------------------------
//  Orders & roll labels.
//
//  Route: /orders
//
//  The office side of the QR feature. The loading bay gets /loading; this is
//  where the order is entered when it arrives, its label set is minted, and
//  the PDF is printed to go on the rolls.
//
//  The one idea this screen has to get across is that ISSUING CODES IS THE
//  POINT OF NO RETURN. An order for 50 rolls gets exactly 50 codes — that is
//  what makes a 51st roll impossible to load, because there is nothing to
//  scan. So `planned_rolls` is freely editable right up until the codes exist,
//  and immutable afterwards (the database enforces it too). The UI says so
//  before you press the button rather than explaining it in an error.
//
//  Lives outside App.tsx: the monolith is being broken up, so new pages do not
//  go back into it.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ChevronDown, ClipboardList, FileDown, Image as ImageIcon, Loader2,
  Plus, Printer, QrCode, Trash2, Truck, X,
} from "lucide-react";

import { useT } from "../i18n/lang";
import { useThemed } from "../theme/theme";
import { getToken } from "../lib/storage";
import {
  qrApi, type Design, type QrOrder, type QrOrderLineInput,
} from "../lib/qrApi";

// Status → badge styling. Kept here rather than on the server so the wording
// can be translated without a migration.
// NUMERIC comes back from Postgres as a string ("30.00"); "30" reads better.
function trimNum(v: number | string | null | undefined): string {
  const n = Number(v);
  return Number.isFinite(n) ? String(Math.round(n * 100) / 100) : String(v ?? "");
}

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-slate-500",
  codes_issued: "bg-blue-600",
  loading: "bg-amber-500",
  shipped: "bg-emerald-600",
  cancelled: "bg-red-600",
};

export default function QrOrdersPage() {
  const t = useT();
  const th = useThemed();

  const [orders, setOrders] = useState<QrOrder[] | null>(null);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    try {
      const r = await qrApi.listOrders();
      setOrders(r.items);
      setError("");
    } catch (e: any) {
      setError(e.message || "Failed to load orders");
      setOrders([]);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  if (!getToken()) {
    return (
      <div className={`min-h-screen ${th.page} ${th.text} flex items-center justify-center p-6`}>
        <div className="text-center">
          <p className="mb-4">{t("orders.signInFirst", "Sign in to manage orders and labels.")}</p>
          <a href="/" className="inline-block px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold">
            {t("login.signIn", "Sign in")}
          </a>
        </div>
      </div>
    );
  }

  const issueCodes = async (o: QrOrder) => {
    const ok = window.confirm(
      t("orders.issueConfirm", "Issue labels for this order?") + "\n\n" +
      t("orders.issueWarn",
        "Exactly {n} codes will be created — one per roll. After this the roll count can no longer be changed.")
        .replace("{n}", String(o.planned_rolls)),
    );
    if (!ok) return;
    setBusyId(o.id);
    try {
      await qrApi.issueCodes(o.id);
      await refresh();
    } catch (e: any) {
      setError(e.message || "Could not issue codes");
    } finally {
      setBusyId(null);
    }
  };

  // Fetch the PDF with the auth header, then hand the browser a blob it can
  // render. A plain link to the endpoint would arrive without the token.
  const openLabels = async (o: QrOrder, download: boolean) => {
    setBusyId(o.id);
    try {
      const blob = await qrApi.labelsPdfBlob(o.id);
      const url = URL.createObjectURL(blob);
      if (download) {
        const a = document.createElement("a");
        a.href = url;
        a.download = `labels-${o.order_no}.pdf`;
        a.click();
      } else {
        window.open(url, "_blank", "noopener");
      }
      // Give the tab / download a moment to take the URL before releasing it.
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e: any) {
      setError(e.message || "Could not fetch the label sheet");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className={`min-h-screen ${th.page} ${th.text}`}>
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <a href="/" className={`p-2 rounded-lg ${th.surface} border ${th.border}`}>
            <ArrowLeft size={20} />
          </a>
          <ClipboardList size={26} className="text-purple-500" />
          <h1 className="text-2xl font-bold flex-1">{t("orders.title", "Orders & roll labels")}</h1>
          <a
            href="/loading"
            className={`px-4 py-2 rounded-xl ${th.surface} border ${th.border} ${th.hover} font-semibold inline-flex items-center gap-2`}
          >
            <Truck size={18} /> <span className="hidden sm:inline">{t("loading.title", "Truck loading")}</span>
          </a>
          <button
            onClick={() => setCreating(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold inline-flex items-center gap-2"
          >
            <Plus size={18} /> <span className="hidden sm:inline">{t("orders.new", "New order")}</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-900/20 border border-red-500 text-red-500 flex items-start gap-2">
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")}><X size={16} /></button>
          </div>
        )}

        {orders === null && (
          <div className={`flex items-center gap-2 ${th.textDim}`}>
            <Loader2 size={18} className="animate-spin" /> {t("common.loading", "Loading…")}
          </div>
        )}

        {orders?.length === 0 && (
          <div className={`text-center py-16 ${th.textDim}`}>
            <QrCode size={48} className="mx-auto mb-3 opacity-40" />
            <p>{t("orders.empty", "No orders yet. Create one to generate roll labels.")}</p>
          </div>
        )}

        <div className="space-y-3">
          {orders?.map((o) => {
            const issued = Number(o.codes_issued) || 0;
            const loaded = Number(o.rolls_loaded) || 0;
            const hasCodes = issued > 0;
            const busy = busyId === o.id;

            return (
              <div key={o.id} className={`rounded-2xl border ${th.border} ${th.surface} p-4`}>
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold">{o.order_no}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${STATUS_STYLE[o.status] || "bg-slate-500"}`}>
                        {t(`orders.status.${o.status}`, o.status)}
                      </span>
                    </div>
                    <div className={`text-sm ${th.textDim} mt-1`}>
                      {[o.customer_name, o.fabric_type].filter(Boolean).join(" · ") || "—"}
                    </div>
                    {/* An order spans several designs, so the breakdown is
                        part of its identity, not a detail behind a click. */}
                    {!!o.lines?.length && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {o.lines.map((l) => (
                          <span
                            key={l.id ?? l.line_index}
                            className={`px-2 py-0.5 rounded-lg text-xs ${th.surfaceAlt} border ${th.border}`}
                          >
                            <b>{l.design_number || t("orders.noDesign", "no design")}</b>
                            {l.roll_length ? ` · ${trimNum(l.roll_length)} ${t("orders.m", "m")}` : ""}
                            {" · "}{l.rolls}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black tabular-nums leading-none">{o.planned_rolls}</div>
                    <div className={`text-xs ${th.textDim}`}>{t("orders.rolls", "rolls")}</div>
                  </div>
                </div>

                {/* Progress: codes minted, then rolls actually loaded. */}
                <div className={`mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm ${th.textDim}`}>
                  <span>
                    {t("orders.codesIssued", "Labels")}:{" "}
                    <b className={hasCodes ? "text-emerald-500" : th.textMuted}>
                      {issued} / {o.planned_rolls}
                    </b>
                  </span>
                  <span>
                    {t("orders.loaded", "Loaded")}:{" "}
                    <b className={loaded === o.planned_rolls && loaded > 0 ? "text-emerald-500" : ""}>
                      {loaded} / {o.planned_rolls}
                    </b>
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {!hasCodes ? (
                    <button
                      onClick={() => issueCodes(o)}
                      disabled={busy}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold inline-flex items-center gap-2"
                    >
                      {busy ? <Loader2 size={16} className="animate-spin" /> : <QrCode size={16} />}
                      {t("orders.issue", "Issue labels")}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => openLabels(o, false)}
                        disabled={busy}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold inline-flex items-center gap-2"
                      >
                        {busy ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />}
                        {t("orders.print", "Print labels")}
                      </button>
                      <button
                        onClick={() => openLabels(o, true)}
                        disabled={busy}
                        className={`px-4 py-2 rounded-xl ${th.surfaceAlt} border ${th.border} ${th.hover} disabled:opacity-50 font-semibold inline-flex items-center gap-2`}
                      >
                        <FileDown size={16} /> {t("orders.download", "Download PDF")}
                      </button>
                    </>
                  )}
                </div>

                {!hasCodes && (
                  <p className={`mt-2 text-xs ${th.textMuted}`}>
                    {t("orders.beforeIssueHint",
                      "The roll count can still be changed until labels are issued.")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {creating && (
        <NewOrderModal
          onClose={() => setCreating(false)}
          onCreated={async () => { setCreating(false); await refresh(); }}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
//  New order form.
//
//  An order is a list of LINES: a design picked from the gallery, the roll
//  length for that design, and how many rolls. The roll count the loading bay
//  counts against is the SUM of the lines and is never typed directly — it is
//  shown, prominently, so whoever is entering the order sees the number that
//  will be printed on every label before they commit to it.
// ---------------------------------------------------------------------------
function NewOrderModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const t = useT();
  const th = useThemed();
  const firstRef = useRef<HTMLInputElement | null>(null);

  const [head, setHead] = useState({ order_no: "", customer_name: "", fabric_type: "", notes: "" });
  const [lines, setLines] = useState<QrOrderLineInput[]>([
    { designId: null, designNumber: null, rollLength: "", rolls: 1 },
  ]);
  const [designs, setDesigns] = useState<Design[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { firstRef.current?.focus(); }, []);
  useEffect(() => {
    qrApi.listDesigns()
      .then((d) => setDesigns(Array.isArray(d) ? d : []))
      .catch(() => setDesigns([]));
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const setLine = (i: number, patch: Partial<QrOrderLineInput>) =>
    setLines((ls) => ls.map((l, k) => (k === i ? { ...l, ...patch } : l)));
  const addLine = () =>
    setLines((ls) => [...ls, { designId: null, designNumber: null, rollLength: "", rolls: 1 }]);
  const removeLine = (i: number) => setLines((ls) => ls.filter((_, k) => k !== i));

  const total = lines.reduce((a, l) => a + (Number(l.rolls) || 0), 0);
  const lineOk = (l: QrOrderLineInput) => {
    // A design is required here even though the column allows null: the whole
    // point of the picker is that every roll's label names its print, and a
    // blank one leaves the loader holding an unidentifiable roll. The database
    // stays permissive so legacy orders and direct API callers still work.
    if (!l.designId) return false;
    const r = Number(l.rolls);
    if (!Number.isInteger(r) || r < 1 || r > 10000) return false;
    if (l.rollLength !== "" && l.rollLength !== null) {
      const len = Number(l.rollLength);
      if (!Number.isFinite(len) || len <= 0) return false;
    }
    return true;
  };
  const valid = head.order_no.trim() && lines.length > 0 && lines.every(lineOk) && total >= 1;

  const submit = async (e: any) => {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError("");
    try {
      await qrApi.createOrder({
        order_no: head.order_no.trim(),
        customer_name: head.customer_name.trim() || null,
        fabric_type: head.fabric_type.trim() || null,
        notes: head.notes.trim() || null,
        lines: lines.map((l) => ({
          designId: l.designId,
          designNumber: l.designNumber,
          rollLength: l.rollLength === "" ? null : Number(l.rollLength),
          rolls: Number(l.rolls),
        })),
      });
      onCreated();
    } catch (err: any) {
      setError(err.message || "Could not create the order");
    } finally {
      setBusy(false);
    }
  };

  const field = `w-full px-3 py-2.5 rounded-xl border ${th.inputBg} outline-none focus:border-purple-500`;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className={`w-full sm:max-w-2xl ${th.surface} ${th.text} rounded-t-2xl sm:rounded-2xl border ${th.border} p-5 max-h-[92vh] overflow-y-auto`}
      >
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold flex-1">{t("orders.new", "New order")}</h2>
          <button type="button" onClick={onClose} className={`p-2 rounded-lg ${th.hover}`}>
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-3 p-3 rounded-xl bg-red-900/20 border border-red-500 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className={`text-xs ${th.textDim}`}>{t("orders.orderNo", "Order number")} *</span>
            <input ref={firstRef} value={head.order_no}
              onChange={(e) => setHead({ ...head, order_no: e.target.value })}
              placeholder="ORD-2026-001" className={`mt-1 ${field}`} />
          </label>
          <label className="block">
            <span className={`text-xs ${th.textDim}`}>{t("orders.customer", "Customer")}</span>
            <input value={head.customer_name}
              onChange={(e) => setHead({ ...head, customer_name: e.target.value })}
              className={`mt-1 ${field}`} />
          </label>
        </div>

        {/* ---- Lines ---- */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold">{t("orders.linesTitle", "Designs in this order")}</span>
            <button type="button" onClick={addLine}
              className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm font-semibold inline-flex items-center gap-1.5">
              <Plus size={15} /> {t("orders.addLine", "Add design")}
            </button>
          </div>

          <div className="space-y-2">
            {lines.map((l, i) => (
              <div key={i} className={`p-3 rounded-xl border ${th.border} ${th.surfaceAlt}`}>
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <DesignPicker
                      designs={designs}
                      value={l.designId}
                      label={l.designNumber}
                      onPick={(d) => setLine(i, { designId: d?.id ?? null, designNumber: d?.designNumber ?? null })}
                    />
                  </div>
                  {lines.length > 1 && (
                    <button type="button" onClick={() => removeLine(i)}
                      className={`p-2 rounded-lg ${th.hover} ${th.textDim}`}
                      aria-label={t("common.delete", "Delete")}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {!l.designId && (
                  <p className="mt-1.5 text-xs text-amber-500">
                    {t("orders.designRequired", "Pick a design — it is printed on every label of this line.")}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <label className="block">
                    <span className={`text-xs ${th.textDim}`}>
                      {t("orders.rollLength", "Roll length, m")}
                    </span>
                    <input
                      value={l.rollLength ?? ""}
                      onChange={(e) => setLine(i, { rollLength: e.target.value })}
                      type="number" min="0" step="0.5" inputMode="decimal" placeholder="30"
                      className={`mt-1 ${field}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`text-xs ${th.textDim}`}>{t("orders.rollsCount", "Rolls")} *</span>
                    <input
                      value={l.rolls}
                      onChange={(e) => setLine(i, { rolls: e.target.value as any })}
                      type="number" min="1" max="10000" inputMode="numeric"
                      className={`mt-1 ${field} font-bold`}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The number that ends up on every label and on the loading screen. */}
        <div className={`mt-4 p-3 rounded-xl border ${th.border} flex items-baseline justify-between`}>
          <span className={`text-sm ${th.textDim}`}>
            {t("orders.totalRolls", "Total rolls — one label each")}
          </span>
          <span className="text-3xl font-black tabular-nums">{total}</span>
        </div>

        <label className="block mt-3">
          <span className={`text-xs ${th.textDim}`}>{t("orders.fabric", "Fabric type")}</span>
          <input value={head.fabric_type}
            onChange={(e) => setHead({ ...head, fabric_type: e.target.value })}
            className={`mt-1 ${field}`} />
        </label>

        <label className="block mt-3">
          <span className={`text-xs ${th.textDim}`}>{t("common.notes", "Notes")}</span>
          <textarea value={head.notes}
            onChange={(e) => setHead({ ...head, notes: e.target.value })}
            rows={2} className={`mt-1 ${field}`} />
        </label>

        <div className="mt-5 flex gap-2">
          <button type="submit" disabled={!valid || busy}
            className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold">
            {busy ? <Loader2 size={18} className="animate-spin inline" /> : t("common.save", "Save")}
          </button>
          <button type="button" onClick={onClose}
            className={`px-5 py-3 rounded-xl ${th.surfaceAlt} border ${th.border} ${th.hover} font-semibold`}>
            {t("common.cancel", "Cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
//  Design picker — the gallery, filtered as you type.
//
//  The whole gallery is fetched once by the parent and filtered here in
//  memory: it is a few hundred entries, and a round trip per keystroke would
//  make the field feel broken on the factory's connection. Thumbnails matter
//  more than names here — operators recognise a print long before they recall
//  its number.
// ---------------------------------------------------------------------------
function DesignPicker({
  designs, value, label, onPick,
}: {
  designs: Design[] | null;
  value: string | null;
  label: string | null;
  onPick: (d: Design | null) => void;
}) {
  const t = useT();
  const th = useThemed();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  // Designs reference an image on the API server's disk. If that file is
  // missing — the record outlived the upload, or you are pointed at an API
  // whose /uploads does not have it — the browser draws its broken-image
  // glyph, which reads as "the app is broken". Track the failures and fall
  // back to the same placeholder used when there is no image at all.
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const markFailed = (id: string) => setFailed((f) => new Set(f).add(id));

  const chosen = designs?.find((d) => d.id === value) || null;
  const needle = q.trim().toLowerCase();
  const shown = (designs || [])
    .filter((d) => !needle
      || (d.designNumber || "").toLowerCase().includes(needle)
      || (d.name || "").toLowerCase().includes(needle))
    .slice(0, 60);

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border ${th.border} ${th.surface} ${th.hover} text-left`}>
        {chosen && qrApi.imageSrc(chosen) && !failed.has(chosen.id)
          ? <img src={qrApi.imageSrc(chosen)!} alt="" onError={() => markFailed(chosen.id)}
              className="w-9 h-9 rounded-lg object-cover shrink-0" />
          : <div className={`w-9 h-9 rounded-lg ${th.surfaceAlt} border ${th.border} shrink-0 flex items-center justify-center`}>
              <ImageIcon size={16} className={th.textMuted} />
            </div>}
        <span className="min-w-0 flex-1">
          <span className="block font-semibold truncate">
            {label || chosen?.designNumber || t("orders.pickDesign", "Choose a design")}
          </span>
          {chosen?.name && <span className={`block text-xs truncate ${th.textDim}`}>{chosen.name}</span>}
        </span>
        <ChevronDown size={16} className={th.textDim} />
      </button>
    );
  }

  return (
    <div className={`rounded-xl border ${th.border} ${th.surface} p-2`}>
      <div className="flex items-center gap-2 mb-2">
        <input
          autoFocus value={q} onChange={(e) => setQ(e.target.value)}
          placeholder={t("orders.searchDesign", "Search by number or name")}
          className={`flex-1 px-3 py-2 rounded-lg border ${th.inputBg} outline-none`}
        />
        <button type="button" onClick={() => setOpen(false)} className={`p-2 rounded-lg ${th.hover}`}>
          <X size={16} />
        </button>
      </div>

      {designs === null && (
        <div className={`py-6 text-center ${th.textDim}`}>
          <Loader2 size={18} className="animate-spin inline" />
        </div>
      )}
      {designs?.length === 0 && (
        <p className={`py-4 text-center text-sm ${th.textDim}`}>
          {t("orders.noDesigns", "The gallery is empty.")}
        </p>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
        {shown.map((d) => {
          const src = failed.has(d.id) ? null : qrApi.imageSrc(d);
          return (
            <button
              key={d.id} type="button"
              onClick={() => { onPick(d); setOpen(false); setQ(""); }}
              className={`p-1.5 rounded-lg border text-left ${
                d.id === value ? "border-purple-500" : th.border
              } ${th.hover}`}
            >
              {src
                ? <img src={src} alt="" onError={() => markFailed(d.id)}
                    className="w-full aspect-square rounded object-cover" />
                : <div className={`w-full aspect-square rounded ${th.surfaceAlt} flex items-center justify-center`}>
                    <ImageIcon size={18} className={th.textMuted} />
                  </div>}
              <span className="block mt-1 text-xs font-semibold truncate">{d.designNumber}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
