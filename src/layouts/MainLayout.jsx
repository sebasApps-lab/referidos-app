// src/layouts/MainLayout.jsx
import React, { useState, useCallback } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MenuLateral from "../components/menus/MenuLateral";
import { useAppStore } from "../store/appStore";

export default function MainLayout({ children }) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const logout = useAppStore((s) => s.logout);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHeaderHeight = useCallback((h) => {
    setHeaderHeight(h);
  }, []);

  if (bootstrap || typeof usuario ==="undefined") {
    return null; //o loader global
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        background: "#FFFFFF",
      }}
    >
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
          paddingBottom: 64,
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
