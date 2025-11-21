// src/main.jsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

import "./styles/carousel.css";
import "./styles/no-scrollbar.css";


import "./index.css"; // si usas Tailwind o estilos globales

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Necesario para lazy() */}
      <Suspense fallback={<div>Cargando...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
