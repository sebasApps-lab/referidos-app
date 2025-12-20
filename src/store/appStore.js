// src/store/appStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signInWithEmail,
  signUpWithEmail,
  signOut,
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
import { supabase } from "../lib/supabaseClient";

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Modelo de estado:
      // bootstrap === true -> resolviendo sesión+onboarding
      // usuario === undefined -> onboarding no resulto aún
      // usuario === null -> sin sesión / no autorizado
      // usuario === objeto -> usuario devuelto por onboarding (parcial o completo)
      bootstrap: true,
      usuario: undefined,
      onboarding: undefined, // último payload de onboarding (allowAccess/registro_estado/reasons/negocio/provider)
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

          //login SIEMPRE fuerza onboarding
          const boot = await get().bootstrapAuth({ force: true });
          set({ loading: false });
          
          if (!boot.ok) {
            set({ error: boot.error ?? "No se pudo validar onboarding" });
            return { ok: false, error: boot.error ?? "No se pudo validar onboarding" };
          }

          return { ok: true };
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
          // No seteamos usuario tras signup; se resolverá al hacer login/onboarding
          set({ loading: false });
          return { ok: true, data: result.data, warning: result.warning };
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
          set({
            bootstrap: false,
            usuario: null,
            onboarding: undefined,
            promos: [],
            negocios: [],
          });
        }
      },  

      bootstrapAuth: async ({ force = false } = {}) => {
        try {
          set ({ bootstrap: true, usuario: undefined, onboarding: undefined, error: null });

          const { data: { session } = {} } = await supabase.auth.getSession();
          if (!session?.access_token) {
            if (force) resetOnboardingFlag?.();
            set({ bootstrap: false, usuario: null, onboarding: null });
            return { ok: true, usuario: null, allowAccess: false, registro_estado: null, reasons: [] };
          }

          if (force) resetOnboardingFlag?.();

          const check = await runOnboardingCheck();
          if (!check?.ok) {
            const errMsg = check?.error || "No se pudo ejecutar onboarding";
            set({ bootstrap: false, usuario: null, onboarding: check ?? null, error: errMsg });
            return { ok: false, error: errMsg };
          }

          const nextUser = check?.usuario ?? null;
          set({ bootstrap: false, usuario: nextUser, onboarding: check });

          return {
            ok: true,
            usuario: nextUser,
            allowAccess: check.allowAccess ?? false,
            registro_estado: check.registro_estado ?? null,
            reasons: check.reasons ?? [],
            negocio: check.negocio ?? null,
            provider: check.provider ?? null,
          };
        } catch (error) {
          const message = handleError(error);
          set({ bootstrap: false, usuario: null, onboarding: null, error: message });
          return { ok: false, error: message };
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
      version: 2,
      //Para evitar usuarios "fantasma" al arrancar, no persistimos usuario/onboarding
      partialize: () => ({}),
      migrate: () => ({}),
    }
  )
);
