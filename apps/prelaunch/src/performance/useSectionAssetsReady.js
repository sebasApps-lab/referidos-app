import { useEffect, useMemo, useState } from "react";

const SECTION_ASSET_TIMEOUT_MS = 1600;

export default function useSectionAssetsReady(sectionRef, deps = [], extraAssetSrcs = []) {
  const [isReady, setIsReady] = useState(false);
  const normalizedExtraAssetSrcs = useMemo(
    () => extraAssetSrcs.filter(Boolean),
    [extraAssetSrcs],
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!(node instanceof HTMLElement)) {
      setIsReady(true);
      return undefined;
    }

    let cancelled = false;
    let timeoutId = null;
    let rafId = null;

    const images = Array.from(node.querySelectorAll("img"));
    const pendingImages = images.filter((image) => !image.complete || image.naturalWidth === 0);
    const seenAssetSrcs = new Set(
      images.map((image) => image.currentSrc || image.src).filter(Boolean),
    );
    const extraImages = normalizedExtraAssetSrcs
      .filter((src) => !seenAssetSrcs.has(src))
      .map((src) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
        return image;
      });
    const pendingExtraImages = extraImages.filter(
      (image) => !image.complete || image.naturalWidth === 0,
    );

    function finalize() {
      if (cancelled) {
        return;
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      rafId = window.requestAnimationFrame(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      });
    }

    setIsReady(false);

    if (pendingImages.length === 0 && pendingExtraImages.length === 0) {
      finalize();
      return () => {
        cancelled = true;
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
      };
    }

    let remaining = pendingImages.length + pendingExtraImages.length;

    function markLoaded() {
      remaining -= 1;
      if (remaining <= 0) {
        finalize();
      }
    }

    pendingImages.forEach((image) => {
      image.addEventListener("load", markLoaded, { once: true });
      image.addEventListener("error", markLoaded, { once: true });
    });
    pendingExtraImages.forEach((image) => {
      image.addEventListener("load", markLoaded, { once: true });
      image.addEventListener("error", markLoaded, { once: true });
    });

    timeoutId = window.setTimeout(() => {
      finalize();
    }, SECTION_ASSET_TIMEOUT_MS);

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      pendingImages.forEach((image) => {
        image.removeEventListener("load", markLoaded);
        image.removeEventListener("error", markLoaded);
      });
      pendingExtraImages.forEach((image) => {
        image.removeEventListener("load", markLoaded);
        image.removeEventListener("error", markLoaded);
      });
    };
  }, [sectionRef, ...deps, ...normalizedExtraAssetSrcs]);

  return isReady;
}
