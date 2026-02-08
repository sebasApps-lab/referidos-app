// src/services/qrService.js
import { supabase } from "../lib/supabaseClient";

const normalizeStatus = (row) => {
  const statusFromDb = row?.status_effective || row?.status;
  if (!row?.expires_at) return statusFromDb || "valido";
  const expiresMs = new Date(row.expires_at).getTime();
  const now = Date.now();
  if (statusFromDb === "canjeado") return "canjeado";
  if (expiresMs <= now) return "expirado";
  return statusFromDb || "valido";
};

export async function generatePromoQr(promoId) {
  try {
    const { data, error } = await supabase.rpc("generate_promo_qr", {
      p_promo_id: promoId,
    });
    if (error) throw error;
    return {
      ok: true,
      data: {
        code: data?.code,
        promoId: data?.promo_id,
        negocioId: data?.negocio_id,
        userId: data?.user_id,
        signature: data?.signature,
      },
    };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function generateValidQr(promoId, { force = false } = {}) {
  try {
    const { data, error } = await supabase.rpc("generate_valid_qr", {
      p_promo_id: promoId,
      p_force: force,
    });
    if (error) throw error;

    const normalized = {
      id: data?.id,
      code: data?.code,
      status: normalizeStatus(data),
      createdAt: data?.created_at,
      expiresAt: data?.expires_at,
      redeemedAt: data?.redeemed_at,
      promoId: data?.promo_id,
      negocioId: data?.negocio_id,
      clienteId: data?.cliente_id,
    };
    return { ok: true, data: normalized };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function getActiveValidQr(promoId) {
  try {
    const { data, error } = await supabase.rpc("get_active_valid_qr", {
      p_promo_id: promoId,
    });
    if (error) throw error;
    if (!data) return { ok: true, data: null };

    return {
      ok: true,
      data: {
        id: data.id,
        code: data.code,
        status: normalizeStatus(data),
        createdAt: data.created_at,
        expiresAt: data.expires_at,
        redeemedAt: data.redeemed_at,
        promoId: data.promo_id,
        negocioId: data.negocio_id,
        clienteId: data.cliente_id,
      },
    };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function getQrHistory(limit = 50) {
  try {
    const { data, error } = await supabase.rpc("get_qr_history", {
      p_limit: limit,
    });
    if (error) throw error;

    const formatted = (data || []).map((item) => ({
      id: item.id,
      code: item.code,
      status: normalizeStatus(item),
      statusRaw: item.status,
      createdAt: item.created_at,
      expiresAt: item.expires_at,
      redeemedAt: item.redeemed_at,
      promoId: item.promo_id,
      promo: {
        id: item.promo_id,
        titulo: item.promo_titulo,
        descripcion: item.promo_descripcion,
        imagen: item.promo_imagen,
        nombreLocal: item.negocio_nombre,
        sector: item.negocio_sector,
      },
    }));

    return { ok: true, data: formatted };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function redeemValidQr(code) {
  try {
    const { data, error } = await supabase.rpc("redeem_valid_qr", {
      p_code: code,
    });
    if (error) throw error;
    if (!data) throw new Error("No se encontró información del QR");

    return {
      ok: true,
      data: {
        id: data.id,
        code: data.code,
        status: data.status,
        expiresAt: data.expires_at,
        redeemedAt: data.redeemed_at,
        clienteId: data.cliente_id,
        promoId: data.promo_id,
        negocioId: data.negocio_id,
        promoTitulo: data.promo_titulo,
        negocioNombre: data.negocio_nombre,
        clienteNombre: data.cliente_nombre,
      },
    };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}
