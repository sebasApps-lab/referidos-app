// src/layouts/MainLayout.jsx

import React from "react";
import Header from "../components/header/Header";   // <-- header oficial
import FooterAlt from "../components/desktop/FooterAlt";

export default function MainLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        // ← necesario para que la barra de URL se oculte en móvil
        minHeight: "100dvh",

        background: "#FFFFFF",

        // ← evita que el layout se mueva horizontalmente cuando
        // la URL bar aparece/desaparece
        overflow: "hidden",
      }}
    >
      {/* HEADER OFICIAL */}
      <Header />

      <main
        className="hide-scrollbar" // ← oculta la barra de scroll vertical
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 80, // espacio inferior para footer
        }}
      >
        {children}
      </main>

      <FooterAlt />
    </div>
  );
}
