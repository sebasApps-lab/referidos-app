import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";

const LEVEL_VARIANT = {
  fatal: "bg-red-100 text-red-700",
  error: "bg-red-100 text-red-700",
  warn: "bg-amber-100 text-amber-700",
  info: "bg-slate-100 text-slate-700",
  debug: "bg-slate-100 text-slate-700",
};

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("es-EC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function supportActorLabel(log) {
  const userRef = log?.user_ref && typeof log.user_ref === "object" ? log.user_ref : {};
  const publicUserId =
    typeof userRef.public_user_id === "string" ? userRef.public_user_id.trim() : "";
  if (publicUserId) return publicUserId;
  if (log?.user_id) return `user:${String(log.user_id).slice(0, 8)}`;
  return "anonimo";
}

function compactMessage(message) {
  const text = String(message || "").trim();
  if (!text) return "-";
  return text.length > 120 ? `${text.slice(0, 120)}...` : text;
}

export default function LogsTable() {
  const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("support_log_events")
      .select(
        "id, level, category, message, occurred_at, created_at, route, source, app_id, user_id, thread_id, user_ref",
      )
      .order("occurred_at", { ascending: false })
      .limit(200);

    if (fetchError) {
      setError(fetchError.message || "No se pudieron cargar logs de soporte");
      setLogs([]);
      setLoading(false);
      return;
    }

    setLogs(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return logs;
    return logs.filter((log) => {
      const category = String(log.category || "").toLowerCase();
      const message = String(log.message || "").toLowerCase();
      const route = String(log.route || "").toLowerCase();
      const actor = supportActorLabel(log).toLowerCase();
      const threadId = String(log.thread_id || "").toLowerCase();
      return (
        category.includes(term) ||
        message.includes(term) ||
        route.includes(term) ||
        actor.includes(term) ||
        threadId.includes(term)
      );
    });
  }, [logs, query]);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-lg font-semibold text-[#2F1A55]">Logs</div>
        <div className="text-xs text-slate-500">
          Eventos de soporte unificados desde observabilidad.
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por categoria, mensaje, ruta, actor o ticket"
            className="h-10 w-full rounded-xl border border-[#E7E1FF] bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
          />
        </div>
        <button
          type="button"
          onClick={loadLogs}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-sm font-semibold text-[#5E30A5] disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : undefined} />
          Recargar
        </button>
      </div>

      {error ? (
        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
          <AlertCircle size={15} />
          {error}
        </div>
      ) : null}

      <Table
        columns={[
          { key: "evento", label: "Evento" },
          { key: "actor", label: "Actor" },
          { key: "estado", label: "Estado" },
          { key: "fecha", label: "Fecha", hideOnMobile: true },
          { key: "origen", label: "Origen", hideOnMobile: true },
        ]}
      >
        {filteredLogs.map((log) => {
          const level = String(log.level || "info").toLowerCase();
          const badgeClass = LEVEL_VARIANT[level] || LEVEL_VARIANT.info;
          return (
            <tr key={log.id} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-700">{log.category || "general"}</div>
                <div className="text-xs text-slate-500">{compactMessage(log.message)}</div>
                <div className="text-[11px] text-slate-400">{log.id}</div>
              </td>
              <td className="px-4 py-3 text-slate-500">
                <div>{supportActorLabel(log)}</div>
                <div className="text-[11px] text-slate-400">
                  {log.thread_id ? `ticket:${String(log.thread_id).slice(0, 8)}` : "sin ticket"}
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge className={badgeClass}>
                  {level === "info" || level === "debug" ? (
                    <ShieldCheck size={12} />
                  ) : (
                    <AlertCircle size={12} />
                  )}
                  {level}
                </Badge>
              </td>
              <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                {formatDate(log.occurred_at || log.created_at)}
              </td>
              <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                <div>{log.route || "-"}</div>
                <div className="text-[11px] text-slate-400">
                  {log.source || "-"} / {log.app_id || "-"}
                </div>
              </td>
            </tr>
          );
        })}

        {!loading && filteredLogs.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
              No hay logs para los filtros actuales.
            </td>
          </tr>
        ) : null}
      </Table>
    </div>
  );
}
