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
  const jumpingRef = useRef(false);
  const snappingRef = useRef(false);
  const snapTimerRef = useRef(null);
  const reanchorTimerRef = useRef(null);
  const finalSnapTimerRef = useRef(null);
  const skipSnapUntilRef = useRef(0);
  const lastScrollLeftRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const interactingRef = useRef(false);
  const interactionTimerRef = useRef(null);
  const idleThresholdMs = 140;
  const stableIdleMs = 220;
  const loopEnabled = loop && itemsCount > 1;

  const getItems = useCallback(
    (el) => Array.from(el.querySelectorAll(itemSelector)),
    [itemSelector]
  );

  const jumpTo = useCallback((el, nextLeft, { suppressSnap = false } = {}) => {
    if (!el || jumpingRef.current) return;
    jumpingRef.current = true;
    const prevBehavior = el.style.scrollBehavior;
    const prevSnapType = el.style.scrollSnapType;
    if (suppressSnap) {
      el.style.scrollSnapType = "none";
    }
    el.style.scrollBehavior = "auto";
    el.scrollLeft = nextLeft;
    requestAnimationFrame(() => {
      el.style.scrollBehavior = prevBehavior || "";
      if (suppressSnap) {
        el.style.scrollSnapType = prevSnapType || "";
      }
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

  const getLoopCenterDup = useCallback((items) => {
    const dupValues = Array.from(
      new Set(
        items
          .map((item) => item.dataset.carouselDup)
          .filter((dup) => dup != null)
      )
    );
    if (!dupValues.length) return null;
    dupValues.sort((a, b) => Number(a) - Number(b));
    return dupValues[Math.floor(dupValues.length / 2)];
  }, []);

  const getLoopGeometry = useCallback((items) => {
    const dupValues = Array.from(
      new Set(
        items
          .map((item) => item.dataset.carouselDup)
          .filter((dup) => dup != null)
      )
    );
    if (dupValues.length < 2) return null;
    dupValues.sort((a, b) => Number(a) - Number(b));
    const centerIndex = Math.floor(dupValues.length / 2);
    const centerDup = dupValues[centerIndex];
    const nextDup = dupValues[centerIndex + 1];
    if (!centerDup || !nextDup) return null;
    const findFirst = (dup) =>
      items.find(
        (item) =>
          item.dataset.carouselDup === dup &&
          item.dataset.carouselIndex === "0"
      );
    const centerFirst = findFirst(centerDup);
    const nextFirst = findFirst(nextDup);
    if (!centerFirst || !nextFirst) return null;
    const span = nextFirst.offsetLeft - centerFirst.offsetLeft;
    if (!span) return null;
    return {
      centerDup,
      centerStart: centerFirst.offsetLeft,
      span,
    };
  }, []);

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
        const centerDup = getLoopCenterDup(items);
        const candidate = items.find(
          (item) =>
            item.dataset.carouselDup === centerDup &&
            item.dataset.carouselIndex === "0"
        );
        if (candidate) target = candidate;
      }
      centerItem(el, target, behavior);
    },
    [centerItem, getItems, getLoopCenterDup, loopEnabled, ref]
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
    if (!el) return true;
    if (!readyRef.current || jumpingRef.current) return false;
    if (interactingRef.current) return false;
    const idleFor = performance.now() - lastScrollTimeRef.current;
    if (idleFor < idleThresholdMs) return false;
    const items = getItems(el);
    if (!items.length) return true;
    const geometry = getLoopGeometry(items);
    if (!geometry) return true;
    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current);
    }
    skipSnapUntilRef.current = performance.now() + 80;
    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    const offsetFromCenter = viewportCenter - geometry.centerStart;
    const shiftCopies = Math.floor(offsetFromCenter / geometry.span);
    if (shiftCopies === 0) return true;
    const shift = -shiftCopies * geometry.span;
    const nextLeft = clampScrollLeft(el, el.scrollLeft + shift);
    if (Math.abs(el.scrollLeft - nextLeft) < 0.5) {
      return true;
    }
    jumpTo(el, nextLeft, { suppressSnap: true });
    return true;
  }, [
    clampScrollLeft,
    getItems,
    getLoopCenterDup,
    getLoopGeometry,
    idleThresholdMs,
    jumpTo,
    ref,
  ]);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;

    const items = getItems(el);
    if (!items.length) return;
    const centerDup = loopEnabled ? getLoopCenterDup(items) : null;
    const closest = getClosestItem(
      el,
      items,
      loopEnabled && centerDup ? centerDup : null
    );
    if (!closest) return;
    const delta = dir === "right" ? 1 : -1;
    let nextIndex = closest.index + delta;
    if (!loopEnabled) {
      if (nextIndex < 0 || nextIndex >= items.length) return;
    }
    if (loopEnabled && centerDup) {
      const dupItems = items.filter(
        (item) => item.dataset.carouselDup === centerDup
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
      centerInitialItem("auto");
      readyRef.current = true;
      update();
    });
    return () => cancelAnimationFrame(id);
  }, [centerInitialItem, itemsCount, loopEnabled, update]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reanchorDelayMs = snapDelay + 120;

    const snapToClosest = () => {
      if (!snap || snappingRef.current) return;
      if (loopEnabled && !readyRef.current) return;
      if (jumpingRef.current) return;
      if (performance.now() < skipSnapUntilRef.current) return;
      if (loopEnabled) {
        if (interactingRef.current) return;
        const idleFor = performance.now() - lastScrollTimeRef.current;
        if (idleFor < idleThresholdMs) return;
      }
      const items = getItems(el);
      if (!items.length) return;
      const closest = getClosestItem(el, items, null);
      if (!closest) return;
      snappingRef.current = true;
      centerItem(el, closest.item, "smooth");
      requestAnimationFrame(() => {
        snappingRef.current = false;
      });
    };

    const ensureFinalSnap = () => {
      if (!loopEnabled || !snap) return true;
      if (jumpingRef.current || snappingRef.current) return false;
      if (interactingRef.current) return true;
      const idleFor = performance.now() - lastScrollTimeRef.current;
      if (idleFor < stableIdleMs) return false;
      const items = getItems(el);
      if (!items.length) return true;
      const closest = getClosestItem(el, items, null);
      if (!closest) return true;
      snappingRef.current = true;
      centerItem(el, closest.item, "smooth");
      requestAnimationFrame(() => {
        snappingRef.current = false;
      });
      return true;
    };

    const scheduleSnap = () => {
      if (!snap) return;
      if (loopEnabled && !readyRef.current) return;
      if (performance.now() < skipSnapUntilRef.current) return;
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
      snapTimerRef.current = setTimeout(() => {
        snapToClosest();
        if (loopEnabled) {
          if (interactingRef.current) {
            scheduleSnap();
            return;
          }
          const idleFor = performance.now() - lastScrollTimeRef.current;
          if (idleFor < idleThresholdMs) {
            scheduleSnap();
          }
        }
      }, snapDelay);
    };

    const scheduleFinalSnap = () => {
      if (!loopEnabled) return;
      if (finalSnapTimerRef.current) {
        clearTimeout(finalSnapTimerRef.current);
      }
      finalSnapTimerRef.current = setTimeout(() => {
        const done = ensureFinalSnap();
        if (!done) {
          scheduleFinalSnap();
        }
      }, stableIdleMs + 40);
    };

    const scheduleReanchor = () => {
      if (!loopEnabled) return;
      if (reanchorTimerRef.current) {
        clearTimeout(reanchorTimerRef.current);
      }
      reanchorTimerRef.current = setTimeout(() => {
        if (snappingRef.current || jumpingRef.current) {
          scheduleReanchor();
          return;
        }
        const done = reanchorIfNeeded();
        if (!done) {
          scheduleReanchor();
        }
        scheduleFinalSnap();
      }, reanchorDelayMs);
    };

    const handleScroll = () => {
      const now = performance.now();
      const prevLeft = lastScrollLeftRef.current;
      const prevTime = lastScrollTimeRef.current || now;
      const delta = el.scrollLeft - prevLeft;
      const dt = Math.max(1, now - prevTime);
      velocityRef.current = Math.abs(delta) / dt;
      lastScrollLeftRef.current = el.scrollLeft;
      lastScrollTimeRef.current = now;
      update();
      if (!loopEnabled) {
        scheduleSnap();
      }
      scheduleReanchor();
      scheduleFinalSnap();
    };

    update();
    lastScrollLeftRef.current = el.scrollLeft;
    lastScrollTimeRef.current = performance.now();
    if (loopEnabled && !readyRef.current) {
      return undefined;
    }
    el.addEventListener("scroll", handleScroll);
    const handleInteract = (event) => {
      onInteract?.();
      interactingRef.current = true;
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
        interactionTimerRef.current = null;
      }
      if (event?.type === "wheel") {
        interactionTimerRef.current = setTimeout(() => {
          interactingRef.current = false;
          interactionTimerRef.current = null;
        }, idleThresholdMs);
      }
    };
    const handleRelease = () => {
      interactingRef.current = false;
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
        interactionTimerRef.current = null;
      }
      if (loopEnabled) {
        scheduleSnap();
      }
      scheduleReanchor();
      scheduleFinalSnap();
    };
    el.addEventListener("pointerdown", handleInteract);
    el.addEventListener("touchstart", handleInteract);
    el.addEventListener("wheel", handleInteract, { passive: true });
    el.addEventListener("pointerup", handleRelease);
    el.addEventListener("touchend", handleRelease);
    el.addEventListener("touchcancel", handleRelease);
    window.addEventListener("mouseup", handleRelease);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("pointerdown", handleInteract);
      el.removeEventListener("touchstart", handleInteract);
      el.removeEventListener("wheel", handleInteract);
      el.removeEventListener("pointerup", handleRelease);
      el.removeEventListener("touchend", handleRelease);
      el.removeEventListener("touchcancel", handleRelease);
      window.removeEventListener("mouseup", handleRelease);
      window.removeEventListener("resize", update);
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
      if (reanchorTimerRef.current) {
        clearTimeout(reanchorTimerRef.current);
      }
      if (finalSnapTimerRef.current) {
        clearTimeout(finalSnapTimerRef.current);
      }
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
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
