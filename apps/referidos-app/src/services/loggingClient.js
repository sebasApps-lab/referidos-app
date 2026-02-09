import {
  OBS_ERROR_CODES,
  createObservabilityClient,
  createPolicyRuntime,
  normalizeErrorCode,
} from "@referidos/observability";
import { supabase } from "../lib/supabaseClient";

const importEnv = import.meta.env || {};
const DEFAULT_TENANT_HINT = importEnv.VITE_DEFAULT_TENANT_ID || "ReferidosAPP";
const DEFAULT_APP_ID = importEnv.VITE_APP_ID || "referidos-app";
const DEFAULT_ENV = importEnv.MODE || importEnv.VITE_ENV || "development";
const DEFAULT_VERSION =
  importEnv.VITE_APP_VERSION ||
  importEnv.VITE_RELEASE ||
  importEnv.VITE_COMMIT_SHA ||
  "dev";
const DEFAULT_BUILD_ID =
  importEnv.VITE_BUILD_ID || importEnv.VITE_COMMIT_SHA || "";

const LOG_LEVELS = new Set(["fatal", "error", "warn", "info", "debug"]);
const LOG_CATEGORIES = new Set([
  "auth",
  "onboarding",
  "scanner",
  "promos",
  "payments",
  "network",
  "ui_flow",
  "performance",
  "security",
  "audit",
]);

const OBS_SINGLETON_KEY = "__referidos_observability_client__";
const POLICY_SINGLETON_KEY = "__referidos_observability_policy__";

const globalScope = globalThis;
if (!globalScope[OBS_SINGLETON_KEY]) {
  globalScope[OBS_SINGLETON_KEY] = createObservabilityClient({
    supabase,
    endpoint: "obs-ingest",
    policyEndpoint: "obs-policy",
    tenantHint: DEFAULT_TENANT_HINT,
    appId: DEFAULT_APP_ID,
    source: "web",
    env: {
      ...importEnv,
      VITE_APP_ID: DEFAULT_APP_ID,
      VITE_APP_VERSION: DEFAULT_VERSION,
      VITE_BUILD_ID: DEFAULT_BUILD_ID,
      MODE: DEFAULT_ENV,
    },
  });
}
if (!globalScope[POLICY_SINGLETON_KEY]) {
  globalScope[POLICY_SINGLETON_KEY] = createPolicyRuntime();
}

const observabilityClient = globalScope[OBS_SINGLETON_KEY];
const policyRuntime = globalScope[POLICY_SINGLETON_KEY];

let initialized = false;
let releaseRegistered = false;
let loggerEnabled = true;

const registerReleaseOnce = async () => {
  if (releaseRegistered) return;
  releaseRegistered = true;
  try {
    await supabase.functions.invoke("obs-release", {
      body: {
        tenant_hint: DEFAULT_TENANT_HINT,
        app_id: DEFAULT_APP_ID,
        app_version: DEFAULT_VERSION,
        build_id: DEFAULT_BUILD_ID,
        env: DEFAULT_ENV,
      },
    });
  } catch {
    // Best-effort release registration.
  }
};

const sanitizeLevel = (value) => {
  const next = typeof value === "string" ? value.toLowerCase() : "info";
  return LOG_LEVELS.has(next) ? next : "info";
};

const sanitizeCategory = (value) => {
  const next = typeof value === "string" ? value.toLowerCase() : "ui_flow";
  return LOG_CATEGORIES.has(next) ? next : "ui_flow";
};

const normalizedErrorCodeFrom = (payload = {}) => {
  const contextCode = payload?.context?.error_code;
  const explicitCode = payload?.errorCode || payload?.code;
  return normalizeErrorCode(explicitCode || contextCode);
};

const mergePolicy = (remoteAction, localAction) => {
  if (!remoteAction || typeof remoteAction !== "object") return localAction;
  const merged = {
    ui: {
      ...(localAction.ui || {}),
      ...((remoteAction.ui && typeof remoteAction.ui === "object") ? remoteAction.ui : {}),
    },
    auth: {
      ...(localAction.auth || {}),
      ...((remoteAction.auth && typeof remoteAction.auth === "object") ? remoteAction.auth : {}),
    },
    retry: {
      ...(localAction.retry || {}),
      ...((remoteAction.retry && typeof remoteAction.retry === "object") ? remoteAction.retry : {}),
    },
    uam: {
      ...(localAction.uam || {}),
      ...((remoteAction.uam && typeof remoteAction.uam === "object") ? remoteAction.uam : {}),
    },
  };

  if (localAction.auth?.signOut === "none") {
    merged.auth.signOut = "none";
  }
  if (localAction.retry?.allowed === false) {
    merged.retry.allowed = false;
    merged.retry.backoff_ms = 0;
  }
  merged.ui.show = Boolean(localAction.ui?.show);
  return merged;
};

export const initLogger = () => {
  if (initialized) return;
  initialized = true;
  observabilityClient.init();
  observabilityClient.setEnabled(loggerEnabled);
  void registerReleaseOnce();
};

export const setLoggerEnabled = (value) => {
  loggerEnabled = Boolean(value);
  observabilityClient.setEnabled(loggerEnabled);
};

export const setLoggerUser = ({ role } = {}) => {
  observabilityClient.setContext({
    role: role || null,
  });
};

export const setLoggerContext = (partial = {}) => {
  observabilityClient.setContext(partial || {});
};

export const logEvent = ({
  level = "info",
  category = "ui_flow",
  message,
  context = {},
  context_extra = {},
}) => {
  if (!loggerEnabled) return;
  const safeLevel = sanitizeLevel(level);
  const safeCategory = sanitizeCategory(category);
  observabilityClient.captureMessage(
    safeLevel,
    message || "",
    { ...(context || {}), category: safeCategory },
    context_extra || {},
  );
};

export const logBreadcrumb = (message, context = {}) => {
  observabilityClient.addBreadcrumb(message, context || {});
};

export const logError = (error, context = {}) => {
  if (!loggerEnabled) return;
  observabilityClient.captureException(error, context || {});
};

export const flushLogs = async () => {
  return await observabilityClient.flush();
};

export const evaluateErrorPolicy = async (payload = {}) => {
  const errorCode = normalizedErrorCodeFrom(payload);
  const localPolicy = policyRuntime.decideLocal({
    errorCode,
    fingerprint: payload.fingerprint || null,
    route: payload.route || payload?.context?.route || null,
  });

  const remote = await observabilityClient.fetchPolicy({
    tenant_hint: DEFAULT_TENANT_HINT,
    app_id: DEFAULT_APP_ID,
    error_code: errorCode,
    fingerprint: payload.fingerprint || null,
    route: payload.route || payload?.context?.route || null,
    role: payload.role || payload?.context?.role || null,
    context: payload.context || {},
  });

  const merged = mergePolicy(remote?.ok ? remote.action : null, localPolicy);
  return {
    ok: true,
    code: errorCode,
    policy: merged,
    source: remote?.ok ? "remote+local" : "local",
    remoteError: remote?.ok ? null : remote?.code || OBS_ERROR_CODES.POLICY_UNAVAILABLE,
  };
};

export const beginPolicyAction = (actionKey) => {
  return policyRuntime.beginFlight(actionKey);
};

export const endPolicyAction = (actionKey) => {
  policyRuntime.endFlight(actionKey);
};
