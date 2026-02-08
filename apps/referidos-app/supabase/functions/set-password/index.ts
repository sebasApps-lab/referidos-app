// supabase/functions/set-password/index.ts
// Updates user password (adds email provider when missing).

import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("URL") ?? Deno.env.get("SUPABASE_URL");
const publishableKey =
  Deno.env.get("PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
const secretKey =
  Deno.env.get("SECRET_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY",
  );
}

const supabasePublic = createClient(supabaseUrl, publishableKey);
const supabaseAdmin = createClient(supabaseUrl, secretKey);

serve(async (req) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
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

  const payload = await req.json().catch(() => ({}));
  const password = String(payload?.password || "");
  if (password.length < 8) {
    return json({ ok: false, message: "Password invalida" }, 400, corsHeaders);
  }

  const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(
    auth.id,
    {
      password,
      email: auth.email ?? undefined,
    },
  );

  if (updErr) {
    return json(
      { ok: false, message: updErr.message || "No se pudo guardar" },
      500,
      corsHeaders,
    );
  }

  return json({ ok: true }, 200, corsHeaders);
});

async function getAuthUser(
  req: Request,
  corsHeaders: Record<string, string>,
) {
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

function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
