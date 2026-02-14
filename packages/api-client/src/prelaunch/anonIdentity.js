const DEFAULT_PREFIX = "referidos:prelaunch";
const DEFAULT_SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function safeStorage(storageCandidate) {
  if (!storageCandidate) return null;
  if (
    typeof storageCandidate.getItem !== "function" ||
    typeof storageCandidate.setItem !== "function"
  ) {
    return null;
  }
  return storageCandidate;
}

function createUuid() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `anon_${Date.now()}_${Math.random().toString(16).slice(2, 12)}`;
}

function parseSessionPayload(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.id !== "string" || !parsed.id) return null;
    const lastSeen = Number(parsed.last_seen_at || 0);
    return {
      id: parsed.id,
      last_seen_at: Number.isFinite(lastSeen) ? lastSeen : 0,
    };
  } catch {
    return null;
  }
}

export function getOrCreateAnonId({
  localStorageRef = safeStorage(globalThis.localStorage),
  keyPrefix = DEFAULT_PREFIX,
} = {}) {
  if (!localStorageRef) return createUuid();
  const key = `${keyPrefix}:anon_id`;
  const existing = localStorageRef.getItem(key);
  if (existing) return existing;
  const next = createUuid();
  localStorageRef.setItem(key, next);
  return next;
}

export function getOrCreateVisitSessionId({
  sessionStorageRef = safeStorage(globalThis.sessionStorage),
  keyPrefix = DEFAULT_PREFIX,
  sessionTimeoutMs = DEFAULT_SESSION_TIMEOUT_MS,
} = {}) {
  if (!sessionStorageRef) return createUuid();
  const key = `${keyPrefix}:visit_session`;
  const now = Date.now();
  const existing = parseSessionPayload(sessionStorageRef.getItem(key));
  if (existing && now - existing.last_seen_at <= sessionTimeoutMs) {
    sessionStorageRef.setItem(
      key,
      JSON.stringify({ id: existing.id, last_seen_at: now }),
    );
    return existing.id;
  }
  const next = createUuid();
  sessionStorageRef.setItem(key, JSON.stringify({ id: next, last_seen_at: now }));
  return next;
}

export function buildAnonymousIdentity({
  localStorageRef = safeStorage(globalThis.localStorage),
  sessionStorageRef = safeStorage(globalThis.sessionStorage),
  keyPrefix = DEFAULT_PREFIX,
  sessionTimeoutMs = DEFAULT_SESSION_TIMEOUT_MS,
} = {}) {
  return {
    anon_id: getOrCreateAnonId({ localStorageRef, keyPrefix }),
    visit_session_id: getOrCreateVisitSessionId({
      sessionStorageRef,
      keyPrefix,
      sessionTimeoutMs,
    }),
  };
}

export function extractUtmFromSearch(search = "") {
  const params = new URLSearchParams(search || "");
  return {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
    term: params.get("utm_term"),
    content: params.get("utm_content"),
  };
}
