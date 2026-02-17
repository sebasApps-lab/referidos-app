import React, { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, RefreshCw, Search, Sparkles } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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

const EVENT_DETAIL_SELECT = [
  "id",
  "tenant_id",
  "issue_id",
  "occurred_at",
  "created_at",
  "level",
  "event_type",
  "message",
  "error_code",
  "request_id",
  "trace_id",
  "session_id",
  "app_id",
  "source",
  "fingerprint",
  "stack_preview",
  "stack_raw",
  "stack_frames_raw",
  "context",
  "breadcrumbs",
  "release",
  "device",
  "user_ref",
  "user_id",
  "auth_user_id",
  "ip_hash",
  "event_domain",
  "support_category",
  "support_thread_id",
  "support_route",
  "support_screen",
  "support_flow",
  "support_flow_step",
  "support_context_extra",
  "support_received_at",
  "retention_tier",
  "retention_expires_at",
  "symbolicated_stack",
  "symbolication_status",
  "symbolicated_at",
  "symbolication_type",
  "symbolication_release",
  "release_version_label",
  "release_source_commit_sha",
  "release_version_id",
  "release_semver",
  "resolved_component_key",
  "resolved_component_type",
  "resolved_component_revision_no",
  "resolved_component_revision_id",
  "component_resolution_method",
].join(", ");

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
    second: "2-digit",
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

function safeJson(value) {
  try {
    return JSON.stringify(value ?? null, null, 2);
  } catch {
    return "{}";
  }
}

export default function IssuesTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const path = location.pathname || "";
  const isEventsRoute = path.endsWith("/issues/events");
  const isDetailsRoute = path.endsWith("/issues/events/details");

  const issueId = searchParams.get("issue") || "";
  const eventId = searchParams.get("event") || "";

  const [issues, setIssues] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [query, setQuery] = useState("");
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState(null);
  const [symbolicateBusy, setSymbolicateBusy] = useState(false);
  const [cacheIssueBusy, setCacheIssueBusy] = useState(false);
  const [symbolicationError, setSymbolicationError] = useState(null);
  const [symbolicationByEvent, setSymbolicationByEvent] = useState({});
  const [issuePulseId, setIssuePulseId] = useState(null);
  const [eventPulseId, setEventPulseId] = useState(null);
  const issuePulseTimeoutRef = useRef(null);
  const eventPulseTimeoutRef = useRef(null);

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
    setIssues(Array.isArray(data) ? data : []);
    setLoadingIssues(false);
  };

  const loadEvents = async (targetIssueId) => {
    setEventPulseId(null);
    setSymbolicationError(null);
    if (!targetIssueId) {
      setEvents([]);
      return;
    }
    setLoadingEvents(true);
    const { data, error: fetchError } = await supabase
      .from("obs_events")
      .select(EVENT_DETAIL_SELECT)
      .eq("issue_id", targetIssueId)
      .order("occurred_at", { ascending: false })
      .limit(80);

    if (fetchError) {
      setEvents([]);
      setLoadingEvents(false);
      return;
    }
    setEvents(Array.isArray(data) ? data : []);
    setLoadingEvents(false);
  };

  const loadEventDetails = async (targetIssueId, targetEventId) => {
    if (!targetEventId) {
      setEventDetails(null);
      return;
    }
    setLoadingEvents(true);
    const { data, error: fetchError } = await supabase
      .from("obs_events")
      .select(EVENT_DETAIL_SELECT)
      .eq("id", targetEventId)
      .eq("issue_id", targetIssueId)
      .maybeSingle();
    setLoadingEvents(false);

    if (fetchError || !data) {
      setEventDetails(null);
      if (fetchError) {
        setSymbolicationError(fetchError.message || "No se pudo cargar el detalle del evento");
      }
      return;
    }

    setEventDetails(data);
  };

  const symbolicateEvent = async (targetEventId, options = {}) => {
    if (!targetEventId) return null;
    setSymbolicateBusy(true);
    setSymbolicationError(null);
    const { data, error: invokeError } = await supabase.functions.invoke("obs-symbolicate", {
      body: {
        action: "event",
        event_id: targetEventId,
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
      return null;
    }

    setSymbolicationByEvent((current) => ({
      ...current,
      [targetEventId]: data.result,
    }));
    return data.result;
  };

  const cacheIssue = async () => {
    if (!issueId) return;
    setCacheIssueBusy(true);
    setSymbolicationError(null);
    const { data, error: invokeError } = await supabase.functions.invoke("obs-symbolicate", {
      body: {
        action: "issue",
        issue_id: issueId,
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
    await loadEvents(issueId);
  };

  const openEventsScreen = (targetIssueId) => {
    if (!targetIssueId) return;
    setIssuePulseId(targetIssueId);
    if (issuePulseTimeoutRef.current) {
      window.clearTimeout(issuePulseTimeoutRef.current);
    }
    issuePulseTimeoutRef.current = window.setTimeout(() => {
      setIssuePulseId(null);
      issuePulseTimeoutRef.current = null;
      navigate(`/admin/issues/events?issue=${encodeURIComponent(targetIssueId)}`);
    }, 90);
  };

  const openEventDetails = (targetEventId) => {
    if (!targetEventId || !issueId) return;
    setEventPulseId(targetEventId);
    if (eventPulseTimeoutRef.current) {
      window.clearTimeout(eventPulseTimeoutRef.current);
    }
    eventPulseTimeoutRef.current = window.setTimeout(() => {
      setEventPulseId(null);
      eventPulseTimeoutRef.current = null;
      navigate(
        `/admin/issues/events/details?issue=${encodeURIComponent(issueId)}&event=${encodeURIComponent(targetEventId)}`,
      );
    }, 90);
  };

  useEffect(() => {
    void loadIssues();
  }, []);

  useEffect(() => {
    if (!isEventsRoute && !isDetailsRoute) return;
    if (!issueId) {
      navigate("/admin/issues", { replace: true });
      return;
    }
    void loadEvents(issueId);
  }, [isEventsRoute, isDetailsRoute, issueId]);

  useEffect(() => {
    if (!isDetailsRoute || !eventId || !issueId) return;
    setSymbolicationError(null);
    void loadEventDetails(issueId, eventId);
    void symbolicateEvent(eventId, { cacheType: "short" });
  }, [isDetailsRoute, issueId, eventId]);

  useEffect(() => {
    if (!isDetailsRoute) {
      setEventDetails(null);
    }
  }, [isDetailsRoute]);

  useEffect(
    () => () => {
      if (issuePulseTimeoutRef.current) window.clearTimeout(issuePulseTimeoutRef.current);
      if (eventPulseTimeoutRef.current) window.clearTimeout(eventPulseTimeoutRef.current);
    },
    [],
  );

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

  const selectedIssue = useMemo(
    () => issues.find((issue) => issue.id === issueId) || null,
    [issues, issueId],
  );

  const selectedEvent = useMemo(() => {
    if (eventDetails?.id === eventId) return eventDetails;
    return events.find((event) => event.id === eventId) || null;
  }, [eventDetails, events, eventId]);

  const symbolicationInfo = useMemo(() => {
    if (!selectedEvent) return null;
    return symbolicationByEvent[selectedEvent.id] || parseSymbolicationFromEvent(selectedEvent);
  }, [selectedEvent, symbolicationByEvent]);

  const symbolicatedFrames = Array.isArray(symbolicationInfo?.symbolicated_stack?.frames)
    ? symbolicationInfo.symbolicated_stack.frames
    : [];

  if (isDetailsRoute) {
    if (loadingEvents && !selectedEvent) {
      return (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 text-sm text-slate-600">
          Cargando detalle del evento...
        </div>
      );
    }

    if (!selectedEvent) {
      return (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 text-sm text-slate-600">
          Evento no encontrado para este issue.
          <button
            type="button"
            onClick={() => navigate(`/admin/issues/events?issue=${encodeURIComponent(issueId)}`)}
            className="ml-2 font-semibold text-[#5E30A5]"
          >
            Volver a eventos
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => navigate(`/admin/issues/events?issue=${encodeURIComponent(issueId)}`)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E30A5]"
            >
              <ArrowLeft size={16} />
              Volver a eventos
            </button>
            <div className="mt-2 text-base font-semibold text-[#2F1A55]">Detalle del evento</div>
            <div className="mt-1 text-xs text-slate-500">{selectedEvent.id}</div>
          </div>
          <button
            type="button"
            onClick={() => symbolicateEvent(selectedEvent.id, { cacheType: "short", force: true })}
            disabled={symbolicateBusy}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
          >
            <RefreshCw size={13} className={symbolicateBusy ? "animate-spin" : undefined} />
            {symbolicateBusy ? "Procesando..." : "Re-symbolicate"}
          </button>
        </div>

        {symbolicationError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
            {symbolicationError}
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#E8E2F5] bg-white p-3 text-xs text-slate-700">
            <div><span className="font-semibold">Fecha:</span> {formatDate(selectedEvent.occurred_at)}</div>
            <div><span className="font-semibold">Nivel:</span> {selectedEvent.level || "-"}</div>
            <div><span className="font-semibold">Tipo:</span> {selectedEvent.event_type || "-"}</div>
            <div><span className="font-semibold">Codigo:</span> {selectedEvent.error_code || "-"}</div>
            <div><span className="font-semibold">Issue:</span> {selectedEvent.issue_id || "-"}</div>
            <div><span className="font-semibold">App:</span> {selectedEvent.app_id || "-"}</div>
            <div><span className="font-semibold">Source:</span> {selectedEvent.source || "-"}</div>
            <div><span className="font-semibold">Tenant:</span> {selectedEvent.tenant_id || "-"}</div>
            <div><span className="font-semibold">Request:</span> {selectedEvent.request_id || "-"}</div>
            <div><span className="font-semibold">Trace:</span> {selectedEvent.trace_id || "-"}</div>
            <div><span className="font-semibold">Session:</span> {selectedEvent.session_id || "-"}</div>
            <div><span className="font-semibold">Fingerprint:</span> {selectedEvent.fingerprint || "-"}</div>
            <div><span className="font-semibold">IP Hash:</span> {selectedEvent.ip_hash || "-"}</div>
          </div>
          <div className="rounded-xl border border-[#E8E2F5] bg-white p-3 text-xs text-slate-700">
            <div><span className="font-semibold">Release:</span> {selectedEvent.release_version_label || "-"}</div>
            <div><span className="font-semibold">Semver:</span> {selectedEvent.release_semver || "-"}</div>
            <div><span className="font-semibold">Release ID:</span> {selectedEvent.release_version_id || "-"}</div>
            <div><span className="font-semibold">Commit:</span> {selectedEvent.release_source_commit_sha || "-"}</div>
            <div><span className="font-semibold">Component:</span> {selectedEvent.resolved_component_key || "-"}</div>
            <div><span className="font-semibold">Type:</span> {selectedEvent.resolved_component_type || "-"}</div>
            <div><span className="font-semibold">Revision:</span> {selectedEvent.resolved_component_revision_no ?? "-"}</div>
            <div><span className="font-semibold">Revision ID:</span> {selectedEvent.resolved_component_revision_id || "-"}</div>
            <div><span className="font-semibold">Resolution:</span> {selectedEvent.component_resolution_method || "-"}</div>
            <div><span className="font-semibold">Symbolication status:</span> {symbolicationInfo?.symbolication_status || "-"}</div>
            <div><span className="font-semibold">Symbolication type:</span> {symbolicationInfo?.symbolication_type || "-"}</div>
            <div><span className="font-semibold">Symbolicated at:</span> {formatDate(symbolicationInfo?.symbolicated_at)}</div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#E8E2F5] bg-white p-3 text-xs text-slate-700">
            <div><span className="font-semibold">Dominio:</span> {selectedEvent.event_domain || "-"}</div>
            <div><span className="font-semibold">Categoria soporte:</span> {selectedEvent.support_category || "-"}</div>
            <div><span className="font-semibold">Thread soporte:</span> {selectedEvent.support_thread_id || "-"}</div>
            <div><span className="font-semibold">Ruta soporte:</span> {selectedEvent.support_route || "-"}</div>
            <div><span className="font-semibold">Screen soporte:</span> {selectedEvent.support_screen || "-"}</div>
            <div><span className="font-semibold">Flow:</span> {selectedEvent.support_flow || "-"}</div>
            <div><span className="font-semibold">Flow step:</span> {selectedEvent.support_flow_step || "-"}</div>
            <div><span className="font-semibold">Recibido soporte:</span> {formatDate(selectedEvent.support_received_at)}</div>
          </div>
          <div className="rounded-xl border border-[#E8E2F5] bg-white p-3 text-xs text-slate-700">
            <div><span className="font-semibold">Retention tier:</span> {selectedEvent.retention_tier || "-"}</div>
            <div><span className="font-semibold">Retention expires:</span> {formatDate(selectedEvent.retention_expires_at)}</div>
            <div><span className="font-semibold">User ID:</span> {selectedEvent.user_id || "-"}</div>
            <div><span className="font-semibold">Auth user ID:</span> {selectedEvent.auth_user_id || "-"}</div>
            <div><span className="font-semibold">Created at:</span> {formatDate(selectedEvent.created_at)}</div>
            <div><span className="font-semibold">Event ID:</span> {selectedEvent.id || "-"}</div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
          <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Mensaje</div>
          <div className="text-sm text-slate-700">{selectedEvent.message || "-"}</div>
        </div>

        <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
          <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Stack preview</div>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap text-xs text-slate-700">
            {selectedEvent.stack_preview || "-"}
          </pre>
        </div>

        <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
          <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Stack raw</div>
          <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-xs text-slate-700">
            {selectedEvent.stack_raw || "-"}
          </pre>
        </div>

        <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
          <div className="mb-2 text-sm font-semibold text-[#2F1A55]">
            Frames symbolicated ({symbolicatedFrames.length})
          </div>
          {symbolicatedFrames.length > 0 ? (
            <div className="max-h-72 space-y-1 overflow-auto rounded-lg border border-[#ECE5FA] bg-[#FCFBFF] p-2 text-[11px] text-slate-700">
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

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
            <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Context</div>
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-[11px] text-slate-700">
              {safeJson(selectedEvent.context)}
            </pre>
          </div>
          <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
            <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Release / Device / UserRef</div>
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-[11px] text-slate-700">
              {safeJson({
                release: selectedEvent.release,
                device: selectedEvent.device,
                user_ref: selectedEvent.user_ref,
                breadcrumbs: selectedEvent.breadcrumbs,
                support_context_extra: selectedEvent.support_context_extra,
              })}
            </pre>
          </div>
        </div>

        <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
          <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Evento completo (raw)</div>
          <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-[11px] text-slate-700">
            {safeJson(selectedEvent)}
          </pre>
        </div>
      </div>
    );
  }

  if (isEventsRoute) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => navigate("/admin/issues")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E30A5]"
            >
              <ArrowLeft size={16} />
              Volver a issues
            </button>
            <div className="mt-2 truncate text-base font-semibold text-[#2F1A55]">
              {selectedIssue?.title || "Issue"}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {issueId || "-"} | release: {selectedIssue?.last_release || "-"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadEvents(issueId)}
              disabled={!issueId || loadingEvents}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
            >
              <RefreshCw size={13} className={loadingEvents ? "animate-spin" : undefined} />
              Recargar eventos
            </button>
            <button
              type="button"
              onClick={cacheIssue}
              disabled={!issueId || cacheIssueBusy}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
            >
              <Sparkles size={13} />
              {cacheIssueBusy ? "Cacheando..." : "Cachear issue (30d)"}
            </button>
          </div>
        </div>

        {symbolicationError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
            {symbolicationError}
          </div>
        ) : null}

        <div className="space-y-2">
          {events.map((event) => (
            <button
              type="button"
              key={event.id}
              onClick={() => openEventDetails(event.id)}
              className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition ${
                eventPulseId === event.id
                  ? "border-[#4AAFA4] bg-[#E6FAF7] ring-2 ring-[#4AAFA4]/40"
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
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                <span>release: {event.release_version_label || "-"}</span>
                <span>component: {event.resolved_component_key || "-"}</span>
                <span>rev: {event.resolved_component_revision_no ?? "-"}</span>
                <span>res: {event.component_resolution_method || "unresolved"}</span>
              </div>
            </button>
          ))}
          {!loadingEvents && events.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#DDD4F3] px-3 py-4 text-center text-xs text-slate-500">
              No hay eventos para este issue.
            </div>
          ) : null}
        </div>
      </div>
    );
  }

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
        {filteredIssues.map((issue) => (
          <tr
            key={issue.id}
            onClick={() => openEventsScreen(issue.id)}
            className={`cursor-pointer transition ${
              issue.id === issuePulseId
                ? "bg-[#E6FAF7] ring-2 ring-[#4AAFA4]/45 shadow-[inset_0_0_0_1px_rgba(74,175,164,0.35)]"
                : "hover:bg-[#FAF8FF]"
            }`}
          >
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-800">{issue.title}</div>
              <div className="text-xs text-slate-400">{issue.id}</div>
              <div className="text-[11px] text-[#5E30A5]">Click para ver eventos</div>
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
        ))}
      </Table>
    </div>
  );
}
