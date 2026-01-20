import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import NegocioHeader from "./NegocioHeader";
import NegocioFooter from "./NegocioFooter";
import MenuLateral from "../../components/menus/MenuLateral";
import { useAppStore } from "../../store/appStore";
import { getAvatarSrc } from "../services/negocioUI";
import { NegocioHeaderProvider, useNegocioHeader } from "./NegocioHeaderContext";
import { useModal } from "../../modals/useModal";

const FALLBACK_HEADER_HEIGHT = 76;

function NegocioLayoutInner({ children }) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const logout = useAppStore((s) => s.logout);
  const { openModal } = useModal();

  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(FALLBACK_HEADER_HEIGHT);
  const [headerElevated, setHeaderElevated] = useState(false);
  const [viewportMetrics, setViewportMetrics] = useState({
    height: 0,
    offsetTop: 0,
  });
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const { mode, headerVisible, headerEntering } = useNegocioHeader();

  const updateHeaderHeight = useCallback(() => {
    if (!headerVisible) {
      setHeaderHeight(0);
      return;
    }
    if (!headerRef.current) {
      setHeaderHeight(FALLBACK_HEADER_HEIGHT);
      return;
    }
    setHeaderHeight(headerRef.current.offsetHeight || FALLBACK_HEADER_HEIGHT);
  }, [headerVisible]);

  useLayoutEffect(() => {
    updateHeaderHeight();
    let observer;
    if (
      headerVisible &&
      typeof ResizeObserver !== "undefined" &&
      headerRef.current
    ) {
      observer = new ResizeObserver(() => updateHeaderHeight());
      observer.observe(headerRef.current);
    } else if (headerVisible) {
      window.addEventListener("resize", updateHeaderHeight);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      } else if (headerVisible) {
        window.removeEventListener("resize", updateHeaderHeight);
      }
    };
  }, [headerVisible, updateHeaderHeight]);

  useEffect(() => {
    const updateViewport = () => {
      const vv = window.visualViewport;
      const height = vv?.height ?? window.innerHeight;
      const offsetTop = vv?.offsetTop ?? 0;
      setViewportMetrics((prev) =>
        prev.height === height && prev.offsetTop === offsetTop
          ? prev
          : { height, offsetTop }
      );
    };
    updateViewport();
    window.visualViewport?.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const updateHeaderElevation = useCallback(() => {
    const mainTop = mainRef.current?.scrollTop || 0;
    const docTop =
      document.scrollingElement?.scrollTop || window.scrollY || 0;
    const next = mainTop > 0 || docTop > 0;
    setHeaderElevated((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    updateHeaderElevation();
    const current = mainRef.current;
    if (current) {
      current.addEventListener("scroll", updateHeaderElevation, {
        passive: true,
      });
    }
    window.addEventListener("scroll", updateHeaderElevation, {
      passive: true,
    });
    return () => {
      if (current) {
        current.removeEventListener("scroll", updateHeaderElevation);
      }
      window.removeEventListener("scroll", updateHeaderElevation);
    };
  }, [updateHeaderElevation]);

  useEffect(() => {
    if (bootstrap || !usuario) return;
    if (usuario.has_pin || usuario.has_biometrics) return;
    if (typeof window === "undefined") return;
    const key = `access_methods_prompt_shown_${usuario.id || usuario.id_auth || "user"}`;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
    openModal("AccessMethods");
  }, [bootstrap, usuario, openModal]);

  if (bootstrap || typeof usuario === "undefined") return null;

  const viewportHeight = viewportMetrics.height;

  return (
    <div
      ref={rootRef}
      className="relative overflow-x-hidden"
      style={{
        "--negocio-bg": "#FAF8FF",
        "--negocio-surface": "#FFFFFF",
        "--negocio-ink": "#2F1A55",
        "--negocio-accent": "#5E30A5",
        "--negocio-accent-2": "#4B2488",
        "--negocio-header-bg": "#5E30A5",
        "--cliente-header-height": `${headerHeight}px`,
        "--cliente-viewport-offset": `${viewportMetrics.offsetTop}px`,
        background: "#FAF8FF",
        height: viewportHeight ? `${viewportHeight}px` : "100dvh",
        minHeight: viewportHeight ? `${viewportHeight}px` : "100vh",
        overflow: "hidden",
      }}
    >
      <div className="relative flex h-full min-h-0 flex-col">
        {headerVisible ? (
          <div
            ref={headerRef}
            className={`fixed left-0 right-0 z-40 ${
              headerEntering ? "cliente-merge-enter" : ""
            }`}
            style={{ top: "var(--cliente-viewport-offset, 0px)" }}
          >
            <NegocioHeader
              usuario={usuario}
              avatarSrc={getAvatarSrc(usuario)}
              onOpenMenu={() => setMenuOpen(true)}
              isElevated={headerElevated}
              onLogout={logout}
            />
          </div>
        ) : null}

        <main
          ref={mainRef}
          id="cliente-main-scroll"
          className={`hide-scrollbar transition-all duration-300 z-0 ${
            menuOpen ? "blur-sm" : ""
          }`}
          style={{
            position: "fixed",
            top: "var(--cliente-viewport-offset, 0px)",
            left: 0,
            right: 0,
            bottom: "50px",
            paddingTop: headerHeight,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          {children}
          <div
            className="text-[10px] uppercase tracking-[0.3em] text-black/30"
            style={{ position: "fixed", bottom: 110, right: 16 }}
          >
            ALPHA v0.0.1
          </div>
        </main>

        {mode !== "search" ? <NegocioFooter /> : null}

        <MenuLateral
          visible={menuOpen}
          onClose={() => setMenuOpen(false)}
          usuario={usuario}
          logout={logout}
        />
      </div>
    </div>
  );
}

export default function NegocioLayout({ children }) {
  return (
    <NegocioHeaderProvider>
      <NegocioLayoutInner>{children}</NegocioLayoutInner>
    </NegocioHeaderProvider>
  );
}
