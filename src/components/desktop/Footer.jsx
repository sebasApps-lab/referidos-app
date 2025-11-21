// src/components/alt/FooterAlt.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail, Heart } from "lucide-react";

export default function FooterAlt() {
  return (
    <footer className="bg-[#5E30A5] text-[#FFC21C] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        {/* Izquierda: logo y versión */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h2 className="text-lg font-semibold tracking-wide">Referidos App</h2>
          <span className="text-xs text-white/60">ALPHA v0.0.1</span>
        </div>

        {/* Centro: navegación rápida */}
        <nav className="flex justify-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-white transition">Inicio</Link>
          <Link to="/promos" className="hover:text-white transition">Promos</Link>
          <Link to="/scanner" className="hover:text-white transition">Escanear</Link>
          <Link to="/admin" className="hover:text-white transition">Admin</Link>
        </nav>

        {/* Derecha: redes / contacto */}
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

      {/* Línea inferior */}
      <div className="bg-[#4B2488] text-white/70 text-center py-2 text-xs flex justify-center items-center gap-1">
        <span>Hecho con</span>
        <Heart size={12} className="text-red-500 animate-pulse" />
        <span>por el equipo de Referidos App</span>
      </div>
    </footer>
  );
}
