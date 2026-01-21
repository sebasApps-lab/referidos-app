// src/modals/ModalProvider.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "./modalStore";
import { modalRegistry } from "./modalRegistry";

export default function ModalProvider() {
  const activeModal = useModalStore((s) => s.activeModal);
  const modalProps = useModalStore((s) => s.modalProps);
  const closeModal = useModalStore((s) => s.closeModal);
  const modalContentRef = useRef(null);
  const viewportLockRef = useRef(false);
  const unlockTimerRef = useRef(null);
  const keyboardOpenRef = useRef(false);
  const [viewportH, setViewportH] = useState(
    typeof window !== "undefined"
      ? (window.visualViewport?.height ?? window.innerHeight)
      : 0
  );
  const [baseH, setBaseH] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const isFullScreenOverlay =
    activeModal === "SplashChoiceOverlay" || activeModal === "SplashEmailConfirmation";
  const disableBackdropClose = activeModal === "SplashEmailConfirmation";

  const updateViewport = (force = false) => {
    if (!force && viewportLockRef.current) return;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    const base = window.innerHeight;
    setBaseH((prev) => (prev === 0 ? base : prev));
    if (activeModal === "AccessMethods") {
      const delta = base - vh;
      if (!keyboardOpenRef.current) {
        setViewportH(vh);
        if (delta > 20) {
          keyboardOpenRef.current = true;
          viewportLockRef.current = true;
        }
      } else if (delta < 10) {
        keyboardOpenRef.current = false;
        viewportLockRef.current = false;
        setViewportH(vh);
      }
      return;
    }
    setViewportH(vh);
  };

  useEffect(() => {
    const update = () => updateViewport();
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (activeModal === "AccessMethods") {
      keyboardOpenRef.current = false;
      viewportLockRef.current = false;
    } else {
      keyboardOpenRef.current = false;
      viewportLockRef.current = false;
      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = null;
      }
    }
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const prevBodyOverflow = bodyStyle.overflow;
    const prevBodyTouch = bodyStyle.touchAction;
    const prevHtmlOverflow = htmlStyle.overflow;
    bodyStyle.overflow = "hidden";
    bodyStyle.touchAction = "none";
    htmlStyle.overflow = "hidden";
    return () => {
      bodyStyle.overflow = prevBodyOverflow;
      bodyStyle.touchAction = prevBodyTouch;
      htmlStyle.overflow = prevHtmlOverflow;
    };
  }, [activeModal]);

  if (!activeModal) return null;
  if (typeof document === "undefined") return null;

  const ModalComponent = modalRegistry[activeModal];
  if (!ModalComponent) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: isFullScreenOverlay ? "transparent" : "rgba(0,0,0,0.45)",
        backdropFilter: isFullScreenOverlay ? "none" : "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isFullScreenOverlay ? "0" : "24px 14px",
        overflow: "hidden",
        minHeight: viewportH ? `${viewportH}px` : "100vh",
        height: viewportH ? `${viewportH}px` : "100dvh",
        boxSizing: "border-box",
        zIndex: 9999,
      }}
      onClick={disableBackdropClose ? undefined : closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform:
            !isFullScreenOverlay &&
            viewportH &&
            baseH &&
            viewportH > baseH * 0.95
              ? "translateY(-64px)"
              : "translateY(0)",
          transition: "transform 180ms ease",
        }}
      >
        <div ref={modalContentRef} className="w-full">
          <ModalComponent {...modalProps} />
        </div>
      </div>
    </div>,
    document.body
  );
}
