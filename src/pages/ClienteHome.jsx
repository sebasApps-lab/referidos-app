// src/pages/ClienteHome.jsx
import React, { useEffect, useState } from "react";
import { useAppStore } from "../store/appStore";
import PromoSection from "../components/sections/PromoSection";
import SearchBar from "../components/ui/SearchBar";
import { usePromoSearch } from "../hooks/usePromoSearch";
import MenuFilters from "../components/menus/MenuFilters";
import PromoCardCercanas from "../components/cards/PromoCardCercanas";
import { sanitizeText } from "../utils/sanitize";

export default function ClienteHome() {
  const [showFiltros, setShowFiltros] = useState(false);

  //  CARGAR DESDE SUPABASE
  const loadPromos = useAppStore((s) => s.loadPromos);
  const promos = useAppStore((s) => s.promos);
  const ratings = useAppStore((s) => s.ratings);
  const initRatings = useAppStore((s) => s.initRatings);
  const loading = useAppStore((s) => s.loading);

  useEffect(() => {
    loadPromos();
  }, [loadPromos]);

  useEffect(() => {
    if (promos.length > 0) initRatings(promos);
  }, [promos, initRatings]);

  const [query, setQuery] = useState("");
  const { filterPromos } = usePromoSearch(query);
  const searchResults = filterPromos(promos);
  const searching = query.trim().length > 0;

  // Categorizar promos (puedes mejorar con filtros SQL)
  const recomendadas = promos.slice(0, 5);
  const hot = promos.slice(5, 10);
  const cercanas = promos.slice(10, 15);

  const safeResults = searchResults.map((p) => ({
    ...p,
    titulo: sanitizeText(p.titulo),
    descripcion: sanitizeText(p.descripcion),
    sector: sanitizeText(p.sector),
    nombreLocal: sanitizeText(p.nombreLocal),
  }));

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        Cargando promociones...
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 0 120px" }}>
      <SearchBar
        value={query}
        onChange={setQuery}
        onFilters={() => setShowFiltros(!showFiltros)}
      />

      {showFiltros && <MenuFilters onClose={() => setShowFiltros(false)} />}

      {searching ? (
        <div style={{ padding: "0 16px" }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Resultados</h3>

          {searchResults.length === 0 && <p>No se encontró el local.</p>}

          {safeResults.map((p) => (
            <PromoCardCercanas
              key={p.id}
              promo={p}
              rating={ratings[p.id]}
              className="w-full"
            />
          ))}
        </div>
      ) : (
        <div style={{ padding: "0 16px" }}>
          <PromoSection title="Promociones sugeridas" promos={recomendadas} ratings={ratings} />
          <PromoSection title="Nuevas" promos={cercanas} ratings={ratings} />
          <PromoSection title="Hot" promos={hot} ratings={ratings} />
        </div>
      )}
    </div>
  );
}
