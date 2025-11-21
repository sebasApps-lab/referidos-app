// src/components/Header.jsx

import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Tag,
  QrCode,
  Camera,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio", icon: Home },
    { path: "/promos", label: "Promos", icon: Tag },
    { path: "/qr-validos", label: "QR", icon: QrCode },
    { path: "/scanner", label: "Escanear", icon: Camera },
    { path: "/admin", label: "Admin", icon: Shield },
  ];

  return (
    <header className="bg-[#5E30A5] text-[#FFC21C] shadow-lg">
      {/* Desktop: barra superior */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-semibold tracking-wide select-none">
          Referidos App
        </h1>
        <nav className="flex gap-6 text-sm">
          {links.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1 transition ${
                  active ? "font-bold text-white" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Icon size={18} />
                {label}
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
        {links.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="relative flex flex-col items-center text-[11px] font-medium"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.2 : 1,
                  color: active ? "#ffffff" : "#FFC21C",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon size={22} />
              </motion.div>
              <motion.span
                className="mt-1"
                animate={{
                  opacity: active ? 1 : 0.7,
                  color: active ? "#ffffff" : "#FFC21C",
                }}
              >
                {label}
              </motion.span>

              {/* Indicador animado debajo del icono activo */}
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
