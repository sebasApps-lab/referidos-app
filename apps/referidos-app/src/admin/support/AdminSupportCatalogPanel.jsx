import React from "react";
import AdminSupportControlPanel from "./AdminSupportControlPanel";

export default function AdminSupportCatalogPanel() {
  return (
    <AdminSupportControlPanel
      lockedPanel="catalogo"
      title="Catalogo de Soporte"
      subtitle="Categorias, macros y configuracion operativa"
    />
  );
}
