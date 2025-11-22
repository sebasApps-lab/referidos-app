// src/layouts/MainLayout.jsx
import React, { useState, useCallback } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MenuLateral from "../components/menus/MenuLateral";

export default function MainLayout({ children, usuario, logout }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHeaderHeight = useCallback((h) => {
    setHeaderHeight(h);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <Header
        usuario={usuario}
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
          overflowY: "auto",
          paddingBottom: 80,
          paddingTop: headerHeight,
        }}
      >
        {children}
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
