import { supabase } from '../lib/supabaseClient';
import { shortId } from './utils/idGen';

/**
* Auth helpers (basic)
* * findUserByEmail
* * createUser
* * loginLocal
*/

export async function findUserByEmail(email) {
  const { data, error } = await supabase.from('usuarios').select('*').eq('email', email).limit(1);
  if (error) return { ok: false, error };
  return { ok: true, data: data?.[0] || null };
}

export async function createUser(payload) {
  const user = { ...payload, id: payload.id || `USR_${shortId('')}`, fechaCreacion: new Date().toISOString() };
  const { data, error } = await supabase.from('usuarios').insert(user).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function loginLocal(email, password) {
  const r = await findUserByEmail(email);
  if (!r.ok) return r;
  const user = r.data;
  if (!user) return { ok: false, error: 'Usuario no encontrado' };
  if (user.password !== password) return { ok: false, error: 'Contraseña incorrecta' };
  return { ok: true, user };
}
