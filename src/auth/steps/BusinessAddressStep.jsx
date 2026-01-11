import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ErrorBanner from "../blocks/ErrorBanner";
import { searchAddresses } from "../../services/addressSearchClient";
import { reverseGeocode } from "../../services/addressReverseClient";
import { saveGpsFallbackLocation } from "../../services/gpsFallbackClient";
import {
  fetchProvincias,
  fetchCantonesByProvincia,
  fetchParroquiasByCanton,
} from "../../services/territoryClient";
import LeafletMapPicker from "../../components/maps/LeafletMapPicker";
import { useModal } from "../../modals/useModal";
import AddressStepSearch from "../../search/auth/AddressStepSearch";

const DEFAULT_MAP_CENTER = { lat: -0.2200934426615961, lng: -78.51208009501421 };
const FALLBACK_ZOOM = 11;
const CLOSE_ZOOM = 16;



export default function BusinessAddressStep({
  innerRef,
  searchModeOpen,
  onSearchModeChange,
  isSucursalPrincipal,
  onChangeSucursalPrincipal,
  direccionPayload,
  onChangeDireccionPayload,
  subtitle,
  error,
  onSubmit,
}) {
  const [stage, setStage] = useState("map");
  const [searchValue, setSearchValue] = useState("");
  const isSearchModeOpen = Boolean(searchModeOpen);
  const setIsSearchModeOpen = useCallback((next) => {
    onSearchModeChange?.(next);
  }, [onSearchModeChange]);
  const [selectedSearchItem, setSelectedSearchItem] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [addressLabel, setAddressLabel] = useState("");
  const [reverseError, setReverseError] = useState("");
  const [isReverseLoading, setIsReverseLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [coordsSource, setCoordsSource] = useState(null);
  const [localError, setLocalError] = useState("");
  const [mapStatus, setMapStatus] = useState("loading");
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const { openModal, closeModal, activeModal } = useModal();
  const [mapZoom, setMapZoom] = useState(FALLBACK_ZOOM);
  const [animateZoom, setAnimateZoom] = useState(false);
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [territory, setTerritory] = useState({
    provincias: [],
    cantonesByProvincia: {},
    parroquiasByCanton: {},
    provinciaById: {},
    cantonById: {},
    parroquiaById: {},
  });
  const [territoryError, setTerritoryError] = useState("");
  const [isLoadingTerritory, setIsLoadingTerritory] = useState(true);
  const [provinciaId, setProvinciaId] = useState(
    () => direccionPayload?.provincia_id || ""
  );
  const [cantonId, setCantonId] = useState(
    () => direccionPayload?.canton_id || ""
  );
  const [parroquiaId, setParroquiaId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasMapMoved, setHasMapMoved] = useState(false);
  const [hasMapZoomed, setHasMapZoomed] = useState(false);
  const initialMoveSkippedRef = useRef(false);
  const initialZoomSkippedRef = useRef(false);
  const programmaticMoveRef = useRef(false);
  const programmaticZoomRef = useRef(false);
  const zoomSequenceRef = useRef(null);

  useEffect(() => {
    let active = true;

    const loadProvincias = async () => {
      setIsLoadingTerritory(true);
      setTerritoryError("");
      const result = await fetchProvincias();
      if (!active) return;
      if (!result.ok) {
        setTerritoryError(result.error || "No se pudo cargar provincias");
        setIsLoadingTerritory(false);
        return;
      }

      const provinciaById = {};
      (result.data || []).forEach((prov) => {
        provinciaById[prov.id] = prov;
      });

      setTerritory((prev) => ({
        ...prev,
        provincias: result.data || [],
        provinciaById,
      }));
      setIsLoadingTerritory(false);
    };

    loadProvincias();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!provinciaId && direccionPayload?.provincia_id) {
      setProvinciaId(direccionPayload.provincia_id);
    }
    if (!cantonId && direccionPayload?.canton_id) {
      setCantonId(direccionPayload.canton_id);
    }
  }, [direccionPayload?.canton_id, direccionPayload?.provincia_id, cantonId, provinciaId]);

  useEffect(() => {
    if (!provinciaId) {
      setCantonId("");
      setParroquiaId("");
    }
  }, [provinciaId]);

  useEffect(() => {
    if (!cantonId) {
      setParroquiaId("");
    }
  }, [cantonId]);

  const buildDireccionPayload = useCallback(
    (overrides = {}) => ({
      place_id: "",
      label: "",
      display_label: "",
      provider: "",
      lat: null,
      lng: null,
      provincia_id: "",
      canton_id: "",
      parroquia_id: "",
      parroquia: "",
      ciudad: "",
      sector: "",
      calles: "",
      house_number: "",
      postcode: "",
      provincia: "",
      canton: "",
      country: "",
      ...direccionPayload,
      provincia_id: direccionPayload?.provincia_id || provinciaId || "",
      canton_id: direccionPayload?.canton_id || cantonId || "",
      ...overrides,
    }),
    [direccionPayload, provinciaId, cantonId]
  );

  const updateDireccionPayload = useCallback(
    (overrides = {}) => {
      onChangeDireccionPayload?.(buildDireccionPayload(overrides));
    },
    [buildDireccionPayload, onChangeDireccionPayload]
  );
  const updateDireccionPayloadRef = useRef(updateDireccionPayload);

  useEffect(() => {
    updateDireccionPayloadRef.current = updateDireccionPayload;
  }, [updateDireccionPayload]);

  const requestLocationRef = useRef(null);
  const didAutoLocateRef = useRef(false);
  const didPromptLocationRef = useRef(false);

  useEffect(() => {
    return () => {
      if (zoomSequenceRef.current) {
        clearTimeout(zoomSequenceRef.current);
      }
    };
  }, []);

  const openLocationModal = useCallback(() => {
    openModal("LocationPermission", {
      onConfirm: () => requestLocationRef.current?.(),
    });
  }, [openModal]);

  const openGpsModal = useCallback(() => {
    openModal("GpsDisabled", {
      onRetry: () => requestLocationRef.current?.(),
    });
  }, [openModal]);

  const closeLocationModal = useCallback(() => {
    if (activeModal === "LocationPermission") {
      closeModal();
    }
  }, [activeModal, closeModal]);

  const closeGpsModal = useCallback(() => {
    if (activeModal === "GpsDisabled") {
      closeModal();
    }
  }, [activeModal, closeModal]);

  const requestLocation = useCallback(() => {
    if (!navigator?.geolocation) {
      return;
    }
    if (isRequestingLocation) return;
    setIsRequestingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        programmaticMoveRef.current = true;
        setCoords(nextCenter);
        setCoordsSource("gps");
        programmaticZoomRef.current = true;
        setMapZoom(CLOSE_ZOOM);
        updateDireccionPayloadRef.current?.({
          lat: nextCenter.lat,
          lng: nextCenter.lng,
        });
        saveGpsFallbackLocation(nextCenter).catch(() => {});
        setIsRequestingLocation(false);
      },
      (error) => {
        setIsRequestingLocation(false);
        if (error?.code === 2 || error?.code === 3) {
          openGpsModal();
          return;
        }
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [closeModal, isRequestingLocation, openGpsModal, openLocationModal]);

  useEffect(() => {
    requestLocationRef.current = requestLocation;
  }, [requestLocation]);

  useEffect(() => {
    let active = true;
    if (!navigator?.geolocation) {
      return undefined;
    }

    const checkPermission = async () => {
      if (stage !== "map") return;
      if (!navigator.permissions?.query) {
        return;
      }
      try {
        const status = await navigator.permissions.query({
          name: "geolocation",
        });
        if (!active) return;
        if (status.state === "granted") {
          closeLocationModal();
          if (!didAutoLocateRef.current) {
            const hasCoords =
              coords ||
              (direccionPayload?.lat != null &&
                direccionPayload?.lng != null);
            if (!hasCoords) {
              didAutoLocateRef.current = true;
              requestLocationRef.current?.();
            }
          }
        } else {
          if (!didPromptLocationRef.current) {
            didPromptLocationRef.current = true;
            openLocationModal();
          }
        }
        status.onchange = () => {
          if (!active) return;
          if (status.state === "granted") {
            closeLocationModal();
            if (!didAutoLocateRef.current) {
              const hasCoords =
                coords ||
                (direccionPayload?.lat != null &&
                  direccionPayload?.lng != null);
              if (!hasCoords) {
                didAutoLocateRef.current = true;
                requestLocationRef.current?.();
              }
            }
          } else if (!didPromptLocationRef.current) {
            didPromptLocationRef.current = true;
            openLocationModal();
          }
        };
      } catch (error) {
        return;
      }
    };

    checkPermission();
    return () => {
      active = false;
    };
  }, [
    closeLocationModal,
    openLocationModal,
    stage,
    coords,
    direccionPayload?.lat,
    direccionPayload?.lng,
  ]);

  useEffect(() => {
    if (stage !== "map") {
      closeLocationModal();
      closeGpsModal();
    }
  }, [closeGpsModal, closeLocationModal, stage]);

  const startConfirmZoom = () => {
    if (animateZoom) return;
    if (zoomSequenceRef.current) {
      clearTimeout(zoomSequenceRef.current);
    }
    setAnimateZoom(true);
    const currentZoom = Number.isFinite(mapZoom) ? Math.floor(mapZoom) : FALLBACK_ZOOM;
    const startZoom = Math.min(currentZoom + 1, 18);
    const steps = [];
    for (let z = startZoom; z <= 18; z += 1) {
      steps.push(z);
    }
    if (steps.length == 0) {
      setAnimateZoom(false);
      return;
    }
    let index = 0;
    const tick = () => {
      const nextZoom = steps[index];
      programmaticZoomRef.current = true;
      setMapZoom(nextZoom);
      index += 1;
      if (index >= steps.length) {
        zoomSequenceRef.current = null;
        setTimeout(() => {
          setAnimateZoom(false);
        }, 250);
        return;
      }
      zoomSequenceRef.current = setTimeout(tick, 220);
    };
    tick();
  };

  const handleConfirm = async () => {
    setLocalError("");
    setReverseError("");
    const center = displayCoords || mapCenter;
    if (!center) {
      setLocalError("Selecciona una ubicación válida.");
      return;
    }

    if (!isOffFallback) {
      setLocalError("Selecciona una ubicación válida.");
      return;
    }

    if (mapZoom < 16) {
      setShowZoomHint(true);
      startConfirmZoom();
      return;
    }

    setIsReverseLoading(true);
    const result = await reverseGeocode(center.lat, center.lng);
    setIsReverseLoading(false);
    if (!result.ok) {
      setReverseError("No se pudo obtener la dirección.");
      return;
    }
    const data = result.data || {};
    const fields = data.display_fields || {};
    const displayLabel = formatDisplayParts(data);
    const rawLabel = data.raw_label || data.label || "";
    setAddressLabel(displayLabel);
    updateDireccionPayload({
      place_id: data.id || "",
      label: rawLabel,
      display_label: displayLabel,
      provider: data.provider || "",
      lat: center.lat,
      lng: center.lng,
      parroquia_id: data.parroquia_id || "",
      parroquia: fields.parroquia ?? data.parroquia ?? "",
      ciudad: fields.ciudad ?? data.ciudad ?? "",
      sector: fields.sector ?? data.sector ?? "",
      calles: fields.calles ?? data.calles ?? "",
      house_number: fields.house_number ?? data.house_number ?? "",
      postcode: fields.postcode ?? data.postcode ?? "",
      provincia_id: data.provincia_id || provinciaId,
      canton_id: data.canton_id || cantonId,
      provincia: fields.provincia ?? data.provincia ?? "",
      canton: fields.canton ?? data.canton ?? "",
      country: fields.country ?? data.country ?? "",
    });
    setStage("summary");
  };

  const resetDireccionPayload = (overrides = {}) => {
    updateDireccionPayload({
      place_id: "",
      label: "",
      display_label: "",
      provider: "",
      lat: null,
      lng: null,
      parroquia_id: "",
      parroquia: "",
      ciudad: "",
      sector: "",
      calles: "",
      house_number: "",
      postcode: "",
      provincia: "",
      canton: "",
      country: "",
      provincia_id: overrides.provincia_id ?? provinciaId ?? "",
      canton_id: overrides.canton_id ?? cantonId ?? "",
    });
  };

  const handleSelectSuggestion = (item) => {
    setSelectedSearchItem(item);
  };

  const applySearchSelection = (item) => {
    const fields = item.display_fields || {};
    const displayLabel = formatDisplayParts(item);
    const rawLabel = item.raw_label || item.label || "";
    setSearchValue(displayLabel);
    setSearchResults([]);
    setSearchError("");
    setHasSearched(false);
    setIsSearchModeOpen(false);
    if (item.lat && item.lng) {
      programmaticMoveRef.current = true;
      setCoords({
        lat: Number(item.lat),
        lng: Number(item.lng),
      });
      setCoordsSource("search");
      programmaticZoomRef.current = true;
      setMapZoom(CLOSE_ZOOM);
    }
    updateDireccionPayload({
      place_id: item.id,
      label: rawLabel,
      display_label: displayLabel,
      provider: item.provider || "",
      lat: item.lat ?? null,
      lng: item.lng ?? null,
      provincia_id: item.provincia_id || provinciaId || "",
      canton_id: item.canton_id || cantonId || "",
      parroquia_id: item.parroquia_id || "",
      parroquia: fields.parroquia ?? item.parroquia ?? "",
      ciudad: fields.ciudad ?? item.ciudad ?? "",
      sector: fields.sector ?? item.sector ?? "",
      calles: fields.calles ?? item.calles ?? item.street ?? "",
      house_number: fields.house_number ?? item.house_number ?? "",
      postcode: fields.postcode ?? item.postcode ?? "",
      provincia: fields.provincia ?? item.provincia ?? "",
      canton: fields.canton ?? item.canton ?? "",
      country: fields.country ?? item.country ?? "",
    });
  };

  useEffect(() => {
    let active = true;
    const loadCantones = async () => {
      if (!provinciaId) return;
      const result = await fetchCantonesByProvincia(provinciaId);
      if (!active) return;
      if (!result.ok) {
        setTerritoryError(result.error || "No se pudo cargar cantones");
        return;
      }
      const cantonById = {};
      (result.data || []).forEach((canton) => {
        cantonById[canton.id] = canton;
      });
      setTerritory((prev) => ({
        ...prev,
        cantonesByProvincia: {
          ...prev.cantonesByProvincia,
          [provinciaId]: result.data || [],
        },
        cantonById: {
          ...prev.cantonById,
          ...cantonById,
        },
      }));
    };

    loadCantones();
    return () => {
      active = false;
    };
  }, [provinciaId]);

  useEffect(() => {
    let active = true;
    const loadParroquias = async () => {
      if (!cantonId) return;
      const result = await fetchParroquiasByCanton(cantonId);
      if (!active) return;
      if (!result.ok) {
        setTerritoryError(result.error || "No se pudo cargar parroquias");
        return;
      }
      const parroquiaById = {};
      (result.data || []).forEach((parroquia) => {
        parroquiaById[parroquia.id] = parroquia;
      });
      setTerritory((prev) => ({
        ...prev,
        parroquiasByCanton: {
          ...prev.parroquiasByCanton,
          [cantonId]: result.data || [],
        },
        parroquiaById: {
          ...prev.parroquiaById,
          ...parroquiaById,
        },
      }));
    };

    loadParroquias();
    return () => {
      active = false;
    };
  }, [cantonId]);

  const provinciaOptions = territory.provincias;
  const cantonOptions = useMemo(
    () => territory.cantonesByProvincia[provinciaId] || [],
    [territory.cantonesByProvincia, provinciaId]
  );
  const parroquiaOptions = useMemo(
    () => territory.parroquiasByCanton[cantonId] || [],
    [territory.parroquiasByCanton, cantonId]
  );

  const provinciaNombre = territory.provinciaById[provinciaId]?.nombre || "";
  const cantonNombre = territory.cantonById[cantonId]?.nombre || "";
  const parroquiaNombre = territory.parroquiaById[parroquiaId]?.nombre || "";
  const payloadProvincia = direccionPayload?.provincia || provinciaNombre || "";
  const payloadCanton = direccionPayload?.canton || cantonNombre || "";
  const payloadParroquia = direccionPayload?.parroquia || parroquiaNombre || "";
  const payloadCiudad =
    direccionPayload?.ciudad || payloadCanton || payloadParroquia || "";

  const isManualFallback = mapStatus === "error";
  const hasTerritorySelection = Boolean(
    provinciaId && cantonId && parroquiaId
  );
  const shouldRenderMap = true;
  const canSelectCanton = Boolean(provinciaId);
  const canSelectParroquia = Boolean(cantonId);
  const canSearch =
    searchValue.trim().length >= 4 &&
    !isSearching &&
    (!isManualFallback || hasTerritorySelection);
  const shouldShowSearch = !isManualFallback || hasTerritorySelection;
  const searchModeActive = isSearchModeOpen && shouldShowSearch;

  const displayCoords =
    coords ||
    (direccionPayload?.lat != null && direccionPayload?.lng != null
      ? { lat: Number(direccionPayload.lat), lng: Number(direccionPayload.lng) }
      : null);
  const mapCenter = displayCoords || DEFAULT_MAP_CENTER;
  const isOffFallback = Boolean(
    displayCoords &&
      (Math.abs(displayCoords.lat - DEFAULT_MAP_CENTER.lat) > 0.0002 ||
        Math.abs(displayCoords.lng - DEFAULT_MAP_CENTER.lng) > 0.0002)
  );
  const canConfirm = isOffFallback;



  const clearSearchState = () => {
    setSearchValue("");
    setSearchResults([]);
    setSearchError("");
    setHasSearched(false);
    setAddressLabel("");
    setReverseError("");
    setSelectedSearchItem(null);
    setCoords(null);
    setCoordsSource(null);
    setHasMapMoved(false);
    setHasMapZoomed(false);
    setIsSearchModeOpen(false);
    programmaticZoomRef.current = true;
    setMapZoom(FALLBACK_ZOOM);
  };

  const handleProvinciaChange = (value) => {
    setProvinciaId(value);
    setCantonId("");
    setParroquiaId("");
    clearSearchState();
    resetDireccionPayload({ provincia_id: value, canton_id: "" });
  };

  const handleCantonChange = (value) => {
    setCantonId(value);
    setParroquiaId("");
    clearSearchState();
    resetDireccionPayload({ provincia_id: provinciaId, canton_id: value });
  };

  const handleParroquiaChange = (value) => {
    setParroquiaId(value);
    clearSearchState();
  };

  const handleProvinciaClear = () => {
    setProvinciaId("");
    setCantonId("");
    setParroquiaId("");
    clearSearchState();
    resetDireccionPayload({ provincia_id: "", canton_id: "" });
  };

  const handleCantonClear = () => {
    setCantonId("");
    setParroquiaId("");
    clearSearchState();
    resetDireccionPayload({ provincia_id: provinciaId, canton_id: "" });
  };

  const handleParroquiaClear = () => {
    setParroquiaId("");
    clearSearchState();
  };

  const handleSearch = async () => {
    setLocalError("");
    const street = searchValue.trim();
    if (isManualFallback) {
      if (!provinciaId) {
        setSearchError("Selecciona una provincia");
        return;
      }
      if (!cantonId) {
        setSearchError("Selecciona un cantón");
        return;
      }
      if (!parroquiaId) {
        setSearchError("Selecciona una ciudad/sector");
        return;
      }
    }
    if (street.length < 4) {
      setSearchError("Ingresa la calle");
      return;
    }
    const queryParts = [street];
    if (isManualFallback) {
      queryParts.push(parroquiaNombre, cantonNombre, provinciaNombre);
    }
    queryParts.push("Ecuador");
    const query = queryParts.filter(Boolean).join(", ");

    updateDireccionPayload({
      place_id: "",
      label: "",
      display_label: "",
      provider: "",
      parroquia_id: "",
      parroquia: "",
      ciudad: "",
      sector: "",
      calles: "",
      house_number: "",
      postcode: "",
      provincia: "",
      canton: "",
      country: "",
      provincia_id: provinciaId,
      canton_id: cantonId,
    });
    setIsSearching(true);
    setHasSearched(true);
    setSearchError("");
    setSearchResults([]);
    setReverseError("");
    setSelectedSearchItem(null);
    setIsSearchModeOpen(true);

    const result = await searchAddresses(query, {
      limit: 6,
      country: "ec",
      language: "es",
    });

    if (!result.ok) {
      setSearchError("No se pudo buscar direcciones");
      setSearchResults([]);
    } else {
      let results = Array.isArray(result.results) ? result.results : [];
      if (coordsSource === "gps" && coords?.lat != null && coords?.lng != null) {
        results = sortByDistance(results, coords);
      }
      setSearchResults(results);
    }

    setIsSearching(false);
  };

  const handleConfirmSearch = () => {
    if (!selectedSearchItem) return;
    applySearchSelection(selectedSearchItem);
    setSelectedSearchItem(null);
  };

  const searchInput = (
    <div className="relative">
      <PinOutlineIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4" />
      <input
        className={`w-full border border-gray-200 pl-9 pr-12 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none ${
          searchValue.trim().length > 0
            ? "rounded-l-lg rounded-r-none"
            : "rounded-lg"
        }`}
        placeholder="Busca la direccion si no la encuentras..."
        value={searchValue}
        onFocus={() => setIsSearchModeOpen(true)}
        onChange={(event) => {
          const nextValue = event.target.value;
          setSearchValue(nextValue);
          setSearchResults([]);
          setSearchError("");
          setHasSearched(false);
          setSelectedSearchItem(null);
          setIsSearchModeOpen(true);
        }}
      />
      {searchValue.trim().length > 0 && (
        <button
          type="button"
          onClick={handleSearch}
          disabled={!canSearch}
          className="absolute right-0 top-0 h-full px-3 flex items-center justify-center border-l border-gray-200 bg-[#5E30A5] text-white disabled:opacity-40 rounded-r-lg"
          aria-label="Buscar direcci¢n"
        >
          <SearchTiltIcon className="h-4 w-4 -rotate-12 text-white" />
        </button>
      )}
    </div>
  );

  const searchResultsList = (
    <div className="-mx-3 flex-1 overflow-y-auto rounded-lg bg-white">
      {isSearching && (
        <div className="px-3 py-2 text-xs text-gray-500">Buscando...</div>
      )}
      {!isSearching && searchError && (
        <div className="px-3 py-2 text-xs text-red-500">{searchError}</div>
      )}
      {!isSearching &&
        !searchError &&
        hasSearched &&
        searchResults.length === 0 && (
          <div className="px-3 py-2 text-xs text-gray-500">
            Sin resultados
          </div>
        )}
      {!isSearching &&
        !searchError &&
        searchResults.map((item) => (
          <button
            key={item.id || item.label}
            type="button"
            onClick={() => handleSelectSuggestion(item)}
            className={`w-full text-left px-3 py-2 text-sm transition ${
              (selectedSearchItem?.id || selectedSearchItem?.label) ===
              (item.id || item.label)
                ? "bg-[#F1ECFF] text-[#2F1A55]"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {formatDisplayParts(item)}
          </button>
        ))}
    </div>
  );

  return (
    <section
      style={{ boxSizing: "border-box", position: "relative" }}
      className="h-full"
    >
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        {stage === "map" ? (
          <AddressStepSearch
            open={searchModeActive}
            onBack={() => setIsSearchModeOpen(false)}
            variant="inline"
            className="h-full"
            headerClassName="pt-3"
            contentClassName="flex flex-col gap-3 overflow-hidden px-0"
            childrenClassName="flex h-full flex-col"
            searchBar={
              <>
                <p className="text-sm text-gray-600 text-center">
                  {subtitle ||
                    "Ay?anos a conectar tu negocio con personas cerca de ti."}
                </p>
                <div className="mt-3 -mx-3">{searchInput}</div>
              </>
            }
            results={searchResultsList}
            footer={
              <div className="pb-4">
                <button
                  type="button"
                  onClick={handleConfirmSearch}
                  disabled={!selectedSearchItem}
                  className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Confirmar
                </button>
              </div>
            }
          >
            {!searchModeActive ? (
              <>
              <p className="text-sm text-gray-600 mt-3 mb-4 text-center">
                {subtitle ||
                  "Ay?anos a conectar tu negocio con personas cerca de ti."}
              </p>

              {(localError || reverseError || error) && (
                <ErrorBanner
                  message={localError || reverseError || error}
                  className="mb-3"
                />
              )}

              <div className="flex-1 flex flex-col gap-4">
                {shouldRenderMap ? (
                  <div className="-mx-5 relative border-y border-gray-200 overflow-hidden">
                    {showZoomHint && (
                      <div className="absolute left-0 right-0 top-1 z-[1001]">
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-xs text-emerald-600 shadow-sm">
                          <PinOutlineIcon className="h-6 w-6 text-emerald-500" />
                          Asegurate de senalar el punto correcto y pulsa confirmar.
                          <button
                            type="button"
                            onClick={() => setShowZoomHint(false)}
                            className="ml-auto text-emerald-400 hover:text-emerald-600"
                            aria-label="Cerrar aviso"
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    <LeafletMapPicker
                      center={mapCenter}
                      zoom={mapZoom}
                      onReady={() => setMapStatus("ready")}
                      onError={() => setMapStatus("error")}
                      onCenterChange={(nextCenter) => {
                        if (!initialMoveSkippedRef.current) {
                          initialMoveSkippedRef.current = true;
                          return;
                        }
                        if (programmaticMoveRef.current) {
                          programmaticMoveRef.current = false;
                          return;
                        }
                        setCoords(nextCenter);
                        setCoordsSource("manual");
                        const movedEnough =
                          Math.abs(nextCenter.lat - DEFAULT_MAP_CENTER.lat) >
                            0.0002 ||
                          Math.abs(nextCenter.lng - DEFAULT_MAP_CENTER.lng) >
                            0.0002;
                        if (movedEnough) {
                          setHasMapMoved(true);
                        }
                        updateDireccionPayload({
                          lat: nextCenter.lat,
                          lng: nextCenter.lng,
                        });
                      }}
                      onZoomChange={(nextZoom) => {
                        if (!initialZoomSkippedRef.current) {
                          initialZoomSkippedRef.current = true;
                          return;
                        }
                        if (programmaticZoomRef.current) {
                          programmaticZoomRef.current = false;
                          setMapZoom(nextZoom);
                          return;
                        }
                        setMapZoom(nextZoom);
                        if (Math.abs(nextZoom - FALLBACK_ZOOM) >= 1) {
                          setHasMapZoomed(true);
                        }
                      }}
                      className="min-h-[320px] h-[320px] w-full"
                      animateZoom={animateZoom}
                    />
                    <button
                      type="button"
                      onClick={() => requestLocationRef.current?.()}
                      className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-gray-700 z-[1000]"
                      aria-label="Reintentar ubicaci?"
                    >
                      <CompassIcon className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <div className="-mx-5 min-h-[320px] h-[320px] w-full border-y border-gray-200 flex items-center justify-center text-xs text-gray-400">
                    Cargando mapa...
                  </div>
                )}
                {isManualFallback && (
                  <div className="space-y-3">
                    <SearchableSelect
                      label="Provincia"
                      placeholder={
                        isLoadingTerritory
                          ? "Cargando..."
                          : "Selecciona provincia"
                      }
                      value={provinciaId}
                      options={provinciaOptions}
                      disabled={isLoadingTerritory || Boolean(territoryError)}
                      onChange={handleProvinciaChange}
                      onClear={handleProvinciaClear}
                    />

                    <SearchableSelect
                      label="Cant?"
                      placeholder="Selecciona cant?"
                      value={cantonId}
                      options={cantonOptions}
                      disabled={!canSelectCanton}
                      onChange={handleCantonChange}
                      onClear={handleCantonClear}
                    />

                    <SearchableSelect
                      label="Ciudad/sector"
                      placeholder="Selecciona ciudad/sector"
                      value={parroquiaId}
                      options={parroquiaOptions}
                      disabled={!canSelectParroquia}
                      onChange={handleParroquiaChange}
                      onClear={handleParroquiaClear}
                    />

                    {territoryError && (
                      <div className="text-xs text-red-500 ml-1">
                        {territoryError}
                      </div>
                    )}
                  </div>
                )}

                {!searchModeActive && shouldShowSearch && (
                  <div className="-mx-3">{searchInput}</div>
                )}
              </div>

              <div className="mt-auto pt-4">
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!canConfirm || isReverseLoading}
                  className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isReverseLoading ? "Confirmando..." : "Confirmar"}
                </button>
              </div>
              </>
            ) : null}
          </AddressStepSearch>
        ) : (
          <>
            {(localError || reverseError || error) && (
              <ErrorBanner message={localError || reverseError || error} className="mb-3" />
            )}

            <div className="flex-1 space-y-6 mt-3">
              <div className="space-y-2 text-sm text-gray-700">
                {payloadProvincia && (
                  <div>
                    <span className="text-gray-500">Provincia:</span> {payloadProvincia}
                  </div>
                )}
                {direccionPayload?.ciudad && (
                  <div>
                    <span className="text-gray-500">Ciudad:</span> {direccionPayload.ciudad}
                  </div>
                )}
                {direccionPayload?.sector && (
                  <div>
                    <span className="text-gray-500">Sector:</span> {direccionPayload.sector}
                  </div>
                )}
                {direccionPayload?.calles && (
                  <div>
                    <span className="text-gray-500">Calle:</span> {direccionPayload.calles}
                  </div>
                )}
                {direccionPayload?.house_number && (
                  <div>
                    <span className="text-gray-500">Numero:</span> {direccionPayload.house_number}
                  </div>
                )}
                {direccionPayload?.postcode && (
                  <div>
                    <span className="text-gray-500">Codigo postal:</span> {direccionPayload.postcode}
                  </div>
                )}
                {payloadCanton && (
                  <div>
                    <span className="text-gray-500">Canton:</span> {payloadCanton}
                  </div>
                )}
                {payloadParroquia && (
                  <div>
                    <span className="text-gray-500">Parroquia:</span> {payloadParroquia}
                  </div>
                )}
                {direccionPayload?.country && (
                  <div>
                    <span className="text-gray-500">Pais:</span> {direccionPayload.country}
                  </div>
                )}
              </div>
              {displayCoords ? (
                <div className="text-xs text-gray-500 ml-1">
                  {`Lat: ${displayCoords.lat.toFixed(6)} | Lng: ${displayCoords.lng.toFixed(6)}`}
                </div>
              ) : null}

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={Boolean(isSucursalPrincipal)}
                  onChange={(event) =>
                    onChangeSucursalPrincipal?.(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#5E30A5]"
                />
                Este es mi sucursal principal
              </label>
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={onSubmit}
                className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow"
              >
                Entrar
              </button>
            </div>
          </>
        )}
      </div>

    </section>
  );
}

function formatDisplayParts(item) {
  const parts = Array.isArray(item?.display_parts) ? item.display_parts : [];
  const filtered = parts.filter((value) => value);
  if (filtered.length > 0) return filtered.join(", ");
  const fields = item?.display_fields || {};
  const fallback = [
    fields.provincia,
    fields.ciudad,
    fields.sector,
    fields.calles,
    fields.postcode,
    fields.house_number,
    fields.canton,
    fields.parroquia,
    fields.country,
  ].filter((value) => value);
  if (fallback.length > 0) return fallback.join(", ");
  return String(item?.label || "");
}


function haversineDistance(a, b) {
  const toRad = (value) => (Number(value) * Math.PI) / 180;
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLat = lat2 - lat1;
  const dLng = toRad(b.lng) - toRad(a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat +
    Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(h)));
}

function sortByDistance(results, origin) {
  return [...results].sort((a, b) => {
    const aValid = Number.isFinite(Number(a?.lat)) &&
      Number.isFinite(Number(a?.lng));
    const bValid = Number.isFinite(Number(b?.lat)) &&
      Number.isFinite(Number(b?.lng));
    if (!aValid && !bValid) return 0;
    if (!aValid) return 1;
    if (!bValid) return -1;
    const distA = haversineDistance(origin, { lat: a.lat, lng: a.lng });
    const distB = haversineDistance(origin, { lat: b.lat, lng: b.lng });
    return distA - distB;
  });
}

function SearchableSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  onClear,
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const lastSelectedRef = useRef(null);

  const selected = useMemo(
    () => options.find((item) => item.id === value),
    [options, value]
  );

  useEffect(() => {
    setInputValue(selected?.nombre || "");
    if (selected) {
      lastSelectedRef.current = selected;
    }
  }, [selected?.nombre]);

  const filtered = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return options;
    return options.filter((item) =>
      item.nombre.toLowerCase().includes(query)
    );
  }, [inputValue, options]);

  const handleSelect = (item) => {
    lastSelectedRef.current = item;
    onChange?.(item.id);
    setInputValue(item.nombre);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setInputValue("");
    setIsOpen(false);
    lastSelectedRef.current = null;
    onClear?.();
    if (!isFocused) {
      inputRef.current?.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      setIsOpen(false);
      const fallback = selected || lastSelectedRef.current;
      if (!fallback) {
        setInputValue("");
      } else {
        setInputValue(fallback.nombre);
      }
    }, 120);
  };

  return (
    <div className="space-y-1">
      <label className="block text-xs text-gray-500 ml-1">{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
            if (!disabled) setIsOpen(true);
          }}
          onClick={() => {
            if (!disabled) setIsOpen(true);
          }}
          onChange={(event) => {
            setInputValue(event.target.value);
            if (!disabled) setIsOpen(true);
          }}
          onBlur={handleBlur}
          disabled={disabled}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-9 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
        />
        {inputValue && !disabled && (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={`Limpiar ${label}`}
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
        {isOpen && !disabled && (
          <div className="absolute left-0 right-0 top-full mt-2 z-30 rounded-lg border border-gray-200 bg-white shadow-lg max-h-44 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-xs text-gray-500">
                Sin resultados
              </div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleSelect(item);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item.nombre}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}

function PinOutlineIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SearchTiltIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function CompassIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}










