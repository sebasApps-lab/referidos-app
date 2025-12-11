// src/modals/ModalProvider.jsx
import React, { useEffect, useState } from "react";
import { useModalStore } from "./modalStore";
import { modalRegistry } from "./modalRegistry";

export default function ModalProvider() {
  const activeModal = useModalStore((s) => s.activeModal);
  const modalProps = useModalStore((s) => s.modalProps);
  const closeModal = useModalStore((s) => s.closeModal);
  const [viewportH, setViewportH] = useState(
    typeof window !== "undefined"
      ? (window.visualViewport?.height ?? window.innerHeight)
      : 0
  );
  const [baseH, setBaseH] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    const update = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      setBaseH((prev) => (prev === 0 ? window.innerHeight : prev));
      setViewportH(vh);
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!activeModal) return null;

  const ModalComponent = modalRegistry[activeModal];
  if (!ModalComponent) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 14px",
        overflowY: "auto",
        minHeight: viewportH ? `${viewportH}px` : "100vh",
        height: viewportH ? `${viewportH}px` : "100dvh",
        boxSizing: "border-box",
        zIndex: 9999,
      }}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          transform:
            viewportH && baseH && viewportH > baseH * 0.95
              ? "translateY(-64px)"
              : "translateY(0)",
          transition: "transform 180ms ease",
        }}
      >
        <ModalComponent {...modalProps} />
      </div>
    </div>
  );
}
