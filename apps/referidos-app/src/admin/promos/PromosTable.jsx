// src/admin/promos/PromosTable.jsx
import React, { useMemo, useState } from "react";
import { AlertTriangle, Filter, Search, Tag } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";

const PROMOS = [
  {
    id: "PRO_449",
    titulo: "2x1 almuerzo",
    negocio: "Pizzeria La Rueda",
    estado: "activo",
    inicio: "2025-02-01",
    fin: "2025-03-01",
    canjeados: 218,
  },
  {
    id: "PRO_512",
    titulo: "Happy hour",
    negocio: "Cafe Central",
    estado: "pendiente",
    inicio: "2025-02-12",
    fin: "2025-03-12",
    canjeados: 28,
  },
  {
    id: "PRO_620",
    titulo: "Combo familiar",
    negocio: "Mercado Norte",
    estado: "pausado",
    inicio: "2025-01-15",
    fin: "2025-02-15",
    canjeados: 12,
  },
];

const STATUS_VARIANT = {
  activo: "success",
  pendiente: "warning",
  pausado: "danger",
};

export default function PromosTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = useMemo(() => {
    return PROMOS.filter((promo) => {
      const matchesQuery = promo.titulo
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "todos" || promo.estado === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-[#2F1A55]">Promos</div>
          <div className="text-xs text-slate-500">
            Moderacion de promos activas y sospechosas.
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white"
        >
          <Tag size={14} />
          Revisar cola
        </button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm md:grid-cols-[1.4fr_1fr]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <Search size={14} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar promo"
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
            <option value="activo">Activo</option>
            <option value="pendiente">Pendiente</option>
            <option value="pausado">Pausado</option>
          </select>
        </div>
      </div>

      <Table
        columns={[
          { key: "promo", label: "Promo" },
          { key: "negocio", label: "Negocio" },
          { key: "estado", label: "Estado" },
          { key: "canjeados", label: "Canjeados" },
          { key: "periodo", label: "Periodo", hideOnMobile: true },
          { key: "acciones", label: "Acciones", align: "right" },
        ]}
      >
        {filtered.map((promo) => (
          <tr key={promo.id} className="hover:bg-[#FAF8FF]">
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-700">{promo.titulo}</div>
              <div className="text-xs text-slate-400">{promo.id}</div>
            </td>
            <td className="px-4 py-3 text-slate-500">{promo.negocio}</td>
            <td className="px-4 py-3">
              <Badge variant={STATUS_VARIANT[promo.estado]}>
                {promo.estado}
              </Badge>
            </td>
            <td className="px-4 py-3 text-slate-500">
              {promo.canjeados}
            </td>
            <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
              {promo.inicio} - {promo.fin}
            </td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500"
                >
                  Pausar
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#FFF1F1] px-3 py-1 text-xs font-semibold text-rose-600"
                >
                  <AlertTriangle size={12} className="inline" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
