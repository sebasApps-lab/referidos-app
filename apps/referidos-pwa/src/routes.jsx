import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthEntry = lazy(() => import("./pages/AuthEntry"));
const PruebaPage = lazy(() => import("./pages/PruebaPage"));
const Prueba1Page = lazy(() => import("./pages/Prueba1Page"));
const Prueba2Page = lazy(() => import("./pages/Prueba2Page"));
const Prueba3Page = lazy(() => import("./pages/Prueba3Page"));
const Prueba4Page = lazy(() => import("./pages/Prueba4Page"));
const NegocioCrearPromoPage = lazy(() =>
  import("./pages/NegocioCrearPromoPage"),
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthEntry />} />
      <Route path="/auth" element={<AuthEntry />} />
      <Route path="/prueba" element={<PruebaPage />} />
      <Route path="/prueba1" element={<Prueba1Page />} />
      <Route path="/prueba2" element={<Prueba2Page />} />
      <Route path="/prueba3" element={<Prueba3Page />} />
      <Route path="/prueba4" element={<Prueba4Page />} />
      <Route
        path="/negocio/panel/crear-promo"
        element={<NegocioCrearPromoPage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
