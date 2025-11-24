import { supabase } from '../lib/supabaseClient';
import { shortId } from './utils/idGen';
import * as promosApi from './promos';

export async function createQrValido({ promoId, clienteId, negocioId, sucursalId = null, fechaExpira }) {
  const id = `QRV_${shortId('')}`;
  const payload = { id, promoId, clienteId, negocioId, sucursalId, fechaExpira, fechaCreacion: new Date().toISOString(), canjeado: false };
  const { data, error } = await supabase.from('qr_validos').insert(payload).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function markQrAsCanjeado(qrId, byUserId) {

  const { data: qr, error: qrErr } = await supabase.from('qr_validos').select('*').eq('id', qrId).single();
  if (qrErr || !qr) return { ok: false, error: qrErr || 'QR no encontrado' };
  if (qr.canjeado) return { ok: false, error: 'QR ya canjeado' };

  const upd = await supabase.from('qr_validos').update({ canjeado: true, fechaCanje: new Date().toISOString() }).eq('id', qrId).select().single();
  if (upd.error) return { ok: false, error: upd.error };

  const p = await supabase.from('promos').select('canjeadosCount').eq('id', qr.promoId).single();
  if (p.error) return { ok: false, error: p.error };
  const newCount = (p.data.canjeadosCount || 0) + 1;
  await supabase.from('promos').update({ canjeadosCount: newCount }).eq('id', qr.promoId);

  const escId = `ESC_${shortId('')}`;
  await supabase.from('escaneos').insert({ id: escId, qrValidoId: qrId, clienteId: byUserId, fechaCreacion: new Date().toISOString() });

  return { ok: true, data: upd.data };
}
