import {
  buildReleaseFromEnv,
  normalizeEnvelope,
  validateEnvelope,
} from "../schema/envelope.js";
import { buildCatalogBreadcrumb, OBS_BREADCRUMB_CATALOG_VERSION } from "../breadcrumbs/catalog.js";
import { scrubUnknown } from "../utils/scrub.js";

const MAX_QUEUE = 300;
const MAX_BATCH = 20;
const FLUSH_INTERVAL_MS = 8000;
const DEDUPE_WINDOW_MS = 2 * 60 * 1000;
const STORAGE_KEY = "referidos:obs:queue";
const SESSION_KEY = "referidos:obs:session";
const BREADCRUMB_STORAGE_KEY = "referidos:obs:breadcrumbs";
const MAX_BREADCRUMBS = 100;
const DEFAULT_BREADCRUMB_TTL_MS = 30 * 60 * 1000;

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

function safeInteger(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.trunc(parsed);
}

function toIso(value, fallbackIso = null) {
  if (!value) return fallbackIso || new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallbackIso || new Date().toISOString();
  return parsed.toISOString();
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

function asObject(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  return {};
}

function asString(value) {
  if (typeof value === "string") {
    const next = value.trim();
    return next || null;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return null;
}

function normalizeBreadcrumbEntry(entry) {
  if (!entry) return null;
  if (typeof entry === "string") {
    const message = entry.trim();
    if (!message) return null;
    return {
      type: "ui",
      timestamp: new Date().toISOString(),
      message,
      code: null,
      channel: "manual",
      data: {},
    };
  }
  if (typeof entry !== "object" || Array.isArray(entry)) return null;

  const safe = asObject(scrubUnknown(entry));
  const message =
    asString(safe.message) ||
    asString(safe.event) ||
    asString(safe.action) ||
    asString(safe.name);
  if (!message) return null;

  const data = asObject(safe.data);
  return {
    type: asString(safe.type) || "ui",
    timestamp: toIso(asString(safe.timestamp)),
    message,
    code: asString(safe.code),
    channel: asString(safe.channel) || "manual",
    data,
  };
}

function pruneBreadcrumbList(list, ttlMs) {
  const now = Date.now();
  const cutoff = now - ttlMs;
  const normalized = [];
  const source = Array.isArray(list) ? list : [];
  for (const item of source) {
    const next = normalizeBreadcrumbEntry(item);
    if (!next) continue;
    const atMs = Date.parse(next.timestamp);
    if (Number.isNaN(atMs) || atMs < cutoff) continue;
    normalized.push(next);
  }
  if (normalized.length <= MAX_BREADCRUMBS) return normalized;
  return normalized.slice(normalized.length - MAX_BREADCRUMBS);
}

function inferMissingBreadcrumbReason({
  count,
  runtimeInitialized,
  runtimeHealth,
  storageStatus,
  sourceHint,
  explicitProvided,
}) {
  if (count > 0) return "present";
  if (runtimeInitialized === false) return "missing_early_boot";
  if (runtimeHealth === "init_failed" || runtimeHealth === "runtime_error") {
    return "missing_runtime_failure";
  }
  if (storageStatus !== "ok") return "missing_storage_unavailable";
  if (sourceHint === "provided" && explicitProvided) return "missing_payload_empty";
  return "missing_unknown";
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
    breadcrumbTtlMs = DEFAULT_BREADCRUMB_TTL_MS,
  } = options;

  const safeBreadcrumbTtlMs = safeInteger(breadcrumbTtlMs, DEFAULT_BREADCRUMB_TTL_MS);
  const release = buildReleaseFromEnv(env);
  const state = {
    initialized: false,
    runtimeInitialized: false,
    runtimeHealth: "init_pending", // init_pending | ok | init_failed | runtime_error
    breadcrumbsStorageStatus: "ok", // ok | unavailable | read_failed | write_failed
    enabled: Boolean(enabled),
    queue: [],
    timer: null,
    dedupe: new Map(),
    breadcrumbs: [],
    breadcrumbsLoadedFromStorage: 0,
    breadcrumbsWrittenInMemory: 0,
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

  function markBreadcrumbStorageStatus(status) {
    if (!status || status === state.breadcrumbsStorageStatus) return;
    state.breadcrumbsStorageStatus = status;
  }

  function persistBreadcrumbs() {
    try {
      if (typeof localStorage === "undefined") {
        markBreadcrumbStorageStatus("unavailable");
        return;
      }
      const payload = pruneBreadcrumbList(state.breadcrumbs, safeBreadcrumbTtlMs);
      state.breadcrumbs = payload;
      localStorage.setItem(BREADCRUMB_STORAGE_KEY, JSON.stringify(payload));
      markBreadcrumbStorageStatus("ok");
    } catch {
      markBreadcrumbStorageStatus("write_failed");
    }
  }

  function loadPersistedBreadcrumbs() {
    try {
      if (typeof localStorage === "undefined") {
        markBreadcrumbStorageStatus("unavailable");
        return [];
      }
      const raw = localStorage.getItem(BREADCRUMB_STORAGE_KEY);
      if (!raw) {
        markBreadcrumbStorageStatus("ok");
        return [];
      }
      const parsed = JSON.parse(raw);
      const normalized = pruneBreadcrumbList(parsed, safeBreadcrumbTtlMs);
      state.breadcrumbsLoadedFromStorage = normalized.length;
      markBreadcrumbStorageStatus("ok");
      return normalized;
    } catch {
      markBreadcrumbStorageStatus("read_failed");
      return [];
    }
  }

  function pruneStateBreadcrumbs({ persist = true } = {}) {
    const before = state.breadcrumbs.length;
    state.breadcrumbs = pruneBreadcrumbList(state.breadcrumbs, safeBreadcrumbTtlMs);
    if (persist && before !== state.breadcrumbs.length) {
      persistBreadcrumbs();
    }
  }

  function rememberBreadcrumb(entry, options = {}) {
    const { persist = true, countAsMemory = true } = options;
    const normalized = normalizeBreadcrumbEntry(entry);
    if (!normalized) return null;

    state.breadcrumbs = pruneBreadcrumbList(
      state.breadcrumbs.concat(normalized),
      safeBreadcrumbTtlMs,
    );
    if (countAsMemory) {
      state.breadcrumbsWrittenInMemory += 1;
    }
    if (persist) persistBreadcrumbs();
    return normalized;
  }

  function addCatalogBreadcrumb(code, data = {}, overrides = {}, options = {}) {
    const built = buildCatalogBreadcrumb(code, scrubUnknown(data), overrides);
    if (!built) return null;
    return rememberBreadcrumb(built, options);
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

  function resolveBreadcrumbSourceHint(explicitProvided) {
    if (explicitProvided) return "provided";
    const fromStorage = state.breadcrumbsLoadedFromStorage > 0;
    const fromMemory = state.breadcrumbsWrittenInMemory > 0;
    if (fromStorage && fromMemory) return "merged";
    if (fromStorage) return "storage";
    if (fromMemory) return "memory";
    return "none";
  }

  function buildBreadcrumbMeta({
    breadcrumbs,
    explicitProvided,
    explicitMeta,
  }) {
    const count = breadcrumbs.length;
    const last = count > 0 ? breadcrumbs[count - 1] : null;
    const sourceHint = resolveBreadcrumbSourceHint(explicitProvided);

    const meta = {
      count,
      last_at: last?.timestamp || null,
      source: sourceHint,
      runtime_initialized: state.runtimeInitialized,
      runtime_health: state.runtimeHealth,
      storage_status: state.breadcrumbsStorageStatus,
      catalog_version: OBS_BREADCRUMB_CATALOG_VERSION,
      explicit_provided: explicitProvided,
      session_id: state.context?.session_id || null,
    };

    const override = asObject(scrubUnknown(explicitMeta));
    const merged = {
      ...meta,
      ...override,
    };

    merged.missing_reason_hint = inferMissingBreadcrumbReason({
      count,
      runtimeInitialized: merged.runtime_initialized,
      runtimeHealth: merged.runtime_health,
      storageStatus: merged.storage_status,
      sourceHint: merged.source,
      explicitProvided: merged.explicit_provided,
    });
    return merged;
  }

  function capture(input = {}) {
    if (!state.enabled) return null;
    pruneStateBreadcrumbs({ persist: true });

    const explicitProvided = Object.prototype.hasOwnProperty.call(input, "breadcrumbs");
    const explicitBreadcrumbs = Array.isArray(input.breadcrumbs)
      ? pruneBreadcrumbList(input.breadcrumbs, safeBreadcrumbTtlMs)
      : null;
    const breadcrumbs = explicitBreadcrumbs || state.breadcrumbs;

    const breadcrumbsMeta = buildBreadcrumbMeta({
      breadcrumbs,
      explicitProvided,
      explicitMeta: input.breadcrumbs_meta || input.breadcrumbsMeta || {},
    });

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
        breadcrumbs,
        breadcrumbs_meta: breadcrumbsMeta,
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

  function addBreadcrumb(messageOrEntry, data = {}) {
    if (messageOrEntry && typeof messageOrEntry === "object" && !Array.isArray(messageOrEntry)) {
      return rememberBreadcrumb(messageOrEntry);
    }
    return rememberBreadcrumb({
      type: "ui",
      timestamp: new Date().toISOString(),
      message: String(messageOrEntry || ""),
      data: scrubUnknown(data),
      channel: "manual",
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
    const next = Boolean(value);
    if (state.enabled === next) return;
    state.enabled = next;
    addCatalogBreadcrumb(next ? "obs.logger.enabled" : "obs.logger.disabled", {
      route: routePath(),
    });
  }

  function setRuntimeHealth(value) {
    const next = asString(value);
    if (!next) return;
    state.runtimeHealth = next;
  }

  function installGlobalHandlers() {
    if (typeof window === "undefined") return () => {};
    const onError = (event) => {
      state.runtimeHealth = "runtime_error";
      addCatalogBreadcrumb("obs.window.error", {
        route: routePath(),
        message: asString(event?.message),
      });
      captureException(event?.error || event?.message || "window_error", {
        route: routePath(),
        source: "window_error",
      });
    };
    const onRejection = (event) => {
      state.runtimeHealth = "runtime_error";
      addCatalogBreadcrumb("obs.window.unhandled_rejection", {
        route: routePath(),
      });
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
        addCatalogBreadcrumb(
          "obs.network.fetch.ok",
          {
            method,
            url,
            status: response.status,
            latency_ms: elapsed,
          },
          { message: `${method} ${url} ${response.status}` },
        );
        return response;
      } catch (error) {
        const elapsed = Math.max(0, Math.round(performance.now() - start));
        addCatalogBreadcrumb(
          "obs.network.fetch.error",
          {
            method,
            url,
            status: 0,
            latency_ms: elapsed,
            error: asString(error?.message) || "network_error",
          },
          { message: `${method} ${url} 0` },
        );
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
    state.runtimeInitialized = false;
    state.runtimeHealth = "init_pending";

    let cleanupGlobal = () => {};
    let cleanupNetwork = () => {};
    let cleanupWindow = () => {};

    try {
      loadQueue();
      const persistedBreadcrumbs = loadPersistedBreadcrumbs();
      if (persistedBreadcrumbs.length > 0) {
        state.breadcrumbs = pruneBreadcrumbList(persistedBreadcrumbs, safeBreadcrumbTtlMs);
      }

      addCatalogBreadcrumb("obs.app_boot.start", { route: routePath() });
      addCatalogBreadcrumb("obs.logger.init", { route: routePath() });

      cleanupGlobal = captureUnhandled ? installGlobalHandlers() : () => {};
      cleanupNetwork = captureNetworkBreadcrumbs
        ? installNetworkBreadcrumbs()
        : () => {};

      if (typeof window !== "undefined") {
        const onOnline = () => {
          addCatalogBreadcrumb("obs.flush.online", { route: routePath() });
          flush();
        };
        const onVisibilityChange = () => {
          if (document.visibilityState === "hidden") {
            addCatalogBreadcrumb("obs.flush.visibility_hidden", { route: routePath() });
            flush();
          }
        };
        window.addEventListener("online", onOnline);
        document.addEventListener("visibilitychange", onVisibilityChange);
        cleanupWindow = () => {
          window.removeEventListener("online", onOnline);
          document.removeEventListener("visibilitychange", onVisibilityChange);
        };
      }

      state.runtimeInitialized = true;
      state.runtimeHealth = "ok";
      addCatalogBreadcrumb("obs.app_boot.ready", { route: routePath() });
    } catch (error) {
      state.runtimeInitialized = false;
      state.runtimeHealth = "init_failed";
      addCatalogBreadcrumb(
        "obs.window.error",
        { phase: "init", error: asString(error?.message) || "init_failed" },
        { message: "Observability init failed" },
      );
    }

    return () => {
      cleanupGlobal?.();
      cleanupNetwork?.();
      cleanupWindow?.();
    };
  }

  return {
    init,
    flush,
    setContext,
    setEnabled,
    setRuntimeHealth,
    addBreadcrumb,
    addCatalogBreadcrumb,
    captureMessage,
    captureException,
    fetchPolicy,
    getState: () => ({
      enabled: state.enabled,
      queueSize: state.queue.length,
      context: { ...state.context },
      breadcrumbsCount: state.breadcrumbs.length,
      breadcrumbsStorageStatus: state.breadcrumbsStorageStatus,
      runtimeInitialized: state.runtimeInitialized,
      runtimeHealth: state.runtimeHealth,
    }),
  };
}
