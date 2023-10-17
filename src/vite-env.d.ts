/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EVERY_ORG_API: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
