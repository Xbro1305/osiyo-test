// ---------------------------------------------------------------------------
// Extracted verbatim from src/App.tsx. Moved out to shrink the monolith;
// the contents are unchanged.
// ---------------------------------------------------------------------------

import { Layers, Printer, Scissors, Store } from "lucide-react";

// ============== DEPARTMENTS (SUPER-STATIONS) ==============
// Each department is a top-level section of the app. Some contain sub-stations (like Printing).
export const DEPARTMENTS = [
  {
    id: "weaving",
    name: "Weaving",
    icon: Layers,
    color: "bg-amber-600",
    gradient: "from-amber-500 to-orange-600",
    description: "Yarn → loom → greige fabric",
    status: "placeholder", // not yet built
  },
  {
    id: "printing",
    name: "Printing",
    icon: Printer,
    color: "bg-purple-600",
    gradient: "from-purple-600 to-indigo-600",
    description: "Full printing pipeline: input → dispatch",
    status: "active",
  },
  {
    id: "stitching",
    name: "Stitching",
    icon: Scissors,
    color: "bg-rose-600",
    gradient: "from-rose-500 to-pink-600",
    description: "Stitching units 1 & 2",
    status: "placeholder",
  },
  {
    id: "store",
    name: "Local Market Store",
    icon: Store,
    color: "bg-emerald-600",
    gradient: "from-emerald-500 to-teal-600",
    description: "Customers, stock, sales & debt ledger",
    status: "active",
  },
];
