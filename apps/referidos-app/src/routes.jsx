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
import SupportLayout from "@referidos/support-sdk/agent/SupportLayout";
import SupportInicio from "@referidos/support-sdk/agent/SupportInicio";
import SupportInbox from "@referidos/support-sdk/agent/SupportInbox";
import SupportTicket from "@referidos/support-sdk/agent/SupportTicket";
import SupportIrregular from "@referidos/support-sdk/agent/SupportIrregular";
import SupportJornadas from "@referidos/support-sdk/agent/SupportJornadas";
import SupportIssues from "@referidos/support-sdk/agent/SupportIssues";
import SupportErrorCatalog from "@referidos/support-sdk/agent/SupportErrorCatalog";
import AdminSupportDesk from "./admin/support/AdminSupportDesk";
import AdminSupportAgents from "./admin/support/AdminSupportAgents";
import AdminSupportTicket from "./admin/support/AdminSupportTicket";
import AdminSupportTicketsPanel from "./admin/support/AdminSupportTicketsPanel";
import AdminSupportCatalogPanel from "./admin/support/AdminSupportCatalogPanel";

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
const AdminObservability = lazy(() => import("./pages/admin/AdminObservability"));
const AdminDevErrors = lazy(() => import("./pages/admin/AdminDevErrors"));
const AdminDatos = lazy(() => import("./pages/admin/AdminDatos"));
const AdminApps = lazy(() => import("./pages/admin/AdminApps"));
const AdminSistema = lazy(() => import("./pages/admin/AdminSistema"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDashboardAnalytics = lazy(() => import("./pages/admin/AdminDashboardAnalytics"));
const AdminVersioningOverview = lazy(() => import("./pages/admin/AdminVersioningOverview"));
const AdminVersioningReleases = lazy(() => import("./pages/admin/AdminVersioningReleases"));
const AdminDocumentation = lazy(() => import("./pages/admin/AdminDocumentation"));
const AdminLegal = lazy(() => import("./pages/admin/AdminLegal"));

const PromoDetalle = lazy(() => import("./pages/PromoDetalle"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<AppGate publicElement={<AuthEntry />} />} />
      <Route path="/auth" element={<AppGate publicElement={<AuthEntry />} />} />
      <Route path="/inicio" element={<LandingPage />} />
      <Route path="/privacy" element={<Navigate to="/legal/es/privacy" replace />} />
      <Route path="/terms" element={<Navigate to="/legal/es/terms" replace />} />
      <Route path="/delete-data" element={<Navigate to="/legal/es/data-deletion" replace />} />
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
        path="/admin/apps"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminApps />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminDashboard />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/dashboard/analytics"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminDashboardAnalytics />
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
        path="/admin/analytics"
        element={<Navigate to="/admin/dashboard/analytics?product=prelaunch_web" replace />}
      />
      <Route
        path="/admin/issues"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminObservability />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/issues/events"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminObservability />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/issues/events/details"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminObservability />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/observability"
        element={<Navigate to="/admin/issues" replace />}
      />
      <Route
        path="/admin/error-codes"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminDevErrors />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/versionado/global"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminVersioningOverview />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/versionado/detalle"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminVersioningReleases />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/documentacion"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminDocumentation />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/legal"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminLegal />
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
        path="/admin/panel-tickets"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportTicketsPanel />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/macros"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportCatalogPanel />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/macros/categoria/:categoryId"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportCatalogPanel />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/macros/:macroId"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportCatalogPanel />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route path="/admin/soporte/panel-tickets" element={<Navigate to="/admin/panel-tickets" replace />} />
      <Route path="/admin/soporte/macros" element={<Navigate to="/admin/macros" replace />} />
      <Route
        path="/admin/soporte/macros/categoria/:categoryId"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportCatalogPanel />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/soporte/macros/:macroId"
        element={
          <RequireAuth>
            <RequireRole role="admin">
              <AdminSupportCatalogPanel />
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
        <Route index element={<Navigate to="inicio" replace />} />
        <Route path="inicio" element={<SupportInicio />} />
        <Route path="inbox" element={<SupportInbox />} />
        <Route path="jornadas" element={<SupportJornadas />} />
        <Route path="issues" element={<SupportIssues />} />
        <Route path="catalogo-errores" element={<SupportErrorCatalog />} />
        <Route path="error-catalog" element={<Navigate to="/soporte/catalogo-errores" replace />} />
        <Route path="ticket/:threadId" element={<SupportTicket />} />
        <Route path="irregulares" element={<SupportIrregular />} />
      </Route>
    </Routes>
  );
}

