import { supabase } from "@shared/services/mobileApi";

function getErrorMessage(error: any) {
  return String(error?.message || error || "unknown_error");
}

export async function deleteCurrentUserAccount(userAuthId: string) {
  const safeUserAuthId = String(userAuthId || "").trim();
  if (!safeUserAuthId) {
    return { ok: false, error: "No se pudo identificar la cuenta." };
  }

  const {
    data: { session } = {},
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    return {
      ok: false,
      error: "Tu sesion expiro. Vuelve a iniciar sesion e intenta de nuevo.",
    };
  }

  const { data, error } = await supabase.functions.invoke("delete-account", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    body: {
      userId: safeUserAuthId,
    },
  });

  if (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
  if (data?.ok === false) {
    return { ok: false, error: data?.message || data?.error || "No se pudo eliminar la cuenta." };
  }
  return { ok: true };
}
