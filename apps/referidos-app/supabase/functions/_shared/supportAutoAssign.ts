import { supabaseAdmin } from "./support.ts";

const ACTIVE_ASSIGNED_STATUSES = [
  "starting",
  "assigned",
  "in_progress",
  "waiting_user",
  "queued",
];
const PROCESSING_STATUSES = ["starting", "in_progress", "waiting_user"];

type SupportAutoAssignConfig = {
  require_jornada_authorization: boolean;
  auto_assign_enabled: boolean;
  max_assigned_tickets: number;
  max_processing_tickets: number;
  wait_user_to_personal_queue_minutes: number;
  personal_queue_release_minutes: number;
  personal_queue_release_overload_minutes: number;
  personal_queue_overload_threshold: number;
};

type AgentCandidate = {
  id: string;
  role: string;
  tenant_id: string | null;
  session_start_at: string | null;
  authorized_for_work: boolean;
  blocked: boolean;
  auto_assign_mode: "auto" | "manual";
  support_phone: string | null;
};

type AgentState = {
  assignedCount: number;
  processingCount: number;
};

type ThreadAssignmentSource =
  | "manual"
  | "new_auto"
  | "general_retake"
  | "irregular"
  | "system";

type CandidateThread = {
  id: string;
  public_id: string;
  status: string;
  personal_queue: boolean;
  assigned_agent_id: string | null;
  assigned_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  app_channel: string | null;
  assignment_source: ThreadAssignmentSource;
  retake_requested_at: string | null;
  tenant_id: string | null;
};

type AutoAssignSummary = {
  ok: boolean;
  reason: string;
  timed_out_to_personal: number;
  released_to_general: number;
  promoted_to_starting: number;
  auto_assigned_starting: number;
  auto_assigned_personal_queue: number;
};

function asIsoNow() {
  return new Date().toISOString();
}

function asNum(value: unknown, fallback: number, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(min, Math.min(max, Math.trunc(num)));
}

function asBoolean(value: unknown, fallback: boolean) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function normalizeAssignmentSource(value: unknown, fallback: ThreadAssignmentSource): ThreadAssignmentSource {
  const source = String(value || "").trim().toLowerCase();
  if (
    source === "manual" ||
    source === "new_auto" ||
    source === "general_retake" ||
    source === "irregular" ||
    source === "system"
  ) {
    return source;
  }
  return fallback;
}

function isProcessingStatus(status: unknown) {
  return PROCESSING_STATUSES.includes(String(status || "").trim().toLowerCase());
}

function toMs(value: string | null | undefined) {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function applyTenantFilter<T extends { eq: (column: string, value: string) => T }>(
  query: T,
  tenantId: string | null | undefined,
) {
  if (!tenantId) return query;
  return query.eq("tenant_id", tenantId);
}

async function insertThreadEvent({
  threadId,
  eventType,
  actorRole = "system",
  actorId = null,
  details = {},
}: {
  threadId: string;
  eventType: string;
  actorRole?: string | null;
  actorId?: string | null;
  details?: Record<string, unknown>;
}) {
  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: threadId,
    event_type: eventType,
    actor_role: actorRole,
    actor_id: actorId,
    details,
  });
}

export async function loadSupportAutoAssignConfig(): Promise<SupportAutoAssignConfig> {
  const defaults: SupportAutoAssignConfig = {
    require_jornada_authorization: true,
    auto_assign_enabled: true,
    max_assigned_tickets: 5,
    max_processing_tickets: 1,
    wait_user_to_personal_queue_minutes: 10,
    personal_queue_release_minutes: 5,
    personal_queue_release_overload_minutes: 1,
    personal_queue_overload_threshold: 5,
  };

  const { data } = await supabaseAdmin
    .from("support_runtime_flags")
    .select(
      [
        "require_jornada_authorization",
        "auto_assign_enabled",
        "max_assigned_tickets",
        "max_processing_tickets",
        "wait_user_to_personal_queue_minutes",
        "personal_queue_release_minutes",
        "personal_queue_release_overload_minutes",
        "personal_queue_overload_threshold",
      ].join(", "),
    )
    .eq("id", 1)
    .maybeSingle();

  if (!data) return defaults;
  return {
    require_jornada_authorization: asBoolean(
      data.require_jornada_authorization,
      defaults.require_jornada_authorization,
    ),
    auto_assign_enabled: asBoolean(data.auto_assign_enabled, defaults.auto_assign_enabled),
    max_assigned_tickets: asNum(data.max_assigned_tickets, defaults.max_assigned_tickets, 1, 50),
    max_processing_tickets: asNum(
      data.max_processing_tickets,
      defaults.max_processing_tickets,
      1,
      10,
    ),
    wait_user_to_personal_queue_minutes: asNum(
      data.wait_user_to_personal_queue_minutes,
      defaults.wait_user_to_personal_queue_minutes,
      1,
      1440,
    ),
    personal_queue_release_minutes: asNum(
      data.personal_queue_release_minutes,
      defaults.personal_queue_release_minutes,
      1,
      1440,
    ),
    personal_queue_release_overload_minutes: asNum(
      data.personal_queue_release_overload_minutes,
      defaults.personal_queue_release_overload_minutes,
      1,
      1440,
    ),
    personal_queue_overload_threshold: asNum(
      data.personal_queue_overload_threshold,
      defaults.personal_queue_overload_threshold,
      1,
      300,
    ),
  };
}

async function getEligibleAgents({
  tenantId,
  config,
}: {
  tenantId: string | null;
  config: SupportAutoAssignConfig;
}) {
  let sessionsQuery = supabaseAdmin
    .from("support_agent_sessions")
    .select("agent_id, start_at")
    .is("end_at", null);
  sessionsQuery = applyTenantFilter(sessionsQuery, tenantId);
  const { data: sessions } = await sessionsQuery;
  const agentIds = Array.from(new Set((sessions || []).map((session) => session.agent_id).filter(Boolean)));
  if (agentIds.length === 0) return [];

  let profilesQuery = supabaseAdmin
    .from("support_agent_profiles")
    .select("user_id, blocked, authorized_for_work, auto_assign_mode, support_phone")
    .in("user_id", agentIds);
  profilesQuery = applyTenantFilter(profilesQuery, tenantId);
  const { data: profiles } = await profilesQuery;

  let usersQuery = supabaseAdmin
    .from("usuarios")
    .select("id, role, tenant_id")
    .in("id", agentIds);
  usersQuery = applyTenantFilter(usersQuery, tenantId);
  const { data: users } = await usersQuery;

  const profileByAgent = new Map((profiles || []).map((profile) => [profile.user_id, profile]));
  const userByAgent = new Map((users || []).map((user) => [user.id, user]));
  const sessionByAgent = new Map((sessions || []).map((session) => [session.agent_id, session]));

  const candidates: AgentCandidate[] = [];
  for (const agentId of agentIds) {
    const profile = profileByAgent.get(agentId);
    const user = userByAgent.get(agentId);
    if (!profile || !user) continue;
    if (!["admin", "soporte"].includes(String(user.role || "").toLowerCase())) continue;
    if (profile.blocked) continue;
    if (config.require_jornada_authorization && !profile.authorized_for_work) continue;
    if (String(profile.auto_assign_mode || "auto").toLowerCase() !== "auto") continue;

    candidates.push({
      id: agentId,
      role: user.role,
      tenant_id: user.tenant_id || null,
      session_start_at: sessionByAgent.get(agentId)?.start_at || null,
      authorized_for_work: Boolean(profile.authorized_for_work),
      blocked: Boolean(profile.blocked),
      auto_assign_mode: "auto",
      support_phone: profile.support_phone || null,
    });
  }

  return candidates;
}

async function buildAgentState({
  tenantId,
  agentIds,
}: {
  tenantId: string | null;
  agentIds: string[];
}) {
  const state = new Map<string, AgentState>();
  agentIds.forEach((agentId) => {
    state.set(agentId, { assignedCount: 0, processingCount: 0 });
  });
  if (agentIds.length === 0) return state;

  let query = supabaseAdmin
    .from("support_threads")
    .select("assigned_agent_id, status, personal_queue")
    .in("assigned_agent_id", agentIds)
    .in("status", ACTIVE_ASSIGNED_STATUSES);
  query = applyTenantFilter(query, tenantId);
  const { data } = await query;

  (data || []).forEach((thread) => {
    const agentId = thread.assigned_agent_id;
    if (!agentId) return;
    const current = state.get(agentId);
    if (!current) return;
    if (thread.status === "queued" && thread.personal_queue !== true) return;
    current.assignedCount += 1;
    if (isProcessingStatus(thread.status)) {
      current.processingCount += 1;
    }
  });

  return state;
}

function pickBestAgent({
  agents,
  state,
  maxAssigned,
}: {
  agents: AgentCandidate[];
  state: Map<string, AgentState>;
  maxAssigned: number;
}) {
  const sorted = [...agents]
    .filter((agent) => {
      const slot = state.get(agent.id);
      return (slot?.assignedCount || 0) < maxAssigned;
    })
    .sort((a, b) => {
      const aState = state.get(a.id) || { assignedCount: 0, processingCount: 0 };
      const bState = state.get(b.id) || { assignedCount: 0, processingCount: 0 };
      if (aState.assignedCount !== bState.assignedCount) {
        return aState.assignedCount - bState.assignedCount;
      }
      if (aState.processingCount !== bState.processingCount) {
        return aState.processingCount - bState.processingCount;
      }
      return toMs(a.session_start_at) - toMs(b.session_start_at);
    });
  return sorted[0] || null;
}

async function getAssignmentDelaySeconds({
  appChannel,
  tenantId,
  cache,
}: {
  appChannel: string | null;
  tenantId: string | null;
  cache: Map<string, number>;
}) {
  const key = `${tenantId || "global"}:${String(appChannel || "referidos_app")}`;
  if (cache.has(key)) return cache.get(key) || 375;
  const { data } = await supabaseAdmin.rpc("support_assignment_delay_seconds", {
    p_app_channel: String(appChannel || "referidos_app"),
    p_tenant_id: tenantId,
  });
  const normalized = asNum(data, 375, 30, 86400);
  cache.set(key, normalized);
  return normalized;
}

async function applyTimeoutTransitions({
  tenantId,
  config,
}: {
  tenantId: string | null;
  config: SupportAutoAssignConfig;
}) {
  const nowIso = asIsoNow();
  const waitingCutoff = new Date(
    Date.now() - config.wait_user_to_personal_queue_minutes * 60 * 1000,
  ).toISOString();

  let waitingQuery = supabaseAdmin
    .from("support_threads")
    .select("id, public_id, assigned_agent_id, status")
    .eq("status", "waiting_user")
    .not("assigned_agent_id", "is", null)
    .lte("updated_at", waitingCutoff)
    .order("updated_at", { ascending: true })
    .limit(200);
  waitingQuery = applyTenantFilter(waitingQuery, tenantId);
  const { data: waitingRows } = await waitingQuery;

  let timedOutToPersonal = 0;
  for (const thread of waitingRows || []) {
    const { data: updated } = await supabaseAdmin
      .from("support_threads")
      .update({
        status: "queued",
        personal_queue: true,
        personal_queue_entered_at: nowIso,
        updated_at: nowIso,
      })
      .eq("id", thread.id)
      .eq("status", "waiting_user")
      .select("id")
      .maybeSingle();
    if (!updated?.id) continue;
    timedOutToPersonal += 1;
    await insertThreadEvent({
      threadId: thread.id,
      eventType: "queued",
      details: {
        from: "waiting_user",
        to: "queued",
        queue_kind: "personal",
        reason: "waiting_user_timeout",
        auto: true,
      },
    });
  }

  let backlogQuery = supabaseAdmin
    .from("support_threads")
    .select("id", { count: "exact", head: true })
    .or(
      "and(status.eq.new,assigned_agent_id.is.null),and(status.eq.queued,personal_queue.eq.false,assigned_agent_id.is.null)",
    );
  backlogQuery = applyTenantFilter(backlogQuery, tenantId);
  const { count: backlogCount } = await backlogQuery;
  const releaseMinutes =
    (backlogCount || 0) > config.personal_queue_overload_threshold
      ? config.personal_queue_release_overload_minutes
      : config.personal_queue_release_minutes;

  const queueCutoff = new Date(Date.now() - releaseMinutes * 60 * 1000).toISOString();
  let personalQueueQuery = supabaseAdmin
    .from("support_threads")
    .select("id, public_id, assigned_agent_id")
    .eq("status", "queued")
    .eq("personal_queue", true)
    .not("assigned_agent_id", "is", null)
    .lte("updated_at", queueCutoff)
    .order("updated_at", { ascending: true })
    .limit(200);
  personalQueueQuery = applyTenantFilter(personalQueueQuery, tenantId);
  const { data: personalQueuedRows } = await personalQueueQuery;

  let releasedToGeneral = 0;
  for (const thread of personalQueuedRows || []) {
    const { data: updated } = await supabaseAdmin
      .from("support_threads")
      .update({
        personal_queue: false,
        assigned_agent_id: null,
        released_to_general_at: nowIso,
        general_queue_entered_at: nowIso,
        updated_at: nowIso,
      })
      .eq("id", thread.id)
      .eq("status", "queued")
      .eq("personal_queue", true)
      .select("id")
      .maybeSingle();
    if (!updated?.id) continue;
    releasedToGeneral += 1;
    await insertThreadEvent({
      threadId: thread.id,
      eventType: "agent_timeout_release",
      details: {
        from: "queued",
        to: "queued",
        queue_kind: "general",
        reason: "personal_queue_timeout",
        auto: true,
      },
    });
  }

  return {
    timedOutToPersonal,
    releasedToGeneral,
  };
}

async function promotePersonalQueued({
  tenantId,
  agents,
  state,
  maxProcessing,
}: {
  tenantId: string | null;
  agents: AgentCandidate[];
  state: Map<string, AgentState>;
  maxProcessing: number;
}) {
  const nowIso = asIsoNow();
  let promoted = 0;

  for (const agent of agents) {
    const current = state.get(agent.id) || { assignedCount: 0, processingCount: 0 };
    if (current.processingCount >= maxProcessing) continue;

    let queueQuery = supabaseAdmin
      .from("support_threads")
      .select("id, assignment_source, created_at, retake_requested_at")
      .eq("status", "queued")
      .eq("personal_queue", true)
      .eq("assigned_agent_id", agent.id)
      .order("created_at", { ascending: true })
      .limit(100);
    queueQuery = applyTenantFilter(queueQuery, tenantId);
    const { data: queuedRows } = await queueQuery;
    if (!queuedRows || queuedRows.length === 0) continue;

    const ordered = [...queuedRows].sort((a, b) => {
      const aSource = normalizeAssignmentSource(a.assignment_source, "manual");
      const bSource = normalizeAssignmentSource(b.assignment_source, "manual");
      const aRank = aSource === "general_retake" ? 2 : 1;
      const bRank = bSource === "general_retake" ? 2 : 1;
      if (aRank !== bRank) return aRank - bRank;
      const aTs = toMs(aSource === "general_retake" ? a.retake_requested_at : a.created_at);
      const bTs = toMs(bSource === "general_retake" ? b.retake_requested_at : b.created_at);
      return aTs - bTs;
    });
    const nextThread = ordered[0];
    if (!nextThread) continue;

    const { data: updated } = await supabaseAdmin
      .from("support_threads")
      .update({
        status: "starting",
        personal_queue: false,
        starting_at: nowIso,
        updated_at: nowIso,
      })
      .eq("id", nextThread.id)
      .eq("status", "queued")
      .eq("personal_queue", true)
      .eq("assigned_agent_id", agent.id)
      .select("id")
      .maybeSingle();

    if (!updated?.id) continue;

    promoted += 1;
    current.processingCount += 1;
    state.set(agent.id, current);
    await insertThreadEvent({
      threadId: nextThread.id,
      eventType: "starting",
      details: {
        from: "queued",
        to: "starting",
        auto: true,
        reason: "promote_personal_queue",
      },
    });
  }

  return promoted;
}

async function listAssignableThreads({
  tenantId,
}: {
  tenantId: string | null;
}) {
  let newQuery = supabaseAdmin
    .from("support_threads")
    .select(
      "id, public_id, status, personal_queue, assigned_agent_id, assigned_at, created_at, updated_at, app_channel, assignment_source, retake_requested_at, tenant_id",
    )
    .eq("status", "new")
    .is("assigned_agent_id", null)
    .order("created_at", { ascending: true })
    .limit(200);
  newQuery = applyTenantFilter(newQuery, tenantId);

  let retakeQuery = supabaseAdmin
    .from("support_threads")
    .select(
      "id, public_id, status, personal_queue, assigned_agent_id, assigned_at, created_at, updated_at, app_channel, assignment_source, retake_requested_at, tenant_id",
    )
    .eq("status", "queued")
    .eq("personal_queue", false)
    .is("assigned_agent_id", null)
    .not("retake_requested_at", "is", null)
    .order("retake_requested_at", { ascending: true })
    .limit(200);
  retakeQuery = applyTenantFilter(retakeQuery, tenantId);

  const [{ data: newRows }, { data: retakeRows }] = await Promise.all([newQuery, retakeQuery]);
  return {
    newRows: (newRows || []) as CandidateThread[],
    retakeRows: (retakeRows || []) as CandidateThread[],
  };
}

async function assignThreadToAgent({
  thread,
  agent,
  mode,
  source,
  actorId = null,
  actorRole = "system",
}: {
  thread: CandidateThread;
  agent: AgentCandidate;
  mode: "starting" | "personal_queue";
  source: ThreadAssignmentSource;
  actorId?: string | null;
  actorRole?: string;
}) {
  const nowIso = asIsoNow();
  const payload: Record<string, unknown> = {
    assigned_agent_id: agent.id,
    assigned_agent_phone: agent.support_phone || null,
    assigned_at: thread.assigned_at || nowIso,
    assignment_source: source,
    updated_at: nowIso,
  };
  if (mode === "starting") {
    payload.status = "starting";
    payload.personal_queue = false;
    payload.starting_at = nowIso;
    payload.retake_requested_at = null;
  } else {
    payload.status = "queued";
    payload.personal_queue = true;
    payload.personal_queue_entered_at = nowIso;
    payload.retake_requested_at = null;
  }

  let update = supabaseAdmin
    .from("support_threads")
    .update(payload)
      .eq("id", thread.id)
      .is("assigned_agent_id", null);

  if (thread.status === "new") {
    update = update.eq("status", "new");
  } else {
    update = update.eq("status", "queued").eq("personal_queue", false);
  }

  const { data: updated } = await update.select("id").maybeSingle();
  if (!updated?.id) return false;

  await insertThreadEvent({
    threadId: thread.id,
    eventType: "assigned",
    actorRole,
    actorId,
    details: {
      agent_id: agent.id,
      assigned_agent_phone: agent.support_phone || null,
      auto: true,
      assign_mode: mode,
      from_status: thread.status,
      assignment_source: source,
    },
  });
  if (mode === "starting") {
    await insertThreadEvent({
      threadId: thread.id,
      eventType: "starting",
      actorRole,
      actorId,
      details: {
        from: thread.status,
        to: "starting",
        auto: true,
        assignment_source: source,
      },
    });
  } else {
    await insertThreadEvent({
      threadId: thread.id,
      eventType: "queued",
      actorRole,
      actorId,
      details: {
        from: thread.status,
        to: "queued",
        queue_kind: "personal",
        auto: true,
        assignment_source: source,
      },
    });
  }

  return true;
}

async function assignUnassignedThreads({
  tenantId,
  config,
  agents,
  state,
  actorId = null,
  actorRole = "system",
}: {
  tenantId: string | null;
  config: SupportAutoAssignConfig;
  agents: AgentCandidate[];
  state: Map<string, AgentState>;
  actorId?: string | null;
  actorRole?: string;
}) {
  const delayCache = new Map<string, number>();
  const { newRows, retakeRows } = await listAssignableThreads({ tenantId });
  const nowMs = Date.now();

  const eligibleRetakeRows: CandidateThread[] = [];
  for (const thread of retakeRows) {
    const delaySeconds = await getAssignmentDelaySeconds({
      appChannel: thread.app_channel,
      tenantId,
      cache: delayCache,
    });
    const retakeAtMs = toMs(thread.retake_requested_at);
    if (!retakeAtMs) continue;
    if (retakeAtMs + delaySeconds * 1000 <= nowMs) {
      eligibleRetakeRows.push(thread);
    }
  }

  const queue: CandidateThread[] = [...newRows, ...eligibleRetakeRows];
  let assignedStarting = 0;
  let assignedPersonalQueue = 0;

  for (const thread of queue) {
    const agent = pickBestAgent({
      agents,
      state,
      maxAssigned: config.max_assigned_tickets,
    });
    if (!agent) break;
    const agentState = state.get(agent.id) || { assignedCount: 0, processingCount: 0 };
    const mode =
      agentState.processingCount < config.max_processing_tickets
        ? "starting"
        : "personal_queue";
    const source: ThreadAssignmentSource =
      thread.status === "new" ? "new_auto" : "general_retake";

    const ok = await assignThreadToAgent({
      thread,
      agent,
      mode,
      source,
      actorId,
      actorRole,
    });
    if (!ok) continue;

    agentState.assignedCount += 1;
    if (mode === "starting") {
      agentState.processingCount += 1;
      assignedStarting += 1;
    } else {
      assignedPersonalQueue += 1;
    }
    state.set(agent.id, agentState);
  }

  return {
    assignedStarting,
    assignedPersonalQueue,
  };
}

export async function runSupportAutoAssignCycle({
  reason = "support_auto_cycle",
  tenantId = null,
  actorId = null,
  actorRole = "system",
}: {
  reason?: string;
  tenantId?: string | null;
  actorId?: string | null;
  actorRole?: string;
} = {}): Promise<AutoAssignSummary> {
  const config = await loadSupportAutoAssignConfig();
  if (!config.auto_assign_enabled) {
    return {
      ok: true,
      reason,
      timed_out_to_personal: 0,
      released_to_general: 0,
      promoted_to_starting: 0,
      auto_assigned_starting: 0,
      auto_assigned_personal_queue: 0,
    };
  }

  const timeoutResult = await applyTimeoutTransitions({
    tenantId,
    config,
  });
  const agents = await getEligibleAgents({ tenantId, config });
  const state = await buildAgentState({
    tenantId,
    agentIds: agents.map((agent) => agent.id),
  });

  const promoted = await promotePersonalQueued({
    tenantId,
    agents,
    state,
    maxProcessing: config.max_processing_tickets,
  });

  const assigned = await assignUnassignedThreads({
    tenantId,
    config,
    agents,
    state,
    actorId,
    actorRole,
  });

  return {
    ok: true,
    reason,
    timed_out_to_personal: timeoutResult.timedOutToPersonal,
    released_to_general: timeoutResult.releasedToGeneral,
    promoted_to_starting: promoted,
    auto_assigned_starting: assigned.assignedStarting,
    auto_assigned_personal_queue: assigned.assignedPersonalQueue,
  };
}

export async function manualAssignThread({
  threadId,
  agentId,
  tenantId = null,
  actorId = null,
  actorRole = "soporte",
}: {
  threadId: string;
  agentId: string;
  tenantId?: string | null;
  actorId?: string | null;
  actorRole?: string;
}) {
  const config = await loadSupportAutoAssignConfig();
  const agents = await getEligibleAgents({ tenantId, config });
  const targetAgent = agents.find((agent) => agent.id === agentId);
  if (!targetAgent) {
    return { ok: false, error: "agent_not_eligible" };
  }

  const state = await buildAgentState({
    tenantId,
    agentIds: [agentId],
  });
  const agentState = state.get(agentId) || { assignedCount: 0, processingCount: 0 };
  if (agentState.assignedCount >= config.max_assigned_tickets) {
    return { ok: false, error: "agent_capacity_full" };
  }

  let query = supabaseAdmin
    .from("support_threads")
    .select(
      "id, public_id, status, personal_queue, assigned_agent_id, assigned_at, created_at, updated_at, app_channel, assignment_source, retake_requested_at, tenant_id",
    )
    .eq("id", threadId)
    .maybeSingle();
  query = applyTenantFilter(query, tenantId);
  const { data: thread } = await query;
  if (!thread) {
    return { ok: false, error: "thread_not_found" };
  }
  if (thread.assigned_agent_id) {
    return { ok: false, error: "thread_already_assigned" };
  }
  if (!(thread.status === "new" || (thread.status === "queued" && thread.personal_queue === false))) {
    return { ok: false, error: "thread_not_assignable" };
  }

  const mode =
    agentState.processingCount < config.max_processing_tickets ? "starting" : "personal_queue";
  const ok = await assignThreadToAgent({
    thread: {
      ...thread,
      assignment_source: normalizeAssignmentSource(thread.assignment_source, "manual"),
    } as CandidateThread,
    agent: targetAgent,
    mode,
    source: "manual",
    actorId,
    actorRole,
  });

  if (!ok) {
    return { ok: false, error: "assign_conflict" };
  }

  const cycle = await runSupportAutoAssignCycle({
    reason: "manual_assign",
    tenantId,
    actorId,
    actorRole,
  });

  return {
    ok: true,
    mode,
    cycle,
  };
}

export async function markSupportRetakeRequested({
  threadId,
  tenantId = null,
  actorId = null,
  actorRole = "user",
}: {
  threadId: string;
  tenantId?: string | null;
  actorId?: string | null;
  actorRole?: string;
}) {
  const nowIso = asIsoNow();
  let query = supabaseAdmin
    .from("support_threads")
    .update({
      retake_requested_at: nowIso,
      updated_at: nowIso,
    })
    .eq("id", threadId)
    .eq("status", "queued")
    .eq("personal_queue", false)
    .is("assigned_agent_id", null)
    .select("id, app_channel, tenant_id")
    .maybeSingle();
  query = applyTenantFilter(query, tenantId);
  const { data: updated } = await query;
  if (!updated?.id) {
    return { ok: false, error: "thread_not_retakeable" };
  }

  await insertThreadEvent({
    threadId,
    eventType: "retake_requested",
    actorRole,
    actorId,
    details: {
      status: "queued",
      queue_kind: "general",
      retake_requested_at: nowIso,
    },
  });

  const { data: delaySecondsData } = await supabaseAdmin.rpc("support_assignment_delay_seconds", {
    p_app_channel: updated.app_channel || "referidos_app",
    p_tenant_id: updated.tenant_id || tenantId || null,
  });
  const estimatedDelaySeconds = asNum(delaySecondsData, 375, 30, 86400);

  const cycle = await runSupportAutoAssignCycle({
    reason: "retake_requested",
    tenantId: updated.tenant_id || tenantId || null,
    actorId,
    actorRole,
  });

  return {
    ok: true,
    retake_requested_at: nowIso,
    estimated_delay_seconds: estimatedDelaySeconds,
    cycle,
  };
}

export async function markSupportOpeningMessageSent({
  threadId,
  actorId,
}: {
  threadId: string;
  actorId: string;
}) {
  const nowIso = asIsoNow();
  const { data: updated } = await supabaseAdmin
    .from("support_threads")
    .update({
      opening_message_sent_at: nowIso,
      opening_message_actor_id: actorId,
      updated_at: nowIso,
    })
    .eq("id", threadId)
    .select("id")
    .maybeSingle();

  if (!updated?.id) {
    return { ok: false, error: "thread_not_found" };
  }

  await insertThreadEvent({
    threadId,
    eventType: "status_changed",
    actorRole: "soporte",
    actorId,
    details: {
      action: "opening_message_sent",
      opening_message_sent_at: nowIso,
    },
  });

  return { ok: true, opening_message_sent_at: nowIso };
}
