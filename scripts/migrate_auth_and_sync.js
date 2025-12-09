// ================================================
// migrate_auth_and_sync.js (2025)
// Crea usuarios seed en Auth y sincroniza public.usuarios
// Sin roles en metadata ni IDs personalizados (ownership vía auth.uid)
// ================================================

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ADMIN_KEY;

if (!url || !serviceKey) {
  console.error("ERROR: Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

// Usuarios demo (coinciden con el seed.sql)
const USERS = [
  // admin
  { email: "admin@gmail.com", password: "admin", role: "admin", telefono: "0990000000" },

  // negocios
  { email: "tienda@gmail.com", password: "tienda", role: "negocio", telefono: "0991110000" },
  { email: "neg2@gmail.com", password: "neg2", role: "negocio", telefono: "0993000002" },
  { email: "neg3@gmail.com", password: "neg3", role: "negocio", telefono: "0993000003" },
  { email: "neg4@gmail.com", password: "neg4", role: "negocio", telefono: "0993000004" },
  { email: "neg5@gmail.com", password: "neg5", role: "negocio", telefono: "0993000005" },
  { email: "neg6@gmail.com", password: "neg6", role: "negocio", telefono: "0993000006" },
  { email: "neg7@gmail.com", password: "neg7", role: "negocio", telefono: "0993000007" },
  { email: "neg8@gmail.com", password: "neg8", role: "negocio", telefono: "0993000008" },
  { email: "neg9@gmail.com", password: "neg9", role: "negocio", telefono: "0993000009" },

  // clientes
  { email: "user@gmail.com", password: "user", role: "cliente", telefono: "0992220000" },
  { email: "cli2@gmail.com", password: "cli2", role: "cliente", telefono: "0994000002" },
  { email: "cli3@gmail.com", password: "cli3", role: "cliente", telefono: "0994000003" },
  { email: "cli4@gmail.com", password: "cli4", role: "cliente", telefono: "0994000004" },
  { email: "cli5@gmail.com", password: "cli5", role: "cliente", telefono: "0994000005" },
  { email: "cli6@gmail.com", password: "cli6", role: "cliente", telefono: "0994000006" },
  { email: "cli7@gmail.com", password: "cli7", role: "cliente", telefono: "0994000007" },
  { email: "cli8@gmail.com", password: "cli8", role: "cliente", telefono: "0994000008" },
  { email: "cli9@gmail.com", password: "cli9", role: "cliente", telefono: "0994000009" },
  { email: "cli10@gmail.com", password: "cli10", role: "cliente", telefono: "0994000010" },
  { email: "cli11@gmail.com", password: "cli11", role: "cliente", telefono: "0994000011" },
  { email: "cli12@gmail.com", password: "cli12", role: "cliente", telefono: "0994000012" },
  { email: "cli13@gmail.com", password: "cli13", role: "cliente", telefono: "0994000013" },
  { email: "cli14@gmail.com", password: "cli14", role: "cliente", telefono: "0994000014" },
  { email: "cli15@gmail.com", password: "cli15", role: "cliente", telefono: "0994000015" },
  { email: "cli16@gmail.com", password: "cli16", role: "cliente", telefono: "0994000016" },
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
