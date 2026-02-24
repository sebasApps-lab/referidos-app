import { supabase } from "../../lib/supabaseClient";

const CHANGE_EVENT = "referidos:support-runtime-flags:changed";

export const DEFAULT_SUPPORT_RUNTIME_FLAGS = Object.freeze({
  require_session_authorization: false,
  require_jornada_authorization: true,
});

let cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };

function hasWindow() {
  return typeof window !== "undefined";
}

function normalizeSupportRuntimeFlags(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
  }
  return {
    require_session_authorization: Boolean(raw.require_session_authorization),
    require_jornada_authorization: Boolean(raw.require_jornada_authorization),
  };
}

function emitFlagsChange(nextFlags) {
  if (!hasWindow()) return;
  try {
    window.dispatchEvent(
      new CustomEvent(CHANGE_EVENT, {
        detail: nextFlags,
      })
    );
  } catch {
    // no-op
  }
}

export function getCachedSupportRuntimeFlags() {
  return { ...cachedFlags };
}

export async function fetchSupportRuntimeFlags({ force = false } = {}) {
  if (!force && cachedFlags) {
    return { ...cachedFlags };
  }

  try {
    const { data, error } = await supabase
      .from("support_runtime_flags")
      .select("require_session_authorization, require_jornada_authorization")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
      return { ...cachedFlags };
    }

    cachedFlags = normalizeSupportRuntimeFlags(data);
    return { ...cachedFlags };
  } catch {
    cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
    return { ...cachedFlags };
  }
}

export async function updateSupportRuntimeFlags(
  patch = {},
  { updatedBy = null } = {}
) {
  const current = await fetchSupportRuntimeFlags();
  const nextPayload = normalizeSupportRuntimeFlags({
    ...current,
    ...patch,
  });

  const upsertPayload = {
    id: 1,
    ...nextPayload,
  };
  if (updatedBy) upsertPayload.updated_by = updatedBy;

  const { data, error } = await supabase
    .from("support_runtime_flags")
    .upsert(upsertPayload, { onConflict: "id" })
    .select("require_session_authorization, require_jornada_authorization")
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      error: error.message || "No se pudo actualizar support_runtime_flags",
      flags: { ...current },
    };
  }

  cachedFlags = normalizeSupportRuntimeFlags(data || nextPayload);
  emitFlagsChange(cachedFlags);
  return { ok: true, flags: { ...cachedFlags } };
}

export async function setSupportRuntimeFlag(
  flagKey,
  enabled,
  { updatedBy = null } = {}
) {
  return updateSupportRuntimeFlags(
    {
      [flagKey]: Boolean(enabled),
    },
    { updatedBy }
  );
}

export function subscribeSupportRuntimeFlags(onChange) {
  if (!hasWindow() || typeof onChange !== "function") {
    return () => {};
  }

  const onCustomChange = (event) => {
    const nextFlags = normalizeSupportRuntimeFlags(event?.detail);
    onChange(nextFlags);
  };

  window.addEventListener(CHANGE_EVENT, onCustomChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustomChange);
  };
}
