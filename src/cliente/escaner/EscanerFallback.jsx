import React, { useMemo } from "react";
import { Check } from "lucide-react";

export default function EscanerFallback({
  value,
  onChange,
  onSubmit,
  disabled,
}) {
  const sanitized = useMemo(
    () => (value || "").replace(/[^0-9a-zA-Z]/g, "").slice(0, 6),
    [value]
  );

  const slots = useMemo(() => {
    const base = Array(6).fill("");
    for (let i = 0; i < sanitized.length; i += 1) {
      base[i] = sanitized[i];
    }
    return base;
  }, [sanitized]);

  const updateSlot = (index, nextValue) => {
    const char = (nextValue || "")
      .replace(/[^0-9a-zA-Z]/g, "")
      .slice(-1);
    const nextSlots = [...slots];
    nextSlots[index] = char;
    onChange(nextSlots.join(""));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm gap-4 self-center">
      <div className="w-full text-center">
        <p className="text-base font-semibold text-[#2F1A55]">
          Ingresar codigo
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Escribe el codigo de 6 digitos para validar la promo.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2">
        {slots.slice(0, 3).map((char, index) => (
          <input
            key={`code-${index}`}
            value={char}
            onChange={(e) => updateSlot(index, e.target.value)}
            maxLength={1}
            className="h-12 w-12 rounded-xl border border-[#D8CFF2] bg-white text-center text-lg font-semibold text-[#5E30A5] outline-none transition focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/20"
          />
        ))}
        <span className="text-lg font-semibold text-[#5E30A5]">-</span>
        {slots.slice(3).map((char, offset) => {
          const index = offset + 3;
          return (
            <input
              key={`code-${index}`}
              value={char}
              onChange={(e) => updateSlot(index, e.target.value)}
              maxLength={1}
              className="h-12 w-12 rounded-xl border border-[#D8CFF2] bg-white text-center text-lg font-semibold text-[#5E30A5] outline-none transition focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/20"
            />
          );
        })}
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-2xl font-semibold shadow ${
          disabled
            ? "bg-[#E9E2F7] text-slate-400 cursor-not-allowed"
            : "bg-[#5E30A5] text-white hover:bg-[#4B2488]"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <Check size={16} />
          Verificar
        </span>
      </button>
    </div>
  );
}
