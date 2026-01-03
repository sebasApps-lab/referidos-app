import React from "react";
import { motion } from "framer-motion";
import { BarChart3, LayoutGrid, MapPin, PlusCircle, Store } from "lucide-react";
import { Link } from "react-router-dom";
import negocioFallback from "../../assets/bg-home.png";
import {
  formatCompactNumber,
  getNegocioDireccion,
  getNegocioImagen,
  getNegocioNombre,
  getNegocioPlanMeta,
  getNegocioReferidos,
  getNegocioSector,
} from "../services/negocioUI";

export default function InicioHero({ usuario, negocio, stats }) {
  const planMeta = getNegocioPlanMeta({ negocio, usuario });
  const nombre = getNegocioNombre({ negocio, usuario });
  const sector = getNegocioSector({ negocio, usuario });
  const direccion = getNegocioDireccion({ negocio, usuario });
  const imagen = getNegocioImagen({ negocio, usuario }) || negocioFallback;
  const referidos = getNegocioReferidos({ negocio, usuario });
  const hasImage = Boolean(imagen);
  const safeStats = stats || { activas: 0, pendientes: 0, inactivas: 0 };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-0"
      data-hero-container
    >
      <div className="hero-bleed text-white shadow-sm">
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-5 pt-2">
          <div className="relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 10% -20%, rgba(255,255,255,0.35), transparent 58%)",
              }}
            />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 rounded-2xl border border-white/20 bg-white/10 overflow-hidden flex items-center justify-center">
                  {hasImage ? (
                    <img
                      src={imagen}
                      alt={`Logo de ${nombre}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Store size={28} className="text-white/70" />
                  )}
                  <span
                    className="absolute -bottom-1 -right-1 h-6 min-w-[24px] rounded-full flex items-center justify-center text-[10px] font-semibold"
                    style={{ background: planMeta.accent, color: "white" }}
                  >
                    {planMeta.badge}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/65">
                    Negocio
                  </span>
                  <h1 className="mt-1 text-xl font-semibold leading-tight text-white">
                    {nombre}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-white/75">
                    <span className="inline-flex items-center gap-1">
                      <Store size={12} />
                      {sector}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} />
                      {direccion}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-2 text-right">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">
                    Plan {planMeta.label}
                  </span>
                  <span className="text-xs text-white/70">
                    {formatCompactNumber(referidos)} referidos
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px] text-white/75 sm:hidden">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">
                  Plan {planMeta.label}
                </span>
                <span className="text-xs text-white/70">
                  {formatCompactNumber(referidos)} referidos
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Activas
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {safeStats.activas}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Pendientes
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {safeStats.pendientes}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Inactivas
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {safeStats.inactivas}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  to="/negocio/gestionar"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-[#5E30A5] shadow-sm transition hover:bg-[#F3EEFF]"
                >
                  <PlusCircle size={14} />
                  Crear promo
                </Link>
                <Link
                  to="/negocio/gestionar"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white"
                >
                  <LayoutGrid size={14} />
                  Gestionar
                </Link>
                <Link
                  to="/negocio/gestionar"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white"
                >
                  <BarChart3 size={14} />
                  Ver metricas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
