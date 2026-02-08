import { useEffect, useRef } from "react";

export function useAutoCarousel({ enabled, intervalMs = 5000, onTick }) {
  const handlerRef = useRef(onTick);

  useEffect(() => {
    handlerRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (!enabled) return undefined;
    const id = setInterval(() => {
      handlerRef.current?.();
    }, intervalMs);

    return () => clearInterval(id);
  }, [enabled, intervalMs]);
}
