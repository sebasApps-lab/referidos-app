// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/carousel.css";
import "./styles/no-scrollbar.css";

import "leaflet/dist/leaflet.css";

import "./index.css"; // si usas Tailwind o estilos globales
import { registerSW } from "virtual:pwa-register";

if (import.meta.env.PROD && window.isSecureContext) {
  registerSW();
} else if (import.meta.env.DEV && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
