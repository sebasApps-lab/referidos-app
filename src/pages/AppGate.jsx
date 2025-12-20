// src/pages/AppGate.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export default function AppGate() {
  const navigate = useNavigate();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  useEffect(() => {
    // 1) Si aún no se resolvió el bootstrap, dispararlo
    if (typeof usuario === "undefined") {
      bootstrapAuth();
      return;
    }

    // 2) Si no hay sesión, fuera
    if (!usuario) {
      navigate("/", { replace: true });
      return;
    }

    // 3) Si hay sesión pero no acceso (onboarding incompleto)
    if (!onboarding?.allowAccess) {
      navigate("/auth", { replace: true });
      return;
    }

    // 4) Acceso válido → redirigir por rol
    if (usuario.role === "admin") {
      navigate("/admin/inicio", { replace: true });
    } else if (usuario.role === "negocio") {
      navigate("/negocio/inicio", { replace: true });
    } else {
      navigate("/cliente/inicio", { replace: true });
    }
  }, [usuario, onboarding, bootstrap, bootstrapAuth, navigate]);

  // Loader simple
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5E30A5] text-white">
      Cargando…
    </div>
  );
}
