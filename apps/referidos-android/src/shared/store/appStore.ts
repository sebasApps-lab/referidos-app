import { create } from "zustand";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";
import { useShellStore } from "@shared/store/shellStore";
import { useSecurityStore } from "@shared/store/securityStore";
import { buildAccessMethodsFromUser, AccessMethods } from "@shared/security/localAccessSecurity";

export type AppRole = "cliente" | "negocio" | "admin" | "soporte" | null;
export type BootStatus = "idle" | "loading" | "ready" | "error";

type AppState = {
  bootStatus: BootStatus;
  bootError: string | null;
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

export const useAppStore = create<AppState>((set, get) => ({
  bootStatus: "idle",
  bootError: null,
  role: null,
  allowAccess: false,
  requiresVerificationFlow: false,
  reasons: [],
  onboarding: null,
  justCompletedRegistration: false,
  accessMethods: {
    fingerprint: false,
    pin: false,
    password: false,
  },

  bootstrapAuth: async () => {
    set({ bootStatus: "loading", bootError: null });
    try {
      const { data: { session } = {} } = await supabase.auth.getSession();
      if (!session?.access_token) {
        void observability.track({
          level: "info",
          category: "auth",
          message: "bootstrap_no_session",
          context: { flow: "auth_bootstrap" },
        });
        useShellStore.getState().clearSessionCache();
        useModalStore.getState().reset();
        useSecurityStore.getState().reset();
        set({
          bootStatus: "ready",
          onboarding: null,
          role: null,
          allowAccess: false,
          requiresVerificationFlow: false,
          reasons: [],
          accessMethods: {
            fingerprint: false,
            pin: false,
            password: false,
          },
        });
        return;
      }

      const onboarding = await mobileApi.auth.runOnboardingCheck();
      if (!onboarding?.ok) {
        void observability.track({
          level: "warn",
          category: "auth",
          message: "bootstrap_onboarding_failed",
          context: {
            flow: "auth_bootstrap",
            error: onboarding?.error || "onboarding_failed",
          },
        });
        set({
          bootStatus: "error",
          bootError: onboarding?.error || "onboarding_failed",
          onboarding,
          role: null,
          allowAccess: false,
          requiresVerificationFlow: false,
          reasons: [],
          accessMethods: {
            fingerprint: false,
            pin: false,
            password: false,
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
        onboarding,
        role: resolvedRole,
        allowAccess: Boolean(onboarding?.allowAccess),
        requiresVerificationFlow,
        reasons: Array.isArray(onboarding?.reasons) ? onboarding.reasons : [],
        accessMethods,
        bootError: null,
      });
    } catch (error: any) {
      await observability.track({
        level: "error",
        category: "auth",
        message: "bootstrap_auth_failed",
        context: { error: String(error?.message || error) },
      });
      set({
        bootStatus: "error",
        bootError: String(error?.message || error),
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
    void observability.track({
      level: "info",
      category: "auth",
      message: "sign_out",
      context: { flow: "auth_session" },
    });
    await supabase.auth.signOut();
    useShellStore.getState().clearSessionCache();
    useModalStore.getState().reset();
    useSecurityStore.getState().reset();
    set({
      bootStatus: "ready",
      bootError: null,
      role: null,
      allowAccess: false,
      requiresVerificationFlow: false,
      reasons: [],
      onboarding: null,
      justCompletedRegistration: false,
      accessMethods: {
        fingerprint: false,
        pin: false,
        password: false,
      },
    });
  },
}));
