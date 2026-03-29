function isTableMissing(error) {
  const message = String(error?.message || "").toLowerCase();
  return message.includes("app_notifications") && message.includes("does not exist");
}

export async function fetchAppNotifications({
  supabase,
  limit = 30,
  unreadOnly = false,
  scope = null,
} = {}) {
  if (!supabase) return { ok: false, error: "missing_supabase_client", data: [] };

  let query = supabase
    .from("app_notifications")
    .select(
      "id, role_target, recipient_user_id, scope, event_type, title, body, payload, is_read, read_at, created_at, expires_at"
    )
    .order("created_at", { ascending: false })
    .limit(Math.max(1, Math.min(Number(limit) || 30, 200)));

  if (unreadOnly) query = query.eq("is_read", false);
  if (scope) query = query.eq("scope", String(scope));

  const { data, error } = await query;
  if (error) {
    if (isTableMissing(error)) {
      return { ok: true, data: [] };
    }
    return { ok: false, error: error.message || "fetch_notifications_failed", data: [] };
  }

  return { ok: true, data: data || [] };
}

export async function markAppNotificationsRead({
  supabase,
  ids = [],
} = {}) {
  if (!supabase) return { ok: false, error: "missing_supabase_client", updated: 0 };
  const normalizedIds = (ids || []).filter(Boolean);
  if (normalizedIds.length === 0) return { ok: true, updated: 0 };

  const { data, error } = await supabase.rpc("notifications_mark_read", {
    p_ids: normalizedIds,
  });
  if (error) {
    if (isTableMissing(error)) {
      return { ok: true, updated: 0 };
    }
    return { ok: false, error: error.message || "mark_notifications_read_failed", updated: 0 };
  }
  return { ok: true, updated: Number(data) || 0 };
}

export async function markAllAppNotificationsRead({
  supabase,
  scope = null,
} = {}) {
  if (!supabase) return { ok: false, error: "missing_supabase_client", updated: 0 };
  const payload = scope ? { p_scope: String(scope) } : {};
  const { data, error } = await supabase.rpc("notifications_mark_all_read", payload);
  if (error) {
    if (isTableMissing(error)) {
      return { ok: true, updated: 0 };
    }
    return { ok: false, error: error.message || "mark_all_notifications_read_failed", updated: 0 };
  }
  return { ok: true, updated: Number(data) || 0 };
}
