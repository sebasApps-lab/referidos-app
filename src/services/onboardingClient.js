// src/services/onboardingClient.js
import { supabase } from "../lib/supabaseClient";

let onboardingRun = false;

export async function runOnboardingCheck() {
  if (onboardingRun) return { ok: true, skipped: true };

  const { data: { session } = {}} = await supabase.auth.getSession();
  if (!session?.access_token) return { ok: false, error: "no_session"};

  onboardingRun = true; 
  const { data, error } = await supabase.functions.invoke("onboarding", {
    headers: { Authorization: `Bearer ${session.access_token}`},
  });

  if (error) return { ok: false, error: error.message || String(error) };
  return data; // { ok, allowAccess, registro_estado, usuario, negocio, reasons, provider }
}