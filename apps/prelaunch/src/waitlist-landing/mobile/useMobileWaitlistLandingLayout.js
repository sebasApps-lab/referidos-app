import { useEffect, useState } from "react";

export default function useMobileWaitlistLandingLayout() {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 430 : window.innerWidth,
  );

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const effectiveViewportWidth = Math.max(viewportWidth, 360);
  const phoneScale = effectiveViewportWidth >= 410 ? 1 : effectiveViewportWidth / 410;
  const isTabletHeroLayout = effectiveViewportWidth >= 750;

  let stepCardScale = 1;
  if (effectiveViewportWidth < 750) {
    const horizontalGutter = Math.min(Math.max(effectiveViewportWidth * 0.06, 28), 40);
    const availableWidth = Math.max(effectiveViewportWidth - horizontalGutter * 2, 288);
    stepCardScale = Math.min(availableWidth / 354, 1);
  } else if (effectiveViewportWidth >= 750 && effectiveViewportWidth < 1025) {
    const progress = (effectiveViewportWidth - 750) / 275;
    stepCardScale = 0.8 + progress * 0.2;
  } else if (effectiveViewportWidth >= 1025) {
    const progress = Math.min((effectiveViewportWidth - 1025) / 375, 1);
    stepCardScale = 0.85 + progress * 0.15;
  }

  return {
    phoneScale,
    isTabletHeroLayout,
    stepCardScale,
  };
}
