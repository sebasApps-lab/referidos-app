import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const THREAD_STATUS_VALUES = ["new", "assigned", "in_progress", "waiting_user", "queued", "closed", "cancelled"];
const TIMELINE_DEFAULT_SEQUENCE = ["new", "assigned", "in_progress", "closed"];
const TIMELINE_RECOVERY_SEQUENCE = ["queued", "assigned", "in_progress", "closed"];
const TIMELINE_RELEASE_EVENT_TYPES = new Set(["agent_timeout_release", "agent_manual_release"]);
const TERMINAL_TIMELINE_STATUSES = new Set(["closed", "cancelled", "released"]);
const TIMELINE_BLOCK_LABELS = {
  new: "Creado",
  assigned: "Asignado",
  in_progress: "Resolviendo",
  waiting_user: "Esperando usuario",
  queued: "En cola",
  postponed: "Pospuesto",
  released: "Liberado",
  closed: "Cerrado",
  cancelled: "Cancelado",
};
const EVENT_TYPE_LABELS = {
  created: "created",
  assigned: "assigned",
  status_changed: "status_changed",
  waiting_user: "waiting_user",
  resumed: "resumed",
  queued: "queued",
  closed: "closed",
  note_added: "note_added",
  agent_timeout_release: "agent_timeout_release",
  agent_manual_release: "agent_manual_release",
  cancelled: "cancelled",
  linked_to_user: "linked_to_user",
};
const TIMELINE_BLOCK_REACHED_CLASSES = {
  new: "bg-[#1D4ED8] text-white",
  assigned: "bg-[#7C3AED] text-white",
  in_progress: "bg-[#0891B2] text-white",
  waiting_user: "bg-[#EA580C] text-white",
  queued: "bg-[#4F46E5] text-white",
  postponed: "bg-[#BE185D] text-white",
  released: "bg-[#4B5563] text-white",
  closed: "bg-[#15803D] text-white",
  cancelled: "bg-[#B91C1C] text-white",
};

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
    inprogress: "in_progress",
    en_progreso: "in_progress",
    resolviendo: "in_progress",
    waitinguser: "waiting_user",
    esperando_usuario: "waiting_user",
    en_espera: "waiting_user",
    en_cola: "queued",
    cola: "queued",
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
  const [closing, setClosing] = useState(false);
  const [closingRequest, setClosingRequest] = useState(false);
  const [resolution, setResolution] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [logs, setLogs] = useState([]);
  const [catalog, setCatalog] = useState({ categories: [], macros: [] });
  const [catalogLoadError, setCatalogLoadError] = useState("");
  const [refreshingMacros, setRefreshingMacros] = useState(false);
  const [expandedMacroGroups, setExpandedMacroGroups] = useState({});
  const [expandedTimelineSegmentId, setExpandedTimelineSegmentId] = useState("");
  const [expandedResolvingByLane, setExpandedResolvingByLane] = useState({});
  const [isTimelineDragging, setIsTimelineDragging] = useState(false);
  const shownTrackerRef = useRef(new Set());
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

      const [{ data: eventData }, { data: noteData }, { data: obsContextData }] = await Promise.all([
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

      if (!active) return;
      setThread(normalizeThreadRow(threadData));
      setObsContext(obsContextData || null);
      setEvents(eventData || []);
      setNotes(noteData || []);
      setLogs(logData);
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

  const macros = useMemo(() => {
    return filterSupportMacrosForThread({
      thread,
      macros: catalog.macros,
      categories: catalog.categories,
      runtimeEnvKey,
    });
  }, [catalog.categories, catalog.macros, runtimeEnvKey, thread]);

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

  const handleCopy = async (macro) => {
    const macroBody = typeof macro?.body === "string" ? macro.body : "";
    const macroId = typeof macro?.id === "string" ? macro.id : "";
    const macroCode = typeof macro?.code === "string" ? macro.code : "";
    if (!macroBody || !macroId || !macroCode) return;

    try {
      await navigator.clipboard.writeText(macroBody);
      setCopiedId(macroId);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      return;
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
          },
        },
      ],
    }).catch(() => {});
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
      setThread((prev) => ({ ...prev, status }));
      await refreshCatalog({ forceSync: true });
    }
  };

  const handleClose = async () => {
    if (closingRequest) return;
    setClosingRequest(true);
    try {
      const result = await closeSupportThread({
        thread_public_id: thread.public_id,
        resolution,
        root_cause: rootCause,
      });
      if (result.ok) {
        setThread((prev) => ({ ...prev, status: "closed", resolution, root_cause: rootCause }));
        setClosing(false);
        await refreshCatalog({ forceSync: true });
      }
    } finally {
      setClosingRequest(false);
    }
  };

  if (!thread) {
    return <div className="text-sm text-slate-500">Cargando ticket...</div>;
  }

  return (
    <div className="space-y-6">
      {debugBanner}
      <div className="fixed left-1/2 top-0 z-[200] -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-b-2xl border-x border-b border-t-0 border-[#BCC5D1] bg-slate-100/92 px-3 py-2 shadow-lg backdrop-blur">
          {thread.status === "closed" ? (
            <div className="inline-flex items-center gap-2 rounded-xl border border-[#1B7F4B]/45 px-3 py-1 text-xs font-semibold text-[#1B7F4B]">
              <span>Estado: Resuelto</span>
              <Check size={14} />
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleStatus("in_progress")}
                className="rounded-xl bg-[#5E30A5] px-3 py-1 text-xs font-semibold text-white"
              >
                En progreso
              </button>
              <button
                type="button"
                onClick={() => handleStatus("waiting_user")}
                className="rounded-xl border border-[#5E30A5] bg-white px-3 py-1 text-xs font-semibold text-[#5E30A5]"
              >
                Esperando usuario
              </button>
              <button
                type="button"
                onClick={() => handleStatus("queued")}
                className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Liberar a cola
              </button>
              <button
                type="button"
                onClick={() => setClosing(true)}
                className="rounded-xl border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-500"
              >
                Cerrar caso
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
                  <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Descripcion</div>
                  <div className="min-h-[88px] whitespace-pre-wrap rounded-lg border border-[#E8E2F5] bg-white px-3 py-2 text-sm text-slate-700">
                    {pickFirstString(thread.summary) || "No especificado"}
                  </div>
                </div>
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

        <div className="space-y-6">
          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
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
          </div>
        </div>
      </div>

      {closing ? (
        <div className="rounded-3xl border border-[#F9C9C9] bg-[#FFF5F5] p-5 space-y-3">
          <div className="text-sm font-semibold text-[#B42318]">
            Cerrar ticket
          </div>
          <input
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Resolucion"
            className="w-full rounded-2xl border border-[#F9C9C9] bg-white px-3 py-2 text-xs text-slate-600 outline-none"
          />
          <input
            value={rootCause}
            onChange={(e) => setRootCause(e.target.value)}
            placeholder="Causa raiz (opcional)"
            className="w-full rounded-2xl border border-[#F9C9C9] bg-white px-3 py-2 text-xs text-slate-600 outline-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={closingRequest}
              className="rounded-2xl bg-[#B42318] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Confirmar cierre
            </button>
            <button
              type="button"
              onClick={() => setClosing(false)}
              className="rounded-2xl border border-[#F9C9C9] px-3 py-2 text-xs font-semibold text-[#B42318]"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
