import React from "react";
import { useModal } from "../../modals/useModal";

export default function ModalAbandonarRegistro({ onAbandon, onStay }) {
  const { closeModal } = useModal();

  const handleAbandon = () => {
    closeModal();
    onAbandon?.();
  };

  const handleStay = () => {
    closeModal();
    onStay?.();
  };

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
        ¿Seguro que quieres abandonar el registro?
      </h2>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        Si sales ahora perderás el progreso del registro de tu negocio.
      </p>

      <div className="flex justify-between">
        <button
          onClick={handleAbandon}
          className="text-sm font-semibold text-gray-600 hover:text-gray-800"
          style={{ textDecoration: "none" }}
        >
          Abandonar
        </button>

        <button
          onClick={handleStay}
          className="text-sm font-semibold text-[#5E30A5] hover:text-[#4b2784]"
          style={{ textDecoration: "none" }}
        >
          Continuar registro
        </button>
      </div>
    </div>
  );
}
