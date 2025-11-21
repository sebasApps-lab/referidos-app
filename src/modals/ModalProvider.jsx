// src/modals/ModalProvider.jsx
import React from "react";
import { useModalStore } from "./modalStore";
import { modalRegistry } from "./modalRegistry";

export default function ModalProvider() {
  const activeModal = useModalStore((s) => s.activeModal);
  const modalProps = useModalStore((s) => s.modalProps);
  const closeModal = useModalStore((s) => s.closeModal);

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
        zIndex: 9999,
      }}
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%" }}>
        <ModalComponent {...modalProps} />
      </div>
    </div>
  );
}
