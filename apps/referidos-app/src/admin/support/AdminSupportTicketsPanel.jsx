import React from "react";
import AdminSupportControlPanel from "./AdminSupportControlPanel";

export default function AdminSupportTicketsPanel() {
  return (
    <AdminSupportControlPanel
      lockedPanel="tickets"
      title="Panel Tickets"
      subtitle="Flujo visual y control operativo de tickets"
    />
  );
}
