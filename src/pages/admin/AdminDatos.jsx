// src/pages/admin/AdminDatos.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import ChartsAvanzados from "../../admin/datos/ChartsAvanzados";

export default function AdminDatos() {
  return (
    <AdminLayout
      title="Datos"
      subtitle="Analisis avanzado y tendencias"
    >
      <ChartsAvanzados />
    </AdminLayout>
  );
}
