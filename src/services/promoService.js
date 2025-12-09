// src/services/promoService.js
import { supabase } from "../lib/supabaseClient";

export async function getActivePromos() {
  try {
    const { data, error } = await supabase
      .from("promos")
      .select(`
        *,
        negocios!inner(nombre, sector, lat, lng, imagen)
      `)
      .eq("estado", "activo")
      .order("fechaCreacion", { ascending: false });

    if (error) throw error;

    const promosFormateadas = data.map((p) => ({
      id: p.id,
      titulo: p.titulo,
      descripcion: p.descripcion,
      inicio: p.inicio,
      fin: p.fin,
      imagen: p.imagen,
      nombreLocal: p.negocios.nombre,
      sector: p.negocios.sector,
      lat: p.negocios.lat,
      lng: p.negocios.lng,
      negocioId: p.negocioId,
    }));

    return { ok: true, data: promosFormateadas };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}

export async function getPromoById(promoId) {
  try {
    const { data, error } = await supabase
      .from("promos")
      .select(
        `
        id,
        titulo,
        descripcion,
        inicio,
        fin,
        imagen,
        estado,
        negocioId,
        negocios (nombre, sector, lat, lng, imagen)
      `
      )
      .eq("id", promoId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return { ok: false, error: "Promo no encontrada" };

    const promo = {
      id: data.id,
      titulo: data.titulo,
      descripcion: data.descripcion,
      inicio: data.inicio,
      fin: data.fin,
      imagen: data.imagen,
      nombreLocal: data.negocios?.nombre,
      sector: data.negocios?.sector,
      lat: data.negocios?.lat,
      lng: data.negocios?.lng,
      negocioId: data.negocioId,
      estado: data.estado,
    };

    return { ok: true, data: promo };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}
