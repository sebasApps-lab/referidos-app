import { supabase } from "../../../lib/supabaseClient";

function normalizeDays(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 7;
  return Math.max(1, Math.min(90, Math.round(parsed)));
}

async function invokeWithAuth(fnName, body = {}) {
  const {
    data: { session } = {},
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    return { ok: false, error: "no_session" };
  }

  const { data, error } = await supabase.functions.invoke(fnName, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    body,
  });

  if (error) {
    return { ok: false, error: error.message || "request_failed" };
  }
  if (data?.ok === false) {
    return { ok: false, error: data.error || data.message || "request_failed" };
  }

  return { ok: true, data };
}

export async function fetchPrelaunchMetrics({
  days = 7,
  appChannel = "",
} = {}) {
  return invokeWithAuth("admin-prelaunch-metrics", {
    days: normalizeDays(days),
    app_channel: appChannel || null,
  });
}
