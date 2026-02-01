// src/services/waitlistClient.js
import { supabase } from "../lib/supabaseClient";

export async function submitWaitlistSignup({
  email,
  role = "cliente",
  source = "landing",
  consentVersion = "privacy_v1",
  honeypot = "",
} = {}) {
  const normalizedEmail = String(email || "").trim();
  if (!normalizedEmail) {
    return { ok: false, error: "invalid_email" };
  }

  const payload = {
    email: normalizedEmail,
    role,
    source,
    consent_version: consentVersion,
    honeypot,
  };

  const { data, error } = await supabase.functions.invoke("waitlist-signup", {
    body: payload,
  });

  if (error) {
    return { ok: false, error: error.message || String(error) };
  }

  return data ?? { ok: false, error: "empty_response" };
}
