import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminDashboardDlqEventsPanel from "../../admin/dashboard/AdminDashboardDlqEventsPanel";

export default function AdminDashboardDlqEvents() {
  return (
    <AdminLayout
      title="Eventos de borrado DLQ"
      subtitle="Detalle de los eventos fallidos de telemetria que se eliminaran en el siguiente purge"
    >
      <AdminDashboardDlqEventsPanel />
    </AdminLayout>
  );
}
