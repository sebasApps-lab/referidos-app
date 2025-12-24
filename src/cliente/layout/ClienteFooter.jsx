import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, QrCode, Tag, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "../../store/appStore";

export default function ClienteFooter() {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrap = useAppStore((s) => s.bootstrap);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;
  if (usuario?.role !== "cliente") return null;

  const notiCount =
    usuario?.notificaciones?.length ||
    usuario?.notificacionesCount ||
    0;

  const links = [
    { path: "/cliente/inicio", label: "Inicio", Icon: Home },
    { path: "/cliente/escanear", label: "Escanear", Icon: QrCode },
    { path: "/cliente/historial", label: "Historial", Icon: Tag, badge: notiCount },
    { path: "/cliente/perfil", label: "Perfil", Icon: User },
  ];

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/cliente/inicio" && location.pathname.startsWith("/cliente/inicio"));

  return (
    <nav
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="flex items-center gap-6 px-5 py-3 rounded-[28px] shadow-lg border border-white/60 backdrop-blur"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.86))",
        }}
      >
        {links.map(({ path, label, Icon, badge }) => {
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
                  color: active ? "#1D1B1A" : "#6B6B6B",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Icon size={20} />
              </motion.div>
              <motion.span
                className="mt-1"
                animate={{
                  opacity: active ? 1 : 0.7,
                  color: active ? "#1D1B1A" : "#6B6B6B",
                }}
              >
                {label}
              </motion.span>
              {active && (
                <motion.div
                  layoutId="clienteActiveIndicator"
                  className="absolute -bottom-1 h-1 w-8 rounded-full"
                  style={{ background: "#E07A5F" }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                />
              )}
              {badge > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-[#E07A5F] rounded-full shadow">
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
