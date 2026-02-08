import React from "react";
import { Check, Fingerprint, Minus, Plus } from "lucide-react";

export default function FingerprintAccessCard({
  enabled,
  onAdd,
  onRemove,
}) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Fingerprint size={18} className="text-[#5E30A5]" />
        <span className="text-xs font-semibold text-[#2F1A55]">Huella</span>
        {enabled ? (
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
            <Check size={12} />
          </span>
        ) : null}
      </div>
      {enabled ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRemove}
            className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
            aria-label="Quitar huella"
          >
            <Minus size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className="h-8 w-8 rounded-full border border-emerald-300 text-emerald-500 flex items-center justify-center"
          aria-label="Agregar huella"
        >
          <Plus size={14} />
        </button>
      )}
    </div>
  );
}
