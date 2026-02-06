import { useEffect } from "react";
import { clamp01 } from "../utils/heroEasing";

function easeSectionProgress(value) {
  const x = clamp01(value);
  const easedIn = x ** 1.35;
  return 1 - (1 - easedIn) ** 1.9;
}

export function useSectionScrollMotion(...sectionRefs) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const refs = (sectionRefs || []).filter((ref) => ref && ref.current);
    if (!refs.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      refs.forEach((ref) => {
        ref.current.style.setProperty("--section-y", "0px");
        ref.current.style.setProperty("--section-opacity", "1");
        ref.current.style.setProperty("--section-scale", "1");
        ref.current.style.setProperty("--section-hero-left-x", "0px");
        ref.current.style.setProperty("--section-hero-right-x", "0px");
      });
      return;
    }

    let rafId = null;
    const minOpacityBySection = [0.18, 0.18, 0.18];
    // Per-section tuning: [hero block, middle card, faq card]
    const enterTravel = [30, 46, 30];
    const exitTravel = [22, 46, 22];
    // Early fade-out start for section 1 to make it disappear a bit sooner.
    const outStartFactor = [0.1, -0.12, 0.1];
    const outEndHeightFactor = [0.5, 1.15, 0.5];
    const enterStartFactor = [1.14, 0.76, 0.98];
    const opacitySpanFactor = [0.16, 0.16, 0.16];
    const moveSpanFactor = [0.4, 1.06, 0.4];
    // Sync section 2 motion end with hero phase-1 freeze point.
    const heroPhase1End = 1.2 / 5;
    const section2MoveStart = 0.19;
    const update = () => {
      rafId = null;

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 1;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - viewportHeight);
      const pageProgress = maxScroll > 0 ? clamp01(scrollY / maxScroll) : 0;
      refs.forEach((ref, index) => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const enterStart = viewportHeight * (enterStartFactor[index] || 0.98);
        const opacitySpan = viewportHeight * (opacitySpanFactor[index] ?? 0.16);
        const moveSpan = viewportHeight * (moveSpanFactor[index] ?? 0.4);
        const inOpacityRaw = clamp01((enterStart - rect.top) / Math.max(1, opacitySpan));
        const inMoveRaw = clamp01((enterStart - rect.top) / Math.max(1, moveSpan));
        const inOpacity = easeSectionProgress(inOpacityRaw);
        let inMove = easeSectionProgress(inMoveRaw);

        // Section 2: start later, finish exactly when hero phase 1 ends.
        if (index === 1) {
          const syncedRaw = clamp01(
            (pageProgress - section2MoveStart) /
              Math.max(0.0001, heroPhase1End - section2MoveStart)
          );
          inMove = easeSectionProgress(syncedRaw);
        }

        const outStart = viewportHeight * (outStartFactor[index] ?? 0.1);
        const outEnd = -Math.max(120, rect.height * (outEndHeightFactor[index] ?? 0.5));
        const outRaw = clamp01((outStart - rect.bottom) / Math.max(1, outStart - outEnd));
        const outEased = easeSectionProgress(outRaw);
        const outFactor = 1 - outEased;

        if (index === 0) {
          const visiblePx =
            Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          const visibleRatio = rect.height > 0 ? clamp01(visiblePx / rect.height) : 0;
          const startAtVisibleRatio = 0.88;
          const endAtVisibleRatio = 0.34;
          const outFromHalfRaw = clamp01(
            (startAtVisibleRatio - visibleRatio) /
              Math.max(0.01, startAtVisibleRatio - endAtVisibleRatio)
          );
          const outFromHalf = easeSectionProgress(outFromHalfRaw);
          const lateral = outFromHalf * 180;
          const opacity = 1 - outFromHalf * 0.82;

          element.style.setProperty("--section-y", "0px");
          element.style.setProperty("--section-opacity", `${opacity.toFixed(3)}`);
          element.style.setProperty("--section-scale", "1");
          element.style.setProperty("--section-hero-left-x", `${(-lateral).toFixed(2)}px`);
          element.style.setProperty("--section-hero-right-x", `${lateral.toFixed(2)}px`);
          return;
        }

        const visibility = clamp01(inOpacity * outFactor);
        const enterY = (1 - inMove) * (enterTravel[index] || 30);
        const exitY = -outEased * (exitTravel[index] || 22);
        const translateY = enterY + exitY;
        const minOpacity = minOpacityBySection[index] ?? 0.18;
        let opacity = minOpacity + (1 - minOpacity) * visibility;
        let scale = 1;

        if (index === 1) {
          const phaseRaw = clamp01(
            (pageProgress - section2MoveStart) /
              Math.max(0.0001, heroPhase1End - section2MoveStart)
          );
          const scaleEased = phaseRaw ** 2.8;
          scale = 0.93 + 0.07 * scaleEased;
          const fadeInEased = phaseRaw ** 1.55;
          const fadeVisibility = clamp01(fadeInEased * outFactor);
          opacity = minOpacity + (1 - minOpacity) * fadeVisibility;
        }

        element.style.setProperty("--section-y", `${translateY.toFixed(2)}px`);
        element.style.setProperty("--section-opacity", opacity.toFixed(3));
        element.style.setProperty("--section-scale", scale.toFixed(3));
      });
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);
}
