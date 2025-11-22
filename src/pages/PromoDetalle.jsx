import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PromoDetalle() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          fontSize: 26,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ←
      </button>

      <h1 style={{ marginTop: 30, fontSize: 32, fontWeight: 700 }}>
        Detalles {id}
      </h1>
    </div>
  );
}
