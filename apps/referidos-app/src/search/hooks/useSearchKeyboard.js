import { useEffect } from "react";

export function useSearchKeyboard({ active, onEscape, onBack }) {
  useEffect(() => {
    if (!active) return undefined;
    const handler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape?.();
        if (!onEscape) {
          onBack?.();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, onBack, onEscape]);
}
