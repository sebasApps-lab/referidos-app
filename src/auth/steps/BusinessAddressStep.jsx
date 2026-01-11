import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ErrorBanner from "../blocks/ErrorBanner";
import { searchAddresses } from "../../services/addressSearchClient";
import {
  fetchProvincias,
  fetchCantonesByProvincia,
  fetchParroquiasByCanton,
} from "../../services/territoryClient";
import LeafletMapPicker from "../../components/maps/LeafletMapPicker";
import { useModal } from "../../modals/useModal";

const DEFAULT_MAP_CENTER = { lat: -0.1806532, lng: -78.4678382 };



export default function BusinessAddressStep({
  innerRef,
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
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [addressLabel, setAddressLabel] = useState("");
  const [coords, setCoords] = useState(null);
  const [localError, setLocalError] = useState("");
  const [mapStatus, setMapStatus] = useState("loading");
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const { openModal, closeModal, activeModal } = useModal();
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
      provider: "",
      lat: null,
      lng: null,
      provincia_id: "",
      canton_id: "",
      street: "",
      house_number: "",
      city: "",
      region: "",
      country: "",
      postcode: "",
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

  const openLocationModal = useCallback(() => {
    openModal("LocationPermission", {
      onConfirm: () => requestLocationRef.current?.(),
    });
  }, [openModal]);

  const openGpsModal = useCallback(() => {
    openModal("GpsDisabled");
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
    closeModal();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(nextCenter);
        updateDireccionPayloadRef.current?.({
          lat: nextCenter.lat,
          lng: nextCenter.lng,
        });
        setIsRequestingLocation(false);
      },
      (error) => {
        setIsRequestingLocation(false);
        if (error?.code === 1) {
          openLocationModal();
          return;
        }
        if (error?.code === 2) {
          openGpsModal();
          return;
        }
        openLocationModal();
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
        if (!didPromptLocationRef.current) {
          didPromptLocationRef.current = true;
          openLocationModal();
        }
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
          }
        };
      } catch (error) {
        if (!didPromptLocationRef.current) {
          didPromptLocationRef.current = true;
          openLocationModal();
        }
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

  const handleConfirm = () => {
    setLocalError("");
    const placeId = String(direccionPayload?.place_id || "").trim();
    const label = String(direccionPayload?.label || "").trim();
    if (!placeId || !label) {
      setLocalError("Selecciona una dirección de la lista.");
      return;
    }
    setAddressLabel(label);
    setStage("summary");
  };

  const resetDireccionPayload = (overrides = {}) => {
    updateDireccionPayload({
      place_id: "",
      label: "",
      provider: "",
      lat: null,
      lng: null,
      street: "",
      house_number: "",
      city: "",
      region: "",
      country: "",
      postcode: "",
      provincia_id: overrides.provincia_id ?? provinciaId ?? "",
      canton_id: overrides.canton_id ?? cantonId ?? "",
    });
  };

  const handleSelectSuggestion = (item) => {
    setSearchValue(item.label || "");
    setSearchResults([]);
    setSearchError("");
    if (item.lat && item.lng) {
      setCoords({
        lat: Number(item.lat),
        lng: Number(item.lng),
      });
    }
    updateDireccionPayload({
      place_id: item.id,
      label: item.label || "",
      provider: item.provider || "",
      lat: item.lat ?? null,
      lng: item.lng ?? null,
      provincia_id: provinciaId || "",
      canton_id: cantonId || "",
      street: item.street || "",
      house_number: item.house_number || "",
      city: item.city || "",
      region: item.region || "",
      country: item.country || "",
      postcode: item.postcode || "",
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

  const canConfirm = Boolean(
    String(direccionPayload?.place_id || "").trim() &&
      String(direccionPayload?.label || "").trim()
  );
  const displayCoords =
    coords ||
    (direccionPayload?.lat != null && direccionPayload?.lng != null
      ? { lat: Number(direccionPayload.lat), lng: Number(direccionPayload.lng) }
      : null);
  const mapCenter = displayCoords || DEFAULT_MAP_CENTER;



  const clearSearchState = () => {
    setSearchValue("");
    setSearchResults([]);
    setSearchError("");
    setHasSearched(false);
    setAddressLabel("");
    setCoords(null);
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
    setCoords(null);
    setAddressLabel("");
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

    resetDireccionPayload({ provincia_id: provinciaId, canton_id: cantonId });
    setIsSearching(true);
    setHasSearched(true);
    setSearchError("");
    setSearchResults([]);

    const result = await searchAddresses(query, {
      limit: 6,
      country: "ec",
      language: "es",
    });

    if (!result.ok) {
      setSearchError("No se pudo buscar direcciones");
      setSearchResults([]);
    } else {
      const results = Array.isArray(result.results) ? result.results : [];
      setSearchResults(results);
    }

    setIsSearching(false);
  };

  return (
    <section
      style={{ boxSizing: "border-box", position: "relative" }}
      className="px-2 h-full"
    >
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        {stage === "map" ? (
          <>
            <p className="text-sm text-gray-600 mt-3 mb-4 text-center">
              {subtitle || "Ayúdanos a conectar tu negocio con personas cerca de ti."}
            </p>

            {(localError || error) && (
              <ErrorBanner message={localError || error} className="mb-3" />
            )}

            <div className="flex-1 flex flex-col gap-4">
              {shouldRenderMap ? (
                <LeafletMapPicker
                  center={mapCenter}
                  onReady={() => setMapStatus("ready")}
                  onError={() => setMapStatus("error")}
                  onCenterChange={(nextCenter) => {
                    setCoords(nextCenter);
                    updateDireccionPayload({
                      lat: nextCenter.lat,
                      lng: nextCenter.lng,
                    });
                  }}
                  className="min-h-[260px] h-[260px] w-full rounded-2xl overflow-hidden border border-gray-200"
                />
              ) : (
                <div className="min-h-[260px] h-[260px] w-full rounded-2xl border border-gray-200 flex items-center justify-center text-xs text-gray-400">
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
                    label="Cantón"
                    placeholder="Selecciona cantón"
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

              {shouldShowSearch && (
                <div className="space-y-2">
                  <label className="block text-xs text-gray-500 ml-1">
                    Calle
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      className="w-full border border-gray-200 rounded-lg px-9 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none"
                      placeholder="Escribe la calle"
                      value={searchValue}
                      onChange={(event) => {
                        setSearchValue(event.target.value);
                        setSearchResults([]);
                        setSearchError("");
                        setHasSearched(false);
                        setCoords(null);
                        setAddressLabel("");
                        resetDireccionPayload({
                          provincia_id: provinciaId,
                          canton_id: cantonId,
                        });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={!canSearch}
                    className="w-full border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSearching ? "Buscando..." : "Buscar"}
                  </button>
                  {(isSearching || searchError || hasSearched) && (
                    <div className="border border-gray-200 rounded-lg max-h-44 overflow-y-auto bg-white">
                      {isSearching && (
                        <div className="px-3 py-2 text-xs text-gray-500">
                          Buscando...
                        </div>
                      )}
                      {!isSearching && searchError && (
                        <div className="px-3 py-2 text-xs text-red-500">
                          {searchError}
                        </div>
                      )}
                      {!isSearching &&
                        !searchError &&
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
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {item.label}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-auto pt-4">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!canConfirm}
                className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
            </div>
          </>
        ) : (
          <>
            {(localError || error) && (
              <ErrorBanner message={localError || error} className="mb-3" />
            )}

            <div className="flex-1 space-y-6 mt-3">
              <div className="space-y-1">
                <label className="block text-xs text-gray-500 ml-1">
                  Dirección confirmada
                </label>
                <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900">
                  {addressLabel ||
                    direccionPayload?.label ||
                    "Sin dirección"}
                </div>
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

function SearchIcon({ className = "" }) {
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










