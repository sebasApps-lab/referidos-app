// src/lib/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Cuando ya tengas tus claves reales, las activas aquí:
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cliente real:
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Por ahora dejamos un mock para no romper nada:
export const supabase = {
  auth: {
    signInWithPassword: async () => {
      console.warn("Supabase login desactivado (modo ALPHA)");
      return { data: null, error: null };
    },
    signUp: async () => {
      console.warn("Supabase signUp desactivado (modo ALPHA)");
      return { data: null, error: null };
    },
  },
};
