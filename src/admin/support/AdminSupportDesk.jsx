import React from "react";
import AdminLayout from "../layout/AdminLayout";
import SupportInbox from "../../support/agent/SupportInbox";

export default function AdminSupportDesk() {
  return (
    <AdminLayout
      title="Soporte"
      subtitle="Modo asesor para revisar tickets"
    >
      <SupportInbox isAdmin basePath="/admin/soporte" />
    </AdminLayout>
  );
}
