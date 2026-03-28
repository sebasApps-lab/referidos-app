import { useMemo, useState } from "react";
import { Clock3, RefreshCw, ShieldAlert } from "lucide-react";
import Table from "../../components/ui/Table";
import SvgMetricAverageCard from "./components/SvgMetricAverageCard";
import SvgMetricCompareCard from "./components/SvgMetricCompareCard";
import SvgMetricLineCard from "./components/SvgMetricLineCard";
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
  { id: "engagement", label: "Interacciones" },
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

const SECTION_LABELS = {
  hero: "Hero",
  waitlist_steps: "Pasos",
  waitlist_form: "Formulario waitlist",
  contact_block: "Bloque contacto",
  footer: "Footer",
};

const MODAL_LABELS = {
  business_interest: "Modal negocios",
  platform: "Modal plataforma",
  team: "Modal quiénes somos",
  invitation: "Modal invitación",
  congrats: "Modal felicitaciones",
};

function formatNumber(value) {
  return Number(value || 0).toLocaleString("es-EC");
}

function formatPercent(value) {
  const pct = Number(value || 0) * 100;
  return `${pct.toFixed(1)}%`;
}

function formatSeconds(value) {
  return `${Number(value || 0).toFixed(1)} s`;
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

function formatDayLabel(day) {
  return String(day || "").slice(5);
}

function BreakdownList({ title, rows, labelResolver, valueResolver = (row) => row.count }) {
  const max = rows.reduce((acc, item) => Math.max(acc, Number(valueResolver(item) || 0)), 1);

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-[#2F1A55]">{title}</div>
      <div className="mt-4 space-y-3">
        {rows.map((row) => {
          const count = Number(valueResolver(row) || 0);
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
  const engagement = metrics?.engagement || {};
  const timeline = metrics?.timeline || [];
  const periodAverages = metrics?.period_averages || {};
  const comparisons = metrics?.comparisons || {};
  const topIpRisk = metrics?.top_ip_risk || [];

  const channelLabel = useMemo(() => {
    const found = CHANNEL_OPTIONS.find((item) => item.value === filters.appChannel);
    return found?.label || "Canal personalizado";
  }, [filters.appChannel]);

  const lineSeries = useMemo(
    () => ({
      unique: timeline.map((row) => ({ label: formatDayLabel(row.day), value: row.unique_visitors })),
      newVisitors: timeline.map((row) => ({ label: formatDayLabel(row.day), value: row.new_visitors })),
      recurrent: timeline.map((row) => ({ label: formatDayLabel(row.day), value: row.recurrent_visitors })),
      pageViews: timeline.map((row) => ({ label: formatDayLabel(row.day), value: row.page_views })),
      ctaClicks: timeline.map((row) => ({ label: formatDayLabel(row.day), value: row.cta_waitlist_clicks })),
      waitlist: timeline.map((row) => ({ label: formatDayLabel(row.day), value: row.waitlist_submits })),
      tickets: timeline.map((row) => ({ label: formatDayLabel(row.day), value: row.support_tickets_created })),
      avgTime: timeline.map((row) => ({
        label: formatDayLabel(row.day),
        value: row.avg_time_on_page_seconds,
      })),
    }),
    [timeline],
  );

  const modalAverageCards = useMemo(
    () => (periodAverages.modal_daily_unique_viewers || []).slice(0, 4),
    [periodAverages.modal_daily_unique_viewers],
  );
  const maxModalAverage = useMemo(
    () =>
      modalAverageCards.reduce(
        (max, item) => Math.max(max, Number(item.average_daily_unique_viewers || 0)),
        1,
      ),
    [modalAverageCards],
  );

  const eventRows = useMemo(
    () =>
      Object.entries(eventBreakdown).map(([eventType, count]) => ({
        eventType,
        count: Number(count || 0),
      })),
    [eventBreakdown],
  );

  const handleReload = () => {
    reload({ silent: true });
  };

  const hasData = !loading && !error;

  const renderOverview = () => (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">Series diarias naturales</h3>
          <p className="text-xs text-slate-500">
            Cada gráfico usa el rango seleccionado y ajusta su amplitud según los valores
            reales del período.
          </p>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <SvgMetricLineCard
            title="Visitantes únicos"
            value={formatNumber(summary.unique_visitors)}
            helper="Únicos por día en el rango"
            data={lineSeries.unique}
          />
          <SvgMetricLineCard
            title="Visitantes nuevos"
            value={formatNumber(summary.new_visitors)}
            helper="Primer contacto en cada día"
            data={lineSeries.newVisitors}
            color="#2D7FF9"
          />
          <SvgMetricLineCard
            title="Visitantes recurrentes"
            value={formatNumber(summary.recurrent_visitors)}
            helper="Ya habían aparecido antes del día"
            data={lineSeries.recurrent}
            color="#2563EB"
          />
          <SvgMetricLineCard
            title="Page views"
            value={formatNumber(funnel.page_view || 0)}
            helper="Carga efectiva de la landing"
            data={lineSeries.pageViews}
            color="#7C3AED"
          />
          <SvgMetricLineCard
            title="CTA clicks"
            value={formatNumber(funnel.cta_waitlist_open || 0)}
            helper="Clicks que llevan al formulario"
            data={lineSeries.ctaClicks}
            color="#0F766E"
          />
          <SvgMetricLineCard
            title="Waitlist submits"
            value={formatNumber(summary.waitlist_submits)}
            helper="Submits exitosos del endpoint"
            data={lineSeries.waitlist}
            color="#C2410C"
          />
          <SvgMetricLineCard
            title="Tickets soporte"
            value={formatNumber(summary.support_tickets_created)}
            helper="Tickets anónimos creados desde prelaunch"
            data={lineSeries.tickets}
            color="#B91C1C"
          />
          <SvgMetricLineCard
            title="Tiempo medio en landing"
            value={formatSeconds(summary.avg_time_on_page_seconds)}
            helper="Promedio diario calculado desde page leave"
            data={lineSeries.avgTime}
            color="#0F172A"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">Snapshots y comparaciones</h3>
          <p className="text-xs text-slate-500">
            Para métricas que no son series diarias naturales, se comparan contra un referente
            del mismo período.
          </p>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          <SvgMetricCompareCard
            title="Conectados vs pico"
            leftLabel={comparisons.connected_vs_peak?.current_label || "Actual"}
            leftValue={comparisons.connected_vs_peak?.current || 0}
            rightLabel={comparisons.connected_vs_peak?.reference_label || "Pico"}
            rightValue={comparisons.connected_vs_peak?.reference || 0}
            helper={`Ventana activa: últimos ${formatNumber(summary.connected_window_minutes)} min`}
          />
          <SvgMetricCompareCard
            title="Waitlist vs visitantes"
            leftLabel={comparisons.waitlist_vs_visitors?.current_label || "Waitlist"}
            leftValue={comparisons.waitlist_vs_visitors?.current || 0}
            rightLabel={comparisons.waitlist_vs_visitors?.reference_label || "Visitantes"}
            rightValue={comparisons.waitlist_vs_visitors?.reference || 0}
            helper={`Conversión del período: ${formatPercent(summary.waitlist_conversion)}`}
            leftColor="#C2410C"
            rightColor="#F3D6BF"
          />
          <SvgMetricCompareCard
            title="Feedback vs soporte"
            leftLabel={comparisons.feedback_vs_support?.current_label || "Feedback"}
            leftValue={comparisons.feedback_vs_support?.current || 0}
            rightLabel={comparisons.feedback_vs_support?.reference_label || "Tickets"}
            rightValue={comparisons.feedback_vs_support?.reference || 0}
            helper="Compara mensajes voluntarios contra solicitudes de soporte"
            leftColor="#0F766E"
            rightColor="#BFE6DE"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">Promedios del período</h3>
          <p className="text-xs text-slate-500">
            Promedios generales del rango seleccionado, no por día.
          </p>
        </div>
        <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-4">
          <SvgMetricAverageCard
            title="Tiempo promedio en landing"
            value={summary.avg_time_on_page_seconds}
            valueLabel={formatSeconds(summary.avg_time_on_page_seconds)}
            maxValue={Math.max(...lineSeries.avgTime.map((item) => Number(item.value || 0)), 1)}
            helper="Promedio total sobre todos los eventos de salida"
          />
          <SvgMetricAverageCard
            title="CTA clicks / día"
            value={periodAverages.avg_cta_clicks_per_day || 0}
            valueLabel={formatNumber(periodAverages.avg_cta_clicks_per_day || 0)}
            maxValue={Math.max(...lineSeries.ctaClicks.map((item) => Number(item.value || 0)), 1)}
            helper="Promedio diario de intención de registro"
            accentColor="#0F766E"
          />
          <SvgMetricAverageCard
            title="Clicks en enlaces / día"
            value={periodAverages.avg_link_clicks_per_day || 0}
            valueLabel={formatNumber(periodAverages.avg_link_clicks_per_day || 0)}
            maxValue={Math.max(...lineSeries.pageViews.map((item) => Number(item.value || 0)), 1)}
            helper="Promedio diario de navegación interna y share"
            accentColor="#2563EB"
          />
          <SvgMetricAverageCard
            title="Vistas de modal / día"
            value={periodAverages.avg_modal_views_per_day || 0}
            valueLabel={formatNumber(periodAverages.avg_modal_views_per_day || 0)}
            maxValue={Math.max(...timeline.map((item) => Number(item.modal_views || 0)), 1)}
            helper="Promedio diario de aperturas de modal"
            accentColor="#C2410C"
          />
          {modalAverageCards.map((modal) => (
            <SvgMetricAverageCard
              key={modal.modal_id}
              title={`${MODAL_LABELS[modal.modal_id] || modal.modal_id} / día`}
              value={modal.average_daily_unique_viewers || 0}
              valueLabel={formatNumber(modal.average_daily_unique_viewers || 0)}
              maxValue={maxModalAverage}
              helper={`Usuarios únicos promedio que lo ven por día (${formatNumber(modal.views)} vistas totales)`}
              accentColor="#7C3AED"
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderFunnel = () => {
    const max = eventRows.reduce((acc, item) => Math.max(acc, item.count), 1);
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-[#2F1A55]">Eventos prelaunch</div>
          <div className="mt-4 space-y-3">
            {eventRows.map((row) => (
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

        <div className="grid gap-4 xl:grid-cols-2">
          <SvgMetricLineCard
            title="Page views"
            value={formatNumber(funnel.page_view || 0)}
            helper="Serie diaria de entrada al funnel"
            data={lineSeries.pageViews}
          />
          <SvgMetricLineCard
            title="CTA clicks"
            value={formatNumber(funnel.cta_waitlist_open || 0)}
            helper="Serie diaria de clicks al form"
            data={lineSeries.ctaClicks}
            color="#0F766E"
          />
          <SvgMetricLineCard
            title="Waitlist submits"
            value={formatNumber(funnel.waitlist_submit || 0)}
            helper="Serie diaria de submit exitoso"
            data={lineSeries.waitlist}
            color="#C2410C"
          />
          <SvgMetricLineCard
            title="Tickets soporte"
            value={formatNumber(funnel.support_ticket_created || 0)}
            helper="Serie diaria de tickets creados"
            data={lineSeries.tickets}
            color="#B91C1C"
          />
        </div>
      </div>
    );
  };

  const renderEngagement = () => (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-3">
        <BreakdownList
          title="Secciones alcanzadas"
          rows={engagement.sections || []}
          labelResolver={(row) => SECTION_LABELS[row.section_id] || row.section_id}
        />
        <BreakdownList
          title="Vistas de modales"
          rows={engagement.modals || []}
          labelResolver={(row) => MODAL_LABELS[row.modal_id] || row.modal_id}
          valueResolver={(row) => row.views}
        />
        <BreakdownList
          title="Usuarios conectados vs promedio diario"
          rows={[
            {
              key: "connected",
              label: "Conectados ahora",
              count: summary.connected_visitors,
            },
            {
              key: "average",
              label: "Promedio diario de visitantes",
              count: summary.average_daily_unique_visitors,
            },
          ]}
          labelResolver={(row) => row.label}
        />
      </div>

      <Table
        columns={[
          { key: "modal", label: "Modal" },
          { key: "views", label: "Vistas", align: "right" },
          { key: "unique", label: "Únicos", align: "right" },
          { key: "avg_daily", label: "Promedio diario", align: "right" },
          { key: "closes", label: "Cierres", align: "right" },
        ]}
      >
        {(engagement.modals || []).length === 0 ? (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-xs text-slate-400">
              Sin vistas de modales en el rango.
            </td>
          </tr>
        ) : (
          (engagement.modals || []).map((row) => (
            <tr key={row.modal_id} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3 text-slate-700">
                {MODAL_LABELS[row.modal_id] || row.modal_id}
              </td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.views)}
              </td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.unique_viewers)}
              </td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.average_daily_unique_viewers)}
              </td>
              <td className="px-4 py-3 text-right text-slate-600">
                {formatNumber(row.closes)}
              </td>
            </tr>
          ))
        )}
      </Table>

      <Table
        columns={[
          { key: "link", label: "Enlace / acción" },
          { key: "target", label: "Destino" },
          { key: "kind", label: "Tipo" },
          { key: "count", label: "Clicks", align: "right" },
        ]}
      >
        {(engagement.links || []).length === 0 ? (
          <tr>
            <td colSpan={4} className="px-4 py-6 text-center text-xs text-slate-400">
              Sin clicks en enlaces en el rango.
            </td>
          </tr>
        ) : (
          (engagement.links || []).map((row) => (
            <tr key={row.link_id} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3 text-slate-700">{row.label || row.link_id}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-500">
                {row.target_path || "-"}
              </td>
              <td className="px-4 py-3 text-slate-600">{row.target_kind || "-"}</td>
              <td className="px-4 py-3 text-right font-semibold text-[#2F1A55]">
                {formatNumber(row.count)}
              </td>
            </tr>
          ))
        )}
      </Table>
    </div>
  );

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
      {hasData && activeTab === "engagement" ? renderEngagement() : null}
      {hasData && activeTab === "waitlist" ? renderWaitlist() : null}
      {hasData && activeTab === "tickets" ? renderTickets() : null}
      {hasData && activeTab === "risk" ? renderRisk() : null}
    </div>
  );
}
