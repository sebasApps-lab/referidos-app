// src/pages/admin/AdminUsuarios.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import UsuariosTable from "../../admin/usuarios/UsuariosTable";

export default function AdminUsuarios() {
  return (
    <AdminLayout
      title="Usuarios"
      subtitle="Gestion y control de cuentas"
    >
      <UsuariosTable />
    </AdminLayout>
  );
}
