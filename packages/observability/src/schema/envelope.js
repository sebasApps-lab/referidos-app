import { scrubUnknown } from "../utils/scrub.js";

const ALLOWED_LEVEL = new Set(["fatal", "error", "warn", "info", "debug"]);
const ALLOWED_TYPE = new Set(["error", "log", "performance", "security", "audit"]);
const ALLOWED_SOURCE = new Set(["web", "edge", "worker"]);

export function buildReleaseFromEnv(importMetaEnv = {}) {
  const appVersion =
    importMetaEnv.VITE_APP_VERSION ||
    importMetaEnv.VITE_RELEASE ||
    importMetaEnv.VITE_COMMIT_SHA ||
    "dev";
  const buildId =
    importMetaEnv.VITE_BUILD_ID || importMetaEnv.VITE_COMMIT_SHA || "";
  const env = importMetaEnv.MODE || importMetaEnv.VITE_ENV || "development";
  const appId = importMetaEnv.VITE_APP_ID || "referidos-app";
  return {
    app_version: appVersion,
    build_id: buildId,
    env,
    app_id: appId,
  };
}

function toIso(value) {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

function clampText(value, maxLen) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

export function normalizeEnvelope(input = {}, defaults = {}) {
  const level = ALLOWED_LEVEL.has(String(input.level || "").toLowerCase())
    ? String(input.level).toLowerCase()
    : "error";
  const eventType = ALLOWED_TYPE.has(String(input.event_type || input.type || "").toLowerCase())
    ? String(input.event_type || input.type).toLowerCase()
    : "error";
  const source = ALLOWED_SOURCE.has(String(input.source || "").toLowerCase())
    ? String(input.source).toLowerCase()
    : defaults.source || "web";
  const message =
    clampText(input.message, 1200) ||
    clampText(input?.error?.message, 1200) ||
    "unknown error";

  const context = scrubUnknown(input.context || {});
  const extras = scrubUnknown(input.extras || input.context_extra || {});
  const device = scrubUnknown(input.device || {});
  const breadcrumbs = Array.isArray(input.breadcrumbs)
    ? scrubUnknown(input.breadcrumbs).slice(-50)
    : [];
  const error = scrubUnknown(input.error || {});

  return {
    tenant_hint: defaults.tenantHint || null,
    app_id: defaults.appId || null,
    source,
    event_type: eventType,
    level,
    timestamp: toIso(input.timestamp || input.occurred_at),
    fingerprint: clampText(input.fingerprint, 255),
    message,
    error,
    context,
    extras,
    device,
    release: scrubUnknown({
      ...(defaults.release || {}),
      ...(input.release || {}),
    }),
    tags: scrubUnknown(input.tags || {}),
    breadcrumbs,
    request_id: clampText(input.request_id, 120),
    trace_id: clampText(input.trace_id, 120),
    session_id: clampText(input.session_id, 120),
    user_ref: scrubUnknown(input.user_ref || {}),
  };
}

export function validateEnvelope(envelope = {}) {
  if (!envelope.message || typeof envelope.message !== "string") {
    return { ok: false, code: "invalid_message" };
  }
  if (!envelope.event_type || !ALLOWED_TYPE.has(envelope.event_type)) {
    return { ok: false, code: "invalid_event_type" };
  }
  if (!envelope.level || !ALLOWED_LEVEL.has(envelope.level)) {
    return { ok: false, code: "invalid_level" };
  }
  if (!envelope.source || !ALLOWED_SOURCE.has(envelope.source)) {
    return { ok: false, code: "invalid_source" };
  }
  return { ok: true };
}
