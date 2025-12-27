// src/hooks/useCarousel.js
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export function useCarousel(
  ref,
  {
    loop = false,
    itemsCount = 0,
    loopPeek = 0,
    onInteract,
    snap = true,
    snapDelay = 140,
    itemSelector = "[data-carousel-item]",
  } = {}
) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const readyRef = useRef(false);
  const segmentRef = useRef(0);
  const jumpingRef = useRef(false);
  const snappingRef = useRef(false);
  const snapTimerRef = useRef(null);
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

  const getItems = useCallback(
    (el) => Array.from(el.querySelectorAll(itemSelector)),
    [itemSelector]
  );

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

  const clampScrollLeft = useCallback((el, left) => {
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    return Math.max(0, Math.min(left, max));
  }, []);

  const getClosestItem = useCallback(
    (el, items = getItems(el)) => {
      if (!items.length) return null;
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = { item: items[0], index: 0, distance: Infinity };
      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - center);
        if (distance < closest.distance) {
          closest = { item, index, distance };
        }
      });
      return closest;
    },
    [getItems]
  );

  const centerItem = useCallback(
    (el, item, behavior = "smooth") => {
      if (!el || !item) return;
      const target =
        item.offsetLeft + item.offsetWidth / 2 - el.clientWidth / 2;
      const nextLeft = clampScrollLeft(el, target);
      if (behavior === "auto") {
        jumpTo(el, nextLeft);
        return;
      }
      el.scrollTo({ left: nextLeft, behavior });
    },
    [clampScrollLeft, jumpTo]
  );

  const centerInitialItem = useCallback(
    (behavior = "auto") => {
      const el = ref.current;
      if (!el) return;
      const items = getItems(el);
      if (!items.length) return;
      let target = items[0];
      if (loopEnabled) {
        const candidate = items.find(
          (item) =>
            item.dataset.carouselDup === "1" &&
            item.dataset.carouselIndex === "0"
        );
        if (candidate) target = candidate;
      }
      centerItem(el, target, behavior);
    },
    [centerItem, getItems, loopEnabled, ref]
  );

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
    }

    const items = getItems(el);
    if (!items.length) {
      setCanLeft(false);
      setCanRight(false);
      return;
    }

    const closest = getClosestItem(el, items);
    if (!closest) {
      setCanLeft(false);
      setCanRight(false);
      return;
    }

    if (!loopEnabled) {
      setCanLeft(closest.index > 0);
      setCanRight(closest.index < items.length - 1);
    }
  }, [getClosestItem, getItems, getPeek, getSegment, loopEnabled, ref]);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;

    const items = getItems(el);
    if (!items.length) return;
    const closest = getClosestItem(el, items);
    if (!closest) return;
    const delta = dir === "right" ? 1 : -1;
    let nextIndex = closest.index + delta;
    if (!loopEnabled) {
      if (nextIndex < 0 || nextIndex >= items.length) return;
    }
    nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
    centerItem(el, items[nextIndex], "smooth");
  };

  const scrollToStart = () => {
    const el = ref.current;
    if (!el) return;
    if (loopEnabled) {
      centerInitialItem("smooth");
      return;
    }
    const items = getItems(el);
    if (!items.length) return;
    centerItem(el, items[0], "smooth");
  };

  useLayoutEffect(() => {
    readyRef.current = false;
    const id = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      if (loopEnabled) {
        const segment = getSegment(el);
        if (segment) {
          segmentRef.current = segment;
        }
      }
      centerInitialItem("auto");
      readyRef.current = true;
      update();
    });
    return () => cancelAnimationFrame(id);
  }, [centerInitialItem, getSegment, itemsCount, loopEnabled, update]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const snapToClosest = () => {
      if (!snap || snappingRef.current) return;
      if (loopEnabled && !readyRef.current) return;
      if (jumpingRef.current) return;
      const items = getItems(el);
      if (!items.length) return;
      const closest = getClosestItem(el, items);
      if (!closest) return;
      snappingRef.current = true;
      centerItem(el, closest.item, "smooth");
      requestAnimationFrame(() => {
        snappingRef.current = false;
      });
    };

    const scheduleSnap = () => {
      if (!snap) return;
      if (loopEnabled && !readyRef.current) return;
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
      snapTimerRef.current = setTimeout(snapToClosest, snapDelay);
    };

    const handleScroll = () => {
      update();
      scheduleSnap();
    };

    update();
    if (loopEnabled && !readyRef.current) {
      return undefined;
    }
    el.addEventListener("scroll", handleScroll);
    const handleInteract = () => {
      onInteract?.();
    };
    el.addEventListener("pointerdown", handleInteract);
    el.addEventListener("touchstart", handleInteract);
    el.addEventListener("wheel", handleInteract, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("pointerdown", handleInteract);
      el.removeEventListener("touchstart", handleInteract);
      el.removeEventListener("wheel", handleInteract);
      window.removeEventListener("resize", update);
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
    };
  }, [
    centerItem,
    getClosestItem,
    getItems,
    loopEnabled,
    onInteract,
    ref,
    snap,
    snapDelay,
    update,
  ]);

  return { canLeft, canRight, scroll, scrollToStart };
}
