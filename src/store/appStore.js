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
import { runOnboardingCheck } from "../services/onboardingClient";
import { supabase } from "../lib/supabaseClient";

let promosRefreshTimer = null;
let promosVisibilityHandler = null;
let promosAutoRefreshActive = false;

export const useAppStore = create(
  persist(
    (set, get) => {
      const schedulePromosRefresh = () => {
        if (!promosAutoRefreshActive) return;
        if (promosRefreshTimer) {
          clearTimeout(promosRefreshTimer);
          promosRefreshTimer = null;
        }
        if (typeof document === "undefined") return;
        if (document.visibilityState === "hidden") return;
        const { promosVisible } = get();
        const intervalMs = 12 * 60 * 60 * 1000;
        promosRefreshTimer = setTimeout(async () => {
          if (!promosAutoRefreshActive) return;
          await get().loadPromos({ silent: true, force: true });
          schedulePromosRefresh();
        }, intervalMs);
      };

      return {
      /**
       * MODELO DE ESTADO
       * bootstrap === true -> resolviendo sesión + onboarding
       * usuario === undefined -> onboarding aún no respondió
       * usuario === null -> sin sesión
       * usuario === objeto -> usuario devuelto por onboarding (parcial o completo)
       */
      
      bootstrap: true,
      usuario: undefined,
      onboarding: undefined, // último payload de onboarding (allowAccess/reasons/negocio/provider)
      ratings: {},
      promos: [],
      promosLoadedAt: null,
      promosRefreshing: false,
      promosVisible: false,
      scannerPermissionPrompted: false,
      scannerManualFallbackShown: false,
      negocios: [],
      accessMethods: {
        fingerprint: false,
        pin: false,
        password: false,
      },
      loading: false,
      error: null,
      setUser: (usuario) => set({ usuario }),
      setAccessMethods: (methods) =>
        set((state) => ({
          accessMethods: {
            ...state.accessMethods,
            ...methods,
          },
        })),
      setScannerPermissionPrompted: (value) =>
        set({ scannerPermissionPrompted: value }),
      setScannerManualFallbackShown: (value) =>
        set({ scannerManualFallbackShown: value }),

      //-----------------------
      // AUTH
      //-----------------------
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
          // No seteamos usuario aquí
          // El onboarding se resolverá al hacer login
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
          set({
            bootstrap: false,
            usuario: null,
            onboarding: undefined,
            promos: [],
            negocios: [],
            scannerPermissionPrompted: false,
            scannerManualFallbackShown: false,
          });
        }
      },

      //---------------------
      // BOOTSTRAP AUTH
      //---------------------
      bootstrapAuth: async ({ force = false } = {}) => {
        try {
          set ({ bootstrap: true, usuario: undefined, onboarding: undefined, error: null });

          const { data: { session } = {} } = await supabase.auth.getSession();
          //Sin sesión
          if (!session?.access_token) {
            set({ bootstrap: false, usuario: null, onboarding: null });
            return { ok: true, usuario: null };
          }

          const check = await runOnboardingCheck();
          if (!check?.ok) {
            const errMsg = check?.error || "No se pudo ejecutar onboarding";
            set({ bootstrap: false, usuario: null, onboarding: check ?? null, error: errMsg });
            return { ok: false, error: errMsg };
          }

          const nextUser = check?.usuario ?? null;
          set({ bootstrap: false, usuario: nextUser, onboarding: check });

          return { ok: true, usuario: nextUser };
        } catch (error) {
          const message = handleError(error);
          set({ bootstrap: false, usuario: null, onboarding: null, error: message });
          return { ok: false, error: message };
        }
      },
      //--------------------
      // PROMOS
      //--------------------
      loadPromos: async ({ silent = false, force = false } = {}) => {
        const loadedAt = get().promosLoadedAt;
        if (!force && loadedAt) {
          return { ok: true, cached: true };
        }
        if (silent) {
          set({ promosRefreshing: true });
        } else {
          set({ loading: true, error: null });
        }
        try {
          const { ok, data, error } = await getActivePromos();
          if (!ok) {
            set({ error, loading: false, promosRefreshing: false });
            return { ok: false, error };
          }
          set({
            promos: data,
            loading: false,
            promosRefreshing: false,
            promosLoadedAt: Date.now(),
          });
          return { ok: true, data };
        } catch (error) {
          const message = handleError(error);
          set({ error: message, loading: false, promosRefreshing: false });
          return { ok: false, error: message };
        }
      },
      startPromosAutoRefresh: () => {
        if (promosAutoRefreshActive) return;
        promosAutoRefreshActive = true;

        if (!promosVisibilityHandler && typeof document !== "undefined") {
          promosVisibilityHandler = () => {
            if (!promosAutoRefreshActive) return;
            if (document.visibilityState === "hidden") {
              if (promosRefreshTimer) {
                clearTimeout(promosRefreshTimer);
                promosRefreshTimer = null;
              }
              return;
            }
            schedulePromosRefresh();
          };
          document.addEventListener("visibilitychange", promosVisibilityHandler);
        }

        schedulePromosRefresh();
      },
      stopPromosAutoRefresh: () => {
        promosAutoRefreshActive = false;
        if (promosRefreshTimer) {
          clearTimeout(promosRefreshTimer);
          promosRefreshTimer = null;
        }
        if (promosVisibilityHandler && typeof document !== "undefined") {
          document.removeEventListener(
            "visibilitychange",
            promosVisibilityHandler
          );
          promosVisibilityHandler = null;
        }
      },
      setPromosVisible: (visible) => {
        set({ promosVisible: visible });
        if (promosAutoRefreshActive) {
          schedulePromosRefresh();
        }
      },
      //----------------------
      // RATINGS
      //----------------------
      initRatings: (promos) => {
        const current = get().ratings;
        if (Object.keys(current).length > 0) return;
        const map = {};
        promos.forEach((p) => {
          map[p.id] = Math.round((3 + Math.random() * 2) * 10) / 10;
        });
        set({ ratings: map });
      },

      //-----------------------
      // QR (HMAC)
      //-----------------------
      generatePromoQr: (promoId) => generatePromoQr(promoId),
      generateValidQr: (promoId, opts) => generateValidQr(promoId, opts),
      getActiveValidQr: (promoId) => getActiveValidQr(promoId),
      redeemValidQr: (code) => redeemValidQr(code),

      //----------------------
      // COMENTARIOS
      //----------------------
      addComentario: (payload) => addComentario(payload),
      };
    },
    {
      name: "referidos_app_user",
      version: 2,
      //Para evitar usuarios "fantasma" al arrancar, no persistimos usuario/onboarding
      partialize: () => ({}),
      migrate: () => ({}),
    }
  )
);
