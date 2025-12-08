// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente browser sin anon_key ni service_role.
 * Usa flujo PKCE para obtener tokens de sesion dinamicos.
 * Env requerido:
 *  - VITE_SUPABASE_URL=https://...supabase.co
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

if (!SUPABASE_URL) {
  throw new Error("Missing Supabase env var VITE_SUPABASE_URL");
}

export const supabase = createClient(SUPABASE_URL, {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
