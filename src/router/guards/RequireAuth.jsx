// src/router/guards/RequireAuth.jsx

import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireAuth({ children }) {
  const usuario = useAppStore((state) => state.usuario);

  // Si no hay usuario → bloquear ruta
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Falta rol o registro incompleto → forzar onboarding
  if (!usuario.role || usuario.registro_estado !== "completo") {
    if (usuario?.role === "negocio") {
      return <Navigate to="/registro" replace state={{ role: "negocio", fromOAuth: true, page: 2 }} />;
    }
    return <Navigate to="/tipo" replace state={{ fromOAuth: true }} />;
  }

  return children;
}
