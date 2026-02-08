// src/admin/reportes/ReportesTable.jsx
import React, { useMemo, useState } from "react";
import { AlertTriangle, Filter, Search } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";

const REPORTES = [
  {
    id: "REP_201",
    reporter: "Maria Paredes",
    reporterRole: "cliente",
    targetType: "promo",
    targetId: "PRO_449",
    texto: "Contenido engañoso",
    estado: "abierto",
    fecha: "2025-02-14 08:12",
  },
  {
    id: "REP_233",
    reporter: "Carlos Soto",
    reporterRole: "negocio",
    targetType: "usuario",
    targetId: "USR_7aa02",
    texto: "Abuso de canje",
    estado: "en_revision",
    fecha: "2025-02-13 18:44",
  },
  {
    id: "REP_250",
    reporter: "Lucia Gomez",
    reporterRole: "cliente",
    targetType: "negocio",
    targetId: "NEG_330",
    texto: "Local cerrado",
    estado: "resuelto",
    fecha: "2025-02-11 12:01",
  },
];

const STATUS_VARIANT = {
  abierto: "danger",
  en_revision: "warning",
  resuelto: "success",
};

export default function ReportesTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = useMemo(() => {
    return REPORTES.filter((reporte) => {
      const matchesQuery = reporte.texto
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "todos" || reporte.estado === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-[#2F1A55]">Reportes</div>
          <div className="text-xs text-slate-500">
            Gestion de quejas y moderacion de contenido.
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white"
        >
          <AlertTriangle size={14} />
          Ver cola critica
        </button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm md:grid-cols-[1.4fr_1fr]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <Search size={14} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar reporte"
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          />
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <Filter size={14} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          >
            <option value="todos">Estado: todos</option>
            <option value="abierto">Abierto</option>
            <option value="en_revision">En revision</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>
      </div>

      <Table
        columns={[
          { key: "reporte", label: "Reporte" },
          { key: "reporter", label: "Reporter" },
          { key: "objetivo", label: "Objetivo" },
          { key: "estado", label: "Estado" },
          { key: "fecha", label: "Fecha", hideOnMobile: true },
          { key: "acciones", label: "Acciones", align: "right" },
        ]}
      >
        {filtered.map((reporte) => (
          <tr key={reporte.id} className="hover:bg-[#FAF8FF]">
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-700">{reporte.id}</div>
              <div className="text-xs text-slate-400">{reporte.texto}</div>
            </td>
            <td className="px-4 py-3 text-slate-500">
              {reporte.reporter} ({reporte.reporterRole})
            </td>
            <td className="px-4 py-3 text-slate-500">
              {reporte.targetType} / {reporte.targetId}
            </td>
            <td className="px-4 py-3">
              <Badge variant={STATUS_VARIANT[reporte.estado]}>
                {reporte.estado}
              </Badge>
            </td>
            <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
              {reporte.fecha}
            </td>
            <td className="px-4 py-3 text-right">
              <button
                type="button"
                className="rounded-lg border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500"
              >
                Revisar
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
