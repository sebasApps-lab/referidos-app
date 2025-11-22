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
const PromoDetalle = lazy(() => import("./pages/PromoDetalle"));
const Perfil = lazy(() => import("./pages/Perfil"));
const Historial = lazy(() => import("./pages/Historial"));
const Escanear = lazy(() => import("./pages/Escanear"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Bienvenido />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* CLIENTE */}
      <Route
        path="/cliente/inicio"
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
        path="/negocio/inicio"
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
        path="/admin/inicio"
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

      {/* DETALLE PROMO */}
      <Route
        path="/detalle/:id"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <MainLayout>
                <PromoDetalle />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* ESCANEAR */}
      <Route
        path="/cliente/escanear"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <MainLayout>
                <Escanear />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* PERFIL */}
      <Route
        path="/cliente/perfil"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <MainLayout>
                <Perfil />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* HISTORIAL */}
      <Route
        path="/cliente/historial"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <MainLayout>
                <Historial />
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
