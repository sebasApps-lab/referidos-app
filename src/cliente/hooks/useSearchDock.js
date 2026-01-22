import { useCallback, useLayoutEffect, useState } from "react";

export function useSearchDock({
  headerId = "cliente-header",
  heroSelector = "[data-hero-container]",
  heroSearchSelector = "[data-hero-searchbar]",
  scrollContainerId = "cliente-main-scroll",
  dockOffset = 24,
  rootSelector = null,
  enabled = true,
} = {}) {
  const [docked, setDocked] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  const update = useCallback(() => {
    if (!enabled) {
      setDocked((prev) => (prev ? false : prev));
      setHeroVisible((prev) => (prev ? prev : true));
      return;
    }
    const headerEl = document.getElementById(headerId);
    const rootEl = rootSelector ? document.querySelector(rootSelector) : document;
    const heroEl = rootEl?.querySelector?.(heroSelector);
    const heroSearchEl = rootEl?.querySelector?.(heroSearchSelector);
    if (!headerEl || !heroEl) {
      setDocked((prev) => (prev ? false : prev));
      setHeroVisible((prev) => (prev ? prev : true));
      return;
    }

    const headerHeight = headerEl.offsetHeight || 0;
    const rect = (heroSearchEl || heroEl).getBoundingClientRect();
    const threshold = Math.max(0, headerHeight - dockOffset);
    const nextDocked = Math.round(rect.bottom) <= threshold;
    const nextHeroVisible =
      rect.bottom > headerHeight && rect.top < window.innerHeight;
    setDocked((prev) => (prev === nextDocked ? prev : nextDocked));
    setHeroVisible((prev) => (prev === nextHeroVisible ? prev : nextHeroVisible));
  }, [dockOffset, headerId, heroSearchSelector, heroSelector]);

  useLayoutEffect(() => {
    if (!enabled) {
      return undefined;
    }
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
  }, [enabled, scrollContainerId, update]);

  return { docked, heroVisible };
}
