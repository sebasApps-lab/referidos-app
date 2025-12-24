import React, { useEffect, useMemo } from "react";
import { useAppStore } from "../../store/appStore";
import SearchBar from "../../components/ui/SearchBar";
import MenuFilters from "../../components/menus/MenuFilters";
import PromoCard from "../../components/cards/PromoCard";
import { usePromoSearch } from "../../hooks/usePromoSearch";
import { sanitizeText } from "../../utils/sanitize";
import { useClienteUI } from "../hooks/useClienteUI";
import InicioHero from "./InicioHero";
import InicioPromos from "./InicioPromos";
import InicioBeneficios from "./InicioBeneficios";
import InicioEmptyState from "./InicioEmptyState";

export default function ClienteInicio() {
  const { filtersOpen, toggleFilters, setFiltersOpen } = useClienteUI();

  const loadPromos = useAppStore((s) => s.loadPromos);
  const promos = useAppStore((s) => s.promos);
  const ratings = useAppStore((s) => s.ratings);
  const initRatings = useAppStore((s) => s.initRatings);
  const loading = useAppStore((s) => s.loading);
  const usuario = useAppStore((s) => s.usuario);

  useEffect(() => {
    loadPromos();
  }, [loadPromos]);

  useEffect(() => {
    if (promos.length > 0) initRatings(promos);
  }, [promos, initRatings]);

  const { query, setQuery, filterPromos } = usePromoSearch();
  const searchResults = filterPromos(promos);
  const searching = query.trim().length > 0;

  const recomendadas = promos.slice(0, 5);
  const hot = promos.slice(5, 10);
  const cercanas = promos.slice(10, 15);

  const safeResults = useMemo(
    () =>
      searchResults.map((p) => ({
        ...p,
        titulo: sanitizeText(p.titulo),
        descripcion: sanitizeText(p.descripcion),
        sector: sanitizeText(p.sector),
        nombreLocal: sanitizeText(p.nombreLocal),
      })),
    [searchResults]
  );

  const sections = [
    { title: "Promos sugeridas", promos: recomendadas },
    { title: "Cerca de ti", promos: cercanas },
    { title: "Hot ahora", promos: hot },
  ];

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-black/60">
        Cargando promociones...
      </div>
    );
  }

  return (
    <div className="pb-16">
      <InicioHero usuario={usuario} />

      <div className="mt-6 space-y-4">
        <SearchBar value={query} onChange={setQuery} onFilters={toggleFilters} />
        {filtersOpen && <MenuFilters onClose={() => setFiltersOpen(false)} />}
      </div>

      {searching ? (
        <div className="mt-6 px-4">
          <h3 className="text-sm font-semibold text-[#1D1B1A] mb-3">
            Resultados
          </h3>
          {safeResults.length === 0 ? (
            <InicioEmptyState
              variant="search"
              onClear={() => setQuery("")}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {safeResults.map((p) => (
                <PromoCard
                  key={p.id}
                  promo={p}
                  rating={ratings[p.id]}
                  variant="grid"
                />
              ))}
            </div>
          )}
        </div>
      ) : promos.length === 0 ? (
        <InicioEmptyState variant="promos" />
      ) : (
        <>
          <InicioPromos sections={sections} ratings={ratings} />
          <InicioBeneficios usuario={usuario} />
        </>
      )}
    </div>
  );
}
