import React from "react";
import AdminLayout from "../layout/AdminLayout";
import SupportTicket from "@referidos/support-sdk/agent/SupportTicket";

export default function AdminSupportTicket() {
  return (
    <AdminLayout title="Soporte" subtitle="Detalle del ticket">
      <SupportTicket />
    </AdminLayout>
  );
}

