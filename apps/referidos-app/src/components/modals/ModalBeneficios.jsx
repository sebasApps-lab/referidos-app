// src/components/modals/ModalBeneficios.jsx
import React from "react";
import ModalBase from "./ModalBase";
import { useModal } from "../../modals/useModal";

export default function ModalBeneficios() {
  const { openModal } = useModal();

  const beneficios = [
    {
      tier: "🟦 Tier 1",
      list: ["Acceso a promos básicas"],
    },
    {
      tier: "🟩 Tier 2",
      list: ["Acceso a promos exclusivas", "Badges visuales"],
    },
    {
      tier: "🟧 Tier 3",
      list: [
        "Promos más potentes",
        "Mayor porcentaje de descuento",
        "Prioridad en desbloquear nuevas promos",
      ],
    },
    {
      tier: "🟨 Tier 4",
      list: [
        "Promos únicas para embajadores",
        "Invitaciones dobles o triples",
        "Acceso anticipado a nuevos negocios",
      ],
    },
    {
      tier: "🟪 Tier 5",
      list: [
        "Insignia morada permanente",
        "Premios trimestrales",
        "Participación en sorteos VIP",
        "Propuestas especiales de negocios",
      ],
    },
    {
      tier: "🔥 Tier 6",
      list: [
        "Recompensas físicas",
        "Mega-promos exclusivas",
        "Acceso a concursos locales",
      ],
    },
  ];

  return (
    <ModalBase title="Beneficios por Tier">
      <button
        onClick={() => openModal("Tier")}
        style={{
          marginBottom: 14,
          background: "none",
          border: "none",
          color: "#5E30A5",
          fontWeight: 700,
          fontSize: 15,
          display: "flex",
          alignItems: "center",
        }}
      >
        ← Volver
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {beneficios.map((b, i) => (
          <div
            key={i}
            style={{
              background: "#F9F7FF",
              padding: 12,
              borderRadius: 12,
              borderLeft: "4px solid #5E30A5",
            }}
          >
            <strong>{b.tier}</strong>
            <ul style={{ marginTop: 6, marginLeft: 14, fontSize: 13 }}>
              {b.list.map((l, j) => (
                <li key={j}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ModalBase>
  );
}
