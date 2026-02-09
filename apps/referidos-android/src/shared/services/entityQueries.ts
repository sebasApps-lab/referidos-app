type Result<T> = {
  ok: boolean;
  data: T;
  error?: string;
  column?: string | null;
};

const USER_ID_COLUMNS = ["usuarioid", "usuario_id"] as const;
const BUSINESS_ID_COLUMNS = ["negocioid", "negocio_id"] as const;
const CLIENT_ID_COLUMNS = ["cliente_id", "clienteId", "clienteid"] as const;

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

async function maybeSingleByAnyColumn(
  supabase: any,
  table: string,
  columns: readonly string[],
  value: string,
) {
  let lastError = "";
  for (const column of columns) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, value)
      .maybeSingle();

    if (!error) {
      if (data) return { ok: true, data, column };
      continue;
    }
    if (isMissingColumnError(error)) continue;
    lastError = getErrorMessage(error);
  }
  if (lastError) return { ok: false, data: null, error: lastError, column: null };
  return { ok: true, data: null, column: null };
}

async function listByAnyColumn(
  supabase: any,
  table: string,
  columns: readonly string[],
  value: string,
  limit = 20,
) {
  let lastError = "";
  for (const column of columns) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, value)
      .limit(limit);

    if (!error) return { ok: true, data: data || [], column };
    if (isMissingColumnError(error)) continue;
    lastError = getErrorMessage(error);
  }
  if (lastError) return { ok: false, data: [], error: lastError, column: null };
  return { ok: true, data: [], column: null };
}

export async function fetchCurrentUserRow(supabase: any): Promise<Result<any | null>> {
  const {
    data: { session } = {},
  } = await supabase.auth.getSession();
  const authId = session?.user?.id;
  if (!authId) return { ok: false, data: null, error: "no_session" };

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id_auth", authId)
    .maybeSingle();
  if (error) return { ok: false, data: null, error: getErrorMessage(error) };
  return { ok: true, data: data || null };
}

export async function fetchBusinessByUserId(
  supabase: any,
  userId: string,
): Promise<Result<any | null>> {
  return maybeSingleByAnyColumn(supabase, "negocios", USER_ID_COLUMNS, userId);
}

export async function fetchBranchesByBusinessId(
  supabase: any,
  businessId: string,
  limit = 20,
): Promise<Result<any[]>> {
  return listByAnyColumn(supabase, "sucursales", BUSINESS_ID_COLUMNS, businessId, limit);
}

export async function fetchPromosByBusinessId(
  supabase: any,
  businessId: string,
  limit = 20,
): Promise<Result<any[]>> {
  return listByAnyColumn(supabase, "promos", BUSINESS_ID_COLUMNS, businessId, limit);
}

export async function fetchPromoFeed(
  supabase: any,
  limit = 10,
): Promise<Result<any[]>> {
  const { data, error } = await supabase.from("promos").select("*").limit(limit);
  if (error) return { ok: false, data: [], error: getErrorMessage(error) };
  return { ok: true, data: data || [] };
}

export async function fetchQrHistoryByClientId(
  supabase: any,
  clientId: string,
  limit = 30,
): Promise<Result<any[]>> {
  return listByAnyColumn(supabase, "qr_validos", CLIENT_ID_COLUMNS, clientId, limit);
}

export async function fetchQrHistoryByBusinessId(
  supabase: any,
  businessId: string,
  limit = 30,
): Promise<Result<any[]>> {
  return listByAnyColumn(supabase, "qr_validos", BUSINESS_ID_COLUMNS, businessId, limit);
}

export async function fetchSupportTicketsPublic(
  supabase: any,
  limit = 20,
): Promise<Result<any[]>> {
  const { data, error } = await supabase
    .from("support_threads_public")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return { ok: false, data: [], error: getErrorMessage(error) };
  return { ok: true, data: data || [] };
}

export function readFirst(row: any, keys: string[], fallback: any = "") {
  for (const key of keys) {
    const value = row?.[key];
    if (value === null || value === undefined) continue;
    const text = String(value).trim();
    if (!text) continue;
    return value;
  }
  return fallback;
}

export function formatDateTime(value: any) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toDisplayStatus(value: any) {
  const text = String(value || "").trim();
  if (!text) return "sin_estado";
  return text;
}
