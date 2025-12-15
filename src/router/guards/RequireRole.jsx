// src/router/guards/RequireRole.jsx

import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireRole({ children, role }) {
  const usuario = useAppStore((state) => state.usuario);

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Falta rol: enviar a AuthHub con chooser
  if (!usuario.role) {
    return <Navigate to="/auth" replace state={{ openChoice: true }} />;
  }

  // Falta completar onboarding: bloquea entrada a dashboard
  if (usuario.role === "cliente" && usuario.registro_estado !== "completo") {
    return <Navigate to="/auth" replace />;
  }

  if (usuario.role === "negocio" && usuario.registro_estado !== "completo") {
    return <Navigate to="/auth" replace />;
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

  return children;
}
