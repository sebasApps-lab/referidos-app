// src/routes.jsx

import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from "./router/guards/RequireAuth";
import RequireRole from "./router/guards/RequireRole";
import MainLayout from "./layouts/MainLayout";

// Lazy pages
const Bienvenido = lazy(() => import("./pages/Bienvenido"));
const AuthHub = lazy(() => import("./pages/AuthHub"));
const AppGate = lazy(() => import("./pages/AppGate"));

const ClienteInicio = lazy(() => import("./pages/cliente/ClienteInicio"));
const ClienteEscaner = lazy(() => import("./pages/cliente/ClienteEscaner"));
const ClienteHistorial = lazy(() => import("./pages/cliente/ClienteHistorial"));
const ClientePerfil = lazy(() => import("./pages/cliente/ClientePerfil"));
const NegocioHome = lazy(() => import("./pages/NegocioHome"));
const AdminInicio = lazy(() => import("./pages/admin/AdminInicio"));
const AdminUsuarios = lazy(() => import("./pages/admin/AdminUsuarios"));
const AdminNegocios = lazy(() => import("./pages/admin/AdminNegocios"));
const AdminPromos = lazy(() => import("./pages/admin/AdminPromos"));
const AdminQRs = lazy(() => import("./pages/admin/AdminQRs"));
const AdminReportes = lazy(() => import("./pages/admin/AdminReportes"));
const AdminLogs = lazy(() => import("./pages/admin/AdminLogs"));
const AdminDatos = lazy(() => import("./pages/admin/AdminDatos"));
const AdminSistema = lazy(() => import("./pages/admin/AdminSistema"));

const PromoDetalle = lazy(() => import("./pages/PromoDetalle"));
const Perfil = lazy(() => import("./pages/Perfil"));
const Escanear = lazy(() => import("./pages/Escanear"));
const Gestionar = lazy(() => import("./pages/Gestionar"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Bienvenido />} />
      <Route path="/auth" element={<AuthHub />} />

      {/* APP ENTRY POINT */}
      <Route path="/app" element={<AppGate />} />

      {/* CLIENTE */}
      <Route
        path="/cliente/inicio"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <ClienteInicio />
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* ESCANEAR CLIENTE*/}
      <Route
        path="/cliente/escanear"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <ClienteEscaner />
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* PERFIL CLIENTE*/}
      <Route
        path="/cliente/perfil"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <ClientePerfil />
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* HISTORIAL CLIENTE */}
      <Route
        path="/cliente/historial"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <ClienteHistorial />
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

      {/* ESCANEAR NEGOCIO*/}
      <Route
        path="/negocio/escanear"
        element={
          <RequireAuth>
            <RequireRole role="negocio">
              <MainLayout>
                <Escanear />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* PERFIL NEGOCIO*/}
      <Route
        path="/negocio/perfil"
        element={
          <RequireAuth>
            <RequireRole role="negocio">
              <MainLayout>
                <Perfil />
              </MainLayout>
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* GESTIONAR NEGOCIO */}
      <Route
        path="/negocio/gestionar"
        element={
          <RequireAuth>
            <RequireRole role="negocio">
              <MainLayout>
                <Gestionar />
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
              <AdminInicio />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminUsuarios />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/negocios"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminNegocios />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/promos"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminPromos />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/qrs"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminQRs />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/reportes"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminReportes />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminLogs />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/datos"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminDatos />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/sistema"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSistema />
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
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
