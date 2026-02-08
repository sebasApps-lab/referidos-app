// supabase/functions/create-registration-code/index.ts
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
const CODE_PREFIX = "REF";
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_REGEX = /^REF-[A-HJ-KM-NP-Z2-9]{4}-[A-HJ-KM-NP-Z2-9]{3}$/;

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
  const requestedRole = (body?.role ?? "negocio").toString();
  const expiresAt = body?.expires_at ?? null;
  const providedCode = body?.code ? String(body.code).trim().toUpperCase() : null;

  if (providedCode && !CODE_REGEX.test(providedCode)) {
    return json({ ok: false, message: "Formato de codigo invalido" }, 400, corsHeaders);
  }

  const code = providedCode || (await generateUniqueCode());
  if (!code) {
    return json({ ok: false, message: "No se pudo generar codigo" }, 500, corsHeaders);
  }

  const { data, error } = await supabaseAdmin
    .from("codigos_registro")
    .insert({
      code,
      role: requestedRole,
      expires_at: expiresAt,
      created_by: usuario.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    return json({ ok: false, message: error.message || "Error al crear codigo" }, 400, corsHeaders);
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

async function generateUniqueCode() {
  for (let i = 0; i < 6; i += 1) {
    const code = `${CODE_PREFIX}-${randomSuffix(4)}-${randomSuffix(3)}`;
    const { data } = await supabaseAdmin
      .from("codigos_registro")
      .select("id")
      .eq("code", code)
      .maybeSingle();
    if (!data) return code;
  }
  return null;
}

function randomSuffix(length: number) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const byte of bytes) {
    out += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  }
  return out;
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
