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
  retentionExpiresAtIso,
  resolveTenantIdByHint,
  resolveTenantIdByOrigin,
  scrubUnknown,
  sanitizeStackRaw,
  sha256Hex,
  classifyRetentionTier,
  supabaseAdmin,
} from "../_shared/observability.ts";

const MAX_TITLE_LEN = 220;

type JsonObject = Record<string, unknown>;

type SnapshotComponent = {
  component_key: string;
  component_type: string | null;
  revision_no: number | null;
  revision_id: string | null;
  path_globs: string[];
};

type ReleaseSnapshot = {
  id: string;
  version_label: string;
  version_release_id: string | null;
  source_commit_sha: string | null;
  components: SnapshotComponent[];
};

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

function safeArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  return [];
}

function safeInteger(value: unknown): number | null {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return Math.trunc(parsed);
}

function normalizeErrorCode(value: string | null) {
  const next = safeString(value)?.toLowerCase() || "unknown_error";
  return next || "unknown_error";
}

function normalizeDomain(value: unknown) {
  return safeString(value)?.toLowerCase() === "support" ? "support" : "observability";
}

function normalizeSupportCategory(value: unknown): string | null {
  const category = safeString(value)?.toLowerCase() || null;
  return category ? category.slice(0, 80) : null;
}

function parseUuid(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      .test(trimmed)
  ) {
    return trimmed.toLowerCase();
  }
  return null;
}

function normalizeFingerprintMessage(value: string) {
  return value.toLowerCase().replace(/\d+/g, "0").replace(/\s+/g, " ").trim();
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

function normalizeFilePath(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  let normalized = trimmed;
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const parsed = new URL(trimmed);
      normalized = parsed.pathname || "/";
    }
  } catch {
    normalized = trimmed;
  }

  normalized = normalized.split("?")[0].split("#")[0];
  normalized = normalized.replace(/\\/g, "/");
  normalized = normalized.replace(/^\.\//, "");
  return normalized.toLowerCase();
}

function escapeRegexChar(char: string) {
  return /[\\^$+?.()|[\]{}]/.test(char) ? `\\${char}` : char;
}

function globToRegExp(pattern: string): RegExp {
  const normalized = normalizeFilePath(pattern);
  let source = "^";
  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    if (char === "*") {
      if (normalized[i + 1] === "*") {
        source += ".*";
        i += 1;
      } else {
        source += "[^/]*";
      }
    } else if (char === "?") {
      source += ".";
    } else {
      source += escapeRegexChar(char);
    }
  }
  source += "$";
  return new RegExp(source, "i");
}

function globSpecificity(pattern: string) {
  return pattern.replace(/[\*\?]/g, "").length;
}

function parsePathGlobs(value: unknown): string[] {
  const raw = safeArray(value)
    .map((entry) => safeString(entry))
    .filter((entry): entry is string => Boolean(entry));
  return Array.from(new Set(raw));
}

function extractStackFiles(stackFramesRaw: unknown): string[] {
  const frames = safeArray(stackFramesRaw)
    .map((entry) => safeObject(entry))
    .filter((entry) => Object.keys(entry).length > 0);

  const files = frames
    .map((frame) => safeString(frame.file))
    .filter((entry): entry is string => Boolean(entry))
    .map((entry) => normalizeFilePath(entry))
    .filter(Boolean);

  return Array.from(new Set(files));
}

function resolveComponentByStack({
  components,
  stackFiles,
}: {
  components: SnapshotComponent[];
  stackFiles: string[];
}): SnapshotComponent | null {
  if (!components.length || !stackFiles.length) return null;

  let bestMatch: SnapshotComponent | null = null;
  let bestScore = -1;

  for (const component of components) {
    const globs = component.path_globs || [];
    for (const glob of globs) {
      const normalizedGlob = normalizeFilePath(glob);
      if (!normalizedGlob) continue;
      const regex = globToRegExp(normalizedGlob);
      for (const file of stackFiles) {
        if (regex.test(file)) {
          const score = globSpecificity(normalizedGlob);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = component;
          }
        }
      }
    }
  }

  return bestMatch;
}

async function loadReleaseSnapshot({
  tenantId,
  appId,
  envKey,
  versionLabel,
}: {
  tenantId: string;
  appId: string;
  envKey: string;
  versionLabel: string;
}): Promise<ReleaseSnapshot | null> {
  if (!tenantId || !appId || !envKey || !versionLabel) return null;

  const { data: snapshotRow, error: snapshotError } = await supabaseAdmin
    .from("obs_release_snapshots")
    .select("id, version_label, version_release_id, source_commit_sha")
    .eq("tenant_id", tenantId)
    .eq("app_id", appId)
    .eq("env_key", envKey)
    .eq("version_label", versionLabel)
    .limit(1)
    .maybeSingle();

  if (snapshotError || !snapshotRow?.id) {
    return null;
  }

  const { data: componentRows, error: componentError } = await supabaseAdmin
    .from("obs_release_snapshot_components")
    .select(
      [
        "component_key",
        "component_type",
        "revision_no",
        "revision_id",
        "path_globs",
      ].join(", ")
    )
    .eq("snapshot_id", snapshotRow.id)
    .order("component_key", { ascending: true });

  if (componentError) {
    return null;
  }

  const components: SnapshotComponent[] = (componentRows || []).map((row) => ({
    component_key: safeString(row.component_key) || "",
    component_type: safeString(row.component_type) || null,
    revision_no: safeInteger(row.revision_no),
    revision_id: safeString(row.revision_id) || null,
    path_globs: parsePathGlobs(row.path_globs),
  })).filter((row) => Boolean(row.component_key));

  return {
    id: String(snapshotRow.id),
    version_label: safeString(snapshotRow.version_label) || versionLabel,
    version_release_id: safeString(snapshotRow.version_release_id),
    source_commit_sha: safeString(snapshotRow.source_commit_sha),
    components,
  };
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
  const snapshotCache = new Map<string, ReleaseSnapshot | null>();

  for (let index = 0; index < rawEvents.length; index += 1) {
    const item = rawEvents[index] || {};
    const eventType = normalizeEventType(item.event_type || item.type);
    const level = normalizeLevel(item.level);

    const source = normalizeSource(item.source);
    const occurredAt = normalizeTimestamp(item.timestamp || item.occurred_at);
    const scrubbedContext = scrubUnknown(safeObject(item.context));
    const scrubbedExtras = scrubUnknown(item.extras || item.context_extra || {});
    const supportContextExtra =
      scrubbedExtras && typeof scrubbedExtras === "object" && !Array.isArray(scrubbedExtras)
        ? scrubbedExtras
        : {};
    const breadcrumbs = normalizeBreadcrumbs(item.breadcrumbs);
    const eventDomain = normalizeDomain(
      item.event_domain || (scrubbedContext as Record<string, unknown>).event_domain,
    );
    const retentionTier = classifyRetentionTier(level, eventType);
    const retentionExpiresAt = retentionExpiresAtIso(occurredAt, retentionTier);

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
    const rawErrorCode =
      safeString(errorObject.code) ||
      safeString(item.error_code) ||
      safeString((scrubbedContext as Record<string, unknown>).error_code);
    const errorCode = normalizeErrorCode(rawErrorCode);
    const stackRawSource =
      safeString(errorObject.stack) ||
      safeString((scrubbedContext as Record<string, unknown>).stack);
    const stackRaw = sanitizeStackRaw(stackRawSource);
    const stackPreview =
      parseStackPreview(stackRawSource) ||
      parseStackPreview((scrubbedContext as Record<string, unknown>).stack);
    const stackFramesRaw = parseStackFramesRaw(stackRawSource);

    const supportCategory = normalizeSupportCategory(
      item.category || (scrubbedContext as Record<string, unknown>).category,
    );
    const supportThreadId = parseUuid(
      item.thread_id ||
        item.ticket_id ||
        (scrubbedContext as Record<string, unknown>).thread_id ||
        (scrubbedContext as Record<string, unknown>).ticket_id,
    );
    const supportRoute =
      safeString(item.route) ||
      safeString((scrubbedContext as Record<string, unknown>).route);
    const supportScreen =
      safeString(item.screen) ||
      safeString((scrubbedContext as Record<string, unknown>).screen);
    const supportFlow =
      safeString(item.flow) ||
      safeString((scrubbedContext as Record<string, unknown>).flow);
    const supportFlowStep =
      safeString(item.flow_step) ||
      safeString((scrubbedContext as Record<string, unknown>).flow_step);
    const supportReceivedAt = normalizeTimestamp(
      item.received_at || item.created_at || occurredAt,
    );

    let fingerprint =
      safeString(item.fingerprint) ||
      (await buildFingerprint({
        errorName,
        errorCode,
        stackPreview,
        route,
        message,
        eventType,
      }));
    if (eventDomain === "support") {
      const supportUserRef = String(usuario?.id || auth.authUser?.id || "anonymous");
      const supportThreadRef = supportThreadId || "no_thread";
      const supportCategoryRef = supportCategory || "uncategorized";
      const supportRouteRef = supportRoute || route || "no_route";
      const normalizedMessage = normalizeFingerprintMessage(message);
      fingerprint = await sha256Hex(
        [
          "support",
          supportUserRef,
          supportThreadRef,
          supportCategoryRef,
          supportRouteRef,
          normalizedMessage,
        ].join("|"),
      );
    }

    if (await hasRecentDuplicate(tenantId, fingerprint, dedupeAgoIso)) {
      skipped += 1;
      continue;
    }

    const releasePayload = scrubUnknown(safeObject(item.release)) as Record<string, unknown>;
    const appVersion =
      safeString(releasePayload.app_version) ||
      safeString((scrubbedContext as Record<string, unknown>).app_version);
    const releaseVersionLabel =
      safeString(releasePayload.version_label) ||
      appVersion;
    const releaseSemver =
      safeString(releasePayload.semver) ||
      releaseVersionLabel;
    const releaseVersionIdFromPayload =
      safeString(releasePayload.version_release_id) ||
      safeString(releasePayload.release_id);
    const releaseSourceCommitFromPayload = safeString(releasePayload.source_commit_sha);
    const buildId = safeString(releasePayload.build_id);
    const env =
      safeString(releasePayload.env) ||
      safeString((scrubbedContext as Record<string, unknown>).env) ||
      Deno.env.get("SUPABASE_ENV");
    const appId =
      safeString(item.app_id) ||
      safeString(releasePayload.app_id) ||
      appIdDefault ||
      "unknown";

    const snapshotLookupKey = [
      tenantId,
      appId || "",
      env || "",
      releaseVersionLabel || "",
    ].join("|");

    let releaseSnapshot: ReleaseSnapshot | null = null;
    if (releaseVersionLabel && appId && env) {
      if (snapshotCache.has(snapshotLookupKey)) {
        releaseSnapshot = snapshotCache.get(snapshotLookupKey) || null;
      } else {
        releaseSnapshot = await loadReleaseSnapshot({
          tenantId,
          appId,
          envKey: env,
          versionLabel: releaseVersionLabel,
        });
        snapshotCache.set(snapshotLookupKey, releaseSnapshot);
      }
    }

    const explicitComponentKey =
      safeString(item.component_key) ||
      safeString((scrubbedContext as Record<string, unknown>).component_key) ||
      safeString((supportContextExtra as Record<string, unknown>).component_key);

    let resolvedComponent: SnapshotComponent | null = null;
    let componentResolutionMethod = "unresolved";
    if (releaseSnapshot?.components?.length) {
      if (explicitComponentKey) {
        resolvedComponent =
          releaseSnapshot.components.find(
            (component) =>
              component.component_key.toLowerCase() === explicitComponentKey.toLowerCase(),
          ) || null;
        if (resolvedComponent) {
          componentResolutionMethod = "explicit_context";
        }
      }

      if (!resolvedComponent) {
        const stackFiles = extractStackFiles(stackFramesRaw);
        const stackMatched = resolveComponentByStack({
          components: releaseSnapshot.components,
          stackFiles,
        });
        if (stackMatched) {
          resolvedComponent = stackMatched;
          componentResolutionMethod = "stack_path_glob";
        }
      }
    }

    const releaseVersionId =
      releaseSnapshot?.version_release_id ||
      releaseVersionIdFromPayload;
    const releaseSourceCommitSha =
      releaseSnapshot?.source_commit_sha ||
      releaseSourceCommitFromPayload;

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

    let issueId: string | null = null;
    if (eventDomain !== "support") {
      const title = issueTitleForEvent({
        errorName,
        errorCode,
        message,
        eventType,
      });

      const { data: resolvedIssueId, error: issueErr } = await supabaseAdmin.rpc(
        "obs_upsert_issue",
        {
          p_tenant_id: tenantId,
          p_fingerprint: fingerprint,
          p_title: title,
          p_level: level,
          p_occurred_at: occurredAt,
          p_last_release: releaseVersionLabel || appVersion,
        },
      );

      if (issueErr || !resolvedIssueId) {
        skipped += 1;
        errors.push({ index, code: "issue_upsert_failed" });
        continue;
      }
      issueId = resolvedIssueId;
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
          app_id: appId,
          app_version: appVersion,
          version_label: releaseVersionLabel,
          semver: releaseSemver,
          version_release_id: releaseVersionId,
          source_commit_sha: releaseSourceCommitSha,
          build_id: buildId,
          env,
        },
        release_version_label: releaseVersionLabel,
        release_semver: releaseSemver,
        release_version_id: releaseVersionId,
        release_source_commit_sha: releaseSourceCommitSha,
        resolved_component_key: resolvedComponent?.component_key || null,
        resolved_component_type: resolvedComponent?.component_type || null,
        resolved_component_revision_no: resolvedComponent?.revision_no ?? null,
        resolved_component_revision_id: resolvedComponent?.revision_id || null,
        component_resolution_method: componentResolutionMethod,
        device,
        user_ref: userRef,
        request_id: requestId,
        trace_id: traceId,
        session_id: sessionId,
        ip_hash: ipHash,
        app_id: appId,
        user_id: usuario?.id || null,
        auth_user_id: auth.authUser?.id || null,
        event_domain: eventDomain,
        support_category: supportCategory,
        support_thread_id: supportThreadId,
        support_route: supportRoute,
        support_screen: supportScreen,
        support_flow: supportFlow,
        support_flow_step: supportFlowStep,
        support_context_extra: supportContextExtra,
        support_received_at: supportReceivedAt,
        retention_tier: retentionTier,
        retention_expires_at: retentionExpiresAt,
      })
      .select("id")
      .single();

    if (insertErr || !insertedEvent?.id) {
      skipped += 1;
      errors.push({ index, code: "event_insert_failed" });
      continue;
    }

    if (eventDomain !== "support" && issueId) {
      await supabaseAdmin
        .from("obs_issues")
        .update({
          last_event_id: insertedEvent.id,
          last_seen_at: occurredAt,
          last_release: releaseVersionLabel || appVersion,
        })
        .eq("id", issueId);

      await supabaseAdmin.rpc("obs_upsert_error_catalog", {
        p_tenant_id: tenantId,
        p_error_code: errorCode,
        p_event_id: insertedEvent.id,
        p_source_hint: source,
        p_sample_message: message,
        p_sample_route: route,
        p_sample_context: scrubbedContext,
        p_seen_at: occurredAt,
      });

      issuesTouched.add(issueId);
    }

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
