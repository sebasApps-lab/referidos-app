import React from "react";
import { useModal } from "../../modals/useModal";

export default function ModalCuentaExistente({ message }) {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        width: "92vw",
        maxWidth: 420,
        padding: "20px 20px 14px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          color: "#5E30A5",
          marginBottom: 12,
        }}
      >
        Cuenta existente
      </h2>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">{message}</p>

      <div className="flex justify-end">
        <button
          onClick={closeModal}
          className="text-sm font-semibold text-[#5E30A5] hover:text-[#4b2784]"
          style={{ textDecoration: "none" }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
