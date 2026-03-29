import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  resolveSupportThreadCategory,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

type WorkflowAction =
  | "opening_message_reset"
  | "opening_message_sent_repeat"
  | "resolution_message_sent"
  | "closing_message_sent"
  | "close_outcome"
  | "issue_context_set"
  | "info_message_sent";

const ALLOWED_ACTIONS = new Set<WorkflowAction>([
  "opening_message_reset",
  "opening_message_sent_repeat",
  "resolution_message_sent",
  "closing_message_sent",
  "close_outcome",
  "issue_context_set",
  "info_message_sent",
]);

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
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
  if (!["soporte", "admin"].includes(String(usuario.role || "").toLowerCase())) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const body = asObject(await req.json().catch(() => ({})));
  const threadPublicId = safeTrim(String(body.thread_public_id || ""), 64);
  const action = safeTrim(String(body.action || ""), 80) as WorkflowAction;
  const payload = asObject(body.payload);
  if (!threadPublicId || !action) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }
  if (!ALLOWED_ACTIONS.has(action)) {
    return jsonResponse({ ok: false, error: "unsupported_action" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, status, assigned_agent_id, category")
    .eq("public_id", threadPublicId)
    .maybeSingle();
  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  if (usuario.role === "soporte" && thread.assigned_agent_id !== usuario.id) {
    return jsonResponse({ ok: false, error: "not_assigned" }, 403, cors);
  }

  const nowIso = new Date().toISOString();
  const updatePayload: Record<string, unknown> = { updated_at: nowIso };

  if (action === "opening_message_reset") {
    updatePayload.opening_message_sent_at = null;
    updatePayload.opening_message_actor_id = null;
  }

  if (action === "issue_context_set") {
    const mode = safeTrim(String(payload.mode || ""), 16).toLowerCase();
    if (mode === "new") {
      const categoryResolved = resolveSupportThreadCategory(payload.category);
      updatePayload.category = categoryResolved.category;
    }
  }

  const shouldUpdateThread = Object.keys(updatePayload).some((key) => key !== "updated_at");
  if (shouldUpdateThread) {
    const { error: updateErr } = await supabaseAdmin
      .from("support_threads")
      .update(updatePayload)
      .eq("id", thread.id);
    if (updateErr) {
      return jsonResponse({ ok: false, error: "thread_update_failed" }, 500, cors);
    }
  } else {
    await supabaseAdmin
      .from("support_threads")
      .update({ updated_at: nowIso })
      .eq("id", thread.id);
  }

  const details: Record<string, unknown> = {
    action,
    at: nowIso,
    ...payload,
  };
  if (action === "issue_context_set") {
    details.prev_category = thread.category || null;
  }

  const { error: eventErr } = await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "status_changed",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details,
  });
  if (eventErr) {
    return jsonResponse({ ok: false, error: "event_insert_failed" }, 500, cors);
  }

  const { data: updatedThread } = await supabaseAdmin
    .from("support_threads")
    .select(
      "public_id, status, category, opening_message_sent_at, opening_message_actor_id, updated_at, assigned_agent_id"
    )
    .eq("id", thread.id)
    .maybeSingle();

  return jsonResponse(
    {
      ok: true,
      thread: updatedThread || null,
      action,
      event_at: nowIso,
    },
    200,
    cors,
  );
});

