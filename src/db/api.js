// src/db/api.js
import { supabase } from '../lib/supabaseClient';
import { shortId } from './utils/idGen';

/**
 * API layer: funciones que la app llama para leer/escribir en Supabase.
 * Todas devuelven { ok: boolean, data?, error? }
 */

// ----------------- Auth / Usuarios -----------------
export async function findUserByEmail(email) {
  const { data, error } = await supabase.from('usuarios').select('*').eq('email', email).limit(1);
  if (error) return { ok: false, error };
  return { ok: true, data: data[0] || null };
}

export async function createUser(user) {
  const { password: _password, ...rest } = user;
  const payload = { ...rest, id: rest.id || shortId('U') };
  const { data, error } = await supabase.from('usuarios').upsert(payload).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function loginLocal() {
  return { ok: false, error: "loginLocal deshabilitado: usa Supabase Auth" };
}

// ----------------- Promos / Negocios -----------------
export async function getPromosPublic(limit = 50) {
  const { data, error } = await supabase
    .from('promos')
    .select('*')
    .limit(limit);
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function getPromosByNegocio(negocioId) {
  const { data, error } = await supabase.from('promos').select('*').eq('negocioId', negocioId);
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function getPromoById(promoId) {
  const { data, error } = await supabase.from('promos').select('*').eq('id', promoId).single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

// ----------------- QR validos -----------------
export async function createQrValido({ promoId, clienteId, negocioId, sucursalId = null, fechaExpira }) {
  const id = 'Q-' + shortId();
  const payload = {
    id,
    promoId,
    clienteId,
    negocioId,
    sucursalId,
    fechaExpira,
    fechaCreacion: new Date().toISOString(),
    canjeado: false
  };
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

  const incPromo = await supabase.rpc('increment_promo_canjeados', { promo_id_in: qr.promoId });
  if (incPromo.error) {
    const p = await supabase.from('promos').select('canjeadosCount').eq('id', qr.promoId).single();
    if (p.error) return { ok: false, error: p.error };
    const newCount = (p.data.canjeadosCount || 0) + 1;
    await supabase.from('promos').update({ canjeadosCount: newCount }).eq('id', qr.promoId);
  }

  const esc = await supabase.from('escaneos').insert({ id: 'E-' + shortId(), qrValidoId: qrId, clienteId: byUserId, fechaCreacion: new Date().toISOString() });
  if (esc.error) {
    // no bloquear la operación principal
  }

  return { ok: true, data: upd.data };
}

// ----------------- Comentarios -----------------
export async function addComentario({ promoId, clienteId, estrellas, texto }) {
  const id = 'C-' + shortId();
  const payload = { id, promoId, clienteId, estrellas, texto, fechaCreacion: new Date().toISOString() };
  const { data, error } = await supabase.from('comentarios').insert(payload).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

// ----------------- Reportes -----------------
export async function createReport({ reporterId, reporterRole, targetId, targetType, texto }) {
  const id = 'R-' + shortId();
  const payload = { id, reporterId, reporterRole, targetId, targetType, texto, fechaCreacion: new Date().toISOString() };
  const { data, error } = await supabase.from('reportes').insert(payload).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

// ----------------- Utilities -----------------
export async function seedFromSimulated(simulated) {
  try {
    if (simulated.usuarios && simulated.usuarios.length) {
      for (const u of simulated.usuarios) {
        await supabase.from('usuarios').upsert(u);
      }
    }
    if (simulated.negocios && simulated.negocios.length) {
      for (const n of simulated.negocios) {
        await supabase.from('negocios').upsert(n);
      }
    }
    if (simulated.sucursales && simulated.sucursales.length) {
      for (const s of simulated.sucursales) {
        await supabase.from('sucursales').upsert(s);
      }
    }
    if (simulated.promos && simulated.promos.length) {
      for (const p of simulated.promos) {
        await supabase.from('promos').upsert(p);
      }
    }
    if (simulated.comentarios && simulated.comentarios.length) {
      for (const c of simulated.comentarios) {
        await supabase.from('comentarios').upsert(c);
      }
    }
    if (simulated.qrValidos && simulated.qrValidos.length) {
      for (const q of simulated.qrValidos) {
        await supabase.from('qr_validos').upsert(q);
      }
    }
    if (simulated.reportes && simulated.reportes.length) {
      for (const r of simulated.reportes) {
        await supabase.from('reportes').upsert(r);
      }
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err };
  }
}
