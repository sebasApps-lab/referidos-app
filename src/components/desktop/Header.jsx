import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = React.useState(false);
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/promos", label: "Promos" },
    { path: "/qr-validos", label: "QR Válidos" },
    { path: "/scanner", label: "Lector QR" },
    { path: "/admin", label: "Admin" },
    { path: "/negocio", label: "Negocio" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#5E30A5] text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Referidos App
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-[#FFC21C] transition-colors ${
                location.pathname === link.path ? "text-[#FFC21C]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Botón de soporte */}
          <a
            href="https://wa.me/593999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-[#FFC21C] text-[#5E30A5] font-semibold px-3 py-1 rounded-xl hover:opacity-90 transition"
          >
            Soporte
          </a>
        </nav>

        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden"
        >
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-[#5E30A5] border-t border-[#FFC21C]/30">
          <nav className="flex flex-col px-4 py-3 space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuAbierto(false)}
                className={`block py-2 border-b border-white/10 hover:text-[#FFC21C] ${
                  location.pathname === link.path ? "text-[#FFC21C]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFC21C] text-[#5E30A5] text-center py-2 rounded-lg font-semibold"
            >
              Soporte
            </a>
          </nav>
        </div>
      )}

      {/* Etiqueta de versión */}
      <div className="absolute bottom-0 right-2 text-[10px] opacity-70 select-none">
        ALPHA v0.0.1
      </div>
    </header>
  );
}
