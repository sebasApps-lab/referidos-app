// src/components/modals/ModalGrupo.jsx

import React from "react";
import { useModal } from "../../modals/useModal";

const BRAND_PURPLE = "#5E30A5";

export default function ModalGrupo() {
  const { closeModal } = useModal();

  // Simulación de 7 espacios (pueden ser null)
  const miembros = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.44)",
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "white",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: 20,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: BRAND_PURPLE,
            }}
          >
            Mi Grupo
          </h2>

          <button
            onClick={closeModal}
            style={{
              background: "transparent",
              fontSize: 22,
              border: 0,
              color: "#666",
              marginTop: -4,
            }}
          >
            ×
          </button>
        </div>

        <p
          style={{
            fontSize: 13,
            color: "#666",
            marginBottom: 18,
          }}
        >
          El grupo se creará automáticamente al escanear un código.
        </p>

        {/* GRID 2 x 4 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginTop: 10,
          }}
        >
          {miembros.map((m, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 14,
                background: "#EAEAEA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {m ? (
                <img
                  src={m}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ fontSize: 20, color: "#AAA" }}>—</span>
              )}
            </div>
          ))}

          {/* último cuadro → botón + */}
          <button
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 14,
              border: "2px dashed #5E30A5",
              background: "transparent",
              color: BRAND_PURPLE,
              fontSize: 26,
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
