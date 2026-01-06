// src/pages/AppGate.jsx
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export default function AppGate({ publicElement = null }) {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  useEffect(() => {
    // 1) Resolver session + onboarding si aun no existe
    if (typeof usuario === "undefined") {
      bootstrapAuth({ force: false });
    }
  }, [usuario, bootstrapAuth]);

  if (bootstrap || typeof usuario === "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#5E30A5] text-white">
        Cargando...
      </div>
    );
  }

  if (!usuario) {
    return publicElement ?? <Navigate to="/" replace />;
  }

  if (!onboarding?.allowAccess) {
    if (publicElement) {
      if (location.pathname === "/") {
        return <Navigate to="/auth" replace />;
      }
      return publicElement;
    }
    return <Navigate to="/auth" replace />;
  }

  if (publicElement) {
    return <Navigate to="/app" replace />;
  }

  if (usuario.role === "admin") {
    return <Navigate to="/admin/inicio" replace />;
  }
  if (usuario.role === "negocio") {
    return <Navigate to="/negocio/inicio" replace />;
  }
  return <Navigate to="/cliente/inicio" replace />;
}
