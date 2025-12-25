import { useCallback, useLayoutEffect, useState } from "react";

export function useSearchDock({
  headerId = "cliente-header",
  heroSelector = "[data-hero-container]",
  scrollContainerId = "cliente-main-scroll",
} = {}) {
  const [docked, setDocked] = useState(false);

  const update = useCallback(() => {
    const headerEl = document.getElementById(headerId);
    const heroEl = document.querySelector(heroSelector);
    if (!headerEl || !heroEl) {
      setDocked((prev) => (prev ? false : prev));
      return;
    }

    const headerHeight = headerEl.offsetHeight || 0;
    const rect = heroEl.getBoundingClientRect();
    const next = Math.round(rect.bottom) <= headerHeight;
    setDocked((prev) => (prev === next ? prev : next));
  }, [headerId, heroSelector]);

  useLayoutEffect(() => {
    update();
    const scrollContainer = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : null;
    const options = { passive: true };
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", update, options);
    }
    window.addEventListener("scroll", update, options);
    window.addEventListener("resize", update);
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", update);
      }
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollContainerId, update]);

  return docked;
}
