// ---------------------------------------------------------------------------
// Extracted verbatim from src/App.tsx. Moved out to shrink the monolith;
// the contents are unchanged.
// ---------------------------------------------------------------------------

import { Database, Droplet, Factory, Flame, FlaskConical, Layers, Package, Printer, Sparkles, Truck, Warehouse, Wind } from "lucide-react";

export const STAGES = [
  {
    id: "gray_store",
    name: "Gray Fabric Store",
    icon: Database,
    color: "bg-stone-500",
    next: "input",
    hasMachine: false,
  },
  {
    id: "input",
    name: "SING&DES",
    icon: Factory,
    color: "bg-slate-500",
    next: "bleach",
    hasMachine: true,
  },
  {
    id: "bleach",
    name: "Jiggers",
    icon: Droplet,
    color: "bg-cyan-500",
    next: "batching",
    hasMachine: true,
  },
  {
    id: "batching",
    name: "Batching",
    icon: Wind,
    color: "bg-sky-500",
    next: "printing",
    hasMachine: true,
  },
  {
    id: "printing",
    name: "Printing",
    icon: Printer,
    color: "bg-purple-500",
    next: "curing",
    hasMachine: true,
  },
  {
    id: "curing",
    name: "Curing",
    icon: Flame,
    color: "bg-orange-500",
    next: "finishing",
    hasMachine: true,
  },
  {
    id: "finishing",
    name: "Finishing (Stenter)",
    icon: Sparkles,
    color: "bg-pink-500",
    next: "calendering",
    hasMachine: true,
  },
  {
    id: "calendering",
    name: "Calendering",
    icon: Layers,
    color: "bg-indigo-500",
    next: "folding",
    hasMachine: true,
  },
  {
    id: "folding",
    name: "Folding & Inspection",
    icon: Package,
    color: "bg-emerald-500",
    next: "dispatch",
    hasMachine: true,
  },
  {
    id: "quality",
    name: "Quality & R&D",
    icon: FlaskConical,
    color: "bg-teal-600",
    hasMachine: false,
  },
  {
    id: "dispatch",
    name: "Dispatch (Warehouse)",
    icon: Truck,
    color: "bg-green-600",
    next: "ombor",
    hasMachine: false,
  },
  {
    // Real physical warehouse — separate from Dispatch (Warehouse), which
    // is a computed "pocket" showing what folding produced. Ombor is
    // where the warehouse keeper physically tracks input/stock/output.
    // Sits at the end of the pipeline; final destination before goods
    // leave the factory floor.
    id: "ombor",
    name: "Ombor",
    icon: Warehouse,
    color: "bg-amber-600",
    next: null,
    hasMachine: false,
  },
];
