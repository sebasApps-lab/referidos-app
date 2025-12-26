// src/hooks/useCarousel.js
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export function useCarousel(
  ref,
  { loop = false, itemsCount = 0, loopPeek = 0 } = {}
) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const loopInitRef = useRef(false);
  const segmentRef = useRef(0);
  const loopEnabled = loop && itemsCount > 1;

  const getSegment = useCallback((el) => {
    const segment = el.scrollWidth / 3;
    return Number.isFinite(segment) ? segment : 0;
  }, []);

  const getPeek = useCallback(
    (el) => {
      if (typeof loopPeek === "number" && loopPeek > 0) return loopPeek;
      return Math.min(56, Math.round(el.clientWidth * 0.12));
    },
    [loopPeek]
  );

  const resetLoopPosition = useCallback(() => {
    const el = ref.current;
    if (!el || !loopEnabled) return;
    const segment = getSegment(el);
    if (!segment) return;
    segmentRef.current = segment;
    const peek = getPeek(el);
    const offset = Math.max(0, Math.min(segment - 1, peek));
    el.scrollLeft = segment - offset;
    loopInitRef.current = true;
  }, [getPeek, getSegment, loopEnabled, ref]);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (loopEnabled) {
      const segment = segmentRef.current || getSegment(el);
      if (segment) {
        segmentRef.current = segment;
        const boundary = Math.min(48, segment * 0.08);
        if (el.scrollLeft <= boundary) {
          el.scrollLeft += segment;
        } else if (el.scrollLeft >= segment * 2 + boundary) {
          el.scrollLeft -= segment;
        }
      }

      const canScroll = el.scrollWidth - el.clientWidth > 2;
      setCanLeft(canScroll);
      setCanRight(canScroll);
      return;
    }

    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
  }, [getSegment, loopEnabled, ref]);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "right" ? el.clientWidth * 0.9 : -el.clientWidth * 0.9,
      behavior: "smooth",
    });

    setTimeout(update, 200);
  };

  const scrollToStart = () => {
    const el = ref.current;
    if (!el) return;
    if (loopEnabled) {
      const segment = segmentRef.current || getSegment(el);
      if (segment) {
        const peek = getPeek(el);
        const offset = Math.max(0, Math.min(segment - 1, peek));
        el.scrollTo({ left: segment - offset, behavior: "smooth" });
        setTimeout(update, 200);
        return;
      }
    }
    el.scrollTo({ left: 0, behavior: "smooth" });
    setTimeout(update, 200);
  };

  useLayoutEffect(() => {
    if (!loopEnabled) {
      loopInitRef.current = false;
      return undefined;
    }
    const id = requestAnimationFrame(() => {
      resetLoopPosition();
      update();
    });
    return () => cancelAnimationFrame(id);
  }, [itemsCount, loopEnabled, resetLoopPosition, update]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, update]);

  return { canLeft, canRight, scroll, scrollToStart };
}
