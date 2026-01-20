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
import { clearUserSecurityMaterial } from "../services/secureStorageService";

let promosRefreshTimer = null;
let promosVisibilityHandler = null;
let promosAutoRefreshActive = false;

const SECURITY_LEVELS = {
  NONE: "none",
  UNLOCK_LOCAL: "unlock_local",
  REAUTH_SENSITIVE: "reauth_sensitive",
};

const SECURITY_LEVEL_ORDER = {
  [SECURITY_LEVELS.NONE]: 0,
  [SECURITY_LEVELS.UNLOCK_LOCAL]: 1,
  [SECURITY_LEVELS.REAUTH_SENSITIVE]: 2,
};

const UNLOCK_LOCAL_TTL_MS = 10 * 60 * 1000;
const REAUTH_SENSITIVE_TTL_MS = 5 * 60 * 1000;

const defaultSecurityState = {
  unlockLevel: SECURITY_LEVELS.NONE,
  unlockedAt: null,
  unlockMethod: null,
  unlockExpiresAt: null,
  pendingAction: null,
  pendingLevel: null,
  pendingMethod: null,
  rules: {},
};

export const useAppStore = create(
  persist(
    (set, get) => {
      const updateSecurity = (partial) =>
        set((state) => ({
          security: {
            ...state.security,
            ...partial,
          },
        }));

      const resolveUnlockLevel = () => {
        const security = get().security;
        if (
          security?.unlockExpiresAt &&
          Date.now() > security.unlockExpiresAt
        ) {
          updateSecurity({
            unlockLevel: SECURITY_LEVELS.NONE,
            unlockedAt: null,
            unlockMethod: null,
            unlockExpiresAt: null,
            pendingAction: null,
            pendingLevel: null,
            pendingMethod: null,
          });
          return SECURITY_LEVELS.NONE;
        }
        return security?.unlockLevel || SECURITY_LEVELS.NONE;
      };

      const securityActions = {
        require: (action) => {
          const security = get().security;
          const requiredLevel =
            security?.rules?.[action] ?? SECURITY_LEVELS.NONE;
          const currentLevel = resolveUnlockLevel();
          if (
            SECURITY_LEVEL_ORDER[currentLevel] >=
            SECURITY_LEVEL_ORDER[requiredLevel]
          ) {
            updateSecurity({
              pendingAction: null,
              pendingLevel: null,
              pendingMethod: null,
            });
            return { ok: true, requiredLevel, currentLevel };
          }
          const pendingMethod =
            requiredLevel === SECURITY_LEVELS.REAUTH_SENSITIVE
              ? "password"
              : "local";
          updateSecurity({
            pendingAction: action,
            pendingLevel: requiredLevel,
            pendingMethod,
          });
          return {
            ok: false,
            requiredLevel,
            currentLevel,
            pendingMethod,
          };
        },
        unlockWithBiometrics: (ttlMs = UNLOCK_LOCAL_TTL_MS) => {
          const now = Date.now();
          updateSecurity({
            unlockLevel: SECURITY_LEVELS.UNLOCK_LOCAL,
            unlockedAt: now,
            unlockMethod: "biometrics",
            unlockExpiresAt: now + ttlMs,
            pendingAction: null,
            pendingLevel: null,
            pendingMethod: null,
          });
          return { ok: true };
        },
        unlockWithPin: (ttlMs = UNLOCK_LOCAL_TTL_MS) => {
          const now = Date.now();
          updateSecurity({
            unlockLevel: SECURITY_LEVELS.UNLOCK_LOCAL,
            unlockedAt: now,
            unlockMethod: "pin",
            unlockExpiresAt: now + ttlMs,
            pendingAction: null,
            pendingLevel: null,
            pendingMethod: null,
          });
          return { ok: true };
        },
        unlockWithPassword: (ttlMs = REAUTH_SENSITIVE_TTL_MS) => {
          const now = Date.now();
          updateSecurity({
            unlockLevel: SECURITY_LEVELS.REAUTH_SENSITIVE,
            unlockedAt: now,
            unlockMethod: "password",
            unlockExpiresAt: now + ttlMs,
            pendingAction: null,
            pendingLevel: null,
            pendingMethod: null,
          });
          return { ok: true };
        },
        reset: () => {
          updateSecurity({
            ...defaultSecurityState,
          });
        },
        setRule: (action, level) => {
          updateSecurity({
            rules: {
              ...(get().security?.rules || {}),
              [action]: level,
            },
          });
        },
        setRules: (rules = {}) => {
          updateSecurity({
            rules: { ...rules },
          });
        },
      };

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
      bootstrapError: false,
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
      justCompletedRegistration: false,
      loading: false,
      error: null,
      security: {
        ...defaultSecurityState,
        ...securityActions,
      },
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
      setJustCompletedRegistration: (value) =>
        set({ justCompletedRegistration: value }),

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
        let userId = null;
        try {
          const { data } = await supabase.auth.getSession();
          userId = data?.session?.user?.id ?? null;
        } catch (e) {
          userId = null;
        }
        try{
          await signOut();
        } catch (e) {
          //opcional: log o toast
        } finally {
          if (userId) {
            await clearUserSecurityMaterial(userId);
          }
          set({
            bootstrap: false,
            bootstrapError: false,
            usuario: null,
            onboarding: null,
            promos: [],
            negocios: [],
            scannerPermissionPrompted: false,
            scannerManualFallbackShown: false,
            justCompletedRegistration: false,
            security: {
              ...defaultSecurityState,
              ...securityActions,
            },
          });
        }
      },

      //---------------------
      // BOOTSTRAP AUTH
      //---------------------
      bootstrapAuth: async ({ force = false } = {}) => {
        try {
          set({
            bootstrap: true,
            bootstrapError: false,
            usuario: undefined,
            onboarding: undefined,
            error: null,
          });

          const { data: { session } = {} } = await supabase.auth.getSession();
          //Sin sesión
          if (!session?.access_token) {
            set({
              bootstrap: false,
              bootstrapError: false,
              usuario: null,
              onboarding: null,
            });
            return { ok: true, usuario: null };
          }

          const check = await runOnboardingCheck();
          if (!check?.ok) {
            const errMsg = check?.error || "No se pudo ejecutar onboarding";
            set({
              bootstrap: false,
              bootstrapError: false,
              usuario: null,
              onboarding: check ?? null,
              error: errMsg,
            });
            return { ok: false, error: errMsg };
          }

          const nextUser = check?.usuario ?? null;
          set({
            bootstrap: false,
            bootstrapError: false,
            usuario: nextUser,
            onboarding: check,
          });

          return { ok: true, usuario: nextUser };
        } catch (error) {
          const message = handleError(error);
          set({
            bootstrap: false,
            bootstrapError: true,
            usuario: null,
            onboarding: null,
            error: message,
          });
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
