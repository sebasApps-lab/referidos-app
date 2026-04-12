import { supabase } from "../../../lib/supabaseClient";

async function invokeOpsTelemetryAdmin(action, payload = {}) {
  const { data, error } = await supabase.functions.invoke("ops-telemetry-admin-proxy", {
    body: {
      action,
      payload,
    },
  });

  if (error) {
    throw new Error(error.message || "No se pudo contactar ops-telemetry-admin-proxy.");
  }
  if (!data?.ok) {
    const proxyError = new Error(data?.detail || data?.error || "ops-telemetry-admin-proxy failed");
    proxyError.code = data?.error || "ops_telemetry_admin_proxy_failed";
    proxyError.payload = data?.payload || null;
    throw proxyError;
  }

  return data.data;
}

export async function fetchDlqPurgePreview({ limit = 50 } = {}) {
  return invokeOpsTelemetryAdmin("fetch_dlq_purge_preview", { limit });
}

export async function fetchDlqPurgeEvents({
  groupKey = "",
  limit = 100,
  offset = 0,
} = {}) {
  return invokeOpsTelemetryAdmin("fetch_dlq_purge_events", {
    groupKey,
    limit,
    offset,
  });
}
