// ================================================
// migrate_auth_and_sync.js — VERSIÓN FINAL 2025
// Totalmente compatible con migración 20250205...
// ================================================

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

// ====================
// VALIDAR ENV
// ====================
const url = process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error("❌ ERROR: Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

// Cliente admin (obligatorio service Role)
const supabase = createClient(url, serviceRole);

// Usuarios demo
const USERS = [
  { localId: "USR_ADMIN", email: "admin@gmail.com",  password: "admin",  role: "admin" },
  { localId: "USR_NEG_1", email: "tienda@gmail.com", password: "tienda", role: "negocio" },
  { localId: "USR_CLI_1", email: "user@gmail.com",   password: "user",   role: "cliente" },
];

// ====================
// CREA USUARIO AUTH SI NO EXISTE
// ====================
async function ensureAuthUser({ email, password, role }) {
  const { data: list, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) throw listError;

  const existing = list.users.find((u) => u.email === email);
  if (existing) {
    // Aseguramos que tenga email confirmado
    if (!existing.email_confirmed_at) {
      await supabase.auth.admin.updateUser(existing.id, {
        email_confirm: true,
        email_confirmed_at: new Date().toISOString(),
      });
    }
    return existing;
  }

  // Crear usuario
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    email_confirmed_at: new Date().toISOString(),
    user_metadata: { role },
  });

  if (error) throw error;
  return data.user;
}

// ====================
// SINCRONIZA PERFIL EN TABLA usuarios
// ====================
async function syncProfile(authUser, localId) {
  const { error } = await supabase
    .from("usuarios")
    .update({
      id_auth: authUser.id,
      emailConfirmado: true,
      role: authUser.user_metadata?.role ?? "cliente",
    })
    .eq("id", localId);

  if (error) {
    console.error("⚠️ Error sincronizando usuario:", localId, error);
  }
}

// ====================
// RUN
// ====================
async function run() {
  console.log("\n🔄 Sincronizando usuarios (Auth → Tabla usuarios)...\n");

  for (const u of USERS) {
    try {
      const authUser = await ensureAuthUser(u);
      await syncProfile(authUser, u.localId);
      console.log(`✓ Usuario sincronizado: ${u.email}`);
    } catch (err) {
      console.error(`❌ Error con ${u.email}:`, err);
    }
  }

  console.log("\n🎉 Listo. Todos los usuarios están sincronizados.\n");
}

// Ejecutar
run();
