// src/pages/Bienvenido.jsx
// Pantalla inicial splash. Redirige si el usuario ya está logueado.

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
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#5E30A5] via-[#6B37B6] to-[#5E30A5] p-6 text-white">
      <div
        className={`w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl p-8 transition-all duration-600 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionTimingFunction: "ease" }}
      >
        <h1 className="text-5xl font-semibold text-center mb-4 leading-[1.1]">
          REFERIDOS
          <br />
          APP
        </h1>

        <div
          className="w-full h-48 mb-6 rounded-2xl bg-center bg-no-repeat bg-contain transition-transform duration-700"
          style={{
            backgroundImage: `url(${homeBg})`,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
          }}
        />

        <div className="flex flex-col gap-4">
          <Link
            to="/tipo"
            className="bg-white text-[#5E30A5] w-full py-2.5 rounded-lg text-center font-semibold shadow-lg shadow-[#0000002a] active:scale-[0.99] transition-transform"
          >
            REGISTRARSE
          </Link>

          <Link
            to="/login"
            className="text-sm text-white/80 text-center tracking-wide underline underline-offset-4"
          >
            YA TENGO UNA CUENTA.
          </Link>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-white/70">
        ALPHA v0.0.1
      </div>
    </div>
  );
}
