import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import IssuesTable from "../../admin/observability/IssuesTable";

export default function AdminObservability() {
  return (
    <AdminLayout title="Observability" subtitle="Issues, eventos y trazabilidad">
      <IssuesTable />
    </AdminLayout>
  );
}
