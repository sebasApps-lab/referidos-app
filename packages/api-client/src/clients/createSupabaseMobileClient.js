import { createClient } from "@supabase/supabase-js";

const DEFAULT_OPTIONS = {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

/**
 * @param {{ url?: string, anonKey?: string, options?: import("@supabase/supabase-js").SupabaseClientOptions<"public"> }} [config]
 */
export function createSupabaseMobileClient({
  url,
  anonKey,
  options = {},
} = {}) {
  if (!url || !anonKey) {
    throw new Error("Missing mobile supabase config (url/anonKey).");
  }
  return createClient(url, anonKey, {
    ...options,
    auth: {
      ...DEFAULT_OPTIONS.auth,
      ...options.auth,
    },
  });
}
