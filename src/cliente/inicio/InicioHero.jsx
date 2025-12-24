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
      <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/90 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div
          className="absolute -top-10 -right-12 h-40 w-40 rounded-full opacity-30"
          style={{ background: tier.glow }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-transparent" />

        <div className="relative z-10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                Hola, {displayName}
              </p>
              <h1
                className="mt-2 text-2xl font-semibold text-[#1D1B1A] leading-snug"
                style={{ fontFamily: "var(--cliente-heading)" }}
              >
                Encuentra promos relevantes y suma puntos en minutos.
              </h1>
            </div>

            <div
              className="flex flex-col items-center gap-2 rounded-3xl border border-white/60 bg-white/80 px-4 py-3 text-center shadow-sm"
              style={{ minWidth: 140 }}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                Tu tier
              </span>
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                style={{
                  background: `${tier.glow}66`,
                  color: tier.accent,
                  border: `1px solid ${tier.glow}`,
                }}
              >
                <Sparkles size={14} />
                {tier.label}
              </div>
              <span className="text-xs text-black/40">
                {formatCompactNumber(points)} / {formatCompactNumber(nextGoal)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/70 px-4 py-3">
              <div className="text-2xl font-semibold text-[#E07A5F]">
                {formatCompactNumber(usuario?.referidosCount || 0)}
              </div>
              <div className="text-xs text-black/50">
                Referidos <br /> acumulados
              </div>
            </div>
            <div className="flex-1 min-w-[180px]">
              <div className="flex items-center justify-between text-[11px] text-black/45">
                <span>Progreso al siguiente tier</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-black/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round(progress * 100)}%`,
                    background: `linear-gradient(90deg, ${tier.accent}, #E07A5F)`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#1D1B1A] px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
            >
              Explorar promociones
              <ArrowRight size={16} />
            </button>
            <span className="text-xs text-black/45">
              Descubre ofertas que coinciden con tu zona y gustos.
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
