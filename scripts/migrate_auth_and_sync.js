// ================================================
// migrate_auth_and_sync.js (2025)
// Crea usuarios seed en Auth y sincroniza public.usuarios
// Sin roles en metadata ni IDs personalizados (ownership vía auth.uid)
// ================================================

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ADMIN_KEY;

if (!url || !serviceKey) {
  console.error("ERROR: Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

// Usuarios demo (no se pasan IDs ni roles por metadata)
const USERS = [
  { email: "admin@gmail.com", password: "admin", role: "admin", telefono: "0990000000" },
  { email: "tienda@gmail.com", password: "tienda", role: "negocio", telefono: "0991110000" },
  { email: "user@gmail.com", password: "user", role: "cliente", telefono: "0992220000" },
];

async function findAuthUserByEmail(email) {
  let page = 1;
  const perPage = 200;
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const found = data?.users?.find((u) => u.email === email);
    if (found) return found;
    if (!data || data.users.length < perPage) return null;
    page += 1;
  }
}

async function ensureAuthUser({ email, password }) {
  const existing = await findAuthUserByEmail(email);
  if (existing) {
    if (!existing.email_confirmed_at) {
      await supabase.auth.admin.updateUserById(existing.id, { email_confirm: true });
    }
    return existing;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) throw error;
  return data.user;
}

async function reloadSchemaCache() {
  try {
    await supabase.rpc("postgrest_reload_schema");
    return true;
  } catch (err) {
    console.warn("No se pudo recargar schema cache (postgrest_reload_schema).", err.message || err);
    return false;
  }
}

async function syncProfile(authUser, { role, telefono }) {
  const upsert = () =>
    supabase
      .from("usuarios")
      .upsert(
        {
          email: authUser.email,
          id_auth: authUser.id,
          role: role || "cliente",
          telefono: telefono || null,
        },
        { onConflict: "email" }
      );

  let { error } = await upsert();
  if (error && String(error.message || "").includes("schema cache")) {
    const reloaded = await reloadSchemaCache();
    if (reloaded) {
      ({ error } = await upsert());
    }
    if (error && String(error.message || "").includes("emailConfirmado")) {
      console.warn("La API no ve la columna emailConfirmado. Asegura que las migraciones estén aplicadas o recarga PostgREST.");
    }
  }
  if (error) throw error;
}

async function run() {
  console.log("\nSincronizando usuarios (Auth -> public.usuarios)...\n");

  for (const u of USERS) {
    try {
      const authUser = await ensureAuthUser(u);
      await syncProfile(authUser, u);
      console.log(`✔ Usuario sincronizado: ${u.email}`);
    } catch (err) {
      console.error(`✖ Error con ${u.email}:`, err.message || err);
    }
  }

  console.log("\nListo.\n");
}

run();
