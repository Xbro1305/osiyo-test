// ---------------------------------------------------------------------------
// Language context, extracted from src/App.tsx.
//
// It lives here rather than in App.tsx so that pages OUTSIDE the App.tsx
// monolith (the loading scanner, and whatever follows it) can translate their
// own strings without importing from App.tsx — which would be a circular
// import, since App.tsx has to import those pages to route to them.
//
// The behaviour is unchanged: `t(key, fallback)` looks up the active language,
// falls back to English, then to the caller's fallback, then to the key itself.
// ---------------------------------------------------------------------------

import { createContext, useContext } from "react";

import { TRANSLATIONS } from "./translations";

export const LangContext = createContext<{ lang: string; setLang: (l: string) => void }>({
  lang: "en",
  setLang: () => {},
});

export function useT() {
  const { lang } = useContext(LangContext);
  return (key: string, fallback?: string): string =>
    (TRANSLATIONS as any)[lang]?.[key] || (TRANSLATIONS as any).en[key] || fallback || key;
}

export function useLang() {
  return useContext(LangContext);
}
