// src/components/header/Header.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import HeaderCliente from "./cliente/HeaderCliente";
import HeaderNegocio from "./negocio/HeaderNegocio";

const BRAND_YELLOW = "#FFF3CD";

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

  const avatarSrc =
    usuario?.genero === "f"
      ? AVATAR_FEMALE
      : usuario?.genero === "m"
      ? AVATAR_MALE
      : AVATAR_MALE;

  const role = usuario?.role || "cliente";
  const isCliente = role === "cliente";
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
  const isNegocio = role === "negocio";
  const negocio = onboarding?.negocio || null;

  useLayoutEffect(() => {
    if (bootstrap || typeof usuario === "undefined") return;
    if (!usuario || !onboarding?.allowAccess) return;
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
    bootstrap,
    usuario,
    onboarding,
    expanded,
    locAllowed,
    hideLocationBar,
    onHeaderHeightChange,
    locationBarHeight,
  ]);

  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;

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

      <header
        className={`${isCliente ? "text-[#2F1A55]" : "text-white"} shadow-md`}
        style={
          isCliente
            ? {
                background: "#FFFFFF",
                borderBottom: "1px solid #E9E2F7",
              }
            : { background: "#5E30A5" }
        }
      >
        {isNegocio ? (
          <HeaderNegocio
            usuario={usuario}
            negocio={negocio}
            avatarSrc={avatarSrc}
            expanded={expanded}
            setExpanded={setExpanded}
            onOpenMenu={onOpenMenu}
            collapsedRef={collapsedRef}
            expandedRef={expandedRef}
            collapsedHeight={COLLAPSED_HEIGHT}
            onSwipeStart={beginSwipe}
            onSwipeMove={handlePointerMove}
            onSwipeEnd={endSwipe}
          />
        ) : (
          <HeaderCliente
            usuario={usuario}
            avatarSrc={avatarSrc}
            expanded={expanded}
            setExpanded={setExpanded}
            onOpenMenu={onOpenMenu}
            onOpenTier={onOpenTier}
            onOpenGrupo={onOpenGrupo}
            collapsedRef={collapsedRef}
            expandedRef={expandedRef}
            collapsedHeight={COLLAPSED_HEIGHT}
            onSwipeStart={beginSwipe}
            onSwipeMove={handlePointerMove}
            onSwipeEnd={endSwipe}
          />
        )}

        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={desktopRef}
            className="hidden md:flex justify-between items-center py-4"
          >
            <Link
              to={homePath}
              className={`text-xl font-bold tracking-wide ${
                isCliente ? "text-[#2F1A55]" : "text-white"
              }`}
            >
              Referidos App
            </Link>

            <nav className="flex gap-6 items-center">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    isCliente
                      ? `hover:text-[#5E30A5] ${
                          isActive(link.path) ? "text-[#5E30A5]" : "text-slate-500"
                        }`
                      : `hover:text-[#FFC21C] ${
                          isActive(link.path) ? "text-[#FFC21C]" : ""
                        }`
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="https://wa.me/593999999999"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-4 font-semibold px-3 py-1 rounded-xl transition ${
                  isCliente
                    ? "bg-[#5E30A5] text-white hover:bg-[#4B2488]"
                    : "bg-[#FFC21C] text-[#5E30A5] hover:opacity-90"
                }`}
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
