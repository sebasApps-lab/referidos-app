import { OBS_ERROR_CODES, normalizeErrorCode } from "../schema/errorCodes.js";
import { errorBus } from "./errorBus.js";

const LEVELS = new Set(["fatal", "error", "warn", "info", "debug"]);
const DEFAULT_CATEGORY = "ui_flow";

function normalizeLevel(value) {
  const level = typeof value === "string" ? value.toLowerCase() : "info";
  return LEVELS.has(level) ? level : "info";
}

function toCode(payload = {}) {
  const contextCode = payload?.context?.error_code;
  return normalizeErrorCode(payload?.errorCode || payload?.code || contextCode);
}

function mergePolicy(localAction, remoteAction) {
  if (!remoteAction || typeof remoteAction !== "object") return localAction;
  const merged = {
    ui: {
      ...(localAction.ui || {}),
      ...((remoteAction.ui && typeof remoteAction.ui === "object")
        ? remoteAction.ui
        : {}),
    },
    auth: {
      ...(localAction.auth || {}),
      ...((remoteAction.auth && typeof remoteAction.auth === "object")
        ? remoteAction.auth
        : {}),
    },
    retry: {
      ...(localAction.retry || {}),
      ...((remoteAction.retry && typeof remoteAction.retry === "object")
        ? remoteAction.retry
        : {}),
    },
    uam: {
      ...(localAction.uam || {}),
      ...((remoteAction.uam && typeof remoteAction.uam === "object")
        ? remoteAction.uam
        : {}),
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
}

export function createErrorRuntime({
  observabilityClient,
  policyRuntime,
  appConfig = {},
  captureUnhandled = true,
} = {}) {
  if (!observabilityClient) {
    throw new Error("createErrorRuntime requires observabilityClient");
  }
  if (!policyRuntime) {
    throw new Error("createErrorRuntime requires policyRuntime");
  }

  const state = {
    initialized: false,
    enabled: true,
    cleanupUnhandled: null,
    appConfig: {
      appId: appConfig.appId || null,
      tenantHint: appConfig.tenantHint || null,
      source: appConfig.source || "web",
    },
  };

  function init() {
    if (state.initialized) return;
    state.initialized = true;
    observabilityClient.init();
    if (captureUnhandled && typeof window !== "undefined") {
      const onError = (event) => {
        if (typeof observabilityClient.setRuntimeHealth === "function") {
          observabilityClient.setRuntimeHealth("runtime_error");
        }
        observabilityClient.addBreadcrumb({
          code: "obs.window.error",
          type: "error",
          channel: "auto",
          timestamp: new Date().toISOString(),
          message: "Unhandled window error",
          data: {
            source: "window_error",
            route: window.location?.pathname || null,
          },
        });
        void reportError(event?.error || event?.message || "window_error", {
          code: "unknown_error",
          context: {
            source: "window_error",
            route: window.location?.pathname || null,
          },
        });
      };
      const onRejection = (event) => {
        if (typeof observabilityClient.setRuntimeHealth === "function") {
          observabilityClient.setRuntimeHealth("runtime_error");
        }
        observabilityClient.addBreadcrumb({
          code: "obs.window.unhandled_rejection",
          type: "error",
          channel: "auto",
          timestamp: new Date().toISOString(),
          message: "Unhandled promise rejection",
          data: {
            source: "unhandled_rejection",
            route: window.location?.pathname || null,
          },
        });
        void reportError(event?.reason || "unhandled_rejection", {
          code: "unknown_error",
          context: {
            source: "unhandled_rejection",
            route: window.location?.pathname || null,
          },
        });
      };
      window.addEventListener("error", onError);
      window.addEventListener("unhandledrejection", onRejection);
      state.cleanupUnhandled = () => {
        window.removeEventListener("error", onError);
        window.removeEventListener("unhandledrejection", onRejection);
      };
    }
  }

  function setEnabled(value) {
    state.enabled = Boolean(value);
    observabilityClient.setEnabled(state.enabled);
  }

  function setContext(partial = {}) {
    observabilityClient.setContext(partial || {});
  }

  function addBreadcrumb(message, context = {}) {
    observabilityClient.addBreadcrumb(message, context || {});
  }

  function logEvent({
    level = "info",
    category = DEFAULT_CATEGORY,
    message,
    context = {},
    context_extra = {},
  } = {}) {
    if (!state.enabled) return null;
    return observabilityClient.captureMessage(
      normalizeLevel(level),
      message || "",
      { ...(context || {}), category: category || DEFAULT_CATEGORY },
      context_extra || {},
    );
  }

  function logError(error, context = {}) {
    if (!state.enabled) return null;
    return observabilityClient.captureException(error, context || {});
  }

  async function flush() {
    return await observabilityClient.flush();
  }

  async function evaluatePolicy(payload = {}) {
    const errorCode = toCode(payload);
    const localPolicy = policyRuntime.decideLocal({
      errorCode,
      fingerprint: payload.fingerprint || null,
      route: payload.route || payload?.context?.route || null,
    });

    const remote = await observabilityClient.fetchPolicy({
      tenant_hint: state.appConfig.tenantHint,
      app_id: state.appConfig.appId,
      error_code: errorCode,
      fingerprint: payload.fingerprint || null,
      route: payload.route || payload?.context?.route || null,
      role: payload.role || payload?.context?.role || null,
      context: payload.context || {},
    });

    const policy = mergePolicy(localPolicy, remote?.ok ? remote.action : null);
    return {
      ok: true,
      code: errorCode,
      policy,
      source: remote?.ok ? "remote+local" : "local",
      remoteError: remote?.ok ? null : remote?.code || OBS_ERROR_CODES.POLICY_UNAVAILABLE,
    };
  }

  async function reportError(error, payload = {}) {
    const code = toCode(payload);
    const route = payload?.route || payload?.context?.route || null;
    const fingerprint = payload?.fingerprint || null;
    const context = {
      ...(payload?.context || {}),
      error_code: code,
      route,
    };
    const captured = logError(error, context);
    const policy = await evaluatePolicy({
      ...payload,
      route,
      fingerprint,
      code,
      errorCode: code,
      context,
    });
    const busEvent = {
      type: "error",
      at: new Date().toISOString(),
      code,
      route,
      fingerprint,
      context,
      policy,
      app_id: state.appConfig.appId,
      tenant_hint: state.appConfig.tenantHint,
      source: state.appConfig.source,
      message: error instanceof Error ? error.message : String(error || ""),
      captured: Boolean(captured),
    };
    errorBus.emit(busEvent);
    return busEvent;
  }

  function beginPolicyAction(actionKey) {
    return policyRuntime.beginFlight(actionKey);
  }

  function endPolicyAction(actionKey) {
    policyRuntime.endFlight(actionKey);
  }

  return {
    init,
    setEnabled,
    setContext,
    addBreadcrumb,
    logEvent,
    logError,
    reportError,
    evaluatePolicy,
    beginPolicyAction,
    endPolicyAction,
    flush,
    subscribeErrors: errorBus.subscribe,
  };
}
