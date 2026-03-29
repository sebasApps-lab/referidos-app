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

const isLocalDevHost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.endsWith(".ngrok-free.dev");

if (import.meta.env.PROD && !isLocalDevHost) {
  registerSW();
} else if ("serviceWorker" in navigator) {
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
