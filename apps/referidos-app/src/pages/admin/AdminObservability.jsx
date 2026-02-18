import React from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import IssuesTable from "../../admin/observability/IssuesTable";
import useOpsTelemetryHotSync from "../../admin/ops/useOpsTelemetryHotSync";
import { useAppStore } from "../../store/appStore";

export default function AdminObservability() {
  const location = useLocation();
  const path = location.pathname || "";
  const role = useAppStore((s) => s.usuario?.role || "");

  let subtitle = "Selecciona un issue para ver sus eventos";
  if (path.endsWith("/events")) {
    subtitle = "Eventos del issue seleccionado";
  } else if (path.endsWith("/events/details")) {
    subtitle = "Detalle completo del evento";
  }

  const syncPanelKey = path.endsWith("/events/details")
    ? "admin_issues_event_details"
    : path.endsWith("/events")
      ? "admin_issues_events"
      : "admin_issues";

  useOpsTelemetryHotSync({
    enabled: role === "admin" || role === "soporte",
    panelKey: syncPanelKey,
  });

  return (
    <AdminLayout title="Issues" subtitle={subtitle}>
      <IssuesTable />
    </AdminLayout>
  );
}
