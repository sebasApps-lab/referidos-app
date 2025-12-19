// src/router/guards/pwaGuard.js

export function isPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone
  );
}

/**
 * Devuelve la ruta de redirección o null.
 * - Ignora mientras bootstrap está activo.
 * - No redirige si el usuario está parcial (registro_estado !== "completo").
 */
export function pwaGuard(usuario, pathname, bootstrap = false) {
  if (!isPWA()) return null;

  //No decidir nada mientras estamos en bootstrap
  if (bootstrap) return null;

  // Sin sesión: solo permitir landing/login
  if (!usuario && pathname !== "/" && pathname !== "/auth") {
    return "/";
  }

  //Usuario parcial: no forzar redirecciones por rol
  if (usuario && usuario.registro_estado !== "completo"){
    return null;
  }

  // Redirigir al home correcto según rol
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
