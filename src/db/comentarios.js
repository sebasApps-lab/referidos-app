import { supabase } from '../lib/supabaseClient';
import { shortId } from './utils/idGen';

export async function addComentario({ promoId, clienteId, estrellas, texto }) {
  const id = `COM_${shortId('')}`;
  const payload = { id, promoId, clienteId, estrellas, texto, fechaCreacion: new Date().toISOString() };
  const { data, error } = await supabase.from('comentarios').insert(payload).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function getComentariosByPromo(promoId) {
  const { data, error } = await supabase.from('comentarios').select('*').eq('promoId', promoId);
  if (error) return { ok: false, error };
  return { ok: true, data };
}
