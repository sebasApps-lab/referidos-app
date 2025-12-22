// src/components/header/Header.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAppStore } from "../../store/appStore";

const BRAND_PURPLE = "#5E30A5";
const BRAND_YELLOW = "#FFF3CD";
const REFERRAL_GREEN = "#A6F28F";
const LOCAL_PURPLE = "#7C5CD6";

const AVATAR_FEMALE = "https://cdn-icons-png.flaticon.com/512/4474/4474849.png";
const AVATAR_MALE = "https://cdn-icons-png.flaticon.com/512/4474/4474855.png";

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
  const [overlayTop, setOverlayTop] = useState(0);
  const location = useLocation();
  const collapsedRef = useRef(null);
  const expandedRef = useRef(null);
  const locationBarRef = useRef(null);
  const desktopRef = useRef(null);
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

    const baseHeight =
      collapsedRef.current?.offsetHeight ||
      desktopRef.current?.offsetHeight ||
      COLLAPSED_HEIGHT;

    const expandedHeight = expanded
      ? expandedRef.current?.scrollHeight || 0
      : 0;

    const totalHeight = baseHeight + expandedHeight + currentLocationBarHeight;

    setOverlayTop(totalHeight);

    if (onHeaderHeightChange) {
      onHeaderHeightChange(totalHeight);
    }
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

  const handlePointerMove = (event) => {
    moveSwipe(event, expanded ? "up" : "down");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
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

      <header className="bg-[#5E30A5] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={collapsedRef}
            className="md:hidden flex items-center justify-between py-4"
            style={{ minHeight: COLLAPSED_HEIGHT, touchAction: "pan-y" }}
            onPointerDown={beginSwipe}
            onPointerMove={handlePointerMove}
            onPointerUp={endSwipe}
            onPointerCancel={endSwipe}
          >
            <div className="relative h-12 w-[200px]">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className={`absolute left-0 top-0 z-10 w-12 h-12 rounded-xl border-2 border-white/30 bg-white/10 overflow-hidden flex items-center justify-center origin-top-left transition-transform duration-300 ${
                  expanded ? "translate-y-25 scale-200" : "translate-y-0 scale-100"
                }`}
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
                className={`absolute rounded-lg font-semibold bg-white/10 border border-white/30 transition-all duration-300 ${
                  expanded
                    ? "left-3 top-1.5 translate-y-0 scale-105 px-5 py-2 text-base"
                    : "left-[56px] top-1/2 -translate-y-1/2 px-4 py-1.5 text-xs"
                }`}
              >
                {usuario?.tier || "Explorador"}
              </button>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-base font-semibold tracking-wide">
                Referidos App
              </span>
              <button onClick={() => onOpenMenu?.()}>
                <Menu size={28} />
              </button>
            </div>
          </div>

          <div
            ref={expandedRef}
            className="md:hidden overflow-hidden"
            style={{
              maxHeight: expanded ? 520 : 0,
              opacity: expanded ? 1 : 0,
              pointerEvents: expanded ? "auto" : "none",
              transition:
                "max-height 280ms ease, opacity 200ms ease",
              touchAction: "pan-y",
            }}
            onPointerDown={beginSwipe}
            onPointerMove={handlePointerMove}
            onPointerUp={endSwipe}
            onPointerCancel={endSwipe}
          >
            <div className="max-w-6xl mx-auto px-4 pt-2 pb-4">
              <div className="relative pt-3 pl-24">
                <div className="absolute left-0 right-0 -top-2 h-px bg-white/10" />
                <div className="text-m uppercase tracking-wider text-white/70">
                  Bienvenido
                </div>
                <div className="text-xl font-extrabold truncate">
                  {usuario?.nombre || "usuario"}
                </div>
                <div
                  className="mt-1 text-sm text-white/85"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Encuentra las mejores promos cerca de ti.
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <span className="text-[#A6F28F] font-bold text-sm">
                    {usuario?.referidosCount
                      ? `${usuario.referidosCount} referidos`
                      : "0 referidos"}
                  </span>

                  <div
                    className="flex items-center cursor-pointer"
                    onClick={onOpenGrupo}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-lg bg-[#E6E6E6] border-2 border-white"
                        style={{ marginLeft: i === 0 ? 0 : -10 }}
                      />
                    ))}
                    <div
                      className="w-7 h-7 rounded-lg bg-white border-2 border-dashed border-[#CFCFCF] flex items-center justify-center text-[#6B6B6B] font-bold"
                      style={{ marginLeft: -10 }}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={desktopRef}
            className="hidden md:flex justify-between items-center py-4"
          >
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
        className="fixed left-0 right-0 bottom-0 md:hidden transition-opacity duration-200"
        style={{
          top: overlayTop,
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
          background: "rgba(0,0,0,0.35)",
          zIndex: 40,
        }}
        onClick={() => setExpanded(false)}
      />
    </div>
  );
}
