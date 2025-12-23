// src/components/gestionar/sections/Grupos.jsx
import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Crown, Target, Users } from "lucide-react";

export default function Grupos() {
  const groups = [
    {
      name: "Clientes frecuentes",
      desc: "Visitan mas de 3 veces por mes",
      count: "420",
      Icon: Crown,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      name: "Nuevos",
      desc: "Primeras 2 semanas",
      count: "180",
      Icon: Users,
      tone: "bg-sky-50 text-sky-600",
    },
    {
      name: "VIP",
      desc: "Top 5% en gasto",
      count: "38",
      Icon: BadgeCheck,
      tone: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-[#2F1A55]">
            Segmentos de clientes
          </div>
          <div className="text-xs text-slate-500">
            Crea experiencias personalizadas y comunica con precision.
          </div>
        </div>
        <button
          type="button"
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
        >
          Crear grupo
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {groups.map((group) => (
          <motion.div
            key={group.name}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${group.tone}`}>
                <group.Icon size={16} />
              </div>
              <div className="text-lg font-bold text-[#2F1A55]">
                {group.count}
              </div>
            </div>
            <div className="mt-3 text-sm font-semibold text-[#2F1A55]">
              {group.name}
            </div>
            <div className="text-xs text-slate-500">{group.desc}</div>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-2/3 rounded-full bg-[#5E30A5]/60" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
          <Target size={16} />
          Reglas sugeridas
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            "Clientes con 3 visitas en 30 dias",
            "Ticket promedio mayor a $25",
            "Sin compra en los ultimos 14 dias",
            "Invitar amigos recientes",
          ].map((rule) => (
            <div
              key={rule}
              className="rounded-lg border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-500"
            >
              {rule}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
