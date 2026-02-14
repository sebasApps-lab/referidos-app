// src/waitlist/waitlistApi.js
import { getDefaultUtm, getPrelaunchClient } from "../services/prelaunchSystem";

export async function submitWaitlistSignup({
  email,
  role = "cliente",
  source = "landing",
  consentVersion = "privacy_v1",
  honeypot = "",
} = {}) {
  const prelaunchClient = getPrelaunchClient();
  if (!prelaunchClient) {
    return { ok: false, error: "missing_env" };
  }

  const normalizedEmail = String(email || "").trim();
  if (!normalizedEmail) {
    return { ok: false, error: "invalid_email" };
  }

  const roleIntent =
    role === "negocio_interest" || role === "negocio" ? "negocio" : "cliente";

  const response = await prelaunchClient.waitlist.submit({
    email: normalizedEmail,
    role_intent: roleIntent,
    source,
    consent_version: consentVersion,
    honeypot,
    utm: getDefaultUtm(),
  });

  if (!response.ok) {
    return { ok: false, error: response.error || "request_failed" };
  }

  return response.data ?? { ok: false, error: "empty_response" };
}
