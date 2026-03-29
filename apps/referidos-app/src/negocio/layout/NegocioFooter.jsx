import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutGrid, QrCode, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "../../store/appStore";

// Lint purge (no-unused-vars): `Icon` del map de links se renderiza via createElement (bloque footer negocio).
export default function NegocioFooter() {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const bootstrap = useAppStore((s) => s.bootstrap);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;
  if (usuario?.role !== "negocio") return null;

  const links = [
    { path: "/negocio/inicio", label: "Inicio", Icon: Home },
    { path: "/negocio/escanear", label: "Escanear", Icon: QrCode },
    { path: "/negocio/gestionar", label: "Gestionar", Icon: LayoutGrid },
    { path: "/negocio/perfil", label: "Perfil", Icon: User },
  ];

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/negocio/inicio" && location.pathname.startsWith("/negocio/inicio"));

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#E9E2F7] bg-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around py-2">
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
                  scale: active ? 1.15 : 1,
                  color: active ? "#5E30A5" : "#94A3B8",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {React.createElement(linkItem.Icon, { size: 20 })}
              </TEMP_MOTION_SPLASH_TAG>
              <motion.span
                className="mt-1"
                animate={{
                  opacity: active ? 1 : 0.7,
                  color: active ? "#5E30A5" : "#94A3B8",
                }}
              >
                {linkItem.label}
              </motion.span>
              {active && (
                <motion.div
                  layoutId="negocioActiveIndicator"
                  className="absolute -bottom-1 h-1 w-8 rounded-full bg-[#5E30A5]"
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
