import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";
import { markSupportRetakeRequested } from "../_shared/supportAutoAssign.ts";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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
  const body = await req.json().catch(() => ({}));
  const threadPublicId = safeTrim(body.thread_public_id, 64);
  const trackingToken = safeTrim(body.tracking_token, 128);
  if (!threadPublicId) {
    return jsonResponse({ ok: false, error: "missing_thread" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select(
      "id, tenant_id, request_origin, status, personal_queue, assigned_agent_id, user_id, anon_tracking_token_hash, app_channel",
    )
    .eq("public_id", threadPublicId)
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }
  if (!(thread.status === "queued" && thread.personal_queue === false && !thread.assigned_agent_id)) {
    return jsonResponse({ ok: false, error: "thread_not_retakeable" }, 409, cors);
  }

  let actorId: string | null = null;
  let actorRole = "user";

  if (thread.request_origin === "anonymous") {
    if (!trackingToken) {
      return jsonResponse({ ok: false, error: "missing_tracking_token" }, 400, cors);
    }
    const expectedHash = await sha256(trackingToken);
    if (!thread.anon_tracking_token_hash || thread.anon_tracking_token_hash !== expectedHash) {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }
    actorRole = "anonymous";
  } else {
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
    if (thread.user_id !== usuario.id) {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }
    actorId = usuario.id;
    actorRole = usuario.role || "user";
  }

  const retakeResult = await markSupportRetakeRequested({
    threadId: thread.id,
    tenantId: thread.tenant_id || null,
    actorId,
    actorRole,
  });

  if (!retakeResult.ok) {
    return jsonResponse({ ok: false, error: retakeResult.error || "retake_failed" }, 409, cors);
  }

  return jsonResponse(
    {
      ok: true,
      thread_public_id: threadPublicId,
      app_channel: thread.app_channel || null,
      retake_requested_at: retakeResult.retake_requested_at,
      estimated_delay_seconds: retakeResult.estimated_delay_seconds,
      cycle: retakeResult.cycle,
    },
    200,
    cors,
  );
});
