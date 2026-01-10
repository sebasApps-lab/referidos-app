import React, { useEffect, useMemo, useState } from "react";
import ErrorBanner from "../blocks/ErrorBanner";
import { searchAddresses } from "../../services/addressSearchClient";

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

    const loadTerritory = async () => {
      setIsLoadingTerritory(true);
      setTerritoryError("");
      try {
        const response = await fetch(
          "/inec/organizacion-territorial-ecuador-2025.csv"
        );
        if (!response.ok) {
          throw new Error("No se pudo cargar el catálogo territorial");
        }
        const text = await response.text();
        if (!active) return;
        const parsed = parseTerritoryCsv(text);
        setTerritory(parsed);
      } catch (err) {
        if (!active) return;
        setTerritoryError(
          err?.message || "No se pudo cargar provincias y ciudades"
        );
      } finally {
        if (active) setIsLoadingTerritory(false);
      }
    };

    loadTerritory();
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
    onChangeDireccionPayload?.({
      place_id: "",
      label: "",
      provider: "",
      lat: null,
      lng: null,
      provincia_id: overrides.provincia_id ?? provinciaId ?? "",
      canton_id: overrides.canton_id ?? cantonId ?? "",
      street: "",
      house_number: "",
      city: "",
      region: "",
      country: "",
      postcode: "",
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
    onChangeDireccionPayload?.({
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
  const parroquiaNombre =
    territory.parroquiaById[parroquiaId]?.nombre || "";

  const canSelectCanton = Boolean(provinciaId);
  const canSelectParroquia = Boolean(cantonId);
  const canSearch =
    canSelectParroquia &&
    searchValue.trim().length >= 4 &&
    !isSearching;

  const canConfirm = Boolean(
    String(direccionPayload?.place_id || "").trim() &&
      String(direccionPayload?.label || "").trim()
  );
  const displayCoords =
    coords ||
    (direccionPayload?.lat != null && direccionPayload?.lng != null
      ? { lat: Number(direccionPayload.lat), lng: Number(direccionPayload.lng) }
      : null);

  const handleProvinciaChange = (event) => {
    const value = event.target.value;
    setProvinciaId(value);
    setCantonId("");
    setParroquiaId("");
    setSearchValue("");
    setSearchResults([]);
    setSearchError("");
    setHasSearched(false);
    setAddressLabel("");
    setCoords(null);
    resetDireccionPayload({ provincia_id: value, canton_id: "" });
  };

  const handleCantonChange = (event) => {
    const value = event.target.value;
    setCantonId(value);
    setParroquiaId("");
    setSearchValue("");
    setSearchResults([]);
    setSearchError("");
    setHasSearched(false);
    setAddressLabel("");
    setCoords(null);
    resetDireccionPayload({ provincia_id: provinciaId, canton_id: value });
  };

  const handleParroquiaChange = (event) => {
    setParroquiaId(event.target.value);
    setSearchResults([]);
    setSearchError("");
    setHasSearched(false);
    setAddressLabel("");
    setCoords(null);
  };

  const handleSearch = async () => {
    setLocalError("");
    setCoords(null);
    setAddressLabel("");
    const street = searchValue.trim();
    if (!provinciaId) {
      setSearchError("Selecciona una provincia");
      return;
    }
    if (!cantonId) {
      setSearchError("Selecciona una ciudad");
      return;
    }
    if (street.length < 4) {
      setSearchError("Ingresa la calle");
      return;
    }
    const query = [
      street,
      parroquiaNombre,
      cantonNombre,
      provinciaNombre,
      "Ecuador",
    ]
      .filter(Boolean)
      .join(", ");

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
      style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }}
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
              {/* Mapa deshabilitado por ahora: se agregará con proveedor externo. */}
              {/*
              <div
                className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-gray-200"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(94,48,165,0.08), rgba(16,185,129,0.08)), linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
                    backgroundSize: "100% 100%, 38px 38px, 38px 38px",
                    backgroundPosition: `0 0, ${mapOffset.x}px ${mapOffset.y}px, ${mapOffset.x}px ${mapOffset.y}px`,
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <PinIcon className="h-8 w-8 text-[#5E30A5]" />
                </div>
              </div>
              */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-500 ml-1">
                    Provincia
                  </label>
                  <select
                    value={provinciaId}
                    onChange={handleProvinciaChange}
                    disabled={isLoadingTerritory || Boolean(territoryError)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">
                      {isLoadingTerritory ? "Cargando..." : "Selecciona provincia"}
                    </option>
                    {provinciaOptions.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs text-gray-500 ml-1">
                    Ciudad
                  </label>
                  <select
                    value={cantonId}
                    onChange={handleCantonChange}
                    disabled={!canSelectCanton}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Selecciona ciudad</option>
                    {cantonOptions.map((canton) => (
                      <option key={canton.id} value={canton.id}>
                        {canton.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs text-gray-500 ml-1">
                    Sector (opcional)
                  </label>
                  <select
                    value={parroquiaId}
                    onChange={handleParroquiaChange}
                    disabled={!canSelectParroquia}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Selecciona sector</option>
                    {parroquiaOptions.map((parroquia) => (
                      <option key={parroquia.id} value={parroquia.id}>
                        {parroquia.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {territoryError && (
                  <div className="text-xs text-red-500 ml-1">
                    {territoryError}
                  </div>
                )}
              </div>

              {canSelectParroquia && (
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
                  {`Lat: ${displayCoords.lat.toFixed(6)} • Lng: ${displayCoords.lng.toFixed(6)}`}
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

      {/* Modales de ubicación/GPS deshabilitados hasta integrar mapa. */}
    </section>
  );
}

function parseTerritoryCsv(text) {
  const rows = parseCsvRows(text);
  if (!rows.length) {
    return {
      provincias: [],
      cantonesByProvincia: {},
      parroquiasByCanton: {},
      provinciaById: {},
      cantonById: {},
      parroquiaById: {},
    };
  }

  const header = rows[0].map((value) => value.trim().toLowerCase());
  const getIndex = (name) => header.indexOf(name);
  const idxProvId = getIndex("provincia_id");
  const idxProvName = getIndex("provincia_nombre");
  const idxCantonId = getIndex("canton_id");
  const idxCantonName = getIndex("canton_nombre");
  const idxParroquiaId = getIndex("parroquia_id");
  const idxParroquiaName = getIndex("parroquia_nombre");
  const idxParroquiaTipo = getIndex("parroquia_tipo");

  const provinciaById = {};
  const cantonById = {};
  const parroquiaById = {};
  const cantonesByProvincia = {};
  const parroquiasByCanton = {};
  const cantonSeen = new Set();
  const parroquiaSeen = new Set();

  rows.slice(1).forEach((row) => {
    const provinciaId = (row[idxProvId] || "").trim();
    const provinciaNombre = (row[idxProvName] || "").trim();
    const cantonId = (row[idxCantonId] || "").trim();
    const cantonNombre = (row[idxCantonName] || "").trim();
    const parroquiaId = (row[idxParroquiaId] || "").trim();
    const parroquiaNombre = (row[idxParroquiaName] || "").trim();
    const parroquiaTipo = (row[idxParroquiaTipo] || "").trim();

    if (provinciaId && provinciaNombre) {
      provinciaById[provinciaId] = {
        id: provinciaId,
        nombre: provinciaNombre,
      };
    }

    if (provinciaId && cantonId && cantonNombre && !cantonSeen.has(cantonId)) {
      cantonSeen.add(cantonId);
      cantonById[cantonId] = {
        id: cantonId,
        provincia_id: provinciaId,
        nombre: cantonNombre,
      };
      if (!cantonesByProvincia[provinciaId]) {
        cantonesByProvincia[provinciaId] = [];
      }
      cantonesByProvincia[provinciaId].push(cantonById[cantonId]);
    }

    if (cantonId && parroquiaId && parroquiaNombre && !parroquiaSeen.has(parroquiaId)) {
      parroquiaSeen.add(parroquiaId);
      parroquiaById[parroquiaId] = {
        id: parroquiaId,
        canton_id: cantonId,
        provincia_id: provinciaId,
        nombre: parroquiaNombre,
        tipo: parroquiaTipo,
      };
      if (!parroquiasByCanton[cantonId]) {
        parroquiasByCanton[cantonId] = [];
      }
      parroquiasByCanton[cantonId].push(parroquiaById[parroquiaId]);
    }
  });

  const provincias = Object.values(provinciaById).sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es")
  );

  Object.keys(cantonesByProvincia).forEach((provId) => {
    cantonesByProvincia[provId].sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es")
    );
  });

  Object.keys(parroquiasByCanton).forEach((cantonId) => {
    parroquiasByCanton[cantonId].sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es")
    );
  });

  return {
    provincias,
    cantonesByProvincia,
    parroquiasByCanton,
    provinciaById,
    cantonById,
    parroquiaById,
  };
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === "\"") {
      const nextChar = text[i + 1];
      if (inQuotes && nextChar === "\"") {
        value += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && text[i + 1] === "\n") {
        i += 1;
      }
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(value);
      value = "";
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  return rows.filter((line) => line.some((cell) => String(cell).trim() !== ""));
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
