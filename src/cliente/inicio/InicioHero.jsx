import React from "react";
import { motion } from "framer-motion";
import { Compass, Link2, Rocket, Crown } from "lucide-react";
import {
  formatCompactNumber,
  getTierJourney,
  getTierProgress,
} from "../services/clienteUI";
import SearchBar from "../../components/ui/SearchBar";

export default function InicioHero({
  usuario,
  searchValue,
  onSearchChange,
  onSearchFilters,
  hideSearch = false,
}) {
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-0"
      data-hero-container
    >
      <div className="hero-bleed text-white shadow-sm">
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-3">
          <div className="relative h-5 w-full rounded-full bg-white/15 overflow-hidden">
            <div className="absolute inset-0">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.85), #FFFFFF)",
                }}
              />
            </div>
            <div className="relative z-10 flex h-full items-center justify-end pr-3 text-[11px] font-medium text-white/85">
              {formatCompactNumber(points)} / {formatCompactNumber(nextGoal)}
            </div>
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
            <div className="relative flex justify-center -top-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#E5D6FF] -mt-0.5">
                <span className="flex items-center gap-2 text-[11px] font-semibold text-[#E5D6FF]">
                  Referidos
                </span>
                <span className="text-[11px] font-semibold text-[#E5D6FF]">
                  {referidos}
                </span>
              </div>
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

          <div className="mt-4 flex justify-center">
            <p className="max-w-[275px] text-center text-[18px] font-light leading-snug text-white">
              Encuentra promos y suma puntos sin complicarte.
            </p>
          </div>

          <div
            className="mt-5"
            data-hero-searchbar
            aria-hidden={hideSearch}
            style={{ visibility: hideSearch ? "hidden" : "visible" }}
          >
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onFilters={onSearchFilters}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
