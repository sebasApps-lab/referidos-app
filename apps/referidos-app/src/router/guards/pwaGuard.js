// src/router/guards/pwaGuard.js

export function isPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone
  );
}

/**
 * Devuelve la ruta de redireccion o null.
 * - Solo actua en modo PWA
 * - No decide nada durante bootstrap
 * - No interfiere con onboarding incompleto
 */
export function pwaGuard(usuario, pathname, bootstrap, onboarding) {
  if (!isPWA()) return null;

  // No decidir nada mientras estamos en bootstrap
  if (bootstrap) return null;

  if (pathname.startsWith("/legal")) {
    return null;
  }
  if (pathname === "/inicio") {
    return null;
  }

  // Sin sesion: solo permitir landing/login
  if (!usuario) {
    if (pathname !== "/" && pathname !== "/auth") {
      return "/";
    }
    return null;
  }

  // Sesion activa pero onboarding incompleto -> no forzar rutas
  if (!onboarding?.allowAccess) {
    return null;
  }

  const clientSteps = onboarding?.client_steps || {};
  const clientProfile = clientSteps.profile || {};
  const clientAddress = clientSteps.address || {};
  const clientProfileCompleted = Boolean(clientProfile.completed);
  const clientAddressCompleted = Boolean(clientAddress.completed);
  const clientProfileSkipped =
    Boolean(clientProfile.skipped) && !clientProfileCompleted;
  const clientAddressSkipped =
    Boolean(clientAddress.skipped) && !clientAddressCompleted;
  const clientStepsPending =
    usuario?.role === "cliente" &&
    ((!clientProfileCompleted && !clientProfileSkipped) ||
      (!clientAddressCompleted && !clientAddressSkipped));

  const verificationStatus =
    onboarding?.verification_status || onboarding?.usuario?.verification_status;
  const verificationPending =
    verificationStatus === "unverified" || verificationStatus === "in_progress";
  const termsAccepted = Boolean(onboarding?.usuario?.terms_accepted);
  const privacyAccepted = Boolean(onboarding?.usuario?.privacy_accepted);
  const legalAccepted = termsAccepted && privacyAccepted;
  const legalPending =
    (usuario?.role === "cliente" || usuario?.role === "negocio") &&
    !legalAccepted;
  const shouldHoldAuth = verificationPending || clientStepsPending || legalPending;

  if (shouldHoldAuth) {
    if (pathname === "/auth") return null;
    return "/auth";
  }

  // Acceso valido -> forzar home correcto segun role
  if (usuario) {
    if (usuario.role === "cliente" && !pathname.startsWith("/cliente")) {
      return "/cliente/inicio";
    }
    if (usuario.role === "negocio" && !pathname.startsWith("/negocio")) {
      return "/negocio/inicio";
    }
    if (usuario.role === "admin" && !pathname.startsWith("/admin")) {
      return "/admin/inicio";
    }
  }

  return null;
}
