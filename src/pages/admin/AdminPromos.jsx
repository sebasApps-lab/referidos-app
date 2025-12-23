// src/pages/admin/AdminPromos.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import PromosTable from "../../admin/promos/PromosTable";

export default function AdminPromos() {
  return (
    <AdminLayout
      title="Promos"
      subtitle="Moderacion y control de promociones"
    >
      <PromosTable />
    </AdminLayout>
  );
}
