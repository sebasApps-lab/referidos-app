// src/router/guards/RequireAuth.jsx
import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import useMfaGate from "../../hooks/useMfaGate";

export default function RequireAuth({ children }) {
  const usuario = useAppStore((state) => state.usuario);
  const bootstrap = useAppStore((state) => state.bootstrap);
  const { blockAccess } = useMfaGate();

  //Mientras se resuelve sesión + onboarding
  if (bootstrap || typeof usuario === "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  // Sin sesión
  if (usuario === null) {
    return <Navigate to="/" replace />
  }

  if (blockAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verificando seguridad...
      </div>
    );
  }

  return children;
}
