import { supabase } from "@shared/services/mobileApi";

function getErrorMessage(error: any) {
  return String(error?.message || error || "unknown_error");
}

function isMissingColumnError(error: any) {
  const text = getErrorMessage(error).toLowerCase();
  return (
    text.includes("column") &&
    (text.includes("does not exist") ||
      text.includes("schema cache") ||
      text.includes("could not find"))
  );
}

function normalizeDays(value: any) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 7;
  return Math.max(1, Math.min(90, Math.round(parsed)));
}

async function getSessionAccessToken() {
  const {
    data: { session } = {},
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token || "";
  if (!accessToken) {
    throw new Error("no_session");
  }
  return accessToken;
}

async function invokeAuthedFunction(name: string, body: Record<string, any> = {}) {
  const accessToken = await getSessionAccessToken();
  const { data, error } = await supabase.functions.invoke(name, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  });

  if (error) {
    throw new Error(error.message || "function_invoke_failed");
  }
  if (data?.ok === false) {
    throw new Error(data.error || data.message || "function_invoke_failed");
  }
  return data;
}

async function selectTableRows(
  table: string,
  options: {
    limit?: number;
    orderCandidates?: string[];
    ascending?: boolean;
  } = {},
) {
  const limit = Math.max(10, Math.min(Number(options.limit || 80), 250));
  const orderCandidates = Array.isArray(options.orderCandidates) && options.orderCandidates.length
    ? options.orderCandidates
    : ["created_at"];

  let lastError = "";
  for (const orderColumn of orderCandidates) {
    const result = await supabase
      .from(table)
      .select("*")
      .order(orderColumn, { ascending: Boolean(options.ascending) })
      .limit(limit);

    if (!result.error) {
      return {
        ok: true,
        data: result.data || [],
        orderColumn,
      };
    }

    if (isMissingColumnError(result.error)) continue;
    lastError = getErrorMessage(result.error);
    break;
  }

  if (lastError) {
    return { ok: false, data: [], error: lastError };
  }

  const fallback = await supabase.from(table).select("*").limit(limit);
  if (fallback.error) {
    return { ok: false, data: [], error: getErrorMessage(fallback.error) };
  }
  return {
    ok: true,
    data: fallback.data || [],
    orderColumn: null,
  };
}

export async function countAdminRows(table: string) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) {
    return { ok: false, count: 0, error: getErrorMessage(error) };
  }
  return {
    ok: true,
    count: Number(count || 0),
  };
}

export async function fetchAdminNegocios(limit = 80) {
  return selectTableRows("negocios", {
    limit,
    orderCandidates: ["created_at", "updated_at", "id"],
  });
}

export async function fetchAdminPromos(limit = 80) {
  return selectTableRows("promos", {
    limit,
    orderCandidates: ["created_at", "updated_at", "id"],
  });
}

export async function fetchAdminQrs(limit = 100) {
  return selectTableRows("qr_validos", {
    limit,
    orderCandidates: ["created_at", "fecha", "updated_at", "id"],
  });
}

export async function fetchAdminReportes(limit = 80) {
  return selectTableRows("reportes", {
    limit,
    orderCandidates: ["created_at", "fecha", "updated_at", "id"],
  });
}

export async function updateAdminReporteStatus(reporteId: string, estado: string) {
  const safeReporteId = String(reporteId || "").trim();
  const safeEstado = String(estado || "").trim();
  if (!safeReporteId) {
    throw new Error("missing_reporte_id");
  }
  if (!safeEstado) {
    throw new Error("missing_estado");
  }
  return invokeAuthedFunction("admin-update-reporte", {
    reporte_id: safeReporteId,
    estado: safeEstado,
  });
}

export async function fetchAdminPrelaunchMetrics({
  days = 7,
  appChannel = "",
} = {}) {
  return invokeAuthedFunction("admin-prelaunch-metrics", {
    days: normalizeDays(days),
    app_channel: String(appChannel || "").trim() || null,
  });
}

export async function fetchAdminIssueEventDetail(eventId: string) {
  const safeEventId = String(eventId || "").trim();
  if (!safeEventId) {
    return { ok: false, data: null, error: "missing_event_id" };
  }

  const { data, error } = await supabase
    .from("obs_events")
    .select("*")
    .eq("id", safeEventId)
    .maybeSingle();

  if (error) {
    return { ok: false, data: null, error: getErrorMessage(error) };
  }
  return { ok: true, data: data || null };
}

export async function cacheAdminIssue(issueId: string) {
  const safeIssueId = String(issueId || "").trim();
  if (!safeIssueId) {
    throw new Error("missing_issue_id");
  }
  return invokeAuthedFunction("obs-symbolicate", {
    action: "issue",
    issue_id: safeIssueId,
    cache_type: "long",
    force: true,
  });
}
