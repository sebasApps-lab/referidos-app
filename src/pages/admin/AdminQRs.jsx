// src/pages/admin/AdminQRs.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import QRsTable from "../../admin/qrs/QRsTable";

export default function AdminQRs() {
  return (
    <AdminLayout title="QRs" subtitle="Auditoria de codigos y canjes">
      <QRsTable />
    </AdminLayout>
  );
}
