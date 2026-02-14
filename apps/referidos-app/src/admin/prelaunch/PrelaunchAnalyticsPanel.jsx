import React, { useMemo, useState } from "react";
import { BarChart3, Clock3, RefreshCw, ShieldAlert, Ticket, Users } from "lucide-react";
import Table from "../../components/ui/Table";
import { usePrelaunchMetrics } from "./hooks/usePrelaunchMetrics";

const RANGE_OPTIONS = [
  { value: 1, label: "24 horas" },
  { value: 7, label: "7 dias" },
  { value: 14, label: "14 dias" },
  { value: 30, label: "30 dias" },
  { value: 60, label: "60 dias" },
  { value: 90, label: "90 dias" },
];

const CHANNEL_OPTIONS = [
  { value: "", label: "Todos los canales" },
  { value: "prelaunch_web", label: "Prelaunch Web" },
  { value: "pwa_web", label: "PWA Web" },
  { value: "android", label: "Android" },
];

const TABS = [
  { id: "overview", label: "Resumen" },
  { id: "funnel", label: "Funnel" },
  { id: "waitlist", label: "Waitlist" },
  { id: "tickets", label: "Tickets" },
  { id: "risk", label: "Riesgo" },
];

const WAITLIST_ROLE_LABELS = {
  cliente: "Cliente",
  negocio: "Negocio",
};

const WAITLIST_STATUS_LABELS = {
  pending_confirm: "Pendiente confirmacion",
  active: "Activo",
  unsubscribed: "Desuscrito",
  blocked: "Bloqueado",
};

const SUPPORT_STATUS_LABELS = {
  new: "Nuevo",
  assigned: "Asignado",
  in_progress: "En progreso",
  waiting_user: "Esperando usuario",
  queued: "En cola",
  closed: "Cerrado",
  cancelled: "Cancelado",
};

const SUPPORT_SEVERITY_LABELS = {
  s0: "S0 Critico",
  s1: "S1 Alto",
  s2: "S2 Medio",
  s3: "S3 Bajo",
};

const SUPPORT_CATEGORY_LABELS = {
  acceso: "Acceso / Cuenta",
  verificacion: "Verificacion",
  qr: "QR / Escaner",
  promos: "Promociones",
  negocios_sucursales: "Negocios / Sucursales",
  pagos_plan: "Pagos / Plan",
  reporte_abuso: "Reporte de abuso",
  bug_performance: "Bug / performance",
  sugerencia: "Sugerencia",
  tier_beneficios: "Tier / beneficios",
  borrar_correo_waitlist: "Borrar correo waitlist",
};

function formatNumber(value) {
  return Number(value || 0).toLocaleString("es-EC");
}

function formatPercent(value) {
  const pct = Number(value || 0) * 100;
  return `${pct.toFixed(1)}%`;
}

function formatDateTime(iso) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateRiskId(value) {
  const safe = String(value || "");
  if (safe.length <= 14) return safe;
  return `${safe.slice(0, 6)}...${safe.slice(-6)}`;
}

function StatCard({ icon: Icon, title, value, helper }) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Icon size={15} />
        {title}
      </div>
      <div className="mt-3 text-2xl font-bold text-[#2F1A55]">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{helper}</div>
    </div>
  );
}

function BreakdownList({ title, rows, labelResolver }) {
  const max = rows.reduce((acc, item) => Math.max(acc, Number(item.count || 0)), 1);

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-[#2F1A55]">{title}</div>
      <div className="mt-4 space-y-3">
        {rows.map((row) => {
          const count = Number(row.count || 0);
          const label = labelResolver(row);
          const pct = Math.max(4, Math.round((count / max) * 100));
          return (
            <div key={label} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{label}</span>
                <span className="font-semibold text-[#2F1A55]">{formatNumber(count)}</span>
              </div>
              <div className="h-2 rounded-full bg-[#F1ECFB]">
                <div
                  className="h-2 rounded-full bg-[#5E30A5]/70"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PrelaunchAnalyticsPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const {
    filters,
    setFilters,
    loading,
    refreshing,
    error,
    metrics,
    summary,
    lastUpdatedAt,
    reload,
  } = usePrelaunchMetrics();

  const funnel = metrics?.funnel || {};
  const eventBreakdown = metrics?.event_breakdown || {};
  const waitlistBreakdown = metrics?.waitlist_breakdown || {};
  const supportBreakdown = metrics?.support_breakdown || {};
  const timeline = metrics?.timeline || [];
  const topIpRisk = metrics?.top_ip_risk || [];

  const channelLabel = useMemo(() => {
    const found = CHANNEL_OPTIONS.find((item) => item.value === filters.appChannel);
    return found?.label || "Canal personalizado";
  }, [filters.appChannel]);

  const handleReload = () => {
    reload({ silent: true });
  };

  const hasData = !loading && !error;

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={Users}
          title="Visitantes unicos"
          value={formatNumber(summary.unique_visitors)}
          helper="Con actividad en el rango"
        />
        <StatCard
          icon={Users}
          title="Visitantes nuevos"
          value={formatNumber(summary.new_visitors)}
          helper="Primer contacto en el rango"
        />
        <StatCard
          icon={Users}
          title="Visitantes recurrentes"
          value={formatNumber(summary.recurrent_visitors)}
          helper="Ya habian entrado antes"
        />
        <StatCard
          icon={BarChart3}
          title="Waitlist submits"
          value={formatNumber(summary.waitlist_submits)}
          helper="Registros confirmados por endpoint"
        />
        <StatCard
          icon={BarChart3}
          title="Conversion waitlist"
          value={formatPercent(summary.waitlist_conversion)}
          helper="Waitlist / visitantes unicos"
        />
        <StatCard
          icon={Ticket}
          title="Tickets anonimos"
          value={formatNumber(summary.support_tickets_created)}
          helper="Creados desde prelaunch"
        />
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold text-[#2F1A55]">Funnel rapido</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Page Views", funnel.page_view || 0],
            ["Abrio waitlist", funnel.cta_waitlist_open || 0],
            ["Submit waitlist", funnel.waitlist_submit || 0],
            ["Ticket soporte", funnel.support_ticket_created || 0],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] p-3"
            >
              <div className="text-lg font-bold text-[#5E30A5]">{formatNumber(value)}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <Table
        columns={[
          { key: "day", label: "Dia" },
          { key: "unique", label: "Visitantes", align: "right" },
          { key: "page_views", label: "Page views", align: "right" },
          { key: "waitlist", label: "Waitlist", align: "right" },
          { key: "tickets", label: "Tickets", align: "right" },
        ]}
      >
        {timeline.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-xs text-slate-400">
              Sin datos de timeline para el rango seleccionado.
            </td>
          </tr>
        ) : (
          timeline.map((row) => (
            <tr key={row.day} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3 text-slate-700">{row.day}</td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.unique_visitors)}
              </td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.page_views)}
              </td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.waitlist_submits)}
              </td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.support_tickets_created)}
              </td>
            </tr>
          ))
        )}
      </Table>
    </div>
  );

  const renderFunnel = () => {
    const rows = Object.entries(eventBreakdown).map(([eventType, count]) => ({
      eventType,
      count: Number(count || 0),
    }));
    const max = rows.reduce((acc, item) => Math.max(acc, item.count), 1);
    return (
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-[#2F1A55]">Eventos prelaunch</div>
        <div className="mt-4 space-y-3">
          {rows.map((row) => (
            <div key={row.eventType} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{row.eventType}</span>
                <span className="font-semibold text-[#2F1A55]">{formatNumber(row.count)}</span>
              </div>
              <div className="h-2 rounded-full bg-[#F1ECFB]">
                <div
                  className="h-2 rounded-full bg-[#5E30A5]/70"
                  style={{ width: `${Math.max(4, Math.round((row.count / max) * 100))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWaitlist = () => (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <BreakdownList
          title="Waitlist por rol"
          rows={waitlistBreakdown.by_role || []}
          labelResolver={(row) => WAITLIST_ROLE_LABELS[row.role_intent] || row.role_intent}
        />
        <BreakdownList
          title="Waitlist por estado"
          rows={waitlistBreakdown.by_status || []}
          labelResolver={(row) => WAITLIST_STATUS_LABELS[row.status] || row.status}
        />
      </div>

      <Table
        columns={[
          { key: "source", label: "Origen / Campaign" },
          { key: "count", label: "Registros", align: "right" },
        ]}
      >
        {(waitlistBreakdown.top_sources || []).length === 0 ? (
          <tr>
            <td colSpan={2} className="px-4 py-6 text-center text-xs text-slate-400">
              Sin fuentes registradas en el rango.
            </td>
          </tr>
        ) : (
          (waitlistBreakdown.top_sources || []).map((row) => (
            <tr key={row.source} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3 text-slate-700">{row.source}</td>
              <td className="px-4 py-3 text-right font-semibold text-[#2F1A55]">
                {formatNumber(row.count)}
              </td>
            </tr>
          ))
        )}
      </Table>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <BreakdownList
          title="Tickets por estado"
          rows={supportBreakdown.by_status || []}
          labelResolver={(row) => SUPPORT_STATUS_LABELS[row.status] || row.status}
        />
        <BreakdownList
          title="Tickets por severidad"
          rows={supportBreakdown.by_severity || []}
          labelResolver={(row) => SUPPORT_SEVERITY_LABELS[row.severity] || row.severity}
        />
      </div>

      <Table
        columns={[
          { key: "category", label: "Categoria" },
          { key: "count", label: "Tickets", align: "right" },
        ]}
      >
        {(supportBreakdown.by_category || []).filter((row) => Number(row.count || 0) > 0).length ===
        0 ? (
          <tr>
            <td colSpan={2} className="px-4 py-6 text-center text-xs text-slate-400">
              Sin tickets anonimos para mostrar en este rango.
            </td>
          </tr>
        ) : (
          (supportBreakdown.by_category || [])
            .filter((row) => Number(row.count || 0) > 0)
            .sort((a, b) => Number(b.count || 0) - Number(a.count || 0))
            .map((row) => (
              <tr key={row.category} className="hover:bg-[#FAF8FF]">
                <td className="px-4 py-3 text-slate-700">
                  {SUPPORT_CATEGORY_LABELS[row.category] || row.category}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-[#2F1A55]">
                  {formatNumber(row.count)}
                </td>
              </tr>
            ))
        )}
      </Table>
    </div>
  );

  const renderRisk = () => (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
          <ShieldAlert size={16} />
          Top IP Risk IDs
        </div>
        <div className="mt-2 text-xs text-slate-500">
          Conteo de actividad por hash de riesgo (sin exponer IP real).
        </div>
      </div>

      <Table
        columns={[
          { key: "id", label: "Risk ID" },
          { key: "count", label: "Eventos", align: "right" },
        ]}
      >
        {topIpRisk.length === 0 ? (
          <tr>
            <td colSpan={2} className="px-4 py-6 text-center text-xs text-slate-400">
              Sin actividad de riesgo en el rango.
            </td>
          </tr>
        ) : (
          topIpRisk.map((row) => (
            <tr key={row.ip_risk_id} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3 font-mono text-xs text-slate-700">
                {truncateRiskId(row.ip_risk_id)}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-[#2F1A55]">
                {formatNumber(row.count)}
              </td>
            </tr>
          ))
        )}
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Rango
              </div>
              <select
                value={filters.days}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, days: Number(event.target.value) }))
                }
                className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#BFA8E6]"
              >
                {RANGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Canal
              </div>
              <select
                value={filters.appChannel}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, appChannel: event.target.value }))
                }
                className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#BFA8E6]"
              >
                {CHANNEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-[#EEE7FA] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-500">
              Canal activo: <span className="font-semibold text-[#2F1A55]">{channelLabel}</span>
            </div>
            <button
              type="button"
              onClick={handleReload}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#2F1A55] disabled:opacity-60"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Clock3 size={13} />
          Ultima actualizacion: {formatDateTime(lastUpdatedAt)}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                active
                  ? "bg-[#5E30A5] text-white"
                  : "border border-[#E9E2F7] bg-white text-slate-600 hover:bg-[#F8F4FF]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-sm text-slate-500">
          Cargando metricas de prelaunch...
        </div>
      ) : null}

      {hasData && activeTab === "overview" ? renderOverview() : null}
      {hasData && activeTab === "funnel" ? renderFunnel() : null}
      {hasData && activeTab === "waitlist" ? renderWaitlist() : null}
      {hasData && activeTab === "tickets" ? renderTickets() : null}
      {hasData && activeTab === "risk" ? renderRisk() : null}
    </div>
  );
}

