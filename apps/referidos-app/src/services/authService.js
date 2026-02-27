// src/services/authService.js
import { supabase } from "../lib/supabaseClient";
import { logCatalogBreadcrumb } from "./loggingClient";
import { runtimeConfig } from "../config/runtimeConfig";

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
    redirectTo = runtimeConfig.authRedirectUrl || DEFAULT_REDIRECT,
    scopes,
    queryParams,
  } = opts;
  logCatalogBreadcrumb("auth.signin.start", {
    method: "oauth",
    provider: provider || "unknown",
  });

  const { data: res, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      scopes,
      queryParams,
      // Redirigimos manualmente para controlar el flujo en UI.
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    logCatalogBreadcrumb("auth.signin.error", {
      method: "oauth",
      provider: provider || "unknown",
      error: error.message || "oauth_failed",
    });
    throw error;
  }
  if (res?.url) {
    logCatalogBreadcrumb("auth.signin.ok", {
      method: "oauth",
      provider: provider || "unknown",
      redirected: true,
    });
    window.location.assign(res.url);
    return { ok: true, redirected: true };
  }
  logCatalogBreadcrumb("auth.signin.error", {
    method: "oauth",
    provider: provider || "unknown",
    error: "oauth_url_missing",
  });
  return { ok: false, error: "No se pudo iniciar el flujo OAuth" };
}

export async function signInWithGoogleIdToken({ token, nonce }) {
  logCatalogBreadcrumb("auth.signin.start", {
    method: "google_id_token",
    has_nonce: Boolean(nonce),
  });
  const payload = {
    provider: "google",
    token,
  };
  if (nonce) payload.nonce = nonce;
  const { data, error } = await supabase.auth.signInWithIdToken(payload);
  if (error) {
    logCatalogBreadcrumb("auth.signin.error", {
      method: "google_id_token",
      error: error.message || "id_token_failed",
    });
    throw error;
  }
  logCatalogBreadcrumb("auth.signin.ok", {
    method: "google_id_token",
  });
  return data;
}

export async function signInWithEmail(email, password) {
  logCatalogBreadcrumb("auth.signin.start", {
    method: "email_password",
  });
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
      logCatalogBreadcrumb("auth.signin.ok", {
        method: "email_password",
        pending_profile: true,
      });
      return {
        ok: true,
        user: {
          id_auth: authUserId,
          email: signInData.user.email,
          provider,
        },
        pendingProfile: true,
      };
    }
    const userWithProvider = { ...userData, provider };
    logCatalogBreadcrumb("auth.signin.ok", {
      method: "email_password",
      pending_profile: false,
    });
    return { ok: true, user: userWithProvider };
  } catch (error) {
    logCatalogBreadcrumb("auth.signin.error", {
      method: "email_password",
      error: error.message ?? String(error),
    });
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function signUpWithEmail({ email, password }) {
  logCatalogBreadcrumb("auth.signup.start", {
    method: "email_password",
  });
  try {
    const {
      data: signUpData,
      error: signUpError
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;
    logCatalogBreadcrumb("auth.signup.ok", {
      method: "email_password",
      has_session: Boolean(signUpData?.session),
      needs_email_confirm: Boolean(signUpData?.user && !signUpData?.session),
    });
    return { ok: true, data: signUpData };

  } catch (error) {
    logCatalogBreadcrumb("auth.signup.error", {
      method: "email_password",
      error: error.message ?? String(error),
    });
    return { ok: false, error: error.message ?? String(error) };
  }  
}

export async function signOut({ scope = "local" } = {}) {
  const normalizedScope = scope === "global" ? "global" : "local";
  logCatalogBreadcrumb("auth.signout.start", { scope: normalizedScope });
  const { error } = await supabase.auth.signOut({ scope: normalizedScope });
  if (error) {
    logCatalogBreadcrumb("auth.signout.error", {
      scope: normalizedScope,
      error: error.message || "signout_failed",
    });
    throw error;
  }
  logCatalogBreadcrumb("auth.signout.ok", { scope: normalizedScope });
}

export async function deleteUserAccount(id_auth) {
  logCatalogBreadcrumb("auth.account_delete.start", {
    has_user_id: Boolean(id_auth),
  });
  if (!id_auth) return { ok: false, error: "No se pudo identificar la cuenta" };

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      logCatalogBreadcrumb("auth.account_delete.error", {
        error: "missing_session_access_token",
      });
      return {
        ok: false,
        error: "Tu sesi\u00f3n expir\u00f3. Vuelve a iniciar sesi\u00f3n e intenta de nuevo.",
      };
    }

    const { data, error } = await supabase.functions.invoke("delete-account", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { userId: id_auth },
    });

    if (error) {
      //error de Edge invocada (network / non-2xx)
      logCatalogBreadcrumb("auth.account_delete.error", {
        error: error.message ?? String(error),
      });
      return { ok: false, error: error.message ?? String(error) };
    }

    //La función devuelve { ok: true } o { ok: false, message } (a veces con status)
    if (data?.ok === false) {
      const msg = (data?.message || "").toLowerCase();
      //Si la función dice que ya estaba eliminada, tratamos como éxito
      if (msg.includes("ya fue eliminada") || msg.includes("already") || msg.includes("not found")) {
        logCatalogBreadcrumb("auth.account_delete.ok", {
          already_deleted: true,
        });
        return { ok: true };
      }
      logCatalogBreadcrumb("auth.account_delete.error", {
        error: data?.message || "delete_account_failed",
      });
      return { ok: false, error: data?.message || "No se pudo eliminar la cuenta" };
    }

    logCatalogBreadcrumb("auth.account_delete.ok", {
      already_deleted: false,
    });
    return { ok: true };
  } catch (error) {
    logCatalogBreadcrumb("auth.account_delete.error", {
      error: error?.message ?? String(error),
    });
    return { ok: false, error: error?.message ?? String(error) };
  }
}

export async function updateUserProfile({ id_auth, ...payload }) {
  logCatalogBreadcrumb("auth.profile_update.start", {
    has_user_id: Boolean(id_auth),
    fields: Object.keys(payload || {}).slice(0, 20),
  });
  if (!id_auth) return { ok: false, error: "Falta id_auth para actualizar perfil" };
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update(payload)
      .eq("id_auth", id_auth)
      .select()
      .maybeSingle();

    if (error) throw error;
    logCatalogBreadcrumb("auth.profile_update.ok", {
      has_user: Boolean(data),
    });
    return { ok: true, user: data };
  } catch (error) {
    logCatalogBreadcrumb("auth.profile_update.error", {
      error: error.message ?? String(error),
    });
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
  } catch {
    return null;
  }
}
