import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminDashboardAnalyticsPanel from "../../admin/dashboard/AdminDashboardAnalyticsPanel";

export default function AdminDashboardAnalytics() {
  return (
    <AdminLayout
      title="Dashboard Analytics"
      subtitle="Metricas y estado operativo por producto"
    >
      <AdminDashboardAnalyticsPanel />
    </AdminLayout>
  );
}

