// ---------------------------------------------------------------------------
// Extracted verbatim from src/App.tsx. Moved out to shrink the monolith;
// the contents are unchanged.
// ---------------------------------------------------------------------------

export const DEFAULT_LISTS = {
  fabricSource: [
    "Local Mill A",
    "Local Mill B",
    "Imported - Turkey",
    "Imported - China",
  ],
  fabricType: [
    "Cotton 100%",
    "Cotton/Poly 65/35",
    "Polyester 100%",
    "Viscose",
    "Linen Blend",
  ],
  shift: ["Shift A (Morning)", "Shift B (Afternoon)", "Shift C (Night)"],
  // Process stages a defect can be blamed on. Editable here (Settings →
  // Lists) instead of hard-coded, because the route changes when a machine
  // is added or a step is dropped.
  qcStage: [
    "Grey fabric",
    "Singeing",
    "Desizing",
    "Bleaching",
    "Printing",
    "Curing",
    "Finishing",
    "Calendering",
    "Folding / Inspection",
  ],
  gas: ["GAS", "NO GAS"],
  bleachType: ["Hydrogen Peroxide", "Optical Brightener", "Standard Bleach"],
  bleachMachine: ["Bleach Machine 1", "Bleach Machine 2"],
  batchingMachine: ["Batcher 1", "Batcher 2", "A-Frame 1", "A-Frame 2"],
  width: ["150cm", "160cm", "180cm", "220cm", "240cm"],
  printingMachine: ["Rotary Print 1", "Rotary Print 2", "Digital Print 1"],
  programType: ["Reactive", "Pigment", "Disperse", "Sublimation"],
  printingStatus: ["Completed", "Not Completed", "On Hold", "Reprint Needed"],
  curingStatus: ["Completed", "Not Completed"],
  finishingMachine: ["Stenter 1", "Stenter 2"],
  handFeel: ["Soft", "Medium", "Stiff", "Crispy"],
  chemicalRecipe: [
    "Recipe A - Standard",
    "Recipe B - Soft",
    "Recipe C - Anti-pilling",
  ],
  calenderingMachine: ["Calender 1", "Calender 2"],
  foldingMachine: ["Folding Machine 1", "Folding Machine 2"],
  rollingType: ["A-Frame", "50m Roll", "100m Roll", "Plait"],
  dispatchDestination: [
    "Customer A",
    "Customer B",
    "Customer C",
    "Internal Warehouse",
  ],
  dispatchPerson: ["Driver 1", "Driver 2", "Driver 3"],
  dispatchVehicle: [],
  dispatchSender: [],
  // Non-destructive correction lists (hidden from Lists admin — not in its
  // label map). Hold record/batcher IDs to EXCLUDE from a derived stock view
  // without deleting the underlying upstream records. Reversible.
  dispatchExcludeFolding: [], // folding record ids excluded from Dispatch stock "in"
  bleachedClosed: [], // batcher ids whose remaining bleached-stock balance is erased
  maintenanceShift: ["Shift A", "Shift B", "Shift C", "Maintenance Team"],
  breakdownType: [
    "Mechanical",
    "Electrical",
    "Software",
    "Wear & Tear",
    "Operator Error",
  ],
  // Daily check status options — super-admin can adjust to match factory's reporting habits.
  dailyCheckResult: ["OK", "Minor issue", "Needs attention", "Stop machine"],
  // Gray fabric source — where the un-bleached fabric came from.
  // OSIYO and ORZU are internal weaving departments (will dispatch to printing later).
  // FROM OUTSIDE is for fabric purchased / received from external suppliers.
  grayFabricSource: ["OSIYO", "ORZU", "FROM OUTSIDE"],
  // Destinations for gray fabric LEAVING the store outside the SING&DES pipeline
  // (e.g. sold raw, returned to weaving, transferred, written off).
  grayOutDestination: [
    "Sold to outside",
    "Returned to OSIYO",
    "Returned to ORZU",
    "Internal transfer",
    "Write-off",
  ],
  // ===== Local Market Store =====
  paymentMethod: ["Cash", "Bank Transfer", "Card", "Mixed"],
  storeUnit: ["meters", "rolls", "kg", "pieces"],
  customerType: ["Retail", "Wholesale", "Reseller", "Tailor", "Other"],
  storeStockSource: [
    "From Production (Dispatch)",
    "External Supplier",
    "Return / Refurbished",
    // Used when an operator records a manual stock correction (e.g. after
    // a physical count finds extra/missing meters that don't tie to any
    // dispatch or supplier).
    "Correction",
  ],
  // Granular fabric-type list for the local market store. Separate from the
  // production fabricType because the store sells finished fabric in
  // commercial categories that don't map 1:1 to what production tracks.
  //
  // v4 shape: { name, cost } per entry. Cost is per-meter and used as the
  // canonical selling/cost price for every record of that type. Legacy
  // string-only entries are still tolerated by the read helpers
  // (fabricCostMap / fabricNames / getFabricCost).
  stockFabricType: [
    { name: "Plain Cotton", cost: 0 },
    { name: "Printed Cotton", cost: 0 },
    { name: "Cotton Satin", cost: 0 },
    { name: "Voile", cost: 0 },
    { name: "Crepe", cost: 0 },
    { name: "Chiffon", cost: 0 },
    { name: "Linen", cost: 0 },
    { name: "Polyester", cost: 0 },
    { name: "Mixed Blend", cost: 0 },
  ] as any,
};
