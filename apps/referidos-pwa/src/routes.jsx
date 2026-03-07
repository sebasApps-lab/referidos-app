import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthEntry = lazy(() => import("./pages/AuthEntry"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthEntry />} />
      <Route path="/auth" element={<AuthEntry />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
