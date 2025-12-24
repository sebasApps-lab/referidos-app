import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  formatCompactNumber,
  getTierMeta,
  getTierProgress,
  getUserShortName,
} from "../services/clienteUI";

export default function InicioHero({ usuario, onExplore }) {
  const tier = getTierMeta(usuario);
  const { points, nextGoal, progress } = getTierProgress(usuario);
  const displayName = getUserShortName(usuario);

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
      className="px-4 pt-6"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white shadow-sm">
        <div className="relative z-10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#5E30A5]/70">
                Hola, {displayName}
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-[#2F1A55] leading-snug">
                Encuentra promos y suma puntos sin complicarte.
              </h1>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Tu tier
              </span>
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                style={{
                  background: "#F3EEFF",
                  color: tier.accent,
                }}
              >
                <Sparkles size={14} />
                {tier.label}
              </div>
              <span className="text-xs text-slate-400">
                {formatCompactNumber(points)} / {formatCompactNumber(nextGoal)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
              <div className="text-2xl font-semibold text-[#5E30A5]">
                {formatCompactNumber(usuario?.referidosCount || 0)}
              </div>
              <div className="text-xs text-slate-500">
                Referidos <br /> acumulados
              </div>
            </div>
            <div className="flex-1 min-w-[180px]">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Progreso al siguiente tier</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-[#F3EEFF] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round(progress * 100)}%`,
                    background: "#5E30A5",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
            >
              Explorar promociones
              <ArrowRight size={16} />
            </button>
            <span className="text-xs text-slate-500">
              Descubre ofertas cerca de ti y actua rapido.
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
