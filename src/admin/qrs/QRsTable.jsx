// src/admin/qrs/QRsTable.jsx
import React, { useMemo, useState } from "react";
import { Filter, QrCode, Search } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import QRDetalle from "./QRDetalle";

const QRS = [
  {
    id: "QR_84af",
    cliente: "Maria Paredes",
    negocio: "Pizzeria La Rueda",
    promo: "2x1 almuerzo",
    estado: "valido",
    fechaCreacion: "2025-02-14 10:22",
    fechaExpira: "2025-02-16 10:22",
    fechaCanje: "-",
  },
  {
    id: "QR_90bc",
    cliente: "Lucia Gomez",
    negocio: "Cafe Central",
    promo: "Happy hour",
    estado: "canjeado",
    fechaCreacion: "2025-02-14 09:12",
    fechaExpira: "2025-02-15 09:12",
    fechaCanje: "2025-02-14 09:40",
  },
  {
    id: "QR_21fd",
    cliente: "Carlos Soto",
    negocio: "Mercado Norte",
    promo: "Combo familiar",
    estado: "expirado",
    fechaCreacion: "2025-02-10 13:20",
    fechaExpira: "2025-02-11 13:20",
    fechaCanje: "-",
  },
];

const STATUS_VARIANT = {
  valido: "success",
  canjeado: "info",
  expirado: "danger",
};

export default function QRsTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return QRS.filter((qr) => {
      const matchesQuery = qr.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "todos" || qr.estado === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const openDrawer = (qr) => {
    setSelected(qr);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-[#2F1A55]">QRs</div>
          <div className="text-xs text-slate-500">
            Estado global de QR validos y canjeados.
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white"
        >
          <QrCode size={14} />
          Exportar QRs
        </button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm md:grid-cols-[1.4fr_1fr]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <Search size={14} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar QR"
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
            <option value="valido">Valido</option>
            <option value="canjeado">Canjeado</option>
            <option value="expirado">Expirado</option>
          </select>
        </div>
      </div>

      <Table
        columns={[
          { key: "qr", label: "QR" },
          { key: "cliente", label: "Cliente" },
          { key: "negocio", label: "Negocio" },
          { key: "estado", label: "Estado" },
          { key: "fecha", label: "Creado", hideOnMobile: true },
          { key: "acciones", label: "Acciones", align: "right" },
        ]}
      >
        {filtered.map((qr) => (
          <tr key={qr.id} className="hover:bg-[#FAF8FF]">
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-700">{qr.id}</div>
              <div className="text-xs text-slate-400">{qr.promo}</div>
            </td>
            <td className="px-4 py-3 text-slate-500">{qr.cliente}</td>
            <td className="px-4 py-3 text-slate-500">{qr.negocio}</td>
            <td className="px-4 py-3">
              <Badge variant={STATUS_VARIANT[qr.estado]}>{qr.estado}</Badge>
            </td>
            <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
              {qr.fechaCreacion}
            </td>
            <td className="px-4 py-3 text-right">
              <button
                type="button"
                onClick={() => openDrawer(qr)}
                className="rounded-lg border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500"
              >
                Detalle
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <QRDetalle
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        qr={selected}
      />
    </div>
  );
}
