// supabase/functions/delete-account/index.ts
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
const supabaseAdmin = createClient(supabaseUrl, secretKey); // ejecuta acciones admin (bypass RLS)

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
  if (!token) return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);

  // 1) Validar identidad con publishable key
  const {
    data: { user },
    error: userErr,
  } = await supabasePublic.auth.getUser(token);
  if (userErr || !user) return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);

  const { userId } = await req.json().catch(() => ({}));
  if (!userId) {
    return json({ ok: false, message: "Falta userId" }, 400, corsHeaders);
  }
  if (user.id !== userId) {
    return json({ ok: false, message: "No autorizado" }, 403, corsHeaders);
  }

  const email = user.email ?? "";
  
  try {
    //2) Obtener ids de usuario en public.usuarios para borrar negocios relacionados
    const { data: usuariosRows, error: idsErr } = await supabaseAdmin
      .from("usuarios")
      .select("id")
      .or(`id_auth.eq.${userId}${email ? `,email.eq.${email}` : ""}`);

    if (idsErr) throw idsErr;

    const usuarioIds = (usuariosRows || []).map((u) => u.id).filter(Boolean);

    //3) Borrar negocios vinculados (si los hay)
    if (usuarioIds.length > 0) {
      const { error: negDelErr } = await supabaseAdmin
        .from("negocios")
        .delete()
        .in("usuarioId", usuarioIds);
      if (negDelErr) throw negDelErr;
    }

    //4) Borrar perfil en usuarios
    const { error: userDelErr } = await supabaseAdmin
      .from("usuarios")
      .delete()
      .or(`id_auth.eq.${userId}${email ? `,email.eq.${email}` : ""}`);
    if (userDelErr) throw userDelErr;

    //5) Borrar usuario en Auth
    const { error: delAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (delAuthError) {
      const message =
        delAuthError.message?.toLowerCase().includes("not found") || delAuthError.status === 404
          ? "Esta cuenta ya fue eliminada."
          : delAuthError.message ?? "Error al eliminar la cuenta";
      return json({ ok: false, message }, 200, corsHeaders); //200 para que UI controle modal
    }

    return json({ ok: true, message: "Cuenta eliminada con exito" }, 200, corsHeaders);
  } catch (err) {
    return json(
      {
        ok: false,
        message: err?.message ?? "Error al eliminar la cuenta",
      },
      500,
      corsHeaders
    );
  }
});

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}