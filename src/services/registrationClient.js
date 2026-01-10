// src/services/registrationClient.js
import { supabase } from "../lib/supabaseClient";

export async function runValidateRegistration() {
  const { data: { session } = {} } = await supabase.auth.getSession();
  if (!session?.access_token) {
    return { ok: false, error: "no_session" };
  }

  const { data, error } = await supabase.functions.invoke(
    "validate-registration",
    {
      headers: { Authorization: `Bearer ${session.access_token}` },
    }
  );

  if (error) {
    return { ok: false, error: error.message || String(error) };
  }

  return data ?? { ok: false, error: "empty_response" };
}
