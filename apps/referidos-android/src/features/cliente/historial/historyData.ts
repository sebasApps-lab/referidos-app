import { fetchCurrentUserRow, fetchQrHistoryByClientId, readFirst } from "@shared/services/entityQueries";
import { supabase } from "@shared/services/mobileApi";

export const HISTORY_TABS = [
  { key: "activos", label: "ACTIVOS" },
  { key: "canjeados", label: "CANJEADOS" },
  { key: "expirados", label: "EXPIRADOS" },
] as const;

export type HistoryTab = typeof HISTORY_TABS[number]["key"];
type Source = Record<string, unknown>;

export type HistoryRecord = {
  id: string;
  code: string;
  promoId: string;
  status: string;
  title: string;
  description: string;
  image: string;
  business: string;
  location: string;
  points: number | null;
  createdAt: number | null;
  expiresAt: number | null;
  redeemedAt: number | null;
};

function text(row: Source, keys: string[]) {
  return String(readFirst(row, keys, "") ?? "").trim();
}

function timestamp(row: Source, keys: string[]) {
  const value = text(row, keys);
  if (!value) return null;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) ? milliseconds : null;
}

function record(row: Source, index: number): HistoryRecord {
  const pointsText = text(row, ["points_earned", "puntos_ganados", "puntos", "points"]);
  const points = pointsText ? Number(pointsText) : NaN;
  const sector = text(row, ["negocio_sector", "sector"]);
  const address = text(row, ["negocio_ubicacion", "ubicacion"]);
  const image = text(row, ["promo_imagen", "imagen"]);
  const code = text(row, ["code", "codigo"]);

  return {
    id: text(row, ["id", "public_id"]) || code || `movimiento-${index}`,
    code,
    promoId: text(row, ["promo_id", "promoid"]),
    status: text(row, ["status_effective", "status", "estado"]).toLowerCase(),
    title: text(row, ["promo_titulo", "titulo"]) || "Promoción",
    description: text(row, ["promo_descripcion", "descripcion"]),
    image: /^https?:\/\//i.test(image) ? image : "",
    business: text(row, ["negocio_nombre", "nombre_local"]),
    location: [sector, address && address !== sector ? address : ""].filter(Boolean).join(", "),
    points: Number.isFinite(points) && points >= 0 ? points : null,
    createdAt: timestamp(row, ["created_at", "updated_at"]),
    expiresAt: timestamp(row, ["expires_at", "expira_at", "fecha_expiracion"]),
    redeemedAt: timestamp(row, ["redeemed_at", "used_at"]),
  };
}

export async function loadClienteHistory(userId?: string | null): Promise<HistoryRecord[]> {
  let currentId = userId;
  if (!currentId) {
    const current = await fetchCurrentUserRow(supabase);
    if (!current.ok || !current.data?.id) throw new Error("No se pudo identificar tu cuenta.");
    currentId = String(current.data.id);
  }

  const limit = 40;
  const history = await fetchQrHistoryByClientId(supabase, currentId, limit);
  if (!history.ok) throw new Error("No se pudo cargar el historial.");

  const metadata = new Map<string, Source>();
  if (history.data.length) {
    try {
      const { data, error } = await supabase.rpc("get_qr_history", { p_limit: limit });
      if (!error && Array.isArray(data)) {
        for (const row of data) {
          const id = text(row, ["id"]);
          if (id) metadata.set(id, row);
        }
      }
    } catch {
      // The native history can still render when promo metadata is unavailable.
    }
  }

  return history.data.map((row, index) => {
    const details = metadata.get(text(row, ["id"]));
    return record({ ...row, ...details }, index);
  }).sort((first, second) => (second.createdAt ?? 0) - (first.createdAt ?? 0));
}

export function getHistoryTab(item: HistoryRecord, now: number): HistoryTab {
  if (item.redeemedAt !== null || /^(canje|redeem|used$)/.test(item.status)) return "canjeados";
  if ((item.expiresAt !== null && item.expiresAt <= now) || /^(expir|venc|cancel|inval|anul|revoc)/.test(item.status)) {
    return "expirados";
  }
  return "activos";
}

export function getPastStatusLabel(item: HistoryRecord, redeemed: boolean) {
  if (redeemed) return "CANJEADO";
  if (/^(cancel|anul)/.test(item.status)) return "ANULADO";
  if (/^revoc/.test(item.status)) return "REVOCADO";
  if (/^inval/.test(item.status)) return "INVÁLIDO";
  return "EXPIRADO";
}

export function getCountdown(item: HistoryRecord, now: number) {
  if (item.expiresAt === null) return null;
  const ms = Math.max(0, item.expiresAt - now);
  const duration = item.createdAt !== null && item.createdAt < item.expiresAt
    ? item.expiresAt - item.createdAt : 5 * 60 * 1000;
  const progress = Math.min(1, ms / duration);
  const seconds = Math.ceil(ms / 1000);
  const label = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return { label, progress };
}

export function getActiveQr(item: HistoryRecord, now: number) {
  const timer = getCountdown(item, now);
  if (!timer || timer.progress === 0 || getHistoryTab(item, now) !== "activos") return "";
  return item.code.startsWith("qrv-") && item.code.length <= 512 ? item.code : "";
}
