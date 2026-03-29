import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarClock, RefreshCw, ShieldCheck, ShieldX } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
}

function classifyStatusByWindow(startAt, endAt) {
  const now = Date.now();
  const start = startAt ? new Date(startAt) : null;
  const end = endAt ? new Date(endAt) : null;

  if (start && !Number.isNaN(start.getTime()) && start.getTime() > now) {
    return "futura";
  }
  if (end && !Number.isNaN(end.getTime()) && end.getTime() < now) {
    return "pasada";
  }
  return "actual";
}

function statusBadgeClass(status) {
  if (status === "actual") return "bg-emerald-100 text-emerald-700";
  if (status === "futura") return "bg-[#F0EBFF] text-[#5E30A5]";
  return "bg-slate-100 text-slate-600";
}

function eventTitle(eventType) {
  if (eventType === "agent_authorized") return "Jornada autorizada";
  if (eventType === "agent_revoked") return "Jornada revocada";
  if (eventType === "agent_login") return "Sesion iniciada";
  if (eventType === "agent_logout") return "Sesion finalizada";
  return eventType || "Evento";
}

function actorLabel(actorId, usersById) {
  if (!actorId) return "Sistema";
  const row = usersById[actorId];
  if (!row) return actorId;
  const fullName = [row.nombre, row.apellido].filter(Boolean).join(" ").trim();
  return fullName || row.public_id || actorId;
}

export default function SupportJornadas() {
  const usuario = useAppStore((s) => s.usuario);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    if (!usuario?.id) {
      setRows([]);
      setLoading(false);
      return;
    }

    setError("");
    const [profileRes, sessionsRes, eventsRes] = await Promise.all([
      supabase
        .from("support_agent_profiles")
        .select(
          "user_id, authorized_for_work, authorized_from, authorized_until, blocked, session_request_status, session_request_at, updated_at, created_at",
        )
        .eq("user_id", usuario.id)
        .maybeSingle(),
      supabase
        .from("support_agent_sessions")
        .select("id, agent_id, start_at, end_at, end_reason, last_seen_at, authorized_by")
        .eq("agent_id", usuario.id)
        .order("start_at", { ascending: false })
        .limit(150),
      supabase
        .from("support_agent_events")
        .select("id, event_type, actor_id, details, created_at")
        .eq("agent_id", usuario.id)
        .in("event_type", ["agent_authorized", "agent_revoked", "agent_login", "agent_logout"])
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

    if (profileRes.error || sessionsRes.error || eventsRes.error) {
      const detail =
        profileRes.error?.message ||
        sessionsRes.error?.message ||
        eventsRes.error?.message ||
        "No se pudo cargar el historial.";
      setError(detail);
      setRows([]);
      setLoading(false);
      return;
    }

    const profile = profileRes.data || null;
    const sessions = Array.isArray(sessionsRes.data) ? sessionsRes.data : [];
    const events = Array.isArray(eventsRes.data) ? eventsRes.data : [];

    const actorIds = Array.from(
      new Set(
        [
          ...sessions.map((session) => session.authorized_by).filter(Boolean),
          ...events.map((event) => event.actor_id).filter(Boolean),
        ].map(String),
      ),
    );

    let usersById = {};
    if (actorIds.length) {
      const { data: usersData } = await supabase
        .from("usuarios")
        .select("id, nombre, apellido, public_id")
        .in("id", actorIds);
      usersById = (usersData || []).reduce((acc, row) => {
        acc[row.id] = row;
        return acc;
      }, {});
    }

    const sessionRows = sessions.map((session) => {
      const status = session.end_at
        ? classifyStatusByWindow(session.start_at, session.end_at)
        : classifyStatusByWindow(session.start_at, null);
      return {
        id: `session-${session.id}`,
        type: "session",
        status,
        occurred_at: session.start_at || session.last_seen_at,
        title: session.end_at ? "Sesion finalizada" : "Sesion activa",
        subtitle: `Inicio: ${formatDateTime(session.start_at)} | Fin: ${
          session.end_at ? formatDateTime(session.end_at) : "En curso"
        }`,
        metadata: [
          `ID: ${session.id}`,
          `Last seen: ${formatDateTime(session.last_seen_at)}`,
          `Fin: ${session.end_reason || "manual_end"}`,
          `Autorizado por: ${actorLabel(session.authorized_by, usersById)}`,
        ],
      };
    });

    const eventRows = events.map((event) => ({
      id: `event-${event.id}`,
      type: "event",
      status: classifyStatusByWindow(event.created_at, event.created_at),
      occurred_at: event.created_at,
      title: eventTitle(event.event_type),
      subtitle: `Actor: ${actorLabel(event.actor_id, usersById)}`,
      metadata: [
        `Tipo: ${event.event_type}`,
        `Fecha: ${formatDateTime(event.created_at)}`,
        `Detalle: ${JSON.stringify(event.details || {})}`,
      ],
    }));

    const profileRows = [];
    if (profile?.session_request_status === "pending") {
      profileRows.push({
        id: "profile-pending",
        type: "jornada",
        status: "actual",
        occurred_at: profile.session_request_at || profile.updated_at || profile.created_at,
        title: "Solicitud de jornada pendiente",
        subtitle: "Tu solicitud sigue en espera de aprobacion.",
        metadata: [
          `Solicitado: ${formatDateTime(profile.session_request_at)}`,
        ],
      });
    }

    if (profile?.authorized_for_work) {
      const status = classifyStatusByWindow(profile.authorized_from, profile.authorized_until);
      profileRows.push({
        id: "profile-authorized",
        type: "jornada",
        status,
        occurred_at: profile.authorized_from || profile.updated_at || profile.created_at,
        title: status === "futura" ? "Jornada programada" : "Jornada autorizada",
        subtitle: `Desde: ${formatDateTime(profile.authorized_from)} | Hasta: ${formatDateTime(
          profile.authorized_until,
        )}`,
        metadata: [
          `Bloqueado: ${profile.blocked ? "si" : "no"}`,
          `Actualizado: ${formatDateTime(profile.updated_at)}`,
        ],
      });
    } else if (profile?.authorized_until) {
      profileRows.push({
        id: "profile-expired",
        type: "jornada",
        status: classifyStatusByWindow(profile.authorized_from, profile.authorized_until),
        occurred_at: profile.authorized_until,
        title: "Jornada sin autorizacion activa",
        subtitle: `Ultima vigencia: ${formatDateTime(profile.authorized_until)}`,
        metadata: [
          `Desde: ${formatDateTime(profile.authorized_from)}`,
          `Bloqueado: ${profile.blocked ? "si" : "no"}`,
        ],
      });
    }

    const unifiedRows = [...profileRows, ...sessionRows, ...eventRows]
      .filter((row) => row.occurred_at)
      .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());

    setRows(unifiedRows);
    setLoading(false);
  }, [usuario?.id]);

  useEffect(() => {
    setLoading(true);
    void loadHistory();
  }, [loadHistory]);

  const groupedCount = useMemo(() => {
    return {
      actual: rows.filter((row) => row.status === "actual").length,
      futura: rows.filter((row) => row.status === "futura").length,
      pasada: rows.filter((row) => row.status === "pasada").length,
    };
  }, [rows]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#E9E2F7] bg-white p-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F0EBFF] px-3 py-1 text-xs font-semibold text-[#5E30A5]">
            <CalendarClock size={14} />
            Historial unificado
          </div>
          <h2 className="mt-3 text-xl font-extrabold text-[#2F1A55]">
            Jornadas y sesiones
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pasadas, actuales y futuras en una sola linea de tiempo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            void onRefresh();
          }}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />
          Recargar
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Actual</div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600">{groupedCount.actual}</div>
        </div>
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Futura</div>
          <div className="mt-2 text-2xl font-extrabold text-[#5E30A5]">{groupedCount.futura}</div>
        </div>
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Pasada</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-600">{groupedCount.pasada}</div>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5">
        {loading ? (
          <div className="text-sm text-slate-500">Cargando historial...</div>
        ) : rows.length === 0 ? (
          <div className="text-sm text-slate-500">
            No hay jornadas o sesiones registradas para este usuario.
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl border border-[#E9E2F7] bg-[#FCFBFF] px-4 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusBadgeClass(row.status)}`}>
                      {row.status}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {row.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {formatDateTime(row.occurred_at)}
                  </div>
                </div>
                <div className="mt-2 flex items-start gap-2">
                  <div className="mt-0.5 text-[#5E30A5]">
                    {row.status === "actual" ? <ShieldCheck size={14} /> : <ShieldX size={14} />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#2F1A55]">{row.title}</div>
                    <div className="text-xs text-slate-500">{row.subtitle}</div>
                  </div>
                </div>
                {Array.isArray(row.metadata) && row.metadata.length ? (
                  <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                    {row.metadata.map((item) => (
                      <div key={`${row.id}-${item}`}>{item}</div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

