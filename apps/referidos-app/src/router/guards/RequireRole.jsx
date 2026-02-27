// src/router/guards/RequireRole.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireRole({ children, role }) {
  const usuario = useAppStore((state) => state.usuario);
  const bootstrap = useAppStore((state) => state.bootstrap);
  const onboarding = useAppStore((state) => state.onboarding);
  const location = useLocation();
  const termsAccepted = Boolean(onboarding?.usuario?.terms_accepted);
  const privacyAccepted = Boolean(onboarding?.usuario?.privacy_accepted);
  const legalAccepted = termsAccepted && privacyAccepted;

  //Esperar bootstrap
  if (bootstrap || typeof usuario === "undefined") {
    return(
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  //Sin sesión
  if (usuario === null) {
    return <Navigate to="/" replace />;
  }
  
  //Falta completar onboarding
  if (!onboarding?.allowAccess) {
    return <Navigate to="/auth" replace />
  }
  
  if (
    (usuario.role === "cliente" || usuario.role === "negocio") &&
    !legalAccepted
  ) {
    return <Navigate to="/auth" replace />
  }

  //Rol incorrecto → redirigir al home de su rol real
  if (usuario.role !== role) {
    return <Navigate to="/app" replace />
  }

  if (role === "admin") {
    const refreshKey = new URLSearchParams(location.search || "").get("__pr") || "";
    return (
      <React.Fragment key={`${location.pathname}|${refreshKey}`}>
        {children}
      </React.Fragment>
    );
  }

  return children;
}
