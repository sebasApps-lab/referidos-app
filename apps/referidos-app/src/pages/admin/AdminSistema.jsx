// src/pages/admin/AdminSistema.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import FeatureFlags from "../../admin/sistema/FeatureFlags";
import RegistroCodes from "../../admin/sistema/RegistroCodes";

export default function AdminSistema() {
  return (
    <AdminLayout
      title="Sistema"
      subtitle="Control global y herramientas administrativas"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <FeatureFlags />
        <RegistroCodes />
      </div>
    </AdminLayout>
  );
}
