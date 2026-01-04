import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Crown,
  LayoutGrid,
  MapPin,
  PlusCircle,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";
import negocioFallback from "../../assets/bg-home.png";
import {
  getNegocioDireccion,
  getNegocioImagen,
  getNegocioNombre,
  getNegocioPlanMeta,
  getNegocioRoleLabel,
  getNegocioSector,
} from "../services/negocioUI";

export default function InicioHero({ usuario, negocio, stats }) {
  const planMeta = getNegocioPlanMeta({ negocio, usuario });
  const nombre = getNegocioNombre({ negocio, usuario });
  const sector = getNegocioSector({ negocio, usuario });
  const direccion = getNegocioDireccion({ negocio, usuario });
  const imagen = getNegocioImagen({ negocio, usuario }) || negocioFallback;
  const roleLabel = getNegocioRoleLabel(usuario);
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
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-xl font-semibold leading-tight text-white">
                      {nombre}
                    </h1>
                    <span
                      className="inline-flex items-center whitespace-nowrap rounded-xl border border-white/15 bg-[#3B1A66] px-[clamp(12px,4vw,20px)] py-[clamp(12px,3vw,14px)] text-[clamp(9px,2.4vw,12px)] font-semibold uppercase tracking-[0.18em] leading-none text-white min-w-0 shrink"
                      style={{ mixBlendMode: "screen", opacity: 0.92 }}
                    >
                      {roleLabel}
                    </span>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">
                      Plan {planMeta.label}
                    </span>
                    <Link
                      to="/negocio/perfil?tab=plan"
                      className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 hover:text-white"
                    >
                      Ver beneficios
                    </Link>
                  </div>
                  <Link
                    to="/negocio/perfil?tab=plan"
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/90 transition hover:bg-white/20"
                  >
                    <Crown size={12} className="text-[#FFC21C]" />
                    Mejorar
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px] text-white/75 sm:hidden">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">
                    Plan {planMeta.label}
                  </span>
                  <Link
                    to="/negocio/perfil?tab=plan"
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 hover:text-white"
                  >
                    Ver beneficios
                  </Link>
                </div>
                <Link
                  to="/negocio/perfil?tab=plan"
                  className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/90 transition hover:bg-white/20"
                >
                  <Crown size={12} className="text-[#FFC21C]" />
                  Mejorar
                </Link>
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

              <div className="flex flex-col items-center gap-3 pt-1">
                <div className="flex justify-center">
                  <Link
                    to="/negocio/gestionar"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-[#5E30A5] shadow-sm transition hover:bg-[#F3EEFF]"
                  >
                    <PlusCircle size={14} />
                    Crear promo
                  </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
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
      </div>
    </motion.section>
  );
}
