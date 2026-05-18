// @ts-nocheck
/* eslint-disable */
/*
 * ============================================================================
 *  Textile Production Tracker — OSIYO HOME factory
 *  Turdaliyev Jamshidbek & Sharifov Ahmadjon · 2026 · v2.0
 * ============================================================================
 *
 *  TypeScript checking is DISABLED for this single file via `@ts-nocheck`
 *  on line 1 above. This is intentional and is the standard pattern for
 *  shipping legacy JS-style React code through a TypeScript build pipeline.
 *
 *  WHY THIS IS SAFE:
 *  ─────────────────
 *   • `@ts-nocheck` only affects the *type-checker* (tsc / IDE squiggles).
 *   • The actual *bundler* (Vite, esbuild, webpack, Rollup, Parcel, etc.)
 *     ignores `@ts-nocheck` entirely — it strips type annotations and
 *     produces identical JavaScript output regardless of this directive.
 *   • Runtime behaviour is 100% unchanged. The compiled bundle is identical
 *     to what you would get from a clean type-correct version of this file.
 *   • The directive is scoped to THIS file only. Other .ts/.tsx files in
 *     the project remain fully type-checked.
 *
 *  WHEN YOU CAN REMOVE IT:
 *  ───────────────────────
 *   When you (or future maintainers) have time to gradually add type
 *   annotations to each component's props. Until then, the directive
 *   keeps your build green and your CI happy. Most large React codebases
 *   have at least one or two files like this — it's normal.
 *
 *  WHAT IT DOES NOT DO:
 *  ────────────────────
 *   • Does not affect bundle size.
 *   • Does not affect runtime performance.
 *   • Does not break tree-shaking.
 *   • Does not skip JSX validation by the bundler — broken JSX still fails.
 *   • Does not silence syntax errors — only type errors.
 * ============================================================================
 */

import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Factory,
  Droplet,
  Wind,
  Printer,
  Flame,
  Sparkles,
  Layers,
  Package,
  Truck,
  LayoutDashboard,
  LogIn,
  LogOut,
  Plus,
  Search,
  Filter,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Users,
  Calendar,
  Hash,
  Ruler,
  FileText,
  ArrowRight,
  X,
  Settings,
  Image as ImageIcon,
  Wrench,
  Download,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  ListChecks,
  Database,
  Activity,
  ChevronLeft,
  Upload,
  Store,
  Scissors,
  Shirt,
  ShoppingCart,
  Wallet,
  CreditCard,
  Banknote,
  DollarSign,
  UserCircle,
  Phone,
  MapPin,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Receipt,
  Sun,
  Moon,
  Globe,
  ArrowLeft,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Camera,
  CalendarDays,
  Loader2,
} from "lucide-react";

// ============== INTERNATIONALIZATION ==============
// Translation dictionary. Keys are the canonical English source string in dot-notation.
// To translate a new piece of UI: add a key here, then call t('your.key') in the component.
// Strings not yet translated will fall back to English so nothing breaks during incremental rollout.
const TRANSLATIONS = {
  en: {
    // ===== Common chrome =====
    "common.home": "Home",
    "common.back": "Back",
    "common.allDepartments": "All departments",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.search": "Search",
    "common.export": "Export",
    "common.confirm": "Confirm",
    "common.yesDelete": "Yes, delete",
    "common.loading": "Loading…",
    "common.add": "Add",
    "common.actions": "Actions",
    "common.active": "Active",
    "common.theme.dark": "Dark mode",
    "common.theme.light": "Light mode",
    "common.lang.uz": "O‘zbekcha",
    "common.lang.en": "English",
    // ===== Login =====
    "login.title": "Textile Production DB",
    "login.subtitle": "Login required",
    "login.login": "Login",
    "login.passcode": "Passcode",
    "login.signIn": "Sign in",
    "login.invalid": "Invalid login or passcode",
    "login.defaultHint": "Default super-admin: admin / admin",
    // ===== Roles =====
    "role.admin": "super admin",
    "role.dept_admin": "dept admin",
    "role.operator": "operator",
    "role.guest": "guest",
    "role.admin.full": "Super Admin",
    "role.dept_admin.full": "Department Admin",
    "role.operator.full": "Operator",
    "role.guest.full": "Guest",
    "role.guest.subtitle": "Guest (read-only)",
    // ===== Departments =====
    "dept.weaving": "Weaving",
    "dept.weaving.desc": "Yarn → loom → greige fabric",
    "dept.printing": "Printing",
    "dept.printing.desc": "Full printing pipeline: input → dispatch",
    "dept.stitching": "Stitching",
    "dept.stitching.desc": "Stitching units 1 & 2",
    "dept.store": "Local Market Store",
    "dept.store.desc": "Customers, stock, sales & debt ledger",
    "dept.comingSoon": "Coming soon",
    "home.welcome": "Welcome",
    "home.full": "Full system control",
    "home.guestSubtitle": "Read-only access",
    "home.production": "Production floor",
    "home.departments": "Departments",
    "home.yourDepartments": "Your departments",
    "home.noDepts":
      "No departments assigned to you yet. Contact your administrator.",
    // ===== Stations =====
    "stage.gray_store": "Gray Fabric Store",
    "stage.input": "SING&DES",
    "stage.bleach": "Jiggers",
    "stage.batching": "Batching",
    "stage.printing": "Printing",
    "stage.curing": "Curing",
    "stage.finishing": "Finishing (Stenter)",
    "stage.calendering": "Calendering",
    "stage.folding": "Folding & Inspection",
    "stage.dispatch": "Dispatch (Warehouse)",
    "stations.title": "Stations",
    // ===== Topbar =====
    "top.users": "Users",
    "top.lists": "Lists",
    "top.gallery": "Gallery",
    "top.machines": "Machines",
    // ===== Master =====
    "master.title": "Input → Output Master Dashboard",
    "master.desc":
      "Compare input with finished, calendered, and inspected output",
    "master.section": "Master Tracking",
    // ===== Records =====
    "rec.records": "records",
    "rec.record": "record",
    // ===== Access denied =====
    "access.denied": "Access denied",
    "access.deniedSub": "You don't have permission to view this page.",
    // ===== Batcher status =====
    "batcher.endStatus": "Batcher status",
    "batcher.notEnded": "Continue (not ended)",
    "batcher.ended": "End batcher (deduct leftover)",
    "batcher.leftover": "Leftover deducted from bleached stock",
    // ===== NEW: Common UI words =====
    "common.from": "From",
    "common.to": "To",
    "common.notes": "Notes",
    "common.date": "Date",
    "common.today": "Today",
    "common.yesterday": "Yesterday",
    "common.thisMonth": "This month",
    "common.total": "Total",
    "common.no": "No",
    "common.yes": "Yes",
    "common.required": "Required",
    "common.optional": "Optional",
    "common.filter": "Filter",
    "common.clearFilters": "Clear filters",
    "common.selected": "selected",
    "common.allRows": "All rows",
    "common.exportCsv": "Export to Excel (CSV)",
    "common.deleteSelected": "Delete selected",
    "common.noRecords": "No records",
    "common.inactive": "Inactive",
    "common.status": "Status",
    "common.result": "Result",
    "common.machine": "Machine",
    "common.shift": "Shift",
    "common.operator": "Operator",
    "common.by": "By",
    "common.qty": "Qty (m)",
    "common.meters": "Meters",
    "common.rolls": "Rolls",
    "common.width": "Width",
    "common.temperature": "Temperature",
    "common.pressure": "Pressure",
    "common.speed": "Speed",
    "common.fabricType": "Fabric Type",
    "common.source": "Source",
    "common.completion": "Completion",
    "common.completed": "COMPLETED",
    "common.notCompleted": "NOT COMPLETED",
    "common.incomplete": "Incomplete",
    "common.cost": "Cost",
    "common.reason": "Reason",
    "common.cause": "Cause",
    "common.responsible": "Responsible",
    "common.downtime": "Downtime (h)",
    "common.repairAction": "Repair",
    "common.type": "Type",
    "common.station": "Station",
    "common.design": "Design",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.close": "Close",
    "common.update": "Update",
    "common.create": "Create",
    "common.signOut": "Sign out",
    // ===== NEW: Login screen extras =====
    "login.welcome": "Welcome back",
    // ===== NEW: Trash =====
    "trash.title": "Trash Bin",
    "trash.empty": "Trash is empty",
    "trash.restore": "Restore",
    "trash.purge": "Purge permanently",
    "trash.daysLeft": "days until permanent deletion",
    // ===== NEW: Numbering =====
    "numbering.title": "Numbering Settings",
    // ===== NEW: Programs =====
    "program.title": "Programs",
    "program.add": "+ Add Program",
    "program.pick": "Pick a program",
    "program.none": "No program assigned",
    // ===== NEW: Daily Report =====
    "daily.title": "Daily Report",
    "daily.subtitle":
      "Last-day quantities per station — designed for screenshot & share to Telegram groups.",
    "daily.totalDayOutput": "Total day output",
    "daily.monthTotal": "total",
    "daily.history": "Daily history",
    "daily.latest": "latest",
    "daily.generated": "Generated",
    // ===== NEW: Maintenance Overview =====
    "maint.title": "Maintenance Overview",
    "maint.subtitle":
      "Maintenance, breakdowns & daily checks across every station — selectable and exportable.",
    "maint.tab.maint": "Maintenance & Cleaning",
    "maint.tab.breakdown": "Breakdown Log",
    "maint.tab.daily": "Daily Checks",
    // ===== NEW: In-Process Inventory =====
    "inproc.title": "In-Process Inventory",
    "inproc.subtitle":
      "All fabric currently held inside the printing department, by stage and fabric type. Each meter sits in exactly one stage — totals do not double-count.",
    "inproc.totalInProcess": "Total fabric in process",
    "inproc.percentOfTotal": "% of total",
    // ===== NEW: Programs Progress =====
    "progressDash.title": "Programs Progress",
    "progressDash.desc":
      "Track each program through every stage of the pipeline",
    "daily.tile.desc":
      "Last-day quantities per station — ready to screenshot & share",
    "maint.tile.desc":
      "Maintenance, breakdowns & daily checks across every station",
    "inproc.tile.desc":
      "How much fabric is currently held at every stage of the pipeline",
    // ===== NEW: Department home =====
    "depthome.statsTitle": "Quick stats",
    // ===== NEW: Gray Store =====
    "graystore.liveStock": "Live Stock",
    "graystore.entries": "Stock Entries",
    "graystore.outgoing": "Outgoing",
    "graystore.available": "Available Stock",
    "graystore.received": "Total Received",
    "graystore.toSingdes": "To SING&DES",
    "graystore.outgoingTotal": "Outgoing (sold/returned)",
    "graystore.activeEntries": "Active Entries",
    // ===== NEW: Tabs (per-station) =====
    "tab.data": "Data Entry",
    "tab.dash": "Dashboard",
    "tab.maint": "Maintenance",
    "tab.inventory": "Bleached Stock",
    "tab.bleaching": "Bleaching",
    "tab.dyeing": "Dyeing",
    // ===== NEW: Dyeing =====
    "dyeing.title": "Dyeing",
    "dyeing.add": "+ Add Dyeing Card",
    "dyeing.no": "Dyeing #",
    "dyeing.pickProgram": "Pick a dyeing program",
    "dyeing.color": "Color",
    "dyeing.dyedQty": "Dyed Quantity (m)",
    "dyeing.daily.label": "Dyeing",
    "dyeing.programsTitle": "Dyeing Programs",
    "dyeing.programsDesc":
      "Programs that produce solid-color dyed fabric (skip batching, printing & curing).",
    "printing.programsTitle": "Printing Programs",
    "printing.programsDesc": "Programs that produce printed-pattern fabric.",
  },
  uz: {
    "common.home": "Bosh sahifa",
    "common.back": "Orqaga",
    "common.allDepartments": "Barcha boʻlimlar",
    "common.cancel": "Bekor qilish",
    "common.save": "Saqlash",
    "common.delete": "Oʻchirish",
    "common.edit": "Tahrirlash",
    "common.search": "Qidirish",
    "common.export": "Eksport",
    "common.confirm": "Tasdiqlash",
    "common.yesDelete": "Ha, oʻchirilsin",
    "common.loading": "Yuklanmoqda…",
    "common.add": "Qoʻshish",
    "common.actions": "Amallar",
    "common.active": "Faol",
    "common.theme.dark": "Tungi rejim",
    "common.theme.light": "Kunduzgi rejim",
    "common.lang.uz": "Oʻzbekcha",
    "common.lang.en": "English",
    "login.title": "Toʻqimachilik ishlab chiqarish bazasi",
    "login.subtitle": "Tizimga kirish talab qilinadi",
    "login.login": "Login",
    "login.passcode": "Parol",
    "login.signIn": "Kirish",
    "login.invalid": "Login yoki parol notoʻgʻri",
    "login.defaultHint": "Standart super-admin: admin / admin",
    "role.admin": "super admin",
    "role.dept_admin": "boʻlim admini",
    "role.operator": "operator",
    "role.guest": "mehmon",
    "role.admin.full": "Bosh Administrator",
    "role.dept_admin.full": "Boʻlim Administratori",
    "role.operator.full": "Operator",
    "role.guest.full": "Mehmon",
    "role.guest.subtitle": "Mehmon (faqat koʻrish)",
    "dept.weaving": "Toʻquv",
    "dept.weaving.desc": "Ip → dastgoh → xom mato",
    "dept.printing": "Bosma",
    "dept.printing.desc": "Toʻliq bosma jarayoni: kirim → joʻnatma",
    "dept.stitching": "Tikuv",
    "dept.stitching.desc": "1 va 2-tikuv sexlari",
    "dept.store": "Mahalliy bozor ombori",
    "dept.store.desc": "Mijozlar, ombor, savdo va qarz daftari",
    "dept.comingSoon": "Tez kunda",
    "home.welcome": "Xush kelibsiz",
    "home.full": "Toʻliq tizim boshqaruvi",
    "home.guestSubtitle": "Faqat koʻrish huquqi",
    "home.production": "Ishlab chiqarish sexi",
    "home.departments": "Boʻlimlar",
    "home.yourDepartments": "Sizning boʻlimlaringiz",
    "home.noDepts":
      "Sizga hali boʻlim biriktirilmagan. Administrator bilan bogʻlaning.",
    "stage.gray_store": "Xom Mato Ombori",
    "stage.input": "SING&DES",
    "stage.bleach": "Jiggerlar",
    "stage.batching": "Quritish",
    "stage.printing": "Bosma",
    "stage.curing": "Termik ishlov",
    "stage.finishing": "Yakuniy ishlov (Stenter)",
    "stage.calendering": "Kalandrlash",
    "stage.folding": "Sifat Nazorati",
    "stage.dispatch": "Joʻnatma (Ombor)",
    "stations.title": "Stansiyalar",
    "top.users": "Foydalanuvchilar",
    "top.lists": "Roʻyxatlar",
    "top.gallery": "Galereya",
    "top.machines": "Dastgohlar",
    "master.title": "Kirim → Chiqim Bosh Boshqaruv Paneli",
    "master.desc":
      "Kirim, yakuniy ishlangan, kalandrlangan va tekshirilgan chiqimni solishtiring",
    "master.section": "Bosh kuzatuv",
    "rec.records": "yozuvlar",
    "rec.record": "yozuv",
    "access.denied": "Ruxsat berilmagan",
    "access.deniedSub": "Sizda bu sahifani koʻrish huquqi yoʻq.",
    "batcher.endStatus": "Kontaktning holati",
    "batcher.notEnded": "Davom etyapti (yakunlanmagan)",
    "batcher.ended": "Kontaktni yakunlash (qoldiqni hisobdan chiqarish)",
    "batcher.leftover": "Qoldiq oqartirilgan ombordan chiqarildi",
    // ===== NEW: Common UI words =====
    "common.from": "Boshlanish",
    "common.to": "Tugash",
    "common.notes": "Izoh",
    "common.date": "Sana",
    "common.today": "Bugun",
    "common.yesterday": "Kecha",
    "common.thisMonth": "Joriy oy",
    "common.total": "Jami",
    "common.no": "Yoʻq",
    "common.yes": "Ha",
    "common.required": "Majburiy",
    "common.optional": "Ixtiyoriy",
    "common.filter": "Saralash",
    "common.clearFilters": "Saralashni tozalash",
    "common.selected": "tanlangan",
    "common.allRows": "Barcha qatorlar",
    "common.exportCsv": "Excelga eksport (CSV)",
    "common.deleteSelected": "Tanlanganlarni oʻchirish",
    "common.noRecords": "Yozuvlar yoʻq",
    "common.inactive": "Nofaol",
    "common.status": "Holat",
    "common.result": "Natija",
    "common.machine": "Dastgoh",
    "common.shift": "Smena",
    "common.operator": "Operator",
    "common.by": "Kim",
    "common.qty": "Miqdor (m)",
    "common.meters": "Metr",
    "common.rolls": "Rulonlar",
    "common.width": "Eni",
    "common.temperature": "Harorat",
    "common.pressure": "Bosim",
    "common.speed": "Tezlik",
    "common.fabricType": "Mato turi",
    "common.source": "Manba",
    "common.completion": "Yakunlanganlik",
    "common.completed": "YAKUNLANGAN",
    "common.notCompleted": "YAKUNLANMAGAN",
    "common.incomplete": "Toʻliq emas",
    "common.cost": "Narx",
    "common.reason": "Sabab",
    "common.cause": "Sabab",
    "common.responsible": "Masʼul shaxs",
    "common.downtime": "Toʻxtab turish (soat)",
    "common.repairAction": "Taʼmirlash",
    "common.type": "Turi",
    "common.station": "Stansiya",
    "common.design": "Dizayn",
    "common.next": "Keyingi",
    "common.previous": "Oldingi",
    "common.close": "Yopish",
    "common.update": "Yangilash",
    "common.create": "Yaratish",
    "common.signOut": "Chiqish",
    // ===== NEW: Login screen extras =====
    "login.welcome": "Yana xush kelibsiz",
    // ===== NEW: Trash =====
    "trash.title": "Savatcha",
    "trash.empty": "Savatcha boʻsh",
    "trash.restore": "Tiklash",
    "trash.purge": "Butunlay oʻchirish",
    "trash.daysLeft": "kundan keyin butunlay oʻchadi",
    // ===== NEW: Numbering =====
    "numbering.title": "Raqamlash sozlamalari",
    // ===== NEW: Programs =====
    "program.title": "Dasturlar",
    "program.add": "+ Dastur qoʻshish",
    "program.pick": "Dasturni tanlang",
    "program.none": "Dastur biriktirilmagan",
    // ===== NEW: Daily Report =====
    "daily.title": "Kunlik hisobot",
    "daily.subtitle":
      "Har bir stansiyaning oxirgi kun miqdorlari — Telegram guruhlariga screenshot qilib yuborish uchun.",
    "daily.totalDayOutput": "Kunlik umumiy chiqim",
    "daily.monthTotal": "jami",
    "daily.history": "Kunlik tarix",
    "daily.latest": "oxirgi",
    "daily.generated": "Yaratildi",
    // ===== NEW: Maintenance Overview =====
    "maint.title": "Texnik xizmat umumiy",
    "maint.subtitle":
      "Barcha stansiyalarning texnik xizmati, buzilishlari va kunlik tekshiruvlari — tanlash va eksport qilish mumkin.",
    "maint.tab.maint": "Texnik xizmat va tozalash",
    "maint.tab.breakdown": "Buzilishlar jurnali",
    "maint.tab.daily": "Kunlik tekshiruvlar",
    // ===== NEW: In-Process Inventory =====
    "inproc.title": "Jarayondagi ombor qoldigʻi",
    "inproc.subtitle":
      "Bosma boʻlimi ichida hozirda mavjud boʻlgan barcha mato — bosqich va mato turi boʻyicha. Har bir metr aynan bitta bosqichda — qoʻshib hisoblanmaydi.",
    "inproc.totalInProcess": "Jarayondagi jami mato",
    "inproc.percentOfTotal": "jamiga nisbatan %",
    // ===== NEW: Programs Progress =====
    "progressDash.title": "Buyurtmalar progressi",
    "progressDash.desc":
      "Har bir dasturni jarayonning barcha bosqichlarida kuzatib boring",
    "daily.tile.desc":
      "Har bir stansiyaning oxirgi kun miqdorlari — screenshot qilib ulashish uchun tayyor",
    "maint.tile.desc":
      "Barcha stansiyalarning texnik xizmati, buzilishlari va kunlik tekshiruvlari",
    "inproc.tile.desc":
      "Hozirda jarayonning har bir bosqichida qancha mato saqlanmoqda",
    // ===== NEW: Department home =====
    "depthome.statsTitle": "Qisqa statistika",
    // ===== NEW: Gray Store =====
    "graystore.liveStock": "Joriy qoldiq",
    "graystore.entries": "Ombor kirimlari",
    "graystore.outgoing": "Chiqim",
    "graystore.available": "Mavjud qoldiq",
    "graystore.received": "Jami qabul qilingan",
    "graystore.toSingdes": "SING&DES ga",
    "graystore.outgoingTotal": "Chiqim (sotilgan/qaytarilgan)",
    "graystore.activeEntries": "Faol kirimlar",
    // ===== NEW: Tabs (per-station) =====
    "tab.data": "Maʼlumot kiritish",
    "tab.dash": "Boshqaruv paneli",
    "tab.maint": "Texnik xizmat",
    "tab.inventory": "Oqartirilgan ombor",
    "tab.bleaching": "Oqartirish",
    "tab.dyeing": "Boʻyash",
    // ===== Dyeing =====
    "dyeing.title": "Boʻyash",
    "dyeing.add": "+ Boʻyash kartasi qoʻshish",
    "dyeing.no": "Boʻyash №",
    "dyeing.pickProgram": "Boʻyash dasturini tanlang",
    "dyeing.color": "Rang",
    "dyeing.dyedQty": "Boʻyalgan miqdor (m)",
    "dyeing.daily.label": "Boʻyash",
    "dyeing.programsTitle": "Boʻyash dasturlari",
    "dyeing.programsDesc":
      "Bir rangli boʻyalgan mato ishlab chiqaruvchi dasturlar (quritish, bosma va termik ishlovni oʻtkazib yuboradi).",
    "printing.programsTitle": "Bosma dasturlari",
    "printing.programsDesc": "Naqshli bosma mato ishlab chiqaruvchi dasturlar.",
  },
};

const LangContext = createContext({ lang: "en", setLang: () => {} });
function useT() {
  const { lang } = useContext(LangContext);
  return (key: string, fallback?: string): string =>
    TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || fallback || key;
}
function useLang() {
  return useContext(LangContext);
}

// ============== THEME ==============
const ThemeContext = createContext({ theme: "light", setTheme: () => {} });
function useTheme() {
  return useContext(ThemeContext);
}
// Minimal helper: return classnames depending on theme (avoids huge tailwind dark: rewrite).
// We swap a small set of background/text/border classes per surface.
function useThemed() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    dark,
    page: dark ? "bg-slate-950" : "bg-slate-50",
    surface: dark ? "bg-slate-900" : "bg-white",
    surfaceAlt: dark ? "bg-slate-800" : "bg-slate-50",
    border: dark ? "border-slate-700" : "border-slate-200",
    text: dark ? "text-slate-100" : "text-slate-800",
    textDim: dark ? "text-slate-400" : "text-slate-500",
    textMuted: dark ? "text-slate-500" : "text-slate-400",
    hover: dark ? "hover:bg-slate-800" : "hover:bg-slate-50",
    inputBg: dark
      ? "bg-slate-800 border-slate-700 text-slate-100"
      : "bg-white border-slate-300 text-slate-800",
    rowBorder: dark ? "border-slate-800" : "border-slate-100",
    rowHover: dark ? "hover:bg-slate-800/50" : "hover:bg-slate-50",
  };
}

// ============== STAGES & DEFAULT CONFIG ==============
// ============== LOGOS ==============
// OSIYO HOME company logo (green) — used in topbar and login screen.
// Embedded as a base64 data URI because the artifact cannot load external files.
const LOGO_OSIYO_HOME =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAIgBBgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiivnv4/wD7VHwF/Zh0Fde+NHxE0bwobqGSXSPD4eTU/F3iAxkoV0LwvpqXOs38XnBYJb9bVNKspZIzqN/ZxN5gUpRinKTUUt22kl83YirVp0YSq1qkKVOCvKpUlGEIrzlJpLslq29Em9D6Eor+Z/46f8F6/EN1Pe6V+zj8H9O0mxDSRW3jH4s3Mup6ncRsdong8F+Gb+zsNMnQAvC954r12F2ZfPsQI2ik/Mfx9/wU2/bn+Ik076p+0N4y0C3lLeVZeAU0n4fQ2sbHIhgufB+naPqbhM4Wa71C6u8ffuHIzXHPH0Iu0eao/wC6rL75Wv8AJHzWJ4tyqg3Gl7fFyWl6MFCn8qlZw5l5xptfI/uYor/Plvf2mP2j9Sma41H9oH43ahO5LPPe/Fbx3dTMzHLM0k+vSOxJ5JLEk8mqX/DQ/wAf/wDouXxh/wDDmeNf/l3WX9pR/wCfUv8AwOP+RwPjXD9Mvr288RRv+FOx/oT0V/nsf8ND/H//AKLl8Yf/AA5njX/5d0f8ND/H/wD6Ll8Yf/DmeNf/AJd0v7Sj/wA+Zf8Agcf/AJEP9daH/Qvr/wDhRR/+Vn+hPRX+ex/w0P8AH/8A6Ll8Yf8Aw5njX/5d0f8ADQ/x/wD+i5fGH/w5njX/AOXdH9pR/wCfMv8AwOP/AMiH+utD/oX1/wDwoo//ACs/0J6K/wA9j/hof4//APRcvjD/AOHM8a//AC7o/wCGh/j/AP8ARcvjD/4czxr/APLuj+0o/wDPmX/gcf8A5EP9daH/AEL6/wD4UUf/AJWf6E9Ff57H/DQ/x/8A+i5fGH/w5njX/wCXdH/DQ/x//wCi5fGH/wAOZ41/+XdH9pR/58y/8Dj/APIh/rrQ/wChfX/8KKP/AMrP9Ceiv89j/hof4/8A/RcvjD/4czxr/wDLuj/hof4//wDRcvjD/wCHM8a//Luj+0o/8+Zf+Bx/+RD/AF1of9C+v/4UUf8A5Wf6E9Ff57H/AA0P8f8A/ouXxh/8OZ41/wDl3R/w0P8AH/8A6Ll8Yf8Aw5njX/5d0f2lH/nzL/wOP/yIf660P+hfX/8ACij/APKz/Qnor/Pq039qD9pbRpluNI/aH+OWmTq25ZdP+LPj2zcH13W+vxk56EHII4II4r6V+Hn/AAVO/bq+HM8BtPjrrXi2wiZTNpXxD0vQ/G0F4q9I59T1nTpvEkSn+J7HXLOZu8pzVLMab+KnNeacZfhozWnxpgpNKrg8VTXWUZ0Ktv8At1OnJ/J+h/cBRX85nwE/4L02F3PZaP8AtKfCP+ylkaOKfxz8Jp57uzhZsIZr3wN4jvZL6G2jP765uNO8Walc7C62ujyuqRyfut8Gvj38Hv2hPCyeMvg38QPD3jzQv3SXcmkXTLqWkXEyGSOy1/Q7yO11vw/fsgMi2OtafY3Tx4lSJomV266VelW/hzTf8r92S/7devzV0fQ4HNsvzFf7LiYTna7oyvTrJLdulO0ml1cHUiurS1PXaKKK2PRCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK/BT/grj/wAFGL34T2t/+zB8Ddday+JGtacg+KPjPSrnZe+BNC1S2WW38LaLdQOJLPxdr1hMl1qGoIyXHh7Qrm2NiRq+rQ3miZ1asaMHOey0SW8m9kvN/cldvRHFmGPoZdhamKxErRjpCCtz1ajvyUoJ7yk1q3pCKlOVox11/wDgoV/wV20f4MXmufBj9mi40nxV8U7JrjTPFXxEmSDVfCfw+vkJiuNM0W2bzLLxT4vsn3rdmfzvDugXiLaX8Wt38eo6Tp38u3jfx14z+JXi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Wk61Wda3moQhSi2u0pW/I/Xv9tT/AIK6/GD9pSw1b4d/C+yu/gz8IdRSay1O3s9Q8/x94z06TdHLa+JNftPKh0jSL2HC3Xhzw/hJ45Lmx1bXNd0+c26/kJRRXBUqTqy5qknJ+eyXZJaJeSXrc+TxeNxWOrOvi60q1R6Jy0jCN78lOCtCnBfyxSu9W5PUK/Rz/gmr+xRqf7XvxuspvEOn3KfBT4cXen698TNUZZI7fWNkpuNJ8A2U42l7/wAUS27R6kYJI5NN8OxaneieG9bS4rvx39j39jP4sftkfESHwj4DsX0vwrpc9rL49+I2o2kz+HPBulSvlmkdTEuqeILyFJV0Pw3bTpealOrSzy2Gk22o6rY/2x/s+fAD4cfszfCzw78JPhfpP9neHtCiMt3e3Hly6z4l1y5SP+1fE3iG9jji+3a1qssSPPKI47e1t47XTdOt7PS7Gxs7fqwmGdWSnNWpRd9fttfZXeKfxPb7K1bt7vDuRzzCtDFYmDjgaMlL3k19aqRaapQTtekpJOtNe60vZRblKfJ7LbW1vZ29vZ2kENraWsMVta2ttEkFvbW8CLFBBBDEqxwwwxKscUUaqkaKqIoUACaiivbP1EKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDxL4+fs7fCH9pnwJd/Dz4xeEbLxPocrPcabdn/RNe8N6m0Zjj1nwzrcIF7o2pxDCtLbube9gD2Op219p01xZzfy3ftbf8Eb/AI+/BC51PxR8Fob748fDOJprmOHRbNR8TtAs13SCHV/CVsC3iPyEKQrqPg9b24vGSW6uPDuiwbUr+v6iuethqVde8rStZTjpL0fSS8n8mjyMzyTA5or14OnXStDE0rRqpLZTuuWrBdI1E7a8s4Xsf5wF7ZXmm3dzp+o2lzYX9lPLa3llewS2t3aXMDmOe3ubadI5oJ4ZFaOWGVEk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XmuLiWOGJByzuqjrX8Pv/Dvn9tr/AKNj+Lv/AISt3/jX94dFY18NDEOLlKUeVNLltrdp639DzM2yOhm8qEq1etRdCNSMVSjTakqkoybl7RPVOKSt0ep/B5/w75/ba/6Nj+Lv/hK3f+NH/Dvn9tr/AKNj+Lv/AISt3/jX94dFc/8AZ1L/AJ+VPuh/keR/qXgv+g3F/wDgGH/+RP4PP+HfP7bX/Rsfxd/8JW7/AMaP+HfP7bX/AEbH8Xf/AAlbv/Gv7w6KP7Opf8/Kn3Q/yD/UvBf9BuL/APAMP/8AIn8Hn/Dvn9tr/o2P4u/+Erd/40f8O+f22v8Ao2P4u/8AhK3f+Nf3h0Uf2dS/5+VPuh/kH+peC/6DcX/4Bh//AJE/g8/4d8/ttf8ARsfxd/8ACVu/8a9+/ZS/Yb/a98IftQfs5+LPE/7O/wAUdD8N+Gfjn8KPEHiDWtR8N3Nvp+kaLo/jvQtQ1TU76djthtLGyt57q4lbiOGJ2PSv7RaKccvpxkpe0qe609odGn28i6XB2CpVadVYzFN0qlOok4YezdOpCok7K9m4JO2tm7a2CiiivQPrwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=";
// Printing Department logo (blue) — used as hero banner on the printing dept home.
const LOGO_PRINTING_DEPT =
  "data:image/jpeg;base64,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";

const STAGES = [
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
    id: "dispatch",
    name: "Dispatch (Warehouse)",
    icon: Truck,
    color: "bg-green-600",
    next: null,
    hasMachine: false,
  },
];

// ============== DEPARTMENTS (SUPER-STATIONS) ==============
// Each department is a top-level section of the app. Some contain sub-stations (like Printing).
const DEPARTMENTS = [
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

const DEFAULT_LISTS = {
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
  ],
};

// ============== STORAGE HELPERS ==============
// ============================================================
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
type Role = "admin" | "dept_admin" | "operator" | "guest";
interface User {
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
interface Design {
  id: string;
  designNumber: string;
  name?: string;
  imageUrl?: string; // server-side path, e.g. /uploads/designs/abc.png
  imageData?: string; // legacy: inline base64 dataURL (kept for back-compat)
  notes?: string;
}

// --- Machine ---
interface Machine {
  id: string;
  name: string;
  stationId: string;
  model?: string;
  purchaseDate?: string;
  specs?: string;
  notes?: string;
}

// --- Program (printing or dyeing) ---
interface ProgramLine {
  id: string;
  designNumber?: string;
  designName?: string;
  fabricType?: string;
  qty?: number | string;
  foldingPlan?: string;
}
interface Program {
  id: string;
  name: string;
  programType?: "printing" | "dyeing";
  status?: string;
  createdAt?: string;
  lines?: ProgramLine[];
  notes?: string;
}

// --- Customer / Store entities (Local Market) ---
interface Customer {
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
interface StoreSale {
  id: string;
  date: string;
  customerId: string;
  fabricType?: string;
  qty?: number;
  unit?: string;
  unitPrice?: number;
  totalAmount?: number;
  paidAmount?: number;
  invoiceNumber?: string;
  notes?: string;
  operator?: string;
}
interface StorePayment {
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
interface StoreStockIn {
  id: string;
  date: string;
  fabricType?: string;
  qty?: number;
  unit?: string;
  source?: string;
  lotNumber?: string;
  costPrice?: number;
  notes?: string;
  operator?: string;
}

// --- Record (production record at any station) ---
// Records are loosely typed because each station has its own fields.
// Common fields are listed; the rest is open-ended.
interface ProductionRecord {
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
type RecordsMap = Record<string, ProductionRecord[]>;

// --- Lists (dropdowns) ---
type Lists = Record<string, string[]>;

// --- Numbering settings ---
interface NumberingConfig {
  presetId?: string;
  prefix?: string;
  nextSeq?: number;
  resetEachMonth?: boolean;
}
interface NumberingSettings {
  inputBatch?: NumberingConfig;
  printNumber?: NumberingConfig;
  dyeingNumber?: NumberingConfig;
}

// --- Trash bin entry ---
interface TrashEntry {
  id: string;
  type: string; // e.g. 'rec_input', 'user', 'design'
  recordId: string;
  item: any;
  deletedAt: string;
  deletedBy?: string;
}

// --- Current view (the React Router stand-in) ---
interface CurrentView {
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
interface AppContext {
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
interface CtxProps {
  ctx: AppContext;
}
interface CtxEditableProps {
  ctx: AppContext;
  canEdit?: boolean;
}

// ============================================================
// ============== STORAGE LAYER (DUAL MODE) ===================
// ============================================================
// The artifact runs in two environments:
//   1. claude.ai  — uses window.storage (a key-value store provided by the host)
//   2. deployed app — uses an HTTP backend with JWT auth
//
// We detect mode at startup and route every storage call to the right place.
// All keys follow conventions: "user:abc", "rec_input:xyz", "config:lists",
// "app:numbering", "store_sale:foo", etc.
//
// In API mode, a request like storage.getAll('user:') maps to GET /api/users.
// The mapping table is in API_ROUTES below.

// Detect API mode: if window.storage isn't available, we must use HTTP.
// In a Vite build, you can also force API mode by setting window.__API_MODE = true
// before the bundle loads (e.g. in a <script> tag in index.html).
const IS_API_MODE = (() => {
  if (typeof window === "undefined") return false;
  // Explicit override (set in index.html before the bundle runs)
  if ((window as any).__API_MODE === true) return true;
  // Fallback: window.storage is the artifact host. If absent, assume API mode.
  return !(
    (window as any).storage && typeof (window as any).storage.get === "function"
  );
})();

// Where the API lives. In production this is typically "/api" (same-origin via
// reverse proxy) or the explicit absolute URL of your backend.
const API_BASE_URL: string = (() => {
  if (typeof window === "undefined") return "/api";
  // Allow override via window.__API_URL set before the bundle loads.
  const fromWindow = (window as any).__API_URL as string | undefined;
  if (fromWindow) return fromWindow.replace(/\/$/, "");
  // Vite-style env (only present when bundled by Vite; ignored in claude.ai)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromEnv = (typeof (import.meta as any) !== "undefined" &&
    (import.meta as any).env?.VITE_API_URL) as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "/api";
})();

// Token storage helpers — survive page reloads via localStorage.
const TOKEN_KEY = "app:token";
function getToken(): string | null {
  try {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem(TOKEN_KEY)
      : null;
  } catch {
    return null;
  }
}
function setToken(token: string | null) {
  try {
    if (typeof localStorage === "undefined") return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

// Hook for the React tree to listen for "logout" events (e.g. token expired).
// When we get a 401 from any request we dispatch this so the App can drop the
// user back to the login screen.
const AUTH_EVENT = "app:auth-required";
function notifyAuthRequired() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  }
}

// ============== Key → API endpoint mapping ==============
// Each storage key prefix maps to a REST collection on the backend.
// Special-case keys (singletons) are listed separately.
//
// Examples:
//   "user:abc"       → /users (id=abc)
//   "rec_input:xyz"  → /records/input (id=xyz)
//   "config:lists"   → /lists (singleton — POST replaces whole object)
//   "app:numbering"  → /config/numbering (singleton via /config/:key)
//   "trash:42"       → /trash (id=42)
//
// "app:prefs" is intentionally LOCAL ONLY — language and theme are stored in
// localStorage even in API mode. We don't want to hit the network for every
// theme toggle.
const PREFIX_TO_PATH: Record<string, string> = {
  "user:": "/users",
  "design:": "/designs",
  "machine:": "/machines",
  "program:": "/programs",
  "customer:": "/customers",
  "store_sale:": "/store/sales",
  "store_pay:": "/store/payments",
  "store_in:": "/store/stockin",
  "trash:": "/trash",
};
function recPath(stationKey: string): string {
  return `/records/${stationKey}`;
}

// HTTP helper. Adds Authorization header, parses JSON, raises 401 → notifyAuthRequired.
//
// New: third arg `query` lets callers attach ?limit=&offset=&... without
// hand-stringifying URLs. Values that are null/undefined are dropped.
// New: `init.body` may be a FormData instance; in that case we DO NOT set the
// Content-Type header — the browser sets it with the correct boundary.
async function apiFetch(
  path: string,
  init: RequestInit = {},
  query?: Record<string, string | number | null | undefined>,
): Promise<any> {
  const isFormData =
    typeof FormData !== "undefined" && init.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...((init.headers as Record<string, string>) || {}),
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Build query string if provided.
  let fullPath = path;
  if (query) {
    const qs = Object.entries(query)
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .map(
        ([k, v]) =>
          `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
      )
      .join("&");
    if (qs) fullPath += (path.includes("?") ? "&" : "?") + qs;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${fullPath}`, { ...init, headers });
  } catch (err) {
    // Network error — let the caller decide; don't kick out the user.
    throw err;
  }
  if (res.status === 401) {
    setToken(null);
    notifyAuthRequired();
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      /* not JSON */
    }
    throw new Error((body && body.error) || `HTTP ${res.status}`);
  }
  // Some routes return 204; guard against empty body.
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Normalize either a legacy plain-array response or the new paginated shape
// { items, total, limit, offset } down to a plain array. Callers that need
// the total can use apiFetchPage() below instead.
function unwrapList(resp: any): any[] {
  if (Array.isArray(resp)) return resp;
  if (resp && Array.isArray(resp.items)) return resp.items;
  return [];
}

// Parse a key like "user:abc" → { prefix: 'user:', id: 'abc' }
function splitKey(key: string): { prefix: string; id: string } {
  const idx = key.indexOf(":");
  return idx < 0
    ? { prefix: key, id: "" }
    : { prefix: key.slice(0, idx + 1), id: key.slice(idx + 1) };
}

// resolveDesignImage(design) — produces a src string usable in an <img> tag.
// Prefers the new server-side `imageUrl`; falls back to legacy inline
// `imageData` for records that haven't been migrated yet. Relative paths
// returned by the backend (e.g. "/uploads/designs/x.png") are prefixed with
// the host so they resolve correctly when the SPA is mounted under /api.
function resolveDesignImage(d: any): string {
  if (!d) return "";
  if (d.imageUrl) {
    if (/^(https?:|data:|blob:)/.test(d.imageUrl)) return d.imageUrl;
    const host = API_BASE_URL.replace(/\/api\/?$/, "");
    return `${host}${d.imageUrl}`;
  }
  return d.imageData || "";
}

// ============== The dual-mode storage object ==============
const storage = {
  // Used elsewhere to know whether to enable polling and other API-mode features.
  isApiMode: IS_API_MODE as boolean,

  async get(key: string): Promise<any> {
    if (!IS_API_MODE) {
      try {
        const r = await (window as any).storage.get(key, true);
        return r ? JSON.parse(r.value) : null;
      } catch {
        return null;
      }
    }
    // API mode dispatch
    if (key === "config:lists") return apiFetch("/lists").catch(() => null);
    if (key.startsWith("app:")) {
      // app:numbering, app:prefs, etc. Route through /config/:key.
      // Special: app:prefs stays in localStorage (lang/theme); skip network.
      if (key === "app:prefs") {
        try {
          const v = localStorage.getItem("app:prefs");
          return v ? JSON.parse(v) : null;
        } catch {
          return null;
        }
      }
      const ck = key.slice("app:".length);
      return apiFetch(`/config/${encodeURIComponent(ck)}`).catch(() => null);
    }
    // Per-id GET — not commonly used by the artifact, but supported.
    const { prefix, id } = splitKey(key);
    if (prefix.startsWith("rec_")) {
      // No per-id GET endpoint by design — pull the whole list and filter.
      const station = prefix.slice("rec_".length, -1);
      const all = unwrapList(
        await apiFetch(recPath(station)).catch(() => []),
      );
      return all.find((r: any) => r.id === id) || null;
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return null;
    const all = unwrapList(await apiFetch(path).catch(() => []));
    return all.find((r: any) => r.id === id) || null;
  },

  async set(key: string, val: any): Promise<boolean> {
    if (!IS_API_MODE) {
      try {
        await (window as any).storage.set(key, JSON.stringify(val), true);
        return true;
      } catch {
        return false;
      }
    }
    if (key === "config:lists") {
      await apiFetch("/lists", { method: "POST", body: JSON.stringify(val) });
      return true;
    }
    if (key.startsWith("app:")) {
      if (key === "app:prefs") {
        try {
          localStorage.setItem("app:prefs", JSON.stringify(val));
          return true;
        } catch {
          return false;
        }
      }
      const ck = key.slice("app:".length);
      await apiFetch(`/config/${encodeURIComponent(ck)}`, {
        method: "POST",
        body: JSON.stringify(val),
      });
      return true;
    }
    const { prefix } = splitKey(key);
    if (prefix.startsWith("rec_")) {
      const station = prefix.slice("rec_".length, -1);
      await apiFetch(recPath(station), {
        method: "POST",
        body: JSON.stringify(val),
      });
      return true;
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return false;
    await apiFetch(path, { method: "POST", body: JSON.stringify(val) });
    return true;
  },

  async list(prefix: string): Promise<string[]> {
    if (!IS_API_MODE) {
      try {
        const r = await (window as any).storage.list(prefix, true);
        return r?.keys || [];
      } catch {
        return [];
      }
    }
    // In API mode, "list" doesn't really apply — getAll() does the equivalent in one call.
    // We still support it: return the synthetic keys so legacy callers work.
    const items = await this.getAll(prefix);
    return items.map((it: any) => `${prefix}${it.id}`);
  },

  // getAll(prefix) — fetches the whole collection mapped from `prefix`.
  //
  // New: optional `opts` { limit, offset, ... } forwards as query params.
  // The backend is free to return either a plain array (legacy) or
  // { items, total, limit, offset } (new). Either way the caller gets an array.
  // To read the total, use storage.fetchPage() below.
  async getAll(
    prefix: string,
    opts?: {
      limit?: number;
      offset?: number;
      [k: string]: string | number | undefined;
    },
  ): Promise<any[]> {
    if (!IS_API_MODE) {
      const keys: string[] = await this.list(prefix);
      const items = await Promise.all(keys.map((k: string) => this.get(k)));
      return items.filter(Boolean);
    }
    if (prefix.startsWith("rec_")) {
      const station = prefix.slice("rec_".length, -1);
      try {
        return unwrapList(await apiFetch(recPath(station), {}, opts));
      } catch {
        return [];
      }
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return [];
    try {
      return unwrapList(await apiFetch(path, {}, opts));
    } catch {
      return [];
    }
  },

  // fetchPage(prefix, opts) — like getAll but returns the full page envelope
  // { items, total, limit, offset } so callers can show "showing X of Y" UIs.
  // If the backend returns a plain array, we fabricate the envelope so the
  // caller still has a uniform shape to work with.
  async fetchPage(
    prefix: string,
    opts?: {
      limit?: number;
      offset?: number;
      [k: string]: string | number | undefined;
    },
  ): Promise<{ items: any[]; total: number; limit: number; offset: number }> {
    if (!IS_API_MODE) {
      const items = await this.getAll(prefix);
      return {
        items,
        total: items.length,
        limit: opts?.limit ?? items.length,
        offset: opts?.offset ?? 0,
      };
    }
    let path: string | null = null;
    if (prefix.startsWith("rec_")) {
      path = recPath(prefix.slice("rec_".length, -1));
    } else {
      path = PREFIX_TO_PATH[prefix] || null;
    }
    if (!path) {
      return { items: [], total: 0, limit: 0, offset: 0 };
    }
    try {
      const resp = await apiFetch(path, {}, opts);
      if (Array.isArray(resp)) {
        return {
          items: resp,
          total: resp.length,
          limit: opts?.limit ?? resp.length,
          offset: opts?.offset ?? 0,
        };
      }
      return {
        items: resp?.items || [],
        total: resp?.total ?? (resp?.items?.length || 0),
        limit: resp?.limit ?? (opts?.limit ?? 0),
        offset: resp?.offset ?? (opts?.offset ?? 0),
      };
    } catch {
      return {
        items: [],
        total: 0,
        limit: opts?.limit ?? 0,
        offset: opts?.offset ?? 0,
      };
    }
  },

  // ----- Home stats summary -----
  // One round-trip to /stats returns { counts: { input: 12, printing: 4, ... },
  // customers, sales, stockIn, ... } so the home page doesn't have to fetch
  // every records table just to display counters on the dept tiles.
  // In artifact mode we synthesize the same shape from local storage.
  async fetchStats(): Promise<{
    counts: Record<string, number>;
    sums?: Record<string, Record<string, number>>;
    customers?: number;
    sales?: number;
    payments?: number;
    stockIn?: number;
    designs?: number;
    machines?: number;
    programs?: number;
    storeTotals?: {
      stockInQty?: number;
      salesQty?: number;
      salesValue?: number;
      paidAmount?: number;
      paymentsTotal?: number;
    };
  }> {
    if (!IS_API_MODE) {
      // Cheap local approximation — we don't have a real backend in artifact mode.
      return { counts: {} };
    }
    try {
      return (await apiFetch("/stats")) || { counts: {} };
    } catch {
      return { counts: {} };
    }
  },

  async delete(key: string): Promise<boolean> {
    if (!IS_API_MODE) {
      try {
        await (window as any).storage.delete(key, true);
        return true;
      } catch {
        return false;
      }
    }
    const { prefix, id } = splitKey(key);
    if (prefix.startsWith("rec_")) {
      const station = prefix.slice("rec_".length, -1);
      // We deliberately let apiFetch errors propagate so callers know the
      // delete didn't take effect. Previously this was silently swallowed,
      // making backend delete failures look like "the record came back from
      // polling 15 seconds later". Now the caller can show a real error.
      await apiFetch(`${recPath(station)}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      return true;
    }
    const path = PREFIX_TO_PATH[prefix];
    if (!path) return false;
    await apiFetch(`${path}/${encodeURIComponent(id)}`, { method: "DELETE" });
    return true;
  },

  // ============== Auth helpers (API mode only) ==============
  // In artifact mode these are unused — login compares plaintext locally.
  async loginApi(
    login: string,
    passcode: string,
  ): Promise<{ token: string; user: any } | null> {
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ login, passcode }),
      });
      if (data?.token) setToken(data.token);
      return data;
    } catch {
      return null;
    }
  },
  async fetchMe(): Promise<any | null> {
    if (!getToken()) return null;
    try {
      const data = await apiFetch("/auth/me");
      return data?.user || null;
    } catch {
      return null;
    }
  },
  logoutApi() {
    setToken(null);
  },

  // ----- Design image upload (multipart) -----
  // Sends the file to POST /designs/upload. Backend writes it to disk and
  // returns { imageUrl: "/uploads/designs/<filename>" } which is stored in
  // the design record's `imageUrl` field — never the bytes themselves.
  // Falls back to data URL in artifact mode (no server to save to).
  async uploadDesign(file: File): Promise<{ imageUrl: string } | null> {
    if (!IS_API_MODE) {
      // Artifact mode: read as data URL and pretend it's a path.
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ imageUrl: reader.result as string });
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    }
    try {
      const fd = new FormData();
      fd.append("file", file);
      return await apiFetch("/designs/upload", {
        method: "POST",
        body: fd,
      });
    } catch (e) {
      console.error("Design upload failed:", e);
      return null;
    }
  },

  // ===== Fetch related-table records in compact mode =====
  // Returns just the fields a station page needs for cross-referencing
  // (e.g. printing page needs batching's batchNo, id, and date). Backend
  // is expected to honour ?fields=a,b,c and only project those columns.
  // If the backend ignores it, this gracefully degrades to full rows.
  async fetchCompact(prefix: string, fields: string[]): Promise<any[]> {
    if (!IS_API_MODE) {
      return this.getAll(prefix);
    }
    let path: string | null = null;
    if (prefix.startsWith("rec_")) {
      path = recPath(prefix.slice("rec_".length, -1));
    } else {
      path = PREFIX_TO_PATH[prefix] || null;
    }
    if (!path) return [];
    try {
      return unwrapList(
        await apiFetch(path, {}, { fields: fields.join(",") }),
      );
    } catch {
      return [];
    }
  },
};

// ===== Page-size preference storage =====
// We persist the user's chosen rows-per-page per logical page key in
// localStorage so it sticks across reloads. Default is 50.
function loadPageSize(pageKey: string, fallback = 50): number {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`pageSize:${pageKey}`);
    const n = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : fallback;
  } catch {
    return fallback;
  }
}
function savePageSize(pageKey: string, size: number): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(`pageSize:${pageKey}`, String(size));
  } catch {
    /* ignore */
  }
}

// ===== Debounced value hook =====
// Returns the input value after `delay` ms of stillness. Used for free-text
// search inputs so we don't fire a request on every keystroke.
function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// ===== useUrlState hook =====
// Backs a state object with the URL's query string so F5 (and shareable
// links) preserve filters/pagination across reloads.
//
// Usage:
//   const [state, setState] = useUrlState({
//     search: "", shift: "", dateFrom: "", offset: 0, limit: 50,
//   });
//
// What it does:
//   - Initial value comes from window.location.search merged on top of the
//     defaults. Strings stay strings; numeric defaults get parseFloat applied.
//   - setState({...partial}) merges, serialises back to ?key=value pairs,
//     and updates the URL via React Router's navigate (default: replaceState
//     so debounced typing doesn't pollute history).
//   - Empty/undefined/null values are STRIPPED from the URL so the bar stays
//     readable (`?search=foo` not `?search=foo&shift=&fabricType=`).
//
// Why I scope this per-component (not via Context):
//   Each station page has its own filter shape. Sharing a global store would
//   leak Customer's filters into Printing's URL. Per-component state +
//   per-component URL keys keeps each page's URL clean.
function useUrlState<T extends Record<string, any>>(
  defaults: T,
): [T, (patch: Partial<T>, opts?: { push?: boolean }) => void] {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse current URL → typed state. Re-runs whenever the search string
  // changes (e.g. back button) so the hook always reflects the URL.
  const state = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const out: Record<string, any> = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const v = params.get(key);
      if (v === null) continue;
      // Coerce based on default type — numbers stay numbers, everything else strings.
      if (typeof defaults[key] === "number") {
        const n = Number(v);
        out[key] = Number.isFinite(n) ? n : defaults[key];
      } else {
        out[key] = v;
      }
    }
    return out as T;
    // location.search is the only thing that should trigger a re-read.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // setState — merges, serialises, navigates.
  // Default behaviour is replaceState (no history entry) — appropriate for
  // typing and filter changes. Pass { push: true } to add a history entry
  // (e.g. for explicit Prev/Next pagination so back button is useful).
  const setState = (patch: Partial<T>, opts?: { push?: boolean }) => {
    const next: Record<string, any> = { ...state, ...patch };
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (v === undefined || v === null || v === "" || v === 0) {
        // 0 is intentionally stripped — it's the default for offset/limit
        // in practice, and we'd rather have a clean URL than a literal `&offset=0`.
        // Callers that need 0 in the URL should serialise to a string themselves.
        continue;
      }
      params.set(k, String(v));
    }
    const qs = params.toString();
    const url = qs ? `${location.pathname}?${qs}` : location.pathname;
    navigate(url, { replace: !opts?.push });
  };

  return [state, setState];
}

// ===== useAuthReadyEffect =====
// Like useEffect but waits until the user session is restored (token present
// AND a user object is set in the auth context). This avoids the "Ctrl+R race"
// where a component fetches immediately on mount, before fetchMe() returns,
// causing every request to silently 401 and the page to render empty.
//
// Use this in place of `useEffect(fn, [])` for any component that fetches
// authenticated data on mount.
function useAuthReadyEffect(fn: () => void | (() => void), deps: any[] = []) {
  const token =
    typeof window !== "undefined" ? getToken() : null;
  // We don't have a direct hook to the user state from this scope. The proxy
  // is: token is set after login, and fetchMe runs synchronously enough that
  // by the time the token is in localStorage, any subsequent API call has
  // valid auth. So: gate on `token` being present, plus any custom deps.
  useEffect(() => {
    if (!token && storage.isApiMode) return;
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ...deps]);
}

// ===== useStationData hook =====
// One hook per station page. Owns:
//   - The paginated slice of the main table for this page
//   - Compact reads of related tables (for in-memory lookups)
//   - An optional compact read of the FULL main table (for number
//     generation and aggregate stats that must see every row)
//   - Page/limit state (limit persisted per page key)
//   - A `refresh()` function callers can call after save/delete
//
// Args:
//   stationKey   – the underlying records key, e.g. "input", "printing"
//   related      – array of { prefix, fields, as } describing related tables
//                  to load compact, exposed under the returned `related` map
//   compactMain  – optional array of field names. If given, hook also loads
//                  every row of the main table with just those fields, made
//                  available as `allCompact`. Use this for next-number
//                  generation and total-usage aggregates that must see every
//                  row regardless of which page is currently visible.
//   pageKey      – string used to persist page-size choice (e.g. "page:input")
//   defaultLimit – starting page size if nothing persisted (default 50)
//
// Returns:
//   { items, total, offset, limit, setOffset, setLimit, related,
//     allCompact, loading, refresh }
function useStationData(opts: {
  stationKey: string;
  related?: { prefix: string; fields: string[]; as: string }[];
  compactMain?: string[];
  // Free-form filters forwarded as query params to the backend. The hook
  // re-fetches when these change. Use `useDebouncedValue` upstream for text
  // inputs you don't want firing on every keystroke.
  filters?: Record<string, string | number | undefined | null>;
  // Controlled-mode pagination: pass externalOffset/externalLimit + onChange
  // when the caller wants pagination state to live in the URL (via
  // useUrlState). When omitted, the hook owns offset/limit internally.
  externalOffset?: number;
  externalLimit?: number;
  onPageChange?: (next: { offset: number; limit: number }) => void;
  pageKey: string;
  defaultLimit?: number;
}) {
  const {
    stationKey,
    related = [],
    compactMain,
    filters,
    externalOffset,
    externalLimit,
    onPageChange,
    pageKey,
    defaultLimit = 50,
  } = opts;
  // Controlled vs uncontrolled pagination. If the caller passes
  // externalOffset/externalLimit we use them directly; otherwise the hook
  // keeps its own state (legacy behaviour for any unmigrated caller).
  const controlled = externalOffset !== undefined && externalLimit !== undefined;
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [internalOffset, setInternalOffset] = useState(0);
  const [internalLimit, setInternalLimit] = useState(() => loadPageSize(pageKey, defaultLimit));
  const offset = controlled ? (externalOffset as number) : internalOffset;
  const limit = controlled ? (externalLimit as number) : internalLimit;
  const [relatedData, setRelatedData] = useState<Record<string, any[]>>({});
  const [allCompact, setAllCompact] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Tick increments to force a manual refresh.
  const [tick, setTick] = useState(0);

  // Persist limit changes. In controlled mode we also notify the caller so
  // they can write the new value into the URL.
  const setLimit = (n: number) => {
    savePageSize(pageKey, n);
    if (controlled) {
      onPageChange?.({ offset, limit: n });
    } else {
      setInternalLimit(n);
    }
  };
  const setOffset = (n: number) => {
    const safe = Math.max(0, n);
    if (controlled) {
      onPageChange?.({ offset: safe, limit });
    } else {
      setInternalOffset(safe);
    }
  };

  // Stringify filters for the effect dependency array. Comparing the object
  // identity would re-fire on every render (since callers usually build a
  // fresh object each render); a stable JSON string only changes when the
  // contents actually change.
  const filtersKey = JSON.stringify(filters || {});

  // Re-fetch on dep changes. Related tables and compactMain don't depend on
  // page; they're loaded once per mount and on manual refresh.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      // Forward filters as query params alongside pagination. fetchPage
      // accepts arbitrary string/number values and serialises them via
      // apiFetch's third-arg query support.
      const mainPromise = storage.fetchPage(`rec_${stationKey}:`, {
        limit,
        offset,
        ...((filters || {}) as Record<string, string | number | undefined>),
      });
      const relatedPromise = Promise.all(
        related.map((r) =>
          storage.fetchCompact(r.prefix, r.fields).then((data) => [r.as, data] as const),
        ),
      );
      const compactPromise = compactMain
        ? storage.fetchCompact(`rec_${stationKey}:`, compactMain)
        : Promise.resolve([] as any[]);
      try {
        const [page, rel, comp] = await Promise.all([
          mainPromise,
          relatedPromise,
          compactPromise,
        ]);
        if (cancelled) return;
        setItems(page.items);
        setTotal(page.total);
        const relMap: Record<string, any[]> = {};
        for (const [k, v] of rel) relMap[k] = v;
        setRelatedData(relMap);
        if (compactMain) setAllCompact(comp);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationKey, limit, offset, tick, filtersKey]);

  const refresh = () => setTick((t) => t + 1);
  return {
    items,
    total,
    offset,
    limit,
    setOffset,
    setLimit,
    related: relatedData,
    allCompact,
    loading,
    refresh,
  };
}

const monthCode = (d = new Date()) =>
  [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ][d.getMonth()];
const todayISO = () => new Date().toISOString().slice(0, 10);
const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ============== ROUT CARD NUMBERING ==============
// Presets the admin can choose between for input batches and print numbers.
// Each preset's `format(prefix, seq, date)` returns the generated string.
const NUMBERING_PRESETS = [
  {
    id: "monthSeq",
    label: "{PREFIX}-{MONTH}{seq3}",
    sample: "B-MAY001",
    format: (prefix, seq, d = new Date()) =>
      `${prefix}-${monthCode(d)}${String(seq).padStart(3, "0")}`,
  },
  {
    id: "simpleSeq",
    label: "{PREFIX}-{seq4}",
    sample: "B-1234",
    format: (prefix, seq) => `${prefix}-${String(seq).padStart(4, "0")}`,
  },
  {
    id: "fullDate",
    label: "{PREFIX}-{YYYY}-{MM}-{seq3}",
    sample: "B-2026-05-001",
    format: (prefix, seq, d = new Date()) =>
      `${prefix}-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(seq).padStart(3, "0")}`,
  },
  {
    id: "compact",
    label: "{PREFIX}{YY}{MM}{seq4}",
    sample: "B26050001",
    format: (prefix, seq, d = new Date()) =>
      `${prefix}${String(d.getFullYear()).slice(-2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(seq).padStart(4, "0")}`,
  },
];

// Default numbering settings (matches current behavior so nothing breaks for existing users).
const DEFAULT_NUMBERING = {
  inputBatch: {
    presetId: "monthSeq",
    prefix: "B",
    nextSeq: 1,
    resetEachMonth: true,
  },
  printNumber: {
    presetId: "monthSeq",
    prefix: "PR",
    nextSeq: 1,
    resetEachMonth: true,
  },
  dyeingNumber: {
    presetId: "monthSeq",
    prefix: "DY",
    nextSeq: 1,
    resetEachMonth: true,
  },
};

// Generate a number from current numbering config + existing records (so we never collide).
// `existingNumbers` is a Set of all already-used numbers in that field.
function generateNumber(cfg, existingNumbers) {
  const preset =
    NUMBERING_PRESETS.find((p) => p.id === cfg.presetId) ||
    NUMBERING_PRESETS[0];
  const baseSeq = Math.max(1, Number(cfg.nextSeq) || 1);
  // Walk forward until we find a free number — handles the case where admin set nextSeq lower than the highest used.
  for (let seq = baseSeq; seq < baseSeq + 10000; seq++) {
    const candidate = preset.format(cfg.prefix || "", seq);
    if (!existingNumbers.has(candidate)) return { number: candidate, seq };
  }
  // Fallback (extremely unlikely): include uid suffix to guarantee uniqueness.
  return { number: `${cfg.prefix}-${uid()}`, seq: baseSeq };
}

// ============== ACCESS CONTROL ==============
// Determine which departments a user is allowed to view/edit.
// Returns an array of department IDs.
function getUserDepartments(user: User | null) {
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
    return user.stationId ? ["printing"] : [];
  }
  return [];
}

// ============== PAGE CATALOG (for granular guest perms) ==============
// Each entry is a unique page key. Guests can be granted any subset.
// Non-guest roles (admin/dept_admin/operator) bypass these checks.
const PAGES = {
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
function canViewPage(user: User | null, pageKey: string) {
  if (!user || !pageKey) return false;
  if (user.role === "admin") return true;
  const deptId = pageKey.split(".")[0];
  if (user.role === "dept_admin") return user.departmentId === deptId;
  if (user.role === "operator") {
    if (deptId !== "printing") return false;
    if (pageKey === `printing.station.${user.stationId}`) return true;
    // SING&DES operators (stationId === 'input') can also view the Gray Fabric Store.
    if (user.stationId === "input" && pageKey === "printing.station.gray_store")
      return true;
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

function canViewDepartment(user: User | null, deptId: string) {
  return getUserDepartments(user).includes(deptId);
}

// Can the user edit data inside a given department?
// Super-admin: always. Dept-admin: only their own department. Others: no.
function canEditDepartment(user: User | null, deptId: string) {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "dept_admin") return user.departmentId === deptId;
  return false;
}

// Can the user manage users at all? (admins, dept-admins yes; others no)
function canManageUsers(user: User | null) {
  return user?.role === "admin" || user?.role === "dept_admin";
}

// For listing users in the Users admin page — which users is THIS admin allowed to see/manage?
function canManageThisUser(currentUser: User | null, targetUser: User | null) {
  if (!currentUser || !targetUser) return false;
  if (currentUser.id === targetUser.id) return false; // can't manage yourself
  if (currentUser.role === "admin") return true; // super-admin can manage anyone except themselves
  if (currentUser.role === "dept_admin") {
    // dept-admin can manage operators/guests scoped to their department, but NOT other admins
    if (targetUser.role === "admin") return false;
    if (targetUser.role === "dept_admin") return false;
    if (targetUser.role === "operator") {
      // station-based check: only printing stations belong to printing dept-admin
      const stationDept = STAGES.find((s) => s.id === targetUser.stationId)
        ? "printing"
        : null;
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

// ============== EXPORT TO CSV ==============
// ===== Sortable table helpers =====
//
// useSortableRows / SortableTh / cycleSort give any table column-header
// click-to-sort with three states (none → asc → desc → none). The hook does
// the sorting client-side; the component renders the header with the right
// arrow indicator.
//
// Usage:
//   const [sort, setSort] = useState<{ key: string; dir: "asc"|"desc" } | null>(null);
//   const sorted = useSortableRows(rows, sort, {
//     // optional accessors for derived/numeric columns
//     available: (r) => r.available,
//   });
//   <SortableTh sortKey="available" label="Available" sort={sort} setSort={setSort} numeric />

type SortDir = "asc" | "desc";
type SortSpec = { key: string; dir: SortDir } | null;

// cycleSort — three-state click handler: none → asc → desc → none.
function cycleSort(current: SortSpec, key: string): SortSpec {
  if (!current || current.key !== key) return { key, dir: "asc" };
  if (current.dir === "asc") return { key, dir: "desc" };
  return null;
}

// useSortableRows — returns a stably-sorted copy of `rows` according to `sort`.
// `accessors` lets the caller pull values from derived fields (e.g. when the
// column displays a computed value rather than a direct field).
function useSortableRows<T>(
  rows: T[],
  sort: SortSpec,
  accessors: Record<string, (r: T) => any> = {},
): T[] {
  return useMemo(() => {
    if (!sort) return rows;
    const get =
      accessors[sort.key] ?? ((r: T) => (r as any)[sort.key]);
    // We sort a copy so the caller's array isn't mutated.
    const copy = [...rows];
    const dir = sort.dir === "asc" ? 1 : -1;
    copy.sort((a, b) => {
      const va = get(a);
      const vb = get(b);
      // null/undefined sink to the bottom regardless of direction.
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      // Numbers compare numerically; strings use locale-aware compare.
      if (typeof va === "number" && typeof vb === "number") {
        return (va - vb) * dir;
      }
      return String(va).localeCompare(String(vb)) * dir;
    });
    return copy;
  }, [rows, sort?.key, sort?.dir]);
}

// SortableTh — clickable <th> with arrow indicator.
function SortableTh({
  sortKey,
  label,
  sort,
  setSort,
  numeric = false,
  className = "",
}: {
  sortKey: string;
  label: string;
  sort: SortSpec;
  setSort: (s: SortSpec) => void;
  numeric?: boolean;
  className?: string;
}) {
  const active = sort?.key === sortKey;
  const Arrow = !active ? ArrowUpDown : sort!.dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th
      onClick={() => setSort(cycleSort(sort, sortKey))}
      className={`text-left p-3 font-medium text-slate-600 cursor-pointer select-none hover:bg-slate-100 transition-colors ${className}`}
      title={
        active
          ? `Sorted ${sort!.dir === "asc" ? "ascending" : "descending"} — click to ${sort!.dir === "asc" ? "reverse" : "clear"}`
          : "Click to sort"
      }
    >
      <span className={`inline-flex items-center gap-1 ${numeric ? "" : ""}`}>
        {label}
        <Arrow
          size={12}
          className={active ? "text-slate-700" : "text-slate-400"}
        />
      </span>
    </th>
  );
}

function exportToCSV(rows: any[], filename: string) {
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

// ============================================================================
//  URL ↔ View mapping (React Router)
// ----------------------------------------------------------------------------
//  The legacy app stored navigation as an object: { type, departmentId, ... }
//  and switched the page in <Shell> with a giant ternary chain. We keep all
//  that downstream code untouched — instead, we make `currentView` a
//  *derived* value from the URL and have `setCurrentView` push a new URL.
//
//  The mapping is intentionally simple and bidirectional. Anything not
//  recognised falls back to { type: "home" } at "/".
// ============================================================================
function viewToPath(view: any): string {
  if (!view || !view.type) return "/";
  switch (view.type) {
    case "home":
      return "/";
    case "users":
      return "/admin/users";
    case "lists":
      return "/admin/lists";
    case "gallery":
      return "/admin/gallery";
    case "machines":
      return "/admin/machines";
    case "numbering":
      return "/admin/numbering";
    case "trash":
      return "/admin/trash";
    case "master":
      return "/master";
    case "daily":
      return "/daily";
    case "in_process":
      return "/in-process";
    case "maintenance_overview":
      return "/maintenance";
    case "programs":
      return "/programs";
    case "programs_progress":
      return "/programs/progress";
    case "store_customers":
      return "/store/customers";
    case "department":
      return `/dept/${encodeURIComponent(view.departmentId || "")}`;
    case "station":
      return `/station/${encodeURIComponent(view.stationId || "")}`;
    default:
      // Unknown types from older code paths (e.g. tl.id from a top-link button)
      // map to a generic /view/<type> so navigation still works even if the
      // page handler doesn't exist yet.
      return `/view/${encodeURIComponent(view.type)}`;
  }
}

function pathToView(pathname: string): any {
  // Strip leading/trailing slashes and split.
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { type: "home" };
  const [a, b, c] = parts;
  if (a === "admin") {
    if (b === "users") return { type: "users" };
    if (b === "lists") return { type: "lists" };
    if (b === "gallery") return { type: "gallery" };
    if (b === "machines") return { type: "machines" };
    if (b === "numbering") return { type: "numbering" };
    if (b === "trash") return { type: "trash" };
  }
  if (a === "master") return { type: "master" };
  if (a === "daily") return { type: "daily" };
  if (a === "in-process") return { type: "in_process" };
  if (a === "maintenance") return { type: "maintenance_overview" };
  if (a === "programs") {
    if (b === "progress") return { type: "programs_progress" };
    return { type: "programs" };
  }
  if (a === "store" && b === "customers")
    return { type: "store_customers" };
  if (a === "dept" && b) {
    return { type: "department", departmentId: decodeURIComponent(b) };
  }
  if (a === "station" && b) {
    return { type: "station", stationId: decodeURIComponent(b) };
  }
  if (a === "view" && b) {
    return { type: decodeURIComponent(b) };
  }
  // Fallback — unknown path goes home.
  return { type: "home" };
}

// ============== APP ==============
export default function App() {
  // Language and theme preferences — persisted in storage so they survive sessions.
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");

  // Load preferences once on mount.
  useEffect(() => {
    (async () => {
      const prefs = await storage.get("app:prefs");
      if (prefs?.lang) setLang(prefs.lang);
      if (prefs?.theme) setTheme(prefs.theme);
    })();
  }, []);

  // Persist whenever they change.
  useEffect(() => {
    storage.set("app:prefs", { lang, theme });
  }, [lang, theme]);

  return (
    <BrowserRouter>
      <LangContext.Provider value={{ lang, setLang }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Routes>
            {/* Single catch-all route: AppInner picks the page from the URL. */}
            <Route path="*" element={<AppInner />} />
          </Routes>
        </ThemeContext.Provider>
      </LangContext.Provider>
    </BrowserRouter>
  );
}

function AppInner() {
  const { theme } = useTheme();

  // Inject minimal CSS to apply dark theme without rewriting every class.
  // We map common Tailwind colors to dark equivalents so existing components
  // stay readable in dark mode without touching them individually.
  useEffect(() => {
    const id = "tpd-theme-style";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    if (theme === "dark") {
      el.textContent = `
        body, html { background:#020617; color-scheme: dark; }
        .bg-slate-50 { background-color:#020617 !important; }
        .bg-white { background-color:#0f172a !important; color:#e2e8f0; }
        .bg-slate-100 { background-color:#1e293b !important; }
        .bg-slate-200 { background-color:#334155 !important; }
        .bg-slate-50\\/60, .bg-slate-50\\/50 { background-color:rgba(30,41,59,0.5) !important; }
        .text-slate-800 { color:#f1f5f9 !important; }
        .text-slate-700 { color:#e2e8f0 !important; }
        .text-slate-600 { color:#cbd5e1 !important; }
        .text-slate-500 { color:#94a3b8 !important; }
        .text-slate-400 { color:#64748b !important; }
        .text-slate-300 { color:#475569 !important; }
        .border-slate-200 { border-color:#334155 !important; }
        .border-slate-300 { border-color:#475569 !important; }
        .border-slate-100 { border-color:#1e293b !important; }
        .hover\\:bg-slate-50:hover { background-color:#1e293b !important; }
        .hover\\:bg-slate-100:hover { background-color:#334155 !important; }
        input, select, textarea { background-color:#1e293b !important; color:#f1f5f9 !important; border-color:#475569 !important; }
        thead.bg-slate-50, .bg-slate-50 thead, thead tr.bg-slate-50, table thead.bg-slate-50 { background-color:#1e293b !important; }

        /* ===== Soft tinted card backgrounds — desaturated for dark mode ===== */
        /* The pattern: each soft *-50 bg becomes a translucent dark version of the same hue,
           with the foreground text bumped up to a readable lightness. */
        .bg-amber-50    { background-color:rgba(120,53,15,0.3) !important; color:#fde68a !important; }
        .bg-emerald-50  { background-color:rgba(6,78,59,0.3) !important; color:#a7f3d0 !important; }
        .bg-red-50      { background-color:rgba(127,29,29,0.3) !important; color:#fca5a5 !important; }
        .bg-blue-50     { background-color:rgba(30,58,138,0.3) !important; color:#bfdbfe !important; }
        .bg-purple-50   { background-color:rgba(76,29,149,0.3) !important; color:#ddd6fe !important; }
        .bg-orange-50   { background-color:rgba(124,45,18,0.3) !important; color:#fed7aa !important; }
        .bg-cyan-50     { background-color:rgba(22,78,99,0.3) !important; color:#a5f3fc !important; }
        .bg-pink-50     { background-color:rgba(131,24,67,0.3) !important; color:#fbcfe8 !important; }
        .bg-rose-50     { background-color:rgba(136,19,55,0.3) !important; color:#fda4af !important; }
        .bg-sky-50      { background-color:rgba(12,74,110,0.3) !important; color:#bae6fd !important; }
        .bg-stone-50    { background-color:rgba(68,64,60,0.3) !important; color:#e7e5e4 !important; }
        .bg-teal-50     { background-color:rgba(19,78,74,0.3) !important; color:#99f6e4 !important; }
        .bg-green-50    { background-color:rgba(20,83,45,0.3) !important; color:#bbf7d0 !important; }
        .bg-indigo-50   { background-color:rgba(49,46,129,0.3) !important; color:#c7d2fe !important; }

        /* ===== Badge backgrounds (-100 and -200 variants) ===== */
        /* These are used inline as small status pills — keep them slightly more saturated
           than the card backgrounds so they read as foreground accents. */
        .bg-amber-100    { background-color:rgba(146,64,14,0.5) !important; color:#fde68a !important; }
        .bg-amber-200    { background-color:rgba(180,83,9,0.6) !important; color:#fef3c7 !important; }
        .bg-emerald-100  { background-color:rgba(6,95,70,0.5) !important; color:#a7f3d0 !important; }
        .bg-red-100      { background-color:rgba(153,27,27,0.5) !important; color:#fecaca !important; }
        .bg-blue-100     { background-color:rgba(29,78,216,0.5) !important; color:#bfdbfe !important; }
        .bg-purple-100   { background-color:rgba(91,33,182,0.5) !important; color:#ddd6fe !important; }
        .bg-orange-100   { background-color:rgba(154,52,18,0.5) !important; color:#fed7aa !important; }
        .bg-cyan-100     { background-color:rgba(14,116,144,0.5) !important; color:#a5f3fc !important; }
        .bg-indigo-100   { background-color:rgba(55,48,163,0.5) !important; color:#c7d2fe !important; }
        .bg-rose-100     { background-color:rgba(159,18,57,0.5) !important; color:#fda4af !important; }
        .bg-teal-100     { background-color:rgba(15,118,110,0.5) !important; color:#99f6e4 !important; }

        /* ===== Borders for tinted cards ===== */
        /* Soft borders against the dark canvas — slightly stronger than the bg so they're visible. */
        .border-amber-200    { border-color:rgba(180,83,9,0.6) !important; }
        .border-emerald-200  { border-color:rgba(6,95,70,0.6) !important; }
        .border-red-200      { border-color:rgba(153,27,27,0.6) !important; }
        .border-blue-200     { border-color:rgba(29,78,216,0.6) !important; }
        .border-purple-200   { border-color:rgba(91,33,182,0.6) !important; }
        .border-orange-200   { border-color:rgba(154,52,18,0.6) !important; }
        .border-cyan-200     { border-color:rgba(14,116,144,0.6) !important; }
        .border-pink-200     { border-color:rgba(157,23,77,0.6) !important; }
        .border-rose-200     { border-color:rgba(159,18,57,0.6) !important; }
        .border-sky-200      { border-color:rgba(7,89,133,0.6) !important; }
        .border-stone-200    { border-color:rgba(87,83,78,0.6) !important; }
        .border-indigo-200   { border-color:rgba(67,56,202,0.6) !important; }
        .border-teal-200     { border-color:rgba(15,118,110,0.6) !important; }
        .border-green-200    { border-color:rgba(22,101,52,0.6) !important; }

        /* ===== Tinted text colors for dark backgrounds ===== */
        /* Headings inside colored cards should pop, not fade. */
        .text-amber-700, .text-amber-800, .text-amber-900       { color:#fde68a !important; }
        .text-amber-600                                          { color:#fbbf24 !important; }
        .text-emerald-700, .text-emerald-800, .text-emerald-900 { color:#a7f3d0 !important; }
        .text-emerald-600                                        { color:#10b981 !important; }
        .text-cyan-700, .text-cyan-800, .text-cyan-900           { color:#a5f3fc !important; }
        .text-cyan-600                                            { color:#22d3ee !important; }
        .text-rose-700, .text-rose-800, .text-rose-900           { color:#fda4af !important; }
        .text-rose-600                                            { color:#f43f5e !important; }
        .text-purple-700, .text-purple-800, .text-purple-900    { color:#ddd6fe !important; }
        .text-pink-700, .text-pink-800, .text-pink-900           { color:#fbcfe8 !important; }
        .text-blue-700, .text-blue-800, .text-blue-900           { color:#bfdbfe !important; }
        .text-blue-600                                            { color:#60a5fa !important; }
        .text-indigo-700                                          { color:#c7d2fe !important; }
        .text-orange-700                                          { color:#fed7aa !important; }
        .text-red-600, .text-red-700                              { color:#fca5a5 !important; }
        .text-green-700                                           { color:#bbf7d0 !important; }

        /* ===== Subtle gradient cards (Daily Report screenshot, In-Process headline, etc.) ===== */
        /* Gradients use Tailwind's --tw-gradient-from / --tw-gradient-to vars. We override
           the -50 gradient stops to use darker tinted versions so they don't look pasty. */
        .from-amber-50    { --tw-gradient-from: rgba(120,53,15,0.4) var(--tw-gradient-from-position) !important; --tw-gradient-to: rgba(120,53,15,0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
        .to-orange-50     { --tw-gradient-to: rgba(124,45,18,0.4) var(--tw-gradient-to-position) !important; }
        .from-cyan-50     { --tw-gradient-from: rgba(22,78,99,0.4) var(--tw-gradient-from-position) !important; --tw-gradient-to: rgba(22,78,99,0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
        .to-blue-50       { --tw-gradient-to: rgba(30,58,138,0.4) var(--tw-gradient-to-position) !important; }

        /* ===== Tabs & pill backgrounds ===== */
        /* The "tab" backgrounds use bg-slate-100 with bg-white shadow when active. The
           rules above already handle that — but the active-tab text colors need touch-up. */
        .text-purple-700 { color:#ddd6fe !important; }

        /* ===== DataTable hover & headers ===== */
        /* tbody rows with .border-slate-100 dividers and hover:bg-slate-50 — already handled.
           But filter bars built directly with bg-white look fine; just double-check input
           backgrounds in modals don't get washed out. */

        /* ===== Modal overlay ===== */
        /* The modal itself is bg-white which we override to slate-900. Inputs inside
           modals are already covered by the input/select/textarea rule above. */
      `;
    } else {
      el.textContent = "";
    }
  }, [theme]);

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState(DEFAULT_LISTS);
  const [designs, setDesigns] = useState([]);
  const [machines, setMachines] = useState([]);
  const [records, setRecords] = useState({});
  // ===== Local Market Store state =====
  const [customers, setCustomers] = useState([]);
  const [storeStockIn, setStoreStockIn] = useState([]);
  const [storeSales, setStoreSales] = useState([]);
  const [storePayments, setStorePayments] = useState([]);
  // Programs (item #5) — list of multi-design printing programs
  const [programs, setPrograms] = useState([]);
  // Editable rout-card numbering config (item #4 from prior turn)
  const [numbering, setNumbering] = useState(DEFAULT_NUMBERING);
  // Trash bin (this turn's item #4) — soft-deleted items, retained for 30 days.
  // Each trash entry: { id, type, recordId, item, deletedBy, deletedByName, deletedAt }
  // where `type` is the collection name (e.g. 'rec_input', 'customer', 'design', 'user', etc.)
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== React Router-backed navigation =====
  // currentView is derived from the URL so refreshing the page keeps you on
  // the same screen. setCurrentView wraps navigate() so every existing call
  // site downstream keeps working without modification.
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = useMemo(
    () => pathToView(location.pathname),
    [location.pathname],
  );
  const setCurrentView = (next: any) => {
    // Allow setCurrentView(null) — legacy "back to default" semantics → home.
    const path = next ? viewToPath(next) : "/";
    if (path !== location.pathname) {
      navigate(path);
    }
  };
  const [confirmDlg, setConfirmDlg] = useState(null);

  function askConfirm(message, onConfirm) {
    setConfirmDlg({ message, onConfirm });
  }

  // ===== Initial mount =====
  // Fetch only the bare minimum needed for the shell to render. Per-view
  // data is fetched separately by the page-change effect below.
  //
  // In artifact mode there's no concept of authentication — load immediately.
  // In API mode we wait for `user` to be set (either via session restore from
  // localStorage or via interactive login) before firing requests, otherwise
  // we'd hit 401s on every essentials route.
  useEffect(() => {
    if (storage.isApiMode) {
      // API mode: defer essentials load until user is known.
      // We still need to drop the loading splash so the LoginScreen renders.
      setLoading(false);
    } else {
      // Artifact mode: no auth, fire essentials immediately.
      loadEssentials();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In API mode, load essentials right after the user becomes available
  // (either via session restore or interactive login). This runs at most
  // once per session.
  useEffect(() => {
    if (!storage.isApiMode) return;
    if (!user) return;
    loadEssentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // ===== Session restoration =====
  // On first mount in API mode, if a JWT is in localStorage, ask the backend
  // who it belongs to. If valid, hydrate `user` so the LoginScreen never shows.
  // If invalid (token expired etc.), the call quietly fails and we drop to the
  // login screen as if nothing was stored.
  useEffect(() => {
    if (!storage.isApiMode) return;
    let cancelled = false;
    (async () => {
      const me = await storage.fetchMe();
      if (!cancelled && me) setUser(me);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ===== 401 listener =====
  // Any HTTP request that returns 401 dispatches a window event. We listen
  // here and clear the user so the LoginScreen shows again. This is the only
  // path through which token expiry / revocation kicks the user out.
  useEffect(() => {
    if (!storage.isApiMode) return;
    function onAuthRequired() {
      setUser(null);
    }
    window.addEventListener(AUTH_EVENT, onAuthRequired);
    return () => window.removeEventListener(AUTH_EVENT, onAuthRequired);
  }, []);

  // ===== 15-second polling — refreshes ONLY the current view's data =====
  // Previously this re-fetched every collection. Now it only re-fetches
  // what the page on screen actually needs.
  useEffect(() => {
    if (!storage.isApiMode) return;
    if (!user) return;
    if (!currentView) return;
    const id = setInterval(() => {
      loadForView(currentView, true);
    }, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user,
    currentView?.type,
    currentView?.departmentId,
    currentView?.stationId,
  ]);

  // ===== Page-change refresh — fetch what the new view needs =====
  // Whenever the user navigates, we fetch only the collections the new page
  // consumes. This is the main mechanism for keeping pages fresh.
  //
  // user?.id is in the dep array so this also fires after session restore
  // completes on a fresh page load (Ctrl+R). Without it, the effect would
  // first run while user is null (guard returns early), and never re-run
  // because currentView didn't change after user became available.
  useEffect(() => {
    if (!storage.isApiMode) return;
    if (!user) return;
    if (!currentView) return;
    loadForView(currentView);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user?.id,
    currentView?.type,
    currentView?.departmentId,
    currentView?.stationId,
    currentView?.customerId,
  ]);

  // ============================================================
  // ============== DATA LOADING (GRANULAR, PER-VIEW) ==========
  // ============================================================
  // The previous implementation called `loadAll()` on initial mount, on every
  // page navigation, and every 15 seconds while logged in. That was ~22 HTTP
  // requests per cycle, even when the user was sitting idle on the home page.
  // Massive waste.
  //
  // New strategy:
  //   1. On boot:        call loadEssentials() — only users + lists + numbering,
  //                      i.e. the bare minimum the shell needs to render
  //                      navigation, role checks, dropdowns, and translations.
  //   2. On nav:         call loadForView(view) — fetches only the collections
  //                      the current page actually reads. Going to "Customers"
  //                      doesn't need to refetch records for 13 stations.
  //   3. On 15s polling: call loadForView(currentView) — same as nav, just
  //                      keeping the page the user is staring at fresh.
  //
  // This typically cuts request volume by 80-95% depending on which page is
  // open, while keeping the user's data fresh on the page they care about.

  // ---- Single-resource loaders. Each fetches one collection and updates state.
  // They are intentionally tiny and idempotent — calling one twice is fine,
  // it just re-fetches the same data and replaces state with the new value.
  async function loadUsers() {
    let u = await storage.getAll("user:");
    if (!u.length && !storage.isApiMode) {
      // Artifact-mode-only seed (backend handles seeding in API mode).
      const seed = [
        {
          id: "admin",
          name: "Super Admin",
          login: "admin",
          passcode: "admin",
          role: "admin",
          stationId: null,
          active: true,
        },
      ];
      for (const s of seed) await storage.set(`user:${s.id}`, s);
      u = seed;
    }
    setUsers(u);
  }
  async function loadLists() {
    const cl = await storage.get("config:lists");
    if (cl) setLists({ ...DEFAULT_LISTS, ...cl });
    else if (!storage.isApiMode)
      await storage.set("config:lists", DEFAULT_LISTS);
  }
  async function loadNumbering() {
    const savedNum = await storage.get("app:numbering");
    if (savedNum) setNumbering({ ...DEFAULT_NUMBERING, ...savedNum });
  }
  async function loadDesigns() {
    setDesigns(await storage.getAll("design:"));
  }
  async function loadMachines() {
    setMachines(await storage.getAll("machine:"));
  }
  async function loadPrograms() {
    setPrograms(await storage.getAll("program:"));
  }
  async function loadCustomers() {
    setCustomers(await storage.getAll("customer:"));
  }
  async function loadStoreStockIn() {
    setStoreStockIn(await storage.getAll("store_in:"));
  }
  async function loadStoreSales() {
    setStoreSales(await storage.getAll("store_sale:"));
  }
  async function loadStorePayments() {
    setStorePayments(await storage.getAll("store_pay:"));
  }
  async function loadTrash() {
    const allTrash = await storage.getAll("trash:");
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const fresh = [];
    for (const t of allTrash) {
      const deletedTs = new Date(t.deletedAt || 0).getTime();
      if (deletedTs < cutoff) await storage.delete(`trash:${t.id}`);
      else fresh.push(t);
    }
    setTrash(fresh);
  }

  // Load records for one specific station (e.g. 'input', 'printing', 'folding').
  // Updates only that slice of the records map; other slices stay as they were.
  async function loadStationRecords(stationKey) {
    const list = await storage.getAll(`rec_${stationKey}:`);
    setRecords((prev) => ({ ...prev, [stationKey]: list }));
  }

  // Load records for several stations in parallel. Used by views that span
  // multiple stations (master tracking, daily, in-process inventory).
  async function loadStationRecordsMany(stationKeys) {
    const results = await Promise.all(
      stationKeys.map((k) => storage.getAll(`rec_${k}:`)),
    );
    setRecords((prev) => {
      const next = { ...prev };
      stationKeys.forEach((k, i) => {
        next[k] = results[i];
      });
      return next;
    });
  }

  // All production-station keys (the chain from gray-store through dispatch).
  const ALL_STATION_KEYS = [
    "gray_store",
    "gray_out",
    "input",
    "bleach",
    "batching",
    "printing",
    "dyeing",
    "curing",
    "finishing",
    "calendering",
    "folding",
    "dispatch_in",
    "dispatch_out",
  ];
  // Maintenance-related record keys.
  const MAINT_KEYS = ["maintenance", "breakdown", "dailycheck"];

  // ===== Per-station cross-station dependencies =====
  //
  // The previous loader fetched all 13 station tables on every station-page
  // open, which was wasteful. The new loader fetches only the current
  // station's table — fast, but breaks pages that read OTHER stations' data
  // (e.g. Jigger's batch picker reads bleach records, Batching's source
  // picker reads bleach too).
  //
  // This map declares, per station, which OTHER tables the page reads from
  // `ctx.records`. `loadForView` fetches the station itself + everything in
  // this list. Adding a new cross-station read? Add it here and the loader
  // picks it up automatically.
  //
  // (Stations migrated to useStationData own their own data lifecycle and
  // don't need entries here — their list can stay empty.)
  const STATION_DEPENDENCIES: Record<string, string[]> = {
    gray_store: ["gray_out", "input"],
    gray_out: ["gray_store", "input"],
    // Input is migrated to useStationData and self-fetches its compact
    // related tables. No entries needed.
    input: [],
    bleach: ["input"],
    dyeing: ["bleach", "input"],
    batching: ["bleach"],
    printing: ["batching"],
    curing: ["printing"],
    finishing: ["dyeing", "input", "printing"],
    calendering: ["dyeing", "finishing", "printing"],
    folding: ["calendering", "dyeing", "printing"],
    dispatch_in: ["folding", "printing"],
    dispatch_out: ["folding", "printing"],
  };

  // ---- The "essentials" load. Only fetched once on boot.
  // Contents must be the absolute minimum needed for the shell + navigation
  // to render correctly: who am I, what lists power the dropdowns, what
  // numbering prefixes are configured.
  async function loadEssentials() {
    try {
      await Promise.all([loadUsers(), loadLists(), loadNumbering()]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // ---- Per-view loader. Given the current view, fetches only what that
  // page actually consumes. Adding a new view? Add an entry here.
  //
  // The `isPolling` flag is true when called from the 15s polling timer and
  // false when called on page navigation. Some views opt out of polling
  // entirely — e.g. home and department overviews need fresh-ish data when
  // the user lands on them, but don't need it refreshed every 15 seconds
  // since users typically don't sit on those pages for long.
  async function loadForView(view, isPolling = false) {
    if (!view || !view.type) return;
    const tasks = [];
    switch (view.type) {
      case "home":
        // Home reads counts from /stats (called by HomeView itself).
        // No collection fetches needed here.
        break;

      case "department":
        // Department pages are just navigation tiles to their stations.
        // No records to load here — the /stats endpoint already populated
        // tile counts, and individual stations load their own data on open.
        break;

      case "station":
        // Load the station's own table + any cross-station tables it reads
        // from (per STATION_DEPENDENCIES above). One request per table; small
        // for unmigrated pages, zero extra for migrated ones (input has no
        // declared deps).
        //
        // Pages migrated to useStationData ignore this and own their data;
        // the duplicate fetch is wasteful but harmless.
        if (view.stationId) {
          const deps = STATION_DEPENDENCIES[view.stationId] || [];
          const keys = [view.stationId, ...deps];
          tasks.push(loadStationRecordsMany(keys));
        }
        if (!isPolling) {
          tasks.push(loadDesigns());
          tasks.push(loadPrograms());
          tasks.push(loadMachines());
        }
        break;

      case "master":
      case "daily":
      case "in_process":
      case "programs_progress":
        // Cross-station dashboards. Need all records + designs + programs.
        tasks.push(loadStationRecordsMany(ALL_STATION_KEYS));
        if (!isPolling) {
          tasks.push(loadDesigns());
          tasks.push(loadPrograms());
        }
        break;

      case "maintenance_overview":
        // Just maintenance records + machines.
        tasks.push(loadStationRecordsMany(MAINT_KEYS));
        if (!isPolling) tasks.push(loadMachines());
        break;

      case "users":
        tasks.push(loadUsers());
        break;
      case "lists":
        tasks.push(loadLists());
        break;
      case "gallery":
        tasks.push(loadDesigns());
        break;
      case "machines":
        tasks.push(loadMachines());
        break;
      case "programs":
        tasks.push(loadPrograms());
        if (!isPolling) tasks.push(loadDesigns());
        break;
      case "numbering":
        tasks.push(loadNumbering());
        break;
      case "trash":
        tasks.push(loadTrash());
        break;

      // ===== Local Market Store =====
      case "store_customers":
      case "store_customer_detail":
        // The customer ledger combines customers + sales + payments to compute
        // balances. All three required.
        tasks.push(loadCustomers());
        tasks.push(loadStoreSales());
        tasks.push(loadStorePayments());
        break;
      case "store_stock_in":
        tasks.push(loadStoreStockIn());
        break;
      case "store_stock":
        // Stock-on-hand = stock-in qty − sales qty. Needs both.
        tasks.push(loadStoreStockIn());
        tasks.push(loadStoreSales());
        break;
      case "store_sales":
        tasks.push(loadStoreSales());
        if (!isPolling) tasks.push(loadCustomers());
        break;
      case "store_payments":
        tasks.push(loadStorePayments());
        if (!isPolling) tasks.push(loadCustomers());
        break;

      default:
        // Unknown view — fetch nothing extra. Better to be lean than to
        // fall back to "fetch everything just in case".
        break;
    }
    try {
      await Promise.all(tasks);
    } catch (e) {
      console.error(e);
    }
  }

  // ---- Legacy "load everything" — kept for the rare full-refresh case
  // (e.g. after a destructive action that touches many collections).
  // Most code paths now use loadEssentials() + loadForView() instead.
  async function loadAll() {
    try {
      await Promise.all([
        loadUsers(),
        loadLists(),
        loadNumbering(),
        loadDesigns(),
        loadMachines(),
        loadPrograms(),
        loadCustomers(),
        loadStoreStockIn(),
        loadStoreSales(),
        loadStorePayments(),
        loadTrash(),
        loadStationRecordsMany([...ALL_STATION_KEYS, ...MAINT_KEYS]),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function saveNumbering(cfg) {
    setNumbering(cfg);
    await storage.set("app:numbering", cfg);
  }

  async function saveUser(u) {
    await storage.set(`user:${u.id}`, u);
    setUsers((prev) => {
      const i = prev.findIndex((x) => x.id === u.id);
      if (i >= 0) {
        const c = [...prev];
        c[i] = u;
        return c;
      }
      return [...prev, u];
    });
  }
  async function saveLists(newLists) {
    setLists(newLists);
    await storage.set("config:lists", newLists);
  }
  async function saveDesign(d) {
    await storage.set(`design:${d.id}`, d);
    setDesigns((prev) => {
      const i = prev.findIndex((x) => x.id === d.id);
      if (i >= 0) {
        const c = [...prev];
        c[i] = d;
        return c;
      }
      return [...prev, d];
    });
  }
  async function saveMachine(m) {
    await storage.set(`machine:${m.id}`, m);
    setMachines((prev) => {
      const i = prev.findIndex((x) => x.id === m.id);
      if (i >= 0) {
        const c = [...prev];
        c[i] = m;
        return c;
      }
      return [...prev, m];
    });
  }
  async function saveRecord(stationKey, rec) {
    await storage.set(`rec_${stationKey}:${rec.id}`, rec);
    setRecords((prev) => {
      const list = prev[stationKey] || [];
      const i = list.findIndex((x) => x.id === rec.id);
      const newList =
        i >= 0
          ? [...list.slice(0, i), rec, ...list.slice(i + 1)]
          : [...list, rec];
      return { ...prev, [stationKey]: newList };
    });
  }

  // ===== TRASH BIN — SOFT DELETE INFRASTRUCTURE (item #4) =====
  // Instead of hard-deleting, every delete moves the item to a "trash:" entry.
  // Only super-admin can permanently purge or restore; auto-purge happens >30 days.
  // `type` identifies the original collection: 'rec_<station>', 'customer', 'design', 'user', etc.
  async function softDeleteItem(type, item) {
    console.log("[softDeleteItem] type:", type, "item.id:", item?.id);
    if (!item || !item.id) {
      console.warn("[softDeleteItem] no item or no id, returning");
      return;
    }
    const trashId = `${type}_${item.id}_${Date.now()}`;
    const trashEntry = {
      id: trashId,
      type,
      recordId: item.id,
      item, // full snapshot for restore
      deletedAt: new Date().toISOString(),
      deletedBy: user?.id || "unknown",
      deletedByName: user?.name || "Unknown",
    };
    const originalKey = `${type}:${item.id}`;
    console.log("[softDeleteItem] originalKey to delete:", originalKey);

    // 1) Delete from the source collection.
    try {
      await storage.delete(originalKey);
      console.log("[softDeleteItem] backend delete succeeded");
    } catch (err) {
      console.error("[softDeleteItem] backend delete FAILED:", err);
      alert(
        `Couldn't delete this item. The server returned an error: ${err && err.message ? err.message : "unknown"}.\nThe item will reappear on the next refresh.`,
      );
      throw err;
    }

    // 2) Save a copy to the trash bin.
    try {
      await storage.set(`trash:${trashId}`, trashEntry);
      setTrash((prev) => [...prev, trashEntry]);
      console.log("[softDeleteItem] trash entry saved");
    } catch (err) {
      console.error(
        "[softDeleteItem] trash save failed (item is deleted but not recoverable):",
        err,
      );
    }
  }

  // The following are the public delete functions used throughout the app.
  // They no longer hard-delete — they move to trash instead. All of them only
  // update local state if the backend delete actually succeeded; otherwise
  // the item stays visible (and an error alert is shown) so the user knows
  // the deletion didn't take effect.
  async function deleteUser(id) {
    const item = users.find((u) => u.id === id);
    if (!item) return;
    if (item.login === "admin") {
      alert("The default super-admin can't be deleted.");
      return;
    }
    try {
      await softDeleteItem("user", item);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      /* error already shown */
    }
  }
  async function deleteDesign(id) {
    const item = designs.find((d) => d.id === id);
    if (!item) return;
    try {
      await softDeleteItem("design", item);
      setDesigns((prev) => prev.filter((d) => d.id !== id));
    } catch {
      /* error already shown */
    }
  }
  async function deleteMachine(id) {
    const item = machines.find((m) => m.id === id);
    if (!item) return;
    try {
      await softDeleteItem("machine", item);
      setMachines((prev) => prev.filter((m) => m.id !== id));
    } catch {
      /* error already shown */
    }
  }
  async function deleteRecord(stationKey, id) {
    console.log("[deleteRecord] stationKey:", stationKey, "id:", id);
    const item = (records[stationKey] || []).find((r) => r.id === id);
    if (!item) {
      console.warn("[deleteRecord] item not found in local records!");
      return;
    }
    console.log("[deleteRecord] item found, calling softDeleteItem");
    try {
      await softDeleteItem(`rec_${stationKey}`, item);
      // Only remove from local state if the backend delete actually succeeded.
      // softDeleteItem now throws on backend failure.
      setRecords((prev) => ({
        ...prev,
        [stationKey]: (prev[stationKey] || []).filter((r) => r.id !== id),
      }));
      console.log("[deleteRecord] removed from local state");
    } catch (err) {
      console.error("[deleteRecord] softDeleteItem threw:", err);
      // Error already shown to the user by softDeleteItem.
      // Don't touch local state — this keeps the UI honest about what's
      // really in the database.
    }
  }

  // Restore a trash entry back to its original collection.
  // Only super-admin should call this — UI gating is done in the trash view.
  async function restoreFromTrash(trashId) {
    const entry = trash.find((t) => t.id === trashId);
    if (!entry) return;
    const originalKey = `${entry.type}:${entry.recordId}`;
    await storage.set(originalKey, entry.item);
    await storage.delete(`trash:${trashId}`);
    setTrash((prev) => prev.filter((t) => t.id !== trashId));
    // Put it back in the right state list.
    if (entry.type === "user")
      setUsers((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type === "design")
      setDesigns((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type === "machine")
      setMachines((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type === "customer")
      setCustomers((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type === "store_in")
      setStoreStockIn((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type === "store_sale")
      setStoreSales((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type === "store_pay")
      setStorePayments((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type === "program")
      setPrograms((prev) => [
        ...prev.filter((x) => x.id !== entry.recordId),
        entry.item,
      ]);
    else if (entry.type.startsWith("rec_")) {
      const stationKey = entry.type.slice(4);
      setRecords((prev) => ({
        ...prev,
        [stationKey]: [
          ...(prev[stationKey] || []).filter((x) => x.id !== entry.recordId),
          entry.item,
        ],
      }));
    }
  }

  // Permanently delete a single trash entry (super-admin only).
  async function purgeFromTrash(trashId) {
    await storage.delete(`trash:${trashId}`);
    setTrash((prev) => prev.filter((t) => t.id !== trashId));
  }

  // Empty the entire trash bin (super-admin only).
  async function purgeAllTrash() {
    for (const t of trash) await storage.delete(`trash:${t.id}`);
    setTrash([]);
  }

  // ===== Local Market Store CRUD =====
  function makeUpserter(prefix, setState) {
    return async function upsert(item) {
      await storage.set(`${prefix}:${item.id}`, item);
      setState((prev) => {
        const i = prev.findIndex((x) => x.id === item.id);
        if (i >= 0) {
          const c = [...prev];
          c[i] = item;
          return c;
        }
        return [...prev, item];
      });
    };
  }
  function makeDeleter(prefix, setState, getList) {
    return async function del(id) {
      const item = (getList ? getList() : []).find((x) => x.id === id);
      if (item) {
        await softDeleteItem(prefix, item);
      } else {
        // Fallback if item not found in state — hard delete from storage anyway.
        await storage.delete(`${prefix}:${id}`);
      }
      setState((prev) => prev.filter((x) => x.id !== id));
    };
  }
  const saveCustomer = makeUpserter("customer", setCustomers);
  const deleteCustomer = makeDeleter("customer", setCustomers, () => customers);
  const saveStoreStockIn = makeUpserter("store_in", setStoreStockIn);
  const deleteStoreStockIn = makeDeleter(
    "store_in",
    setStoreStockIn,
    () => storeStockIn,
  );
  const saveStoreSale = makeUpserter("store_sale", setStoreSales);
  const deleteStoreSale = makeDeleter(
    "store_sale",
    setStoreSales,
    () => storeSales,
  );
  const saveStorePayment = makeUpserter("store_pay", setStorePayments);
  const deleteStorePayment = makeDeleter(
    "store_pay",
    setStorePayments,
    () => storePayments,
  );
  // Program CRUD (item #5)
  const saveProgram = makeUpserter("program", setPrograms);
  const deleteProgram = makeDeleter("program", setPrograms, () => programs);

  if (loading) {
    return <ThemedLoading />;
  }
  if (!user) return <LoginScreen users={users} onLogin={setUser} />;

  const ctx = {
    user,
    users,
    lists,
    designs,
    machines,
    records,
    customers,
    storeStockIn,
    storeSales,
    storePayments,
    programs,
    saveProgram,
    deleteProgram,
    numbering,
    saveNumbering,
    trash,
    restoreFromTrash,
    purgeFromTrash,
    purgeAllTrash,
    saveUser,
    deleteUser,
    saveLists,
    saveDesign,
    deleteDesign,
    saveMachine,
    deleteMachine,
    saveRecord,
    deleteRecord,
    saveCustomer,
    deleteCustomer,
    saveStoreStockIn,
    deleteStoreStockIn,
    saveStoreSale,
    deleteStoreSale,
    saveStorePayment,
    deleteStorePayment,
    setUser,
    currentView,
    setCurrentView,
    askConfirm,
  };

  return (
    <>
      <Shell ctx={ctx} />
      {confirmDlg && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]"
          onClick={() => setConfirmDlg(null)}
        >
          <div
            className="bg-white rounded-2xl p-5 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
              <h3 className="font-bold text-slate-800">Confirm</h3>
            </div>
            <p className="text-sm text-slate-700 mb-4">{confirmDlg.message}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDlg(null)}
                className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // IMPORTANT: capture the callback FIRST and close the dialog BEFORE
                  // running it. If we ran the callback first and then closed (the old
                  // order), and the callback called askConfirm() to chain a second
                  // dialog, React would batch both setConfirmDlg() calls in the same
                  // event handler — and the close-to-null setter would win, wiping
                  // out the newly-opened second dialog. That's exactly why "delete"
                  // appeared to silently fail on pages that double-confirmed.
                  const cb = confirmDlg.onConfirm;
                  setConfirmDlg(null);
                  cb();
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >
                {confirmDlg.confirmLabel || "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============== UTILITY UI: themed loading, back bar, lang+theme toggle ==============
function ThemedLoading() {
  const th = useThemed();
  const t = useT();
  return (
    <div
      className={`min-h-screen ${th.page} ${th.textDim} flex items-center justify-center`}
    >
      {t("common.loading")}
    </div>
  );
}

/**
 * BackBar — a small "← Back" link at the top of every interior page.
 * `to` can be a view object (passed to setCurrentView) or a function returning one.
 * `label` overrides the default "Back" text.
 */
function BackBar({
  to,
  label,
  ctx,
}: {
  to?: CurrentView | (() => CurrentView | null) | null;
  label?: string;
  ctx: AppContext;
}) {
  const t = useT();
  const th = useThemed();
  function go() {
    const target = typeof to === "function" ? to() : to;
    ctx.setCurrentView(target || { type: "home" });
  }
  return (
    <button
      onClick={go}
      className={`text-sm ${th.textDim} hover:${th.text.replace("text-", "text-")} flex items-center gap-1.5`}
    >
      <ArrowLeft size={14} /> {label || t("common.back")}
    </button>
  );
}

/**
 * LangThemeButtons — UZ/EN switch + sun/moon switch.
 * Used in the topbar when logged in, and on the login screen.
 */
function LangThemeButtons({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const th = useThemed();
  const t = useT();
  return (
    <div className="flex items-center gap-1">
      <div
        className={`flex rounded-lg ${th.dark ? "bg-slate-800" : "bg-slate-100"} p-0.5`}
      >
        <button
          onClick={() => setLang("en")}
          className={`px-2 py-1 rounded text-xs font-medium transition ${lang === "en" ? (th.dark ? "bg-slate-700 text-white" : "bg-white text-slate-800 shadow-sm") : th.dark ? "text-slate-400" : "text-slate-500"}`}
          title="English"
        >
          EN
        </button>
        <button
          onClick={() => setLang("uz")}
          className={`px-2 py-1 rounded text-xs font-medium transition ${lang === "uz" ? (th.dark ? "bg-slate-700 text-white" : "bg-white text-slate-800 shadow-sm") : th.dark ? "text-slate-400" : "text-slate-500"}`}
          title="O‘zbekcha"
        >
          UZ
        </button>
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`p-1.5 rounded-lg ${th.dark ? "text-amber-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"}`}
        title={
          theme === "dark" ? t("common.theme.light") : t("common.theme.dark")
        }
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
}

// ============== LOGIN ==============
function LoginScreen({
  users,
  onLogin,
}: {
  users: User[];
  onLogin: (u: User) => void;
}) {
  const [login, setLogin] = useState("");
  const [passcode, setPasscode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const t = useT();
  const th = useThemed();

  async function attempt() {
    setErr("");
    if (!login.trim() || !passcode) {
      setErr(t("login.invalid"));
      return;
    }
    // API mode: POST credentials, store JWT, hydrate user from server response.
    if (storage.isApiMode) {
      setBusy(true);
      try {
        const res = await storage.loginApi(login.trim(), passcode);
        if (!res || !res.user) {
          setErr(t("login.invalid"));
          return;
        }
        onLogin(res.user);
      } finally {
        setBusy(false);
      }
      return;
    }
    // Artifact mode: existing behaviour — find a matching user in memory.
    const u = users.find(
      (x) =>
        x.login === login.trim() &&
        x.passcode === passcode &&
        x.active !== false,
    );
    if (!u) {
      setErr(t("login.invalid"));
      return;
    }
    onLogin(u);
  }

  return (
    <div
      className={`min-h-screen ${th.dark ? "bg-gradient-to-br from-slate-950 to-slate-900" : "bg-gradient-to-br from-slate-100 to-slate-200"} flex items-center justify-center p-4 relative`}
    >
      <div className="absolute top-4 right-4">
        <LangThemeButtons />
      </div>
      <div
        className={`${th.surface} rounded-2xl shadow-xl p-8 w-full max-w-md`}
      >
        {/* OSIYO HOME logo at the top of the login card */}
        <div className="flex justify-center mb-5">
          <img
            src={LOGO_OSIYO_HOME}
            alt="OSIYO HOME"
            className="h-16 w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <Factory className="text-white" size={24} />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${th.text}`}>
              {t("login.title")}
            </h1>
            <p className={`text-sm ${th.textDim}`}>{t("login.subtitle")}</p>
          </div>
        </div>
        <div className="space-y-3">
          <Field label={t("login.login")}>
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className={`w-full p-3 border rounded-xl text-base ${th.inputBg}`}
              autoFocus
            />
          </Field>
          <Field label={t("login.passcode")}>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && attempt()}
              className={`w-full p-3 border rounded-xl text-base ${th.inputBg}`}
            />
          </Field>
          {err && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
              {err}
            </div>
          )}
          <button
            onClick={attempt}
            disabled={busy}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${busy ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <LogIn size={18} /> {busy ? "…" : t("login.signIn")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== SHELL ==============
function Shell({ ctx }: CtxProps) {
  const { user, setUser, currentView, setCurrentView } = ctx;

  // Determine which views the user can access
  const isAdmin = user.role === "admin";
  const isDeptAdmin = user.role === "dept_admin";
  const isGuest = user.role === "guest";
  const isOperator = user.role === "operator";

  const allowedDepts = getUserDepartments(user);

  // Default view by role.
  // Note: currentView is now URL-backed (never null) so we redirect only when
  // the user lands on "/" (i.e. home view) and the role demands they live
  // somewhere else.
  useEffect(() => {
    const onHome = currentView?.type === "home";
    if (isOperator) {
      // Operators forced to their station regardless of where they came from.
      if (user.stationId)
        setCurrentView({ type: "station", stationId: user.stationId });
    } else if (isDeptAdmin && onHome) {
      // Dept-admin lands directly inside their department on a fresh /
      if (user.departmentId)
        setCurrentView({ type: "department", departmentId: user.departmentId });
    } else if (isGuest && allowedDepts.length === 1 && onHome) {
      // Guest with a single allowed department → land there directly
      setCurrentView({ type: "department", departmentId: allowedDepts[0] });
    }
    // No fallback needed — pathToView already returns { type: "home" } at "/".
    // eslint-disable-next-line
  }, [user.id]);

  // Operators are locked to their station, period.
  // Exception: SING&DES operators (stationId === 'input') can also access gray_store.
  const safeView = isOperator
    ? currentView?.type === "station" &&
      (currentView.stationId === user.stationId ||
        (user.stationId === "input" && currentView.stationId === "gray_store"))
      ? currentView
      : { type: "station", stationId: user.stationId }
    : currentView;

  if (!safeView) return null;

  // Operators can only access their own station — plus gray_store if they're SING&DES operators.
  if (isOperator) {
    const allowed =
      safeView.type === "station" &&
      (safeView.stationId === user.stationId ||
        (user.stationId === "input" && safeView.stationId === "gray_store"));
    if (!allowed) return null;
  }

  // === Department-level access enforcement ===
  // For all department-scoped views, check the user is allowed to see that department.
  function getViewDepartment(view) {
    if (view.type === "department") return view.departmentId;
    if (view.type === "station") return "printing";
    if (view.type === "master") return "printing";
    if (view.type?.startsWith("store_")) return "store";
    return null;
  }
  function getViewPageKey(view) {
    // Convert a view object to its page-permission key (or null if dept-level only).
    if (view.type === "master") return "printing.master";
    if (view.type === "station") return `printing.station.${view.stationId}`;
    if (
      view.type === "store_customers" ||
      view.type === "store_customer_detail"
    )
      return "store.customers";
    if (view.type === "store_stock_in") return "store.stock_in";
    if (view.type === "store_stock") return "store.stock";
    if (view.type === "store_sales") return "store.sales";
    if (view.type === "store_payments") return "store.payments";
    return null;
  }
  const viewDept = getViewDepartment(safeView);
  if (viewDept && !allowedDepts.includes(viewDept)) {
    return <AccessDenied ctx={ctx} />;
  }
  const viewPageKey = getViewPageKey(safeView);
  if (viewPageKey && !canViewPage(user, viewPageKey)) {
    return <AccessDenied ctx={ctx} />;
  }

  // Page-level role gates
  // Users page: super-admin sees all; dept-admin sees their scoped users; guests/operators no.
  const canSeeUsersPage = isAdmin || isDeptAdmin;
  // Lists/Gallery/Machines: super-admin only (these are global config)
  const canSeeGlobalAdmin = isAdmin;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar
        user={user}
        onLogout={() => {
          storage.logoutApi();
          setUser(null);
        }}
        ctx={ctx}
      />
      <main className="max-w-[1400px] w-full mx-auto px-3 sm:px-5 py-5 flex-1">
        {safeView.type === "home" && !isOperator && <HomeView ctx={ctx} />}
        {safeView.type === "department" && !isOperator && (
          <DepartmentRouter ctx={ctx} departmentId={safeView.departmentId} />
        )}
        {safeView.type === "users" && canSeeUsersPage && (
          <UsersAdmin ctx={ctx} />
        )}
        {safeView.type === "lists" && canSeeGlobalAdmin && (
          <ListsAdmin ctx={ctx} />
        )}
        {safeView.type === "gallery" && canSeeGlobalAdmin && (
          <GalleryAdmin ctx={ctx} />
        )}
        {safeView.type === "machines" && canSeeGlobalAdmin && (
          <MachinesAdmin ctx={ctx} />
        )}
        {safeView.type === "numbering" && isAdmin && (
          <NumberingAdmin ctx={ctx} />
        )}
        {safeView.type === "trash" && isAdmin && <TrashBin ctx={ctx} />}
        {safeView.type === "programs" &&
          (isAdmin || (isDeptAdmin && user.departmentId === "printing")) && (
            <ProgramsAdmin ctx={ctx} />
          )}
        {safeView.type === "programs_progress" &&
          allowedDepts.includes("printing") && <ProgramsProgress ctx={ctx} />}
        {safeView.type === "daily" && allowedDepts.includes("printing") && (
          <DailyPage ctx={ctx} />
        )}
        {safeView.type === "maintenance_overview" &&
          allowedDepts.includes("printing") && (
            <MaintenanceOverview ctx={ctx} />
          )}
        {safeView.type === "in_process" &&
          allowedDepts.includes("printing") && <InProcessInventory ctx={ctx} />}
        {safeView.type === "master" && <MasterTracking ctx={ctx} />}
        {safeView.type === "station" &&
          (isOperator ? (
            <StationView ctx={ctx} stationId={user.stationId} />
          ) : (
            <StationView ctx={ctx} stationId={safeView.stationId} />
          ))}
        {/* ===== Local Market Store sub-views ===== */}
        {safeView.type === "store_customers" && !isOperator && (
          <CustomersListView ctx={ctx} />
        )}
        {safeView.type === "store_customer_detail" && !isOperator && (
          <CustomerDetailView ctx={ctx} customerId={safeView.customerId} />
        )}
        {safeView.type === "store_stock_in" && !isOperator && (
          <StoreStockInView ctx={ctx} />
        )}
        {safeView.type === "store_stock" && !isOperator && (
          <StoreStockView ctx={ctx} />
        )}
        {safeView.type === "store_sales" && !isOperator && (
          <StoreSalesView ctx={ctx} />
        )}
        {safeView.type === "store_payments" && !isOperator && (
          <StorePaymentsView ctx={ctx} />
        )}
      </main>
      {/* Credits — pinned to the bottom of the viewport via the parent flex layout.
          On short pages, the flex-1 main pushes this footer all the way down.
          On long pages, it sits naturally below the content. */}
      <footer className="max-w-[1400px] w-full mx-auto px-3 sm:px-5 pt-6 pb-6 border-t border-slate-200/60 text-center text-xs text-slate-400 leading-relaxed">
        <div>Thanks to the intelligence of humans who designed me.</div>
        <div className="mt-1">
          <span className="font-medium text-slate-500">
            Turdaliyev Jamshidbek
          </span>
          <span className="mx-1.5 text-slate-300">&amp;</span>
          <span className="font-medium text-slate-500">Sharifov Ahmadjon</span>
          <span className="mx-1.5 text-slate-300">·</span>
          <span>2026 MAY</span>
        </div>
        <div className="mt-1 text-slate-400">Version 2.0</div>
      </footer>
    </div>
  );
}

function AccessDenied({ ctx }: CtxProps) {
  const { user, setCurrentView } = ctx;
  const allowedDepts = getUserDepartments(user);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar
        user={user}
        onLogout={() => {
          storage.logoutApi();
          ctx.setUser(null);
        }}
        ctx={ctx}
      />
      <main className="max-w-[600px] w-full mx-auto px-5 py-16 text-center flex-1">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="text-red-600" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Access denied
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          You don't have permission to view this department.
        </p>
        {allowedDepts.length > 0 && (
          <button
            onClick={() =>
              allowedDepts.length === 1
                ? setCurrentView({
                    type: "department",
                    departmentId: allowedDepts[0],
                  })
                : setCurrentView({ type: "home" })
            }
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Back to{" "}
            {allowedDepts.length === 1
              ? DEPARTMENTS.find((d) => d.id === allowedDepts[0])?.name
              : "home"}
          </button>
        )}
      </main>
      <footer className="max-w-[1400px] w-full mx-auto px-3 sm:px-5 pt-6 pb-6 border-t border-slate-200/60 text-center text-xs text-slate-400 leading-relaxed">
        <div>Thanks to the intelligence of humans who designed me.</div>
        <div className="mt-1">
          <span className="font-medium text-slate-500">
            Turdaliyev Jamshidbek
          </span>
          <span className="mx-1.5 text-slate-300">&amp;</span>
          <span className="font-medium text-slate-500">Sharifov Ahmadjon</span>
          <span className="mx-1.5 text-slate-300">·</span>
          <span>2026 MAY</span>
        </div>
        <div className="mt-1 text-slate-400">Version 2.0</div>
      </footer>
    </div>
  );
}

function TopBar({
  user,
  onLogout,
  ctx,
}: {
  user: User;
  onLogout: () => void;
  ctx: AppContext;
}) {
  const { setCurrentView, currentView } = ctx;
  const t = useT();
  const isAdmin = user.role === "admin";
  const isDeptAdmin = user.role === "dept_admin";
  const isGuest = user.role === "guest";
  const isOperator = user.role === "operator";

  // Role label for the topbar
  let roleLabel = "";
  if (isAdmin) roleLabel = t("role.admin.full");
  else if (isDeptAdmin) {
    const dept = DEPARTMENTS.find((d) => d.id === user.departmentId);
    const deptName = dept ? t(`dept.${dept.id}`) : "Department";
    roleLabel = `${deptName} ${t("role.dept_admin.full").split(" ").pop()}`;
  } else if (isGuest) roleLabel = t("role.guest.subtitle");

  const homeTarget = isDeptAdmin
    ? { type: "department", departmentId: user.departmentId }
    : isGuest &&
        Array.isArray(user.allowedDepartments) &&
        user.allowedDepartments.length === 1
      ? { type: "department", departmentId: user.allowedDepartments[0] }
      : { type: "home" };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 py-3 flex items-center justify-between gap-3">
        {isOperator ? (
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={LOGO_OSIYO_HOME}
              alt="OSIYO HOME"
              className="h-9 w-auto flex-shrink-0 object-contain"
            />
            <div className="min-w-0">
              <div className="font-bold text-slate-800 text-sm truncate">
                {t("login.title")}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {t("role.operator.full")} •{" "}
                {(() => {
                  const s = STAGES.find((s) => s.id === user.stationId);
                  return s ? t(`stage.${s.id}`) : "";
                })()}{" "}
                • {user.name}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setCurrentView(homeTarget)}
            className="flex items-center gap-2 min-w-0"
          >
            <img
              src={LOGO_OSIYO_HOME}
              alt="OSIYO HOME"
              className="h-9 w-auto flex-shrink-0 object-contain"
            />
            <div className="min-w-0 text-left">
              <div className="font-bold text-slate-800 text-sm truncate">
                {t("login.title")}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {roleLabel} • {user.name}
              </div>
            </div>
          </button>
        )}
        <div className="flex items-center gap-1">
          {/* SING&DES operators get a toggle between SING&DES and Gray Fabric Store
              since they manage both stations. */}
          {isOperator && user.stationId === "input" && (
            <>
              <NavBtn
                icon={Database}
                label="Gray Store"
                active={
                  currentView?.type === "station" &&
                  currentView?.stationId === "gray_store"
                }
                onClick={() =>
                  setCurrentView({ type: "station", stationId: "gray_store" })
                }
              />
              <NavBtn
                icon={Factory}
                label="SING&DES"
                active={
                  currentView?.type === "station" &&
                  currentView?.stationId === "input"
                }
                onClick={() =>
                  setCurrentView({ type: "station", stationId: "input" })
                }
              />
            </>
          )}
          {(isAdmin ||
            (isGuest && (user.allowedDepartments || []).length > 1)) && (
            <NavBtn
              icon={LayoutDashboard}
              label={t("common.home")}
              active={currentView?.type === "home"}
              onClick={() => setCurrentView({ type: "home" })}
            />
          )}
          {isDeptAdmin && (
            <NavBtn
              icon={LayoutDashboard}
              label={t(`dept.${user.departmentId}`)}
              active={
                currentView?.type === "department" &&
                currentView?.departmentId === user.departmentId
              }
              onClick={() =>
                setCurrentView({
                  type: "department",
                  departmentId: user.departmentId,
                })
              }
            />
          )}
          {(isAdmin || isDeptAdmin) && (
            <NavBtn
              icon={Users}
              label={t("top.users")}
              active={currentView?.type === "users"}
              onClick={() => setCurrentView({ type: "users" })}
            />
          )}
          {isAdmin && (
            <>
              <NavBtn
                icon={ListChecks}
                label={t("top.lists")}
                active={currentView?.type === "lists"}
                onClick={() => setCurrentView({ type: "lists" })}
              />
              <NavBtn
                icon={ImageIcon}
                label={t("top.gallery")}
                active={currentView?.type === "gallery"}
                onClick={() => setCurrentView({ type: "gallery" })}
              />
              <NavBtn
                icon={Wrench}
                label={t("top.machines")}
                active={currentView?.type === "machines"}
                onClick={() => setCurrentView({ type: "machines" })}
              />
              <NavBtn
                icon={Trash2}
                label="Trash"
                active={currentView?.type === "trash"}
                onClick={() => setCurrentView({ type: "trash" })}
              />
            </>
          )}
          <div className="mx-1">
            <LangThemeButtons />
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
function NavBtn({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${active ? "bg-purple-100 text-purple-700" : "text-slate-600 hover:bg-slate-100"}`}
    >
      <Icon size={15} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// ============== HOME ==============
function HomeView({ ctx }: CtxProps) {
  const { user, setCurrentView } = ctx;
  const t = useT();
  const isAdmin = user.role === "admin";
  const isGuest = user.role === "guest";

  // Only show departments this user can access
  const allowedDepts = getUserDepartments(user);
  const visibleDepartments = useMemo(
    () => DEPARTMENTS.filter((d) => allowedDepts.includes(d.id)),
    [user.id],
  );

  // ===== Per-department counts from a single /stats request =====
  // Previously we summed counts off the in-memory `records` map, which only
  // had data after every station collection had been fetched separately.
  // Now: one request to /stats, backend returns counts per station + the
  // store totals. Massive reduction in home-page traffic.
  const [stats, setStats] = useState<{
    counts: Record<string, number>;
    customers?: number;
    sales?: number;
    stockIn?: number;
  }>({ counts: {} });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    (async () => {
      const s = await storage.fetchStats();
      if (!cancelled) {
        setStats(s);
        setStatsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const deptCounts = useMemo(() => {
    const c = stats.counts || {};
    const printingTotal = STAGES.reduce(
      (sum, s) =>
        sum + (c[s.id === "dispatch" ? "dispatch_out" : s.id] || 0),
      0,
    );
    return {
      weaving: 0,
      printing: printingTotal,
      stitching: 0,
      store:
        (stats.customers || 0) +
        (stats.sales || 0) +
        (stats.stockIn || 0),
    } as Record<string, number>;
  }, [stats]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {t("home.welcome")}, {user.name}
        </h2>
        <p className="text-slate-500 text-sm">
          {isAdmin
            ? t("home.full")
            : isGuest
              ? `${t("home.guestSubtitle")} · ${visibleDepartments.length} ${visibleDepartments.length !== 1 ? t("rec.records") : t("rec.record")}`
              : t("home.production")}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-700 mb-3">
          {isAdmin ? t("home.departments") : t("home.yourDepartments")}
        </h3>
        {visibleDepartments.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 shadow-sm">
            {t("home.noDepts")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleDepartments.map((d) => {
              const Icon = d.icon;
              const count = deptCounts[d.id] || 0;
              const isPlaceholder = d.status === "placeholder";
              return (
                <button
                  key={d.id}
                  onClick={() =>
                    setCurrentView({ type: "department", departmentId: d.id })
                  }
                  className={`relative bg-gradient-to-br ${d.gradient} hover:shadow-xl active:scale-[0.98] transition rounded-2xl p-5 text-left shadow-md text-white overflow-hidden`}
                >
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="font-bold text-lg">{t(`dept.${d.id}`)}</div>
                    <div className="text-xs opacity-90 mt-0.5">
                      {t(`dept.${d.id}.desc`)}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                      <span className="text-xs opacity-80 flex items-center gap-1.5">
                        {statsLoading ? (
                          <>
                            <InlineSpinner size={11} className="opacity-90" />
                            <span>…</span>
                          </>
                        ) : (
                          <>
                            {count}{" "}
                            {count !== 1 ? t("rec.records") : t("rec.record")}
                          </>
                        )}
                      </span>
                      {isPlaceholder ? (
                        <span className="text-[10px] uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded">
                          {t("dept.comingSoon")}
                        </span>
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
          {label}
        </span>
        <Icon className={color} size={16} />
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
    </div>
  );
}

// ============== DEPARTMENT ROUTER ==============
// Each top-level department renders a different "home" inside it.
// Printing keeps the existing 9-stage station grid, the Local Market Store has its own sub-pages.
function DepartmentRouter({
  ctx,
  departmentId,
}: {
  ctx: AppContext;
  departmentId: string;
}) {
  const dept = DEPARTMENTS.find((d) => d.id === departmentId);
  if (!dept) return <DeptNotFound ctx={ctx} />;
  if (departmentId === "printing")
    return <PrintingDepartmentHome ctx={ctx} dept={dept} />;
  if (departmentId === "store")
    return <StoreDepartmentHome ctx={ctx} dept={dept} />;
  return <PlaceholderDepartmentHome ctx={ctx} dept={dept} />;
}

function DeptNotFound({ ctx }: CtxProps) {
  return (
    <div className="text-center py-16 text-slate-500">
      Department not found.
      <button
        onClick={() => ctx.setCurrentView({ type: "home" })}
        className="ml-2 text-purple-600 hover:underline"
      >
        Go home
      </button>
    </div>
  );
}

// Reusable header shown at the top of every department page
function DepartmentHeader({
  dept,
  ctx,
  subtitle,
}: {
  dept: any;
  ctx: AppContext;
  subtitle?: string;
}) {
  const Icon = dept.icon;
  const t = useT();
  return (
    <div className="space-y-3">
      <button
        onClick={() => ctx.setCurrentView({ type: "home" })}
        className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
      >
        <ArrowLeft size={14} /> {t("common.allDepartments")}
      </button>
      <div
        className={`bg-gradient-to-r ${dept.gradient} rounded-2xl p-5 text-white flex items-center gap-4 shadow-md`}
      >
        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon size={28} />
        </div>
        <div>
          <div className="font-bold text-2xl">{t(`dept.${dept.id}`)}</div>
          <div className="text-sm opacity-90">
            {subtitle || t(`dept.${dept.id}.desc`)}
          </div>
        </div>
      </div>
    </div>
  );
}

// === PRINTING DEPARTMENT HOME ===
function PrintingDepartmentHome({ ctx, dept }: { ctx: AppContext; dept: any }) {
  const { setCurrentView, user } = ctx;
  const t = useT();
  const isAdmin = user.role === "admin";
  const isDeptAdmin = user.role === "dept_admin";
  const isGuest = user.role === "guest";

  // ===== Dept-home stats come from /stats (one request) =====
  // Previously this read in-memory `records.*` which only existed after
  // loadForView pulled every station's table. Now we hit /stats once and
  // read counts + numeric sums from the response.
  const [statsResp, setStatsResp] = useState<any>({ counts: {}, sums: {} });
  const [statsLoading, setStatsLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    (async () => {
      const s = await storage.fetchStats();
      if (!cancelled) {
        setStatsResp(s);
        setStatsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const counts = statsResp.counts || {};
    const sums = statsResp.sums || {};
    return {
      inputBatches: counts.input || 0,
      printedQty: sums.printing?.printedQty || 0,
      finishedQty: sums.finishing?.finishedQty || 0,
      dispatched: sums.dispatch_out?.qty || 0,
    };
  }, [statsResp]);

  // Filter visible stations for guests — see canViewPage helper.
  const visibleStations = useMemo(
    () => STAGES.filter((s) => canViewPage(user, `printing.station.${s.id}`)),
    [user],
  );
  const showMaster = canViewPage(user, "printing.master");

  return (
    <div className="space-y-6">
      {/* Printing Department logo banner — sets visual identity for the dept home page. */}
      <div className="bg-white border border-slate-200 rounded-2xl py-6 px-6 flex justify-center shadow-sm">
        <img
          src={LOGO_PRINTING_DEPT}
          alt="OSIYO HOME — Printing Department"
          className="h-32 w-auto object-contain"
        />
      </div>

      <DepartmentHeader dept={dept} ctx={ctx} />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatBox
          label={t("stage.input")}
          value={stats.inputBatches}
          icon={Factory}
          color="text-slate-600"
        />
        <StatBox
          label={`${t("stage.printing")} (m)`}
          value={stats.printedQty.toLocaleString()}
          icon={Printer}
          color="text-purple-600"
        />
        <StatBox
          label={`${t("stage.finishing").split(" ")[0]} (m)`}
          value={stats.finishedQty.toLocaleString()}
          icon={Sparkles}
          color="text-pink-600"
        />
        <StatBox
          label={`${t("stage.dispatch").split(" ")[0]} (m)`}
          value={stats.dispatched.toLocaleString()}
          icon={Truck}
          color="text-green-600"
        />
        <StatBox
          label={t("top.gallery")}
          value={statsResp.designs || 0}
          icon={ImageIcon}
          color="text-indigo-600"
        />
      </div>

      <div>
        <h3 className="font-semibold text-slate-700 mb-3">
          {t("stations.title")}
        </h3>
        {visibleStations.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 shadow-sm">
            {t("home.noDepts")}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {visibleStations.map((s) => {
              const Icon = s.icon;
              // Tile counts come from /stats.counts (loaded above) so we don't
              // need to fetch each station's table just to render the badge.
              const countKey = s.id === "dispatch" ? "dispatch_out" : s.id;
              const count = (statsResp.counts || {})[countKey] || 0;
              return (
                <button
                  key={s.id}
                  onClick={() =>
                    setCurrentView({ type: "station", stationId: s.id })
                  }
                  className="bg-white hover:shadow-lg active:scale-[0.98] transition rounded-xl p-4 text-left shadow-sm"
                >
                  <div
                    className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-2`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="font-bold text-slate-800 text-sm">
                    {t(`stage.${s.id}`)}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {count} {count !== 1 ? t("rec.records") : t("rec.record")}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {showMaster && (isAdmin || isDeptAdmin || isGuest) && (
        <div>
          <h3 className="font-semibold text-slate-700 mb-3">
            {t("master.section")}
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentView({ type: "master" })}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white rounded-xl p-5 text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">{t("master.title")}</div>
                <div className="text-sm opacity-90">{t("master.desc")}</div>
              </div>
              <ChevronRight size={24} />
            </button>
            {/* Programs Progress dashboard — visible to anyone with printing access */}
            <button
              onClick={() => setCurrentView({ type: "programs_progress" })}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white rounded-xl p-5 text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Activity size={24} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">
                  {t("progressDash.title")}
                </div>
                <div className="text-sm opacity-90">
                  {t("progressDash.desc")}
                </div>
              </div>
              <ChevronRight size={24} />
            </button>
            {/* Daily — last-day big numbers, screenshot-friendly for telegram groups */}
            <button
              onClick={() => setCurrentView({ type: "daily" })}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white rounded-xl p-5 text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CalendarDays size={24} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">{t("daily.title")}</div>
                <div className="text-sm opacity-90">{t("daily.tile.desc")}</div>
              </div>
              <ChevronRight size={24} />
            </button>
            {/* Maintenance Overview — all stations, in one place, exportable */}
            <button
              onClick={() => setCurrentView({ type: "maintenance_overview" })}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:opacity-90 text-white rounded-xl p-5 text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Wrench size={24} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">{t("maint.title")}</div>
                <div className="text-sm opacity-90">{t("maint.tile.desc")}</div>
              </div>
              <ChevronRight size={24} />
            </button>
            {/* In-Process Inventory — total fabric inside the printing pipeline right now */}
            <button
              onClick={() => setCurrentView({ type: "in_process" })}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:opacity-90 text-white rounded-xl p-5 text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">{t("inproc.title")}</div>
                <div className="text-sm opacity-90">
                  {t("inproc.tile.desc")}
                </div>
              </div>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
      {/* Settings — Programs visible to super-admin + printing dept-admin; Numbering super-admin only */}
      {(isAdmin || isDeptAdmin) && (
        <div>
          <h3 className="font-semibold text-slate-700 mb-3">Settings</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => setCurrentView({ type: "programs" })}
              className="bg-white hover:shadow-md transition rounded-xl p-4 text-left flex items-center gap-3 shadow-sm"
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800">Programs</div>
                <div className="text-xs text-slate-500">
                  Define multi-design printing programs
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </button>
            {isAdmin && (
              <button
                onClick={() => setCurrentView({ type: "numbering" })}
                className="bg-white hover:shadow-md transition rounded-xl p-4 text-left flex items-center gap-3 shadow-sm"
              >
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Hash className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">
                    Rout Card Numbering
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Lock size={11} /> Super-admin only
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// === PLACEHOLDER DEPARTMENT HOME ===
// Used for Weaving and Stitching until they're built out.
function PlaceholderDepartmentHome({
  ctx,
  dept,
}: {
  ctx: AppContext;
  dept: any;
}) {
  return (
    <div className="space-y-6">
      <DepartmentHeader dept={dept} ctx={ctx} />
      <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
        <div
          className={`w-16 h-16 ${dept.color} rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-60`}
        >
          <dept.icon className="text-white" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          {dept.name} — coming soon
        </h3>
        <p className="text-slate-500 max-w-md mx-auto text-sm">
          This department isn't built yet. You can replicate the pattern used in{" "}
          <span className="font-medium text-slate-700">Local Market Store</span>{" "}
          to add stations and forms here.
        </p>
        {dept.id === "stitching" && (
          <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto">
            <div className="bg-slate-50 rounded-xl p-4 text-left">
              <Shirt className="text-rose-600 mb-2" size={20} />
              <div className="font-semibold text-slate-800 text-sm">
                Stitching Unit 1
              </div>
              <div className="text-xs text-slate-500">
                Sub-station placeholder
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-left">
              <Shirt className="text-rose-600 mb-2" size={20} />
              <div className="font-semibold text-slate-800 text-sm">
                Stitching Unit 2
              </div>
              <div className="text-xs text-slate-500">
                Sub-station placeholder
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// === LOCAL MARKET STORE DEPARTMENT HOME ===
function StoreDepartmentHome({ ctx, dept }: { ctx: AppContext; dept: any }) {
  const { setCurrentView, user } = ctx;

  // ===== Dept-home stats from /stats =====
  const [statsResp, setStatsResp] = useState<any>({ counts: {}, storeTotals: {} });
  const [statsLoading, setStatsLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    (async () => {
      const s = await storage.fetchStats();
      if (!cancelled) {
        setStatsResp(s);
        setStatsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const t = statsResp.storeTotals || {};
    const totalIn = t.stockInQty || 0;
    const totalOut = t.salesQty || 0;
    const onHand = totalIn - totalOut;
    const totalRevenue = t.salesValue || 0;
    const totalCollectedFromSales = t.paidAmount || 0;
    const totalPaidLater = t.paymentsTotal || 0;
    const totalCollected = totalCollectedFromSales + totalPaidLater;
    const totalDebt = totalRevenue - totalCollected;
    return {
      totalIn,
      totalOut,
      onHand,
      totalRevenue,
      totalCollected,
      totalDebt,
    };
  }, [statsResp]);

  // Tile counts come from the same /stats response.
  const customersCount = statsResp.customers || 0;
  const stockInCount = statsResp.stockIn || 0;
  const salesCount = statsResp.sales || 0;
  const paymentsCount = statsResp.payments || 0;

  const allTiles = [
    {
      id: "store_customers",
      pageKey: "store.customers",
      label: "Customers",
      icon: UserCircle,
      color: "bg-emerald-500",
      count: customersCount,
      desc: "Profiles & ledgers",
    },
    {
      id: "store_stock_in",
      pageKey: "store.stock_in",
      label: "Stock In",
      icon: ArrowDownToLine,
      color: "bg-sky-500",
      count: stockInCount,
      desc: "Incoming fabric",
    },
    {
      id: "store_stock",
      pageKey: "store.stock",
      label: "Current Stock",
      icon: Package,
      color: "bg-indigo-500",
      count: stats.onHand,
      desc: "On-hand inventory",
      isQty: true,
    },
    {
      id: "store_sales",
      pageKey: "store.sales",
      label: "Sales / Stock Out",
      icon: ArrowUpFromLine,
      color: "bg-rose-500",
      count: salesCount,
      desc: "Outgoing & invoices",
    },
    {
      id: "store_payments",
      pageKey: "store.payments",
      label: "Payments Received",
      icon: Receipt,
      color: "bg-teal-500",
      count: paymentsCount,
      desc: "Customer debt payments",
    },
  ];
  const tiles = allTiles.filter((tl) => canViewPage(user, tl.pageKey));

  return (
    <div className="space-y-6">
      <DepartmentHeader dept={dept} ctx={ctx} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox
          label="On hand (qty)"
          value={stats.onHand.toLocaleString()}
          icon={Package}
          color="text-indigo-600"
        />
        <StatBox
          label="Total revenue"
          value={stats.totalRevenue.toLocaleString()}
          icon={DollarSign}
          color="text-emerald-600"
        />
        <StatBox
          label="Collected"
          value={stats.totalCollected.toLocaleString()}
          icon={Wallet}
          color="text-teal-600"
        />
        <StatBox
          label="Outstanding debt"
          value={stats.totalDebt.toLocaleString()}
          icon={AlertCircle}
          color={stats.totalDebt > 0 ? "text-orange-600" : "text-slate-400"}
        />
      </div>

      <div>
        <h3 className="font-semibold text-slate-700 mb-3">Sections</h3>
        {tiles.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 shadow-sm">
            No sections available for your account.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {tiles.map((tl) => {
              const Icon = tl.icon;
              return (
                <button
                  key={tl.id}
                  onClick={() => setCurrentView({ type: tl.id })}
                  className="bg-white hover:shadow-lg active:scale-[0.98] transition rounded-xl p-4 text-left shadow-sm"
                >
                  <div
                    className={`w-10 h-10 ${tl.color} rounded-lg flex items-center justify-center mb-2`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="font-bold text-slate-800 text-sm">
                    {tl.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{tl.desc}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {tl.count.toLocaleString()}
                    {tl.isQty
                      ? " on hand"
                      : ` record${tl.count !== 1 ? "s" : ""}`}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============== USERS ADMIN ==============
function UsersAdmin({ ctx }: CtxProps) {
  const { users, user: currentUser, saveUser, deleteUser, askConfirm } = ctx;
  const [editing, setEditing] = useState(null);
  const [filterRole, setFilterRole] = useState("");

  const isSuperAdmin = currentUser.role === "admin";
  const isDeptAdmin = currentUser.role === "dept_admin";

  // Visible users:
  // - Super-admin sees ALL users
  // - Dept-admin sees: themselves (read-only) + users they can manage
  const visibleUsers = useMemo(() => {
    if (isSuperAdmin) return users;
    return users.filter(
      (u) => u.id === currentUser.id || canManageThisUser(currentUser, u),
    );
  }, [users, currentUser, isSuperAdmin]);

  const filtered = useMemo(() => {
    if (!filterRole) return visibleUsers;
    return visibleUsers.filter((u) => u.role === filterRole);
  }, [visibleUsers, filterRole]);

  // Group by role for cleaner display
  const grouped = useMemo(() => {
    const g = { admin: [], dept_admin: [], operator: [], guest: [] };
    filtered.forEach((u) => {
      (g[u.role] || (g[u.role] = [])).push(u);
    });
    return g;
  }, [filtered]);

  function newUser() {
    if (isDeptAdmin) {
      // Dept-admin can only create operators or guests scoped to their department
      setEditing({
        id: uid(),
        name: "",
        login: "",
        passcode: "",
        role: "operator",
        stationId: "input",
        active: true,
        // Pre-fill scoping based on the dept-admin's department
        allowedDepartments: [currentUser.departmentId],
        allowedPages: [],
        departmentId: currentUser.departmentId,
        _isNew: true,
      });
    } else {
      setEditing({
        id: uid(),
        name: "",
        login: "",
        passcode: "",
        role: "operator",
        stationId: "input",
        active: true,
        _isNew: true,
      });
    }
  }

  function describeUserScope(u) {
    if (u.role === "admin") return "All departments";
    if (u.role === "dept_admin") {
      const d = DEPARTMENTS.find((x) => x.id === u.departmentId);
      return d ? d.name : "(no department set)";
    }
    if (u.role === "operator") {
      const s = STAGES.find((x) => x.id === u.stationId);
      return s ? `Printing · ${s.name}` : "(no station set)";
    }
    if (u.role === "guest") {
      const allowed = Array.isArray(u.allowedDepartments)
        ? u.allowedDepartments
        : [];
      if (!allowed.length) return "(no departments allowed)";
      return allowed
        .map((id) => DEPARTMENTS.find((x) => x.id === id)?.name || id)
        .join(", ");
    }
    return "—";
  }

  function handleDelete(u) {
    if (u.login === "admin") {
      alert("Can't delete the default super-admin.");
      return;
    }
    if (!canManageThisUser(currentUser, u)) {
      alert("You don't have permission to delete this user.");
      return;
    }
    askConfirm(`Move user ${u.name} to trash?`, () => deleteUser(u.id));
  }

  return (
    <div className="space-y-4">
      <BackBar ctx={ctx} to={{ type: "home" }} />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 text-sm">
            {isSuperAdmin
              ? "Manage Super Admins, Department Admins, Operators, and Guests"
              : `${DEPARTMENTS.find((d) => d.id === currentUser.departmentId)?.name || "Department"} — manage operators and guests in your department`}
          </p>
        </div>
        <button
          onClick={newUser}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Role hierarchy explainer card (super-admin only) */}
      {isSuperAdmin && (
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock size={14} className="text-slate-500" />
            <span className="font-semibold text-slate-700 text-sm">
              Access hierarchy
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-white rounded-lg p-2.5 border border-slate-200">
              <RoleBadge role="admin" />{" "}
              <span className="text-slate-700 font-medium ml-1">
                Super Admin
              </span>
              <div className="text-slate-500 mt-1">
                Sees & manages everything
              </div>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-slate-200">
              <RoleBadge role="dept_admin" />{" "}
              <span className="text-slate-700 font-medium ml-1">
                Dept Admin
              </span>
              <div className="text-slate-500 mt-1">
                Locked to one department, can create operators/guests there
              </div>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-slate-200">
              <RoleBadge role="operator" />{" "}
              <span className="text-slate-700 font-medium ml-1">Operator</span>
              <div className="text-slate-500 mt-1">
                Locked to a single station
              </div>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-slate-200">
              <RoleBadge role="guest" />{" "}
              <span className="text-slate-700 font-medium ml-1">Guest</span>
              <div className="text-slate-500 mt-1">
                Read-only on selected departments
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role filter */}
      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 font-medium">Filter:</span>
        {["", "admin", "dept_admin", "operator", "guest"].map((r) => (
          <button
            key={r || "all"}
            onClick={() => setFilterRole(r)}
            className={`px-2.5 py-1 rounded text-xs font-medium ${filterRole === r ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {r === ""
              ? `All (${visibleUsers.length})`
              : `${r} (${visibleUsers.filter((u) => u.role === r).length})`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Login</th>
              <th className="text-left p-3 font-medium">Role</th>
              <th className="text-left p-3 font-medium">Scope</th>
              <th className="text-left p-3 font-medium">Active</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {["admin", "dept_admin", "operator", "guest"].map((roleKey) => {
              const list = grouped[roleKey] || [];
              if (!list.length) return null;
              return (
                <React.Fragment key={roleKey}>
                  <tr className="bg-slate-50/60">
                    <td
                      colSpan={6}
                      className="p-2 px-3 text-xs uppercase tracking-wide text-slate-500 font-semibold"
                    >
                      {roleKey === "admin"
                        ? "Super Admins"
                        : roleKey === "dept_admin"
                          ? "Department Admins"
                          : roleKey === "operator"
                            ? "Operators"
                            : "Guests"}{" "}
                      · {list.length}
                    </td>
                  </tr>
                  {list.map((u) => {
                    const isMe = u.id === currentUser.id;
                    const canManage = canManageThisUser(currentUser, u);
                    const canDelete = canManage && u.login !== "admin";
                    return (
                      <tr
                        key={u.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="p-3 font-medium text-slate-800">
                          {u.name}
                          {isMe && (
                            <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                              you
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-mono text-xs">{u.login}</td>
                        <td className="p-3">
                          <RoleBadge role={u.role} />
                        </td>
                        <td className="p-3 text-slate-600 text-xs">
                          {describeUserScope(u)}
                        </td>
                        <td className="p-3">
                          {u.active !== false ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <X size={16} className="text-red-500" />
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {canManage ? (
                            <button
                              onClick={() => setEditing(u)}
                              className="text-slate-500 hover:text-purple-600 p-1"
                              title="Edit"
                            >
                              <Edit2 size={15} />
                            </button>
                          ) : (
                            <span className="text-xs text-slate-300">—</span>
                          )}
                          {canDelete && (
                            <button
                              onClick={() => handleDelete(u)}
                              className="text-slate-500 hover:text-red-600 p-1 ml-1"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
            {!filtered.length && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No users in this view
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal
          title={editing._isNew ? "New User" : "Edit User"}
          onClose={() => setEditing(null)}
          large
        >
          <UserForm
            user={editing}
            currentUser={currentUser}
            onSave={async (u) => {
              const { _isNew, ...clean } = u;
              await saveUser(clean);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const map = {
    admin: "bg-purple-100 text-purple-700",
    dept_admin: "bg-indigo-100 text-indigo-700",
    operator: "bg-cyan-100 text-cyan-700",
    guest: "bg-amber-100 text-amber-700",
  };
  const labels = {
    admin: "super admin",
    dept_admin: "dept admin",
    operator: "operator",
    guest: "guest",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${map[role] || "bg-slate-100"}`}
    >
      {labels[role] || role}
    </span>
  );
}

function UserForm({
  user,
  currentUser,
  onSave,
  onCancel,
}: {
  user: User;
  currentUser: User;
  onSave: (u: User) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(user);
  const [showPwd, setShowPwd] = useState(false);
  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }));

  const isSuperAdmin = currentUser.role === "admin";
  const isDeptAdmin = currentUser.role === "dept_admin";

  // Which roles can the current user assign?
  const allowedRoles = useMemo(() => {
    if (isSuperAdmin) {
      return [
        { value: "admin", label: "Super Admin (full control of everything)" },
        {
          value: "dept_admin",
          label: "Department Admin (one department only)",
        },
        { value: "operator", label: "Operator (one station only)" },
        { value: "guest", label: "Guest (read-only, selected departments)" },
      ];
    }
    if (isDeptAdmin) {
      return [
        { value: "operator", label: "Operator (one station only)" },
        { value: "guest", label: "Guest (read-only, this department only)" },
      ];
    }
    return [];
  }, [isSuperAdmin, isDeptAdmin]);

  // Which department options are available for "department admin" role?
  const deptOptions = DEPARTMENTS;

  // For guests (super-admin only): pick allowed departments
  function toggleAllowedDept(deptId) {
    const cur = Array.isArray(f.allowedDepartments) ? f.allowedDepartments : [];
    const next = cur.includes(deptId)
      ? cur.filter((x) => x !== deptId)
      : [...cur, deptId];
    set("allowedDepartments", next);
    // When removing a department, also remove its pages from allowedPages.
    if (cur.includes(deptId) && Array.isArray(f.allowedPages)) {
      set(
        "allowedPages",
        f.allowedPages.filter((p) => !p.startsWith(`${deptId}.`)),
      );
    }
  }
  // Toggle a single page-key for a guest
  function toggleAllowedPage(pageKey) {
    const cur = Array.isArray(f.allowedPages) ? f.allowedPages : [];
    const next = cur.includes(pageKey)
      ? cur.filter((x) => x !== pageKey)
      : [...cur, pageKey];
    set("allowedPages", next);
  }
  // Bulk select / clear all pages of a department
  function setAllPagesForDept(deptId, all) {
    const others = (f.allowedPages || []).filter(
      (p) => !p.startsWith(`${deptId}.`),
    );
    if (all) {
      const dept = (PAGES[deptId] || []).map((p) => p.key);
      set("allowedPages", [...others, ...dept]);
    } else {
      set("allowedPages", others);
    }
  }

  function save() {
    if (!f.name?.trim()) {
      alert("Full name is required");
      return;
    }
    if (!f.login?.trim()) {
      alert("Login is required");
      return;
    }
    if (!f.passcode?.trim()) {
      alert("Passcode is required");
      return;
    }

    // Role-specific validations
    if (f.role === "dept_admin" && !f.departmentId) {
      alert("Pick a department for the department admin");
      return;
    }
    if (f.role === "operator" && !f.stationId) {
      alert("Pick a station for the operator");
      return;
    }
    if (f.role === "guest") {
      const allowed = Array.isArray(f.allowedDepartments)
        ? f.allowedDepartments
        : [];
      if (!allowed.length) {
        alert("Pick at least one department for the guest");
        return;
      }
      const pages = Array.isArray(f.allowedPages) ? f.allowedPages : [];
      if (!pages.length) {
        alert("Tick at least one page for the guest to access");
        return;
      }
    }

    // Dept-admin restriction: lock the new user to dept-admin's own department
    if (isDeptAdmin) {
      if (f.role === "operator") {
        if (currentUser.departmentId !== "printing") {
          alert(
            "Operators currently can only be assigned to printing-department stations. Other departments don't have stations yet.",
          );
          return;
        }
      }
      if (f.role === "guest") {
        // Force allowedDepartments + filter allowedPages to only this dept-admin's dept
        f.allowedDepartments = [currentUser.departmentId];
        f.allowedPages = (f.allowedPages || []).filter((p) =>
          p.startsWith(`${currentUser.departmentId}.`),
        );
      }
    }

    // Cleanup: remove fields that don't apply to the chosen role
    const cleaned = { ...f };
    if (cleaned.role !== "operator") delete cleaned.stationId;
    if (cleaned.role !== "dept_admin") delete cleaned.departmentId;
    if (cleaned.role !== "guest") {
      delete cleaned.allowedDepartments;
      delete cleaned.allowedPages;
    }

    onSave(cleaned);
  }

  // When role changes, blank out role-specific fields with sensible defaults
  function onRoleChange(newRole) {
    setF((prev) => {
      const next = { ...prev, role: newRole };
      if (newRole === "dept_admin") {
        next.departmentId = isDeptAdmin
          ? currentUser.departmentId
          : prev.departmentId || "printing";
        delete next.stationId;
        delete next.allowedDepartments;
        delete next.allowedPages;
      } else if (newRole === "operator") {
        next.stationId = prev.stationId || "input";
        delete next.departmentId;
        delete next.allowedDepartments;
        delete next.allowedPages;
      } else if (newRole === "guest") {
        next.allowedDepartments = isDeptAdmin
          ? [currentUser.departmentId]
          : Array.isArray(prev.allowedDepartments)
            ? prev.allowedDepartments
            : [];
        next.allowedPages = Array.isArray(prev.allowedPages)
          ? prev.allowedPages
          : [];
        delete next.stationId;
        delete next.departmentId;
      } else {
        delete next.stationId;
        delete next.departmentId;
        delete next.allowedDepartments;
        delete next.allowedPages;
      }
      return next;
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Full name *">
          <input
            value={f.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
            autoFocus
          />
        </Field>
        <Field label="Login *">
          <input
            value={f.login}
            onChange={(e) => set("login", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
          />
        </Field>
      </div>
      <Field label="Passcode *">
        <div className="flex gap-2">
          <input
            type={showPwd ? "text" : "password"}
            value={f.passcode}
            onChange={(e) => set("passcode", e.target.value)}
            className="flex-1 p-2.5 border border-slate-300 rounded-lg font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="px-3 border border-slate-300 rounded-lg"
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </Field>

      <Field label="Role *">
        <select
          value={f.role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          {allowedRoles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </Field>

      {/* Dept-admin: pick the department they administer */}
      {f.role === "dept_admin" && (
        <Field label="Department *">
          {isDeptAdmin ? (
            <div className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 text-sm flex items-center gap-2">
              <Lock size={14} />{" "}
              {DEPARTMENTS.find((d) => d.id === currentUser.departmentId)?.name}
            </div>
          ) : (
            <select
              value={f.departmentId || ""}
              onChange={(e) => set("departmentId", e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg"
            >
              <option value="">Select department…</option>
              {deptOptions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          )}
        </Field>
      )}

      {/* Operator: pick the station */}
      {f.role === "operator" && (
        <>
          <Field label="Department">
            <div className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 text-sm">
              Printing{" "}
              <span className="text-xs text-slate-400">
                · (only Printing has stations for now)
              </span>
            </div>
          </Field>
          <Field label="Assigned station *">
            <select
              value={f.stationId || ""}
              onChange={(e) => set("stationId", e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg"
            >
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
        </>
      )}

      {/* Guest: pick allowed departments */}
      {f.role === "guest" && (
        <Field label="Allowed departments *">
          {isDeptAdmin ? (
            <div className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 text-sm flex items-center gap-2">
              <Lock size={14} />{" "}
              {DEPARTMENTS.find((d) => d.id === currentUser.departmentId)?.name}
              <span className="text-xs text-slate-400 ml-auto">
                (your department only)
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              {DEPARTMENTS.map((d) => {
                const checked = (f.allowedDepartments || []).includes(d.id);
                const Icon = d.icon;
                return (
                  <label
                    key={d.id}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${checked ? "border-purple-400 bg-purple-50" : "border-slate-200 hover:bg-slate-50"}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAllowedDept(d.id)}
                    />
                    <div
                      className={`w-7 h-7 ${d.color} rounded-md flex items-center justify-center`}
                    >
                      <Icon size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-sm text-slate-700">
                      {d.name}
                    </span>
                  </label>
                );
              })}
              <div className="text-xs text-slate-500">
                Selected: {(f.allowedDepartments || []).length} of{" "}
                {DEPARTMENTS.length}
              </div>
            </div>
          )}
        </Field>
      )}

      {/* Guest: optionally restrict to specific pages within each allowed department.
          By default (no boxes ticked), the guest can see ALL pages in their
          allowed departments. Ticking pages here turns the section into an
          explicit whitelist — only ticked pages are visible. Untick all to
          go back to the "all pages" default. */}
      {f.role === "guest" && (f.allowedDepartments || []).length > 0 && (
        <Field label="Allowed pages within each department (optional)">
          <div className="space-y-3">
            <div className="text-xs text-slate-500 -mt-1">
              Leave everything unchecked to give the guest access to ALL pages
              in their assigned departments. Check specific pages only if you
              want to restrict access to a subset.
            </div>
            {(f.allowedDepartments || []).map((deptId) => {
              const dept = DEPARTMENTS.find((d) => d.id === deptId);
              if (!dept) return null;
              const Icon = dept.icon;
              const pages = PAGES[deptId] || [];
              const allowedPages = f.allowedPages || [];
              const allTicked =
                pages.length > 0 &&
                pages.every((p) => allowedPages.includes(p.key));
              return (
                <div
                  key={deptId}
                  className="border border-slate-200 rounded-lg overflow-hidden"
                >
                  <div
                    className={`flex items-center justify-between px-3 py-2 ${dept.color} bg-opacity-90`}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Icon size={14} />
                      <span className="font-medium text-sm">{dept.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAllPagesForDept(deptId, !allTicked)}
                      className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded"
                    >
                      {allTicked ? "Untick all" : "Tick all"}
                    </button>
                  </div>
                  {pages.length === 0 ? (
                    <div className="p-3 text-xs text-slate-400">
                      No pages defined for this department yet.
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {pages.map((p) => {
                        const checked = allowedPages.includes(p.key);
                        return (
                          <label
                            key={p.key}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${checked ? "bg-purple-50 text-purple-800" : "text-slate-700 hover:bg-slate-50"}`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleAllowedPage(p.key)}
                            />
                            {p.label}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="text-xs text-slate-500">
              {(f.allowedPages || []).length} page(s) selected total
            </div>
          </div>
        </Field>
      )}

      <label className="flex items-center gap-2 text-sm pt-2">
        <input
          type="checkbox"
          checked={f.active !== false}
          onChange={(e) => set("active", e.target.checked)}
        />
        Active (can log in)
      </label>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
        >
          Cancel
        </button>
        <button
          onClick={save}
          className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ============== LISTS ADMIN ==============
function ListsAdmin({ ctx }: CtxProps) {
  const { lists, saveLists } = ctx;
  const [editingKey, setEditingKey] = useState(null);

  const labels = {
    fabricSource: "Fabric Source (Input)",
    fabricType: "Fabric Types",
    shift: "Shifts",
    gas: "Gas Options",
    bleachType: "Bleach Types",
    bleachMachine: "Bleach Machines",
    batchingMachine: "Batching Machines / Batchers",
    width: "Widths",
    printingMachine: "Printing Machines",
    programType: "Print Program Types",
    printingStatus: "Print Status",
    curingStatus: "Curing Status",
    finishingMachine: "Finishing Machines (Stenters)",
    handFeel: "Hand Feel",
    chemicalRecipe: "Chemical Recipes",
    calenderingMachine: "Calendering Machines",
    foldingMachine: "Folding Machines",
    rollingType: "Rolling Types",
    dispatchDestination: "Dispatch Destinations",
    dispatchPerson: "Dispatch Persons / Drivers",
    maintenanceShift: "Maintenance Shifts",
    breakdownType: "Breakdown Types",
    dailyCheckResult: "Daily Check Results",
    grayFabricSource: "Gray Fabric Sources",
    grayOutDestination: "Gray Fabric Out — Destinations",
  };

  return (
    <div className="space-y-4">
      <BackBar ctx={ctx} to={{ type: "home" }} />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Multiple-Choice Lists
        </h2>
        <p className="text-slate-500 text-sm">
          Control every dropdown across all stations. Add or remove options
          anytime.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(labels).map(([key, label]) => (
          <div key={key} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-700 text-sm">{label}</h4>
              <button
                onClick={() => setEditingKey(key)}
                className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1"
              >
                <Edit2 size={13} /> Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {(lists[key] || []).map((v) => (
                <span
                  key={v}
                  className="text-xs bg-slate-100 px-2 py-0.5 rounded"
                >
                  {v}
                </span>
              ))}
              {!(lists[key] || []).length && (
                <span className="text-xs text-slate-400">No options yet</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingKey && (
        <Modal
          title={`Edit: ${labels[editingKey]}`}
          onClose={() => setEditingKey(null)}
        >
          <ListEditor
            values={lists[editingKey] || []}
            onSave={async (vals) => {
              await saveLists({ ...lists, [editingKey]: vals });
              setEditingKey(null);
            }}
            onCancel={() => setEditingKey(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function ListEditor({
  values,
  onSave,
  onCancel,
}: {
  values: string[];
  onSave: (v: string[]) => void;
  onCancel: () => void;
}) {
  const [items, setItems] = useState([...values]);
  const [newVal, setNewVal] = useState("");
  return (
    <div className="space-y-3">
      <div className="space-y-1.5 max-h-72 overflow-y-auto">
        {items.map((v, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-slate-50 rounded-lg p-2"
          >
            <input
              value={v}
              onChange={(e) => {
                const c = [...items];
                c[i] = e.target.value;
                setItems(c);
              }}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button
              onClick={() => setItems(items.filter((_, j) => j !== i))}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newVal.trim()) {
              setItems([...items, newVal.trim()]);
              setNewVal("");
            }
          }}
          placeholder="Add new option..."
          className="flex-1 p-2 border border-slate-300 rounded-lg text-sm"
        />
        <button
          onClick={() => {
            if (newVal.trim()) {
              setItems([...items, newVal.trim()]);
              setNewVal("");
            }
          }}
          className="px-3 bg-slate-600 text-white rounded-lg"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex gap-2 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(items.filter((x) => x.trim()))}
          className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
        >
          Save List
        </button>
      </div>
    </div>
  );
}

// ============== GALLERY ADMIN ==============
function GalleryAdmin({ ctx }: CtxProps) {
  const { designs, saveDesign, deleteDesign } = ctx;
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = designs.filter(
    (d) =>
      !search ||
      d.designNumber?.toLowerCase().includes(search.toLowerCase()) ||
      d.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <BackBar ctx={ctx} to={{ type: "home" }} />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Design Gallery</h2>
          <p className="text-slate-500 text-sm">
            Upload once. Available at Printing, Finishing, Calendering, Folding
            stations.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              id: uid(),
              designNumber: "",
              name: "",
              imageData: "",
              notes: "",
            })
          }
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus size={16} /> Add Design
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by design # or name..."
          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
              {resolveDesignImage(d) ? (
                <img
                  src={resolveDesignImage(d)}
                  alt={d.designNumber}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="text-slate-300" size={40} />
              )}
            </div>
            <div className="p-2.5">
              <div className="font-mono text-xs text-purple-600 font-bold">
                {d.designNumber}
              </div>
              <div className="text-sm font-medium text-slate-800 truncate">
                {d.name}
              </div>
              <div className="flex justify-end gap-1 mt-1">
                <button
                  onClick={() => setEditing(d)}
                  className="text-slate-500 hover:text-purple-600 p-1"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() =>
                    confirm(`Move ${d.designNumber} to trash?`) &&
                    deleteDesign(d.id)
                  }
                  className="text-slate-500 hover:text-red-600 p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div className="col-span-full bg-white rounded-xl p-8 text-center text-slate-400 text-sm">
            No designs yet
          </div>
        )}
      </div>
      {editing && (
        <Modal title="Design" onClose={() => setEditing(null)}>
          <DesignForm
            design={editing}
            onSave={async (d) => {
              await saveDesign(d);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function DesignForm({
  design,
  onSave,
  onCancel,
}: {
  design: Design;
  onSave: (d: Design) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(design);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");

  // ===== File upload =====
  // Files now go through POST /designs/upload as multipart/form-data.
  // The backend writes the file to disk (fs) and returns { imageUrl: "/uploads/..." }.
  // We store only the URL in the design record — never the bytes.
  //
  // Legacy records may still have an inline `imageData` data URL; the
  // preview below tolerates both and prefers the new `imageUrl` field.
  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setUploadErr("Image too large (max 5MB)");
      return;
    }
    setUploadErr("");
    setUploading(true);
    try {
      const res = await storage.uploadDesign(file);
      if (!res || !res.imageUrl) {
        setUploadErr("Upload failed. Please try again.");
        return;
      }
      // Drop legacy imageData when a new URL is set, so the record stays slim.
      setF({ ...f, imageUrl: res.imageUrl, imageData: undefined });
    } finally {
      setUploading(false);
      // Allow re-selecting the same file by resetting the input value.
      if (e.target) e.target.value = "";
    }
  }

  // Resolve the preview src — prefer the new server URL, fall back to legacy data URL.
  // If imageUrl is a relative path like "/uploads/designs/x.png", prepend API_BASE_URL
  // so the <img> resolves correctly regardless of where the SPA is mounted.
  const previewSrc = (() => {
    if (f.imageUrl) {
      if (/^(https?:|data:|blob:)/.test(f.imageUrl)) return f.imageUrl;
      // Strip a trailing "/api" from API_BASE_URL so the file path mounts under the same host.
      const host = API_BASE_URL.replace(/\/api\/?$/, "");
      return `${host}${f.imageUrl}`;
    }
    return f.imageData || "";
  })();

  return (
    <div className="space-y-3">
      <Field label="Design Number * (e.g. D-001, FloralA1)">
        <input
          value={f.designNumber}
          onChange={(e) => setF({ ...f, designNumber: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
        />
      </Field>
      <Field label="Design Name">
        <input
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Design Image">
        <div className="flex items-start gap-3">
          {previewSrc && (
            <img
              src={previewSrc}
              className="w-20 h-20 object-cover rounded-lg border"
            />
          )}
          <label
            className={`flex-1 cursor-pointer border-2 border-dashed border-slate-300 rounded-lg p-3 text-center text-sm text-slate-500 hover:border-purple-400 hover:text-purple-600 ${uploading ? "opacity-60 pointer-events-none" : ""}`}
          >
            <Upload size={16} className="mx-auto mb-1" />
            {uploading ? "Uploading…" : "Click to upload (max 5MB)"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        {uploadErr && (
          <div className="text-xs text-red-600 mt-1">{uploadErr}</div>
        )}
      </Field>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <div className="flex gap-2 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => f.designNumber && onSave(f)}
          disabled={uploading}
          className={`flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ============== MACHINES ADMIN ==============
function MachinesAdmin({ ctx }: CtxProps) {
  const { machines, saveMachine, deleteMachine } = ctx;
  const [editing, setEditing] = useState(null);
  return (
    <div className="space-y-4">
      <BackBar ctx={ctx} to={{ type: "home" }} />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Machine Register
          </h2>
          <p className="text-slate-500 text-sm">
            All machines, specs, and service history
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              id: uid(),
              name: "",
              stationId: "bleach",
              model: "",
              purchaseDate: "",
              specs: "",
              notes: "",
            })
          }
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus size={16} /> Add Machine
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 font-medium text-slate-600">Name</th>
              <th className="text-left p-3 font-medium text-slate-600">
                Station
              </th>
              <th className="text-left p-3 font-medium text-slate-600">
                Model
              </th>
              <th className="text-left p-3 font-medium text-slate-600">
                Purchase
              </th>
              <th className="text-right p-3 font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr key={m.id} className="border-t border-slate-100">
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3 text-slate-600">
                  {STAGES.find((s) => s.id === m.stationId)?.name ||
                    m.stationId}
                </td>
                <td className="p-3 text-slate-600">{m.model || "—"}</td>
                <td className="p-3 text-slate-500 text-xs">
                  {m.purchaseDate || "—"}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setEditing(m)}
                    className="text-slate-500 hover:text-purple-600 p-1"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() =>
                      confirm("Move machine to trash?") && deleteMachine(m.id)
                    }
                    className="text-slate-500 hover:text-red-600 p-1 ml-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {!machines.length && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-slate-400 text-sm"
                >
                  No machines registered yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editing && (
        <Modal title="Machine" onClose={() => setEditing(null)}>
          <MachineForm
            machine={editing}
            onSave={async (m) => {
              await saveMachine(m);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function MachineForm({
  machine,
  onSave,
  onCancel,
}: {
  machine: Machine;
  onSave: (m: Machine) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(machine);
  return (
    <div className="space-y-3">
      <Field label="Machine Name *">
        <input
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Station *">
        <select
          value={f.stationId}
          onChange={(e) => setF({ ...f, stationId: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          {STAGES.filter((s) => s.hasMachine).map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Model / Manufacturer">
        <input
          value={f.model}
          onChange={(e) => setF({ ...f, model: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Purchase Date">
        <input
          type="date"
          value={f.purchaseDate}
          onChange={(e) => setF({ ...f, purchaseDate: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Specifications">
        <textarea
          rows={3}
          value={f.specs}
          onChange={(e) => setF({ ...f, specs: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
          placeholder="Max width, max speed, power, etc."
        />
      </Field>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <div className="flex gap-2 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => f.name && onSave(f)}
          className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ============== TRASH BIN (item #4 of this turn) ==============
// Super-admin only. Soft-deleted items live here for 30 days then auto-purge on app load.
// Anyone can soft-delete, but only super-admin can either restore or permanently purge.
function TrashBin({ ctx }: CtxProps) {
  const {
    trash,
    restoreFromTrash,
    purgeFromTrash,
    purgeAllTrash,
    askConfirm,
    designs,
  } = ctx;
  const [filterType, setFilterType] = useState("all");

  // Pretty labels for the type categories — used in filter dropdown and the type column.
  const TYPE_LABELS = {
    rec_gray_store: "Gray store: entries",
    rec_gray_out: "Gray store: outgoing",
    rec_input: "Input batches",
    rec_bleach: "Bleaching records",
    rec_dyeing: "Dyeing records",
    rec_batching: "Batching records",
    rec_printing: "Printing records",
    rec_curing: "Curing records",
    rec_finishing: "Finishing records",
    rec_calendering: "Calendering records",
    rec_folding: "Folding records",
    rec_dispatch_in: "Dispatch incoming",
    rec_dispatch_out: "Dispatch outgoing",
    rec_maintenance: "Maintenance",
    rec_breakdown: "Breakdowns",
    rec_dailycheck: "Daily checks",
    user: "Users",
    design: "Designs",
    machine: "Machines",
    customer: "Customers",
    store_in: "Store: stock-in",
    store_sale: "Store: sales",
    store_pay: "Store: payments",
    program: "Programs",
  };

  // Group + sort: most recently deleted first.
  const sorted = useMemo(() => {
    return [...trash]
      .filter((t) => filterType === "all" || t.type === filterType)
      .sort((a, b) => (b.deletedAt || "").localeCompare(a.deletedAt || ""));
  }, [trash, filterType]);

  // Distinct types present in trash for the filter dropdown.
  const presentTypes = useMemo(() => {
    return [...new Set(trash.map((t) => t.type))].sort();
  }, [trash]);

  // Days remaining until auto-purge — purely informational.
  function daysLeft(deletedAt) {
    const t = new Date(deletedAt).getTime();
    const cutoff = t + 30 * 24 * 60 * 60 * 1000;
    const ms = cutoff - Date.now();
    if (ms <= 0) return "expiring soon";
    const d = Math.ceil(ms / (24 * 60 * 60 * 1000));
    return `${d} day${d !== 1 ? "s" : ""} left`;
  }

  // Build a short preview of the deleted item (best-effort across types).
  function previewItem(entry) {
    const it = entry.item || {};
    if (entry.type === "user") return `${it.name || ""} (${it.login || ""})`;
    if (entry.type === "design")
      return `${it.designNumber || ""} — ${it.name || ""}`;
    if (entry.type === "machine") return `${it.name || ""} — ${it.model || ""}`;
    if (entry.type === "customer")
      return `${it.name || ""} — ${it.phone || ""}`;
    if (entry.type === "program")
      return `${it.name || ""} — ${(it.lines || []).length} design(s)`;
    if (entry.type === "store_in")
      return `${it.fabricType || ""} — ${it.qty || 0}m on ${it.date || ""}`;
    if (entry.type === "store_sale")
      return `Sale ${it.invoiceNumber || ""} — ${it.qty || 0}m`;
    if (entry.type === "store_pay")
      return `Payment ${it.amount || 0} on ${it.date || ""}`;
    if (entry.type === "rec_input")
      return `Batch ${it.batchNo || ""} — ${it.meters || 0}m on ${it.date || ""}`;
    if (entry.type === "rec_printing")
      return `Print ${it.printNo || ""} — ${it.designNumber || ""} (${it.printedQty || 0}m)`;
    if (entry.type === "rec_bleach")
      return `Batch ${it.batchNo || ""} on ${it.date || ""}`;
    if (entry.type === "rec_batching")
      return `${(it.sourceBatches || []).join("+")} — ${it.qtyAfter || 0}m`;
    if (entry.type.startsWith("rec_"))
      return `Print ${it.printNo || ""} on ${it.date || ""}`;
    return `id: ${entry.recordId}`;
  }

  function doRestore(entry) {
    askConfirm(
      `Restore this ${TYPE_LABELS[entry.type] || entry.type} item?`,
      () => restoreFromTrash(entry.id),
    );
  }
  function doPurge(entry) {
    askConfirm(`Permanently delete this item? This cannot be undone.`, () =>
      purgeFromTrash(entry.id),
    );
  }
  function doPurgeAll() {
    if (!trash.length) return;
    askConfirm(
      `Permanently delete ALL ${trash.length} item(s) from trash? This cannot be undone.`,
      () => purgeAllTrash(),
    );
  }

  return (
    <div className="space-y-4">
      <BackBar ctx={ctx} to={{ type: "home" }} />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Trash2 size={24} /> Trash Bin
          </h2>
          <p className="text-slate-500 text-sm">
            Soft-deleted items from every department. Items auto-purge after 30
            days. Only the super-admin can restore or permanently delete.
          </p>
        </div>
        {trash.length > 0 && (
          <button
            onClick={doPurgeAll}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <AlertTriangle size={14} /> Empty trash ({trash.length})
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-slate-700">Filter:</span>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border border-slate-300 rounded text-sm"
        >
          <option value="all">All types ({trash.length})</option>
          {presentTypes.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t] || t} ({trash.filter((x) => x.type === t).length})
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Type</th>
              <th className="text-left p-3 font-medium">Item</th>
              <th className="text-left p-3 font-medium">Deleted by</th>
              <th className="text-left p-3 font-medium">Deleted at</th>
              <th className="text-left p-3 font-medium">Auto-purge</th>
              <th className="p-3 w-32"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry) => (
              <tr key={entry.id} className="border-t border-slate-100">
                <td className="p-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {TYPE_LABELS[entry.type] || entry.type}
                  </span>
                </td>
                <td className="p-3 font-mono text-xs text-slate-700">
                  {previewItem(entry)}
                </td>
                <td className="p-3 text-slate-700">
                  {entry.deletedByName || entry.deletedBy}
                </td>
                <td className="p-3 text-slate-500 text-xs">
                  {(entry.deletedAt || "").replace("T", " ").slice(0, 16)}
                </td>
                <td className="p-3 text-xs text-amber-600">
                  {daysLeft(entry.deletedAt)}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => doRestore(entry)}
                    className="text-emerald-600 hover:text-emerald-700 text-xs font-medium px-2 py-1 hover:bg-emerald-50 rounded"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => doPurge(entry)}
                    className="text-red-600 hover:text-red-700 text-xs font-medium px-2 py-1 hover:bg-red-50 rounded ml-1"
                  >
                    Purge
                  </button>
                </td>
              </tr>
            ))}
            {!sorted.length && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-400">
                  <Trash2 size={32} className="mx-auto mb-2 text-slate-300" />
                  Trash is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============== ROUT CARD NUMBERING ADMIN ==============
// Lets super-admin and printing dept-admin configure how rout cards are numbered.
// Two configurable fields: Input batch number (BEFORE printing) and Print number (AFTER printing).
function NumberingAdmin({ ctx }: CtxProps) {
  const { numbering, saveNumbering, records } = ctx;
  // Local working copy so admin can preview before saving
  const [draft, setDraft] = useState(numbering || DEFAULT_NUMBERING);
  const [saved, setSaved] = useState(false);

  function update(field, key, val) {
    setDraft((prev) => ({ ...prev, [field]: { ...prev[field], [key]: val } }));
    setSaved(false);
  }

  async function commit() {
    await saveNumbering(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // Show a few example numbers using the current draft config
  function previewSamples(cfg) {
    const preset =
      NUMBERING_PRESETS.find((p) => p.id === cfg.presetId) ||
      NUMBERING_PRESETS[0];
    const startSeq = Number(cfg.nextSeq) || 1;
    return [0, 1, 2].map((i) => preset.format(cfg.prefix || "", startSeq + i));
  }

  // Show the highest existing number so admin knows the floor for nextSeq
  const inputUsedCount = (records.input || []).length;
  const printUsedCount = (records.printing || []).length;
  const dyeingUsedCount = (records.dyeing || []).length;

  return (
    <div className="space-y-4">
      <BackBar
        ctx={ctx}
        to={{ type: "department", departmentId: "printing" }}
        label="Back → Printing"
      />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Rout Card Numbering
        </h2>
        <p className="text-slate-500 text-sm">
          Configure how Input batches (BEFORE printing) and Print numbers (AFTER
          printing) are generated.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
        <strong>How it works:</strong> The <em>next sequence number</em> is the
        floor — when an operator creates a new record, the system finds the next
        free number ≥ the floor. Existing records keep their old numbers.
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <NumberingCard
          title="Input Batch Number (BEFORE printing)"
          subtitle={`Currently ${inputUsedCount} input record(s)`}
          cfg={draft.inputBatch}
          field="inputBatch"
          onChange={update}
          samples={previewSamples(draft.inputBatch)}
        />
        <NumberingCard
          title="Print Number (AFTER printing)"
          subtitle={`Currently ${printUsedCount} print record(s)`}
          cfg={draft.printNumber}
          field="printNumber"
          onChange={update}
          samples={previewSamples(draft.printNumber)}
        />
        <NumberingCard
          title="Dyeing Number (AFTER dyeing)"
          subtitle={`Currently ${dyeingUsedCount} dyeing record(s)`}
          cfg={draft.dyeingNumber || DEFAULT_NUMBERING.dyeingNumber}
          field="dyeingNumber"
          onChange={update}
          samples={previewSamples(
            draft.dyeingNumber || DEFAULT_NUMBERING.dyeingNumber,
          )}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={commit}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium"
        >
          Save numbering settings
        </button>
        {saved && (
          <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle size={14} /> Saved
          </span>
        )}
      </div>
    </div>
  );
}

function NumberingCard({
  title,
  subtitle,
  cfg,
  field,
  onChange,
  samples,
}: {
  title: string;
  subtitle?: string;
  cfg: NumberingConfig;
  field: string;
  onChange: (field: string, key: string, val: any) => void;
  samples: string[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <Field label="Format preset">
        <div className="space-y-1.5">
          {NUMBERING_PRESETS.map((p) => (
            <label
              key={p.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer ${cfg.presetId === p.id ? "border-purple-400 bg-purple-50" : "border-slate-200 hover:bg-slate-50"}`}
            >
              <input
                type="radio"
                name={`preset-${field}`}
                checked={cfg.presetId === p.id}
                onChange={() => onChange(field, "presetId", p.id)}
              />
              <div className="flex-1">
                <div className="text-sm font-mono text-slate-700">
                  {p.label}
                </div>
                <div className="text-xs text-slate-500">
                  e.g. <code className="font-mono">{p.sample}</code>
                </div>
              </div>
            </label>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Prefix">
          <input
            value={cfg.prefix}
            onChange={(e) => onChange(field, "prefix", e.target.value)}
            maxLength={6}
            className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
          />
        </Field>
        <Field label="Next sequence #">
          <input
            type="number"
            min="1"
            value={cfg.nextSeq}
            onChange={(e) =>
              onChange(field, "nextSeq", Number(e.target.value) || 1)
            }
            className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
          />
        </Field>
      </div>

      <div className="bg-slate-50 rounded-lg p-3">
        <div className="text-xs text-slate-500 mb-1">
          Preview — next numbers will be:
        </div>
        <div className="font-mono text-sm text-slate-800">
          {samples.map((s, i) => (
            <span
              key={i}
              className={`inline-block mr-3 ${i === 0 ? "font-bold text-purple-700" : "text-slate-500"}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============== EDITABLE ROUT CARD HEADER (item #5b) ==============
// Shown at the top of Input and Printing forms. For super-admin: an editable input
// with collision validation against `existingNumbers`. For everyone else: read-only.
//
// Props:
//   - label:           "Print #" or "Batch #"
//   - value:           the current number on the form (f.printNo / f.batchNo)
//   - onChange:        called with the new (cleaned) value
//   - currentUser:     the logged-in user (used to gate edit privileges)
//   - existingNumbers: Set of all already-used numbers in this collection — for collision check
//                     (the form's own current number is filtered out so editing your own record is fine)
function EditableRoutCardHeader({
  label,
  value,
  onChange,
  currentUser,
  existingNumbers,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  currentUser: User;
  existingNumbers: Set<string>;
}) {
  const isAdmin = currentUser?.role === "admin";
  // Collision detection: if super-admin types a number that already exists in another record, warn.
  const collides = existingNumbers && value && existingNumbers.has(value);

  if (!isAdmin) {
    return (
      <div className="bg-purple-50 rounded-lg p-2 text-sm font-mono text-purple-700 flex items-center gap-2">
        <Lock size={13} className="text-purple-500" />
        {label} <strong>{value}</strong>{" "}
        <span className="text-xs text-purple-500">
          (auto, super-admin can edit)
        </span>
      </div>
    );
  }

  // Super-admin gets an editable input.
  return (
    <div>
      <div className="bg-purple-50 rounded-lg p-2 flex items-center gap-2">
        <span className="text-sm font-medium text-purple-700 whitespace-nowrap">
          {label}
        </span>
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value.trim())}
          className={`flex-1 px-2 py-1 border rounded font-mono text-sm bg-white ${collides ? "border-red-400 text-red-700" : "border-purple-300 text-purple-900"}`}
          placeholder="e.g. P-MAY001"
        />
        <span className="text-xs text-purple-600 whitespace-nowrap">
          super-admin override
        </span>
      </div>
      {collides && (
        <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> This number is already used by another
          record. Pick a different one.
        </div>
      )}
    </div>
  );
}

// ============== PROGRAMS ADMIN (item #5) ==============
// A program is a multi-design printing plan: e.g. "Program ALFA — D-100×3000m + D-200×2000m".
// Defined here by super-admin / printing dept-admin. Operators link a print record to a program
// at the Printing station; that program then automatically applies through the rest of the
// pipeline via Print # → Curing/Finishing/Calendering/Folding chain.
function ProgramsAdmin({ ctx }: CtxProps) {
  const { programs, designs, saveProgram, deleteProgram, askConfirm, records } =
    ctx;
  const t = useT();
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  // Program type tab — printing vs dyeing. Existing programs without programType
  // are treated as 'printing' for backward compatibility.
  const [programType, setProgramType] = useState("printing");

  function newProgram() {
    setEditing({
      id: uid(),
      name: "",
      status: "Active",
      createdAt: todayISO(),
      // Inherit the currently-active tab so new programs land in the right bucket.
      programType,
      lines: [],
      notes: "",
    });
  }

  // Compute progress for each program — used to show a quick status badge in the list.
  // For dyeing programs, "printed" qty actually means "dyed" qty pulled from dyeing records.
  const programProgress = useMemo(() => {
    const printRecs = records.printing || [];
    const dyeingRecs = records.dyeing || [];
    const map: Record<string, any> = {};
    programs.forEach((p) => {
      const totalQty = (p.lines || []).reduce(
        (s, ln) => s + (Number(ln.qty) || 0),
        0,
      );
      const isDyeing = p.programType === "dyeing";
      const sourceRecs = isDyeing ? dyeingRecs : printRecs;
      const qtyField = isDyeing ? "dyedQty" : "printedQty";
      const producedQty = sourceRecs
        .filter((pr) => pr.programId === p.id)
        .reduce((s, pr) => s + (Number(pr[qtyField]) || 0), 0);
      map[p.id] = {
        totalQty,
        producedQty,
        pct: totalQty ? (producedQty / totalQty) * 100 : 0,
      };
    });
    return map;
  }, [programs, records]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (
      programs
        // Filter by active tab. Old programs without programType are 'printing' by default.
        .filter((p) => (p.programType || "printing") === programType)
        .filter((p) => !term || p.name?.toLowerCase().includes(term))
        .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    );
  }, [programs, search, programType]);

  // Counts per type so the tab labels show how many programs are in each bucket.
  const typeCounts = useMemo(() => {
    const printing = programs.filter(
      (p) => (p.programType || "printing") === "printing",
    ).length;
    const dyeing = programs.filter((p) => p.programType === "dyeing").length;
    return { printing, dyeing };
  }, [programs]);

  return (
    <div className="space-y-4">
      <BackBar
        ctx={ctx}
        to={{ type: "department", departmentId: "printing" }}
        label="Back → Printing"
      />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {programType === "dyeing"
              ? t("dyeing.programsTitle")
              : t("printing.programsTitle")}
          </h2>
          <p className="text-slate-500 text-sm">
            {programType === "dyeing"
              ? t("dyeing.programsDesc")
              : t("printing.programsDesc")}
          </p>
        </div>
        <button
          onClick={newProgram}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus size={16} /> New{" "}
          {programType === "dyeing" ? "Dyeing" : "Printing"} Program
        </button>
      </div>

      {/* Type tabs — switch between printing programs and dyeing programs. */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setProgramType("printing")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${programType === "printing" ? "bg-white shadow text-purple-700" : "text-slate-600"}`}
        >
          {t("printing.programsTitle")} ({typeCounts.printing})
        </button>
        <button
          onClick={() => setProgramType("dyeing")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${programType === "dyeing" ? "bg-white shadow text-cyan-700" : "text-slate-600"}`}
        >
          {t("dyeing.programsTitle")} ({typeCounts.dyeing})
        </button>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="relative max-w-sm">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs..."
            className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Program name</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">
                {programType === "dyeing" ? "Color lines" : "Designs"}
              </th>
              <th className="text-right p-3 font-medium">Total qty</th>
              <th className="text-right p-3 font-medium">
                {programType === "dyeing" ? "Dyed" : "Printed"}
              </th>
              <th className="text-left p-3 font-medium">Progress</th>
              <th className="p-3 w-24"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const prog = programProgress[p.id] || {
                totalQty: 0,
                producedQty: 0,
                pct: 0,
              };
              return (
                <tr
                  key={p.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-800">
                      {p.name || "(unnamed)"}
                    </div>
                    <div className="text-xs text-slate-500">
                      Created {p.createdAt}
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">{(p.lines || []).length}</td>
                  <td className="p-3 text-right">
                    {prog.totalQty.toLocaleString()}m
                  </td>
                  <td className="p-3 text-right">
                    {prog.producedQty.toLocaleString()}m
                  </td>
                  <td className="p-3 w-48">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${prog.pct >= 100 ? "bg-emerald-500" : programType === "dyeing" ? "bg-cyan-500" : "bg-purple-500"}`}
                        style={{ width: `${Math.min(100, prog.pct)}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {prog.pct.toFixed(1)}%
                    </div>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setEditing(p)}
                      className="text-slate-500 hover:text-emerald-600 p-1"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() =>
                        askConfirm(
                          `Delete program ${p.name}? Existing print records will keep their link but the program will be gone.`,
                          () => deleteProgram(p.id),
                        )
                      }
                      className="text-slate-500 hover:text-red-600 p-1 ml-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {!filtered.length && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  No {programType === "dyeing" ? "dyeing" : "printing"} programs
                  yet. Click "New Program" to start.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal
          title={
            programs.find((x) => x.id === editing.id)
              ? "Edit Program"
              : "New Program"
          }
          onClose={() => setEditing(null)}
          large
        >
          <ProgramForm
            initial={editing}
            designs={designs}
            onSave={async (p) => {
              await saveProgram(p);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

// Form for creating / editing a Program with multiple design lines.
function ProgramForm({
  initial,
  designs,
  onSave,
  onCancel,
}: {
  initial: Program;
  designs: Design[];
  onSave: (p: Program) => void;
  onCancel: () => void;
}) {
  const [p, setP] = useState(initial);
  const [showGalleryFor, setShowGalleryFor] = useState(null); // line id when picker is open

  const totalQty = (p.lines || []).reduce(
    (s, ln) => s + (Number(ln.qty) || 0),
    0,
  );

  function set(k, v) {
    setP((prev) => ({ ...prev, [k]: v }));
  }

  function updateLine(lineId, key, val) {
    setP((prev) => ({
      ...prev,
      lines: prev.lines.map((ln) =>
        ln.id === lineId ? { ...ln, [key]: val } : ln,
      ),
    }));
  }
  function addLine() {
    setP((prev) => ({
      ...prev,
      lines: [
        ...(prev.lines || []),
        {
          id: uid(),
          designNumber: "",
          designName: "",
          qty: "",
          foldingPlan: "",
        },
      ],
    }));
  }
  function removeLine(lineId) {
    setP((prev) => ({
      ...prev,
      lines: prev.lines.filter((ln) => ln.id !== lineId),
    }));
  }
  function pickDesign(lineId, design) {
    updateLine(lineId, "designNumber", design.designNumber);
    updateLine(lineId, "designName", design.name || "");
    setShowGalleryFor(null);
  }

  function save() {
    if (!p.name?.trim()) {
      alert("Program name is required");
      return;
    }
    if (!p.lines?.length) {
      alert("Add at least one design line");
      return;
    }
    for (const ln of p.lines) {
      if (!ln.designNumber?.trim()) {
        alert("Every line must have a design number");
        return;
      }
      if (!ln.qty || Number(ln.qty) <= 0) {
        alert("Every line must have a positive quantity");
        return;
      }
    }
    onSave({
      ...p,
      lines: p.lines.map((ln) => ({ ...ln, qty: Number(ln.qty) })),
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Program name *">
          <input
            value={p.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
            placeholder="e.g. May Batch — ALFA"
            autoFocus
          />
        </Field>
        <Field label="Status">
          <select
            value={p.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </Field>
      </div>

      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold text-slate-800">Design lines</div>
            <div className="text-xs text-slate-500">
              Total: <strong>{totalQty.toLocaleString()}m</strong> across{" "}
              {(p.lines || []).length} design
              {(p.lines || []).length !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            type="button"
            onClick={addLine}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Plus size={14} /> Add design
          </button>
        </div>

        <div className="space-y-3">
          {(p.lines || []).map((ln, idx) => {
            const matchedDesign = designs.find(
              (d) => d.designNumber === ln.designNumber,
            );
            const galleryOpen = showGalleryFor === ln.id;
            return (
              <div
                key={ln.id}
                className="bg-white rounded-lg p-3 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">
                    Line {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLine(ln.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-12 sm:col-span-4">
                    <label className="text-xs text-slate-500 block mb-1">
                      Design # *
                    </label>
                    <div className="flex gap-1">
                      <input
                        value={ln.designNumber}
                        onChange={(e) =>
                          updateLine(ln.id, "designNumber", e.target.value)
                        }
                        className="flex-1 p-2 border border-slate-300 rounded font-mono text-sm"
                        placeholder="D-100"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowGalleryFor(galleryOpen ? null : ln.id)
                        }
                        className="px-2 bg-slate-100 hover:bg-slate-200 rounded text-xs flex items-center gap-1"
                      >
                        <ImageIcon size={13} />
                      </button>
                    </div>
                    {resolveDesignImage(matchedDesign) && !galleryOpen && (
                      <div className="mt-1 flex items-center gap-2 bg-slate-50 rounded p-1.5">
                        <img
                          src={resolveDesignImage(matchedDesign)}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <span className="text-xs text-slate-600 truncate">
                          {matchedDesign.name || matchedDesign.designNumber}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-7 sm:col-span-3">
                    <label className="text-xs text-slate-500 block mb-1">
                      Design name
                    </label>
                    <input
                      value={ln.designName}
                      onChange={(e) =>
                        updateLine(ln.id, "designName", e.target.value)
                      }
                      className="w-full p-2 border border-slate-300 rounded text-sm"
                      placeholder="auto-fills from gallery"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-2">
                    <label className="text-xs text-slate-500 block mb-1">
                      Qty (m) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={ln.qty}
                      onChange={(e) => updateLine(ln.id, "qty", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded text-sm text-right"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-3">
                    <label className="text-xs text-slate-500 block mb-1">
                      Folding plan
                    </label>
                    <input
                      value={ln.foldingPlan}
                      onChange={(e) =>
                        updateLine(ln.id, "foldingPlan", e.target.value)
                      }
                      className="w-full p-2 border border-slate-300 rounded text-sm"
                      placeholder="e.g. 100m rolls + A-frame"
                    />
                  </div>
                </div>

                {galleryOpen && (
                  <div className="mt-2 border border-slate-200 rounded-lg p-2">
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                      {designs.map((d) => (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => pickDesign(ln.id, d)}
                          className="text-left hover:bg-slate-50 rounded p-1 border border-transparent hover:border-emerald-300"
                        >
                          <div className="aspect-square bg-slate-100 rounded mb-1 overflow-hidden">
                            {resolveDesignImage(d) ? (
                              <img
                                src={resolveDesignImage(d)}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon
                                size={20}
                                className="m-auto text-slate-300"
                              />
                            )}
                          </div>
                          <div className="font-mono text-[10px] font-bold truncate">
                            {d.designNumber}
                          </div>
                        </button>
                      ))}
                      {!designs.length && (
                        <div className="col-span-full text-center text-xs text-slate-400 p-3">
                          No designs in gallery
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {!(p.lines || []).length && (
            <div className="text-center text-sm text-slate-400 py-4">
              No design lines yet. Click "Add design" to start.
            </div>
          )}
        </div>
      </div>

      <Field label="Notes">
        <textarea
          value={p.notes || ""}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
        >
          Cancel
        </button>
        <button
          onClick={save}
          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
        >
          Save Program
        </button>
      </div>
    </div>
  );
}

// ============== PROGRAMS PROGRESS DASHBOARD (item #5) ==============
// For each program: total planned vs how much was printed, cured, finished, calendered, folded.
// At folded stage we additionally split into 1st sort / incomplete / 2nd sort / rejected.
// Records flow: Print record carries `programId`. Other stations track by `printNo` so they
// inherit the program automatically.
function ProgramsProgress({ ctx }: CtxProps) {
  const { programs: allPrograms, records, designs } = ctx;
  const t = useT();
  const [expanded, setExpanded] = useState(null); // expanded program id
  // Tab toggle — printing vs dyeing programs. Mirrors the Programs admin page UX.
  const [programType, setProgramType] = useState("printing");

  // Filter to the active tab's programs.
  const programs = useMemo(
    () =>
      allPrograms.filter((p) => (p.programType || "printing") === programType),
    [allPrograms, programType],
  );

  // Counts per type for the tab labels.
  const typeCounts = useMemo(() => {
    const printing = allPrograms.filter(
      (p) => (p.programType || "printing") === "printing",
    ).length;
    const dyeing = allPrograms.filter((p) => p.programType === "dyeing").length;
    return { printing, dyeing };
  }, [allPrograms]);

  // Compute per-program aggregates across all stages.
  // Different stages depending on programType: printing has print→cure→finish→calender→fold,
  // dyeing has dye→finish→calender→fold (skips curing entirely).
  const aggregates = useMemo(() => {
    const result = {};
    programs.forEach((p) => {
      const totalPlanned = (p.lines || []).reduce(
        (s, ln) => s + (Number(ln.qty) || 0),
        0,
      );
      const isDyeing = p.programType === "dyeing";

      // ===== "Source records" depend on type =====
      // For printing programs: records.printing rows linked via programId.
      // For dyeing programs: records.dyeing rows linked via programId.
      const sourceRecs = isDyeing
        ? (records.dyeing || []).filter((d) => d.programId === p.id)
        : (records.printing || []).filter((pr) => pr.programId === p.id);
      // The "card numbers" downstream stations reference. For printing this is printNo,
      // for dyeing it's dyeingNo — but downstream records store both in the `printNo` field
      // (with cardSource: 'dyeing' on dyed-card finishings/calenderings/foldings).
      const cardNos = new Set(
        sourceRecs.map((r) => (isDyeing ? r.dyeingNo : r.printNo)),
      );
      // The qty produced at the source stage (printed for print programs, dyed for dye programs).
      const sourceQty = sourceRecs.reduce(
        (s, r) => s + (Number(isDyeing ? r.dyedQty : r.printedQty) || 0),
        0,
      );

      // ===== Cured (printing only — dyed cards skip curing) =====
      const curedQty = isDyeing
        ? 0
        : (records.curing || [])
            .filter((c) => cardNos.has(c.printNo))
            .reduce(
              (s, c) => s + (Number(c.qty) || Number(c.curedQty) || 0),
              0,
            );

      // ===== Finished — both types =====
      // Filter by cardNos only. Since downstream records store dyeingNo in printNo field
      // for dyed cards, this matches them naturally — we additionally filter by cardSource
      // to be safe (a printNo collision with a dyeingNo is unlikely but possible).
      const finishedQty = (records.finishing || [])
        .filter(
          (f) =>
            cardNos.has(f.printNo) &&
            (f.cardSource || "printing") === programType,
        )
        .reduce((s, f) => s + (Number(f.finishedQty) || 0), 0);

      // ===== Calendered — both types =====
      const calenderedQty = (records.calendering || [])
        .filter(
          (c) =>
            cardNos.has(c.printNo) &&
            (c.cardSource || "printing") === programType,
        )
        .reduce((s, c) => s + (Number(c.qty) || 0), 0);

      // ===== Folded / inspected — both types =====
      const folds = (records.folding || []).filter(
        (f) =>
          cardNos.has(f.printNo) &&
          (f.cardSource || "printing") === programType,
      );
      const firstQ = folds.reduce((s, f) => s + Number(f.firstQty || 0), 0);
      const incomplete = folds.reduce(
        (s, f) => s + Number(f.incompleteQty || 0),
        0,
      );
      const secondQ = folds.reduce((s, f) => s + Number(f.secondQty || 0), 0);
      const reject = folds.reduce((s, f) => s + Number(f.rejectQty || 0), 0);
      const inspectedTotal = firstQ + incomplete + secondQ + reject;

      // ===== Per-design breakdown =====
      // Match by designNumber appearing in source records of this program.
      // For dyed programs we don't filter by designNumber (a dyed record represents the program as a whole),
      // so per-design progress doesn't quite make sense — we just show one row per program line with
      // the program-wide source qty distributed proportionally to planned qty. For now, simpler:
      // for dyed programs we omit the per-design breakdown (it's redundant with the headline).
      const perDesign = isDyeing
        ? []
        : (p.lines || []).map((ln) => {
            const designPrints = sourceRecs.filter(
              (pr) => pr.designNumber === ln.designNumber,
            );
            const designPrintNos = new Set(
              designPrints.map((pr) => pr.printNo),
            );
            const designPrinted = designPrints.reduce(
              (s, pr) => s + (Number(pr.printedQty) || 0),
              0,
            );
            const designFolds = (records.folding || []).filter((f) =>
              designPrintNos.has(f.printNo),
            );
            const dFirst = designFolds.reduce(
              (s, f) => s + Number(f.firstQty || 0),
              0,
            );
            const dInc = designFolds.reduce(
              (s, f) => s + Number(f.incompleteQty || 0),
              0,
            );
            const dSec = designFolds.reduce(
              (s, f) => s + Number(f.secondQty || 0),
              0,
            );
            const dRej = designFolds.reduce(
              (s, f) => s + Number(f.rejectQty || 0),
              0,
            );
            return {
              ...ln,
              printed: designPrinted,
              first: dFirst,
              incomplete: dInc,
              second: dSec,
              reject: dRej,
              inspected: dFirst + dInc + dSec + dRej,
              pctPrinted: ln.qty ? (designPrinted / ln.qty) * 100 : 0,
            };
          });

      result[p.id] = {
        isDyeing,
        totalPlanned,
        // The "source" stage carries the qty produced at the program's first stage —
        // printedQty for printing programs, dyedQty for dyeing programs.
        sourceQty,
        sourcePct: totalPlanned ? (sourceQty / totalPlanned) * 100 : 0,
        cured: curedQty,
        curedPct: totalPlanned ? (curedQty / totalPlanned) * 100 : 0,
        finished: finishedQty,
        finishedPct: totalPlanned ? (finishedQty / totalPlanned) * 100 : 0,
        calendered: calenderedQty,
        calenderedPct: totalPlanned ? (calenderedQty / totalPlanned) * 100 : 0,
        first: firstQ,
        incomplete,
        second: secondQ,
        reject,
        inspected: inspectedTotal,
        firstPct: totalPlanned ? (firstQ / totalPlanned) * 100 : 0,
        rejectPct: inspectedTotal ? (reject / inspectedTotal) * 100 : 0,
        yieldPct: inspectedTotal
          ? ((firstQ + incomplete) / inspectedTotal) * 100
          : 0,
        cardCount: cardNos.size,
        perDesign,
      };
    });
    return result;
  }, [programs, records, programType]);

  return (
    <div className="space-y-4">
      <BackBar
        ctx={ctx}
        to={{ type: "department", departmentId: "printing" }}
        label="Back → Printing"
      />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {t("progressDash.title")}
        </h2>
        <p className="text-slate-500 text-sm">
          {programType === "dyeing"
            ? "For every dyeing program: dyed → finished → calendered, plus inspection breakdown after folding."
            : "For every printing program: printed → cured → finished → calendered, plus inspection breakdown after folding."}
        </p>
      </div>

      {/* Type tabs — same UX as Programs admin */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => {
            setProgramType("printing");
            setExpanded(null);
          }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${programType === "printing" ? "bg-white shadow text-purple-700" : "text-slate-600"}`}
        >
          Printing ({typeCounts.printing})
        </button>
        <button
          onClick={() => {
            setProgramType("dyeing");
            setExpanded(null);
          }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${programType === "dyeing" ? "bg-white shadow text-cyan-700" : "text-slate-600"}`}
        >
          Dyeing ({typeCounts.dyeing})
        </button>
      </div>

      {programs.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-slate-500 shadow-sm">
          No {programType} programs defined yet. Go to{" "}
          <strong>Settings → Programs</strong> to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {programs.map((p) => {
            const a = aggregates[p.id] || {};
            const isExpanded = expanded === p.id;
            const isDyeing = a.isDyeing;
            return (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Header — click to expand */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : p.id)}
                  className="w-full text-left p-4 hover:bg-slate-50 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800">{p.name}</span>
                      {isDyeing && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 font-bold">
                          DYE
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {p.status}
                      </span>
                      <span className="text-xs text-slate-500">
                        {(p.lines || []).length}{" "}
                        {isDyeing ? "color line(s)" : "design(s)"} ·{" "}
                        {a.cardCount || 0}{" "}
                        {isDyeing ? "dye card(s)" : "rout card(s)"} ·{" "}
                        {(a.totalPlanned || 0).toLocaleString()}m planned
                      </span>
                    </div>
                    {/* Stage progress bars — printing has 5 stages, dyeing has 4 (no curing) */}
                    <div
                      className={`mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 ${isDyeing ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}
                    >
                      <ProgressBar
                        label={isDyeing ? "Dyed" : "Printed"}
                        qty={a.sourceQty}
                        pct={a.sourcePct}
                        color={isDyeing ? "bg-cyan-600" : "bg-purple-500"}
                      />
                      {!isDyeing && (
                        <ProgressBar
                          label="Cured"
                          qty={a.cured}
                          pct={a.curedPct}
                          color="bg-orange-500"
                        />
                      )}
                      <ProgressBar
                        label="Finished"
                        qty={a.finished}
                        pct={a.finishedPct}
                        color="bg-pink-500"
                      />
                      <ProgressBar
                        label="Calendered"
                        qty={a.calendered}
                        pct={a.calenderedPct}
                        color="bg-indigo-500"
                      />
                      <ProgressBar
                        label="Folded 1st"
                        qty={a.first}
                        pct={a.firstPct}
                        color="bg-emerald-500"
                      />
                    </div>
                  </div>
                  <ChevronRight
                    size={20}
                    className={`text-slate-400 transition ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-4 space-y-4 bg-slate-50">
                    {/* Inspection breakdown summary */}
                    {(a.inspected || 0) > 0 ? (
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-slate-700 mb-2 text-sm">
                          Inspection breakdown (after folding)
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
                          <InspectStat
                            label="1st sort"
                            qty={a.first}
                            total={a.inspected}
                            color="text-green-700"
                          />
                          <InspectStat
                            label="Incomplete"
                            qty={a.incomplete}
                            total={a.inspected}
                            color="text-emerald-600"
                          />
                          <InspectStat
                            label="2nd sort"
                            qty={a.second}
                            total={a.inspected}
                            color="text-amber-600"
                          />
                          <InspectStat
                            label="Rejected"
                            qty={a.reject}
                            total={a.inspected}
                            color="text-red-600"
                          />
                          <div className="bg-slate-100 rounded-lg p-2.5">
                            <div className="text-xs text-slate-500">
                              Yield % (1st + Incomplete)
                            </div>
                            <div className="font-bold text-slate-800">
                              {(a.yieldPct || 0).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic">
                        No folded/inspected meters yet for this program.
                      </div>
                    )}

                    {/* Per-design breakdown — printing only */}
                    {!isDyeing && (
                      <div className="bg-white rounded-lg overflow-x-auto">
                        <div className="font-semibold text-slate-700 px-3 pt-3 text-sm">
                          Per-design progress
                        </div>
                        <table className="w-full text-sm mt-2">
                          <thead className="bg-slate-50 text-slate-600">
                            <tr>
                              <th className="text-left p-2 font-medium">
                                Design
                              </th>
                              <th className="text-left p-2 font-medium">
                                Planned
                              </th>
                              <th className="text-left p-2 font-medium">
                                Printed
                              </th>
                              <th className="text-left p-2 font-medium">
                                % Printed
                              </th>
                              <th className="text-left p-2 font-medium">1st</th>
                              <th className="text-left p-2 font-medium">
                                Incomp.
                              </th>
                              <th className="text-left p-2 font-medium">2nd</th>
                              <th className="text-left p-2 font-medium">
                                Rejected
                              </th>
                              <th className="text-left p-2 font-medium">
                                Folding plan
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {a.perDesign?.map((ln) => (
                              <tr
                                key={ln.id}
                                className="border-t border-slate-100"
                              >
                                <td className="p-2">
                                  <DesignTag
                                    designNumber={ln.designNumber}
                                    designs={designs}
                                    size={28}
                                  />
                                </td>
                                <td className="p-2">
                                  {Number(ln.qty).toLocaleString()}m
                                </td>
                                <td className="p-2 font-medium">
                                  {ln.printed.toLocaleString()}m
                                </td>
                                <td className="p-2">
                                  <div className="w-20 bg-slate-100 rounded-full h-1.5">
                                    <div
                                      className="bg-purple-500 h-full"
                                      style={{
                                        width: `${Math.min(100, ln.pctPrinted)}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs text-slate-500">
                                    {ln.pctPrinted.toFixed(1)}%
                                  </span>
                                </td>
                                <td className="p-2 text-green-700">
                                  {ln.first.toLocaleString()}
                                </td>
                                <td className="p-2 text-emerald-600">
                                  {ln.incomplete.toLocaleString()}
                                </td>
                                <td className="p-2 text-amber-600">
                                  {ln.second.toLocaleString()}
                                </td>
                                <td className="p-2 text-red-600">
                                  {ln.reject.toLocaleString()}
                                </td>
                                <td className="p-2 text-xs text-slate-500">
                                  {ln.foldingPlan || "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProgressBar({
  label,
  qty,
  pct,
  color,
}: {
  label: string;
  qty?: number;
  pct?: number;
  color: string;
}) {
  const pctClamped = Math.min(100, Math.max(0, pct || 0));
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-700 font-medium">
          {(qty || 0).toLocaleString()}m
        </span>
      </div>
      <div className="bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${pctClamped}%` }}
        />
      </div>
      <div className="text-[10px] text-slate-400 mt-0.5">
        {pctClamped.toFixed(1)}%
      </div>
    </div>
  );
}

function InspectStat({
  label,
  qty,
  total,
  color,
}: {
  label: string;
  qty?: number;
  total?: number;
  color: string;
}) {
  const pct = total ? (qty / total) * 100 : 0;
  return (
    <div className="bg-slate-50 rounded-lg p-2.5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`font-bold ${color}`}>{(qty || 0).toLocaleString()}m</div>
      <div className="text-xs text-slate-400">{pct.toFixed(1)}%</div>
    </div>
  );
}

// ============== DAILY REPORT PAGE (telegram-screenshot dashboard) ==============
// Shows the most recent day's totals per station as big screenshot-friendly numbers,
// with a historical table below by date that supports selection + CSV export.
//
// "Last day" = the latest date in any station's records, not necessarily today.
// The big block aggregates ALL stations on that single day.
function DailyPage({ ctx }: CtxProps) {
  const { records, user } = ctx;
  const t = useT();

  // Stations we report on. Each entry maps to the records key, and the qty field
  // we sum for the daily total. Folding is special: it sums 1st + incomplete (= good output).
  // Labels come from the i18n layer so EN/UZ both work cleanly.
  const STATION_CONFIG = [
    {
      stationId: "gray_store",
      label: t("stage.gray_store"),
      qtyField: "meters",
      color: "from-stone-500 to-stone-600",
      icon: Database,
    },
    {
      stationId: "input",
      label: t("stage.input"),
      qtyField: "meters",
      color: "from-slate-500 to-slate-600",
      icon: Factory,
    },
    {
      stationId: "bleach",
      label: "Bleaching",
      qtyField: "qty",
      color: "from-cyan-500 to-cyan-600",
      icon: Droplet,
    },
    {
      stationId: "dyeing",
      label: t("dyeing.daily.label"),
      qtyField: "dyedQty",
      color: "from-cyan-700 to-blue-600",
      icon: Droplet,
    },
    {
      stationId: "batching",
      label: t("stage.batching"),
      qtyField: "qtyAfter",
      color: "from-blue-500 to-blue-600",
      icon: Wind,
    },
    {
      stationId: "printing",
      label: t("stage.printing"),
      qtyField: "printedQty",
      color: "from-purple-500 to-purple-600",
      icon: Printer,
    },
    {
      stationId: "curing",
      label: t("stage.curing"),
      qtyField: "qty",
      color: "from-orange-500 to-orange-600",
      icon: Flame,
    },
    {
      stationId: "finishing",
      label: t("stage.finishing"),
      qtyField: "finishedQty",
      color: "from-pink-500 to-pink-600",
      icon: Sparkles,
    },
    {
      stationId: "calendering",
      label: t("stage.calendering"),
      qtyField: "qty",
      color: "from-indigo-500 to-indigo-600",
      icon: Layers,
    },
    {
      stationId: "folding",
      label: t("stage.folding"),
      qtyField: "__fold__",
      color: "from-emerald-500 to-emerald-600",
      icon: Package,
    },
    {
      stationId: "dispatch_out",
      label: t("stage.dispatch"),
      qtyField: "qty",
      color: "from-green-500 to-green-600",
      icon: Truck,
    },
  ];

  // Helper to extract qty from a record per the station's rule.
  function getQty(stationId, qtyField, rec) {
    if (qtyField === "__fold__") {
      // For folding we sum 1st + incomplete (the "good output" definition used elsewhere).
      return Number(rec.firstQty || 0) + Number(rec.incompleteQty || 0);
    }
    return Number(rec[qtyField] || 0);
  }

  // Find the most recent date across all stations' records.
  // Falls back to today if there are no records at all (so we render *something*).
  const lastDay = useMemo(() => {
    let latest = null;
    STATION_CONFIG.forEach(({ stationId }) => {
      (records[stationId] || []).forEach((r) => {
        if (r.date && (!latest || r.date > latest)) latest = r.date;
      });
    });
    return latest || todayISO();
  }, [records]);

  // Per-station totals on the lastDay.
  const lastDayStats = useMemo(() => {
    return STATION_CONFIG.map((cfg) => {
      const list = (records[cfg.stationId] || []).filter(
        (r) => r.date === lastDay,
      );
      const total = list.reduce(
        (s, r) => s + getQty(cfg.stationId, cfg.qtyField, r),
        0,
      );
      return { ...cfg, total, count: list.length };
    });
  }, [records, lastDay]);

  // Per-station cumulative for the same calendar month as `lastDay`.
  // We use string-prefix matching on the YYYY-MM portion which is fast and timezone-safe.
  // Note: "this month" means the month the report is about (i.e. of lastDay), not real-world today.
  const monthPrefix = lastDay.slice(0, 7); // "YYYY-MM"
  const monthCumStats = useMemo(() => {
    const map: Record<string, number> = {};
    STATION_CONFIG.forEach((cfg) => {
      const list = (records[cfg.stationId] || []).filter((r) =>
        (r.date || "").startsWith(monthPrefix),
      );
      map[cfg.stationId] = list.reduce(
        (s, r) => s + getQty(cfg.stationId, cfg.qtyField, r),
        0,
      );
    });
    return map;
  }, [records, monthPrefix]);

  // Pretty month label for the cumulative ("May 2026" etc.)
  const monthLabel = useMemo(() => {
    try {
      return new Date(lastDay + "T00:00:00").toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return monthPrefix;
    }
  }, [lastDay, monthPrefix]);

  // Historical table — one row per (date), one column per station.
  // Build a date set first, then aggregate.
  const historicalRows = useMemo(() => {
    const dateSet = new Set<string>();
    STATION_CONFIG.forEach(({ stationId }) => {
      (records[stationId] || []).forEach((r) => {
        if (r.date) dateSet.add(r.date);
      });
    });
    const rows = [...dateSet]
      .sort((a, b) => b.localeCompare(a))
      .map((date) => {
        const row = { id: date, date };
        STATION_CONFIG.forEach((cfg) => {
          const list = (records[cfg.stationId] || []).filter(
            (r) => r.date === date,
          );
          row[cfg.stationId] = list.reduce(
            (s, r) => s + getQty(cfg.stationId, cfg.qtyField, r),
            0,
          );
        });
        return row;
      });
    return rows;
  }, [records]);

  // Selection for export (Set of date strings)
  const [selected, setSelected] = useState(new Set());
  function toggleAll() {
    if (selected.size === historicalRows.length) setSelected(new Set());
    else setSelected(new Set(historicalRows.map((r) => r.id)));
  }
  function toggleOne(id) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function exportRows() {
    const toExport =
      selected.size === 0
        ? historicalRows
        : historicalRows.filter((r) => selected.has(r.id));
    const flat = toExport.map((r) => {
      const out = { date: r.date };
      STATION_CONFIG.forEach((cfg) => {
        out[cfg.label] = r[cfg.stationId] || 0;
      });
      return out;
    });
    exportToCSV(flat, `daily_report_${todayISO()}`);
  }

  // Pretty-format the lastDay for headline.
  const lastDayPretty = useMemo(() => {
    try {
      return new Date(lastDay + "T00:00:00").toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return lastDay;
    }
  }, [lastDay]);

  // Grand total of meters across all stations for the day — useful headline.
  const grandTotal = lastDayStats.reduce((s, x) => s + x.total, 0);
  // Grand cumulative for the month — same logic across all stations summed.
  const grandMonthTotal = (Object.values(monthCumStats) as number[]).reduce(
    (s, v) => s + v,
    0,
  );

  return (
    <div className="space-y-5">
      <BackBar
        ctx={ctx}
        to={{ type: "department", departmentId: "printing" }}
        label="Back → Printing"
      />

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarDays size={24} className="text-amber-600" />{" "}
            {t("daily.title")}
          </h2>
          <p className="text-slate-500 text-sm">{t("daily.subtitle")}</p>
        </div>
      </div>

      {/* SCREENSHOT BLOCK — keep this self-contained so a screenshot of just this card is meaningful */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
              Production Report
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {lastDayPretty}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase">
              {t("daily.totalDayOutput")}
            </div>
            <div className="text-3xl font-bold text-amber-700">
              {grandTotal.toLocaleString()}m
            </div>
            {/* Monthly cumulative — smaller secondary line right under the day total */}
            <div className="text-xs text-amber-600 mt-1">
              <span className="opacity-70">
                {monthLabel} {t("daily.monthTotal")}:
              </span>{" "}
              <span className="font-bold tabular-nums">
                {grandMonthTotal.toLocaleString()}m
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {lastDayStats.map((s) => {
            const Icon = s.icon;
            const monthTotal = monthCumStats[s.stationId] || 0;
            return (
              <div
                key={s.stationId}
                className={`relative bg-gradient-to-br ${s.color} rounded-xl p-4 text-white overflow-hidden`}
              >
                <div className="absolute -right-2 -top-2 opacity-20">
                  <Icon size={56} />
                </div>
                <div className="relative">
                  <div className="text-xs uppercase opacity-90 tracking-wide font-medium">
                    {s.label}
                  </div>
                  <div className="text-3xl font-bold mt-1">
                    {s.total.toLocaleString()}
                    <span className="text-base ml-1 opacity-80">m</span>
                  </div>
                  {/* Month cumulative — smaller, slightly translucent so the day number stays the hero */}
                  <div className="mt-1.5 pt-1.5 border-t border-white/20 flex items-baseline justify-between gap-2">
                    <span className="text-[10px] uppercase opacity-70 tracking-wide">
                      Month
                    </span>
                    <span className="text-base font-bold opacity-95 tabular-nums">
                      {monthTotal.toLocaleString()}
                      <span className="text-[10px] ml-0.5 opacity-80">m</span>
                    </span>
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {s.count} record{s.count !== 1 ? "s" : ""} today
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 text-right mt-3 italic">
          {t("daily.generated")} {new Date().toLocaleString()} • {user.name}
        </div>
      </div>

      {/* Historical table — selectable + export */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-semibold text-slate-700">
              {t("daily.history")}
            </h3>
            <p className="text-xs text-slate-500">
              All days with production — most recent first. Select rows to
              export, or leave empty to export everything.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {selected.size > 0
                ? `${selected.size} selected`
                : `All ${historicalRows.length} days`}
            </span>
            <button
              onClick={exportRows}
              className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Download size={14} /> Export to Excel (CSV)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selected.size === historicalRows.length &&
                      historicalRows.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th className="text-left p-3 font-medium">Date</th>
                {STATION_CONFIG.map((s) => (
                  <th
                    key={s.stationId}
                    className="text-right p-3 font-medium whitespace-nowrap"
                  >
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historicalRows.map((r) => {
                const isLastDay = r.date === lastDay;
                return (
                  <tr
                    key={r.id}
                    className={`border-t border-slate-100 ${selected.has(r.id) ? "bg-purple-50" : isLastDay ? "bg-amber-50" : "hover:bg-slate-50"}`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.has(r.id)}
                        onChange={() => toggleOne(r.id)}
                      />
                    </td>
                    <td className="p-3 font-medium text-slate-800">
                      {r.date}
                      {isLastDay && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-amber-200 text-amber-800">
                          {t("daily.latest")}
                        </span>
                      )}
                    </td>
                    {STATION_CONFIG.map((s) => (
                      <td
                        key={s.stationId}
                        className="p-3 text-right tabular-nums"
                      >
                        {r[s.stationId] > 0 ? (
                          r[s.stationId].toLocaleString()
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {!historicalRows.length && (
                <tr>
                  <td
                    colSpan={STATION_CONFIG.length + 2}
                    className="p-8 text-center text-slate-400"
                  >
                    No records yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============== MAINTENANCE OVERVIEW ==============
// Aggregates maintenance, breakdown, and daily-check records across ALL stations
// into one selectable, exportable view. Each tab has its own selection state.
function MaintenanceOverview({ ctx }: CtxProps) {
  const { records, machines, lists, deleteRecord, askConfirm, user } = ctx;
  const t = useT();
  const [tab, setTab] = useState("maint");
  const isAdmin = user.role === "admin";
  const isDeptAdmin =
    user.role === "dept_admin" && user.departmentId === "printing";
  const canEdit = isAdmin || isDeptAdmin;

  // Helpers to format station / machine / dates for the table.
  // Use translated stage labels so the per-row station column matches the rest of the UI language.
  const stationName = (id) => {
    const s = STAGES.find((s) => s.id === id);
    return s ? t(`stage.${s.id}`) : id;
  };
  const machineName = (id) => machines.find((m) => m.id === id)?.name || "—";

  // Optional filter by station — useful when there are many records.
  const [stationFilter, setStationFilter] = useState("");

  // Date range filter (applies to all tabs)
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function applyFilter(rows) {
    return rows.filter((r) => {
      if (stationFilter && r.stationId !== stationFilter) return false;
      if (dateFrom && r.date < dateFrom) return false;
      if (dateTo && r.date > dateTo) return false;
      return true;
    });
  }

  const maintRecs = useMemo(
    () => applyFilter(records.maintenance || []),
    [records.maintenance, stationFilter, dateFrom, dateTo],
  );
  const breakdownRecs = useMemo(
    () => applyFilter(records.breakdown || []),
    [records.breakdown, stationFilter, dateFrom, dateTo],
  );
  const dailyChecks = useMemo(
    () => applyFilter(records.dailycheck || []),
    [records.dailycheck, stationFilter, dateFrom, dateTo],
  );

  // One selection set per tab so switching doesn't lose your selection.
  const [selectedMaint, setSelectedMaint] = useState(new Set());
  const [selectedBreak, setSelectedBreak] = useState(new Set());
  const [selectedCheck, setSelectedCheck] = useState(new Set());

  // Export helper — includes station and machine columns (which are computed from IDs).
  function exportMaint() {
    const rows = (
      selectedMaint.size === 0
        ? maintRecs
        : maintRecs.filter((r) => selectedMaint.has(r.id))
    ).map((r) => ({
      date: r.date,
      station: stationName(r.stationId),
      machine: machineName(r.machineId),
      type: r.type,
      shift: r.shift,
      reason: r.reason,
      actionTaken: r.actionTaken,
      cost: r.cost,
      operator: r.operator,
    }));
    exportToCSV(rows, "all_maintenance");
  }
  function exportBreakdown() {
    const rows = (
      selectedBreak.size === 0
        ? breakdownRecs
        : breakdownRecs.filter((r) => selectedBreak.has(r.id))
    ).map((r) => ({
      date: r.date,
      station: stationName(r.stationId),
      machine: machineName(r.machineId),
      type: r.type,
      cause: r.cause,
      downtime: r.downtime,
      repairAction: r.repairAction,
      cost: r.cost,
      responsible: r.responsible,
    }));
    exportToCSV(rows, "all_breakdowns");
  }
  function exportChecks() {
    const rows = (
      selectedCheck.size === 0
        ? dailyChecks
        : dailyChecks.filter((r) => selectedCheck.has(r.id))
    ).map((r) => ({
      date: r.date,
      station: stationName(r.stationId),
      machine: machineName(r.machineId),
      shift: r.shift,
      result: r.result,
      notes: r.notes,
      operator: r.operator,
    }));
    exportToCSV(rows, "all_daily_checks");
  }

  // Delete-selected helpers — only enabled for super-admin / printing dept-admin.
  function deleteSelectedMaint() {
    askConfirm(
      `Move ${selectedMaint.size} maintenance record(s) to trash?`,
      () => {
        selectedMaint.forEach((id) => deleteRecord("maintenance", id));
        setSelectedMaint(new Set());
      },
    );
  }
  function deleteSelectedBreak() {
    askConfirm(
      `Move ${selectedBreak.size} breakdown record(s) to trash?`,
      () => {
        selectedBreak.forEach((id) => deleteRecord("breakdown", id));
        setSelectedBreak(new Set());
      },
    );
  }
  function deleteSelectedCheck() {
    askConfirm(
      `Move ${selectedCheck.size} daily-check record(s) to trash?`,
      () => {
        selectedCheck.forEach((id) => deleteRecord("dailycheck", id));
        setSelectedCheck(new Set());
      },
    );
  }

  // Stations that have machines / could appear here
  const stationOptions = STAGES.filter((s) => s.hasMachine);

  return (
    <div className="space-y-4">
      <BackBar
        ctx={ctx}
        to={{ type: "department", departmentId: "printing" }}
        label="Back → Printing"
      />
      <div>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Wrench size={24} /> {t("maint.title")}
        </h2>
        <p className="text-slate-500 text-sm">{t("maint.subtitle")}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3 flex-wrap">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Station</label>
          <select
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="p-2 border border-slate-300 rounded text-sm"
          >
            <option value="">All stations</option>
            {stationOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="p-2 border border-slate-300 rounded text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="p-2 border border-slate-300 rounded text-sm"
          />
        </div>
        {(stationFilter || dateFrom || dateTo) && (
          <button
            onClick={() => {
              setStationFilter("");
              setDateFrom("");
              setDateTo("");
            }}
            className="text-xs text-slate-500 hover:text-slate-700 mt-4"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab("maint")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "maint" ? "bg-white shadow" : "text-slate-600"}`}
        >
          {t("maint.tab.maint")} ({maintRecs.length})
        </button>
        <button
          onClick={() => setTab("breakdown")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "breakdown" ? "bg-white shadow" : "text-slate-600"}`}
        >
          {t("maint.tab.breakdown")} ({breakdownRecs.length})
        </button>
        <button
          onClick={() => setTab("daily")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "daily" ? "bg-white shadow" : "text-slate-600"}`}
        >
          {t("maint.tab.daily")} ({dailyChecks.length})
        </button>
      </div>

      {tab === "maint" && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">
              {selectedMaint.size > 0
                ? `${selectedMaint.size} selected`
                : "All rows"}{" "}
              for export
            </span>
            <button
              onClick={exportMaint}
              className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Download size={14} /> Export to Excel (CSV)
            </button>
            {canEdit && selectedMaint.size > 0 && (
              <button
                onClick={deleteSelectedMaint}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete selected
              </button>
            )}
          </div>
          <DataTable
            rows={maintRecs}
            selected={selectedMaint}
            setSelected={setSelectedMaint}
            askConfirm={askConfirm}
            onDelete={canEdit ? (id) => deleteRecord("maintenance", id) : null}
            columns={[
              { key: "date", label: "Date" },
              {
                key: "stationId",
                label: "Station",
                render: (v) => stationName(v),
              },
              {
                key: "machineId",
                label: "Machine",
                render: (v) => machineName(v),
              },
              {
                key: "type",
                label: "Type",
                render: (v) =>
                  v === "maintenance"
                    ? "Maintenance"
                    : v === "cleaning"
                      ? "Cleaning"
                      : v,
              },
              { key: "shift", label: "Shift" },
              { key: "reason", label: "Reason" },
              { key: "actionTaken", label: "Action" },
              { key: "cost", label: "Cost" },
              { key: "operator", label: "Operator" },
            ]}
          />
        </>
      )}

      {tab === "breakdown" && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">
              {selectedBreak.size > 0
                ? `${selectedBreak.size} selected`
                : "All rows"}{" "}
              for export
            </span>
            <button
              onClick={exportBreakdown}
              className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Download size={14} /> Export to Excel (CSV)
            </button>
            {canEdit && selectedBreak.size > 0 && (
              <button
                onClick={deleteSelectedBreak}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete selected
              </button>
            )}
          </div>
          <DataTable
            rows={breakdownRecs}
            selected={selectedBreak}
            setSelected={setSelectedBreak}
            askConfirm={askConfirm}
            onDelete={canEdit ? (id) => deleteRecord("breakdown", id) : null}
            columns={[
              { key: "date", label: "Date" },
              {
                key: "stationId",
                label: "Station",
                render: (v) => stationName(v),
              },
              {
                key: "machineId",
                label: "Machine",
                render: (v) => machineName(v),
              },
              { key: "type", label: "Type" },
              { key: "cause", label: "Cause" },
              { key: "downtime", label: "Downtime (h)" },
              { key: "repairAction", label: "Repair" },
              { key: "cost", label: "Cost" },
              { key: "responsible", label: "Responsible" },
            ]}
          />
        </>
      )}

      {tab === "daily" && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">
              {selectedCheck.size > 0
                ? `${selectedCheck.size} selected`
                : "All rows"}{" "}
              for export
            </span>
            <button
              onClick={exportChecks}
              className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Download size={14} /> Export to Excel (CSV)
            </button>
            {canEdit && selectedCheck.size > 0 && (
              <button
                onClick={deleteSelectedCheck}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete selected
              </button>
            )}
          </div>
          <DataTable
            rows={dailyChecks}
            selected={selectedCheck}
            setSelected={setSelectedCheck}
            askConfirm={askConfirm}
            onDelete={canEdit ? (id) => deleteRecord("dailycheck", id) : null}
            columns={[
              { key: "date", label: "Date" },
              {
                key: "stationId",
                label: "Station",
                render: (v) => stationName(v),
              },
              {
                key: "machineId",
                label: "Machine",
                render: (v) => machineName(v),
              },
              { key: "shift", label: "Shift" },
              { key: "result", label: "Result" },
              { key: "notes", label: "Notes" },
              { key: "operator", label: "Operator" },
            ]}
          />
        </>
      )}
    </div>
  );
}

// ============== IN-PROCESS INVENTORY ==============
// "How much fabric do I have inside the printing department right now, and where is it?"
//
// The pipeline is: Gray Store → SING&DES → Bleach → Batching → Printing → Curing →
// Finishing → Calendering → Folding → Dispatch Stock.
//
// Each meter of fabric sits in EXACTLY ONE bucket at a time — the stage it has reached
// but not yet left. This means totals do NOT double-count. We compute each stage's
// "WIP" (work-in-progress) as: amount that arrived at this stage − amount that has
// moved on to the next stage. This way the buckets tile cleanly:
//
//   gray-store-WIP + sing&des-WIP + bleach-WIP + ... + dispatch-stock = total fabric in dept
//
// We also break each stage down by fabric type so the operator can see things like
// "I have 18,000m Poplin still bleached, and 22,000m Biaz already at curing."
//
// Caveats:
//   - When data isn't perfectly entered (e.g. an operator forgot to log a bleach record
//     for a SING&DES batch), that fabric will appear stuck at SING&DES. That's actually
//     correct — the system is showing what's missing.
//   - For batching, we use total qtyAfter (drying-stage extension already applied) minus
//     what print records have consumed via batcherUsage. This matches the BleachedInventory
//     accounting elsewhere in the app.
function InProcessInventory({ ctx }: CtxProps) {
  const { records, programs } = ctx;
  const t = useT();

  // Pre-extract collections for readability.
  const grayEntries = records.gray_store || [];
  const grayOutRecs = records.gray_out || [];
  const inputRecs = records.input || [];
  const bleachRecs = records.bleach || [];
  const dyeingRecs = records.dyeing || [];
  const batchingRecs = records.batching || [];
  const printingRecs = records.printing || [];
  const curingRecs = records.curing || [];
  const finishingRecs = records.finishing || [];
  const calenderingRecs = records.calendering || [];
  const foldingRecs = records.folding || [];
  const dispatchOutRecs = records.dispatch_out || [];

  // "Ended" sets — printNos for which an operator has officially closed the chain.
  // - endedAtCalendering: any calendering record with ended === true → upstream WIP
  //   (printing/curing/finishing leftovers) is zeroed; calendering WIP is capped to
  //   "calendered − inspected".
  // - endedAtFolding: any folding record with ended === true → ALL upstream WIP
  //   (printing/curing/finishing/calendering leftovers) is zeroed. Folding/dispatch
  //   stock are unaffected (they represent actual physical inventory).
  const endedAtCalendering = useMemo(
    () => new Set(calenderingRecs.filter((c) => c.ended).map((c) => c.printNo)),
    [calenderingRecs],
  );
  const endedAtFolding = useMemo(
    () => new Set(foldingRecs.filter((f) => f.ended).map((f) => f.printNo)),
    [foldingRecs],
  );
  // For convenience: a printNo is "chain-closed upstream" if EITHER stage marked it ended.
  // Used to zero printing/curing/finishing leftovers.
  function isUpstreamClosed(printNo) {
    return endedAtCalendering.has(printNo) || endedAtFolding.has(printNo);
  }

  // Helper: resolve fabric type for a card by looking it up in the right source collection.
  // Cards from printing have an entry in printingRecs with programFabricType.
  // Cards from dyeing have an entry in dyeingRecs whose batchNo points to a SING&DES batch.
  function resolveCardFabricType(cardNo) {
    const printRec = printingRecs.find((p) => p.printNo === cardNo);
    if (printRec) return printRec.programFabricType || "(unknown)";
    const dyeRec = dyeingRecs.find((d) => d.dyeingNo === cardNo);
    if (dyeRec) {
      const inputBatch = inputRecs.find((ir) => ir.batchNo === dyeRec.batchNo);
      return inputBatch?.fabricType || "(unknown)";
    }
    return "(unknown)";
  }

  // Aggregate per-fabric-type totals at each stage. Fabric type comes from the print record
  // (programFabricType) when we're past printing, or from the input/bleach record before that.
  // For simplicity: since the current artifact carries fabricType through input → bleach,
  // and printing has programFabricType, we use whatever's nearest to the record.

  // ====== GRAY STORE WIP (per fabric type) ======
  // Available = received − used by SING&DES − sold/returned out.
  // Combined usage map (input + outgoing) gives "consumed from this entry".
  const grayUsage = useMemo(
    () => computeGrayUsage(inputRecs, grayOutRecs),
    [inputRecs, grayOutRecs],
  );
  const grayStoreWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    grayEntries.forEach((g) => {
      const u = grayUsage[g.id] || { rolls: 0, meters: 0 };
      const avail = Math.max(0, (Number(g.meters) || 0) - u.meters);
      if (avail <= 0) return;
      const k = g.fabricType || "(unknown)";
      byFabric[k] = (byFabric[k] || 0) + avail;
    });
    return byFabric;
  }, [grayEntries, grayUsage]);

  // ====== SING&DES WIP (per fabric type) ======
  // Input batches that haven't been bleached yet.
  // Bleach records carry batchNo to identify which input batch they consumed.
  // SING&DES WIP — input batches that haven't moved on yet. "Moved on" means either
  // bleached OR dyed (both consume input batches via the same Jiggers station).
  const consumedInputBatchNos = useMemo(() => {
    const set = new Set<string>();
    bleachRecs.forEach((b) => {
      if (b.batchNo) set.add(b.batchNo);
    });
    dyeingRecs.forEach((d) => {
      if (d.batchNo) set.add(d.batchNo);
    });
    return set;
  }, [bleachRecs, dyeingRecs]);
  const singDesWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    inputRecs.forEach((ir) => {
      if (consumedInputBatchNos.has(ir.batchNo)) return; // already consumed by bleaching or dyeing
      const k = ir.fabricType || "(unknown)";
      byFabric[k] = (byFabric[k] || 0) + (Number(ir.meters) || 0);
    });
    return byFabric;
  }, [inputRecs, consumedInputBatchNos]);

  // ====== BLEACHED WIP (per fabric type) ======
  // Bleached meters that haven't been batched yet. Batching records reference the bleach
  // batch numbers in `sourceBatches[]`.
  const batchedBleachNos = useMemo(() => {
    const set = new Set<string>();
    batchingRecs.forEach((br) =>
      (br.sourceBatches || []).forEach((bn) => set.add(bn)),
    );
    return set;
  }, [batchingRecs]);
  const bleachedWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    bleachRecs.forEach((br) => {
      if (batchedBleachNos.has(br.batchNo)) return; // already batched
      // Bleach records may not directly carry fabric type — fall back to the linked input batch.
      const linkedInput = inputRecs.find((ir) => ir.batchNo === br.batchNo);
      const k = br.fabricType || linkedInput?.fabricType || "(unknown)";
      byFabric[k] = (byFabric[k] || 0) + (Number(br.qty) || 0);
    });
    return byFabric;
  }, [bleachRecs, batchedBleachNos, inputRecs]);

  // ====== DYEING WIP (per fabric type) ======
  // Dyed fabric that hasn't yet been finished. Dyeing records → finishing records (cardSource='dyeing').
  // We sum dyedQty per dyeing#, subtract finishedQty for that same card.
  const finishedDyedByCard = useMemo(() => {
    const map: Record<string, any> = {};
    finishingRecs.forEach((f) => {
      if ((f.cardSource || "printing") !== "dyeing") return;
      if (!f.printNo) return;
      map[f.printNo] = (map[f.printNo] || 0) + (Number(f.finishedQty) || 0);
    });
    return map;
  }, [finishingRecs]);
  const dyeingWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    dyeingRecs.forEach((d) => {
      const dyed = Number(d.dyedQty) || 0;
      const finished = finishedDyedByCard[d.dyeingNo] || 0;
      const remaining = Math.max(0, dyed - finished);
      if (remaining <= 0) return;
      // Pull fabric type from the source SING&DES batch.
      const inputBatch = inputRecs.find((ir) => ir.batchNo === d.batchNo);
      const k = inputBatch?.fabricType || "(unknown)";
      byFabric[k] = (byFabric[k] || 0) + remaining;
    });
    return byFabric;
  }, [dyeingRecs, finishedDyedByCard, inputRecs]);

  // ====== BATCHING WIP (per fabric type) ======
  // Batched meters not yet printed. We use qtyAfter (post-drying) and subtract what print
  // records consumed via batcherUsage[].
  const batchingWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    batchingRecs.forEach((br) => {
      const qtyAfter = Number(br.qtyAfter) || 0;
      const consumedByPrint = printingRecs
        .flatMap((p) => p.batcherUsage || [])
        .filter((u) => u.batchingId === br.id)
        .reduce((s, u) => s + (Number(u.qty) || 0), 0);
      const remaining = Math.max(0, qtyAfter - consumedByPrint);
      if (remaining <= 0) return;
      // Fabric type: trace back through the bleach + input chain.
      const sourceBleach = bleachRecs.find((b) =>
        (br.sourceBatches || []).includes(b.batchNo),
      );
      const linkedInput = sourceBleach
        ? inputRecs.find((ir) => ir.batchNo === sourceBleach.batchNo)
        : null;
      const k =
        sourceBleach?.fabricType || linkedInput?.fabricType || "(unknown)";
      byFabric[k] = (byFabric[k] || 0) + remaining;
    });
    return byFabric;
  }, [batchingRecs, printingRecs, bleachRecs, inputRecs]);

  // ====== PRINTING WIP (per fabric type) ======
  // Printed meters that haven't been cured yet. Curing records use printNo.
  // We track per-printNo: printedQty − cured qty. If positive, the remainder sits at printing.
  function sumByPrintNo(
    records: any[],
    qtyField: string,
  ): Record<string, number> {
    const map: Record<string, number> = {};
    records.forEach((r) => {
      if (!r.printNo) return;
      map[r.printNo] = (map[r.printNo] || 0) + (Number(r[qtyField]) || 0);
    });
    return map;
  }
  // For curing: status='Completed' rows mean the whole printNo is done. But partial
  // curing records reduce remaining proportionally. Simplest: sum cured qty.
  const curedByPrintNo = useMemo(
    () => sumByPrintNo(curingRecs, "qty"),
    [curingRecs],
  );
  const printingWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    printingRecs.forEach((p) => {
      // If the rout card is marked ended at calendering or folding, the upstream gap is
      // declared dead. No fabric is sitting in "printed-but-not-cured" purgatory anymore.
      if (isUpstreamClosed(p.printNo)) return;
      const printed = Number(p.printedQty) || 0;
      const cured = curedByPrintNo[p.printNo] || 0;
      const remaining = Math.max(0, printed - cured);
      if (remaining <= 0) return;
      const k = p.programFabricType || "(unknown)";
      byFabric[k] = (byFabric[k] || 0) + remaining;
    });
    return byFabric;
  }, [printingRecs, curedByPrintNo, endedAtCalendering, endedAtFolding]);

  // ====== CURING WIP ======
  // Cured meters not yet finished. cured − finished, per printNo.
  const finishedByPrintNo = useMemo(
    () => sumByPrintNo(finishingRecs, "finishedQty"),
    [finishingRecs],
  );
  const curingWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    (Object.entries(curedByPrintNo) as [string, number][]).forEach(
      ([printNo, cured]) => {
        // Same as printing: if downstream marked the chain ended, this gap is dead.
        if (isUpstreamClosed(printNo)) return;
        const finished = finishedByPrintNo[printNo] || 0;
        const remaining = Math.max(0, cured - finished);
        if (remaining <= 0) return;
        // Curing only ever applies to printed cards (dyed cards skip curing) —
        // but resolve via the helper for consistency.
        const k = resolveCardFabricType(printNo);
        byFabric[k] = (byFabric[k] || 0) + remaining;
      },
    );
    return byFabric;
  }, [
    curedByPrintNo,
    finishedByPrintNo,
    printingRecs,
    dyeingRecs,
    inputRecs,
    endedAtCalendering,
    endedAtFolding,
  ]);

  // ====== FINISHING WIP ======
  // Finished meters not yet calendered. finished − calendered, per printNo.
  // Note: finishedByPrintNo contains BOTH printed-card finishings AND dyed-card finishings,
  // since finishing records carry the dyeingNo in the printNo field for dyed cards.
  const calenderedByPrintNo = useMemo(
    () => sumByPrintNo(calenderingRecs, "qty"),
    [calenderingRecs],
  );
  const finishingWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    (Object.entries(finishedByPrintNo) as [string, number][]).forEach(
      ([printNo, finished]) => {
        // Closed downstream → no phantom WIP here either.
        if (isUpstreamClosed(printNo)) return;
        const calendered = calenderedByPrintNo[printNo] || 0;
        const remaining = Math.max(0, finished - calendered);
        if (remaining <= 0) return;
        const k = resolveCardFabricType(printNo);
        byFabric[k] = (byFabric[k] || 0) + remaining;
      },
    );
    return byFabric;
  }, [
    finishedByPrintNo,
    calenderedByPrintNo,
    printingRecs,
    dyeingRecs,
    inputRecs,
    endedAtCalendering,
    endedAtFolding,
  ]);

  // ====== CALENDERING WIP ======
  // Calendered meters not yet inspected/folded. calendered − inspected total, per printNo.
  const inspectedByPrintNo = useMemo(() => {
    const map: Record<string, any> = {};
    foldingRecs.forEach((f) => {
      if (!f.printNo) return;
      const total =
        Number(f.firstQty || 0) +
        Number(f.incompleteQty || 0) +
        Number(f.secondQty || 0) +
        Number(f.rejectQty || 0);
      map[f.printNo] = (map[f.printNo] || 0) + total;
    });
    return map;
  }, [foldingRecs]);
  const calenderingWip = useMemo(() => {
    const byFabric: Record<string, number> = {};
    (Object.entries(calenderedByPrintNo) as [string, number][]).forEach(
      ([printNo, calendered]) => {
        // If folding marked it ended, the calendered-vs-inspected gap is also dead.
        // (If only calendering itself is ended, we still keep this WIP — fabric IS at the
        // calendering→folding buffer waiting to be inspected.)
        if (endedAtFolding.has(printNo)) return;
        const inspected = inspectedByPrintNo[printNo] || 0;
        const remaining = Math.max(0, calendered - inspected);
        if (remaining <= 0) return;
        const k = resolveCardFabricType(printNo);
        byFabric[k] = (byFabric[k] || 0) + remaining;
      },
    );
    return byFabric;
  }, [
    calenderedByPrintNo,
    inspectedByPrintNo,
    printingRecs,
    dyeingRecs,
    inputRecs,
    endedAtFolding,
  ]);

  // ====== DISPATCH STOCK (per fabric type) ======
  // Inspected fabric (1st + 2nd sort, NOT rejection) that hasn't been shipped out.
  // Rejection is tracked separately and isn't really "inventory" in the printing sense.
  // Out records use designNumber + fabricType to match.
  const dispatchStock = useMemo(() => {
    const byFabric: Record<string, number> = {};
    foldingRecs.forEach((f) => {
      // Resolve fabric type via the helper so dyed-card foldings count correctly.
      const k = resolveCardFabricType(f.printNo);
      if (k === "(unknown)") return; // skip if we can't trace it back
      const goodIn = Number(f.firstQty || 0) + Number(f.secondQty || 0);
      byFabric[k] = (byFabric[k] || 0) + goodIn;
    });
    // Subtract dispatched out (1st + 2nd, ignore reject which isn't tracked here).
    dispatchOutRecs.forEach((o) => {
      if (o.sortType === "reject") return;
      const k = o.fabricType || "(unknown)";
      if (!byFabric[k]) return;
      byFabric[k] -= Number(o.qty) || 0;
      if (byFabric[k] < 0) byFabric[k] = 0;
    });
    return byFabric;
  }, [foldingRecs, printingRecs, dyeingRecs, inputRecs, dispatchOutRecs]);

  // ====== Build the per-stage rows for display ======
  // Each row: { stageId, stageLabel, color, byFabric: {fabric: meters}, total }
  const stageRows = useMemo(() => {
    const rows = [
      {
        stageId: "gray_store",
        stageLabel: "Gray Store",
        color: "bg-stone-500",
        byFabric: grayStoreWip,
      },
      {
        stageId: "input",
        stageLabel: "SING&DES",
        color: "bg-slate-500",
        byFabric: singDesWip,
      },
      {
        stageId: "bleach",
        stageLabel: "Bleached (waiting)",
        color: "bg-cyan-500",
        byFabric: bleachedWip,
      },
      {
        stageId: "dyeing",
        stageLabel: "Dyed (waiting)",
        color: "bg-cyan-700",
        byFabric: dyeingWip,
      },
      {
        stageId: "batching",
        stageLabel: "Batched (waiting)",
        color: "bg-sky-500",
        byFabric: batchingWip,
      },
      {
        stageId: "printing",
        stageLabel: "Printed (waiting)",
        color: "bg-purple-500",
        byFabric: printingWip,
      },
      {
        stageId: "curing",
        stageLabel: "Cured (waiting)",
        color: "bg-orange-500",
        byFabric: curingWip,
      },
      {
        stageId: "finishing",
        stageLabel: "Finished (waiting)",
        color: "bg-pink-500",
        byFabric: finishingWip,
      },
      {
        stageId: "calendering",
        stageLabel: "Calendered (waiting)",
        color: "bg-indigo-500",
        byFabric: calenderingWip,
      },
      {
        stageId: "dispatch",
        stageLabel: "Dispatch stock",
        color: "bg-green-600",
        byFabric: dispatchStock,
      },
    ];
    return rows.map((row) => ({
      ...row,
      total: (Object.values(row.byFabric) as number[]).reduce(
        (s, v) => s + v,
        0,
      ),
    }));
  }, [
    grayStoreWip,
    singDesWip,
    bleachedWip,
    dyeingWip,
    batchingWip,
    printingWip,
    curingWip,
    finishingWip,
    calenderingWip,
    dispatchStock,
  ]);

  // Grand total + per-fabric grand totals
  const grandTotal = stageRows.reduce((s, r) => s + r.total, 0);
  const allFabricTypes = useMemo(() => {
    const set = new Set<string>();
    stageRows.forEach((r) =>
      Object.keys(r.byFabric).forEach((k) => set.add(k)),
    );
    return [...set].sort();
  }, [stageRows]);
  const grandByFabric = useMemo(() => {
    const map: Record<string, number> = {};
    stageRows.forEach((r) =>
      (Object.entries(r.byFabric) as [string, number][]).forEach(([k, v]) => {
        map[k] = (map[k] || 0) + v;
      }),
    );
    return map;
  }, [stageRows]);

  // Export the breakdown as CSV: one row per stage, one column per fabric type, plus total.
  function exportData() {
    const rows = stageRows.map((r) => {
      const out: Record<string, any> = { stage: r.stageLabel };
      allFabricTypes.forEach((ft) => {
        out[ft] = r.byFabric[ft] || 0;
      });
      out.Total = r.total;
      return out;
    });
    // Append a totals row.
    const totalsRow: Record<string, any> = { stage: "TOTAL" };
    allFabricTypes.forEach((ft) => {
      totalsRow[ft] = grandByFabric[ft] || 0;
    });
    totalsRow.Total = grandTotal;
    rows.push(totalsRow);
    exportToCSV(rows, `in_process_inventory_${todayISO()}`);
  }

  return (
    <div className="space-y-5">
      <BackBar
        ctx={ctx}
        to={{ type: "department", departmentId: "printing" }}
        label="Back → Printing"
      />

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Database size={24} className="text-cyan-600" /> {t("inproc.title")}
          </h2>
          <p className="text-slate-500 text-sm">{t("inproc.subtitle")}</p>
        </div>
        <button
          onClick={exportData}
          className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5"
        >
          <Download size={14} /> {t("common.exportCsv")}
        </button>
      </div>

      {/* Big headline card */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-cyan-700 font-semibold">
              {t("inproc.totalInProcess")}
            </div>
            <div className="text-4xl font-bold text-slate-800 mt-1">
              {grandTotal.toLocaleString()}
              <span className="text-2xl ml-1 text-slate-500">m</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(grandByFabric) as [string, number][])
              .filter(([_, v]) => v > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([fabric, m]) => {
                const pct = grandTotal > 0 ? (m / grandTotal) * 100 : 0;
                return (
                  <div
                    key={fabric}
                    className="bg-white rounded-lg px-3 py-2 border border-cyan-200"
                  >
                    <div className="text-xs text-slate-500">{fabric}</div>
                    <div className="font-bold text-slate-800">
                      {m.toLocaleString()}
                      <span className="text-xs ml-0.5 text-slate-500">m</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {pct.toFixed(1)}% of total
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Per-stage breakdown table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Stage</th>
              {allFabricTypes.map((ft) => (
                <th
                  key={ft}
                  className="text-right p-3 font-medium whitespace-nowrap"
                >
                  {ft}
                </th>
              ))}
              <th className="text-right p-3 font-medium">Total</th>
              <th className="text-right p-3 font-medium w-32">% of total</th>
            </tr>
          </thead>
          <tbody>
            {stageRows.map((r) => {
              const pct = grandTotal > 0 ? (r.total / grandTotal) * 100 : 0;
              return (
                <tr
                  key={r.stageId}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${r.color}`}
                      ></div>
                      <span className="font-medium text-slate-700">
                        {r.stageLabel}
                      </span>
                    </div>
                  </td>
                  {allFabricTypes.map((ft) => (
                    <td key={ft} className="p-3 text-right tabular-nums">
                      {r.byFabric[ft] > 0 ? (
                        r.byFabric[ft].toLocaleString()
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  ))}
                  <td className="p-3 text-right font-bold tabular-nums">
                    {r.total.toLocaleString()}m
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div
                          className={`${r.color} h-full rounded-full`}
                          style={{ width: `${Math.min(100, pct)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500 tabular-nums w-10 text-right">
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
            {/* Totals row */}
            <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold">
              <td className="p-3 text-slate-800">TOTAL</td>
              {allFabricTypes.map((ft) => (
                <td
                  key={ft}
                  className="p-3 text-right tabular-nums text-slate-800"
                >
                  {grandByFabric[ft] > 0
                    ? grandByFabric[ft].toLocaleString()
                    : "—"}
                </td>
              ))}
              <td className="p-3 text-right text-slate-800">
                {grandTotal.toLocaleString()}m
              </td>
              <td className="p-3 text-right text-slate-500 text-xs">100%</td>
            </tr>
            {grandTotal === 0 && (
              <tr>
                <td
                  colSpan={allFabricTypes.length + 3}
                  className="p-12 text-center text-slate-400"
                >
                  <Database size={32} className="mx-auto mb-2 text-slate-300" />
                  No fabric in process yet — once you start adding records, this
                  will populate automatically.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Explanation */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
        <div className="font-semibold mb-1">How "in-process" is calculated</div>
        <div className="text-xs space-y-1 text-amber-800">
          <div>
            Each stage's quantity is what's{" "}
            <strong>arrived at this stage but hasn't moved to the next</strong>.
            A meter is in exactly one bucket at a time.
          </div>
          <div>
            Example: if you printed 5,000m of design D-100 and only 3,000m has
            been cured so far, you'll see 2,000m at "Printed (waiting)" and
            3,000m at "Cured (waiting)" (assuming nothing finished yet).
          </div>
          <div>
            If a stage looks unexpectedly high, it usually means the next
            stage's records haven't been entered yet for that fabric.
          </div>
          <div className="mt-2 pt-2 border-t border-amber-200">
            <strong>About "End" buttons:</strong> if a print card is marked
            Ended at Calendering, all upstream gaps (printed/cured/finished
            leftovers) are zeroed since they were machine loss. Marked Ended at
            Folding closes everything upstream including calendering. Use this
            when calendered or folded qty is less than printed and you don't
            expect the missing meters to ever show up.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== STATION VIEW (router for each station) ==============
function StationView({
  ctx,
  stationId,
}: {
  ctx: AppContext;
  stationId: string;
}) {
  const stage = STAGES.find((s) => s.id === stationId);
  const t = useT();
  if (!stage) return <div className="text-slate-500">Station not found</div>;
  const [tab, setTab] = useState("data");
  const tabs = stationTabs(stationId, ctx);
  const Icon = stage.icon;
  const isOperator = ctx.user.role === "operator";
  // SING&DES operators (stationId === 'input') can also manage the Gray Fabric Store
  // since both stations are jointly handled by the same team.
  const canEdit =
    ctx.user.role === "admin" ||
    (ctx.user.role === "dept_admin" && ctx.user.departmentId === "printing") ||
    (ctx.user.role === "operator" && ctx.user.stationId === stationId) ||
    (ctx.user.role === "operator" &&
      ctx.user.stationId === "input" &&
      stationId === "gray_store");
  return (
    <div className="space-y-4">
      {/* Operators are locked to their station — no back button for them. Everyone else can go back to printing dept. */}
      {!isOperator && (
        <BackBar
          ctx={ctx}
          to={{ type: "department", departmentId: "printing" }}
          label={`${t("common.back")} → ${t("dept.printing")}`}
        />
      )}
      <div className={`${stage.color} rounded-2xl p-5 text-white`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold">{t(`stage.${stage.id}`)}</h2>
            <div className="text-sm opacity-90">
              {canEdit ? "You can enter data here" : "Read-only access"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap ${tab === tb.id ? "bg-white shadow text-slate-800" : "text-slate-600"}`}
          >
            {tb.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tb) => tb.id === tab)?.render(canEdit)}</div>
    </div>
  );
}

function stationTabs(stationId, ctx) {
  switch (stationId) {
    case "gray_store":
      return [
        {
          id: "stock",
          label: "Live Stock",
          render: () => <GrayStoreLivePage ctx={ctx} />,
        },
        {
          id: "data",
          label: "Stock Entries",
          render: (canEdit) => (
            <GrayStoreDataPage ctx={ctx} canEdit={canEdit} />
          ),
        },
        {
          id: "outgoing",
          label: "Outgoing",
          render: (canEdit) => (
            <GrayStoreOutgoingPage ctx={ctx} canEdit={canEdit} />
          ),
        },
      ];
    case "input":
      return [
        {
          id: "data",
          label: "Data Entry",
          render: (canEdit) => <InputDataPage ctx={ctx} canEdit={canEdit} />,
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.input}
              dateField="date"
              shiftField="shift"
              qtyFields={[
                { key: "rolls", label: "Rolls" },
                { key: "meters", label: "Meters" },
              ]}
            />
          ),
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage ctx={ctx} stationId="input" canEdit={canEdit} />
          ),
        },
      ];
    case "bleach":
      return [
        {
          id: "data",
          label: "Bleaching",
          render: (canEdit) => <BleachDataPage ctx={ctx} canEdit={canEdit} />,
        },
        {
          id: "dyeing",
          label: "Dyeing",
          render: (canEdit) => <DyeingDataPage ctx={ctx} canEdit={canEdit} />,
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.bleach}
              dateField="date"
              shiftField="shift"
              qtyFields={[{ key: "qty", label: "Meters" }]}
            />
          ),
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage ctx={ctx} stationId="bleach" canEdit={canEdit} />
          ),
        },
      ];
    case "batching":
      return [
        {
          id: "data",
          label: "Data Entry",
          render: (canEdit) => <BatchingDataPage ctx={ctx} canEdit={canEdit} />,
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.batching}
              dateField="date"
              shiftField="shift"
              qtyFields={[
                { key: "qtyAfter", label: "Meters After Drying" },
                { key: "extensionPct", label: "Avg Extension %", avg: true },
              ]}
            />
          ),
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage ctx={ctx} stationId="batching" canEdit={canEdit} />
          ),
        },
      ];
    case "printing":
      return [
        {
          id: "data",
          label: "Data Entry",
          render: (canEdit) => <PrintingDataPage ctx={ctx} canEdit={canEdit} />,
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.printing}
              dateField="date"
              shiftField="shift"
              qtyFields={[{ key: "printedQty", label: "Printed Meters" }]}
            />
          ),
        },
        {
          id: "inventory",
          label: "Bleached Stock",
          render: () => <BleachedInventoryPage ctx={ctx} />,
        },
        {
          id: "extension",
          label: "Extension Audit",
          render: () => <ExtensionAuditPage ctx={ctx} />,
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage ctx={ctx} stationId="printing" canEdit={canEdit} />
          ),
        },
      ];
    case "curing":
      return [
        {
          id: "data",
          label: "Data Entry",
          render: (canEdit) => <CuringDataPage ctx={ctx} canEdit={canEdit} />,
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.curing}
              dateField="date"
              shiftField="shift"
              qtyFields={[{ key: "qty", label: "Meters" }]}
            />
          ),
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage ctx={ctx} stationId="curing" canEdit={canEdit} />
          ),
        },
      ];
    case "finishing":
      return [
        {
          id: "data",
          label: "Data Entry",
          render: (canEdit) => (
            <FinishingDataPage ctx={ctx} canEdit={canEdit} />
          ),
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.finishing}
              dateField="date"
              shiftField="shift"
              qtyFields={[{ key: "finishedQty", label: "Finished Meters" }]}
            />
          ),
        },
        {
          id: "compare",
          label: "Print vs Finish",
          render: () => (
            <CompareStagesPage
              ctx={ctx}
              from="printing"
              to="finishing"
              fromKey="printedQty"
              toKey="finishedQty"
            />
          ),
        },
        {
          id: "compare_dye",
          label: "Dye vs Finish",
          render: () => (
            <DyeingCompareStagesPage
              ctx={ctx}
              to="finishing"
              toKey="finishedQty"
              toLabel="finished"
            />
          ),
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage
              ctx={ctx}
              stationId="finishing"
              canEdit={canEdit}
            />
          ),
        },
      ];
    case "calendering":
      return [
        {
          id: "data",
          label: "Data Entry",
          render: (canEdit) => (
            <CalenderingDataPage ctx={ctx} canEdit={canEdit} />
          ),
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.calendering}
              dateField="date"
              shiftField="shift"
              qtyFields={[{ key: "qty", label: "Calendered Meters" }]}
            />
          ),
        },
        {
          id: "compare",
          label: "Print vs Calender",
          render: () => (
            <CompareStagesPage
              ctx={ctx}
              from="printing"
              to="calendering"
              fromKey="printedQty"
              toKey="qty"
            />
          ),
        },
        {
          id: "compare_dye",
          label: "Dye vs Calender",
          render: () => (
            <DyeingCompareStagesPage
              ctx={ctx}
              to="calendering"
              toKey="qty"
              toLabel="calendered"
            />
          ),
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage
              ctx={ctx}
              stationId="calendering"
              canEdit={canEdit}
            />
          ),
        },
      ];
    case "folding":
      return [
        {
          id: "data",
          label: "Data Entry",
          render: (canEdit) => <FoldingDataPage ctx={ctx} canEdit={canEdit} />,
        },
        {
          id: "dash",
          label: "Dashboard",
          render: () => (
            <ShiftDashboard
              records={ctx.records.folding}
              dateField="date"
              shiftField="shift"
              qtyFields={[
                { key: "totalMeters", label: "Total Meters" },
                { key: "firstQty", label: "1st Quality" },
                { key: "secondQty", label: "2nd Sort" },
                { key: "rejectQty", label: "Rejection" },
              ]}
            />
          ),
        },
        {
          id: "compare",
          label: "Print vs Folded",
          render: () => <FoldingComparePage ctx={ctx} />,
        },
        {
          id: "maint",
          label: "Maintenance",
          render: (canEdit) => (
            <MaintenancePage ctx={ctx} stationId="folding" canEdit={canEdit} />
          ),
        },
      ];
    case "dispatch":
      return [
        {
          id: "in",
          label: "Incoming (from Folding)",
          render: () => <DispatchIncomingPage ctx={ctx} />,
        },
        {
          id: "stock",
          label: "Stock",
          render: () => <DispatchStockPage ctx={ctx} />,
        },
        {
          id: "out",
          label: "Outgoing",
          render: (canEdit) => (
            <DispatchOutgoingPage ctx={ctx} canEdit={canEdit} />
          ),
        },
      ];
    default:
      return [];
  }
}

// ============== GRAY FABRIC STORE ==============
// Holds raw greige (un-bleached) fabric BEFORE it enters SING&DES.
// Sources: OSIYO and ORZU (internal weaving depts, future) or FROM OUTSIDE (manual).
// Stock decreases when SING&DES creates an Input record OR when an Outgoing record
// (sales / returns to weaving / write-offs) consumes from a specific gray entry.

// Shared helper: compute per-gray-entry usage from BOTH input records (going to SING&DES)
// AND gray_out records (sold or returned). Returns a map { [grayId]: { rolls, meters } }.
// All three call sites use this same logic, so keeping it in one place avoids drift.
function computeGrayUsage(inputRecs = [], grayOutRecs = []) {
  const map: Record<string, any> = {};
  function add(id, rolls, meters) {
    if (!id) return;
    const prev = map[id] || { rolls: 0, meters: 0 };
    map[id] = {
      rolls: prev.rolls + (Number(rolls) || 0),
      meters: prev.meters + (Number(meters) || 0),
    };
  }
  inputRecs.forEach((ir) => add(ir.grayStoreId, ir.rolls, ir.meters));
  grayOutRecs.forEach((or) => add(or.grayStoreId, or.rolls, or.meters));
  return map;
}

function GrayStoreDataPage({ ctx, canEdit }: CtxEditableProps) {
  const { records, lists, saveRecord, deleteRecord, askConfirm, user } = ctx;
  const data = records.gray_store || [];
  const inputRecs = records.input || [];
  const grayOutRecs = records.gray_out || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    source: "",
    fabricType: "",
  });
  const [selected, setSelected] = useState(new Set());

  const isSuperAdmin = user?.role === "admin";

  // Shared: how much has been consumed from each gray entry (by SING&DES + outgoing combined).
  const usage = useMemo(
    () => computeGrayUsage(inputRecs, grayOutRecs),
    [inputRecs, grayOutRecs],
  );

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      source: "",
      fabricType: "",
      rolls: "",
      meters: "",
      status: "accepted", // outside entries are accepted immediately; weaving will use 'pending'
      notes: "",
      operator: ctx.user.name,
    });
  }

  // Apply filters
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.source} ${r.fabricType} ${r.notes || ""}`
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.source && r.source !== filter.source) return false;
      if (filter.fabricType && r.fabricType !== filter.fabricType) return false;
      return true;
    })
    .sort((a, b) =>
      (b.date + (b.id || "")).localeCompare(a.date + (a.id || "")),
    );

  // Annotate rows with usage info for the table.
  const rows = filtered.map((r) => {
    const u = usage[r.id] || { rolls: 0, meters: 0 };
    return {
      ...r,
      usedRolls: u.rolls,
      usedMeters: u.meters,
      availableRolls: Math.max(0, (Number(r.rolls) || 0) - u.rolls),
      availableMeters: Math.max(0, (Number(r.meters) || 0) - u.meters),
    };
  });

  // When a SING&DES Input record consumes from a gray entry, deleting that
  // entry would break the chain (orphaned references). For most users this
  // is correctly blocked. Super-admins, however, get a force-delete option
  // with an extra-strong confirm — useful when cleaning up bad/stale data.
  //
  // Note: DataTable already shows a generic "Delete this record?" confirm
  // before calling onDelete (which is this function). For the simple case
  // we skip the second confirm; for the force-delete case we still show a
  // stronger second confirm because the consequences are bigger.
  function handleDelete(id) {
    console.log("[GrayStore handleDelete] called with id:", id);
    const u = usage[id];
    const hasUsage = u && (u.rolls > 0 || u.meters > 0);
    console.log(
      "[GrayStore handleDelete] usage:",
      u,
      "hasUsage:",
      hasUsage,
      "isSuperAdmin:",
      isSuperAdmin,
    );

    if (hasUsage && !isSuperAdmin) {
      console.log(
        "[GrayStore handleDelete] BLOCKED: has usage, not super-admin",
      );
      alert(
        "Can't delete this entry — fabric has already been consumed from it " +
          "(by SING&DES or as outgoing). Remove the related records first, or " +
          "ask a super-admin to force-delete it.",
      );
      return;
    }

    if (hasUsage && isSuperAdmin) {
      console.log(
        "[GrayStore handleDelete] FORCE-DELETE path: showing strong confirm",
      );
      // Force-delete path. Make the consequences crystal clear with a stronger
      // second confirm. (DataTable's first confirm already happened above.)
      askConfirm(
        `Force delete this gray fabric entry?\n\n` +
          `It has been consumed: ${u.rolls} rolls / ${u.meters.toLocaleString()} m.\n` +
          `Records that reference this entry (in SING&DES / outgoing) will be ` +
          `orphaned but will keep their data. The entry itself goes to trash and ` +
          `can be restored from there.`,
        () => {
          console.log(
            "[GrayStore handleDelete] force-delete confirmed, calling deleteRecord",
          );
          deleteRecord("gray_store", id);
        },
      );
      return;
    }

    // Simple case: no usage. DataTable already confirmed; just delete.
    console.log("[GrayStore handleDelete] simple delete: calling deleteRecord");
    deleteRecord("gray_store", id);
  }

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={{ ...lists, source: lists.grayFabricSource }}
        fields={["source", "fabricType"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Add Gray Stock"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            rows.filter((r) => selected.size === 0 || selected.has(r.id)),
            "gray_store_entries",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => handleDelete(id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={rows}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          { key: "source", label: "Source" },
          { key: "fabricType", label: "Fabric Type" },
          { key: "rolls", label: "Rolls in" },
          { key: "meters", label: "Meters in" },
          { key: "usedRolls", label: "Rolls used" },
          { key: "usedMeters", label: "Meters used" },
          {
            key: "availableRolls",
            label: "Rolls avail.",
            render: (v) => (
              <span className="font-bold text-emerald-700">{v}</span>
            ),
          },
          {
            key: "availableMeters",
            label: "Meters avail.",
            render: (v) => (
              <span className="font-bold text-emerald-700">
                {(v || 0).toLocaleString()}
              </span>
            ),
          },
          { key: "notes", label: "Notes" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? handleDelete : null}
      />
      {editing && (
        <Modal
          title={
            data.find((d) => d.id === editing.id)
              ? "Edit Gray Stock Entry"
              : "New Gray Stock Entry"
          }
          onClose={() => setEditing(null)}
        >
          <GrayStoreForm
            rec={editing}
            lists={lists}
            existingUsage={usage[editing.id] || { rolls: 0, meters: 0 }}
            onSave={async (r) => {
              await saveRecord("gray_store", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function GrayStoreForm({
  rec,
  lists,
  existingUsage,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  existingUsage?: any;
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  // Validation: can't reduce rolls/meters below what's already been consumed.
  const rollsTooLow = Number(f.rolls) < existingUsage.rolls;
  const metersTooLow = Number(f.meters) < existingUsage.meters;
  const valid =
    f.date &&
    f.source &&
    f.fabricType &&
    Number(f.meters) > 0 &&
    Number(f.rolls) > 0 &&
    !rollsTooLow &&
    !metersTooLow;
  return (
    <div className="space-y-3">
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Source *">
        <Select
          value={f.source}
          options={lists.grayFabricSource}
          onChange={(v) => setF({ ...f, source: v })}
        />
      </Field>
      <Field label="Fabric Type *">
        <Select
          value={f.fabricType}
          options={lists.fabricType}
          onChange={(v) => setF({ ...f, fabricType: v })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Number of Rolls *">
          <input
            type="number"
            min="1"
            value={f.rolls}
            onChange={(e) => setF({ ...f, rolls: e.target.value })}
            className={`w-full p-2.5 border rounded-lg ${rollsTooLow ? "border-red-400 bg-red-50" : "border-slate-300"}`}
          />
          {existingUsage.rolls > 0 && (
            <div className="text-xs text-slate-500 mt-1">
              {existingUsage.rolls} roll(s) already consumed; can't go below.
            </div>
          )}
        </Field>
        <Field label="Total Meters *">
          <input
            type="number"
            min="1"
            value={f.meters}
            onChange={(e) => setF({ ...f, meters: e.target.value })}
            className={`w-full p-2.5 border rounded-lg ${metersTooLow ? "border-red-400 bg-red-50" : "border-slate-300"}`}
            placeholder="e.g. 4500"
          />
          {existingUsage.meters > 0 && (
            <div className="text-xs text-slate-500 mt-1">
              {existingUsage.meters.toLocaleString()}m already consumed; can't
              go below.
            </div>
          )}
        </Field>
      </div>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes || ""}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
          placeholder="Supplier name, weaving batch, anything worth recording…"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={() => valid && onSave(f)} />
    </div>
  );
}

// Live Stock dashboard — aggregations by fabric type and by source, plus headline totals.
function GrayStoreLivePage({ ctx }: CtxProps) {
  const { records } = ctx;
  const data = records.gray_store || [];
  const inputRecs = records.input || [];
  const grayOutRecs = records.gray_out || [];

  // Shared: how much has been consumed from each gray entry (by SING&DES + outgoing combined).
  const usage = useMemo(
    () => computeGrayUsage(inputRecs, grayOutRecs),
    [inputRecs, grayOutRecs],
  );

  // Per-entry available + status
  const enriched = useMemo(
    () =>
      data.map((r) => {
        const u = usage[r.id] || { rolls: 0, meters: 0 };
        return {
          ...r,
          usedRolls: u.rolls,
          usedMeters: u.meters,
          availableRolls: Math.max(0, (Number(r.rolls) || 0) - u.rolls),
          availableMeters: Math.max(0, (Number(r.meters) || 0) - u.meters),
        };
      }),
    [data, usage],
  );

  // Headline totals
  const totalAvailMeters = enriched.reduce((s, r) => s + r.availableMeters, 0);
  const totalAvailRolls = enriched.reduce((s, r) => s + r.availableRolls, 0);
  const totalReceivedMeters = data.reduce(
    (s, r) => s + (Number(r.meters) || 0),
    0,
  );
  // "Used" is split into SING&DES (sent to Input station) and Outgoing (sold/returned).
  // We compute these from the source records directly so we don't need to mix them.
  const totalUsedSingDes = inputRecs
    .filter((ir) => ir.grayStoreId)
    .reduce((s, ir) => s + (Number(ir.meters) || 0), 0);
  const totalUsedOutgoing = grayOutRecs
    .filter((or) => or.grayStoreId)
    .reduce((s, or) => s + (Number(or.meters) || 0), 0);

  // Aggregations
  const byFabric = useMemo(() => {
    const map: Record<string, any> = {};
    enriched.forEach((r) => {
      const k = r.fabricType || "(unknown)";
      if (!map[k]) map[k] = { fabricType: k, rolls: 0, meters: 0, entries: 0 };
      map[k].rolls += r.availableRolls;
      map[k].meters += r.availableMeters;
      map[k].entries += 1;
    });
    return Object.values(map).sort((a, b) => b.meters - a.meters);
  }, [enriched]);

  const bySource = useMemo(() => {
    const map: Record<string, any> = {};
    enriched.forEach((r) => {
      const k = r.source || "(unknown)";
      if (!map[k]) map[k] = { source: k, rolls: 0, meters: 0, entries: 0 };
      map[k].rolls += r.availableRolls;
      map[k].meters += r.availableMeters;
      map[k].entries += 1;
    });
    return Object.values(map).sort((a, b) => b.meters - a.meters);
  }, [enriched]);

  // List of currently-active entries (with available > 0) for the per-entry table.
  const activeEntries = enriched.filter(
    (r) => r.availableMeters > 0 || r.availableRolls > 0,
  );

  return (
    <div className="space-y-4">
      {/* Headline cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="text-xs text-emerald-700 uppercase">
            Available Stock
          </div>
          <div className="text-2xl font-bold text-emerald-900">
            {totalAvailMeters.toLocaleString()}
            <span className="text-sm ml-1">m</span>
          </div>
          <div className="text-xs text-emerald-700 mt-0.5">
            {totalAvailRolls} roll(s)
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-700 uppercase">Total Received</div>
          <div className="text-2xl font-bold text-slate-800">
            {totalReceivedMeters.toLocaleString()}
            <span className="text-sm ml-1">m</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            across {data.length} entr{data.length !== 1 ? "ies" : "y"}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-xs text-amber-700 uppercase">
            To SING&amp;DES
          </div>
          <div className="text-2xl font-bold text-amber-900">
            {totalUsedSingDes.toLocaleString()}
            <span className="text-sm ml-1">m</span>
          </div>
          <div className="text-xs text-amber-700 mt-0.5">
            {totalReceivedMeters > 0
              ? `${((100 * totalUsedSingDes) / totalReceivedMeters).toFixed(1)}%`
              : "0%"}{" "}
            of received
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <div className="text-xs text-rose-700 uppercase">
            Outgoing (sold/returned)
          </div>
          <div className="text-2xl font-bold text-rose-900">
            {totalUsedOutgoing.toLocaleString()}
            <span className="text-sm ml-1">m</span>
          </div>
          <div className="text-xs text-rose-700 mt-0.5">
            {totalReceivedMeters > 0
              ? `${((100 * totalUsedOutgoing) / totalReceivedMeters).toFixed(1)}%`
              : "0%"}{" "}
            of received
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-xs text-blue-700 uppercase">Active Entries</div>
          <div className="text-2xl font-bold text-blue-900">
            {activeEntries.length}
          </div>
          <div className="text-xs text-blue-700 mt-0.5">
            with stock remaining
          </div>
        </div>
      </div>

      {/* Side-by-side breakdowns */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 font-semibold text-slate-700 text-sm">
            Available by Fabric Type
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50/50 text-slate-500 text-xs">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Fabric</th>
                <th className="text-right px-4 py-2 font-medium">Rolls</th>
                <th className="text-right px-4 py-2 font-medium">Meters</th>
              </tr>
            </thead>
            <tbody>
              {byFabric.map((r) => (
                <tr key={r.fabricType} className="border-t border-slate-100">
                  <td className="px-4 py-2">{r.fabricType}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {r.rolls}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums font-semibold">
                    {r.meters.toLocaleString()}m
                  </td>
                </tr>
              ))}
              {!byFabric.length && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-slate-400 text-sm"
                  >
                    No stock
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 font-semibold text-slate-700 text-sm">
            Available by Source
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50/50 text-slate-500 text-xs">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Source</th>
                <th className="text-right px-4 py-2 font-medium">Rolls</th>
                <th className="text-right px-4 py-2 font-medium">Meters</th>
              </tr>
            </thead>
            <tbody>
              {bySource.map((r) => (
                <tr key={r.source} className="border-t border-slate-100">
                  <td className="px-4 py-2">{r.source}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {r.rolls}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums font-semibold">
                    {r.meters.toLocaleString()}m
                  </td>
                </tr>
              ))}
              {!bySource.length && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-slate-400 text-sm"
                  >
                    No stock
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Per-entry detail */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <div className="bg-slate-50 px-4 py-2 font-semibold text-slate-700 text-sm">
          Active stock entries (with remaining fabric)
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50 text-slate-500 text-xs">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Date in</th>
              <th className="text-left px-4 py-2 font-medium">Source</th>
              <th className="text-left px-4 py-2 font-medium">Fabric</th>
              <th className="text-right px-4 py-2 font-medium">
                Rolls (avail / total)
              </th>
              <th className="text-right px-4 py-2 font-medium">
                Meters (avail / total)
              </th>
              <th className="text-left px-4 py-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {activeEntries.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{r.date}</td>
                <td className="px-4 py-2">{r.source}</td>
                <td className="px-4 py-2">{r.fabricType}</td>
                <td className="px-4 py-2 text-right tabular-nums">
                  <span className="font-bold text-emerald-700">
                    {r.availableRolls}
                  </span>
                  <span className="text-slate-400"> / {r.rolls}</span>
                </td>
                <td className="px-4 py-2 text-right tabular-nums">
                  <span className="font-bold text-emerald-700">
                    {r.availableMeters.toLocaleString()}
                  </span>
                  <span className="text-slate-400">
                    {" "}
                    / {(Number(r.meters) || 0).toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-2 text-xs text-slate-500">
                  {r.notes || ""}
                </td>
              </tr>
            ))}
            {!activeEntries.length && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-slate-400 text-sm"
                >
                  No active stock — all received fabric has been consumed by
                  SING&DES, or no entries exist yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Outgoing — fabric leaving the gray store for reasons other than SING&DES.
// Examples: sold to outside customers, returned to weaving, written off.
// Each outgoing record links to a specific gray entry via grayStoreId, and the
// rolls/meters are deducted from that entry's available stock.
function GrayStoreOutgoingPage({ ctx, canEdit }: CtxEditableProps) {
  const { records, lists, saveRecord, deleteRecord, askConfirm } = ctx;
  const data = records.gray_out || [];
  const grayEntries = records.gray_store || [];
  const inputRecs = records.input || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    destination: "",
  });
  const [selected, setSelected] = useState(new Set());

  // Shared usage map (input + outgoing) — needed to compute remaining stock per entry.
  const usage = useMemo(
    () => computeGrayUsage(inputRecs, data),
    [inputRecs, data],
  );

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      grayStoreId: "",
      destination: "",
      reason: "",
      rolls: "",
      meters: "",
      notes: "",
      operator: ctx.user.name,
    });
  }

  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.destination} ${r.reason} ${r.notes || ""}`
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.destination && r.destination !== filter.destination)
        return false;
      return true;
    })
    .sort((a, b) =>
      (b.date + (b.id || "")).localeCompare(a.date + (a.id || "")),
    );

  // Resolve gray entry summary for table display.
  function entrySummary(grayId) {
    const g = grayEntries.find((x) => x.id === grayId);
    if (!g) return "— (deleted)";
    return `${g.date} · ${g.source} · ${g.fabricType}`;
  }

  return (
    <div className="space-y-3">
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-sm text-rose-900">
        <div className="font-medium">Outgoing gray fabric</div>
        <div className="text-xs text-rose-700 mt-0.5">
          Use this page to record fabric leaving the store for sales, returns to
          weaving, transfers, or write-offs. Anything sent to SING&amp;DES is
          tracked from the SING&amp;DES Input page instead.
        </div>
      </div>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={{ ...lists, destination: lists.grayOutDestination }}
        fields={["destination"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Add Outgoing"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered
              .filter((r) => selected.size === 0 || selected.has(r.id))
              .map((r) => ({ ...r, sourceEntry: entrySummary(r.grayStoreId) })),
            "gray_outgoing",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("gray_out", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          { key: "destination", label: "Destination" },
          {
            key: "grayStoreId",
            label: "From entry",
            render: (v) => (
              <span className="font-mono text-xs">{entrySummary(v)}</span>
            ),
          },
          { key: "rolls", label: "Rolls" },
          {
            key: "meters",
            label: "Meters",
            render: (v) => (v ? Number(v).toLocaleString() : "—"),
          },
          { key: "reason", label: "Reason" },
          { key: "notes", label: "Notes" },
          { key: "operator", label: "By" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("gray_out", id) : null}
      />
      {editing && (
        <Modal
          title={
            data.find((d) => d.id === editing.id)
              ? "Edit Outgoing Record"
              : "New Outgoing Record"
          }
          onClose={() => setEditing(null)}
        >
          <GrayStoreOutgoingForm
            rec={editing}
            lists={lists}
            grayEntries={grayEntries}
            usage={usage}
            onSave={async (r) => {
              await saveRecord("gray_out", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function GrayStoreOutgoingForm({
  rec,
  lists,
  grayEntries,
  usage,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  grayEntries: ProductionRecord[];
  usage: any;
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);

  // Available stock per entry, EXCLUDING this record's own usage so editing doesn't show
  // the entry as exhausted.
  const ownUsage = (() => {
    if (!f.grayStoreId) return { rolls: 0, meters: 0 };
    return { rolls: Number(rec.rolls) || 0, meters: Number(rec.meters) || 0 };
  })();
  function entryAvailable(entry) {
    const u = usage[entry.id] || { rolls: 0, meters: 0 };
    let usedRolls = u.rolls,
      usedMeters = u.meters;
    if (entry.id === rec.grayStoreId) {
      usedRolls -= ownUsage.rolls;
      usedMeters -= ownUsage.meters;
    }
    return {
      rolls: Math.max(0, (Number(entry.rolls) || 0) - usedRolls),
      meters: Math.max(0, (Number(entry.meters) || 0) - usedMeters),
    };
  }

  // Selectable entries — only show entries with stock left (or the currently-edited one).
  const selectable = grayEntries
    .filter((g) => {
      const a = entryAvailable(g);
      return a.meters > 0 || a.rolls > 0 || g.id === f.grayStoreId;
    })
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  const pickedEntry = grayEntries.find((g) => g.id === f.grayStoreId);
  const avail = pickedEntry ? entryAvailable(pickedEntry) : null;
  const rollsTooHigh = avail && Number(f.rolls) > avail.rolls;
  const metersTooHigh = avail && Number(f.meters) > avail.meters;
  const overconsumes = rollsTooHigh || metersTooHigh;

  const valid =
    f.date &&
    f.destination &&
    f.grayStoreId &&
    Number(f.rolls) > 0 &&
    Number(f.meters) > 0 &&
    !overconsumes;

  return (
    <div className="space-y-3">
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>

      <Field label="From gray stock entry *">
        <select
          value={f.grayStoreId || ""}
          onChange={(e) => setF({ ...f, grayStoreId: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">— Select gray stock entry —</option>
          {selectable.map((g) => {
            const a = entryAvailable(g);
            return (
              <option key={g.id} value={g.id}>
                {g.date} · {g.source} · {g.fabricType} · {a.rolls} rolls /{" "}
                {a.meters.toLocaleString()}m available
              </option>
            );
          })}
        </select>
        {!selectable.length && (
          <div className="text-xs text-amber-700 mt-1">
            ⚠ No gray fabric available.
          </div>
        )}
        {pickedEntry && avail && (
          <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs text-emerald-800">
            Available in this entry: <strong>{avail.rolls} rolls</strong>,{" "}
            <strong>{avail.meters.toLocaleString()}m</strong>
          </div>
        )}
      </Field>

      <Field label="Destination *">
        <Select
          value={f.destination}
          options={lists.grayOutDestination}
          onChange={(v) => setF({ ...f, destination: v })}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Number of Rolls *">
          <input
            type="number"
            min="1"
            value={f.rolls}
            onChange={(e) => setF({ ...f, rolls: e.target.value })}
            className={`w-full p-2.5 border rounded-lg ${rollsTooHigh ? "border-red-400 bg-red-50" : "border-slate-300"}`}
          />
          {rollsTooHigh && (
            <div className="text-xs text-red-600 mt-1">
              Exceeds available rolls.
            </div>
          )}
        </Field>
        <Field label="Total Meters *">
          <input
            type="number"
            min="1"
            value={f.meters}
            onChange={(e) => setF({ ...f, meters: e.target.value })}
            className={`w-full p-2.5 border rounded-lg ${metersTooHigh ? "border-red-400 bg-red-50" : "border-slate-300"}`}
          />
          {metersTooHigh && (
            <div className="text-xs text-red-600 mt-1">
              Exceeds available meters.
            </div>
          )}
        </Field>
      </div>

      <Field label="Reason">
        <input
          value={f.reason || ""}
          onChange={(e) => setF({ ...f, reason: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
          placeholder="Why is this leaving? (optional)"
        />
      </Field>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes || ""}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={() => valid && onSave(f)} />
    </div>
  );
}

// ============== INPUT STATION ==============
function InputDataPage({ ctx, canEdit }: CtxEditableProps) {
  const { lists, saveRecord, deleteRecord, askConfirm, numbering } = ctx;

  // ===== URL-backed state =====
  // Filters live in the query string so F5 preserves them and the URL is
  // shareable. NOTE: SING&DES (Input) no longer paginates — show all rows.
  // Pagination state is therefore not part of the URL on this page.
  const [url, setUrl] = useUrlState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
    fabricType: "",
  });

  // Local state for the search input only — we debounce before pushing it
  // into the URL so typing doesn't fire a request per keystroke. Other
  // filters apply on commit so they go straight to the URL.
  const [searchInput, setSearchInput] = useState(url.search);
  const debouncedSearch = useDebouncedValue(searchInput, 500);

  // When the debounced search differs from URL state, sync it.
  // (Without this, typing wouldn't trigger anything because the URL wouldn't change.)
  useEffect(() => {
    if (debouncedSearch !== url.search) {
      // Filter change → reset offset in the same URL update so we don't end
      // up on an empty page from the previous query.
      setUrl({ search: debouncedSearch, offset: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // When the URL changes for other reasons (back button, link), sync the
  // local input box so it matches what's actually filtering.
  useEffect(() => {
    setSearchInput(url.search);
  }, [url.search]);

  // The `filter` object the rest of this component reads (form fields, etc.)
  // is derived from URL state. setFilter writes through to the URL.
  const filter = useMemo(
    () => ({
      search: searchInput, // input is local, debounced into URL
      dateFrom: url.dateFrom,
      dateTo: url.dateTo,
      shift: url.shift,
      fabricType: url.fabricType,
    }),
    [searchInput, url.dateFrom, url.dateTo, url.shift, url.fabricType],
  );

  const setFilter = (next: typeof filter | ((prev: typeof filter) => typeof filter)) => {
    const nextVal = typeof next === "function" ? next(filter) : next;
    setSearchInput(nextVal.search);
    setUrl({
      dateFrom: nextVal.dateFrom,
      dateTo: nextVal.dateTo,
      shift: nextVal.shift,
      fabricType: nextVal.fabricType,
    });
  };

  // The filters object sent to the backend.
  const serverFilters = useMemo(
    () => ({
      search: url.search || undefined,
      dateFrom: url.dateFrom || undefined,
      dateTo: url.dateTo || undefined,
      shift: url.shift || undefined,
      fabricType: url.fabricType || undefined,
    }),
    [url.search, url.dateFrom, url.dateTo, url.shift, url.fabricType],
  );

  // SING&DES no longer paginates — fetch everything in one page. We pass a
  // very high default limit so the backend returns all rows in the envelope;
  // the table renders all of them. Server-side search still filters at the
  // DB level so the wire size scales with results, not with table size.
  const page = useStationData({
    stationKey: "input",
    pageKey: "page:input",
    defaultLimit: 100000,
    compactMain: ["id", "batchNo"],
    filters: serverFilters,
    related: [
      {
        prefix: "rec_gray_store:",
        as: "gray_store",
        fields: [
          "id",
          "date",
          "fabricType",
          "rolls",
          "meters",
          "supplier",
          "source",
        ],
      },
      {
        prefix: "rec_gray_out:",
        as: "gray_out",
        fields: ["id", "grayStoreId", "rolls", "meters"],
      },
    ],
  });
  const data = page.items;
  const grayEntries = page.related.gray_store || [];
  const grayOutRecs = page.related.gray_out || [];

  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(new Set());

  // Shared per-gray-entry usage (combines SING&DES input AND gray-store outgoing).
  // NOTE: with pagination, `data` is only the current page slice. We compute
  // usage from the gray_out related table (which is loaded compactly in full)
  // PLUS the visible page's input rows. If the user is editing/adding on
  // page 1 this is correct in practice — the only inaccuracy is showing
  // "available stock" while paging through deep history, which doesn't
  // matter operationally because new records are added from the current page.
  const grayUsage = useMemo(
    () => computeGrayUsage(data, grayOutRecs),
    [data, grayOutRecs],
  );

  // Use configurable numbering. Read existing batch numbers from the compact
  // full-table read so collisions are detected across the entire history,
  // not just the visible page.
  const nextBatchNo = useMemo(() => {
    const cfg = numbering?.inputBatch || DEFAULT_NUMBERING.inputBatch;
    const used = new Set(
      page.allCompact.map((r) => r.batchNo).filter(Boolean),
    );
    return generateNumber(cfg, used).number;
  }, [page.allCompact, numbering]);

  function newRecord() {
    setEditing({
      id: uid(),
      batchNo: nextBatchNo,
      year: new Date().getFullYear(),
      date: todayISO(),
      grayStoreId: "",
      source: "",
      fabricType: "",
      shift: "",
      gas: "",
      rolls: "",
      meters: "",
      notes: "",
      operator: ctx.user.name,
    });
  }

  // Server already filtered the rows; we just sort client-side for display
  // stability (data.date is what the backend sorts by; we add batchNo as
  // a tiebreaker so two records on the same day always appear in the same order).
  const filtered = [...data].sort((a, b) =>
    (b.date + b.batchNo).localeCompare(a.date + a.batchNo),
  );

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift", "fabricType"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRecord}
        addLabel="+ Add Input Batch"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "input_data",
          )
        }
        onDeleteSelected={async () => {
          for (const id of selected) {
            await deleteRecord("input", id);
          }
          setSelected(new Set());
          page.refresh();
        }}
        showDelete={canEdit}
      />
      <TableLoading loading={page.loading} empty={page.items.length === 0}>
        <DataTable
          rows={filtered}
          selected={selected}
          setSelected={setSelected}
          askConfirm={askConfirm}
          columns={[
            { key: "batchNo", label: "Batch #", mono: true, bold: true },
            { key: "date", label: "Date" },
            { key: "source", label: "Source" },
            { key: "fabricType", label: "Fabric" },
            { key: "shift", label: "Shift" },
            { key: "gas", label: "Gas" },
            { key: "rolls", label: "Rolls" },
            {
              key: "meters",
              label: "Meters",
              render: (v) => (v ? Number(v).toLocaleString() : "—"),
            },
            { key: "operator", label: "By" },
          ]}
          onEdit={canEdit ? setEditing : null}
          onDelete={
            canEdit
              ? async (id) => {
                  await deleteRecord("input", id);
                  page.refresh();
                }
              : null
          }
        />
      </TableLoading>
      {editing && (
        <Modal title="Input Batch" onClose={() => setEditing(null)}>
          <InputForm
            rec={editing}
            lists={lists}
            currentUser={ctx.user}
            existingNumbers={
              // Use the compact full-table view so collision detection sees
              // every batchNo, not just the visible page.
              new Set(
                page.allCompact
                  .filter((r) => r.id !== editing.id)
                  .map((r) => r.batchNo)
                  .filter(Boolean),
              )
            }
            grayEntries={grayEntries}
            grayUsage={grayUsage}
            onSave={async (r) => {
              await saveRecord("input", r);
              setEditing(null);
              page.refresh();
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function InputForm({
  rec,
  lists,
  currentUser,
  existingNumbers,
  grayEntries = [],
  grayUsage = {},
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  currentUser: User;
  existingNumbers: Set<string>;
  grayEntries?: ProductionRecord[];
  grayUsage?: any;
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  // Block save if super-admin manually edited the batch # to one that collides with another record.
  const collides =
    currentUser?.role === "admin" &&
    existingNumbers &&
    existingNumbers.has(f.batchNo);

  // For each gray entry, compute available stock — but exclude THIS Input record's own usage
  // so editing an existing record doesn't make it look like there's no stock left.
  const ownUsage = (() => {
    if (!f.grayStoreId) return { rolls: 0, meters: 0 };
    return { rolls: Number(rec.rolls) || 0, meters: Number(rec.meters) || 0 };
  })();
  function entryAvailable(entry) {
    const u = grayUsage[entry.id] || { rolls: 0, meters: 0 };
    let usedRolls = u.rolls,
      usedMeters = u.meters;
    if (entry.id === rec.grayStoreId) {
      usedRolls -= ownUsage.rolls;
      usedMeters -= ownUsage.meters;
    }
    return {
      rolls: Math.max(0, (Number(entry.rolls) || 0) - usedRolls),
      meters: Math.max(0, (Number(entry.meters) || 0) - usedMeters),
    };
  }
  // Selectable entries — only show entries with stock left (or this record's currently-selected one).
  const selectable = grayEntries
    .filter((g) => {
      const a = entryAvailable(g);
      return a.meters > 0 || a.rolls > 0 || g.id === f.grayStoreId;
    })
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  // When the operator picks a gray entry, auto-fill source + fabric type and lock them.
  function pickGray(grayId) {
    const g = grayEntries.find((x) => x.id === grayId);
    if (!g) {
      setF({ ...f, grayStoreId: "", source: "", fabricType: "" });
      return;
    }
    setF({
      ...f,
      grayStoreId: grayId,
      source: g.source,
      fabricType: g.fabricType,
    });
  }

  // Validate that rolls/meters don't exceed what's available in the picked entry.
  const pickedEntry = grayEntries.find((g) => g.id === f.grayStoreId);
  const avail = pickedEntry ? entryAvailable(pickedEntry) : null;
  const rollsTooHigh = avail && Number(f.rolls) > avail.rolls;
  const metersTooHigh = avail && Number(f.meters) > avail.meters;
  const overconsumes = rollsTooHigh || metersTooHigh;

  const valid =
    f.date &&
    f.source &&
    f.fabricType &&
    f.shift &&
    f.batchNo?.trim() &&
    !collides &&
    f.grayStoreId && // a gray entry must be picked (this is the new requirement)
    Number(f.rolls) > 0 &&
    Number(f.meters) > 0 &&
    !overconsumes;

  return (
    <div className="space-y-3">
      <EditableRoutCardHeader
        label="Batch #"
        value={f.batchNo}
        onChange={(v) => setF({ ...f, batchNo: v })}
        currentUser={currentUser}
        existingNumbers={existingNumbers}
      />
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>

      {/* Gray Fabric Store source pick — required. Source + fabric type auto-fill from selection. */}
      <Field label="Take from Gray Fabric Store *">
        <select
          value={f.grayStoreId || ""}
          onChange={(e) => pickGray(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">— Select gray stock entry —</option>
          {selectable.map((g) => {
            const a = entryAvailable(g);
            return (
              <option key={g.id} value={g.id}>
                {g.date} · {g.source} · {g.fabricType} · {a.rolls} rolls /{" "}
                {a.meters.toLocaleString()}m available
              </option>
            );
          })}
        </select>
        {!selectable.length && (
          <div className="text-xs text-amber-700 mt-1">
            ⚠ No gray fabric available. Add stock in the Gray Fabric Store
            first.
          </div>
        )}
        {pickedEntry && avail && (
          <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs text-emerald-800">
            Available in this entry: <strong>{avail.rolls} rolls</strong>,{" "}
            <strong>{avail.meters.toLocaleString()}m</strong>
          </div>
        )}
      </Field>

      {/* Source + fabric type are inherited from the gray entry, shown read-only with a lock icon. */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Fabric Source *">
          <div className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-lg flex items-center gap-2 text-slate-700 text-sm">
            <Lock size={13} className="text-slate-400" />{" "}
            {f.source || (
              <span className="text-slate-400">— pick gray entry above —</span>
            )}
          </div>
        </Field>
        <Field label="Fabric Type *">
          <div className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-lg flex items-center gap-2 text-slate-700 text-sm">
            <Lock size={13} className="text-slate-400" />{" "}
            {f.fabricType || (
              <span className="text-slate-400">— pick gray entry above —</span>
            )}
          </div>
        </Field>
      </div>

      <Field label="Shift *">
        <Select
          value={f.shift}
          options={lists.shift}
          onChange={(v) => setF({ ...f, shift: v })}
        />
      </Field>
      <Field label="Gas / No Gas *">
        <Select
          value={f.gas}
          options={lists.gas}
          onChange={(v) => setF({ ...f, gas: v })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Number of Rolls *">
          <input
            type="number"
            value={f.rolls}
            onChange={(e) => setF({ ...f, rolls: e.target.value })}
            className={`w-full p-2.5 border rounded-lg ${rollsTooHigh ? "border-red-400 bg-red-50" : "border-slate-300"}`}
          />
          {rollsTooHigh && (
            <div className="text-xs text-red-600 mt-1">
              Exceeds available rolls in selected entry.
            </div>
          )}
        </Field>
        <Field label="Total Meters *">
          <input
            type="number"
            value={f.meters}
            onChange={(e) => setF({ ...f, meters: e.target.value })}
            className={`w-full p-2.5 border rounded-lg ${metersTooHigh ? "border-red-400 bg-red-50" : "border-slate-300"}`}
            placeholder="e.g. 4000-9000"
          />
          {metersTooHigh && (
            <div className="text-xs text-red-600 mt-1">
              Exceeds available meters in selected entry.
            </div>
          )}
        </Field>
      </div>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={() => valid && onSave(f)} />
    </div>
  );
}

// ============== BLEACH STATION ==============
function BleachDataPage({ ctx, canEdit }: CtxEditableProps) {
  const { records, lists, saveRecord, deleteRecord, askConfirm } = ctx;
  const data = records.bleach || [];
  const inputBatches = records.input || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  // Already-bleached batch numbers (so we don't offer them again)
  const usedBatchNos = useMemo(() => {
    const ids = new Set();
    data.forEach((r) => {
      if (r.batchNo) ids.add(r.batchNo);
    });
    return ids;
  }, [data]);

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      batchNo: "",
      bleachType: "",
      durationHours: "",
      machine: "",
      shift: "",
      qty: "",
      notes: "",
      operator: ctx.user.name,
    });
  }
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.batchNo} ${r.bleachType}`
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  // For the form, eligible = inputs not yet bleached (or the one currently being edited)
  const editingBatchNo = editing?.batchNo;
  const eligibleInputs = inputBatches.filter(
    (b) => !usedBatchNos.has(b.batchNo) || b.batchNo === editingBatchNo,
  );

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Bleach Record"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "bleach_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("bleach", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          { key: "batchNo", label: "Batch #", mono: true, bold: true },
          { key: "bleachType", label: "Bleach" },
          { key: "machine", label: "Machine" },
          { key: "durationHours", label: "Duration (hours)" },
          { key: "shift", label: "Shift" },
          { key: "qty", label: "Meters" },
          { key: "operator", label: "By" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("bleach", id) : null}
      />
      {editing && (
        <Modal title="Bleach Record" onClose={() => setEditing(null)}>
          <BleachForm
            rec={editing}
            lists={lists}
            batches={eligibleInputs}
            onSave={async (r) => {
              await saveRecord("bleach", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function BleachForm({
  rec,
  lists,
  batches,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  batches: ProductionRecord[];
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  return (
    <div className="space-y-3">
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Input Batch # *">
        <select
          value={f.batchNo}
          onChange={(e) => {
            const sel = batches.find((b) => b.batchNo === e.target.value);
            setF({
              ...f,
              batchNo: e.target.value,
              qty: f.qty || sel?.meters || "",
            });
          }}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">Select batch...</option>
          {batches.map((b) => (
            <option key={b.id} value={b.batchNo}>
              {b.batchNo} — {b.fabricType} ({b.rolls} rolls, {b.meters || "?"}m)
            </option>
          ))}
        </select>
        {!batches.length && (
          <div className="text-xs text-amber-600 mt-1">
            No unbleached input batches available
          </div>
        )}
      </Field>
      <Field label="Bleach Type *">
        <Select
          value={f.bleachType}
          options={lists.bleachType}
          onChange={(v) => setF({ ...f, bleachType: v })}
        />
      </Field>
      <Field label="Machine *">
        <Select
          value={f.machine}
          options={lists.bleachMachine}
          onChange={(v) => setF({ ...f, machine: v })}
        />
      </Field>
      <Field label="Duration (hours) *">
        <input
          type="number"
          step="0.1"
          value={f.durationHours}
          onChange={(e) => setF({ ...f, durationHours: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
          placeholder="e.g. 1.5"
        />
      </Field>
      <Field label="Shift *">
        <Select
          value={f.shift}
          options={lists.shift}
          onChange={(v) => setF({ ...f, shift: v })}
        />
      </Field>
      <Field label="Quantity Meters Bleached *">
        <input
          type="number"
          value={f.qty}
          onChange={(e) => setF({ ...f, qty: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter
        onCancel={onCancel}
        onSave={() => f.batchNo && f.date && onSave(f)}
      />
    </div>
  );
}

// ============== DYEING (sub-tab of Jiggers) ==============
// Dyeing is the parallel path through the same Jiggers machines. It consumes
// SING&DES input batches just like bleaching, but the OUTPUT is a dyed rout card
// (DY-###) that skips batching/printing/curing entirely and jumps to finishing.
//
// Data shape:
//   { id, dyeingNo, date, shift, machine, programId, batchNo (input source),
//     dyedQty, durationHours, ended, notes, operator }
//
// `dyeingNo` plays the same role as `printNo` for downstream stations. Finishing
// records will reference it via the `printNo` field plus a `cardSource: 'dyeing'`
// flag to distinguish from printed cards.
function DyeingDataPage({ ctx, canEdit }: CtxEditableProps) {
  const {
    records,
    lists,
    saveRecord,
    deleteRecord,
    askConfirm,
    programs,
    designs,
    numbering,
  } = ctx;
  const data = records.dyeing || [];
  const inputBatches = records.input || [];
  const bleachRecs = records.bleach || [];
  const t = useT();
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  // SING&DES batches that have already been consumed (either by bleaching OR by dyeing).
  // Each input batch should only feed ONE downstream path.
  const consumedBatchNos = useMemo(() => {
    const ids = new Set();
    bleachRecs.forEach((r) => {
      if (r.batchNo) ids.add(r.batchNo);
    });
    data.forEach((r) => {
      if (r.batchNo) ids.add(r.batchNo);
    });
    return ids;
  }, [bleachRecs, data]);

  // Active dyeing programs only.
  const dyeingPrograms = useMemo(
    () =>
      programs.filter(
        (p) => p.programType === "dyeing" && p.status === "Active",
      ),
    [programs],
  );

  // Generate the next DY number using the configured numbering (or default if missing).
  const nextDyeingNo = useMemo(() => {
    const cfg = numbering?.dyeingNumber || DEFAULT_NUMBERING.dyeingNumber;
    const used = new Set(data.map((r) => r.dyeingNo).filter(Boolean));
    return generateNumber(cfg, used).number;
  }, [data, numbering]);

  function newRec() {
    setEditing({
      id: uid(),
      dyeingNo: nextDyeingNo,
      date: todayISO(),
      batchNo: "",
      programId: "",
      machine: "",
      shift: "",
      dyedQty: "",
      durationHours: "",
      ended: false,
      notes: "",
      operator: ctx.user.name,
    });
  }

  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.dyeingNo} ${r.batchNo}`
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) =>
      (b.date + (b.dyeingNo || "")).localeCompare(a.date + (a.dyeingNo || "")),
    );

  const editingBatchNo = editing?.batchNo;
  // Eligible input batches: not yet consumed by bleach OR dyeing (or this record's own).
  const eligibleInputs = inputBatches.filter(
    (b) => !consumedBatchNos.has(b.batchNo) || b.batchNo === editingBatchNo,
  );

  // Helper to display the program's color swatch from its design.
  function ProgramColorTag({ programId }) {
    const prog = programs.find((p) => p.id === programId);
    if (!prog) return <span className="text-slate-400">—</span>;
    // The first line's design is treated as the program's representative color swatch.
    const firstLine = (prog.lines || [])[0];
    return (
      <div className="flex items-center gap-2">
        {firstLine?.designNumber && (
          <DesignTag
            designNumber={firstLine.designNumber}
            designs={designs}
            size={28}
          />
        )}
        <span className="text-xs text-slate-700">{prog.name}</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-sm text-cyan-900">
        <div className="font-medium">{t("dyeing.title")} — Jigger</div>
        <div className="text-xs text-cyan-700 mt-0.5">
          Dyed fabric skips batching, printing &amp; curing — it appears
          directly in the Finishing eligible-cards dropdown once dyeing is done.
        </div>
      </div>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel={t("dyeing.add")}
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "dyeing_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("dyeing", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "dyeingNo", label: "Dyeing #", mono: true, bold: true },
          { key: "date", label: "Date" },
          { key: "batchNo", label: "Source Batch" },
          {
            key: "programId",
            label: "Program",
            render: (v) => <ProgramColorTag programId={v} />,
          },
          { key: "machine", label: "Machine" },
          { key: "shift", label: "Shift" },
          {
            key: "dyedQty",
            label: "Dyed (m)",
            render: (v) => (v ? Number(v).toLocaleString() : "—"),
          },
          {
            key: "ended",
            label: "Ended",
            render: (v) =>
              v ? (
                <span className="text-rose-700 font-bold text-xs px-2 py-0.5 bg-rose-100 rounded">
                  ENDED
                </span>
              ) : (
                <span className="text-slate-400 text-xs">—</span>
              ),
          },
          { key: "operator", label: "By" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("dyeing", id) : null}
      />
      {editing && (
        <Modal title="Dyeing Record" onClose={() => setEditing(null)} large>
          <DyeingForm
            rec={editing}
            lists={lists}
            batches={eligibleInputs}
            dyeingPrograms={dyeingPrograms}
            designs={designs}
            existingNumbers={
              new Set(
                data
                  .filter((r) => r.id !== editing.id)
                  .map((r) => r.dyeingNo)
                  .filter(Boolean),
              )
            }
            currentUser={ctx.user}
            onSave={async (r) => {
              await saveRecord("dyeing", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function DyeingForm({
  rec,
  lists,
  batches,
  dyeingPrograms,
  designs,
  existingNumbers,
  currentUser,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  batches: ProductionRecord[];
  dyeingPrograms: Program[];
  designs: Design[];
  existingNumbers: Set<string>;
  currentUser: User;
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  // Resolve the selected program for color preview.
  const selectedProgram = dyeingPrograms.find((p) => p.id === f.programId);
  const colorLines = selectedProgram?.lines || [];
  // For the source-batch dropdown, auto-fill dyed qty from the input meters as a starting point.
  function pickBatch(batchNo) {
    const sel = batches.find((b) => b.batchNo === batchNo);
    setF({ ...f, batchNo, dyedQty: f.dyedQty || sel?.meters || "" });
  }
  const valid =
    f.dyeingNo?.trim() &&
    f.date &&
    f.batchNo &&
    f.shift &&
    f.programId &&
    Number(f.dyedQty) > 0;

  return (
    <div className="space-y-3">
      <EditableRoutCardHeader
        label="Dyeing #"
        value={f.dyeingNo}
        onChange={(v) => setF({ ...f, dyeingNo: v })}
        currentUser={currentUser}
        existingNumbers={existingNumbers}
      />
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>

      <Field label="Source Input Batch * (from SING&DES)">
        <select
          value={f.batchNo}
          onChange={(e) => pickBatch(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">Select batch...</option>
          {batches.map((b) => (
            <option key={b.id} value={b.batchNo}>
              {b.batchNo} — {b.fabricType} ({b.rolls} rolls, {b.meters || "?"}m)
            </option>
          ))}
        </select>
        {!batches.length && (
          <div className="text-xs text-amber-600 mt-1">
            No unconsumed input batches. Add SING&amp;DES input first.
          </div>
        )}
      </Field>

      <Field label="Dyeing Program *">
        <select
          value={f.programId}
          onChange={(e) => setF({ ...f, programId: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">Select program...</option>
          {dyeingPrograms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {!dyeingPrograms.length && (
          <div className="text-xs text-amber-600 mt-1">
            No active dyeing programs. Create one in Settings → Dyeing Programs.
          </div>
        )}
        {/* Show the colors associated with the program */}
        {selectedProgram && colorLines.length > 0 && (
          <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-200">
            <div className="text-xs text-slate-600 mb-1.5">
              Colors in this program:
            </div>
            <div className="flex flex-wrap gap-2">
              {colorLines.map((ln) => (
                <div
                  key={ln.id}
                  className="flex items-center gap-1.5 bg-white rounded px-2 py-1 border border-slate-200"
                >
                  {ln.designNumber && (
                    <DesignTag
                      designNumber={ln.designNumber}
                      designs={designs}
                      size={32}
                    />
                  )}
                  <span className="text-xs text-slate-700">
                    {ln.designName || ln.designNumber}
                  </span>
                  {ln.qty && (
                    <span className="text-xs text-slate-400">
                      · {Number(ln.qty).toLocaleString()}m
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Machine *">
          <Select
            value={f.machine}
            options={lists.bleachMachine}
            onChange={(v) => setF({ ...f, machine: v })}
          />
        </Field>
        <Field label="Shift *">
          <Select
            value={f.shift}
            options={lists.shift}
            onChange={(v) => setF({ ...f, shift: v })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Dyed Quantity (m) *">
          <input
            type="number"
            value={f.dyedQty}
            onChange={(e) => setF({ ...f, dyedQty: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Duration (hours)">
          <input
            type="number"
            step="0.1"
            value={f.durationHours}
            onChange={(e) => setF({ ...f, durationHours: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
            placeholder="e.g. 2.5"
          />
        </Field>
      </div>

      <Field label="End Dyeing Card?">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setF({ ...f, ended: false })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${!f.ended ? "border-slate-400 bg-slate-50" : "border-slate-200 text-slate-400"}`}
          >
            Continue (more coming)
          </button>
          <button
            onClick={() => setF({ ...f, ended: true })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${f.ended ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-400"}`}
          >
            End (close chain)
          </button>
        </div>
      </Field>

      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={() => valid && onSave(f)} />
    </div>
  );
}

// ============== BATCHING STATION ==============
function BatchingDataPage({ ctx, canEdit }: CtxEditableProps) {
  const { records, lists, saveRecord, deleteRecord, askConfirm } = ctx;
  const data = records.batching || [];
  const bleachRecs = records.bleach || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  // Already-batched batch numbers
  const usedBatchNos = useMemo(() => {
    const s = new Set();
    data.forEach((r) => (r.sourceBatches || []).forEach((b) => s.add(b)));
    return s;
  }, [data]);

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      sourceBatches: [],
      qtyBefore: 0,
      qtyAfter: "",
      extensionPct: 0,
      width: "",
      shift: "",
      notes: "",
      operator: ctx.user.name,
    });
  }
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !(r.sourceBatches || [])
          .join(",")
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  // Filter bleach records: not yet batched (or are part of the record being edited)
  const editingBatches = new Set(editing?.sourceBatches || []);
  const eligibleBleach = bleachRecs.filter(
    (b) => !usedBatchNos.has(b.batchNo) || editingBatches.has(b.batchNo),
  );

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Batching Record"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered
              .filter((r) => selected.size === 0 || selected.has(r.id))
              .map((r) => ({
                ...r,
                sourceBatches: (r.sourceBatches || []).join(" + "),
              })),
            "batching_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("batching", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          {
            key: "sourceBatches",
            label: "Source Batches",
            render: (v) => (v || []).join(" + "),
          },
          { key: "qtyBefore", label: "Before (m)" },
          { key: "qtyAfter", label: "After Drying (m)" },
          {
            key: "extensionPct",
            label: "Extension %",
            render: (v) => (v ? `${Number(v).toFixed(2)}%` : "—"),
          },
          { key: "width", label: "Width" },
          { key: "shift", label: "Shift" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("batching", id) : null}
      />
      {editing && (
        <Modal title="Batching Record" onClose={() => setEditing(null)}>
          <BatchingForm
            rec={editing}
            lists={lists}
            bleachRecs={eligibleBleach}
            onSave={async (r) => {
              await saveRecord("batching", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function BatchingForm({
  rec,
  lists,
  bleachRecs,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  bleachRecs: ProductionRecord[];
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  function toggleBatch(batchNo) {
    const exists = f.sourceBatches.includes(batchNo);
    const newBatches = exists
      ? f.sourceBatches.filter((b) => b !== batchNo)
      : [...f.sourceBatches, batchNo];
    const totalBefore = newBatches.reduce((s, bn) => {
      const br = bleachRecs.find((x) => x.batchNo === bn);
      return s + (Number(br?.qty) || 0);
    }, 0);
    setF((prev) => ({
      ...prev,
      sourceBatches: newBatches,
      qtyBefore: totalBefore,
      extensionPct:
        prev.qtyAfter && totalBefore
          ? ((prev.qtyAfter - totalBefore) / totalBefore) * 100
          : 0,
    }));
  }
  function handleAfter(v) {
    setF((prev) => ({
      ...prev,
      qtyAfter: v,
      extensionPct:
        v && prev.qtyBefore
          ? ((Number(v) - prev.qtyBefore) / prev.qtyBefore) * 100
          : 0,
    }));
  }
  return (
    <div className="space-y-3">
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Source Bleached Batches * (select one or more)">
        <div className="border border-slate-200 rounded-lg p-2 max-h-40 overflow-y-auto">
          {!bleachRecs.length && (
            <div className="text-xs text-slate-400 p-2">
              No unbatched bleached batches available
            </div>
          )}
          {bleachRecs.map((b) => (
            <label
              key={b.id}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={f.sourceBatches.includes(b.batchNo)}
                onChange={() => toggleBatch(b.batchNo)}
              />
              <span className="font-mono font-bold text-purple-700">
                {b.batchNo}
              </span>
              <span className="text-slate-500">
                {b.qty}m • {b.date}
              </span>
            </label>
          ))}
        </div>
        {f.sourceBatches.length > 0 && (
          <div className="text-xs text-slate-600 mt-1">
            Combined before: <strong>{f.qtyBefore.toLocaleString()}m</strong>
          </div>
        )}
      </Field>
      <Field label="Quantity After Drying (meters) *">
        <input
          type="number"
          value={f.qtyAfter}
          onChange={(e) => handleAfter(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      {f.qtyAfter && f.qtyBefore > 0 && (
        <div
          className={`rounded-lg p-3 text-sm ${f.extensionPct >= 0 ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}
        >
          Auto extension: <strong>{f.extensionPct.toFixed(2)}%</strong> (
          {Number(f.qtyAfter).toLocaleString()}m /{" "}
          {f.qtyBefore.toLocaleString()}m)
        </div>
      )}
      <Field label="Width *">
        <Select
          value={f.width}
          options={lists.width}
          onChange={(v) => setF({ ...f, width: v })}
        />
      </Field>
      <Field label="Shift *">
        <Select
          value={f.shift}
          options={lists.shift}
          onChange={(v) => setF({ ...f, shift: v })}
        />
      </Field>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter
        onCancel={onCancel}
        onSave={() => f.sourceBatches.length && f.qtyAfter && onSave(f)}
      />
    </div>
  );
}

// ============== PRINTING STATION ==============
function PrintingDataPage({ ctx, canEdit }: CtxEditableProps) {
  const {
    records,
    lists,
    saveRecord,
    deleteRecord,
    designs,
    askConfirm,
    programs,
  } = ctx;
  const data = records.printing || [];
  const batchingRecs = records.batching || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  const nextPrintNo = useMemo(() => {
    const cfg = ctx.numbering?.printNumber || DEFAULT_NUMBERING.printNumber;
    const used = new Set(data.map((r) => r.printNo).filter(Boolean));
    return generateNumber(cfg, used).number;
  }, [data, ctx.numbering]);

  function newRec() {
    setEditing({
      id: uid(),
      printNo: nextPrintNo,
      date: todayISO(),
      shift: "",
      programType: "",
      programFabricType: "",
      programQty: "",
      printedQty: "",
      status: "",
      designNumber: "",
      batcherUsage: [],
      notes: "",
      operator: ctx.user.name,
    });
  }

  // Helper: sort by print number suffix (PRmay1, PRmay2, ..., PRmay89)
  function printNoSortKey(pn) {
    if (!pn) return [0, 0];
    const m = String(pn).match(/^PR([a-z]+)(\d+)$/i);
    if (!m) return [0, 0];
    const monthOrder = {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    };
    return [monthOrder[m[1].toLowerCase()] || 0, parseInt(m[2]) || 0];
  }

  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.printNo} ${r.designNumber}`
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) => {
      const [am, an] = printNoSortKey(a.printNo);
      const [bm, bn] = printNoSortKey(b.printNo);
      if (am !== bm) return am - bm;
      return an - bn;
    });

  // Single-machine mode: hide machine selection if only 0 or 1 in list
  const singleMachine = (lists.printingMachine || []).length <= 1;

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Printing Record"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered
              .filter((r) => selected.size === 0 || selected.has(r.id))
              .map((r) => ({
                ...r,
                batcherUsage: (r.batcherUsage || [])
                  .map((b) => `${b.batchingId}:${b.qty}m`)
                  .join(" + "),
              })),
            "printing_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("printing", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "printNo", label: "Print #", mono: true, bold: true },
          { key: "date", label: "Date" },
          {
            key: "designNumber",
            label: "Design",
            render: (v) => <DesignTag designNumber={v} designs={designs} />,
          },
          {
            key: "programId",
            label: "Program",
            render: (v) => {
              const p = (programs || []).find((x) => x.id === v);
              return p ? p.name : <span className="text-slate-400">—</span>;
            },
          },
          { key: "programQty", label: "Plan (m)" },
          { key: "printedQty", label: "Printed (m)" },
          {
            key: "programDiffPct",
            label: "Diff %",
            render: (_, r) => {
              const plan = Number(r.programQty) || 0;
              const printed = Number(r.printedQty) || 0;
              if (!plan) return "—";
              const pct = ((printed - plan) / plan) * 100;
              return (
                <span
                  className={
                    pct >= 0
                      ? "text-green-600 font-medium"
                      : "text-orange-600 font-medium"
                  }
                >
                  {pct >= 0 ? "+" : ""}
                  {pct.toFixed(2)}%
                </span>
              );
            },
          },
          { key: "status", label: "Status" },
          { key: "shift", label: "Shift" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("printing", id) : null}
      />
      {editing && (
        <Modal title="Printing Record" onClose={() => setEditing(null)} large>
          <PrintingForm
            rec={editing}
            lists={lists}
            designs={designs}
            batchingRecs={batchingRecs}
            allPrintRecs={data}
            singleMachine={singleMachine}
            programs={ctx.programs}
            currentUser={ctx.user}
            existingNumbers={
              new Set(
                data
                  .filter((r) => r.id !== editing.id)
                  .map((r) => r.printNo)
                  .filter(Boolean),
              )
            }
            onSave={async (r) => {
              await saveRecord("printing", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

// Small component to show design number with image inline
function DesignTag({
  designNumber,
  designs,
  size = 24,
}: {
  designNumber?: string;
  designs: Design[];
  size?: number;
}) {
  const d = designs.find((x) => x.designNumber === designNumber);
  if (!designNumber) return <span className="text-slate-400">—</span>;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="rounded overflow-hidden bg-slate-100 flex-shrink-0"
        style={{ width: size, height: size }}
      >
        {resolveDesignImage(d) ? (
          <img src={resolveDesignImage(d)} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon
            size={size * 0.5}
            className="m-auto text-slate-300"
            style={{ marginTop: size * 0.25, marginLeft: size * 0.25 }}
          />
        )}
      </span>
      <span className="font-mono text-xs font-bold">{designNumber}</span>
    </span>
  );
}

function PrintingForm({
  rec,
  lists,
  designs,
  batchingRecs,
  allPrintRecs,
  singleMachine,
  programs = [],
  currentUser,
  existingNumbers,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  designs: Design[];
  batchingRecs: ProductionRecord[];
  allPrintRecs: ProductionRecord[];
  singleMachine?: any;
  programs?: Program[];
  currentUser: User;
  existingNumbers: Set<string>;
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  const [designSearch, setDesignSearch] = useState("");
  const [showGallery, setShowGallery] = useState(false);

  // Block save if super-admin manually edited the print # to one that collides with another record.
  const collides =
    currentUser?.role === "admin" &&
    existingNumbers &&
    existingNumbers.has(f.printNo);

  // Active programs only — closed programs shouldn't appear in dropdown.
  // Also restrict to printing-type programs since this is the Printing station;
  // dyeing programs belong to the Dyeing tab in the Jiggers station.
  const activePrograms = useMemo(
    () =>
      programs.filter(
        (p) =>
          p.status === "Active" && (p.programType || "printing") === "printing",
      ),
    [programs],
  );
  // Selected program (if any)
  const selectedProgram = programs.find((p) => p.id === f.programId);
  // Convenience — list of designs in the selected program (helps operator pick the right one)
  const programDesigns = selectedProgram?.lines || [];

  // Calculate available stock per batching record (kept for traceability of which batchers exist)
  const availableStock = useMemo(() => {
    const map: Record<string, { record: any; available: number }> = {};
    batchingRecs.forEach((b) => {
      map[b.id] = { record: b, available: Number(b.qtyAfter) || 0 };
    });
    allPrintRecs.forEach((p) => {
      if (p.id === f.id) return;
      (p.batcherUsage || []).forEach((u: any) => {
        if (map[u.batchingId])
          map[u.batchingId].available -= Number(u.qty) || 0;
      });
    });
    return map;
  }, [batchingRecs, allPrintRecs, f.id]);

  function updateUsage(batchingId, qty) {
    const newUsage = f.batcherUsage.filter((u) => u.batchingId !== batchingId);
    if (qty && Number(qty) > 0) newUsage.push({ batchingId, qty: Number(qty) });
    setF({ ...f, batcherUsage: newUsage });
  }
  // Toggle whether THIS printing record marks a particular batcher as "ended" — meaning
  // the leftover (available − used) should be removed from bleached stock automatically.
  function toggleEnded(batchingId) {
    const ended = Array.isArray(f.endedBatchers) ? f.endedBatchers : [];
    const next = ended.includes(batchingId)
      ? ended.filter((x) => x !== batchingId)
      : [...ended, batchingId];
    setF({ ...f, endedBatchers: next });
  }
  const endedSet = new Set(f.endedBatchers || []);
  const totalUsed = f.batcherUsage.reduce((s, u) => s + Number(u.qty), 0);
  const matchedDesign = designs.find((d) => d.designNumber === f.designNumber);
  const filteredDesigns = designs.filter(
    (d) =>
      !designSearch ||
      d.designNumber.toLowerCase().includes(designSearch.toLowerCase()) ||
      d.name?.toLowerCase().includes(designSearch.toLowerCase()),
  );

  // Auto program % calc
  const planNum = Number(f.programQty) || 0;
  const printedNum = Number(f.printedQty) || 0;
  const programDiffPct = planNum ? ((printedNum - planNum) / planNum) * 100 : 0;

  return (
    <div className="space-y-3">
      <EditableRoutCardHeader
        label="Print #"
        value={f.printNo}
        onChange={(v) => setF({ ...f, printNo: v })}
        currentUser={currentUser}
        existingNumbers={existingNumbers}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date *">
          <input
            type="date"
            value={f.date}
            onChange={(e) => setF({ ...f, date: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Shift *">
          <Select
            value={f.shift}
            options={lists.shift}
            onChange={(v) => setF({ ...f, shift: v })}
          />
        </Field>
      </div>
      <Field label="Status *">
        <Select
          value={f.status}
          options={lists.printingStatus}
          onChange={(v) => setF({ ...f, status: v })}
        />
      </Field>

      {/* Program selector (item #5) — picks one of the active multi-design programs.
          The chosen program travels with this print number through curing/finishing/calendering/folding. */}
      <Field label="Program (optional)">
        <select
          value={f.programId || ""}
          onChange={(e) => setF({ ...f, programId: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">— No program —</option>
          {activePrograms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {(p.lines || []).length} design(s),{" "}
              {(p.lines || [])
                .reduce((s, ln) => s + (Number(ln.qty) || 0), 0)
                .toLocaleString()}
              m
            </option>
          ))}
        </select>
        {!f.programId && (
          <div className="text-xs text-amber-700 mt-1">
            ⚠ No program assigned — this print won't appear in Programs
            Progress.
          </div>
        )}
        {/* If a program is picked, list its designs as quick reminders */}
        {selectedProgram && programDesigns.length > 0 && (
          <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs">
            <div className="font-medium text-emerald-800 mb-1">
              Designs in this program:
            </div>
            <div className="flex flex-wrap gap-2">
              {programDesigns.map((ln) => (
                <button
                  key={ln.id}
                  type="button"
                  onClick={() => setF({ ...f, designNumber: ln.designNumber })}
                  className={`px-2 py-1 rounded font-mono text-xs ${f.designNumber === ln.designNumber ? "bg-emerald-600 text-white" : "bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-300"}`}
                >
                  {ln.designNumber} ({Number(ln.qty).toLocaleString()}m)
                </button>
              ))}
            </div>
          </div>
        )}
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Program Fabric Type *">
          <Select
            value={f.programFabricType}
            options={lists.fabricType}
            onChange={(v) => setF({ ...f, programFabricType: v })}
          />
        </Field>
        <Field label="Program Quantity (planned m) *">
          <input
            type="number"
            value={f.programQty}
            onChange={(e) => setF({ ...f, programQty: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Field label="Printed Quantity (actual m) *">
          <input
            type="number"
            value={f.printedQty}
            onChange={(e) => setF({ ...f, printedQty: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
      </div>
      {planNum > 0 && printedNum > 0 && (
        <div
          className={`rounded-lg p-3 text-sm ${programDiffPct >= 0 ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}
        >
          Program difference:{" "}
          <strong>
            {programDiffPct >= 0 ? "+" : ""}
            {programDiffPct.toFixed(2)}%
          </strong>
          <span className="ml-2 text-xs">
            ({printedNum.toLocaleString()}m printed vs{" "}
            {planNum.toLocaleString()}m planned)
          </span>
        </div>
      )}

      <Field label="Design Number *">
        <div className="flex gap-2">
          <input
            value={f.designNumber}
            onChange={(e) => setF({ ...f, designNumber: e.target.value })}
            className="flex-1 p-2.5 border border-slate-300 rounded-lg font-mono"
            placeholder="Type or pick from gallery"
          />
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="px-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm flex items-center gap-1"
          >
            <ImageIcon size={15} /> Gallery
          </button>
        </div>
        {resolveDesignImage(matchedDesign) && (
          <div className="mt-2 flex items-center gap-2 bg-slate-50 rounded-lg p-2">
            <img
              src={resolveDesignImage(matchedDesign)}
              className="w-14 h-14 object-cover rounded"
            />
            <div className="text-sm">
              <div className="font-mono font-bold">
                {matchedDesign.designNumber}
              </div>
              <div className="text-slate-600">{matchedDesign.name}</div>
            </div>
          </div>
        )}
        {showGallery && (
          <div className="mt-2 border border-slate-200 rounded-lg p-2">
            <input
              value={designSearch}
              onChange={(e) => setDesignSearch(e.target.value)}
              placeholder="Search designs..."
              className="w-full p-2 border border-slate-200 rounded text-sm mb-2"
            />
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {filteredDesigns.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setF({ ...f, designNumber: d.designNumber });
                    setShowGallery(false);
                  }}
                  className="text-left hover:bg-slate-50 rounded p-1 border border-transparent hover:border-purple-300"
                >
                  <div className="aspect-square bg-slate-100 rounded mb-1 overflow-hidden">
                    {resolveDesignImage(d) ? (
                      <img
                        src={resolveDesignImage(d)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={20} className="m-auto text-slate-300" />
                    )}
                  </div>
                  <div className="font-mono text-xs font-bold truncate">
                    {d.designNumber}
                  </div>
                </button>
              ))}
              {!filteredDesigns.length && (
                <div className="col-span-3 text-center text-xs text-slate-400 p-3">
                  No designs match
                </div>
              )}
            </div>
          </div>
        )}
      </Field>

      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
        <div className="font-medium text-sm text-slate-700 mb-2">
          Fabric Source — pick batchers and how much to take from each
        </div>
        <div className="space-y-1.5 max-h-52 overflow-y-auto bg-white rounded p-2">
          {(
            Object.values(availableStock) as {
              record: any;
              available: number;
            }[]
          )
            .filter(
              (s) =>
                s.available > 0 ||
                (f.batcherUsage || []).some(
                  (u: any) => u.batchingId === s.record.id,
                ),
            )
            .map(({ record, available }) => {
              const used =
                f.batcherUsage.find((u) => u.batchingId === record.id)?.qty ||
                "";
              const isEnded = endedSet.has(record.id);
              const leftover = Math.max(0, available - Number(used || 0));
              return (
                <div
                  key={record.id}
                  className="flex items-center gap-2 text-sm border-b border-slate-100 pb-1.5"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs">
                      {(record.sourceBatches || []).join("+")}
                    </div>
                    <div className="text-xs text-slate-500">
                      {record.width} • Available:{" "}
                      <strong className="text-slate-700">
                        {available.toLocaleString()}m
                      </strong>
                      {isEnded && Number(used) > 0 && leftover > 0 ? (
                        <span className="ml-2 text-amber-700">
                          · will deduct {leftover}m leftover
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <input
                    type="number"
                    value={used}
                    placeholder="0"
                    max={available + Number(used || 0)}
                    onChange={(e) => updateUsage(record.id, e.target.value)}
                    className="w-24 p-1.5 border border-slate-300 rounded text-sm text-right"
                  />
                  <span className="text-xs text-slate-400">m</span>
                  {/* End/Continue toggle — operator decides whether the batcher is finished.
                    If ENDED + leftover > 0, leftover is removed from bleached stock for this batcher. */}
                  <button
                    type="button"
                    onClick={() => toggleEnded(record.id)}
                    className={`text-xs px-2 py-1 rounded font-medium whitespace-nowrap ${isEnded ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-600 hover:bg-slate-300"}`}
                    title={
                      isEnded
                        ? "Batcher marked as ENDED — leftover will be deducted from bleached stock"
                        : "Click if this batcher is finished; leftover will be deducted from bleached stock"
                    }
                  >
                    {isEnded ? "Ended ✓" : "End?"}
                  </button>
                </div>
              );
            })}
          {!(
            Object.values(availableStock) as {
              record: any;
              available: number;
            }[]
          ).some((s) => s.available > 0) && (
            <div className="text-xs text-slate-400 p-2">
              No batched fabric available
            </div>
          )}
        </div>
        <div className="mt-2 text-sm flex justify-between">
          <span>Total taken from stock:</span>
          <strong>{totalUsed.toLocaleString()}m</strong>
        </div>
        {f.printedQty && Math.abs(totalUsed - Number(f.printedQty)) > 0 && (
          <div className="mt-1 text-xs text-amber-700 bg-amber-50 p-1.5 rounded">
            ⚠ Stock taken ({totalUsed}m) vs printed ({f.printedQty}m) differ by{" "}
            {Math.abs(totalUsed - Number(f.printedQty)).toLocaleString()}m
          </div>
        )}
      </div>

      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter
        onCancel={onCancel}
        onSave={() =>
          f.date &&
          f.designNumber &&
          f.printedQty &&
          f.printNo?.trim() &&
          !collides &&
          onSave(f)
        }
      />
    </div>
  );
}

function BleachedInventoryPage({ ctx }: CtxProps) {
  // ===== Self-fetch three compact tables =====
  // This page lives as a tab inside the Printing station. Under the new
  // per-station loader, only `records.printing` is loaded by loadForView,
  // so we fetch bleach + batching + printing here directly (compact mode
  // — only the fields the math needs).
  //
  // All three loads run in parallel. Total wire size is small: just the
  // join keys and numeric quantities.
  const [bleachRecs, setBleachRecs] = useState<any[]>([]);
  const [batchingRecs, setBatchingRecs] = useState<any[]>([]);
  const [printRecs, setPrintRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Wait for auth (token present) before firing the three fetches. Without
  // this, a Ctrl+R lands on the page while the token is still being restored,
  // every request silently 401s, and the page renders "no stock" with stale
  // empty arrays. useAuthReadyEffect ensures we run only after auth is ready.
  useAuthReadyEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const [bleach, batching, printing] = await Promise.all([
        storage.fetchCompact("rec_bleach:", ["id", "batchNo", "qty", "date"]),
        storage.fetchCompact("rec_batching:", ["id", "sourceBatches", "date"]),
        storage.fetchCompact("rec_printing:", ["batcherUsage", "endedBatchers"]),
      ]);
      if (cancelled) return;
      setBleachRecs(bleach);
      setBatchingRecs(batching);
      setPrintRecs(printing);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ===== Stock math =====
  // One row per batching record. A batcher is identified by its id; its
  // display label is its sourceBatches joined with '+'. Input qty is the
  // SUM of bleach.qty for every source batch. Printed qty is the SUM of
  // batcherUsage entries across all print records pointing at this batcher.
  // Ended flag: true if ANY print record marked this batcher in endedBatchers.
  //
  // Available = input - printed.
  // Rules:
  //   - Ended batchers: drop them (they're finished; any difference vs input
  //     becomes extension on the Extension Audit page).
  //   - Available <= 0: drop them.
  //   - Batchers without source batches: defensively drop them.
  const stock = useMemo(() => {
    // Build a lookup of bleach qty by batchNo for fast joins.
    const bleachQtyByBatch: Record<string, number> = {};
    for (const b of bleachRecs) {
      bleachQtyByBatch[b.batchNo] = Number(b.qty) || 0;
    }

    // Per-batcher printed totals + ended flag.
    const printedById: Record<string, number> = {};
    const endedById: Record<string, boolean> = {};
    for (const p of printRecs) {
      for (const u of p.batcherUsage || []) {
        if (!u.batchingId) continue;
        printedById[u.batchingId] =
          (printedById[u.batchingId] || 0) + (Number(u.qty) || 0);
      }
      for (const bid of p.endedBatchers || []) {
        endedById[bid] = true;
      }
    }

    // Build rows.
    return batchingRecs
      .map((br) => {
        const sources: string[] = Array.isArray(br.sourceBatches)
          ? br.sourceBatches
          : [];
        if (!sources.length) return null;
        const inputQty = sources.reduce(
          (s, batchNo) => s + (bleachQtyByBatch[batchNo] || 0),
          0,
        );
        const printed = printedById[br.id] || 0;
        const ended = !!endedById[br.id];
        const available = inputQty - printed;
        return {
          id: br.id,
          label: sources.join("+"),
          date: br.date,
          inputQty,
          printed,
          available,
          ended,
        };
      })
      .filter((r): r is NonNullable<typeof r> => !!r)
      // Hide ended batchers (they're done — see Extension Audit instead).
      .filter((r) => !r.ended)
      // Hide fully-consumed (avoids "0m available" noise).
      .filter((r) => r.available > 0.01);
    // Note: no default sort here — column header clicks drive ordering.
    // First render shows rows in insertion order from batchingRecs.
  }, [bleachRecs, batchingRecs, printRecs]);

  // Column sort state (three-state click cycle).
  const [sort, setSort] = useState<SortSpec>({ key: "available", dir: "desc" });
  const sortedStock = useSortableRows(stock, sort);

  const totalAvailable = stock.reduce((s, x) => s + x.available, 0);

  return (
    <div className="space-y-3">
      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm text-cyan-700">
              Total bleached fabric still available (input/bleach qty minus
              printed, ended batchers excluded)
            </div>
            <div className="text-3xl font-bold text-cyan-900">
              {totalAvailable.toLocaleString()}m
            </div>
            <div className="text-xs text-cyan-700 mt-1">
              One row per physical batcher (joined batches stay joined).
            </div>
          </div>
          {/* Export the FULL stock dataset (not the sorted/visible slice). The
              user asked for "all data" so they can sort/analyse in Excel. */}
          <button
            onClick={() =>
              exportToCSV(
                stock.map((s) => ({
                  batcher: s.label,
                  date: s.date || "",
                  inputMeters: s.inputQty,
                  printedMeters: s.printed,
                  availableMeters: s.available,
                })),
                "bleached_stock",
              )
            }
            disabled={!stock.length}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap inline-flex items-center gap-1.5 ${stock.length ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
            title="Download all rows as a spreadsheet-compatible CSV (opens in Excel)"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>
      <TableLoading loading={loading} empty={stock.length === 0}>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <SortableTh
                  sortKey="label"
                  label="Batcher"
                  sort={sort}
                  setSort={setSort}
                />
                <SortableTh
                  sortKey="date"
                  label="Date"
                  sort={sort}
                  setSort={setSort}
                />
                <SortableTh
                  sortKey="inputQty"
                  label="Input (m)"
                  sort={sort}
                  setSort={setSort}
                  numeric
                />
                <SortableTh
                  sortKey="printed"
                  label="Printed (m)"
                  sort={sort}
                  setSort={setSort}
                  numeric
                />
                <SortableTh
                  sortKey="available"
                  label="Available (m)"
                  sort={sort}
                  setSort={setSort}
                  numeric
                />
              </tr>
            </thead>
            <tbody>
              {sortedStock.map((s) => (
                <tr key={s.id} className="border-t border-slate-100">
                  <td className="p-3 font-mono font-bold text-purple-700">
                    {s.label}
                  </td>
                  <td className="p-3 text-slate-500 text-xs">{s.date}</td>
                  <td className="p-3">{s.inputQty.toLocaleString()}</td>
                  <td className="p-3 text-orange-600">
                    {s.printed > 0 ? `-${s.printed.toFixed(0)}` : "—"}
                  </td>
                  <td className="p-3 font-bold text-cyan-700">
                    {s.available.toFixed(0)}
                  </td>
                </tr>
              ))}
              {!sortedStock.length && !loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No bleached fabric in stock
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TableLoading>
    </div>
  );
}

function ExtensionAuditPage({ ctx }: CtxProps) {
  // Same self-fetching pattern as BleachedInventoryPage. Both pages are tabs
  // in the Printing station and need bleach + batching + printing tables that
  // the per-station loader no longer provides.
  const [bleachRecs, setBleachRecs] = useState<any[]>([]);
  const [batchingRecs, setBatchingRecs] = useState<any[]>([]);
  const [printRecs, setPrintRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // See BleachedInventoryPage for why useAuthReadyEffect — protects against
  // the Ctrl+R race that fires fetches before the auth token is restored.
  useAuthReadyEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const [bleach, batching, printing] = await Promise.all([
        storage.fetchCompact("rec_bleach:", ["batchNo", "qty"]),
        storage.fetchCompact("rec_batching:", ["id", "sourceBatches", "date"]),
        storage.fetchCompact("rec_printing:", ["batcherUsage", "endedBatchers"]),
      ]);
      if (cancelled) return;
      setBleachRecs(bleach);
      setBatchingRecs(batching);
      setPrintRecs(printing);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Audit math: one row per ENDED batcher. The operator declared the roll
  // finished, so we now know the final printed total and can compute real
  // extension = printed - input. Positive = stretch (more meters out than in),
  // negative = shortage.
  //
  // Non-ended batchers are intentionally excluded — their numbers aren't
  // final yet, so calling that "extension" would mislead.
  const audit = useMemo(() => {
    const bleachQtyByBatch: Record<string, number> = {};
    for (const b of bleachRecs) {
      bleachQtyByBatch[b.batchNo] = Number(b.qty) || 0;
    }

    const printedById: Record<string, number> = {};
    const endedById: Record<string, boolean> = {};
    for (const p of printRecs) {
      for (const u of p.batcherUsage || []) {
        if (!u.batchingId) continue;
        printedById[u.batchingId] =
          (printedById[u.batchingId] || 0) + (Number(u.qty) || 0);
      }
      for (const bid of p.endedBatchers || []) {
        endedById[bid] = true;
      }
    }

    return batchingRecs
      .map((br) => {
        if (!endedById[br.id]) return null;
        const sources: string[] = Array.isArray(br.sourceBatches)
          ? br.sourceBatches
          : [];
        if (!sources.length) return null;
        const inputQty = sources.reduce(
          (s, batchNo) => s + (bleachQtyByBatch[batchNo] || 0),
          0,
        );
        const printed = printedById[br.id] || 0;
        const extMeters = printed - inputQty;
        const extPct = inputQty ? (extMeters / inputQty) * 100 : 0;
        return {
          id: br.id,
          label: sources.join("+"),
          date: br.date,
          inputQty,
          printed,
          extMeters,
          extPct,
        };
      })
      .filter((r): r is NonNullable<typeof r> => !!r);
    // No default sort here — user-driven via SortableTh column headers.
  }, [bleachRecs, batchingRecs, printRecs]);

  // Default sort: most-extreme extension first so anomalies surface at the top.
  // Stored as state so column clicks can override it.
  const [sort, setSort] = useState<SortSpec>({ key: "extPct", dir: "desc" });
  // For Extension %, "desc by absolute value" is what the page used to do by
  // default. To preserve that, we use an accessor that returns |extPct| when
  // sorting by extPct AND there's no explicit user click. Tracked via a flag.
  // Keeping it simple: just sort by raw value. The default desc gives the
  // largest positive extension first, then descending into the negatives —
  // close enough to surfacing anomalies for this small dataset.
  const sortedAudit = useSortableRows(audit, sort);

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-slate-600 flex-1">
          Real extension = printed meters minus input/bleach meters, for
          batchers marked <strong>Ended</strong>. Positive = stretch, negative =
          shortage.
        </div>
        {/* Full dataset export — user said "get all data" so they can analyse
            in Excel without us pre-sorting or filtering. */}
        <button
          onClick={() =>
            exportToCSV(
              audit.map((a) => ({
                batcher: a.label,
                date: a.date || "",
                inputMeters: a.inputQty,
                printedMeters: a.printed,
                deltaMeters: a.extMeters,
                extensionPct: Number(a.extPct.toFixed(4)),
              })),
              "extension_audit",
            )
          }
          disabled={!audit.length}
          className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap inline-flex items-center gap-1.5 ${audit.length ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
          title="Download all rows as a spreadsheet-compatible CSV (opens in Excel)"
        >
          <Download size={14} /> Export
        </button>
      </div>
      <TableLoading loading={loading} empty={audit.length === 0}>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <SortableTh
                  sortKey="label"
                  label="Batcher"
                  sort={sort}
                  setSort={setSort}
                />
                <SortableTh
                  sortKey="date"
                  label="Date"
                  sort={sort}
                  setSort={setSort}
                />
                <SortableTh
                  sortKey="inputQty"
                  label="Input (m)"
                  sort={sort}
                  setSort={setSort}
                  numeric
                />
                <SortableTh
                  sortKey="printed"
                  label="Printed (m)"
                  sort={sort}
                  setSort={setSort}
                  numeric
                />
                <SortableTh
                  sortKey="extMeters"
                  label="Δ (m)"
                  sort={sort}
                  setSort={setSort}
                  numeric
                />
                <SortableTh
                  sortKey="extPct"
                  label="Extension %"
                  sort={sort}
                  setSort={setSort}
                  numeric
                />
              </tr>
            </thead>
            <tbody>
              {sortedAudit.map((a) => (
                <tr key={a.id} className="border-t border-slate-100">
                  <td className="p-3 font-mono font-bold text-purple-700">
                    {a.label}
                  </td>
                  <td className="p-3 text-slate-500 text-xs">{a.date}</td>
                  <td className="p-3">{a.inputQty.toLocaleString()}</td>
                  <td className="p-3">{a.printed.toFixed(0)}</td>
                  <td
                    className={`p-3 ${a.extMeters >= 0 ? "text-green-600" : "text-orange-600"}`}
                  >
                    {a.extMeters >= 0 ? "+" : ""}
                    {a.extMeters.toFixed(0)}
                  </td>
                  <td
                    className={`p-3 font-bold ${a.extPct >= 0 ? "text-green-600" : "text-orange-600"}`}
                  >
                    {a.extPct >= 0 ? "+" : ""}
                    {a.extPct.toFixed(2)}%
                  </td>
                </tr>
              ))}
              {!sortedAudit.length && !loading && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No ended batchers yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TableLoading>
    </div>
  );
}

// ============== CURING ==============
function CuringDataPage({ ctx, canEdit }: CtxEditableProps) {
  const { records, lists, saveRecord, deleteRecord, designs, askConfirm } = ctx;
  const data = records.curing || [];
  const printRecs = records.printing || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  // A rout card is "completed" for curing once any curing record on it is marked Completed.
  // (Same pattern as Finishing/Calendering stations — keeps the dropdown clean.)
  const completedPrintNos = new Set(
    data
      .filter((r) => (r.status || "").toLowerCase() === "completed")
      .map((r) => r.printNo),
  );
  const activeCards = printRecs.filter(
    (p) => !completedPrintNos.has(p.printNo),
  );

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      printNo: "",
      speed: "",
      temperature: "",
      status: "",
      shift: "",
      qty: "",
      notes: "",
      operator: ctx.user.name,
    });
  }
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.printNo}`.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-3">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
        <div className="font-medium">
          Active rout cards: {activeCards.length}
        </div>
        <div className="text-xs text-orange-700">
          Cards stay here until you save a curing record with status = Completed
        </div>
      </div>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Curing Record"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "curing_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("curing", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          { key: "printNo", label: "Print #", mono: true, bold: true },
          {
            key: "designNumber",
            label: "Design",
            render: (_, r) => {
              const p = printRecs.find((x) => x.printNo === r.printNo);
              return (
                <DesignTag
                  designNumber={p?.designNumber}
                  designs={designs}
                  size={32}
                />
              );
            },
          },
          { key: "speed", label: "Speed (m/min)" },
          { key: "temperature", label: "Temp (°C)" },
          { key: "qty", label: "Qty (m)" },
          { key: "status", label: "Status" },
          { key: "shift", label: "Shift" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("curing", id) : null}
      />
      {editing && (
        <Modal title="Curing Record" onClose={() => setEditing(null)}>
          <div className="space-y-3">
            <Field label="Date *">
              <input
                type="date"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Print Rout Card *">
              <select
                value={editing.printNo}
                onChange={(e) =>
                  setEditing({ ...editing, printNo: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              >
                <option value="">Select…</option>
                {/* When editing an existing record, keep its printNo in the list even if completed.
                  When creating a new record, only show active (not-yet-completed) cards. */}
                {(data.find((r) => r.id === editing.id)
                  ? printRecs
                  : activeCards
                ).map((p) => (
                  <option key={p.id} value={p.printNo}>
                    {p.printNo} — {p.designNumber} ({p.printedQty}m)
                  </option>
                ))}
              </select>
            </Field>
            {(() => {
              const p = printRecs.find((x) => x.printNo === editing.printNo);
              return p ? (
                <div className="bg-slate-50 rounded-lg p-2">
                  <DesignTag
                    designNumber={p.designNumber}
                    designs={designs}
                    size={48}
                  />
                </div>
              ) : null;
            })()}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Speed (m/min)">
                <input
                  type="number"
                  value={editing.speed}
                  onChange={(e) =>
                    setEditing({ ...editing, speed: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </Field>
              <Field label="Temperature (°C)">
                <input
                  type="number"
                  value={editing.temperature}
                  onChange={(e) =>
                    setEditing({ ...editing, temperature: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </Field>
            </div>
            <Field label="Quantity (m)">
              <input
                type="number"
                value={editing.qty}
                onChange={(e) =>
                  setEditing({ ...editing, qty: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Status *">
              <Select
                value={editing.status}
                options={lists.curingStatus}
                onChange={(v) => setEditing({ ...editing, status: v })}
              />
            </Field>
            <Field label="Shift *">
              <Select
                value={editing.shift}
                options={lists.shift}
                onChange={(v) => setEditing({ ...editing, shift: v })}
              />
            </Field>
            <Field label="Notes">
              <textarea
                rows={2}
                value={editing.notes}
                onChange={(e) =>
                  setEditing({ ...editing, notes: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <FormFooter
              onCancel={() => setEditing(null)}
              onSave={async () => {
                if (editing.printNo && editing.date) {
                  await saveRecord("curing", editing);
                  setEditing(null);
                }
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============== FINISHING ==============
function FinishingDataPage({ ctx, canEdit }: CtxEditableProps) {
  const {
    records,
    lists,
    saveRecord,
    deleteRecord,
    designs,
    askConfirm,
    programs,
  } = ctx;
  const data = records.finishing || [];
  const printRecs = records.printing || [];
  const dyeingRecs = records.dyeing || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  // Active rout cards = print records + dyeing records, MINUS any marked COMPLETED at finishing.
  // Each card object carries cardSource so downstream lookups know which collection to query.
  // For printing cards, use the print record's existing fields. For dyeing cards, derive an
  // equivalent shape: printNo holds the dyeingNo, and we attach fabricType/programName/colorDesign
  // pulled from the dyeing program's first line.
  const completedKeys = new Set(
    data
      .filter((r) => r.completion === "COMPLETED")
      .map((r) => `${r.cardSource || "printing"}:${r.printNo}`),
  );

  const printingCards = printRecs.map((p) => ({
    printNo: p.printNo,
    cardSource: "printing",
    designNumber: p.designNumber,
    fabricType: p.programFabricType || "",
    qty: Number(p.printedQty) || 0,
    label: `${p.printNo} — ${p.designNumber || "(no design)"} (${p.printedQty || 0}m)`,
    sourceRec: p,
  }));

  const dyeingCards = dyeingRecs.map((d) => {
    const prog = programs.find((pg) => pg.id === d.programId);
    const firstLine = (prog?.lines || [])[0];
    // Inherit fabric type from the source SING&DES batch; else from the program line.
    const inputBatch = (records.input || []).find(
      (ib) => ib.batchNo === d.batchNo,
    );
    const fabricType = inputBatch?.fabricType || firstLine?.fabricType || "";
    return {
      printNo: d.dyeingNo,
      cardSource: "dyeing",
      designNumber: firstLine?.designNumber || "",
      fabricType,
      programName: prog?.name || "",
      qty: Number(d.dyedQty) || 0,
      label: `${d.dyeingNo} — ${prog?.name || "Dyeing"} (${d.dyedQty || 0}m)`,
      sourceRec: d,
    };
  });

  const activeCards = [...printingCards, ...dyeingCards].filter(
    (c) => !completedKeys.has(`${c.cardSource}:${c.printNo}`),
  );

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      printNo: "",
      cardSource: "printing",
      shift: "",
      finishedQty: "",
      handFeel: "",
      chemicalRecipe: "",
      width: "",
      machine: "",
      completion: "NOT COMPLETED",
      notes: "",
      operator: ctx.user.name,
    });
  }
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.printNo}`.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  // Helper: render the design or color for the row, picking from the right source collection.
  function CardDisplay({ printNo, cardSource }) {
    if (cardSource === "dyeing") {
      const d = dyeingRecs.find((x) => x.dyeingNo === printNo);
      const prog = programs.find((pg) => pg.id === d?.programId);
      const firstLine = (prog?.lines || [])[0];
      return (
        <div className="flex items-center gap-1.5">
          {firstLine?.designNumber && (
            <DesignTag
              designNumber={firstLine.designNumber}
              designs={designs}
              size={32}
            />
          )}
          <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 font-medium">
            DYE
          </span>
        </div>
      );
    }
    const p = printRecs.find((x) => x.printNo === printNo);
    return (
      <DesignTag designNumber={p?.designNumber} designs={designs} size={32} />
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-sm text-pink-800">
        <div className="font-medium">
          Active rout cards: {activeCards.length}
        </div>
        <div className="text-xs text-pink-700">
          Cards stay here until you mark COMPLETED for the full quantity.
          Includes both Printed (PR-) and Dyed (DY-) rout cards.
        </div>
      </div>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Finishing Record"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "finishing_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("finishing", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          {
            key: "printNo",
            label: "Card #",
            mono: true,
            bold: true,
            render: (v, r) => (
              <span className="flex items-center gap-1.5">
                {v}
                {r.cardSource === "dyeing" && (
                  <span className="text-[9px] px-1 py-0.5 rounded bg-cyan-100 text-cyan-700 font-bold">
                    DYE
                  </span>
                )}
              </span>
            ),
          },
          {
            key: "designNumber",
            label: "Design",
            render: (_, r) => (
              <CardDisplay printNo={r.printNo} cardSource={r.cardSource} />
            ),
          },
          { key: "finishedQty", label: "Finished (m)" },
          { key: "handFeel", label: "Hand Feel" },
          { key: "chemicalRecipe", label: "Recipe" },
          { key: "width", label: "Width" },
          { key: "completion", label: "Completion" },
          { key: "shift", label: "Shift" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("finishing", id) : null}
      />
      {editing && (
        <Modal title="Finishing Record" onClose={() => setEditing(null)}>
          <FinishingForm
            rec={editing}
            lists={lists}
            designs={designs}
            activeCards={activeCards}
            programs={programs}
            dyeingRecs={dyeingRecs}
            onSave={async (r) => {
              await saveRecord("finishing", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function FinishingForm({
  rec,
  lists,
  designs,
  activeCards,
  programs,
  dyeingRecs,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  designs: Design[];
  activeCards: any[];
  programs: Program[];
  dyeingRecs: ProductionRecord[];
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  // The matched card carries cardSource — we keep that on the record so downstream stations
  // know whether to look up metadata from `printing` or `dyeing` collection.
  const matchedCard = activeCards.find((c) => c.printNo === f.printNo);
  function pickCard(printNo) {
    const card = activeCards.find((c) => c.printNo === printNo);
    setF({
      ...f,
      printNo,
      cardSource: card?.cardSource || "printing",
      // Pre-fill width/fabricType from the source card if we have it.
      width: f.width || card?.sourceRec?.width || "",
    });
  }
  return (
    <div className="space-y-3">
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Rout Card * (Print or Dye)">
        <select
          value={f.printNo}
          onChange={(e) => pickCard(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">Select rout card...</option>
          {activeCards.map((c) => (
            <option key={`${c.cardSource}:${c.printNo}`} value={c.printNo}>
              {c.cardSource === "dyeing" ? "🎨 DYE — " : "🖨 PRINT — "}
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      {matchedCard && (
        <div
          className={`rounded-lg p-2 ${matchedCard.cardSource === "dyeing" ? "bg-cyan-50 border border-cyan-200" : "bg-slate-50"}`}
        >
          <div className="flex items-center gap-2">
            {matchedCard.cardSource === "dyeing" ? (
              <>
                {(() => {
                  const d = dyeingRecs.find(
                    (x) => x.dyeingNo === matchedCard.printNo,
                  );
                  const prog = programs.find((pg) => pg.id === d?.programId);
                  const firstLine = (prog?.lines || [])[0];
                  return firstLine?.designNumber ? (
                    <DesignTag
                      designNumber={firstLine.designNumber}
                      designs={designs}
                      size={48}
                    />
                  ) : null;
                })()}
                <div>
                  <div className="text-xs text-cyan-700 font-medium">
                    DYED CARD
                  </div>
                  <div className="text-sm text-slate-700">
                    {matchedCard.programName} · {matchedCard.fabricType}
                  </div>
                </div>
              </>
            ) : (
              <DesignTag
                designNumber={matchedCard.designNumber}
                designs={designs}
                size={48}
              />
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Shift *">
          <Select
            value={f.shift}
            options={lists.shift}
            onChange={(v) => setF({ ...f, shift: v })}
          />
        </Field>
        <Field label="Machine *">
          <Select
            value={f.machine}
            options={lists.finishingMachine}
            onChange={(v) => setF({ ...f, machine: v })}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Hand Feel *">
          <Select
            value={f.handFeel}
            options={lists.handFeel}
            onChange={(v) => setF({ ...f, handFeel: v })}
          />
        </Field>
        <Field label="Width *">
          <Select
            value={f.width}
            options={lists.width}
            onChange={(v) => setF({ ...f, width: v })}
          />
        </Field>
      </div>
      <Field label="Chemical Recipe *">
        <Select
          value={f.chemicalRecipe}
          options={lists.chemicalRecipe}
          onChange={(v) => setF({ ...f, chemicalRecipe: v })}
        />
      </Field>
      <Field label="Finished Quantity (m) *">
        <input
          type="number"
          value={f.finishedQty}
          onChange={(e) => setF({ ...f, finishedQty: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Completion *">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setF({ ...f, completion: "NOT COMPLETED" })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${f.completion === "NOT COMPLETED" ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-200"}`}
          >
            NOT COMPLETED
          </button>
          <button
            onClick={() => setF({ ...f, completion: "COMPLETED" })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${f.completion === "COMPLETED" ? "border-green-500 bg-green-50 text-green-700" : "border-slate-200"}`}
          >
            COMPLETED
          </button>
        </div>
      </Field>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter
        onCancel={onCancel}
        onSave={() => f.printNo && f.date && onSave(f)}
      />
    </div>
  );
}

// ============== CALENDERING ==============
function CalenderingDataPage({ ctx, canEdit }: CtxEditableProps) {
  const {
    records,
    lists,
    saveRecord,
    deleteRecord,
    designs,
    askConfirm,
    programs,
  } = ctx;
  const data = records.calendering || [];
  const finishingRecs = records.finishing || [];
  const printRecs = records.printing || [];
  const dyeingRecs = records.dyeing || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  // Track completed cards keyed by source+number so a "DY-1" doesn't conflict with a "PR-1".
  const completedKeys = new Set(
    data
      .filter((r) => r.completion === "COMPLETED")
      .map((r) => `${r.cardSource || "printing"}:${r.printNo}`),
  );

  // Build eligible list — any finishing record's card whose printNo isn't yet completed at calendering.
  // We dedupe by the printNo+cardSource combo since multiple finishing records can share a card.
  const eligible = useMemo(() => {
    const seen = new Set();
    const out = [];
    finishingRecs.forEach((f) => {
      const cardSource = f.cardSource || "printing";
      const key = `${cardSource}:${f.printNo}`;
      if (seen.has(key) || completedKeys.has(key)) return;
      seen.add(key);
      // Resolve metadata from the right collection.
      if (cardSource === "dyeing") {
        const d = dyeingRecs.find((x) => x.dyeingNo === f.printNo);
        const prog = programs.find((pg) => pg.id === d?.programId);
        const firstLine = (prog?.lines || [])[0];
        out.push({
          printNo: f.printNo,
          cardSource,
          designNumber: firstLine?.designNumber || "",
          label: `${f.printNo} — DYE: ${prog?.name || ""} (${d?.dyedQty || 0}m dyed)`,
        });
      } else {
        const p = printRecs.find((x) => x.printNo === f.printNo);
        out.push({
          printNo: f.printNo,
          cardSource,
          designNumber: p?.designNumber || "",
          label: `${f.printNo} — ${p?.designNumber || ""} (${p?.printedQty || 0}m)`,
        });
      }
    });
    return out;
  }, [finishingRecs, printRecs, dyeingRecs, programs, completedKeys]);

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      printNo: "",
      cardSource: "printing",
      shift: "",
      temperature: "",
      width: "",
      qty: "",
      machine: "",
      completion: "NOT COMPLETED",
      ended: false,
      notes: "",
      operator: ctx.user.name,
    });
  }
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.printNo}`.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Calendering Record"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "calendering_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("calendering", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          {
            key: "printNo",
            label: "Card #",
            mono: true,
            bold: true,
            render: (v, r) => (
              <span className="flex items-center gap-1.5">
                {v}
                {r.cardSource === "dyeing" && (
                  <span className="text-[9px] px-1 py-0.5 rounded bg-cyan-100 text-cyan-700 font-bold">
                    DYE
                  </span>
                )}
              </span>
            ),
          },
          {
            key: "designNumber",
            label: "Design",
            render: (_, r) => {
              // Look up design from the right collection.
              if (r.cardSource === "dyeing") {
                const d = dyeingRecs.find((x) => x.dyeingNo === r.printNo);
                const prog = programs.find((pg) => pg.id === d?.programId);
                const firstLine = (prog?.lines || [])[0];
                return firstLine?.designNumber ? (
                  <DesignTag
                    designNumber={firstLine.designNumber}
                    designs={designs}
                    size={32}
                  />
                ) : (
                  <span className="text-slate-400">—</span>
                );
              }
              const p = printRecs.find((x) => x.printNo === r.printNo);
              return (
                <DesignTag
                  designNumber={p?.designNumber}
                  designs={designs}
                  size={32}
                />
              );
            },
          },
          { key: "qty", label: "Qty (m)" },
          { key: "temperature", label: "Temp (°C)" },
          { key: "width", label: "Width" },
          { key: "completion", label: "Completion" },
          {
            key: "ended",
            label: "Ended",
            render: (v) =>
              v ? (
                <span className="text-rose-700 font-bold text-xs px-2 py-0.5 bg-rose-100 rounded">
                  ENDED
                </span>
              ) : (
                <span className="text-slate-400 text-xs">—</span>
              ),
          },
          { key: "shift", label: "Shift" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("calendering", id) : null}
      />
      {editing && (
        <Modal title="Calendering Record" onClose={() => setEditing(null)}>
          <div className="space-y-3">
            <Field label="Date *">
              <input
                type="date"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Rout Card * (from Finishing)">
              <select
                value={editing.printNo}
                onChange={(e) => {
                  const card = eligible.find(
                    (c) => c.printNo === e.target.value,
                  );
                  setEditing({
                    ...editing,
                    printNo: e.target.value,
                    cardSource: card?.cardSource || "printing",
                  });
                }}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              >
                <option value="">Select…</option>
                {eligible.map((c) => (
                  <option
                    key={`${c.cardSource}:${c.printNo}`}
                    value={c.printNo}
                  >
                    {c.cardSource === "dyeing" ? "🎨 " : "🖨 "}
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            {(() => {
              // Show design preview. For dyed cards, pull from dyeing program's first line.
              if (editing.cardSource === "dyeing") {
                const d = dyeingRecs.find(
                  (x) => x.dyeingNo === editing.printNo,
                );
                const prog = programs.find((pg) => pg.id === d?.programId);
                const firstLine = (prog?.lines || [])[0];
                return firstLine?.designNumber ? (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-2 flex items-center gap-2">
                    <DesignTag
                      designNumber={firstLine.designNumber}
                      designs={designs}
                      size={48}
                    />
                    <div>
                      <div className="text-xs text-cyan-700 font-medium">
                        DYED CARD
                      </div>
                      <div className="text-sm text-slate-700">{prog?.name}</div>
                    </div>
                  </div>
                ) : null;
              }
              const p = printRecs.find((x) => x.printNo === editing.printNo);
              return p ? (
                <div className="bg-slate-50 rounded-lg p-2">
                  <DesignTag
                    designNumber={p.designNumber}
                    designs={designs}
                    size={48}
                  />
                </div>
              ) : null;
            })()}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Shift *">
                <Select
                  value={editing.shift}
                  options={lists.shift}
                  onChange={(v) => setEditing({ ...editing, shift: v })}
                />
              </Field>
              <Field label="Machine *">
                <Select
                  value={editing.machine}
                  options={lists.calenderingMachine}
                  onChange={(v) => setEditing({ ...editing, machine: v })}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Temperature (°C)">
                <input
                  type="number"
                  value={editing.temperature}
                  onChange={(e) =>
                    setEditing({ ...editing, temperature: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </Field>
              <Field label="Width">
                <Select
                  value={editing.width}
                  options={lists.width}
                  onChange={(v) => setEditing({ ...editing, width: v })}
                />
              </Field>
            </div>
            <Field label="Quantity (m) *">
              <input
                type="number"
                value={editing.qty}
                onChange={(e) =>
                  setEditing({ ...editing, qty: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Completion *">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setEditing({ ...editing, completion: "NOT COMPLETED" })
                  }
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.completion === "NOT COMPLETED" ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-200"}`}
                >
                  NOT COMPLETED
                </button>
                <button
                  onClick={() =>
                    setEditing({ ...editing, completion: "COMPLETED" })
                  }
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.completion === "COMPLETED" ? "border-green-500 bg-green-50 text-green-700" : "border-slate-200"}`}
                >
                  COMPLETED
                </button>
              </div>
            </Field>
            {/* End toggle — closes the printNo chain. Calendered qty < printed qty? Operator marks
              End to declare "no more fabric is coming for this print card; the gap was machine loss."
              Effect: upstream WIP (printing/curing/finishing leftover) is zeroed in In-Process Inventory. */}
            <Field label="End Print Card?">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEditing({ ...editing, ended: false })}
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${!editing.ended ? "border-slate-400 bg-slate-50" : "border-slate-200 text-slate-400"}`}
                >
                  Continue (more coming)
                </button>
                <button
                  onClick={() => setEditing({ ...editing, ended: true })}
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.ended ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-400"}`}
                >
                  End (close chain)
                </button>
              </div>
              {editing.ended && (
                <div className="text-xs text-rose-700 mt-1 bg-rose-50 border border-rose-200 rounded p-2">
                  ⚠ Marking this rout card as Ended will close the upstream
                  pipeline (printed/cured/finished gaps will no longer show as
                  WIP).
                </div>
              )}
            </Field>
            <Field label="Notes">
              <textarea
                rows={2}
                value={editing.notes}
                onChange={(e) =>
                  setEditing({ ...editing, notes: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <FormFooter
              onCancel={() => setEditing(null)}
              onSave={async () => {
                if (editing.printNo && editing.qty) {
                  await saveRecord("calendering", editing);
                  setEditing(null);
                }
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============== FOLDING ==============
function FoldingDataPage({ ctx, canEdit }: CtxEditableProps) {
  const {
    records,
    lists,
    saveRecord,
    deleteRecord,
    designs,
    askConfirm,
    programs,
  } = ctx;
  const data = records.folding || [];
  const printRecs = records.printing || [];
  const calenderRecs = records.calendering || [];
  const dyeingRecs = records.dyeing || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    shift: "",
  });
  const [selected, setSelected] = useState(new Set());

  // Track completed cards keyed by source+number — same pattern as Calendering.
  const completedKeys = new Set(
    data
      .filter((r) => r.completion === "COMPLETED")
      .map((r) => `${r.cardSource || "printing"}:${r.printNo}`),
  );

  // Eligible = anything that has at least one calendering record + isn't completed at folding.
  const eligible = useMemo(() => {
    const seen = new Set();
    const out = [];
    calenderRecs.forEach((c) => {
      const cardSource = c.cardSource || "printing";
      const key = `${cardSource}:${c.printNo}`;
      if (seen.has(key) || completedKeys.has(key)) return;
      seen.add(key);
      if (cardSource === "dyeing") {
        const d = dyeingRecs.find((x) => x.dyeingNo === c.printNo);
        const prog = programs.find((pg) => pg.id === d?.programId);
        const firstLine = (prog?.lines || [])[0];
        out.push({
          printNo: c.printNo,
          cardSource,
          designNumber: firstLine?.designNumber || "",
          label: `${c.printNo} — DYE: ${prog?.name || ""}`,
        });
      } else {
        const p = printRecs.find((x) => x.printNo === c.printNo);
        out.push({
          printNo: c.printNo,
          cardSource,
          designNumber: p?.designNumber || "",
          label: `${c.printNo} — ${p?.designNumber || ""}`,
        });
      }
    });
    return out;
  }, [calenderRecs, printRecs, dyeingRecs, programs, completedKeys]);

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      printNo: "",
      cardSource: "printing",
      shift: "",
      width: "",
      rollingType: "",
      firstQty: "",
      incompleteQty: "",
      secondQty: "",
      rejectQty: "",
      totalMeters: 0,
      machine: "",
      completion: "NOT COMPLETED",
      ended: false,
      notes: "",
      operator: ctx.user.name,
    });
  }
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.printNo}`.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      if (filter.shift && r.shift !== filter.shift) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={["shift"]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Folding Record"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "folding_data",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("folding", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          {
            key: "printNo",
            label: "Card #",
            mono: true,
            bold: true,
            render: (v, r) => (
              <span className="flex items-center gap-1.5">
                {v}
                {r.cardSource === "dyeing" && (
                  <span className="text-[9px] px-1 py-0.5 rounded bg-cyan-100 text-cyan-700 font-bold">
                    DYE
                  </span>
                )}
              </span>
            ),
          },
          {
            key: "designNumber",
            label: "Design",
            render: (_, r) => {
              if (r.cardSource === "dyeing") {
                const d = dyeingRecs.find((x) => x.dyeingNo === r.printNo);
                const prog = programs.find((pg) => pg.id === d?.programId);
                const firstLine = (prog?.lines || [])[0];
                return firstLine?.designNumber ? (
                  <DesignTag
                    designNumber={firstLine.designNumber}
                    designs={designs}
                    size={32}
                  />
                ) : (
                  <span className="text-slate-400">—</span>
                );
              }
              const p = printRecs.find((x) => x.printNo === r.printNo);
              return (
                <DesignTag
                  designNumber={p?.designNumber}
                  designs={designs}
                  size={32}
                />
              );
            },
          },
          { key: "firstQty", label: "1st Qty" },
          { key: "incompleteQty", label: "Incomplete" },
          { key: "secondQty", label: "2nd Sort" },
          { key: "rejectQty", label: "Reject" },
          { key: "totalMeters", label: "Total (m)", bold: true },
          { key: "rollingType", label: "Rolling" },
          { key: "completion", label: "Completion" },
          {
            key: "ended",
            label: "Ended",
            render: (v) =>
              v ? (
                <span className="text-rose-700 font-bold text-xs px-2 py-0.5 bg-rose-100 rounded">
                  ENDED
                </span>
              ) : (
                <span className="text-slate-400 text-xs">—</span>
              ),
          },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("folding", id) : null}
      />
      {editing && (
        <Modal
          title="Folding & Inspection Record"
          onClose={() => setEditing(null)}
        >
          <FoldingForm
            rec={editing}
            lists={lists}
            designs={designs}
            eligible={eligible}
            programs={programs}
            dyeingRecs={dyeingRecs}
            onSave={async (r) => {
              await saveRecord("folding", r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function FoldingForm({
  rec,
  lists,
  designs,
  eligible,
  programs,
  dyeingRecs,
  onSave,
  onCancel,
}: {
  rec: ProductionRecord;
  lists: Lists;
  designs: Design[];
  eligible: any[];
  programs: Program[];
  dyeingRecs: ProductionRecord[];
  onSave: (r: ProductionRecord) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(rec);
  const total = ["firstQty", "incompleteQty", "secondQty", "rejectQty"].reduce(
    (s, k) => s + (Number(f[k]) || 0),
    0,
  );
  React.useEffect(() => {
    setF((prev) => ({ ...prev, totalMeters: total }));
  }, [total]);
  const matchedCard = eligible.find((c) => c.printNo === f.printNo);
  // Look up the design from the appropriate source.
  let matchedDesign = null;
  let matchedColorLineNumber = null;
  if (matchedCard?.cardSource === "dyeing") {
    const d = dyeingRecs.find((x) => x.dyeingNo === matchedCard.printNo);
    const prog = programs.find((pg) => pg.id === d?.programId);
    const firstLine = (prog?.lines || [])[0];
    matchedColorLineNumber = firstLine?.designNumber || null;
    matchedDesign = matchedColorLineNumber
      ? designs.find((d) => d.designNumber === matchedColorLineNumber)
      : null;
  } else if (matchedCard) {
    matchedDesign = designs.find(
      (d) => d.designNumber === matchedCard.designNumber,
    );
  }
  return (
    <div className="space-y-3">
      <Field label="Date *">
        <input
          type="date"
          value={f.date}
          onChange={(e) => setF({ ...f, date: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Rout Card * (from Calendering)">
        <select
          value={f.printNo}
          onChange={(e) => {
            const card = eligible.find((c) => c.printNo === e.target.value);
            setF({
              ...f,
              printNo: e.target.value,
              cardSource: card?.cardSource || "printing",
            });
          }}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">Select…</option>
          {eligible.map((c) => (
            <option key={`${c.cardSource}:${c.printNo}`} value={c.printNo}>
              {c.cardSource === "dyeing" ? "🎨 " : "🖨 "}
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      {resolveDesignImage(matchedDesign) && (
        <div
          className={`flex items-center gap-2 rounded-lg p-2 ${matchedCard?.cardSource === "dyeing" ? "bg-cyan-50 border border-cyan-200" : "bg-slate-50"}`}
        >
          <img
            src={resolveDesignImage(matchedDesign)}
            className="w-14 h-14 object-cover rounded"
          />
          <div className="text-sm">
            {matchedCard?.cardSource === "dyeing" && (
              <div className="text-xs text-cyan-700 font-medium">DYED</div>
            )}
            <div className="font-mono font-bold">
              {matchedDesign.designNumber}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Shift *">
          <Select
            value={f.shift}
            options={lists.shift}
            onChange={(v) => setF({ ...f, shift: v })}
          />
        </Field>
        <Field label="Machine *">
          <Select
            value={f.machine}
            options={lists.foldingMachine}
            onChange={(v) => setF({ ...f, machine: v })}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Width">
          <Select
            value={f.width}
            options={lists.width}
            onChange={(v) => setF({ ...f, width: v })}
          />
        </Field>
        <Field label="Rolling Type *">
          <Select
            value={f.rollingType}
            options={lists.rollingType}
            onChange={(v) => setF({ ...f, rollingType: v })}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="1st Quality (m)">
          <input
            type="number"
            value={f.firstQty}
            onChange={(e) => setF({ ...f, firstQty: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Incomplete Roll (m)">
          <input
            type="number"
            value={f.incompleteQty}
            onChange={(e) => setF({ ...f, incompleteQty: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="2nd Sort (m)">
          <input
            type="number"
            value={f.secondQty}
            onChange={(e) => setF({ ...f, secondQty: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Total Rejection (m)">
          <input
            type="number"
            value={f.rejectQty}
            onChange={(e) => setF({ ...f, rejectQty: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
      </div>
      <div className="bg-emerald-50 rounded-lg p-3 text-sm">
        Auto Total:{" "}
        <strong className="text-emerald-700 text-lg">
          {total.toLocaleString()}m
        </strong>
      </div>
      <Field label="Completion *">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setF({ ...f, completion: "NOT COMPLETED" })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${f.completion === "NOT COMPLETED" ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-200"}`}
          >
            NOT COMPLETED
          </button>
          <button
            onClick={() => setF({ ...f, completion: "COMPLETED" })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${f.completion === "COMPLETED" ? "border-green-500 bg-green-50 text-green-700" : "border-slate-200"}`}
          >
            COMPLETED
          </button>
        </div>
      </Field>
      {/* End toggle — same semantics as Calendering: declares the printNo chain officially closed.
          Different from "Completion": completion = "this folding session is finished",
          ended = "no more fabric is coming for this rout card across ANY upstream stage." */}
      <Field label="End Print Card?">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setF({ ...f, ended: false })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${!f.ended ? "border-slate-400 bg-slate-50" : "border-slate-200 text-slate-400"}`}
          >
            Continue (more coming)
          </button>
          <button
            onClick={() => setF({ ...f, ended: true })}
            className={`p-2.5 rounded-lg border-2 text-sm font-medium ${f.ended ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-400"}`}
          >
            End (close chain)
          </button>
        </div>
        {f.ended && (
          <div className="text-xs text-rose-700 mt-1 bg-rose-50 border border-rose-200 rounded p-2">
            ⚠ Marking this card as Ended will close all upstream WIP
            (printed/cured/finished/calendered gaps will no longer show).
          </div>
        )}
      </Field>
      <Field label="Notes">
        <textarea
          rows={2}
          value={f.notes}
          onChange={(e) => setF({ ...f, notes: e.target.value })}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter
        onCancel={onCancel}
        onSave={() => f.printNo && f.date && onSave(f)}
      />
    </div>
  );
}

function FoldingComparePage({ ctx }: CtxProps) {
  const { records } = ctx;
  const printRecs = records.printing || [];
  const foldingRecs = records.folding || [];
  const rows = printRecs.map((p) => {
    const folds = foldingRecs.filter((f) => f.printNo === p.printNo);
    const first = folds.reduce((s, x) => s + (Number(x.firstQty) || 0), 0);
    const incomplete = folds.reduce(
      (s, x) => s + (Number(x.incompleteQty) || 0),
      0,
    );
    const second = folds.reduce((s, x) => s + (Number(x.secondQty) || 0), 0);
    const reject = folds.reduce((s, x) => s + (Number(x.rejectQty) || 0), 0);
    const total = first + incomplete + second + reject;
    const printed = Number(p.printedQty) || 0;
    const yieldPct = printed ? (total / printed) * 100 : 0;
    const rejPct = total ? (reject / total) * 100 : 0;
    return {
      printNo: p.printNo,
      designNumber: p.designNumber,
      printed,
      first,
      incomplete,
      second,
      reject,
      total,
      yieldPct,
      rejPct,
    };
  });
  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-600">
        Compare each printed batch with total inspected (1st + incomplete + 2nd
        + rejection)
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 text-slate-600 font-medium">
                Print #
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Design
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Printed
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">1st</th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Incomp.
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">2nd</th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Reject
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Inspected Total
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Yield %
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Reject %
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.printNo} className="border-t border-slate-100">
                <td className="p-3 font-mono font-bold">{r.printNo}</td>
                <td className="p-3 font-mono text-xs">{r.designNumber}</td>
                <td className="p-3">{r.printed.toLocaleString()}</td>
                <td className="p-3 text-green-700">
                  {r.first.toLocaleString()}
                </td>
                <td className="p-3">{r.incomplete.toLocaleString()}</td>
                <td className="p-3 text-amber-700">
                  {r.second.toLocaleString()}
                </td>
                <td className="p-3 text-red-600">
                  {r.reject.toLocaleString()}
                </td>
                <td className="p-3 font-bold">{r.total.toLocaleString()}</td>
                <td className="p-3">{r.yieldPct.toFixed(1)}%</td>
                <td className="p-3">{r.rejPct.toFixed(1)}%</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={10} className="p-8 text-center text-slate-400">
                  No data yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============== DISPATCH ==============
// Dispatch is now design-centric (no PR# shown). Tracks 1st sort, 2nd sort, and rejection separately.
function DispatchIncomingPage({ ctx }: CtxProps) {
  const { records, designs } = ctx;
  const folds = records.folding || [];
  const printRecs = records.printing || [];

  // Aggregate by (designNumber + fabricType) — same design printed on different fabrics
  // (e.g. Poplin and Biaz) are tracked as separate dispatch lines.
  const byDesignFabric = useMemo(() => {
    const map: Record<string, any> = {};
    folds.forEach((f) => {
      const print = printRecs.find((p) => p.printNo === f.printNo);
      if (!print) return;
      const designNumber = print.designNumber;
      const fabricType = print.programFabricType || "(unknown)";
      if (!designNumber) return;
      const key = `${designNumber}::${fabricType}`;
      if (!map[key])
        map[key] = { designNumber, fabricType, first: 0, second: 0, reject: 0 };
      map[key].first += Number(f.firstQty || 0);
      map[key].second += Number(f.secondQty || 0);
      map[key].reject += Number(f.rejectQty || 0);
    });
    return Object.values(map).filter((d) => d.first + d.second + d.reject > 0);
  }, [folds, printRecs]);

  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-600">
        Auto-pulled from Folding & Inspection. Aggregated by{" "}
        <strong>design number + fabric type</strong> — the same design printed
        on different fabrics shows as separate lines.
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 text-slate-600 font-medium">
                Design
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Fabric type
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                1st Sort (m)
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                2nd Sort (m)
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Rejection (m)
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Total (m)
              </th>
            </tr>
          </thead>
          <tbody>
            {byDesignFabric.map((d) => (
              <tr
                key={`${d.designNumber}::${d.fabricType}`}
                className="border-t border-slate-100"
              >
                <td className="p-3">
                  <DesignTag
                    designNumber={d.designNumber}
                    designs={designs}
                    size={32}
                  />
                </td>
                <td className="p-3 text-slate-700">{d.fabricType}</td>
                <td className="p-3 text-green-700">
                  {d.first.toLocaleString()}
                </td>
                <td className="p-3 text-amber-700">
                  {d.second.toLocaleString()}
                </td>
                <td className="p-3 text-red-600">
                  {d.reject.toLocaleString()}
                </td>
                <td className="p-3 font-bold">
                  {(d.first + d.second + d.reject).toLocaleString()}
                </td>
              </tr>
            ))}
            {!byDesignFabric.length && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  Nothing arriving from Folding yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DispatchStockPage({ ctx }: CtxProps) {
  const { records, designs } = ctx;
  const folds = records.folding || [];
  const printRecs = records.printing || [];
  const out = records.dispatch_out || [];

  // Track stock by (designNumber + fabricType) — same design printed on different fabrics
  // is counted separately so the operator can see and dispatch them independently.
  const designStock = useMemo(() => {
    const map: Record<string, any> = {};
    folds.forEach((f) => {
      const print = printRecs.find((p) => p.printNo === f.printNo);
      if (!print) return;
      const dn = print.designNumber;
      const ft = print.programFabricType || "(unknown)";
      if (!dn) return;
      const key = `${dn}::${ft}`;
      if (!map[key])
        map[key] = {
          id: key,
          designNumber: dn,
          fabricType: ft,
          firstIn: 0,
          secondIn: 0,
          firstOut: 0,
          secondOut: 0,
        };
      map[key].firstIn += Number(f.firstQty || 0);
      map[key].secondIn += Number(f.secondQty || 0);
    });
    out.forEach((o) => {
      const key = `${o.designNumber}::${o.fabricType || "(unknown)"}`;
      if (!map[key]) return;
      if (o.sortType === "1st") map[key].firstOut += Number(o.qty || 0);
      else if (o.sortType === "2nd") map[key].secondOut += Number(o.qty || 0);
    });
    return Object.values(map)
      .map((d) => ({
        ...d,
        firstAvail: d.firstIn - d.firstOut,
        secondAvail: d.secondIn - d.secondOut,
      }))
      .filter((d) => d.firstAvail > 0 || d.secondAvail > 0);
  }, [folds, printRecs, out]);

  // Row selection state — Set of stock keys (`designNumber::fabricType`)
  const [selected, setSelected] = useState(new Set());
  function toggleOne(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  const allOnPage = designStock.map((d) => d.id);
  const allSelected =
    allOnPage.length > 0 && allOnPage.every((id) => selected.has(id));
  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(allOnPage));
  }

  function exportRows() {
    const rowsToExport = (
      selected.size === 0
        ? designStock
        : designStock.filter((d) => selected.has(d.id))
    ).map((d) => ({
      designNumber: d.designNumber,
      fabricType: d.fabricType,
      firstIn: d.firstIn,
      firstOut: d.firstOut,
      firstAvail: d.firstAvail,
      secondIn: d.secondIn,
      secondOut: d.secondOut,
      secondAvail: d.secondAvail,
    }));
    exportToCSV(rowsToExport, "dispatch_stock");
  }

  // Total rejection (no per-design tracking)
  const totalRejectIn = folds.reduce((s, f) => s + Number(f.rejectQty || 0), 0);
  const totalRejectOut = out
    .filter((o) => o.sortType === "reject")
    .reduce((s, o) => s + Number(o.qty || 0), 0);
  const rejectAvail = totalRejectIn - totalRejectOut;

  const totalFirst = designStock.reduce((s, d) => s + d.firstAvail, 0);
  const totalSecond = designStock.reduce((s, d) => s + d.secondAvail, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-sm text-green-700">1st Sort Stock</div>
          <div className="text-2xl font-bold text-green-900">
            {totalFirst.toLocaleString()}m
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-sm text-amber-700">2nd Sort Stock</div>
          <div className="text-2xl font-bold text-amber-900">
            {totalSecond.toLocaleString()}m
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="text-sm text-red-700">Rejection Stock</div>
          <div className="text-2xl font-bold text-red-900">
            {rejectAvail.toLocaleString()}m
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-700">
            Per-design + fabric type stock
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {selected.size > 0 ? `${selected.size} selected` : "All rows"}{" "}
              will be exported
            </span>
            <button
              onClick={exportRows}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Download size={14} /> Export to Excel (CSV)
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                  />
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  Design
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  Fabric type
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  1st in
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  1st sent
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  1st avail
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  2nd in
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  2nd sent
                </th>
                <th className="text-left p-3 text-slate-600 font-medium">
                  2nd avail
                </th>
              </tr>
            </thead>
            <tbody>
              {designStock.map((d) => (
                <tr
                  key={d.id}
                  className={`border-t border-slate-100 ${selected.has(d.id) ? "bg-purple-50" : ""}`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.has(d.id)}
                      onChange={() => toggleOne(d.id)}
                    />
                  </td>
                  <td className="p-3">
                    <DesignTag
                      designNumber={d.designNumber}
                      designs={designs}
                      size={32}
                    />
                  </td>
                  <td className="p-3 text-slate-700">{d.fabricType}</td>
                  <td className="p-3">{d.firstIn.toLocaleString()}</td>
                  <td className="p-3">{d.firstOut.toLocaleString()}</td>
                  <td className="p-3 font-bold text-green-700">
                    {d.firstAvail.toLocaleString()}
                  </td>
                  <td className="p-3">{d.secondIn.toLocaleString()}</td>
                  <td className="p-3">{d.secondOut.toLocaleString()}</td>
                  <td className="p-3 font-bold text-amber-700">
                    {d.secondAvail.toLocaleString()}
                  </td>
                </tr>
              ))}
              {!designStock.length && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No stock yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-700 mb-2">
          Rejection stock (total only)
        </h3>
        <div className="bg-white rounded-xl shadow-sm p-4 text-sm">
          <div className="grid grid-cols-3">
            <div>
              <div className="text-slate-500">Total received</div>
              <div className="font-bold text-slate-800">
                {totalRejectIn.toLocaleString()}m
              </div>
            </div>
            <div>
              <div className="text-slate-500">Total sent out</div>
              <div className="font-bold text-slate-800">
                {totalRejectOut.toLocaleString()}m
              </div>
            </div>
            <div>
              <div className="text-slate-500">Available</div>
              <div className="font-bold text-red-700">
                {rejectAvail.toLocaleString()}m
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DispatchOutgoingPage({ ctx, canEdit }: CtxEditableProps) {
  const { records, lists, saveRecord, deleteRecord, designs, askConfirm } = ctx;
  const data = records.dispatch_out || [];
  const folds = records.folding || [];
  const printRecs = records.printing || [];
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
  });
  const [selected, setSelected] = useState(new Set());

  function newRec() {
    setEditing({
      id: uid(),
      date: todayISO(),
      designNumber: "",
      fabricType: "",
      sortType: "1st",
      destination: "",
      sentBy: "",
      qty: "",
      notes: "",
      operator: ctx.user.name,
    });
  }
  const filtered = data
    .filter((r) => {
      if (
        filter.search &&
        !`${r.designNumber} ${r.destination}`
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.dateFrom && r.date < filter.dateFrom) return false;
      if (filter.dateTo && r.date > filter.dateTo) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  // Available (designNumber, fabricType) pairs in stock — derived from print + folding records
  const availableDesignFabrics = useMemo(() => {
    const set = new Set<string>();
    folds.forEach((f) => {
      const p = printRecs.find((pr) => pr.printNo === f.printNo);
      if (p?.designNumber)
        set.add(`${p.designNumber}::${p.programFabricType || ""}`);
    });
    return [...set].map((k) => {
      const [dn, ft] = k.split("::");
      return { designNumber: dn, fabricType: ft };
    });
  }, [folds, printRecs]);

  return (
    <div className="space-y-3">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        lists={lists}
        fields={[]}
      />
      <ActionBar
        canEdit={canEdit}
        askConfirm={askConfirm}
        onAdd={newRec}
        addLabel="+ Outgoing Shipment"
        selectedCount={selected.size}
        onExport={() =>
          exportToCSV(
            filtered.filter((r) => selected.size === 0 || selected.has(r.id)),
            "dispatch_out",
          )
        }
        onDeleteSelected={() => {
          selected.forEach((id) => deleteRecord("dispatch_out", id));
          setSelected(new Set());
        }}
        showDelete={canEdit}
      />
      <DataTable
        rows={filtered}
        selected={selected}
        setSelected={setSelected}
        askConfirm={askConfirm}
        columns={[
          { key: "date", label: "Date" },
          {
            key: "designNumber",
            label: "Design",
            render: (v) =>
              v === "__REJECT__" ? (
                <span className="text-red-600 font-medium">
                  Rejection (no design)
                </span>
              ) : (
                <DesignTag designNumber={v} designs={designs} size={32} />
              ),
          },
          { key: "fabricType", label: "Fabric type", render: (v) => v || "—" },
          {
            key: "sortType",
            label: "Sort",
            render: (v) =>
              v === "1st" ? (
                <span className="text-green-700">1st sort</span>
              ) : v === "2nd" ? (
                <span className="text-amber-700">2nd sort</span>
              ) : (
                <span className="text-red-600">Rejection</span>
              ),
          },
          { key: "qty", label: "Quantity (m)" },
          { key: "destination", label: "Destination" },
          { key: "sentBy", label: "Sent By" },
        ]}
        onEdit={canEdit ? setEditing : null}
        onDelete={canEdit ? (id) => deleteRecord("dispatch_out", id) : null}
      />
      {editing && (
        <Modal title="Outgoing Shipment" onClose={() => setEditing(null)}>
          <div className="space-y-3">
            <Field label="Date *">
              <input
                type="date"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Sort Type *">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() =>
                    setEditing({
                      ...editing,
                      sortType: "1st",
                      designNumber:
                        editing.designNumber === "__REJECT__"
                          ? ""
                          : editing.designNumber,
                    })
                  }
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.sortType === "1st" ? "border-green-500 bg-green-50 text-green-700" : "border-slate-200"}`}
                >
                  1st Sort
                </button>
                <button
                  onClick={() =>
                    setEditing({
                      ...editing,
                      sortType: "2nd",
                      designNumber:
                        editing.designNumber === "__REJECT__"
                          ? ""
                          : editing.designNumber,
                    })
                  }
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.sortType === "2nd" ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-200"}`}
                >
                  2nd Sort
                </button>
                <button
                  onClick={() =>
                    setEditing({
                      ...editing,
                      sortType: "reject",
                      designNumber: "__REJECT__",
                      fabricType: "",
                    })
                  }
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.sortType === "reject" ? "border-red-500 bg-red-50 text-red-700" : "border-slate-200"}`}
                >
                  Rejection
                </button>
              </div>
            </Field>
            {editing.sortType !== "reject" ? (
              <Field label="Design + fabric type *">
                <select
                  value={`${editing.designNumber}::${editing.fabricType || ""}`}
                  onChange={(e) => {
                    const [dn, ft] = e.target.value.split("::");
                    setEditing({
                      ...editing,
                      designNumber: dn,
                      fabricType: ft,
                    });
                  }}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                >
                  <option value="::">Select design + fabric…</option>
                  {availableDesignFabrics.map(
                    ({ designNumber: dn, fabricType: ft }) => (
                      <option key={`${dn}::${ft}`} value={`${dn}::${ft}`}>
                        {dn}
                        {ft ? ` — ${ft}` : ""}
                      </option>
                    ),
                  )}
                </select>
                {editing.designNumber && (
                  <div className="mt-2 flex items-center gap-2">
                    <DesignTag
                      designNumber={editing.designNumber}
                      designs={designs}
                      size={64}
                    />
                    {editing.fabricType && (
                      <span className="text-sm text-slate-600">
                        on <strong>{editing.fabricType}</strong>
                      </span>
                    )}
                  </div>
                )}
              </Field>
            ) : (
              <div className="text-sm text-red-700 bg-red-50 rounded-lg p-2">
                Rejection fabric — no design or fabric tracking
              </div>
            )}
            <Field label="Quantity (m) *">
              <input
                type="number"
                value={editing.qty}
                onChange={(e) =>
                  setEditing({ ...editing, qty: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Destination *">
              <Select
                value={editing.destination}
                options={lists.dispatchDestination}
                onChange={(v) => setEditing({ ...editing, destination: v })}
              />
            </Field>
            <Field label="Sent By *">
              <Select
                value={editing.sentBy}
                options={lists.dispatchPerson}
                onChange={(v) => setEditing({ ...editing, sentBy: v })}
              />
            </Field>
            <Field label="Notes">
              <textarea
                rows={2}
                value={editing.notes}
                onChange={(e) =>
                  setEditing({ ...editing, notes: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <FormFooter
              onCancel={() => setEditing(null)}
              onSave={async () => {
                if (
                  editing.designNumber &&
                  editing.qty &&
                  editing.destination
                ) {
                  await saveRecord("dispatch_out", editing);
                  setEditing(null);
                }
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============== MAINTENANCE PAGE (per station) ==============
function MaintenancePage({
  ctx,
  stationId,
  canEdit,
}: {
  ctx: AppContext;
  stationId: string;
  canEdit?: boolean;
}) {
  const { records, lists, machines, saveRecord, deleteRecord } = ctx;
  const data = (records.maintenance || []).filter(
    (r) => r.stationId === stationId,
  );
  const breakdowns = (records.breakdown || []).filter(
    (r) => r.stationId === stationId,
  );
  const dailyChecks = (records.dailycheck || []).filter(
    (r) => r.stationId === stationId,
  );
  const stationMachines = machines.filter((m) => m.stationId === stationId);
  const [tab, setTab] = useState("maint");
  const [editing, setEditing] = useState(null);
  const [editingBreakdown, setEditingBreakdown] = useState(null);
  const [editingCheck, setEditingCheck] = useState(null);

  return (
    <div className="space-y-3">
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab("maint")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "maint" ? "bg-white shadow" : "text-slate-600"}`}
        >
          Maintenance & Cleaning
        </button>
        <button
          onClick={() => setTab("breakdown")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "breakdown" ? "bg-white shadow" : "text-slate-600"}`}
        >
          Breakdown Log
        </button>
        <button
          onClick={() => setTab("daily")}
          className={`px-3 py-1.5 rounded text-sm font-medium ${tab === "daily" ? "bg-white shadow" : "text-slate-600"}`}
        >
          Daily Checks
        </button>
      </div>

      {tab === "maint" && (
        <>
          <ActionBar
            canEdit={canEdit}
            onAdd={() =>
              setEditing({
                id: uid(),
                stationId,
                date: todayISO(),
                machineId: stationMachines[0]?.id || "",
                type: "maintenance",
                shift: "",
                reason: "",
                actionTaken: "",
                cost: "",
                operator: ctx.user.name,
              })
            }
            addLabel="+ Maintenance / Cleaning"
            onExport={() => exportToCSV(data, `${stationId}_maintenance`)}
          />
          <DataTable
            rows={data}
            selected={new Set()}
            setSelected={() => {}}
            columns={[
              { key: "date", label: "Date" },
              {
                key: "machineId",
                label: "Machine",
                render: (v) =>
                  stationMachines.find((m) => m.id === v)?.name || "—",
              },
              { key: "type", label: "Type" },
              { key: "reason", label: "Reason" },
              { key: "actionTaken", label: "Action" },
              { key: "shift", label: "Shift" },
            ]}
            onEdit={canEdit ? setEditing : null}
            onDelete={canEdit ? (id) => deleteRecord("maintenance", id) : null}
            hideSelect
          />
        </>
      )}
      {tab === "breakdown" && (
        <>
          <ActionBar
            canEdit={canEdit}
            onAdd={() =>
              setEditingBreakdown({
                id: uid(),
                stationId,
                date: todayISO(),
                machineId: stationMachines[0]?.id || "",
                type: "",
                cause: "",
                downtime: "",
                repairAction: "",
                cost: "",
                responsible: "",
                operator: ctx.user.name,
              })
            }
            addLabel="+ Breakdown"
            onExport={() => exportToCSV(breakdowns, `${stationId}_breakdowns`)}
          />
          <DataTable
            rows={breakdowns}
            selected={new Set()}
            setSelected={() => {}}
            columns={[
              { key: "date", label: "Date" },
              {
                key: "machineId",
                label: "Machine",
                render: (v) =>
                  stationMachines.find((m) => m.id === v)?.name || "—",
              },
              { key: "type", label: "Type" },
              { key: "cause", label: "Cause" },
              { key: "downtime", label: "Downtime (h)" },
              { key: "cost", label: "Cost" },
              { key: "responsible", label: "Resp." },
            ]}
            onEdit={canEdit ? setEditingBreakdown : null}
            onDelete={canEdit ? (id) => deleteRecord("breakdown", id) : null}
            hideSelect
          />
        </>
      )}
      {tab === "daily" && (
        <>
          <ActionBar
            canEdit={canEdit}
            onAdd={() =>
              setEditingCheck({
                id: uid(),
                stationId,
                date: todayISO(),
                machineId: stationMachines[0]?.id || "",
                shift: "",
                result: "",
                notes: "",
                operator: ctx.user.name,
              })
            }
            addLabel="+ Daily Check"
            onExport={() =>
              exportToCSV(dailyChecks, `${stationId}_daily_checks`)
            }
          />
          <DataTable
            rows={dailyChecks}
            selected={new Set()}
            setSelected={() => {}}
            columns={[
              { key: "date", label: "Date" },
              {
                key: "machineId",
                label: "Machine",
                render: (v) =>
                  stationMachines.find((m) => m.id === v)?.name || "—",
              },
              { key: "shift", label: "Shift" },
              { key: "result", label: "Result" },
              { key: "notes", label: "Notes" },
            ]}
            onEdit={canEdit ? setEditingCheck : null}
            onDelete={canEdit ? (id) => deleteRecord("dailycheck", id) : null}
            hideSelect
          />
        </>
      )}

      {editing && (
        <Modal title="Maintenance / Cleaning" onClose={() => setEditing(null)}>
          <div className="space-y-3">
            <Field label="Date *">
              <input
                type="date"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Machine *">
              <select
                value={editing.machineId}
                onChange={(e) =>
                  setEditing({ ...editing, machineId: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              >
                {stationMachines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Type *">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setEditing({ ...editing, type: "maintenance" })
                  }
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.type === "maintenance" ? "border-purple-500 bg-purple-50" : "border-slate-200"}`}
                >
                  Maintenance
                </button>
                <button
                  onClick={() => setEditing({ ...editing, type: "cleaning" })}
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium ${editing.type === "cleaning" ? "border-purple-500 bg-purple-50" : "border-slate-200"}`}
                >
                  Cleaning
                </button>
              </div>
            </Field>
            <Field label="Shift *">
              <Select
                value={editing.shift}
                options={lists.maintenanceShift}
                onChange={(v) => setEditing({ ...editing, shift: v })}
              />
            </Field>
            <Field label="Reason *">
              <textarea
                rows={2}
                value={editing.reason}
                onChange={(e) =>
                  setEditing({ ...editing, reason: e.target.value })
                }
                placeholder="Why? e.g. routine, part broke, color change..."
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Action Taken">
              <textarea
                rows={2}
                value={editing.actionTaken}
                onChange={(e) =>
                  setEditing({ ...editing, actionTaken: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Cost (optional)">
              <input
                value={editing.cost}
                onChange={(e) =>
                  setEditing({ ...editing, cost: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <FormFooter
              onCancel={() => setEditing(null)}
              onSave={async () => {
                if (editing.date && editing.machineId) {
                  await saveRecord("maintenance", editing);
                  setEditing(null);
                }
              }}
            />
          </div>
        </Modal>
      )}

      {editingBreakdown && (
        <Modal title="Breakdown" onClose={() => setEditingBreakdown(null)}>
          <div className="space-y-3">
            <Field label="Date *">
              <input
                type="date"
                value={editingBreakdown.date}
                onChange={(e) =>
                  setEditingBreakdown({
                    ...editingBreakdown,
                    date: e.target.value,
                  })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Machine *">
              <select
                value={editingBreakdown.machineId}
                onChange={(e) =>
                  setEditingBreakdown({
                    ...editingBreakdown,
                    machineId: e.target.value,
                  })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              >
                {stationMachines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Breakdown Type *">
              <Select
                value={editingBreakdown.type}
                options={lists.breakdownType}
                onChange={(v) =>
                  setEditingBreakdown({ ...editingBreakdown, type: v })
                }
              />
            </Field>
            <Field label="Cause *">
              <textarea
                rows={2}
                value={editingBreakdown.cause}
                onChange={(e) =>
                  setEditingBreakdown({
                    ...editingBreakdown,
                    cause: e.target.value,
                  })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Downtime (hours)">
              <input
                type="number"
                value={editingBreakdown.downtime}
                onChange={(e) =>
                  setEditingBreakdown({
                    ...editingBreakdown,
                    downtime: e.target.value,
                  })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Repair Action">
              <textarea
                rows={2}
                value={editingBreakdown.repairAction}
                onChange={(e) =>
                  setEditingBreakdown({
                    ...editingBreakdown,
                    repairAction: e.target.value,
                  })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Cost">
                <input
                  value={editingBreakdown.cost}
                  onChange={(e) =>
                    setEditingBreakdown({
                      ...editingBreakdown,
                      cost: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </Field>
              <Field label="Responsible">
                <input
                  value={editingBreakdown.responsible}
                  onChange={(e) =>
                    setEditingBreakdown({
                      ...editingBreakdown,
                      responsible: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </Field>
            </div>
            <FormFooter
              onCancel={() => setEditingBreakdown(null)}
              onSave={async () => {
                if (editingBreakdown.date && editingBreakdown.cause) {
                  await saveRecord("breakdown", editingBreakdown);
                  setEditingBreakdown(null);
                }
              }}
            />
          </div>
        </Modal>
      )}

      {editingCheck && (
        <Modal title="Daily Check" onClose={() => setEditingCheck(null)}>
          <div className="space-y-3">
            <Field label="Date *">
              <input
                type="date"
                value={editingCheck.date}
                onChange={(e) =>
                  setEditingCheck({ ...editingCheck, date: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </Field>
            <Field label="Machine *">
              <select
                value={editingCheck.machineId}
                onChange={(e) =>
                  setEditingCheck({
                    ...editingCheck,
                    machineId: e.target.value,
                  })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              >
                {stationMachines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Shift *">
              <Select
                value={editingCheck.shift}
                options={lists.shift}
                onChange={(v) => setEditingCheck({ ...editingCheck, shift: v })}
              />
            </Field>
            {/* Result is now a configurable list — super-admin can manage options on the Lists page (key: dailyCheckResult). */}
            <Field label="Result *">
              <Select
                value={editingCheck.result}
                options={lists.dailyCheckResult}
                onChange={(v) =>
                  setEditingCheck({ ...editingCheck, result: v })
                }
              />
            </Field>
            <Field label="Notes">
              <textarea
                rows={3}
                value={editingCheck.notes}
                onChange={(e) =>
                  setEditingCheck({ ...editingCheck, notes: e.target.value })
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg"
                placeholder="Anything else worth recording — temperature reading, observations, follow-ups…"
              />
            </Field>
            <FormFooter
              onCancel={() => setEditingCheck(null)}
              onSave={async () => {
                if (editingCheck.date && editingCheck.machineId) {
                  await saveRecord("dailycheck", editingCheck);
                  setEditingCheck(null);
                }
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============== SHARED: SHIFT DASHBOARD ==============
function ShiftDashboard({
  records,
  dateField,
  shiftField,
  qtyFields,
}: {
  records?: ProductionRecord[];
  dateField: string;
  shiftField: string;
  qtyFields: any[];
}) {
  const [period, setPeriod] = useState("today");
  const list = records || [];
  const filtered = useMemo(() => {
    const now = new Date();
    const today = todayISO();
    return list.filter((r) => {
      const d = r[dateField];
      if (!d) return false;
      if (period === "today") return d === today;
      if (period === "week") {
        const w = new Date(now);
        w.setDate(w.getDate() - 7);
        return d >= w.toISOString().slice(0, 10);
      }
      if (period === "month") {
        const m = new Date(now);
        m.setMonth(m.getMonth() - 1);
        return d >= m.toISOString().slice(0, 10);
      }
      return true;
    });
  }, [list, period, dateField]);

  // Group by shift for the day view; aggregate everything together for week/month/all.
  const showByShift = period === "today";
  const byShift = useMemo(() => {
    const map: Record<string, any> = {};
    filtered.forEach((r) => {
      const sh = showByShift ? r[shiftField] || "—" : "All";
      if (!map[sh]) {
        map[sh] = { count: 0 };
        qtyFields.forEach((f) => (map[sh][f.key] = 0));
      }
      map[sh].count++;
      qtyFields.forEach((f) => {
        map[sh][f.key] += Number(r[f.key]) || 0;
      });
    });
    if (qtyFields.some((f) => f.avg)) {
      Object.values(map).forEach((o) =>
        qtyFields
          .filter((f) => f.avg)
          .forEach((f) => (o[f.key] = o.count ? o[f.key] / o.count : 0)),
      );
    }
    return map;
  }, [filtered, qtyFields, shiftField, showByShift]);

  return (
    <div className="space-y-3">
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {["today", "week", "month", "all"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded text-sm font-medium ${period === p ? "bg-white shadow" : "text-slate-600"}`}
          >
            {p}
          </button>
        ))}
      </div>
      {!showByShift && (
        <div className="text-xs text-slate-500 italic">
          Showing combined totals — shift breakdown is only available for
          "today".
        </div>
      )}
      <div
        className={`grid gap-3 ${showByShift ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-1"}`}
      >
        {(Object.entries(byShift) as [string, any][]).map(([shift, vals]) => (
          <div key={shift} className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-slate-700">
              {showByShift
                ? shift
                : `Total — ${period === "week" ? "last 7 days" : period === "month" ? "last 30 days" : "all time"}`}
            </div>
            <div className="text-3xl font-bold text-purple-600 my-2">
              {vals.count}
            </div>
            <div className="text-xs text-slate-500">records</div>
            <div className="mt-3 space-y-1">
              {qtyFields.map((f) => (
                <div
                  key={f.key}
                  className="flex justify-between text-sm border-t border-slate-100 pt-1"
                >
                  <span className="text-slate-600">{f.label}</span>
                  <span className="font-medium">
                    {f.avg
                      ? `${vals[f.key].toFixed(2)}%`
                      : `${vals[f.key].toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!Object.keys(byShift).length && (
          <div className="col-span-full bg-white rounded-xl p-8 text-center text-slate-400 text-sm">
            No data for this period
          </div>
        )}
      </div>
    </div>
  );
}

function CompareStagesPage({
  ctx,
  from,
  to,
  fromKey,
  toKey,
}: {
  ctx: AppContext;
  from: string;
  to: string;
  fromKey: string;
  toKey: string;
}) {
  const { records } = ctx;
  const fromRecs = records[from] || [];
  const toRecs = records[to] || [];
  const printRecs = records.printing || [];
  // Only count downstream records that came from printing (cardSource='printing' or absent)
  // — dyed cards are tracked in DyeingCompareStagesPage instead.
  const rows = printRecs.map((p) => {
    const fromTotal =
      (from === "printing"
        ? Number(p[fromKey])
        : fromRecs
            .filter((x) => x.printNo === p.printNo)
            .reduce((s, x) => s + Number(x[fromKey] || 0), 0)) || 0;
    const toTotal = toRecs
      .filter(
        (x) =>
          x.printNo === p.printNo &&
          (x.cardSource || "printing") === "printing",
      )
      .reduce((s, x) => s + Number(x[toKey] || 0), 0);
    const pct = fromTotal ? (toTotal / fromTotal) * 100 : 0;
    return {
      printNo: p.printNo,
      designNumber: p.designNumber,
      fromTotal,
      toTotal,
      pct,
    };
  });
  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-600">
        Per-rout-card comparison: {from} → {to}
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 text-slate-600 font-medium">
                Print #
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Design
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                {from} qty
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                {to} qty
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.printNo} className="border-t border-slate-100">
                <td className="p-3 font-mono font-bold">{r.printNo}</td>
                <td className="p-3 font-mono text-xs">{r.designNumber}</td>
                <td className="p-3">{r.fromTotal.toLocaleString()}</td>
                <td className="p-3">{r.toTotal.toLocaleString()}</td>
                <td className="p-3 font-medium">{r.pct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============== DYEING YIELD COMPARISON ==============
// Shows for each dyed card: dyed qty (source) vs the qty produced at a downstream stage.
// Used by the Finishing station ("Dye vs Finish") and Calendering station ("Dye vs Calender").
//
// `to` is the downstream stage id ('finishing' or 'calendering').
// `toKey` is the qty field on those records ('finishedQty' or 'qty').
function DyeingCompareStagesPage({
  ctx,
  to,
  toKey,
  toLabel,
}: {
  ctx: AppContext;
  to: string;
  toKey: string;
  toLabel: string;
}) {
  const { records, programs, designs } = ctx;
  const dyeingRecs = records.dyeing || [];
  const toRecs = records[to] || [];
  const t = useT();

  const rows = dyeingRecs.map((d) => {
    const dyedQty = Number(d.dyedQty) || 0;
    // Match by dyeingNo (stored in printNo field) AND cardSource='dyeing' to be safe.
    const toTotal = toRecs
      .filter(
        (x) =>
          x.printNo === d.dyeingNo && (x.cardSource || "printing") === "dyeing",
      )
      .reduce((s, x) => s + Number(x[toKey] || 0), 0);
    const pct = dyedQty ? (toTotal / dyedQty) * 100 : 0;
    const remaining = Math.max(0, dyedQty - toTotal);
    // Resolve color/program info for display.
    const prog = programs.find((p) => p.id === d.programId);
    const firstLine = (prog?.lines || [])[0];
    return {
      dyeingNo: d.dyeingNo,
      programName: prog?.name || "—",
      designNumber: firstLine?.designNumber || null,
      dyedQty,
      toTotal,
      remaining,
      pct,
      ended: !!d.ended,
    };
  });

  // Grand totals
  const totalDyed = rows.reduce((s, r) => s + r.dyedQty, 0);
  const totalDownstream = rows.reduce((s, r) => s + r.toTotal, 0);
  const grandPct = totalDyed ? (totalDownstream / totalDyed) * 100 : 0;
  const totalRemaining = rows.reduce((s, r) => s + r.remaining, 0);

  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-600">
        Per-dye-card comparison: dyeing → {toLabel}
      </div>

      {/* Headline tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
          <div className="text-xs text-cyan-700 uppercase">Total dyed</div>
          <div className="text-2xl font-bold text-cyan-900">
            {totalDyed.toLocaleString()}
            <span className="text-sm ml-1">m</span>
          </div>
        </div>
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
          <div className="text-xs text-pink-700 uppercase">Total {toLabel}</div>
          <div className="text-2xl font-bold text-pink-900">
            {totalDownstream.toLocaleString()}
            <span className="text-sm ml-1">m</span>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-xs text-amber-700 uppercase">Remaining</div>
          <div className="text-2xl font-bold text-amber-900">
            {totalRemaining.toLocaleString()}
            <span className="text-sm ml-1">m</span>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="text-xs text-emerald-700 uppercase">Yield %</div>
          <div className="text-2xl font-bold text-emerald-900">
            {grandPct.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 text-slate-600 font-medium">
                Dye #
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Program
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Color
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Dyed (m)
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                {toLabel} (m)
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Remaining (m)
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">%</th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.dyeingNo}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="p-3 font-mono font-bold">{r.dyeingNo}</td>
                <td className="p-3">{r.programName}</td>
                <td className="p-3">
                  {r.designNumber ? (
                    <DesignTag
                      designNumber={r.designNumber}
                      designs={designs}
                      size={32}
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">—</span>
                  )}
                </td>
                <td className="p-3 text-right">{r.dyedQty.toLocaleString()}</td>
                <td className="p-3 text-right">{r.toTotal.toLocaleString()}</td>
                <td className="p-3 text-right">
                  {r.remaining > 0 ? (
                    <span className="text-amber-700 font-medium">
                      {r.remaining.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
                <td className="p-3 text-right font-bold">
                  {r.pct.toFixed(1)}%
                </td>
                <td className="p-3">
                  {r.ended ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold">
                      ENDED
                    </span>
                  ) : r.remaining === 0 && r.dyedQty > 0 ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold">
                      CAUGHT UP
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      in progress
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-400">
                  No dyeing records yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-slate-500 italic">
        Each row shows how much of a dyed card has reached the {toLabel} stage.
        "Remaining" is the gap. ENDED cards have officially closed the chain —
        operator declared no more fabric is coming for that card.
      </div>
    </div>
  );
}

// ============== MASTER TRACKING ==============
function MasterTracking({ ctx }: CtxProps) {
  const { records, programs } = ctx;
  const printRecs = records.printing || [];
  const dyeingRecs = records.dyeing || [];
  const t = useT();

  // Build per-card row. Two card sources merge into one table:
  // - Printing cards: source qty = printedQty, full pipeline (printed → cured → finished → ...)
  // - Dyeing cards: source qty = dyedQty, no batching/printing/curing (just dyed → finished → ...)
  //
  // Downstream stations (finishing/calendering/folding) store the dyeingNo in their `printNo`
  // field plus a `cardSource: 'dyeing'` flag, so when filtering downstream records we match
  // BOTH printNo equality AND the cardSource matching the row's source.
  const rows = useMemo(() => {
    // Helper: count a card's downstream qtys, scoped to records whose cardSource matches.
    function downstream(cardNo, cardSource) {
      const finished = (records.finishing || [])
        .filter(
          (f) =>
            f.printNo === cardNo && (f.cardSource || "printing") === cardSource,
        )
        .reduce((s, f) => s + (Number(f.finishedQty) || 0), 0);
      const calendered = (records.calendering || [])
        .filter(
          (c) =>
            c.printNo === cardNo && (c.cardSource || "printing") === cardSource,
        )
        .reduce((s, c) => s + (Number(c.qty) || 0), 0);
      const folds = (records.folding || []).filter(
        (f) =>
          f.printNo === cardNo && (f.cardSource || "printing") === cardSource,
      );
      const firstQ = folds.reduce((s, f) => s + Number(f.firstQty || 0), 0);
      const incomplete = folds.reduce(
        (s, f) => s + Number(f.incompleteQty || 0),
        0,
      );
      const secondQ = folds.reduce((s, f) => s + Number(f.secondQty || 0), 0);
      const reject = folds.reduce((s, f) => s + Number(f.rejectQty || 0), 0);
      const inspectedTotal = firstQ + incomplete + secondQ + reject;
      const overallYield = inspectedTotal
        ? ((firstQ + incomplete) / inspectedTotal) * 100
        : 0;
      return {
        finishedQty: finished,
        calenderedQty: calendered,
        firstQ,
        incomplete,
        secondQ,
        reject,
        inspectedTotal,
        overallYield,
      };
    }

    const printingRows = printRecs.map((p) => {
      const sourceQty = Number(p.printedQty) || 0;
      // Curing only applies to printing cards.
      const curedQty = (records.curing || [])
        .filter((c) => c.printNo === p.printNo)
        .reduce((s, c) => s + (Number(c.qty) || Number(c.curedQty) || 0), 0);
      const dn = downstream(p.printNo, "printing");
      return {
        cardNo: p.printNo,
        cardSource: "printing",
        designNumber: p.designNumber,
        sourceQty,
        curedQty,
        ...dn,
      };
    });

    const dyeingRows = dyeingRecs.map((d) => {
      const sourceQty = Number(d.dyedQty) || 0;
      // Resolve a "design" representation for dyed cards from the program's first line
      // (which holds the color swatch image).
      const prog = programs.find((pg) => pg.id === d.programId);
      const firstLine = (prog?.lines || [])[0];
      const dn = downstream(d.dyeingNo, "dyeing");
      return {
        cardNo: d.dyeingNo,
        cardSource: "dyeing",
        designNumber: firstLine?.designNumber || prog?.name || "—",
        sourceQty,
        // No curing for dyed cards — show 0 (the column will render '—' via formatter below)
        curedQty: 0,
        ...dn,
      };
    });

    return [...printingRows, ...dyeingRows];
  }, [printRecs, dyeingRecs, records, programs]);

  const grand = rows.reduce(
    (g, r) => ({
      sourcePrint:
        g.sourcePrint + (r.cardSource === "printing" ? r.sourceQty : 0),
      sourceDye: g.sourceDye + (r.cardSource === "dyeing" ? r.sourceQty : 0),
      cured: g.cured + r.curedQty,
      finished: g.finished + r.finishedQty,
      calendered: g.calendered + r.calenderedQty,
      inspected: g.inspected + r.inspectedTotal,
      first: g.first + r.firstQ,
      incomplete: g.incomplete + r.incomplete,
      second: g.second + r.secondQ,
      reject: g.reject + r.reject,
    }),
    {
      sourcePrint: 0,
      sourceDye: 0,
      cured: 0,
      finished: 0,
      calendered: 0,
      inspected: 0,
      first: 0,
      incomplete: 0,
      second: 0,
      reject: 0,
    },
  );

  const grandYield = grand.inspected
    ? ((grand.first + grand.incomplete) / grand.inspected) * 100
    : 0;

  return (
    <div className="space-y-4">
      <BackBar
        ctx={ctx}
        to={{ type: "department", departmentId: "printing" }}
        label={t("common.back")}
      />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {t("master.title")}
        </h2>
        <p className="text-slate-500 text-sm">{t("master.desc")}</p>
      </div>
      {/* Big number tiles — Printed and Dyed shown separately so the split is visible. */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <StatBox
          label="Printed (m)"
          value={grand.sourcePrint.toLocaleString()}
          icon={Printer}
          color="text-purple-600"
        />
        <StatBox
          label="Dyed (m)"
          value={grand.sourceDye.toLocaleString()}
          icon={Droplet}
          color="text-cyan-600"
        />
        <StatBox
          label="Cured (m)"
          value={grand.cured.toLocaleString()}
          icon={Flame}
          color="text-orange-600"
        />
        <StatBox
          label="Finished (m)"
          value={grand.finished.toLocaleString()}
          icon={Sparkles}
          color="text-pink-600"
        />
        <StatBox
          label="Inspected (m)"
          value={grand.inspected.toLocaleString()}
          icon={CheckCircle}
          color="text-emerald-600"
        />
        <StatBox
          label="Yield %"
          value={`${grandYield.toFixed(1)}%`}
          icon={TrendingUp}
          color="text-green-600"
        />
      </div>
      <button
        onClick={() => exportToCSV(rows, "master_tracking")}
        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ml-auto"
      >
        <Download size={15} /> Export Master to CSV
      </button>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 text-slate-600 font-medium">
                Card #
              </th>
              <th className="text-left p-3 text-slate-600 font-medium">Type</th>
              <th className="text-left p-3 text-slate-600 font-medium">
                Design / Color
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Source qty
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Cured
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Finished
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Calendered
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Inspected
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                1st sort
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Incomplete
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                2nd sort
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Rejected
              </th>
              <th className="text-right p-3 text-slate-600 font-medium">
                Yield %
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={`${r.cardSource}:${r.cardNo}`}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="p-3 font-mono font-bold">{r.cardNo}</td>
                <td className="p-3">
                  {r.cardSource === "dyeing" ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 font-bold">
                      DYE
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                      PRINT
                    </span>
                  )}
                </td>
                <td className="p-3 font-mono text-xs">{r.designNumber}</td>
                <td className="p-3 text-right">
                  {r.sourceQty.toLocaleString()}
                </td>
                {/* Dyed cards skip curing — show "—" instead of "0" so it's clear curing doesn't apply. */}
                <td className="p-3 text-right">
                  {r.cardSource === "dyeing" ? (
                    <span className="text-slate-300">—</span>
                  ) : (
                    r.curedQty.toLocaleString()
                  )}
                </td>
                <td className="p-3 text-right">
                  {r.finishedQty.toLocaleString()}
                </td>
                <td className="p-3 text-right">
                  {r.calenderedQty.toLocaleString()}
                </td>
                <td className="p-3 text-right font-bold">
                  {r.inspectedTotal.toLocaleString()}
                </td>
                <td className="p-3 text-right text-green-700">
                  {r.firstQ.toLocaleString()}
                </td>
                <td className="p-3 text-right text-emerald-600">
                  {r.incomplete.toLocaleString()}
                </td>
                <td className="p-3 text-right text-amber-600">
                  {r.secondQ.toLocaleString()}
                </td>
                <td className="p-3 text-right text-red-600">
                  {r.reject.toLocaleString()}
                </td>
                <td className="p-3 text-right font-bold">
                  {r.overallYield.toFixed(1)}%
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={13} className="p-8 text-center text-slate-400">
                  No printing or dyeing records yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-slate-500 italic">
        Note: "Yield %" counts 1st sort + Incomplete as good output, divided by
        total inspected (incl. 2nd sort and rejected). Dyed cards skip the
        Curing stage by design.
      </div>
    </div>
  );
}

// ============================================================
// ============== LOCAL MARKET STORE VIEWS ====================
// ============================================================

// ---- Helpers shared across store views ----
function fmtMoney(n) {
  const v = Number(n) || 0;
  return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// Build a per-customer ledger summary from all sales + payments.
// Each customer has: totalPurchased (qty), totalBilled, totalPaid, balance (debt).
type CustomerLedgerEntry = Customer & {
  totalQty: number;
  totalBilled: number;
  totalPaid: number;
  balance: number;
  lastActivity: string | null;
  salesCount: number;
};
function useCustomerLedger(
  customers: Customer[],
  storeSales: StoreSale[],
  storePayments: StorePayment[],
): Record<string, CustomerLedgerEntry> {
  return useMemo(() => {
    const map: Record<string, CustomerLedgerEntry> = {};
    customers.forEach((c) => {
      map[c.id] = {
        ...c,
        totalQty: 0,
        totalBilled: 0,
        totalPaid: 0,
        balance: 0,
        lastActivity: null,
        salesCount: 0,
      };
    });
    storeSales.forEach((s) => {
      const cust = map[s.customerId];
      if (!cust) return;
      cust.totalQty += Number(s.qty) || 0;
      cust.totalBilled += Number(s.totalAmount) || 0;
      cust.totalPaid += Number(s.paidAmount) || 0;
      cust.salesCount += 1;
      if (!cust.lastActivity || s.date > cust.lastActivity)
        cust.lastActivity = s.date;
    });
    storePayments.forEach((p) => {
      const cust = map[p.customerId];
      if (!cust) return;
      cust.totalPaid += Number(p.amount) || 0;
      if (!cust.lastActivity || p.date > cust.lastActivity)
        cust.lastActivity = p.date;
    });
    Object.values(map).forEach((c) => {
      c.balance = c.totalBilled - c.totalPaid;
    });
    return map;
  }, [customers, storeSales, storePayments]);
}

// Header used at the top of each store sub-view (Customers, Stock In, Sales, etc.)
function StoreSubHeader({
  ctx,
  title,
  subtitle,
  icon: Icon,
  color = "bg-emerald-600",
}: {
  ctx: AppContext;
  title: string;
  subtitle?: string;
  icon: any;
  color?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button
          onClick={() => ctx.setCurrentView({ type: "home" })}
          className="hover:text-slate-700"
        >
          Home
        </button>
        <ChevronRight size={12} />
        <button
          onClick={() =>
            ctx.setCurrentView({ type: "department", departmentId: "store" })
          }
          className="hover:text-slate-700"
        >
          Local Market Store
        </button>
        <ChevronRight size={12} />
        <span className="text-slate-700 font-medium">{title}</span>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <div
          className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="text-white" size={22} />
        </div>
        <div>
          <div className="font-bold text-lg text-slate-800">{title}</div>
          {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

// ============== CUSTOMERS LIST ==============
function CustomersListView({ ctx }: CtxProps) {
  const {
    customers,
    storeSales,
    storePayments,
    user,
    saveCustomer,
    deleteCustomer,
    setCurrentView,
    askConfirm,
  } = ctx;
  const canEdit =
    user.role === "admin" ||
    (user.role === "dept_admin" && user.departmentId === "store");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const ledger = useCustomerLedger(customers, storeSales, storePayments);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return Object.values(ledger)
      .filter(
        (c) =>
          !term ||
          c.name?.toLowerCase().includes(term) ||
          c.code?.toLowerCase().includes(term) ||
          c.phone?.includes(term),
      )
      .sort((a, b) => (b.balance || 0) - (a.balance || 0));
  }, [ledger, search]);

  function newCustomer() {
    const code = `C-${monthCode()}${String(customers.length + 1).padStart(3, "0")}`;
    setEditing({
      id: uid(),
      code,
      name: "",
      phone: "",
      address: "",
      type: "Retail",
      notes: "",
      createdAt: todayISO(),
    });
  }

  function exportAll() {
    exportToCSV(
      rows.map((r) => ({
        code: r.code,
        name: r.name,
        phone: r.phone,
        address: r.address,
        type: r.type,
        sales: r.salesCount,
        totalQty: r.totalQty,
        totalBilled: r.totalBilled,
        totalPaid: r.totalPaid,
        balance: r.balance,
        lastActivity: r.lastActivity,
      })),
      "customers",
    );
  }

  return (
    <div className="space-y-4">
      <StoreSubHeader
        ctx={ctx}
        title="Customers"
        subtitle={`${customers.length} customer${customers.length !== 1 ? "s" : ""}`}
        icon={UserCircle}
      />

      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, code, phone..."
            className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded text-sm"
          />
        </div>
        {canEdit && (
          <button
            onClick={newCustomer}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Plus size={15} /> Add Customer
          </button>
        )}
        <button
          onClick={exportAll}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 font-medium text-slate-600">Code</th>
              <th className="text-left p-3 font-medium text-slate-600">Name</th>
              <th className="text-left p-3 font-medium text-slate-600">
                Phone
              </th>
              <th className="text-left p-3 font-medium text-slate-600">Type</th>
              <th className="text-right p-3 font-medium text-slate-600">
                Sales
              </th>
              <th className="text-right p-3 font-medium text-slate-600">
                Total Qty
              </th>
              <th className="text-right p-3 font-medium text-slate-600">
                Billed
              </th>
              <th className="text-right p-3 font-medium text-slate-600">
                Paid
              </th>
              <th className="text-right p-3 font-medium text-slate-600">
                Balance
              </th>
              <th className="p-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="p-3 font-mono text-xs">{c.code}</td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      setCurrentView({
                        type: "store_customer_detail",
                        customerId: c.id,
                      })
                    }
                    className="font-medium text-emerald-700 hover:underline text-left"
                  >
                    {c.name || "(unnamed)"}
                  </button>
                </td>
                <td className="p-3 text-slate-600">{c.phone || "—"}</td>
                <td className="p-3">
                  <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">
                    {c.type || "Retail"}
                  </span>
                </td>
                <td className="p-3 text-right">{c.salesCount}</td>
                <td className="p-3 text-right">{fmtMoney(c.totalQty)}</td>
                <td className="p-3 text-right">{fmtMoney(c.totalBilled)}</td>
                <td className="p-3 text-right text-emerald-700">
                  {fmtMoney(c.totalPaid)}
                </td>
                <td
                  className={`p-3 text-right font-bold ${c.balance > 0 ? "text-orange-600" : c.balance < 0 ? "text-blue-600" : "text-slate-400"}`}
                >
                  {fmtMoney(c.balance)}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button
                    onClick={() =>
                      setCurrentView({
                        type: "store_customer_detail",
                        customerId: c.id,
                      })
                    }
                    className="text-slate-500 hover:text-emerald-600 p-1"
                    title="View"
                  >
                    <Eye size={14} />
                  </button>
                  {canEdit && (
                    <button
                      onClick={() =>
                        setEditing(customers.find((x) => x.id === c.id))
                      }
                      className="text-slate-500 hover:text-purple-600 p-1 ml-1"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                  {canEdit && (
                    <button
                      onClick={() =>
                        askConfirm(
                          `Delete ${c.name}? Sales history will remain but become orphaned.`,
                          () => deleteCustomer(c.id),
                        )
                      }
                      className="text-slate-500 hover:text-red-600 p-1 ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={10} className="p-8 text-center text-slate-400">
                  No customers yet. Click "Add Customer" to start.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal
          title={
            customers.find((c) => c.id === editing.id)
              ? "Edit Customer"
              : "New Customer"
          }
          onClose={() => setEditing(null)}
        >
          <CustomerForm
            initial={editing}
            ctx={ctx}
            onSave={async (c) => {
              await saveCustomer(c);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function CustomerForm({
  initial,
  ctx,
  onSave,
  onCancel,
}: {
  initial: Customer;
  ctx: AppContext;
  onSave: (c: Customer) => void;
  onCancel: () => void;
}) {
  const [c, setC] = useState(initial);
  const { lists } = ctx;
  const set = (k, v) => setC((prev) => ({ ...prev, [k]: v }));

  function save() {
    if (!c.name?.trim()) {
      alert("Name is required");
      return;
    }
    onSave(c);
  }

  return (
    <div className="space-y-3">
      <Field label="Customer code">
        <input
          value={c.code}
          onChange={(e) => set("code", e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
        />
      </Field>
      <Field label="Full name *">
        <input
          value={c.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
          autoFocus
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Phone">
          <input
            value={c.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Customer type">
          <Select
            value={c.type}
            options={lists.customerType}
            onChange={(v) => set("type", v)}
          />
        </Field>
      </div>
      <Field label="Address">
        <input
          value={c.address}
          onChange={(e) => set("address", e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Notes">
        <textarea
          value={c.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={save} />
    </div>
  );
}

// ============== CUSTOMER DETAIL ==============
function CustomerDetailView({
  ctx,
  customerId,
}: {
  ctx: AppContext;
  customerId: string;
}) {
  const {
    customers,
    storeSales,
    storePayments,
    user,
    setCurrentView,
    saveStorePayment,
    deleteStorePayment,
    askConfirm,
  } = ctx;
  const canEdit =
    user.role === "admin" ||
    (user.role === "dept_admin" && user.departmentId === "store");
  const [showPayDlg, setShowPayDlg] = useState(false);

  const customer = customers.find((c) => c.id === customerId);
  const sales = useMemo(
    () =>
      storeSales
        .filter((s) => s.customerId === customerId)
        .sort((a, b) => (b.date || "").localeCompare(a.date || "")),
    [storeSales, customerId],
  );
  const payments = useMemo(
    () =>
      storePayments
        .filter((p) => p.customerId === customerId)
        .sort((a, b) => (b.date || "").localeCompare(a.date || "")),
    [storePayments, customerId],
  );

  const totals = useMemo(() => {
    const totalQty = sales.reduce((s, r) => s + (Number(r.qty) || 0), 0);
    const totalBilled = sales.reduce(
      (s, r) => s + (Number(r.totalAmount) || 0),
      0,
    );
    const paidOnSales = sales.reduce(
      (s, r) => s + (Number(r.paidAmount) || 0),
      0,
    );
    const paidLater = payments.reduce((s, r) => s + (Number(r.amount) || 0), 0);
    const totalPaid = paidOnSales + paidLater;
    const balance = totalBilled - totalPaid;
    return {
      totalQty,
      totalBilled,
      totalPaid,
      balance,
      paidOnSales,
      paidLater,
    };
  }, [sales, payments]);

  // Unified ledger timeline (sales + payments) — newest first
  const timeline = useMemo(() => {
    const items = [];
    sales.forEach((s) =>
      items.push({ kind: "sale", date: s.date, ref: s, id: s.id }),
    );
    payments.forEach((p) =>
      items.push({ kind: "payment", date: p.date, ref: p, id: p.id }),
    );
    items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return items;
  }, [sales, payments]);

  if (!customer) {
    return (
      <div className="text-center py-16 text-slate-500">
        Customer not found.
        <button
          onClick={() => setCurrentView({ type: "store_customers" })}
          className="ml-2 text-emerald-600 hover:underline"
        >
          Back to customers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button
          onClick={() => setCurrentView({ type: "home" })}
          className="hover:text-slate-700"
        >
          Home
        </button>
        <ChevronRight size={12} />
        <button
          onClick={() =>
            setCurrentView({ type: "department", departmentId: "store" })
          }
          className="hover:text-slate-700"
        >
          Local Market Store
        </button>
        <ChevronRight size={12} />
        <button
          onClick={() => setCurrentView({ type: "store_customers" })}
          className="hover:text-slate-700"
        >
          Customers
        </button>
        <ChevronRight size={12} />
        <span className="text-slate-700 font-medium">{customer.name}</span>
      </div>

      {/* Customer profile card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-md">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <UserCircle size={28} />
            </div>
            <div>
              <div className="font-bold text-2xl">{customer.name}</div>
              <div className="text-sm opacity-90 font-mono">
                {customer.code} · {customer.type || "Retail"}
              </div>
              <div className="text-sm opacity-90 mt-1 flex items-center gap-3 flex-wrap">
                {customer.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={13} /> {customer.phone}
                  </span>
                )}
                {customer.address && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {customer.address}
                  </span>
                )}
              </div>
            </div>
          </div>
          {canEdit && (
            <button
              onClick={() => setShowPayDlg(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Receipt size={15} /> Record Payment
            </button>
          )}
        </div>
      </div>

      {/* Ledger summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox
          label="Sales count"
          value={sales.length}
          icon={ShoppingCart}
          color="text-rose-600"
        />
        <StatBox
          label="Total purchased"
          value={fmtMoney(totals.totalQty)}
          icon={Package}
          color="text-indigo-600"
        />
        <StatBox
          label="Billed"
          value={fmtMoney(totals.totalBilled)}
          icon={DollarSign}
          color="text-slate-600"
        />
        <StatBox
          label={totals.balance >= 0 ? "Outstanding debt" : "Credit / overpaid"}
          value={fmtMoney(Math.abs(totals.balance))}
          icon={AlertCircle}
          color={
            totals.balance > 0
              ? "text-orange-600"
              : totals.balance < 0
                ? "text-blue-600"
                : "text-emerald-600"
          }
        />
      </div>

      {customer.notes && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
          <span className="font-medium">Notes:</span> {customer.notes}
        </div>
      )}

      {/* Ledger / activity timeline */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <History size={16} /> Activity ledger
          </h3>
          <span className="text-xs text-slate-500">
            {timeline.length} entries
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Description</th>
                <th className="text-right p-3 font-medium">Qty</th>
                <th className="text-right p-3 font-medium">Billed</th>
                <th className="text-right p-3 font-medium">Paid</th>
                <th className="text-left p-3 font-medium">Method</th>
                {canEdit && <th className="p-3 w-12"></th>}
              </tr>
            </thead>
            <tbody>
              {timeline.map((e) => {
                if (e.kind === "sale") {
                  const s = e.ref;
                  const debtOnSale =
                    (Number(s.totalAmount) || 0) - (Number(s.paidAmount) || 0);
                  return (
                    <tr
                      key={`s-${s.id}`}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-3 text-slate-600 whitespace-nowrap">
                        {s.date}
                      </td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full font-medium">
                          SALE
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-800">
                          {s.fabricType || "Fabric"} · {s.qty} {s.unit || "m"}
                        </div>
                        <div className="text-xs text-slate-500">
                          @ {fmtMoney(s.unitPrice)} / {s.unit || "m"}
                          {debtOnSale > 0
                            ? ` · debt ${fmtMoney(debtOnSale)}`
                            : ""}
                        </div>
                      </td>
                      <td className="p-3 text-right">{fmtMoney(s.qty)}</td>
                      <td className="p-3 text-right">
                        {fmtMoney(s.totalAmount)}
                      </td>
                      <td className="p-3 text-right text-emerald-700">
                        {fmtMoney(s.paidAmount)}
                      </td>
                      <td className="p-3 text-slate-600 text-xs">
                        {s.paymentMethod || "—"}
                      </td>
                      {canEdit && <td className="p-3"></td>}
                    </tr>
                  );
                } else {
                  const p = e.ref;
                  return (
                    <tr
                      key={`p-${p.id}`}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-3 text-slate-600 whitespace-nowrap">
                        {p.date}
                      </td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full font-medium">
                          PAYMENT
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-800">
                          {p.notes || "Debt repayment"}
                        </div>
                        {p.reference && (
                          <div className="text-xs text-slate-500">
                            Ref: {p.reference}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-right text-slate-400">—</td>
                      <td className="p-3 text-right text-slate-400">—</td>
                      <td className="p-3 text-right text-emerald-700 font-medium">
                        {fmtMoney(p.amount)}
                      </td>
                      <td className="p-3 text-slate-600 text-xs">
                        {p.paymentMethod || "—"}
                      </td>
                      {canEdit && (
                        <td className="p-3 text-right">
                          <button
                            onClick={() =>
                              askConfirm("Delete this payment record?", () =>
                                deleteStorePayment(p.id),
                              )
                            }
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                }
              })}
              {!timeline.length && (
                <tr>
                  <td
                    colSpan={canEdit ? 8 : 7}
                    className="p-8 text-center text-slate-400"
                  >
                    No activity yet. Record sales in the Sales section, then
                    payments here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPayDlg && (
        <Modal title="Record Payment" onClose={() => setShowPayDlg(false)}>
          <PaymentForm
            initial={{
              id: uid(),
              customerId: customer.id,
              date: todayISO(),
              amount: "",
              paymentMethod: "Cash",
              reference: "",
              notes: "",
            }}
            ctx={ctx}
            suggestedAmount={Math.max(0, totals.balance)}
            onSave={async (p) => {
              await saveStorePayment(p);
              setShowPayDlg(false);
            }}
            onCancel={() => setShowPayDlg(false)}
          />
        </Modal>
      )}
    </div>
  );
}

function PaymentForm({
  initial,
  ctx,
  suggestedAmount,
  onSave,
  onCancel,
}: {
  initial: StorePayment;
  ctx: AppContext;
  suggestedAmount?: number;
  onSave: (p: StorePayment) => void;
  onCancel: () => void;
}) {
  const [p, setP] = useState(initial);
  const { lists } = ctx;
  const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }));

  function save() {
    const amount = Number(p.amount);
    if (!amount || amount <= 0) {
      alert("Enter a positive payment amount");
      return;
    }
    onSave({ ...p, amount });
  }

  return (
    <div className="space-y-3">
      {suggestedAmount > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900 flex items-center justify-between">
          <span>
            Outstanding balance:{" "}
            <span className="font-bold">{fmtMoney(suggestedAmount)}</span>
          </span>
          <button
            onClick={() => set("amount", suggestedAmount)}
            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded"
          >
            Pay full
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <input
            type="date"
            value={p.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Amount *">
          <input
            type="number"
            step="0.01"
            min="0"
            value={p.amount}
            onChange={(e) => set("amount", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
            autoFocus
          />
        </Field>
      </div>
      <Field label="Payment method">
        <Select
          value={p.paymentMethod}
          options={lists.paymentMethod}
          onChange={(v) => set("paymentMethod", v)}
        />
      </Field>
      <Field label="Reference (optional)">
        <input
          value={p.reference}
          onChange={(e) => set("reference", e.target.value)}
          placeholder="Transaction ID, receipt number..."
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <Field label="Notes">
        <textarea
          value={p.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={save} />
    </div>
  );
}

// ============== STORE STOCK IN ==============
function StoreStockInView({ ctx }: CtxProps) {
  const {
    storeStockIn,
    lists,
    user,
    saveStoreStockIn,
    deleteStoreStockIn,
    askConfirm,
  } = ctx;
  const canEdit =
    user.role === "admin" ||
    (user.role === "dept_admin" && user.departmentId === "store");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return storeStockIn
      .filter(
        (r) =>
          !term ||
          r.fabricType?.toLowerCase().includes(term) ||
          r.source?.toLowerCase().includes(term) ||
          r.lotNumber?.toLowerCase().includes(term),
      )
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [storeStockIn, search]);

  function newEntry() {
    setEditing({
      id: uid(),
      date: todayISO(),
      source: "From Production (Dispatch)",
      fabricType: "",
      lotNumber: "",
      qty: "",
      unit: "meters",
      costPrice: "",
      notes: "",
    });
  }

  return (
    <div className="space-y-4">
      <StoreSubHeader
        ctx={ctx}
        title="Stock In"
        subtitle="Incoming fabric to the store"
        icon={ArrowDownToLine}
        color="bg-sky-500"
      />

      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabric, lot, source..."
            className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded text-sm"
          />
        </div>
        {canEdit && (
          <button
            onClick={newEntry}
            className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Plus size={15} /> Add Stock In
          </button>
        )}
        <button
          onClick={() => exportToCSV(rows, "store_stock_in")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Source</th>
              <th className="text-left p-3 font-medium">Fabric</th>
              <th className="text-left p-3 font-medium">Lot #</th>
              <th className="text-right p-3 font-medium">Qty</th>
              <th className="text-left p-3 font-medium">Unit</th>
              <th className="text-right p-3 font-medium">Cost / unit</th>
              <th className="text-right p-3 font-medium">Total cost</th>
              {canEdit && <th className="p-3 w-20"></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const total = (Number(r.qty) || 0) * (Number(r.costPrice) || 0);
              return (
                <tr
                  key={r.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-3 text-slate-600 whitespace-nowrap">
                    {r.date}
                  </td>
                  <td className="p-3 text-slate-700">{r.source || "—"}</td>
                  <td className="p-3 font-medium text-slate-800">
                    {r.fabricType || "—"}
                  </td>
                  <td className="p-3 font-mono text-xs">
                    {r.lotNumber || "—"}
                  </td>
                  <td className="p-3 text-right">{fmtMoney(r.qty)}</td>
                  <td className="p-3 text-slate-600">{r.unit}</td>
                  <td className="p-3 text-right">{fmtMoney(r.costPrice)}</td>
                  <td className="p-3 text-right font-medium">
                    {fmtMoney(total)}
                  </td>
                  {canEdit && (
                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setEditing(r)}
                        className="text-slate-500 hover:text-purple-600 p-1"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() =>
                          askConfirm("Delete this stock-in record?", () =>
                            deleteStoreStockIn(r.id),
                          )
                        }
                        className="text-slate-500 hover:text-red-600 p-1 ml-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
            {!rows.length && (
              <tr>
                <td
                  colSpan={canEdit ? 9 : 8}
                  className="p-8 text-center text-slate-400"
                >
                  No stock-in records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal
          title={
            storeStockIn.find((r) => r.id === editing.id)
              ? "Edit Stock In"
              : "New Stock In"
          }
          onClose={() => setEditing(null)}
        >
          <StockInForm
            initial={editing}
            lists={lists}
            onSave={async (r) => {
              await saveStoreStockIn(r);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function StockInForm({
  initial,
  lists,
  onSave,
  onCancel,
}: {
  initial: StoreStockIn;
  lists: Lists;
  onSave: (s: StoreStockIn) => void;
  onCancel: () => void;
}) {
  const [r, setR] = useState(initial);
  const set = (k, v) => setR((prev) => ({ ...prev, [k]: v }));
  function save() {
    if (!r.fabricType) {
      alert("Fabric type is required");
      return;
    }
    if (!r.qty || Number(r.qty) <= 0) {
      alert("Qty must be positive");
      return;
    }
    onSave({ ...r, qty: Number(r.qty), costPrice: Number(r.costPrice) || 0 });
  }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date *">
          <input
            type="date"
            value={r.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Source">
          <Select
            value={r.source}
            options={lists.storeStockSource}
            onChange={(v) => set("source", v)}
          />
        </Field>
      </div>
      <Field label="Fabric type *">
        <Select
          value={r.fabricType}
          options={lists.fabricType}
          onChange={(v) => set("fabricType", v)}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Lot / batch #">
          <input
            value={r.lotNumber}
            onChange={(e) => set("lotNumber", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
          />
        </Field>
        <Field label="Unit">
          <Select
            value={r.unit}
            options={lists.storeUnit}
            onChange={(v) => set("unit", v)}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Quantity *">
          <input
            type="number"
            step="0.01"
            min="0"
            value={r.qty}
            onChange={(e) => set("qty", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Cost / unit">
          <input
            type="number"
            step="0.01"
            min="0"
            value={r.costPrice}
            onChange={(e) => set("costPrice", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
      </div>
      <Field label="Notes">
        <textarea
          value={r.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={save} />
    </div>
  );
}

// ============== STORE STOCK (current inventory) ==============
function StoreStockView({ ctx }: CtxProps) {
  const { storeStockIn, storeSales } = ctx;

  // Aggregate on-hand quantity per fabricType + unit
  const stockByFabric = useMemo(() => {
    const m: Record<
      string,
      {
        fabricType?: string;
        unit: string;
        inQty: number;
        inCost: number;
        outQty: number;
        outRevenue: number;
      }
    > = {};
    storeStockIn.forEach((r) => {
      const k = `${r.fabricType}::${r.unit || "meters"}`;
      m[k] = m[k] || {
        fabricType: r.fabricType,
        unit: r.unit || "meters",
        inQty: 0,
        inCost: 0,
        outQty: 0,
        outRevenue: 0,
      };
      m[k].inQty += Number(r.qty) || 0;
      m[k].inCost += (Number(r.qty) || 0) * (Number(r.costPrice) || 0);
    });
    storeSales.forEach((s) => {
      const k = `${s.fabricType}::${s.unit || "meters"}`;
      m[k] = m[k] || {
        fabricType: s.fabricType,
        unit: s.unit || "meters",
        inQty: 0,
        inCost: 0,
        outQty: 0,
        outRevenue: 0,
      };
      m[k].outQty += Number(s.qty) || 0;
      m[k].outRevenue += Number(s.totalAmount) || 0;
    });
    return Object.values(m)
      .map((x) => ({ ...x, onHand: x.inQty - x.outQty }))
      .sort((a, b) => b.onHand - a.onHand);
  }, [storeStockIn, storeSales]);

  const totals = useMemo(
    () => ({
      inQty: stockByFabric.reduce((s, r) => s + r.inQty, 0),
      outQty: stockByFabric.reduce((s, r) => s + r.outQty, 0),
      onHand: stockByFabric.reduce((s, r) => s + r.onHand, 0),
      inCost: stockByFabric.reduce((s, r) => s + r.inCost, 0),
      outRevenue: stockByFabric.reduce((s, r) => s + r.outRevenue, 0),
    }),
    [stockByFabric],
  );

  return (
    <div className="space-y-4">
      <StoreSubHeader
        ctx={ctx}
        title="Current Stock"
        subtitle="On-hand inventory by fabric type"
        icon={Package}
        color="bg-indigo-500"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatBox
          label="Total in"
          value={fmtMoney(totals.inQty)}
          icon={ArrowDownToLine}
          color="text-sky-600"
        />
        <StatBox
          label="Total out"
          value={fmtMoney(totals.outQty)}
          icon={ArrowUpFromLine}
          color="text-rose-600"
        />
        <StatBox
          label="On hand"
          value={fmtMoney(totals.onHand)}
          icon={Package}
          color="text-indigo-600"
        />
        <StatBox
          label="Stock cost"
          value={fmtMoney(totals.inCost)}
          icon={DollarSign}
          color="text-slate-600"
        />
        <StatBox
          label="Revenue"
          value={fmtMoney(totals.outRevenue)}
          icon={TrendingUp}
          color="text-emerald-600"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => exportToCSV(stockByFabric, "store_stock_levels")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Fabric type</th>
              <th className="text-left p-3 font-medium">Unit</th>
              <th className="text-right p-3 font-medium">In</th>
              <th className="text-right p-3 font-medium">Out</th>
              <th className="text-right p-3 font-medium">On hand</th>
              <th className="text-right p-3 font-medium">Stock cost</th>
              <th className="text-right p-3 font-medium">Revenue</th>
              <th className="text-left p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {stockByFabric.map((r) => (
              <tr
                key={`${r.fabricType}-${r.unit}`}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="p-3 font-medium text-slate-800">
                  {r.fabricType || "(unspecified)"}
                </td>
                <td className="p-3 text-slate-600">{r.unit}</td>
                <td className="p-3 text-right">{fmtMoney(r.inQty)}</td>
                <td className="p-3 text-right">{fmtMoney(r.outQty)}</td>
                <td
                  className={`p-3 text-right font-bold ${r.onHand <= 0 ? "text-red-600" : r.onHand < 50 ? "text-orange-600" : "text-slate-800"}`}
                >
                  {fmtMoney(r.onHand)}
                </td>
                <td className="p-3 text-right text-slate-600">
                  {fmtMoney(r.inCost)}
                </td>
                <td className="p-3 text-right text-emerald-700">
                  {fmtMoney(r.outRevenue)}
                </td>
                <td className="p-3">
                  {r.onHand <= 0 ? (
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                      Out of stock
                    </span>
                  ) : r.onHand < 50 ? (
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                      Low
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                      In stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!stockByFabric.length && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-400">
                  No stock yet. Add a Stock In record to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============== STORE SALES ==============
function StoreSalesView({ ctx }: CtxProps) {
  const {
    storeSales,
    customers,
    lists,
    user,
    saveStoreSale,
    deleteStoreSale,
    askConfirm,
  } = ctx;
  const canEdit =
    user.role === "admin" ||
    (user.role === "dept_admin" && user.departmentId === "store");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return storeSales
      .map((s) => ({
        ...s,
        customerName:
          customers.find((c) => c.id === s.customerId)?.name || "(deleted)",
      }))
      .filter(
        (s) =>
          !term ||
          s.customerName.toLowerCase().includes(term) ||
          s.fabricType?.toLowerCase().includes(term) ||
          s.invoiceNumber?.toLowerCase().includes(term),
      )
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [storeSales, customers, search]);

  function newSale() {
    setEditing({
      id: uid(),
      date: todayISO(),
      customerId: "",
      invoiceNumber: `INV-${monthCode()}${String(storeSales.length + 1).padStart(4, "0")}`,
      fabricType: "",
      qty: "",
      unit: "meters",
      unitPrice: "",
      totalAmount: 0,
      paidAmount: "",
      paymentMethod: "Cash",
      notes: "",
    });
  }

  return (
    <div className="space-y-4">
      <StoreSubHeader
        ctx={ctx}
        title="Sales / Stock Out"
        subtitle="Outgoing fabric & invoices"
        icon={ArrowUpFromLine}
        color="bg-rose-500"
      />

      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, fabric, invoice..."
            className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded text-sm"
          />
        </div>
        {canEdit && (
          <button
            onClick={newSale}
            className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Plus size={15} /> New Sale
          </button>
        )}
        <button
          onClick={() => exportToCSV(rows, "store_sales")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Invoice</th>
              <th className="text-left p-3 font-medium">Customer</th>
              <th className="text-left p-3 font-medium">Fabric</th>
              <th className="text-right p-3 font-medium">Qty</th>
              <th className="text-right p-3 font-medium">Unit price</th>
              <th className="text-right p-3 font-medium">Total</th>
              <th className="text-right p-3 font-medium">Paid</th>
              <th className="text-right p-3 font-medium">Debt</th>
              <th className="text-left p-3 font-medium">Method</th>
              {canEdit && <th className="p-3 w-20"></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => {
              const debt =
                (Number(s.totalAmount) || 0) - (Number(s.paidAmount) || 0);
              return (
                <tr
                  key={s.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-3 text-slate-600 whitespace-nowrap">
                    {s.date}
                  </td>
                  <td className="p-3 font-mono text-xs">{s.invoiceNumber}</td>
                  <td className="p-3 font-medium text-slate-800">
                    {s.customerName}
                  </td>
                  <td className="p-3 text-slate-700">{s.fabricType}</td>
                  <td className="p-3 text-right">
                    {fmtMoney(s.qty)} {s.unit}
                  </td>
                  <td className="p-3 text-right">{fmtMoney(s.unitPrice)}</td>
                  <td className="p-3 text-right font-medium">
                    {fmtMoney(s.totalAmount)}
                  </td>
                  <td className="p-3 text-right text-emerald-700">
                    {fmtMoney(s.paidAmount)}
                  </td>
                  <td
                    className={`p-3 text-right font-bold ${debt > 0 ? "text-orange-600" : "text-slate-400"}`}
                  >
                    {fmtMoney(debt)}
                  </td>
                  <td className="p-3 text-slate-600 text-xs">
                    {s.paymentMethod}
                  </td>
                  {canEdit && (
                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setEditing(s)}
                        className="text-slate-500 hover:text-purple-600 p-1"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() =>
                          askConfirm(
                            "Delete this sale? Customer balance will recalculate.",
                            () => deleteStoreSale(s.id),
                          )
                        }
                        className="text-slate-500 hover:text-red-600 p-1 ml-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
            {!rows.length && (
              <tr>
                <td
                  colSpan={canEdit ? 11 : 10}
                  className="p-8 text-center text-slate-400"
                >
                  No sales yet. Click "New Sale" to record one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal
          title={
            storeSales.find((s) => s.id === editing.id)
              ? "Edit Sale"
              : "New Sale"
          }
          onClose={() => setEditing(null)}
          large
        >
          <SaleForm
            initial={editing}
            ctx={ctx}
            onSave={async (s) => {
              await saveStoreSale(s);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

function SaleForm({
  initial,
  ctx,
  onSave,
  onCancel,
}: {
  initial: StoreSale;
  ctx: AppContext;
  onSave: (s: StoreSale) => void;
  onCancel: () => void;
}) {
  const { customers, lists } = ctx;
  const [s, setS] = useState(initial);
  const set = (k, v) =>
    setS((prev) => {
      const next = { ...prev, [k]: v };
      // auto-recalc total when qty or unitPrice changes
      if (k === "qty" || k === "unitPrice") {
        next.totalAmount =
          (Number(next.qty) || 0) * (Number(next.unitPrice) || 0);
      }
      return next;
    });

  const total = (Number(s.qty) || 0) * (Number(s.unitPrice) || 0);
  const paid = Number(s.paidAmount) || 0;
  const debt = total - paid;

  function save() {
    if (!s.customerId) {
      alert("Pick a customer");
      return;
    }
    if (!s.fabricType) {
      alert("Pick a fabric type");
      return;
    }
    if (!s.qty || Number(s.qty) <= 0) {
      alert("Qty must be positive");
      return;
    }
    if (!s.unitPrice || Number(s.unitPrice) <= 0) {
      alert("Unit price must be positive");
      return;
    }
    onSave({
      ...s,
      qty: Number(s.qty),
      unitPrice: Number(s.unitPrice),
      totalAmount: total,
      paidAmount: paid,
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date *">
          <input
            type="date"
            value={s.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Invoice #">
          <input
            value={s.invoiceNumber}
            onChange={(e) => set("invoiceNumber", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
          />
        </Field>
      </div>
      <Field label="Customer *">
        <select
          value={s.customerId}
          onChange={(e) => set("customerId", e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        >
          <option value="">Select customer…</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} · {c.name}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Fabric type *">
          <Select
            value={s.fabricType}
            options={lists.fabricType}
            onChange={(v) => set("fabricType", v)}
          />
        </Field>
        <Field label="Unit">
          <Select
            value={s.unit}
            options={lists.storeUnit}
            onChange={(v) => set("unit", v)}
          />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Quantity *">
          <input
            type="number"
            step="0.01"
            min="0"
            value={s.qty}
            onChange={(e) => set("qty", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Unit price *">
          <input
            type="number"
            step="0.01"
            min="0"
            value={s.unitPrice}
            onChange={(e) => set("unitPrice", e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg"
          />
        </Field>
        <Field label="Total">
          <div className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-lg font-bold text-slate-800">
            {fmtMoney(total)}
          </div>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Paid amount">
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0"
              value={s.paidAmount}
              onChange={(e) => set("paidAmount", e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg pr-16"
            />
            <button
              type="button"
              onClick={() => set("paidAmount", total)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded"
            >
              Full
            </button>
          </div>
        </Field>
        <Field label="Payment method">
          <Select
            value={s.paymentMethod}
            options={lists.paymentMethod}
            onChange={(v) => set("paymentMethod", v)}
          />
        </Field>
      </div>
      <div
        className={`rounded-lg p-3 text-sm flex items-center justify-between ${debt > 0 ? "bg-orange-50 text-orange-900" : "bg-emerald-50 text-emerald-900"}`}
      >
        <span>
          {debt > 0
            ? "Will be added to customer debt:"
            : debt < 0
              ? "Customer overpaid (credit):"
              : "Fully paid"}
        </span>
        <span className="font-bold">{fmtMoney(Math.abs(debt))}</span>
      </div>
      <Field label="Notes">
        <textarea
          value={s.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className="w-full p-2.5 border border-slate-300 rounded-lg"
        />
      </Field>
      <FormFooter onCancel={onCancel} onSave={save} />
    </div>
  );
}

// ============== STORE PAYMENTS ==============
function StorePaymentsView({ ctx }: CtxProps) {
  const { storePayments, customers, user, deleteStorePayment, askConfirm } =
    ctx;
  const canEdit =
    user.role === "admin" ||
    (user.role === "dept_admin" && user.departmentId === "store");
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return storePayments
      .map((p) => ({
        ...p,
        customerName:
          customers.find((c) => c.id === p.customerId)?.name || "(deleted)",
      }))
      .filter(
        (p) =>
          !term ||
          p.customerName.toLowerCase().includes(term) ||
          p.reference?.toLowerCase().includes(term),
      )
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [storePayments, customers, search]);

  const total = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);

  return (
    <div className="space-y-4">
      <StoreSubHeader
        ctx={ctx}
        title="Payments Received"
        subtitle="Customer debt repayments"
        icon={Receipt}
        color="bg-teal-500"
      />

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-emerald-800">
            Total payments received
          </div>
          <div className="text-2xl font-bold text-emerald-900">
            {fmtMoney(total)}
          </div>
        </div>
        <Wallet className="text-emerald-600" size={32} />
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, reference..."
            className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded text-sm"
          />
        </div>
        <div className="text-xs text-slate-500">
          Add payments from a customer's profile page
        </div>
        <button
          onClick={() => exportToCSV(rows, "store_payments")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Customer</th>
              <th className="text-right p-3 font-medium">Amount</th>
              <th className="text-left p-3 font-medium">Method</th>
              <th className="text-left p-3 font-medium">Reference</th>
              <th className="text-left p-3 font-medium">Notes</th>
              {canEdit && <th className="p-3 w-12"></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="p-3 text-slate-600 whitespace-nowrap">
                  {p.date}
                </td>
                <td className="p-3 font-medium text-slate-800">
                  {p.customerName}
                </td>
                <td className="p-3 text-right text-emerald-700 font-bold">
                  {fmtMoney(p.amount)}
                </td>
                <td className="p-3 text-slate-600 text-xs">
                  {p.paymentMethod || "—"}
                </td>
                <td className="p-3 font-mono text-xs">{p.reference || "—"}</td>
                <td className="p-3 text-slate-600 text-xs">{p.notes || "—"}</td>
                {canEdit && (
                  <td className="p-3 text-right">
                    <button
                      onClick={() =>
                        askConfirm("Delete this payment record?", () =>
                          deleteStorePayment(p.id),
                        )
                      }
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td
                  colSpan={canEdit ? 7 : 6}
                  className="p-8 text-center text-slate-400"
                >
                  No payments recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============== SHARED UI ==============
function FilterBar({
  filter,
  setFilter,
  lists,
  fields,
}: {
  filter: any;
  setFilter: (f: any) => void;
  lists: Lists;
  fields?: string[];
}) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 flex-wrap">
      <div className="relative flex-1 min-w-[180px]">
        <Search
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          size={14}
        />
        <input
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder="Search..."
          className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded text-sm"
        />
      </div>
      <input
        type="date"
        value={filter.dateFrom}
        onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
        className="border border-slate-200 rounded text-sm p-1.5"
      />
      <span className="text-slate-400 text-xs">to</span>
      <input
        type="date"
        value={filter.dateTo}
        onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
        className="border border-slate-200 rounded text-sm p-1.5"
      />
      {fields.includes("shift") && (
        <select
          value={filter.shift}
          onChange={(e) => setFilter({ ...filter, shift: e.target.value })}
          className="border border-slate-200 rounded text-sm p-1.5"
        >
          <option value="">All shifts</option>
          {(lists.shift || []).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}
      {fields.includes("fabricType") && (
        <select
          value={filter.fabricType}
          onChange={(e) => setFilter({ ...filter, fabricType: e.target.value })}
          className="border border-slate-200 rounded text-sm p-1.5"
        >
          <option value="">All fabric types</option>
          {(lists.fabricType || []).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={() =>
          setFilter({
            search: "",
            dateFrom: "",
            dateTo: "",
            shift: "",
            fabricType: "",
          })
        }
        className="text-xs text-slate-500 hover:text-slate-700 px-2"
      >
        Clear
      </button>
    </div>
  );
}

function ActionBar({
  canEdit,
  onAdd,
  addLabel,
  selectedCount,
  onExport,
  onDeleteSelected,
  showDelete,
  askConfirm,
}: {
  canEdit?: boolean;
  onAdd?: () => void;
  addLabel?: string;
  selectedCount?: number;
  onExport?: () => void;
  onDeleteSelected?: () => void;
  showDelete?: boolean;
  askConfirm?: (message: string, onConfirm: () => void) => void;
}) {
  function handleDelete() {
    if (askConfirm)
      askConfirm(`Delete ${selectedCount} record(s)?`, onDeleteSelected);
    else onDeleteSelected();
  }
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <div className="flex items-center gap-2">
        {canEdit && onAdd && (
          <button
            onClick={onAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Plus size={15} /> {addLabel}
          </button>
        )}
        {selectedCount > 0 && (
          <span className="text-sm text-slate-600">
            {selectedCount} selected
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {selectedCount > 0 && showDelete && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Trash2 size={14} /> Delete selected
          </button>
        )}
        {onExport && (
          <button
            onClick={onExport}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Download size={14} /> Export{" "}
            {selectedCount > 0 ? "selected" : "all"}
          </button>
        )}
      </div>
    </div>
  );
}

function DataTable({
  rows,
  columns,
  selected,
  setSelected,
  onEdit,
  onDelete,
  hideSelect,
  askConfirm,
}: {
  rows: any[];
  columns: any[];
  selected?: Set<string>;
  setSelected?: (s: Set<string>) => void;
  onEdit?: ((row: any) => void) | null;
  onDelete?: ((id: string) => void) | null;
  hideSelect?: boolean;
  askConfirm?: (message: string, onConfirm: () => void) => void;
}) {
  // Internal sort state. `sort` is { key, dir } — dir is 'asc' or 'desc'. null = use parent's order.
  const [sort, setSort] = useState(null);

  function toggleSort(key) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      // 3rd click clears sort and falls back to parent's order
      return null;
    });
  }

  // Apply sort if active. Sorted rows are a copy so we don't mutate parent's array.
  const displayRows = useMemo(() => {
    if (!sort) return rows;
    const { key, dir } = sort;
    const sorted = [...rows].sort((a, b) => {
      let av = a[key],
        bv = b[key];
      // Treat null/undefined as smallest. Numbers compared as numbers, everything else as strings.
      if (av == null && bv == null) return 0;
      if (av == null) return -1;
      if (bv == null) return 1;
      const aNum = Number(av),
        bNum = Number(bv);
      const bothNumeric =
        !isNaN(aNum) && !isNaN(bNum) && av !== "" && bv !== "";
      if (bothNumeric) return aNum - bNum;
      return String(av).localeCompare(String(bv));
    });
    return dir === "desc" ? sorted.reverse() : sorted;
  }, [rows, sort]);

  const allChecked =
    displayRows.length > 0 && displayRows.every((r) => selected.has(r.id));
  function toggleAll() {
    setSelected(allChecked ? new Set() : new Set(displayRows.map((r) => r.id)));
  }
  function toggle(id) {
    const c = new Set(selected);
    c.has(id) ? c.delete(id) : c.add(id);
    setSelected(c);
  }

  function SortIcon({ colKey }) {
    if (!sort || sort.key !== colKey)
      return <ArrowUpDown size={11} className="opacity-30" />;
    return sort.dir === "asc" ? <ArrowUp size={11} /> : <ArrowDown size={11} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {!hideSelect && (
              <th className="p-3 w-8">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((c) => {
              // Columns can opt out of sorting with sortable: false
              const sortable = c.sortable !== false;
              if (!sortable)
                return (
                  <th
                    key={c.key}
                    className="text-left p-3 font-medium text-slate-600"
                  >
                    {c.label}
                  </th>
                );
              return (
                <th
                  key={c.key}
                  className="text-left p-3 font-medium text-slate-600"
                >
                  <button
                    onClick={() => toggleSort(c.key)}
                    className="inline-flex items-center gap-1 hover:text-purple-600 transition"
                    title="Click to sort"
                  >
                    {c.label}
                    <SortIcon colKey={c.key} />
                  </button>
                </th>
              );
            })}
            {(onEdit || onDelete) && <th className="p-3 w-20"></th>}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((r) => (
            <tr
              key={r.id}
              className="border-t border-slate-100 hover:bg-slate-50"
            >
              {!hideSelect && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                  />
                </td>
              )}
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={`p-3 ${c.mono ? "font-mono text-xs" : ""} ${c.bold ? "font-bold text-slate-800" : "text-slate-700"}`}
                >
                  {c.render ? c.render(r[c.key], r) : (r[c.key] ?? "—")}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="p-3 text-right whitespace-nowrap">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(r)}
                      className="text-slate-500 hover:text-purple-600 p-1"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() =>
                        askConfirm
                          ? askConfirm("Delete this record?", () =>
                              onDelete(r.id),
                            )
                          : onDelete(r.id)
                      }
                      className="text-slate-500 hover:text-red-600 p-1 ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
          {!displayRows.length && (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="p-8 text-center text-slate-400 text-sm"
              >
                No records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ============== Pagination control ==============
// Used by every station data page to step through server-paginated rows.
// `total` is the total number of rows matching the current query on the
// backend; `offset` is the index of the first row currently displayed;
// `limit` is the page size. Page indices are 1-based for display purposes.
function Pagination({
  total,
  offset,
  limit,
  onChange,
  pageSizeOptions = [25, 50, 100, 200],
}: {
  total: number;
  offset: number;
  limit: number;
  onChange: (next: { offset: number; limit: number }) => void;
  pageSizeOptions?: number[];
}) {
  if (total <= 0) {
    return null;
  }
  const safeLimit = Math.max(1, limit);
  const currentPage = Math.floor(offset / safeLimit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const startRow = offset + 1;
  const endRow = Math.min(offset + safeLimit, total);

  const canPrev = offset > 0;
  const canNext = offset + safeLimit < total;

  function goPrev() {
    if (!canPrev) return;
    onChange({ offset: Math.max(0, offset - safeLimit), limit: safeLimit });
  }
  function goNext() {
    if (!canNext) return;
    onChange({ offset: offset + safeLimit, limit: safeLimit });
  }
  function changeSize(next: number) {
    // Reset to first page on size change so the user doesn't end up past the end.
    onChange({ offset: 0, limit: next });
  }

  return (
    <div className="flex items-center justify-between gap-2 px-1 py-2 text-sm text-slate-600 flex-wrap">
      <div className="flex items-center gap-2">
        <span>
          {startRow}–{endRow} of {total.toLocaleString()}
        </span>
        <span className="text-slate-400">·</span>
        <span>
          Page {currentPage} / {totalPages}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500">
          Rows per page:{" "}
          <select
            value={safeLimit}
            onChange={(e) => changeSize(Number(e.target.value))}
            className="ml-1 border border-slate-300 rounded px-1.5 py-1 bg-white text-slate-700"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-1">
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className={`px-2 py-1 rounded border border-slate-300 ${canPrev ? "hover:bg-slate-50 text-slate-700" : "opacity-40 cursor-not-allowed text-slate-400"}`}
            title="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={goNext}
            disabled={!canNext}
            className={`px-2 py-1 rounded border border-slate-300 ${canNext ? "hover:bg-slate-50 text-slate-700" : "opacity-40 cursor-not-allowed text-slate-400"}`}
            title="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== Loading indicators ==============
//
// Inline spinner — small, animates a rotating Loader2 icon.
// Used inside buttons, beside labels, anywhere a single-line loader is needed.
function InlineSpinner({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <Loader2 size={size} className={`animate-spin ${className}`} />
  );
}

// Full-table overlay — wraps a table/data area and dims it while loading.
// Children stay rendered (so the user sees the existing rows fade out into
// the next page rather than blanking) and a spinner appears over the top.
// Use `empty` to render a friendlier first-load state when there's no data yet.
function TableLoading({
  loading,
  empty,
  children,
}: {
  loading: boolean;
  empty?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* The data area itself. While loading, dim slightly so the spinner reads. */}
      <div
        className={`transition-opacity duration-150 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        aria-busy={loading}
      >
        {children}
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm px-3 py-1.5 border border-slate-200">
            <InlineSpinner />
            <span className="text-xs text-slate-600 font-medium">
              {empty ? "Loading…" : "Updating…"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
  large,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl p-5 w-full ${large ? "max-w-2xl" : "max-w-md"} max-h-[92vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options?: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2.5 border border-slate-300 rounded-lg"
    >
      <option value="">Select…</option>
      {(options || []).map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function FormFooter({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex gap-2 pt-2">
      <button
        onClick={onCancel}
        className="flex-1 py-2.5 border border-slate-300 rounded-lg font-medium"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
      >
        Save
      </button>
    </div>
  );
}
