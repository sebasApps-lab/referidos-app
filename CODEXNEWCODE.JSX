import React, { useRef, useLayoutEffect } from "react";

const BRAND_PURPLE = "#5E30A5";
const BRAND_YELLOW = "#FFF3CD";
const REFERRAL_GREEN = "#A6F28F";
const LOCAL_PURPLE = "#7C5CD6";

const AVATAR_MALE = "https://cdn-icons-png.flaticon.com/512/4474/4474855.png";
const AVATAR_FEMALE = "https://cdn-icons-png.flaticon.com/512/4474/4474849.png";

export default function Header({
  usuario,
  bootstrap,
  locAllowed,
  hideLocationBar,
  onCloseLocationBar,
  onOpenTier,
  onOpenGrupo,
  onOpenMenu,
  onHeaderHeightChange,
}) {
  const headerRef = useRef(null);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || usuario.registro_estado !== "completo") return null;

  const avatarSrc =
    usuario?.genero === "f"
      ? AVATAR_FEMALE
      : usuario?.genero === "m"
      ? AVATAR_MALE
      : AVATAR_MALE;

  useLayoutEffect(() => {
    if (headerRef.current && onHeaderHeightChange) {
      onHeaderHeightChange(headerRef.current.offsetHeight);
    }
  });

  return (
    <>
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
              <span style={{ fontSize: 13 }}>
                La app usa tu ubicación para mostrar promos cercanas.
              </span>

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

      <header
        ref={headerRef}
        style={{
          background: BRAND_PURPLE,
          color: "#fff",
          paddingTop: "10%",
          paddingBottom: "4%",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            paddingLeft: "4%",
            paddingRight: "4%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "88%",
                fontSize: "clamp(20px, 6vw, 28px)",
                fontWeight: 800,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Bienvenido,{" "}
              <span style={{ fontWeight: 900 }}>
                {usuario?.nombre || "usuario"}
              </span>
            </div>

            <button
              onClick={() => onOpenMenu()}
              style={{
                width: "12%",
                background: "transparent",
                border: 0,
                color: "#fff",
                fontSize: "clamp(26px, 7vw, 36px)",
                cursor: "pointer",
                textAlign: "right",
              }}
            >
              ☰
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "6%",
              marginTop: 6,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `3px solid ${LOCAL_PURPLE}`,
                  background: "#fff",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={onOpenTier}
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    background: "rgba(0,0,0,0.45)",
                    color: "#fff",
                    border: 0,
                    padding: "4px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  {usuario?.tier || "Explorador"}
                </button>

                <img
                  src={avatarSrc}
                  alt="avatar"
                  style={{
                    width: "80%",
                    height: "80%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                width: "65%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: "2px",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  opacity: 0.95,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                Encuentra las mejores promos cerca de ti.
              </div>

              <div style={{ flexGrow: 1 }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    color: REFERRAL_GREEN,
                    fontWeight: 800,
                    fontSize: "clamp(14px, 4vw, 17px)",
                  }}
                >
                  {usuario?.referidosCount
                    ? `${usuario.referidosCount} referidos`
                    : "0 referidos"}
                </span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={onOpenGrupo}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        background: "#E6E6E6",
                        border: "2px solid #fff",
                        marginLeft: i === 0 ? 0 : -10,
                      }}
                    />
                  ))}

                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: "#ffffff",
                      border: "2px dashed #CFCFCF",
                      marginLeft: -10,
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
        </div>
      </header>
    </>
  );
}
