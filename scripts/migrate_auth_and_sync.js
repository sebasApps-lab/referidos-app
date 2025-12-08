// ================================================
// migrate_auth_and_sync.js - sincroniza usuarios seed
// ================================================

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const url = process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error("ERROR: Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

// Cliente admin (solo uso CLI/local)
const supabase = createClient(url, serviceRole);

const USERS = [
  { localId: "USR_ADMIN", email: "admin@gmail.com", password: "admin", role: "admin" },
  { localId: "USR_NEG_1", email: "tienda@gmail.com", password: "tienda", role: "negocio" },
  { localId: "USR_CLI_1", email: "user@gmail.com", password: "user", role: "cliente" },
];

async function ensureAuthUser({ email, password, role }) {
  const { data: list, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) throw listError;

  const existing = list.users.find((u) => u.email === email);
  if (existing) {
    const updates = {};
    if (!existing.email_confirmed_at) {
      updates.email_confirm = true;
    }
    if (existing.user_metadata?.role !== role) {
      updates.user_metadata = { role };
    }
    if (Object.keys(updates).length) {
      await supabase.auth.admin.updateUserById(existing.id, updates);
    }
    return existing;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role },
  });

  if (error) throw error;
  return data.user;
}

async function syncProfile(authUser, localId) {
  const { error } = await supabase
    .from("usuarios")
    .upsert(
      {
        id: localId,
        id_auth: authUser.id,
        email: authUser.email,
        role: authUser.user_metadata?.role ?? "cliente",
        emailConfirmado: true,
      },
      { onConflict: "id" }
    );

  if (error) {
    console.error("Error sincronizando usuario:", localId, error);
  }
}

async function run() {
  console.log("\nSincronizando usuarios (Auth -> public.usuarios)...\n");

  for (const u of USERS) {
    try {
      const authUser = await ensureAuthUser(u);
      await syncProfile(authUser, u.localId);
      console.log(`Usuario sincronizado: ${u.email}`);
    } catch (err) {
      console.error(`Error con ${u.email}:`, err);
    }
  }

  console.log("\nListo. Todos los usuarios estan sincronizados.\n");
}

run();
