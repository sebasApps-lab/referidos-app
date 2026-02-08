// supabase/functions/revoke-registration-code/index.ts
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

const ADMIN_ROLES = new Set(["admin", "soporte", "dev"]);

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

  const { data: usuario, error: usuarioErr } = await supabaseAdmin
    .from("usuarios")
    .select("id, role")
    .eq("id_auth", auth.id)
    .maybeSingle();

  if (usuarioErr || !usuario) {
    return json({ ok: false, message: "Usuario no encontrado" }, 404, corsHeaders);
  }

  const roleName = (usuario.role || "").toString().toLowerCase();
  if (!ADMIN_ROLES.has(roleName)) {
    return json({ ok: false, message: "No autorizado" }, 403, corsHeaders);
  }

  const body = await req.json().catch(() => ({}));
  const code = body?.code ? String(body.code).trim().toUpperCase() : null;
  const id = body?.id ? String(body.id).trim() : null;

  if (!code && !id) {
    return json({ ok: false, message: "Falta code o id" }, 400, corsHeaders);
  }

  const nowIso = new Date().toISOString();
  let query = supabaseAdmin
    .from("codigos_registro")
    .update({ revoked_at: nowIso })
    .is("revoked_at", null);

  query = code ? query.eq("code", code) : query.eq("id", id);

  const { data, error } = await query.select().maybeSingle();

  if (error || !data) {
    return json({ ok: false, message: "No se pudo revocar" }, 400, corsHeaders);
  }

  return json({ ok: true, data }, 200, corsHeaders);
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
