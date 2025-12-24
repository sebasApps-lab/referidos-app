import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import ClienteHeader from "./ClienteHeader";
import ClienteFooter from "./ClienteFooter";
import MenuLateral from "../../components/menus/MenuLateral";
import { useAppStore } from "../../store/appStore";
import { getAvatarSrc } from "../services/clienteUI";

const FALLBACK_HEADER_HEIGHT = 76;

export default function ClienteLayout({ children }) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const logout = useAppStore((s) => s.logout);

  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(FALLBACK_HEADER_HEIGHT);
  const headerRef = useRef(null);

  const updateHeaderHeight = useCallback(() => {
    if (!headerRef.current) return;
    setHeaderHeight(headerRef.current.offsetHeight || FALLBACK_HEADER_HEIGHT);
  }, []);

  useLayoutEffect(() => {
    updateHeaderHeight();
    let observer;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      observer = new ResizeObserver(() => updateHeaderHeight());
      observer.observe(headerRef.current);
    } else {
      window.addEventListener("resize", updateHeaderHeight);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", updateHeaderHeight);
      }
    };
  }, [updateHeaderHeight]);

  if (bootstrap || typeof usuario === "undefined") return null;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        "--cliente-bg": "#FAF8FF",
        "--cliente-surface": "#FFFFFF",
        "--cliente-ink": "#2F1A55",
        "--cliente-accent": "#5E30A5",
        "--cliente-accent-2": "#4B2488",
        background: "#FAF8FF",
      }}
    >
      <div className="relative z-10 flex min-h-screen flex-col">
        <div ref={headerRef} className="fixed top-0 left-0 right-0 z-40">
          <ClienteHeader
            usuario={usuario}
            avatarSrc={getAvatarSrc(usuario)}
            onOpenMenu={() => setMenuOpen(true)}
          />
        </div>

        <main
          className={`hide-scrollbar flex-1 transition-all duration-300 ${
            menuOpen ? "blur-sm" : ""
          }`}
          style={{
            paddingTop: headerHeight,
            paddingBottom: "calc(80px + env(safe-area-inset-bottom))",
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

        <ClienteFooter />

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
