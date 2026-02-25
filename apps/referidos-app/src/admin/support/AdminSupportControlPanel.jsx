import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock3,
  Layers3,
  Pencil,
  Plus,
  RefreshCw,
  Route,
  Settings2,
  ShieldAlert,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import {
  listSupportMacroCatalog,
  createSupportMacroCategory,
  deleteSupportMacroCategory,
  setSupportMacroCategoryStatus,
  updateSupportMacroCategory,
} from "./services/supportMacrosOpsService";

const ACTIVE = ["new", "assigned", "in_progress", "waiting_user", "queued"];
const FLOW = ["new", "assigned", "in_progress", "waiting_user", "queued", "closed"];
const STATUS_LABEL = {
  new: "Nuevo",
  assigned: "Asignado",
  in_progress: "En progreso",
  waiting_user: "Esperando usuario",
  queued: "En cola",
  closed: "Cerrado",
  cancelled: "Cancelado",
};
const MACRO_STATUS_ORDER = ["new", "assigned", "in_progress", "waiting_user", "queued", "closed", "cancelled", "sin_estado"];
const MACRO_STATUS_LABEL = {
  ...STATUS_LABEL,
  sin_estado: "Sin estado",
};
const CATALOG_GROUP_OPTIONS = [
  { id: "categoria", label: "categoría" },
  { id: "estado", label: "estado" },
  { id: "rol", label: "rol" },
];
const CATEGORY_STATUS_OPTIONS = ["active", "inactive"];
const CATEGORY_APP_OPTIONS = [
  { id: "all", label: "Todas" },
  { id: "referidos_app", label: "PWA" },
  { id: "prelaunch_web", label: "Prelaunch web" },
  { id: "android_app", label: "Android app" },
];
const SEV_RANK = { s0: 0, s1: 1, s2: 2, s3: 3 };
const statusRank = (status) => {
  const idx = MACRO_STATUS_ORDER.indexOf(status);
  return idx === -1 ? MACRO_STATUS_ORDER.length + 1 : idx;
};
const roleLabel = (role) => {
  if (!role) return "sin_rol";
  return role;
};
const roleRank = (role) => {
  const base = ["cliente", "negocio", "soporte", "admin", "sin_rol"];
  const idx = base.indexOf(role);
  return idx === -1 ? base.length + 1 : idx;
};
const THREAD_STATUS_VALUES = ["new", "assigned", "in_progress", "waiting_user", "queued", "closed", "cancelled"];
const TERMINAL_THREAD_STATUSES = new Set(["closed", "cancelled"]);
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
const normalizeThreadStatusCandidate = (value) => {
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
};
const deriveNextThreadStatusFromEvent = (event) => {
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
  const toStatus =
    normalizeThreadStatusCandidate(details.to) ||
    normalizeThreadStatusCandidate(details.next_status) ||
    normalizeThreadStatusCandidate(details.to_status) ||
    normalizeThreadStatusCandidate(details.status);
  return toStatus;
};
const getEventDetails = (event) => (
  event && typeof event.details === "object" && !Array.isArray(event.details) ? event.details : {}
);
const normalizeQueueKind = (value) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!normalized) return null;
  if (["personal", "mine", "propia", "private", "postponed", "pospuesto"].includes(normalized)) return "personal";
  if (["general", "shared", "public", "global"].includes(normalized)) return "general";
  return null;
};
const deriveQueueKindFromEvent = (event, thread) => {
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
};
const statusToTimelineStatus = (status, queueKind = "general") => {
  if (status !== "queued") return status;
  return queueKind === "personal" ? "postponed" : "queued";
};
const buildCollapsedResolvingLane = (segments) => {
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
};

const fmt = (v) => {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
};
const mins = (a, b) => {
  const x = new Date(a).getTime();
  const y = new Date(b).getTime();
  if (Number.isNaN(x) || Number.isNaN(y) || y < x) return null;
  return Math.round((y - x) / 60000);
};
const hoursAgo = (a) => {
  const x = new Date(a).getTime();
  if (Number.isNaN(x)) return null;
  return (Date.now() - x) / 3600000;
};
const avg = (arr) => (arr.length ? arr.reduce((s, n) => s + n, 0) / arr.length : null);
const short = (t, n = 130) => {
  const s = typeof t === "string" ? t.trim() : "";
  if (!s) return "-";
  return s.length > n ? `${s.slice(0, n)}...` : s;
};
const nameOf = (u) => {
  if (!u) return "Sin usuario";
  const full = `${u.nombre || ""} ${u.apellido || ""}`.trim();
  return full || u.public_id || "Sin nombre";
};

function Metric({ title, value, hint, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-400">
        <span>{title}</span>
        {Icon ? <Icon size={14} className="text-[#5E30A5]" /> : null}
      </div>
      <div className="mt-2 text-xl font-extrabold text-[#2F1A55]">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}

function Card({ title, subtitle, headerRight, children }) {
  const hasHeader = Boolean(title || subtitle || headerRight);
  return (
    <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
      {hasHeader ? (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? <div className="text-sm font-semibold text-[#2F1A55]">{title}</div> : null}
            {subtitle ? <div className="text-xs text-slate-500">{subtitle}</div> : null}
          </div>
          {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export default function AdminSupportControlPanel({
  lockedPanel = null,
  title = "Soporte",
  subtitle = "Panel de control de flujo de tickets",
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [panel, setPanel] = useState(lockedPanel || "tickets");
  const [viewByPanel, setViewByPanel] = useState({ tickets: "basic" });
  const [ticketsTab, setTicketsTab] = useState(() => {
    if (typeof window === "undefined") return "analytics";
    const tab = new URLSearchParams(window.location.search).get("tab");
    return tab === "categorias" ? "categorias" : "analytics";
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [categoryOk, setCategoryOk] = useState("");
  const [categorySaving, setCategorySaving] = useState(false);
  const [categoryEditId, setCategoryEditId] = useState("");
  const [categoryFormMode, setCategoryFormMode] = useState("");
  const [categoryForm, setCategoryForm] = useState({
    label: "",
    description: "",
    app_targets: ["all"],
    status: "active",
  });
  const [threads, setThreads] = useState([]);
  const [events, setEvents] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [macros, setMacros] = useState([]);
  const [macroCategories, setMacroCategories] = useState([]);
  const [usersById, setUsersById] = useState({});
  const [selectedPublicId, setSelectedPublicId] = useState(null);
  const [catalogGroupBy, setCatalogGroupBy] = useState("categoria");
  const [expandedCatalogGroups, setExpandedCatalogGroups] = useState({});
  const [expandedTimelineThreadId, setExpandedTimelineThreadId] = useState("");
  const [expandedTimelineSegmentByThread, setExpandedTimelineSegmentByThread] = useState({});
  const [expandedResolvingByLane, setExpandedResolvingByLane] = useState({});
  const collapseResolvingTimersRef = useRef({});

  const load = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const opsCatalogPromise = listSupportMacroCatalog({
        includeArchived: true,
        includeDraft: true,
      }).catch(() => null);

      const [tRes, eRes, iRes, mRes, cRes, opsCatalog] = await Promise.all([
        supabase
          .from("support_threads")
          .select(
            "id, public_id, user_public_id, category, severity, status, summary, request_origin, origin_source, app_channel, created_at, updated_at, assigned_agent_id, personal_queue, closed_at, cancelled_at, resolution, root_cause, anon_profile_id"
          )
          .order("created_at", { ascending: false })
          .limit(700),
        supabase
          .from("support_thread_events")
          .select("id, thread_id, event_type, actor_role, actor_id, details, created_at")
          .order("created_at", { ascending: false })
          .limit(3500),
        supabase
          .from("support_threads_inbox")
          .select("public_id, contact_display, anon_public_id")
          .order("created_at", { ascending: false })
          .limit(700),
        supabase
          .from("support_macros_cache")
          .select(
            "id, title, body, category_code, thread_status, audience_roles, status, app_targets, env_targets, sort_order, created_at"
          )
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false })
          .limit(600),
        supabase
          .from("support_macro_categories_cache")
          .select("id, code, label, description, status, sort_order, app_targets")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false })
          .limit(300),
        opsCatalogPromise,
      ]);

      const nextThreads = (tRes.data || []).map((t) => ({
        ...t,
        request_origin: t.request_origin || "registered",
        origin_source: t.origin_source || "app",
        app_channel: t.app_channel || "undetermined",
      }));
      const nextEvents = eRes.data || [];
      const nextInbox = iRes.data || [];
      const nextMacros = (mRes.data || []).map((macro) => ({
        id: macro.id,
        title: macro.title,
        body: macro.body,
        category: macro.category_code || "general",
        status: macro.thread_status || "sin_estado",
        audience: macro.audience_roles || ["cliente", "negocio"],
        active: macro.status === "published",
        app_targets: macro.app_targets || ["all"],
        env_targets: macro.env_targets || ["all"],
        created_at: macro.created_at,
      }));
      const nextCategoriesFromCache = (cRes.data || []).map((category) => ({
        id: category.code || category.id,
        category_id: category.id,
        code: category.code || category.id,
        label: category.label || category.code || "Sin label",
        description: category.description || "",
        status: category.status || "active",
        app_targets: Array.isArray(category.app_targets) && category.app_targets.length
          ? category.app_targets
          : ["all"],
      }));
      const nextCategoriesFromOps = (opsCatalog?.categories || []).map((category) => ({
        id: category.code || category.id,
        category_id: category.id,
        code: category.code || category.id,
        label: category.label || category.code || "Sin label",
        description: category.description || "",
        status: category.status || "active",
        app_targets: Array.isArray(category.app_targets) && category.app_targets.length
          ? category.app_targets
          : ["all"],
      }));
      const nextCategories = nextCategoriesFromOps.length
        ? nextCategoriesFromOps
        : nextCategoriesFromCache;

      const ids = Array.from(
        new Set(
          [
            ...nextThreads.map((t) => t.assigned_agent_id),
            ...nextEvents.map((e) => e.actor_id),
          ].filter(Boolean)
        )
      );
      let users = {};
      if (ids.length) {
        const uRes = await supabase
          .from("usuarios")
          .select("id, nombre, apellido, public_id, role")
          .in("id", ids);
        users = (uRes.data || []).reduce((acc, u) => {
          acc[u.id] = u;
          return acc;
        }, {});
      }

      if (tRes.error || eRes.error || mRes.error || iRes.error || cRes.error) {
        setError(
          tRes.error?.message ||
          eRes.error?.message ||
          mRes.error?.message ||
          iRes.error?.message ||
          cRes.error?.message ||
          "Error de carga"
        );
      }

      setThreads(nextThreads);
      setEvents(nextEvents);
      setInbox(nextInbox);
      setMacros(nextMacros);
      setMacroCategories(nextCategories);
      setUsersById(users);
    } catch (err) {
      setError(err?.message || "Error de carga");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  useEffect(() => {
    setExpandedResolvingByLane({});
    Object.values(collapseResolvingTimersRef.current).forEach((timerId) => {
      if (timerId) clearTimeout(timerId);
    });
    collapseResolvingTimersRef.current = {};
  }, [expandedTimelineThreadId]);

  useEffect(
    () => () => {
      Object.values(collapseResolvingTimersRef.current).forEach((timerId) => {
        if (timerId) clearTimeout(timerId);
      });
      collapseResolvingTimersRef.current = {};
    },
    []
  );

  const activePanel = lockedPanel || panel;
  const view = viewByPanel[activePanel] || "basic";
  const isCatalogLocked = lockedPanel === "catalogo";
  const isTicketsLocked = lockedPanel === "tickets";

  const resetCategoryForm = useCallback(() => {
    setCategoryFormMode("");
    setCategoryEditId("");
    setCategoryForm({
      label: "",
      description: "",
      app_targets: ["all"],
      status: "active",
    });
  }, []);

  const setTicketsTabWithUrl = useCallback(
    (nextTab) => {
      const normalized = nextTab === "categorias" ? "categorias" : "analytics";
      setTicketsTab(normalized);
      if (!isTicketsLocked) return;
      const params = new URLSearchParams(location.search);
      if (normalized === "categorias") params.set("tab", "categorias");
      else params.delete("tab");
      const nextSearch = params.toString();
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : "",
        },
        { replace: true }
      );
    },
    [isTicketsLocked, location.pathname, location.search, navigate]
  );

  useEffect(() => {
    if (!isTicketsLocked) return;
    const tab = new URLSearchParams(location.search).get("tab");
    setTicketsTab(tab === "categorias" ? "categorias" : "analytics");
  }, [isTicketsLocked, location.search]);

  const inboxByPublic = useMemo(
    () => inbox.reduce((acc, r) => ((acc[r.public_id] = r), acc), {}),
    [inbox]
  );
  const byPublic = useMemo(
    () => threads.reduce((acc, t) => ((acc[t.public_id] = t), acc), {}),
    [threads]
  );
  const eventsByThread = useMemo(() => {
    const out = {};
    events.forEach((e) => {
      if (!e.thread_id) return;
      if (!out[e.thread_id]) out[e.thread_id] = [];
      out[e.thread_id].push(e);
    });
    Object.values(out).forEach((arr) =>
      arr.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    );
    return out;
  }, [events]);

  const activeTickets = useMemo(
    () =>
      threads
        .filter((t) => ACTIVE.includes(t.status))
        .sort((a, b) => {
          const d = (SEV_RANK[a.severity] ?? 99) - (SEV_RANK[b.severity] ?? 99);
          return d !== 0 ? d : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }),
    [threads]
  );

  const selected = selectedPublicId ? byPublic[selectedPublicId] : null;
  const selectedTimeline = selected ? eventsByThread[selected.id] || [] : [];
  const timelineRows = useMemo(() => {
    const sortedThreads = [...threads].sort(
      (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
    return sortedThreads.map((thread) => {
      const orderedEvents = [...(eventsByThread[thread.id] || [])].sort(
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
        if (current) {
          current.endedAt = current.endedAt || transitionAt;
        }
        const releaseSegment = createSegment("released", transitionAt, true, queueKind);
        if (eventForRelease) {
          releaseSegment.events.push(eventForRelease);
        }
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
            if (current) {
              current.endedAt = current.endedAt || transitionAt;
            }
            currentLane.segments.push(
              createSegment(
                currentTimelineStatus,
                transitionAt,
                true,
                currentQueueKind
              )
            );
          }
        }
      }

      const finalLanes = lanes.map((lane, laneIndex) => {
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

        const hasTerminal = displaySegments.some((segment) =>
          TERMINAL_TIMELINE_STATUSES.has(segment.status)
        );
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
              createSegment(
                statusToTimelineStatus(status, lane.queueKind || "general"),
                null,
                false,
                lane.queueKind || "general"
              )
            );
          });
        }

        return displaySegments.map((segment, segmentIndex) => ({
          ...segment,
          id: `${thread.id}:${laneIndex}:${segmentIndex}:${segment.status}:${segment.startedAt || "pending"}`,
        }));
      });

      return {
        threadId: thread.id,
        threadPublicId: thread.public_id,
        threadStatus: thread.status,
        summary: thread.summary,
        lanes: finalLanes,
      };
    });
  }, [threads, eventsByThread]);

  const metrics = useMemo(() => {
    const closed = threads.filter((t) => t.status === "closed" && t.closed_at);
    const cancelled = threads.filter((t) => t.status === "cancelled");

    const firstResponse = [];
    const queueToAssigned = [];
    threads.forEach((t) => {
      const tl = eventsByThread[t.id] || [];
      const first = tl.find((e) =>
        ["assigned", "status_changed", "waiting_user", "resumed", "closed"].includes(e.event_type)
      );
      const assigned = tl.find((e) => ["assigned", "resumed", "status_changed"].includes(e.event_type));
      const a = first ? mins(t.created_at, first.created_at) : null;
      const b = assigned ? mins(t.created_at, assigned.created_at) : null;
      if (a != null) firstResponse.push(a);
      if (b != null) queueToAssigned.push(b);
    });

    const resHours = closed
      .map((t) => mins(t.created_at, t.closed_at))
      .filter((v) => v != null)
      .map((v) => v / 60);

    const activeByAgent = {};
    const closedByAgent7d = {};
    activeTickets.forEach((t) => {
      if (!t.assigned_agent_id) return;
      activeByAgent[t.assigned_agent_id] = (activeByAgent[t.assigned_agent_id] || 0) + 1;
    });
    closed.forEach((t) => {
      const closeTs = new Date(t.closed_at).getTime();
      if (!t.assigned_agent_id || Number.isNaN(closeTs)) return;
      if (closeTs >= Date.now() - 7 * 24 * 3600000) {
        closedByAgent7d[t.assigned_agent_id] = (closedByAgent7d[t.assigned_agent_id] || 0) + 1;
      }
    });

    const backlogCat = {};
    const backlogSev = {};
    activeTickets.forEach((t) => {
      backlogCat[t.category] = (backlogCat[t.category] || 0) + 1;
      backlogSev[t.severity] = (backlogSev[t.severity] || 0) + 1;
    });

    const resumed = new Set(events.filter((e) => e.event_type === "resumed").map((e) => e.thread_id));
    const waiting = new Set(events.filter((e) => e.event_type === "waiting_user").map((e) => e.thread_id));
    const forced = closed.filter((t) => {
      const a = (t.resolution || "").toLowerCase();
      const b = (t.root_cause || "").toLowerCase();
      return a.includes("forzad") || b.includes("forzad") || b.includes("cierre_forzado");
    });
    const stale = activeTickets.filter((t) => {
      const h = hoursAgo(t.updated_at || t.created_at);
      return h != null && h > 12;
    });

    const anonActive = activeTickets.filter((t) => t.request_origin === "anonymous");
    const repeatedAnon = {};
    anonActive.forEach((t) => {
      const key = inboxByPublic[t.public_id]?.anon_public_id || inboxByPublic[t.public_id]?.contact_display;
      if (!key) return;
      repeatedAnon[key] = (repeatedAnon[key] || 0) + 1;
    });
    const cancelledByUser = {};
    cancelled.forEach((t) => {
      if (!t.user_public_id) return;
      cancelledByUser[t.user_public_id] = (cancelledByUser[t.user_public_id] || 0) + 1;
    });

    const macrosByCat = {};
    macros.forEach((m) => {
      if (m.active === false) return;
      const key = m.category || "general";
      macrosByCat[key] = (macrosByCat[key] || 0) + 1;
    });
    const configCategories = [
      {
        id: "general",
        label: "General",
      },
      ...macroCategories,
    ];

    const top = (obj, n = 6) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([k, c]) => ({ key: k, count: c }));

    return {
      sla: {
        first: avg(firstResponse),
        queue: avg(queueToAssigned),
        resolution: avg(resHours),
        overdue: activeTickets.filter((t) => (hoursAgo(t.created_at) || 0) > 48).length,
      },
      workload: {
        activeByAgent: top(activeByAgent).map((x) => ({ ...x, label: nameOf(usersById[x.key]) })),
        closedByAgent: top(closedByAgent7d).map((x) => ({ ...x, label: nameOf(usersById[x.key]) })),
      },
      queue: {
        active: activeTickets.length,
        oldest: (() => {
          const o = [...activeTickets]
            .filter((t) => t.status === "new" || t.status === "queued")
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0];
          return o ? hoursAgo(o.created_at) : null;
        })(),
        byCat: top(backlogCat, 8),
        bySev: top(backlogSev, 5),
      },
      quality: {
        resumed: resumed.size,
        waitingClosed: closed.filter((t) => waiting.has(t.id)).length,
        forced: forced.length,
        stale: stale.length,
      },
      risk: {
        anonActive: anonActive.length,
        repeatedAnon: top(repeatedAnon, 5),
        cancelledByUser: top(cancelledByUser, 5),
        cancelled: cancelled.length,
      },
      audit: events.slice(0, 25),
      config: {
        categories: configCategories.length,
        macros: macros.filter((m) => m.active !== false).length,
        categoriesNoMacro: configCategories.filter((c) => !macrosByCat[c.id]),
      },
    };
  }, [threads, events, macros, activeTickets, usersById, eventsByThread, inboxByPublic, macroCategories]);

  const catalogMacros = useMemo(
    () =>
      macros.map((m) => ({
        ...m,
        category: m.category || "general",
        status: m.status || "sin_estado",
      })),
    [macros]
  );

  const categoriesStats = useMemo(() => {
    const total = {};
    const active = {};
    const macroCount = {};
    const macroByCategoryStatus = {};
    const macroListByCategory = {};
    const roleSetByCategory = {};

    threads.forEach((t) => {
      const key = t.category || "general";
      total[key] = (total[key] || 0) + 1;
    });
    activeTickets.forEach((t) => {
      const key = t.category || "general";
      active[key] = (active[key] || 0) + 1;
    });
    catalogMacros.forEach((m) => {
      const cat = m.category || "general";
      const status = m.status || "sin_estado";
      if (m.active !== false) {
        macroCount[cat] = (macroCount[cat] || 0) + 1;
      }
      if (!macroByCategoryStatus[cat]) macroByCategoryStatus[cat] = {};
      if (!macroByCategoryStatus[cat][status]) macroByCategoryStatus[cat][status] = [];
      macroByCategoryStatus[cat][status].push(m);
      if (!macroListByCategory[cat]) macroListByCategory[cat] = [];
      macroListByCategory[cat].push(m);
      if (!roleSetByCategory[cat]) roleSetByCategory[cat] = new Set();
      const audiences = Array.isArray(m.audience) && m.audience.length ? m.audience : ["sin_rol"];
      audiences.forEach((role) => roleSetByCategory[cat].add(roleLabel(role)));
    });

    const baseCategories = [
      {
        id: "general",
        label: "General",
        description: "Consultas generales sin categoría especifica.",
        roles: ["cliente", "negocio"],
      },
      ...macroCategories,
    ];
    const known = new Set(baseCategories.map((c) => c.id));
    const extraIds = Array.from(
      new Set([...Object.keys(total), ...Object.keys(active), ...Object.keys(macroCount), ...Object.keys(macroByCategoryStatus)])
    ).filter((id) => id && !known.has(id));
    const extraCategories = extraIds.map((id) => ({
      id,
      label: id,
      description: "Categoría detectada en datos.",
      roles: [],
    }));

    return [...baseCategories, ...extraCategories].map((c) => ({
      ...c,
      total: total[c.id] || 0,
      active: active[c.id] || 0,
      macros: macroCount[c.id] || 0,
      macrosByStatus: macroByCategoryStatus[c.id] || {},
      macrosList: macroListByCategory[c.id] || [],
      rolesWithMacros: Array.from(roleSetByCategory[c.id] || []).sort((a, b) => roleRank(a) - roleRank(b)),
    }));
  }, [threads, activeTickets, catalogMacros, macroCategories]);

  const catalogMacroSummary = useMemo(() => {
    const categoriesCovered = new Set(catalogMacros.map((m) => m.category || "general")).size;
    return {
      total: catalogMacros.length,
      active: catalogMacros.filter((m) => m.active !== false).length,
      covered: categoriesCovered,
    };
  }, [catalogMacros]);

  const ticketCategoryRows = useMemo(() => {
    const dynamic = [...macroCategories].sort((a, b) => {
      const statusDiff = (String(a.status || "inactive") === "active" ? 0 : 1) - (String(b.status || "inactive") === "active" ? 0 : 1);
      if (statusDiff !== 0) return statusDiff;
      const aSort = Number(a.sort_order || 100);
      const bSort = Number(b.sort_order || 100);
      if (aSort !== bSort) return aSort - bSort;
      return String(a.label || a.code || "").localeCompare(String(b.label || b.code || ""), "es", {
        sensitivity: "base",
      });
    });

    return dynamic.map((category) => ({
      ...category,
      readonly: false,
    }));
  }, [macroCategories]);

  const editingCategory = useMemo(() => {
    if (categoryFormMode !== "edit" || !categoryEditId) return null;
    return ticketCategoryRows.find((category) => {
      const currentId = String(category?.category_id || category?.id || "").trim();
      return currentId && currentId === categoryEditId;
    }) || null;
  }, [categoryEditId, categoryFormMode, ticketCategoryRows]);

  useEffect(() => {
    if (categoryFormMode === "edit" && categoryEditId && !editingCategory) {
      resetCategoryForm();
    }
  }, [categoryEditId, categoryFormMode, editingCategory, resetCategoryForm]);

  const groupedByStatus = useMemo(() => {
    const groups = {};
    catalogMacros.forEach((m) => {
      const status = m.status || "sin_estado";
      if (!groups[status]) groups[status] = [];
      groups[status].push(m);
    });
    return Object.entries(groups)
      .sort((a, b) => {
        const diff = statusRank(a[0]) - statusRank(b[0]);
        return diff !== 0 ? diff : a[0].localeCompare(b[0]);
      })
      .map(([status, list]) => ({
        id: status,
        label: MACRO_STATUS_LABEL[status] || status,
        list,
      }));
  }, [catalogMacros]);

  const groupedByRole = useMemo(() => {
    const groups = {};
    catalogMacros.forEach((m) => {
      const audiences = Array.isArray(m.audience) && m.audience.length ? m.audience : ["sin_rol"];
      audiences.forEach((role) => {
        const key = roleLabel(role);
        if (!groups[key]) groups[key] = [];
        groups[key].push(m);
      });
    });
    return Object.entries(groups)
      .sort((a, b) => {
        const diff = roleRank(a[0]) - roleRank(b[0]);
        return diff !== 0 ? diff : a[0].localeCompare(b[0]);
      })
      .map(([role, list]) => ({
        id: role,
        label: role,
        list,
      }));
  }, [catalogMacros]);

  const formatMacroRoles = useCallback((audience) => {
    const roles = Array.isArray(audience) && audience.length ? audience.map((r) => roleLabel(r)) : ["sin_rol"];
    return roles.join(", ");
  }, []);

  const formatCategoryTargets = useCallback((targets) => {
    const source = Array.isArray(targets) && targets.length ? targets : ["all"];
    if (source.includes("all")) return "Todas";
    return source
      .map((target) => CATEGORY_APP_OPTIONS.find((opt) => opt.id === target)?.label || target)
      .join(", ");
  }, []);

  const toggleCategoryTarget = useCallback((targetId) => {
    setCategoryForm((prev) => {
      const current = Array.isArray(prev.app_targets) && prev.app_targets.length
        ? prev.app_targets
        : ["all"];
      if (targetId === "all") {
        return {
          ...prev,
          app_targets: current.includes("all") ? ["referidos_app"] : ["all"],
        };
      }
      const withoutAll = current.filter((value) => value !== "all");
      const hasTarget = withoutAll.includes(targetId);
      const next = hasTarget
        ? withoutAll.filter((value) => value !== targetId)
        : [...withoutAll, targetId];
      return {
        ...prev,
        app_targets: next.length ? next : ["all"],
      };
    });
  }, []);

  const beginEditCategory = useCallback((category) => {
    const categoryId = String(category?.category_id || category?.id || "").trim();
    if (!categoryId) return;
    setCategoryFormMode("edit");
    setCategoryEditId(categoryId);
    setCategoryForm({
      label: String(category?.label || "").trim(),
      description: String(category?.description || "").trim(),
      app_targets:
        Array.isArray(category?.app_targets) && category.app_targets.length
          ? category.app_targets
          : ["all"],
      status: String(category?.status || "active").trim() || "active",
    });
    setCategoryError("");
    setCategoryOk("");
  }, []);

  const openCreateCategory = useCallback(() => {
    setCategoryFormMode("create");
    setCategoryEditId("");
    setCategoryForm({
      label: "",
      description: "",
      app_targets: ["all"],
      status: "active",
    });
    setCategoryError("");
    setCategoryOk("");
  }, []);

  const submitCategory = useCallback(
    async (event) => {
      event.preventDefault();
      const label = String(categoryForm.label || "").trim();
      if (!label) {
        setCategoryError("El label de categoría es requerido.");
        return;
      }

      setCategorySaving(true);
      setCategoryError("");
      setCategoryOk("");
      try {
        const payload = {
          label,
          description: String(categoryForm.description || "").trim(),
          app_targets:
            Array.isArray(categoryForm.app_targets) && categoryForm.app_targets.length
              ? categoryForm.app_targets
              : ["all"],
        };

        if (categoryEditId) {
          await updateSupportMacroCategory({
            category_id: categoryEditId,
            ...payload,
          });
          setCategoryOk("Categoría actualizada.");
        } else {
          await createSupportMacroCategory({
            ...payload,
            status: "active",
          });
          setCategoryOk("Categoría creada.");
        }
        resetCategoryForm();
        await load(true);
      } catch (err) {
        setCategoryError(err?.message || "No se pudo guardar categoría.");
      } finally {
        setCategorySaving(false);
      }
    },
    [categoryEditId, categoryForm, load, resetCategoryForm]
  );

  const changeCategoryStatus = useCallback(
    async (category, status) => {
      const categoryId = String(category?.category_id || category?.id || "").trim();
      if (!categoryId) return;
      if (!CATEGORY_STATUS_OPTIONS.includes(status)) return;
      if (status === "inactive") {
        const categoryCode = String(category?.code || category?.id || "").trim();
        const affectedCount = catalogMacros.filter((macro) => String(macro.category || "general").trim() === categoryCode).length;
        const confirmed = globalThis.confirm(
          `Inactivar categoría archivara macros asociados (${affectedCount}). Deseas continuar?`
        );
        if (!confirmed) return;
      }
      setCategorySaving(true);
      setCategoryError("");
      setCategoryOk("");
      try {
        await setSupportMacroCategoryStatus({ categoryId, status });
        setCategoryOk(`Categoría movida a ${status}.`);
        await load(true);
      } catch (err) {
        setCategoryError(err?.message || "No se pudo cambiar estado de categoría.");
      } finally {
        setCategorySaving(false);
      }
    },
    [catalogMacros, load]
  );

  const removeCategory = useCallback(
    async (category) => {
      const categoryId = String(category?.category_id || category?.id || "").trim();
      if (!categoryId) return;
      const label = String(category?.label || category?.code || categoryId).trim();
      const confirmed = globalThis.confirm(
        `Eliminar categoría "${label}"? Esta accion elimina tambien sus macros asociados.`
      );
      if (!confirmed) return;

      setCategorySaving(true);
      setCategoryError("");
      setCategoryOk("");
      try {
        await deleteSupportMacroCategory({ categoryId });
        setCategoryOk("Categoría eliminada.");
        if (categoryEditId === categoryId) {
          resetCategoryForm();
        }
        await load(true);
      } catch (err) {
        setCategoryError(err?.message || "No se pudo eliminar categoría.");
      } finally {
        setCategorySaving(false);
      }
    },
    [categoryEditId, load, resetCategoryForm]
  );

  const visitedFlow = useMemo(() => {
    if (!selected) return new Set();
    const v = new Set(["new", selected.status]);
    selectedTimeline.forEach((e) => {
      if (FLOW.includes(e.event_type)) v.add(e.event_type);
      if (e.event_type === "resumed") v.add("in_progress");
      if (e.event_type === "waiting_user") v.add("waiting_user");
      if (e.event_type === "assigned") v.add("assigned");
      if (e.event_type === "queued") v.add("queued");
      if (e.event_type === "closed") v.add("closed");
      if (e.event_type === "status_changed" && e.details && typeof e.details === "object") {
        const ns = e.details.next_status || e.details.to_status || e.details.status;
        if (typeof ns === "string") v.add(ns);
      }
    });
    return v;
  }, [selected, selectedTimeline]);

  const renderAdvancedTickets = () => (
    <div className="space-y-5">
      <Card
        title="Flujo visual de tickets"
        subtitle="Click en un ticket para expandir su flujo por etapas y eventos."
      >
        {timelineRows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-[#FCFBFF] px-3 py-4 text-center text-sm text-slate-500">
            Sin tickets para mostrar.
          </div>
        ) : (
          <div className="space-y-4">
            {timelineRows.map((row) => {
              const isRowExpanded = expandedTimelineThreadId === row.threadId;
              const expandedSegmentId = expandedTimelineSegmentByThread[row.threadId] || "";
              const collapsedSegments = row.lanes.flatMap(
                (laneSegments) => buildCollapsedResolvingLane(laneSegments).collapsedSegments
              );
              const expandedSegment =
                row.lanes.flat().find((segment) => segment.id === expandedSegmentId) ||
                collapsedSegments.find((segment) => segment.id === expandedSegmentId) ||
                null;
              const clearAllLaneCollapseTimers = () => {
                Object.values(collapseResolvingTimersRef.current).forEach((timerId) => {
                  if (timerId) clearTimeout(timerId);
                });
                collapseResolvingTimersRef.current = {};
              };
              const setLaneExpanded = (laneKey, value) => {
                setExpandedResolvingByLane((prev) => {
                  if (value) {
                    const currentExpandedLane = Object.keys(prev).find((key) => !!prev[key]);
                    if (currentExpandedLane === laneKey) return prev;
                    return { [laneKey]: true };
                  }
                  if (!prev[laneKey]) return prev;
                  const next = { ...prev };
                  delete next[laneKey];
                  return next;
                });
              };
              const clearLaneCollapseTimer = (laneKey) => {
                const timerId = collapseResolvingTimersRef.current[laneKey];
                if (timerId) {
                  clearTimeout(timerId);
                  delete collapseResolvingTimersRef.current[laneKey];
                }
              };
              const scheduleLaneCollapse = (laneKey) => {
                clearLaneCollapseTimer(laneKey);
                collapseResolvingTimersRef.current[laneKey] = setTimeout(() => {
                  setLaneExpanded(laneKey, false);
                  delete collapseResolvingTimersRef.current[laneKey];
                }, 1000);
              };
              return (
                <div key={`timeline-${row.threadId}`} className="rounded-2xl border border-[#E9E2F7] bg-[#FCFBFF] p-3">
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedTimelineThreadId((prev) => (prev === row.threadId ? "" : row.threadId));
                      setExpandedTimelineSegmentByThread((prev) => ({
                        ...prev,
                        [row.threadId]: "",
                      }));
                    }}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5E30A5]">
                          Ticket {row.threadPublicId}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">{short(row.summary, 120)}</div>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>Estado actual: {STATUS_LABEL[row.threadStatus] || row.threadStatus || "-"}</span>
                        {isRowExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </div>
                  </button>
                  {isRowExpanded ? (
                    <div className="mt-3 space-y-3">
                      {row.lanes.map((laneSegments, laneIndex) => (
                        <div key={`${row.threadId}-lane-${laneIndex}`} className="overflow-x-auto pb-1">
                          {(() => {
                            const laneKey = `${row.threadId}:${laneIndex}`;
                            const compression = buildCollapsedResolvingLane(laneSegments);
                            const isResolvingExpanded = !!expandedResolvingByLane[laneKey];
                            const renderSegments =
                              compression.hasCollapsedResolving && !isResolvingExpanded
                                ? compression.collapsedSegments
                                : laneSegments;
                            return (
                              <div
                                className="flex min-w-max items-center"
                                onMouseEnter={() => {
                                  if (isResolvingExpanded) clearLaneCollapseTimer(laneKey);
                                }}
                                onMouseLeave={() => {
                                  if (compression.hasCollapsedResolving && isResolvingExpanded) {
                                    scheduleLaneCollapse(laneKey);
                                  }
                                }}
                              >
                                {renderSegments.map((segment, segmentIndex) => {
                                  const isFirstSegmentInLane = segmentIndex === 0;
                                  const isExpanded = expandedSegmentId === segment.id;
                                  const blockClipPath =
                                    "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)";
                                  const reachedClass =
                                    TIMELINE_BLOCK_REACHED_CLASSES[segment.status] || "bg-[#1E293B] text-white";
                                  const colorClass = segment.isReached
                                    ? reachedClass
                                    : "bg-[#64748B] text-white";
                                  const isCollapsedResolving = Boolean(segment.isCollapsedResolving);
                                  return (
                                    <div
                                      key={segment.id}
                                      className={isFirstSegmentInLane ? "overflow-hidden" : ""}
                                      style={{
                                        marginLeft: isFirstSegmentInLane ? 0 : -18,
                                        zIndex: renderSegments.length - segmentIndex,
                                      }}
                                    >
                                      <button
                                        type="button"
                                        onMouseEnter={() => {
                                          if (isCollapsedResolving) {
                                            clearAllLaneCollapseTimers();
                                            setLaneExpanded(laneKey, true);
                                          }
                                        }}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setExpandedTimelineSegmentByThread((prev) => ({
                                            ...prev,
                                            [row.threadId]: prev[row.threadId] === segment.id ? "" : segment.id,
                                          }));
                                        }}
                                        className={`relative h-12 min-w-[150px] overflow-hidden px-3 text-[12px] font-semibold transition ${colorClass} ${
                                          isExpanded
                                            ? "ring-2 ring-[#5E30A5] ring-offset-1"
                                            : "hover:brightness-[0.98]"
                                        }`}
                                        style={{
                                          clipPath: blockClipPath,
                                        }}
                                      >
                                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
                                          {segment.label}
                                        </span>
                                        {isCollapsedResolving ? (
                                          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
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
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      ))}

                      {expandedSegment ? (
                        <div className="rounded-xl border border-[#E9E2F7] bg-white p-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="text-[11px] text-slate-500">
                              Inicio: {fmt(expandedSegment.startedAt)} | Fin: {expandedSegment.endedAt ? fmt(expandedSegment.endedAt) : "-"}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedTimelineSegmentByThread((prev) => ({
                                  ...prev,
                                  [row.threadId]: "",
                                }))
                              }
                              className="h-6 w-6 rounded-md border border-[#E9E2F7] text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                              aria-label="Cerrar detalle de etapa"
                            >
                              x
                            </button>
                          </div>
                          <div className="mt-3 space-y-2">
                            {expandedSegment.events.length === 0 ? (
                              <div className="rounded-lg border border-dashed border-[#E9E2F7] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-500">
                                Sin eventos registrados en esta etapa.
                              </div>
                            ) : (
                              expandedSegment.events.map((event, eventIndex) => (
                                <div
                                  key={`${event.id || expandedSegment.id}-event-${eventIndex}`}
                                  className="rounded-lg border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-600"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="font-semibold text-[#2F1A55]">
                                      {EVENT_TYPE_LABELS[event.event_type] || event.event_type}
                                    </div>
                                    <div className="text-[11px] text-slate-400">{fmt(event.created_at)}</div>
                                  </div>
                                  <div className="mt-1 text-[11px] text-slate-500">
                                    Actor: {nameOf(usersById[event.actor_id])}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card title="SLA y tiempos" subtitle="Tiempos de respuesta, cola y resolucion.">
        <div className="grid gap-3 md:grid-cols-4">
          <Metric
            icon={Clock3}
            title="1ra respuesta"
            value={metrics.sla.first == null ? "-" : `${Math.round(metrics.sla.first)}m`}
          />
          <Metric
            icon={Route}
            title="Cola -> asignacion"
            value={metrics.sla.queue == null ? "-" : `${Math.round(metrics.sla.queue)}m`}
          />
          <Metric
            icon={CheckCircle2}
            title="Resolucion promedio"
            value={metrics.sla.resolution == null ? "-" : `${metrics.sla.resolution.toFixed(1)}h`}
          />
          <Metric icon={AlertTriangle} title="Activos >48h" value={metrics.sla.overdue} />
        </div>
      </Card>

      <Card title="Carga por asesor" subtitle="Distribucion activa y cierres ultimos 7 dias.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Activos</div>
            {(metrics.workload.activeByAgent.length ? metrics.workload.activeByAgent : [{ key: "-", label: "Sin datos", count: 0 }]).map((r) => (
              <div key={`a-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.label}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Cerrados 7d</div>
            {(metrics.workload.closedByAgent.length ? metrics.workload.closedByAgent : [{ key: "-", label: "Sin datos", count: 0 }]).map((r) => (
              <div key={`c-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.label}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Salud de cola" subtitle="Backlog por categoría y severidad.">
        <div className="grid gap-3 md:grid-cols-3">
          <Metric icon={Layers3} title="Backlog activo" value={metrics.queue.active} />
          <Metric
            icon={Clock3}
            title="Cola mas antigua"
            value={metrics.queue.oldest == null ? "-" : `${metrics.queue.oldest.toFixed(1)}h`}
          />
          <Metric icon={Route} title="Categorías con backlog" value={metrics.queue.byCat.length} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            {metrics.queue.byCat.map((r) => (
              <div key={`bc-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.key}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {metrics.queue.bySev.map((r) => (
              <div key={`bs-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.key}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Calidad de atencion" subtitle="Continuidad, cierres y tickets estancados.">
        <div className="grid gap-3 md:grid-cols-4">
          <Metric title="Reanudados" value={metrics.quality.resumed} />
          <Metric title="Waiting -> Closed" value={metrics.quality.waitingClosed} />
          <Metric title="Cierres forzados" value={metrics.quality.forced} />
          <Metric title="Activos sin mov. >12h" value={metrics.quality.stale} />
        </div>
      </Card>

      <Card title="Riesgo / abuso" subtitle="Anonimos repetidos y cancelaciones.">
        <div className="grid gap-3 md:grid-cols-3">
          <Metric icon={ShieldAlert} title="Anonimos activos" value={metrics.risk.anonActive} />
          <Metric icon={AlertTriangle} title="Cancelados" value={metrics.risk.cancelled} />
          <Metric
            icon={Users}
            title="Top anonimos"
            value={metrics.risk.repeatedAnon.length === 0 ? "Sin datos" : metrics.risk.repeatedAnon.length}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            {metrics.risk.repeatedAnon.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-500">
                Sin datos
              </div>
            ) : (
              metrics.risk.repeatedAnon.map((r) => (
                <div key={`ra-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                  {r.key}: <strong>{r.count}</strong>
                </div>
              ))
            )}
          </div>
          <div className="space-y-2">
            {metrics.risk.cancelledByUser.map((r) => (
              <div key={`cu-${r.key}`} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-sm text-slate-600">
                {r.key}: <strong>{r.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </Card>

    </div>
  );

  const renderTicketCategories = () => {
    const isCategoryEditMode = categoryFormMode === "edit";
    const isCategoryCreateMode = categoryFormMode === "create";
    const isCategoryPanelOpen = isCategoryEditMode || isCategoryCreateMode;

    return (
      <div className="space-y-5">
        <Card
          title="Categorías"
          subtitle="Gestion centralizada de categorías para tickets y macros."
          headerRight={
            !isCategoryPanelOpen ? (
              <button
                type="button"
                onClick={openCreateCategory}
                className="rounded-2xl border border-dashed border-[#C9B6E8] bg-[#FCFBFF] px-4 py-3 text-left transition hover:bg-[#F9F7FF]"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#5E30A5]">
                  <Plus size={14} />
                  Añadir nueva categoría
                </div>
              </button>
            ) : null
          }
        >
          {categoryError ? (
            <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
              {categoryError}
            </div>
          ) : null}
          {categoryOk ? (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              {categoryOk}
            </div>
          ) : null}

          <div className={isCategoryPanelOpen ? "grid gap-4 lg:grid-cols-2" : "space-y-2"}>
            <div className="space-y-2">
              {isCategoryCreateMode ? (
                <div className="rounded-2xl border border-[#C9B6E8] bg-[#FCFBFF] px-4 py-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-[#2F1A55]">Nueva Categoría</span>
                      <span className="rounded-full border border-[#E9E2F7] bg-[#FAF8FF] px-2 py-0.5 text-[11px] text-slate-600">
                        borrador
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">Crea una nueva categoría.</div>
                  </div>
                </div>
              ) : (
                <>

                  {ticketCategoryRows.map((category) => {
                    const currentId = String(category?.category_id || category?.id || "").trim();
                    const isSelected = isCategoryEditMode && currentId === categoryEditId;
                    const canSelect = isCategoryEditMode && !category.readonly;
                    return (
                      <div
                        key={`category-row-${category.code || category.id}`}
                        role={canSelect ? "button" : undefined}
                        tabIndex={canSelect ? 0 : undefined}
                        onClick={canSelect ? () => beginEditCategory(category) : undefined}
                        onKeyDown={
                          canSelect
                            ? (event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  beginEditCategory(category);
                                }
                              }
                            : undefined
                        }
                        className={`rounded-2xl border bg-white px-4 py-3 ${
                          isSelected ? "border-[#C9B6E8] bg-[#FCFBFF]" : "border-[#E9E2F7]"
                        } ${canSelect ? "cursor-pointer transition hover:bg-[#F9F7FF]" : ""}`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold text-[#2F1A55]">{category.label}</span>
                              <span className="text-xs text-slate-400">({category.code || category.id})</span>
                              <span className="rounded-full border border-[#E9E2F7] bg-[#FAF8FF] px-2 py-0.5 text-[11px] text-slate-600">
                                {category.status}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500">{category.description || "Sin descripcion"}</div>
                            <div className="mt-1 text-[11px] text-slate-500">Apps: {formatCategoryTargets(category.app_targets)}</div>
                          </div>
                          {!category.readonly && !isCategoryPanelOpen ? (
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => beginEditCategory(category)}
                                className="inline-flex items-center justify-center rounded-xl border border-[#E9E2F7] bg-white px-2 py-2 text-[#5E30A5]"
                                aria-label="Editar categoría"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => changeCategoryStatus(category, category.status === "active" ? "inactive" : "active")}
                                className={`rounded-full border px-3 py-2 text-xs font-semibold ${
                                  category.status === "active"
                                    ? "border-slate-300 bg-slate-100 text-slate-700"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                }`}
                              >
                                {category.status === "active" ? "Desactivar" : "Activar"}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeCategory(category)}
                                className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-2 py-2 text-red-700"
                                aria-label="Eliminar categoría"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {isCategoryPanelOpen ? (
              <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-[#2F1A55]">
                    {isCategoryEditMode ? "Editar categoría" : "Nueva categoría"}
                    {isCategoryEditMode && editingCategory ? (
                      <span className="ml-2 text-xs font-medium text-slate-500">({editingCategory.code || editingCategory.id})</span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={resetCategoryForm}
                    className="inline-flex items-center justify-center rounded-lg border border-[#E9E2F7] bg-white p-1.5 text-[#5E30A5]"
                    aria-label="Cerrar panel de categoría"
                  >
                    <X size={14} />
                  </button>
                </div>

                {isCategoryEditMode && !editingCategory ? (
                  <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-white px-3 py-4 text-center text-xs text-slate-500">
                    Categoría no encontrada para edicion.
                  </div>
                ) : (
                  <form className="space-y-3" onSubmit={submitCategory}>
                    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                      <input
                        value={categoryForm.label}
                        onChange={(event) =>
                          setCategoryForm((prev) => ({
                            ...prev,
                            label: event.target.value,
                          }))
                        }
                        placeholder="Label categoría"
                        className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs"
                      />
                      {isCategoryEditMode && editingCategory ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              changeCategoryStatus(
                                editingCategory,
                                editingCategory.status === "active" ? "inactive" : "active"
                              )
                            }
                            className={`rounded-full border px-3 py-2 text-xs font-semibold ${
                              editingCategory.status === "active"
                                ? "border-slate-300 bg-slate-100 text-slate-700"
                                : "border-emerald-200 bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {editingCategory.status === "active" ? "Desactivar" : "Activar"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCategory(editingCategory)}
                            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-2 text-red-700"
                            aria-label="Eliminar categoría"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <textarea
                      rows={3}
                      value={categoryForm.description}
                      onChange={(event) =>
                        setCategoryForm((prev) => ({
                          ...prev,
                          description: event.target.value,
                        }))
                      }
                      placeholder="Descripcion"
                      className="w-full resize-none rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs"
                    />
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_APP_OPTIONS.map((appOption) => {
                        const active = (categoryForm.app_targets || []).includes(appOption.id);
                        return (
                          <button
                            key={`category-editor-target-${appOption.id}`}
                            type="button"
                            onClick={() => toggleCategoryTarget(appOption.id)}
                            className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                              active
                                ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                                : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                            }`}
                          >
                            {appOption.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={categorySaving}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold text-white ${
                          categorySaving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"
                        }`}
                      >
                        {isCategoryEditMode ? "Guardar categoría" : "Crear categoría"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    );
  };
  const renderCatalogMacroCard = (m, key) => (
    <div
      key={key}
      className="rounded-lg border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="font-semibold text-[#2F1A55]">{m.title}</div>
        <div className="text-slate-500">{m.active === false ? "Inactiva" : "Activa"}</div>
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        Categoría: {m.category || "general"} | Estado: {m.status || "sin_estado"} | Roles: {formatMacroRoles(m.audience)}
      </div>
      <div className="mt-1 text-xs text-slate-600">{short(m.body, 220)}</div>
    </div>
  );

  return (
    <AdminLayout title={title} subtitle={subtitle}>
      <div className="space-y-6">
        {isCatalogLocked ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "basic", label: "Basica" },
                  { id: "advanced", label: "Avanzada" },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() =>
                      setViewByPanel((prev) => ({
                        ...prev,
                        [activePanel]: v.id,
                      }))
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      view === v.id
                        ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                        : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => load(true)}
                disabled={loading || refreshing}
                aria-label="Refrescar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9E2F7] text-[#5E30A5] disabled:opacity-60"
              >
                <RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />
              </button>
            </div>
            {error ? (
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            ) : null}
          </div>
        ) : (
          <Card
            title={lockedPanel === "tickets" ? null : "Control de tickets"}
            subtitle={
              lockedPanel === "tickets"
                ? null
                : isTicketsLocked
                  ? "Vista unica con Analytics y Categorías."
                  : "Vista basica (default) y avanzada."
            }
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {lockedPanel ? null : (
                  <div className="flex flex-wrap gap-2">
                    {[{ id: "tickets", label: "Panel Tickets" }].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setPanel(p.id);
                          setSelectedPublicId(null);
                        }}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          activePanel === p.id
                            ? "border-[#5E30A5] bg-[#5E30A5] text-white"
                            : "border-[#E9E2F7] bg-white text-[#5E30A5]"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}
                {isTicketsLocked ? (
                  <>
                    {[
                      { id: "analytics", label: "Analytics" },
                      { id: "categorias", label: "Categorías" },
                    ].map((tabOption) => (
                      <button
                        key={tabOption.id}
                        type="button"
                        onClick={() => setTicketsTabWithUrl(tabOption.id)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          ticketsTab === tabOption.id
                            ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                            : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                        }`}
                      >
                        {tabOption.label}
                      </button>
                    ))}
                  </>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => load(true)}
                disabled={loading || refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
              >
                <RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />
                Refrescar
              </button>
            </div>
            {isTicketsLocked ? null : (
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "basic", label: "Basica" },
                  { id: "advanced", label: "Avanzada" },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() =>
                      setViewByPanel((prev) => ({
                        ...prev,
                        [activePanel]: v.id,
                      }))
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      view === v.id
                        ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                        : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
            {error ? (
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            ) : null}
          </Card>
        )}

        {loading ? (
          <Card title="Cargando..." subtitle="Obteniendo datos de soporte." />
        ) : isTicketsLocked ? (
          ticketsTab === "categorias" ? renderTicketCategories() : renderAdvancedTickets()
        ) : activePanel === "tickets" ? (
          selected ? (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setSelectedPublicId(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]"
              >
                <ArrowLeft size={14} />
                Volver a tickets activos
              </button>
              <Card
                title={`Flujo de ticket ${selected.public_id}`}
                subtitle="Pasos completados, paso actual y pendientes."
              >
                <div className="grid gap-3 md:grid-cols-2 text-xs text-slate-600">
                  <div className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2">
                    <div className="font-semibold text-[#2F1A55]">{short(selected.summary, 160)}</div>
                    <div>Categoría: {selected.category} | Severidad: {selected.severity}</div>
                    <div>Estado: {STATUS_LABEL[selected.status] || selected.status}</div>
                    <div>Creado: {fmt(selected.created_at)}</div>
                  </div>
                  <div className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2">
                    <div>Asesor: {selected.assigned_agent_id ? nameOf(usersById[selected.assigned_agent_id]) : "Sin asignar"}</div>
                    <div>Origen: {selected.request_origin || "registered"} / {selected.origin_source || "app"}</div>
                    <div>Contacto: {inboxByPublic[selected.public_id]?.contact_display || "-"}</div>
                    <div>Actualizado: {fmt(selected.updated_at)}</div>
                  </div>
                </div>
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max items-center gap-2">
                    {FLOW.map((step, idx) => {
                      const current = selected.status === step;
                      const done = !current && visitedFlow.has(step);
                      return (
                        <React.Fragment key={step}>
                          <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            current
                              ? "border-[#5E30A5] bg-[#5E30A5] text-white"
                              : done
                                ? "border-[#1B7F4B] bg-[#EAF7F0] text-[#1B7F4B]"
                                : "border-[#E2E8F0] bg-[#F8FAFC] text-slate-400"
                          }`}>
                            {STATUS_LABEL[step]}
                          </div>
                          {idx < FLOW.length - 1 ? (
                            <div className={`h-[2px] w-8 ${done || current ? "bg-[#5E30A5]" : "bg-[#E2E8F0]"}`} />
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </Card>
              <Card title="Timeline" subtitle="Eventos del ticket en orden temporal.">
                <div className="space-y-2">
                  {[...selectedTimeline].reverse().map((e) => (
                    <div key={e.id} className="rounded-xl border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-xs text-slate-600">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-[#2F1A55]">{e.event_type}</div>
                        <div className="text-slate-400">{fmt(e.created_at)}</div>
                      </div>
                      <div>Actor: {e.actor_role || "-"} / {nameOf(usersById[e.actor_id])}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card
              title="Tickets activos"
              subtitle="Lista de cards horizontales. Click para abrir flujo visual."
            >
              <div className="grid gap-3 md:grid-cols-4">
                <Metric icon={Layers3} title="Activos" value={activeTickets.length} />
                <Metric icon={Clock3} title="En cola" value={activeTickets.filter((t) => t.status === "queued").length} />
                <Metric icon={Users} title="Sin asignar" value={activeTickets.filter((t) => !t.assigned_agent_id).length} />
                <Metric icon={AlertTriangle} title=">48h" value={activeTickets.filter((t) => (hoursAgo(t.created_at) || 0) > 48).length} />
              </div>
              <div className="space-y-2">
                {activeTickets.map((t) => (
                  <button
                    key={t.public_id}
                    type="button"
                    onClick={() => setSelectedPublicId(t.public_id)}
                    className="w-full rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 text-left hover:border-[#CDBAF1]"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{t.public_id}</div>
                        <div className="text-sm font-semibold text-[#2F1A55]">{short(t.summary)}</div>
                        <div className="text-xs text-slate-500">
                          {t.category} | {t.severity} | {STATUS_LABEL[t.status] || t.status}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 md:text-right">
                        <div>Asesor: <strong>{t.assigned_agent_id ? nameOf(usersById[t.assigned_agent_id]) : "Sin asignar"}</strong></div>
                        <div>Origen: <strong>{t.request_origin === "anonymous" ? "Anonimo" : "Registrado"}</strong></div>
                        <div>Creado: {fmt(t.created_at)}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )
        ) : (
          <div className="space-y-5">
            <Card
              title="Configuracion operativa"
              subtitle="Cobertura y estado del sistema de catalogo."
              headerRight={
                <div className="text-xs text-slate-500">
                  Sin macros:{" "}
                  <strong>
                    {metrics.config.categoriesNoMacro.length
                      ? metrics.config.categoriesNoMacro.map((c) => c.label).join(", ")
                      : "Cobertura completa"}
                  </strong>
                </div>
              }
            >
              <div className="grid gap-3 md:grid-cols-3">
                <Metric icon={Settings2} title="Macros totales" value={catalogMacroSummary.total} />
                <Metric icon={CheckCircle2} title="Macros activas" value={catalogMacroSummary.active} />
                <Metric icon={Users} title="Categorías cubiertas" value={catalogMacroSummary.covered} />
              </div>
            </Card>
            <Card
              title="Categorías y catalogo de macros"
              subtitle="Cobertura, volumen y macros agrupadas."
              headerRight={
                <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
                  <span className="text-slate-500">Agrupar por:</span>
                  {CATALOG_GROUP_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setCatalogGroupBy(opt.id);
                        setExpandedCatalogGroups({});
                      }}
                      className={`rounded-full border px-3 py-1 font-semibold ${
                        catalogGroupBy === opt.id
                          ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                          : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              }
            >
              <div className="space-y-3">
                {catalogGroupBy === "categoria"
                  ? categoriesStats.map((c) => {
                      const groupKey = `cat:${c.id}`;
                      const isExpanded = !!expandedCatalogGroups[groupKey];
                      const groupedStatuses = Object.entries(c.macrosByStatus || {}).sort((a, b) => {
                        const diff = statusRank(a[0]) - statusRank(b[0]);
                        return diff !== 0 ? diff : a[0].localeCompare(b[0]);
                      });
                      return (
                        <div key={groupKey} className="overflow-hidden rounded-2xl border border-[#EFE9FA] bg-[#FCFBFF]">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedCatalogGroups((prev) => ({
                                ...prev,
                                [groupKey]: !prev[groupKey],
                              }))
                            }
                            className="flex w-full flex-col gap-3 px-4 py-3 text-left md:flex-row md:items-center md:justify-between"
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-semibold text-[#2F1A55]">{c.label}</span>
                                <span className="text-xs text-slate-400">({c.id})</span>
                              </div>
                              <div className="text-xs text-slate-500">{c.description}</div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                              <span className="rounded-full border border-[#E9E2F7] bg-white px-2 py-1">
                                Total: <strong>{c.total}</strong>
                              </span>
                              <span className="rounded-full border border-[#E9E2F7] bg-white px-2 py-1">
                                Activos: <strong>{c.active}</strong>
                              </span>
                              <span className="rounded-full border border-[#E9E2F7] bg-white px-2 py-1">
                                Macros: <strong>{c.macros}</strong>
                              </span>
                              <span className="rounded-full border border-[#E9E2F7] bg-white px-2 py-1">
                                Roles: <strong>{c.rolesWithMacros.length ? c.rolesWithMacros.join(", ") : "-"}</strong>
                              </span>
                            </div>
                            <div className="shrink-0 text-[#5E30A5]">
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                          {isExpanded ? (
                            <div className="space-y-3 border-t border-[#EFE9FA] px-4 py-3">
                              {groupedStatuses.length ? (
                                groupedStatuses.map(([status, list]) => (
                                  <div key={`${groupKey}-${status}`} className="rounded-xl border border-[#EFE9FA] bg-white px-3 py-2">
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                                      <div className="font-semibold text-[#2F1A55]">
                                        {MACRO_STATUS_LABEL[status] || status}
                                        <span className="ml-1 text-slate-400">({status})</span>
                                      </div>
                                      <div className="text-slate-500">
                                        Macros: <strong>{list.length}</strong>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      {list.map((m) => renderCatalogMacroCard(m, `${groupKey}-${status}-${m.id}`))}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="rounded-xl border border-[#EFE9FA] bg-white px-3 py-2 text-xs text-slate-500">
                                  Sin macros para esta categoría.
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}

                {catalogGroupBy === "estado"
                  ? groupedByStatus.map((group) => {
                      const groupKey = `status:${group.id}`;
                      const isExpanded = !!expandedCatalogGroups[groupKey];
                      return (
                        <div key={groupKey} className="overflow-hidden rounded-2xl border border-[#EFE9FA] bg-[#FCFBFF]">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedCatalogGroups((prev) => ({
                                ...prev,
                                [groupKey]: !prev[groupKey],
                              }))
                            }
                            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#2F1A55]">
                                {group.label}
                                <span className="ml-1 text-xs text-slate-400">({group.id})</span>
                              </div>
                              <div className="text-xs text-slate-500">Macros agrupadas por estado objetivo.</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="rounded-full border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] text-slate-600">
                                Macros: <strong>{group.list.length}</strong>
                              </span>
                              <div className="text-[#5E30A5]">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </div>
                            </div>
                          </button>
                          {isExpanded ? (
                            <div className="space-y-2 border-t border-[#EFE9FA] px-4 py-3">
                              {group.list.map((m) => renderCatalogMacroCard(m, `${groupKey}-${m.id}`))}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}

                {catalogGroupBy === "rol"
                  ? groupedByRole.map((group) => {
                      const groupKey = `role:${group.id}`;
                      const isExpanded = !!expandedCatalogGroups[groupKey];
                      return (
                        <div key={groupKey} className="overflow-hidden rounded-2xl border border-[#EFE9FA] bg-[#FCFBFF]">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedCatalogGroups((prev) => ({
                                ...prev,
                                [groupKey]: !prev[groupKey],
                              }))
                            }
                            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#2F1A55]">{group.label}</div>
                              <div className="text-xs text-slate-500">Macros agrupadas por rol de atencion.</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="rounded-full border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] text-slate-600">
                                Macros: <strong>{group.list.length}</strong>
                              </span>
                              <div className="text-[#5E30A5]">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </div>
                            </div>
                          </button>
                          {isExpanded ? (
                            <div className="space-y-2 border-t border-[#EFE9FA] px-4 py-3">
                              {group.list.map((m) => renderCatalogMacroCard(m, `${groupKey}-${m.id}`))}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}
              </div>
            </Card>
          </div>
        )}

        {!isTicketsLocked && view === "advanced" && !loading && activePanel === "tickets"
          ? renderAdvancedTickets()
          : null}
      </div>
    </AdminLayout>
  );
}
