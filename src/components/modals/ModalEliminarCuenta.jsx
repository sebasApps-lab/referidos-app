import React, { useEffect, useState } from "react";
import { useModal } from "../../modals/useModal";

export default function ModalEliminarCuenta({ onConfirm, onCancel, deleting = false }) {
  const { closeModal } = useModal();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const handleCancel = () => {
    closeModal();
    onCancel?.();
  };

  const handleConfirm = () => {
    if (countdown > 0 || deleting) return;
    onConfirm?.();
  };

  const disabled = countdown > 0 || deleting;

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
        ¿Seguro que quieres eliminar la cuenta?
      </h2>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        Se perderán todos tus datos. Este proceso es irreversible.
      </p>

      <div className="flex justify-between">
        <button
          onClick={handleConfirm}
          disabled={disabled}
          className={`text-sm font-semibold ${disabled ? "text-red-300 cursor-not-allowed" : "text-red-600 hover:text-red-700"}`}
          style={{ textDecoration: "none" }}
        >
          {deleting ? "Eliminando..." : countdown > 0 ? `Eliminar cuenta (${countdown})` : "Eliminar cuenta"}
        </button>

        <button
          onClick={handleCancel}
          className="text-sm font-semibold text-gray-700 hover:text-gray-900"
          style={{ textDecoration: "none" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
