import { useEffect, useMemo, useState } from "react";

const SECTION_ASSET_TIMEOUT_MS = 1600;

function waitForImageLoad(image) {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const handleDone = () => {
      image.removeEventListener("load", handleDone);
      image.removeEventListener("error", handleDone);
      resolve();
    };

    image.addEventListener("load", handleDone, { once: true });
    image.addEventListener("error", handleDone, { once: true });
  });
}

async function waitForImageReady(image) {
  await waitForImageLoad(image);

  if (typeof image.decode === "function") {
    try {
      await image.decode();
    } catch {
      // Ignore decode failures and let the browser paint the best available result.
    }
  }
}

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
        timeoutId = null;
      }

      rafId = window.requestAnimationFrame(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      });
    }

    setIsReady(false);

    timeoutId = window.setTimeout(() => {
      finalize();
    }, SECTION_ASSET_TIMEOUT_MS);

    void Promise.all([
      ...images.map((image) => waitForImageReady(image)),
      ...extraImages.map((image) => waitForImageReady(image)),
    ]).then(() => {
      finalize();
    });

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [sectionRef, ...deps, ...normalizedExtraAssetSrcs]);

  return isReady;
}
