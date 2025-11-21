// src/router/guards/RequireRole.jsx

import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireRole({ children, role }) {
  const usuario = useAppStore((state) => state.usuario);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Verificar rol correcto
  if (usuario.role !== role) {
    if (usuario.role === "cliente")
      return <Navigate to="/cliente/home" replace />;

    if (usuario.role === "negocio")
      return <Navigate to="/negocio/home" replace />;

    if (usuario.role === "admin")
      return <Navigate to="/admin/home" replace />;
  }

  return children;
}
