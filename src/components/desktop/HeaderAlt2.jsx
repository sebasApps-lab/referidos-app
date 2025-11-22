// src/components/desktop/Header.jsx
import { motion } from "framer-motion";
import { Phone, Info, Github, Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#5E30A5] text-[#FFC21C] text-center md:text-left py-4 px-6 relative z-40 hidden md:block">
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
          <motion.a
            href="tel:+593995705833"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 hover:text-white transition text-sm"
          >
            <Phone size={16} />
            <span className="text-xs hidden sm:inline">Soporte</span>
          </motion.a>

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
          <span>•</span>
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
  );
}
