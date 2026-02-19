// src/services/onboardingClient.js
import { supabase } from "../lib/supabaseClient";
import { logCatalogBreadcrumb } from "./loggingClient";

export async function runOnboardingCheck() {
  logCatalogBreadcrumb("onboarding.check.start");
  const { data: { session } = {}} = await supabase.auth.getSession();
  if (!session?.access_token) {
    logCatalogBreadcrumb("onboarding.check.error", {
      error: "no_session",
    });
    return { ok: false, error: "no_session"};
  }

  const { data, error } = await supabase.functions.invoke("onboarding", {
    headers: { Authorization: `Bearer ${session.access_token}`},
  });

  if (error) {
    logCatalogBreadcrumb("onboarding.check.error", {
      error: error.message || String(error),
    });
    return { ok: false, error: error.message || String(error) };
  }
  if (!data) {
    logCatalogBreadcrumb("onboarding.check.error", {
      error: "empty_response",
    });
    return { ok: false, error: "empty_response" };
  }
  logCatalogBreadcrumb("onboarding.check.ok", {
    allow_access: data?.allowAccess === true,
    role: data?.usuario?.role || null,
    email_confirmed: Boolean(data?.email_confirmed),
  });
  return data;
}
