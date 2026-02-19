import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import SupportGate from "./SupportGate";
import { assignSupportThread, startAdminSupportSession } from "../supportClient";

const STATUS_GROUPS = [
  { id: "new", label: "Nuevos" },
  { id: "assigned", label: "Asignados" },
  { id: "in_progress", label: "En progreso" },
  { id: "waiting_user", label: "Esperando usuario" },
  { id: "queued", label: "En cola" },
  { id: "closed", label: "Resueltos" },
];

const ORIGIN_FILTERS = [
  { id: "all", label: "Todos" },
  { id: "registered", label: "Registrados" },
  { id: "anonymous", label: "Anonimos" },
];

function normalizeThreadRow(thread) {
  return {
    ...thread,
    request_origin: thread?.request_origin || "registered",
    origin_source: thread?.origin_source || "app",
    contact_display: thread?.contact_display || null,
    anon_public_id: thread?.anon_public_id || null,
  };
}

async function loadInboxRows({ isAdmin, usuarioId }) {
  let inboxQuery = supabase
    .from("support_threads_inbox")
    .select(
      "public_id, category, severity, status, summary, created_at, assigned_agent_id, created_by_agent_id, user_public_id, request_origin, origin_source, contact_display, anon_public_id"
    )
    .order("created_at", { ascending: false });

  if (!isAdmin) {
    inboxQuery = inboxQuery.or(
      `assigned_agent_id.eq.${usuarioId},and(status.eq.new,assigned_agent_id.is.null),created_by_agent_id.eq.${usuarioId}`
    );
  }

  const inboxResult = await inboxQuery;
  if (!inboxResult.error) {
    return (inboxResult.data || []).map(normalizeThreadRow);
  }

  let legacyQuery = supabase
    .from("support_threads")
    .select(
      "public_id, category, severity, status, summary, created_at, assigned_agent_id, created_by_agent_id, user_public_id"
    )
    .order("created_at", { ascending: false });

  if (!isAdmin) {
    legacyQuery = legacyQuery.or(
      `assigned_agent_id.eq.${usuarioId},and(status.eq.new,assigned_agent_id.is.null),created_by_agent_id.eq.${usuarioId}`
    );
  }

  const legacyResult = await legacyQuery;
  return (legacyResult.data || []).map(normalizeThreadRow);
}

export default function SupportInbox({ isAdmin = false, basePath = "/soporte" }) {
  const usuario = useAppStore((s) => s.usuario);
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("new");
  const [activeOrigin, setActiveOrigin] = useState("all");
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionError, setSessionError] = useState("");
  const [sessionLoading, setSessionLoading] = useState(true);
  const [refreshNonce, setRefreshNonce] = useState(0);
  const syncInFlightRef = useRef(false);

  const formatDateTime = (value) =>
    new Date(value).toLocaleString("es-EC", {
      timeZone: "America/Guayaquil",
    });

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
  }, [usuario?.id]);

  useEffect(() => {
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
        await supabase.functions.invoke("ops-telemetry-sync-dispatch", {
          body: {
            mode: "hot",
            panel_key: panelKey,
          },
        });
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
  }, [isAdmin, usuario?.id, usuario?.role]);

  const filtered = useMemo(
    () =>
      threads.filter((thread) => {
        if (thread.status !== activeStatus) return false;
        if (activeOrigin === "all") return true;
        return thread.request_origin === activeOrigin;
      }),
    [activeOrigin, activeStatus, threads]
  );

  const hasActive = useMemo(() => {
    if (!usuario) return false;
    return threads.some(
      (thread) =>
        thread.assigned_agent_id === usuario.id &&
        ["assigned", "in_progress", "waiting_user"].includes(thread.status)
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

  const handleAssign = async (publicId) => {
    const ok = await ensureSession();
    if (!ok) return;
    const result = await assignSupportThread({ thread_public_id: publicId });
    if (!result.ok) {
      setSessionError("No se pudo asignar el ticket.");
      return;
    }
    setThreads((prev) =>
      prev.map((item) =>
        item.public_id === publicId
          ? { ...item, status: "assigned", assigned_agent_id: usuario?.id || null }
          : item
      )
    );
  };

  const content = (
    <div className="space-y-6">
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
          <button
            type="button"
            onClick={() => setRefreshNonce((prev) => prev + 1)}
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
        <p className="text-sm text-slate-500">
          Gestiona tickets segun su estado, origen y prioridad.
        </p>
        {sessionError ? (
          <div className="text-xs text-red-500">{sessionError}</div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_GROUPS.map((status) => (
          <button
            key={status.id}
            type="button"
            onClick={() => setActiveStatus(status.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeStatus === status.id
                ? "bg-[#5E30A5] text-white"
                : "bg-white text-[#5E30A5] border border-[#E9E2F7]"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {ORIGIN_FILTERS.map((origin) => (
          <button
            key={origin.id}
            type="button"
            onClick={() => setActiveOrigin(origin.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeOrigin === origin.id
                ? "bg-[#2F1A55] text-white"
                : "bg-white text-[#2F1A55] border border-[#E9E2F7]"
            }`}
          >
            {origin.label}
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
          filtered.map((thread) => (
            <div
              key={thread.public_id}
              className={`rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 space-y-2 ${
                !sessionActive ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{thread.category}</span>
                <span>{thread.severity}</span>
              </div>
              <div className="text-sm font-semibold text-[#2F1A55]">
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
                {thread.origin_source ? (
                  <span className="rounded-full bg-[#F0EBFF] px-2 py-1 text-[#5E30A5]">
                    {thread.origin_source}
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
                {thread.status === "new" && !thread.assigned_agent_id ? (
                  <button
                    type="button"
                    onClick={() => handleAssign(thread.public_id)}
                    disabled={!sessionActive || hasActive}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      !sessionActive || hasActive
                        ? "bg-[#C9B6E8] text-white"
                        : "bg-[#5E30A5] text-white"
                    }`}
                  >
                    Tomar ticket
                  </button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (isAdmin) return content;
  return <SupportGate>{content}</SupportGate>;
}
