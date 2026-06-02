/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_CONTACT_API_URL: string;
  readonly VITE_BOOKING_API_URL: string;
  readonly VITE_PAYMENT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
