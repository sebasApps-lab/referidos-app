// src/router/guards/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireAuth({ children }) {
  const usuario = useAppStore((state) => state.usuario);
  const bootstrap = useAppStore((state) => state.bootsrap);

  //Mientras se resuelve bootstrap/onboarding, no redirigir
  if (bootstrap || typeof usuario === "undefined") {
    return null; // o un leader para mostrar algo
  }

  // Sin sesión/autorización
  if (usuario === null) {
    return <Navigate to="/" replace />
  }

  return children;
}
