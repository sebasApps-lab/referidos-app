// src/router/guards/RequireRole.jsx
import { Navigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

export default function RequireRole({ children, role }) {
  const usuario = useAppStore((state) => state.usuario);
  const bootstrap = useAppStore((state) => state.bootstrap);
  const onboarding = useAppStore((state) => state.onboarding);

  //Esperar bootstrap
  if (bootstrap || typeof usuario === "undefined") {
    return(
      <div className="min-h-dvh safe-area flex flex-col items-center justify-center">
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

  //Rol incorrecto → redirigir al home de su rol real
  if (usuario.role !== role) {
    return <Navigate to="/app" replace />
  }

  return children;
}
