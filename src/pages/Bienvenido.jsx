// src/pages/Bienvenido.jsx
// Pantalla inicial. Redirige si el usuario ya está logueado.

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import homeBg from "../assets/bg-home.png";

export default function Bienvenido() {
  const usuario = useAppStore((state) => state.usuario);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!usuario) return;

    if (usuario.role === "cliente") navigate("/cliente/inicio");
    else if (usuario.role === "negocio") navigate("/negocio/inicio");
    else if (usuario.role === "admin") navigate("/admin/inicio");
  }, [usuario, navigate]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white p-6">
      <h1
        className={`text-5xl font-semibold text-[#5E30A5] mt-12 mb-6 text-center transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        REFERIDOS
        <br />
        APP
      </h1>

      <div
        className={`w-54 h-54 mb-5 rounded-xl bg-center bg-no-repeat bg-contain transition-transform duration-800 ${
          mounted ? "translate-y-0" : "translate-y-5"
        }`}
        style={{ backgroundImage: `url(${homeBg})` }}
      />

      <Link
        to="/tipo"
        className={`bg-[#5E30A5] text-white w-full max-w-xs py-2 rounded-md text-center font-semibold shadow-md transition-transform duration-400 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        REGISTRARSE
      </Link>

      <Link
        to="/login"
        className={`mt-6 text-sm text-gray-700 tracking-wide transition-all duration-400 ${
          mounted ? "opacity-90 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        YA TENGO UNA CUENTA.
      </Link>

      <div className="absolute bottom-2 right-2 text-xs opacity-60">
        ALPHA v0.0.1
      </div>
    </div>
  );
}
