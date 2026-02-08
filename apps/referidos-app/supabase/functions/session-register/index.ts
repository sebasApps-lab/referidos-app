import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getAuthedUser,
  getSessionIdFromToken,
  hashUserAgent,
  json,
  pruneSessions,
  sanitizeDeviceId,
  sanitizeLabel,
  sanitizePlatform,
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

  const sessionId = getSessionIdFromToken(auth.token);
  if (!sessionId) {
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

  const body = await req.json().catch(() => ({}));
  const deviceId = sanitizeDeviceId(body?.device_id);
  if (!deviceId) {
    return json(
      {
        ok: false,
        code: "invalid_device_id",
        message: "device_id is required and must be valid",
      },
      400,
      cors,
    );
  }

  const label = sanitizeLabel(body?.label);
  const platform = sanitizePlatform(body?.platform);
  const uaHash = await hashUserAgent(req);
  const nowIso = new Date().toISOString();

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("user_session_devices")
    .select("id, revoked_at")
    .eq("user_id", auth.user.id)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existingError) {
    return json(
      {
        ok: false,
        code: "session_lookup_failed",
        message: "Could not validate existing session entry",
      },
      500,
      cors,
    );
  }

  if (existing?.revoked_at) {
    return json(
      {
        ok: false,
        code: "session_revoked",
        message: "This session has already been revoked",
      },
      401,
      cors,
    );
  }

  const { data, error } = await supabaseAdmin
    .from("user_session_devices")
    .upsert(
      {
        user_id: auth.user.id,
        session_id: sessionId,
        device_id: deviceId,
        label,
        platform,
        ua_hash: uaHash,
        last_seen_at: nowIso,
      },
      { onConflict: "user_id,session_id" },
    )
    .select("id, user_id, session_id, device_id, label, platform, created_at, last_seen_at")
    .single();

  if (error) {
    return json(
      {
        ok: false,
        code: "session_register_failed",
        message: "Could not register session",
      },
      500,
      cors,
    );
  }

  await pruneSessions(auth.user.id);

  return json(
    {
      ok: true,
      session: data,
      current_session_id: sessionId,
    },
    200,
    cors,
  );
});
