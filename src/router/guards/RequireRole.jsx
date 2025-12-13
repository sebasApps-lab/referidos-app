// src/router/guards/RequireRole.jsx

import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireRole({ children, role }) {
  const usuario = useAppStore((state) => state.usuario);
  const regStatus = (() => {
    if (!usuario?.id_auth) return null;
    try {
      return localStorage.getItem(`reg_status_${usuario.id_auth}`);
    } catch {
      return null;
    }
  })();

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Falta rol: enviar a SplashChoice para completar onboarding
  if (!usuario.role) {
    return <Navigate to="/tipo" replace state={{ fromOAuth: true }} />;
  }

  // Falta completar onboarding: bloquea entrada a dashboard
  if (usuario.role === "cliente" && usuario.registro_estado !== "completo") {
    return <Navigate to="/tipo" replace state={{ fromOAuth: true }} />;
  }

  if (usuario.role === "negocio" && usuario.registro_estado !== "completo") {
    if (regStatus === "negocio_page3") {
      return <Navigate to="/auth" replace state={{ role: "negocio", fromOAuth: true, page: 3 }} />;
    }
    return <Navigate to="/auth" replace state={{ role: "negocio", fromOAuth: true, page: 2 }} />;
  }

  // Verificar rol correcto
  if (usuario.role !== role) {
    if (usuario.role === "cliente")
      return <Navigate to="/cliente/inicio" replace />;

    if (usuario.role === "negocio")
      return <Navigate to="/negocio/inicio" replace />;

    if (usuario.role === "admin")
      return <Navigate to="/admin/inicio" replace />;
  }

  // Si es negocio y tiene pasos pendientes, forzar regreso al registro
  if (usuario.role === "negocio") {
    if (regStatus === "negocio_page3") {
      return <Navigate to="/auth" replace state={{ role: "negocio", fromOAuth: true, page: 3 }} />;
    }
    if (regStatus === "negocio_page2") {
      return <Navigate to="/auth" replace state={{ role: "negocio", fromOAuth: true, page: 2 }} />;
    }
  }

  return children;
}
