import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  OBS_DEDUPE_WINDOW_MS,
  OBS_MAX_BATCH,
  OBS_RATE_IP_PER_MIN,
  OBS_RATE_USER_PER_MIN,
  buildFingerprint,
  corsHeaders,
  currentRateCountByIp,
  currentRateCountByUser,
  extractRequestIds,
  getOptionalAuthedUser,
  getUsuarioByAuthId,
  hasRecentDuplicate,
  jsonResponse,
  normalizeBreadcrumbs,
  normalizeEventType,
  normalizeLevel,
  normalizeMessage,
  normalizeSource,
  normalizeTimestamp,
  parseStackPreview,
  parseUserAgentSummary,
  parseStackFramesRaw,
  resolveTenantIdByHint,
  resolveTenantIdByOrigin,
  scrubUnknown,
  sanitizeStackRaw,
  sha256Hex,
  shouldSample,
  supabaseAdmin,
} from "../_shared/observability.ts";

const MAX_TITLE_LEN = 220;

function safeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const next = value.trim();
  return next || null;
}

function safeObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function issueTitleForEvent({
  errorName,
  errorCode,
  message,
  eventType,
}: {
  errorName: string | null;
  errorCode: string | null;
  message: string;
  eventType: string;
}) {
  const base = errorName || "AppError";
  const detail = errorCode || message.slice(0, 90);
  const title = `${base}: ${detail} (${eventType})`;
  return title.length <= MAX_TITLE_LEN ? title : title.slice(0, MAX_TITLE_LEN);
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse(
      { ok: false, code: "method_not_allowed", message: "Method not allowed" },
      405,
      cors,
    );
  }

  const body = await req.json().catch(() => ({}));
  const rawEvents = Array.isArray(body?.events)
    ? body.events.slice(0, OBS_MAX_BATCH)
    : [body];

  if (!rawEvents.length) {
    return jsonResponse(
      { ok: false, code: "empty_batch", message: "No events received" },
      400,
      cors,
    );
  }

  const auth = await getOptionalAuthedUser(req);
  if (auth.authError) {
    return jsonResponse(
      { ok: false, code: auth.authError, message: "Invalid bearer token" },
      401,
      cors,
    );
  }

  let usuario: Record<string, unknown> | null = null;
  let tenantId: string | null = null;
  if (auth.authUser?.id) {
    const profile = await getUsuarioByAuthId(auth.authUser.id);
    if (profile.error || !profile.usuario) {
      return jsonResponse(
        { ok: false, code: "profile_not_found", message: "Auth profile not found" },
        404,
        cors,
      );
    }
    usuario = profile.usuario;
    tenantId = String((profile.usuario as Record<string, unknown>).tenant_id || "");
    if (!tenantId) {
      return jsonResponse(
        { ok: false, code: "tenant_missing", message: "Auth profile has no tenant" },
        400,
        cors,
      );
    }
  }

  const bodyTenantHint = safeString(body?.tenant_hint);
  const eventTenantHint = safeString(rawEvents[0]?.tenant_hint);
  const tenantHint = bodyTenantHint || eventTenantHint;

  if (!tenantId) {
    tenantId = await resolveTenantIdByOrigin(req);
  }
  if (!tenantId) {
    tenantId = await resolveTenantIdByHint(tenantHint);
  }
  if (!tenantId) {
    return jsonResponse(
      {
        ok: false,
        code: "tenant_resolution_failed",
        message: "Could not resolve tenant by origin or tenant_hint",
      },
      400,
      cors,
    );
  }

  const now = Date.now();
  const minuteAgoIso = new Date(now - 60 * 1000).toISOString();
  const dedupeAgoIso = new Date(now - OBS_DEDUPE_WINDOW_MS).toISOString();
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ipHash = await sha256Hex(ip);
  const ua = req.headers.get("user-agent");
  const uaHash = ua ? await sha256Hex(ua) : null;
  const uaSummary = parseUserAgentSummary(ua);
  const headerIds = extractRequestIds(req);
  const appIdDefault = safeString(body?.app_id) || safeString(rawEvents[0]?.app_id);

  if (usuario?.id) {
    const userCount = await currentRateCountByUser(
      tenantId,
      String(usuario.id),
      minuteAgoIso,
    );
    if (userCount >= OBS_RATE_USER_PER_MIN) {
      return jsonResponse(
        { ok: true, inserted: 0, skipped: rawEvents.length, reason: "rate_limited_user" },
        200,
        cors,
      );
    }
  }

  const ipCount = await currentRateCountByIp(tenantId, ipHash, minuteAgoIso);
  if (ipCount >= OBS_RATE_IP_PER_MIN) {
    return jsonResponse(
      { ok: true, inserted: 0, skipped: rawEvents.length, reason: "rate_limited_ip" },
      200,
      cors,
    );
  }

  let inserted = 0;
  let skipped = 0;
  const issuesTouched = new Set<string>();
  const errors: Array<{ index: number; code: string }> = [];

  for (let index = 0; index < rawEvents.length; index += 1) {
    const item = rawEvents[index] || {};
    const eventType = normalizeEventType(item.event_type || item.type);
    const level = normalizeLevel(item.level);
    if (!shouldSample(level, eventType)) {
      skipped += 1;
      continue;
    }

    const source = normalizeSource(item.source);
    const occurredAt = normalizeTimestamp(item.timestamp || item.occurred_at);
    const scrubbedContext = scrubUnknown(safeObject(item.context));
    const scrubbedExtras = scrubUnknown(item.extras || item.context_extra || {});
    const breadcrumbs = normalizeBreadcrumbs(item.breadcrumbs);

    const errorObject = safeObject(item.error);
    const message =
      normalizeMessage(item.message) ||
      normalizeMessage(errorObject.message) ||
      normalizeMessage(item.error_message);
    if (!message) {
      skipped += 1;
      errors.push({ index, code: "invalid_message" });
      continue;
    }

    const route = safeString((scrubbedContext as Record<string, unknown>).route);
    const errorName = safeString(errorObject.name);
    const errorCode =
      safeString(errorObject.code) ||
      safeString(item.error_code) ||
      safeString((scrubbedContext as Record<string, unknown>).error_code);
    const stackRawSource =
      safeString(errorObject.stack) ||
      safeString((scrubbedContext as Record<string, unknown>).stack);
    const stackRaw = sanitizeStackRaw(stackRawSource);
    const stackPreview =
      parseStackPreview(stackRawSource) ||
      parseStackPreview((scrubbedContext as Record<string, unknown>).stack);
    const stackFramesRaw = parseStackFramesRaw(stackRawSource);

    const fingerprint =
      safeString(item.fingerprint) ||
      (await buildFingerprint({
        errorName,
        errorCode,
        stackPreview,
        route,
        message,
        eventType,
      }));

    if (await hasRecentDuplicate(tenantId, fingerprint, dedupeAgoIso)) {
      skipped += 1;
      continue;
    }

    const releasePayload = scrubUnknown(safeObject(item.release)) as Record<string, unknown>;
    const appVersion =
      safeString(releasePayload.app_version) ||
      safeString((scrubbedContext as Record<string, unknown>).app_version);
    const buildId = safeString(releasePayload.build_id);
    const env = safeString(releasePayload.env) || Deno.env.get("SUPABASE_ENV");
    const appId =
      safeString(item.app_id) ||
      safeString(releasePayload.app_id) ||
      appIdDefault ||
      "unknown";

    const userRef = scrubUnknown(safeObject(item.user_ref)) as Record<string, unknown>;
    if (auth.authUser?.id) {
      userRef.auth_user_id = auth.authUser.id;
      userRef.user_id = usuario?.id || null;
      userRef.public_user_id = usuario?.public_id || null;
      userRef.role = usuario?.role || null;
    }

    const device = scrubUnknown(safeObject(item.device)) as Record<string, unknown>;
    device.ua_hash = uaHash;
    device.browser = uaSummary.browser;
    device.os = uaSummary.os;
    device.ip_hash = ipHash;

    const requestId =
      safeString(item.request_id) ||
      safeString((scrubbedContext as Record<string, unknown>).request_id) ||
      headerIds.requestId;
    const traceId =
      safeString(item.trace_id) ||
      safeString((scrubbedContext as Record<string, unknown>).trace_id) ||
      headerIds.traceId;
    const sessionId =
      safeString(item.session_id) ||
      safeString((scrubbedContext as Record<string, unknown>).session_id);

    const title = issueTitleForEvent({
      errorName,
      errorCode,
      message,
      eventType,
    });

    const { data: issueId, error: issueErr } = await supabaseAdmin.rpc(
      "obs_upsert_issue",
      {
        p_tenant_id: tenantId,
        p_fingerprint: fingerprint,
        p_title: title,
        p_level: level,
        p_occurred_at: occurredAt,
        p_last_release: appVersion,
      },
    );

    if (issueErr || !issueId) {
      skipped += 1;
      errors.push({ index, code: "issue_upsert_failed" });
      continue;
    }

    const { data: insertedEvent, error: insertErr } = await supabaseAdmin
      .from("obs_events")
      .insert({
        tenant_id: tenantId,
        issue_id: issueId,
        occurred_at: occurredAt,
        level,
        event_type: eventType,
        source,
        message,
        error_code: errorCode,
        stack_preview: stackPreview,
        stack_raw: stackRaw,
        stack_frames_raw: stackFramesRaw,
        fingerprint,
        context: {
          ...(scrubbedContext as Record<string, unknown>),
          extra: scrubbedExtras,
        },
        breadcrumbs,
        release: {
          app_version: appVersion,
          build_id: buildId,
          env,
        },
        device,
        user_ref: userRef,
        request_id: requestId,
        trace_id: traceId,
        session_id: sessionId,
        ip_hash: ipHash,
        app_id: appId,
        user_id: usuario?.id || null,
        auth_user_id: auth.authUser?.id || null,
      })
      .select("id")
      .single();

    if (insertErr || !insertedEvent?.id) {
      skipped += 1;
      errors.push({ index, code: "event_insert_failed" });
      continue;
    }

    await supabaseAdmin
      .from("obs_issues")
      .update({
        last_event_id: insertedEvent.id,
        last_seen_at: occurredAt,
        last_release: appVersion,
      })
      .eq("id", issueId);

    issuesTouched.add(issueId);
    inserted += 1;
  }

  return jsonResponse(
    {
      ok: true,
      inserted,
      skipped,
      issue_count: issuesTouched.size,
      errors: errors.slice(0, 10),
    },
    200,
    cors,
  );
});
