import { createClient } from "@supabase/supabase-js";

const DEFAULT_OPTIONS = {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

export function createSupabaseMobileClient({
  url,
  anonKey,
  options = {},
} = {}) {
  if (!url || !anonKey) {
    throw new Error("Missing mobile supabase config (url/anonKey).");
  }
  return createClient(url, anonKey, {
    ...DEFAULT_OPTIONS,
    ...options,
  });
}
