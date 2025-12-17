import React, { useEffect, useState, useRef } from "react";
import { useAppStore } from "../store/appStore";
import { runOnboardingCheck } from "../services/onboardingClient";

// cuando hagamos las cards reales
// import NegocioPromoCard from "../components/cards/NegocioPromoCard";

export default function NegocioHome() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;
    (async () => {
      const res = await runOnboardingCheck();
      if (res?.ok && res.usuario) setUser(res.usuario);
    })();
  }, [setUser]);

  // Ejemplos provisionales de promos del negocio
  // Cuando conectemos backend, reemplazamos esto
  const promosActivas = [];
  const promosInactivas = [];
  const promosPendientes = [];

  const [tab, setTab] = useState("activas");

  const renderEmptyMessage = () => {
    if (tab === "activas") {
      if (promosActivas.length === 0) {
        const haCreadoAntes =
          promosInactivas.length > 0 || promosPendientes.length > 0;

        return (
          <p style={{ padding: "12px 0", color: "#666", textAlign: "center" }}>
            {haCreadoAntes
              ? "Publica una promo y no pierdas más clientes."
              : "Añade tu primera promo y empieza a atraer nuevos clientes."}
          </p>
        );
      }
    }

    if (tab === "inactivas" && promosInactivas.length === 0) {
      return (
        <p style={{ padding: "12px 0", color: "#666", textAlign: "center" }}>
          Tus promos INACTIVAS se verán aquí.
        </p>
      );
    }

    if (tab === "pendientes" && promosPendientes.length === 0) {
      return (
        <p style={{ padding: "12px 0", color: "#666", textAlign: "center" }}>
          Tus promos en cola se mostrarán en este espacio.
        </p>
      );
    }

    return null;
  };

  const renderPromos = () => {
    let list = [];

    if (tab === "activas") list = promosActivas;
    if (tab === "inactivas") list = promosInactivas;
    if (tab === "pendientes") list = promosPendientes;

    if (list.length === 0) return renderEmptyMessage();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {list.map((promo) => (
          // <NegocioPromoCard key={promo.id} promo={promo} />
          <div
            key={promo.id}
            style={{
              background: "#fafafa",
              borderRadius: 14,
              padding: 20,
              border: "1px solid #eee",
            }}
          >
            CARD DEMO — reemplazar por NegocioPromoCard.jsx
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "16px 16px 120px",
      }}
    >
      {/* Título principal */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: "#5E30A5",
          }}
        >
          Mis Promos
        </h2>

        <button
          style={{
            background: "#5E30A5",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => console.log("Añadir promo")}
        >
          Añadir
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 24,
          borderBottom: "1px solid #ddd",
          paddingBottom: 10,
        }}
      >
        {["activas", "inactivas", "pendientes"].map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                padding: "6px 8px",
                fontSize: 15,
                fontWeight: active ? 700 : 500,
                color: active ? "#5E30A5" : "#666",
                borderBottom: active ? "2px solid #5E30A5" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Contenido de la tab */}
      {renderPromos()}
    </div>
  );
}
