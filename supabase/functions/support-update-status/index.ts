import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  new: ["assigned", "queued"],
  assigned: ["in_progress", "queued"],
  in_progress: ["waiting_user", "queued", "closed"],
  waiting_user: ["in_progress", "queued", "closed"],
  queued: ["assigned", "in_progress"],
  closed: [],
};

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
  const nextStatus = body.status;
  if (!threadPublicId || !nextStatus) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, status, assigned_agent_id, personal_queue")
    .eq("public_id", threadPublicId)
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  if (usuario.role === "soporte") {
    if (thread.assigned_agent_id !== usuario.id) {
      return jsonResponse({ ok: false, error: "not_assigned" }, 403, cors);
    }
  } else if (usuario.role !== "admin") {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const allowed = ALLOWED_TRANSITIONS[thread.status] || [];
  if (!allowed.includes(nextStatus)) {
    return jsonResponse({ ok: false, error: "invalid_transition" }, 409, cors);
  }

  const updatePayload: Record<string, unknown> = {
    status: nextStatus,
    updated_at: new Date().toISOString(),
  };
  if (nextStatus === "queued" && !thread.personal_queue) {
    updatePayload.assigned_agent_id = null;
  }
  if (nextStatus === "closed") {
    updatePayload.closed_at = new Date().toISOString();
  }

  const updateResponse = await supabaseAdmin
    .from("support_threads")
    .update(updatePayload)
    .eq("id", thread.id)
    .select("public_id, status, assigned_agent_id, closed_at")
    .single();

  if (updateResponse.error) {
    return jsonResponse({ ok: false, error: "status_update_failed" }, 500, cors);
  }

  let eventType = "status_changed";
  if (nextStatus === "waiting_user") eventType = "waiting_user";
  if (nextStatus === "queued") eventType = "queued";
  if (thread.status === "waiting_user" && nextStatus === "in_progress") {
    eventType = "resumed";
  }
  if (nextStatus === "closed") eventType = "closed";

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: eventType,
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: {
      from: thread.status,
      to: nextStatus,
    },
  });

  return jsonResponse({ ok: true, thread: updateResponse.data }, 200, cors);
});
