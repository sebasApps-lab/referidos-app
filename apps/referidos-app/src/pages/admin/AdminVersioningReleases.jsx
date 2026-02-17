import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import VersioningReleaseExplorerPanel from "../../admin/versioning/VersioningReleaseExplorerPanel";

export default function AdminVersioningReleases() {
  return (
    <AdminLayout
      title="Versionado Detalle"
      subtitle="Releases por app, snapshot de componentes e historial"
    >
      <VersioningReleaseExplorerPanel />
    </AdminLayout>
  );
}
