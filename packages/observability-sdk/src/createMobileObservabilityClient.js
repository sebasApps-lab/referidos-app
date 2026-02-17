const DEFAULT_MAX_PER_MINUTE = 80;
const DEFAULT_PER_LEVEL_PER_MINUTE = Object.freeze({
  fatal: 20,
  error: 35,
  warn: 60,
  info: 80,
  debug: 30,
});
const DEFAULT_CATEGORY_SAMPLING = Object.freeze({
  performance: 0.2,
  debug: 0.4,
});
const DEFAULT_FLUSH_SIZE = 10;
const DEFAULT_FLUSH_INTERVAL_MS = 5000;
const DEFAULT_DEDUPE_WINDOW_MS = 2 * 60 * 1000;
const MAX_QUEUE = 300;

const ALLOWED_LEVELS = new Set(["fatal", "error", "warn", "info", "debug"]);

const TOKEN_RE = /bearer\s+[a-z0-9\-_.]+/gi;
const ACCESS_TOKEN_RE = /(access|refresh)_token\"?\s*:\s*\"[^\"]+\"/gi;
const AUTH_HEADER_RE = /authorization\"?\s*:\s*\"[^\"]+\"/gi;
const COOKIE_RE = /cookie\"?\s*:\s*\"[^\"]+\"/gi;
const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_RE = /\+?\d[\d\s\-()]{7,}\d/g;
const QUERY_RE = /([?&](token|code|key|apikey|password|pass|secret|auth)=)([^&#]+)/gi;

function nowMinuteKey() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}-${now.getUTCMinutes()}`;
}

function stableHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(hash >>> 0);
}

function randomId(prefix) {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}_${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
}

function clampText(value, maxLen) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

function normalizeLevel(value) {
  const next = String(value || "").toLowerCase();
  return ALLOWED_LEVELS.has(next) ? next : "info";
}

function normalizeCategory(value) {
  const next = String(value || "").trim().toLowerCase();
  return next || "log";
}

function normalizeEventType(rawType, category) {
  const eventType = String(rawType || "").trim().toLowerCase();
  if (eventType === "performance") return "performance";
  if (eventType === "security") return "security";
  if (eventType === "audit") return "audit";
  if (eventType === "error") return "error";
  if (eventType === "log") return "log";
  if (category === "performance") return "performance";
  if (category === "security") return "security";
  if (category === "audit") return "audit";
  return "log";
}

function normalizeSampling(input = {}) {
  const next = { ...DEFAULT_CATEGORY_SAMPLING };
  for (const [key, value] of Object.entries(input || {})) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
      next[String(key).toLowerCase()] = parsed;
    }
  }
  return next;
}

function normalizePerLevelLimits(input = {}) {
  const next = { ...DEFAULT_PER_LEVEL_PER_MINUTE };
  for (const level of Object.keys(DEFAULT_PER_LEVEL_PER_MINUTE)) {
    const parsed = Number(input[level]);
    if (Number.isFinite(parsed) && parsed > 0) {
      next[level] = Math.floor(parsed);
    }
  }
  return next;
}

function maskEmail(value) {
  const [local, domain] = value.split("@");
  if (!domain || local.length < 2) return value;
  return `${local[0]}***@${domain[0]}***`;
}

function maskPhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return value;
  return `${"*".repeat(Math.max(digits.length - 4, 2))}${digits.slice(-4)}`;
}

function scrubString(value) {
  if (typeof value !== "string") return value;
  let next = value;
  next = next.replace(TOKEN_RE, "bearer [redacted]");
  next = next.replace(ACCESS_TOKEN_RE, "$1_token\":\"[redacted]\"");
  next = next.replace(AUTH_HEADER_RE, "authorization\":\"[redacted]\"");
  next = next.replace(COOKIE_RE, "cookie\":\"[redacted]\"");
  next = next.replace(QUERY_RE, "$1[redacted]");
  next = next.replace(EMAIL_RE, (match) => maskEmail(match));
  next = next.replace(PHONE_RE, (match) => maskPhone(match));
  return next;
}

function scrubUnknown(value, depth = 0) {
  if (depth > 5) return "[truncated]";
  if (typeof value === "string") return scrubString(value);
  if (value == null || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.slice(0, 80).map((item) => scrubUnknown(item, depth + 1));
  }
  if (typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) {
      if (/(password|secret|token|cookie|authorization|apikey|key)/i.test(key)) {
        out[key] = "[redacted]";
      } else {
        out[key] = scrubUnknown(entry, depth + 1);
      }
    }
    return out;
  }
  return "[unsupported]";
}

/**
 * @typedef {Object} MobileObservabilityClientOptions
 * @property {{ logs?: { logEvent?: (payload: any) => Promise<any> } }} [api]
 * @property {Record<string, any>} [baseContext]
 * @property {number} [maxPerMinute]
 * @property {Record<"fatal"|"error"|"warn"|"info"|"debug", number>} [perLevelPerMinute]
 * @property {Record<string, number>} [categorySampling]
 * @property {number} [flushSize]
 * @property {number} [flushIntervalMs]
 * @property {number} [dedupeWindowMs]
 */

/**
 * @param {MobileObservabilityClientOptions} [options]
 */
export function createMobileObservabilityClient({
  api,
  baseContext = {},
  maxPerMinute = DEFAULT_MAX_PER_MINUTE,
  perLevelPerMinute = DEFAULT_PER_LEVEL_PER_MINUTE,
  categorySampling = DEFAULT_CATEGORY_SAMPLING,
  flushSize = DEFAULT_FLUSH_SIZE,
  flushIntervalMs = DEFAULT_FLUSH_INTERVAL_MS,
  dedupeWindowMs = DEFAULT_DEDUPE_WINDOW_MS,
} = {}) {
  const safeMaxPerMinute =
    Number.isFinite(Number(maxPerMinute)) && Number(maxPerMinute) > 0
      ? Math.floor(Number(maxPerMinute))
      : DEFAULT_MAX_PER_MINUTE;
  const safeFlushSize =
    Number.isFinite(Number(flushSize)) && Number(flushSize) > 0
      ? Math.max(1, Math.min(20, Math.floor(Number(flushSize))))
      : DEFAULT_FLUSH_SIZE;
  const safeFlushIntervalMs =
    Number.isFinite(Number(flushIntervalMs)) && Number(flushIntervalMs) > 0
      ? Math.max(300, Math.floor(Number(flushIntervalMs)))
      : DEFAULT_FLUSH_INTERVAL_MS;
  const safeDedupeWindowMs =
    Number.isFinite(Number(dedupeWindowMs)) && Number(dedupeWindowMs) > 0
      ? Math.floor(Number(dedupeWindowMs))
      : DEFAULT_DEDUPE_WINDOW_MS;
  const safePerLevel = normalizePerLevelLimits(perLevelPerMinute);
  const safeSampling = normalizeSampling(categorySampling);

  const sessionId = randomId("obs_session");

  let queue = [];
  let timer = null;
  let minuteKey = nowMinuteKey();
  let countInMinute = 0;
  let perLevelCount = { fatal: 0, error: 0, warn: 0, info: 0, debug: 0 };
  let flushInProgress = false;
  let requestCounter = 0;
  let runtimeContext = { session_id: sessionId };
  let contextProvider = null;
  const dedupe = new Map();

  function resetMinuteIfNeeded() {
    const key = nowMinuteKey();
    if (key !== minuteKey) {
      minuteKey = key;
      countInMinute = 0;
      perLevelCount = { fatal: 0, error: 0, warn: 0, info: 0, debug: 0 };
    }
  }

  function shouldSample(category) {
    const ratio = safeSampling[String(category || "").toLowerCase()];
    if (typeof ratio !== "number") return true;
    return Math.random() <= ratio;
  }

  function canSend(level) {
    resetMinuteIfNeeded();
    if (countInMinute >= safeMaxPerMinute) return false;
    const safeLevel = normalizeLevel(level);
    if (perLevelCount[safeLevel] >= safePerLevel[safeLevel]) return false;
    countInMinute += 1;
    perLevelCount[safeLevel] += 1;
    return true;
  }

  function nextRequestId() {
    requestCounter += 1;
    return `${sessionId}_${String(requestCounter).padStart(6, "0")}`;
  }

  function shouldDedupe(payload) {
    const keySeed = String(
      payload.fingerprint ||
        `${payload.event_type}|${payload.level}|${payload.message}|${payload.context?.route || ""}|${payload.context?.screen || ""}`,
    );
    const key = stableHash(keySeed);
    const now = Date.now();
    const last = dedupe.get(key);
    if (last && now - last < safeDedupeWindowMs) return true;
    dedupe.set(key, now);
    return false;
  }

  function resolveContext(eventContext = {}) {
    const providerContext =
      typeof contextProvider === "function" ? contextProvider() || {} : {};
    return scrubUnknown({
      ...baseContext,
      ...runtimeContext,
      ...providerContext,
      ...(eventContext || {}),
      session_id:
        eventContext.session_id ||
        runtimeContext.session_id ||
        providerContext.session_id ||
        sessionId,
    });
  }

  function buildFingerprint(input) {
    const explicit = clampText(scrubString(String(input.fingerprint || "")), 255);
    if (explicit) return explicit;
    const seed = [
      String(input.event_type || "").toLowerCase(),
      String(input.level || "").toLowerCase(),
      String(input.message || "").toLowerCase().replace(/\d+/g, "0"),
      String(input.context?.route || "").toLowerCase(),
      String(input.context?.screen || "").toLowerCase(),
      String(input.context?.role || "").toLowerCase(),
      String(input.error?.code || "").toLowerCase(),
    ].join("|");
    return stableHash(seed);
  }

  function normalizePayload(input = {}) {
    const level = normalizeLevel(input.level);
    const category = normalizeCategory(input.category);
    const eventType = normalizeEventType(input.event_type || input.type, category);
    const message = clampText(scrubString(String(input.message || "")), 1200);
    if (!message) return null;
    if (!shouldSample(category)) return null;
    if (!canSend(level)) return null;

    const createdAt = new Date().toISOString();
    const context = resolveContext(input.context || {});

    const requestIdSource = input.request_id || context.request_id || nextRequestId();
    const requestId = clampText(scrubString(String(requestIdSource || "")), 120);
    const traceIdSource = input.trace_id || context.trace_id || `${requestId || nextRequestId()}_trace`;
    const traceId = clampText(scrubString(String(traceIdSource || "")), 120);
    const resolvedSessionId = clampText(
      scrubString(String(input.session_id || context.session_id || sessionId)),
      120,
    );

    const release = scrubUnknown({
      app_id: context.app_id || baseContext.app_id || "referidos-android",
      app_version: context.app_version || baseContext.app_version || "0.0.0-mobile",
      build_id: context.build_id || baseContext.build_id || "",
      env: context.env || baseContext.env || "development",
      ...(input.release || {}),
    });

    const payload = {
      source: "web",
      event_type: eventType,
      level,
      message,
      context,
      extras: scrubUnknown(input.extras || {}),
      error: scrubUnknown(input.error || {}),
      device: scrubUnknown(input.device || context.device_summary || {}),
      user_ref: scrubUnknown(input.user_ref || context.user_ref || {}),
      request_id: requestId || null,
      trace_id: traceId || null,
      session_id: resolvedSessionId || null,
      timestamp: createdAt,
      created_at: createdAt,
      release,
      app_id: String(release?.app_id || "referidos-android"),
      event_domain: input.event_domain || context.event_domain || "observability",
      category,
      route: clampText(String(input.route || context.route || ""), 220) || null,
      screen: clampText(String(input.screen || context.screen || ""), 220) || null,
      flow: clampText(String(input.flow || context.flow || ""), 220) || null,
      flow_step: clampText(String(input.flow_step || context.flow_step || ""), 220) || null,
      breadcrumbs: Array.isArray(input.breadcrumbs)
        ? scrubUnknown(input.breadcrumbs).slice(-50)
        : [],
      breadcrumbs_meta: scrubUnknown(
        input.breadcrumbs_meta ||
          input.breadcrumbsMeta || {
            runtime_initialized: true,
            runtime_health: "ok",
            storage_status: "unavailable",
            source: Array.isArray(input.breadcrumbs) ? "provided" : "none",
          },
      ),
    };

    const supportThreadId = clampText(
      String(input.thread_id || context.thread_id || input.support_thread_id || ""),
      64,
    );
    if (supportThreadId) payload.thread_id = supportThreadId;

    const fingerprint = buildFingerprint({ ...payload, fingerprint: input.fingerprint });
    payload.fingerprint = fingerprint;

    if (shouldDedupe(payload)) return null;
    return payload;
  }

  async function flush() {
    if (flushInProgress || queue.length === 0) return;
    if (typeof api?.logs?.logEvent !== "function") return;
    flushInProgress = true;
    const batch = queue.slice(0, safeFlushSize);
    queue = queue.slice(safeFlushSize);
    await Promise.allSettled(batch.map((event) => api.logs.logEvent(event)));
    flushInProgress = false;
    if (queue.length > 0) scheduleFlush();
  }

  function scheduleFlush() {
    if (timer) return;
    timer = setTimeout(async () => {
      timer = null;
      await flush();
    }, safeFlushIntervalMs);
  }

  async function track(event) {
    if (!event || typeof event !== "object") return null;
    const payload = normalizePayload(event);
    if (!payload) return null;
    queue.push(payload);
    if (queue.length > MAX_QUEUE) {
      queue = queue.slice(queue.length - MAX_QUEUE);
    }
    if (payload.level === "error" || payload.level === "fatal" || queue.length >= safeFlushSize) {
      await flush();
      return payload;
    }
    scheduleFlush();
    return payload;
  }

  function setContext(partial = {}) {
    runtimeContext = {
      ...runtimeContext,
      ...(partial || {}),
    };
  }

  function setContextProvider(provider) {
    contextProvider = typeof provider === "function" ? provider : null;
  }

  async function shutdown() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    await flush();
  }

  return {
    track,
    flush,
    shutdown,
    setContext,
    setContextProvider,
    getState: () => ({
      queueSize: queue.length,
      sessionId,
      context: { ...runtimeContext },
    }),
  };
}
