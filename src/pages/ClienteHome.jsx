// src/pages/ClienteHome.jsx
import React, { useMemo, useState } from "react";
import { useAppStore } from "../store/appStore";

import {
  getRecomendadas,
  getPromosCercanas,
  getPromosNuevas,
  getPromosHot,
  //populateCalificationsAndAverages,
} from "../data/simulatedData";

import PromoSection from "../components/sections/PromoSection";
import SearchBar from "../components/ui/SearchBar";
import PromoCard from "../components/cards/PromoCard";
import { usePromoSearch } from "../hooks/usePromoSearch";

import MenuFilters from "../components/menus/MenuFilters"; // nuevo

export default function ClienteHome() {
  /* Ejecutar explícitamente
  populateCalificationsAndAverages();*/

  const [showFiltros, setShowFiltros] = useState(false);

  const recomendadas = getRecomendadas();
  const hot = getPromosHot();
  const cercanas = getPromosNuevas();

  const ratings = useMemo(() => {
    const all = [...recomendadas, ...cercanas, ...hot];
    const map = {};
    all.forEach((p) => {
      map[p.id] =
        p.rating ||
        Math.round((3 + Math.random() * 2) * 10) / 10;
    });
    return map;
  }, []);

  const { query, setQuery, filterPromos } = usePromoSearch();
  const allPromos = [...recomendadas, ...cercanas, ...hot];
  const searchResults = filterPromos(allPromos);

  const searching = query.trim().length > 0;

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

          {searchResults.map((p) => (
            <PromoCard key={p.id} promo={p} rating={ratings[p.id]} />
          ))}
        </div>
      ) : (
        <div style={{ padding: "0 16px" }}>
          <PromoSection
            title="Promociones sugeridas"
            promos={recomendadas}
            ratings={ratings}
          />
          <PromoSection
            title="Nuevas"
            promos={cercanas}
            ratings={ratings}
          />
          <PromoSection
            title="Hot"
            promos={hot}
            ratings={ratings}
          />
        </div>
      )}
    </div>
  );
}
