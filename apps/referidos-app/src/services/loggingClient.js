import {
  createErrorRuntime,
  createObservabilityClient,
  createPolicyRuntime,
} from "@referidos/observability";
import { supabase } from "../lib/supabaseClient";

const importEnv = import.meta.env || {};
const DEFAULT_TENANT_HINT = importEnv.VITE_DEFAULT_TENANT_ID || "ReferidosAPP";
const DEFAULT_APP_ID = importEnv.VITE_APP_ID || "referidos-app";
const DEFAULT_ENV = importEnv.MODE || importEnv.VITE_ENV || "development";
const DEFAULT_VERSION =
  importEnv.VITE_APP_VERSION ||
  importEnv.VITE_VERSION_LABEL ||
  importEnv.VITE_RELEASE ||
  importEnv.VITE_COMMIT_SHA ||
  "dev";
const DEFAULT_BUILD_ID =
  importEnv.VITE_BUILD_ID ||
  importEnv.VITE_SOURCE_COMMIT_SHA ||
  importEnv.VITE_COMMIT_SHA ||
  "";
const DEFAULT_RELEASE_ID =
  importEnv.VITE_VERSION_RELEASE_ID || importEnv.VITE_RELEASE_ID || "";
const DEFAULT_SOURCE_COMMIT_SHA =
  importEnv.VITE_SOURCE_COMMIT_SHA || importEnv.VITE_COMMIT_SHA || "";

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
const RUNTIME_SINGLETON_KEY = "__referidos_observability_runtime__";

const globalScope = globalThis;
if (!globalScope[OBS_SINGLETON_KEY]) {
  globalScope[OBS_SINGLETON_KEY] = createObservabilityClient({
    supabase,
    endpoint: "obs-ingest",
    policyEndpoint: "obs-policy",
    tenantHint: DEFAULT_TENANT_HINT,
    appId: DEFAULT_APP_ID,
    source: "web",
    captureUnhandled: false,
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
if (!globalScope[RUNTIME_SINGLETON_KEY]) {
  globalScope[RUNTIME_SINGLETON_KEY] = createErrorRuntime({
    observabilityClient: globalScope[OBS_SINGLETON_KEY],
    policyRuntime: globalScope[POLICY_SINGLETON_KEY],
    appConfig: {
      appId: DEFAULT_APP_ID,
      tenantHint: DEFAULT_TENANT_HINT,
      source: "web",
    },
  });
}

const observabilityClient = globalScope[OBS_SINGLETON_KEY];
const runtime = globalScope[RUNTIME_SINGLETON_KEY];

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
        meta: {
          versioning: {
            release_id: DEFAULT_RELEASE_ID || null,
            source_commit_sha: DEFAULT_SOURCE_COMMIT_SHA || null,
            version_label: DEFAULT_VERSION,
            env_key: DEFAULT_ENV,
            app_id: DEFAULT_APP_ID,
          },
        },
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

export const initLogger = () => {
  if (initialized) return;
  initialized = true;
  runtime.init();
  runtime.setEnabled(loggerEnabled);
  void registerReleaseOnce();
};

export const setLoggerEnabled = (value) => {
  loggerEnabled = Boolean(value);
  runtime.setEnabled(loggerEnabled);
};

export const setLoggerUser = ({ role } = {}) => {
  runtime.setContext({
    role: role || null,
  });
};

export const setLoggerContext = (partial = {}) => {
  runtime.setContext(partial || {});
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
  runtime.logEvent({
    level: safeLevel,
    category: safeCategory,
    message: message || "",
    context,
    context_extra,
  });
};

export const logBreadcrumb = (message, context = {}) => {
  runtime.addBreadcrumb(message, context || {});
};

export const logError = (error, context = {}) => {
  if (!loggerEnabled) return;
  runtime.logError(error, context || {});
};

export const reportError = async (error, payload = {}) => {
  if (!loggerEnabled) return null;
  return await runtime.reportError(error, payload || {});
};

export const subscribeErrorEvents = (listener) => {
  return runtime.subscribeErrors(listener);
};

export const flushLogs = async () => {
  return await runtime.flush();
};

export const evaluateErrorPolicy = async (payload = {}) => {
  return await runtime.evaluatePolicy(payload);
};

export const beginPolicyAction = (actionKey) => {
  return runtime.beginPolicyAction(actionKey);
};

export const endPolicyAction = (actionKey) => {
  runtime.endPolicyAction(actionKey);
};
