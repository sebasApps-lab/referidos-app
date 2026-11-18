import { create } from "zustand";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { registerCurrentSessionDevice } from "@shared/services/sessionDevices";
import { useModalStore } from "@shared/store/modalStore";
import { useShellStore } from "@shared/store/shellStore";
import { useSecurityStore } from "@shared/store/securityStore";
import { buildAccessMethodsFromUser, AccessMethods } from "@shared/security/localAccessSecurity";

export type AppRole = "cliente" | "negocio" | "admin" | "soporte" | null;
export type BootStatus = "idle" | "loading" | "ready" | "error";

type AppState = {
  bootStatus: BootStatus;
  bootError: string | null;
  hasCompletedAuthBootstrap: boolean;
  role: AppRole;
  allowAccess: boolean;
  requiresVerificationFlow: boolean;
  reasons: string[];
  onboarding: any | null;
  justCompletedRegistration: boolean;
  accessMethods: AccessMethods;
  bootstrapAuth: () => Promise<void>;
  forceRoleForDebug: (role: AppRole) => void;
  setJustCompletedRegistration: (value: boolean) => void;
  setAccessMethods: (methods: Partial<AccessMethods>) => void;
  signOut: () => Promise<void>;
};

function resolveRole(onboardingData: any): AppRole {
  const role = onboardingData?.usuario?.role || onboardingData?.role || null;
  if (role === "cliente") return "cliente";
  if (role === "negocio") return "negocio";
  if (role === "admin") return "admin";
  if (role === "soporte") return "soporte";
  return null;
}

function signedOutState() {
  return {
    onboarding: null,
    role: null,
    allowAccess: false,
    requiresVerificationFlow: false,
    reasons: [],
    justCompletedRegistration: false,
    accessMethods: { fingerprint: false, pin: false, password: false },
  };
}

function clearSessionUi() {
  useShellStore.getState().clearSessionCache();
  useModalStore.getState().reset();
  useSecurityStore.getState().reset();
}

function bootstrapCheckErrorMessage(
  result: { error?: string; errorType?: string; status?: number } | null | undefined,
  fallback: string,
) {
  if (result?.error === "no_session" || result?.status === 401) {
    return "No pudimos verificar tu sesión. Cierra la sesión e ingresa de nuevo.";
  }
  if (result?.status === 403) {
    return "No pudimos comprobar el acceso de esta cuenta. Intenta ingresar de nuevo.";
  }
  if (result?.errorType === "FunctionsFetchError") {
    return "No pudimos conectar con el servicio. Comprueba tu conexión y reintenta.";
  }
  return fallback;
}

// A late bootstrap response must not restore the access state after sign-out.
let authOperation = 0;

export const useAppStore = create<AppState>((set, get) => ({
  bootStatus: "idle",
  bootError: null,
  hasCompletedAuthBootstrap: false,
  ...signedOutState(),

  bootstrapAuth: async () => {
    const operation = ++authOperation;
    set({ bootStatus: "loading", bootError: null });
    try {
      const { data: { session } = {}, error: sessionError } = await supabase.auth.getSession();
      if (operation !== authOperation) return;
      if (sessionError) throw sessionError;
      if (!session?.access_token) {
        void observability.track({
          level: "info",
          category: "auth",
          message: "bootstrap_no_session",
          context: { flow: "auth_bootstrap" },
        });
        clearSessionUi();
        set({
          ...signedOutState(),
          bootStatus: "ready",
          hasCompletedAuthBootstrap: true,
        });
        return;
      }

      // The backend checks for a registered device session before allowing profile access.
      const sessionRegistration = await registerCurrentSessionDevice();
      if (operation !== authOperation) return;
      if (sessionRegistration?.ok !== true) {
        clearSessionUi();
        set({
          ...signedOutState(),
          bootStatus: "error",
          bootError: bootstrapCheckErrorMessage(
            sessionRegistration,
            "No pudimos registrar la sesión de este dispositivo. Reintenta para continuar.",
          ),
        });
        void observability.track({
          level: "warn",
          category: "auth",
          message: "bootstrap_session_register_failed",
          context: {
            flow: "auth_bootstrap",
            error_type: sessionRegistration?.errorType || "session_register_failed",
            http_status: sessionRegistration?.status || null,
          },
        });
        return;
      }

      const onboarding = await mobileApi.auth.runOnboardingCheck();
      if (operation !== authOperation) return;
      if (!onboarding?.ok) {
        clearSessionUi();
        set({
          ...signedOutState(),
          bootStatus: "error",
          bootError: bootstrapCheckErrorMessage(
            onboarding,
            "No pudimos cargar tu perfil. Reintenta para continuar.",
          ),
        });
        void observability.track({
          level: "warn",
          category: "auth",
          message: "bootstrap_onboarding_failed",
          context: {
            flow: "auth_bootstrap",
            error_type: onboarding?.errorType || "onboarding_failed",
            http_status: onboarding?.status || null,
          },
        });
        return;
      }

      const previousRole = get().role;
      const resolvedRole = resolveRole(onboarding);
      if (previousRole !== resolvedRole) {
        useShellStore.getState().clearSessionCache();
      }
      const verificationStatus = onboarding?.verification_status || null;
      const requiresVerificationFlow =
        Boolean(onboarding?.allowAccess) &&
        (resolvedRole === "cliente" || resolvedRole === "negocio") &&
        (verificationStatus === "unverified" || verificationStatus === "in_progress");
      const accessMethods = buildAccessMethodsFromUser(onboarding?.usuario || {});

      void observability.track({
        level: "info",
        category: "auth",
        message: "bootstrap_auth_ready",
        context: {
          flow: "auth_bootstrap",
          role: resolvedRole || null,
          allow_access: Boolean(onboarding?.allowAccess),
          requires_verification: requiresVerificationFlow,
        },
      });

      set({
        bootStatus: "ready",
        hasCompletedAuthBootstrap: true,
        onboarding,
        role: resolvedRole,
        allowAccess: Boolean(onboarding?.allowAccess),
        requiresVerificationFlow,
        reasons: Array.isArray(onboarding?.reasons) ? onboarding.reasons : [],
        accessMethods,
        bootError: null,
      });
    } catch (error) {
      if (operation !== authOperation) return;
      clearSessionUi();
      set({
        ...signedOutState(),
        bootStatus: "error",
        bootError: "No pudimos recuperar tu sesión. Comprueba tu conexión y reintenta.",
      });
      void observability.track({
        level: "error",
        category: "auth",
        message: "bootstrap_auth_failed",
        context: { error_type: error instanceof Error ? error.name : "unknown" },
      });
    }
  },

  forceRoleForDebug: (role) => {
    set({ role, bootStatus: "ready" });
  },

  setJustCompletedRegistration: (value) => {
    set({ justCompletedRegistration: value });
  },

  setAccessMethods: (methods) => {
    set((state) => ({
      accessMethods: {
        ...state.accessMethods,
        ...methods,
      },
    }));
  },

  signOut: async () => {
    const operation = ++authOperation;
    set({ bootStatus: "loading", bootError: null });
    void observability.track({
      level: "info",
      category: "auth",
      message: "sign_out",
      context: { flow: "auth_session" },
    });
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error && error.name !== "AuthSessionMissingError") throw error;
    } catch (error) {
      if (operation !== authOperation) return;
      clearSessionUi();
      set({
        ...signedOutState(),
        bootStatus: "error",
        bootError: "No pudimos cerrar tu sesión. Comprueba tu conexión e inténtalo de nuevo.",
      });
      void observability.track({
        level: "warn",
        category: "auth",
        message: "sign_out_failed",
        context: { error_type: error instanceof Error ? error.name : "unknown" },
      });
      return;
    }
    if (operation !== authOperation) return;
    clearSessionUi();
    set({
      ...signedOutState(),
      bootStatus: "ready",
      bootError: null,
      hasCompletedAuthBootstrap: true,
    });
  },
}));
