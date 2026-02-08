// src/pages/admin/AdminNegocios.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import NegociosTable from "../../admin/negocios/NegociosTable";

export default function AdminNegocios() {
  return (
    <AdminLayout
      title="Negocios"
      subtitle="Supervision de locales y sucursales"
    >
      <NegociosTable />
    </AdminLayout>
  );
}
