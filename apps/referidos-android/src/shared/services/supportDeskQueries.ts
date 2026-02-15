import { formatDateTime } from "./entityQueries";

type Result<T> = {
  ok: boolean;
  data: T;
  error?: string;
};

function getErrorMessage(error: any) {
  return String(error?.message || error || "unknown_error");
}

function isMissingColumnError(error: any) {
  const text = getErrorMessage(error).toLowerCase();
  return (
    text.includes("column") &&
    (text.includes("does not exist") ||
      text.includes("schema cache") ||
      text.includes("could not find"))
  );
}

function normalizeInboxRow(row: any) {
  return {
    ...row,
    request_origin: row?.request_origin || "registered",
    origin_source: row?.origin_source || "app",
    contact_display: row?.contact_display || null,
    anon_public_id: row?.anon_public_id || null,
  };
}

function mergeById(list: any[]) {
  return Array.from(
    new Map((list || []).map((item) => [String(item?.id || item?.public_id || Math.random()), item]))
      .values(),
  );
}

export async function fetchSupportInboxRows(
  supabase: any,
  options: {
    isAdmin: boolean;
    usuarioId: string;
    limit?: number;
  },
): Promise<Result<any[]>> {
  const safeLimit = Math.max(10, Math.min(Number(options.limit || 120), 300));
  const safeUserId = String(options.usuarioId || "").trim();
  if (!safeUserId) {
    return { ok: false, data: [], error: "missing_usuario_id" };
  }

  let inboxQuery = supabase
    .from("support_threads_inbox")
    .select(
      "public_id, category, severity, status, summary, created_at, updated_at, assigned_agent_id, created_by_agent_id, user_public_id, request_origin, origin_source, contact_display, anon_public_id",
    )
    .order("created_at", { ascending: false })
    .limit(safeLimit);

  if (!options.isAdmin) {
    inboxQuery = inboxQuery.or(
      `assigned_agent_id.eq.${safeUserId},and(status.eq.new,assigned_agent_id.is.null),created_by_agent_id.eq.${safeUserId}`,
    );
  }

  const inboxResult = await inboxQuery;
  if (!inboxResult.error) {
    return { ok: true, data: (inboxResult.data || []).map(normalizeInboxRow) };
  }

  let legacyQuery = supabase
    .from("support_threads")
    .select(
      "public_id, category, severity, status, summary, created_at, updated_at, assigned_agent_id, created_by_agent_id, user_public_id",
    )
    .order("created_at", { ascending: false })
    .limit(safeLimit);

  if (!options.isAdmin) {
    legacyQuery = legacyQuery.or(
      `assigned_agent_id.eq.${safeUserId},and(status.eq.new,assigned_agent_id.is.null),created_by_agent_id.eq.${safeUserId}`,
    );
  }

  const legacyResult = await legacyQuery;
  if (legacyResult.error) {
    return { ok: false, data: [], error: getErrorMessage(legacyResult.error) };
  }
  return {
    ok: true,
    data: (legacyResult.data || []).map(normalizeInboxRow),
  };
}

export async function fetchSupportThreadDetail(
  supabase: any,
  threadPublicId: string,
): Promise<Result<any | null>> {
  const safeThreadPublicId = String(threadPublicId || "").trim();
  if (!safeThreadPublicId) {
    return { ok: false, data: null, error: "missing_thread_public_id" };
  }

  const enriched = await supabase
    .from("support_threads")
    .select(
      "*, anon_profile:anon_support_profiles(id, public_id, display_name, contact_channel, contact_value)",
    )
    .eq("public_id", safeThreadPublicId)
    .maybeSingle();

  if (!enriched.error) {
    return { ok: true, data: normalizeInboxRow(enriched.data || null) };
  }

  const fallback = await supabase
    .from("support_threads")
    .select("*")
    .eq("public_id", safeThreadPublicId)
    .maybeSingle();

  if (fallback.error) {
    return { ok: false, data: null, error: getErrorMessage(fallback.error) };
  }
  return { ok: true, data: normalizeInboxRow(fallback.data || null) };
}

export async function fetchSupportThreadEvents(
  supabase: any,
  threadId: string,
): Promise<Result<any[]>> {
  const safeThreadId = String(threadId || "").trim();
  if (!safeThreadId) return { ok: false, data: [], error: "missing_thread_id" };
  const { data, error } = await supabase
    .from("support_thread_events")
    .select("id, event_type, actor_role, actor_id, details, created_at")
    .eq("thread_id", safeThreadId)
    .order("created_at", { ascending: false })
    .limit(120);
  if (error) return { ok: false, data: [], error: getErrorMessage(error) };
  return { ok: true, data: data || [] };
}

export async function fetchSupportThreadNotes(
  supabase: any,
  threadId: string,
): Promise<Result<any[]>> {
  const safeThreadId = String(threadId || "").trim();
  if (!safeThreadId) return { ok: false, data: [], error: "missing_thread_id" };
  const { data, error } = await supabase
    .from("support_thread_notes")
    .select("id, body, created_at, author_id")
    .eq("thread_id", safeThreadId)
    .order("created_at", { ascending: false })
    .limit(120);
  if (error) return { ok: false, data: [], error: getErrorMessage(error) };
  return { ok: true, data: data || [] };
}

export async function fetchSupportLogEvents(
  supabase: any,
  options: {
    threadId?: string | null;
    userId?: string | null;
    limit?: number;
  } = {},
): Promise<Result<any[]>> {
  const safeLimit = Math.max(10, Math.min(Number(options.limit || 60), 160));
  const threadId = String(options.threadId || "").trim();
  const userId = String(options.userId || "").trim();

  const supportLogQueries: Promise<any>[] = [];
  if (threadId) {
    supportLogQueries.push(
      supabase
        .from("support_log_events")
        .select("id, level, category, message, occurred_at, created_at, route, screen, thread_id, user_id")
        .eq("thread_id", threadId)
        .order("occurred_at", { ascending: false })
        .limit(safeLimit),
    );
  }
  if (userId) {
    supportLogQueries.push(
      supabase
        .from("support_log_events")
        .select("id, level, category, message, occurred_at, created_at, route, screen, thread_id, user_id")
        .eq("user_id", userId)
        .order("occurred_at", { ascending: false })
        .limit(safeLimit),
    );
  }

  if (supportLogQueries.length > 0) {
    const entries = await Promise.all(supportLogQueries);
    const anyError = entries.find((item) => item.error);
    if (!anyError) {
      const merged = mergeById(entries.flatMap((item) => item.data || []))
        .sort((a, b) => {
          const aTs = new Date(a.occurred_at || a.created_at || 0).getTime();
          const bTs = new Date(b.occurred_at || b.created_at || 0).getTime();
          return bTs - aTs;
        })
        .slice(0, safeLimit);
      return { ok: true, data: merged };
    }
    if (!isMissingColumnError(anyError.error)) {
      return { ok: false, data: [], error: getErrorMessage(anyError.error) };
    }
  }

  let obsQuery = supabase
    .from("obs_events")
    .select(
      "id, level, event_type, message, occurred_at, created_at, support_route, support_screen, support_thread_id, user_id, context",
    )
    .eq("event_domain", "support")
    .order("occurred_at", { ascending: false })
    .limit(safeLimit);

  if (threadId) obsQuery = obsQuery.eq("support_thread_id", threadId);
  if (userId) obsQuery = obsQuery.eq("user_id", userId);

  const { data, error } = await obsQuery;
  if (error) return { ok: false, data: [], error: getErrorMessage(error) };
  return {
    ok: true,
    data: (data || []).map((item: any) => ({
      ...item,
      category: item.event_type || "log",
      route: item.support_route || item.context?.route || null,
      screen: item.support_screen || item.context?.screen || null,
      thread_id: item.support_thread_id || null,
    })),
  };
}

export async function fetchSupportAgentProfile(
  supabase: any,
  agentId: string,
): Promise<Result<any | null>> {
  const safeAgentId = String(agentId || "").trim();
  if (!safeAgentId) return { ok: false, data: null, error: "missing_agent_id" };
  const { data, error } = await supabase
    .from("support_agent_profiles")
    .select(
      "user_id, support_phone, authorized_for_work, authorized_until, authorized_from, blocked, blocked_reason, session_request_status, session_request_at, max_active_tickets",
    )
    .eq("user_id", safeAgentId)
    .maybeSingle();
  if (error) return { ok: false, data: null, error: getErrorMessage(error) };
  return { ok: true, data: data || null };
}

export async function fetchActiveAgentSession(
  supabase: any,
  agentId: string,
): Promise<Result<any | null>> {
  const safeAgentId = String(agentId || "").trim();
  if (!safeAgentId) return { ok: false, data: null, error: "missing_agent_id" };
  const { data, error } = await supabase
    .from("support_agent_sessions")
    .select("id, agent_id, start_at, end_at, end_reason, authorized_by, last_seen_at")
    .eq("agent_id", safeAgentId)
    .is("end_at", null)
    .order("start_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) return { ok: false, data: null, error: getErrorMessage(error) };
  return { ok: true, data: data || null };
}

export async function fetchSupportAgentsDashboard(
  supabase: any,
  limit = 120,
): Promise<Result<any[]>> {
  const safeLimit = Math.max(10, Math.min(Number(limit || 120), 240));
  const profileResult = await supabase
    .from("support_agent_profiles")
    .select(
      "user_id, support_phone, authorized_for_work, authorized_until, authorized_from, blocked, blocked_reason, session_request_status, session_request_at, max_active_tickets",
    )
    .order("authorized_for_work", { ascending: false })
    .limit(safeLimit);

  if (profileResult.error) {
    return { ok: false, data: [], error: getErrorMessage(profileResult.error) };
  }

  const profiles = profileResult.data || [];
  const agentIds = profiles.map((item: any) => item.user_id).filter(Boolean);
  if (!agentIds.length) return { ok: true, data: [] };

  const [usersResult, sessionsResult, ticketsResult] = await Promise.all([
    supabase
      .from("usuarios")
      .select("id, public_id, nombre, apellido, email, role")
      .in("id", agentIds),
    supabase
      .from("support_agent_sessions")
      .select("id, agent_id, start_at, end_at, last_seen_at")
      .in("agent_id", agentIds)
      .is("end_at", null),
    supabase
      .from("support_threads")
      .select("id, public_id, assigned_agent_id, status, summary, category, created_at")
      .in("assigned_agent_id", agentIds)
      .in("status", ["assigned", "in_progress", "waiting_user"]),
  ]);

  if (usersResult.error && !isMissingColumnError(usersResult.error)) {
    return { ok: false, data: [], error: getErrorMessage(usersResult.error) };
  }
  if (sessionsResult.error && !isMissingColumnError(sessionsResult.error)) {
    return { ok: false, data: [], error: getErrorMessage(sessionsResult.error) };
  }
  if (ticketsResult.error && !isMissingColumnError(ticketsResult.error)) {
    return { ok: false, data: [], error: getErrorMessage(ticketsResult.error) };
  }

  const usersById = Object.fromEntries((usersResult.data || []).map((user: any) => [user.id, user]));
  const sessionsByAgent = Object.fromEntries(
    (sessionsResult.data || []).map((session: any) => [session.agent_id, session]),
  );
  const activeTicketByAgent = Object.fromEntries(
    (ticketsResult.data || []).map((thread: any) => [thread.assigned_agent_id, thread]),
  );

  return {
    ok: true,
    data: profiles.map((profile: any) => ({
      ...profile,
      user: usersById[profile.user_id] || null,
      open_session: sessionsByAgent[profile.user_id] || null,
      active_ticket: activeTicketByAgent[profile.user_id] || null,
    })),
  };
}

export async function fetchSupportStatusSummary(
  supabase: any,
): Promise<Result<{
  total: number;
  byStatus: Record<string, number>;
  byOrigin: Record<string, number>;
  bySeverity: Record<string, number>;
}>> {
  const result = await fetchSupportInboxRows(supabase, {
    isAdmin: true,
    usuarioId: "__admin_scope__",
    limit: 300,
  });
  if (!result.ok) {
    return {
      ok: false,
      data: { total: 0, byStatus: {}, byOrigin: {}, bySeverity: {} },
      error: result.error,
    };
  }

  const byStatus: Record<string, number> = {};
  const byOrigin: Record<string, number> = {};
  const bySeverity: Record<string, number> = {};
  for (const row of result.data) {
    const status = String(row?.status || "unknown");
    const origin = String(row?.request_origin || "registered");
    const severity = String(row?.severity || "s2");
    byStatus[status] = (byStatus[status] || 0) + 1;
    byOrigin[origin] = (byOrigin[origin] || 0) + 1;
    bySeverity[severity] = (bySeverity[severity] || 0) + 1;
  }
  return {
    ok: true,
    data: {
      total: result.data.length,
      byStatus,
      byOrigin,
      bySeverity,
    },
  };
}

export function toSupportThreadSubtitle(thread: any) {
  const created = formatDateTime(thread?.created_at || null);
  const actor = thread?.request_origin === "anonymous"
    ? thread?.anon_public_id || thread?.user_public_id || "anon"
    : thread?.user_public_id || "usuario";
  return `${actor} | ${created}`;
}
