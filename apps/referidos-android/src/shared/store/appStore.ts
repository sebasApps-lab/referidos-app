import { create } from "zustand";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";

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
  bootstrapAuth: () => Promise<void>;
  forceRoleForDebug: (role: AppRole) => void;
  setJustCompletedRegistration: (value: boolean) => void;
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

export const useAppStore = create<AppState>((set) => ({
  bootStatus: "idle",
  bootError: null,
  role: null,
  allowAccess: false,
  requiresVerificationFlow: false,
  reasons: [],
  onboarding: null,
  justCompletedRegistration: false,

  bootstrapAuth: async () => {
    set({ bootStatus: "loading", bootError: null });
    try {
      const { data: { session } = {} } = await supabase.auth.getSession();
      if (!session?.access_token) {
        set({
          bootStatus: "ready",
          onboarding: null,
          role: null,
          allowAccess: false,
          requiresVerificationFlow: false,
          reasons: [],
        });
        return;
      }

      const onboarding = await mobileApi.auth.runOnboardingCheck();
      if (!onboarding?.ok) {
        set({
          bootStatus: "error",
          bootError: onboarding?.error || "onboarding_failed",
          onboarding,
          role: null,
          allowAccess: false,
          requiresVerificationFlow: false,
          reasons: [],
        });
        return;
      }

      const resolvedRole = resolveRole(onboarding);
      const verificationStatus = onboarding?.verification_status || null;
      const requiresVerificationFlow =
        Boolean(onboarding?.allowAccess) &&
        (resolvedRole === "cliente" || resolvedRole === "negocio") &&
        (verificationStatus === "unverified" || verificationStatus === "in_progress");

      set({
        bootStatus: "ready",
        onboarding,
        role: resolvedRole,
        allowAccess: Boolean(onboarding?.allowAccess),
        requiresVerificationFlow,
        reasons: Array.isArray(onboarding?.reasons) ? onboarding.reasons : [],
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

  signOut: async () => {
    await supabase.auth.signOut();
    set({
      bootStatus: "ready",
      bootError: null,
      role: null,
      allowAccess: false,
      requiresVerificationFlow: false,
      reasons: [],
      onboarding: null,
      justCompletedRegistration: false,
    });
  },
}));
