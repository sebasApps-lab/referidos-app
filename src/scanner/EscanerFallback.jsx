import React, { useCallback, useMemo, useRef } from "react";
import { Check } from "lucide-react";

export default function EscanerFallback({
  value,
  onChange,
  onSubmit,
  disabled,
}) {
  const inputRefs = useRef([]);
  const rowRef = useRef(null);

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

  const focusInput = (index) => {
    window.requestAnimationFrame(() => {
      inputRefs.current[index]?.focus();
    });
  };

  const getFirstEmptyIndex = useCallback(
    () => slots.findIndex((char) => !char),
    [slots]
  );

  const getLastFilledIndex = useCallback(() => {
    for (let i = slots.length - 1; i >= 0; i -= 1) {
      if (slots[i]) return i;
    }
    return -1;
  }, [slots]);

  const updateSlot = (index, nextValue) => {
    const cleaned = (nextValue || "").replace(/[^0-9a-zA-Z]/g, "");
    if (!cleaned) return;

    const chars = cleaned.split("");
    const nextSlots = [...slots];
    const firstEmpty = getFirstEmptyIndex();
    let cursor = firstEmpty === -1 ? nextSlots.length - 1 : firstEmpty;
    chars.forEach((char) => {
      if (cursor < nextSlots.length) {
        nextSlots[cursor] = char;
        cursor += 1;
      }
    });
    onChange(nextSlots.join(""));
    if (cursor < nextSlots.length) {
      focusInput(cursor);
    } else {
      inputRefs.current[nextSlots.length - 1]?.blur();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      const lastFilled = getLastFilledIndex();
      if (lastFilled === -1) return;
      const nextSlots = [...slots];
      nextSlots[lastFilled] = "";
      onChange(nextSlots.join(""));
      focusInput(lastFilled);
    }
  };

  const handleInputFocus = useCallback(() => {}, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm gap-4 self-center">
      <div className="w-full text-center">
        <p className="mt-1 text-[13px] text-slate-500">
          Escribe el codigo de 6 digitos para validar la promo.
        </p>
      </div>

      <div
        ref={rowRef}
        className="flex items-center justify-center gap-2"
      >
        {slots.slice(0, 3).map((char, index) => (
          <input
            key={`code-${index}`}
            value={char}
            onChange={(e) => updateSlot(index, e.target.value)}
            onKeyDown={handleKeyDown}
            onPointerDown={(e) => {
              e.preventDefault();
              const firstEmpty = getFirstEmptyIndex();
              const targetIndex =
                firstEmpty === -1 ? slots.length - 1 : firstEmpty;
              inputRefs.current[targetIndex]?.focus();
            }}
            onFocus={handleInputFocus}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            maxLength={1}
            className="h-11 w-11 rounded-xl border border-[#D8CFF2] bg-white text-center text-base font-semibold text-[#5E30A5] outline-none transition focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/20"
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
              onKeyDown={handleKeyDown}
              onPointerDown={(e) => {
                e.preventDefault();
                const firstEmpty = getFirstEmptyIndex();
                const targetIndex =
                  firstEmpty === -1 ? slots.length - 1 : firstEmpty;
                inputRefs.current[targetIndex]?.focus();
              }}
              onFocus={handleInputFocus}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              maxLength={1}
              className="h-11 w-11 rounded-xl border border-[#D8CFF2] bg-white text-center text-base font-semibold text-[#5E30A5] outline-none transition focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/20"
            />
          );
        })}
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`self-center px-6 py-3 rounded-2xl font-semibold shadow ${
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
