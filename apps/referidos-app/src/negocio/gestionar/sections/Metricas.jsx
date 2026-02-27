// src/components/gestionar/sections/Metricas.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, DollarSign, Sparkles, Ticket, Users } from "lucide-react";

export default function Metricas() {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  const kpis = [
    {
      label: "Promos activas",
      value: "12",
      delta: "+8%",
      Icon: Ticket,
    },
    {
      label: "Visitas hoy",
      value: "1,240",
      delta: "+12%",
      Icon: BarChart3,
    },
    {
      label: "Referidos",
      value: "86",
      delta: "+5%",
      Icon: Users,
    },
    {
      label: "Ingresos",
      value: "$2,840",
      delta: "+3%",
      Icon: DollarSign,
    },
  ];

  const bars = [40, 65, 55, 80, 48, 72, 60];
  const topPromos = [
    { name: "2x1 Almuerzos", share: 68 },
    { name: "Happy Hour", share: 52 },
    { name: "Combo Familiar", share: 41 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => (
          <TEMP_MOTION_SPLASH_TAG
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
            key={item.label}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-[#E9E2F7] bg-[#F8F5FF] p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-white p-2 text-[#5E30A5] shadow-sm">
                <item.Icon size={18} />
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                {item.delta}
                <ArrowUpRight size={12} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#2F1A55]">
              {item.value}
            </div>
            <div className="text-xs text-slate-500">{item.label}</div>
          </TEMP_MOTION_SPLASH_TAG>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-[#E9E2F7] bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-[#2F1A55]">
                Rendimiento semanal
              </div>
              <div className="text-xs text-slate-500">Ultimos 7 dias</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#5E30A5]">
              <Sparkles size={14} />
              Tendencia positiva
            </div>
          </div>
          <div className="mt-4 grid h-24 grid-cols-7 items-end gap-2">
            {bars.map((height, index) => (
              <div
                key={`${height}-${index}`}
                className="rounded-lg border border-[#5E30A5]/20 bg-[#5E30A5]/15"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-500">
            32% mas conversion que la semana pasada.
          </div>
        </div>

        <div className="rounded-xl border border-[#E9E2F7] bg-white p-4">
          <div className="text-sm font-semibold text-[#2F1A55]">
            Top promociones
          </div>
          <div className="mt-3 space-y-3">
            {topPromos.map((promo) => (
              <div key={promo.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    {promo.name}
                  </span>
                  <span className="text-slate-400">{promo.share}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-[#5E30A5]/60"
                    style={{ width: `${promo.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
