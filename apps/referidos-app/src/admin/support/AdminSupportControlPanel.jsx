import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Layers3,
  RefreshCw,
  Route,
  Settings2,
  ShieldAlert,
  Users,
} from "lucide-react";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import { SUPPORT_CATEGORIES } from "@referidos/support-sdk/data/supportCategories";
import { SUPPORT_MACROS } from "@referidos/support-sdk/data/supportMacros";

const ACTIVE = ["new", "assigned", "in_progress", "waiting_user", "queued"];
const FLOW = ["new", "assigned", "in_progress", "waiting_user", "queued", "closed"];
const STATUS_LABEL = {
  new: "Nuevo",
  assigned: "Asignado",
  in_progress: "En progreso",
  waiting_user: "Esperando usuario",
  queued: "En cola",
  closed: "Cerrado",
  cancelled: "Cancelado",
};
const SEV_RANK = { s0: 0, s1: 1, s2: 2, s3: 3 };

const fmt = (v) => {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
};
const mins = (a, b) => {
  const x = new Date(a).getTime();
  const y = new Date(b).getTime();
  if (Number.isNaN(x) || Number.isNaN(y) || y < x) return null;
  return Math.round((y - x) / 60000);
};
const hoursAgo = (a) => {
  const x = new Date(a).getTime();
  if (Number.isNaN(x)) return null;
  return (Date.now() - x) / 3600000;
};
const avg = (arr) => (arr.length ? arr.reduce((s, n) => s + n, 0) / arr.length : null);
const short = (t, n = 130) => {
  const s = typeof t === "string" ? t.trim() : "";
  if (!s) return "-";
  return s.length > n ? `${s.slice(0, n)}...` : s;
};
const nameOf = (u) => {
  if (!u) return "Sin usuario";
  const full = `${u.nombre || ""} ${u.apellido || ""}`.trim();
  return full || u.public_id || "Sin nombre";
};

function Metric({ title, value, hint, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-400">
        <span>{title}</span>
        {Icon ? <Icon size={14} className="text-[#5E30A5]" /> : null}
      </div>
      <div className="mt-2 text-xl font-extrabold text-[#2F1A55]">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
      <div>
        <div className="text-sm font-semibold text-[#2F1A55]">{title}</div>
        {subtitle ? <div className="text-xs text-slate-500">{subtitle}</div> : null}
      </div>
      {children}
    </div>
  );
}

export default function AdminSupportControlPanel({
  lockedPanel = null,
  title = "Soporte",
  subtitle = "Panel de control de flujo de tickets",
}) {
  const [panel, setPanel] = useState(lockedPanel || "tickets");
  const [viewByPanel, setViewByPanel] = useState({ tickets: "basic", catalogo: "basic" });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [threads, setThreads] = useState([]);
  const [events, setEvents] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [macros, setMacros] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [usersById, setUsersById] = useState({});
  const [selectedPublicId, setSelectedPublicId] = useState(null);

  const load = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const [tRes, eRes, iRes, mRes, pRes, sRes] = await Promise.all([
        supabase
          .from("support_threads")
          .select(
            "id, public_id, user_public_id, category, severity, status, summary, request_origin, origin_source, created_at, updated_at, assigned_agent_id, closed_at, cancelled_at, resolution, root_cause, anon_profile_id"
          )
          .order("created_at", { ascending: false })
          .limit(700),
        supabase
          .from("support_thread_events")
          .select("id, thread_id, event_type, actor_role, actor_id, details, created_at")
          .order("created_at", { ascending: false })
          .limit(3500),
        supabase
          .from("support_threads_inbox")
          .select("public_id, contact_display, anon_public_id")
          .order("created_at", { ascending: false })
          .limit(700),
        supabase
          .from("support_macros")
          .select("id, title, body, category, status, audience, active, created_at")
          .order("created_at", { ascending: false })
          .limit(600),
        supabase
          .from("support_agent_profiles")
          .select("user_id, authorized_for_work, blocked, max_active_tickets, authorized_from, authorized_until")
          .limit(250),
        supabase
          .from("support_agent_sessions")
          .select("id, agent_id, start_at, last_seen_at")
          .is("end_at", null)
          .limit(250),
      ]);

      const nextThreads = (tRes.data || []).map((t) => ({
        ...t,
        request_origin: t.request_origin || "registered",
        origin_source: t.origin_source || "app",
      }));
      const nextEvents = eRes.data || [];
      const nextInbox = iRes.data || [];
      const nextMacros = mRes.data?.length ? mRes.data : SUPPORT_MACROS.map((m) => ({ ...m, active: true }));
      const nextProfiles = pRes.data || [];
      const nextSessions = sRes.data || [];

      const ids = Array.from(
        new Set(
          [
            ...nextThreads.map((t) => t.assigned_agent_id),
            ...nextEvents.map((e) => e.actor_id),
            ...nextProfiles.map((p) => p.user_id),
            ...nextSessions.map((s) => s.agent_id),
          ].filter(Boolean)
        )
      );
      let users = {};
      if (ids.length) {
        const uRes = await supabase
          .from("usuarios")
          .select("id, nombre, apellido, public_id, role")
          .in("id", ids);
        users = (uRes.data || []).reduce((acc, u) => {
          acc[u.id] = u;
          return acc;
        }, {});
      }

      if (tRes.error || eRes.error || pRes.error) {
        setError(tRes.error?.message || eRes.error?.message || pRes.error?.message || "Error de carga");
      }

      setThreads(nextThreads);
      setEvents(nextEvents);
      setInbox(nextInbox);
      setMacros(nextMacros);
      setProfiles(nextProfiles);
      setSessions(nextSessions);
      setUsersById(users);
    } catch (err) {
      setError(err?.message || "Error de carga");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  const activePanel = lockedPanel || panel;
  const view = viewByPanel[activePanel] || "basic";

  const inboxByPublic = useMemo(
    () => inbox.reduce((acc, r) => ((acc[r.public_id] = r), acc), {}),
    [inbox]
  );
  const byPublic = useMemo(
    () => threads.reduce((acc, t) => ((acc[t.public_id] = t), acc), {}),
    [threads]
  );
  const eventsByThread = useMemo(() => {
    const out = {};
    events.forEach((e) => {
      if (!e.thread_id) return;
      if (!out[e.thread_id]) out[e.thread_id] = [];
      out[e.thread_id].push(e);
    });
    Object.values(out).forEach((arr) =>
      arr.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    );
    return out;
  }, [events]);

  const activeTickets = useMemo(
    () =>
      threads
        .filter((t) => ACTIVE.includes(t.status))
        .sort((a, b) => {
          const d = (SEV_RANK[a.severity] ?? 99) - (SEV_RANK[b.severity] ?? 99);
          return d !== 0 ? d : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }),
    [threads]
  );

  const selected = selectedPublicId ? byPublic[selectedPublicId] : null;
  const selectedTimeline = selected ? eventsByThread[selected.id] || [] : [];

  const metrics = useMemo(() => {
    const closed = threads.filter((t) => t.status === "closed" && t.closed_at);
    const cancelled = threads.filter((t) => t.status === "cancelled");

    const firstResponse = [];
    const queueToAssigned = [];
    threads.forEach((t) => {
      const tl = eventsByThread[t.id] || [];
      const first = tl.find((e) =>
        ["assigned", "status_changed", "waiting_user", "resumed", "closed"].includes(e.event_type)
      );
      const assigned = tl.find((e) => ["assigned", "resumed", "status_changed"].includes(e.event_type));
      const a = first ? mins(t.created_at, first.created_at) : null;
      const b = assigned ? mins(t.created_at, assigned.created_at) : null;
      if (a != null) firstResponse.push(a);
      if (b != null) queueToAssigned.push(b);
    });

    const resHours = closed
      .map((t) => mins(t.created_at, t.closed_at))
      .filter((v) => v != null)
      .map((v) => v / 60);

    const activeByAgent = {};
    const closedByAgent7d = {};
    activeTickets.forEach((t) => {
      if (!t.assigned_agent_id) return;
      activeByAgent[t.assigned_agent_id] = (activeByAgent[t.assigned_agent_id] || 0) + 1;
    });
    closed.forEach((t) => {
      const closeTs = new Date(t.closed_at).getTime();
      if (!t.assigned_agent_id || Number.isNaN(closeTs)) return;
      if (closeTs >= Date.now() - 7 * 24 * 3600000) {
        closedByAgent7d[t.assigned_agent_id] = (closedByAgent7d[t.assigned_agent_id] || 0) + 1;
      }
    });

    const backlogCat = {};
    const backlogSev = {};
    activeTickets.forEach((t) => {
      backlogCat[t.category] = (backlogCat[t.category] || 0) + 1;
      backlogSev[t.severity] = (backlogSev[t.severity] || 0) + 1;
    });

    const resumed = new Set(events.filter((e) => e.event_type === "resumed").map((e) => e.thread_id));
    const waiting = new Set(events.filter((e) => e.event_type === "waiting_user").map((e) => e.thread_id));
    const forced = closed.filter((t) => {
      const a = (t.resolution || "").toLowerCase();
      const b = (t.root_cause || "").toLowerCase();
      return a.includes("forzad") || b.includes("forzad") || b.includes("cierre_forzado");
    });
    const stale = activeTickets.filter((t) => {
      const h = hoursAgo(t.updated_at || t.created_at);
      return h != null && h > 12;
    });

    const anonActive = activeTickets.filter((t) => t.request_origin === "anonymous");
    const repeatedAnon = {};
    anonActive.forEach((t) => {
      const key = inboxByPublic[t.public_id]?.anon_public_id || inboxByPublic[t.public_id]?.contact_display;
      if (!key) return;
      repeatedAnon[key] = (repeatedAnon[key] || 0) + 1;
    });
    const cancelledByUser = {};
    cancelled.forEach((t) => {
      if (!t.user_public_id) return;
      cancelledByUser[t.user_public_id] = (cancelledByUser[t.user_public_id] || 0) + 1;
    });

    const macrosByCat = {};
    macros.forEach((m) => {
      if (!m.category || m.active === false) return;
      macrosByCat[m.category] = (macrosByCat[m.category] || 0) + 1;
    });

    const top = (obj, n = 6) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([k, c]) => ({ key: k, count: c }));

    return {
      sla: {
        first: avg(firstResponse),
        queue: avg(queueToAssigned),
        resolution: avg(resHours),
        overdue: activeTickets.filter((t) => (hoursAgo(t.created_at) || 0) > 48).length,
      },
      workload: {
        activeByAgent: top(activeByAgent).map((x) => ({ ...x, label: nameOf(usersById[x.key]) })),
        closedByAgent: top(closedByAgent7d).map((x) => ({ ...x, label: nameOf(usersById[x.key]) })),
      },
      queue: {
        active: activeTickets.length,
        oldest: (() => {
          const o = [...activeTickets]
            .filter((t) => t.status === "new" || t.status === "queued")
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0];
          return o ? hoursAgo(o.created_at) : null;
        })(),
        byCat: top(backlogCat, 8),
        bySev: top(backlogSev, 5),
      },
      quality: {
        resumed: resumed.size,
        waitingClosed: closed.filter((t) => waiting.has(t.id)).length,
        forced: forced.length,
        stale: stale.length,
      },
      risk: {
        anonActive: anonActive.length,
        repeatedAnon: top(repeatedAnon, 5),
        cancelledByUser: top(cancelledByUser, 5),
        cancelled: cancelled.length,
      },
      audit: events.slice(0, 25),
      config: {
        categories: SUPPORT_CATEGORIES.length,
        macros: macros.filter((m) => m.active !== false).length,
        categoriesNoMacro: SUPPORT_CATEGORIES.filter((c) => !macrosByCat[c.id]),
        authorizedAgents: profiles.filter((p) => p.authorized_for_work && !p.blocked).length,
        blockedAgents: profiles.filter((p) => p.blocked).length,
        sessions: sessions.length,
      },
    };
  }, [threads, events, macros, profiles, sessions, activeTickets, usersById, eventsByThread, inboxByPublic]);

  const categoriesStats = useMemo(() => {
    const total = {};
    const active = {};
    const macroCount = {};
    threads.forEach((t) => {
      total[t.category] = (total[t.category] || 0) + 1;
    });
    activeTickets.forEach((t) => {
      active[t.category] = (active[t.category] || 0) + 1;
    });
    macros.forEach((m) => {
      if (!m.category || m.active === false) return;
      macroCount[m.category] = (macroCount[m.category] || 0) + 1;
    });
    return SUPPORT_CATEGORIES.map((c) => ({
      ...c,
      total: total[c.id] || 0,
      active: active[c.id] || 0,
      macros: macroCount[c.id] || 0,
    }));
  }, [threads, activeTickets, macros]);

  const visitedFlow = useMemo(() => {
    if (!selected) return new Set();
    const v = new Set(["new", selected.status]);
    selectedTimeline.forEach((e) => {
      if (FLOW.includes(e.event_type)) v.add(e.event_type);
      if (e.event_type === "resumed") v.add("in_progress");
      if (e.event_type === "waiting_user") v.add("waiting_user");
      if (e.event_type === "assigned") v.add("assigned");
      if (e.event_type === "queued") v.add("queued");
      if (e.event_type === "closed") v.add("closed");
      if (e.event_type === "status_changed" && e.details && typeof e.details === "object") {
        const ns = e.details.next_status || e.details.to_status || e.details.status;
        if (typeof ns === "string") v.add(ns);
      }
    });
    return v;
  }, [selected, selectedTimeline]);

  const renderAdvanced = () => (
    <div className="space-y-5">
      <Card title="SLA y tiempos" subtitle="Tiempos de respuesta, cola y resolucion.">
        <div className="grid gap-3 md:grid-cols-4">
          <Metric
            icon={Clock3}
            title="1ra respuesta"
            value={metrics.sla.first == null ? "-" : `${Math.round(metrics.sla.first)}m`}
          />
          <Metric
            icon={Route}
            title="Cola -> asignacion"
            value={metrics.sla.queue == null ? "-" : `${Math.round(metrics.sla.queue)}m`}
          />
          <Metric
            icon={CheckCircle2}
            title="Resolucion promedio"
            value={metrics.sla.resolution == null ? "-" : `${metrics.sla.resolution.toFixed(1)}h`}
          />
          <Metric icon={AlertTriangle} title="Activos >48h" value={metrics.sla.overdue} />
        </div>
      </Card>

      <Card title="Carga por asesor" subtitle="Distribucion activa y cierres ultimos 7 dias.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Activos</div>
            {(metrics.workload.activeByAgent.length ? metrics.workload.activeByAgent : [{ key: "-", label: "Sin datos", count: 0 }]).map((r) => (
              <div key={`a-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.label}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Cerrados 7d</div>
            {(metrics.workload.closedByAgent.length ? metrics.workload.closedByAgent : [{ key: "-", label: "Sin datos", count: 0 }]).map((r) => (
              <div key={`c-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.label}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Salud de cola" subtitle="Backlog por categoria y severidad.">
        <div className="grid gap-3 md:grid-cols-3">
          <Metric icon={Layers3} title="Backlog activo" value={metrics.queue.active} />
          <Metric
            icon={Clock3}
            title="Cola mas antigua"
            value={metrics.queue.oldest == null ? "-" : `${metrics.queue.oldest.toFixed(1)}h`}
          />
          <Metric icon={Route} title="Categorias con backlog" value={metrics.queue.byCat.length} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            {metrics.queue.byCat.map((r) => (
              <div key={`bc-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.key}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {metrics.queue.bySev.map((r) => (
              <div key={`bs-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.key}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Calidad de atencion" subtitle="Continuidad, cierres y tickets estancados.">
        <div className="grid gap-3 md:grid-cols-4">
          <Metric title="Reanudados" value={metrics.quality.resumed} />
          <Metric title="Waiting -> Closed" value={metrics.quality.waitingClosed} />
          <Metric title="Cierres forzados" value={metrics.quality.forced} />
          <Metric title="Activos sin mov. >12h" value={metrics.quality.stale} />
        </div>
      </Card>

      <Card title="Riesgo / abuso" subtitle="Anonimos repetidos y cancelaciones.">
        <div className="grid gap-3 md:grid-cols-3">
          <Metric icon={ShieldAlert} title="Anonimos activos" value={metrics.risk.anonActive} />
          <Metric icon={AlertTriangle} title="Cancelados" value={metrics.risk.cancelled} />
          <Metric icon={Users} title="Top anonimos" value={metrics.risk.repeatedAnon.length} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            {metrics.risk.repeatedAnon.map((r) => (
              <div key={`ra-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.key}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {metrics.risk.cancelledByUser.map((r) => (
              <div key={`cu-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.key}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Auditoria operativa" subtitle="Eventos recientes del sistema.">
        <div className="space-y-2">
          {metrics.audit.map((e) => (
            <div key={e.id} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-600">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold text-[#2F1A55]">
                  {e.event_type} ({e.actor_role || "-"})
                </div>
                <div className="text-slate-400">{fmt(e.created_at)}</div>
              </div>
              <div>Actor: {nameOf(usersById[e.actor_id])} | Thread: {e.thread_id}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Configuracion operativa" subtitle="Cobertura y estado del equipo.">
        <div className="grid gap-3 md:grid-cols-3">
          <Metric icon={Settings2} title="Categorias" value={metrics.config.categories} />
          <Metric icon={CheckCircle2} title="Macros activas" value={metrics.config.macros} />
          <Metric icon={Users} title="Agentes autorizados" value={metrics.config.authorizedAgents} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
            Sesiones activas: <strong>{metrics.config.sessions}</strong> | Bloqueados:{" "}
            <strong>{metrics.config.blockedAgents}</strong>
          </div>
          <div className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
            Sin macros:{" "}
            <strong>
              {metrics.config.categoriesNoMacro.length
                ? metrics.config.categoriesNoMacro.map((c) => c.label).join(", ")
                : "Cobertura completa"}
            </strong>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <AdminLayout title={title} subtitle={subtitle}>
      <div className="space-y-6">
        <Card
          title={lockedPanel === "tickets" ? "Panel Tickets" : lockedPanel === "catalogo" ? "Catalogo de soporte" : "Control de tickets"}
          subtitle={
            lockedPanel
              ? "Vista basica (default) y avanzada."
              : "Panel Tickets y Catalogo con vista basica (default) y avanzada."
          }
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            {lockedPanel ? <div /> : (
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "tickets", label: "Panel Tickets" },
                  { id: "catalogo", label: "Catalogo" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPanel(p.id);
                      setSelectedPublicId(null);
                    }}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      activePanel === p.id
                        ? "border-[#5E30A5] bg-[#5E30A5] text-white"
                        : "border-[#E9E2F7] bg-white text-[#5E30A5]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => load(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
            >
              <RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />
              Refrescar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "basic", label: "Basica" },
              { id: "advanced", label: "Avanzada" },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() =>
                  setViewByPanel((prev) => ({
                    ...prev,
                    [activePanel]: v.id,
                  }))
                }
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  view === v.id
                    ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                    : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          {error ? (
            <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          ) : null}
        </Card>

        {loading ? (
          <Card title="Cargando..." subtitle="Obteniendo datos de soporte." />
        ) : activePanel === "tickets" ? (
          selected ? (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setSelectedPublicId(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]"
              >
                <ArrowLeft size={14} />
                Volver a tickets activos
              </button>
              <Card
                title={`Flujo de ticket ${selected.public_id}`}
                subtitle="Pasos completados, paso actual y pendientes."
              >
                <div className="grid gap-3 md:grid-cols-2 text-xs text-slate-600">
                  <div className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2">
                    <div className="font-semibold text-[#2F1A55]">{short(selected.summary, 160)}</div>
                    <div>Categoria: {selected.category} | Severidad: {selected.severity}</div>
                    <div>Estado: {STATUS_LABEL[selected.status] || selected.status}</div>
                    <div>Creado: {fmt(selected.created_at)}</div>
                  </div>
                  <div className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2">
                    <div>Asesor: {selected.assigned_agent_id ? nameOf(usersById[selected.assigned_agent_id]) : "Sin asignar"}</div>
                    <div>Origen: {selected.request_origin || "registered"} / {selected.origin_source || "app"}</div>
                    <div>Contacto: {inboxByPublic[selected.public_id]?.contact_display || "-"}</div>
                    <div>Actualizado: {fmt(selected.updated_at)}</div>
                  </div>
                </div>
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max items-center gap-2">
                    {FLOW.map((step, idx) => {
                      const current = selected.status === step;
                      const done = !current && visitedFlow.has(step);
                      return (
                        <React.Fragment key={step}>
                          <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            current
                              ? "border-[#5E30A5] bg-[#5E30A5] text-white"
                              : done
                                ? "border-[#1B7F4B] bg-[#EAF7F0] text-[#1B7F4B]"
                                : "border-[#E2E8F0] bg-[#F8FAFC] text-slate-400"
                          }`}>
                            {STATUS_LABEL[step]}
                          </div>
                          {idx < FLOW.length - 1 ? (
                            <div className={`h-[2px] w-8 ${done || current ? "bg-[#5E30A5]" : "bg-[#E2E8F0]"}`} />
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </Card>
              <Card title="Timeline" subtitle="Eventos del ticket en orden temporal.">
                <div className="space-y-2">
                  {[...selectedTimeline].reverse().map((e) => (
                    <div key={e.id} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-600">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-[#2F1A55]">{e.event_type}</div>
                        <div className="text-slate-400">{fmt(e.created_at)}</div>
                      </div>
                      <div>Actor: {e.actor_role || "-"} / {nameOf(usersById[e.actor_id])}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card
              title="Tickets activos"
              subtitle="Lista de cards horizontales. Click para abrir flujo visual."
            >
              <div className="grid gap-3 md:grid-cols-4">
                <Metric icon={Layers3} title="Activos" value={activeTickets.length} />
                <Metric icon={Clock3} title="En cola" value={activeTickets.filter((t) => t.status === "queued").length} />
                <Metric icon={Users} title="Sin asignar" value={activeTickets.filter((t) => !t.assigned_agent_id).length} />
                <Metric icon={AlertTriangle} title=">48h" value={activeTickets.filter((t) => (hoursAgo(t.created_at) || 0) > 48).length} />
              </div>
              <div className="space-y-2">
                {activeTickets.map((t) => (
                  <button
                    key={t.public_id}
                    type="button"
                    onClick={() => setSelectedPublicId(t.public_id)}
                    className="w-full rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 text-left hover:border-[#CDBAF1]"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{t.public_id}</div>
                        <div className="text-sm font-semibold text-[#2F1A55]">{short(t.summary)}</div>
                        <div className="text-xs text-slate-500">
                          {t.category} | {t.severity} | {STATUS_LABEL[t.status] || t.status}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 md:text-right">
                        <div>Asesor: <strong>{t.assigned_agent_id ? nameOf(usersById[t.assigned_agent_id]) : "Sin asignar"}</strong></div>
                        <div>Origen: <strong>{t.request_origin === "anonymous" ? "Anonimo" : "Registrado"}</strong></div>
                        <div>Creado: {fmt(t.created_at)}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )
        ) : (
          <div className="space-y-5">
            <Card title="Categorias del sistema de soporte" subtitle="Cobertura y volumen por categoria.">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {categoriesStats.map((c) => (
                  <div key={c.id} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm">
                    <div className="font-semibold text-[#2F1A55]">{c.label}</div>
                    <div className="text-xs text-slate-500">{c.description}</div>
                    <div className="mt-1 text-[11px] text-slate-600">
                      Total: {c.total} | Activos: {c.active} | Macros: {c.macros}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Plantillas de mensajes (macros)" subtitle="Vista operativa de plantillas.">
              <div className="grid gap-3 md:grid-cols-3">
                <Metric title="Macros totales" value={macros.length} />
                <Metric title="Macros activas" value={macros.filter((m) => m.active !== false).length} />
                <Metric title="Categorias cubiertas" value={new Set(macros.map((m) => m.category).filter(Boolean)).size} />
              </div>
              <div className="space-y-2">
                {(macros.length ? macros : SUPPORT_MACROS).slice(0, 80).map((m) => (
                  <div key={m.id} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="font-semibold text-[#2F1A55]">{m.title}</div>
                      <div className="text-slate-500">{m.category || "general"} | {m.status || "-"}</div>
                    </div>
                    <div className="mt-1 text-xs text-slate-600">{short(m.body, 180)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {view === "advanced" && !loading ? renderAdvanced() : null}
      </div>
    </AdminLayout>
  );
}
