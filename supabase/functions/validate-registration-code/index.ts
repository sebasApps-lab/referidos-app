// supabase/functions/validate-registration-code/index.ts
import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("URL") ?? Deno.env.get("SUPABASE_URL");
const publishableKey = Deno.env.get("PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
const secretKey = Deno.env.get("SECRET_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error("Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY");
}

const supabasePublic = createClient(supabaseUrl, publishableKey);
const supabaseAdmin = createClient(supabaseUrl, secretKey);

serve(async (req) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, message: "Method not allowed" }, 405, corsHeaders);
  }

  const auth = await getAuthUser(req, corsHeaders);
  if (auth instanceof Response) return auth;

  const body = await req.json().catch(() => ({}));
  const codeRaw = body?.code ? String(body.code).trim().toUpperCase() : "";
  const consume = body?.consume !== false;
  const expectedRole = body?.expected_role ? String(body.expected_role) : null;

  if (!codeRaw) {
    return json({ ok: false, message: "Codigo requerido" }, 400, corsHeaders);
  }

  const { data: registro, error: regErr } = await supabaseAdmin
    .from("codigos_registro")
    .select("*")
    .eq("code", codeRaw)
    .maybeSingle();

  if (regErr || !registro) {
    return json({ ok: true, valid: false, reason: "not_found" }, 200, corsHeaders);
  }

  if (registro.revoked_at) {
    return json({ ok: true, valid: false, reason: "revoked" }, 200, corsHeaders);
  }

  if (registro.used_at) {
    return json({ ok: true, valid: false, reason: "used" }, 200, corsHeaders);
  }

  if (registro.expires_at && new Date(registro.expires_at).getTime() <= Date.now()) {
    return json({ ok: true, valid: false, reason: "expired" }, 200, corsHeaders);
  }

  if (expectedRole && registro.role !== expectedRole) {
    return json({ ok: true, valid: false, reason: "role_mismatch" }, 200, corsHeaders);
  }

  if (!consume) {
    return json({ ok: true, valid: true, data: registro }, 200, corsHeaders);
  }

  const { data: usuario, error: usuarioErr } = await supabaseAdmin
    .from("usuarios")
    .select("id")
    .eq("id_auth", auth.id)
    .maybeSingle();

  if (usuarioErr || !usuario) {
    return json({ ok: false, message: "Perfil requerido" }, 400, corsHeaders);
  }

  const nowIso = new Date().toISOString();
  const { data: updated, error: updErr } = await supabaseAdmin
    .from("codigos_registro")
    .update({
      used_at: nowIso,
      used_by_user_id: usuario.id,
    })
    .eq("id", registro.id)
    .is("used_at", null)
    .is("revoked_at", null)
    .select()
    .maybeSingle();

  if (updErr || !updated) {
    return json({ ok: false, message: "No se pudo consumir el codigo" }, 409, corsHeaders);
  }

  return json({ ok: true, valid: true, consumed: true, data: updated }, 200, corsHeaders);
});

async function getAuthUser(req: Request, corsHeaders: Record<string, string>) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);
  }

  const {
    data: { user },
    error,
  } = await supabasePublic.auth.getUser(token);

  if (error || !user) {
    return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);
  }

  return user;
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
