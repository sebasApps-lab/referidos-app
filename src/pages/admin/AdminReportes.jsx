// src/pages/admin/AdminReportes.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import ReportesTable from "../../admin/reportes/ReportesTable";

export default function AdminReportes() {
  return (
    <AdminLayout
      title="Reportes"
      subtitle="Quejas y casos pendientes"
    >
      <ReportesTable />
    </AdminLayout>
  );
}
