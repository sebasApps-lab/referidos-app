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
      <div className="w-full rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3 shadow-sm">
        <label className="text-xs font-semibold text-slate-500">
          Codigo QR
        </label>
        <input
          className="mt-2 w-full bg-transparent text-sm text-slate-600 focus:outline-none"
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
            ? "bg-[#E9E2F7] text-slate-400 cursor-not-allowed"
            : "bg-[#5E30A5] text-white hover:bg-[#4B2488]"
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
