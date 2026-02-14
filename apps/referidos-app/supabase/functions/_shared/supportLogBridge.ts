import { corsHeaders, jsonResponse, publishableKey, supabaseUrl } from "./support.ts";

const DEFAULT_TENANT_HINT = "ReferidosAPP";
const DEFAULT_APP_ID = "referidos-app";

function safeTrim(value: unknown, maxLen = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function safeObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function normalizeLevel(value: unknown) {
  const level = safeTrim(value, 20).toLowerCase();
  if (["fatal", "error", "warn", "info", "debug"].includes(level)) return level;
  return "info";
}

function normalizeEventType(event: Record<string, unknown>) {
  const explicit = safeTrim(event.event_type, 40).toLowerCase();
  if (explicit === "performance") return "performance";
  const category = safeTrim(event.category, 80).toLowerCase();
  if (category === "performance") return "performance";
  return "log";
}

function resolveMessage(event: Record<string, unknown>) {
  const message = safeTrim(event.message, 1200);
  if (message) return message;
  return "support_log";
}

function mapLegacyEvent(event: Record<string, unknown>, appId: string) {
  const context = safeObject(event.context);
  const contextExtra = safeObject(event.context_extra || event.extras);
  const category = safeTrim(event.category || context.category, 80).toLowerCase() || null;
  const threadId =
    safeTrim(event.thread_id || event.ticket_id || context.thread_id || context.ticket_id, 80) ||
    null;

  return {
    event_domain: "support",
    event_type: normalizeEventType(event),
    level: normalizeLevel(event.level),
    message: resolveMessage(event),
    timestamp: safeTrim(event.timestamp || event.created_at || event.occurred_at, 60) ||
      new Date().toISOString(),
    source: "web",
    app_id: safeTrim(event.app_id, 120) || appId,
    request_id: safeTrim(event.request_id || context.request_id, 120) || null,
    session_id: safeTrim(event.session_id || context.session_id, 120) || null,
    category,
    thread_id: threadId,
    context,
    context_extra: contextExtra,
    release: {
      app_id: safeTrim(event.app_id, 120) || appId,
      app_version: safeTrim(event.app_version || context.app_version, 80) || null,
    },
  };
}

function normalizeIncomingEvents(body: Record<string, unknown>, appId: string) {
  const incoming = Array.isArray(body.events) ? body.events : [body];
  const mapped = incoming
    .map((item) => safeObject(item))
    .filter((item) => Object.keys(item).length > 0)
    .map((item) => mapLegacyEvent(item, appId));
  return mapped.slice(0, 20);
}

function getTokenFromRequest(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}

export async function forwardSupportLogsToObsIngest(req: Request) {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  if (!supabaseUrl || !publishableKey) {
    return jsonResponse({ ok: false, error: "missing_env" }, 500, cors);
  }

  const token = getTokenFromRequest(req);
  if (!token) {
    return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);
  }

  const body = await req.json().catch(() => ({}));
  const tenantHint = safeTrim(body.tenant_hint, 120) || DEFAULT_TENANT_HINT;
  const appId = safeTrim(body.app_id, 120) || DEFAULT_APP_ID;
  const events = normalizeIncomingEvents(safeObject(body), appId);

  if (!events.length) {
    return jsonResponse({ ok: false, error: "invalid_body" }, 400, cors);
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/obs-ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tenant_hint: tenantHint,
      app_id: appId,
      events,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    return jsonResponse(
      { ok: false, error: payload?.message || payload?.error || "obs_ingest_failed" },
      response.status,
      cors,
    );
  }

  return jsonResponse(
    {
      ok: true,
      forwarded: events.length,
      ingest: payload,
    },
    200,
    cors,
  );
}
