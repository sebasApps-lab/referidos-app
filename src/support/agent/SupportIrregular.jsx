import React, { useMemo, useState } from "react";
import { createIrregularThread } from "../supportClient";
import { SUPPORT_CATEGORIES } from "../data/supportCategories";

export default function SupportIrregular() {
  const [userPublicId, setUserPublicId] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("acceso");
  const [status, setStatus] = useState(null);
  const categories = useMemo(() => SUPPORT_CATEGORIES, []);

  const handleCreate = async () => {
    const result = await createIrregularThread({
      user_public_id: userPublicId.trim(),
      summary: summary.trim(),
      category,
    });
    if (result.ok) {
      setStatus("Ticket irregular creado.");
      setUserPublicId("");
      setSummary("");
    } else {
      setStatus(result.error || "No se pudo crear.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.25em] text-[#5E30A5]/70">
          Soporte
        </div>
        <h1 className="text-2xl font-extrabold text-[#2F1A55]">
          Ticket irregular
        </h1>
        <p className="text-sm text-slate-500">
          Crea un ticket manual si el usuario escribio directo por WhatsApp.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-3">
        <label className="text-xs font-semibold text-[#2F1A55]">
          ID publico del usuario
        </label>
        <input
          value={userPublicId}
          onChange={(e) => setUserPublicId(e.target.value)}
          placeholder="USR-XXXX / NEG-XXXX / EMP-XXXX"
          className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-2 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
        />
        <label className="text-xs font-semibold text-[#2F1A55]">
          Categoria
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-2 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <label className="text-xs font-semibold text-[#2F1A55]">
          Resumen del caso
        </label>
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Descripcion corta"
          className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-2 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
        />
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-2xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
        >
          Crear ticket irregular
        </button>
        {status ? (
          <div className="text-xs text-slate-500">{status}</div>
        ) : null}
      </div>
    </div>
  );
}
