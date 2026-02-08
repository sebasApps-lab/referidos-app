import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAppStore } from "../../store/appStore";
import MenuFilters from "../../components/menus/MenuFilters";
import PromoCardCercanas from "../../components/cards/PromoCardCercanas";
import {
  HeaderPanelContainer,
  SearchbarPanel,
} from "../../components/header-panels";
import ClienteInicioSearch from "../../search/cliente/ClienteInicioSearch";
import SearchResults from "../../search/SearchResults";
import { useSearchMode } from "../../search/hooks/useSearchMode";
import SearchIdle from "../../search/SearchIdle";
import { usePromoSearch } from "../../hooks/usePromoSearch";
import { sanitizeText } from "../../utils/sanitize";
import LoaderOverlay from "../../components/ui/LoaderOverlay";
import { useClienteHeader } from "../layout/ClienteHeaderContext";
import { useCacheStore } from "../../cache/cacheStore";
import { CACHE_KEYS } from "../../cache/cacheKeys";
import { useClienteUI } from "../hooks/useClienteUI";
import { useSearchDock } from "../hooks/useSearchDock";
import InicioHero from "./InicioHero";
import InicioBeneficios from "./InicioBeneficios";
import InicioEmptyState from "./InicioEmptyState";
import InicioPromosPreview from "./InicioPromosPreview";
import ClienteInicioSkeleton from "./ClienteInicioSkeleton";

export default function ClienteInicio() {
  const { filtersOpen, setFiltersOpen } = useClienteUI();
  const [dockTarget, setDockTarget] = useState(null);

  const loadPromos = useAppStore((s) => s.loadPromos);
  const startPromosAutoRefresh = useAppStore((s) => s.startPromosAutoRefresh);
  const setPromosVisible = useAppStore((s) => s.setPromosVisible);
  const promos = useAppStore((s) => s.promos);
  const promosLoadedAt = useAppStore((s) => s.promosLoadedAt);
  const promosRefreshing = useAppStore((s) => s.promosRefreshing);
  const ratings = useAppStore((s) => s.ratings);
  const initRatings = useAppStore((s) => s.initRatings);
  const loading = useAppStore((s) => s.loading);
  const usuario = useAppStore((s) => s.usuario);

  useEffect(() => {
    if (!promosLoadedAt && promos.length === 0) {
      loadPromos({ force: true });
    }
  }, [loadPromos, promos.length, promosLoadedAt]);

  useEffect(() => {
    if (promos.length > 0) initRatings(promos);
  }, [promos, initRatings]);

  const { query, setQuery, isSearching, onFocus, onBack } = useSearchMode();
  const { filterPromos } = usePromoSearch(query);
  const searchResults = filterPromos(promos);
  const hasQuery = query.trim().length > 0;
  const isActive = useCacheStore(
    (state) => state.activeKeys.cliente === CACHE_KEYS.CLIENTE_INICIO
  );
  const { docked: searchDocked, heroVisible } = useSearchDock({
    enabled: isActive,
    rootSelector: `[data-cache-key="${CACHE_KEYS.CLIENTE_INICIO}"]`,
  });
  const { setHeaderOptions, headerEntering } = useClienteHeader();

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

  const hotPromos = useMemo(() => promos.slice(0, 8), [promos]);

  const mode = isSearching ? "search" : "default";
  const showSearchDock = searchDocked || mode === "search";
  const hideHeroSearch = showSearchDock && !heroVisible;

  const headerVisible = !(loading && promos.length === 0);

  useEffect(() => {
    if (!headerVisible || !isActive) {
      setDockTarget(null);
      return undefined;
    }
    let frameId;
    let tries = 0;
    const resolveTarget = () => {
      const target = document.getElementById("cliente-header-search-dock");
      if (target) {
        setDockTarget(target);
        return;
      }
      tries += 1;
      if (tries < 20) {
        frameId = requestAnimationFrame(resolveTarget);
      }
    };
    resolveTarget();
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [headerVisible]);

  useLayoutEffect(() => {
    if (!isActive) return undefined;
    setHeaderOptions({
      mode,
      onSearchBack: onBack,
      headerVisible,
    });
    return () => {
      setHeaderOptions({ mode: "default", onSearchBack: null, headerVisible: true });
    };
  }, [headerVisible, isActive, mode, onBack, setHeaderOptions]);

  useEffect(() => {
    startPromosAutoRefresh();
    setPromosVisible(mode === "default");
    return () => {
      setPromosVisible(false);
    };
  }, [mode, setPromosVisible, startPromosAutoRefresh]);

  if (loading && promos.length === 0) {
    return (
      <LoaderOverlay>
        <ClienteInicioSkeleton />
      </LoaderOverlay>
    );
  }

  if (!isActive) {
    return <div className="pb-16" />;
  }

  return (
    <div className="pb-16">
      <ClienteInicioSearch
        open={isSearching}
        onBack={onBack}
        searchBar={
          dockTarget
            ? createPortal(
                <HeaderPanelContainer
                  open={showSearchDock}
                  panelClassName="hero-search-dock"
                  panelProps={{ "aria-hidden": !showSearchDock }}
                >
                  <SearchbarPanel
                    value={query}
                    onChange={setQuery}
                    onFocus={onFocus}
                    onCancel={onBack}
                    showBack={false}
                    autoFocus={mode === "search"}
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
              emptyState={<InicioEmptyState variant="search" onClear={onBack} />}
              showEmpty
              wrapperClassName="mt-6"
              listClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              titleClassName="text-sm font-semibold text-[#2F1A55] mb-3"
            />
          ) : null
        }
        suggestions={
          !hasQuery ? (
            <SearchIdle
              hotPromos={hotPromos}
              ratings={ratings}
              onSelectSuggestion={(term) => setQuery(term)}
            />
          ) : null
        }
      >
        <div className={headerEntering ? "cliente-merge-enter" : ""}>
          <InicioHero
            usuario={usuario}
            searchValue={query}
            onSearchChange={setQuery}
            onSearchFocus={onFocus}
            hideSearch={hideHeroSearch}
          />
        </div>
        <div className="mt-4">
          {filtersOpen && (
            <MenuFilters onClose={() => setFiltersOpen(false)} />
          )}
        </div>

        {!usePromosPreview && promos.length === 0 ? (
          <InicioEmptyState variant="promos" />
        ) : (
          <>
            <div
              className={`transition-opacity duration-300 ${
                promosRefreshing ? "opacity-80" : "opacity-100"
              }`}
            >
              <InicioPromosPreview />
            </div>
            {/*
            <InicioPromos sections={sections} ratings={ratings} />
            */}
            <InicioBeneficios usuario={usuario} />
          </>
        )}
      </ClienteInicioSearch>
    </div>
  );
}
