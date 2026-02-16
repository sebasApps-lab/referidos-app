// src/pages/admin/AdminInicio.jsx
import React from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import InicioKPIs from "../../admin/inicio/InicioKPIs";
import InicioCharts from "../../admin/inicio/InicioCharts";
import GithubTokenRenewalCard from "../../admin/inicio/GithubTokenRenewalCard";

export default function AdminInicio() {
  return (
    <AdminLayout
      title="Inicio"
      subtitle="Vista global del estado de la plataforma"
    >
      <div className="space-y-6">
        <InicioKPIs />
        <GithubTokenRenewalCard />
        <InicioCharts />
      </div>
    </AdminLayout>
  );
}
