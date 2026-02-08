// src/services/commentService.js
import { supabase } from "../lib/supabaseClient";

export async function addComentario({ promoId, clienteId, estrellas, texto }) {
  try {
    const { data, error } = await supabase
      .from("comentarios")
      .insert({
        id: `COM_${Date.now().toString(36)}`,
        promoId,
        clienteId,
        estrellas,
        texto,
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message ?? String(error) };
  }
}
