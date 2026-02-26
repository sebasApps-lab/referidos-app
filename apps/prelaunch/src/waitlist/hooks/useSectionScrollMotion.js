import { useEffect } from "react";
import { clamp01 } from "../utils/heroEasing";

function easeSectionProgress(value) {
  const x = clamp01(value);
  const easedIn = x ** 1.35;
  return 1 - (1 - easedIn) ** 1.9;
}

function easeOpacityProgress(value) {
  const x = clamp01(value);
  const easedIn = x ** 1.45;
  return 1 - (1 - easedIn) ** 1.25;
}

export function useSectionScrollMotion(
  sectionOneRef,
  sectionTwoRef,
  sectionThreeRef
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionRefs = [sectionOneRef, sectionTwoRef, sectionThreeRef];
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
    const enterTravel = [30, 46, 46];
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
    const heroPhase3Start = 2.5 / 5;
    const heroPhase3End = 3.8 / 5;
    const phase3Span = heroPhase3End - heroPhase3Start;
    const section2OutMoveStart = heroPhase3Start + phase3Span * 0.16;
    const section3InStart = heroPhase3Start - phase3Span * 0.08;
    const section3InEnd = heroPhase3Start + phase3Span * 0.72;
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
        let inOpacity = easeSectionProgress(inOpacityRaw);
        let inMove = easeSectionProgress(inMoveRaw);

        // Section 2: start later, finish exactly when hero phase 1 ends.
        if (index === 1) {
          const syncedRaw = clamp01(
            (pageProgress - section2MoveStart) /
              Math.max(0.0001, heroPhase1End - section2MoveStart)
          );
          inMove = easeSectionProgress(syncedRaw);
        }
        if (index === 2) {
          const section3InRaw = clamp01(
            (pageProgress - section3InStart) /
              Math.max(0.0001, section3InEnd - section3InStart)
          );
          inMove = easeSectionProgress(section3InRaw);
          inOpacity = section3InRaw ** 1.35;
          if (pageProgress >= section3InEnd) {
            inMove = 1;
            inOpacity = 1;
          }
        }

        const outStart = viewportHeight * (outStartFactor[index] ?? 0.1);
        const outEnd = -Math.max(120, rect.height * (outEndHeightFactor[index] ?? 0.5));
        const outRaw = clamp01((outStart - rect.bottom) / Math.max(1, outStart - outEnd));
        let outEased = easeSectionProgress(outRaw);
        let outFactor = 1 - outEased;
        if (index === 2) {
          outEased = 0;
          outFactor = 1;
        }

        if (index === 0) {
          const phase1Raw = clamp01(pageProgress / Math.max(0.0001, heroPhase1End));
          // Very slow at start, then ramps up near the end of phase 1.
          const outFromHalf = phase1Raw ** 2.9;
          const lateral = outFromHalf * 180;
          const opacity = 1 - outFromHalf * 0.82;

          element.style.setProperty("--section-y", "0px");
          element.style.setProperty("--section-opacity", `${opacity.toFixed(3)}`);
          element.style.setProperty("--section-scale", "1");
          element.style.setProperty("--section-hero-left-x", `${(-lateral).toFixed(2)}px`);
          element.style.setProperty("--section-hero-right-x", `${lateral.toFixed(2)}px`);
          return;
        }

        const minOpacity = minOpacityBySection[index] ?? 0.18;
        let opacity = minOpacity + (1 - minOpacity) * clamp01(inOpacity * outFactor);
        let scale = 1;

        if (index === 1) {
          const exitOpacityRaw = clamp01(
            (pageProgress - heroPhase3Start) / Math.max(0.0001, heroPhase3End - heroPhase3Start)
          );
          const exitOpacityEased = easeOpacityProgress(exitOpacityRaw);
          const exitMoveRaw = clamp01(
            (pageProgress - section2OutMoveStart) /
              Math.max(0.0001, heroPhase3End - section2OutMoveStart)
          );
          const exitMoveEased = easeSectionProgress(exitMoveRaw);
          outEased = exitMoveEased;
          outFactor = 1 - exitOpacityEased;

          const phaseRaw = clamp01(
            (pageProgress - section2MoveStart) /
              Math.max(0.0001, heroPhase1End - section2MoveStart)
          );
          const scaleEased = phaseRaw ** 2.8;
          const baseScale = 0.93 + 0.07 * scaleEased;
          scale = baseScale * (1 - 0.1 * exitMoveEased);
          const fadeInEased = easeOpacityProgress(phaseRaw);
          const fadeVisibility = clamp01(fadeInEased * outFactor);
          opacity = minOpacity + (1 - minOpacity) * fadeVisibility;
        }
        if (index === 2) {
          const section3InRaw = clamp01(
            (pageProgress - section3InStart) /
              Math.max(0.0001, section3InEnd - section3InStart)
          );
          const scaleEased = section3InRaw ** 1.9;
          scale = 0.9 + 0.1 * scaleEased;
          const fadeInEased = easeOpacityProgress(section3InRaw);
          opacity = minOpacity + (1 - minOpacity) * fadeInEased;
          if (pageProgress >= section3InEnd) {
            scale = 1;
            opacity = 1;
          }
        }

        const enterY = (1 - inMove) * (enterTravel[index] || 30);
        const exitY = -outEased * (exitTravel[index] || 22);
        const translateY = enterY + exitY;

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
  }, [sectionOneRef, sectionTwoRef, sectionThreeRef]);
}
