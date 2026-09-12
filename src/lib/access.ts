// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { Store, Users, Warehouse } from "lucide-react";
import { DEPARTMENTS } from "../config/departments";
import { STAGES } from "../config/stages";
import { coversStation, isHubStationId, operatorStationPages } from "../lib/stationHubs";
import type { User } from "../types/app";

// ============== ACCESS CONTROL ==============
// Determine which departments a user is allowed to view/edit.
// Returns an array of department IDs.
export function getUserDepartments(user: User | null) {
  if (!user) return [];
  if (user.role === "admin") return DEPARTMENTS.map((d) => d.id);
  if (user.role === "dept_admin")
    return user.departmentId ? [user.departmentId] : [];
  if (user.role === "guest")
    return Array.isArray(user.allowedDepartments)
      ? user.allowedDepartments
      : [];
  if (user.role === "operator") {
    // operators currently belong to printing stations only
    return user.stationId || operatorStationPages(user).length
      ? ["printing"]
      : [];
  }
  return [];
}

// ============== PAGE CATALOG (for granular guest perms) ==============
// Each entry is a unique page key. Guests can be granted any subset.
// Non-guest roles (admin/dept_admin/operator) bypass these checks.
export const PAGES = {
  printing: [
    { key: "printing.master", label: "Master Tracking Dashboard" },
    { key: "printing.station.gray_store", label: "Station: Gray Fabric Store" },
    { key: "printing.station.input", label: "Station: SING&DES" },
    { key: "printing.station.bleach", label: "Station: Bleaching" },
    { key: "printing.station.batching", label: "Station: Batching" },
    { key: "printing.station.printing", label: "Station: Printing" },
    { key: "printing.station.curing", label: "Station: Curing" },
    { key: "printing.station.finishing", label: "Station: Finishing" },
    { key: "printing.station.calendering", label: "Station: Calendering" },
    { key: "printing.station.folding", label: "Station: Folding & Inspection" },
    { key: "printing.station.dispatch", label: "Station: Dispatch" },
    { key: "printing.station.ombor", label: "Station: Ombor (Warehouse)" },
  ],
  store: [
    { key: "store.customers", label: "Customers list" },
    { key: "store.stock_in", label: "Stock In" },
    { key: "store.stock", label: "Current Stock" },
    { key: "store.sales", label: "Sales / Stock Out" },
    { key: "store.payments", label: "Payments Received" },
  ],
  weaving: [{ key: "weaving.home", label: "Weaving (placeholder)" }],
  stitching: [{ key: "stitching.home", label: "Stitching (placeholder)" }],
};

/**
 * canViewPage(user, pageKey) — checks whether a user can see a specific page.
 * - admin: yes to everything
 * - dept_admin: yes to anything in their department
 * - operator: yes only to their own station's page
 * - guest: pageKey's department must be in allowedDepartments. AND
 *          either allowedPages is empty (= no per-page restriction → all
 *          pages in allowed departments are visible) OR allowedPages
 *          explicitly contains this pageKey.
 *
 * The "empty allowedPages = full access within allowed depts" rule is the
 * fix for an earlier bug where assigning a guest to a department but not
 * also ticking individual pages produced an empty department screen.
 * Treating allowedPages as an OPTIONAL fine-grained whitelist matches what
 * admins actually expect: "I gave them this department, they see it."
 */
export function canViewPage(user: User | null, pageKey: string) {
  if (!user || !pageKey) return false;
  if (user.role === "admin") return true;
  const deptId = pageKey.split(".")[0];
  if (user.role === "dept_admin") return user.departmentId === deptId;
  if (user.role === "operator") {
    if (deptId !== "printing") return false;
    // Explicit multi-station operators: allowedPages IS the whitelist.
    if (operatorStationPages(user).length) {
      return operatorStationPages(user).includes(pageKey);
    }
    // Legacy: match the pageKey to any station the user's stationId covers.
    // `coversStation` handles both single-station ids and hub ids
    // (sing_des, stenter), plus the symmetric merged-group exception
    // for real-station-id operators.
    for (const stage of STAGES) {
      if (
        pageKey === `printing.station.${stage.id}` &&
        coversStation(user.stationId, stage.id)
      ) {
        return true;
      }
    }
    return false;
  }
  if (user.role === "guest") {
    const allowedDepts = user.allowedDepartments || [];
    if (!allowedDepts.includes(deptId)) return false;
    const allowedPages = user.allowedPages || [];
    // Empty allowedPages = "no per-page restriction" — allow everything in
    // allowed departments. Non-empty allowedPages = explicit whitelist.
    if (allowedPages.length === 0) return true;
    return allowedPages.includes(pageKey);
  }
  return false;
}

export function canViewDepartment(user: User | null, deptId: string) {
  return getUserDepartments(user).includes(deptId);
}

// Can the user edit data inside a given department?
// Super-admin: always. Dept-admin: only their own department. Others: no.
export function canEditDepartment(user: User | null, deptId: string) {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "dept_admin") return user.departmentId === deptId;
  return false;
}

// Can the user manage users at all? (admins, dept-admins yes; others no)
export function canManageUsers(user: User | null) {
  return user?.role === "admin" || user?.role === "dept_admin";
}

// For listing users in the Users admin page — which users is THIS admin allowed to see/manage?
export function canManageThisUser(currentUser: User | null, targetUser: User | null) {
  if (!currentUser || !targetUser) return false;
  if (currentUser.id === targetUser.id) return false; // can't manage yourself
  if (currentUser.role === "admin") return true; // super-admin can manage anyone except themselves
  if (currentUser.role === "dept_admin") {
    // dept-admin can manage operators/guests scoped to their department, but NOT other admins
    if (targetUser.role === "admin") return false;
    if (targetUser.role === "dept_admin") return false;
    if (targetUser.role === "operator") {
      // station-based check: only printing stations belong to printing
      // dept-admin. Hubs (sing_des, stenter) are also printing-only.
      const knownStation =
        STAGES.find((s) => s.id === targetUser.stationId) ||
        isHubStationId(targetUser.stationId);
      const stationDept = knownStation ? "printing" : null;
      return stationDept === currentUser.departmentId;
    }
    if (targetUser.role === "guest") {
      const allowed = Array.isArray(targetUser.allowedDepartments)
        ? targetUser.allowedDepartments
        : [];
      // dept-admin can manage a guest only if that guest's allowed departments are a subset of (or equal to) just this dept-admin's department
      return (
        allowed.length > 0 &&
        allowed.every((d) => d === currentUser.departmentId)
      );
    }
  }
  return false;
}
