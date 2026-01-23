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

  const body = await req.json().catch(() => ({}));
  const threadPublicId = body.thread_public_id;
  if (!threadPublicId) {
    return jsonResponse({ ok: false, error: "missing_thread" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, status, assigned_agent_id, user_id")
    .eq("public_id", threadPublicId)
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  if (thread.user_id !== usuario.id) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  if (thread.assigned_agent_id) {
    return jsonResponse({ ok: false, error: "already_assigned" }, 409, cors);
  }

  if (!["new", "queued"].includes(thread.status)) {
    return jsonResponse({ ok: false, error: "invalid_status" }, 409, cors);
  }

  const { error: updateErr } = await supabaseAdmin
    .from("support_threads")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
      cancelled_by: usuario.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", thread.id);

  if (updateErr) {
    return jsonResponse({ ok: false, error: "cancel_failed" }, 500, cors);
  }

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "cancelled",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: { reason: "user_cancel" },
  });

  return jsonResponse({ ok: true }, 200, cors);
});
