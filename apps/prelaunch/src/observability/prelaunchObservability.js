import {
  createErrorRuntime,
  createObservabilityClient,
  createPolicyRuntime,
} from "@referidos/observability";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;
const TENANT_HINT = import.meta.env.VITE_DEFAULT_TENANT_ID || "ReferidosAPP";
const APP_ID = import.meta.env.VITE_APP_ID || "prelaunch";

let client = null;
let runtime = null;
let initialized = false;

function createSupabaseInvokeAdapter() {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) return null;
  return {
    functions: {
      invoke: async (fnName, options = {}) => {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/${fnName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
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
  if (initialized) return runtime;
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
  runtime = createErrorRuntime({
    observabilityClient: client,
    policyRuntime: createPolicyRuntime(),
    appConfig: {
      appId: APP_ID,
      tenantHint: TENANT_HINT,
      source: "web",
    },
  });

  runtime.init();
  runtime.setContext({
    route: window.location.pathname,
    flow: "prelaunch",
    flow_step: "landing",
  });
  runtime.logEvent({
    level: "info",
    message: "prelaunch_loaded",
    context: { route: window.location.pathname, source: "prelaunch_boot" },
  });

  return runtime;
}
