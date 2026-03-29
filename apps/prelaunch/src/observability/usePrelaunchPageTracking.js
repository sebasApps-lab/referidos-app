import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ingestPrelaunchEvent,
  ingestPrelaunchEventKeepalive,
} from "../services/prelaunchSystem";

function buildBaseProps(page, tree, route) {
  return {
    page,
    tree,
    route,
  };
}

function getScrollPercentage() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 0;
  }

  const root = document.documentElement;
  const scrollable = Math.max(root.scrollHeight - window.innerHeight, 0);
  if (scrollable <= 0) {
    return 100;
  }

  return Math.max(
    0,
    Math.min(100, Math.round((window.scrollY / scrollable) * 100)),
  );
}

export default function usePrelaunchPageTracking({
  path = "/",
  page = "prelaunch_page",
  tree = "desktop",
  route = "/",
  sections = [],
} = {}) {
  const startedAtRef = useRef(Date.now());
  const seenSectionsRef = useRef(new Set());
  const maxScrollPctRef = useRef(0);
  const lastSectionIdRef = useRef(null);
  const lastSectionOrderRef = useRef(0);
  const leaveSentRef = useRef(false);

  const baseProps = useMemo(() => buildBaseProps(page, tree, route), [page, route, tree]);

  const emitEvent = useCallback(
    (eventType, props = {}) =>
      ingestPrelaunchEvent(eventType, {
        path,
        props: {
          ...baseProps,
          ...props,
        },
      }),
    [baseProps, path],
  );

  const emitKeepaliveEvent = useCallback(
    (eventType, props = {}) =>
      ingestPrelaunchEventKeepalive(eventType, {
        path,
        props: {
          ...baseProps,
          ...props,
        },
      }),
    [baseProps, path],
  );

  const trackLinkClick = useCallback(
    ({
      linkId,
      targetPath = "",
      targetKind = "internal",
      surface = "unknown",
      label = "",
    }) =>
      emitEvent("link_click", {
        link_id: linkId,
        target_path: targetPath,
        target_kind: targetKind,
        surface,
        label,
      }),
    [emitEvent],
  );

  const trackModalView = useCallback(
    ({ modalId, surface = "unknown" }) =>
      emitEvent("modal_view", {
        modal_id: modalId,
        surface,
      }),
    [emitEvent],
  );

  const trackModalClose = useCallback(
    ({ modalId, surface = "unknown", reason = "dismiss" }) =>
      emitEvent("modal_close", {
        modal_id: modalId,
        surface,
        reason,
      }),
    [emitEvent],
  );

  useEffect(() => {
    void emitEvent("page_view");
  }, [emitEvent]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const referralCode = new URLSearchParams(window.location.search).get("ref");
    if (!referralCode) {
      return;
    }

    void emitEvent("waitlist_referral_visit", {
      referral_code_present: true,
    });
  }, [emitEvent]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function handleScroll() {
      maxScrollPctRef.current = Math.max(maxScrollPctRef.current, getScrollPercentage());
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.getAttribute("data-prelaunch-section-id");
          if (!sectionId || seenSectionsRef.current.has(sectionId)) {
            return;
          }

          const sectionOrder = Number(
            entry.target.getAttribute("data-prelaunch-section-order") || 0,
          );
          const sectionSurface =
            entry.target.getAttribute("data-prelaunch-section-surface") || sectionId;

          seenSectionsRef.current.add(sectionId);
          if (sectionOrder >= lastSectionOrderRef.current) {
            lastSectionOrderRef.current = sectionOrder;
            lastSectionIdRef.current = sectionId;
          }

          void emitEvent("section_view", {
            section_id: sectionId,
            section_order: sectionOrder,
            surface: sectionSurface,
          });
        });
      },
      {
        threshold: 0.45,
      },
    );

    const observedNodes = [];

    sections.forEach((section) => {
      const node = section.selector
        ? document.querySelector(section.selector)
        : document.getElementById(section.id);
      if (!node) {
        return;
      }

      node.setAttribute("data-prelaunch-section-id", section.id);
      node.setAttribute("data-prelaunch-section-order", String(section.order || 0));
      node.setAttribute(
        "data-prelaunch-section-surface",
        String(section.surface || section.id),
      );
      observer.observe(node);
      observedNodes.push(node);
    });

    return () => {
      observedNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [emitEvent, sections]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function handleLeave(reason) {
      if (leaveSentRef.current) {
        return;
      }

      leaveSentRef.current = true;
      const elapsedMs = Math.max(0, Date.now() - startedAtRef.current);

      void emitKeepaliveEvent("page_leave", {
        reason,
        elapsed_ms: elapsedMs,
        max_scroll_pct: maxScrollPctRef.current,
        last_section_id: lastSectionIdRef.current,
      });
    }

    function handlePageHide() {
      handleLeave("pagehide");
    }

    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [emitKeepaliveEvent]);

  return {
    trackLinkClick,
    trackModalView,
    trackModalClose,
    trackEvent: emitEvent,
  };
}
