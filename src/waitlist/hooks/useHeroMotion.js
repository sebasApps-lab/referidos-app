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

      const shiftProgress = Math.min(
        1,
        Math.max(0, (virtualProgress - shiftStart) / (1 - shiftStart)) ** 2.2 * 1.6
      );
      const shift = Math.min(maxShift, Math.max(0, shiftProgress * maxShift));
      rootRef.current.style.setProperty("--hero-bg-shift", `${shift}px`);
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
