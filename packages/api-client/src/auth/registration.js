import { invokeWithSession } from "../clients/sessionHelpers.js";

export async function runValidateRegistration(supabase) {
  const response = await invokeWithSession(supabase, "validate-registration");
  if (!response.ok) return response;
  return response.data ?? { ok: false, error: "empty_response" };
}
