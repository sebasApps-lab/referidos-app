// src/components/header/Header.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAppStore } from "../../store/appStore";

export default function Header({
  locAllowed,
  hideLocationBar,
  onCloseLocationBar,
  onOpenMenu,
  onHeaderHeightChange,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const onboarding = useAppStore((s) => s.onboarding);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;
  if (!usuario.role) return null;

  const role = usuario?.role || "cliente";

  const HOME_PATHS = {
    cliente: "/cliente/inicio",
    negocio: "/negocio/inicio",
    admin: "/admin/inicio",
  };

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
      { path: "/admin/qr-validos", label: "QR Válidos" },
      { path: "/admin/panel", label: "Admin" },
    ];
  }

  if (links.length === 0) return null;

  const homePath = HOME_PATHS[role] || "/";
  const inlineMenuEnabled = typeof onOpenMenu !== "function";

  const isActive = (path) =>
    location.pathname === path ||
    (path === homePath && location.pathname.startsWith(homePath));

  useLayoutEffect(() => {
    if (headerRef.current && onHeaderHeightChange) {
      onHeaderHeightChange(headerRef.current.offsetHeight);
    }
  });

  const handleMenuClick = () => {
    if (inlineMenuEnabled) {
      setMenuAbierto((prev) => !prev);
      return;
    }
    onOpenMenu?.();
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-[#5E30A5] text-white shadow-md"
    >
      {!hideLocationBar && locAllowed === false && (
        <div className="w-full bg-[#FFF3CD]">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between bg-[#FFF8D8] text-[#6B5E00] rounded-lg px-3 py-2 shadow-sm">
              <span className="text-xs sm:text-sm">
                La app usa tu ubicacion para mostrar promos cercanas.
              </span>
              <button
                onClick={onCloseLocationBar}
                className="text-sm leading-none"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to={homePath} className="text-xl font-bold tracking-wide">
          Referidos App
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-[#FFC21C] transition-colors ${
                isActive(link.path) ? "text-[#FFC21C]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://wa.me/593999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-[#FFC21C] text-[#5E30A5] font-semibold px-3 py-1 rounded-xl hover:opacity-90 transition"
          >
            Soporte
          </a>
        </nav>

        <button onClick={handleMenuClick} className="md:hidden">
          {inlineMenuEnabled && menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {inlineMenuEnabled && menuAbierto && (
        <div className="md:hidden bg-[#5E30A5] border-t border-[#FFC21C]/30">
          <nav className="flex flex-col px-4 py-3 space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuAbierto(false)}
                className={`block py-2 border-b border-white/10 hover:text-[#FFC21C] ${
                  isActive(link.path) ? "text-[#FFC21C]" : ""
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

      <div className="absolute bottom-0 right-2 text-[10px] opacity-70 select-none">
        ALPHA v0.0.1
      </div>
    </header>
  );
}
