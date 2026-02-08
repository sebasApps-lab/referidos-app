// src/pages/admin/AdminUsuariosClientes.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import UsuariosTable from "../../admin/usuarios/UsuariosTable";

export default function AdminUsuariosClientes() {
  return (
    <AdminLayout
      title="Usuarios cliente"
      subtitle="Vista especializada para clientes"
    >
      <UsuariosTable defaultRole="cliente" />
    </AdminLayout>
  );
}
