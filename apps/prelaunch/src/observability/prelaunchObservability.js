import { createObservabilityClient } from "@referidos/observability";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const TENANT_HINT = import.meta.env.VITE_DEFAULT_TENANT_ID || "ReferidosAPP";
const APP_ID = import.meta.env.VITE_APP_ID || "prelaunch";

let client = null;
let initialized = false;

function createSupabaseInvokeAdapter() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return {
    functions: {
      invoke: async (fnName, options = {}) => {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/${fnName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(options.body || {}),
        });
        const payload = await response.json().catch(() => null);
        if (!response.ok) {
          return {
            data: null,
            error: {
              message: payload?.message || payload?.error || "invoke_failed",
            },
          };
        }
        return { data: payload, error: null };
      },
    },
  };
}

export function initPrelaunchObservability() {
  if (initialized) return client;
  initialized = true;

  const adapter = createSupabaseInvokeAdapter();
  if (!adapter) return null;

  client = createObservabilityClient({
    supabase: adapter,
    endpoint: "obs-ingest",
    policyEndpoint: "obs-policy",
    tenantHint: TENANT_HINT,
    appId: APP_ID,
    source: "web",
    env: import.meta.env,
  });

  client.init();
  client.setContext({
    route: window.location.pathname,
    flow: "prelaunch",
    flow_step: "landing",
  });
  client.captureMessage("info", "prelaunch_loaded", {
    route: window.location.pathname,
    source: "prelaunch_boot",
  });

  return client;
}
