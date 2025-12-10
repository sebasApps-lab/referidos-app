// src/services/authService.js
import { supabase } from "../lib/supabaseClient";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForUser(id_auth, attempts = 8, delay = 400) {
  for (let i = 0; i < attempts; i++) {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", id_auth)
      .maybeSingle();
    if (error) break;
    if (data) return data;
    await wait(delay);
  }
  return null;
}

const DEFAULT_REDIRECT =
  typeof window !== "undefined" ? window.location.origin : undefined;

export async function signInWithOAuth(provider, opts = {}) {
  const {
    redirectTo = import.meta.env.VITE_AUTH_REDIRECT_URL ?? DEFAULT_REDIRECT,
    scopes,
    queryParams,
    data,
  } = opts;

  const { data: res, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      scopes,
      queryParams,
      data,
      // Redirigimos manualmente para controlar el flujo en UI.
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;
  if (res?.url) {
    window.location.assign(res.url);
    return { ok: true, redirected: true };
  }
  return { ok: false, error: "No se pudo iniciar el flujo OAuth" };
}

export async function signInWithEmail(email, password) {
  try {
    const {
      data: signInData,
      error: signInError
    } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) throw signInError;
    if (!signInData?.user) throw new Error("No se pudo iniciar sesión");

    const authUserId = signInData.user.id;
    const userData = await waitForUser(authUserId);

    if (!userData) return { ok: false, error: "No se encontró el perfil de usuario" };
    return { ok: true, user: userData };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function signUpWithEmail({ email, password, telefono, nombre, role = "cliente" }) {
  try {
    const {
      data: signUpData,
      error: signUpError
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, nombre, telefono },
      },
    });

    if (signUpError) throw signUpError;
    if (!signUpData?.user) throw new Error("No se pudo crear la cuenta");

    const sessionAfterSignUp =
      signUpData.session ??
      (await supabase.auth.getSession()).data.session;

    if (!sessionAfterSignUp) {
      return { ok: false, error: "Cuenta creada. Confirma tu email para continuar." };
    }

    const authUserId = sessionAfterSignUp.user.id;
    const userData = await waitForUser(authUserId);

    if (!userData) return { ok: false, error: "No se creó el perfil del usuario" };
    return { ok: true, user: userData };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSessionUserProfile() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return null;

    const { data: userData } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", session.user.id)
      .maybeSingle();

    return userData || null;
  } catch (error) {
    return null;
  }
}
