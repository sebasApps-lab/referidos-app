import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";

export default function EscanerFallback({
  value,
  onChange,
  onSubmit,
  disabled,
}) {
  const inputRefs = useRef([]);
  const rowRef = useRef(null);
  const scrollStateRef = useRef({ active: false, top: 0 });
  const centerTimerRef = useRef(null);
  const [viewportH, setViewportH] = useState(0);
  const [baseH, setBaseH] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const update = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      setBaseH((prev) => (prev || window.innerHeight));
      setViewportH(vh);
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const keyboardOpen = baseH && viewportH ? viewportH < baseH * 0.92 : false;

  const scheduleCenter = useCallback(
    (behavior = "smooth") => {
      if (centerTimerRef.current) {
        clearTimeout(centerTimerRef.current);
      }
      centerTimerRef.current = setTimeout(() => {
        centerRowInView(behavior);
      }, 140);
    },
    [centerRowInView]
  );

  const centerRowInView = useCallback(
    (behavior = "smooth") => {
      const row = rowRef.current;
      if (!row) return;
      const container = document.getElementById("cliente-main-scroll");
      const containerRect = container
        ? container.getBoundingClientRect()
        : { top: 0, height: window.innerHeight };
      const rowRect = row.getBoundingClientRect();
      const currentScroll = container ? container.scrollTop : window.scrollY;
      const offsetTop = rowRect.top - containerRect.top;
      const target =
        currentScroll +
        offsetTop -
        (containerRect.height / 2 - rowRect.height / 2);

      if (container) {
        container.scrollTo({ top: target, behavior });
      } else {
        window.scrollTo({ top: target, behavior });
      }
    },
    []
  );

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

  const updateSlot = (index, nextValue) => {
    const cleaned = (nextValue || "").replace(/[^0-9a-zA-Z]/g, "");
    if (!cleaned) {
      const nextSlots = [...slots];
      nextSlots[index] = "";
      onChange(nextSlots.join(""));
      return;
    }

    const chars = cleaned.split("");
    const nextSlots = [...slots];
    let cursor = index;
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

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (slots[index]) {
        const nextSlots = [...slots];
        nextSlots[index] = "";
        onChange(nextSlots.join(""));
        return;
      }
      if (index > 0) {
        event.preventDefault();
        const nextSlots = [...slots];
        nextSlots[index - 1] = "";
        onChange(nextSlots.join(""));
        focusInput(index - 1);
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    } else if (event.key === "ArrowRight" && index < slots.length - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  useEffect(() => {
    if (!keyboardOpen) {
      if (scrollStateRef.current.active) {
        const container = document.getElementById("cliente-main-scroll");
        const top = scrollStateRef.current.top;
        if (container) {
          container.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top, behavior: "smooth" });
        }
        scrollStateRef.current.active = false;
      }
      if (centerTimerRef.current) {
        clearTimeout(centerTimerRef.current);
      }
      return;
    }
    const container = document.getElementById("cliente-main-scroll");
    scrollStateRef.current = {
      active: true,
      top: container ? container.scrollTop : window.scrollY,
    };
    scheduleCenter("smooth");
  }, [keyboardOpen, scheduleCenter, viewportH]);

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

      <div
        ref={rowRef}
        className="flex items-center justify-center gap-2"
      >
        {slots.slice(0, 3).map((char, index) => (
          <input
            key={`code-${index}`}
            value={char}
            onChange={(e) => updateSlot(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
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
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
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
