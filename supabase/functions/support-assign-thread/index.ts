import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

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

  const body = await req.json().catch(() => ({}));
  const threadPublicId = body.thread_public_id;
  const agentId = body.agent_id || usuario.id;

  if (!threadPublicId) {
    return jsonResponse({ ok: false, error: "missing_thread" }, 400, cors);
  }

  const isAdminSelf = usuario.role === "admin" && agentId === usuario.id;
  const { data: sessionRow } = await supabaseAdmin
    .from("support_agent_sessions")
    .select("id")
    .eq("agent_id", agentId)
    .is("end_at", null)
    .order("start_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!sessionRow?.id) {
    return jsonResponse({ ok: false, error: "agent_session_inactive" }, 409, cors);
  }
  const { data: agentProfile, error: agentErr } = await supabaseAdmin
    .from("support_agent_profiles")
    .select("user_id, authorized_for_work, authorized_until, blocked, support_phone")
    .eq("user_id", agentId)
    .maybeSingle();

  if (!isAdminSelf && (agentErr || !agentProfile)) {
    return jsonResponse({ ok: false, error: "agent_not_found" }, 404, cors);
  }

  if (!isAdminSelf && (agentProfile?.blocked || !agentProfile?.authorized_for_work)) {
    return jsonResponse({ ok: false, error: "agent_not_authorized" }, 403, cors);
  }
  if (
    !isAdminSelf &&
    agentProfile?.authorized_until &&
    new Date(agentProfile.authorized_until).getTime() < Date.now()
  ) {
    return jsonResponse({ ok: false, error: "agent_authorization_expired" }, 403, cors);
  }

  const activeAssigned = await supabaseAdmin
    .from("support_threads")
    .select("id")
    .eq("assigned_agent_id", agentId)
    .in("status", ["assigned", "in_progress", "waiting_user"])
    .limit(1);

  if (activeAssigned.data && activeAssigned.data.length > 0) {
    return jsonResponse({ ok: false, error: "agent_has_active_ticket" }, 409, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, status, assigned_agent_id, wa_message_text")
    .eq("public_id", threadPublicId)
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  const supportPhone = agentProfile?.support_phone ?? null;
  const updateResponse = await supabaseAdmin
    .from("support_threads")
    .update({
      assigned_agent_id: agentId,
      assigned_agent_phone: supportPhone,
      status: "assigned",
      updated_at: new Date().toISOString(),
    })
    .eq("id", thread.id)
    .select("public_id, status, assigned_agent_id")
    .single();

  if (updateResponse.error) {
    return jsonResponse({ ok: false, error: "assign_failed" }, 500, cors);
  }

  if (supportPhone && thread.wa_message_text) {
    const waLink =
      "https://wa.me/" +
      supportPhone.replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent(thread.wa_message_text);
    await supabaseAdmin
      .from("support_threads")
      .update({ wa_link: waLink })
      .eq("id", thread.id);
  }

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "assigned",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: { agent_id: agentId },
  });

  return jsonResponse(
    {
      ok: true,
      thread: updateResponse.data,
    },
    200,
    cors
  );
});
