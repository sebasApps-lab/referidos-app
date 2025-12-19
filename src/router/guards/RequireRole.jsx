// src/router/guards/RequireRole.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireRole({ children, role }) {
  const usuario = useAppStore((state) => state.usuario);
  const bootstrap = useAppStore((state) => state.bootstrap)

  //Mientras se resuelve bootstrap/onboarding, no redirigir
  if (bootstrap || typeof usuario === "undefined") {
    return null; //o un loader
  }

  //Sin sesión/autorización
  if (usuario === null) {
    return <Navigate to="/" replace />;
  }
  
  //Falta completar onboarding
  if (usuario.registro_estado !== "completo") {
    return <Navigate to="/auth" replace />
  }

  //Rol incorrecto → redirigir al home de su rol real
  if (usuario.role !== role) {
    if (usuario.role === "cliente") return <Navigate to="/cliente/inicio" replace />;
    if (usuario.role === "negocio") return <Navigate to="/negocio/inicio" replace />;
    if (usuario.role === "admin") return <Navigate to="/admin/inicio" replace />;
    return <Navigate to="/" replace />
  }

  return children;
}
