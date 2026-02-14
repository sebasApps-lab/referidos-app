import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

const DEFAULT_DAYS = 7;
const MAX_DAYS = 90;
const MAX_SCAN_ROWS = 25000;

const EVENT_TYPES = [
  "page_view",
  "cta_toggle_role",
  "cta_waitlist_open",
  "waitlist_submit",
  "download_click",
  "support_ticket_created",
];

const WAITLIST_ROLE_VALUES = ["cliente", "negocio"];
const WAITLIST_STATUS_VALUES = [
  "pending_confirm",
  "active",
  "unsubscribed",
  "blocked",
];
const SUPPORT_STATUS_VALUES = [
  "new",
  "assigned",
  "in_progress",
  "waiting_user",
  "queued",
  "closed",
  "cancelled",
];
const SUPPORT_SEVERITY_VALUES = ["s0", "s1", "s2", "s3"];
const SUPPORT_CATEGORY_VALUES = [
  "acceso",
  "verificacion",
  "qr",
  "promos",
  "negocios_sucursales",
  "pagos_plan",
  "reporte_abuso",
  "bug_performance",
  "sugerencia",
  "tier_beneficios",
  "borrar_correo_waitlist",
];

type EqFilter = {
  kind: "eq";
  column: string;
  value: string;
};

type InFilter = {
  kind: "in";
  column: string;
  values: string[];
};

type MetricFilter = EqFilter | InFilter;

function toDayKey(isoValue: string) {
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function buildTimelineSeed(days: number) {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const timelineMap = new Map<
    string,
    {
      day: string;
      page_views: number;
      unique_visitors: number;
      waitlist_submits: number;
      support_tickets_created: number;
    }
  >();

  for (let i = 0; i < days; i += 1) {
    const current = new Date(start);
    current.setUTCDate(start.getUTCDate() + i);
    const day = current.toISOString().slice(0, 10);
    timelineMap.set(day, {
      day,
      page_views: 0,
      unique_visitors: 0,
      waitlist_submits: 0,
      support_tickets_created: 0,
    });
  }
  return timelineMap;
}

function clampDays(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_DAYS;
  const rounded = Math.round(parsed);
  if (rounded < 1) return 1;
  if (rounded > MAX_DAYS) return MAX_DAYS;
  return rounded;
}

async function countRows(
  table: string,
  tenantId: string,
  sinceIso: string,
  dateColumn: string,
  appChannel: string | null,
  filters: MetricFilter[] = [],
) {
  let query = supabaseAdmin
    .from(table)
    .select("id", { count: "exact", head: true })
    .gte(dateColumn, sinceIso);

  if (table !== "support_threads") {
    query = query.eq("tenant_id", tenantId);
  }

  if (appChannel) {
    query = query.eq("app_channel", appChannel);
  }

  for (const filter of filters) {
    if (filter.kind === "eq") {
      query = query.eq(filter.column, filter.value);
    } else if (filter.kind === "in" && filter.values.length > 0) {
      query = query.in(filter.column, filter.values);
    }
  }

  const { count, error } = await query;
  if (error) return 0;
  return count || 0;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);
  }

  const { user, error: authErr } = await requireAuthUser(token);
  if (authErr || !user) {
    return jsonResponse({ ok: false, error: "unauthorized" }, 401, cors);
  }

  const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
  if (profileErr || !usuario) {
    return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
  }
  if (!["admin", "soporte"].includes(usuario.role)) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const tenantId = safeTrim(usuario.tenant_id, 64);
  if (!tenantId) {
    return jsonResponse({ ok: false, error: "tenant_missing" }, 400, cors);
  }

  const body = await req.json().catch(() => ({}));
  const days = clampDays(body.days);
  const appChannel = safeTrim(body.app_channel, 60) || null;
  const sinceIso = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const rangeFromDay = toDayKey(sinceIso);

  let uniqueVisitorsQuery = supabaseAdmin
    .from("prelaunch_visitors")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .gte("last_seen_at", sinceIso);

  let newVisitorsQuery = supabaseAdmin
    .from("prelaunch_visitors")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .gte("first_seen_at", sinceIso);

  let recurrentVisitorsQuery = supabaseAdmin
    .from("prelaunch_visitors")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .lt("first_seen_at", sinceIso)
    .gte("last_seen_at", sinceIso);

  if (appChannel) {
    uniqueVisitorsQuery = uniqueVisitorsQuery.eq("app_channel", appChannel);
    newVisitorsQuery = newVisitorsQuery.eq("app_channel", appChannel);
    recurrentVisitorsQuery = recurrentVisitorsQuery.eq("app_channel", appChannel);
  }

  const [{ count: uniqueVisitors }, { count: newVisitors }, { count: recurrentVisitors }] =
    await Promise.all([uniqueVisitorsQuery, newVisitorsQuery, recurrentVisitorsQuery]);

  let waitlistQuery = supabaseAdmin
    .from("waitlist_signups")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .gte("created_at", sinceIso);

  if (appChannel) {
    waitlistQuery = waitlistQuery.eq("app_channel", appChannel);
  }

  const { count: waitlistSubmits } = await waitlistQuery;

  let supportTicketsQuery = supabaseAdmin
    .from("support_threads")
    .select("id", { count: "exact", head: true })
    .eq("request_origin", "anonymous")
    .eq("origin_source", "prelaunch")
    .gte("created_at", sinceIso);

  if (appChannel) {
    supportTicketsQuery = supportTicketsQuery.eq("app_channel", appChannel);
  }

  const { count: supportTickets } = await supportTicketsQuery;

  const eventBreakdownEntries = await Promise.all(
    EVENT_TYPES.map(async (eventType) => {
      const count = await countRows(
        "prelaunch_events",
        tenantId,
        sinceIso,
        "event_at",
        appChannel,
        [{ kind: "eq", column: "event_type", value: eventType }],
      );
      return [eventType, count] as const;
    }),
  );
  const eventBreakdown = Object.fromEntries(eventBreakdownEntries);

  const funnel = {
    page_view: eventBreakdown.page_view || 0,
    cta_toggle_role: eventBreakdown.cta_toggle_role || 0,
    cta_waitlist_open: eventBreakdown.cta_waitlist_open || 0,
    waitlist_submit: eventBreakdown.waitlist_submit || 0,
    download_click: eventBreakdown.download_click || 0,
    support_ticket_created: eventBreakdown.support_ticket_created || 0,
  };

  const waitlistByRole = await Promise.all(
    WAITLIST_ROLE_VALUES.map(async (value) => ({
      role_intent: value,
      count: await countRows(
        "waitlist_signups",
        tenantId,
        sinceIso,
        "created_at",
        appChannel,
        [{ kind: "eq", column: "role_intent", value }],
      ),
    })),
  );

  const waitlistByStatus = await Promise.all(
    WAITLIST_STATUS_VALUES.map(async (value) => ({
      status: value,
      count: await countRows(
        "waitlist_signups",
        tenantId,
        sinceIso,
        "created_at",
        appChannel,
        [{ kind: "eq", column: "status", value }],
      ),
    })),
  );

  let waitlistSourcesQuery = supabaseAdmin
    .from("waitlist_signups")
    .select("source, utm")
    .eq("tenant_id", tenantId)
    .gte("created_at", sinceIso)
    .limit(MAX_SCAN_ROWS);
  if (appChannel) {
    waitlistSourcesQuery = waitlistSourcesQuery.eq("app_channel", appChannel);
  }
  const { data: waitlistSourcesRows } = await waitlistSourcesQuery;
  const waitlistSourceMap = new Map<string, number>();
  for (const row of waitlistSourcesRows || []) {
    const utmSource = typeof row.utm === "object" && row.utm
      ? safeTrim((row.utm as Record<string, unknown>).source as string, 80)
      : "";
    const source = utmSource || safeTrim(row.source, 80) || "direct";
    waitlistSourceMap.set(source, (waitlistSourceMap.get(source) || 0) + 1);
  }
  const waitlistTopSources = Array.from(waitlistSourceMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, count]) => ({ source, count }));

  const supportBaseFilters: MetricFilter[] = [
    { kind: "eq", column: "request_origin", value: "anonymous" },
    { kind: "eq", column: "origin_source", value: "prelaunch" },
  ];

  const supportByStatus = await Promise.all(
    SUPPORT_STATUS_VALUES.map(async (value) => ({
      status: value,
      count: await countRows(
        "support_threads",
        tenantId,
        sinceIso,
        "created_at",
        appChannel,
        [...supportBaseFilters, { kind: "eq", column: "status", value }],
      ),
    })),
  );

  const supportBySeverity = await Promise.all(
    SUPPORT_SEVERITY_VALUES.map(async (value) => ({
      severity: value,
      count: await countRows(
        "support_threads",
        tenantId,
        sinceIso,
        "created_at",
        appChannel,
        [...supportBaseFilters, { kind: "eq", column: "severity", value }],
      ),
    })),
  );

  const supportByCategory = await Promise.all(
    SUPPORT_CATEGORY_VALUES.map(async (value) => ({
      category: value,
      count: await countRows(
        "support_threads",
        tenantId,
        sinceIso,
        "created_at",
        appChannel,
        [...supportBaseFilters, { kind: "eq", column: "category", value }],
      ),
    })),
  );

  const timelineMap = buildTimelineSeed(days);
  const uniqueVisitorPerDay = new Map<string, Set<string>>();
  let timelineQuery = supabaseAdmin
    .from("prelaunch_events")
    .select("event_at, event_type, anon_id")
    .eq("tenant_id", tenantId)
    .gte("event_at", sinceIso)
    .in("event_type", ["page_view", "waitlist_submit", "support_ticket_created"])
    .limit(MAX_SCAN_ROWS);
  if (appChannel) {
    timelineQuery = timelineQuery.eq("app_channel", appChannel);
  }
  const { data: timelineRows } = await timelineQuery;

  for (const row of timelineRows || []) {
    const day = toDayKey(row.event_at);
    if (!day) continue;
    if (rangeFromDay && day < rangeFromDay) continue;
    const bucket = timelineMap.get(day);
    if (!bucket) continue;

    if (row.event_type === "page_view") {
      bucket.page_views += 1;
      if (row.anon_id) {
        if (!uniqueVisitorPerDay.has(day)) {
          uniqueVisitorPerDay.set(day, new Set());
        }
        uniqueVisitorPerDay.get(day)?.add(String(row.anon_id));
      }
    } else if (row.event_type === "waitlist_submit") {
      bucket.waitlist_submits += 1;
    } else if (row.event_type === "support_ticket_created") {
      bucket.support_tickets_created += 1;
    }
  }

  const timeline = Array.from(timelineMap.values()).map((item) => ({
    ...item,
    unique_visitors: uniqueVisitorPerDay.get(item.day)?.size || 0,
  }));

  let topRiskQuery = supabaseAdmin
    .from("prelaunch_events")
    .select("ip_risk_id")
    .eq("tenant_id", tenantId)
    .gte("event_at", sinceIso)
    .not("ip_risk_id", "is", null)
    .limit(5000);
  if (appChannel) {
    topRiskQuery = topRiskQuery.eq("app_channel", appChannel);
  }
  const { data: riskRows } = await topRiskQuery;
  const riskMap = new Map<string, number>();
  for (const row of riskRows || []) {
    const value = safeTrim(row.ip_risk_id, 160);
    if (!value) continue;
    riskMap.set(value, (riskMap.get(value) || 0) + 1);
  }
  const topIpRisk = Array.from(riskMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([ip_risk_id, count]) => ({ ip_risk_id, count }));

  const totalUnique = uniqueVisitors || 0;
  const totalWaitlist = waitlistSubmits || 0;
  const waitlistConversion = totalUnique > 0 ? Number((totalWaitlist / totalUnique).toFixed(4)) : 0;

  return jsonResponse(
    {
      ok: true,
      range_days: days,
      app_channel: appChannel,
      metrics: {
        unique_visitors: totalUnique,
        new_visitors: newVisitors || 0,
        recurrent_visitors: recurrentVisitors || 0,
        waitlist_submits: totalWaitlist,
        waitlist_conversion: waitlistConversion,
        support_tickets_created: supportTickets || 0,
      },
      funnel,
      event_breakdown: eventBreakdown,
      waitlist_breakdown: {
        by_role: waitlistByRole,
        by_status: waitlistByStatus,
        top_sources: waitlistTopSources,
      },
      support_breakdown: {
        by_status: supportByStatus,
        by_severity: supportBySeverity,
        by_category: supportByCategory,
      },
      timeline,
      top_ip_risk: topIpRisk,
    },
    200,
    cors,
  );
});
