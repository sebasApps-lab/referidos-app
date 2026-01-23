import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import SupportGate from "./SupportGate";
import {
  assignSupportThread,
  startAdminSupportSession,
} from "../supportClient";

const STATUS_GROUPS = [
  { id: "new", label: "Nuevos" },
  { id: "assigned", label: "Asignados" },
  { id: "in_progress", label: "En progreso" },
  { id: "waiting_user", label: "Esperando usuario" },
  { id: "queued", label: "En cola" },
];

export default function SupportInbox({ isAdmin = false, basePath = "/soporte" }) {
  const usuario = useAppStore((s) => s.usuario);
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("new");
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionError, setSessionError] = useState("");
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadThreads = async () => {
      if (!usuario) return;
      setLoading(true);
      let query = supabase
        .from("support_threads")
        .select(
          "public_id, category, severity, status, summary, created_at, assigned_agent_id, user_public_id"
        )
        .order("created_at", { ascending: false });
      if (!isAdmin) {
        query = query.or(
          `assigned_agent_id.eq.${usuario.id},and(status.eq.new,assigned_agent_id.is.null),created_by_agent_id.eq.${usuario.id}`
        );
      }
      const { data } = await query;
      if (!active) return;
      setThreads(data || []);
      setLoading(false);
    };
    loadThreads();
    return () => {
      active = false;
    };
  }, [isAdmin, usuario]);

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

  const filtered = useMemo(
    () => threads.filter((t) => t.status === activeStatus),
    [activeStatus, threads]
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
        item.public_id === publicId ? { ...item, status: "assigned" } : item
      )
    );
  };

  const content = (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.25em] text-[#5E30A5]/70">
          Soporte
        </div>
        <h1 className="text-2xl font-extrabold text-[#2F1A55]">
          Inbox de tickets
        </h1>
        <p className="text-sm text-slate-500">
          Gestiona tickets segun su estado y prioridad.
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
              <div className="text-[11px] text-slate-400">
                {thread.user_public_id} •{" "}
                {new Date(thread.created_at).toLocaleString()}
              </div>
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
