import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  jsonResponse,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

const ACTIVE_STATUSES = ["new", "assigned", "in_progress", "waiting_user", "queued"];

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

  const body = await req.json().catch(() => ({}));
  const threadPublicId = safeTrim(body.thread_public_id, 32);
  const trackingToken = safeTrim(body.tracking_token, 128);
  const reason = safeTrim(body.reason, 80) || "anonymous_cancel";

  if (!threadPublicId || !trackingToken) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, status, anon_tracking_token_hash")
    .eq("public_id", threadPublicId)
    .eq("request_origin", "anonymous")
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  const expectedHash = await sha256(trackingToken);
  if (!thread.anon_tracking_token_hash || thread.anon_tracking_token_hash !== expectedHash) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  if (thread.status === "cancelled" || thread.status === "closed") {
    return jsonResponse(
      {
        ok: true,
        already_closed: true,
        thread_public_id: thread.public_id,
        status: thread.status,
      },
      200,
      cors,
    );
  }

  if (!ACTIVE_STATUSES.includes(thread.status)) {
    return jsonResponse({ ok: false, error: "invalid_status" }, 409, cors);
  }

  const nowIso = new Date().toISOString();
  const { error: updateErr } = await supabaseAdmin
    .from("support_threads")
    .update({
      status: "cancelled",
      cancelled_at: nowIso,
      cancelled_by: null,
      updated_at: nowIso,
    })
    .eq("id", thread.id);

  if (updateErr) {
    return jsonResponse({ ok: false, error: "cancel_failed" }, 500, cors);
  }

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "cancelled",
    actor_role: "anonymous",
    actor_id: null,
    details: { reason },
  });

  return jsonResponse(
    {
      ok: true,
      thread_public_id: thread.public_id,
      status: "cancelled",
    },
    200,
    cors,
  );
});
