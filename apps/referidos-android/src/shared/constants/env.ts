// Local runtime fallback for React Native CLI builds.
// Fill apps/referidos-android/env.json in local dev.
let FILE_ENV: Record<string, unknown> = {};
try {
  // Optional by design: env.json is local-only and ignored by git.
  // If missing, runtime env variables are used as fallback.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  FILE_ENV = require("../../../env.json");
} catch {
  FILE_ENV = {};
}

function normalizeValue(value: unknown) {
  return String(value ?? "")
    .trim()
    .replace(/^['"]+|['"]+$/g, "");
}

const FILE_SUPABASE_URL = normalizeValue(FILE_ENV.SUPABASE_URL);
const FILE_SUPABASE_ANON_KEY = normalizeValue(FILE_ENV.SUPABASE_ANON_KEY);
const FILE_APP_VERSION = normalizeValue(FILE_ENV.APP_VERSION);

const RUNTIME_SUPABASE_URL = normalizeValue(
  process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
);
const RUNTIME_SUPABASE_ANON_KEY = normalizeValue(
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
);
const RUNTIME_APP_VERSION = normalizeValue(
  process.env.EXPO_PUBLIC_APP_VERSION || process.env.APP_VERSION,
);

export const MOBILE_ENV = {
  // Prefer local env.json in React Native CLI to avoid stale shell env overriding.
  SUPABASE_URL: FILE_SUPABASE_URL || RUNTIME_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: FILE_SUPABASE_ANON_KEY || RUNTIME_SUPABASE_ANON_KEY || "",
  APP_VERSION: FILE_APP_VERSION || RUNTIME_APP_VERSION || "0.0.0-mobile",
};

export function assertMobileEnv() {
  if (!MOBILE_ENV.SUPABASE_URL || !MOBILE_ENV.SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE_URL / SUPABASE_ANON_KEY for referidos-android.");
  }
  // Guard against malformed values (quotes/typos) before supabase-js client bootstrap.
  if (!/^https?:\/\/[^/\s]+/i.test(MOBILE_ENV.SUPABASE_URL)) {
    throw new Error(
      `Invalid SUPABASE_URL for referidos-android: "${MOBILE_ENV.SUPABASE_URL}"`,
    );
  }
}
