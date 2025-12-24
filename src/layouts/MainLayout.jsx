// src/layouts/MainLayout.jsx
import React, { useState, useCallback } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MenuLateral from "../components/menus/MenuLateral";
import { useAppStore } from "../store/appStore";

const HEADER_COLLAPSED_HEIGHT = 64;

export default function MainLayout({ children }) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const logout = useAppStore((s) => s.logout);

  const [headerHeight, setHeaderHeight] = useState(HEADER_COLLAPSED_HEIGHT);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHeaderHeight = useCallback((h) => {
    setHeaderHeight(h);
  }, []);

  if (bootstrap || typeof usuario ==="undefined") {
    return null; //o loader global
  }

  return (
    <div className="min-h-dvh safe-area flex flex-col bg-white">
      {/* HEADER */}
      <Header
        usuario={usuario}
        bootstrap={bootstrap}
        onHeaderHeightChange={handleHeaderHeight}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* CONTENIDO (difumina cuando menú está abierto) */}
      <main
        className={`hide-scrollbar transition-all duration-300 ${
          menuOpen ? "blur-sm" : ""
        }`}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          paddingBottom: "calc(64px + env(safe-area-inset-bottom))",
          paddingTop: headerHeight,
          position: "relative",
        }}
      >
        {children}
        <div
          className="text-xs text-gray-500 opacity-60"
          style={{
            position: "fixed",
            bottom: 78,
            right: 16,
          }}
        >
          ALPHA v0.0.1
        </div>
      </main>

      <Footer />

      {/* MENU LATERAL */}
      <MenuLateral
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        usuario={usuario}
        logout={logout}
      />
    </div>
  );
}
