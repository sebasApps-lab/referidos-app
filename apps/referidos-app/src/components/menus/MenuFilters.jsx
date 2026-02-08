import React, { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";

export default function MenuFilters({ onClose }) {
  const [categoria, setCategoria] = useState("");
  const [sector, setSector] = useState("");
  const [descuento, setDescuento] = useState("");
  const [orden, setOrden] = useState("");

  return (
    <div className="mx-4 mb-4 rounded-2xl border border-[#E9E2F7] bg-white shadow-sm">
      <div className="px-5 pt-5 pb-3 border-b border-[#E9E2F7] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-xl bg-[#5E30A5]/10 text-[#5E30A5] flex items-center justify-center">
            <Filter size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#2F1A55]">Filtros</p>
            <p className="text-xs text-slate-500">
              Ajusta resultados de forma simple
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-slate-400 hover:text-[#5E30A5]"
        >
          Cerrar
        </button>
      </div>

      <div className="px-5 py-4 grid gap-4">
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Categoria
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
          >
            <option value="">Todas</option>
            <option>Restaurantes</option>
            <option>Moda</option>
            <option>Tecnologia</option>
            <option>Belleza</option>
            <option>Educacion</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">Sector</label>
          <input
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="Ej. Centro, Norte, Sur"
            className="mt-2 w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Descuento minimo
          </label>
          <select
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
          >
            <option value="">Cualquiera</option>
            <option>10%+</option>
            <option>20%+</option>
            <option>30%+</option>
            <option>40%+</option>
            <option>50%+</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Ordenar por
          </label>
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
          >
            <option value="">Relevancia</option>
            <option>Mayor descuento</option>
            <option>Nuevas</option>
            <option>Mas cercanas</option>
            <option>Mejor valoradas</option>
          </select>
        </div>
      </div>

      <div className="px-5 pb-5 flex items-center gap-3">
        <button
          type="button"
          className="flex-1 rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-sm font-semibold text-slate-500 hover:text-[#5E30A5]"
          onClick={() => {
            setCategoria("");
            setSector("");
            setDescuento("");
            setOrden("");
          }}
        >
          Limpiar
        </button>
        <button
          type="button"
          className="flex-1 rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
          onClick={onClose}
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal size={14} />
            Aplicar
          </span>
        </button>
      </div>
    </div>
  );
}
