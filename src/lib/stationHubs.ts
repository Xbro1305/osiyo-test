// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { Factory, Package, Sparkles, Warehouse } from "lucide-react";
import { STAGES } from "../config/stages";

export const MERGED_STATION_GROUPS: {
  id: string; // hub identifier ("sing_des_hub" | "stenter_hub")
  label: string; // display label for the hub tile
  members: string[]; // station ids unified under this hub
  icon: any; // lucide icon for the tile
  color: string; // tailwind bg class for the tile
  description: string; // small subtitle in the hub
  // Where the hub tile sits in the dept-home station grid. Null = put it
  // at the front. Otherwise: render this hub directly AFTER the visible
  // station whose id matches insertAfter. Used to keep hub tiles in the
  // pipeline reading order even though they're a separate data source
  // from the per-station list.
  insertAfter: string | null;
}[] = [
  {
    id: "sing_des_hub",
    label: "SING&DES",
    members: ["gray_store", "input"],
    icon: Factory,
    color: "bg-slate-500",
    description: "Gray fabric store + SING&DES input — one operator",
    insertAfter: null, // first tile
  },
  {
    id: "stenter_hub",
    label: "STENTER",
    members: ["batching", "finishing"],
    icon: Sparkles,
    color: "bg-pink-500",
    description: "Batching + finishing (stenter) — one operator",
    insertAfter: "bleach", // STENTER sits right after Jiggers (Bleaching)
  },
  {
    // Folding & Inspection now contains two stations: the Folding &
    // Inspection station itself and the Dispatch (Warehouse) pocket.
    // Same one-operator hub pattern as SING&DES / STENTER.
    id: "folding_hub",
    label: "Folding & Inspection",
    members: ["folding", "dispatch", "quality"],
    icon: Package,
    color: "bg-emerald-500",
    description: "Folding & inspection + dispatch warehouse — one operator",
    insertAfter: "calendering", // folding's normal pipeline position
  },
  {
    // Ombor is where a shipment actually leaves the factory, so the two QR
    // screens live here rather than in the top bar: the order is written and
    // its labels printed in the warehouse, and the truck is scanned at its
    // ramp. The hub has a single member station — the extra cards inside it
    // are the Orders and Loading pages, which are routes rather than stations
    // (see StationHubView in App.tsx).
    id: "ombor_hub",
    label: "Ombor",
    members: ["ombor"],
    icon: Warehouse,
    color: "bg-amber-500",
    description: "Warehouse, orders and truck loading — one operator",
    // Last in the pipeline. Listed after folding_hub so that when both anchor
    // to calendering the tiles still come out in pipeline order.
    insertAfter: "calendering",
  },
];

// Given a stationId, returns the hub it belongs to (if any). Used by the
// auth checks below — a user assigned to gray_store should be allowed
// into input as well.
export function findHubForStation(stationId: string) {
  return MERGED_STATION_GROUPS.find((g) => g.members.includes(stationId));
}

// ============================================================================
//  Hub-as-stationId support
// ----------------------------------------------------------------------------
//  Operators can be assigned to a stationId that refers to a HUB rather than
//  a single station: `sing_des` or `stenter`. These are first-class
//  stationId values throughout the codebase. The mapping below is the
//  single source of truth — change it here to add a third hub later.
//
//  Helpers:
//    isHubStationId(s)        — true if `s` is a hub identifier
//    membersOfHubId(s)        — array of member station ids the hub spans
//    landingStationFor(s)     — when an operator with this stationId lands,
//                               which station view should be shown? For a
//                               real station, itself. For a hub, the first
//                               member (the "primary" tab).
//    coversStation(uS, tS)    — does an operator's stationId give them
//                               access to the target station id? Handles
//                               hub-vs-real and real-vs-real cases.
//    stationDisplayName(s)    — pretty label (hub label OR station name).
// ============================================================================
export const HUB_STATION_IDS: Record<string, string> = {
  sing_des: "sing_des_hub", // maps operator's stationId → matching hub
  stenter: "stenter_hub",
  folding_hub: "folding_hub", // Folding & Inspection + Dispatch + Quality & R&D
  // `ombor` is a REAL station id as well as a hub key, which none of the
  // others are. It is listed here so the storekeeper LANDS on the hub rather
  // than straight in the station's data entry — the hub is the only way to
  // reach Orders and Truck loading now that they are no longer in the top bar,
  // and the storekeeper is exactly who needs them.
  //
  // Safe because the hub has a single member with the same id: every helper
  // below resolves `ombor` to the same station it did before. Only the landing
  // view changes.
  ombor: "ombor_hub",
};
export function isHubStationId(s: string | undefined | null): boolean {
  return !!s && Object.prototype.hasOwnProperty.call(HUB_STATION_IDS, s);
}
export function findHubByStationId(s: string | undefined | null) {
  if (!s) return undefined;
  const hubId = HUB_STATION_IDS[s];
  if (!hubId) return undefined;
  return MERGED_STATION_GROUPS.find((g) => g.id === hubId);
}
export function membersOfHubId(s: string | undefined | null): string[] {
  const hub = findHubByStationId(s);
  return hub ? hub.members : [];
}
export function landingStationFor(s: string | undefined | null): string {
  if (!s) return "";
  if (isHubStationId(s)) return membersOfHubId(s)[0] || "";
  return s;
}
export function coversStation(
  operatorStationId: string,
  targetStationId: string,
): boolean {
  if (!operatorStationId || !targetStationId) return false;
  if (operatorStationId === targetStationId) return true;
  // Hub operator can access any member station.
  if (isHubStationId(operatorStationId)) {
    return membersOfHubId(operatorStationId).includes(targetStationId);
  }
  // Real-station operator can access siblings via the symmetric hub rule.
  const hub = findHubForStation(operatorStationId);
  if (!hub) return false;
  return hub.members.includes(targetStationId);
}
export function stationDisplayName(s: string | undefined | null): string {
  if (!s) return "";
  if (isHubStationId(s)) return findHubByStationId(s)?.label || s;
  const stage = STAGES.find((x) => x.id === s);
  return stage?.name || s;
}

// ===== Multi-station operators =====
// An operator can be assigned SEVERAL individual stations. Those are stored as
// `printing.station.<id>` entries in allowedPages. When present, they are the
// EXACT set the operator can see (no hub auto-coverage). When absent, we fall
// back to the legacy single/hub `stationId` rule so existing users are
// unaffected.
export const ASSIGNABLE_STATIONS = [
  "gray_store",
  "input",
  "bleach",
  "batching",
  "printing",
  "curing",
  "finishing",
  "calendering",
  "folding",
  "quality",
  "rnd",
  "dispatch",
  "ombor",
];
export function operatorStationPages(user: any): string[] {
  return (user?.allowedPages || []).filter((p: string) =>
    p.startsWith("printing.station."),
  );
}
export function operatorStationIds(user: any): string[] {
  return operatorStationPages(user).map((p) =>
    p.slice("printing.station.".length),
  );
}
export function isMultiStationOperator(user: any): boolean {
  return user?.role === "operator" && operatorStationPages(user).length > 0;
}
export function userCoversStation(user: any, target: string): boolean {
  if (!user || !target) return false;
  if (isMultiStationOperator(user))
    return operatorStationPages(user).includes(`printing.station.${target}`);
  return coversStation(user.stationId || "", target);
}

// Hub view: small page with one card per member station. Each card links
// to the regular StationView for that station, so the existing data
// entry UI is unchanged.
