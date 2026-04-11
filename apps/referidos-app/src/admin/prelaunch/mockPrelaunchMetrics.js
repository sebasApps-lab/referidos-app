function round(value) {
  return Math.max(0, Math.round(Number(value) || 0));
}

function isoDayOffset(offset) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - offset);
  return date.toISOString().slice(0, 10);
}

function buildTimeline(days, factor) {
  return Array.from({ length: days }, (_, index) => {
    const offset = days - 1 - index;
    const date = new Date(isoDayOffset(offset));
    const weekday = date.getDay();
    const weekdayFactor = weekday === 0 ? 0.88 : weekday === 6 ? 0.93 : 1;
    const trend = 1 + ((days - offset) / Math.max(days, 1)) * 0.18;
    const seasonal = 1 + Math.sin((index + 2) * 0.62) * 0.11;
    const unique = round(1850 * trend * seasonal * weekdayFactor * factor);
    const newVisitors = round(unique * (0.56 + (Math.cos(index * 0.48) * 0.04)));
    const recurrentVisitors = Math.max(0, unique - newVisitors);
    const pageViews = round(unique * (1.58 + Math.sin(index * 0.22) * 0.08));
    const ctaWaitlistClicks = round(unique * (0.37 + Math.cos(index * 0.31) * 0.018));
    const waitlistSubmits = round(ctaWaitlistClicks * (0.22 + Math.sin(index * 0.41) * 0.012));
    const supportTicketsCreated = round(unique * (0.009 + Math.cos(index * 0.17) * 0.0014));
    const modalViews = round(unique * (0.28 + Math.sin(index * 0.26) * 0.02));
    const avgTimeOnPageSeconds = Number(
      (58 + Math.sin(index * 0.29) * 5 + (weekdayFactor < 1 ? -1.8 : 1.4)).toFixed(1),
    );

    return {
      day: isoDayOffset(offset),
      unique_visitors: unique,
      new_visitors: newVisitors,
      recurrent_visitors: recurrentVisitors,
      page_views: pageViews,
      cta_waitlist_clicks: ctaWaitlistClicks,
      waitlist_submits: waitlistSubmits,
      support_tickets_created: supportTicketsCreated,
      avg_time_on_page_seconds: avgTimeOnPageSeconds,
      modal_views: modalViews,
    };
  });
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + Number(row?.[key] || 0), 0);
}

function avg(rows, key) {
  if (!rows.length) return 0;
  return sum(rows, key) / rows.length;
}

export function buildMockPrelaunchMetrics({ days = 7, appChannel = "" } = {}) {
  const normalizedDays = Math.max(1, Math.min(90, Number(days) || 7));
  const channelFactorMap = {
    "": 1,
    prelaunch_web: 1,
    pwa_web: 0.62,
    android: 0.48,
  };
  const channelFactor = channelFactorMap[appChannel] ?? 0.74;
  const timeline = buildTimeline(normalizedDays, channelFactor);

  const totalDailyUnique = sum(timeline, "unique_visitors");
  const totalPageViews = sum(timeline, "page_views");
  const totalCtaClicks = sum(timeline, "cta_waitlist_clicks");
  const totalWaitlistSubmits = sum(timeline, "waitlist_submits");
  const totalTickets = sum(timeline, "support_tickets_created");
  const totalModalViews = sum(timeline, "modal_views");
  const avgDailyUnique = round(avg(timeline, "unique_visitors"));
  const peakDailyUnique = Math.max(...timeline.map((row) => Number(row.unique_visitors || 0)), 0);
  const avgTimeOnPageSeconds = Number(avg(timeline, "avg_time_on_page_seconds").toFixed(1));
  const estimatedUniqueVisitors = round(totalDailyUnique * 0.44);
  const estimatedNewVisitors = round(estimatedUniqueVisitors * 0.61);
  const estimatedRecurrentVisitors = Math.max(0, estimatedUniqueVisitors - estimatedNewVisitors);
  const connectedVisitors = round((timeline.at(-1)?.unique_visitors || avgDailyUnique) * 0.14);
  const feedbackSubmits = round(totalTickets * 1.55);
  const waitlistConversion =
    estimatedUniqueVisitors > 0 ? totalWaitlistSubmits / estimatedUniqueVisitors : 0;

  const modalRows = [
    {
      modal_id: "business_interest",
      views: round(totalModalViews * 0.18),
      unique_viewers: round(avgDailyUnique * 0.54),
      average_daily_unique_viewers: round(avgDailyUnique * 0.09),
      closes: round(totalModalViews * 0.09),
    },
    {
      modal_id: "platform",
      views: round(totalModalViews * 0.12),
      unique_viewers: round(avgDailyUnique * 0.31),
      average_daily_unique_viewers: round(avgDailyUnique * 0.052),
      closes: round(totalModalViews * 0.06),
    },
    {
      modal_id: "team",
      views: round(totalModalViews * 0.1),
      unique_viewers: round(avgDailyUnique * 0.26),
      average_daily_unique_viewers: round(avgDailyUnique * 0.043),
      closes: round(totalModalViews * 0.05),
    },
    {
      modal_id: "invitation",
      views: round(totalModalViews * 0.27),
      unique_viewers: round(avgDailyUnique * 0.66),
      average_daily_unique_viewers: round(avgDailyUnique * 0.11),
      closes: round(totalModalViews * 0.13),
    },
    {
      modal_id: "congrats",
      views: round(totalWaitlistSubmits * 0.95),
      unique_viewers: round(totalWaitlistSubmits * 0.92),
      average_daily_unique_viewers: round(totalWaitlistSubmits / normalizedDays),
      closes: round(totalWaitlistSubmits * 0.64),
    },
  ];

  return {
    metrics: {
      unique_visitors: estimatedUniqueVisitors,
      new_visitors: estimatedNewVisitors,
      recurrent_visitors: estimatedRecurrentVisitors,
      connected_visitors: connectedVisitors,
      connected_window_minutes: 5,
      peak_daily_unique_visitors: peakDailyUnique,
      average_daily_unique_visitors: avgDailyUnique,
      waitlist_submits: totalWaitlistSubmits,
      waitlist_conversion: waitlistConversion,
      support_tickets_created: totalTickets,
      feedback_submits: feedbackSubmits,
      avg_time_on_page_ms: round(avgTimeOnPageSeconds * 1000),
      avg_time_on_page_seconds: avgTimeOnPageSeconds,
    },
    funnel: {
      page_view: totalPageViews,
      cta_waitlist_open: totalCtaClicks,
      waitlist_submit: totalWaitlistSubmits,
      support_ticket_created: totalTickets,
    },
    event_breakdown: {
      page_view: totalPageViews,
      section_view: round(totalPageViews * 2.4),
      cta_waitlist_open: totalCtaClicks,
      waitlist_submit: totalWaitlistSubmits,
      modal_view: totalModalViews,
      link_click: round(totalPageViews * 0.34),
      feedback_open: round(feedbackSubmits * 1.6),
      feedback_submit: feedbackSubmits,
      support_ticket_created: totalTickets,
      cta_business_interest_open: round(totalModalViews * 0.18),
    },
    waitlist_breakdown: {
      by_role: [
        { role_intent: "cliente", count: round(totalWaitlistSubmits * 0.82) },
        { role_intent: "negocio", count: round(totalWaitlistSubmits * 0.18) },
      ],
      by_status: [
        { status: "active", count: round(totalWaitlistSubmits * 0.74) },
        { status: "pending_confirm", count: round(totalWaitlistSubmits * 0.18) },
        { status: "unsubscribed", count: round(totalWaitlistSubmits * 0.05) },
        { status: "blocked", count: round(totalWaitlistSubmits * 0.03) },
      ],
      top_sources: [
        { source: "landing_waitlist", count: round(totalWaitlistSubmits * 0.46) },
        { source: "landing_waitlist_mobile", count: round(totalWaitlistSubmits * 0.32) },
        { source: "landing_business_modal", count: round(totalWaitlistSubmits * 0.09) },
        { source: "landing_business_modal_mobile", count: round(totalWaitlistSubmits * 0.06) },
        { source: "referral_share", count: round(totalWaitlistSubmits * 0.07) },
      ],
    },
    support_breakdown: {
      by_status: [
        { status: "new", count: round(totalTickets * 0.24) },
        { status: "assigned", count: round(totalTickets * 0.16) },
        { status: "in_progress", count: round(totalTickets * 0.18) },
        { status: "waiting_user", count: round(totalTickets * 0.09) },
        { status: "queued", count: round(totalTickets * 0.11) },
        { status: "closed", count: round(totalTickets * 0.19) },
        { status: "cancelled", count: round(totalTickets * 0.03) },
      ],
      by_severity: [
        { severity: "s0", count: round(totalTickets * 0.01) },
        { severity: "s1", count: round(totalTickets * 0.14) },
        { severity: "s2", count: round(totalTickets * 0.53) },
        { severity: "s3", count: round(totalTickets * 0.32) },
      ],
      by_category: [
        { category: "acceso", count: round(totalTickets * 0.19) },
        { category: "verificacion", count: round(totalTickets * 0.14) },
        { category: "qr", count: round(totalTickets * 0.11) },
        { category: "promos", count: round(totalTickets * 0.16) },
        { category: "negocios_sucursales", count: round(totalTickets * 0.09) },
        { category: "pagos_plan", count: round(totalTickets * 0.05) },
        { category: "reporte_abuso", count: round(totalTickets * 0.04) },
        { category: "bug_performance", count: round(totalTickets * 0.1) },
        { category: "sugerencia", count: round(totalTickets * 0.07) },
        { category: "tier_beneficios", count: round(totalTickets * 0.03) },
        { category: "borrar_correo_waitlist", count: round(totalTickets * 0.02) },
      ],
    },
    engagement: {
      sections: [
        { section_id: "hero", count: totalPageViews },
        { section_id: "waitlist_steps", count: round(totalPageViews * 0.81) },
        { section_id: "waitlist_form", count: round(totalPageViews * 0.46) },
        { section_id: "contact_block", count: round(totalPageViews * 0.23) },
        { section_id: "footer", count: round(totalPageViews * 0.31) },
      ],
      modals: modalRows,
      links: [
        {
          link_id: "nav_help",
          label: "Ayuda",
          target_path: "/ayuda/es",
          target_kind: "internal",
          count: round(totalPageViews * 0.084),
        },
        {
          link_id: "hero_how_it_works",
          label: "Como funciona",
          target_path: "#waitlist-steps",
          target_kind: "section",
          count: round(totalPageViews * 0.11),
        },
        {
          link_id: "footer_terms",
          label: "Terminos",
          target_path: "/ayuda/es/articulo/terminos",
          target_kind: "internal",
          count: round(totalPageViews * 0.034),
        },
        {
          link_id: "footer_privacy",
          label: "Privacidad",
          target_path: "/ayuda/es/articulo/privacidad",
          target_kind: "internal",
          count: round(totalPageViews * 0.029),
        },
        {
          link_id: "share_whatsapp",
          label: "whatsapp",
          target_path: "whatsapp://send",
          target_kind: "share",
          count: round(totalWaitlistSubmits * 0.28),
        },
        {
          link_id: "share_instagram",
          label: "instagram",
          target_path: "instagram://app",
          target_kind: "share",
          count: round(totalWaitlistSubmits * 0.16),
        },
      ],
    },
    timeline,
    period_averages: {
      avg_cta_clicks_per_day: Number((totalCtaClicks / normalizedDays).toFixed(1)),
      avg_link_clicks_per_day: Number(((totalPageViews * 0.34) / normalizedDays).toFixed(1)),
      avg_modal_views_per_day: Number((totalModalViews / normalizedDays).toFixed(1)),
      modal_daily_unique_viewers: modalRows.map((row) => ({
        modal_id: row.modal_id,
        views: row.views,
        average_daily_unique_viewers: row.average_daily_unique_viewers,
      })),
    },
    comparisons: {
      connected_vs_peak: {
        current_label: "Conectados",
        current: connectedVisitors,
        reference_label: "Pico diario",
        reference: peakDailyUnique,
      },
      waitlist_vs_visitors: {
        current_label: "Waitlist",
        current: totalWaitlistSubmits,
        reference_label: "Visitantes",
        reference: estimatedUniqueVisitors,
      },
      feedback_vs_support: {
        current_label: "Feedback",
        current: feedbackSubmits,
        reference_label: "Tickets",
        reference: totalTickets,
      },
    },
    top_ip_risk: [
      { ip_risk_id: "rsk_2f91d83a4b7cd1", count: 412 },
      { ip_risk_id: "rsk_7a15cc90d3f2be", count: 355 },
      { ip_risk_id: "rsk_5d00bb72a8c4fa", count: 287 },
      { ip_risk_id: "rsk_e3a17fd24aa0f9", count: 246 },
      { ip_risk_id: "rsk_1b8ca50df77c20", count: 231 },
      { ip_risk_id: "rsk_a4410cd8bc6f10", count: 204 },
    ],
  };
}
