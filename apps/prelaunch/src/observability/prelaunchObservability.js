import {
  createErrorRuntime,
  createObservabilityClient,
  createPolicyRuntime,
} from "@referidos/observability";
import { runtimeConfig } from "../config/runtimeConfig";

const SUPABASE_URL = runtimeConfig.supabaseUrl;
const SUPABASE_PUBLISHABLE_KEY = runtimeConfig.supabasePublishableKey;
const TENANT_HINT = runtimeConfig.defaultTenantId || "ReferidosAPP";
const APP_ID = runtimeConfig.appId || "prelaunch";
const APP_ENV = runtimeConfig.appEnv || "development";
const APP_VERSION = runtimeConfig.appVersion || "dev";
const BUILD_ID = runtimeConfig.buildId || "";
const RELEASE_ID = runtimeConfig.releaseId || "";
const SOURCE_COMMIT_SHA = runtimeConfig.sourceCommitSha || "";

let client = null;
let runtime = null;
let initialized = false;
let releaseRegistered = false;

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

async function registerReleaseOnce(adapter) {
  if (releaseRegistered) return;
  releaseRegistered = true;
  try {
    await adapter.functions.invoke("obs-release", {
      body: {
        tenant_hint: TENANT_HINT,
        app_id: APP_ID,
        app_version: APP_VERSION,
        build_id: BUILD_ID,
        env: APP_ENV,
        meta: {
          versioning: {
            release_id: RELEASE_ID || null,
            source_commit_sha: SOURCE_COMMIT_SHA || null,
            version_label: APP_VERSION,
            env_key: APP_ENV,
            app_id: APP_ID,
          },
        },
      },
    });
  } catch {
    // Best-effort only.
  }
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
    env: {
      MODE: APP_ENV,
      VITE_APP_ID: APP_ID,
      VITE_APP_VERSION: APP_VERSION,
      VITE_BUILD_ID: BUILD_ID,
    },
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
  void registerReleaseOnce(adapter);

  return runtime;
}
