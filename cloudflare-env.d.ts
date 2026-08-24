import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    MEDIA: R2Bucket;
    SESSION_SECRET: string;
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD_HASH: string;
    NEXT_PUBLIC_SITE_NAME: string;
  }
}

export {};
