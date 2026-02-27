import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertOctagon,
  AlertCircle,
  ArrowLeft,
  Code2,
  Globe2,
  Layers3,
  Mail,
  Monitor,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Tablet,
  Tags,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import {
  BRAND_ICON_UI_NOTICE,
  resolveBrandIcon,
} from "./brandIconPolicy";

// Lint purge (no-unused-vars): `FallbackIcon` en IdentityCard paso de JSX directo a createElement (bloque de identidad).
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
  "breadcrumbs_count",
  "breadcrumbs_last_at",
  "breadcrumbs_source",
  "breadcrumbs_status",
  "breadcrumbs_reason",
  "breadcrumbs_meta",
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

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function asObject(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  return {};
}

function asString(value) {
  if (typeof value === "string") {
    const next = value.trim();
    return next || null;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return null;
}

function firstString(...values) {
  for (const value of values) {
    const next = asString(value);
    if (next) return next;
  }
  return null;
}

function normalizeKey(value) {
  return asString(value)?.toLowerCase().replace(/\s+/g, "_") || "";
}

const SYMBOLICATION_STATUS_LABELS = {
  ok: "Mapeado correctamente",
  "ok:dev_native_stack": "Dev: stack nativo (sin mapear)",
  "ok:dev_manifest_passthrough": "Dev: sin manifest, stack nativo",
  "ok:dev_no_mapped_frames": "Dev: sin frames mapeados, stack nativo",
  "error:release_not_found": "Error: release no encontrado",
  "error:manifest_path_missing": "Error: falta ruta del manifest",
  "error:manifest_download_failed": "Error: no se pudo descargar el manifest",
  "error:manifest_empty": "Error: manifest vacio",
  "error:manifest_invalid_json": "Error: manifest invalido",
  "error:no_mapped_frames": "Error: no se pudieron mapear frames",
};

function formatSymbolicationStatus(value) {
  const key = asString(value);
  if (!key) return "-";
  const known = SYMBOLICATION_STATUS_LABELS[key];
  if (known) return known;
  if (key.startsWith("error:")) {
    return `Error: ${key.slice(6).replace(/_/g, " ")}`;
  }
  if (key.startsWith("ok:")) {
    return `OK: ${key.slice(3).replace(/_/g, " ")}`;
  }
  return key;
}

function formatSymbolicationType(value) {
  const key = normalizeKey(value);
  if (!key) return "-";
  if (key === "short") return "Cache corto";
  if (key === "long") return "Cache largo";
  return key;
}

function formatLevelLabel(value) {
  const key = normalizeKey(value);
  if (!key) return "-";
  if (key === "fatal") return "Critico (fatal)";
  if (key === "error") return "Severo (error)";
  if (key === "warn") return "Advertencia";
  if (key === "info") return "Informativo";
  if (key === "debug") return "Debug";
  return key;
}

function formatLevelBadge(value) {
  const key = normalizeKey(value);
  if (!key) return "-";
  if (key === "fatal") return "Critico";
  if (key === "error") return "Severo";
  if (key === "warn") return "Warn";
  if (key === "info") return "Info";
  if (key === "debug") return "Debug";
  return key;
}

function formatEventTypeLabel(value) {
  const key = normalizeKey(value);
  if (!key) return "-";
  if (key === "error") return "Error";
  if (key === "log") return "Log";
  if (key === "performance") return "Performance";
  if (key === "security") return "Seguridad";
  if (key === "audit") return "Auditoria";
  return key;
}

const BREADCRUMB_STATUS_META = {
  present: { label: "Con breadcrumbs", tone: "ok" },
  missing_early_boot: { label: "Sin breadcrumbs (arranque temprano)", tone: "warn" },
  missing_runtime_failure: { label: "Sin breadcrumbs (fallo runtime)", tone: "warn" },
  missing_source_uninstrumented: { label: "Sin breadcrumbs (origen sin instrumentar)", tone: "warn" },
  missing_payload_empty: { label: "Sin breadcrumbs (payload vacio)", tone: "warn" },
  missing_storage_unavailable: { label: "Sin breadcrumbs (storage no disponible)", tone: "warn" },
  missing_unknown: { label: "Sin breadcrumbs (motivo no determinado)", tone: "warn" },
};

const BREADCRUMB_SOURCE_LABELS = {
  memory: "Memoria runtime",
  storage: "Storage persistente",
  merged: "Memoria + storage",
  provided: "Payload del evento",
  none: "Sin origen",
};

const BREADCRUMB_REASON_LABELS = {
  runtime_not_initialized: "El runtime no estaba inicializado cuando ocurrio el evento.",
  runtime_init_failed: "Fallo durante la inicializacion del runtime de observabilidad.",
  runtime_runtime_error: "El runtime de observabilidad reporto un error interno.",
  storage_unavailable: "No habia storage disponible para persistir breadcrumbs.",
  storage_read_failed: "Fallo al leer breadcrumbs persistidos.",
  storage_write_failed: "Fallo al guardar breadcrumbs persistidos.",
  edge_without_breadcrumb_steps: "El evento proviene de Edge sin pasos instrumentados.",
  worker_without_breadcrumb_steps: "El evento proviene de Worker sin pasos instrumentados.",
  payload_breadcrumbs_empty: "El payload envio breadcrumbs vacios.",
  missing_reason_not_determined: "No se pudo determinar la causa exacta.",
};

function formatKeyAsLabel(value) {
  const raw = asString(value);
  if (!raw) return "-";
  return raw.replace(/_/g, " ");
}

function resolveBreadcrumbDiagnostics(event) {
  const meta = asObject(event?.breadcrumbs_meta);
  const breadcrumbRows = asArray(event?.breadcrumbs);
  const fromField = Number(event?.breadcrumbs_count);
  const fromMeta = Number(meta.count);
  const payloadCount = breadcrumbRows.length;
  const count = payloadCount > 0
    ? payloadCount
    : Number.isFinite(fromField)
      ? Math.max(0, Math.trunc(fromField))
      : Number.isFinite(fromMeta)
        ? Math.max(0, Math.trunc(fromMeta))
        : 0;

  const statusKey =
    (payloadCount > 0
      ? "present"
      : normalizeKey(event?.breadcrumbs_status) ||
        normalizeKey(meta.classified_status) ||
        (count > 0 ? "present" : "missing_unknown"));
  const sourceKey =
    (payloadCount > 0
      ? normalizeKey(event?.breadcrumbs_source) ||
        normalizeKey(meta.source) ||
        "provided"
      : normalizeKey(event?.breadcrumbs_source) ||
        normalizeKey(meta.source) ||
        (count > 0 ? "provided" : "none"));
  const reasonKey =
    (payloadCount > 0
      ? null
      : normalizeKey(event?.breadcrumbs_reason) ||
        normalizeKey(meta.classified_reason) ||
        normalizeKey(meta.missing_reason_hint) ||
        null);

  return {
    count,
    lastAt: firstString(event?.breadcrumbs_last_at, meta.last_at),
    status: statusKey || "missing_unknown",
    statusLabel: BREADCRUMB_STATUS_META[statusKey]?.label || formatKeyAsLabel(statusKey),
    statusTone: BREADCRUMB_STATUS_META[statusKey]?.tone || "warn",
    source: sourceKey || "none",
    sourceLabel: BREADCRUMB_SOURCE_LABELS[sourceKey] || formatKeyAsLabel(sourceKey),
    reason: reasonKey,
    reasonLabel: reasonKey ? (BREADCRUMB_REASON_LABELS[reasonKey] || formatKeyAsLabel(reasonKey)) : null,
    meta,
  };
}

function breadcrumbStatusClass(tone) {
  if (tone === "ok") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
}

function withPolicy(group, key, fallbackLabel = null) {
  const policy = resolveBrandIcon(group, key, fallbackLabel);
  return {
    key: policy.key,
    label: policy.label,
    iconUrl: policy.iconUrl,
    legalStatus: policy.legalStatus,
    legalReason: policy.legalReason,
    sourceUrl: policy.sourceUrl || null,
    attribution: policy.attribution || null,
  };
}

function detectBrowser(event) {
  const device = asObject(event?.device);
  const context = asObject(event?.context);
  const release = asObject(event?.release);
  const raw = normalizeKey(
    firstString(
      device.browser,
      context.browser,
      context.user_agent_browser,
      release.browser,
    ),
  );
  if (!raw) return withPolicy("browsers", "unknown", "Desconocido");
  if (raw.includes("chrome")) return withPolicy("browsers", "chrome", "Chrome");
  if (raw.includes("firefox") || raw.includes("mozilla")) return withPolicy("browsers", "firefox", "Firefox");
  if (raw.includes("brave")) return withPolicy("browsers", "brave", "Brave");
  if (raw.includes("safari")) return withPolicy("browsers", "safari", "Safari");
  if (raw.includes("edge")) return withPolicy("browsers", "edge", "Edge");
  if (raw.includes("opera")) return withPolicy("browsers", "opera", "Opera");
  return withPolicy("browsers", raw, raw);
}

function detectProvider(event) {
  const userRef = asObject(event?.user_ref);
  const context = asObject(event?.context);
  const appMeta = asObject(userRef.app_metadata);

  const raw = normalizeKey(
    firstString(
      userRef.provider,
      appMeta.provider,
      context.provider,
      context.auth_provider,
    ),
  );

  if (!raw) return withPolicy("providers", "unknown", "Desconocido");
  if (raw.includes("google")) return withPolicy("providers", "google", "Google");
  if (raw.includes("facebook")) return withPolicy("providers", "facebook", "Facebook");
  if (raw.includes("discord")) return withPolicy("providers", "discord", "Discord");
  if (raw.includes("apple")) return withPolicy("providers", "apple", "Apple");
  if (raw.includes("email")) return withPolicy("providers", "email", "Correo");
  return withPolicy("providers", raw, raw);
}

function detectContactEmail(event) {
  const userRef = asObject(event?.user_ref);
  const context = asObject(event?.context);
  return firstString(
    userRef.email,
    context.email,
    context.user_email,
  );
}

function detectOs(event) {
  const device = asObject(event?.device);
  const context = asObject(event?.context);
  const release = asObject(event?.release);
  const raw = normalizeKey(
    firstString(
      device.os,
      context.os,
      context.platform,
      release.os,
    ),
  );
  if (!raw) return withPolicy("os", "unknown", "Desconocido");
  if (raw.includes("windows")) return withPolicy("os", "windows", "Windows");
  if (raw.includes("android")) return withPolicy("os", "android", "Android");
  if (raw.includes("ios")) return withPolicy("os", "ios", "iOS");
  if (raw.includes("mac") || raw.includes("darwin")) return withPolicy("os", "macos", "macOS");
  if (raw.includes("linux")) return withPolicy("os", "linux", "Linux");
  return withPolicy("os", raw, raw);
}

function detectDeviceType(event, osKey) {
  const device = asObject(event?.device);
  const context = asObject(event?.context);
  const raw = normalizeKey(
    firstString(
      device.type,
      context.device_type,
      context.device,
    ),
  );
  if (raw.includes("tablet")) return { key: "tablet", label: "Tablet", Icon: Tablet };
  if (raw.includes("mobile") || raw.includes("phone")) return { key: "phone", label: "Teléfono", Icon: Smartphone };
  if (raw.includes("desktop") || raw.includes("pc") || raw.includes("laptop")) {
    return { key: "pc", label: "PC", Icon: Monitor };
  }
  if (osKey === "android" || osKey === "ios") return { key: "phone", label: "Teléfono", Icon: Smartphone };
  return { key: "pc", label: "PC", Icon: Monitor };
}

function buildImportantTags({ event, symbolicationInfo, identity, breadcrumbDiagnostics }) {
  if (!event) return [];
  const tags = [
    { label: "Nivel", value: formatLevelLabel(event.level), tone: "risk" },
    { label: "Tipo", value: formatEventTypeLabel(event.event_type), tone: "base" },
    { label: "Estado", value: event.event_domain || "-", tone: "base" },
    { label: "Source", value: event.source || "-", tone: "base" },
    { label: "App", value: event.app_id || "-", tone: "base" },
    { label: "Release", value: event.release_version_label || "-", tone: "accent" },
    { label: "Componente", value: event.resolved_component_key || "-", tone: "accent" },
    { label: "Resolución", value: event.component_resolution_method || "-", tone: "base" },
    {
      label: "Symbolication",
      value: formatSymbolicationStatus(symbolicationInfo?.symbolication_status),
      tone: "accent",
    },
    { label: "Navegador", value: identity.browser.label || "-", tone: "base" },
    { label: "Proveedor", value: identity.provider.label || "-", tone: "base" },
    { label: "SO", value: identity.os.label || "-", tone: "base" },
    { label: "Dispositivo", value: identity.deviceType.label || "-", tone: "base" },
    {
      label: "Breadcrumbs",
      value: breadcrumbDiagnostics?.statusLabel || "-",
      tone: breadcrumbDiagnostics?.statusTone === "ok" ? "base" : "risk",
    },
    { label: "Origen trail", value: breadcrumbDiagnostics?.sourceLabel || "-", tone: "base" },
    { label: "Retention", value: event.retention_tier || "-", tone: "base" },
  ];
  if (breadcrumbDiagnostics?.reasonLabel) {
    tags.push({ label: "Motivo trail", value: breadcrumbDiagnostics.reasonLabel, tone: "base" });
  }
  return tags.filter((tag) => tag.value && tag.value !== "-");
}

function tagToneClass(tone) {
  if (tone === "risk") return "border-red-200 bg-red-50 text-red-700";
  if (tone === "accent") return "border-[#D8C6FF] bg-[#F5F0FF] text-[#5E30A5]";
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function normalizeBreadcrumb(entry, index) {
  const obj = asObject(entry);
  const title =
    firstString(obj.message, obj.event, obj.action, obj.name, obj.category) ||
    `Paso ${index + 1}`;
  const timestamp = firstString(obj.timestamp, obj.occurred_at, obj.created_at, obj.time);
  const detail =
    firstString(
      obj.description,
      obj.route,
      obj.screen,
      obj.flow_step,
      obj.details,
      typeof entry === "string" ? entry : null,
    ) || "Sin detalle adicional";

  const meta = [
    ["nivel", firstString(obj.level, obj.severity)],
    ["tipo", firstString(obj.type, obj.event_type)],
    ["ruta", firstString(obj.route, obj.path)],
    ["pantalla", firstString(obj.screen)],
    ["flow", firstString(obj.flow)],
  ].filter((item) => item[1]);

  return {
    id: firstString(obj.id) || `crumb-${index}`,
    index,
    title,
    timestamp,
    detail,
    meta,
    raw: obj,
  };
}

function toInt(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return Math.trunc(num);
}

function isErrorBreadcrumb(crumb, eventLevelKey, isLast) {
  const raw = asObject(crumb?.raw);
  const level = normalizeKey(firstString(raw.level, raw.severity));
  const type = normalizeKey(firstString(raw.type, raw.event_type));
  const hay = `${crumb?.title || ""} ${crumb?.detail || ""} ${level} ${type}`.toLowerCase();
  const errorWords = [
    "error",
    "fatal",
    "exception",
    "failed",
    "fail",
    "crash",
    "throw",
    "timeout",
    "rejected",
  ];

  if (level === "error" || level === "fatal") return true;
  if (errorWords.some((word) => hay.includes(word))) return true;
  if (isLast && (eventLevelKey === "error" || eventLevelKey === "fatal")) return true;
  return false;
}

function buildFailedCodeContext(symbolicationInfo, symbolicatedFrames) {
  const stack = asObject(symbolicationInfo?.symbolicated_stack);
  const errorExcerpt = asObject(stack.error_excerpt);
  const excerptLines = asArray(errorExcerpt.lines);

  if (excerptLines.length > 0) {
    const line = toInt(errorExcerpt.error_line) ?? toInt(errorExcerpt.line) ?? null;
    const lines = excerptLines.map((entry, idx) => {
      const row = asObject(entry);
      const lineNo = toInt(row.line_no) ?? (line != null ? line - 10 + idx : idx + 1);
      const text = firstString(row.text, row.code, row.value, "") || "";
      const highlight = Boolean(row.highlight) || (line != null ? lineNo === line : false);
      return { lineNo, text, highlight };
    });
    return {
      source: firstString(errorExcerpt.source, "unknown"),
      line: line ?? 1,
      column: toInt(errorExcerpt.error_column) ?? toInt(errorExcerpt.column) ?? 0,
      frameLabel: firstString(errorExcerpt.frame_name, "Frame"),
      lines,
    };
  }

  const frames = Array.isArray(symbolicatedFrames) ? symbolicatedFrames : [];
  const frameWithExcerpt = frames.find((item) => {
    const original = asObject(item?.original);
    const excerpt = asObject(original.excerpt);
    const lines = asArray(excerpt.lines);
    return lines.length > 0;
  });
  if (!frameWithExcerpt) return null;

  const original = asObject(frameWithExcerpt.original);
  const excerpt = asObject(original.excerpt);
  const rawLines = asArray(excerpt.lines);
  if (!rawLines.length) return null;

  const line = toInt(excerpt.error_line) ?? toInt(original.line) ?? toInt(frameWithExcerpt.line) ?? 1;
  const lines = rawLines.map((entry, idx) => {
    const row = asObject(entry);
    const lineNo = toInt(row.line_no) ?? line - 10 + idx;
    const text = firstString(row.text, row.code, row.value, "") || "";
    const highlight = Boolean(row.highlight) || lineNo === line;
    return { lineNo, text, highlight };
  });

  return {
    source: firstString(original.source, frameWithExcerpt.file, frameWithExcerpt.generated_file, "unknown"),
    line,
    column: toInt(excerpt.error_column) ?? toInt(original.column) ?? toInt(frameWithExcerpt.column) ?? 0,
    frameLabel: firstString(original.name, frameWithExcerpt.function, frameWithExcerpt.raw, "Frame"),
    lines,
  };
}

function IdentityCard({ title, value, subtitle, iconUrl, FallbackIcon }) {
  return (
    <div className="rounded-xl border border-[#E8E2F5] bg-white px-3 py-2.5">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E7DDFB] bg-[#F7F2FF]">
          {React.createElement(FallbackIcon, { size: 16, className: "text-[#6A3EB1]" })}
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={title}
              loading="lazy"
              className="absolute h-5 w-5 object-contain"
              referrerPolicy="no-referrer"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : null}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            {title}
          </div>
          <div className="truncate text-sm font-semibold text-slate-800">{value || "-"}</div>
          {subtitle ? (
            <div className="truncate text-[11px] text-slate-500">{subtitle}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
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
        force: true,
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
  }, [isEventsRoute, isDetailsRoute, issueId, navigate]);

  useEffect(() => {
    if (!isDetailsRoute || !eventId || !issueId) return;
    setSymbolicationError(null);
    void loadEventDetails(issueId, eventId);
    void symbolicateEvent(eventId, { cacheType: "short", force: true });
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

  const symbolicatedFrames = useMemo(
    () =>
      Array.isArray(symbolicationInfo?.symbolicated_stack?.frames)
        ? symbolicationInfo.symbolicated_stack.frames
        : [],
    [symbolicationInfo],
  );

  const breadcrumbDiagnostics = useMemo(
    () => resolveBreadcrumbDiagnostics(selectedEvent),
    [selectedEvent],
  );

  const identityInfo = useMemo(() => {
    if (!selectedEvent) {
      return {
        browser: { label: "-", iconUrl: null },
        provider: { label: "-", iconUrl: null },
        os: { label: "-", iconUrl: null },
        deviceType: { label: "-", Icon: Monitor },
        email: null,
      };
    }
    const browser = detectBrowser(selectedEvent);
    const provider = detectProvider(selectedEvent);
    const os = detectOs(selectedEvent);
    const deviceType = detectDeviceType(selectedEvent, os.key);
    const email = detectContactEmail(selectedEvent);
    return { browser, provider, os, deviceType, email };
  }, [selectedEvent]);

  const brandLegalNotes = useMemo(() => {
    const attributionRows = [identityInfo?.browser, identityInfo?.provider, identityInfo?.os]
      .map((item) => firstString(item?.attribution))
      .filter(Boolean);
    return {
      notice: BRAND_ICON_UI_NOTICE,
      attributions: Array.from(new Set(attributionRows)),
    };
  }, [identityInfo]);

  const importantTags = useMemo(
    () =>
      buildImportantTags({
        event: selectedEvent,
        symbolicationInfo,
        identity: identityInfo,
        breadcrumbDiagnostics,
      }),
    [selectedEvent, symbolicationInfo, identityInfo, breadcrumbDiagnostics],
  );

  const breadcrumbTimeline = useMemo(() => {
    const raw = Array.isArray(selectedEvent?.breadcrumbs) ? selectedEvent.breadcrumbs : [];
    const normalized = raw.map((entry, index) => normalizeBreadcrumb(entry, index));
    const eventLevelKey = normalizeKey(selectedEvent?.level);
    const flags = normalized.map((crumb, index) =>
      isErrorBreadcrumb(crumb, eventLevelKey, index === normalized.length - 1),
    );
    let errorIndex = flags.lastIndexOf(true);
    if (errorIndex < 0 && normalized.length > 0 && (eventLevelKey === "error" || eventLevelKey === "fatal")) {
      errorIndex = normalized.length - 1;
    }
    return normalized.map((crumb, index) => ({
      ...crumb,
      isError: index === errorIndex,
    }));
  }, [selectedEvent]);

  const failedCodeContext = useMemo(
    () => buildFailedCodeContext(symbolicationInfo, symbolicatedFrames),
    [symbolicationInfo, symbolicatedFrames],
  );

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

        <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <Tags size={15} />
            Tags importantes del evento
          </div>
          <div className="flex flex-wrap gap-2">
            {importantTags.map((tag) => (
              <div
                key={`${tag.label}-${tag.value}`}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tagToneClass(tag.tone)}`}
              >
                <span className="opacity-80">{tag.label}:</span>
                <span>{tag.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <IdentityCard
            title="Navegador"
            value={identityInfo.browser.label}
            iconUrl={identityInfo.browser.iconUrl}
            FallbackIcon={Globe2}
          />
          <IdentityCard
            title="Proveedor"
            value={identityInfo.provider.label}
            subtitle={identityInfo.email || null}
            iconUrl={identityInfo.provider.iconUrl}
            FallbackIcon={identityInfo.provider.key === "email" ? Mail : UserRound}
          />
          <IdentityCard
            title="Sistema operativo"
            value={identityInfo.os.label}
            iconUrl={identityInfo.os.iconUrl}
            FallbackIcon={Monitor}
          />
          <IdentityCard
            title="Dispositivo"
            value={identityInfo.deviceType.label}
            subtitle={identityInfo.email ? "Contacto detectado" : "Sin correo detectado"}
            iconUrl={null}
            FallbackIcon={identityInfo.deviceType.Icon || Monitor}
          />
        </div>

        <div className="rounded-xl border border-[#ECE5FA] bg-[#FCFBFF] px-3 py-2 text-[11px] text-slate-600">
          <div>{brandLegalNotes.notice}</div>
          {brandLegalNotes.attributions.map((line, idx) => (
            <div key={`brand-attr-${idx}`} className="mt-1 text-[10px] text-slate-500">
              {line}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-[#E8E2F5] bg-white p-3">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <Layers3 size={15} />
            Secuencia de breadcrumbs
            <span className="rounded-full border border-[#E2D6FA] bg-[#F6F2FF] px-2 py-0.5 text-[10px] font-semibold text-[#5E30A5]">
              {breadcrumbTimeline.length}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${breadcrumbStatusClass(
                breadcrumbDiagnostics.statusTone,
              )}`}
            >
              {breadcrumbDiagnostics.statusLabel}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              {breadcrumbDiagnostics.sourceLabel}
            </span>
          </div>
          <div className="mb-3 grid gap-2 text-[11px] text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
              <span className="font-semibold text-slate-700">Count:</span> {breadcrumbDiagnostics.count}
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
              <span className="font-semibold text-slate-700">Last at:</span> {formatDate(breadcrumbDiagnostics.lastAt)}
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
              <span className="font-semibold text-slate-700">Status key:</span> {breadcrumbDiagnostics.status}
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
              <span className="font-semibold text-slate-700">Source key:</span> {breadcrumbDiagnostics.source}
            </div>
          </div>
          {breadcrumbDiagnostics.reasonLabel ? (
            <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
              <span className="font-semibold">Motivo:</span> {breadcrumbDiagnostics.reasonLabel}
            </div>
          ) : null}

          {breadcrumbTimeline.length > 0 ? (
            <div className="space-y-2">
              {breadcrumbTimeline.map((crumb, idx) => (
                <div key={`${crumb.id}-${idx}`} className="relative pl-14">
                  {idx < breadcrumbTimeline.length - 1 ? (
                    <div
                      className={`absolute left-[22px] top-[40px] h-[calc(100%-24px)] w-px ${
                        crumb.isError
                          ? "bg-gradient-to-b from-red-300 to-transparent"
                          : "bg-gradient-to-b from-[#CBB8F3] to-transparent"
                      }`}
                    />
                  ) : null}
                  <div
                    className={`absolute left-0 top-2 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold ${
                      crumb.isError
                        ? "border border-red-300 bg-red-100 text-red-700"
                        : "border border-[#DCCBFF] bg-[#F4EDFF] text-[#5E30A5]"
                    }`}
                  >
                    {crumb.isError ? <AlertOctagon size={18} /> : idx + 1}
                  </div>

                  <div
                    className={`min-h-[84px] rounded-xl px-4 py-3 ${
                      crumb.isError
                        ? "border border-red-200 bg-red-50"
                        : "border border-[#EEE7FC] bg-[#FCFBFF]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className={`text-sm font-semibold ${crumb.isError ? "text-red-700" : "text-slate-800"}`}>
                        {crumb.title}
                      </div>
                      <div className={`text-[11px] ${crumb.isError ? "text-red-600" : "text-slate-500"}`}>
                        {crumb.timestamp ? formatDate(crumb.timestamp) : "Sin timestamp"}
                      </div>
                    </div>
                    {crumb.isError ? (
                      <div className="mt-1 inline-flex items-center rounded-full border border-red-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-red-700">
                        Paso con error
                      </div>
                    ) : null}
                    <div className={`mt-1 text-xs ${crumb.isError ? "text-red-700" : "text-slate-600"}`}>
                      {crumb.detail}
                    </div>
                    {crumb.meta.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {crumb.meta.map(([key, value]) => (
                          <div
                            key={`${crumb.id}-${key}`}
                            className={`rounded-md bg-white px-2 py-0.5 text-[10px] ${
                              crumb.isError
                                ? "border border-red-200 text-red-700"
                                : "border border-[#E5DBF8] text-slate-600"
                            }`}
                          >
                            <span className="font-semibold text-[#5E30A5]">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#DDD4F3] px-3 py-4 text-center text-xs text-slate-500">
              Este evento no tiene breadcrumbs registrados.{" "}
              {breadcrumbDiagnostics.reasonLabel
                ? `Motivo detectado: ${breadcrumbDiagnostics.reasonLabel}`
                : "Motivo detectado: no determinado."}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700">
            <Code2 size={15} />
            Codigo que fallo
          </div>

          {failedCodeContext ? (
            <>
              <div className="mb-2 text-xs text-red-700">
                {failedCodeContext.source}:{failedCodeContext.line}:{failedCodeContext.column}
              </div>
              <div className="overflow-auto rounded-lg border border-red-200 bg-[#211A2B] p-2">
                <div className="min-w-[420px] space-y-1 font-mono text-[11px] leading-5">
                  {failedCodeContext.lines.map((line, idx) => (
                    <div
                      key={`${failedCodeContext.source}-${line.lineNo}-${idx}`}
                      className={`grid grid-cols-[56px_minmax(0,1fr)] items-start gap-3 rounded px-2 py-0.5 ${
                        line.highlight ? "bg-red-500/20 ring-1 ring-red-400/50" : "bg-transparent"
                      }`}
                    >
                      <span className={`text-right ${line.highlight ? "text-red-200" : "text-slate-500"}`}>
                        {line.lineNo}
                      </span>
                      <pre
                        className={`whitespace-pre-wrap break-words ${
                          line.highlight ? "text-red-100" : "text-slate-100"
                        }`}
                      >
                        {line.text || " "}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 text-[11px] text-red-700">
                {failedCodeContext.frameLabel || "Frame"}
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-red-200 bg-white px-3 py-4 text-center text-xs text-red-600">
              No hay codigo fuente disponible para este release/frame.
            </div>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#E8E2F5] bg-white p-3 text-xs text-slate-700">
            <div><span className="font-semibold">Fecha:</span> {formatDate(selectedEvent.occurred_at)}</div>
            <div><span className="font-semibold">Severidad:</span> {formatLevelLabel(selectedEvent.level)}</div>
            <div><span className="font-semibold">Clase:</span> {formatEventTypeLabel(selectedEvent.event_type)}</div>
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
            <div><span className="font-semibold">Symbolication status:</span> {formatSymbolicationStatus(symbolicationInfo?.symbolication_status)}</div>
            <div><span className="font-semibold">Symbolication type:</span> {formatSymbolicationType(symbolicationInfo?.symbolication_type)}</div>
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
            <div><span className="font-semibold">Breadcrumbs status:</span> {breadcrumbDiagnostics.statusLabel}</div>
            <div><span className="font-semibold">Breadcrumbs source:</span> {breadcrumbDiagnostics.sourceLabel}</div>
            <div><span className="font-semibold">Breadcrumbs reason:</span> {breadcrumbDiagnostics.reasonLabel || "-"}</div>
            <div><span className="font-semibold">Breadcrumbs count:</span> {breadcrumbDiagnostics.count}</div>
            <div><span className="font-semibold">Breadcrumbs last at:</span> {formatDate(breadcrumbDiagnostics.lastAt)}</div>
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
                breadcrumbs_meta: selectedEvent.breadcrumbs_meta,
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
                  {formatLevelBadge(event.level)}
                </Badge>
                <span className="font-semibold text-slate-700">{formatEventTypeLabel(event.event_type)}</span>
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
                {formatLevelBadge(issue.level)}
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
