import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAppStore } from "../../store/appStore";
import MenuFilters from "../../components/menus/MenuFilters";
import PromoCardCercanas from "../../components/cards/PromoCardCercanas";
import {
  HeaderPanelContainer,
  SearchbarPanel,
} from "../../components/header-panels";
import SearchContainer from "../../components/search/SearchContainer";
import SearchResults from "../../components/search/SearchResults";
import { useSearchMode } from "../../components/search/useSearchMode";
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

  const { query, setQuery, isSearching, onFocus, onCancel } = useSearchMode();
  const { filterPromos } = usePromoSearch(query);
  const searchResults = filterPromos(promos);
  const hasQuery = query.trim().length > 0;
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

  const mode = isSearching ? "search" : "default";
  const showSearchDock = searchDocked || mode === "search";

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-black/60">
        Cargando promociones...
      </div>
    );
  }

  return (
    <div className="pb-16">
      <SearchContainer
        mode={mode}
        searchBar={
          showSearchDock && dockTarget
            ? createPortal(
                <HeaderPanelContainer
                  open={showSearchDock}
                  panelClassName="hero-search-dock"
                  panelProps={{ "aria-hidden": !showSearchDock }}
                >
                  <SearchbarPanel
                    value={query}
                    onChange={setQuery}
                    onFilters={toggleFilters}
                    onFocus={onFocus}
                    onCancel={onCancel}
                    showBack={mode === "search"}
                  />
                </HeaderPanelContainer>,
                dockTarget
              )
            : null
        }
        results={
          hasQuery ? (
            <SearchResults
              title="Resultados"
              items={safeResults}
              renderItem={(p) => (
                <PromoCardCercanas
                  key={p.id}
                  promo={p}
                  rating={ratings[p.id]}
                  className="w-full"
                />
              )}
              emptyState={<InicioEmptyState variant="search" onClear={onCancel} />}
              showEmpty
              wrapperClassName="mt-6 px-4"
              listClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              titleClassName="text-sm font-semibold text-[#2F1A55] mb-3"
            />
          ) : null
        }
      >
        <InicioHero
          usuario={usuario}
          searchValue={query}
          onSearchChange={setQuery}
          onSearchFilters={toggleFilters}
          onSearchFocus={onFocus}
          hideSearch={showSearchDock}
        />
        <div className="mt-4">
          {filtersOpen && (
            <MenuFilters onClose={() => setFiltersOpen(false)} />
          )}
        </div>

        {!usePromosPreview && promos.length === 0 ? (
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
      </SearchContainer>
    </div>
  );
}
