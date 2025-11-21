import { useState } from "react";

export function usePromoSearch() {
  const [query, setQuery] = useState("");

  const filterPromos = (promos) => {
    if (!query.trim()) return promos;

    const q = query.toLowerCase();

    return promos.filter((p) => {
      const titulo = (p.titulo || "").toLowerCase();
      const descripcion = (p.descripcion || "").toLowerCase();
      const local = (p.local || p.nombreLocal || "").toLowerCase();
      const sector = (p.sector || "").toLowerCase();

      return (
        titulo.includes(q) ||
        descripcion.includes(q) ||
        local.includes(q) ||
        sector.includes(q)
      );
    });
  };

  return { query, setQuery, filterPromos };
}
