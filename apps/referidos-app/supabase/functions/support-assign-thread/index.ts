import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  loadSupportRuntimeFlags,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { manualAssignThread } from "../_shared/supportAutoAssign.ts";

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
  if (!["soporte", "admin"].includes(String(usuario.role || "").toLowerCase())) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const body = await req.json().catch(() => ({}));
  const threadPublicId = body.thread_public_id;
  const agentId = body.agent_id || usuario.id;
  if (!threadPublicId) {
    return jsonResponse({ ok: false, error: "missing_thread" }, 400, cors);
  }

  const runtimeFlags = await loadSupportRuntimeFlags();
  const requireJornadaAuthorization = runtimeFlags.require_jornada_authorization;
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

  if (agentErr || !agentProfile) {
    return jsonResponse({ ok: false, error: "agent_not_found" }, 404, cors);
  }
  if (agentProfile.blocked || (requireJornadaAuthorization && !agentProfile.authorized_for_work)) {
    return jsonResponse({ ok: false, error: "agent_not_authorized" }, 403, cors);
  }
  if (
    requireJornadaAuthorization &&
    agentProfile.authorized_until &&
    new Date(agentProfile.authorized_until).getTime() < Date.now()
  ) {
    return jsonResponse({ ok: false, error: "agent_authorization_expired" }, 403, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, tenant_id, status, personal_queue, assigned_agent_id")
    .eq("public_id", threadPublicId)
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }
  if (thread.assigned_agent_id) {
    return jsonResponse({ ok: false, error: "thread_already_assigned" }, 409, cors);
  }
  if (!(thread.status === "new" || (thread.status === "queued" && thread.personal_queue === false))) {
    return jsonResponse({ ok: false, error: "thread_not_assignable" }, 409, cors);
  }

  const assignmentResult = await manualAssignThread({
    threadId: thread.id,
    agentId,
    tenantId: thread.tenant_id || usuario.tenant_id || null,
    actorId: usuario.id,
    actorRole: usuario.role || "soporte",
  });

  if (!assignmentResult.ok) {
    if (assignmentResult.error === "agent_not_eligible") {
      return jsonResponse({ ok: false, error: "agent_not_authorized" }, 403, cors);
    }
    if (assignmentResult.error === "agent_capacity_full") {
      return jsonResponse({ ok: false, error: "agent_capacity_full" }, 409, cors);
    }
    if (assignmentResult.error === "assign_conflict") {
      return jsonResponse({ ok: false, error: "assign_conflict" }, 409, cors);
    }
    return jsonResponse({ ok: false, error: assignmentResult.error || "assign_failed" }, 500, cors);
  }

  const { data: updatedThread } = await supabaseAdmin
    .from("support_threads")
    .select("public_id, status, assigned_agent_id, personal_queue")
    .eq("id", thread.id)
    .maybeSingle();

  return jsonResponse(
    {
      ok: true,
      thread: updatedThread || null,
      mode: assignmentResult.mode || null,
      cycle: assignmentResult.cycle || null,
    },
    200,
    cors,
  );
});
