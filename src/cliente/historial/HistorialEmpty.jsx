import React from "react";
import { Tag } from "lucide-react";

const EMPTY_COPY = {
  activos: "No tienes promos activas.",
  canjeados: "Canjea tu primera promo.",
  expirados: "Aqui se mostraran tus promos expiradas.",
};

export default function HistorialEmpty({ variant }) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-12 w-12 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
        <Tag size={20} />
      </div>
      <p className="mt-3 text-sm font-semibold text-[#2F1A55]">
        {EMPTY_COPY[variant] || EMPTY_COPY.activos}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Tus QR apareceran aqui apenas se generen.
      </p>
    </div>
  );
}
