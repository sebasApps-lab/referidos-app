import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";
import { markSupportOpeningMessageSent } from "../_shared/supportAutoAssign.ts";

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
  const threadPublicId = safeTrim(body.thread_public_id, 64);
  if (!threadPublicId) {
    return jsonResponse({ ok: false, error: "missing_thread" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, assigned_agent_id")
    .eq("public_id", threadPublicId)
    .maybeSingle();
  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  if (usuario.role === "soporte" && thread.assigned_agent_id !== usuario.id) {
    return jsonResponse({ ok: false, error: "not_assigned" }, 403, cors);
  }

  const result = await markSupportOpeningMessageSent({
    threadId: thread.id,
    actorId: usuario.id,
  });
  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error || "opening_message_save_failed" }, 500, cors);
  }

  return jsonResponse(
    {
      ok: true,
      thread_public_id: threadPublicId,
      opening_message_sent_at: result.opening_message_sent_at,
    },
    200,
    cors,
  );
});
