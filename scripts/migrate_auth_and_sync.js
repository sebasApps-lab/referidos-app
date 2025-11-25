import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false }
});

// Usuarios del seed
const USERS = [
  { localId: "USR_ADMIN", email: "admin@gmail.com", password: "admin", role: "admin" },
  { localId: "USR_NEG_1", email: "tienda@gmail.com", password: "tienda", role: "negocio" },
  { localId: "USR_CLI_1", email: "user@gmail.com", password: "user", role: "cliente" }
];

async function ensureUser(email, password, role) {
  const { data: list } = await supabase.auth.admin.listUsers();
  const existing = list.users.find(u => u.email === email);
  if (existing) return existing;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role }
  });

  if (error) throw error;
  return data.user ?? data;
}

async function run() {
  console.log("Sincronizando usuarios...");

  for (const u of USERS) {
    try {
      const authUser = await ensureUser(u.email, u.password, u.role);
      const uid = authUser.id;

      const { error } = await supabase
        .from("usuarios")
        .update({ id_auth: uid, emailConfirmado: true })
        .eq("id", u.localId);

      if (error) {
        console.error("Error actualizando", u.localId, error);
      } else {
        console.log("✓", u.email, "->", uid);
      }

    } catch (err) {
      console.error("Error con", u.email, err);
    }
  }

  console.log("Listo.");
}

run();
