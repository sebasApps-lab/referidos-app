import { supabase } from '../lib/supabaseClient';
import { shortId } from './utils/idGen';

export async function createPromo(payload) {
  const id = payload.id || `PRO_${shortId('')}`;
  const body = { ...payload, id, fechaCreacion: new Date().toISOString(), canjeadosCount: payload.canjeadosCount || 0 };
  const { data, error } = await supabase.from('promos').insert(body).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function getPromoById(promoId) {
  const { data, error } = await supabase.from('promos').select('*').eq('id', promoId).single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function getPromosByNegocio(negocioId) {
  const { data, error } = await supabase.from('promos').select('*').eq('negocioId', negocioId);
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function updatePromo(promoId, patch) {
  const { data, error } = await supabase.from('promos').update(patch).eq('id', promoId).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}
