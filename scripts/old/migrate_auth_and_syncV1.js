// migrate_auth_and_sync.js
// Script final para migrar usuarios locales → Supabase Auth + sincronizar usuarios.id_auth

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Faltan variables SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Usuarios a sincronizar
const USERS = [
  { localId: "USR_ADMIN", email: "admin@gmail.com", password: "admin", role: "admin" },
  { localId: "USR_NEG_1", email: "tienda@gmail.com", password: "tienda", role: "negocio" },
  { localId: "USR_CLI_1", email: "user@gmail.com", password: "user", role: "cliente" },
];

async function run() {
  console.log("Iniciando migración Auth → usuarios.id_auth...");

  for (const u of USERS) {
    let authUser = null;

    // Buscar si ya existe en Auth
    const { data: list, error: listErr } = await supabase.auth.admin.listUsers();
    if (listErr) {
      console.error("Error listando usuarios Auth:", listErr);
      continue;
    }

    const existing = list.users.find((x) => x.email === u.email);

    if (existing) {
      authUser = existing;
      console.log(`Usuario ya existía en Auth: ${u.email}`);
    } else {
      // Crear usuario en Auth
      const { data: created, error: createErr } = await supabase.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { role: u.role },
      });

      if (createErr) {
        console.error(`Error creando usuario ${u.email}:`, createErr);
        continue;
      }

      authUser = created.user;
      console.log(`Usuario creado en Auth: ${u.email}`);
    }

    if (!authUser?.id) {
      console.error(`No se pudo obtener uid para ${u.email}`);
      continue;
    }

    const uid = authUser.id;

    // Actualizar tabla usuarios (sin borrar nada)
    const { error: updErr } = await supabase
      .from("usuarios")
      .update({ id_auth: uid, emailConfirmado: true })
      .eq("id", u.localId);

    if (updErr) {
      console.error(`Error actualizando usuarios.id_auth (${u.localId}):`, updErr);
      continue;
    }

    console.log(`OK → ${u.email} vinculado a uid ${uid}`);
  }

  console.log("Migración finalizada.");
}

run();
