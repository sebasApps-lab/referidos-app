// src/services/authService.js

import { supabase } from "../lib/supabaseClient";
import { useAppStore } from "../store/appStore";

/*
   Servicio de login y registro.

   Ahora usa datos falsos (mock) para que funcione sin backend.
   Cuando quieras activar supabase, solo desbloquea las líneas comentadas.
*/

export async function login(email, password) {
  const setUsuario = useAppStore.getState().setUsuario;

  // ================================
  // FUTURO: login real con Supabase
  // const { data, error } = await supabase.auth.signInWithPassword({
  //   email,
  //   password,
  // });
  // if (error) return { ok: false, error: error.message };
  // =================================

  // Login FAKE para ALPHA
  const fakeDB = JSON.parse(localStorage.getItem("referidos_demo_v0"));

  const usuario =
    fakeDB?.usuarios?.find((u) => u.email === email && u.password === password) ||
    fakeDB?.negocios?.find((n) => n.email === email && n.password === password) ||
    fakeDB?.admins?.find((a) => a.email === email && a.password === password);

  if (!usuario) {
    return { ok: false, error: "Credenciales incorrectas" };
  }

  setUsuario(usuario);

  return { ok: true, usuario };
}

export async function registerUsuario(datos) {
  const setUsuario = useAppStore.getState().setUsuario;

  // FUTURO SUPABASE:
  // const { data, error } = await supabase.auth.signUp({
  //   email: datos.email,
  //   password: datos.password,
  // });

  const nuevoUsuario = {
    ...datos,
    id: crypto.randomUUID(),
  };

  // Guardar fakeDB mientras no hay backend real
  const db = JSON.parse(localStorage.getItem("referidos_demo_v0")) || {
    usuarios: [],
    negocios: [],
    admins: [],
  };

  if (datos.role === "negocio") db.negocios.push(nuevoUsuario);
  else db.usuarios.push(nuevoUsuario);

  localStorage.setItem("referidos_demo_v0", JSON.stringify(db));

  setUsuario(nuevoUsuario);

  return { ok: true, usuario: nuevoUsuario };
}
