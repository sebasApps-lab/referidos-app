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
const CONNECTED_VISITOR_WINDOW_MINUTES = 5;

const EVENT_TYPES = [
  "page_view",
  "cta_toggle_role",
  "cta_waitlist_open",
  "cta_help_open",
  "cta_business_interest_open",
  "cta_business_interest_close",
  "waitlist_submit",
  "waitlist_submit_error",
  "section_view",
  "modal_view",
  "modal_close",
  "link_click",
  "page_leave",
  "download_click",
  "support_ticket_created",
  "support_ticket_message",
  "feedback_open",
  "feedback_submit_attempt",
  "feedback_submit_success",
  "feedback_submit_duplicate",
  "feedback_submit_rate_limited",
  "feedback_submit_blocked",
  "feedback_submit_validation_error",
  "feedback_submit_error",
  "waitlist_referral_link_copy",
  "waitlist_referral_visit",
  "waitlist_referral_submit_attempt",
  "waitlist_referral_submit_success",
  "waitlist_referral_submit_duplicate",
  "waitlist_referral_self_blocked",
  "waitlist_referral_qualified",
  "waitlist_referral_rewarded",
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

type TimelineBucket = {
  day: string;
  page_views: number;
  unique_visitors: number;
  new_visitors: number;
  recurrent_visitors: number;
  cta_waitlist_clicks: number;
  waitlist_submits: number;
  support_tickets_created: number;
  feedback_submits: number;
  modal_views: number;
  link_clicks: number;
  avg_time_on_page_ms: number;
  avg_time_on_page_seconds: number;
};

function toDayKey(isoValue: string) {
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function buildTimelineSeed(days: number) {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const timelineMap = new Map<string, TimelineBucket>();

  for (let i = 0; i < days; i += 1) {
    const current = new Date(start);
    current.setUTCDate(start.getUTCDate() + i);
    const day = current.toISOString().slice(0, 10);
    timelineMap.set(day, {
      day,
      page_views: 0,
      unique_visitors: 0,
      new_visitors: 0,
      recurrent_visitors: 0,
      cta_waitlist_clicks: 0,
      waitlist_submits: 0,
      support_tickets_created: 0,
      feedback_submits: 0,
      modal_views: 0,
      link_clicks: 0,
      avg_time_on_page_ms: 0,
      avg_time_on_page_seconds: 0,
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

function readStringProp(
  props: Record<string, unknown> | null | undefined,
  key: string,
) {
  const value = props?.[key];
  return typeof value === "string" ? value.trim() : "";
}

function readNumberProp(
  props: Record<string, unknown> | null | undefined,
  key: string,
) {
  const value = Number(props?.[key]);
  return Number.isFinite(value) ? value : 0;
}

function ensureSetMapValue(map: Map<string, Set<string>>, key: string) {
  if (!map.has(key)) {
    map.set(key, new Set());
  }
  return map.get(key)!;
}

function ensureNestedSetMapValue(
  map: Map<string, Map<string, Set<string>>>,
  outerKey: string,
  innerKey: string,
) {
  if (!map.has(outerKey)) {
    map.set(outerKey, new Map());
  }
  const innerMap = map.get(outerKey)!;
  if (!innerMap.has(innerKey)) {
    innerMap.set(innerKey, new Set());
  }
  return innerMap.get(innerKey)!;
}

function mapToSortedCounts(map: Map<string, number>, keyName: string) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({ [keyName]: key, count }));
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
  const connectedSinceIso = new Date(
    Date.now() - CONNECTED_VISITOR_WINDOW_MINUTES * 60 * 1000,
  ).toISOString();
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

  let connectedVisitorsQuery = supabaseAdmin
    .from("prelaunch_visitors")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .gte("last_seen_at", connectedSinceIso);

  if (appChannel) {
    connectedVisitorsQuery = connectedVisitorsQuery.eq("app_channel", appChannel);
  }

  const [
    { count: uniqueVisitors },
    { count: newVisitors },
    { count: recurrentVisitors },
    { count: connectedVisitors },
  ] = await Promise.all([
    uniqueVisitorsQuery,
    newVisitorsQuery,
    recurrentVisitorsQuery,
    connectedVisitorsQuery,
  ]);

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
  const newVisitorPerDay = new Map<string, Set<string>>();
  const recurrentVisitorPerDay = new Map<string, Set<string>>();
  const pageLeaveStatsByDay = new Map<string, { sumMs: number; count: number }>();
  const sectionCountMap = new Map<string, number>();
  const modalViewCountMap = new Map<string, number>();
  const modalCloseCountMap = new Map<string, number>();
  const modalOverallUniqueViewers = new Map<string, Set<string>>();
  const modalDailyUniqueViewers = new Map<string, Map<string, Set<string>>>();
  const linkClickMap = new Map<
    string,
    {
      link_id: string;
      label: string;
      target_path: string;
      target_kind: string;
      count: number;
    }
  >();

  let totalPageLeaveMs = 0;
  let totalPageLeaveCount = 0;

  let visitorsTimelineQuery = supabaseAdmin
    .from("prelaunch_visitors")
    .select("anon_id, first_seen_at, last_seen_at")
    .eq("tenant_id", tenantId)
    .gte("last_seen_at", sinceIso)
    .limit(MAX_SCAN_ROWS);
  if (appChannel) {
    visitorsTimelineQuery = visitorsTimelineQuery.eq("app_channel", appChannel);
  }
  const { data: visitorRows } = await visitorsTimelineQuery;
  const visitorFirstSeenDay = new Map<string, string>();
  for (const row of visitorRows || []) {
    const anonId = String(row.anon_id || "");
    const firstSeenDay = row.first_seen_at ? toDayKey(row.first_seen_at) : null;
    if (anonId && firstSeenDay) {
      visitorFirstSeenDay.set(anonId, firstSeenDay);
    }
  }

  let engagementEventsQuery = supabaseAdmin
    .from("prelaunch_events")
    .select("event_at, event_type, anon_id, props")
    .eq("tenant_id", tenantId)
    .gte("event_at", sinceIso)
    .in("event_type", [
      "page_view",
      "cta_waitlist_open",
      "waitlist_submit",
      "support_ticket_created",
      "feedback_submit_success",
      "section_view",
      "modal_view",
      "modal_close",
      "link_click",
      "page_leave",
    ])
    .limit(MAX_SCAN_ROWS);
  if (appChannel) {
    engagementEventsQuery = engagementEventsQuery.eq("app_channel", appChannel);
  }
  const { data: engagementEventsRows } = await engagementEventsQuery;

  for (const row of engagementEventsRows || []) {
    const day = toDayKey(row.event_at);
    if (!day || (rangeFromDay && day < rangeFromDay)) {
      continue;
    }

    const bucket = timelineMap.get(day);
    if (!bucket) {
      continue;
    }

    const props =
      row.props && typeof row.props === "object" && !Array.isArray(row.props)
        ? (row.props as Record<string, unknown>)
        : {};
    const anonId = row.anon_id ? String(row.anon_id) : "";

    if (row.event_type === "page_view") {
      bucket.page_views += 1;
      if (anonId) {
        ensureSetMapValue(uniqueVisitorPerDay, day).add(anonId);
        const firstSeenDay = visitorFirstSeenDay.get(anonId);
        if (firstSeenDay === day) {
          ensureSetMapValue(newVisitorPerDay, day).add(anonId);
        } else {
          ensureSetMapValue(recurrentVisitorPerDay, day).add(anonId);
        }
      }
      continue;
    }

    if (row.event_type === "cta_waitlist_open") {
      bucket.cta_waitlist_clicks += 1;
      continue;
    }

    if (row.event_type === "waitlist_submit") {
      bucket.waitlist_submits += 1;
      continue;
    }

    if (row.event_type === "support_ticket_created") {
      bucket.support_tickets_created += 1;
      continue;
    }

    if (row.event_type === "feedback_submit_success") {
      bucket.feedback_submits += 1;
      continue;
    }

    if (row.event_type === "section_view") {
      const sectionId = readStringProp(props, "section_id") || "unknown";
      sectionCountMap.set(sectionId, (sectionCountMap.get(sectionId) || 0) + 1);
      continue;
    }

    if (row.event_type === "modal_view") {
      bucket.modal_views += 1;
      const modalId = readStringProp(props, "modal_id") || "unknown";
      modalViewCountMap.set(modalId, (modalViewCountMap.get(modalId) || 0) + 1);
      if (anonId) {
        ensureSetMapValue(modalOverallUniqueViewers, modalId).add(anonId);
        ensureNestedSetMapValue(modalDailyUniqueViewers, modalId, day).add(anonId);
      }
      continue;
    }

    if (row.event_type === "modal_close") {
      const modalId = readStringProp(props, "modal_id") || "unknown";
      modalCloseCountMap.set(modalId, (modalCloseCountMap.get(modalId) || 0) + 1);
      continue;
    }

    if (row.event_type === "link_click") {
      bucket.link_clicks += 1;
      const linkId = readStringProp(props, "link_id") || "unknown";
      const targetPath = readStringProp(props, "target_path");
      const targetKind = readStringProp(props, "target_kind") || "internal";
      const label = readStringProp(props, "label") || linkId;
      const current = linkClickMap.get(linkId) || {
        link_id: linkId,
        label,
        target_path: targetPath,
        target_kind: targetKind,
        count: 0,
      };
      current.count += 1;
      if (!current.target_path && targetPath) {
        current.target_path = targetPath;
      }
      linkClickMap.set(linkId, current);
      continue;
    }

    if (row.event_type === "page_leave") {
      const elapsedMs = Math.max(0, readNumberProp(props, "elapsed_ms"));
      if (elapsedMs <= 0) {
        continue;
      }
      totalPageLeaveMs += elapsedMs;
      totalPageLeaveCount += 1;
      const current = pageLeaveStatsByDay.get(day) || { sumMs: 0, count: 0 };
      current.sumMs += elapsedMs;
      current.count += 1;
      pageLeaveStatsByDay.set(day, current);
    }
  }

  const timeline = Array.from(timelineMap.values()).map((item) => {
    const leaveStats = pageLeaveStatsByDay.get(item.day);
    const avgTimeMs = leaveStats && leaveStats.count > 0
      ? Math.round(leaveStats.sumMs / leaveStats.count)
      : 0;

    return {
      ...item,
      unique_visitors: uniqueVisitorPerDay.get(item.day)?.size || 0,
      new_visitors: newVisitorPerDay.get(item.day)?.size || 0,
      recurrent_visitors: recurrentVisitorPerDay.get(item.day)?.size || 0,
      avg_time_on_page_ms: avgTimeMs,
      avg_time_on_page_seconds: Number((avgTimeMs / 1000).toFixed(1)),
    };
  });

  const peakDailyUniqueVisitors = timeline.reduce(
    (max, item) => Math.max(max, item.unique_visitors),
    0,
  );
  const averageDailyUniqueVisitors = timeline.length > 0
    ? Number(
      (
        timeline.reduce((sum, item) => sum + item.unique_visitors, 0) /
        timeline.length
      ).toFixed(1),
    )
    : 0;

  const totalCtaWaitlistClicks = timeline.reduce(
    (sum, item) => sum + item.cta_waitlist_clicks,
    0,
  );
  const totalLinkClicks = timeline.reduce((sum, item) => sum + item.link_clicks, 0);
  const totalModalViews = timeline.reduce((sum, item) => sum + item.modal_views, 0);
  const totalFeedbackSubmits = timeline.reduce(
    (sum, item) => sum + item.feedback_submits,
    0,
  );
  const averageTimeOnPageMs = totalPageLeaveCount > 0
    ? Math.round(totalPageLeaveMs / totalPageLeaveCount)
    : 0;

  const modalBreakdown = Array.from(modalViewCountMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([modal_id, views]) => {
      const dailyMap = modalDailyUniqueViewers.get(modal_id) || new Map();
      let averageDailyUniqueViewers = 0;
      dailyMap.forEach((set) => {
        averageDailyUniqueViewers += set.size;
      });
      averageDailyUniqueViewers = Number((averageDailyUniqueViewers / days).toFixed(1));

      return {
        modal_id,
        views,
        closes: modalCloseCountMap.get(modal_id) || 0,
        unique_viewers: modalOverallUniqueViewers.get(modal_id)?.size || 0,
        average_daily_unique_viewers: averageDailyUniqueViewers,
      };
    });

  const sectionBreakdown = mapToSortedCounts(sectionCountMap, "section_id");

  const topLinks = Array.from(linkClickMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

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
  const waitlistConversion = totalUnique > 0
    ? Number((totalWaitlist / totalUnique).toFixed(4))
    : 0;

  return jsonResponse(
    {
      ok: true,
      range_days: days,
      app_channel: appChannel,
      metrics: {
        unique_visitors: totalUnique,
        new_visitors: newVisitors || 0,
        recurrent_visitors: recurrentVisitors || 0,
        connected_visitors: connectedVisitors || 0,
        connected_window_minutes: CONNECTED_VISITOR_WINDOW_MINUTES,
        peak_daily_unique_visitors: peakDailyUniqueVisitors,
        average_daily_unique_visitors: averageDailyUniqueVisitors,
        waitlist_submits: totalWaitlist,
        waitlist_conversion: waitlistConversion,
        support_tickets_created: supportTickets || 0,
        feedback_submits: totalFeedbackSubmits,
        avg_time_on_page_ms: averageTimeOnPageMs,
        avg_time_on_page_seconds: Number((averageTimeOnPageMs / 1000).toFixed(1)),
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
      engagement: {
        sections: sectionBreakdown,
        modals: modalBreakdown,
        links: topLinks,
      },
      period_averages: {
        avg_time_on_page_ms: averageTimeOnPageMs,
        avg_time_on_page_seconds: Number((averageTimeOnPageMs / 1000).toFixed(1)),
        avg_cta_clicks_per_day: Number((totalCtaWaitlistClicks / days).toFixed(1)),
        avg_link_clicks_per_day: Number((totalLinkClicks / days).toFixed(1)),
        avg_modal_views_per_day: Number((totalModalViews / days).toFixed(1)),
        modal_daily_unique_viewers: modalBreakdown.slice(0, 6),
      },
      comparisons: {
        connected_vs_peak: {
          current: connectedVisitors || 0,
          reference: peakDailyUniqueVisitors,
          current_label: "Conectados ahora",
          reference_label: "Pico diario de visitantes",
        },
        waitlist_vs_visitors: {
          current: totalWaitlist,
          reference: totalUnique,
          current_label: "Waitlist submits",
          reference_label: "Visitantes únicos",
        },
        feedback_vs_support: {
          current: totalFeedbackSubmits,
          reference: supportTickets || 0,
          current_label: "Feedback enviado",
          reference_label: "Tickets soporte",
        },
      },
      timeline,
      top_ip_risk: topIpRisk,
    },
    200,
    cors,
  );
});
