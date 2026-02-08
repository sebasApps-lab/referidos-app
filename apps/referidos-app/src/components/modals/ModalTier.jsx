// src/components/modals/ModalTier.jsx
import React from "react";
import ModalBase from "./ModalBase";
import { useModal } from "../../modals/useModal";

export default function ModalTier() {
  const { openModal } = useModal();

  const tiers = [
    { t: "🟦 Tier 1 — Explorador", d: "Has invitado a tu primer amigo." },
    { t: "🟩 Tier 2 — Conector", d: "Has invitado a X personas que usaron la promo." },
    { t: "🟧 Tier 3 — Influencer Local", d: "Has invitado a X personas." },
    { t: "🟨 Tier 4 — Embajador", d: "Has traído X personas en total." },
    { t: "🟪 Tier 5 — Leyenda de la Ciudad", d: "Has llevado a más de X personas." },
    { t: "🔥 Tier 6 — Élite Plus", d: "Estás en el top 1% de referidores del mes." },
  ];

  return (
    <ModalBase title="Tus Tiers">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tiers.map((t, i) => (
          <div
            key={i}
            style={{
              background: "#F7F3FF",
              padding: 12,
              borderRadius: 12,
              borderLeft: "4px solid #5E30A5",
            }}
          >
            <strong>{t.t}</strong>
            <p style={{ fontSize: 13, marginTop: 4 }}>{t.d}</p>
          </div>
        ))}
      </div>

      {/* BARRA DE PROGRESO */}
      <div style={{ marginTop: 18 }}>
        <div style={{ height: 10, background: "#DDD", borderRadius: 12 }}>
          <div
            style={{
              width: "40%",
              height: "100%",
              background: "#5E30A5",
              borderRadius: 12,
            }}
          />
        </div>
      </div>

      {/* BOTÓN BENEFICIOS */}
      <button
        onClick={() => openModal("Beneficios")}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          background: "#5E30A5",
          color: "white",
          borderRadius: 12,
          fontWeight: 700,
        }}
      >
        Ver beneficios
      </button>
    </ModalBase>
  );
}
