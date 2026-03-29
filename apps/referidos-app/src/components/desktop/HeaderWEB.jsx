// src/components/desktop/HeaderAlt.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Tag,
  QrCode,
  Camera,
  Shield,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "../../store/appStore";

// Lint purge (no-unused-vars): `Icon` en maps de links se renderiza via createElement (desktop/mobile nav).
export default function HeaderAlt() {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrap = useAppStore((s) => s.bootstrap);

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
      { path: "/cliente/inicio", label: "Inicio", icon: Home },
      { path: "/cliente/escanear", label: "Escanear", icon: QrCode },
      { path: "/cliente/historial", label: "Historial", icon: Tag },
      { path: "/cliente/perfil", label: "Perfil", icon: User },
    ];
  }

  if (role === "negocio") {
    links = [
      { path: "/negocio/inicio", label: "Inicio", icon: Home },
      { path: "/negocio/escanear", label: "Escanear", icon: Camera },
      { path: "/negocio/mis-promos", label: "Promos", icon: Tag },
      { path: "/negocio/perfil", label: "Perfil", icon: User },
    ];
  }

  if (role === "admin") {
    links = [
      { path: "/admin/inicio", label: "Inicio", icon: Home },
      { path: "/admin/promos", label: "Promos", icon: Tag },
      { path: "/admin/qr-validos", label: "QR", icon: QrCode },
      { path: "/admin/panel", label: "Admin", icon: Shield },
    ];
  }

  if (links.length === 0) return null;

  const isActive = (path) =>
    location.pathname === path ||
    (path === HOME_PATHS[role] &&
      location.pathname.startsWith(HOME_PATHS[role]));

  return (
    <header className="bg-[#5E30A5] text-[#FFC21C] shadow-lg">
      {/* Desktop: barra superior */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-semibold tracking-wide select-none">
          Referidos App
        </h1>
        <nav className="flex gap-6 text-sm">
          {links.map((linkItem) => {
            const active = isActive(linkItem.path);
            return (
              <Link
                key={linkItem.path}
                to={linkItem.path}
                className={`flex items-center gap-1 transition ${
                  active ? "font-bold text-white" : "opacity-80 hover:opacity-100"
                }`}
              >
                {React.createElement(linkItem.icon, { size: 18 })}
                {linkItem.label}
              </Link>
            );
          })}
        </nav>
        <span className="text-[10px] text-white/70 absolute bottom-1 right-3">
          ALPHA v0.0.1
        </span>
      </div>

      {/* Mobile: barra inferior animada */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#5E30A5] border-t border-white/20 flex justify-around py-2 z-50">
        {links.map((linkItem) => {
          const active = isActive(linkItem.path);
          return (
            <Link
              key={linkItem.path}
              to={linkItem.path}
              className="relative flex flex-col items-center text-[11px] font-medium"
            >
              <TEMP_MOTION_SPLASH_TAG
                initial={false}
                animate={{
                  scale: active ? 1.2 : 1,
                  color: active ? "#ffffff" : "#FFC21C",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {React.createElement(linkItem.icon, { size: 22 })}
              </TEMP_MOTION_SPLASH_TAG>
              <motion.span
                className="mt-1"
                animate={{
                  opacity: active ? 1 : 0.7,
                  color: active ? "#ffffff" : "#FFC21C",
                }}
              >
                {linkItem.label}
              </motion.span>

              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-[2px] w-6 h-[2px] bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
