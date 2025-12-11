import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Lee primero variables con prefijo SUPABASE_, y si no existen usa las que configuraste en UI.
const supabaseUrl = Deno.env.get("URL") ?? Deno.env.get("SUPABASE_URL");
const publishableKey = Deno.env.get("PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
const secretKey = Deno.env.get("SECRET_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error("Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY");
}

const supabasePublic = createClient(supabaseUrl, publishableKey); // valida al usuario
const supabaseAdmin = createClient(supabaseUrl, secretKey); // ejecuta acciones admin

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
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return new Response("Unauthorized", { status: 401, headers: corsHeaders });

  // 1) Validar identidad con publishable key
  const {
    data: { user },
    error: userErr,
  } = await supabasePublic.auth.getUser(token);
  if (userErr || !user) return new Response("Unauthorized", { status: 401, headers: corsHeaders });

  const { userId } = await req.json().catch(() => ({}));
  if (!userId) {
    return new Response(JSON.stringify({ ok: false, message: "Falta userId" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
  if (user.id !== userId) {
    return new Response(JSON.stringify({ ok: false, message: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const email = user.email ?? "";

  // 2) Borrar datos relacionados con secret key (bypass RLS)
  await supabaseAdmin
    .from("negocios")
    .delete()
    .or(`id_auth.eq.${userId}${email ? `,email.eq.${email}` : ""}`);
  await supabaseAdmin
    .from("usuarios")
    .delete()
    .or(`id_auth.eq.${userId}${email ? `,email.eq.${email}` : ""}`);

  // 3) Borrar usuario en Auth
  const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (delErr) {
    const message =
      delErr.message?.toLowerCase().includes("not found") || delErr.status === 404
        ? "Esta cuenta ya fue eliminada."
        : delErr.message ?? "Error al eliminar la cuenta";

    return new Response(JSON.stringify({ ok: false, message }), {
      status: 200, // Devuelve 200 para que el frontend controle el modal y no el navegador
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  return new Response(JSON.stringify({ ok: true, message: "Cuenta eliminada con exito" }), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
    status: 200,
  });
});
