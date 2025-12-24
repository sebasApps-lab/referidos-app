import React from "react";
import { QrCode } from "lucide-react";

export default function EscanerFallback({
  value,
  onChange,
  onSubmit,
  disabled,
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm gap-3 self-center">
      <div className="w-full rounded-[26px] border border-white/70 bg-white/90 px-4 py-3 shadow-sm">
        <label className="text-xs font-semibold text-black/60">
          Codigo QR
        </label>
        <input
          className="mt-2 w-full bg-transparent text-sm text-black/70 focus:outline-none"
          placeholder="Pega aqui el contenido del QR"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`w-full px-4 py-2.5 rounded-2xl font-semibold shadow ${
          disabled
            ? "bg-[#E2D3C7] text-white cursor-not-allowed"
            : "bg-[#1D1B1A] text-white hover:opacity-90"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <QrCode size={16} />
          Escanear
        </span>
      </button>
    </div>
  );
}
