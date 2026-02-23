import { supabase } from "../lib/supabaseClient";

export async function createSupportThread(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-create-thread",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function createAnonymousSupportThread(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-create-anon-thread",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function getAnonymousSupportThreadStatus(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-anon-thread-status",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function assignSupportThread(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-assign-thread",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function updateSupportStatus(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-update-status",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function addSupportNote(payload) {
  const { data, error } = await supabase.functions.invoke("support-add-note", {
    body: payload,
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function closeSupportThread(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-close-thread",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function createIrregularThread(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-create-irregular-thread",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function startSupportSession() {
  const { data, error } = await supabase.functions.invoke(
    "support-start-session",
    { body: {} }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function endSupportSession(payload = {}) {
  const { data, error } = await supabase.functions.invoke(
    "support-end-session",
    {
      body: payload,
    }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function pingSupportSession() {
  const { data, error } = await supabase.functions.invoke(
    "support-agent-ping",
    { body: {} }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function startAdminSupportSession(payload = {}) {
  const { data, error } = await supabase.functions.invoke(
    "support-admin-start-session",
    { body: payload }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function endAdminSupportSession(payload = {}) {
  const { data, error } = await supabase.functions.invoke(
    "support-admin-end-session",
    { body: payload }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function pingAdminSupportSession() {
  const { data, error } = await supabase.functions.invoke(
    "support-admin-ping",
    { body: {} }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function denyAdminSupportSession(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-admin-deny-session",
    { body: payload }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function createSupportAdminUser(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-admin-create-user",
    { body: payload }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function cancelSupportThread(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-cancel-thread",
    { body: payload }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function linkAnonymousThreadToUser(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-link-anon-to-user",
    { body: payload }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function trackSupportMacroEvents({ events = [] } = {}) {
  if (!Array.isArray(events) || events.length === 0) {
    return { ok: true, data: { inserted: 0 } };
  }

  const payload = events
    .filter((event) => event && typeof event === "object")
    .map((event) => ({
      macro_id: event.macro_id,
      macro_code: event.macro_code,
      category_code: event.category_code || null,
      thread_public_id: event.thread_public_id || null,
      event_type: event.event_type,
      app_key: event.app_key,
      env_key: event.env_key,
      metadata: event.metadata || {},
    }))
    .filter(
      (event) =>
        typeof event.macro_id === "string" &&
        typeof event.macro_code === "string" &&
        typeof event.event_type === "string" &&
        typeof event.app_key === "string" &&
        typeof event.env_key === "string"
    );

  if (!payload.length) {
    return { ok: true, data: { inserted: 0 } };
  }

  const { error } = await supabase.from("support_macro_usage_events").insert(payload);
  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: { inserted: payload.length } };
}
