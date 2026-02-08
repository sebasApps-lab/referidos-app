// src/services/onboardingClient.js
import { supabase } from "../lib/supabaseClient";

export async function runOnboardingCheck() {
  const { data: { session } = {}} = await supabase.auth.getSession();
  if (!session?.access_token) return { ok: false, error: "no_session"};

  const { data, error } = await supabase.functions.invoke("onboarding", {
    headers: { Authorization: `Bearer ${session.access_token}`},
  });

  if (error) return { ok: false, error: error.message || String(error) };
  return data ?? { ok: false, error: "empty_response" };
}