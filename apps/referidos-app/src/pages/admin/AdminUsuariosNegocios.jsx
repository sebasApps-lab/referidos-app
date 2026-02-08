// src/pages/admin/AdminUsuariosNegocios.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import UsuariosTable from "../../admin/usuarios/UsuariosTable";

export default function AdminUsuariosNegocios() {
  return (
    <AdminLayout
      title="Usuarios negocio"
      subtitle="Vista especializada para negocios"
    >
      <UsuariosTable defaultRole="negocio" />
    </AdminLayout>
  );
}
