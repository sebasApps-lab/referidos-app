import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import VersioningOverviewPanel from "../../admin/versioning/VersioningOverviewPanel";

export default function AdminVersioningOverview() {
  return (
    <AdminLayout
      title="Versionado"
      subtitle="Releases y publicaciones desde desarrollo hasta producción"
    >
      <VersioningOverviewPanel />
    </AdminLayout>
  );
}
