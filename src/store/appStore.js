// src/store/appStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getSessionUserProfile,
} from "../services/authService";
import { getActivePromos } from "../services/promoService";
import {
  generatePromoQr,
  generateValidQr,
  getActiveValidQr,
  redeemValidQr,
} from "../services/qrService";
import { addComentario } from "../services/commentService";
import { handleError } from "../utils/errorUtils";
import { resetOnboardingFlag, runOnboardingCheck } from "../services/onboardingClient";

export const useAppStore = create(
  persist(
    (set, get) => ({
      usuario: null,
      ratings: {},
      promos: [],
      negocios: [],
      loading: false,
      error: null,
      setUser: (usuario) => set({ usuario }),

      // AUTH
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const result = await signInWithEmail(email, password);
          if (!result.ok) {
            set({ loading: false, error: result.error });
            return { ok: false, error: result.error };
          }
          set({ usuario: result.user, loading: false });
          return { ok: true, user: result.user };
        } catch (error) {
          const message = handleError(error);
          set({ loading: false, error: message });
          return { ok: false, error: message };
        }
      },

      register: async ({ email, password, telefono, nombre, role = "cliente" }) => {
        set({ loading: true, error: null });
        try {
          const result = await signUpWithEmail({ email, password, telefono, nombre, role });
          if (!result.ok) {
            set({ loading: false, error: result.error });
            return { ok: false, error: result.error };
          }
          set({ usuario: result.user, loading: false });
          return { ok: true, user: result.user, warning: result.warning };
        } catch (error) {
          const message = handleError(error);
          set({ loading: false, error: message });
          return { ok: false, error: message };
        }
      },

      logout: async () => {
        try{
          await signOut();
        } catch (e) {
          //opcional: log o toast
        } finally {
          resetOnboardingFlag?.();
          set({ usuario: null, promos: [], negocios: [] });
        }
      },  

      restoreSession: async () => {
        try {
          const userData = await getSessionUserProfile();
          if (userData) {
            set({ usuario: userData });
          } else{
            set({ usuario: null });
            resetOnboardingFlag?.();
            set( { promos: [], negocios: [] });
          }
        } catch (error) {
          //error al leer sesión → limpiar estado para evitar incoherencias
          set({ usuario: null });
          resetOnboardingFlag?.();
          handleError(error);
        }
      },

      // PROMOS
      loadPromos: async () => {
        set({ loading: true });
        try {
          const { ok, data, error } = await getActivePromos();
          if (!ok) {
            set({ error, loading: false });
            return { ok: false, error };
          }
          set({ promos: data, loading: false });
          return { ok: true, data };
        } catch (error) {
          const message = handleError(error);
          set({ error: message, loading: false });
          return { ok: false, error: message };
        }
      },

      // RATINGS
      initRatings: (promos) => {
        const current = get().ratings;
        if (Object.keys(current).length > 0) return;
        const map = {};
        promos.forEach((p) => {
          map[p.id] = Math.round((3 + Math.random() * 2) * 10) / 10;
        });
        set({ ratings: map });
      },

      // QR (HMAC)
      generatePromoQr: (promoId) => generatePromoQr(promoId),
      generateValidQr: (promoId, opts) => generateValidQr(promoId, opts),
      getActiveValidQr: (promoId) => getActiveValidQr(promoId),
      redeemValidQr: (code) => redeemValidQr(code),

      // COMENTARIOS
      addComentario: (payload) => addComentario(payload),
    }),
    {
      name: "referidos_app_user",
      partialize: (state) => ({ usuario: state.usuario }),
    }
  )
);
