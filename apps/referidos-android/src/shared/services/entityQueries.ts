type Result<T> = {
  ok: boolean;
  data: T;
  error?: string;
  column?: string | null;
};

const USER_ID_COLUMNS = ["usuarioid", "usuario_id"] as const;
const BUSINESS_ID_COLUMNS = ["negocioid", "negocio_id"] as const;
const CLIENT_ID_COLUMNS = ["cliente_id", "clienteId", "clienteid"] as const;
const SUPPORT_USER_PUBLIC_ID_COLUMNS = ["user_public_id", "userPublicId"] as const;
const PROMO_STATUS_COLUMNS = ["estado", "status"] as const;
const PROMO_TITLE_COLUMNS = ["titulo", "nombre", "title"] as const;
const PROMO_DESC_COLUMNS = ["descripcion", "description"] as const;
const BRANCH_STATUS_COLUMNS = ["status", "estado"] as const;
const BRANCH_TYPE_COLUMNS = ["tipo", "type"] as const;
const PROMO_BRANCH_PROMO_COLUMNS = ["promoid", "promo_id", "promoId"] as const;
const PROMO_BRANCH_BRANCH_COLUMNS = ["sucursalid", "sucursal_id", "sucursalId"] as const;

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

function isNoRowsDeletedError(error: any) {
  const text = getErrorMessage(error).toLowerCase();
  return text.includes("results contain 0 rows");
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

export async function fetchSupportTicketsByUserPublicId(
  supabase: any,
  userPublicId: string,
  limit = 20,
): Promise<Result<any[]>> {
  const safeUserPublicId = String(userPublicId || "").trim();
  if (!safeUserPublicId) {
    return { ok: false, data: [], error: "missing_user_public_id" };
  }

  let lastError = "";
  for (const column of SUPPORT_USER_PUBLIC_ID_COLUMNS) {
    const { data, error } = await supabase
      .from("support_threads_public")
      .select("*")
      .eq(column, safeUserPublicId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (!error) return { ok: true, data: data || [], column };
    if (isMissingColumnError(error)) continue;
    lastError = getErrorMessage(error);
  }

  if (lastError) return { ok: false, data: [], error: lastError, column: null };
  return { ok: false, data: [], error: "support_owner_column_missing", column: null };
}

export async function redeemValidQrCode(
  supabase: any,
  code: string,
): Promise<Result<any | null>> {
  const safeCode = String(code || "").trim();
  if (!safeCode) return { ok: false, data: null, error: "missing_code" };

  const { data, error } = await supabase.rpc("redeem_valid_qr", {
    p_code: safeCode,
  });
  if (error) return { ok: false, data: null, error: getErrorMessage(error) };
  if (!data) return { ok: false, data: null, error: "qr_not_found" };
  return { ok: true, data };
}

export async function createPromoForBusiness(
  supabase: any,
  input: {
    businessId: string;
    title: string;
    description?: string;
    status?: string;
  },
): Promise<Result<any | null>> {
  const businessId = String(input.businessId || "").trim();
  const title = String(input.title || "").trim();
  const description = String(input.description || "").trim();
  const status = String(input.status || "pendiente").trim();

  if (!businessId) return { ok: false, data: null, error: "missing_business_id" };
  if (!title) return { ok: false, data: null, error: "missing_title" };

  let lastError = "";
  for (const businessColumn of BUSINESS_ID_COLUMNS) {
    for (const titleColumn of PROMO_TITLE_COLUMNS) {
      for (const statusColumn of PROMO_STATUS_COLUMNS) {
        for (const descriptionColumn of PROMO_DESC_COLUMNS) {
          const payload: any = {
            [businessColumn]: businessId,
            [titleColumn]: title,
            [statusColumn]: status,
          };
          if (description) payload[descriptionColumn] = description;

          const { data, error } = await supabase
            .from("promos")
            .insert(payload)
            .select("*")
            .maybeSingle();

          if (!error) {
            return {
              ok: true,
              data: data || null,
              column: `${businessColumn}/${titleColumn}/${statusColumn}/${descriptionColumn}`,
            };
          }
          if (isMissingColumnError(error)) continue;
          lastError = getErrorMessage(error);
        }
      }
    }
  }

  return { ok: false, data: null, error: lastError || "promo_create_failed", column: null };
}

export async function updatePromoStatusById(
  supabase: any,
  promoId: string,
  nextStatus: string,
): Promise<Result<any | null>> {
  const safePromoId = String(promoId || "").trim();
  const safeStatus = String(nextStatus || "").trim();
  if (!safePromoId) return { ok: false, data: null, error: "missing_promo_id" };
  if (!safeStatus) return { ok: false, data: null, error: "missing_status" };

  let lastError = "";
  for (const statusColumn of PROMO_STATUS_COLUMNS) {
    const { data, error } = await supabase
      .from("promos")
      .update({ [statusColumn]: safeStatus })
      .eq("id", safePromoId)
      .select("*")
      .maybeSingle();

    if (!error || isNoRowsDeletedError(error)) {
      return { ok: true, data: data || null, column: statusColumn };
    }
    if (isMissingColumnError(error)) continue;
    lastError = getErrorMessage(error);
  }

  return { ok: false, data: null, error: lastError || "promo_update_failed", column: null };
}

export async function deletePromoById(
  supabase: any,
  promoId: string,
): Promise<Result<any | null>> {
  const safePromoId = String(promoId || "").trim();
  if (!safePromoId) return { ok: false, data: null, error: "missing_promo_id" };

  const { data, error } = await supabase
    .from("promos")
    .delete()
    .eq("id", safePromoId)
    .select("*")
    .maybeSingle();

  if (!error || isNoRowsDeletedError(error)) {
    return { ok: true, data: data || null };
  }
  return { ok: false, data: null, error: getErrorMessage(error) };
}

export async function updateBranchStateById(
  supabase: any,
  branchId: string,
  nextState: string,
): Promise<Result<any | null>> {
  const safeBranchId = String(branchId || "").trim();
  const safeState = String(nextState || "").trim();
  if (!safeBranchId) return { ok: false, data: null, error: "missing_branch_id" };
  if (!safeState) return { ok: false, data: null, error: "missing_state" };

  let lastError = "";
  for (const statusColumn of BRANCH_STATUS_COLUMNS) {
    const { data, error } = await supabase
      .from("sucursales")
      .update({ [statusColumn]: safeState })
      .eq("id", safeBranchId)
      .select("*")
      .maybeSingle();

    if (!error || isNoRowsDeletedError(error)) {
      return { ok: true, data: data || null, column: statusColumn };
    }
    if (isMissingColumnError(error)) continue;
    lastError = getErrorMessage(error);
  }

  for (const typeColumn of BRANCH_TYPE_COLUMNS) {
    const { data, error } = await supabase
      .from("sucursales")
      .update({ [typeColumn]: safeState })
      .eq("id", safeBranchId)
      .select("*")
      .maybeSingle();

    if (!error || isNoRowsDeletedError(error)) {
      return { ok: true, data: data || null, column: typeColumn };
    }
    if (isMissingColumnError(error)) continue;
    lastError = getErrorMessage(error);
  }

  return { ok: false, data: null, error: lastError || "branch_update_failed", column: null };
}

export async function linkPromoToBranch(
  supabase: any,
  promoId: string,
  branchId: string,
): Promise<Result<any | null>> {
  const safePromoId = String(promoId || "").trim();
  const safeBranchId = String(branchId || "").trim();
  if (!safePromoId) return { ok: false, data: null, error: "missing_promo_id" };
  if (!safeBranchId) return { ok: false, data: null, error: "missing_branch_id" };

  let lastError = "";
  for (const promoColumn of PROMO_BRANCH_PROMO_COLUMNS) {
    for (const branchColumn of PROMO_BRANCH_BRANCH_COLUMNS) {
      const payload: any = {
        [promoColumn]: safePromoId,
        [branchColumn]: safeBranchId,
      };
      const { data, error } = await supabase
        .from("promos_sucursales")
        .insert(payload)
        .select("*")
        .maybeSingle();

      if (!error || isNoRowsDeletedError(error)) {
        return { ok: true, data: data || null, column: `${promoColumn}/${branchColumn}` };
      }
      if (isMissingColumnError(error)) continue;

      const text = getErrorMessage(error).toLowerCase();
      if (text.includes("duplicate") || text.includes("already exists")) {
        return { ok: true, data: null, column: `${promoColumn}/${branchColumn}` };
      }
      lastError = getErrorMessage(error);
    }
  }

  return { ok: false, data: null, error: lastError || "promo_branch_link_failed", column: null };
}

export async function unlinkPromoFromBranch(
  supabase: any,
  promoId: string,
  branchId: string,
): Promise<Result<any | null>> {
  const safePromoId = String(promoId || "").trim();
  const safeBranchId = String(branchId || "").trim();
  if (!safePromoId) return { ok: false, data: null, error: "missing_promo_id" };
  if (!safeBranchId) return { ok: false, data: null, error: "missing_branch_id" };

  let lastError = "";
  for (const promoColumn of PROMO_BRANCH_PROMO_COLUMNS) {
    for (const branchColumn of PROMO_BRANCH_BRANCH_COLUMNS) {
      const { data, error } = await supabase
        .from("promos_sucursales")
        .delete()
        .eq(promoColumn, safePromoId)
        .eq(branchColumn, safeBranchId)
        .select("*")
        .maybeSingle();

      if (!error || isNoRowsDeletedError(error)) {
        return { ok: true, data: data || null, column: `${promoColumn}/${branchColumn}` };
      }
      if (isMissingColumnError(error)) continue;
      lastError = getErrorMessage(error);
    }
  }

  return { ok: false, data: null, error: lastError || "promo_branch_unlink_failed", column: null };
}

export async function fetchPromoBranchLinksByPromoId(
  supabase: any,
  promoId: string,
): Promise<Result<any[]>> {
  const safePromoId = String(promoId || "").trim();
  if (!safePromoId) return { ok: false, data: [], error: "missing_promo_id" };

  let lastError = "";
  for (const promoColumn of PROMO_BRANCH_PROMO_COLUMNS) {
    const { data, error } = await supabase
      .from("promos_sucursales")
      .select("*")
      .eq(promoColumn, safePromoId);

    if (!error) return { ok: true, data: data || [], column: promoColumn };
    if (isMissingColumnError(error)) continue;
    lastError = getErrorMessage(error);
  }

  return { ok: false, data: [], error: lastError || "promo_branch_list_failed", column: null };
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
