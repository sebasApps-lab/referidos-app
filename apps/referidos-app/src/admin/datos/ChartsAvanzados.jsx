// src/admin/datos/ChartsAvanzados.jsx
import React from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, PieChart, TrendingDown } from "lucide-react";

export default function ChartsAvanzados() {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  const funnel = [
    { label: "Visitas", value: "120k" },
    { label: "QR generados", value: "35k" },
    { label: "QR canjeados", value: "18k" },
    { label: "Recompensas", value: "9k" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-semibold text-[#2F1A55]">Datos</div>
        <div className="text-xs text-slate-500">
          Analisis profundo para decisiones estrategicas.
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <TEMP_MOTION_SPLASH_TAG
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <BarChart3 size={16} />
            Conversion por sector
          </div>
          <div className="mt-4 space-y-3 text-xs text-slate-500">
            {["Restaurantes", "Retail", "Salud"].map((sector) => (
              <div key={sector} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>{sector}</span>
                  <span>32%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-2/3 rounded-full bg-[#5E30A5]/70" />
                </div>
              </div>
            ))}
          </div>
        </TEMP_MOTION_SPLASH_TAG>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <PieChart size={16} />
            Retencion
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
            <div className="rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] p-3">
              <div className="text-sm font-semibold text-[#5E30A5]">72%</div>
              <div>Clientes 30 dias</div>
            </div>
            <div className="rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] p-3">
              <div className="text-sm font-semibold text-[#5E30A5]">41%</div>
              <div>Clientes 90 dias</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <TrendingDown size={16} />
            Alertas de caida
          </div>
          <div className="mt-3 space-y-2 text-xs text-slate-500">
            <div className="flex items-center justify-between rounded-xl border border-[#E9E2F7] bg-[#FFF5F5] px-3 py-2">
              <span>QRs canjeados</span>
              <span className="text-rose-600">-12%</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#E9E2F7] bg-[#FFF5F5] px-3 py-2">
              <span>Promos activas</span>
              <span className="text-rose-600">-6%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
          <Activity size={16} />
          Funnel de conversion
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {funnel.map((step) => (
            <div
              key={step.label}
              className="rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] p-3 text-xs text-slate-500"
            >
              <div className="text-sm font-semibold text-[#5E30A5]">
                {step.value}
              </div>
              <div>{step.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
