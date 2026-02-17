import React from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import IssuesTable from "../../admin/observability/IssuesTable";

export default function AdminObservability() {
  const location = useLocation();
  const path = location.pathname || "";

  let subtitle = "Selecciona un issue para ver sus eventos";
  if (path.endsWith("/events")) {
    subtitle = "Eventos del issue seleccionado";
  } else if (path.endsWith("/events/details")) {
    subtitle = "Detalle completo del evento";
  }

  return (
    <AdminLayout title="Issues" subtitle={subtitle}>
      <IssuesTable />
    </AdminLayout>
  );
}
