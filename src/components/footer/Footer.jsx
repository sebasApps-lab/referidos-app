// src/components/footer/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Tag,
  QrCode,
  Camera,
  Shield,
  User
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "../../store/appStore";

export default function Footer() {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);

  const role = usuario?.role || "cliente";
  const notiCount =
    usuario?.notificaciones?.length ||
    usuario?.notificacionesCount ||
    0;

  // RUTAS INICIO POR ROL
  const HOME_PATHS = {
    cliente: "/cliente/inicio",
    negocio: "/negocio/inicio",
    admin: "/admin/inicio",
  };

  // Marca activo cuando coincide EXACTO o empieza por el home real
  const isActive = (path) =>
    location.pathname === path ||
    (path === HOME_PATHS[role] &&
      location.pathname.startsWith(HOME_PATHS[role]));

  // BOTONES POR ROL
  let linksMobile = [];

  if (role === "cliente") {
    linksMobile = [
      { path: "/cliente/inicio", label: "Inicio", Icon: Home },
      { path: "/cliente/escanear", label: "Escanear", Icon: QrCode },
      { path: "/cliente/historial", label: "Historial", Icon: Tag, badge: notiCount },
      { path: "/cliente/perfil", label: "Perfil", Icon: User },
    ];
  }

  if (role === "negocio") {
    linksMobile = [
      { path: "/negocio/inicio", label: "Inicio", Icon: Home },
      { path: "/negocio/escanear", label: "Escanear", Icon: Camera },
      { path: "/negocio/mis-promos", label: "Promos", Icon: Tag },
      { path: "/negocio/perfil", label: "Perfil", Icon: User },
    ];
  }

  if (role === "admin") {
    linksMobile = [
      { path: "/admin/inicio", label: "Inicio", Icon: Home },
      { path: "/admin/promos", label: "Promos", Icon: Tag },
      { path: "/admin/qr-validos", label: "QR", Icon: QrCode },
      { path: "/admin", label: "Admin", Icon: Shield },
    ];
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#5E30A5] border-t border-white/20 flex justify-around py-2 z-50">
      {linksMobile.map(({ path, label, Icon, badge }) => {
        const active = isActive(path);

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
                color: active ? "#FFFFFF" : "#CBB3F0",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Icon size={22} />
            </motion.div>

            <motion.span
              className="mt-1"
              animate={{
                opacity: active ? 1 : 0.7,
                color: active ? "#FFFFFF" : "#CBB3F0",
              }}
            >
              {label}
            </motion.span>

            {active && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-[2px] w-6 h-[2px] bg-white rounded-full"
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              />
            )}

            {badge > 0 && (
              <span className="absolute -top-1 right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-red-500 rounded-full shadow">
                {badge > 99 ? "99+" : badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
