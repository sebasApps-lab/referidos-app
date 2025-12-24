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
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [updateHeaderHeight]);

  if (bootstrap || typeof usuario === "undefined") return null;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        "--cliente-bg": "#F8F4EE",
        "--cliente-surface": "#FFFDF9",
        "--cliente-ink": "#1D1B1A",
        "--cliente-accent": "#E07A5F",
        "--cliente-accent-2": "#3D5A80",
        "--cliente-heading": '"Fraunces", "Manrope", serif',
        background:
          "radial-gradient(circle at top, #FFF7EC 0%, #F8F4EE 45%, #F2EAE1 100%)",
        fontFamily: '"Manrope", "Segoe UI", sans-serif',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-40"
        style={{ background: "#F2C6A0" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-20 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{ background: "#BFD7EA" }}
      />

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
            paddingBottom: "calc(92px + env(safe-area-inset-bottom))",
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
