import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminDocumentationPanel from "../../admin/docs/AdminDocumentationPanel";

export default function AdminDocumentation() {
  return (
    <AdminLayout
      title="Documentacion"
      subtitle="Guias del repo organizadas por ambito general y por app"
    >
      <AdminDocumentationPanel />
    </AdminLayout>
  );
}

