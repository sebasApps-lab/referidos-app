import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, RefreshCw, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchDlqPurgePreview } from "./services/opsTelemetryDlqService";

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
  });
}

function formatCompactDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("es-EC", {
    timeZone: "America/Guayaquil",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBytes(bytes) {
  if (bytes === null || bytes === undefined || bytes === "") return "N/D";
  const value = Number(bytes || 0);
  if (!Number.isFinite(value) || value <= 0) return "0 B";
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KB`;
  if (value < 1024 ** 3) return `${(value / (1024 ** 2)).toFixed(1)} MB`;
  return `${(value / (1024 ** 3)).toFixed(1)} GB`;
}

function labelOrFallback(value, fallback) {
  return String(value || "").trim() || fallback;
}

function GroupCard({ group, onOpen }) {
  const title = labelOrFallback(group.reason, "Sin motivo reportado");
  const domain = labelOrFallback(group.domain, "Sin dominio");
  const sourceProject = labelOrFallback(group.source_project_ref, "Sin proyecto");
  const sourceEnv = labelOrFallback(group.source_env_key, "Sin entorno");

  return (
    <button
      type="button"
      onClick={() => onOpen(group.group_key)}
      className="group w-full rounded-2xl border border-[#F1DCCB] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#E9C29F] hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#7A3510]">{title}</div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
            <span>Dominio: {domain}</span>
            <span>Proyecto: {sourceProject}</span>
            <span>Entorno: {sourceEnv}</span>
          </div>
        </div>
        <div className="rounded-2xl bg-[#FFF3E8] px-3 py-2 text-right">
          <div className="text-lg font-extrabold text-[#9A3412]">{Number(group.event_count || 0)}</div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Eventos</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>Peso aprox: {formatBytes(group.approx_raw_event_bytes)}</span>
        <span>Mas antiguo: {formatCompactDateTime(group.first_created_at)}</span>
        <span>Ultimo: {formatCompactDateTime(group.last_created_at)}</span>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#9A3412]">
        Ver eventos
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}

export default function OpsTelemetryDlqPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);
  const [groups, setGroups] = useState([]);

  const reload = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const data = await fetchDlqPurgePreview({ limit: 12 });
      setSummary(data?.summary || null);
      setGroups(Array.isArray(data?.groups) ? data.groups : []);
    } catch (err) {
      setError(err?.message || "No se pudo cargar la previsualizacion del borrado de errores.");
    } finally {
      if (silent) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const headline = useMemo(() => ({
    totalEvents: Number(summary?.total_events || 0),
    totalGroups: Number(summary?.total_groups || 0),
    totalBytes: Number(summary?.approx_raw_event_bytes || 0),
    nextPurgeAt: summary?.next_purge_at || "",
  }), [summary]);

  const openGroup = (groupKey = "") => {
    const search = new URLSearchParams();
    if (groupKey) {
      search.set("group", groupKey);
    }
    navigate(`/admin/dashboard/telemetry-dlq${search.toString() ? `?${search.toString()}` : ""}`);
  };

  return (
    <section className="rounded-3xl border border-[#F1DCCB] bg-[#FFF8F2] p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A3412]">
            <Trash2 size={12} />
            Borrado DLQ
          </div>
          <h3 className="mt-3 text-2xl font-extrabold text-[#7C2D12]">
            Errores que se borran en el siguiente ciclo
          </h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Vista previa de los eventos fallidos de telemetria que ya cumplieron la retencion y se
            eliminaran en el siguiente purge automatico de OPS.
          </p>
        </div>

        <button
          type="button"
          onClick={() => reload({ silent: true })}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 self-start rounded-2xl border border-[#E9C29F] bg-white px-4 py-2 text-sm font-semibold text-[#7C2D12] disabled:opacity-60"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-4 rounded-2xl border border-[#F1DCCB] bg-white p-6 text-sm text-slate-500">
          Cargando previsualizacion de purge...
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-[#F1DCCB] bg-white p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Siguiente purge</div>
              <div className="mt-2 text-sm font-semibold text-[#7C2D12]">
                {headline.nextPurgeAt ? formatDateTime(headline.nextPurgeAt) : "Sin programacion"}
              </div>
            </div>
            <div className="rounded-2xl border border-[#F1DCCB] bg-white p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Eventos</div>
              <div className="mt-2 text-2xl font-extrabold text-[#7C2D12]">{headline.totalEvents}</div>
            </div>
            <div className="rounded-2xl border border-[#F1DCCB] bg-white p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Grupos</div>
              <div className="mt-2 text-2xl font-extrabold text-[#7C2D12]">{headline.totalGroups}</div>
            </div>
            <div className="rounded-2xl border border-[#F1DCCB] bg-white p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Peso aprox</div>
              <div className="mt-2 text-2xl font-extrabold text-[#7C2D12]">{formatBytes(headline.totalBytes)}</div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C2D12]">
              <AlertTriangle size={16} />
              Grupos principales listos para borrado
            </div>
            <button
              type="button"
              onClick={() => openGroup("")}
              className="text-sm font-semibold text-[#9A3412]"
            >
              Ver todos los eventos
            </button>
          </div>

          {groups.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-[#F1DCCB] bg-white p-5 text-sm text-slate-500">
              No hay eventos de DLQ programados para el siguiente ciclo de borrado.
            </div>
          ) : (
            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              {groups.map((group) => (
                <GroupCard
                  key={group.group_key}
                  group={group}
                  onOpen={openGroup}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
