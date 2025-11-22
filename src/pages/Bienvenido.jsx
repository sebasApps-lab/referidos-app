// src/pages/Bienvenido.jsx
// Pantalla inicial. Redirige si el usuario ya está logueado.

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import homeBg from "../assets/bg-home.png";

export default function Bienvenido() {
  const usuario = useAppStore((state) => state.usuario);
  const navigate = useNavigate();

  // Redirección automática si ya ha iniciado sesión
  useEffect(() => {
    if (!usuario) return;

    if (usuario.role === "cliente") {
      navigate("/cliente/inicio");
    } else if (usuario.role === "negocio") {
      navigate("/negocio/inicio");
    } else if (usuario.role === "admin") {
      navigate("/admin/inicio");
    }
  }, [usuario, navigate]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-white p-6">

      {/* Título */}
      <h1 className="text-5xl font-semibold text-[#5E30A5] mt-12 mb-6 text-center">
        REFERIDOS<br />APP
      </h1>

      {/* Imagen */}
      <div
        className="w-54 h-54 mb-5 rounded-xl bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${homeBg})` }}
      />

      {/* Botón REGISTRARSE */}
      <Link
        to="/registro"
        className="bg-[#5E30A5] text-white w-full max-w-xs py-2 rounded-md text-center font-semibold shadow-md"
      >
        REGISTRARSE
      </Link>

      {/* YA TENGO UNA CUENTA */}
      <Link
        to="/login"
        className="mt-6 text-sm text-gray-700 tracking-wide"
      >
        YA TENGO UNA CUENTA.
      </Link>

      {/* Versión */}
      <div className="absolute bottom-2 right-2 text-xs opacity-60">
        ALPHA v0.0.1
      </div>
    </div>
  );
}
