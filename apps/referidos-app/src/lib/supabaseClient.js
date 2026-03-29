// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import { runtimeConfig } from "../config/runtimeConfig";

/**
 * Cliente browser: usa clave publicable (anon/publishable) y PKCE.
 * Env requerido:
 *  - VITE_SUPABASE_URL
 *  - VITE_SUPABASE_ANON_KEY (publishable)
 */
const SUPABASE_URL = runtimeConfig.supabaseUrl;
const SUPABASE_ANON_KEY = runtimeConfig.supabaseAnonKey;
const SUPABASE_SINGLETON_KEY = "__referidos_supabase_client__";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase env vars VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY");
}

const globalScope = globalThis;
if (!globalScope[SUPABASE_SINGLETON_KEY]) {
  globalScope[SUPABASE_SINGLETON_KEY] = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

export const supabase = globalScope[SUPABASE_SINGLETON_KEY];

export default supabase;
