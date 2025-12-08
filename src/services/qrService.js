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

export async function getUserQrHistory(clienteId) {
  try {
    const { data, error } = await supabase
      .from("qr_validos")
      .select(`
        id,
        promoid,
        clienteid,
        fechaexpira,
        canjeado,
        fechacanje,
        fechacreacion,
        promos (
          id,
          titulo,
          descripcion,
          imagen,
          negocios (
            nombre,
            sector
          )
        )
      `)
      .eq("clienteid", clienteId)
      .order("fechacreacion", { ascending: false });

    if (error) throw error;

    const formatted = (data || []).map((item) => ({
      id: item.id,
      promoId: item.promoid,
      clienteId: item.clienteid,
      fechaExpira: item.fechaexpira,
      canjeado: item.canjeado,
      fechaCanje: item.fechacanje,
      fechaCreacion: item.fechacreacion,
      promo: {
        id: item.promos?.id,
        titulo: item.promos?.titulo,
        descripcion: item.promos?.descripcion,
        imagen: item.promos?.imagen,
        sector: item.promos?.negocios?.sector,
        nombreLocal: item.promos?.negocios?.nombre,
      },
    }));

    return { ok: true, data: formatted };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}
