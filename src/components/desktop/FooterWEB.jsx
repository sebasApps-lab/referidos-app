// src/components/footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail, Heart } from "lucide-react";
import { useAppStore } from "../../store/appStore";

export default function Footer() {
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrap = useAppStore((s) => s.bootstrap);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;
  if (!usuario.role) return null;

  const role = usuario?.role || "cliente";

  let links = [];
  if (role === "cliente") {
    links = [
      { path: "/cliente/inicio", label: "Inicio" },
      { path: "/cliente/escanear", label: "Escanear" },
      { path: "/cliente/historial", label: "Historial" },
      { path: "/cliente/perfil", label: "Perfil" },
    ];
  }

  if (role === "negocio") {
    links = [
      { path: "/negocio/inicio", label: "Inicio" },
      { path: "/negocio/escanear", label: "Escanear" },
      { path: "/negocio/mis-promos", label: "Promos" },
      { path: "/negocio/perfil", label: "Perfil" },
    ];
  }

  if (role === "admin") {
    links = [
      { path: "/admin/inicio", label: "Inicio" },
      { path: "/admin/promos", label: "Promos" },
      { path: "/admin/qr-validos", label: "QR" },
      { path: "/admin/panel", label: "Admin" },
    ];
  }

  if (links.length === 0) return null;

  return (
    <footer className="bg-[#5E30A5] text-[#FFC21C] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h2 className="text-lg font-semibold tracking-wide">Referidos App</h2>
          <span className="text-xs text-white/60">ALPHA v0.0.1</span>
        </div>

        <nav className="flex justify-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className="hover:text-white transition">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-center sm:justify-end gap-4">
          <a
            href="mailto:soporte@referidosapp.ec"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Mail size={16} />
            <span className="text-sm">Soporte</span>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <Github size={18} />
          </a>
        </div>
      </div>

      <div className="bg-[#4B2488] text-white/70 text-center py-2 text-xs flex justify-center items-center gap-1">
        <span>Hecho con</span>
        <Heart size={12} className="text-red-500 animate-pulse" />
        <span>por el equipo de Referidos App</span>
      </div>
    </footer>
  );
}
