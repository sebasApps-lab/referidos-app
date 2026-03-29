// src/components/desktop/HeaderAlt2.jsx
import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Info, Github, Heart } from "lucide-react";
import { useAppStore } from "../../store/appStore";

export default function Header({
  locAllowed,
  hideLocationBar,
  onCloseLocationBar,
  onHeaderHeightChange,
}) {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.a;

  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const onboarding = useAppStore((s) => s.onboarding);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    if (bootstrap || typeof usuario === "undefined") return;
    if (!usuario || !onboarding?.allowAccess) return;
    if (headerRef.current && onHeaderHeightChange) {
      onHeaderHeightChange(headerRef.current.offsetHeight);
    }
  }, [bootstrap, usuario, onboarding, onHeaderHeightChange]);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;

  return (
    <>
      {!hideLocationBar && locAllowed === false && (
        <div className="w-full bg-[#FFF3CD]">
          <div className="max-w-5xl mx-auto px-4 py-2">
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

      <header
        ref={headerRef}
        className="bg-[#5E30A5] text-[#FFC21C] text-center md:text-left py-4 px-6 relative z-40 hidden md:block"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm opacity-90">
            <p className="font-semibold text-white tracking-wide">
              Referidos App
            </p>
            <p className="text-[#FFC21C]/90 text-xs">
              Conecta clientes, negocios y recompensas.
            </p>
          </div>

          <div className="flex gap-6 text-[#FFC21C]/90 items-center">
            <TEMP_MOTION_SPLASH_TAG
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
              href="tel:+593995705833"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 hover:text-white transition text-sm"
            >
              <Phone size={16} />
              <span className="text-xs hidden sm:inline">Soporte</span>
            </TEMP_MOTION_SPLASH_TAG>

            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 hover:text-white transition text-sm"
            >
              <Info size={16} />
              <span className="text-xs hidden sm:inline">Acerca de</span>
            </motion.a>

            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: 10, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-white transition"
            >
              <Github size={18} />
            </motion.a>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/70">
            <span>ALPHA v0.0.1</span>
            <span>+</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart size={12} className="text-red-400" /> en Ecuador
            </span>
          </div>
        </div>

        <motion.div
          layoutId="footerBar"
          className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FFC21C] via-white to-[#FFC21C]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </header>
    </>
  );
}
