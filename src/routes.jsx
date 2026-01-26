// src/routes.jsx

import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from "./router/guards/RequireAuth";
import RequireRole from "./router/guards/RequireRole";
import ClienteLayout from "./cliente/layout/ClienteLayout";
import NegocioLayout from "./negocio/layout/NegocioLayout";
import ClienteInicioView from "./cliente/views/ClienteInicioView";
import ClienteEscanerView from "./cliente/views/ClienteEscanerView";
import ClienteHistorialView from "./cliente/views/ClienteHistorialView";
import ClientePerfilView from "./cliente/views/ClientePerfilView";
import NegocioInicioView from "./negocio/views/NegocioInicioView";
import NegocioEscanerView from "./negocio/views/NegocioEscanerView";
import NegocioGestionarView from "./negocio/views/NegocioGestionarView";
import NegocioPerfilView from "./negocio/views/NegocioPerfilView";
import SupportLayout from "./support/agent/SupportLayout";
import SupportInbox from "./support/agent/SupportInbox";
import SupportTicket from "./support/agent/SupportTicket";
import SupportIrregular from "./support/agent/SupportIrregular";
import AdminSupportDesk from "./admin/support/AdminSupportDesk";
import AdminSupportAgents from "./admin/support/AdminSupportAgents";
import AdminSupportTicket from "./admin/support/AdminSupportTicket";

// Lazy pages
const AuthEntry = lazy(() => import("./pages/AuthEntry"));
const AppGate = lazy(() => import("./pages/AppGate"));
const LandingPage = lazy(() => import("./landing/LandingPage"));
const LegalRouter = lazy(() => import("./legal/LegalRouter"));

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

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<AppGate publicElement={<AuthEntry />} />} />
      <Route path="/auth" element={<AppGate publicElement={<AuthEntry />} />} />
      <Route path="/inicio" element={<LandingPage />} />
      <Route path="/bienvenido" element={<LandingPage />} />
      <Route path="/legal/:locale/:document" element={<LegalRouter />} />

      {/* APP ENTRY POINT */}
      <Route path="/app" element={<AppGate />} />

      {/* CLIENTE */}
      <Route
        path="/cliente"
        element={
          <RequireAuth>
            <RequireRole role="cliente">
              <ClienteLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="inicio" replace />} />
        <Route path="inicio" element={<ClienteInicioView />} />
        <Route path="escanear" element={<ClienteEscanerView />} />
        <Route path="perfil" element={<ClientePerfilView />} />
        <Route path="historial" element={<ClienteHistorialView />} />
      </Route>

      {/* NEGOCIO */}
      <Route
        path="/negocio"
        element={
          <RequireAuth>
            <RequireRole role="negocio">
              <NegocioLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="inicio" replace />} />
        <Route path="inicio" element={<NegocioInicioView />} />
        <Route path="escanear" element={<NegocioEscanerView />} />
        <Route path="perfil" element={<NegocioPerfilView />} />
        <Route path="gestionar" element={<NegocioGestionarView />} />
      </Route>

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
      <Route
        path="/admin/soporte"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportDesk />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/soporte/ticket/:threadId"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportTicket />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/asesores"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportAgents />
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
              <ClienteLayout>
                <PromoDetalle />
              </ClienteLayout>
            </RequireRole>
          </RequireAuth>
        }
      />
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* SOPORTE AGENTE */}
      <Route
        path="/soporte"
        element={
          <RequireAuth>
            <RequireRole role="soporte">
              <SupportLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="inbox" replace />} />
        <Route path="inbox" element={<SupportInbox />} />
        <Route path="ticket/:threadId" element={<SupportTicket />} />
        <Route path="irregulares" element={<SupportIrregular />} />
      </Route>
    </Routes>
  );
}
