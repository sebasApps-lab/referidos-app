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
  const copyWidthRef = useRef(0);
  const jumpingRef = useRef(false);
  const snappingRef = useRef(false);
  const snapTimerRef = useRef(null);
  const reanchorTimerRef = useRef(null);
  const skipSnapUntilRef = useRef(0);
  const loopEnabled = loop && itemsCount > 1;

  const getItems = useCallback(
    (el) => Array.from(el.querySelectorAll(itemSelector)),
    [itemSelector]
  );

  const getCopyWidth = useCallback((items) => {
    if (!items.length) return 0;
    const firstDup0 = items.find(
      (item) =>
        item.dataset.carouselDup === "0" &&
        item.dataset.carouselIndex === "0"
    );
    const firstDup1 = items.find(
      (item) =>
        item.dataset.carouselDup === "1" &&
        item.dataset.carouselIndex === "0"
    );
    if (firstDup0 && firstDup1) {
      const width = firstDup1.offsetLeft - firstDup0.offsetLeft;
      if (width > 0) return width;
    }
    return 0;
  }, []);

  const jumpTo = useCallback((el, nextLeft) => {
    if (!el || jumpingRef.current) return;
    jumpingRef.current = true;
    const prevBehavior = el.style.scrollBehavior;
    const prevSnapType = el.style.scrollSnapType;
    el.style.scrollBehavior = "auto";
    el.style.scrollSnapType = "none";
    el.scrollLeft = nextLeft;
    requestAnimationFrame(() => {
      el.style.scrollBehavior = prevBehavior || "";
      el.style.scrollSnapType = prevSnapType || "";
      jumpingRef.current = false;
    });
  }, []);

  const clampScrollLeft = useCallback((el, left) => {
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    return Math.max(0, Math.min(left, max));
  }, []);

  const getClosestItem = useCallback(
    (el, items = getItems(el), preferDup = null) => {
      if (!items.length) return null;
      let candidates = items;
      if (preferDup !== null) {
        const filtered = items.filter(
          (item) => item.dataset.carouselDup === preferDup
        );
        if (filtered.length) candidates = filtered;
      }
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = { item: candidates[0], index: 0, distance: Infinity };
      candidates.forEach((item, index) => {
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
    const items = getItems(el);

    if (!items.length) {
      setCanLeft(false);
      setCanRight(false);
      return;
    }

    const closestAny = getClosestItem(el, items, null);
    if (!closestAny) {
      setCanLeft(false);
      setCanRight(false);
      return;
    }

    if (loopEnabled) {
      const canScroll = el.scrollWidth - el.clientWidth > 2;
      setCanLeft(canScroll);
      setCanRight(canScroll);
      return;
    }

    setCanLeft(closestAny.index > 0);
    setCanRight(closestAny.index < items.length - 1);
  }, [getClosestItem, getItems, loopEnabled, ref]);

  const reanchorIfNeeded = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (!readyRef.current || jumpingRef.current) return;
    const items = getItems(el);
    if (!items.length) return;
    const copyWidth = copyWidthRef.current || getCopyWidth(items);
    if (!copyWidth) return;
    copyWidthRef.current = copyWidth;
    const epsilon = 1;
    const min = copyWidth - epsilon;
    const max = copyWidth * 2 + epsilon;
    if (el.scrollLeft >= min && el.scrollLeft <= max) return;
    const normalized =
      ((el.scrollLeft % copyWidth) + copyWidth) % copyWidth;
    const target = clampScrollLeft(el, normalized + copyWidth);
    if (Math.abs(target - el.scrollLeft) <= epsilon) return;
    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current);
    }
    skipSnapUntilRef.current = performance.now() + 140;
    jumpTo(el, target);
  }, [
    clampScrollLeft,
    getCopyWidth,
    getItems,
    jumpTo,
    ref,
  ]);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;

    const items = getItems(el);
    if (!items.length) return;
    const closest = getClosestItem(
      el,
      items,
      loopEnabled ? "1" : null
    );
    if (!closest) return;
    const delta = dir === "right" ? 1 : -1;
    let nextIndex = closest.index + delta;
    if (!loopEnabled) {
      if (nextIndex < 0 || nextIndex >= items.length) return;
    }
    if (loopEnabled) {
      const dupItems = items.filter(
        (item) => item.dataset.carouselDup === "1"
      );
      nextIndex = Math.max(0, Math.min(nextIndex, dupItems.length - 1));
      centerItem(el, dupItems[nextIndex], "smooth");
      return;
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
      const items = getItems(el);
      if (loopEnabled) {
        const copyWidth = getCopyWidth(items);
        if (copyWidth) {
          copyWidthRef.current = copyWidth;
        }
      }
      centerInitialItem("auto");
      readyRef.current = true;
      update();
    });
    return () => cancelAnimationFrame(id);
  }, [centerInitialItem, getCopyWidth, getItems, itemsCount, loopEnabled, update]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const snapToClosest = () => {
      if (!snap || snappingRef.current) return;
      if (loopEnabled && !readyRef.current) return;
      if (jumpingRef.current) return;
      if (performance.now() < skipSnapUntilRef.current) return;
      const items = getItems(el);
      if (!items.length) return;
      const closest = getClosestItem(
        el,
        items,
        loopEnabled ? "1" : null
      );
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
      if (performance.now() < skipSnapUntilRef.current) return;
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
      snapTimerRef.current = setTimeout(snapToClosest, snapDelay);
    };

    const handleScroll = () => {
      if (loopEnabled) {
        update();
        if (reanchorTimerRef.current) {
          clearTimeout(reanchorTimerRef.current);
        }
        reanchorTimerRef.current = setTimeout(() => {
          reanchorIfNeeded();
        }, 120);
        return;
      }
      scheduleSnap();
    };

    if (loopEnabled) {
      update();
    }
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
      if (reanchorTimerRef.current) {
        clearTimeout(reanchorTimerRef.current);
      }
    };
  }, [
    centerItem,
    getClosestItem,
    getItems,
    loopEnabled,
    onInteract,
    reanchorIfNeeded,
    ref,
    snap,
    snapDelay,
    update,
  ]);

  return { canLeft, canRight, scroll, scrollToStart };
}
