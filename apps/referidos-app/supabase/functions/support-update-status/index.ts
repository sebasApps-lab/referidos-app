import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  loadSupportRuntimeFlags,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { runSupportAutoAssignCycle } from "../_shared/supportAutoAssign.ts";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  new: ["starting", "assigned", "queued", "cancelled"],
  starting: ["in_progress", "queued", "closed", "cancelled"],
  assigned: ["starting", "in_progress", "queued", "closed", "cancelled"],
  in_progress: ["waiting_user", "queued", "closed", "cancelled"],
  waiting_user: ["in_progress", "queued", "closed", "cancelled"],
  queued: ["starting", "assigned", "in_progress", "closed", "cancelled"],
  closed: [],
  cancelled: [],
};

function normalizeQueueKind(value: unknown) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (["personal", "mine", "propia", "private", "postponed", "pospuesto"].includes(normalized)) {
    return "personal";
  }
  return "general";
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

  const body = await req.json().catch(() => ({}));
  const threadPublicId = body.thread_public_id;
  const nextStatus = String(body.status || "").trim().toLowerCase();
  const queueKind = normalizeQueueKind(body.queue_kind);
  if (!threadPublicId || !nextStatus) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, tenant_id, status, assigned_agent_id, personal_queue")
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

  if (
    ["starting", "in_progress"].includes(nextStatus) &&
    thread.assigned_agent_id
  ) {
    const runtimeFlags = await loadSupportRuntimeFlags();
    const maxProcessing = Math.max(1, Number(runtimeFlags.max_processing_tickets || 1));
    const { count: processingCount } = await supabaseAdmin
      .from("support_threads")
      .select("id", { count: "exact", head: true })
      .eq("assigned_agent_id", thread.assigned_agent_id)
      .neq("id", thread.id)
      .in("status", ["starting", "in_progress", "waiting_user"]);

    if ((processingCount || 0) >= maxProcessing) {
      return jsonResponse({ ok: false, error: "processing_slot_busy" }, 409, cors);
    }
  }

  const nowIso = new Date().toISOString();
  const updatePayload: Record<string, unknown> = {
    status: nextStatus,
    updated_at: nowIso,
  };

  if (nextStatus === "starting") {
    updatePayload.personal_queue = false;
    updatePayload.starting_at = nowIso;
  } else if (nextStatus === "in_progress") {
    updatePayload.personal_queue = false;
    updatePayload.in_progress_at = nowIso;
  } else if (nextStatus === "waiting_user") {
    updatePayload.waiting_user_at = nowIso;
  } else if (nextStatus === "queued") {
    if (queueKind === "personal") {
      updatePayload.personal_queue = true;
      updatePayload.personal_queue_entered_at = nowIso;
    } else {
      updatePayload.personal_queue = false;
      updatePayload.assigned_agent_id = null;
      updatePayload.released_to_general_at = nowIso;
      updatePayload.general_queue_entered_at = nowIso;
    }
  } else if (nextStatus === "closed") {
    updatePayload.closed_at = nowIso;
  } else if (nextStatus === "cancelled") {
    updatePayload.cancelled_at = nowIso;
    updatePayload.cancelled_by = usuario.id;
  }

  const updateResponse = await supabaseAdmin
    .from("support_threads")
    .update(updatePayload)
    .eq("id", thread.id)
    .select("public_id, status, assigned_agent_id, personal_queue, closed_at, cancelled_at")
    .single();

  if (updateResponse.error) {
    return jsonResponse({ ok: false, error: "status_update_failed" }, 500, cors);
  }

  let eventType = "status_changed";
  if (nextStatus === "starting") eventType = "starting";
  if (nextStatus === "waiting_user") eventType = "waiting_user";
  if (nextStatus === "queued" && queueKind === "personal") eventType = "queued";
  if (nextStatus === "queued" && queueKind === "general") eventType = "agent_manual_release";
  if (thread.status === "waiting_user" && nextStatus === "in_progress") {
    eventType = "resumed";
  }
  if (nextStatus === "closed") eventType = "closed";
  if (nextStatus === "cancelled") eventType = "cancelled";

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: eventType,
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: {
      from: thread.status,
      to: nextStatus,
      queue_kind: nextStatus === "queued" ? queueKind : null,
    },
  });

  const cycle = await runSupportAutoAssignCycle({
    reason: "status_updated",
    tenantId: thread.tenant_id || usuario.tenant_id || null,
    actorId: usuario.id,
    actorRole: usuario.role || "soporte",
  });

  return jsonResponse({ ok: true, thread: updateResponse.data, cycle }, 200, cors);
});
