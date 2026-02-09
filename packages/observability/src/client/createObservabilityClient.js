import {
  buildReleaseFromEnv,
  normalizeEnvelope,
  validateEnvelope,
} from "../schema/envelope.js";
import { scrubUnknown } from "../utils/scrub.js";

const MAX_QUEUE = 300;
const MAX_BATCH = 20;
const FLUSH_INTERVAL_MS = 8000;
const DEDUPE_WINDOW_MS = 2 * 60 * 1000;
const STORAGE_KEY = "referidos:obs:queue";
const SESSION_KEY = "referidos:obs:session";

function stableHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(hash >>> 0);
}

function routePath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

function getSessionId() {
  if (typeof sessionStorage === "undefined") return null;
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const next =
    (globalThis.crypto?.randomUUID && globalThis.crypto.randomUUID()) ||
    `obs_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
  sessionStorage.setItem(SESSION_KEY, next);
  return next;
}

function defaultRequest(method = "GET", input = "", status = 0, latency = 0) {
  return {
    type: "http",
    timestamp: new Date().toISOString(),
    message: `${method} ${input} ${status}`,
    data: { latency_ms: latency },
  };
}

export function createObservabilityClient(options = {}) {
  const {
    supabase,
    endpoint = "obs-ingest",
    policyEndpoint = "obs-policy",
    tenantHint = null,
    appId = "referidos-app",
    env = {},
    enabled = true,
    source = "web",
    captureUnhandled = true,
    captureNetworkBreadcrumbs = true,
  } = options;

  const release = buildReleaseFromEnv(env);
  const state = {
    initialized: false,
    enabled: Boolean(enabled),
    queue: [],
    timer: null,
    dedupe: new Map(),
    breadcrumbs: [],
    flushRunning: false,
    context: {
      route: routePath(),
      session_id: getSessionId(),
      flow: null,
      flow_step: null,
      role: null,
      request_id: null,
      trace_id: null,
    },
  };

  function persistQueue() {
    try {
      if (typeof localStorage === "undefined") return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.queue));
    } catch {
      // no-op
    }
  }

  function loadQueue() {
    try {
      if (typeof localStorage === "undefined") return;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.queue = parsed.slice(0, MAX_QUEUE);
      }
    } catch {
      // no-op
    }
  }

  function rememberBreadcrumb(entry) {
    state.breadcrumbs.push(scrubUnknown(entry));
    if (state.breadcrumbs.length > 50) {
      state.breadcrumbs = state.breadcrumbs.slice(-50);
    }
  }

  function shouldDedupe(key) {
    const now = Date.now();
    const last = state.dedupe.get(key);
    if (last && now - last < DEDUPE_WINDOW_MS) return true;
    state.dedupe.set(key, now);
    return false;
  }

  function scheduleFlush() {
    if (state.timer) return;
    state.timer = setTimeout(() => {
      state.timer = null;
      flush();
    }, FLUSH_INTERVAL_MS);
  }

  async function invokeFn(name, body) {
    if (!supabase?.functions?.invoke) {
      throw new Error("supabase_client_missing");
    }
    const { data, error } = await supabase.functions.invoke(name, { body });
    if (error) throw error;
    return data;
  }

  async function flush() {
    if (!state.enabled) return { ok: false, code: "logger_disabled" };
    if (state.flushRunning) return { ok: true, queued: state.queue.length };
    if (!state.queue.length) return { ok: true, queued: 0 };
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return { ok: false, code: "offline" };
    }

    state.flushRunning = true;
    const batch = state.queue.slice(0, MAX_BATCH);
    state.queue = state.queue.slice(MAX_BATCH);
    persistQueue();

    try {
      const payload = {
        tenant_hint: tenantHint,
        app_id: appId,
        events: batch,
      };
      await invokeFn(endpoint, payload);
      if (state.queue.length) scheduleFlush();
      return { ok: true, queued: state.queue.length };
    } catch (error) {
      state.queue = batch.concat(state.queue).slice(0, MAX_QUEUE);
      persistQueue();
      return {
        ok: false,
        code: "flush_failed",
        error: error?.message || String(error),
      };
    } finally {
      state.flushRunning = false;
    }
  }

  function enqueue(envelope) {
    state.queue.push(envelope);
    if (state.queue.length > MAX_QUEUE) {
      state.queue = state.queue.slice(state.queue.length - MAX_QUEUE);
    }
    persistQueue();
    scheduleFlush();
  }

  function capture(input = {}) {
    if (!state.enabled) return null;
    const envelope = normalizeEnvelope(
      {
        ...input,
        source,
        context: {
          ...(state.context || {}),
          ...(input.context || {}),
          route: routePath(),
        },
        release,
        breadcrumbs: input.breadcrumbs || state.breadcrumbs,
      },
      { tenantHint, appId, release, source },
    );
    const valid = validateEnvelope(envelope);
    if (!valid.ok) return null;

    const key = stableHash(
      `${envelope.event_type}|${envelope.level}|${envelope.message}|${envelope.context?.route || ""}`,
    );
    if (shouldDedupe(key)) return null;

    enqueue(envelope);
    return envelope;
  }

  function captureMessage(level, message, context = {}, extras = {}) {
    return capture({
      event_type: "log",
      level,
      message,
      context,
      extras,
    });
  }

  function captureException(error, context = {}, extras = {}) {
    const err = error instanceof Error ? error : new Error(String(error || "unknown_error"));
    return capture({
      event_type: "error",
      level: "error",
      message: err.message,
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
      context,
      extras,
    });
  }

  function addBreadcrumb(message, data = {}) {
    rememberBreadcrumb({
      type: "ui",
      timestamp: new Date().toISOString(),
      message,
      data: scrubUnknown(data),
    });
  }

  async function fetchPolicy(input = {}) {
    try {
      return await invokeFn(policyEndpoint, {
        tenant_hint: tenantHint,
        app_id: appId,
        ...input,
      });
    } catch (error) {
      return {
        ok: false,
        code: "policy_unavailable",
        error: error?.message || String(error),
      };
    }
  }

  function setContext(partial = {}) {
    state.context = {
      ...state.context,
      ...partial,
    };
  }

  function setEnabled(value) {
    state.enabled = Boolean(value);
  }

  function installGlobalHandlers() {
    if (typeof window === "undefined") return () => {};
    const onError = (event) => {
      captureException(event?.error || event?.message || "window_error", {
        route: routePath(),
        source: "window_error",
      });
    };
    const onRejection = (event) => {
      captureException(event?.reason || "unhandled_rejection", {
        route: routePath(),
        source: "unhandled_rejection",
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }

  function installNetworkBreadcrumbs() {
    if (typeof window === "undefined" || typeof window.fetch !== "function") {
      return () => {};
    }
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (...args) => {
      const start = performance.now();
      let method = "GET";
      let url = "";
      const input = args[0];
      const init = args[1] || {};
      if (typeof input === "string") {
        url = input;
      } else if (input?.url) {
        url = input.url;
      }
      if (init?.method) method = String(init.method).toUpperCase();

      try {
        const response = await originalFetch(...args);
        const elapsed = Math.max(0, Math.round(performance.now() - start));
        rememberBreadcrumb(defaultRequest(method, url, response.status, elapsed));
        return response;
      } catch (error) {
        const elapsed = Math.max(0, Math.round(performance.now() - start));
        rememberBreadcrumb(defaultRequest(method, url, 0, elapsed));
        throw error;
      }
    };
    return () => {
      window.fetch = originalFetch;
    };
  }

  function init() {
    if (state.initialized) return () => {};
    state.initialized = true;
    loadQueue();
    const cleanupGlobal = captureUnhandled ? installGlobalHandlers() : () => {};
    const cleanupNetwork = captureNetworkBreadcrumbs
      ? installNetworkBreadcrumbs()
      : () => {};
    if (typeof window !== "undefined") {
      window.addEventListener("online", flush);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") flush();
      });
    }
    return () => {
      cleanupGlobal?.();
      cleanupNetwork?.();
      if (typeof window !== "undefined") {
        window.removeEventListener("online", flush);
      }
    };
  }

  return {
    init,
    flush,
    setContext,
    setEnabled,
    addBreadcrumb,
    captureMessage,
    captureException,
    fetchPolicy,
    getState: () => ({
      enabled: state.enabled,
      queueSize: state.queue.length,
      context: { ...state.context },
    }),
  };
}
