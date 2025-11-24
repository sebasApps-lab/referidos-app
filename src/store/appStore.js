// Zustand + Supabase bridge (minimal)
import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import * as auth from '../db/auth';
import * as dbQr from '../db/qr';
import * as dbPromos from '../db/promos';

export const useAppStore = create((set, get) => ({

  usuario: null,
  ratings: {},

  setUser: (user) => set({ usuario: user }),

  loginLocal: async (email, password) => {
    const r = await auth.loginLocal(email, password);
    if (!r.ok) return r;
    set({ usuario: r.user });
    return { ok: true, user: r.user };
  },

  logout: () => set({ usuario: null }),

  initRatings: async (promos) => {
    const current = get().ratings;
    if (Object.keys(current).length > 0) return;
    const map = {};
    promos.forEach((p) => { map[p.id] = p.rating || Math.round((3 + Math.random()*2)*10)/10; });
    set({ ratings: map });
  },

  addQR: async (qrObject) => {
    return await dbQr.createQrValido(qrObject);
  },

  markQRAsCanjeado: async (qrId, byUserId) => {
    return await dbQr.markQrAsCanjeado(qrId, byUserId);
  },

}));
