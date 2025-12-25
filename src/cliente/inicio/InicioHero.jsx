import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Link2, Rocket, Crown } from "lucide-react";
import {
  formatCompactNumber,
  getTierJourney,
  getTierProgress,
} from "../services/clienteUI";

export default function InicioHero({ usuario, onExplore }) {
  const { points, progress, nextGoal } = getTierProgress(usuario);
  const { current, next, currentKey, nextKey } = getTierJourney(usuario);
  const iconMap = {
    explorador: Compass,
    conector: Link2,
    impulsor: Rocket,
    embajador: Crown,
  };
  const CurrentIcon = iconMap[currentKey] || Compass;
  const NextIcon = iconMap[nextKey] || Link2;
  const referidos = Math.min(99, Number(usuario?.referidosCount || 0));
  const referidosDigits = String(referidos).padStart(2, "0").split("");

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
      <div className="relative bg-[#5E30A5] text-white rounded-b-2xl shadow-sm">
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-5 pt-[15px]">
          <div className="h-2.5 w-full rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(progress * 100)}%`,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.85), #FFFFFF)",
              }}
            />
          </div>

          <div className="mt-3 grid grid-cols-3 items-end gap-3">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <CurrentIcon size={14} />
                {current.label}
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                Actual
              </span>
            </div>
            <div className="text-center text-xs text-white/80">
              {formatCompactNumber(points)} / {formatCompactNumber(nextGoal)}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <NextIcon size={14} />
                {next.label}
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                Siguiente
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="scoreboard">
              {referidosDigits.map((digit, index) => (
                <div key={`${digit}-${index}`} className="scoreboard-digit">
                  <span className="scoreboard-digit-text">{digit}</span>
                </div>
              ))}
            </div>
            <div className="scoreboard-label">REFERIDOS</div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#5E30A5] shadow-sm transition hover:bg-white/90"
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
