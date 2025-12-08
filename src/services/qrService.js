// src/services/qrService.js
import { supabase } from "../lib/supabaseClient";

export async function createQR({ promoId, clienteId, negocioId, sucursalId }) {
  try {
    const fechaExpira = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hora
    const { data, error } = await supabase
      .from("qr_validos")
      .insert({
        id: `QRV_${Date.now().toString(36)}`,
        promoId,
        clienteId,
        negocioId,
        sucursalId,
        fechaExpira,
        canjeado: false,
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function markQRAsUsed(qrId) {
  try {
    const { data, error } = await supabase
      .from("qr_validos")
      .update({ canjeado: true, fechaCanje: new Date().toISOString() })
      .eq("id", qrId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}
