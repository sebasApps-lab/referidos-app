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
