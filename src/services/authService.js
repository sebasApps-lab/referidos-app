// src/services/authService.js
import { supabase } from "../lib/supabaseClient";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForUser(id_auth, attempts = 12, delay = 500) {
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

export async function signInWithGoogleIdToken({ token }) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token,
  });
  if (error) throw error;
  return data;
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

    const provider = signInData.user.app_metadata?.provider ?? null;

    if (!userData) {
      return {
        ok: true,
        user: {
          id_auth: authUserId,
          email: signInData.user.email,
          role: signInData.user.user_metadata?.role ?? null,
          provider: signInData.user.app_metadata?.provider ?? null
        },
        pendingProfile: true,
      };
    }
    const userWithProvider = { ...userData, provider };
    return { ok: true, user: userWithProvider };
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

    const warning = signUpError ? signUpError.message ?? String(signUpError) : null;

    const sessionAfterSignUp =
      signUpData?.session ??
      (await supabase.auth.getSession()).data.session;

    const authUserId = signUpData?.user?.id ?? sessionAfterSignUp?.user?.id;
    if (!authUserId) {
      // Si ya existe la cuenta, muestra error y redirecciona (logica en AuthHub)
      if (signUpError?.message?.toLowerCase?.().includes("already registered")) {
        return { ok: false, error: "Esta cuenta ya existe. Inicia Sesión con tu correo y contraseña."}
      }
      if (signUpError) throw signUpError;
      return { ok: false, error: "No se pudo identificar la cuenta creada" };
    }
    const userData = await waitForUser(authUserId);
    const provider = signUpData?.user?.app_metadata?.provider ?? null;

    if (!userData) {
      if (signUpError?.message?.toLowerCase?.().includes("already registered")) {
        return { ok: false, error: "Esta cuenta ya existe. Inicia sesión con tu correo y contraseña."}
      }
      if (signUpError) throw signUpError;

      const pendingUser = {
        id_auth: authUserId,
        email: signUpData?.user?.email ?? email,
        role: role ?? signUpData?.user?.user_metadata?.role ?? null,
        nombre: signUpData?.user?.user_metadata?.nombre ?? nombre ?? null,
        telefono: signUpData?.user?.user_metadata?.telefono ?? telefono ?? null,
        registro_estado: "pendiente",
        provider,
      };
      return {
        ok: true,
        user: pendingUser,
        pendingProfile: true,
        warning: "Perfil aun en proceso de creacion. Continua con el onboarding.",
      };
    }
    
    const userWithProvider = { ...userData, provider };
    return { ok: true, user: userWithProvider, warning };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function deleteUserAccount(id_auth) {
  if (!id_auth) return { ok: false, error: "No se pudo identificar la cuenta" };

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      return { ok: false, error: "Tu sesi\u00f3n expir\u00f3. Vuelve a iniciar sesi\u00f3n e intenta de nuevo." };
    }

    const { error } = await supabase.functions.invoke("delete-account", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { userId: id_auth },
    });

    if (error) throw error;

    await supabase.auth.signOut();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function updateUserProfile({ id_auth, ...payload }) {
  if (!id_auth) return { ok: false, error: "Falta id_auth para actualizar perfil" };
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update(payload)
      .eq("id_auth", id_auth)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { ok: true, user: data };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
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
