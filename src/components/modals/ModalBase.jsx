// src/components/modals/ModalBase.jsx
import React from "react";
import { useModal } from "../../modals/useModal";

export default function ModalBase({ children, title, height = "auto" }) {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        margin: "0 auto",
        background: "white",
        borderRadius: 20,
        width: "92vw",
        maxWidth: 420,
        padding: 20,
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        position: "relative",
      }}
    >
      {/* TITULO */}
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          color: "#5E30A5",
          marginBottom: 16,
        }}
      >
        {title}
      </h2>

      {/* BOTÓN CERRAR */}
      <button
        onClick={closeModal}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 22,
          color: "#444",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* CONTENIDO */}
      <div>{children}</div>
    </div>
  );
}
