// src/components/header/Header.jsx
import React from "react";

const BRAND_PURPLE = "#5E30A5";
const BRAND_YELLOW = "#FFF3CD";
const REFERRAL_GREEN = "#A6F28F";
const LOCAL_PURPLE = "#7C5CD6";

export default function Header({
  usuario,
  locAllowed,
  hideLocationBar,
  onCloseLocationBar,
  onOpenTier,
  onOpenGrupo,
  onOpenMenu,
}) {
  return (
    <>
      {/* BARRA AMARILLA DE UBICACIÓN */}
      {!hideLocationBar && locAllowed === false && (
        <div style={{ width: "100%", background: BRAND_YELLOW }}>
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              padding: "6px 16px",
            }}
          >
            <div
              style={{
                color: "#6B5E00",
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
                background: "#FFF8D8",
              }}
            >
              <div style={{ fontSize: 13 }}>
                La app usa tu ubicación para mostrar promos cercanas.
              </div>

              <button
                onClick={onCloseLocationBar}
                style={{
                  background: "transparent",
                  border: 0,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FRANJA MORADA */}
      <header
        style={{
          background: BRAND_PURPLE,
          color: "#fff",
          paddingTop: hideLocationBar || locAllowed !== false ? 20 : 56,
          paddingBottom: 20,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          {/* IZQUIERDA: tier + avatar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <button
              onClick={onOpenTier}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                border: 0,
                padding: "6px 10px",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {usuario?.tier ? usuario.tier : "Tier 1 — Explorador"}
            </button>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `3px solid ${LOCAL_PURPLE}`,
                  background: "#fff",
                }}
              />
            </div>
          </div>

          {/* CENTRO: textos */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>
              Bienvenido, {usuario?.nombre || "usuario"}
            </div>

            <div style={{ marginTop: 6, opacity: 0.95 }}>
              Encuentra las mejores promos cerca de ti.
            </div>

            {/* REFERIDOS + GRUPO */}
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  color: REFERRAL_GREEN,
                  fontWeight: 800,
                }}
              >
                {usuario?.referidosCount
                  ? `${usuario.referidosCount} referidos`
                  : "0 referidos"}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: -12,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    marginRight: 8,
                  }}
                >
                  grupo::
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={onOpenGrupo}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#E6E6E6",
                      border: "2px solid #ffffff",
                    }}
                  />
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#E6E6E6",
                      border: "2px solid #ffffff",
                      transform: "translateX(-12px)",
                    }}
                  />
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#E6E6E6",
                      border: "2px solid #ffffff",
                      transform: "translateX(-24px)",
                    }}
                  />

                  {/* botón + */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#ffffff",
                      border: "2px dashed #CFCFCF",
                      transform: "translateX(-36px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6B6B6B",
                      fontWeight: 700,
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DERECHA: hamburguesa */}
          <div style={{ display: "flex", alignItems: "start" }}>
            <button
              onClick={onOpenMenu}
              style={{
                background: "transparent",
                border: 0,
                color: "#fff",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
