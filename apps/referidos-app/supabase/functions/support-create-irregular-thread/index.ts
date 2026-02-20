import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

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

  const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
  if (profileErr || !usuario) {
    return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
  }
  if (!["soporte", "admin"].includes(usuario.role)) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const { data: agentProfile } = await supabaseAdmin
    .from("support_agent_profiles")
    .select("support_phone")
    .eq("user_id", usuario.id)
    .maybeSingle();

  const body = await req.json().catch(() => ({}));
  const userPublicId = safeTrim(body.user_public_id, 32);
  const summary = safeTrim(body.summary, 240);
  const category = body.category ?? "sugerencia";
  const severity = body.severity ?? "s2";
  const appChannel = normalizeAppChannel(body.app_channel);
  const originSource = safeTrim(body.origin_source, 60) || "admin_support";
  const context = typeof body.context === "object" && body.context
    ? body.context
    : {};

  if (!userPublicId || !summary) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }

  const { data: targetUser, error: targetErr } = await supabaseAdmin
    .from("usuarios")
    .select("id, public_id")
    .eq("public_id", userPublicId)
    .maybeSingle();

  if (targetErr || !targetUser) {
    return jsonResponse({ ok: false, error: "user_not_found" }, 404, cors);
  }

  const { data: activeAssigned } = await supabaseAdmin
    .from("support_threads")
    .select("id")
    .eq("assigned_agent_id", usuario.id)
    .in("status", ["assigned", "in_progress", "waiting_user"])
    .limit(1);

  const initialStatus = activeAssigned && activeAssigned.length > 0
    ? "queued"
    : "assigned";

  const insertResponse = await supabaseAdmin
    .from("support_threads")
    .insert({
      user_id: targetUser.id,
      user_public_id: targetUser.public_id,
      category,
      severity,
      status: initialStatus,
      summary,
      context,
      created_by_agent_id: usuario.id,
      assigned_agent_id: usuario.id,
      assigned_agent_phone: agentProfile?.support_phone ?? null,
      irregular: true,
      personal_queue: true,
      suggested_contact_name: targetUser.public_id,
      suggested_tags: [category, severity, "irregular", appChannel],
      app_channel: appChannel,
      origin_source: originSource,
    })
    .select("id, public_id, status")
    .single();

  if (insertResponse.error) {
    return jsonResponse({ ok: false, error: "thread_create_failed" }, 500, cors);
  }

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: insertResponse.data.id,
    event_type: "created",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: { irregular: true, status: initialStatus, app_channel: appChannel },
  });

  return jsonResponse(
    { ok: true, thread: insertResponse.data },
    200,
    cors
  );
});
