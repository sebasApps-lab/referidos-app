import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  assertCurrentSessionRegisteredAndActive,
  corsHeaders,
  getAuthedUser,
  getSessionIdFromToken,
  json,
  supabaseAdmin,
} from "../_shared/session.ts";

serve(async (req) => {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return json(
      { ok: false, code: "method_not_allowed", message: "Method not allowed" },
      405,
      cors,
    );
  }

  const auth = await getAuthedUser(req, cors);
  if (!auth.ok) return auth.response;

  const currentSessionId = getSessionIdFromToken(auth.token);
  if (!currentSessionId) {
    return json(
      {
        ok: false,
        code: "missing_session_id_claim",
        message: "Token is missing session_id claim",
      },
      400,
      cors,
    );
  }

  const sessionState = await assertCurrentSessionRegisteredAndActive(
    auth.user.id,
    currentSessionId,
    cors,
  );
  if (!sessionState.ok) return sessionState.response;

  const body = await req.json().catch(() => ({}));
  const targetSessionId = typeof body?.session_id === "string"
    ? body.session_id.trim()
    : "";
  if (!targetSessionId) {
    return json(
      {
        ok: false,
        code: "invalid_session_id",
        message: "session_id is required",
      },
      400,
      cors,
    );
  }

  const { data, error } = await supabaseAdmin
    .from("user_session_devices")
    .update({ revoked_at: new Date().toISOString() })
    .eq("user_id", auth.user.id)
    .eq("session_id", targetSessionId)
    .is("revoked_at", null)
    .select("id, session_id, revoked_at")
    .maybeSingle();

  if (error) {
    return json(
      {
        ok: false,
        code: "session_revoke_failed",
        message: "Could not revoke session",
      },
      500,
      cors,
    );
  }

  if (!data) {
    return json(
      {
        ok: false,
        code: "session_not_found",
        message: "Session not found or already revoked",
      },
      404,
      cors,
    );
  }

  return json(
    {
      ok: true,
      revoked: true,
      revoked_session_id: targetSessionId,
      current_session_revoked: targetSessionId === currentSessionId,
    },
    200,
    cors,
  );
});
