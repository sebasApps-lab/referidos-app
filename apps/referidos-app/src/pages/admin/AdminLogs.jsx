// src/pages/admin/AdminLogs.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import LogsTable from "../../admin/logs/LogsTable";

export default function AdminLogs() {
  return (
    <AdminLayout title="Logs" subtitle="Auditoria del sistema">
      <LogsTable />
    </AdminLayout>
  );
}
