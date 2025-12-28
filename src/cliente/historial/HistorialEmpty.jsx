import React from "react";
import { BadgeCheck, Check, QrCode, X } from "lucide-react";

const EMPTY_COPY = {
  activos: "No tienes promos activas.",
  canjeados: "Canjea tu primera promo.",
  expirados: "Aqui se mostraran tus promos expiradas.",
};

export default function HistorialEmpty({ variant }) {
  const icon =
    variant === "canjeados" ? (
      <span className="relative inline-flex h-14 w-14 items-center justify-center text-[#1DA1F2]">
        <QrCode size={64} />
        <span className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <Check size={14} className="text-[#1DA1F2]" strokeWidth={7} />
        </span>
      </span>
    ) : variant === "expirados" ? (
      <span className="relative inline-flex h-14 w-14 items-center justify-center text-red-500">
        <QrCode size={64} />
        <span className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <X size={14} className="text-red-500" strokeWidth={7} />
        </span>
      </span>
    ) : (
      <span className="inline-flex h-14 w-14 items-center justify-center text-emerald-500">
        <BadgeCheck size={48} />
      </span>
    );

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-16 w-16 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
        {icon}
      </div>
      <p className="mt-3 text-sm font-semibold text-[#2F1A55]">
        {EMPTY_COPY[variant] || EMPTY_COPY.activos}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Tus codigos apareceran aqui apenas se generen.
      </p>
    </div>
  );
}
