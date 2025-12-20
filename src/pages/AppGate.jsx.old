// src/pages/AppGate.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export default function AppGate() {
  const navigate = useNavigate();
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);

  useEffect(() => {
    if (bootstrap || typeof usuario === "undefined") return;
    if (!usuario) {
      navigate("/", { replace: true });
      return;
    }
    if (usuario.role === "admin") navigate("/admin/inicio", { replace: true });
    else if (usuario.role === "negocio") navigate("/negocio/inicio", { replace: true });
    else navigate("/cliente/inicio", { replace: true });
  }, [usuario, bootstrap, navigate]);

  return null; // loader opcional
}
