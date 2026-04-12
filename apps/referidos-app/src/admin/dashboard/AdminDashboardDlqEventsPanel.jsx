import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchDlqPurgeEvents } from "./services/opsTelemetryDlqService";

const PAGE_SIZE = 25;

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("es-EC", {
    timeZone: "America/Guayaquil",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function labelOrFallback(value, fallback) {
  return String(value || "").trim() || fallback;
}

function EventCard({ event }) {
  return (
    <article className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-sm font-semibold text-[#2F1A55]">
            {labelOrFallback(event.reason, "Sin motivo reportado")}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
            <span>Dominio: {labelOrFallback(event.domain, "Sin dominio")}</span>
            <span>Proyecto: {labelOrFallback(event.source_project_ref, "Sin proyecto")}</span>
            <span>Entorno: {labelOrFallback(event.source_env_key, "Sin entorno")}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F8F4FF] px-3 py-2 text-xs text-slate-600">
          <div>Creado: {formatDateTime(event.created_at)}</div>
          <div className="mt-1">Expira: {formatDateTime(event.expires_at)}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <div className="font-semibold text-slate-700">source_event_key</div>
        <div className="mt-1 break-all">{labelOrFallback(event.source_event_key, "Sin source_event_key")}</div>
      </div>

      <details className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#5E30A5]">
          Ver payload raw_event
        </summary>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-3 text-xs text-slate-100">
          {JSON.stringify(event.raw_event || {}, null, 2)}
        </pre>
      </details>
    </article>
  );
}

export default function AdminDashboardDlqEventsPanel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const groupKey = String(searchParams.get("group") || "").trim();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPurgeAt, setNextPurgeAt] = useState("");
  const [page, setPage] = useState(0);

  const loadEvents = useCallback(async ({ silent = false, targetPage = 0 } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const data = await fetchDlqPurgeEvents({
        groupKey,
        limit: PAGE_SIZE,
        offset: targetPage * PAGE_SIZE,
      });
      setEvents(Array.isArray(data?.events) ? data.events : []);
      setTotalCount(Number(data?.total_count || 0));
      setNextPurgeAt(String(data?.next_purge_at || "").trim());
      setPage(targetPage);
    } catch (err) {
      setError(err?.message || "No se pudieron cargar los eventos pendientes de purge.");
    } finally {
      if (silent) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [groupKey]);

  useEffect(() => {
    loadEvents({ targetPage: 0 });
  }, [loadEvents]);

  const currentGroupMeta = useMemo(() => {
    if (!events.length) return null;
    return {
      reason: labelOrFallback(events[0].reason, "Sin motivo reportado"),
      domain: labelOrFallback(events[0].domain, "Sin dominio"),
      sourceProject: labelOrFallback(events[0].source_project_ref, "Sin proyecto"),
      sourceEnv: labelOrFallback(events[0].source_env_key, "Sin entorno"),
    };
  }, [events]);

  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E30A5]"
            >
              <ArrowLeft size={16} />
              Volver al dashboard
            </button>
            <h2 className="mt-3 text-2xl font-extrabold text-[#2F1A55]">
              Eventos listos para borrado
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {groupKey
                ? "Vista detallada del grupo seleccionado para el siguiente purge."
                : "Vista completa de todos los eventos que se eliminaran en el siguiente purge."}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>Siguiente purge: {nextPurgeAt ? formatDateTime(nextPurgeAt) : "-"}</span>
              <span>Total eventos: {totalCount}</span>
              {groupKey ? <span>Filtro por grupo activo</span> : null}
            </div>
            {currentGroupMeta ? (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>Motivo: {currentGroupMeta.reason}</span>
                <span>Dominio: {currentGroupMeta.domain}</span>
                <span>Proyecto: {currentGroupMeta.sourceProject}</span>
                <span>Entorno: {currentGroupMeta.sourceEnv}</span>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => loadEvents({ silent: true, targetPage: page })}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 self-start rounded-2xl border border-[#E9E2F7] bg-white px-4 py-2 text-sm font-semibold text-[#2F1A55] disabled:opacity-60"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-sm text-slate-500 shadow-sm">
          Cargando eventos...
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-sm text-slate-500 shadow-sm">
          No hay eventos programados para el siguiente ciclo de borrado con el filtro actual.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-500">
              Pagina {page + 1} de {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadEvents({ silent: true, targetPage: page - 1 })}
                disabled={page <= 0 || refreshing}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E9E2F7] px-3 py-2 text-sm font-semibold text-[#2F1A55] disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                Anterior
              </button>
              <button
                type="button"
                onClick={() => loadEvents({ silent: true, targetPage: page + 1 })}
                disabled={page + 1 >= totalPages || refreshing}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E9E2F7] px-3 py-2 text-sm font-semibold text-[#2F1A55] disabled:opacity-50"
              >
                Siguiente
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
