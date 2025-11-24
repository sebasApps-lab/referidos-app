// src/store/appStore.js
// Zustand + Supabase bridge (minimal)
import { create } from "zustand";
import * as auth from "../db/auth";
import * as dbQr from "../db/qr";
import * as dbPromos from "../db/promos";
import * as dbNeg from "../db/negocios";
import * as dbCom from "../db/comentarios";
import * as dbRep from "../db/reportes";

export const useAppStore = create((set, get) => ({
  usuario: null,
  ratings: {},

  setUser: (user) => set({ usuario: user }),

  // login using auth.loginLocal (supabase-backed)
  loginLocal: async (email, password) => {
    const r = await auth.loginLocal(email, password);
    if (!r.ok) return r;
    set({ usuario: r.user });
    return { ok: true, user: r.user };
  },

  // create user record
  createUser: async (payload) => {
    const r = await auth.createUser(payload);
    if (!r.ok) return r;
    set({ usuario: r.data });
    return { ok: true, user: r.data };
  },

  logout: () => set({ usuario: null }),

  initRatings: async (promos) => {
    const current = get().ratings;
    if (Object.keys(current).length > 0) return;
    const map = {};
    promos.forEach((p) => {
      map[p.id] = p.rating || Math.round((3 + Math.random() * 2) * 10) / 10;
    });
    set({ ratings: map });
  },

  addQR: async (qrObject) => {
    return await dbQr.createQrValido(qrObject);
  },

  markQRAsCanjeado: async (qrId, byUserId) => {
    return await dbQr.markQrAsCanjeado(qrId, byUserId);
  },

  addComentario: async (payload) => {
    return await dbCom.addComentario(payload);
  },

  createReport: async (payload) => {
    return await dbRep.createReport(payload);
  },

  listNegocios: async (limit = 50) => {
    return await dbNeg.listNegocios(limit);
  },

  getPromosByNegocio: async (negocioId) => {
    return await dbPromos.getPromosByNegocio(negocioId);
  },
}));
