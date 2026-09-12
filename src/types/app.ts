// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { Store } from "lucide-react";
import React from "react";

// ============== SHARED TYPES ================================
// ============================================================
// Domain types used across the artifact. Keep these as a single source of
// truth so component prop interfaces stay consistent. Most fields are
// optional because records evolve over time and old documents may lack newer
// fields — runtime code already guards with || 0 / ?? '' / .filter(Boolean).
//
// We DO NOT lock these down with strict required fields, because forcing a
// shape would break against the live MongoDB data which has years of drift.

// --- User ---
export type Role = "admin" | "dept_admin" | "operator" | "guest";
export interface User {
  id: string;
  name: string;
  login: string;
  passcode?: string; // never present on responses; only on creation requests
  role: Role;
  departmentId?: string | null;
  stationId?: string | null;
  allowedPages?: string[];
  allowedDepartments?: string[];
  active?: boolean;
  // Transient — set in the form when creating a brand-new user (not persisted).
  _isNew?: boolean;
}

// --- Design (uploaded image used as print pattern OR dyeing color swatch) ---
export interface Design {
  id: string;
  designNumber: string;
  name?: string;
  imageUrl?: string; // server-side path, e.g. /uploads/designs/abc.png
  imageData?: string; // legacy: inline base64 dataURL (kept for back-compat)
  notes?: string;
}

// --- Machine ---
export interface Machine {
  id: string;
  name: string;
  stationId: string;
  model?: string;
  purchaseDate?: string;
  specs?: string;
  notes?: string;
}

// --- Program (printing or dyeing) ---
export interface ProgramLine {
  id: string;
  designNumber?: string;
  designName?: string;
  fabricType?: string;
  qty?: number | string;
  foldingPlan?: string;
}
export interface Program {
  id: string;
  name: string;
  programType?: "printing" | "dyeing";
  status?: string;
  createdAt?: string;
  lines?: ProgramLine[];
  notes?: string;
}

// --- Customer / Store entities (Local Market) ---
export interface Customer {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt?: string;
  // Optional descriptors used in some screens.
  code?: string;
  type?: string;
}
export interface StoreSale {
  id: string;
  date: string;
  customerId: string;
  fabricType?: string;
  // ----- Mirroring Stock In's variant shape -----
  // The stock-out (sale) form also picks a design or color so we can track
  // which variant left the building. Optional everywhere for back-compat
  // with older records that didn't capture this.
  stockFabricType?: string;
  fabricState?: "printed" | "dyed";
  // designId can be a real Design._id, "mix" (multiple designs in one entry,
  // not separable), or "remainder" (mixed-design leftover bin, pooled across
  // all designs — has its own row on Current Stock and is sellable).
  designId?: string | "mix" | "remainder";
  hexColor?: string;
  // ----- Roll-line capture (v3 + multi-design v5) -----
  // When unit=rolls, sales record which specific roll lengths are being
  // sold (e.g. "5 × 30m + 2 × 50m"). Pairing this with Stock In's
  // rollLines lets the on-hand-per-length math be exact rather than a
  // FIFO guess.
  //
  // v5: each line now optionally carries its OWN variant info (designId,
  // hexColor, colorName, fabricType). This lets a single sale span
  // multiple designs/colors/fabric types. When per-line variant is
  // present, the sale's top-level variant fields are treated as a hint
  // only — the canonical source is each line. Legacy sales without per-
  // line variant still work: readers fall back to the top-level fields.
  rollLines?: {
    length: number;
    qty: number;
    // v5 — multi-design per line. All optional for back-compat.
    designId?: string;
    hexColor?: string;
    colorName?: string;
    fabricType?: string;
  }[];
  extraMeters?: number;
  qty?: number;
  unit?: string;
  unitPrice?: number;
  totalAmount?: number;
  paidAmount?: number;
  invoiceNumber?: string;
  notes?: string;
  operator?: string;
}
export interface StorePayment {
  id: string;
  date: string;
  customerId: string;
  // Number when persisted; string while being edited in the form (empty input).
  amount?: number | string;
  reference?: string;
  notes?: string;
  operator?: string;
  paymentMethod?: string;
}
export interface StoreStockIn {
  id: string;
  date: string;
  fabricType?: string;
  // NEW (v2 stock-in shape): a more granular fabric-type list used only in
  // the store (separate from the production-side fabricType list).
  stockFabricType?: string;
  // NEW: incoming state of the fabric — only "printed" or "dyed" today.
  fabricState?: "printed" | "dyed";
  // NEW: design reference (when fabricState=printed). "mix" means the
  // record contains rolls of multiple designs in one entry. "remainder"
  // means it goes into the shared "mixed remainder" bin — small leftover
  // pieces from many runs pooled together.
  designId?: string | "mix" | "remainder";
  // NEW: hex color string (when fabricState=dyed). Includes the leading '#'.
  hexColor?: string;
  // NEW: roll lines (when unit=rolls). Each line is e.g. 34×30m.
  rollLines?: { length: number; qty: number }[];
  // NEW: bulk meters alongside roll lines (when unit=rolls).
  // For e.g. "34 rolls × 30m + a separate 76m piece".
  extraMeters?: number;
  // NEW: per-meter cost. Total cost = qty × costPerMeter.
  costPerMeter?: number;
  // NEW (v3): free-text color name for dyed fabric. Used as the display
  // label alongside the hex code — operators name colors like "Royal Blue"
  // or "Sea Green" rather than reading hex codes. Optional.
  colorName?: string;
  // Legacy: kept for back-compat with older records. New records still set
  // `qty` to the computed total (sum of rollLines + extraMeters when rolls,
  // or the raw qty when meters) so downstream code keeps working.
  qty?: number;
  unit?: string;
  source?: string;
  // Legacy field — was removed from the UI in v3 but kept on the type so
  // older records still validate.
  lotNumber?: string;
  // Legacy field — old records stored cost-per-unit here. New records also
  // mirror their costPerMeter into costPrice so reads keep working.
  costPrice?: number;
  notes?: string;
  operator?: string;
}

// --- Record (production record at any station) ---
// Records are loosely typed because each station has its own fields.
// Common fields are listed; the rest is open-ended.
export interface ProductionRecord {
  id: string;
  date?: string;
  shift?: string;
  machine?: string;
  operator?: string;
  notes?: string;
  // Print/dye chain fields (optional per station):
  printNo?: string;
  dyeingNo?: string;
  cardSource?: "printing" | "dyeing";
  programId?: string;
  designNumber?: string;
  // Catch-all — Mongo gives us anything else.
  [key: string]: any;
}

// Map of stationKey → list of records.
export type RecordsMap = Record<string, ProductionRecord[]>;

// --- Lists (dropdowns) ---
// Lists are keyed by name. Most entries are simple string arrays (legacy
// shape). `stockFabricType` is the exception — v4 uses `{name, cost}[]`.
// We declare the type loosely (any[]) and let the call sites narrow.
export type Lists = Record<string, any[]>;

// --- Numbering settings ---
export interface NumberingConfig {
  presetId?: string;
  prefix?: string;
  nextSeq?: number;
  resetEachMonth?: boolean;
}
export interface NumberingSettings {
  inputBatch?: NumberingConfig;
  printNumber?: NumberingConfig;
  dyeingNumber?: NumberingConfig;
}

// --- Trash bin entry ---
export interface TrashEntry {
  id: string;
  type: string; // e.g. 'rec_input', 'user', 'design'
  recordId: string;
  item: any;
  deletedAt: string;
  deletedBy?: string;
}

// --- Current view (the React Router stand-in) ---
export interface CurrentView {
  type: string;
  departmentId?: string;
  stationId?: string;
  customerId?: string;
  [k: string]: any;
}

// --- AppContext (passed as `ctx` to most components) ---
// This single context holds all the app's state and mutators. Because the
// artifact threads `ctx` through nearly everything, typing it here gives us
// most of the type-safety value with minimal annotation churn elsewhere.
export interface AppContext {
  // Auth
  user: User;
  setUser: (u: User | null) => void;
  // Lookups
  users: User[];
  designs: Design[];
  machines: Machine[];
  lists: Lists;
  programs: Program[];
  numbering: NumberingSettings;
  records: RecordsMap;
  // Local Market Store
  customers: Customer[];
  storeStockIn: StoreStockIn[];
  storeSales: StoreSale[];
  storePayments: StorePayment[];
  // Mutators
  saveUser: (u: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  saveDesign: (d: Design) => Promise<void>;
  deleteDesign: (id: string) => Promise<void>;
  saveMachine: (m: Machine) => Promise<void>;
  deleteMachine: (id: string) => Promise<void>;
  saveProgram: (p: Program) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
  saveLists: (l: Lists) => Promise<void>;
  saveNumbering: (n: NumberingSettings) => Promise<void>;
  saveRecord: (stationKey: string, rec: ProductionRecord) => Promise<void>;
  deleteRecord: (stationKey: string, id: string) => Promise<void>;
  archiveRecords: (
    stationKey: string,
    ids: string[],
    unarchive?: boolean,
  ) => Promise<void>;
  archiveRecordsBefore: (
    stationKey: string,
    before: string,
    unarchive?: boolean,
  ) => Promise<{ modified: number }>;
  saveCustomer: (c: Customer) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  saveStoreSale: (s: StoreSale) => Promise<void>;
  deleteStoreSale: (id: string) => Promise<void>;
  saveStorePayment: (p: StorePayment) => Promise<void>;
  deleteStorePayment: (id: string) => Promise<void>;
  saveStoreStockIn: (s: StoreStockIn) => Promise<void>;
  deleteStoreStockIn: (id: string) => Promise<void>;
  // Trash
  trash: TrashEntry[];
  restoreFromTrash: (trashId: string) => Promise<void>;
  purgeTrash?: (trashId: string) => Promise<void>;
  // Navigation + UI
  currentView: CurrentView | null;
  setCurrentView: (v: CurrentView | null) => void;
  askConfirm: (
    message: string,
    onConfirm: () => void,
    confirmLabel?: string,
  ) => void;
  // Anything else the artifact threads through
  [key: string]: any;
}

// Common prop shape used by most station/data components.
export interface CtxProps {
  ctx: AppContext;
}
export interface CtxEditableProps {
  ctx: AppContext;
  canEdit?: boolean;
}
