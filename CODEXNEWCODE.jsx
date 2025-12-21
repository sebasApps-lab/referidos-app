// src/components/header/Header.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAppStore } from "../../store/appStore";

const BRAND_PURPLE = "#5E30A5";
const BRAND_YELLOW = "#FFF3CD";
const REFERRAL_GREEN = "#A6F28F";
const LOCAL_PURPLE = "#7C5CD6";

const AVATAR_MALE = "https://cdn-icons-png.flaticon.com/512/4474/4474855.png";
const AVATAR_FEMALE = "https://cdn-icons-png.flaticon.com/512/4474/4474849.png";

const COLLAPSED_HEIGHT = 80;
const SWIPE_THRESHOLD = 40;

export default function Header({
  locAllowed,
  hideLocationBar,
  onCloseLocationBar,
  onOpenTier,
  onOpenGrupo,
  onOpenMenu,
  onHeaderHeightChange,
}) {
  const [expanded, setExpanded] = useState(false);
  const [locationBarHeight, setLocationBarHeight] = useState(0);
  const location = useLocation();
  const headerRef = useRef(null);
  const collapsedRef = useRef(null);
  const expandedRef = useRef(null);
  const locationBarRef = useRef(null);
  const swipeRef = useRef({ startY: 0, active: false, handled: false });

  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const onboarding = useAppStore((s) => s.onboarding);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;

  const avatarSrc =
    usuario?.genero === "f"
      ? AVATAR_FEMALE
      : usuario?.genero === "m"
      ? AVATAR_MALE
      : AVATAR_MALE;

  const role = usuario?.role || "cliente";
  const HOME_PATHS = {
    cliente: "/cliente/inicio",
    negocio: "/negocio/inicio",
    admin: "/admin/inicio",
  };

  let links = [];
  if (role === "cliente") {
    links = [
      { path: "/cliente/inicio", label: "Inicio" },
      { path: "/cliente/escanear", label: "Escanear" },
      { path: "/cliente/historial", label: "Historial" },
      { path: "/cliente/perfil", label: "Perfil" },
    ];
  }

  if (role === "negocio") {
    links = [
      { path: "/negocio/inicio", label: "Inicio" },
      { path: "/negocio/escanear", label: "Escanear" },
      { path: "/negocio/mis-promos", label: "Promos" },
      { path: "/negocio/perfil", label: "Perfil" },
    ];
  }

  if (role === "admin") {
    links = [
      { path: "/admin/inicio", label: "Inicio" },
      { path: "/admin/promos", label: "Promos" },
      { path: "/admin/qr-validos", label: "QR Validos" },
      { path: "/admin/panel", label: "Admin" },
    ];
  }

  const homePath = HOME_PATHS[role] || "/";
  const isActive = (path) =>
    location.pathname === path ||
    (path === homePath && location.pathname.startsWith(homePath));

  useLayoutEffect(() => {
    const currentLocationBarHeight =
      !hideLocationBar && locAllowed === false && locationBarRef.current
        ? locationBarRef.current.offsetHeight
        : 0;

    if (currentLocationBarHeight !== locationBarHeight) {
      setLocationBarHeight(currentLocationBarHeight);
    }

    if (!onHeaderHeightChange) return;

    const collapsedHeight =
      collapsedRef.current?.offsetHeight || COLLAPSED_HEIGHT;
    const expandedHeight =
      expandedRef.current?.offsetHeight || collapsedHeight;

    const nextHeight =
      (expanded ? expandedHeight : collapsedHeight) + currentLocationBarHeight;

    onHeaderHeightChange(nextHeight);
  }, [
    expanded,
    locAllowed,
    hideLocationBar,
    onHeaderHeightChange,
    locationBarHeight,
  ]);

  const beginSwipe = (event) => {
    swipeRef.current.startY = event.clientY;
    swipeRef.current.active = true;
    swipeRef.current.handled = false;
  };

  const moveSwipe = (event, direction) => {
    const state = swipeRef.current;
    if (!state.active || state.handled) return;

    const delta = event.clientY - state.startY;

    if (direction === "down" && delta > SWIPE_THRESHOLD) {
      setExpanded(true);
      state.handled = true;
    }

    if (direction === "up" && delta < -SWIPE_THRESHOLD) {
      setExpanded(false);
      state.handled = true;
    }
  };

  const endSwipe = () => {
    swipeRef.current.active = false;
    swipeRef.current.handled = false;
  };

  return (
    <div ref={headerRef} className="fixed top-0 left-0 w-full z-50">
      {!hideLocationBar && locAllowed === false && (
        <div
          ref={locationBarRef}
          style={{ width: "100%", background: BRAND_YELLOW }}
        >
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
                La app usa tu ubicacion para mostrar promos cercanas.
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
                X
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        ref={collapsedRef}
        className={`bg-[#5E30A5] text-white shadow-md transition-opacity duration-200 ${
          expanded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          className="max-w-6xl mx-auto px-4"
          style={{ minHeight: COLLAPSED_HEIGHT }}
        >
          <div
            className="md:hidden flex items-center justify-between py-4"
            style={{ touchAction: "pan-y" }}
            onPointerDown={beginSwipe}
            onPointerMove={(event) => moveSwipe(event, "down")}
            onPointerUp={endSwipe}
            onPointerCancel={endSwipe}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="w-12 h-12 rounded-xl border-2 border-white/30 bg-white/10 overflow-hidden flex items-center justify-center"
                aria-label="Abrir perfil"
              >
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-9 h-9 object-contain"
                />
              </button>

              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/30"
              >
                {usuario?.tier || "Explorador"}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold tracking-wide">
                Referidos App
              </span>
              <button onClick={() => onOpenMenu?.()}>
                <Menu size={28} />
              </button>
            </div>
          </div>

          <div className="hidden md:flex justify-between items-center py-4">
            <Link to={homePath} className="text-xl font-bold tracking-wide">
              Referidos App
            </Link>

            <nav className="flex gap-6 items-center">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hover:text-[#FFC21C] transition-colors ${
                    isActive(link.path) ? "text-[#FFC21C]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="https://wa.me/593999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 bg-[#FFC21C] text-[#5E30A5] font-semibold px-3 py-1 rounded-xl hover:opacity-90 transition"
              >
                Soporte
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div
        className="fixed inset-0 md:hidden transition-opacity duration-200"
        style={{
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
          background: "rgba(0,0,0,0.35)",
        }}
        onClick={() => setExpanded(false)}
      />

      <div
        ref={expandedRef}
        className="md:hidden absolute left-0 w-full"
        style={{
          top: locationBarHeight,
          background: BRAND_PURPLE,
          color: "#fff",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          transform: expanded ? "translateY(0)" : "translateY(-12px)",
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
          transition: "transform 240ms ease, opacity 200ms ease",
          touchAction: "pan-y",
        }}
        onPointerDown={beginSwipe}
        onPointerMove={(event) => moveSwipe(event, "up")}
        onPointerUp={endSwipe}
        onPointerCancel={endSwipe}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            paddingLeft: "4%",
            paddingRight: "4%",
            paddingTop: "10%",
            paddingBottom: "4%",
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
              onClick={() => onOpenMenu?.()}
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
              <Menu size={26} />
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
      </div>
    </div>
  );
}
