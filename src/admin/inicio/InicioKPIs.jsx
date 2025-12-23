// src/admin/inicio/InicioKPIs.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  QrCode,
  Store,
  Ticket,
  UserCheck,
  Users,
} from "lucide-react";

export default function InicioKPIs() {
  const stats = [
    {
      label: "Total usuarios",
      value: "24,580",
      delta: "+6%",
      Icon: Users,
    },
    {
      label: "Clientes activos",
      value: "18,302",
      delta: "+4%",
      Icon: UserCheck,
    },
    {
      label: "Negocios activos",
      value: "1,482",
      delta: "+3%",
      Icon: Store,
    },
    {
      label: "Promos activas",
      value: "682",
      delta: "+2%",
      Icon: Ticket,
    },
    {
      label: "QRs generados hoy",
      value: "5,240",
      delta: "+10%",
      Icon: QrCode,
    },
    {
      label: "QRs canjeados hoy",
      value: "2,918",
      delta: "+7%",
      Icon: BadgeCheck,
    },
    {
      label: "Reportes abiertos",
      value: "41",
      delta: "-5%",
      Icon: Activity,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4FF] text-[#5E30A5]">
              <stat.Icon size={18} />
            </div>
            <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
              {stat.delta}
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-[#2F1A55]">
            {stat.value}
          </div>
          <div className="text-xs text-slate-500">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
