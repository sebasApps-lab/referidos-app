// src/router/guards/pwaGuard.js

export function isPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone
  );
}

/**
 * Devuelve la ruta de redirección o null.
 * - Solo actúa en modo PWA
 * - No decide nada durante bootstrap
 * - No interfiere con onboarding incompleto
 */
export function pwaGuard(usuario, pathname, bootstrap, onboarding) {
  if (!isPWA()) return null;

  //No decidir nada mientras estamos en bootstrap
  if (bootstrap) return null;

  if (pathname.startsWith("/legal")) {
    return null;
  }

  // Sin sesión: solo permitir landing/login
  if (!usuario) {
    if (pathname !== "/" && pathname !== "/auth") {
      return "/";
    }
    return null;
  }

  //Sesión activa pero onboarding incompleto → NO forzar rutas
  if (!onboarding?.allowAccess){
    return null;
  }

  //Accesso válido → forzar home correcto según role
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
