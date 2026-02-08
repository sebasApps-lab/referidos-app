// src/admin/inicio/InicioCharts.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Sparkles, TrendingUp } from "lucide-react";

export default function InicioCharts() {
  const qrBars = [30, 48, 38, 60, 72, 55, 66];
  const userBars = [15, 25, 35, 45, 58, 68, 82];
  const topPromos = [
    { name: "2x1 desayuno", value: 62 },
    { name: "Happy hour", value: 48 },
    { name: "Combo familiar", value: 39 },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">
              QRs generados vs canjeados
            </div>
            <div className="text-xs text-slate-500">Ultimos 7 dias</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp size={14} />
            +12%
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {qrBars.map((height, index) => (
            <div key={`qr-${index}`} className="flex flex-col items-center gap-2">
              <div
                className="h-24 w-full rounded-lg bg-[#F3F0FF]"
                style={{ height: 96 }}
              >
                <div
                  className="w-full rounded-lg bg-[#5E30A5]/70"
                  style={{ height: `${height}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400">D{index + 1}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">
              Registros de usuarios
            </div>
            <div className="text-xs text-slate-500">Ultimos 7 dias</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5E30A5]">
            <Sparkles size={14} />
            tendencia estable
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {userBars.map((height, index) => (
            <div key={`user-${index}`} className="flex flex-col items-center gap-2">
              <div
                className="h-24 w-full rounded-lg bg-[#F5F5F7]"
                style={{ height: 96 }}
              >
                <div
                  className="w-full rounded-lg bg-[#8A62E8]"
                  style={{ height: `${height}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400">D{index + 1}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
          <BarChart3 size={18} />
          Promos mas usadas
        </div>
        <div className="mt-4 space-y-3">
          {topPromos.map((promo) => (
            <div key={promo.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>{promo.name}</span>
                <span className="text-slate-400">{promo.value}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-[#5E30A5]/70"
                  style={{ width: `${promo.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">
              Negocios con mas canjes
            </div>
            <div className="text-xs text-slate-500">Top 4 de la semana</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <ArrowUpRight size={14} />
            +9%
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {["La Esquina", "Cafe Central", "La Rueda", "Mercado Norte"].map(
            (name, index) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] px-3 py-2 text-xs"
              >
                <span className="font-semibold text-slate-600">
                  {index + 1}. {name}
                </span>
                <span className="text-[#5E30A5]">{38 - index * 6} canjes</span>
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
