import { supabase } from "../lib/supabaseClient";

const LOG_QUEUE_KEY = "referidos:log-queue";
const LOG_SESSION_KEY = "referidos:log-session";
const MAX_QUEUE = 200;
const MAX_BATCH = 20;
const FLUSH_INTERVAL_MS = 8000;
const MAX_PER_MINUTE = 40;
const PERFORMANCE_SAMPLE_RATE = 0.2;
const DEDUPE_WINDOW_MS = 2 * 60 * 1000;

const ALLOWED_LEVELS = new Set(["info", "warn", "error"]);
const ALLOWED_CATEGORIES = new Set([
  "auth",
  "onboarding",
  "scanner",
  "promos",
  "payments",
  "network",
  "ui_flow",
  "performance",
]);

let initialized = false;
let enabled = true;
let queue = [];
let flushTimer = null;
let baseContext = {};
let rateWindowStart = 0;
let rateCount = 0;
const dedupeMap = new Map();

const getSessionId = () => {
  if (typeof sessionStorage === "undefined") return null;
  const existing = sessionStorage.getItem(LOG_SESSION_KEY);
  if (existing) return existing;
  const next =
    (window.crypto?.randomUUID && window.crypto.randomUUID()) ||
    `sess_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
  sessionStorage.setItem(LOG_SESSION_KEY, next);
  return next;
};

const persistQueue = () => {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(LOG_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // no-op
  }
};

const loadQueue = () => {
  try {
    if (typeof localStorage === "undefined") return;
    const raw = localStorage.getItem(LOG_QUEUE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      queue = parsed.slice(0, MAX_QUEUE);
    }
  } catch {
    // no-op
  }
};

const rateLimitExceeded = () => {
  const now = Date.now();
  if (now - rateWindowStart > 60 * 1000) {
    rateWindowStart = now;
    rateCount = 0;
  }
  if (rateCount >= MAX_PER_MINUTE) return true;
  rateCount += 1;
  return false;
};

const fingerprintKey = ({ category, message, route, stack }) =>
  `${category}|${message}|${route || ""}|${stack || ""}`;

const shouldDedupe = (key) => {
  const now = Date.now();
  const last = dedupeMap.get(key);
  if (last && now - last < DEDUPE_WINDOW_MS) {
    return true;
  }
  dedupeMap.set(key, now);
  return false;
};

const sanitizeMessage = (value) => {
  if (!value) return "";
  let next = String(value);
  next = next.replace(/bearer\s+[a-z0-9\-_\.]+/gi, "bearer [redacted]");
  next = next.replace(/(access|refresh)_token\"?\s*:\s*\"[^\"]+\"/gi, "$1_token\":\"[redacted]\"");
  next = next.replace(/authorization\"?\s*:\s*\"[^\"]+\"/gi, "authorization\":\"[redacted]\"");
  next = next.replace(/cookie\"?\s*:\s*\"[^\"]+\"/gi, "cookie\":\"[redacted]\"");
  return next;
};

const buildNetworkLabel = () => {
  if (typeof navigator === "undefined") return null;
  const online = navigator.onLine ? "online" : "offline";
  const effective = navigator.connection?.effectiveType || "unknown";
  return `${online}:${effective}`;
};

const enqueue = (event) => {
  queue.push(event);
  if (queue.length > MAX_QUEUE) {
    queue = queue.slice(queue.length - MAX_QUEUE);
  }
  persistQueue();
  scheduleFlush();
};

const scheduleFlush = () => {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_INTERVAL_MS);
};

const flush = async () => {
  if (!enabled) return;
  if (!queue.length) return;
  if (typeof navigator !== "undefined" && !navigator.onLine) return;

  const batch = queue.slice(0, MAX_BATCH);
  queue = queue.slice(MAX_BATCH);
  persistQueue();

  const { error } = await supabase.functions.invoke("support-log-event", {
    body: { events: batch },
  });

  if (error) {
    queue = batch.concat(queue);
    persistQueue();
    return;
  }

  if (queue.length) {
    scheduleFlush();
  }
};

export const initLogger = () => {
  if (initialized) return;
  initialized = true;
  loadQueue();
  const sessionId = getSessionId();
  baseContext = {
    ...baseContext,
    session_id: sessionId,
    device: typeof navigator !== "undefined" ? navigator.userAgent : null,
    network: buildNetworkLabel(),
  };

  if (typeof window !== "undefined") {
    window.addEventListener("online", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        flush();
      }
    });
  }
};

export const setLoggerEnabled = (value) => {
  enabled = Boolean(value);
};

export const setLoggerUser = ({ role } = {}) => {
  baseContext = {
    ...baseContext,
    role: role || null,
  };
};

export const setLoggerContext = (partial) => {
  baseContext = {
    ...baseContext,
    ...partial,
  };
};

export const logEvent = ({
  level = "info",
  category = "ui_flow",
  message,
  context = {},
  context_extra = {},
}) => {
  if (!enabled) return;
  if (!ALLOWED_LEVELS.has(level)) return;
  if (!ALLOWED_CATEGORIES.has(category)) return;

  if (category === "performance" && Math.random() > PERFORMANCE_SAMPLE_RATE) {
    return;
  }

  if (rateLimitExceeded()) return;

  const sanitized = sanitizeMessage(message);
  if (!sanitized) return;
  const stack = context?.stack ? String(context.stack).split("\n")[0] : "";
  const route = context?.route || baseContext.route;
  const key = fingerprintKey({
    category,
    message: sanitized.toLowerCase(),
    route,
    stack,
  });
  if (shouldDedupe(key)) return;

  enqueue({
    level,
    category,
    message: sanitized,
    context: {
      ...baseContext,
      ...context,
      network: buildNetworkLabel(),
    },
    context_extra,
  });
};

export const logBreadcrumb = (message, context = {}) => {
  logEvent({
    level: "info",
    category: "ui_flow",
    message,
    context,
    context_extra: { type: "breadcrumb" },
  });
};

export const logError = (error, context = {}) => {
  const message = error?.message || String(error || "unknown_error");
  logEvent({
    level: "error",
    category: "ui_flow",
    message,
    context: {
      ...context,
      stack: error?.stack || context?.stack,
    },
  });
};

export const flushLogs = flush;
