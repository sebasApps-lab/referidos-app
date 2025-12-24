// src/router/guards/RequireAuth.jsx
import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireAuth({ children }) {
  const usuario = useAppStore((state) => state.usuario);
  const bootstrap = useAppStore((state) => state.bootstrap);

  //Mientras se resuelve sesión + onboarding
  if (bootstrap || typeof usuario === "undefined") {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center">
        Cargando...
      </div>
    );
  }

  // Sin sesión
  if (usuario === null) {
    return <Navigate to="/" replace />
  }

  return children;
}
