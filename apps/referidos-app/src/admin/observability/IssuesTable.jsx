import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, RefreshCw, Search } from "lucide-react";
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

function formatDate(iso) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("es-EC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function IssuesTable() {
  const [issues, setIssues] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [query, setQuery] = useState("");
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState(null);

  const loadIssues = async () => {
    setLoadingIssues(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("obs_issues")
      .select(
        "id, title, level, status, count_total, count_24h, first_seen_at, last_seen_at, last_release",
      )
      .order("last_seen_at", { ascending: false })
      .limit(150);

    if (fetchError) {
      setError(fetchError.message || "No se pudieron cargar los issues");
      setLoadingIssues(false);
      return;
    }
    const nextIssues = Array.isArray(data) ? data : [];
    setIssues(nextIssues);
    setSelectedIssueId((current) => {
      if (current && nextIssues.some((issue) => issue.id === current)) return current;
      return nextIssues[0]?.id || null;
    });
    setLoadingIssues(false);
  };

  const loadEvents = async (issueId) => {
    if (!issueId) {
      setEvents([]);
      return;
    }
    setLoadingEvents(true);
    const { data, error: fetchError } = await supabase
      .from("obs_events")
      .select(
        "id, occurred_at, level, event_type, message, error_code, request_id, trace_id, session_id, app_id",
      )
      .eq("issue_id", issueId)
      .order("occurred_at", { ascending: false })
      .limit(40);

    if (fetchError) {
      setEvents([]);
      setLoadingEvents(false);
      return;
    }
    setEvents(Array.isArray(data) ? data : []);
    setLoadingEvents(false);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  useEffect(() => {
    loadEvents(selectedIssueId);
  }, [selectedIssueId]);

  const filteredIssues = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return issues;
    return issues.filter((issue) => {
      const title = String(issue.title || "").toLowerCase();
      const level = String(issue.level || "").toLowerCase();
      const release = String(issue.last_release || "").toLowerCase();
      return title.includes(term) || level.includes(term) || release.includes(term);
    });
  }, [issues, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por titulo, nivel o release"
            className="h-10 w-full rounded-xl border border-[#E7E1FF] bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
          />
        </div>
        <button
          type="button"
          onClick={loadIssues}
          disabled={loadingIssues}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-sm font-semibold text-[#5E30A5] disabled:opacity-60"
        >
          <RefreshCw size={15} className={loadingIssues ? "animate-spin" : undefined} />
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
          { key: "title", label: "Issue" },
          { key: "level", label: "Nivel" },
          { key: "status", label: "Estado" },
          { key: "count", label: "Eventos" },
          { key: "last", label: "Ultima vez", hideOnMobile: true },
        ]}
      >
        {filteredIssues.map((issue) => {
          const selected = issue.id === selectedIssueId;
          return (
            <tr
              key={issue.id}
              onClick={() => setSelectedIssueId(issue.id)}
              className={`cursor-pointer transition ${
                selected ? "bg-[#F5F1FF]" : "hover:bg-[#FAF8FF]"
              }`}
            >
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-800">{issue.title}</div>
                <div className="text-xs text-slate-400">{issue.id}</div>
              </td>
              <td className="px-4 py-3">
                <Badge className={LEVEL_VARIANT[issue.level] || LEVEL_VARIANT.info}>
                  {issue.level}
                </Badge>
              </td>
              <td className="px-4 py-3 text-slate-600">{issue.status}</td>
              <td className="px-4 py-3 text-slate-600">
                {issue.count_total} (24h: {issue.count_24h})
              </td>
              <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                {formatDate(issue.last_seen_at)}
              </td>
            </tr>
          );
        })}
      </Table>

      <div className="space-y-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-[#2F1A55]">Eventos del issue</div>
          {loadingEvents ? (
            <span className="text-xs text-slate-500">Cargando...</span>
          ) : (
            <span className="text-xs text-slate-500">{events.length} eventos</span>
          )}
        </div>
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-600"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={LEVEL_VARIANT[event.level] || LEVEL_VARIANT.info}>
                  {event.level}
                </Badge>
                <span className="font-semibold text-slate-700">{event.event_type}</span>
                <span>{formatDate(event.occurred_at)}</span>
              </div>
              <div className="mt-1 text-sm text-slate-700">{event.message}</div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                <span>code: {event.error_code || "-"}</span>
                <span>request: {event.request_id || "-"}</span>
                <span>trace: {event.trace_id || "-"}</span>
                <span>session: {event.session_id || "-"}</span>
                <span>app: {event.app_id || "-"}</span>
              </div>
            </div>
          ))}
          {!loadingEvents && events.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#DDD4F3] px-3 py-4 text-center text-xs text-slate-500">
              No hay eventos para este issue.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
