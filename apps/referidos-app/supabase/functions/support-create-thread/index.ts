import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  CATEGORY_LABELS,
  buildSupportMessage,
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

const SUPPORT_PHONE = "593995705833";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function pickText(value: unknown, max = 160) {
  if (typeof value !== "string") return null;
  const trimmed = safeTrim(value, max);
  return trimmed || null;
}

function pickBuildNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    const num = Math.trunc(value);
    return num >= 1 ? num : null;
  }
  if (typeof value === "string" && /^[0-9]+$/.test(value.trim())) {
    const num = Number(value.trim());
    return Number.isFinite(num) && num >= 1 ? Math.trunc(num) : null;
  }
  return null;
}

function normalizeBuildSnapshot(value: unknown) {
  if (!isRecord(value)) return null;
  const buildNumber = pickBuildNumber(value.build_number ?? value.buildNumber);
  const snapshot: Record<string, unknown> = {
    app_id: pickText(value.app_id ?? value.appId, 80),
    app_env: pickText(value.app_env ?? value.appEnv ?? value.env, 40),
    version_label: pickText(value.version_label ?? value.app_version ?? value.appVersion, 120),
    build_id: pickText(value.build_id ?? value.buildId, 120),
    release_id: pickText(value.release_id ?? value.releaseId, 120),
    artifact_id: pickText(value.artifact_id ?? value.artifactId, 160),
    release_channel: pickText(value.release_channel ?? value.releaseChannel ?? value.channel, 40),
    source_commit_sha: pickText(
      value.source_commit_sha ?? value.sourceCommitSha ?? value.commit_sha,
      64
    ),
  };
  if (buildNumber) snapshot.build_number = buildNumber;

  const hasValue = Object.values(snapshot).some((entry) => entry !== null && entry !== undefined);
  return hasValue ? snapshot : null;
}

function normalizeAppChannel(rawValue: unknown) {
  const normalized = safeTrim(typeof rawValue === "string" ? rawValue : "", 60).toLowerCase();
  if (!normalized) return "referidos_app";
  if (["referidos_app", "referidos-app", "referidos-pwa", "app", "pwa"].includes(normalized)) {
    return "referidos_app";
  }
  if (["prelaunch_web", "prelaunch-web", "prelaunch", "landing"].includes(normalized)) {
    return "prelaunch_web";
  }
  if (["android_app", "android-app", "android", "referidos-android"].includes(normalized)) {
    return "android_app";
  }
  return "referidos_app";
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);
  }

  const { user, error: authErr } = await requireAuthUser(token);
  if (authErr || !user) {
    return jsonResponse({ ok: false, error: "unauthorized" }, 401, cors);
  }

  const body = await req.json().catch(() => ({}));
  const category = body.category ?? "sugerencia";
  const severity = body.severity ?? "s2";
  const summary = safeTrim(body.summary, 240);
  const clientRequestId = safeTrim(body.client_request_id, 64) || null;
  const appChannel = normalizeAppChannel(body.app_channel);
  const baseContext = isRecord(body.context) ? body.context : {};

  const sourceRoute = pickText(body.source_route ?? baseContext.source_route ?? baseContext.route, 140);
  const locale = pickText(body.locale ?? baseContext.locale, 32);
  const language = pickText(body.language ?? baseContext.language, 24);
  const timezone = pickText(body.timezone ?? baseContext.timezone, 80);
  const platform = pickText(body.platform ?? baseContext.platform ?? baseContext.device, 120);
  const userAgent = pickText(body.user_agent ?? baseContext.user_agent ?? baseContext.browser, 300);

  const payloadBuild = normalizeBuildSnapshot(body.build ?? body.build_snapshot);
  const contextBuild = normalizeBuildSnapshot(baseContext.build);
  const buildSnapshot = payloadBuild || contextBuild;

  const runtimeContext: Record<string, unknown> = {
    ...(isRecord(baseContext.runtime) ? baseContext.runtime : {}),
    source_route: sourceRoute,
    locale,
    language,
    timezone,
    platform,
    user_agent: userAgent,
  };
  Object.keys(runtimeContext).forEach((key) => {
    if (runtimeContext[key] === null || runtimeContext[key] === undefined || runtimeContext[key] === "") {
      delete runtimeContext[key];
    }
  });

  const context = {
    ...baseContext,
    app_channel: appChannel,
    ...(Object.keys(runtimeContext).length ? { runtime: runtimeContext } : {}),
    ...(buildSnapshot ? { build: buildSnapshot } : {}),
  };

  if (!summary) {
    return jsonResponse({ ok: false, error: "missing_summary" }, 400, cors);
  }

  const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
  if (profileErr || !usuario) {
    return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
  }

  const activeQuery = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, wa_link, wa_message_text, status")
    .eq("user_id", usuario.id)
    .in("status", ["new", "assigned", "in_progress", "waiting_user", "queued"])
    .order("created_at", { ascending: false })
    .limit(1);

  if (activeQuery.data && activeQuery.data.length > 0) {
    const activeThread = activeQuery.data[0];
    return jsonResponse(
      {
        ok: true,
        thread_public_id: activeThread.public_id,
        user_public_id: usuario.public_id,
        wa_link: activeThread.wa_link,
        wa_message_text: activeThread.wa_message_text,
        reused: true,
      },
      200,
      cors
    );
  }

  const recentSince = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { count: recentCount } = await supabaseAdmin
    .from("support_threads")
    .select("id", { count: "exact", head: true })
    .eq("user_id", usuario.id)
    .gte("created_at", recentSince);
  if ((recentCount ?? 0) >= 1) {
    return jsonResponse(
      { ok: false, error: "rate_limited" },
      429,
      cors
    );
  }

  if (clientRequestId) {
    const existing = await supabaseAdmin
      .from("support_threads")
      .select("id, public_id, wa_link, wa_message_text, status")
      .eq("user_id", usuario.id)
      .eq("client_request_id", clientRequestId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (existing.data && existing.data.length > 0) {
      const existingThread = existing.data[0];
      return jsonResponse(
        {
          ok: true,
          thread_public_id: existingThread.public_id,
          user_public_id: usuario.public_id,
          wa_link: existingThread.wa_link,
          wa_message_text: existingThread.wa_message_text,
          reused: true,
        },
        200,
        cors
      );
    }
  }

  const categoryLabel = CATEGORY_LABELS[category] ?? "Soporte";

  const insertResponse = await supabaseAdmin
    .from("support_threads")
    .insert({
      user_id: usuario.id,
      user_public_id: usuario.public_id,
      category,
      severity,
      status: "new",
      summary,
      context,
      created_by_user_id: usuario.id,
      client_request_id: clientRequestId,
      suggested_contact_name: usuario.public_id,
      suggested_tags: [category, severity, "new", appChannel],
      app_channel: appChannel,
      origin_source: "app",
    })
    .select(
      "id, public_id, user_id, user_public_id, category, severity, status"
    )
    .single();

  if (insertResponse.error || !insertResponse.data) {
    return jsonResponse(
      { ok: false, error: "thread_create_failed" },
      500,
      cors
    );
  }

  const thread = insertResponse.data;
  const messageText = buildSupportMessage({
    userPublicId: usuario.public_id,
    threadPublicId: thread.public_id,
    categoryLabel,
    summary,
    context,
  });
  const waLink =
    "https://wa.me/" +
    SUPPORT_PHONE +
    "?text=" +
    encodeURIComponent(messageText);

  await supabaseAdmin
    .from("support_threads")
    .update({
      wa_message_text: messageText,
      wa_link: waLink,
    })
    .eq("id", thread.id);

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "created",
    actor_role: usuario.role,
    actor_id: usuario.id,
      details: {
        category,
        severity,
        app_channel: appChannel,
        wa_link: waLink,
        wa_message_text: messageText,
        build: buildSnapshot,
      },
  });

  return jsonResponse(
    {
      ok: true,
      thread_public_id: thread.public_id,
      user_public_id: usuario.public_id,
      wa_link: waLink,
      wa_message_text: messageText,
      suggested_contact_name: usuario.public_id,
      suggested_tags: [categoryLabel, severity, "new"],
    },
    200,
    cors
  );
});
