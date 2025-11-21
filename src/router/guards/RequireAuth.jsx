// src/router/guards/RequireAuth.jsx

import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireAuth({ children }) {
  const usuario = useAppStore((state) => state.usuario);

  // Si no hay usuario → bloquear ruta
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
