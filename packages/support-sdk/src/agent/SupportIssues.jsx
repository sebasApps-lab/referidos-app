import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, RefreshCw, Search } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const LEVEL_BADGE = {
  fatal: "bg-red-100 text-red-700",
  error: "bg-red-100 text-red-700",
  warn: "bg-amber-100 text-amber-700",
  info: "bg-slate-100 text-slate-700",
  debug: "bg-slate-100 text-slate-700",
};

function levelBadgeClass(level) {
  return LEVEL_BADGE[level] || LEVEL_BADGE.info;
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
}

export default function SupportIssues() {
  const [issues, setIssues] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState("all");

  const loadData = useCallback(async () => {
    setError("");
    const [issuesRes, eventsRes] = await Promise.all([
      supabase
        .from("obs_issues_context")
        .select(
          "id, title, level, status, count_total, count_24h, first_seen_at, last_seen_at, last_release, last_user_display_name, last_user_email",
        )
        .order("last_seen_at", { ascending: false })
        .limit(150),
      supabase
        .from("obs_events_context")
        .select(
          "id, issue_id, occurred_at, level, event_type, message, error_code, app_id, release_version_label, user_display_name, user_email",
        )
        .order("occurred_at", { ascending: false })
        .limit(200),
    ]);

    if (issuesRes.error || eventsRes.error) {
      setError(
        issuesRes.error?.message ||
          eventsRes.error?.message ||
          "No se pudieron cargar issues/eventos.",
      );
      setIssues([]);
      setEvents([]);
      setLoading(false);
      return;
    }

    setIssues(Array.isArray(issuesRes.data) ? issuesRes.data : []);
    setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    void loadData();
  }, [loadData]);

  const issueMap = useMemo(
    () =>
      issues.reduce((acc, issue) => {
        acc[issue.id] = issue;
        return acc;
      }, {}),
    [issues],
  );

  const filteredIssues = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return issues;
    return issues.filter((issue) => {
      const haystack = [
        issue.title,
        issue.id,
        issue.level,
        issue.status,
        issue.last_release,
        issue.last_user_display_name,
        issue.last_user_email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [issues, query]);

  const filteredEvents = useMemo(() => {
    const term = query.trim().toLowerCase();
    return events.filter((event) => {
      if (selectedIssueId !== "all" && event.issue_id !== selectedIssueId) return false;
      if (!term) return true;
      const haystack = [
        event.issue_id,
        event.message,
        event.error_code,
        event.event_type,
        event.level,
        event.app_id,
        event.release_version_label,
        event.user_display_name,
        event.user_email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [events, query, selectedIssueId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#E9E2F7] bg-white p-5">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar issues o eventos"
            className="h-10 w-full rounded-xl border border-[#E7E1FF] bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void loadData();
          }}
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

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#2F1A55]">Issues</h2>
            <span className="text-xs text-slate-400">{filteredIssues.length}</span>
          </div>
          <div className="max-h-[62vh] space-y-2 overflow-auto pr-1">
            <button
              type="button"
              onClick={() => setSelectedIssueId("all")}
              className={`w-full rounded-2xl border px-3 py-2 text-left text-xs font-semibold transition ${
                selectedIssueId === "all"
                  ? "border-[#5E30A5] bg-[#F0EBFF] text-[#5E30A5]"
                  : "border-[#E9E2F7] bg-[#FCFBFF] text-slate-600 hover:bg-[#F7F4FF]"
              }`}
            >
              Todos los issues
            </button>

            {loading ? (
              <div className="text-xs text-slate-500">Cargando issues...</div>
            ) : filteredIssues.length === 0 ? (
              <div className="text-xs text-slate-500">No hay issues para mostrar.</div>
            ) : (
              filteredIssues.map((issue) => (
                <button
                  type="button"
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
                    selectedIssueId === issue.id
                      ? "border-[#5E30A5] bg-[#F0EBFF]"
                      : "border-[#E9E2F7] bg-[#FCFBFF] hover:bg-[#F7F4FF]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-semibold text-[#2F1A55]">{issue.title}</div>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${levelBadgeClass(issue.level)}`}>
                      {issue.level}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    {issue.last_user_display_name || "-"} | {issue.last_user_email || "-"}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-500">
                    <span>{issue.status}</span>
                    <span>Total: {issue.count_total}</span>
                    <span>24h: {issue.count_24h}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    Ultimo: {formatDate(issue.last_seen_at)}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#2F1A55]">Eventos</h2>
            <span className="text-xs text-slate-400">{filteredEvents.length}</span>
          </div>
          <div className="max-h-[62vh] space-y-2 overflow-auto pr-1">
            {loading ? (
              <div className="text-xs text-slate-500">Cargando eventos...</div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-xs text-slate-500">
                No hay eventos para el filtro actual.
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-[#E9E2F7] bg-[#FCFBFF] px-3 py-2"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${levelBadgeClass(event.level)}`}>
                      {event.level}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {event.event_type || "-"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {formatDate(event.occurred_at)}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-[#2F1A55]">{event.message || "-"}</div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Issue: {issueMap[event.issue_id]?.title || event.issue_id || "-"}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500">
                    <span>Code: {event.error_code || "-"}</span>
                    <span>App: {event.app_id || "-"}</span>
                    <span>Release: {event.release_version_label || "-"}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Usuario: {event.user_display_name || "-"} | {event.user_email || "-"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

