import React from "react";
import { Bell } from "lucide-react";
import { useModal } from "../../modals/useModal";

export default function ModalNotifications() {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        width: "92vw",
        maxWidth: 420,
        padding: "22px 20px 18px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          margin: "0 auto 14px",
          background: "rgba(94,48,165,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5E30A5",
        }}
      >
        <Bell size={26} />
      </div>

      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          color: "#5E30A5",
          marginBottom: 8,
        }}
      >
        Notificaciones
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#4B5563",
          fontSize: 14,
          lineHeight: 1.5,
          marginBottom: 18,
        }}
      >
        Configura tus preferencias desde esta seccion.
      </p>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={closeModal}
          className="text-sm font-semibold text-[#5E30A5] hover:text-[#4B2488]"
        >
          Listo
        </button>
      </div>
    </div>
  );
}
