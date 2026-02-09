export const MOBILE_ENV = {
  SUPABASE_URL:
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "",
  SUPABASE_ANON_KEY:
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "",
  APP_VERSION:
    process.env.EXPO_PUBLIC_APP_VERSION ||
    process.env.APP_VERSION ||
    "0.0.0-mobile",
};

export function assertMobileEnv() {
  if (!MOBILE_ENV.SUPABASE_URL || !MOBILE_ENV.SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE_URL / SUPABASE_ANON_KEY for referidos-android.");
  }
}
