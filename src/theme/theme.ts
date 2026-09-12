// ---------------------------------------------------------------------------
// Theme context, extracted from src/App.tsx.
//
// Same reason as src/i18n/lang.tsx: pages that live OUTSIDE the App.tsx
// monolith need these, and importing them from App.tsx would be circular —
// App.tsx has to import those pages in order to route to them.
//
// Behaviour is unchanged.
// ---------------------------------------------------------------------------

import { createContext, useContext } from "react";

export const ThemeContext = createContext<{ theme: string; setTheme: (t: string) => void }>({
  theme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// Minimal helper: return classnames depending on theme (avoids huge tailwind dark: rewrite).
// We swap a small set of background/text/border classes per surface.
export function useThemed() {
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
