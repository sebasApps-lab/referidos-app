import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminLegalPanel from "../../admin/legal/AdminLegalPanel";

export default function AdminLegal() {
  return (
    <AdminLayout
      title="Legal"
      subtitle="Politicas de marca, fuentes oficiales y versiones de documentos legales"
    >
      <AdminLegalPanel />
    </AdminLayout>
  );
}

