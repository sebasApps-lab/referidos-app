import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAppStore } from "../../store/appStore";
import MenuFilters from "../../components/menus/MenuFilters";
import PromoCardCercanas from "../../components/cards/PromoCardCercanas";
import SearchBar from "../../components/ui/SearchBar";
import { usePromoSearch } from "../../hooks/usePromoSearch";
import { sanitizeText } from "../../utils/sanitize";
import { useClienteUI } from "../hooks/useClienteUI";
import { useSearchDock } from "../hooks/useSearchDock";
import InicioHero from "./InicioHero";
import InicioBeneficios from "./InicioBeneficios";
import InicioEmptyState from "./InicioEmptyState";
import InicioPromosPreview from "./InicioPromosPreview";

export default function ClienteInicio() {
  const { filtersOpen, toggleFilters, setFiltersOpen } = useClienteUI();
  const [dockTarget, setDockTarget] = useState(null);

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

  useEffect(() => {
    setDockTarget(document.getElementById("cliente-header-search-dock"));
  }, []);

  const { query, setQuery, filterPromos } = usePromoSearch();
  const searchResults = filterPromos(promos);
  const searching = query.trim().length > 0;
  const searchDocked = useSearchDock();

  const usePromosPreview = true;

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

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-black/60">
        Cargando promociones...
      </div>
    );
  }

  return (
    <div className="pb-16">
      {dockTarget
        ? createPortal(
            <div
              className="hero-search-dock"
              data-state={searchDocked ? "open" : "closed"}
              aria-hidden={!searchDocked}
            >
              <div className="hero-search-surface">
                <div className="max-w-6xl mx-auto px-4 pb-3 pt-0">
                  <SearchBar
                    value={query}
                    onChange={setQuery}
                    onFilters={toggleFilters}
                  />
                </div>
              </div>
            </div>,
            dockTarget
          )
        : null}
      <InicioHero
        usuario={usuario}
        searchValue={query}
        onSearchChange={setQuery}
        onSearchFilters={toggleFilters}
        hideSearch={searchDocked}
      />
      <div className="mt-4">
        {filtersOpen && <MenuFilters onClose={() => setFiltersOpen(false)} />}
      </div>

      {searching ? (
        <div className="mt-6 px-4">
          <h3 className="text-sm font-semibold text-[#2F1A55] mb-3">
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
                <PromoCardCercanas
                  key={p.id}
                  promo={p}
                  rating={ratings[p.id]}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>
      ) : !usePromosPreview && promos.length === 0 ? (
        <InicioEmptyState variant="promos" />
      ) : (
        <>
          <InicioPromosPreview />
          {/*
          <InicioPromos sections={sections} ratings={ratings} />
          */}
          <InicioBeneficios usuario={usuario} />
        </>
      )}
    </div>
  );
}
