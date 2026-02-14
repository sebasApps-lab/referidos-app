import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import PrelaunchAnalyticsPanel from "../../admin/prelaunch/PrelaunchAnalyticsPanel";

export default function AdminPrelaunchAnalytics() {
  return (
    <AdminLayout
      title="Prelaunch Analytics"
      subtitle="Metricas de sesiones, waitlist, tickets anonimos y riesgo"
    >
      <PrelaunchAnalyticsPanel />
    </AdminLayout>
  );
}

