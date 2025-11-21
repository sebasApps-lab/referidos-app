// src/routes.jsx

import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from "./router/guards/RequireAuth";
import RequireRole from "./router/guards/RequireRole";
import MainLayout from "./layouts/MainLayout";

// Lazy pages
const Bienvenido = lazy(() => import("./pages/Bienvenido"));
const Login = lazy(() => import("./pages/Login"));
const Registro = lazy(() => import("./pages/Registro"));
const ClienteHome = lazy(() => import("./pages/ClienteHome"));
const NegocioHome = lazy(() => import("./pages/NegocioHome"));
const AdminHome = lazy(() => import("./pages/AdminHome"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Bienvenido />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* CLIENTE */}
      <Route
        path="/inicio/cliente"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <MainLayout>
                <ClienteHome />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* NEGOCIO */}
      <Route
        path="/inicio/negocio"
        element={
          <RequireAuth>
            <RequireRole role="negocio">
              <MainLayout>
                <NegocioHome />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* ADMIN */}
      <Route
        path="/inicio/admin"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <MainLayout>
                <AdminHome />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
