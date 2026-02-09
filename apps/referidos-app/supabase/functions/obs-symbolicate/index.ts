import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { SourceMapConsumer } from "npm:source-map-js@1.2.1";
import {
  corsHeaders,
  getOptionalAuthedUser,
  getUsuarioByAuthId,
  jsonResponse,
  parseStackFramesRaw,
  scrubUnknown,
  supabaseAdmin,
} from "../_shared/observability.ts";

const SHORT_CACHE_MS = 2 * 24 * 60 * 60 * 1000;
const LONG_CACHE_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_ISSUE_EVENTS = 200;

type ObsEventRecord = {
  id: string;
  tenant_id: string;
  issue_id: string;
  user_id: string | null;
  app_id: string | null;
  release: Record<string, unknown> | null;
  message: string | null;
  stack_raw: string | null;
  stack_preview: string | null;
  stack_frames_raw: Array<Record<string, unknown>> | null;
  symbolicated_stack: Record<string, unknown> | null;
  symbolicated_at: string | null;
  symbolication_type: string | null;
  symbolication_status: string | null;
  symbolication_release: string | null;
};

type ReleaseRecord = {
  id: string;
  app_id: string;
  app_version: string;
  build_id: string;
  env: string;
  meta: Record<string, unknown> | null;
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

function safeArray(value: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item && typeof item === "object") as Array<Record<string, unknown>>;
}

function cacheMsForType(value: string | null) {
  return value === "long" ? LONG_CACHE_MS : SHORT_CACHE_MS;
}

function normalizeCacheType(value: unknown) {
  return value === "long" ? "long" : "short";
}

function isCacheValid(eventRow: ObsEventRecord, nowMs: number) {
  if (!eventRow.symbolicated_stack || !eventRow.symbolicated_at) return false;
  const atMs = Date.parse(eventRow.symbolicated_at);
  if (Number.isNaN(atMs)) return false;
  return nowMs - atMs < cacheMsForType(eventRow.symbolication_type);
}

function normalizedFrameFile(input: unknown): string | null {
  const raw = safeString(input);
  if (!raw) return null;
  let value = raw;
  try {
    const url = new URL(raw);
    value = url.pathname || raw;
  } catch {
    // keep original
  }
  value = value.split("?")[0]?.split("#")[0] || value;
  value = value.replace(/^\/+/, "");
  const assetsIndex = value.indexOf("assets/");
  if (assetsIndex >= 0) {
    return value.slice(assetsIndex);
  }
  return value;
}

function frameBasename(input: string | null): string | null {
  if (!input) return null;
  const parts = input.split("/");
  return parts[parts.length - 1] || null;
}

async function blobToText(data: unknown): Promise<string | null> {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (data instanceof Blob) return await data.text();
  if (data instanceof Uint8Array) return new TextDecoder().decode(data);
  return null;
}

async function canSupportAccessUser(
  supportAgentId: string,
  userId: string | null,
): Promise<boolean> {
  if (!userId) return false;
  const { data, error } = await supabaseAdmin
    .from("support_threads")
    .select("id")
    .eq("user_id", userId)
    .or(`assigned_agent_id.eq.${supportAgentId},created_by_agent_id.eq.${supportAgentId}`)
    .limit(1)
    .maybeSingle();
  if (error) return false;
  return Boolean(data?.id);
}

async function loadReleaseForEvent(eventRow: ObsEventRecord): Promise<ReleaseRecord | null> {
  const release = safeObject(eventRow.release);
  const appVersion = safeString(release.app_version);
  const buildId = safeString(release.build_id);
  const env = safeString(release.env);
  const appId = safeString(eventRow.app_id) || safeString(release.app_id) || "unknown";

  let query = supabaseAdmin
    .from("obs_releases")
    .select("id, app_id, app_version, build_id, env, meta")
    .eq("tenant_id", eventRow.tenant_id)
    .eq("app_id", appId)
    .order("created_at", { ascending: false });

  if (appVersion) {
    query = query.eq("app_version", appVersion);
  }
  if (buildId) {
    query = query.eq("build_id", buildId);
  }
  if (env) {
    query = query.eq("env", env);
  }

  const { data } = await query.limit(1).maybeSingle();
  if (data) return data as ReleaseRecord;

  // fallback: version only
  if (appVersion) {
    const { data: fallback } = await supabaseAdmin
      .from("obs_releases")
      .select("id, app_id, app_version, build_id, env, meta")
      .eq("tenant_id", eventRow.tenant_id)
      .eq("app_id", appId)
      .eq("app_version", appVersion)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (fallback) return fallback as ReleaseRecord;
  }

  return null;
}

type SourcemapManifest = {
  release_key?: string;
  maps?: Array<{
    generated_file: string;
    map_path: string;
  }>;
};

async function loadManifest(releaseRow: ReleaseRecord) {
  const meta = safeObject(releaseRow.meta);
  const sourcemaps = safeObject(meta.sourcemaps);
  const bucket = safeString(sourcemaps.bucket) || "obs-sourcemaps";
  const manifestPath = safeString(sourcemaps.manifest_path);
  if (!manifestPath) {
    return { ok: false, code: "manifest_path_missing", bucket, manifest: null as SourcemapManifest | null };
  }

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .download(manifestPath);
  if (error || !data) {
    return { ok: false, code: "manifest_download_failed", bucket, manifest: null as SourcemapManifest | null };
  }

  const text = await blobToText(data);
  if (!text) {
    return { ok: false, code: "manifest_empty", bucket, manifest: null as SourcemapManifest | null };
  }

  try {
    const parsed = JSON.parse(text) as SourcemapManifest;
    return { ok: true, code: null, bucket, manifest: parsed };
  } catch {
    return { ok: false, code: "manifest_invalid_json", bucket, manifest: null as SourcemapManifest | null };
  }
}

function buildManifestLookup(manifest: SourcemapManifest) {
  const byFile = new Map<string, string>();
  const byBasename = new Map<string, string>();
  const maps = Array.isArray(manifest.maps) ? manifest.maps : [];

  for (const item of maps) {
    const generated = normalizedFrameFile(item.generated_file);
    const mapPath = safeString(item.map_path);
    if (!generated || !mapPath) continue;
    byFile.set(generated, mapPath);
    const base = frameBasename(generated);
    if (base && !byBasename.has(base)) {
      byBasename.set(base, mapPath);
    }
  }

  return { byFile, byBasename };
}

async function loadSourceMapConsumer(
  bucket: string,
  mapPath: string,
  cache: Map<string, SourceMapConsumer>,
) {
  const cached = cache.get(mapPath);
  if (cached) return cached;

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .download(mapPath);
  if (error || !data) {
    return null;
  }
  const text = await blobToText(data);
  if (!text) return null;
  try {
    const json = JSON.parse(text);
    const consumer = new SourceMapConsumer(json);
    cache.set(mapPath, consumer);
    return consumer;
  } catch {
    return null;
  }
}

function releaseLabel(releaseRow: ReleaseRecord) {
  const build = releaseRow.build_id || "build";
  return `${releaseRow.app_id}@${releaseRow.app_version}+${build}`;
}

async function applySymbolicationToEvent(
  eventRow: ObsEventRecord,
  actorUserId: string,
  cacheType: "short" | "long",
  force: boolean,
) {
  const nowIso = new Date().toISOString();
  const nowMs = Date.now();

  if (!force && isCacheValid(eventRow, nowMs)) {
    if (cacheType === "long" && eventRow.symbolication_type !== "long") {
      await supabaseAdmin
        .from("obs_events")
        .update({
          symbolicated_at: nowIso,
          symbolicated_by: actorUserId,
          symbolication_type: "long",
          symbolication_status: eventRow.symbolication_status || "ok",
        })
        .eq("id", eventRow.id);
      return {
        ok: true,
        cached: false,
        event_id: eventRow.id,
        symbolicated_stack: eventRow.symbolicated_stack,
        symbolication_status: eventRow.symbolication_status || "ok",
        symbolicated_at: nowIso,
        symbolication_type: "long",
        symbolication_release: eventRow.symbolication_release,
      };
    }
    return {
      ok: true,
      cached: true,
      event_id: eventRow.id,
      symbolicated_stack: eventRow.symbolicated_stack,
      symbolication_status: eventRow.symbolication_status || "ok",
      symbolicated_at: eventRow.symbolicated_at,
      symbolication_type: eventRow.symbolication_type || "short",
      symbolication_release: eventRow.symbolication_release,
    };
  }

  const releaseRow = await loadReleaseForEvent(eventRow);
  if (!releaseRow) {
    await supabaseAdmin
      .from("obs_events")
      .update({
        symbolication_status: "error:release_not_found",
        symbolicated_at: nowIso,
        symbolicated_by: actorUserId,
        symbolication_type: cacheType,
      })
      .eq("id", eventRow.id);
    return {
      ok: false,
      code: "release_not_found",
      event_id: eventRow.id,
    };
  }

  const manifestResult = await loadManifest(releaseRow);
  if (!manifestResult.ok || !manifestResult.manifest) {
    await supabaseAdmin
      .from("obs_events")
      .update({
        symbolication_status: `error:${manifestResult.code}`,
        symbolicated_at: nowIso,
        symbolicated_by: actorUserId,
        symbolication_type: cacheType,
        symbolication_release: releaseLabel(releaseRow),
      })
      .eq("id", eventRow.id);
    return {
      ok: false,
      code: manifestResult.code,
      event_id: eventRow.id,
    };
  }

  const manifestLookup = buildManifestLookup(manifestResult.manifest);
  const sourceMapCache = new Map<string, SourceMapConsumer>();
  const baseFrames = safeArray(eventRow.stack_frames_raw);
  const frames =
    baseFrames.length > 0
      ? baseFrames
      : parseStackFramesRaw(eventRow.stack_raw).map((frame) => scrubUnknown(frame) as Record<string, unknown>);

  const symbolicatedFrames: Array<Record<string, unknown>> = [];
  let symbolicatedCount = 0;

  for (const frame of frames) {
    const generatedFile = normalizedFrameFile(frame.file);
    const generatedBase = frameBasename(generatedFile);
    const mapPath =
      (generatedFile ? manifestLookup.byFile.get(generatedFile) : null) ||
      (generatedBase ? manifestLookup.byBasename.get(generatedBase) : null) ||
      null;

    const line = Number(frame.line);
    const column = Number(frame.column);
    let symbolicated = false;
    let original: Record<string, unknown> | null = null;

    if (mapPath && Number.isFinite(line) && Number.isFinite(column)) {
      const consumer = await loadSourceMapConsumer(manifestResult.bucket, mapPath, sourceMapCache);
      if (consumer) {
        const position = consumer.originalPositionFor({
          line: Math.max(1, line),
          column: Math.max(0, column - 1),
        });
        if (position?.source) {
          symbolicated = true;
          symbolicatedCount += 1;
          original = {
            source: position.source,
            line: position.line,
            column: position.column,
            name: position.name || null,
          };
        }
      }
    }

    symbolicatedFrames.push({
      ...frame,
      generated_file: generatedFile,
      map_path: mapPath,
      symbolicated,
      original,
    });
  }

  for (const consumer of sourceMapCache.values()) {
    consumer.destroy?.();
  }

  const symbolicationStatus = symbolicatedCount > 0 ? "ok" : "error:no_mapped_frames";
  const symbolicatedPayload = {
    message: eventRow.message,
    stack_preview: eventRow.stack_preview,
    stack_raw: eventRow.stack_raw,
    frames: symbolicatedFrames,
    stats: {
      total_frames: symbolicatedFrames.length,
      symbolicated_frames: symbolicatedCount,
    },
  };

  await supabaseAdmin
    .from("obs_events")
    .update({
      symbolicated_stack: symbolicatedPayload,
      symbolicated_at: nowIso,
      symbolicated_by: actorUserId,
      symbolication_release: releaseLabel(releaseRow),
      symbolication_status: symbolicationStatus,
      symbolication_type: cacheType,
    })
    .eq("id", eventRow.id);

  return {
    ok: symbolicationStatus === "ok",
    cached: false,
    event_id: eventRow.id,
    symbolicated_stack: symbolicatedPayload,
    symbolication_status: symbolicationStatus,
    symbolicated_at: nowIso,
    symbolication_type: cacheType,
    symbolication_release: releaseLabel(releaseRow),
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

  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const action = safeString(body.action) || "event";
  const cacheType = normalizeCacheType(body.cache_type) as "short" | "long";
  const force = Boolean(body.force);

  const auth = await getOptionalAuthedUser(req);
  if (auth.authError || !auth.authUser?.id) {
    return jsonResponse(
      { ok: false, code: "unauthorized", message: "Auth required" },
      401,
      cors,
    );
  }

  const profile = await getUsuarioByAuthId(auth.authUser.id);
  if (profile.error || !profile.usuario) {
    return jsonResponse(
      { ok: false, code: "profile_not_found", message: "Auth profile not found" },
      404,
      cors,
    );
  }

  const actorRole = safeString((profile.usuario as Record<string, unknown>).role);
  const actorTenantId = safeString((profile.usuario as Record<string, unknown>).tenant_id);
  const actorUserId = safeString((profile.usuario as Record<string, unknown>).id);

  if (!actorTenantId || !actorUserId) {
    return jsonResponse(
      { ok: false, code: "tenant_missing", message: "Actor profile tenant missing" },
      400,
      cors,
    );
  }

  const isAdmin = actorRole === "admin";
  const isSupport = actorRole === "soporte";
  if (!isAdmin && !isSupport) {
    return jsonResponse(
      { ok: false, code: "forbidden", message: "Only admin/support can symbolicate" },
      403,
      cors,
    );
  }

  const selectedEventId = safeString(body.event_id);
  const selectedIssueId = safeString(body.issue_id);

  if (action === "issue") {
    const issueId = selectedIssueId;
    if (!issueId) {
      return jsonResponse(
        { ok: false, code: "issue_id_required", message: "issue_id is required for action=issue" },
        400,
        cors,
      );
    }

    const { data: events, error } = await supabaseAdmin
      .from("obs_events")
      .select(
        "id, tenant_id, issue_id, user_id, app_id, release, message, stack_raw, stack_preview, stack_frames_raw, symbolicated_stack, symbolicated_at, symbolication_type, symbolication_status, symbolication_release",
      )
      .eq("tenant_id", actorTenantId)
      .eq("issue_id", issueId)
      .order("occurred_at", { ascending: false })
      .limit(MAX_ISSUE_EVENTS);

    if (error) {
      return jsonResponse(
        { ok: false, code: "issue_events_query_failed", message: "Could not query issue events" },
        500,
        cors,
      );
    }

    const rows = Array.isArray(events) ? events as ObsEventRecord[] : [];
    let processed = 0;
    let cached = 0;
    let failed = 0;
    const details: Array<Record<string, unknown>> = [];

    for (const row of rows) {
      if (isSupport) {
        const canAccess = await canSupportAccessUser(actorUserId, row.user_id);
        if (!canAccess) continue;
      }
      const result = await applySymbolicationToEvent(row, actorUserId, "long", force);
      processed += 1;
      if (result.cached) cached += 1;
      if (!result.ok) failed += 1;
      details.push(result);
    }

    return jsonResponse(
      {
        ok: true,
        action: "issue",
        issue_id: issueId,
        total: rows.length,
        processed,
        cached,
        failed,
        results: details,
      },
      200,
      cors,
    );
  }

  if (!selectedEventId) {
    return jsonResponse(
      { ok: false, code: "event_id_required", message: "event_id is required for action=event" },
      400,
      cors,
    );
  }

  const { data: eventRow, error: eventError } = await supabaseAdmin
    .from("obs_events")
    .select(
      "id, tenant_id, issue_id, user_id, app_id, release, message, stack_raw, stack_preview, stack_frames_raw, symbolicated_stack, symbolicated_at, symbolication_type, symbolication_status, symbolication_release",
    )
    .eq("id", selectedEventId)
    .maybeSingle();

  if (eventError || !eventRow) {
    return jsonResponse(
      { ok: false, code: "event_not_found", message: "Event not found" },
      404,
      cors,
    );
  }

  const row = eventRow as ObsEventRecord;
  if (row.tenant_id !== actorTenantId) {
    return jsonResponse(
      { ok: false, code: "forbidden_tenant", message: "Event tenant mismatch" },
      403,
      cors,
    );
  }

  if (isSupport) {
    const canAccess = await canSupportAccessUser(actorUserId, row.user_id);
    if (!canAccess) {
      return jsonResponse(
        { ok: false, code: "forbidden_support_scope", message: "Support scope denied" },
        403,
        cors,
      );
    }
  }

  const result = await applySymbolicationToEvent(row, actorUserId, cacheType, force);
  return jsonResponse(
    {
      ok: true,
      action: "event",
      event_id: row.id,
      result,
    },
    200,
    cors,
  );
});
