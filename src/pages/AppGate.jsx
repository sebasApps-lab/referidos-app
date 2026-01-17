// src/pages/AppGate.jsx
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { runValidateRegistration } from "../services/registrationClient";

const ACCOUNT_STATUS_MESSAGES = {
  blocked: "Tu cuenta ha sido bloqueada, contacta a servicio al cliente.",
  suspended: "Tu cuenta ha sido suspendida, contacta a servicio al cliente.",
  deleted: "Tu cuenta ha sido eliminada, contacta a servicio al cliente.",
  expired: "Tu cuenta ha expirado, contacta a servicio al cliente.",
};

const MISSING_DATA_PREFIXES = new Set([
  "missing_owner_fields",
  "missing_business_fields",
]);

const MISSING_DATA_REASONS = new Set([
  "missing_profile",
  "missing_role",
  "missing_business_row",
  "missing_sucursales_row",
  "missing_sucursales_fields",
  "missing_address_row",
  "missing_address_fields",
]);

export default function AppGate({ publicElement = null }) {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const bootstrapError = useAppStore((s) => s.bootstrapError);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);
  const logout = useAppStore((s) => s.logout);
  const resetRequestedRef = useRef(false);
  const validateAttemptedRef = useRef(false);
  const [validatePending, setValidatePending] = useState(false);

  useEffect(() => {
    // 1) Resolver session + onboarding si aun no existe
    if (typeof usuario === "undefined") {
      bootstrapAuth({ force: false });
    }
  }, [usuario, bootstrapAuth]);

  const onboardingError = onboarding && onboarding.ok === false;
  const shouldReset = bootstrapError || onboardingError;

  useEffect(() => {
    if (!shouldReset || resetRequestedRef.current) return;
    resetRequestedRef.current = true;
    logout();
  }, [logout, shouldReset]);

  useEffect(() => {
    if (bootstrap || typeof usuario === "undefined") return;
    if (!usuario) return;
    if (onboarding?.allowAccess !== false) return;
    const reasons = onboarding?.reasons || [];
    const statusReason = reasons.find((reason) =>
      reason.startsWith("account_status:")
    );
    if (!statusReason) return;
    const status = statusReason.split("account_status:")[1] || "";
    if (status === "pending" || status === "active") return;
    const message =
      ACCOUNT_STATUS_MESSAGES[status] ||
      "Tu cuenta no esta disponible. Contacta a servicio al cliente.";
    sessionStorage.setItem("auth_status_error", message);
    logout();
  }, [bootstrap, usuario, onboarding, logout]);

  useEffect(() => {
    if (bootstrap || typeof usuario === "undefined") return;
    if (!usuario) return;
    if (onboarding?.allowAccess !== false) return;
    const reasons = onboarding?.reasons || [];
    if (reasons.length !== 1) return;
    const reason = reasons[0];
    if (
      reason !== "missing_account_status" &&
      reason !== "account_status:pending"
    ) {
      return;
    }
    if (validateAttemptedRef.current) return;
    validateAttemptedRef.current = true;
    let active = true;
    setValidatePending(true);
    (async () => {
      const result = await runValidateRegistration();
      if (result?.valid === false) {
        await bootstrapAuth({ force: true });
        const nextOnboarding = useAppStore.getState().onboarding;
        const nextReasons = nextOnboarding?.reasons || [];
        const hasMissingData = nextReasons.some((reason) => {
          if (MISSING_DATA_REASONS.has(reason)) return true;
          for (const prefix of MISSING_DATA_PREFIXES) {
            if (reason.startsWith(prefix)) return true;
          }
          return false;
        });

        if (!hasMissingData) {
          const statusReason = nextReasons.find((reason) =>
            reason.startsWith("account_status:")
          );
          if (statusReason) {
            const status = statusReason.split("account_status:")[1] || "";
            if (status && status !== "pending" && status !== "active") {
              const message =
                ACCOUNT_STATUS_MESSAGES[status] ||
                "Tu cuenta no esta disponible. Contacta a servicio al cliente.";
              sessionStorage.setItem("auth_status_error", message);
            }
          }
          await logout();
        }

        if (active) {
          setValidatePending(false);
        }
        return;
      }
      await bootstrapAuth({ force: true });
      if (active) {
        setValidatePending(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [bootstrap, usuario, onboarding, bootstrapAuth, logout]);

  if (bootstrap || typeof usuario === "undefined" || validatePending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#5E30A5] text-white">
        Cargando...
      </div>
    );
  }

  if (shouldReset) {
    if (location.pathname !== "/") {
      return <Navigate to="/" replace />;
    }
    return publicElement ?? <Navigate to="/" replace />;
  }

  const onboardingOk = onboarding?.ok === true;

  if (!usuario) {
    if (onboardingOk) {
      if (publicElement) {
        if (location.pathname === "/") {
          return <Navigate to="/auth" replace />;
        }
        return publicElement;
      }
      return <Navigate to="/auth" replace />;
    }

    if (publicElement) {
      if (onboarding === null) {
        return publicElement;
      }
      if (location.pathname === "/auth") {
        return <Navigate to="/" replace />;
      }
      return publicElement;
    }
    return <Navigate to="/" replace />;
  }

  if (!onboarding?.allowAccess) {
    if (publicElement) {
      if (location.pathname === "/") {
        return <Navigate to="/auth" replace />;
      }
      return publicElement;
    }
    return <Navigate to="/auth" replace />;
  }

  if (publicElement) {
    const verificationStatus =
      onboarding?.verification_status || onboarding?.usuario?.verification_status;
    const shouldHoldAuth =
      location.pathname === "/auth" &&
      (verificationStatus === "unverified" || verificationStatus === "in_progress");
    if (shouldHoldAuth) {
      return publicElement;
    }
    return <Navigate to="/app" replace />;
  }

  if (usuario.role === "admin") {
    return <Navigate to="/admin/inicio" replace />;
  }
  if (usuario.role === "negocio") {
    return <Navigate to="/negocio/inicio" replace />;
  }
  return <Navigate to="/cliente/inicio" replace />;
}
