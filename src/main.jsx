// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/carousel.css";
import "./styles/no-scrollbar.css";


import "./index.css"; // si usas Tailwind o estilos globales
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

const RELOAD_LOCK_KEY = "migo:reload-lock";
const RELOAD_LOCK_TTL_MS = 8000;
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

const maybeReloadOnResume = () => {
  if (!isStandalone) return;
  const now = Date.now();
  const lastReload = Number(sessionStorage.getItem(RELOAD_LOCK_KEY) || 0);
  if (now - lastReload < RELOAD_LOCK_TTL_MS) return;
  sessionStorage.setItem(RELOAD_LOCK_KEY, String(now));
  window.location.reload();
};

window.addEventListener("pageshow", () => {
  maybeReloadOnResume();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    maybeReloadOnResume();
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
