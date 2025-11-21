// src/components/Footer.jsx

import { motion } from "framer-motion";
import { Phone, Info, Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#5E30A5] text-[#FFC21C] text-center md:text-left py-4 px-6 relative z-40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Información general */}
        <div className="text-sm opacity-90">
          <p className="font-semibold text-white tracking-wide">
            Referidos App
          </p>
          <p className="text-[#FFC21C]/90 text-xs">
            Conecta clientes, negocios y recompensas.
          </p>
        </div>

        {/* Íconos de acción */}
        <div className="flex gap-6 text-[#FFC21C]/90">
          <motion.a
            href="tel:+593987654321"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Phone size={16} />
            <span className="text-xs hidden sm:inline">Soporte</span>
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Info size={16} />
            <span className="text-xs hidden sm:inline">Acerca de</span>
          </motion.a>

          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-white transition"
          >
            <Github size={18} />
          </motion.a>
        </div>

        {/* Versión y créditos */}
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span>ALPHA v0.0.1</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Hecho con <Heart size={12} className="text-red-400" /> en Ecuador
          </span>
        </div>
      </div>

      {/* Línea decorativa animada */}
      <motion.div
        layoutId="footerBar"
        className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FFC21C] via-white to-[#FFC21C]"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </footer>
  );
}
