// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente browser: usa clave publicable (anon/publishable) y PKCE.
 * Env requerido:
 *  - VITE_SUPABASE_URL
 *  - VITE_SUPABASE_ANON_KEY (publishable)
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase env vars VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
