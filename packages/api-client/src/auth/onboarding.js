import { invokeWithSession } from "../clients/sessionHelpers.js";

const ONBOARDING_TIMEOUT_MS = 20_000;

export async function runOnboardingCheck(supabase) {
  const response = await invokeWithSession(supabase, "onboarding", {
    timeout: ONBOARDING_TIMEOUT_MS,
  });
  if (!response.ok) return response;
  return response.data ?? { ok: false, error: "empty_response" };
}
