// src/components/cards/PromoCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";

const LOCAL_PURPLE = "#7C5CD6";

export default function PromoCard({ promo, rating }) {
  const navigate = useNavigate();

  const goDetalle = () => navigate(`/detalle/${promo.id}`);

  const localName =
    promo.localName || // ESTA es la correcta proveniente de simulatedData.js
    promo.nombreLocal ||
    promo.local ||
    promo.negocio ||
    promo.nombre ||
    promo.restaurant ||
    "Local";

  return (
    <div
      onClick={goDetalle}
      style={{
        width: "94%",
        maxWidth: 400,
        marginRight: 16,
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
          border: "1px solid #E8E8E8",
        }}
      >
        {/* Imagen */}
        <div
          style={{
            width: "100%",
            height: 180,
            backgroundImage: promo.imagen ? `url(${promo.imagen})` : undefined,
            backgroundColor: "#DDD",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div style={{ padding: 16 }}>
          {/* Título + Rating */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
              color: "#484848ff",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                color: "#484848ff", // gris oscuro
                fontSize: 15,
                lineHeight: "18px",
                marginRight: 8,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {promo.titulo}
            </h3>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFD54A"
                stroke="#000"
                strokeWidth="0.6"
              >
                <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.548L19.335 24 12 20.013 4.665 24l1.636-8.702L.6 9.75l7.732-1.732z" />
              </svg>
              <span style={{ marginLeft: 4, fontWeight: 700 }}>{rating}</span>
            </div>
          </div>

          {/* Descripción */}
          <p
            style={{
              fontSize: 13,
              color: "#8A8A8A",
              lineHeight: "16px",
              marginBottom: 8,
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {promo.descripcion}
          </p>

          {/* Nombre del negocio */}
          <div
            style={{
              fontWeight: 600,
              color: LOCAL_PURPLE,
              marginBottom: 8,
              fontSize: 14,
            }}
          >
            {localName}
          </div>

          {/* Sector + Fecha */}
          <div style={{ marginTop: 6 }}>
            {/* Sector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#6B6B6B",
                marginBottom: 4,
                fontSize: 12, // reducido
              }}
            >
              <svg
                width="13" // reducido
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6B6B"
                strokeWidth="1.5"
                style={{ flexShrink: 0 }}
              >
                <path d="M12 21s8-4.534 8-10A8 8 0 0 0 4 11c0 5.466 8 10 8 10z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
              <span style={{ marginLeft: 6 }}>{promo.sector}</span>
            </div>

            {/* Fecha */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#6B6B6B",
                fontSize: 12, // reducido
              }}
            >
              <svg
                width="13" // reducido
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6B6B"
                strokeWidth="1.5"
                style={{ flexShrink: 0 }}
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
              </svg>
              <span style={{ marginLeft: 6 }}>
                Hasta {formatDateIsoToDdMmYyyy(promo.fin)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
