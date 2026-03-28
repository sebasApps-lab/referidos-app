// src/waitlist/waitlistApi.js
import { getDefaultUtm, getPrelaunchClient } from "../services/prelaunchSystem";

function getReferralCodeFromLocation() {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search || "");
    return String(params.get("ref") || "").trim().toUpperCase();
  } catch {
    return "";
  }
}

export async function submitWaitlistSignup({
  email,
  role = "cliente",
  source = "landing",
  consentVersion = "privacy_v1",
  honeypot = "",
  referralCode = "",
} = {}) {
  const prelaunchClient = getPrelaunchClient();
  if (!prelaunchClient) {
    return { ok: false, error: "missing_env" };
  }

  const normalizedEmail = String(email || "").trim();
  if (!normalizedEmail) {
    return { ok: false, error: "invalid_email" };
  }

  const roleIntent = role === "negocio" ? "negocio" : "cliente";

  const response = await prelaunchClient.waitlist.submit({
    email: normalizedEmail,
    role_intent: roleIntent,
    source,
    consent_version: consentVersion,
    honeypot,
    referral_code: String(referralCode || getReferralCodeFromLocation()).trim().toUpperCase(),
    utm: getDefaultUtm(),
  });

  if (!response.ok) {
    return { ok: false, error: response.error || "request_failed" };
  }

  return response.data ?? { ok: false, error: "empty_response" };
}
