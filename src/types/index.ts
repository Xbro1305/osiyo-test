// src/types/index.ts

export type Role = 'admin' | 'operator' | 'guest';

export type StationId =
  | 'input' | 'bleach' | 'batching' | 'printing'
  | 'curing' | 'finishing' | 'calendering'
  | 'folding' | 'dispatch';

export type StationKey =
  | 'input' | 'bleach' | 'batching' | 'printing'
  | 'curing' | 'finishing' | 'calendering' | 'folding'
  | 'dispatch_out' | 'maintenance' | 'breakdown' | 'dailycheck';

export interface User {
  id: string;
  name: string;
  login: string;
  passcode?: string;
  role: Role;
  stationId: StationId | null;
  active: boolean;
}

export interface Stage {
  id: StationId;
  name: string;
  icon: any;
  color: string;
  next: StationId | null;
  hasMachine: boolean;
}

export interface Lists {
  fabricSource: string[];
  fabricType: string[];
  shift: string[];
  gas: string[];
  bleachType: string[];
  bleachMachine: string[];
  batchingMachine: string[];
  width: string[];
  printingMachine: string[];
  programType: string[];
  printingStatus: string[];
  curingStatus: string[];
  finishingMachine: string[];
  handFeel: string[];
  chemicalRecipe: string[];
  calenderingMachine: string[];
  foldingMachine: string[];
  rollingType: string[];
  dispatchDestination: string[];
  dispatchPerson: string[];
  maintenanceShift: string[];
  breakdownType: string[];
  [key: string]: string[];
}

export interface Design {
  id: string;
  designNumber: string;
  name?: string;
  imageData?: string;
  notes?: string;
}

export interface Machine {
  id: string;
  name: string;
  stationId: StationId;
  model?: string;
  purchaseDate?: string;
  specs?: string;
  notes?: string;
}

export interface BatcherUsage {
  batchingId: string;
  qty: number;
}

export interface BaseRecord {
  id: string;
  date: string;
  shift?: string;
  notes?: string;
  operator: string;
}

export interface InputRecord extends BaseRecord {
  batchNo: string;
  year: number;
  source: string;
  fabricType: string;
  gas: string;
  rolls: string | number;
  meters: string | number;
}

export interface BleachRecord extends BaseRecord {
  batchNo: string;
  bleachType: string;
  durationHours: string | number;
  machine: string;
  qty: string | number;
}

export interface BatchingRecord extends BaseRecord {
  sourceBatches: string[];
  qtyBefore: number;
  qtyAfter: string | number;
  extensionPct: number;
  width: string;
}

export interface PrintingRecord extends BaseRecord {
  printNo: string;
  programType: string;
  programFabricType: string;
  programQty: string | number;
  printedQty: string | number;
  status: string;
  designNumber: string;
  batcherUsage: BatcherUsage[];
}

export interface CuringRecord extends BaseRecord {
  printNo: string;
  speed: string | number;
  temperature: string | number;
  status: string;
  qty: string | number;
}

export interface FinishingRecord extends BaseRecord {
  printNo: string;
  finishedQty: string | number;
  handFeel: string;
  chemicalRecipe: string;
  width: string;
  machine: string;
  completion: 'COMPLETED' | 'NOT COMPLETED';
}

export interface CalenderingRecord extends BaseRecord {
  printNo: string;
  temperature: string | number;
  width: string;
  qty: string | number;
  machine: string;
  completion: 'COMPLETED' | 'NOT COMPLETED';
}

export interface FoldingRecord extends BaseRecord {
  printNo: string;
  width: string;
  rollingType: string;
  firstQty: string | number;
  incompleteQty: string | number;
  secondQty: string | number;
  rejectQty: string | number;
  totalMeters: number;
  machine: string;
  completion: 'COMPLETED' | 'NOT COMPLETED';
}

export interface DispatchOutRecord extends BaseRecord {
  designNumber: string;
  sortType: '1st' | '2nd' | 'reject';
  destination: string;
  sentBy: string;
  qty: string | number;
}

export interface MaintenanceRecord extends BaseRecord {
  stationId: StationId;
  machineId: string;
  type: 'maintenance' | 'cleaning';
  reason: string;
  actionTaken?: string;
  cost?: string;
}

export interface BreakdownRecord extends BaseRecord {
  stationId: StationId;
  machineId: string;
  type: string;
  cause: string;
  downtime: string | number;
  repairAction?: string;
  cost?: string;
  responsible?: string;
}

export interface DailyCheckRecord extends BaseRecord {
  stationId: StationId;
  machineId: string;
  temperature: string | number;
  pressure: string | number;
  speed: string | number;
  visualCheck: string;
}

export type AnyRecord =
  | InputRecord | BleachRecord | BatchingRecord | PrintingRecord
  | CuringRecord | FinishingRecord | CalenderingRecord | FoldingRecord
  | DispatchOutRecord | MaintenanceRecord | BreakdownRecord | DailyCheckRecord;

export interface RecordsState {
  input: InputRecord[];
  bleach: BleachRecord[];
  batching: BatchingRecord[];
  printing: PrintingRecord[];
  curing: CuringRecord[];
  finishing: FinishingRecord[];
  calendering: CalenderingRecord[];
  folding: FoldingRecord[];
  dispatch_out: DispatchOutRecord[];
  maintenance: MaintenanceRecord[];
  breakdown: BreakdownRecord[];
  dailycheck: DailyCheckRecord[];
  [key: string]: AnyRecord[];
}

export type View =
  | { type: 'home' }
  | { type: 'users' }
  | { type: 'lists' }
  | { type: 'gallery' }
  | { type: 'machines' }
  | { type: 'master' }
  | { type: 'master_maintenance' }
  | { type: 'station'; stationId: StationId };

export interface AppContext {
  user: User;
  users: User[];
  lists: Lists;
  designs: Design[];
  machines: Machine[];
  records: RecordsState;
  saveUser: (u: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  saveLists: (l: Lists) => Promise<void>;
  saveDesign: (d: Design) => Promise<void>;
  deleteDesign: (id: string) => Promise<void>;
  saveMachine: (m: Machine) => Promise<void>;
  deleteMachine: (id: string) => Promise<void>;
  saveRecord: (key: StationKey, r: AnyRecord) => Promise<void>;
  deleteRecord: (key: StationKey, id: string) => Promise<void>;
  setUser: (u: User | null) => void;
  currentView: View | null;
  setCurrentView: (v: View) => void;
  askConfirm: (message: string, onConfirm: () => void) => void;
}