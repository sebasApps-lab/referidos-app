import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminDashboardOverviewPanel from "../../admin/dashboard/AdminDashboardOverviewPanel";

export default function AdminDashboard() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Acceso central al estado productivo y analytics por app"
    >
      <AdminDashboardOverviewPanel />
    </AdminLayout>
  );
}

