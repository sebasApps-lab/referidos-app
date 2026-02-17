// src/store/appStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signInWithEmail,
  signUpWithEmail,
  signOut,
} from "../services/authService";
import { endSupportSession } from "@referidos/support-sdk/supportClient";
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
import { registerCurrentSessionDevice } from "../services/sessionDevicesService";
import {
  beginPolicyAction,
  endPolicyAction,
  evaluateErrorPolicy,
  logCatalogBreadcrumb,
  reportError,
} from "../services/loggingClient";
import { supabase } from "../lib/supabaseClient";
import { clearUserSecurityMaterial, loadBiometricToken } from "../services/secureStorageService";
import { useCacheStore } from "../cache/cacheStore";
import { useModalStore } from "../modals/modalStore";

let promosRefreshTimer = null;
let promosVisibilityHandler = null;
let promosAutoRefreshActive = false;
let bootstrapInFlightPromise = null;

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
const SESSION_BOOTSTRAP_ACTION_KEY = "bootstrap:session-register";
const SESSION_POLICY_RETRY_CAP = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createRandomBuffer = (size) => {
  const data = new Uint8Array(size);
  window.crypto.getRandomValues(data);
  return data;
};

const bufferFromBase64Url = (value) => {
  if (!value) return null;
  const base = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base.length % 4 ? "=".repeat(4 - (base.length % 4)) : "";
  const binary = window.atob(base + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

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
        requestLocalVerification: ({
          onVerified,
          onBlocked,
          requireVerifiedEmail = false,
          userId,
          email,
          displayName,
        } = {}) => {
          const { accessMethods, usuario } = get();
          const onboarding = get().onboarding;
          const modalApi = useModalStore.getState();
          if (requireVerifiedEmail && !onboarding?.email_confirmed) {
            onBlocked?.();
            return { ok: false, reason: "email_unverified" };
          }
          const hasFingerprint =
            Boolean(accessMethods?.fingerprint) ||
            Boolean(usuario?.has_biometrics);
          const hasPin =
            Boolean(accessMethods?.pin) ||
            Boolean(usuario?.has_pin);
          const resolvedUserId = userId ?? usuario?.id_auth ?? usuario?.id ?? null;
          const resolvedEmail = email ?? usuario?.email ?? null;
          const resolvedName = displayName ?? usuario?.nombre ?? usuario?.alias ?? "Usuario";

          if (hasFingerprint) {
            (async () => {
              try {
                if (!window.PublicKeyCredential || !window.crypto?.getRandomValues) return;
                const available =
                  await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.();
                if (available === false) return;
                if (!resolvedUserId) return;
                const token = await loadBiometricToken(resolvedUserId);
                const credentialId = token?.credentialId;
                if (!credentialId) return;
                const credentialBuffer = bufferFromBase64Url(credentialId);
                if (!credentialBuffer) return;
                const publicKey = {
                  challenge: createRandomBuffer(32),
                  allowCredentials: [
                    { type: "public-key", id: credentialBuffer },
                  ],
                  userVerification: "required",
                  timeout: 45000,
                };
                await navigator.credentials.get({ publicKey });
                onVerified?.();
              } catch {
                // no-op
              }
            })();
            return { ok: false, method: "fingerprint" };
          }

          if (hasPin) {
            modalApi.openModal("PinVerify", {
              userId: resolvedUserId,
              onConfirm: onVerified,
            });
            return { ok: false, method: "pin" };
          }

          onVerified?.();
          return { ok: true, method: "none" };
        },
        requestPasswordVerification: ({
          onVerified,
          onBlocked,
          requireVerifiedEmail = false,
          email,
        } = {}) => {
          const onboarding = get().onboarding;
          const modalApi = useModalStore.getState();
          if (requireVerifiedEmail && !onboarding?.email_confirmed) {
            onBlocked?.();
            return { ok: false, reason: "email_unverified" };
          }
          modalApi.openModal("PasswordReauth", {
            email,
            onConfirm: onVerified,
          });
          return { ok: false, method: "password" };
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
       * bootstrap === true -> resolviendo sesi??n + onboarding
       * usuario === undefined -> onboarding a??n no respondi??
       * usuario === null -> sin sesi??n
       * usuario === objeto -> usuario devuelto por onboarding (parcial o completo)
       */
      
      bootstrap: true,
      bootstrapError: false,
      usuario: undefined,
      onboarding: undefined, // ??ltimo payload de onboarding (allowAccess/reasons/negocio/provider)
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
      suspendViewportResize: false,
      suspendViewportAfterNext: false,
      justCompletedRegistration: false,
      emailVerifiedSessionAt: null,
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
      setSuspendViewportResize: (value) => set({ suspendViewportResize: value }),
      setSuspendViewportAfterNext: (value) =>
        set({ suspendViewportAfterNext: value }),
      freezeViewportAfterNextUpdate: () =>
        set({ suspendViewportAfterNext: true, suspendViewportResize: false }),
      setScannerPermissionPrompted: (value) =>
        set({ scannerPermissionPrompted: value }),
      setScannerManualFallbackShown: (value) =>
        set({ scannerManualFallbackShown: value }),
      setJustCompletedRegistration: (value) =>
        set({ justCompletedRegistration: value }),
      setEmailVerifiedSessionAt: (value) =>
        set({ emailVerifiedSessionAt: value }),

      //-----------------------
      // AUTH
      //-----------------------
      login: async (email, password) => {
        logCatalogBreadcrumb("auth.signin.start", {
          method: "store_login",
        });
        set({ loading: true, error: null });
        try {
          const result = await signInWithEmail(email, password);
          if (!result.ok) {
            logCatalogBreadcrumb("auth.signin.error", {
              method: "store_login",
              error: result.error || "login_failed",
            });
            set({ loading: false, error: result.error });
            return { ok: false, error: result.error };
          }

          //login SIEMPRE fuerza onboarding
          const boot = await get().bootstrapAuth({ force: true });
          set({ loading: false });
          
          if (!boot.ok) {
            logCatalogBreadcrumb("auth.signin.error", {
              method: "store_login_bootstrap",
              error: boot.error || "bootstrap_failed",
            });
            set({ error: boot.error ?? "No se pudo validar onboarding" });
            return { ok: false, error: boot.error ?? "No se pudo validar onboarding" };
          }

          logCatalogBreadcrumb("auth.signin.ok", {
            method: "store_login",
          });
          return { ok: true };
        } catch (error) {
          const message = handleError(error);
          logCatalogBreadcrumb("auth.signin.error", {
            method: "store_login",
            error: message,
          });
          set({ loading: false, error: message });
          return { ok: false, error: message };
        }
      },

      register: async ({ email, password, telefono, nombre, role = "cliente" }) => {
        logCatalogBreadcrumb("auth.signup.start", {
          method: "store_register",
          role,
        });
        set({ loading: true, error: null });
        try {
          const result = await signUpWithEmail({ email, password, telefono, nombre, role });
          if (!result.ok) {
            logCatalogBreadcrumb("auth.signup.error", {
              method: "store_register",
              role,
              error: result.error || "register_failed",
            });
            set({ loading: false, error: result.error });
            return { ok: false, error: result.error };
          }
          // No seteamos usuario aqu??
          // El onboarding se resolver?? al hacer login
          set({ loading: false });
          logCatalogBreadcrumb("auth.signup.ok", {
            method: "store_register",
            role,
          });
          return { ok: true, data: result.data, warning: result.warning };
        } catch (error) {
          const message = handleError(error);
          logCatalogBreadcrumb("auth.signup.error", {
            method: "store_register",
            role,
            error: message,
          });
          set({ loading: false, error: message });
          return { ok: false, error: message };
        }
      },

        logout: async () => {
          logCatalogBreadcrumb("auth.signout.start", { scope: "local" });
          let userId = null;
          const currentUser = get().usuario;
          const isSupport = currentUser?.role === "soporte";
          try {
            const { data } = await supabase.auth.getSession();
            userId = data?.session?.user?.id ?? null;
          } catch (e) {
            userId = null;
          }
          try{
            if (isSupport) {
              await endSupportSession({ reason: "logout" });
            }
            await signOut({ scope: "local" });
            logCatalogBreadcrumb("auth.signout.ok", { scope: "local" });
          } catch (e) {
            logCatalogBreadcrumb("auth.signout.error", {
              scope: "local",
              error: e?.message || "logout_failed",
            });
            //opcional: log o toast
          } finally {
            if (userId) {
              await clearUserSecurityMaterial(userId);
            }
            useCacheStore.getState().clearAll();
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
            emailVerifiedSessionAt: null,
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
        logCatalogBreadcrumb("auth.bootstrap.start", {
          force: Boolean(force),
        });
        if (bootstrapInFlightPromise) {
          return await bootstrapInFlightPromise;
        }

        bootstrapInFlightPromise = (async () => {
          try {
            const previousUser = get().usuario ?? null;
            const previousOnboarding = get().onboarding ?? null;
            set({
              bootstrap: true,
              bootstrapError: false,
              usuario: undefined,
              onboarding: undefined,
              error: null,
            });

            const { data: { session } = {} } = await supabase.auth.getSession();
            //Sin sesi??n
            if (!session?.access_token) {
              logCatalogBreadcrumb("auth.bootstrap.ok", {
                has_session: false,
              });
              set({
                bootstrap: false,
                bootstrapError: false,
                usuario: null,
                onboarding: null,
              });
              return { ok: true, usuario: null };
            }

            let sessionRegister = { ok: false };
            const canStart = beginPolicyAction(SESSION_BOOTSTRAP_ACTION_KEY);
            if (!canStart) {
              return {
                ok: false,
                code: "session_register_in_flight",
                error: "Validacion de sesion en progreso",
                recoverable: true,
              };
            }

            try {
              let attempts = 0;
              while (attempts < SESSION_POLICY_RETRY_CAP) {
                sessionRegister = await registerCurrentSessionDevice();
                if (sessionRegister?.ok) break;

                const errCode = String(sessionRegister?.code || "").toLowerCase();
                const policyEval = await evaluateErrorPolicy({
                  errorCode: errCode || "session_register_failed",
                  route: "/app",
                  context: {
                    flow: "bootstrap_auth",
                    flow_step: "session_register",
                    role: get()?.usuario?.role || null,
                  },
                  actionKey: SESSION_BOOTSTRAP_ACTION_KEY,
                });
                const policy = policyEval?.policy || {};

                if (policy?.ui?.show) {
                  const modalApi = useModalStore.getState();
                  modalApi.openModal("ConfirmAction", {
                    title: "Problema de conexion",
                    message:
                      "No pudimos validar la sesion en este momento. Reintentaremos automaticamente.",
                    confirmLabel: "Entendido",
                    cancelLabel: "Cerrar",
                  });
                }

                if (policy?.retry?.allowed) {
                  attempts += 1;
                  await sleep(Math.max(250, Number(policy?.retry?.backoff_ms || 0)));
                  continue;
                }

                break;
              }
            } finally {
              endPolicyAction(SESSION_BOOTSTRAP_ACTION_KEY);
            }

            if (!sessionRegister?.ok) {
              const errCode = String(sessionRegister?.code || "").toLowerCase();
              const errMsg =
                sessionRegister?.error ||
                sessionRegister?.message ||
                "No se pudo registrar la sesion activa";
              const policyEval = await evaluateErrorPolicy({
                errorCode: errCode || "session_register_failed",
                route: "/app",
                context: {
                  flow: "bootstrap_auth",
                  flow_step: "session_register",
                  role: get()?.usuario?.role || null,
                },
                actionKey: SESSION_BOOTSTRAP_ACTION_KEY,
              });
              const policy = policyEval?.policy || {};
              const mustTerminateSession =
                policy?.auth?.signOut === "local" || policy?.auth?.signOut === "global";

              if (mustTerminateSession) {
                try {
                  await signOut({ scope: "local" });
                } catch {
                  // no-op
                }
              }

              if (policy?.uam?.degrade_to === SECURITY_LEVELS.REAUTH_SENSITIVE) {
                get().security.setRules({
                  transfer_points: SECURITY_LEVELS.REAUTH_SENSITIVE,
                  redeem_qr: SECURITY_LEVELS.REAUTH_SENSITIVE,
                  update_profile: SECURITY_LEVELS.REAUTH_SENSITIVE,
                  admin_sensitive_action: SECURITY_LEVELS.REAUTH_SENSITIVE,
                });
              }

              if (policy?.ui?.show) {
                const modalApi = useModalStore.getState();
                modalApi.openModal("ConfirmAction", {
                  title: mustTerminateSession ? "Sesion expirada" : "No se pudo validar la sesion",
                  message: mustTerminateSession
                    ? "Tu sesion ya no es valida en este dispositivo. Vuelve a iniciar sesion."
                    : "Hubo un problema temporal al validar tu sesion. Intenta nuevamente.",
                  confirmLabel: "Entendido",
                  cancelLabel: "Cerrar",
                });
              }

              void reportError(new Error(errMsg), {
                code: errCode || "session_register_failed",
                context: {
                  source: "bootstrap_session_register_failed",
                  error_code: errCode || "session_register_failed",
                  recoverable: !mustTerminateSession,
                },
              });

              set({
                bootstrap: false,
                bootstrapError: !mustTerminateSession,
                usuario: mustTerminateSession ? null : previousUser,
                onboarding: mustTerminateSession ? null : previousOnboarding,
                error: errMsg,
              });
              logCatalogBreadcrumb("auth.bootstrap.error", {
                step: "session_register",
                error: errMsg,
                code: errCode || null,
                recoverable: !mustTerminateSession,
              });
              return {
                ok: false,
                error: errMsg,
                code: errCode || null,
                recoverable: !mustTerminateSession,
              };
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
              logCatalogBreadcrumb("auth.bootstrap.error", {
                step: "onboarding_check",
                error: errMsg,
              });
              return { ok: false, error: errMsg };
            }

            const nextUser = check?.usuario ?? null;
            const emailConfirmed = Boolean(check?.email_confirmed);
            const currentVerifiedAt = get().emailVerifiedSessionAt;
            const nextVerifiedAt =
              emailConfirmed && !currentVerifiedAt ? Date.now() : currentVerifiedAt;
            set({
              bootstrap: false,
              bootstrapError: false,
              usuario: nextUser,
              onboarding: check,
              emailVerifiedSessionAt: nextVerifiedAt,
            });
            logCatalogBreadcrumb("auth.bootstrap.ok", {
              has_session: true,
              role: nextUser?.role || null,
              allow_access: check?.allowAccess === true,
            });

            return { ok: true, usuario: nextUser };
          } catch (error) {
            const message = handleError(error);
            logCatalogBreadcrumb("auth.bootstrap.error", {
              step: "exception",
              error: message,
            });
            set({
              bootstrap: false,
              bootstrapError: true,
              usuario: null,
              onboarding: null,
              error: message,
            });
            return { ok: false, error: message };
          }
        })();

        try {
          return await bootstrapInFlightPromise;
        } finally {
          bootstrapInFlightPromise = null;
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

