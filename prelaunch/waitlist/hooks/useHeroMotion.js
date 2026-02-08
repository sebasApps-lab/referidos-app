import { useEffect } from "react";
import { clamp01, easeInWithSoftOut } from "../utils/heroEasing";

export function useHeroMotion(rootRef) {
  useEffect(() => {
    if (!rootRef.current || typeof window === "undefined") return;

    let rafId = null;
    const maxShift = 260;
    const shiftStart = 1 / 5;
    const lockStart = 1.2 / 5;
    const lockEnd = 2.5 / 5;
    const phase3End = 3.8 / 5;
    const phase4End = 4.6 / 5;
    const lockGain = 1.2;
    const lockGainShift = 2.4;
    const nearMax = 0.95;

    const updateStretch = () => {
      rafId = null;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const baseHeight = 1200;
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      const lockValue = Math.min(1, lockStart * lockGain);
      const lockValueShift = Math.min(1, lockStart * lockGainShift);
      const phase3Target = Math.min(nearMax, 1);
      let virtualProgress = 0;

      if (progress <= lockStart) {
        const t = clamp01(progress / lockStart);
        const eased = easeInWithSoftOut(t, 1.6);
        virtualProgress = lockValueShift * eased;
      } else if (progress <= lockEnd) {
        virtualProgress = lockValueShift;
      } else if (progress <= phase3End) {
        const t = clamp01((progress - lockEnd) / (phase3End - lockEnd));
        const eased = easeInWithSoftOut(t, 1.3);
        virtualProgress = lockValueShift + eased * (phase3Target - lockValueShift);
      } else if (progress <= phase4End) {
        virtualProgress = phase3Target;
      } else {
        const t = clamp01((progress - phase4End) / (1 - phase4End));
        const eased = easeInWithSoftOut(t, 1.8);
        virtualProgress = phase3Target + eased * (1 - phase3Target);
      }

      let stretchProgress = 0;
      if (progress <= lockStart) {
        const t = clamp01(progress / lockStart);
        const eased = easeInWithSoftOut(t, 1.6);
        stretchProgress = lockValue * eased;
      } else if (progress <= lockEnd) {
        stretchProgress = lockValue;
      } else if (progress <= phase3End) {
        const t = clamp01((progress - lockEnd) / (phase3End - lockEnd));
        const eased = easeInWithSoftOut(t, 1.3);
        stretchProgress = lockValue + eased * (phase3Target - lockValue);
      } else if (progress <= phase4End) {
        stretchProgress = phase3Target;
      } else {
        const t = clamp01((progress - phase4End) / (1 - phase4End));
        const eased = easeInWithSoftOut(t, 1.8);
        stretchProgress = phase3Target + eased * (1 - phase3Target);
      }

      const virtualScrollY = maxScroll * stretchProgress;
      const maxStretch = Math.max(0, doc.scrollHeight - baseHeight - 80);
      const stretch = Math.min(maxStretch, Math.max(0, virtualScrollY));
      rootRef.current.style.setProperty("--hero-bg-stretch", `${stretch}px`);
      const heroHeight = baseHeight + stretch;

      const shiftProgress = Math.min(
        1,
        Math.max(0, (virtualProgress - shiftStart) / (1 - shiftStart)) ** 2.2 * 1.6
      );
      const shift = Math.min(maxShift, Math.max(0, shiftProgress * maxShift));
      rootRef.current.style.setProperty("--hero-bg-shift", `${shift}px`);

      const headerEl = rootRef.current.querySelector('[data-mini-nav-header="true"]');
      const heroEl = rootRef.current.querySelector(".hero-bg-fixed");
      const boundaryPoints = [
        [58, 0],
        [54, 15.2],
        [62, 30.4],
        [56, 45.6],
        [50, 58.9],
        [60, 77.9],
        [46, 95],
        [38, 100],
      ];

      const boundaryXAtY = (yPct) => {
        if (yPct <= boundaryPoints[0][1]) return boundaryPoints[0][0];
        if (yPct >= boundaryPoints[boundaryPoints.length - 1][1]) {
          return boundaryPoints[boundaryPoints.length - 1][0];
        }
        for (let i = 0; i < boundaryPoints.length - 1; i += 1) {
          const [x1, y1] = boundaryPoints[i];
          const [x2, y2] = boundaryPoints[i + 1];
          if (yPct >= y1 && yPct <= y2) {
            const t = (yPct - y1) / (y2 - y1 || 1);
            return x1 + (x2 - x1) * t;
          }
        }
        return boundaryPoints[boundaryPoints.length - 1][0];
      };

      if (heroEl && headerEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const headerRect = headerEl.getBoundingClientRect();
        const safeHeroHeight = Math.max(1, heroRect.height || heroHeight);
        const safeHeroWidth = Math.max(1, heroRect.width || rootRef.current.clientWidth || 1);

        const yTopPx = Math.max(0, headerRect.top - heroRect.top);
        const yBottomPx = Math.max(0, Math.min(safeHeroHeight, headerRect.bottom - heroRect.top));
        const yTopPct = (yTopPx / safeHeroHeight) * 100;
        const yBottomPct = (yBottomPx / safeHeroHeight) * 100;

        const cutTopPct = boundaryXAtY(yTopPct);
        const cutBottomPct = boundaryXAtY(yBottomPct);
        const cutTopPxHero = (cutTopPct / 100) * safeHeroWidth + shift;
        const cutBottomPxHero = (cutBottomPct / 100) * safeHeroWidth + shift;

        const cutTopPxHeader = cutTopPxHero + heroRect.left - headerRect.left;
        const cutBottomPxHeader = cutBottomPxHero + heroRect.left - headerRect.left;

        rootRef.current.style.setProperty("--mini-nav-cut-top-px", `${cutTopPxHeader}px`);
        rootRef.current.style.setProperty("--mini-nav-cut-bottom-px", `${cutBottomPxHeader}px`);
      }
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(updateStretch);
    };

    updateStretch();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [rootRef]);
}
