import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Activity,
  Archive,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Copy,
  GitCommitHorizontal,
  Globe2,
  Hash,
  Monitor,
  Package,
  RefreshCw,
  Route,
  ShieldCheck,
  Smartphone,
  Tag,
  UserRound,
  Wifi,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import {
  addSupportNote,
  closeSupportThread,
  markSupportOpeningMessage,
  markSupportWhatsAppNameChanged,
  sendSupportWorkflowAction,
  trackSupportMacroEvents,
  updateSupportStatus,
} from "../supportClient";
import {
  filterSupportMacrosForThread,
  loadSupportCatalogFromCache,
  normalizeSupportAppKey,
  normalizeSupportEnvKey,
} from "../data/supportCatalog";
import SupportDevDebugBanner from "./SupportDevDebugBanner";

const THREAD_STATUS_VALUES = ["new", "starting", "assigned", "in_progress", "waiting_user", "queued", "closing", "closed", "cancelled"];
const TIMELINE_DEFAULT_SEQUENCE = ["new", "assigned", "starting", "in_progress", "closed"];
const TIMELINE_RECOVERY_SEQUENCE = ["queued", "assigned", "starting", "in_progress", "closed"];
const TIMELINE_RELEASE_EVENT_TYPES = new Set(["agent_timeout_release", "agent_manual_release"]);
const TERMINAL_TIMELINE_STATUSES = new Set(["closed", "cancelled", "released"]);
const TIMELINE_BLOCK_LABELS = {
  new: "Creado",
  starting: "Empezando",
  assigned: "Asignado",
  in_progress: "Resolviendo",
  waiting_user: "Esperando usuario",
  queued: "En cola",
  closing: "Cerrando",
  postponed: "Pospuesto",
  released: "Liberado",
  closed: "Cerrado",
  cancelled: "Cancelado",
};
const EVENT_TYPE_LABELS = {
  created: "created",
  assigned: "assigned",
  starting: "starting",
  status_changed: "status_changed",
  waiting_user: "waiting_user",
  resumed: "resumed",
  queued: "queued",
  closed: "closed",
  note_added: "note_added",
  agent_timeout_release: "agent_timeout_release",
  agent_manual_release: "agent_manual_release",
  retake_requested: "retake_requested",
  cancelled: "cancelled",
  linked_to_user: "linked_to_user",
};
const TIMELINE_BLOCK_REACHED_CLASSES = {
  new: "bg-[#1D4ED8] text-white",
  starting: "bg-[#7C3AED] text-white",
  assigned: "bg-[#7C3AED] text-white",
  in_progress: "bg-[#0891B2] text-white",
  waiting_user: "bg-[#EA580C] text-white",
  queued: "bg-[#4F46E5] text-white",
  closing: "bg-[#B45309] text-white",
  postponed: "bg-[#BE185D] text-white",
  released: "bg-[#4B5563] text-white",
  closed: "bg-[#15803D] text-white",
  cancelled: "bg-[#B91C1C] text-white",
};

const FLOW_SCREENS = {
  STARTING_INTRO: "screen_1_starting_intro",
  WHATSAPP_GUIDE: "screen_2_whatsapp_guide",
  OPENING_MESSAGE: "screen_3_opening_message",
  OPENING_FOLLOWUP: "screen_4_opening_followup",
  RESOLUTION_ACTIVE: "screen_5_resolution_active",
  RESOLUTION_FOLLOWUP: "screen_6_resolution_followup",
  CLOSING_PREP: "screen_7_closing_prepare",
  CLOSING_WAIT: "screen_8_closing_wait",
  CLOSING_CONFIRM: "screen_9_closing_confirm",
  NEW_ISSUE_DECISION: "screen_10_new_issue_decision",
  NEW_ISSUE_INFO: "screen_11_new_issue_info",
};

const CLOSING_CONFIRM_WAIT_SECONDS = 10 * 60;

function normalizeThreadRow(thread) {
  if (!thread) return null;
  return {
    ...thread,
    request_origin: thread.request_origin || "registered",
    origin_source: thread.origin_source || "user",
    anon_profile: thread.anon_profile || null,
  };
}

function splitMacroGroupAndTitle(rawTitle) {
  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
  const fallback = title || "Macro sin titulo";
  const match = fallback.match(/^(.+?)\s*-\s*(.+)$/);
  if (!match) {
    return {
      group: "Varios",
      title: fallback,
    };
  }

  const group = match[1]?.trim();
  const normalizedTitle = match[2]?.trim();
  if (!group || !normalizedTitle) {
    return {
      group: "Varios",
      title: fallback,
    };
  }

  return {
    group,
    title: normalizedTitle,
  };
}

function asRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}

function pickFirstString(...values) {
  for (const value of values) {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) return trimmed;
    } else if (typeof value === "number") {
      return String(value);
    }
  }
  return "";
}

function formatSupportCategoryLabel(value) {
  const normalized = pickFirstString(value);
  if (!normalized) return "No especificado";
  return normalized
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSupportThreadStatusLabel(status) {
  const normalized = pickFirstString(status).toLowerCase();
  if (!normalized) return "No especificado";
  const mapped = TIMELINE_BLOCK_LABELS[normalized] || normalized.replace(/[_-]+/g, " ");
  return mapped
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatElapsedClock(ms) {
  const safeMs = Math.max(0, Number.isFinite(ms) ? ms : 0);
  const totalSeconds = Math.floor(safeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      seconds,
    ).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function detectBrowserLabel(rawBrowser, userAgent) {
  const raw = pickFirstString(rawBrowser, userAgent).toLowerCase();
  if (!raw) return "";
  if (raw.includes("edg")) return "Edge";
  if (raw.includes("brave")) return "Brave";
  if (raw.includes("firefox")) return "Firefox";
  if (raw.includes("opr") || raw.includes("opera")) return "Opera";
  if (raw.includes("chrome")) return "Chrome";
  if (raw.includes("safari")) return "Safari";
  return pickFirstString(rawBrowser, userAgent);
}

function detectOsLabel(rawOs, userAgent) {
  const raw = pickFirstString(rawOs, userAgent).toLowerCase();
  if (!raw) return "";
  if (raw.includes("windows")) return "Windows";
  if (raw.includes("android")) return "Android";
  if (raw.includes("iphone") || raw.includes("ipad") || raw.includes("ios")) return "iOS";
  if (raw.includes("mac os") || raw.includes("macintosh") || raw.includes("darwin")) return "macOS";
  if (raw.includes("linux")) return "Linux";
  return pickFirstString(rawOs, userAgent);
}

function normalizeThreadStatusCandidate(value) {
  if (typeof value !== "string") return null;
  const raw = value.trim().toLowerCase();
  const compact = raw.replace(/[\s-]+/g, "_");
  const aliases = {
    starting: "starting",
    retomando: "starting",
    en_inicio: "starting",
    inprogress: "in_progress",
    en_progreso: "in_progress",
    resolviendo: "in_progress",
    waitinguser: "waiting_user",
    esperando_usuario: "waiting_user",
    en_espera: "waiting_user",
    en_cola: "queued",
    cola: "queued",
    cerrando: "closing",
    en_cierre: "closing",
    cerrado: "closed",
    cancelado: "cancelled",
    asignado: "assigned",
    nuevo: "new",
  };
  const normalized = aliases[compact] || compact;
  return THREAD_STATUS_VALUES.includes(normalized) ? normalized : null;
}

function deriveNextThreadStatusFromEvent(event) {
  if (!event || typeof event !== "object") return null;
  const type = typeof event.event_type === "string" ? event.event_type.trim().toLowerCase() : "";
  if (!type) return null;
  if (type === "created") return "new";
  if (type === "resumed") return "in_progress";
  if (type === "agent_timeout_release" || type === "agent_manual_release") return "queued";
  const statusFromType = normalizeThreadStatusCandidate(type);
  if (statusFromType) return statusFromType;
  if (type !== "status_changed") return null;
  const details = event.details && typeof event.details === "object" ? event.details : {};
  return (
    normalizeThreadStatusCandidate(details.to) ||
    normalizeThreadStatusCandidate(details.next_status) ||
    normalizeThreadStatusCandidate(details.to_status) ||
    normalizeThreadStatusCandidate(details.status)
  );
}

function getEventDetails(event) {
  return event && typeof event.details === "object" && !Array.isArray(event.details) ? event.details : {};
}

function findLatestActionEvent(events, action) {
  if (!Array.isArray(events) || !action) return null;
  const target = String(action).trim().toLowerCase();
  return events.find((event) => {
    const details = getEventDetails(event);
    return String(details.action || "").trim().toLowerCase() === target;
  }) || null;
}

function normalizeQueueKind(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!normalized) return null;
  if (["personal", "mine", "propia", "private", "postponed", "pospuesto"].includes(normalized)) return "personal";
  if (["general", "shared", "public", "global"].includes(normalized)) return "general";
  return null;
}

function deriveQueueKindFromEvent(event, thread) {
  const details = getEventDetails(event);
  if (typeof details.personal_queue === "boolean") {
    return details.personal_queue ? "personal" : "general";
  }
  const queueKind =
    normalizeQueueKind(details.queue_kind) ||
    normalizeQueueKind(details.queue_scope) ||
    normalizeQueueKind(details.scope) ||
    normalizeQueueKind(details.queue);
  if (queueKind) return queueKind;
  const eventType = typeof event?.event_type === "string" ? event.event_type.trim().toLowerCase() : "";
  if (eventType === "queued" && thread?.status === "queued") {
    if (thread.personal_queue === true || Boolean(thread.assigned_agent_id)) return "personal";
  }
  return "general";
}

function statusToTimelineStatus(status, queueKind = "general") {
  if (status !== "queued") return status;
  return queueKind === "personal" ? "postponed" : "queued";
}

function buildCollapsedResolvingLane(segments) {
  const resolvingIndexes = [];
  segments.forEach((segment, index) => {
    if (segment.status === "in_progress") resolvingIndexes.push(index);
  });
  if (resolvingIndexes.length <= 1) {
    return {
      hasCollapsedResolving: false,
      collapsedSegments: segments,
      collapsedSegmentId: "",
    };
  }
  const firstIndex = resolvingIndexes[0];
  const lastIndex = resolvingIndexes[resolvingIndexes.length - 1];
  if (lastIndex <= firstIndex) {
    return {
      hasCollapsedResolving: false,
      collapsedSegments: segments,
      collapsedSegmentId: "",
    };
  }
  const groupedSegments = segments.slice(firstIndex, lastIndex + 1);
  const collapsedId = `${segments[firstIndex].id}:collapsed_resolving:${segments[lastIndex].id}`;
  const collapsedResolvingSegment = {
    ...segments[firstIndex],
    id: collapsedId,
    endedAt: segments[lastIndex].endedAt || segments[firstIndex].endedAt || null,
    events: groupedSegments.flatMap((segment) => segment.events || []),
    isCollapsedResolving: true,
  };
  return {
    hasCollapsedResolving: true,
    collapsedSegments: [
      ...segments.slice(0, firstIndex),
      collapsedResolvingSegment,
      ...segments.slice(lastIndex + 1),
    ],
    collapsedSegmentId: collapsedId,
  };
}

function SupportIdentityCard({
  title,
  value,
  Icon,
  tone = "violet",
  compact = false,
}) {
  const cardStyle = compact ? { width: "10rem" } : { width: "12rem" };
  const toneClassMap = {
    violet: "border-[#E7DDFB] bg-[#F7F2FF] text-[#6A3EB1]",
    blue: "border-[#D8E7FF] bg-[#EEF5FF] text-[#225EA8]",
    green: "border-[#D6F2E3] bg-[#ECFBF3] text-[#2C7A4B]",
    amber: "border-[#F8E7C5] bg-[#FFF8EA] text-[#A06400]",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
  };

  const iconToneClass = toneClassMap[tone] || toneClassMap.violet;
  const displayValue = pickFirstString(value) || "No especificado";

  return (
    <div
      style={cardStyle}
      className={`shrink-0 rounded-xl border border-[#E8E2F5] bg-white ${compact ? "px-2 py-1.5" : "px-3 py-2.5"}`}
    >
      <div className={`flex items-center ${compact ? "gap-4" : "gap-3"}`}>
        <div
          className={`relative flex shrink-0 items-center justify-center rounded-lg border ${iconToneClass} ${
            compact ? "h-8 w-8" : "h-10 w-10"
          }`}
        >
          {React.createElement(Icon, { size: compact ? 14 : 16 })}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            {title}
          </div>
          <div className={`${compact ? "text-xs" : "text-sm"} truncate font-semibold text-slate-800`}>
            {displayValue}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SupportTicket() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [thread, setThread] = useState(null);
  const [obsContext, setObsContext] = useState(null);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteDraft, setNoteDraft] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [closingRequest, setClosingRequest] = useState(false);
  const [logs, setLogs] = useState([]);
  const [catalog, setCatalog] = useState({ categories: [], macros: [] });
  const [catalogLoadError, setCatalogLoadError] = useState("");
  const [refreshingMacros, setRefreshingMacros] = useState(false);
  const [expandedMacroGroups, setExpandedMacroGroups] = useState({});
  const [openingSaving, setOpeningSaving] = useState(false);
  const [openingStepError, setOpeningStepError] = useState("");
  const [whatsAppNameMarked, setWhatsAppNameMarked] = useState(false);
  const [whatsAppNameSaving, setWhatsAppNameSaving] = useState(false);
  const [startingGuideError, setStartingGuideError] = useState("");
  const [flowScreen, setFlowScreen] = useState(FLOW_SCREENS.STARTING_INTRO);
  const [personalQueueThreads, setPersonalQueueThreads] = useState([]);
  const [openingFocusedMacro, setOpeningFocusedMacro] = useState(null);
  const [resolutionFocusedMacro, setResolutionFocusedMacro] = useState(null);
  const [closingFocusedMacro, setClosingFocusedMacro] = useState(null);
  const [resolutionSendReminderOpen, setResolutionSendReminderOpen] = useState(false);
  const [resolutionReminderMacro, setResolutionReminderMacro] = useState(null);
  const [closingMessageSentAt, setClosingMessageSentAt] = useState("");
  const [closingCommentDraft, setClosingCommentDraft] = useState("");
  const [newIssueReasonDraft, setNewIssueReasonDraft] = useState("");
  const [newIssueCategoryDraft, setNewIssueCategoryDraft] = useState("");
  const [workflowSaving, setWorkflowSaving] = useState(false);
  const [expandedTimelineSegmentId, setExpandedTimelineSegmentId] = useState("");
  const [expandedResolvingByLane, setExpandedResolvingByLane] = useState({});
  const [isTimelineDragging, setIsTimelineDragging] = useState(false);
  const [activeNowMs, setActiveNowMs] = useState(() => Date.now());
  const shownTrackerRef = useRef(new Set());
  const resolutionSendReminderTimerRef = useRef(0);
  const timelineScrollRef = useRef(null);
  const timelineDragStateRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const timelineSuppressClickUntilRef = useRef(0);

  const formatDateTime = (value) =>
    new Date(value).toLocaleString("es-EC", {
      timeZone: "America/Guayaquil",
    });
  const formatCommit = (value) => {
    if (!value || typeof value !== "string") return "";
    return value.length > 12 ? `${value.slice(0, 12)}...` : value;
  };
  const formatTimelineDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
  };

  useEffect(() => {
    const timer = globalThis.setInterval(() => {
      setActiveNowMs(Date.now());
    }, 1000);
    return () => {
      globalThis.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (resolutionSendReminderTimerRef.current) {
        globalThis.clearTimeout(resolutionSendReminderTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (flowScreen === FLOW_SCREENS.RESOLUTION_ACTIVE) return;
    if (resolutionSendReminderTimerRef.current) {
      globalThis.clearTimeout(resolutionSendReminderTimerRef.current);
      resolutionSendReminderTimerRef.current = 0;
    }
    setResolutionSendReminderOpen(false);
  }, [flowScreen]);

  const hasBlockingModalOpen = Boolean(resolutionSendReminderOpen);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const body = document.body;
    if (!body) return undefined;

    if (hasBlockingModalOpen) {
      body.setAttribute("data-support-modal-open", "1");
    } else {
      body.removeAttribute("data-support-modal-open");
    }

    return () => {
      body.removeAttribute("data-support-modal-open");
    };
  }, [hasBlockingModalOpen]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const enrichedResult = await supabase
        .from("support_threads")
        .select(
          "*, anon_profile:anon_support_profiles(id, public_id, display_name, contact_channel, contact_value)"
        )
        .eq("public_id", threadId)
        .maybeSingle();

      let threadData = enrichedResult.data || null;
      if (enrichedResult.error) {
        const legacyResult = await supabase
          .from("support_threads")
          .select("*")
          .eq("public_id", threadId)
          .maybeSingle();
        threadData = legacyResult.data || null;
      }

      if (!threadData?.id) {
        if (!active) return;
        setThread(null);
        setObsContext(null);
        setEvents([]);
        setNotes([]);
        setLogs([]);
        return;
      }

      const [{ data: eventData }, { data: noteData }, { data: obsContextData }, { data: personalQueueData }] = await Promise.all([
        supabase
          .from("support_thread_events")
          .select("event_type, actor_role, actor_id, details, created_at")
          .eq("thread_id", threadData.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("support_thread_notes")
          .select("id, body, created_at, author_id")
          .eq("thread_id", threadData.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("support_ticket_obs_context")
          .select("*")
          .eq("thread_id", threadData.id)
          .maybeSingle(),
        threadData.assigned_agent_id
          ? supabase
            .from("support_threads")
            .select("public_id, category, summary, user_public_id, assigned_agent_id, status, personal_queue, created_at")
            .eq("assigned_agent_id", threadData.assigned_agent_id)
            .eq("status", "queued")
            .eq("personal_queue", true)
            .neq("id", threadData.id)
            .order("created_at", { ascending: true })
          : Promise.resolve({ data: [] }),
      ]);

      let logData = [];
      const [threadLogsResponse, userLogsResponse] = await Promise.all([
        threadData.id
          ? supabase
            .from("support_log_events")
            .select("id, level, category, message, occurred_at, created_at, route, screen")
            .eq("thread_id", threadData.id)
            .order("occurred_at", { ascending: false })
            .limit(50)
          : Promise.resolve({ data: [] }),
        threadData.user_id
          ? supabase
            .from("support_log_events")
            .select("id, level, category, message, occurred_at, created_at, route, screen")
            .eq("user_id", threadData.user_id)
            .order("occurred_at", { ascending: false })
            .limit(50)
          : Promise.resolve({ data: [] }),
      ]);

      const mergedLogs = [
        ...(threadLogsResponse?.data || []),
        ...(userLogsResponse?.data || []),
      ];
      if (mergedLogs.length) {
        const deduped = Array.from(
          new Map(mergedLogs.map((logItem) => [logItem.id, logItem])).values()
        );
        deduped.sort((a, b) => {
          const aTs = new Date(a.occurred_at || a.created_at || 0).getTime();
          const bTs = new Date(b.occurred_at || b.created_at || 0).getTime();
          return bTs - aTs;
        });
        logData = deduped.slice(0, 50);
      }

      const loadedEvents = eventData || [];
      const hasWhatsAppNameMarked = loadedEvents.some((event) => {
        if (!event || event.event_type !== "status_changed") return false;
        const details = asRecord(event.details);
        return String(details.action || "").toLowerCase() === "whatsapp_name_changed";
      });
      const latestClosingMessageSentEvent = findLatestActionEvent(loadedEvents, "closing_message_sent");
      const latestOpeningResetEvent = findLatestActionEvent(loadedEvents, "opening_message_reset");
      const normalizedThread = normalizeThreadRow(threadData);
      const openingSentAt = pickFirstString(normalizedThread?.opening_message_sent_at);
      const hasOpeningMarkedByColumn = Boolean(openingSentAt);
      const openingResetAt = pickFirstString(latestOpeningResetEvent?.created_at);
      const openingResetIsNewer =
        openingResetAt &&
        openingSentAt &&
        new Date(openingResetAt).getTime() > new Date(openingSentAt).getTime();
      const hasOpeningMessageSent = hasOpeningMarkedByColumn && !openingResetIsNewer;

      let initialFlowScreen = FLOW_SCREENS.STARTING_INTRO;
      if (normalizedThread.status === "closed" || normalizedThread.status === "cancelled") {
        initialFlowScreen = FLOW_SCREENS.RESOLUTION_ACTIVE;
      } else if (!hasWhatsAppNameMarked) {
        initialFlowScreen = FLOW_SCREENS.STARTING_INTRO;
      } else if (!hasOpeningMessageSent) {
        initialFlowScreen = FLOW_SCREENS.OPENING_MESSAGE;
      } else if (normalizedThread.status === "closing") {
        initialFlowScreen = latestClosingMessageSentEvent
          ? FLOW_SCREENS.CLOSING_WAIT
          : FLOW_SCREENS.CLOSING_PREP;
      } else if (normalizedThread.status === "waiting_user" || normalizedThread.status === "queued") {
        initialFlowScreen = FLOW_SCREENS.RESOLUTION_FOLLOWUP;
      } else {
        initialFlowScreen = FLOW_SCREENS.RESOLUTION_ACTIVE;
      }

      if (!active) return;
      setThread(normalizedThread);
      setFlowScreen(initialFlowScreen);
      setOpeningStepError("");
      setOpeningFocusedMacro(null);
      setResolutionFocusedMacro(null);
      setClosingFocusedMacro(null);
      setResolutionSendReminderOpen(false);
      setResolutionReminderMacro(null);
      setWhatsAppNameMarked(hasWhatsAppNameMarked);
      setStartingGuideError("");
      setClosingMessageSentAt(pickFirstString(latestClosingMessageSentEvent?.created_at));
      setClosingCommentDraft("");
      setNewIssueReasonDraft("");
      setNewIssueCategoryDraft(pickFirstString(normalizedThread?.category));
      setObsContext(obsContextData || null);
      setEvents(loadedEvents);
      setNotes(noteData || []);
      setLogs(logData);
      setPersonalQueueThreads(Array.isArray(personalQueueData) ? personalQueueData : []);
    };
    load();
    return () => {
      active = false;
    };
  }, [threadId]);

  const fetchCatalog = useCallback(async ({ forceSync = false } = {}) => {
    let result = await loadSupportCatalogFromCache({ publishedOnly: true });
    let categories = result.categories || [];
    let macros = result.macros || [];
    let cacheError = typeof result.error === "string" ? result.error : "";
    let syncError = "";

    const shouldSync = forceSync || categories.length === 0 || macros.length === 0;
    if (shouldSync) {
      const { data, error } = await supabase.functions.invoke(
        "ops-support-macros-sync-dispatch",
        {
          body: {
            mode: "hot",
            panel_key: "support_ticket",
          },
        }
      );
      if (error) {
        syncError = error.message || "sync_dispatch_failed";
      } else if (data?.ok === false) {
        syncError = data?.detail || data?.error || "sync_dispatch_failed";
      }

      result = await loadSupportCatalogFromCache({ publishedOnly: true });
      categories = result.categories || [];
      macros = result.macros || [];
      cacheError = typeof result.error === "string" ? result.error : cacheError;
    }

    let catalogError = "";
    if (categories.length === 0 && macros.length === 0) {
      if (syncError) {
        catalogError = `No se pudo sincronizar macros desde OPS y el cache runtime esta vacio. Detalle: ${syncError}`;
      } else if (cacheError) {
        catalogError = `No se pudo leer el cache runtime de macros. Detalle: ${cacheError}`;
      } else if (shouldSync) {
        catalogError =
          "El cache runtime de macros sigue vacio despues de sincronizar. Verifica secretos de sync y tenant en runtime.";
      }
    }

    return { categories, macros, catalogError };
  }, []);

  const refreshCatalog = useCallback(
    async ({ forceSync = false } = {}) => {
      setRefreshingMacros(true);
      try {
        const nextCatalog = await fetchCatalog({ forceSync });
        setCatalog({
          categories: nextCatalog.categories || [],
          macros: nextCatalog.macros || [],
        });
        setCatalogLoadError(nextCatalog.catalogError || "");
      } finally {
        setRefreshingMacros(false);
      }
    },
    [fetchCatalog]
  );

  useEffect(() => {
    let active = true;
    setRefreshingMacros(true);
    fetchCatalog({ forceSync: false })
      .then((nextCatalog) => {
        if (!active) return;
        setCatalog({
          categories: nextCatalog.categories || [],
          macros: nextCatalog.macros || [],
        });
        setCatalogLoadError(nextCatalog.catalogError || "");
      })
      .finally(() => {
        if (!active) return;
        setRefreshingMacros(false);
      });

    return () => {
      active = false;
    };
  }, [fetchCatalog, threadId]);

  const runtimeEnvKey = normalizeSupportEnvKey(
    import.meta.env.VITE_ENV || import.meta.env.MODE || "dev",
    "dev"
  );

  const ticketAppKey = useMemo(() => {
    if (!thread) return "referidos_app";
    return normalizeSupportAppKey(
      thread.app_channel || "",
      "referidos_app"
    );
  }, [thread]);

  const threadContext = useMemo(() => asRecord(thread?.context), [thread?.context]);
  const runtimeContext = useMemo(() => asRecord(threadContext.runtime), [threadContext]);
  const userAgent = pickFirstString(
    runtimeContext.user_agent,
    threadContext.user_agent,
    runtimeContext.browser
  );

  const contextCards = useMemo(() => {
    const roleLabel =
      thread?.request_origin === "anonymous"
        ? "anonimo"
        : pickFirstString(threadContext.user_role, threadContext.role, thread?.origin_source, "user");
    const deviceLabel = pickFirstString(
      runtimeContext.platform,
      runtimeContext.device,
      threadContext.platform,
      threadContext.device
    );
    const browserLabel = detectBrowserLabel(
      pickFirstString(runtimeContext.browser, threadContext.browser, threadContext.user_agent_browser),
      userAgent
    );
    const osLabel = detectOsLabel(
      pickFirstString(runtimeContext.os, threadContext.os, runtimeContext.platform, threadContext.platform),
      userAgent
    );
    const providerLabel = pickFirstString(
      threadContext.provider,
      threadContext.auth_provider,
      runtimeContext.provider
    );
    const userLabel = pickFirstString(
      obsContext?.user_display_name,
      thread?.anon_profile?.display_name,
      thread?.user_public_id
    );
    const routeLabel = pickFirstString(
      runtimeContext.source_route,
      threadContext.source_route,
      threadContext.route
    );
    const businessId = pickFirstString(
      threadContext.negocio_id,
      threadContext.business_id,
      runtimeContext.negocio_id,
      runtimeContext.business_id
    );
    const promoId = pickFirstString(
      threadContext.promo_id,
      threadContext.promotion_id,
      runtimeContext.promo_id,
      runtimeContext.promotion_id
    );

    const cards = [
      { key: "role", label: "Rol", value: roleLabel, Icon: ShieldCheck, tone: "violet" },
      { key: "user", label: "Usuario", value: userLabel, Icon: UserRound, tone: "green" },
      { key: "provider", label: "Proveedor", value: providerLabel, Icon: Wifi, tone: "blue" },
      { key: "device", label: "Dispositivo", value: deviceLabel, Icon: Smartphone, tone: "amber" },
      ...(browserLabel
        ? [{ key: "browser", label: "Navegador", value: browserLabel, Icon: Globe2, tone: "blue" }]
        : []),
      { key: "os", label: "OS", value: osLabel, Icon: Monitor, tone: "slate" },
      { key: "route", label: "Ruta", value: routeLabel, Icon: Route, tone: "violet" },
      ...(businessId
        ? [{ key: "business-id", label: "Negocio ID", value: businessId, Icon: Building2, tone: "green" }]
        : []),
      ...(promoId
        ? [{ key: "promo-id", label: "Promo ID", value: promoId, Icon: Tag, tone: "amber" }]
        : []),
    ];
    return cards;
  }, [obsContext, runtimeContext, thread?.anon_profile?.display_name, thread?.origin_source, thread?.request_origin, thread?.user_public_id, threadContext, userAgent]);

  const buildCards = useMemo(
    () => [
      {
        key: "release-version",
        label: "Version",
        value: obsContext?.release_version_label,
        Icon: Package,
        tone: "violet",
      },
      {
        key: "release-build-number",
        label: "Build",
        value:
          obsContext?.release_build_number != null
            ? `#${obsContext.release_build_number}`
            : "",
        Icon: Hash,
        tone: "blue",
      },
      {
        key: "release-channel",
        label: "Canal",
        value: obsContext?.release_channel,
        Icon: Activity,
        tone: "green",
      },
      {
        key: "release-commit",
        label: "Commit",
        value: formatCommit(obsContext?.release_source_commit_sha),
        Icon: GitCommitHorizontal,
        tone: "slate",
      },
      {
        key: "release-artifact-id",
        label: "Artifact",
        value: obsContext?.release_artifact_id,
        Icon: Archive,
        tone: "amber",
      },
      ...(pickFirstString(obsContext?.obs_event_type)
        ? [
            {
              key: "obs-event-type",
              label: "Evento OBS",
              value: obsContext?.obs_event_type,
              Icon: Activity,
              tone: "violet",
            },
          ]
        : []),
      {
        key: "obs-event-at",
        label: "Ultimo evento",
        value: obsContext?.obs_occurred_at ? formatDateTime(obsContext.obs_occurred_at) : "",
        Icon: Clock3,
        tone: "blue",
      },
    ],
    [obsContext]
  );

  const backPath = useMemo(() => {
    if (location.pathname.startsWith("/admin/")) return "/admin/soporte";
    return "/soporte/inbox";
  }, [location.pathname]);
  const debugBanner = import.meta.env.DEV ? (
    <SupportDevDebugBanner
      scope={location.pathname.startsWith("/admin/") ? "admin-ticket" : "support-ticket"}
      zIndexClass="z-[200]"
    />
  ) : null;

  const macroStatusByScreen = useMemo(() => {
    if (!thread) return "new";
    if (flowScreen === FLOW_SCREENS.OPENING_MESSAGE || flowScreen === FLOW_SCREENS.OPENING_FOLLOWUP) {
      return "starting";
    }
    if (flowScreen === FLOW_SCREENS.CLOSING_PREP || flowScreen === FLOW_SCREENS.CLOSING_WAIT || flowScreen === FLOW_SCREENS.CLOSING_CONFIRM) {
      return "closing";
    }
    if (flowScreen === FLOW_SCREENS.RESOLUTION_FOLLOWUP) {
      if (thread.status === "waiting_user" || thread.status === "queued") return thread.status;
      return "in_progress";
    }
    if (flowScreen === FLOW_SCREENS.RESOLUTION_ACTIVE || flowScreen === FLOW_SCREENS.NEW_ISSUE_DECISION || flowScreen === FLOW_SCREENS.NEW_ISSUE_INFO) {
      return "in_progress";
    }
    return thread.status || "new";
  }, [flowScreen, thread]);

  const macroThread = useMemo(() => {
    if (!thread) return null;
    const categoryOverride =
      flowScreen === FLOW_SCREENS.NEW_ISSUE_DECISION || flowScreen === FLOW_SCREENS.NEW_ISSUE_INFO
        ? pickFirstString(newIssueCategoryDraft, thread.category)
        : thread.category;
    return {
      ...thread,
      status: macroStatusByScreen,
      category: categoryOverride,
    };
  }, [flowScreen, macroStatusByScreen, newIssueCategoryDraft, thread]);

  const macros = useMemo(() => {
    return filterSupportMacrosForThread({
      thread: macroThread,
      macros: catalog.macros,
      categories: catalog.categories,
      runtimeEnvKey,
    });
  }, [catalog.categories, catalog.macros, macroThread, runtimeEnvKey]);

  const macroGroups = useMemo(() => {
    const grouped = new Map();

    macros.forEach((macro) => {
      const parsed = splitMacroGroupAndTitle(macro.title);
      const key = parsed.group.toLowerCase();
      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          label: parsed.group,
          items: [],
        });
      }
      grouped.get(key).items.push({
        ...macro,
        displayTitle: parsed.title,
      });
    });

    return Array.from(grouped.values()).sort((a, b) =>
      a.label.localeCompare(b.label, "es", { sensitivity: "base" })
    );
  }, [macros]);

  useEffect(() => {
    setExpandedMacroGroups((previous) => {
      const validKeys = new Set(macroGroups.map((group) => group.key));
      const next = {};
      Object.entries(previous).forEach(([key, isOpen]) => {
        if (validKeys.has(key)) next[key] = isOpen;
      });
      if (macroGroups.length === 1) {
        next[macroGroups[0].key] = true;
      }
      return next;
    });
  }, [macroGroups]);

  const toggleMacroGroup = useCallback((groupKey) => {
    setExpandedMacroGroups((previous) => ({
      ...previous,
      [groupKey]: !previous[groupKey],
    }));
  }, []);

  const hasCatalogData = catalog.categories.length > 0 || catalog.macros.length > 0;

  const timelineLanes = useMemo(() => {
    if (!thread) return [];
    const orderedEvents = [...(events || [])].sort(
      (a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
    );

    const createSegment = (status, startedAt, isReached = true, queueKind = "general") => ({
      id: "",
      status,
      label: TIMELINE_BLOCK_LABELS[status] || status,
      startedAt: startedAt || null,
      endedAt: null,
      events: [],
      isReached,
      queueKind,
    });
    const lanes = [];
    const createLane = (firstStatus, startedAt, queueKind = "general") => {
      const lane = {
        initialStatus: firstStatus,
        queueKind,
        segments: [createSegment(firstStatus, startedAt, true, queueKind)],
      };
      lanes.push(lane);
      return lane;
    };

    let currentLane = createLane(
      "new",
      thread.created_at || thread.updated_at || new Date().toISOString(),
      "general"
    );
    const getCurrentSegment = () => currentLane.segments[currentLane.segments.length - 1] || null;
    const splitLaneToQueue = (transitionAt, queueKind = "general", eventForRelease = null) => {
      const current = getCurrentSegment();
      if (current) current.endedAt = current.endedAt || transitionAt;
      const releaseSegment = createSegment("released", transitionAt, true, queueKind);
      if (eventForRelease) releaseSegment.events.push(eventForRelease);
      releaseSegment.endedAt = transitionAt;
      currentLane.segments.push(releaseSegment);
      currentLane = createLane(statusToTimelineStatus("queued", queueKind), transitionAt, queueKind);
    };

    orderedEvents.forEach((event) => {
      const eventType = typeof event.event_type === "string" ? event.event_type.trim().toLowerCase() : "";
      const transitionAt = event.created_at || thread.updated_at || thread.created_at || new Date().toISOString();
      let current = getCurrentSegment();
      if (!current) {
        currentLane = createLane("new", thread.created_at || transitionAt, "general");
        current = getCurrentSegment();
      }

      if (TIMELINE_RELEASE_EVENT_TYPES.has(eventType)) {
        splitLaneToQueue(transitionAt, "general", event);
        return;
      }

      current.events.push(event);

      const nextStatus = deriveNextThreadStatusFromEvent(event);
      if (!nextStatus) return;

      const queueKind = nextStatus === "queued" ? deriveQueueKindFromEvent(event, thread) : currentLane.queueKind;
      const nextTimelineStatus = statusToTimelineStatus(nextStatus, queueKind);
      if (!nextTimelineStatus || nextTimelineStatus === current.status) return;

      if (nextStatus === "queued") {
        splitLaneToQueue(transitionAt, queueKind, null);
        return;
      }

      current.endedAt = current.endedAt || transitionAt;
      currentLane.segments.push(createSegment(nextTimelineStatus, transitionAt, true, queueKind));
    });

    const currentThreadStatus = normalizeThreadStatusCandidate(thread.status);
    if (currentThreadStatus) {
      const currentQueueKind =
        thread.personal_queue === true || Boolean(thread.assigned_agent_id) ? "personal" : "general";
      const currentTimelineStatus = statusToTimelineStatus(currentThreadStatus, currentQueueKind);
      const current = getCurrentSegment();
      if (!current || currentTimelineStatus !== current.status) {
        const transitionAt = thread.updated_at || thread.created_at || new Date().toISOString();
        if (currentThreadStatus === "queued") {
          splitLaneToQueue(transitionAt, currentQueueKind, null);
        } else {
          if (current) current.endedAt = current.endedAt || transitionAt;
          currentLane.segments.push(createSegment(currentTimelineStatus, transitionAt, true, currentQueueKind));
        }
      }
    }

    return lanes.map((lane, laneIndex) => {
      lane.segments.forEach((segment, index) => {
        const next = lane.segments[index + 1];
        if (!segment.endedAt && next?.startedAt) {
          segment.endedAt = next.startedAt;
          return;
        }
        if (!segment.endedAt && segment.status === "closed") {
          segment.endedAt = thread.closed_at || thread.updated_at || segment.startedAt;
          return;
        }
        if (!segment.endedAt && segment.status === "cancelled") {
          segment.endedAt = thread.cancelled_at || thread.updated_at || segment.startedAt;
          return;
        }
        if (!segment.endedAt && segment.status === "released") {
          segment.endedAt = segment.startedAt || thread.updated_at || thread.created_at;
        }
      });

      const reachedSegments = lane.segments.length
        ? [...lane.segments]
        : [createSegment("new", thread.created_at || thread.updated_at || new Date().toISOString(), true, "general")];
      const firstTerminalIndex = reachedSegments.findIndex((segment) =>
        TERMINAL_TIMELINE_STATUSES.has(segment.status)
      );
      const trimmedReachedSegments =
        firstTerminalIndex >= 0 ? reachedSegments.slice(0, firstTerminalIndex + 1) : reachedSegments;
      const displaySegments = trimmedReachedSegments.length
        ? [...trimmedReachedSegments]
        : [createSegment("new", thread.created_at || thread.updated_at || new Date().toISOString(), true, "general")];

      const hasTerminal = displaySegments.some((segment) => TERMINAL_TIMELINE_STATUSES.has(segment.status));
      if (!hasTerminal) {
        const defaultSequence =
          lane.initialStatus === "queued" || lane.initialStatus === "postponed"
            ? TIMELINE_RECOVERY_SEQUENCE
            : TIMELINE_DEFAULT_SEQUENCE;
        const orderStatus = (status) => (status === "postponed" ? "queued" : status);
        const reachedDefaultIndexes = displaySegments
          .map((segment) => defaultSequence.indexOf(orderStatus(segment.status)))
          .filter((idx) => idx >= 0);
        const lastDefaultIndex = reachedDefaultIndexes.length ? Math.max(...reachedDefaultIndexes) : -1;
        defaultSequence.slice(lastDefaultIndex + 1).forEach((status) => {
          displaySegments.push(
            createSegment(statusToTimelineStatus(status, lane.queueKind || "general"), null, false, lane.queueKind || "general")
          );
        });
      }

      return displaySegments.map((segment, segmentIndex) => ({
        ...segment,
        id: `${thread.id}:${laneIndex}:${segmentIndex}:${segment.status}:${segment.startedAt || "pending"}`,
      }));
    });
  }, [events, thread]);

  const timelineCollapsedSegments = useMemo(
    () => timelineLanes.flatMap((laneSegments) => buildCollapsedResolvingLane(laneSegments).collapsedSegments),
    [timelineLanes]
  );

  const expandedTimelineSegment = useMemo(
    () =>
      timelineLanes.flat().find((segment) => segment.id === expandedTimelineSegmentId) ||
      timelineCollapsedSegments.find((segment) => segment.id === expandedTimelineSegmentId) ||
      null,
    [expandedTimelineSegmentId, timelineCollapsedSegments, timelineLanes]
  );

  const toggleLaneExpanded = useCallback((laneKey) => {
    setExpandedResolvingByLane((prev) => (prev[laneKey] ? {} : { [laneKey]: true }));
  }, []);

  useEffect(() => {
    setExpandedTimelineSegmentId("");
    setExpandedResolvingByLane({});
  }, [thread?.id]);

  const handleTimelineDragStart = useCallback((event) => {
    if (event.button !== 0) return;
    const container = timelineScrollRef.current;
    if (!container) return;
    event.preventDefault();
    timelineDragStateRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      moved: false,
    };
    setIsTimelineDragging(true);
  }, []);

  const handleTimelineDragMove = useCallback((event) => {
    const container = timelineScrollRef.current;
    const state = timelineDragStateRef.current;
    if (!container || !state.active) return;
    event.preventDefault();
    const delta = event.clientX - state.startX;
    if (Math.abs(delta) > 3) {
      state.moved = true;
    }
    container.scrollLeft = state.startScrollLeft - delta;
  }, []);

  const handleTimelineDragEnd = useCallback(() => {
    const state = timelineDragStateRef.current;
    if (!state.active) return;
    state.active = false;
    setIsTimelineDragging(false);
    if (state.moved) {
      timelineSuppressClickUntilRef.current = Date.now() + 180;
      state.moved = false;
    }
  }, []);

  const shouldIgnoreTimelineClick = useCallback(() => {
    return Date.now() < timelineSuppressClickUntilRef.current;
  }, []);

  useEffect(() => {
    const onMove = (event) => handleTimelineDragMove(event);
    const onUp = () => handleTimelineDragEnd();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [handleTimelineDragEnd, handleTimelineDragMove]);

  useEffect(() => {
    shownTrackerRef.current.clear();
  }, [thread?.public_id]);

  useEffect(() => {
    if (!thread?.public_id || !macros.length) return;
    const events = [];

    macros.forEach((macro) => {
      const macroId = typeof macro.id === "string" ? macro.id : "";
      const macroCode = typeof macro.code === "string" ? macro.code : "";
      if (!macroId || !macroCode) return;

      const dedupeKey = `${thread.public_id}:${macroId}:shown`;
      if (shownTrackerRef.current.has(dedupeKey)) return;
      shownTrackerRef.current.add(dedupeKey);

      events.push({
        macro_id: macroId,
        macro_code: macroCode,
        category_code: macro.category_code || "general",
        thread_public_id: thread.public_id,
        event_type: "shown",
        app_key: ticketAppKey,
        env_key: runtimeEnvKey,
        metadata: {
          source: "support_ticket",
        },
      });
    });

    if (!events.length) return;
    trackSupportMacroEvents({ events }).catch(() => {});
  }, [macros, runtimeEnvKey, thread?.public_id, ticketAppKey]);

  const executeMacroCopy = async (macro) => {
    const macroBody = typeof macro?.body === "string" ? macro.body : "";
    const macroId = typeof macro?.id === "string" ? macro.id : "";
    const macroCode = typeof macro?.code === "string" ? macro.code : "";
    if (!macroBody || !macroId || !macroCode) return false;

    try {
      await navigator.clipboard.writeText(macroBody);
      setCopiedId(macroId);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      return false;
    }

    trackSupportMacroEvents({
      events: [
        {
          macro_id: macroId,
          macro_code: macroCode,
          category_code: macro.category_code || "general",
          thread_public_id: thread?.public_id || null,
          event_type: "copied",
          app_key: ticketAppKey,
          env_key: runtimeEnvKey,
          metadata: {
            source: "support_ticket",
            flow_screen: flowScreen,
          },
        },
      ],
    }).catch(() => {});

    return true;
  };

  const handleCopy = (macro) => {
    if (!macro) return;
    void executeMacroCopy(macro).then((ok) => {
      if (!ok) return;

      if (flowScreen === FLOW_SCREENS.OPENING_MESSAGE || flowScreen === FLOW_SCREENS.OPENING_FOLLOWUP) {
        setOpeningFocusedMacro(macro);
        return;
      }

      if (flowScreen === FLOW_SCREENS.RESOLUTION_ACTIVE) {
        setResolutionFocusedMacro(macro);
        setResolutionReminderMacro(macro);
        setResolutionSendReminderOpen(false);
        if (resolutionSendReminderTimerRef.current) {
          globalThis.clearTimeout(resolutionSendReminderTimerRef.current);
        }
        resolutionSendReminderTimerRef.current = globalThis.setTimeout(() => {
          setResolutionSendReminderOpen(true);
        }, 15000);
        return;
      }

      if (flowScreen === FLOW_SCREENS.CLOSING_PREP) {
        setClosingFocusedMacro(macro);
      }
    });
  };

  const handleAddNote = async () => {
    if (!noteDraft.trim()) return;
    const result = await addSupportNote({
      thread_public_id: thread.public_id,
      body: noteDraft.trim(),
    });
    if (result.ok) {
      setNotes((prev) => [{ ...result.data.note, body: noteDraft.trim() }, ...prev]);
      setNoteDraft("");
    }
  };

  const handleStatus = async (status) => {
    const result = await updateSupportStatus({
      thread_public_id: thread.public_id,
      status,
    });
    if (result.ok) {
      const responseThread = result?.data?.thread || null;
      setThread((prev) => ({
        ...prev,
        ...(responseThread || {}),
        status: responseThread?.status || status,
      }));
      await refreshCatalog({ forceSync: true });
      return true;
    }
    return false;
  };

  const handleClose = async () => {
    if (closingRequest) return;
    setClosingRequest(true);
    setOpeningStepError("");
    try {
      const finalResolution = pickFirstString(closingCommentDraft, "Ticket resuelto por soporte");
      const result = await closeSupportThread({
        thread_public_id: thread.public_id,
        resolution: finalResolution,
        root_cause: "",
      });
      if (result.ok) {
        const responseThread = result?.data?.thread || null;
        setThread((prev) => ({
          ...prev,
          ...(responseThread || {}),
          status: responseThread?.status || "closed",
            resolution: responseThread?.resolution || finalResolution,
            root_cause: responseThread?.root_cause || "",
        }));
        setFlowScreen(FLOW_SCREENS.RESOLUTION_ACTIVE);
        setResolutionSendReminderOpen(false);
        setResolutionFocusedMacro(null);
        setOpeningFocusedMacro(null);
        await refreshCatalog({ forceSync: true });
      } else {
        setOpeningStepError("No se pudo cerrar el ticket. Intenta nuevamente.");
      }
    } finally {
      setClosingRequest(false);
    }
  };

  const handleOpeningMessageSent = async ({ moveToInProgress = false } = {}) => {
    if (!thread?.public_id || openingSaving) return false;
    setOpeningSaving(true);
    const result = await markSupportOpeningMessage({
      thread_public_id: thread.public_id,
    });
    setOpeningSaving(false);
    if (!result.ok) return false;
    setThread((prev) =>
      prev
        ? {
            ...prev,
            opening_message_sent_at:
              result?.data?.opening_message_sent_at || new Date().toISOString(),
          }
        : prev,
    );
    if (moveToInProgress) {
      const statusOk = await handleStatus("in_progress");
      if (!statusOk) return false;
    }
    return true;
  };

  const handleStartingContinue = async () => {
    if (!thread?.public_id) return;
    if (whatsAppNameMarked) {
      setFlowScreen(FLOW_SCREENS.OPENING_MESSAGE);
      return;
    }
    setStartingGuideError("");
    setWhatsAppNameSaving(true);
    const result = await markSupportWhatsAppNameChanged({
      thread_public_id: thread.public_id,
      target_label: openingTargetLabel,
    });
    setWhatsAppNameSaving(false);
    if (!result.ok) {
      setStartingGuideError("No se pudo guardar la confirmacion de WhatsApp. Intenta nuevamente.");
      return;
    }
    setWhatsAppNameMarked(true);
    setFlowScreen(FLOW_SCREENS.OPENING_MESSAGE);
  };

  const handleMacroFlowUserResponded = async () => {
    if (!thread?.public_id) return;
    if (thread.status === "waiting_user" || thread.status === "queued") {
      const ok = await handleStatus("in_progress");
      if (!ok) return;
    }
    setResolutionSendReminderOpen(false);
    if (resolutionSendReminderTimerRef.current) {
      globalThis.clearTimeout(resolutionSendReminderTimerRef.current);
    }
    setFlowScreen(FLOW_SCREENS.RESOLUTION_ACTIVE);
  };

  const persistWorkflowAction = async (action, payload = {}) => {
    const response = await sendSupportWorkflowAction({
      thread_public_id: thread.public_id,
      action,
      payload: {
        ...payload,
        flow_screen: flowScreen,
      },
    });
    if (!response.ok || response?.data?.ok === false) {
      return { ok: false };
    }
    const nextThread = response?.data?.thread || null;
    if (nextThread) {
      setThread((prev) => ({ ...prev, ...nextThread }));
    }
    return { ok: true, data: response.data };
  };

  const handleStartWhatsappGuide = () => {
    setStartingGuideError("");
    setFlowScreen(FLOW_SCREENS.WHATSAPP_GUIDE);
  };

  const handleOpeningStepSubmit = async () => {
    setOpeningStepError("");
    const ok = await handleOpeningMessageSent({ moveToInProgress: true });
    if (!ok) {
      setOpeningStepError("No se pudo confirmar el mensaje de apertura. Intenta nuevamente.");
      return;
    }
    setFlowScreen(FLOW_SCREENS.OPENING_FOLLOWUP);
  };

  const handleOpeningResetForRecopy = async () => {
    if (!thread?.public_id || workflowSaving) return;
    setWorkflowSaving(true);
    setOpeningStepError("");
    const response = await persistWorkflowAction("opening_message_reset");
    setWorkflowSaving(false);
    if (!response.ok) {
      setOpeningStepError("No se pudo reabrir el mensaje de apertura. Intenta nuevamente.");
      return;
    }
    setThread((prev) =>
      prev
        ? {
            ...prev,
            opening_message_sent_at: null,
            opening_message_actor_id: null,
          }
        : prev,
    );
    setFlowScreen(FLOW_SCREENS.OPENING_MESSAGE);
  };

  const handleResolutionMessageSent = async () => {
    if (!thread?.public_id || workflowSaving) return;
    setWorkflowSaving(true);
    setOpeningStepError("");
    const response = await persistWorkflowAction("resolution_message_sent");
    setWorkflowSaving(false);
    if (!response.ok) {
      setOpeningStepError("No se pudo guardar el envio de mensaje. Intenta nuevamente.");
      return;
    }
    if (resolutionSendReminderTimerRef.current) {
      globalThis.clearTimeout(resolutionSendReminderTimerRef.current);
    }
    setResolutionSendReminderOpen(false);
    setFlowScreen(FLOW_SCREENS.RESOLUTION_FOLLOWUP);
  };

  const handleStartClosingFlow = async () => {
    setOpeningStepError("");
    const ok = await handleStatus("closing");
    if (!ok) {
      setOpeningStepError("No se pudo iniciar el flujo de cierre. Intenta nuevamente.");
      return;
    }
    setClosingFocusedMacro(null);
    setFlowScreen(FLOW_SCREENS.CLOSING_PREP);
  };

  const handleBackToResolutionFollowup = async () => {
    setOpeningStepError("");
    const ok = await handleStatus("in_progress");
    if (!ok) {
      setOpeningStepError("No se pudo volver al seguimiento activo. Intenta nuevamente.");
      return;
    }
    setClosingFocusedMacro(null);
    setFlowScreen(FLOW_SCREENS.RESOLUTION_FOLLOWUP);
  };

  const handleClosingMessageSent = async () => {
    if (!thread?.public_id || workflowSaving) return;
    setWorkflowSaving(true);
    setOpeningStepError("");
    const response = await persistWorkflowAction("closing_message_sent");
    setWorkflowSaving(false);
    if (!response.ok) {
      setOpeningStepError("No se pudo registrar el mensaje de cierre. Intenta nuevamente.");
      return;
    }
    const eventAt = pickFirstString(response?.data?.event_at, new Date().toISOString());
    setClosingMessageSentAt(eventAt);
    setClosingFocusedMacro(null);
    setFlowScreen(FLOW_SCREENS.CLOSING_WAIT);
  };

  const handleBackToIssueDecision = async () => {
    setOpeningStepError("");
    const ok = await handleStatus("in_progress");
    if (!ok) {
      setOpeningStepError("No se pudo continuar la resolucion. Intenta nuevamente.");
      return;
    }
    setClosingFocusedMacro(null);
    setFlowScreen(FLOW_SCREENS.NEW_ISSUE_DECISION);
  };

  const handleCloseOutcome = async (outcome) => {
    const closingComment = closingCommentDraft.trim();
    if (!closingComment) {
      setOpeningStepError("Debes ingresar un comentario de cierre antes de continuar.");
      return;
    }
    if (!thread?.public_id || workflowSaving) return;

    setWorkflowSaving(true);
    setOpeningStepError("");
    const response = await persistWorkflowAction("close_outcome", {
      outcome,
      comment: closingComment,
    });
    if (!response.ok) {
      setWorkflowSaving(false);
      setOpeningStepError("No se pudo registrar el resultado de cierre. Intenta nuevamente.");
      return;
    }

    const closeResult = await closeSupportThread({
      thread_public_id: thread.public_id,
      resolution: closingComment,
      root_cause: outcome === "inactive_close" ? "inactive_close" : "user_confirmed",
    });
    setWorkflowSaving(false);
    if (!closeResult.ok) {
      setOpeningStepError("No se pudo cerrar el ticket. Intenta nuevamente.");
      return;
    }

    const responseThread = closeResult?.data?.thread || null;
    setThread((prev) => ({
      ...prev,
      ...(responseThread || {}),
      status: responseThread?.status || "closed",
      resolution: responseThread?.resolution || closingComment,
      root_cause: responseThread?.root_cause || (outcome === "inactive_close" ? "inactive_close" : "user_confirmed"),
    }));
    setFlowScreen(FLOW_SCREENS.RESOLUTION_ACTIVE);
    setResolutionFocusedMacro(null);
    setOpeningFocusedMacro(null);
    setClosingFocusedMacro(null);
    await refreshCatalog({ forceSync: true });
  };

  const handleIssueContextSet = async (mode) => {
    if (!thread?.public_id || workflowSaving) return;
    if (!newIssueReasonDraft.trim()) {
      setOpeningStepError("Debes registrar la razon para continuar.");
      return;
    }
    setWorkflowSaving(true);
    setOpeningStepError("");
    const response = await persistWorkflowAction("issue_context_set", {
      mode,
      reason: newIssueReasonDraft.trim(),
      category: newIssueCategoryDraft || thread.category || null,
    });
    setWorkflowSaving(false);
    if (!response.ok) {
      setOpeningStepError("No se pudo guardar el contexto de la inquietud. Intenta nuevamente.");
      return;
    }
    setFlowScreen(FLOW_SCREENS.NEW_ISSUE_INFO);
  };

  const handleInfoMessageSent = async () => {
    if (!thread?.public_id || workflowSaving) return;
    setWorkflowSaving(true);
    setOpeningStepError("");
    const response = await persistWorkflowAction("info_message_sent", {
      reason: newIssueReasonDraft.trim(),
      category: newIssueCategoryDraft || thread.category || null,
    });
    setWorkflowSaving(false);
    if (!response.ok) {
      setOpeningStepError("No se pudo registrar el mensaje de informacion. Intenta nuevamente.");
      return;
    }
    setFlowScreen(FLOW_SCREENS.RESOLUTION_ACTIVE);
  };

  const availableCategories = useMemo(
    () =>
      (catalog.categories || [])
        .filter((item) => {
          const status = String(item?.status || "published").toLowerCase();
          return status === "published" || status === "active";
        })
        .map((item) => ({
          code: pickFirstString(item?.code, item?.id),
          label: pickFirstString(item?.label, item?.code, item?.id),
        }))
        .filter((item) => item.code),
    [catalog.categories],
  );
  const categoryOptions = useMemo(() => {
    const byCode = new Map();
    availableCategories.forEach((item) => {
      if (!item?.code) return;
      byCode.set(item.code, item);
    });
    const currentCode = pickFirstString(thread?.category);
    if (currentCode && !byCode.has(currentCode)) {
      byCode.set(currentCode, {
        code: currentCode,
        label: formatSupportCategoryLabel(currentCode),
      });
    }
    return Array.from(byCode.values());
  }, [availableCategories, thread?.category]);
  useEffect(() => {
    if (flowScreen !== FLOW_SCREENS.NEW_ISSUE_DECISION) return;
    if (newIssueCategoryDraft) return;
    const fallbackCategory = pickFirstString(thread?.category, categoryOptions[0]?.code);
    if (!fallbackCategory) return;
    setNewIssueCategoryDraft(fallbackCategory);
  }, [categoryOptions, flowScreen, newIssueCategoryDraft, thread?.category]);

  if (!thread) {
    return <div className="text-sm text-slate-500">Cargando ticket...</div>;
  }

  const isTerminalStage = thread.status === "closed" || thread.status === "cancelled";
  const hasHandoffMark = Boolean(thread.handoff_required) && !isTerminalStage;
  const showStartingIntro = flowScreen === FLOW_SCREENS.STARTING_INTRO;
  const showWhatsappGuideScreen = flowScreen === FLOW_SCREENS.WHATSAPP_GUIDE;
  const showOpeningMessageStep = flowScreen === FLOW_SCREENS.OPENING_MESSAGE;
  const showOpeningFollowupStep = flowScreen === FLOW_SCREENS.OPENING_FOLLOWUP;
  const showResolutionActiveStep = flowScreen === FLOW_SCREENS.RESOLUTION_ACTIVE;
  const showResolutionFollowupStep = flowScreen === FLOW_SCREENS.RESOLUTION_FOLLOWUP;
  const showClosingPrepStep = flowScreen === FLOW_SCREENS.CLOSING_PREP;
  const showClosingWaitStep = flowScreen === FLOW_SCREENS.CLOSING_WAIT;
  const showClosingConfirmStep = flowScreen === FLOW_SCREENS.CLOSING_CONFIRM;
  const showNewIssueDecisionStep = flowScreen === FLOW_SCREENS.NEW_ISSUE_DECISION;
  const showNewIssueInfoStep = flowScreen === FLOW_SCREENS.NEW_ISSUE_INFO;
  const leftColumnScreenNumber = (() => {
    const map = {
      [FLOW_SCREENS.STARTING_INTRO]: "Screen 1",
      [FLOW_SCREENS.WHATSAPP_GUIDE]: "Screen 2",
      [FLOW_SCREENS.OPENING_MESSAGE]: "Screen 3",
      [FLOW_SCREENS.OPENING_FOLLOWUP]: "Screen 4",
      [FLOW_SCREENS.RESOLUTION_ACTIVE]: "Screen 5",
      [FLOW_SCREENS.RESOLUTION_FOLLOWUP]: "Screen 6",
      [FLOW_SCREENS.CLOSING_PREP]: "Screen 7",
      [FLOW_SCREENS.CLOSING_WAIT]: "Screen 8",
      [FLOW_SCREENS.CLOSING_CONFIRM]: "Screen 9",
      [FLOW_SCREENS.NEW_ISSUE_DECISION]: "Screen 10",
      [FLOW_SCREENS.NEW_ISSUE_INFO]: "Screen 11",
    };
    return map[flowScreen] || "Screen";
  })();
  const openingTargetLabel =
    thread.request_origin === "anonymous"
      ? thread.anon_profile?.public_id || thread.user_public_id || "No especificado"
      : thread.user_public_id || "No especificado";
  const floatingStatusLabel = formatSupportThreadStatusLabel(thread.status);
  const ticketDescription = pickFirstString(thread.summary) || "Sin descripcion adicional.";
  const ticketCategoryLabel = formatSupportCategoryLabel(thread.category);
  const ticketActiveSinceMs = new Date(
    thread.created_at || thread.updated_at || new Date().toISOString(),
  ).getTime();
  const ticketActiveLabel = formatElapsedClock(activeNowMs - ticketActiveSinceMs);
  const closingWaitTotalMs = CLOSING_CONFIRM_WAIT_SECONDS * 1000;
  const closingElapsedMs = closingMessageSentAt
    ? Math.max(0, activeNowMs - new Date(closingMessageSentAt).getTime())
    : 0;
  const closingRemainingMs = Math.max(0, closingWaitTotalMs - closingElapsedMs);
  const closingWaitReady = closingRemainingMs === 0;
  const closingRemainingLabel = formatElapsedClock(closingRemainingMs);
  const canSaveIssueContext = newIssueReasonDraft.trim().length > 0;
  const hasPersonalQueue = personalQueueThreads.length > 0;
  const followupModeLabel =
    thread.status === "waiting_user"
      ? "Esperando respuesta de usuario"
      : thread.status === "queued" && thread.personal_queue
        ? "En cola personal"
        : thread.status === "queued"
          ? "En cola general"
          : "Flujo de seguimiento activo";
  const renderModalLayer = (node) => {
    if (typeof document === "undefined" || !document.body) return null;
    return createPortal(node, document.body);
  };
  const renderMacroSuggestionsContent = ({
    focusedMacro = null,
    onBack = null,
    overlay = null,
  } = {}) => (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-semibold text-[#2F1A55]">
          Macros sugeridas
        </div>
        <button
          type="button"
          onClick={() => {
            void refreshCatalog({ forceSync: true });
          }}
          disabled={refreshingMacros}
          className="inline-flex items-center gap-1 rounded-full border border-[#E9E2F7] px-2.5 py-1 text-[11px] font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={12} className={refreshingMacros ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
      <div
        className={`no-scrollbar mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto ${overlay ? "pointer-events-none opacity-45" : ""}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {focusedMacro ? (
          <div className="space-y-2">
            <div className="rounded-2xl border border-[#E9E2F7] bg-white px-3 py-3 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-[#2F1A55]">
                {focusedMacro.displayTitle || focusedMacro.title}
              </div>
              <div>{focusedMacro.body}</div>
              <button
                type="button"
                onClick={() => handleCopy(focusedMacro)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#5E30A5]"
              >
                {copiedId === focusedMacro.id ? (
                  <>
                    <ClipboardCheck size={14} /> Copiado
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copiar
                  </>
                )}
              </button>
            </div>
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              >
                <ChevronRight size={13} className="rotate-180" />
                Volver
              </button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-3">
        {catalogLoadError && !hasCatalogData ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {catalogLoadError}
          </div>
        ) : macros.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-500">
            No hay macros publicadas para este estado/app.
          </div>
        ) : (
          macroGroups.map((group) => {
            const isOpen = Boolean(expandedMacroGroups[group.key]);
            return (
              <div
                key={group.key}
                className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
              >
                <button
                  type="button"
                  onClick={() => toggleMacroGroup(group.key)}
                  className="flex w-full items-center justify-between gap-2 text-left"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2F1A55]">
                    {group.label}
                  </div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                    <span>{group.items.length}</span>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </button>

                {isOpen ? (
                  <div className="mt-2 space-y-2">
                    {group.items.map((macro) => (
                      <div
                        key={macro.id}
                        className="rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-600 space-y-2"
                      >
                        <div className="font-semibold text-[#2F1A55]">
                          {macro.displayTitle || macro.title}
                        </div>
                        <div>{macro.body}</div>
                        <button
                          type="button"
                          onClick={() => handleCopy(macro)}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5E30A5]"
                        >
                          {copiedId === macro.id ? (
                            <>
                              <ClipboardCheck size={14} /> Copiado
                            </>
                          ) : (
                            <>
                              <Copy size={14} /> Copiar
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
          </div>
        )}
      </div>
      {overlay ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/72 backdrop-blur-[1px]">
          <div className="flex h-[75%] w-[90%] flex-col items-center justify-center rounded-2xl bg-[#F7F3FF] px-6 py-6 text-center shadow-xl">
            <div className="text-xl font-semibold leading-snug text-[#2F1A55]">
              {overlay.message}
            </div>
            {overlay.onClick && overlay.label ? (
              <button
                type="button"
                onClick={overlay.onClick}
                className="mt-5 rounded-xl border border-[#E9E2F7] bg-white px-5 py-2 text-sm font-semibold text-[#5E30A5]"
              >
                {overlay.label}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="space-y-6">
      {debugBanner}
      <div className="support-ticket-floating-actions fixed left-1/2 top-0 z-[200] -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-b-2xl border-x border-b border-t-0 border-[#BCC5D1] bg-slate-100/92 px-3 py-2 shadow-lg backdrop-blur">
          {thread.status === "closed" ? (
            <div className="inline-flex items-center gap-2 rounded-xl border border-[#1B7F4B]/45 px-3 py-1 text-xs font-semibold text-[#1B7F4B]">
              <span>Estado: Resuelto</span>
              <Check size={14} />
            </div>
          ) : (
            <>
              <span className="mr-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                {floatingStatusLabel}
              </span>
              <button
                type="button"
                onClick={() => handleStatus("queued")}
                className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Liberar a cola
              </button>
            </>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-[0.25em] text-[#5E30A5]/70">
            Ticket {thread.public_id}
          </div>
          <button
            type="button"
            onClick={() => navigate(backPath)}
            className="rounded-full border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-600"
          >
            Volver
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
              thread.request_origin === "anonymous"
                ? "bg-[#FFF7E6] text-[#B46B00]"
                : "bg-[#EAF7F0] text-[#1B7F4B]"
            }`}
          >
            {thread.request_origin === "anonymous" ? "Anonimo" : "Registrado"}
          </span>
          {thread.origin_source ? (
            <span className="rounded-full bg-[#F0EBFF] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5E30A5]">
              {thread.origin_source}
            </span>
          ) : null}
          <span className="rounded-full bg-[#EAF4FF] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0D4F9A]">
            {ticketAppKey}
          </span>
        </div>
      </div>

      {hasHandoffMark ? (
        <div className="rounded-2xl border border-[#F5E1B5] bg-[#FFF9ED] px-4 py-3 text-xs text-[#8A5A00]">
          <div className="font-semibold text-[#8A5A00]">
            Ticket liberado por abandono del asesor anterior
          </div>
          <div className="mt-1">
            Continua con mensaje de apertura antes de retomar la atencion.
            {thread.handoff_at ? ` Marca registrada: ${formatDateTime(thread.handoff_at)}.` : ""}
          </div>
        </div>
      ) : null}

      {!isTerminalStage ? (
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5">
          {showStartingIntro ? (
            hasPersonalQueue ? (
              <div
                className="grid min-w-0 gap-4"
                style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)" }}
              >
                <div
                  className="no-scrollbar overflow-y-auto rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-4"
                  style={{ height: "78vh", scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="inline-flex rounded-full border border-[#D9CCF0] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5E30A5]">
                    {leftColumnScreenNumber}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[#2F1A55]">Cola personal</div>
                  <div className="mt-3 space-y-2">
                    {personalQueueThreads.map((queueThread) => (
                      <div
                        key={queueThread.public_id}
                        className="rounded-2xl border border-[#E9E2F7] bg-white px-3 py-3 text-xs text-slate-600"
                      >
                        <div className="font-semibold text-[#2F1A55]">
                          {queueThread.public_id} | {formatSupportCategoryLabel(queueThread.category)}
                        </div>
                        <div className="mt-1">{pickFirstString(queueThread.summary) || "Sin descripcion"}</div>
                        <div className="mt-1 text-[11px] text-slate-500">
                          {pickFirstString(queueThread.user_public_id) || "No especificado"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="no-scrollbar overflow-y-auto rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-4"
                  style={{ height: "78vh", scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-[#2F1A55]">
                        Se te asigno el ticket {thread.public_id}
                      </div>
                      <div className="text-sm font-medium text-slate-700">{ticketDescription}</div>
                      <div className="text-sm font-medium text-slate-700">Categoria: {ticketCategoryLabel}</div>
                      <div className="text-sm font-medium text-slate-700">Tiempo activo: {ticketActiveLabel}</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartWhatsappGuide}
                      className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Empezar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[78vh] flex-col items-center justify-center gap-5 rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-6 text-center">
                <div className="inline-flex rounded-full border border-[#D9CCF0] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5E30A5]">
                  {leftColumnScreenNumber}
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-[#2F1A55]">
                    Se te asigno el ticket {thread.public_id}
                  </div>
                  <div className="text-sm font-medium text-slate-700">{ticketDescription}</div>
                  <div className="text-sm font-medium text-slate-700">Categoria: {ticketCategoryLabel}</div>
                  <div className="text-sm font-medium text-slate-700">Tiempo activo: {ticketActiveLabel}</div>
                </div>
                <button
                  type="button"
                  onClick={handleStartWhatsappGuide}
                  className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
                >
                  Empezar
                </button>
              </div>
            )
          ) : null}

          {showWhatsappGuideScreen ? (
            <div
              className="grid min-w-0 gap-4"
              style={{ height: "78vh", gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)" }}
            >
              <div
                className="no-scrollbar h-full overflow-y-auto rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex h-full flex-col">
                  <div className="inline-flex rounded-full border border-[#D9CCF0] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5E30A5]">
                    {leftColumnScreenNumber}
                  </div>
                  <div className="mt-6 rounded-2xl border border-[#E9E2F7] bg-white px-4 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="max-w-[calc(100%-2.5rem)] truncate text-2xl font-bold tracking-[0.08em] text-[#2F1A55]">
                        {openingTargetLabel}
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(openingTargetLabel);
                          } catch {
                            // no-op
                          }
                        }}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E9E2F7] text-[#5E30A5]"
                        aria-label="Copiar usuario"
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      void handleStartingContinue();
                    }}
                    disabled={whatsAppNameSaving}
                    className="mt-auto w-full rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {whatsAppNameSaving ? "Guardando..." : "Ya cambie el nombre, continuar"}
                  </button>
                </div>
              </div>
              <div
                className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-4 h-full overflow-hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="grid h-full grid-rows-3 gap-0">
                  {[
                    {
                      key: "open-chat",
                      text: "Abre el chat del cliente y verifica que el ticket corresponde al usuario.",
                      mediaRight: false,
                    },
                    {
                      key: "rename-contact",
                      text: "Actualiza el nombre del contacto con el display id del usuario para trazabilidad.",
                      mediaRight: true,
                    },
                    {
                      key: "confirm-name",
                      text: "Valida que el nombre quedo guardado y vuelve al ticket para continuar.",
                      mediaRight: false,
                    },
                  ].map((step, index) => {
                    const mediaBlock = (
                      <div
                        className="shrink-0 rounded-xl border border-dashed border-[#BFA8E7] bg-white/85 px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6D4EA8]"
                        style={{ width: "12.5rem", height: "100%", flex: "0 0 12.5rem" }}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          Mockup GIF / Imagen
                        </div>
                      </div>
                    );
                    const stepIcon = (
                      <div
                        className="flex shrink-0 items-center justify-center rounded-xl border border-[#DCCEF2] bg-white shadow-[0_2px_8px_rgba(94,48,165,0.12)]"
                        style={{ width: "3.8rem", height: "3.8rem", flex: "0 0 3.8rem" }}
                      >
                        <span
                          className="text-[2.65rem] font-extrabold leading-none text-transparent"
                          style={{ WebkitTextStroke: "2.4px #6A43C4" }}
                        >
                          {index + 1}
                        </span>
                      </div>
                    );
                    const stepText = (
                      <div className="min-w-0 flex-1 text-sm leading-relaxed text-slate-600">{step.text}</div>
                    );
                    return (
                      <div
                        key={step.key}
                        className="h-full min-h-0 rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
                      >
                        {step.mediaRight ? (
                          <div className="flex h-full flex-nowrap items-center gap-3">
                            {stepIcon}
                            {stepText}
                            {mediaBlock}
                          </div>
                        ) : (
                          <div className="flex h-full flex-nowrap items-center gap-3">
                            {mediaBlock}
                            {stepIcon}
                            {stepText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {!showStartingIntro && !showWhatsappGuideScreen ? (
            <div
              className="grid min-w-0 gap-4"
              style={{ height: "78vh", gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)" }}
            >
              <div
                className="no-scrollbar overflow-y-auto rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="inline-flex rounded-full border border-[#D9CCF0] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5E30A5]">
                  {leftColumnScreenNumber}
                </div>
                {showOpeningMessageStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-[#2F1A55]">Mensaje de apertura</div>
                      <div className="text-sm text-slate-700">
                        Envia el mensaje de apertura y confirma para continuar.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void handleOpeningStepSubmit();
                      }}
                      disabled={openingSaving}
                      className="mt-auto w-full rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {openingSaving ? "Guardando..." : "Ya envie mensaje de apertura"}
                    </button>
                  </div>
                ) : null}
                {showOpeningFollowupStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-[#2F1A55]">{followupModeLabel}</div>
                      <div className="text-sm text-slate-700">
                        Espera la respuesta del usuario para retomar la atencion.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void handleMacroFlowUserResponded();
                      }}
                      className="mt-auto w-full rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Usuario respondio
                    </button>
                  </div>
                ) : null}
                {showResolutionActiveStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-[#2F1A55]">Resolucion en progreso</div>
                      <div className="rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-700">
                        Ticket activo: <span className="font-semibold text-[#2F1A55]">{thread.public_id}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          void handleResolutionMessageSent();
                        }}
                        disabled={workflowSaving}
                        className="mt-6 w-full rounded-xl border-2 border-[#CAB6EA] bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {workflowSaving ? "Guardando..." : "Mensaje enviado"}
                      </button>
                    </div>
                    <div className="mt-auto pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          void handleStartClosingFlow();
                        }}
                        className="w-full rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
                      >
                        Marcar como resuelto
                      </button>
                    </div>
                  </div>
                ) : null}
                {showResolutionFollowupStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-[#2F1A55]">{followupModeLabel}</div>
                      <div className="text-sm text-slate-700">
                        Mantente en seguimiento y retoma el flujo cuando el usuario responda.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void handleMacroFlowUserResponded();
                      }}
                      className="mt-auto w-full rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Usuario respondio
                    </button>
                  </div>
                ) : null}
                {showClosingPrepStep ? (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-lg font-semibold text-[#2F1A55]">Confirmacion de cierre</div>
                      <button
                        type="button"
                        onClick={() => {
                          void handleBackToResolutionFollowup();
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E9E2F7] bg-white text-slate-700"
                        aria-label="Volver a screen 6"
                      >
                        <ChevronRight size={14} className="rotate-180" />
                      </button>
                    </div>
                    <div className="text-sm text-slate-700">
                      Envia mensaje de confirmacion de cierre antes de continuar.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void handleClosingMessageSent();
                      }}
                      disabled={workflowSaving}
                      className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {workflowSaving ? "Guardando..." : "Mensaje de cierre enviado"}
                    </button>
                  </div>
                ) : null}
                {showClosingWaitStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-[#2F1A55]">Esperando confirmacion de cierre</div>
                      <div className="text-sm text-slate-700">Tiempo restante para habilitar confirmacion:</div>
                      <div className="text-center text-3xl font-extrabold tracking-[0.05em] text-[#2F1A55]">
                        {closingRemainingLabel}
                      </div>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          void handleBackToIssueDecision();
                        }}
                        className="rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                      >
                        Continuar resolucion
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlowScreen(FLOW_SCREENS.CLOSING_CONFIRM)}
                        disabled={!closingWaitReady}
                        className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Confirmar cierre
                      </button>
                    </div>
                  </div>
                ) : null}
                {showClosingConfirmStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-[#2F1A55]">Confirmar cierre final</div>
                      <textarea
                        value={closingCommentDraft}
                        onChange={(event) => setClosingCommentDraft(event.target.value)}
                        placeholder="Comentario de cierre (obligatorio)"
                        rows={4}
                        className="w-full rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          void handleBackToIssueDecision();
                        }}
                        className="w-full rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                      >
                        Continuar resolucion
                      </button>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            void handleCloseOutcome("user_confirmed");
                          }}
                          disabled={workflowSaving}
                          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Confirmado
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            void handleCloseOutcome("inactive_close");
                          }}
                          disabled={workflowSaving}
                          className="rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Inactivo
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {showNewIssueDecisionStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-[#2F1A55]">Nueva inquietud</div>
                      <div className="text-sm text-slate-700">Define el problema antes de continuar.</div>
                      <textarea
                        value={newIssueReasonDraft}
                        onChange={(event) => setNewIssueReasonDraft(event.target.value)}
                        placeholder="Razon (obligatorio)"
                        rows={3}
                        className="w-full rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                      />
                      <select
                        value={newIssueCategoryDraft}
                        onChange={(event) => setNewIssueCategoryDraft(event.target.value)}
                        className="w-full rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5]"
                      >
                        {categoryOptions.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          void handleIssueContextSet("new");
                        }}
                        disabled={!canSaveIssueContext || workflowSaving}
                        className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Nueva inquietud
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          void handleIssueContextSet("same");
                        }}
                        disabled={!canSaveIssueContext || workflowSaving}
                        className="rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Misma inquietud
                      </button>
                    </div>
                  </div>
                ) : null}
                {showNewIssueInfoStep ? (
                  <div className="mt-4 flex h-[calc(100%-2.5rem)] flex-col">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-lg font-semibold text-[#2F1A55]">Recoleccion de informacion</div>
                        <button
                          type="button"
                          onClick={() => setFlowScreen(FLOW_SCREENS.NEW_ISSUE_DECISION)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E9E2F7] bg-white text-slate-700"
                          aria-label="Volver a screen 10"
                        >
                          <ChevronRight size={14} className="rotate-180" />
                        </button>
                      </div>
                      <div className="text-sm text-slate-700">
                        Envia mensaje de informacion y regresa al flujo de resolucion.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void handleInfoMessageSent();
                      }}
                      disabled={workflowSaving}
                      className="mt-auto w-full rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {workflowSaving ? "Guardando..." : "Mensaje de info enviado"}
                    </button>
                  </div>
                ) : null}
              </div>
              <div
                className="no-scrollbar h-full overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white p-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {showOpeningMessageStep
                  ? renderMacroSuggestionsContent({
                    focusedMacro: openingFocusedMacro,
                    onBack: openingFocusedMacro ? () => setOpeningFocusedMacro(null) : null,
                  })
                  : null}
                {showOpeningFollowupStep
                  ? renderMacroSuggestionsContent({
                    focusedMacro: openingFocusedMacro,
                    onBack: openingFocusedMacro ? () => setOpeningFocusedMacro(null) : null,
                    overlay: {
                      message: "Esperando respuesta de usuario",
                      label: "Copiar macro de nuevo",
                      onClick: () => {
                        void handleOpeningResetForRecopy();
                      },
                    },
                  })
                  : null}
                {showResolutionActiveStep
                  ? renderMacroSuggestionsContent({
                    focusedMacro: resolutionFocusedMacro,
                    onBack: resolutionFocusedMacro ? () => setResolutionFocusedMacro(null) : null,
                  })
                  : null}
                {showResolutionFollowupStep
                  ? renderMacroSuggestionsContent({
                    focusedMacro: resolutionFocusedMacro,
                    onBack: resolutionFocusedMacro ? () => setResolutionFocusedMacro(null) : null,
                    overlay: {
                      message: followupModeLabel,
                      label: "Copiar macro de nuevo",
                      onClick: () => {
                        setFlowScreen(FLOW_SCREENS.RESOLUTION_ACTIVE);
                        setResolutionSendReminderOpen(false);
                      },
                    },
                  })
                  : null}
                {showClosingPrepStep
                  ? renderMacroSuggestionsContent({
                    focusedMacro: closingFocusedMacro,
                    onBack: closingFocusedMacro ? () => setClosingFocusedMacro(null) : null,
                  })
                  : null}
                {showClosingWaitStep || showClosingConfirmStep
                  ? renderMacroSuggestionsContent({
                    overlay: {
                      message: "Esperando confirmacion de usuario sobre resolucion.",
                    },
                  })
                  : null}
                {showNewIssueDecisionStep
                  ? renderMacroSuggestionsContent({
                    overlay: {
                      message: "Define el problema antes de continuar.",
                    },
                  })
                  : null}
                {showNewIssueInfoStep ? renderMacroSuggestionsContent() : null}
              </div>
            </div>
          ) : null}
          {startingGuideError ? (
            <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {startingGuideError}
            </div>
          ) : null}
          {openingStepError ? (
            <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {openingStepError}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="grid min-w-0 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="order-2 rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-3">
            <div
              className="grid items-stretch gap-x-6"
              style={{ gridTemplateColumns: "25.5rem minmax(0, 1fr)" }}
            >
              <div className="w-[25.5rem] flex-none space-y-3">
                <div className="text-sm font-semibold text-[#2F1A55]">Contexto</div>
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: "repeat(2, minmax(0, 12rem))" }}
                >
                  {contextCards.map((item) => (
                    <SupportIdentityCard
                      key={item.key}
                      title={item.label}
                      value={item.value}
                      Icon={item.Icon}
                      tone={item.tone}
                    />
                  ))}
                </div>
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Build</div>
                  <div className="flex flex-wrap gap-2">
                    {buildCards.map((item) => (
                      <SupportIdentityCard
                        key={item.key}
                        title={item.label}
                        value={item.value}
                        Icon={item.Icon}
                        tone={item.tone}
                        compact
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {thread.request_origin === "anonymous" && thread.anon_profile ? (
              <div className="rounded-2xl border border-[#F5E1B5] bg-[#FFF9ED] p-3 text-xs text-[#8A5A00] space-y-1">
                <div>
                  Perfil anonimo: {thread.anon_profile.public_id}
                </div>
                {thread.anon_profile.display_name ? (
                  <div>Nombre: {thread.anon_profile.display_name}</div>
                ) : null}
                <div>
                  Canal: {thread.anon_profile.contact_channel || "N/A"}
                </div>
                <div>
                  Contacto: {thread.anon_profile.contact_value || "N/A"}
                </div>
              </div>
            ) : null}
          </div>

          <div className="order-1 relative z-0 isolate min-w-0 rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
            <div className="text-sm font-semibold text-[#2F1A55]">Timeline</div>
            {timelineLanes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-[#FCFBFF] px-3 py-4 text-center text-sm text-slate-500">
                Sin eventos para mostrar.
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  ref={timelineScrollRef}
                  className={`relative z-0 w-full max-w-full select-none overflow-x-auto overflow-y-hidden pb-1 [&::-webkit-scrollbar]:hidden ${
                    isTimelineDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  onMouseDown={handleTimelineDragStart}
                >
                  <div className="inline-flex min-w-max items-center">
                    {timelineLanes.map((laneSegments, laneIndex) => {
                      const laneKey = `${thread.id}:${laneIndex}`;
                      const compression = buildCollapsedResolvingLane(laneSegments);
                      const isResolvingExpanded = !!expandedResolvingByLane[laneKey];
                      const renderSegments =
                        compression.hasCollapsedResolving && !isResolvingExpanded
                          ? compression.collapsedSegments
                          : laneSegments;
                      const firstResolvingExpandedIndex = isResolvingExpanded
                        ? renderSegments.findIndex((segment) => segment.status === "in_progress")
                        : -1;
                      return (
                        <div
                          key={`${thread.id}-lane-${laneIndex}`}
                          className="flex items-center"
                        >
                          {renderSegments.map((segment, segmentIndex) => {
                            const isFirstVisibleSegment = laneIndex === 0 && segmentIndex === 0;
                            const isExpanded = expandedTimelineSegmentId === segment.id;
                            const blockClipPath =
                              "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)";
                            const reachedClass =
                              TIMELINE_BLOCK_REACHED_CLASSES[segment.status] || "bg-[#1E293B] text-white";
                            const colorClass = segment.isReached ? reachedClass : "bg-[#64748B] text-white";
                            const isCollapsedResolving = Boolean(segment.isCollapsedResolving);
                            const canShowExpandToggle =
                              compression.hasCollapsedResolving &&
                              !isResolvingExpanded &&
                              isCollapsedResolving;
                            const canShowCollapseToggle =
                              compression.hasCollapsedResolving &&
                              isResolvingExpanded &&
                              segmentIndex === firstResolvingExpandedIndex;
                            const canToggleResolvingFromBlock =
                              canShowExpandToggle && isCollapsedResolving;
                            return (
                              <div
                                key={segment.id}
                                className={isFirstVisibleSegment ? "overflow-hidden" : ""}
                                style={{
                                  marginLeft: isFirstVisibleSegment ? 0 : -18,
                                  zIndex:
                                    (timelineLanes.length - laneIndex) * 20 +
                                    (renderSegments.length - segmentIndex),
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (shouldIgnoreTimelineClick()) return;
                                    if (canToggleResolvingFromBlock) {
                                      toggleLaneExpanded(laneKey);
                                      setExpandedTimelineSegmentId("");
                                      return;
                                    }
                                    if (isExpanded) {
                                      setExpandedTimelineSegmentId("");
                                      return;
                                    }
                                    setExpandedTimelineSegmentId(segment.id);
                                  }}
                                  className={`relative h-12 shrink-0 overflow-hidden px-3 text-[11px] font-semibold transition ${colorClass} ${
                                    isExpanded ? "ring-2 ring-[#5E30A5] ring-offset-1" : "hover:brightness-[0.98]"
                                  }`}
                                  style={{
                                    clipPath: blockClipPath,
                                    width: "115px",
                                    minWidth: "115px",
                                  }}
                                >
                                  <span
                                    className={`pointer-events-none absolute inset-0 flex items-center justify-center text-center ${
                                      segment.status === "waiting_user" ? "leading-[1.05]" : "whitespace-nowrap"
                                    }`}
                                  >
                                    {segment.status === "waiting_user" ? (
                                      <>
                                        Esperando
                                        <br />
                                        usuario
                                      </>
                                    ) : (
                                      segment.label
                                    )}
                                  </span>
                                  {canShowExpandToggle ? (
                                    <span
                                      className="pointer-events-none absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-sm px-1 py-0.5 text-white/90"
                                      aria-hidden="true"
                                    >
                                      <svg
                                        width="10"
                                        height="20"
                                        viewBox="0 0 10 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M0.8 2.4L4.2 10L0.8 17.6"
                                          stroke="white"
                                          strokeWidth="1.3"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          vectorEffect="non-scaling-stroke"
                                        />
                                        <path
                                          d="M4.8 2.4L8.2 10L4.8 17.6"
                                          stroke="white"
                                          strokeWidth="1.3"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </span>
                                  ) : null}
                                  {canShowCollapseToggle ? (
                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        if (shouldIgnoreTimelineClick()) return;
                                        toggleLaneExpanded(laneKey);
                                        setExpandedTimelineSegmentId("");
                                      }}
                                      className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-sm px-1 py-0.5 text-white/90 hover:bg-black/10"
                                      aria-label="Cerrar resolviendo"
                                    >
                                      <svg
                                        width="10"
                                        height="20"
                                        viewBox="0 0 10 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M9.2 2.4L5.8 10L9.2 17.6"
                                          stroke="white"
                                          strokeWidth="1.3"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          vectorEffect="non-scaling-stroke"
                                        />
                                        <path
                                          d="M5.2 2.4L1.8 10L5.2 17.6"
                                          stroke="white"
                                          strokeWidth="1.3"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </button>
                                  ) : null}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {expandedTimelineSegment ? (
                  <div className="rounded-xl border border-[#E9E2F7] bg-white p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500">
                        Inicio: {formatTimelineDate(expandedTimelineSegment.startedAt)} | Fin:{" "}
                        {expandedTimelineSegment.endedAt ? formatTimelineDate(expandedTimelineSegment.endedAt) : "-"}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (shouldIgnoreTimelineClick()) return;
                          setExpandedTimelineSegmentId("");
                        }}
                        className="h-6 w-6 rounded-md border border-[#E9E2F7] text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                        aria-label="Cerrar detalle de etapa"
                      >
                        x
                      </button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {expandedTimelineSegment.events.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-[#E9E2F7] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-500">
                          Sin eventos registrados en esta etapa.
                        </div>
                      ) : (
                        expandedTimelineSegment.events.map((event, eventIndex) => (
                          <div
                            key={`${event.id || expandedTimelineSegment.id}-event-${eventIndex}`}
                            className="rounded-lg border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-600"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="font-semibold text-[#2F1A55]">
                                {EVENT_TYPE_LABELS[event.event_type] || event.event_type}
                              </div>
                              <div className="text-[11px] text-slate-400">{formatTimelineDate(event.created_at)}</div>
                            </div>
                            <div className="mt-1 text-[11px] text-slate-500">
                              Actor: {pickFirstString(event.actor_role, event.actor_id) || "No especificado"}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="border-t border-[#E9E2F7] pt-4 space-y-4">
                  <div className="text-sm font-semibold text-[#2F1A55]">Notas</div>
                  {thread.status !== "closed" ? (
                    <>
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Escribe una nota interna"
                        className="w-full rounded-2xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                        rows={3}
                      />
                      <button
                        type="button"
                        onClick={handleAddNote}
                        className="rounded-2xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white"
                      >
                        Guardar nota
                      </button>
                    </>
                  ) : null}
                  <div className="space-y-2">
                    {notes.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-500">
                        Sin notas registradas.
                      </div>
                    ) : (
                      notes.map((note) => (
                        <div
                          key={note.id}
                          className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600"
                        >
                          {note.body}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
            <div className="text-sm font-semibold text-[#2F1A55]">
              Logs de soporte
            </div>
            {logs.length === 0 ? (
              <div className="text-xs text-slate-500">
                No hay logs recientes.
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-600">
                {logs.map((log, index) => (
                  <div
                    key={`${log.id || log.category}-${index}`}
                    className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
                  >
                    <div className="text-[11px] text-slate-400">
                      {log.level} - {log.category} -{" "}
                      {formatDateTime(log.occurred_at || log.created_at)}
                    </div>
                    <div className="mt-1">{log.message}</div>
                    {log.route || log.screen ? (
                      <div className="mt-1 text-[11px] text-slate-400">
                        {log.route ? `Ruta: ${log.route}` : null}
                        {log.route && log.screen ? " | " : null}
                        {log.screen ? `Pantalla: ${log.screen}` : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6" />
      </div>

      {resolutionSendReminderOpen
        ? renderModalLayer(
            <div
              className="fixed inset-0 flex items-center justify-center px-4"
              style={{ position: "fixed", inset: 0, zIndex: 20000, backgroundColor: "rgba(2, 6, 23, 0.35)" }}
            >
              <div className="w-full max-w-sm rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
                <div className="text-sm font-semibold text-[#2F1A55]">Copy</div>
                <div className="mt-2 text-xs text-slate-600">
                  Registra el envio del mensaje para continuar el flujo de seguimiento.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (resolutionReminderMacro) {
                        void executeMacroCopy(resolutionReminderMacro);
                      }
                    }}
                    className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void handleResolutionMessageSent();
                    }}
                    className="rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white"
                  >
                    Mensaje enviado
                  </button>
                  <button
                    type="button"
                    onClick={() => setResolutionSendReminderOpen(false)}
                    className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>,
          )
        : null}
    </div>
  );
}
