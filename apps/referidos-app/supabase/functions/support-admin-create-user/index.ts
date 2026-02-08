import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

const ROLE_OPTIONS = new Set(["soporte", "dev", "empleado"]);
const PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";

function generatePassword(length = 12) {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((value) => PASSWORD_CHARS[value % PASSWORD_CHARS.length])
    .join("");
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: cors });
    }
    if (req.method !== "POST") {
      return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
    }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);
    }

  const { user, error: authErr } = await requireAuthUser(token);
    if (authErr || !user) {
      return jsonResponse({ ok: false, error: "unauthorized" }, 401, cors);
    }

  const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
    if (profileErr || !usuario) {
      return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
    }
    if (usuario.role !== "admin") {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const nombre = String(body.nombre ?? "").trim();
  const apellido = String(body.apellido ?? "").trim();
  const fechaNacimiento = body.fecha_nacimiento ?? null;
  const role = String(body.role ?? "soporte").trim().toLowerCase();

    if (!email || !nombre || !apellido || !ROLE_OPTIONS.has(role)) {
      return jsonResponse({ ok: false, error: "missing_fields" }, 400, cors);
    }

  const tempPassword = generatePassword();

  const { data: created, error: createErr } = await supabaseAdmin.auth.admin
    .createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { role, nombre, apellido },
    });

    if (createErr || !created?.user) {
      const message = createErr?.message || "user_create_failed";
      const isDuplicate =
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("exists") ||
        message.toLowerCase().includes("duplicate");
      return jsonResponse(
        { ok: false, error: message, code: isDuplicate ? "email_exists" : "create_failed" },
        isDuplicate ? 409 : 500,
        cors
      );
    }

  const { error: upsertErr } = await supabaseAdmin
    .from("usuarios")
    .upsert(
      {
        id_auth: created.user.id,
        email,
        nombre,
        apellido,
        role,
        fecha_nacimiento: fechaNacimiento,
        email_verificado: true,
        account_status: "active",
        must_change_password: true,
      },
      { onConflict: "id_auth" }
    );

    if (upsertErr) {
      await supabaseAdmin.auth.admin.deleteUser(created.user.id);
      return jsonResponse(
        {
          ok: false,
          error: "profile_upsert_failed",
          message: upsertErr.message,
        },
        500,
        cors
      );
    }

  const { data: perfil } = await supabaseAdmin
    .from("usuarios")
    .select("id, public_id")
    .eq("id_auth", created.user.id)
    .maybeSingle();

    return jsonResponse(
      {
        ok: true,
        email,
        password: tempPassword,
        role,
        user_id: perfil?.id ?? null,
        public_id: perfil?.public_id ?? null,
      },
      200,
      cors
    );
  } catch (err) {
    return jsonResponse(
      {
        ok: false,
        error: "unexpected_error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      500,
      cors
    );
  }
});
