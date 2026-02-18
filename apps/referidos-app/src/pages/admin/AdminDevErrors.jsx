import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import ErrorCatalogTable from "../../admin/observability/ErrorCatalogTable";

export default function AdminDevErrors() {
  return (
    <AdminLayout
      title="Catalogo errores"
      subtitle="Errores detectados, pendientes y definidos"
    >
      <ErrorCatalogTable />
    </AdminLayout>
  );
}

