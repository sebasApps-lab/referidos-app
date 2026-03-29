import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import SupportGate from "./SupportGate";
import SupportDevDebugBanner from "./SupportDevDebugBanner";
import {
  assignSupportThread,
  pingAdminSupportSession,
  pingSupportSession,
  setSupportAutoAssignMode,
  startAdminSupportSession,
} from "../supportClient";
import { isSupportLiveUpdatesEnabled } from "../runtime/systemFeatureFlags";

const INBOX_GROUPS = [
  { id: "available", label: "Disponibles" },
  { id: "assigned", label: "Asignados" },
  { id: "resolved", label: "Resueltos" },
];

function normalizeThreadRow(thread) {
  return {
    ...thread,
    request_origin: thread?.request_origin || "registered",
    origin_source: thread?.origin_source || "user",
    app_channel: thread?.app_channel || "undetermined",
    contact_display: thread?.contact_display || null,
    anon_public_id: thread?.anon_public_id || null,
    personal_queue: Boolean(thread?.personal_queue),
    assigned_at: thread?.assigned_at || null,
    released_to_general_at: thread?.released_to_general_at || null,
    retake_requested_at: thread?.retake_requested_at || null,
    handoff_required: Boolean(thread?.handoff_required),
    handoff_reason: thread?.handoff_reason || null,
    handoff_at: thread?.handoff_at || null,
    handoff_message_confirmed_at: thread?.handoff_message_confirmed_at || null,
    updated_at: thread?.updated_at || null,
  };
}

function computeTicketTimer(thread, nowMs) {
  const createdAtMs = Date.parse(thread?.created_at || "");
  if (!Number.isFinite(createdAtMs)) {
    return { expired: false, paused: false, progress: 0, color: "#16A34A" };
  }
  const elapsedMs = Math.max(0, nowMs - createdAtMs);
  const totalMs = 30 * 60 * 1000;
  const progress = Math.min(1, elapsedMs / totalMs);
  const status = String(thread?.status || "").trim().toLowerCase();
  const paused = status === "waiting_user" || status === "queued";
  const expired = elapsedMs >= totalMs;

  let color = "#16A34A";
  if (elapsedMs >= 25 * 60 * 1000) color = "#DC2626";
  else if (elapsedMs >= 15 * 60 * 1000) color = "#EA580C";

  return { expired, paused, progress, color };
}

async function loadInboxRows({ isAdmin, usuarioId }) {
  let inboxQuery = supabase
    .from("support_threads_inbox")
    .select(
      "public_id, category, severity, status, summary, created_at, updated_at, assigned_at, assigned_agent_id, created_by_agent_id, user_public_id, request_origin, origin_source, app_channel, contact_display, anon_public_id, personal_queue, released_to_general_at, retake_requested_at, handoff_required, handoff_reason, handoff_at, handoff_message_confirmed_at"
    )
    .order("created_at", { ascending: false });

  if (!isAdmin) {
    inboxQuery = inboxQuery.or(
      `and(status.eq.starting,assigned_agent_id.eq.${usuarioId}),and(status.eq.assigned,assigned_agent_id.eq.${usuarioId}),and(status.eq.in_progress,assigned_agent_id.eq.${usuarioId}),and(status.eq.waiting_user,assigned_agent_id.eq.${usuarioId}),and(status.eq.new,assigned_agent_id.is.null),and(status.eq.queued,assigned_agent_id.is.null),and(status.eq.queued,assigned_agent_id.eq.${usuarioId}),status.eq.closed`
    );
  }

  const inboxResult = await inboxQuery;
  if (!inboxResult.error) {
    return (inboxResult.data || []).map(normalizeThreadRow);
  }

  let legacyQuery = supabase
    .from("support_threads")
    .select(
      "public_id, category, severity, status, summary, created_at, updated_at, assigned_at, assigned_agent_id, created_by_agent_id, user_public_id, request_origin, origin_source, app_channel, personal_queue, released_to_general_at, retake_requested_at, handoff_required, handoff_reason, handoff_at, handoff_message_confirmed_at"
    )
    .order("created_at", { ascending: false });

  if (!isAdmin) {
    legacyQuery = legacyQuery.or(
      `and(status.eq.starting,assigned_agent_id.eq.${usuarioId}),and(status.eq.assigned,assigned_agent_id.eq.${usuarioId}),and(status.eq.in_progress,assigned_agent_id.eq.${usuarioId}),and(status.eq.waiting_user,assigned_agent_id.eq.${usuarioId}),and(status.eq.new,assigned_agent_id.is.null),and(status.eq.queued,assigned_agent_id.is.null),and(status.eq.queued,assigned_agent_id.eq.${usuarioId}),status.eq.closed`
    );
  }

  const legacyResult = await legacyQuery;
  if (!legacyResult.error) {
    return (legacyResult.data || []).map(normalizeThreadRow);
  }

  let legacyCompatQuery = supabase
    .from("support_threads")
    .select(
      "public_id, category, severity, status, summary, created_at, updated_at, assigned_at, assigned_agent_id, created_by_agent_id, user_public_id, request_origin, origin_source, app_channel, personal_queue, released_to_general_at, retake_requested_at"
    )
    .order("created_at", { ascending: false });

  if (!isAdmin) {
    legacyCompatQuery = legacyCompatQuery.or(
      `and(status.eq.starting,assigned_agent_id.eq.${usuarioId}),and(status.eq.assigned,assigned_agent_id.eq.${usuarioId}),and(status.eq.in_progress,assigned_agent_id.eq.${usuarioId}),and(status.eq.waiting_user,assigned_agent_id.eq.${usuarioId}),and(status.eq.new,assigned_agent_id.is.null),and(status.eq.queued,assigned_agent_id.is.null),and(status.eq.queued,assigned_agent_id.eq.${usuarioId}),status.eq.closed`
    );
  }

  const legacyCompatResult = await legacyCompatQuery;
  return (legacyCompatResult.data || []).map(normalizeThreadRow);
}

export default function SupportInbox({ isAdmin = false, basePath = "/soporte" }) {
  const usuario = useAppStore((s) => s.usuario);
  const liveUpdatesEnabled = isSupportLiveUpdatesEnabled();
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState("available");
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionError, setSessionError] = useState("");
  const [sessionLoading, setSessionLoading] = useState(true);
  const [refreshNonce, setRefreshNonce] = useState(0);
  const [nowMs, setNowMs] = useState(Date.now());
  const [adminAssignModeResolved, setAdminAssignModeResolved] = useState(false);
  const [adminAssignModeSaving, setAdminAssignModeSaving] = useState(false);
  const [assignModePrompt, setAssignModePrompt] = useState({
    open: false,
    threadPublicId: "",
  });
  const syncInFlightRef = useRef(false);
  const debugBanner = import.meta.env.DEV ? (
    <SupportDevDebugBanner scope={isAdmin ? "admin-inbox" : "support-inbox"} />
  ) : null;

  const formatDateTime = (value) =>
    new Date(value).toLocaleString("es-EC", {
      timeZone: "America/Guayaquil",
    });

  const formatAppChannelBadge = (value) => {
    const normalized = String(value || "").trim().toLowerCase();
    if (["referidos_app", "app", "pwa", "referidos-pwa", "referidos-app"].includes(normalized)) {
      return "PWA";
    }
    if (["prelaunch_web", "prelaunch", "prelaunch-web", "landing"].includes(normalized)) {
      return "waitlist";
    }
    if (["android_app", "android", "android-app", "referidos-android"].includes(normalized)) {
      return "android";
    }
    if (["admin_support", "support", "soporte"].includes(normalized)) {
      return "soporte";
    }
    return normalized || "undetermined";
  };

  const refreshSessionState = useCallback(async () => {
    if (!isAdmin) {
      setSessionActive(true);
      return;
    }
    if (!usuario?.id) return;
    const { data } = await supabase
      .from("support_agent_sessions")
      .select("id")
      .eq("agent_id", usuario.id)
      .is("end_at", null)
      .order("start_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setSessionActive(Boolean(data?.id));
  }, [isAdmin, usuario?.id]);

  useEffect(() => {
    let active = true;
    const loadThreads = async () => {
      if (!usuario) return;
      setLoading(true);
      const rows = await loadInboxRows({ isAdmin, usuarioId: usuario.id });
      if (!active) return;
      setThreads(rows);
      setLoading(false);
    };
    loadThreads();
    return () => {
      active = false;
    };
  }, [isAdmin, refreshNonce, usuario]);

  useEffect(() => {
    let active = true;
    const loadSession = async () => {
      if (!isAdmin) {
        if (!active) return;
        setSessionActive(true);
        setSessionLoading(false);
        return;
      }
      if (!usuario?.id) return;
      setSessionLoading(true);
      const { data } = await supabase
        .from("support_agent_sessions")
        .select("id")
        .eq("agent_id", usuario.id)
        .is("end_at", null)
        .order("start_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!active) return;
      setSessionActive(Boolean(data?.id));
      setSessionLoading(false);
    };
    loadSession();
    return () => {
      active = false;
    };
  }, [isAdmin, usuario?.id]);

  useEffect(() => {
    const timer = globalThis.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => {
      globalThis.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const loadAutoAssignModeState = async () => {
      if (!isAdmin || !usuario?.id) {
        setAdminAssignModeResolved(true);
        return;
      }
      const { data } = await supabase
        .from("support_agent_profiles")
        .select("auto_assign_mode")
        .eq("user_id", usuario.id)
        .maybeSingle();
      if (!active) return;
      setAdminAssignModeResolved(Boolean(data?.auto_assign_mode));
    };
    void loadAutoAssignModeState();
    return () => {
      active = false;
    };
  }, [isAdmin, usuario?.id]);

  useEffect(() => {
    if (!liveUpdatesEnabled) return undefined;
    if (!usuario?.id) return undefined;
    const channelName = `support-inbox-session-${isAdmin ? "admin" : "support"}-${usuario.id}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "support_agent_sessions",
          filter: `agent_id=eq.${usuario.id}`,
        },
        async () => {
          await refreshSessionState();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, liveUpdatesEnabled, refreshSessionState, usuario?.id]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handleTicketAssigned = () => {
      setRefreshNonce((prev) => prev + 1);
    };
    window.addEventListener("support:ticket-assigned", handleTicketAssigned);
    return () => {
      window.removeEventListener("support:ticket-assigned", handleTicketAssigned);
    };
  }, []);

  useEffect(() => {
    if (!liveUpdatesEnabled) return undefined;
    if (!usuario?.id) return undefined;
    if (!["admin", "soporte"].includes(usuario?.role || "")) return undefined;

    let disposed = false;
    const panelKey = isAdmin ? "admin_support_inbox" : "support_inbox";

    const runHotSync = async (force = false) => {
      if (disposed || syncInFlightRef.current) return;
      if (
        !force &&
        typeof document !== "undefined" &&
        document.visibilityState !== "visible"
      ) {
        return;
      }

      syncInFlightRef.current = true;
      try {
        await Promise.all([
          supabase.functions.invoke("ops-telemetry-sync-dispatch", {
            body: {
              mode: "hot",
              panel_key: panelKey,
            },
          }),
          supabase.functions.invoke("ops-support-macros-sync-dispatch", {
            body: {
              mode: "hot",
              panel_key: panelKey,
            },
          }),
        ]);
      } catch {
        // Silent fail: sync is best-effort and must not block inbox usage.
      } finally {
        syncInFlightRef.current = false;
      }
    };

    void runHotSync(true);

    const timer = globalThis.setInterval(() => {
      void runHotSync(false);
    }, 60_000);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void runHotSync(true);
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibility);
    }

    return () => {
      disposed = true;
      globalThis.clearInterval(timer);
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibility);
      }
    };
  }, [isAdmin, liveUpdatesEnabled, usuario?.id, usuario?.role]);

  const filtered = useMemo(
    () => {
      const isMine = (thread) => thread.assigned_agent_id && thread.assigned_agent_id === usuario?.id;
      const isUnassigned = (thread) => !thread.assigned_agent_id;

      return threads.filter((thread) => {
        if (activeGroup === "available") {
          return (
            (thread.status === "new" && isUnassigned(thread)) ||
            (thread.status === "queued" && isUnassigned(thread))
          );
        }

        if (activeGroup === "assigned") {
          if (["starting", "assigned", "in_progress", "waiting_user"].includes(thread.status)) {
            return isAdmin ? true : isMine(thread);
          }
          if (thread.status === "queued" && !isUnassigned(thread)) {
            return isAdmin ? true : isMine(thread);
          }
          return false;
        }

        if (activeGroup === "resolved") {
          return thread.status === "closed";
        }

        return false;
      });
    },
    [activeGroup, isAdmin, threads, usuario?.id]
  );

  const hasActive = useMemo(() => {
    if (!usuario) return false;
    return threads.some(
      (thread) =>
        thread.assigned_agent_id === usuario.id &&
        ["starting", "assigned", "in_progress", "waiting_user", "queued"].includes(thread.status)
    );
  }, [threads, usuario]);

  const ensureSession = async () => {
    if (sessionActive) return true;
    if (!isAdmin) {
      setSessionError("Debes iniciar jornada para tomar tickets.");
      return false;
    }
    setSessionError("");
    const result = await startAdminSupportSession();
    if (!result.ok) {
      setSessionError("No se pudo iniciar la jornada.");
      return false;
    }
    setSessionActive(true);
    return true;
  };

  const assignThreadNow = async (publicId) => {
    const ok = await ensureSession();
    if (!ok) return;
    const result = await assignSupportThread({ thread_public_id: publicId });
    if (!result.ok) {
      setSessionError("No se pudo asignar el ticket.");
      return;
    }

    const nextStatus = result?.data?.thread?.status || "starting";
    const assignedAgentId = result?.data?.thread?.assigned_agent_id || usuario?.id || null;
    const personalQueue =
      typeof result?.data?.thread?.personal_queue === "boolean"
        ? result.data.thread.personal_queue
        : nextStatus === "queued";

    setThreads((prev) =>
      prev.map((item) =>
        item.public_id === publicId
          ? {
              ...item,
              status: nextStatus,
              assigned_agent_id: assignedAgentId,
              personal_queue: personalQueue,
            }
          : item
      )
    );
    setRefreshNonce((prev) => prev + 1);
  };

  const handleAssign = async (publicId) => {
    if (isAdmin && !hasActive && !adminAssignModeResolved) {
      setAssignModePrompt({
        open: true,
        threadPublicId: publicId,
      });
      return;
    }
    await assignThreadNow(publicId);
  };

  const handleSelectAdminAssignMode = async (mode) => {
    if (!assignModePrompt.threadPublicId) return;
    setAdminAssignModeSaving(true);
    setSessionError("");
    const result = await setSupportAutoAssignMode({ mode });
    setAdminAssignModeSaving(false);
    if (!result.ok) {
      setSessionError("No se pudo guardar modo de autoasignacion.");
      return;
    }
    setAdminAssignModeResolved(true);
    const threadPublicId = assignModePrompt.threadPublicId;
    setAssignModePrompt({ open: false, threadPublicId: "" });
    await assignThreadNow(threadPublicId);
  };

  const handleRefresh = useCallback(async () => {
    setRefreshNonce((prev) => prev + 1);
    setSessionLoading(true);
    try {
      await refreshSessionState();
      if (isAdmin) {
        await pingAdminSupportSession();
      } else {
        await pingSupportSession();
      }
    } finally {
      setSessionLoading(false);
    }
  }, [isAdmin, refreshSessionState]);

  const renderContent = ({
    gateSessionActive = false,
    gateEndLoading = false,
    handleGateEndSession = null,
  } = {}) => (
    <div className="space-y-6">
      {debugBanner}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#5E30A5]/70">
              Soporte
            </div>
            <h1 className="text-2xl font-extrabold text-[#2F1A55]">
              Inbox de tickets
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {!isAdmin && gateSessionActive && typeof handleGateEndSession === "function" ? (
              <button
                type="button"
                onClick={() => {
                  void handleGateEndSession();
                }}
                disabled={gateEndLoading}
                className={`rounded-2xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold ${
                  gateEndLoading ? "text-slate-400" : "text-slate-600"
                }`}
                title="Terminar jornada"
                aria-label="Terminar jornada"
              >
                {gateEndLoading ? "Cerrando..." : "Terminar jornada"}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                void handleRefresh();
              }}
              disabled={loading || sessionLoading}
              className="rounded-full border border-[#E9E2F7] p-2 text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
              title="Refrescar tickets"
              aria-label="Refrescar tickets"
            >
              <RefreshCw
                size={16}
                className={loading || sessionLoading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Gestiona tickets segun su estado, origen y prioridad.
        </p>
        {sessionError ? (
          <div className="text-xs text-red-500">{sessionError}</div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {INBOX_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setActiveGroup(group.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeGroup === group.id
                ? "bg-[#5E30A5] text-white"
                : "bg-white text-[#5E30A5] border border-[#E9E2F7]"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
        {loading || sessionLoading ? (
          <div className="text-sm text-slate-500">Cargando tickets...</div>
        ) : filtered.length === 0 ? (
          <div className="text-sm text-slate-500">
            No hay tickets en este estado.
          </div>
        ) : (
          filtered.map((thread) => {
            const timer = computeTicketTimer(thread, nowMs);
            const showAdminTimer =
              isAdmin &&
              (!thread.assigned_agent_id ||
                thread.status === "new" ||
                (thread.status === "queued" && !thread.personal_queue));

            const statusLabel = String(thread.status || "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (ch) => ch.toUpperCase());

            return (
              <div
                key={thread.public_id}
                className={`rounded-2xl border px-4 py-3 space-y-2 ${
                  timer.expired && showAdminTimer
                    ? "border-red-300 bg-red-50"
                    : "border-[#E9E2F7] bg-[#FAF8FF]"
                } ${!sessionActive ? "opacity-60" : ""}`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span>{thread.public_id}</span>
                    <span>|</span>
                    <span>{thread.category}</span>
                  </span>
                  <div className="inline-flex items-center gap-2">
                    {showAdminTimer && !timer.expired ? (
                      <span
                        className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 bg-white"
                        title={timer.paused ? "Temporizador en pausa" : "Tiempo operativo"}
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            background: timer.paused
                              ? "#94A3B8"
                              : `conic-gradient(${timer.color} ${Math.round(
                                  timer.progress * 360
                                )}deg, #E2E8F0 ${Math.round(timer.progress * 360)}deg 360deg)`,
                          }}
                        />
                      </span>
                    ) : null}
                    <span>{thread.severity}</span>
                  </div>
                </div>
                <div className="text-sm font-light text-slate-500">
                  {thread.summary || `Ticket ${thread.public_id}`}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em]">
                  <span
                    className={`rounded-full px-2 py-1 ${
                      thread.request_origin === "anonymous"
                        ? "bg-[#FFF7E6] text-[#B46B00]"
                        : "bg-[#EAF7F0] text-[#1B7F4B]"
                    }`}
                  >
                    {thread.request_origin === "anonymous" ? "Anonimo" : "Registrado"}
                  </span>
                  {thread.app_channel ? (
                    <span className="rounded-full bg-[#EAF4FF] px-2 py-1 text-[#0D4F9A]">
                      {formatAppChannelBadge(thread.app_channel)}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-white px-2 py-1 text-slate-500">
                    {statusLabel}
                  </span>
                  {thread.handoff_required ? (
                    <span className="rounded-full bg-[#FFF7E6] px-2 py-1 text-[#B46B00]">
                      Abandonado
                    </span>
                  ) : null}
                </div>
                <div className="text-[11px] text-slate-400">
                  {thread.request_origin === "anonymous"
                    ? thread.anon_public_id || thread.user_public_id
                    : thread.user_public_id}
                  {" - "}
                  {formatDateTime(thread.created_at)}
                </div>
                {thread.request_origin === "anonymous" && thread.contact_display ? (
                  <div className="text-[11px] text-slate-500">
                    Contacto: {thread.contact_display}
                  </div>
                ) : null}
                {thread.handoff_required ? (
                  <div className="text-[11px] text-[#B46B00]">
                    Ticket liberado por abandono del asesor anterior.
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`${basePath}/ticket/${thread.public_id}`)
                    }
                    className="rounded-full border border-[#5E30A5] px-3 py-1 text-xs font-semibold text-[#5E30A5]"
                  >
                    Ver ticket
                  </button>
                  {(thread.status === "new" || thread.status === "queued") &&
                  !thread.assigned_agent_id ? (
                    <button
                      type="button"
                      onClick={() => {
                        void handleAssign(thread.public_id);
                      }}
                      disabled={!sessionActive || adminAssignModeSaving}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        !sessionActive || adminAssignModeSaving
                          ? "bg-[#C9B6E8] text-white"
                          : "bg-[#5E30A5] text-white"
                      }`}
                    >
                      Tomar ticket
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>

      {assignModePrompt.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
            <div className="text-base font-semibold text-[#2F1A55]">
              Asignacion automatica de siguientes tickets
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Elige como deseas recibir los siguientes tickets en esta jornada.
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  void handleSelectAdminAssignMode("manual");
                }}
                disabled={adminAssignModeSaving}
                className="rounded-xl border border-[#E9E2F7] px-4 py-2 text-sm font-semibold text-[#5E30A5]"
              >
                Manual
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleSelectAdminAssignMode("auto");
                }}
                disabled={adminAssignModeSaving}
                className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
              >
                Automatico
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (isAdmin) return renderContent();
  return (
    <SupportGate showSessionActions={false}>
      {({ sessionActive: gateSessionActive, endLoading: gateEndLoading, onEndSession }) =>
        renderContent({
          gateSessionActive,
          gateEndLoading,
          handleGateEndSession: onEndSession,
        })}
    </SupportGate>
  );
}

