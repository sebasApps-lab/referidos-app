import React, { useEffect, useState } from "react";
import ErrorBanner from "../blocks/ErrorBanner";
import { searchAddresses } from "../../services/addressSearchClient";

const LOCATION_ERROR = {
  denied: "No diste permiso de ubicación.",
  unavailable: "El GPS no está activado.",
  timeout: "No se pudo obtener tu ubicación.",
};

export default function BusinessAddressStep({
  innerRef,
  isSucursalPrincipal,
  onChangeSucursalPrincipal,
  subtitle,
  error,
  onSubmit,
}) {
  const [stage, setStage] = useState("map");
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [addressLabel, setAddressLabel] = useState("");
  const [coords, setCoords] = useState(null);
  const [localError, setLocalError] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showGpsModal, setShowGpsModal] = useState(false);
  const [requestingLocation, setRequestingLocation] = useState(false);

  useEffect(() => {
    if (!navigator?.geolocation) return;
    if (!navigator.permissions?.query) {
      setShowLocationModal(true);
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (status.state !== "granted") {
          setShowLocationModal(true);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => {
            if (err.code === err.POSITION_UNAVAILABLE) {
              setShowGpsModal(true);
            }
          },
          { enableHighAccuracy: true, timeout: 8000 }
        );
      })
      .catch(() => {
        setShowLocationModal(true);
      });
  }, []);

  useEffect(() => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      setSuggestions([]);
      setSearchError("");
      setIsSearching(false);
      return;
    }

    if (
      selectedSuggestion &&
      trimmed.toLowerCase() === String(selectedSuggestion.label || "").toLowerCase()
    ) {
      setSuggestions([]);
      setSearchError("");
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const result = await searchAddresses(trimmed, {
        limit: 6,
        country: "ec",
        language: "es",
      });
      if (!result.ok) {
        setSearchError("No se pudo buscar direcciones");
        setSuggestions([]);
      } else {
        const results = Array.isArray(result.results) ? result.results : [];
        setSearchError("");
        setSuggestions(results);
      }
      setIsSearching(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchValue, selectedSuggestion]);

  const requestLocation = () => {
    if (!navigator?.geolocation) {
      setLocalError("Tu navegador no soporta ubicación.");
      return;
    }
    setRequestingLocation(true);
    setLocalError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setShowLocationModal(false);
        setShowGpsModal(false);
        setRequestingLocation(false);
      },
      (err) => {
        setRequestingLocation(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocalError(LOCATION_ERROR.denied);
          setShowLocationModal(true);
          return;
        }
        if (err.code === err.POSITION_UNAVAILABLE) {
          setShowGpsModal(true);
          return;
        }
        setLocalError(LOCATION_ERROR.timeout);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirm = () => {
    setLocalError("");
    if (selectedSuggestion) {
      setAddressLabel(selectedSuggestion.label || "");
      if (selectedSuggestion.lat && selectedSuggestion.lng) {
        setCoords({
          lat: Number(selectedSuggestion.lat),
          lng: Number(selectedSuggestion.lng),
        });
      }
      setStage("summary");
      return;
    }

    const trimmed = searchValue.trim();
    const label = trimmed || (coords ? "Ubicación actual" : "");
    if (!label) {
      setLocalError("Ingresa una dirección o activa tu ubicación.");
      return;
    }
    setAddressLabel(label);
    setStage("summary");
  };

  const handleSelectSuggestion = (item) => {
    setSelectedSuggestion(item);
    setSearchValue(item.label || "");
    setSuggestions([]);
    setSearchError("");
    if (item.lat && item.lng) {
      setCoords({
        lat: Number(item.lat),
        lng: Number(item.lng),
      });
    }
  };

  const hasQuery = searchValue.trim().length >= 3;

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

              <div className="space-y-2">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    className="w-full border border-gray-200 rounded-lg px-9 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none"
                    placeholder="Buscar dirección"
                    value={searchValue}
                    onChange={(event) => {
                      setSearchValue(event.target.value);
                      setSelectedSuggestion(null);
                    }}
                  />
                  {(hasQuery || isSearching || searchError) && (
                    <div className="absolute left-0 right-0 top-full mt-2 z-20 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
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
                      {!isSearching && !searchError && suggestions.length === 0 && (
                        <div className="px-3 py-2 text-xs text-gray-500">
                          Sin resultados
                        </div>
                      )}
                      {!isSearching &&
                        !searchError &&
                        suggestions.map((item) => (
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
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow"
                >
                  Confirmar
                </button>
              </div>
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
                  {addressLabel || "Sin dirección"}
                </div>
              </div>

              {coords ? (
                <div className="text-xs text-gray-500 ml-1">
                  {`Lat: ${coords.lat.toFixed(6)} • Lng: ${coords.lng.toFixed(6)}`}
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

      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-[2px]">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-[#0F172A] text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E8FF] text-[#5E30A5]">
              <LocationOffIcon className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold">Activa tu ubicación</h3>
            <p className="text-sm text-gray-600 mt-2">
              Necesitamos tu ubicación para ubicar tu negocio en el mapa.
            </p>
            <button
              type="button"
              onClick={requestLocation}
              disabled={requestingLocation}
              className="mt-5 w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60"
            >
              {requestingLocation ? "Activando..." : "Activar ubicación"}
            </button>
          </div>
        </div>
      )}

      {showGpsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-[2px]">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-[#0F172A] text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2] text-[#B91C1C]">
              <GpsOffIcon className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold">El GPS no está activado</h3>
            <p className="text-sm text-gray-600 mt-2">
              Enciende el GPS e intenta nuevamente para continuar.
            </p>
            <button
              type="button"
              onClick={() => setShowGpsModal(false)}
              className="mt-5 w-full border border-gray-300 text-gray-600 font-semibold py-2.5 rounded-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
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

function LocationOffIcon({ className = "" }) {
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
      <path d="M12 6a3 3 0 0 1 3 3" />
      <path d="M12 2a7 7 0 0 1 7 7c0 4.5-5 11-7 13-2-2-7-8.5-7-13a7 7 0 0 1 7-7" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

function GpsOffIcon({ className = "" }) {
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
      <path d="M12 4l0 3" />
      <path d="M12 17l0 3" />
      <path d="M4 12l3 0" />
      <path d="M17 12l3 0" />
      <path d="M12 8a4 4 0 1 1-4 4" />
      <path d="M4 4l16 16" />
    </svg>
  );
}
