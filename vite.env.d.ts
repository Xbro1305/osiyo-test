
/// <reference types="vite/client" />
 
// Custom env vars used by the textile tracker frontend.
// Add any new VITE_* variables here so TypeScript knows about them.
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // Legacy CRA-style fallback (some teams still use REACT_APP_* — Vite reads
  // these only if you configure `envPrefix` in vite.config.ts).
  readonly REACT_APP_API_URL?: string;
}
 
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
 