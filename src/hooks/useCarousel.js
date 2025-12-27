// src/hooks/useCarousel.js
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export function useCarousel(
  ref,
  { loop = false, itemsCount = 0, loopPeek = 0, onInteract } = {}
) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const loopInitRef = useRef(false);
  const readyRef = useRef(false);
  const segmentRef = useRef(0);
  const jumpingRef = useRef(false);
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
    readyRef.current = true;
  }, [getPeek, getSegment, loopEnabled, ref]);

  const jumpTo = useCallback((el, nextLeft) => {
    if (!el || jumpingRef.current) return;
    jumpingRef.current = true;
    const prevBehavior = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = nextLeft;
    requestAnimationFrame(() => {
      el.style.scrollBehavior = prevBehavior || "";
      jumpingRef.current = false;
    });
  }, []);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (loopEnabled) {
      if (!readyRef.current) return;
      if (jumpingRef.current) return;
      const segment = segmentRef.current || getSegment(el);
      if (segment) {
        segmentRef.current = segment;
        const peek = getPeek(el);
        const boundary = Math.max(4, Math.min(24, Math.floor(peek * 0.5) || 12));
        if (el.scrollLeft <= boundary) {
          jumpTo(el, el.scrollLeft + segment);
        } else if (el.scrollLeft >= segment * 2 + boundary) {
          jumpTo(el, el.scrollLeft - segment);
        }
      }

      const canScroll = el.scrollWidth - el.clientWidth > 2;
      setCanLeft(canScroll);
      setCanRight(canScroll);
      return;
    }

    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
  }, [getPeek, getSegment, loopEnabled, ref]);

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
      readyRef.current = false;
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
    if (loopEnabled && !readyRef.current) {
      return undefined;
    }
    el.addEventListener("scroll", update);
    const handleInteract = () => {
      onInteract?.();
    };
    el.addEventListener("pointerdown", handleInteract);
    el.addEventListener("touchstart", handleInteract);
    el.addEventListener("wheel", handleInteract, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("pointerdown", handleInteract);
      el.removeEventListener("touchstart", handleInteract);
      el.removeEventListener("wheel", handleInteract);
      window.removeEventListener("resize", update);
    };
  }, [onInteract, ref, update]);

  return { canLeft, canRight, scroll, scrollToStart };
}
