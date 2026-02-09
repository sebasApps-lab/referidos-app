import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, RefreshCw, Search, Sparkles } from "lucide-react";
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

function parseSymbolicationFromEvent(event) {
  if (event?.symbolicated_stack && typeof event.symbolicated_stack === "object") {
    return {
      symbolicated_stack: event.symbolicated_stack,
      symbolication_status: event.symbolication_status || "ok",
      symbolicated_at: event.symbolicated_at || null,
      symbolication_type: event.symbolication_type || "short",
      symbolication_release: event.symbolication_release || null,
    };
  }
  return null;
}

function formatFrame(frame) {
  if (!frame || typeof frame !== "object") return "-";
  const original = frame.original;
  if (original?.source && original?.line != null) {
    return `${original.source}:${original.line}:${original.column ?? 0}`;
  }
  if (frame.file && frame.line != null) {
    return `${frame.file}:${frame.line}:${frame.column ?? 0}`;
  }
  return frame.raw || "-";
}

export default function IssuesTable() {
  const [issues, setIssues] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [query, setQuery] = useState("");
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState(null);
  const [symbolicateBusy, setSymbolicateBusy] = useState(false);
  const [cacheIssueBusy, setCacheIssueBusy] = useState(false);
  const [symbolicationError, setSymbolicationError] = useState(null);
  const [symbolicationByEvent, setSymbolicationByEvent] = useState({});

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
      setSelectedEventId(null);
      return;
    }
    setLoadingEvents(true);
    const { data, error: fetchError } = await supabase
      .from("obs_events")
      .select(
        "id, occurred_at, level, event_type, message, error_code, request_id, trace_id, session_id, app_id, stack_preview, stack_raw, stack_frames_raw, symbolicated_stack, symbolication_status, symbolicated_at, symbolication_type, symbolication_release",
      )
      .eq("issue_id", issueId)
      .order("occurred_at", { ascending: false })
      .limit(40);

    if (fetchError) {
      setEvents([]);
      setSelectedEventId(null);
      setLoadingEvents(false);
      return;
    }
    const nextEvents = Array.isArray(data) ? data : [];
    setEvents(nextEvents);
    setSelectedEventId((current) => {
      if (current && nextEvents.some((event) => event.id === current)) return current;
      return nextEvents[0]?.id || null;
    });
    setLoadingEvents(false);
  };

  const symbolicateEvent = async (eventId, options = {}) => {
    if (!eventId) return;
    setSymbolicateBusy(true);
    setSymbolicationError(null);
    const { data, error: invokeError } = await supabase.functions.invoke("obs-symbolicate", {
      body: {
        action: "event",
        event_id: eventId,
        cache_type: options.cacheType || "short",
        force: Boolean(options.force),
      },
    });
    setSymbolicateBusy(false);

    if (invokeError || !data?.ok || !data?.result) {
      setSymbolicationError(
        invokeError?.message ||
          data?.result?.code ||
          data?.code ||
          "No se pudo symbolicar el evento",
      );
      return;
    }

    setSymbolicationByEvent((current) => ({
      ...current,
      [eventId]: data.result,
    }));
  };

  const cacheIssue = async () => {
    if (!selectedIssueId) return;
    setCacheIssueBusy(true);
    setSymbolicationError(null);
    const { data, error: invokeError } = await supabase.functions.invoke("obs-symbolicate", {
      body: {
        action: "issue",
        issue_id: selectedIssueId,
        cache_type: "long",
      },
    });
    setCacheIssueBusy(false);

    if (invokeError || !data?.ok) {
      setSymbolicationError(
        invokeError?.message || data?.code || "No se pudo cachear la symbolication del issue",
      );
      return;
    }

    const updates = {};
    (data.results || []).forEach((item) => {
      if (!item?.event_id) return;
      updates[item.event_id] = item;
    });
    if (Object.keys(updates).length) {
      setSymbolicationByEvent((current) => ({ ...current, ...updates }));
    }
    await loadEvents(selectedIssueId);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  useEffect(() => {
    loadEvents(selectedIssueId);
  }, [selectedIssueId]);

  useEffect(() => {
    if (!selectedEventId) return;
    void symbolicateEvent(selectedEventId, { cacheType: "short" });
  }, [selectedEventId]);

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

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) || null,
    [events, selectedEventId],
  );

  const symbolicationInfo = useMemo(() => {
    if (!selectedEvent) return null;
    return (
      symbolicationByEvent[selectedEvent.id] ||
      parseSymbolicationFromEvent(selectedEvent)
    );
  }, [selectedEvent, symbolicationByEvent]);

  const symbolicatedFrames = Array.isArray(symbolicationInfo?.symbolicated_stack?.frames)
    ? symbolicationInfo.symbolicated_stack.frames
    : [];

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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold text-[#2F1A55]">Eventos del issue</div>
          <div className="flex items-center gap-2">
            {loadingEvents ? (
              <span className="text-xs text-slate-500">Cargando...</span>
            ) : (
              <span className="text-xs text-slate-500">{events.length} eventos</span>
            )}
            <button
              type="button"
              onClick={cacheIssue}
              disabled={!selectedIssueId || cacheIssueBusy}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-1.5 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
            >
              <Sparkles size={14} />
              {cacheIssueBusy ? "Cacheando..." : "Cachear issue (30d)"}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {events.map((event) => {
            const selected = event.id === selectedEventId;
            return (
              <button
                type="button"
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition ${
                  selected
                    ? "border-[#CBB8F3] bg-[#F8F4FF]"
                    : "border-[#EFE9FA] bg-[#FCFBFF] hover:border-[#D9C8FF]"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={LEVEL_VARIANT[event.level] || LEVEL_VARIANT.info}>
                    {event.level}
                  </Badge>
                  <span className="font-semibold text-slate-700">{event.event_type}</span>
                  <span className="text-slate-500">{formatDate(event.occurred_at)}</span>
                </div>
                <div className="mt-1 text-sm text-slate-700">{event.message}</div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                  <span>code: {event.error_code || "-"}</span>
                  <span>request: {event.request_id || "-"}</span>
                  <span>trace: {event.trace_id || "-"}</span>
                  <span>session: {event.session_id || "-"}</span>
                  <span>app: {event.app_id || "-"}</span>
                </div>
              </button>
            );
          })}
          {!loadingEvents && events.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#DDD4F3] px-3 py-4 text-center text-xs text-slate-500">
              No hay eventos para este issue.
            </div>
          ) : null}
        </div>

        {selectedEvent ? (
          <div className="rounded-xl border border-[#E8E2F5] bg-[#FCFBFF] p-3">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-[#2F1A55]">
                Symbolication evento {selectedEvent.id}
              </div>
              <button
                type="button"
                onClick={() => symbolicateEvent(selectedEvent.id, { cacheType: "short", force: true })}
                disabled={symbolicateBusy}
                className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-1.5 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
              >
                <RefreshCw size={13} className={symbolicateBusy ? "animate-spin" : undefined} />
                {symbolicateBusy ? "Procesando..." : "Re-symbolicate"}
              </button>
            </div>
            {symbolicationError ? (
              <div className="mb-2 rounded-lg border border-red-100 bg-red-50 px-2 py-1 text-xs text-red-600">
                {symbolicationError}
              </div>
            ) : null}
            <div className="mb-2 text-xs text-slate-500">
              status: {symbolicationInfo?.symbolication_status || "-"} | tipo:{" "}
              {symbolicationInfo?.symbolication_type || "-"} | fecha:{" "}
              {formatDate(symbolicationInfo?.symbolicated_at)}
            </div>
            {symbolicatedFrames.length > 0 ? (
              <div className="max-h-72 space-y-1 overflow-auto rounded-lg border border-[#ECE5FA] bg-white p-2 text-[11px] text-slate-700">
                {symbolicatedFrames.map((frame, idx) => (
                  <div key={`${frame.raw || frame.file || "frame"}-${idx}`}>
                    {idx + 1}. {formatFrame(frame)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-[#DDD4F3] px-2 py-3 text-center text-xs text-slate-500">
                Sin frames symbolicated para este evento.
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
