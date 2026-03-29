import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminAppsPanel from "../../admin/apps/AdminAppsPanel";

export default function AdminApps() {
  return (
    <AdminLayout
      title="Apps"
      subtitle="Identidad canónica de apps para tickets, logs y macros"
    >
      <AdminAppsPanel />
    </AdminLayout>
  );
}
