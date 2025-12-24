import React from "react";
import { Tag } from "lucide-react";

const EMPTY_COPY = {
  activos: "No tienes promos activas.",
  canjeados: "Canjea tu primera promo.",
  expirados: "Aqui se mostraran tus promos expiradas.",
};

export default function HistorialEmpty({ variant }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/90 p-6 text-center shadow-sm">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-[#3D5A80] text-white flex items-center justify-center">
        <Tag size={20} />
      </div>
      <p className="mt-3 text-sm font-semibold text-[#1D1B1A]">
        {EMPTY_COPY[variant] || EMPTY_COPY.activos}
      </p>
      <p className="mt-1 text-xs text-black/50">
        Tus QR apareceran aqui apenas se generen.
      </p>
    </div>
  );
}
