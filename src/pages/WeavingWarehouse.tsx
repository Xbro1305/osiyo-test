// ---------------------------------------------------------------------------
//  Weaving → Warehouse.
//
//  View: { type: "weave_warehouse" }  →  /weaving/warehouse
//
//  This replaces Market.exe, the Delphi program the storekeeper used to keep
//  the fabric ledger in. The model is the one that program had, minus the
//  parts nobody filled in (prices, exchange rate, cash, packing units):
//
//    * ONE ledger of movements. Each row is a quantity of one good coming in
//      from, or going out to, one partner at one warehouse. A document is
//      just the rows that share a type and a number.
//    * THE BALANCE IS NEVER STORED. It is always "in − out" over the ledger,
//      so there is no stock figure that can drift away from the movements.
//    * Three directories the ledger points at: goods, partners, warehouses.
//
//  All four live in the generic /records store under the weave_wh_* station
//  keys, so they work on both backends without a schema change. The page
//  loads them itself rather than through ctx.records: that map is polled for
//  the printing stations, and nothing outside this page reads these.
//
//  Lives outside App.tsx: the monolith is being broken up, so new pages do not
//  go back into it.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDownToLine, ArrowUpFromLine, ChevronRight, ClipboardList, Download,
  Edit2, Loader2, Package, Plus, Search, Trash2, Warehouse, X,
} from "lucide-react";

import { useT } from "../i18n/lang";
import { storage } from "../lib/storage";
import { todayISO, uid } from "../lib/dates";
import { exportToCSV } from "../lib/exportCsv";
import { canEditDepartment } from "../lib/access";
import type { AppContext } from "../types/app";

// ============== SHAPES ==============
interface Good { id: string; code: string; name: string; unit?: string }
interface Partner { id: string; code: string; name: string; address?: string; phone?: string }
interface Store { id: string; code: string; name: string; person?: string }
type OpType = "in" | "out";
interface Op {
  id: string;
  date: string;
  docNum: number;
  type: OpType;
  partnerId: string;
  goodId: string;
  storeId: string;
  qty: number;
  unit?: string;
  notes?: string;
  operator?: string;
  createdAt?: string | null;
  // Row number in Market.exe, kept on imported rows so a re-import lands on
  // the same record.
  legacyNo?: number;
}

type DirKind = "goods" | "partners" | "stores";
type DirRow = { id: string; code: string; name: string; [k: string]: any };

const KEY = {
  ops: "rec_weave_wh_ops:",
  goods: "rec_weave_wh_goods:",
  partners: "rec_weave_wh_partners:",
  stores: "rec_weave_wh_stores:",
} as const;

// Code widths are the ones Market.exe used, so new entries sort in with the
// imported ones.
const DIRS: Record<DirKind, {
  prefix: string;
  codeLen: number;
  opField: "goodId" | "partnerId" | "storeId";
  fields: { key: string; label: string }[];
}> = {
  goods: {
    prefix: KEY.goods, codeLen: 6, opField: "goodId",
    fields: [
      { key: "code", label: "wvw.code" },
      { key: "name", label: "wvw.name" },
      { key: "unit", label: "wvw.unit" },
    ],
  },
  partners: {
    prefix: KEY.partners, codeLen: 4, opField: "partnerId",
    fields: [
      { key: "code", label: "wvw.code" },
      { key: "name", label: "wvw.name" },
      { key: "address", label: "wvw.address" },
      { key: "phone", label: "wvw.phone" },
    ],
  },
  stores: {
    prefix: KEY.stores, codeLen: 3, opField: "storeId",
    fields: [
      { key: "code", label: "wvw.code" },
      { key: "name", label: "wvw.name" },
      { key: "person", label: "wvw.person" },
    ],
  },
};

// ============== HELPERS ==============
const INPUT = "w-full p-2.5 border border-slate-300 rounded-lg text-sm";
const FILTER = "px-2 py-1.5 border border-slate-200 rounded text-sm";
const TH = "p-3 font-medium text-slate-600";

const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const fmt = (n: number) =>
  (Math.round(n * 100) / 100).toLocaleString(undefined, { maximumFractionDigits: 2 });
const byCode = (a: { code: string }, b: { code: string }) =>
  String(a.code).localeCompare(String(b.code));
const signed = (o: Op) => (o.type === "in" ? num(o.qty) : -num(o.qty));

function upsert<T extends { id: string }>(list: T[], item: T): T[] {
  return list.some((x) => x.id === item.id)
    ? list.map((x) => (x.id === item.id ? item : x))
    : [...list, item];
}

function nextCode(rows: { code: string }[], len: number) {
  const max = rows.reduce((m, r) => Math.max(m, parseInt(r.code, 10) || 0), 0);
  return String(max + 1).padStart(len, "0");
}

// Newest first; within a day, the higher document number first.
function byDateDesc(a: Op, b: Op) {
  return (
    b.date.localeCompare(a.date) ||
    num(b.docNum) - num(a.docNum) ||
    b.id.localeCompare(a.id)
  );
}

// ============== SMALL UI ==============
// Local copies of App.tsx's Modal and Field — importing them from App.tsx
// would be circular, since App.tsx imports this page to route to it.
function Modal({ title, onClose, large, children }: {
  title: string; onClose: () => void; large?: boolean; children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-2xl p-5 w-full ${large ? "max-w-2xl" : "max-w-md"} max-h-[92vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

function FormFooter({ onCancel, saving }: { onCancel: () => void; saving: boolean }) {
  const t = useT();
  return (
    <div className="flex gap-2 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
      >
        {t("common.cancel")}
      </button>
      <button
        type="submit"
        disabled={saving}
        className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white rounded-lg font-medium flex items-center justify-center gap-2"
      >
        {saving && <Loader2 size={16} className="animate-spin" />}
        {t("common.save")}
      </button>
    </div>
  );
}

function Stat({ label, value, icon: Icon, color }: {
  label: string; value: string; icon: any; color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Icon size={14} className={color} /> {label}
      </div>
      <div className="text-xl font-bold text-slate-800 mt-1">{value}</div>
    </div>
  );
}

function TypeBadge({ type }: { type: OpType }) {
  const t = useT();
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        type === "in" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
      }`}
    >
      {t(type === "in" ? "wvw.in" : "wvw.out")}
    </span>
  );
}

function ExportBtn({ onClick }: { onClick: () => void }) {
  const t = useT();
  return (
    <button
      onClick={onClick}
      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
    >
      <Download size={14} /> {t("common.export")}
    </button>
  );
}

// ============== PAGE ==============
type Tab = "stock" | "ops" | "reports" | "dirs";

export default function WeavingWarehouse({ ctx }: { ctx: AppContext }) {
  const t = useT();
  const { user, setCurrentView, askConfirm } = ctx;
  const canEdit = canEditDepartment(user, "weaving");

  const [ops, setOps] = useState<Op[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("stock");
  // Stock → "open this good's card" hands the good over to the reports tab.
  const [cardGoodId, setCardGoodId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const [o, g, p, s] = await Promise.all([
      storage.getAll(KEY.ops),
      storage.getAll(KEY.goods),
      storage.getAll(KEY.partners),
      storage.getAll(KEY.stores),
    ]);
    // getAll answers null — not [] — when the request failed. Showing an empty
    // warehouse for a network error would look like the stock had vanished.
    if (!o || !g || !p || !s) {
      setError(t("wvw.loadFailed"));
    } else {
      setOps(o as Op[]);
      setGoods((g as Good[]).slice().sort(byCode));
      setPartners((p as Partner[]).slice().sort(byCode));
      setStores((s as Store[]).slice().sort(byCode));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const totals = useMemo(() => {
    let inn = 0;
    let out = 0;
    const docs = new Set<string>();
    for (const o of ops) {
      if (o.type === "in") inn += num(o.qty);
      else out += num(o.qty);
      docs.add(`${o.type}/${o.docNum}`);
    }
    return { inn, out, docs: docs.size };
  }, [ops]);

  async function saveOps(rows: Op[]) {
    for (const r of rows) await storage.set(`${KEY.ops}${r.id}`, r);
    setOps((prev) => rows.reduce(upsert, prev));
  }
  function deleteOp(o: Op) {
    askConfirm(t("wvw.confirmDeleteOp"), async () => {
      try {
        await storage.delete(`${KEY.ops}${o.id}`);
        setOps((prev) => prev.filter((x) => x.id !== o.id));
      } catch (e: any) {
        setError(e?.message || t("wvw.saveFailed"));
      }
    });
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "stock", label: t("wvw.tab.stock"), icon: Package },
    { id: "ops", label: t("wvw.tab.ops"), icon: ClipboardList },
    { id: "reports", label: t("wvw.tab.reports"), icon: ArrowDownToLine },
    { id: "dirs", label: t("wvw.tab.dirs"), icon: Warehouse },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => setCurrentView({ type: "home" })} className="hover:text-slate-700">
            {t("wvw.home")}
          </button>
          <ChevronRight size={12} />
          <button
            onClick={() => setCurrentView({ type: "department", departmentId: "weaving" })}
            className="hover:text-slate-700"
          >
            {t("dept.weaving")}
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-medium">{t("wvw.title")}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Warehouse className="text-white" size={22} />
          </div>
          <div>
            <div className="font-bold text-lg text-slate-800">{t("wvw.title")}</div>
            <div className="text-xs text-slate-500">{t("wvw.subtitle")}</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm flex items-center justify-between gap-3">
          <span>{error}</span>
          <button onClick={load} className="underline font-medium whitespace-nowrap">
            {t("wvw.retry")}
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label={t("wvw.stat.in")} value={fmt(totals.inn)} icon={ArrowDownToLine} color="text-emerald-600" />
        <Stat label={t("wvw.stat.out")} value={fmt(totals.out)} icon={ArrowUpFromLine} color="text-rose-600" />
        <Stat label={t("wvw.stat.balance")} value={fmt(totals.inn - totals.out)} icon={Package} color="text-indigo-600" />
        <Stat label={t("wvw.stat.docs")} value={totals.docs.toLocaleString()} icon={ClipboardList} color="text-slate-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-1 flex gap-1 overflow-x-auto">
        {tabs.map((x) => (
          <button
            key={x.id}
            onClick={() => setTab(x.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 whitespace-nowrap ${
              tab === x.id ? "bg-amber-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <x.icon size={15} /> {x.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-10 flex justify-center text-slate-400">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {tab === "stock" && (
            <StockTab
              ops={ops} goods={goods} stores={stores}
              onOpenCard={(id) => { setCardGoodId(id); setTab("reports"); }}
            />
          )}
          {tab === "ops" && (
            <OpsTab
              ops={ops} goods={goods} partners={partners} stores={stores}
              canEdit={canEdit} operator={user?.name || user?.login || ""}
              onSave={saveOps} onDelete={deleteOp}
            />
          )}
          {tab === "reports" && (
            <ReportsTab
              ops={ops} goods={goods} partners={partners}
              cardGoodId={cardGoodId} setCardGoodId={setCardGoodId}
            />
          )}
          {tab === "dirs" && (
            <DirsTab
              ops={ops} canEdit={canEdit} askConfirm={askConfirm}
              rows={{ goods, partners, stores }}
              setRows={{
                goods: setGoods as any, partners: setPartners as any, stores: setStores as any,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

// ============== STOCK ==============
function StockTab({ ops, goods, stores, onOpenCard }: {
  ops: Op[]; goods: Good[]; stores: Store[]; onOpenCard: (goodId: string) => void;
}) {
  const t = useT();
  const [storeId, setStoreId] = useState("");
  const [hideEmpty, setHideEmpty] = useState(false);

  const rows = useMemo(() => {
    const acc: Record<string, { inn: number; out: number }> = {};
    for (const o of ops) {
      if (storeId && o.storeId !== storeId) continue;
      const a = (acc[o.goodId] ??= { inn: 0, out: 0 });
      if (o.type === "in") a.inn += num(o.qty);
      else a.out += num(o.qty);
    }
    return goods
      .map((g) => {
        const a = acc[g.id] || { inn: 0, out: 0 };
        return { ...g, inn: a.inn, out: a.out, balance: a.inn - a.out };
      })
      .filter((r) => !hideEmpty || Math.abs(r.balance) > 1e-9);
  }, [ops, goods, storeId, hideEmpty]);

  const sum = rows.reduce(
    (s, r) => ({ inn: s.inn + r.inn, out: s.out + r.out, balance: s.balance + r.balance }),
    { inn: 0, out: 0, balance: 0 },
  );

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3 flex-wrap">
        {stores.length > 1 && (
          <select value={storeId} onChange={(e) => setStoreId(e.target.value)} className={FILTER}>
            <option value="">{t("wvw.allStores")}</option>
            {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        )}
        <label className="flex items-center gap-1.5 text-sm text-slate-600">
          <input type="checkbox" checked={hideEmpty} onChange={(e) => setHideEmpty(e.target.checked)} />
          {t("wvw.hideEmpty")}
        </label>
        <div className="flex-1" />
        <ExportBtn
          onClick={() =>
            exportToCSV(
              rows.map((r) => ({
                code: r.code, name: r.name, unit: r.unit, in: r.inn, out: r.out, balance: r.balance,
              })),
              "weaving_warehouse_stock",
            )
          }
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className={`text-left ${TH}`}>{t("wvw.code")}</th>
              <th className={`text-left ${TH}`}>{t("wvw.good")}</th>
              <th className={`text-left ${TH}`}>{t("wvw.unit")}</th>
              <th className={`text-right ${TH}`}>{t("wvw.in")}</th>
              <th className={`text-right ${TH}`}>{t("wvw.out")}</th>
              <th className={`text-right ${TH}`}>{t("wvw.balance")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-mono text-xs">{r.code}</td>
                <td className="p-3">
                  <button
                    onClick={() => onOpenCard(r.id)}
                    className="font-medium text-amber-700 hover:underline text-left"
                  >
                    {r.name}
                  </button>
                </td>
                <td className="p-3 text-slate-500">{r.unit || "—"}</td>
                <td className="p-3 text-right text-emerald-700">{fmt(r.inn)}</td>
                <td className="p-3 text-right text-rose-700">{fmt(r.out)}</td>
                <td className={`p-3 text-right font-bold ${r.balance < 0 ? "text-red-600" : r.balance === 0 ? "text-slate-400" : "text-slate-800"}`}>
                  {fmt(r.balance)}
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={6} className="p-8 text-center text-slate-400">{t("wvw.empty")}</td></tr>
            )}
          </tbody>
          {rows.length > 0 && (
            <tfoot className="bg-slate-50 font-bold">
              <tr className="border-t border-slate-200">
                <td className="p-3" colSpan={3}>{t("wvw.total")}</td>
                <td className="p-3 text-right text-emerald-700">{fmt(sum.inn)}</td>
                <td className="p-3 text-right text-rose-700">{fmt(sum.out)}</td>
                <td className="p-3 text-right">{fmt(sum.balance)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

// ============== OPERATIONS ==============
function OpsTab({ ops, goods, partners, stores, canEdit, operator, onSave, onDelete }: {
  ops: Op[]; goods: Good[]; partners: Partner[]; stores: Store[];
  canEdit: boolean; operator: string;
  onSave: (rows: Op[]) => Promise<void>; onDelete: (o: Op) => void;
}) {
  const t = useT();
  const [f, setF] = useState({ from: "", to: "", type: "", partnerId: "", goodId: "", search: "" });
  // `editing` is one existing row; `creating` is a new document of that type.
  const [editing, setEditing] = useState<Op | null>(null);
  const [creating, setCreating] = useState<OpType | null>(null);

  const goodById = useMemo(() => new Map(goods.map((g) => [g.id, g])), [goods]);
  const partnerById = useMemo(() => new Map(partners.map((p) => [p.id, p])), [partners]);

  const rows = useMemo(() => {
    const term = f.search.trim().toLowerCase();
    return ops
      .filter(
        (o) =>
          (!f.from || o.date >= f.from) &&
          (!f.to || o.date <= f.to) &&
          (!f.type || o.type === f.type) &&
          (!f.partnerId || o.partnerId === f.partnerId) &&
          (!f.goodId || o.goodId === f.goodId) &&
          (!term ||
            String(o.docNum).includes(term) ||
            (o.notes || "").toLowerCase().includes(term) ||
            (goodById.get(o.goodId)?.name || "").toLowerCase().includes(term)),
      )
      .sort(byDateDesc);
  }, [ops, f, goodById]);

  const sum = rows.reduce(
    (s, o) => (o.type === "in" ? { ...s, inn: s.inn + num(o.qty) } : { ...s, out: s.out + num(o.qty) }),
    { inn: 0, out: 0 },
  );
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  function exportRows() {
    exportToCSV(
      rows.map((o) => ({
        date: o.date,
        docNum: o.docNum,
        type: o.type,
        partner: partnerById.get(o.partnerId)?.name || "",
        goodCode: goodById.get(o.goodId)?.code || "",
        good: goodById.get(o.goodId)?.name || "",
        qty: o.qty,
        unit: o.unit || "",
        notes: o.notes || "",
        operator: o.operator || "",
      })),
      "weaving_warehouse_operations",
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[160px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            value={f.search} onChange={set("search")} placeholder={t("wvw.searchOps")}
            className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded text-sm"
          />
        </div>
        <input type="date" value={f.from} onChange={set("from")} className={FILTER} />
        <input type="date" value={f.to} onChange={set("to")} className={FILTER} />
        <select value={f.type} onChange={set("type")} className={FILTER}>
          <option value="">{t("wvw.allTypes")}</option>
          <option value="in">{t("wvw.in")}</option>
          <option value="out">{t("wvw.out")}</option>
        </select>
        <select value={f.partnerId} onChange={set("partnerId")} className={FILTER}>
          <option value="">{t("wvw.allPartners")}</option>
          {partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={f.goodId} onChange={set("goodId")} className={FILTER}>
          <option value="">{t("wvw.allGoods")}</option>
          {goods.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        {canEdit && (
          <>
            <button
              onClick={() => setCreating("in")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Plus size={15} /> {t("wvw.newIn")}
            </button>
            <button
              onClick={() => setCreating("out")}
              className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Plus size={15} /> {t("wvw.newOut")}
            </button>
          </>
        )}
        <ExportBtn onClick={exportRows} />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className={`text-left ${TH}`}>{t("wvw.date")}</th>
              <th className={`text-left ${TH}`}>{t("wvw.docNum")}</th>
              <th className={`text-left ${TH}`}>{t("wvw.type")}</th>
              <th className={`text-left ${TH}`}>{t("wvw.partner")}</th>
              <th className={`text-left ${TH}`}>{t("wvw.good")}</th>
              <th className={`text-right ${TH}`}>{t("wvw.qty")}</th>
              <th className={`text-left ${TH}`}>{t("wvw.operator")}</th>
              {canEdit && <th className="p-3 w-20"></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 whitespace-nowrap">{o.date}</td>
                <td className="p-3 font-mono text-xs">{o.docNum}</td>
                <td className="p-3"><TypeBadge type={o.type} /></td>
                <td className="p-3">{partnerById.get(o.partnerId)?.name || "—"}</td>
                <td className="p-3">
                  {goodById.get(o.goodId)?.name || "—"}
                  {o.notes && <div className="text-xs text-slate-400">{o.notes}</div>}
                </td>
                <td className={`p-3 text-right font-medium whitespace-nowrap ${o.type === "in" ? "text-emerald-700" : "text-rose-700"}`}>
                  {o.type === "in" ? "+" : "−"}{fmt(num(o.qty))}{" "}
                  <span className="text-xs text-slate-400 font-normal">{o.unit}</span>
                </td>
                <td className="p-3 text-xs text-slate-500">{o.operator || "—"}</td>
                {canEdit && (
                  <td className="p-3 text-right whitespace-nowrap">
                    <button onClick={() => setEditing(o)} className="text-slate-500 hover:text-purple-600 p-1">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => onDelete(o)} className="text-slate-500 hover:text-red-600 p-1 ml-1">
                      <Trash2 size={14} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={canEdit ? 8 : 7} className="p-8 text-center text-slate-400">{t("wvw.empty")}</td></tr>
            )}
          </tbody>
          {rows.length > 0 && (
            <tfoot className="bg-slate-50 font-bold">
              <tr className="border-t border-slate-200">
                <td className="p-3" colSpan={5}>
                  {t("wvw.total")} <span className="font-normal text-slate-500">· {rows.length}</span>
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <span className="text-emerald-700">+{fmt(sum.inn)}</span>{" "}
                  <span className="text-rose-700">−{fmt(sum.out)}</span>
                </td>
                <td colSpan={canEdit ? 2 : 1}></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {(creating || editing) && (
        <Modal
          large
          title={
            editing
              ? t("wvw.editOp")
              : t(creating === "in" ? "wvw.newInTitle" : "wvw.newOutTitle")
          }
          onClose={() => { setCreating(null); setEditing(null); }}
        >
          <OpForm
            type={(editing?.type || creating) as OpType}
            editing={editing}
            ops={ops} goods={goods} partners={partners} stores={stores}
            operator={operator}
            onCancel={() => { setCreating(null); setEditing(null); }}
            onSave={async (r) => { await onSave(r); setCreating(null); setEditing(null); }}
          />
        </Modal>
      )}
    </div>
  );
}

// One form for both jobs: a NEW document takes several lines and saves one
// ledger row per line; EDITING changes a single existing row.
function OpForm({ type, editing, ops, goods, partners, stores, operator, onSave, onCancel }: {
  type: OpType; editing: Op | null;
  ops: Op[]; goods: Good[]; partners: Partner[]; stores: Store[];
  operator: string;
  onSave: (rows: Op[]) => Promise<void>; onCancel: () => void;
}) {
  const t = useT();
  const nextDoc = useMemo(
    () => ops.filter((o) => o.type === type).reduce((m, o) => Math.max(m, num(o.docNum)), 0) + 1,
    [ops, type],
  );
  const [head, setHead] = useState({
    date: editing?.date || todayISO(),
    docNum: String(editing?.docNum ?? nextDoc),
    partnerId: editing?.partnerId || "",
    // With a single warehouse there is nothing to choose.
    storeId: editing?.storeId || (stores.length === 1 ? stores[0].id : ""),
    notes: editing?.notes || "",
  });
  const [lines, setLines] = useState<{ key: string; goodId: string; qty: string }[]>([
    { key: uid(), goodId: editing?.goodId || "", qty: editing ? String(editing.qty) : "" },
  ]);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  // What is on the shelf for a good at the chosen warehouse, not counting the
  // row being edited — otherwise lowering an outgoing quantity would be
  // checked against a balance that already had the old quantity taken out.
  const available = useCallback(
    (goodId: string) =>
      ops
        .filter((o) => o.goodId === goodId && o.storeId === head.storeId && o.id !== editing?.id)
        .reduce((s, o) => s + signed(o), 0),
    [ops, head.storeId, editing],
  );

  const setLine = (key: string, patch: Partial<{ goodId: string; qty: string }>) =>
    setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));

  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setErr("");
    const filled = lines.filter((l) => l.goodId || l.qty);
    if (!head.date || !head.partnerId || !head.storeId) return setErr(t("wvw.err.head"));
    if (!filled.length || filled.some((l) => !l.goodId || num(l.qty) <= 0)) {
      return setErr(t("wvw.err.lines"));
    }
    if (type === "out") {
      // Summed per good first: two lines of the same good must not each pass
      // on their own and overdraw together.
      const want: Record<string, number> = {};
      for (const l of filled) want[l.goodId] = (want[l.goodId] || 0) + num(l.qty);
      for (const [goodId, qty] of Object.entries(want)) {
        const have = available(goodId);
        if (qty > have + 1e-9) {
          const g = goods.find((x) => x.id === goodId);
          return setErr(`${t("wvw.err.overdraw")}: ${g?.name || ""} — ${fmt(have)} ${g?.unit || ""}`);
        }
      }
    }
    const rows: Op[] = filled.map((l, i) => ({
      ...(editing || {}),
      id: editing && i === 0 ? editing.id : uid(),
      date: head.date,
      docNum: num(head.docNum),
      type,
      partnerId: head.partnerId,
      storeId: head.storeId,
      goodId: l.goodId,
      qty: num(l.qty),
      unit: goods.find((g) => g.id === l.goodId)?.unit || "",
      notes: head.notes.trim(),
      operator: editing?.operator || operator,
      createdAt: editing?.createdAt || new Date().toISOString(),
    }));
    setSaving(true);
    try {
      await onSave(rows);
    } catch (e2: any) {
      setErr(e2?.message || t("wvw.saveFailed"));
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label={t("wvw.date")}>
          <input
            type="date" value={head.date} className={INPUT}
            onChange={(e) => setHead({ ...head, date: e.target.value })}
          />
        </Field>
        <Field label={t("wvw.docNum")}>
          <input
            type="number" min={1} value={head.docNum} className={INPUT}
            onChange={(e) => setHead({ ...head, docNum: e.target.value })}
          />
        </Field>
        <Field label={t(type === "in" ? "wvw.from" : "wvw.to")}>
          <select
            value={head.partnerId} className={INPUT}
            onChange={(e) => setHead({ ...head, partnerId: e.target.value })}
          >
            <option value="">{t("wvw.select")}</option>
            {partners.map((p) => <option key={p.id} value={p.id}>{p.code} · {p.name}</option>)}
          </select>
        </Field>
        <Field label={t("wvw.store")}>
          <select
            value={head.storeId} className={INPUT}
            onChange={(e) => setHead({ ...head, storeId: e.target.value })}
          >
            <option value="">{t("wvw.select")}</option>
            {stores.map((s) => <option key={s.id} value={s.id}>{s.code} · {s.name}</option>)}
          </select>
        </Field>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-slate-700">{t("wvw.lines")}</div>
        {lines.map((l) => {
          const g = goods.find((x) => x.id === l.goodId);
          return (
            <div key={l.key} className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <select
                  value={l.goodId} className={INPUT}
                  onChange={(e) => setLine(l.key, { goodId: e.target.value })}
                >
                  <option value="">{t("wvw.selectGood")}</option>
                  {goods.map((x) => <option key={x.id} value={x.id}>{x.code} · {x.name}</option>)}
                </select>
                {g && head.storeId && (
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t("wvw.onHand")}: {fmt(available(g.id))} {g.unit}
                  </div>
                )}
              </div>
              <input
                type="number" min={0} step="any" value={l.qty} placeholder={t("wvw.qty")}
                className={`${INPUT} !w-32 text-right`}
                onChange={(e) => setLine(l.key, { qty: e.target.value })}
              />
              {!editing && lines.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLines((ls) => ls.filter((x) => x.key !== l.key))}
                  className="p-2.5 text-slate-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          );
        })}
        {!editing && (
          <button
            type="button"
            onClick={() => setLines((ls) => [...ls, { key: uid(), goodId: "", qty: "" }])}
            className="text-sm text-amber-700 hover:underline flex items-center gap-1"
          >
            <Plus size={14} /> {t("wvw.addLine")}
          </button>
        )}
      </div>

      <Field label={t("wvw.notes")}>
        <input
          value={head.notes} className={INPUT}
          onChange={(e) => setHead({ ...head, notes: e.target.value })}
        />
      </Field>

      {err && <div className="bg-red-50 text-red-700 text-sm rounded-lg p-2.5">{err}</div>}
      <FormFooter onCancel={onCancel} saving={saving} />
    </form>
  );
}

// ============== REPORTS ==============
type ReportKind = "turnover" | "card" | "partners";

function ReportsTab({ ops, goods, partners, cardGoodId, setCardGoodId }: {
  ops: Op[]; goods: Good[]; partners: Partner[];
  cardGoodId: string; setCardGoodId: (id: string) => void;
}) {
  const t = useT();
  // Arriving from Stock with a good already picked means "show me its card".
  const [kind, setKind] = useState<ReportKind>(cardGoodId ? "card" : "turnover");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(todayISO());

  const inPeriod = useCallback(
    (o: Op) => (!from || o.date >= from) && (!to || o.date <= to),
    [from, to],
  );
  const partnerById = useMemo(() => new Map(partners.map((p) => [p.id, p])), [partners]);

  // Turnover: what was there when the period opened, what moved, what is left.
  const turnover = useMemo(
    () =>
      goods
        .map((g) => {
          let opening = 0;
          let inn = 0;
          let out = 0;
          for (const o of ops) {
            if (o.goodId !== g.id) continue;
            if (from && o.date < from) opening += signed(o);
            else if (inPeriod(o)) {
              if (o.type === "in") inn += num(o.qty);
              else out += num(o.qty);
            }
          }
          return { ...g, opening, inn, out, closing: opening + inn - out };
        })
        .filter((r) => r.opening || r.inn || r.out),
    [goods, ops, from, inPeriod],
  );

  // Card: one good's movements, oldest first, with the balance after each.
  const card = useMemo(() => {
    if (!cardGoodId) return { opening: 0, rows: [] as (Op & { balance: number })[] };
    const mine = ops.filter((o) => o.goodId === cardGoodId);
    const opening = mine.filter((o) => from && o.date < from).reduce((s, o) => s + signed(o), 0);
    let bal = opening;
    const rows = mine
      .filter(inPeriod)
      .sort((a, b) => -byDateDesc(a, b))
      .map((o) => ({ ...o, balance: (bal += signed(o)) }));
    return { opening, rows };
  }, [ops, cardGoodId, from, inPeriod]);

  const byPartner = useMemo(() => {
    const acc = new Map<string, { partnerId: string; goodId: string; inn: number; out: number }>();
    for (const o of ops) {
      if (!inPeriod(o)) continue;
      const k = `${o.partnerId}|${o.goodId}`;
      const a = acc.get(k) || { partnerId: o.partnerId, goodId: o.goodId, inn: 0, out: 0 };
      if (o.type === "in") a.inn += num(o.qty);
      else a.out += num(o.qty);
      acc.set(k, a);
    }
    const goodById = new Map(goods.map((g) => [g.id, g]));
    return [...acc.values()]
      .map((a) => ({
        ...a,
        partner: partnerById.get(a.partnerId)?.name || "—",
        good: goodById.get(a.goodId)?.name || "—",
        unit: goodById.get(a.goodId)?.unit || "",
      }))
      .sort((a, b) => a.partner.localeCompare(b.partner) || a.good.localeCompare(b.good));
  }, [ops, goods, partnerById, inPeriod]);

  function exportReport() {
    if (kind === "turnover") {
      exportToCSV(
        turnover.map((r) => ({
          code: r.code, name: r.name, unit: r.unit,
          opening: r.opening, in: r.inn, out: r.out, closing: r.closing,
        })),
        "weaving_warehouse_turnover",
      );
    } else if (kind === "card") {
      exportToCSV(
        card.rows.map((o) => ({
          date: o.date, docNum: o.docNum, type: o.type,
          partner: partnerById.get(o.partnerId)?.name || "",
          in: o.type === "in" ? o.qty : "", out: o.type === "out" ? o.qty : "",
          balance: o.balance,
        })),
        "weaving_warehouse_card",
      );
    } else {
      exportToCSV(
        byPartner.map((r) => ({ partner: r.partner, good: r.good, unit: r.unit, in: r.inn, out: r.out })),
        "weaving_warehouse_partners",
      );
    }
  }

  const kinds: { id: ReportKind; label: string }[] = [
    { id: "turnover", label: t("wvw.rep.turnover") },
    { id: "card", label: t("wvw.rep.card") },
    { id: "partners", label: t("wvw.rep.partners") },
  ];

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        {kinds.map((k) => (
          <button
            key={k.id}
            onClick={() => setKind(k.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              kind === k.id ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {k.label}
          </button>
        ))}
        <div className="flex-1" />
        {kind === "card" && (
          <select value={cardGoodId} onChange={(e) => setCardGoodId(e.target.value)} className={FILTER}>
            <option value="">{t("wvw.selectGood")}</option>
            {goods.map((g) => <option key={g.id} value={g.id}>{g.code} · {g.name}</option>)}
          </select>
        )}
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={FILTER} />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={FILTER} />
        <ExportBtn onClick={exportReport} />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        {kind === "turnover" && (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className={`text-left ${TH}`}>{t("wvw.code")}</th>
                <th className={`text-left ${TH}`}>{t("wvw.good")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.opening")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.in")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.out")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.closing")}</th>
              </tr>
            </thead>
            <tbody>
              {turnover.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-mono text-xs">{r.code}</td>
                  <td className="p-3 font-medium">{r.name}</td>
                  <td className="p-3 text-right text-slate-500">{fmt(r.opening)}</td>
                  <td className="p-3 text-right text-emerald-700">{fmt(r.inn)}</td>
                  <td className="p-3 text-right text-rose-700">{fmt(r.out)}</td>
                  <td className="p-3 text-right font-bold">{fmt(r.closing)}</td>
                </tr>
              ))}
              {!turnover.length && (
                <tr><td colSpan={6} className="p-8 text-center text-slate-400">{t("wvw.empty")}</td></tr>
              )}
            </tbody>
            {turnover.length > 0 && (
              <tfoot className="bg-slate-50 font-bold">
                <tr className="border-t border-slate-200">
                  <td className="p-3" colSpan={2}>{t("wvw.total")}</td>
                  <td className="p-3 text-right">{fmt(turnover.reduce((s, r) => s + r.opening, 0))}</td>
                  <td className="p-3 text-right text-emerald-700">{fmt(turnover.reduce((s, r) => s + r.inn, 0))}</td>
                  <td className="p-3 text-right text-rose-700">{fmt(turnover.reduce((s, r) => s + r.out, 0))}</td>
                  <td className="p-3 text-right">{fmt(turnover.reduce((s, r) => s + r.closing, 0))}</td>
                </tr>
              </tfoot>
            )}
          </table>
        )}

        {kind === "card" && (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className={`text-left ${TH}`}>{t("wvw.date")}</th>
                <th className={`text-left ${TH}`}>{t("wvw.docNum")}</th>
                <th className={`text-left ${TH}`}>{t("wvw.partner")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.in")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.out")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.balance")}</th>
              </tr>
            </thead>
            <tbody>
              {cardGoodId && from && (
                <tr className="border-t border-slate-100 bg-slate-50/60">
                  <td className="p-3 text-slate-500" colSpan={5}>{t("wvw.opening")}</td>
                  <td className="p-3 text-right font-bold">{fmt(card.opening)}</td>
                </tr>
              )}
              {card.rows.map((o) => (
                <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 whitespace-nowrap">{o.date}</td>
                  <td className="p-3 font-mono text-xs">{o.docNum}</td>
                  <td className="p-3">{partnerById.get(o.partnerId)?.name || "—"}</td>
                  <td className="p-3 text-right text-emerald-700">{o.type === "in" ? fmt(num(o.qty)) : ""}</td>
                  <td className="p-3 text-right text-rose-700">{o.type === "out" ? fmt(num(o.qty)) : ""}</td>
                  <td className="p-3 text-right font-bold">{fmt(o.balance)}</td>
                </tr>
              ))}
              {!card.rows.length && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    {cardGoodId ? t("wvw.empty") : t("wvw.pickGood")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {kind === "partners" && (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className={`text-left ${TH}`}>{t("wvw.partner")}</th>
                <th className={`text-left ${TH}`}>{t("wvw.good")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.in")}</th>
                <th className={`text-right ${TH}`}>{t("wvw.out")}</th>
              </tr>
            </thead>
            <tbody>
              {byPartner.map((r) => (
                <tr key={`${r.partnerId}|${r.goodId}`} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-medium">{r.partner}</td>
                  <td className="p-3">{r.good}</td>
                  <td className="p-3 text-right text-emerald-700">{r.inn ? fmt(r.inn) : ""}</td>
                  <td className="p-3 text-right text-rose-700">{r.out ? fmt(r.out) : ""}</td>
                </tr>
              ))}
              {!byPartner.length && (
                <tr><td colSpan={4} className="p-8 text-center text-slate-400">{t("wvw.empty")}</td></tr>
              )}
            </tbody>
            {byPartner.length > 0 && (
              <tfoot className="bg-slate-50 font-bold">
                <tr className="border-t border-slate-200">
                  <td className="p-3" colSpan={2}>{t("wvw.total")}</td>
                  <td className="p-3 text-right text-emerald-700">{fmt(byPartner.reduce((s, r) => s + r.inn, 0))}</td>
                  <td className="p-3 text-right text-rose-700">{fmt(byPartner.reduce((s, r) => s + r.out, 0))}</td>
                </tr>
              </tfoot>
            )}
          </table>
        )}
      </div>
    </div>
  );
}

// ============== DIRECTORIES ==============
function DirsTab({ ops, rows, setRows, canEdit, askConfirm }: {
  ops: Op[];
  rows: Record<DirKind, DirRow[]>;
  setRows: Record<DirKind, (fn: (prev: DirRow[]) => DirRow[]) => void>;
  canEdit: boolean;
  askConfirm: AppContext["askConfirm"];
}) {
  const t = useT();
  const [kind, setKind] = useState<DirKind>("goods");
  const [editing, setEditing] = useState<DirRow | null>(null);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const cfg = DIRS[kind];
  const list = rows[kind];

  const used = useMemo(() => new Set(ops.map((o) => o[cfg.opField])), [ops, cfg]);

  function startNew() {
    setErr("");
    setEditing({
      id: uid(), code: nextCode(list, cfg.codeLen), name: "",
      ...(kind === "goods" ? { unit: "metr" } : {}),
    });
  }

  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!editing) return;
    const row = { ...editing, code: editing.code.trim(), name: editing.name.trim() };
    if (!row.code || !row.name) return setErr(t("wvw.err.codeName"));
    if (list.some((x) => x.id !== row.id && x.code === row.code)) return setErr(t("wvw.err.dupCode"));
    setSaving(true);
    try {
      await storage.set(`${cfg.prefix}${row.id}`, row);
      setRows[kind]((prev) => upsert(prev, row).sort(byCode));
      setEditing(null);
    } catch (e2: any) {
      setErr(e2?.message || t("wvw.saveFailed"));
    }
    setSaving(false);
  }

  function remove(row: DirRow) {
    askConfirm(`${t("common.delete")}: ${row.name}?`, async () => {
      try {
        await storage.delete(`${cfg.prefix}${row.id}`);
        setRows[kind]((prev) => prev.filter((x) => x.id !== row.id));
      } catch {
        /* the row stays on screen, which is the truth */
      }
    });
  }

  const kinds: { id: DirKind; label: string }[] = [
    { id: "goods", label: t("wvw.dir.goods") },
    { id: "partners", label: t("wvw.dir.partners") },
    { id: "stores", label: t("wvw.dir.stores") },
  ];

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        {kinds.map((k) => (
          <button
            key={k.id}
            onClick={() => setKind(k.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              kind === k.id ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {k.label} <span className="opacity-60">{rows[k.id].length}</span>
          </button>
        ))}
        <div className="flex-1" />
        {canEdit && (
          <button
            onClick={startNew}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Plus size={15} /> {t("common.add")}
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {cfg.fields.map((fld) => (
                <th key={fld.key} className={`text-left ${TH}`}>{t(fld.label)}</th>
              ))}
              {canEdit && <th className="p-3 w-20"></th>}
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 hover:bg-slate-50">
                {cfg.fields.map((fld) => (
                  <td key={fld.key} className={`p-3 ${fld.key === "code" ? "font-mono text-xs" : ""}`}>
                    {row[fld.key] || "—"}
                  </td>
                ))}
                {canEdit && (
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => { setErr(""); setEditing(row); }}
                      className="text-slate-500 hover:text-purple-600 p-1"
                    >
                      <Edit2 size={14} />
                    </button>
                    {/* A row the ledger points at cannot go: its movements
                        would be left naming nothing. */}
                    <button
                      onClick={() => remove(row)}
                      disabled={used.has(row.id)}
                      title={used.has(row.id) ? t("wvw.inUse") : undefined}
                      className="text-slate-500 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-500 p-1 ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {!list.length && (
              <tr>
                <td colSpan={cfg.fields.length + 1} className="p-8 text-center text-slate-400">
                  {t("wvw.empty")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal
          title={kinds.find((k) => k.id === kind)?.label || ""}
          onClose={() => setEditing(null)}
        >
          <form onSubmit={submit} className="space-y-3">
            {cfg.fields.map((fld) => (
              <Field key={fld.key} label={t(fld.label)}>
                <input
                  value={editing[fld.key] || ""} className={INPUT}
                  onChange={(e) => setEditing({ ...editing, [fld.key]: e.target.value })}
                />
              </Field>
            ))}
            {err && <div className="bg-red-50 text-red-700 text-sm rounded-lg p-2.5">{err}</div>}
            <FormFooter onCancel={() => setEditing(null)} saving={saving} />
          </form>
        </Modal>
      )}
    </div>
  );
}
