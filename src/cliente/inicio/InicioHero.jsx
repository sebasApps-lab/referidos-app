import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  formatCompactNumber,
  getTierMeta,
  getTierProgress,
} from "../services/clienteUI";

export default function InicioHero({ usuario, onExplore }) {
  const tier = getTierMeta(usuario);
  const { points, progress } = getTierProgress(usuario);
  const nextTierLabel = "Conector";

  const handleExplore = () => {
    if (onExplore) {
      onExplore();
      return;
    }
    const target = document.getElementById("cliente-promos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-0"
    >
      <div className="relative bg-white border-b border-[#E9E2F7] rounded-b-2xl shadow-sm">
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-5 pt-[5px]">
          <div className="h-2 w-full rounded-full bg-[#F3EEFF] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(progress * 100)}%`,
                background: "#5E30A5",
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Sparkles size={14} />
              {nextTierLabel}
            </div>
            <div className="text-lg font-semibold text-[#2F1A55]">
              {formatCompactNumber(points)}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5E30A5]">
              <Sparkles size={14} />
              {tier.label}
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center text-center">
            <div className="text-2xl font-semibold text-[#5E30A5]">
              {formatCompactNumber(usuario?.referidosCount || 0)}
            </div>
            <div className="text-xs text-slate-500">
              Referidos acumulados
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
            >
              Explorar promociones
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
