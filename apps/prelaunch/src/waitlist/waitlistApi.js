// src/waitlist/waitlistApi.js

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function submitWaitlistSignup({
  email,
  role = "cliente",
  source = "landing",
  consentVersion = "privacy_v1",
  honeypot = "",
} = {}) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return { ok: false, error: "missing_env" };
  }

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

  const response = await fetch(`${SUPABASE_URL}/functions/v1/waitlist-signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, error: `http_${response.status}` };
  }

  const data = await response.json().catch(() => null);
  return data ?? { ok: false, error: "empty_response" };
}
