// src/admin/negocios/NegociosTable.jsx
import React, { useMemo, useState } from "react";
import { Filter, Search, Store } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import NegocioDetalle from "./NegocioDetalle";

const NEGOCIOS = [
  {
    id: "NEG_102",
    nombre: "Pizzeria La Rueda",
    sector: "Restaurantes",
    direccion: "La Carolina",
    sucursales: 2,
    promosActivas: 4,
    estado: "activo",
    propietario: "Carlos Soto",
  },
  {
    id: "NEG_214",
    nombre: "Cafe Central",
    sector: "Cafeterias",
    direccion: "Centro",
    sucursales: 1,
    promosActivas: 1,
    estado: "activo",
    propietario: "Lucia Gomez",
  },
  {
    id: "NEG_330",
    nombre: "Mercado Norte",
    sector: "Retail",
    direccion: "Norte",
    sucursales: 3,
    promosActivas: 0,
    estado: "inactivo",
    propietario: "Jorge Vera",
  },
];

const STATUS_VARIANT = {
  activo: "success",
  inactivo: "warning",
  suspendido: "danger",
};

export default function NegociosTable() {
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("todos");
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return NEGOCIOS.filter((negocio) => {
      const matchesQuery = negocio.nombre
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesSector =
        sectorFilter === "todos" || negocio.sector === sectorFilter;
      return matchesQuery && matchesSector;
    });
  }, [query, sectorFilter]);

  const openDrawer = (negocio) => {
    setSelected(negocio);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-[#2F1A55]">Negocios</div>
          <div className="text-xs text-slate-500">
            Vista global de negocios y actividad.
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white"
        >
          <Store size={14} />
          Nuevo negocio
        </button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm md:grid-cols-[1.4fr_1fr]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <Search size={14} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar negocio"
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          />
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <Filter size={14} />
          <select
            value={sectorFilter}
            onChange={(event) => setSectorFilter(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          >
            <option value="todos">Sector: todos</option>
            <option value="Restaurantes">Restaurantes</option>
            <option value="Cafeterias">Cafeterias</option>
            <option value="Retail">Retail</option>
          </select>
        </div>
      </div>

      <Table
        columns={[
          { key: "negocio", label: "Negocio" },
          { key: "sector", label: "Sector" },
          { key: "estado", label: "Estado" },
          { key: "promos", label: "Promos" },
          { key: "sucursales", label: "Sucursales", hideOnMobile: true },
          { key: "acciones", label: "Acciones", align: "right" },
        ]}
      >
        {filtered.map((negocio) => (
          <tr key={negocio.id} className="hover:bg-[#FAF8FF]">
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-700">
                {negocio.nombre}
              </div>
              <div className="text-xs text-slate-400">{negocio.id}</div>
            </td>
            <td className="px-4 py-3 text-slate-500">{negocio.sector}</td>
            <td className="px-4 py-3">
              <Badge variant={STATUS_VARIANT[negocio.estado]}>
                {negocio.estado}
              </Badge>
            </td>
            <td className="px-4 py-3 text-slate-500">
              {negocio.promosActivas}
            </td>
            <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
              {negocio.sucursales}
            </td>
            <td className="px-4 py-3 text-right">
              <button
                type="button"
                onClick={() => openDrawer(negocio)}
                className="rounded-lg border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500 transition hover:text-[#5E30A5]"
              >
                Ver detalle
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <NegocioDetalle
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        negocio={selected}
      />
    </div>
  );
}
