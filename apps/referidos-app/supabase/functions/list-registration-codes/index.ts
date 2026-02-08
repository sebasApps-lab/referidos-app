// supabase/functions/list-registration-codes/index.ts
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
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET" && req.method !== "POST") {
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

  const url = new URL(req.url);
  const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
  const status = (url.searchParams.get("status") ?? body?.status ?? "").toString().toLowerCase();
  const limit = clampInt(url.searchParams.get("limit") ?? body?.limit ?? 50, 1, 200);
  const offset = clampInt(url.searchParams.get("offset") ?? body?.offset ?? 0, 0, 10000);
  const nowIso = new Date().toISOString();

  let query = supabaseAdmin
    .from("codigos_registro")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (status === "used") {
    query = query.not("used_at", "is", null);
  } else if (status === "revoked") {
    query = query.not("revoked_at", "is", null);
  } else if (status === "expired") {
    query = query.is("used_at", null).is("revoked_at", null).lt("expires_at", nowIso);
  } else if (status === "active") {
    query = query
      .is("used_at", null)
      .is("revoked_at", null)
      .or(`expires_at.is.null,expires_at.gt.${nowIso}`);
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) {
    return json({ ok: false, message: error.message || "Error al listar" }, 400, corsHeaders);
  }

  return json({ ok: true, data, count }, 200, corsHeaders);
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

function clampInt(value: string | number, min: number, max: number) {
  const parsed = typeof value === "number" ? value : parseInt(String(value), 10);
  if (Number.isNaN(parsed)) return min;
  return Math.max(min, Math.min(max, parsed));
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
