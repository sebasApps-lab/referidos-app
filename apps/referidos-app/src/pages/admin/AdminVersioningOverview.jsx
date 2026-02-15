import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import VersioningOverviewPanel from "../../admin/versioning/VersioningOverviewPanel";

export default function AdminVersioningOverview() {
  return (
    <AdminLayout
      title="Versionado Global"
      subtitle="Mapa por entorno, drift y promociones de release"
    >
      <VersioningOverviewPanel />
    </AdminLayout>
  );
}
