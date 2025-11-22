// src/router/guards/pwaGuard.js

export function isPWA() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

export function pwaGuard(usuario, pathname) {
  if (!isPWA()) return null;

  // Si no hay usuario → solo permitir login/registro
  if (!usuario && pathname !== "/login" && pathname !== "/registro") {
    return "/login";
  }

  // Redirigir al home correcto
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
