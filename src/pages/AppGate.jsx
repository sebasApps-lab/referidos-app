// src/pages/AppGate.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export default function AppGate() {
  const navigate = useNavigate();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  useEffect(() => {
    // 1)Resolver sesión + onboarding si aún no existe
    if (typeof usuario === "undefined") {
      bootstrapAuth({ force: false });
      return;
    }

    // 2) Si no hay sesión → Bienvenido
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
  }, [usuario, onboarding, bootstrapAuth, navigate]);

  // Loader simple
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#5E30A5] text-white">
      Cargando…
    </div>
  );
}
