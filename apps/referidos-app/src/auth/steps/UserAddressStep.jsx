import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ErrorBanner from "../blocks/ErrorBanner";
import { searchAddresses } from "../../services/addressSearchClient";
import { reverseGeocode } from "../../services/addressReverseClient";
import { getGpsFallbackLocation } from "../../services/gpsFallbackClient";
import {
  fetchProvincias,
  fetchCantonesByProvincia,
  fetchParroquiasByCanton,
} from "../../services/territoryClient";
import LeafletMapPicker from "../../components/maps/LeafletMapPicker";
import AddressStepSearch from "../../search/auth/AddressStepSearch";
import { toTitleCaseEs } from "../../utils/textCase";
import useLocationStep from "../hooks/useLocationStep";
import { useModal } from "../../modals/useModal";

// Lint purge (no-unused-vars): se purgaron lecturas de `addressLabel`, `hasMapMoved` y `hasMapZoomed` (estado de flujo del mapa).
const DEFAULT_MAP_CENTER = { lat: -0.2200934426615961, lng: -78.51208009501421 };
const FALLBACK_ZOOM = 11;
const CLOSE_ZOOM = 16;
const DEFAULT_HORARIOS = {
  semanal: {
    lunes: [{ abre: "10:00", cierra: "18:00" }],
    martes: [{ abre: "10:00", cierra: "18:00" }],
    miercoles: [{ abre: "10:00", cierra: "18:00" }],
    jueves: [{ abre: "10:00", cierra: "18:00" }],
    viernes: [{ abre: "10:00", cierra: "18:00" }],
    sabado: [],
    domingo: [],
  },
  excepciones: [],
};
const WEEK_DAYS = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miercoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
  { key: "sabado", label: "Sabado" },
  { key: "domingo", label: "Domingo" },
];
const WEEKDAY_KEYS = ["lunes", "martes", "miercoles", "jueves", "viernes"];
const WEEKEND_KEYS = ["sabado", "domingo"];
const CLIENT_ADDRESS_TAGS = ["Casa", "Oficina", "Trabajo"];
const CLIENT_ADDRESS_OTHER = "Otro";
const CLIENT_ADDRESS_CUSTOM_KEY = "custom";
const CLIENT_ADDRESS_TAG_KEY = "client_address_label";
const CLIENT_ADDRESS_TAG_DRAFT_KEY = "client_address_label_draft";
const CLIENT_ADDRESS_MIN_LENGTH = 3;
const CLIENT_ADDRESS_MAX_DIGITS = 2;



export default function UserAddressStep({
  innerRef,
  searchModeOpen,
  onSearchModeChange,
  isAddressPrefillReady,
  isSucursalPrincipal,
  onChangeSucursalPrincipal,
  horarios,
  onChangeHorarios,
  direccionPayload,
  onChangeDireccionPayload,
  subtitle,
  error,
  onSubmit,
  mode = "negocio",
  requireHorarios,
  onSkip,
  primaryLabel = "Entrar",
}) {
  const isBusiness = mode === "negocio";
  const shouldRequireHorarios =
    typeof requireHorarios === "boolean" ? requireHorarios : isBusiness;
  const [stage, setStage] = useState("pending");
  const [searchValue, setSearchValue] = useState("");
  const isSearchModeOpen = Boolean(searchModeOpen);
  const setIsSearchModeOpen = useCallback((next) => {
    onSearchModeChange?.(next);
  }, [onSearchModeChange]);
  const [selectedSearchItem, setSelectedSearchItem] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [, setAddressLabel] = useState("");
  const [reverseError, setReverseError] = useState("");
  const [isReverseLoading, setIsReverseLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [coordsSource, setCoordsSource] = useState(null);
  const [localError, setLocalError] = useState("");
  const [mapStatus, setMapStatus] = useState("loading");
  const [mapZoom, setMapZoom] = useState(FALLBACK_ZOOM);
  const [animateZoom, setAnimateZoom] = useState(false);
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
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
  const [, setHasMapMoved] = useState(false);
  const [, setHasMapZoomed] = useState(false);
  const [addressTag, setAddressTag] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [customTagInput, setCustomTagInput] = useState("");
  const [isCustomEditing, setIsCustomEditing] = useState(false);
  const initialMoveSkippedRef = useRef(false);
  const initialZoomSkippedRef = useRef(false);
  const programmaticMoveRef = useRef(false);
  const programmaticZoomRef = useRef(false);
  const zoomSequenceRef = useRef(null);
  const addressTagInitRef = useRef(false);
  const customInputRef = useRef(null);
  const { openModal } = useModal();
  const weekdaysRef = useRef(null);
  const weekendRef = useRef(null);

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
      parroquia_id: "",
      parroquia: "",
      ciudad: "",
      sector: "",
      calles: "",
      house_number: "",
      postcode: "",
      referencia: "",
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

  useEffect(() => {
    if (isBusiness) return;
    if (addressTagInitRef.current) return;
    const storedLabel =
      typeof window !== "undefined"
        ? localStorage.getItem(CLIENT_ADDRESS_TAG_KEY) || ""
        : "";
    const storedDraft =
      typeof window !== "undefined"
        ? localStorage.getItem(CLIENT_ADDRESS_TAG_DRAFT_KEY) || ""
        : "";
    const payloadReference = String(direccionPayload?.referencia || "").trim();
    const initialLabel = (storedLabel || payloadReference || "").trim();
    if (initialLabel) {
      if (CLIENT_ADDRESS_TAGS.includes(initialLabel)) {
        setActiveTag(initialLabel);
        setAddressTag(initialLabel);
        setCustomTagInput("");
        setIsCustomEditing(false);
      } else {
        setActiveTag(CLIENT_ADDRESS_CUSTOM_KEY);
        setAddressTag(initialLabel);
        setCustomTagInput(storedDraft || initialLabel);
        setIsCustomEditing(false);
      }
    } else {
      setActiveTag("");
      setAddressTag("");
      setCustomTagInput(storedDraft || "");
      setIsCustomEditing(false);
    }
    addressTagInitRef.current = true;
  }, [direccionPayload?.referencia, isBusiness]);

  useEffect(() => {
    if (isBusiness) return;
    if (typeof window === "undefined") return;
    localStorage.setItem(CLIENT_ADDRESS_TAG_KEY, addressTag);
  }, [addressTag, isBusiness]);

  useEffect(() => {
    if (isBusiness) return;
    if (typeof window === "undefined") return;
    localStorage.setItem(CLIENT_ADDRESS_TAG_DRAFT_KEY, customTagInput);
  }, [customTagInput, isBusiness]);

  useEffect(() => {
    if (!isCustomEditing) return;
    const timer = setTimeout(() => {
      customInputRef.current?.focus?.();
    }, 0);
    return () => clearTimeout(timer);
  }, [isCustomEditing]);

  useEffect(() => {
    if (isBusiness) return;
    const currentRef = String(direccionPayload?.referencia || "");
    if (addressTag === currentRef) return;
    updateDireccionPayload({ referencia: addressTag });
  }, [addressTag, direccionPayload?.referencia, isBusiness, updateDireccionPayload]);

  useEffect(() => {
    return () => {
      if (zoomSequenceRef.current) {
        clearTimeout(zoomSequenceRef.current);
      }
    };
  }, []);
  const { requestLocation } = useLocationStep({
    stage,
    coords,
    direccionPayload,
    setCoords,
    setCoordsSource,
    setMapZoom,
    updateDireccionPayload,
    programmaticMoveRef,
    programmaticZoomRef,
    closeZoom: CLOSE_ZOOM,
    locationTitle: isBusiness ? "Ubicación del negocio" : "Ubicación",
  });

  const isPrefillReady = Boolean(isAddressPrefillReady);
  const hasSavedAddress =
    Boolean(direccionPayload?.place_id) &&
    Boolean(direccionPayload?.label) &&
    direccionPayload?.lat != null &&
    direccionPayload?.lng != null;

  useEffect(() => {
    if (!isPrefillReady) {
      if (stage !== "pending") {
        setStage("pending");
      }
      return;
    }
    if (hasSavedAddress && stage !== "summary") {
      setStage("summary");
    } else if (!hasSavedAddress && stage !== "map") {
      setStage("map");
    }
  }, [hasSavedAddress, isPrefillReady, stage]);

  useEffect(() => {
    let active = true;
    if (stage !== "map") {
      return undefined;
    }
    if (coordsSource === "gps" || coords) {
      return undefined;
    }

    const loadFallbackLocation = async () => {
      const result = await getGpsFallbackLocation();
      if (!active || !result?.ok || !result.location) return;
      const fallbackCoords = {
        lat: result.location.lat,
        lng: result.location.lng,
      };
      if (coords) return;
      programmaticMoveRef.current = true;
      setCoords(fallbackCoords);
      setCoordsSource("fallback");
    };

    loadFallbackLocation();
    return () => {
      active = false;
    };
  }, [coords, coordsSource, setCoords, setCoordsSource]);

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
      referencia: "",
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
      referencia: "",
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
      referencia: "",
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
  const payloadProvincia = toTitleCaseEs(
    direccionPayload?.provincia || provinciaNombre || ""
  );
  const payloadCanton = toTitleCaseEs(
    direccionPayload?.canton || cantonNombre || ""
  );
  const payloadParroquia = toTitleCaseEs(
    direccionPayload?.parroquia || parroquiaNombre || ""
  );
  const referenciaValue = String(direccionPayload?.referencia || "");
  const customTagDigits = countDigits(customTagInput);
  const customTagTrimmed = customTagInput.trim();
  const customTagValid =
    customTagTrimmed.length >= CLIENT_ADDRESS_MIN_LENGTH &&
    customTagDigits <= CLIENT_ADDRESS_MAX_DIGITS;
  const customBadgeLabel =
    addressTag && !CLIENT_ADDRESS_TAGS.includes(addressTag)
      ? addressTag
      : CLIENT_ADDRESS_OTHER;
  const badgeBase =
    "px-3 py-1.5 text-xs rounded-full border transition-colors";
  const currentHorarios =
    horarios && typeof horarios === "object" ? horarios : DEFAULT_HORARIOS;
  const hasAnyHorario = shouldRequireHorarios
    ? WEEK_DAYS.some(
      (day) => (currentHorarios?.semanal?.[day.key] || []).length > 0
    )
    : true;
  const handleSelectTag = useCallback(
    (tag) => {
      setActiveTag(tag);
      setAddressTag(tag);
      setIsCustomEditing(false);
    },
    []
  );
  const handleStartCustom = useCallback(() => {
    setActiveTag(CLIENT_ADDRESS_CUSTOM_KEY);
    setIsCustomEditing(true);
    if (!customTagInput && addressTag && !CLIENT_ADDRESS_TAGS.includes(addressTag)) {
      setCustomTagInput(addressTag);
    }
  }, [addressTag, customTagInput]);
  const handleCustomChange = useCallback((event) => {
    const next = event.target.value;
    if (countDigits(next) > CLIENT_ADDRESS_MAX_DIGITS) return;
    setCustomTagInput(next);
    setActiveTag(CLIENT_ADDRESS_CUSTOM_KEY);
    setAddressTag(next.trim());
  }, []);
  const handleCustomConfirm = useCallback(() => {
    const trimmed = customTagInput.trim();
    if (trimmed.length < CLIENT_ADDRESS_MIN_LENGTH) return;
    if (countDigits(trimmed) > CLIENT_ADDRESS_MAX_DIGITS) return;
    setAddressTag(trimmed);
    setCustomTagInput(trimmed);
    setActiveTag(CLIENT_ADDRESS_CUSTOM_KEY);
    setIsCustomEditing(false);
  }, [customTagInput]);

  const updateHorarios = useCallback(
    (nextValue) => {
      onChangeHorarios?.(nextValue);
    },
    [onChangeHorarios]
  );

  const handleToggleDay = useCallback(
    (dayKey) => {
      const next = {
        ...currentHorarios,
        semanal: { ...currentHorarios.semanal },
      };
      const entries = Array.isArray(next.semanal?.[dayKey])
        ? next.semanal[dayKey]
        : [];
      if (entries.length > 0) {
        next.semanal[dayKey] = [];
      } else {
        next.semanal[dayKey] = [{ abre: "10:00", cierra: "18:00" }];
      }
      updateHorarios(next);
    },
    [currentHorarios, updateHorarios]
  );

  const updateDayTime = useCallback(
    (dayKey, field, value) => {
      const next = {
        ...currentHorarios,
        semanal: { ...currentHorarios.semanal },
      };
      const existing = Array.isArray(next.semanal?.[dayKey])
        ? next.semanal[dayKey][0]
        : null;
      const base = existing || { abre: "10:00", cierra: "18:00" };
      next.semanal[dayKey] = [
        {
          ...base,
          [field]: value,
        },
      ];
      updateHorarios(next);
    },
    [currentHorarios, updateHorarios]
  );

  const getEntry = useCallback(
    (dayKey) => currentHorarios?.semanal?.[dayKey]?.[0] || null,
    [currentHorarios]
  );

  const getGroupInfo = useCallback(
    (keys) => {
      const entries = keys.map((key) => getEntry(key));
      const activeEntries = entries.filter(Boolean);
      const anySelected = activeEntries.length > 0;
      const allSelected = activeEntries.length === keys.length;
      let sameHours = false;
      if (allSelected && activeEntries.length > 0) {
        const base = activeEntries[0];
        sameHours = activeEntries.every(
          (entry) => entry.abre === base.abre && entry.cierra === base.cierra
        );
      }
      if (!anySelected) {
        return {
          anySelected: false,
          allSelected: false,
          partial: false,
          timeLabel: "--:-- - --:--",
          showPersonalizado: false,
          baseEntry: { abre: "10:00", cierra: "18:00" },
        };
      }
      if (allSelected && sameHours) {
        return {
          anySelected: true,
          allSelected: true,
          partial: false,
          timeLabel: `${activeEntries[0].abre} - ${activeEntries[0].cierra}`,
          showPersonalizado: false,
          baseEntry: activeEntries[0],
        };
      }
      return {
        anySelected: true,
        allSelected: false,
        partial: true,
        timeLabel: "Personalizado",
        showPersonalizado: true,
        baseEntry: activeEntries[0] || { abre: "10:00", cierra: "18:00" },
      };
    },
    [getEntry]
  );

  const toggleGroupSelection = useCallback(
    (groupKey) => {
      const keys = groupKey === "weekdays" ? WEEKDAY_KEYS : WEEKEND_KEYS;
      const info = getGroupInfo(keys);
      const next = {
        ...currentHorarios,
        semanal: { ...currentHorarios.semanal },
      };
      if (info.allSelected) {
        keys.forEach((key) => {
          next.semanal[key] = [];
        });
      } else {
        const base = info.baseEntry || { abre: "10:00", cierra: "18:00" };
        keys.forEach((key) => {
          next.semanal[key] = [{ ...base }];
        });
      }
      updateHorarios(next);
    },
    [currentHorarios, getGroupInfo, updateHorarios]
  );

  const updateGroupTime = useCallback(
    (groupKey, field, value) => {
      const keys = groupKey === "weekdays" ? WEEKDAY_KEYS : WEEKEND_KEYS;
      const info = getGroupInfo(keys);
      const base = info.baseEntry || { abre: "10:00", cierra: "18:00" };
      const next = {
        ...currentHorarios,
        semanal: { ...currentHorarios.semanal },
      };
      keys.forEach((key) => {
        next.semanal[key] = [
          {
            ...base,
            [field]: value,
          },
        ];
      });
      updateHorarios(next);
    },
    [currentHorarios, getGroupInfo, updateHorarios]
  );

  const openGroupPicker = useCallback(
    (groupKey, field, _currentLabel, showPersonalizado) => {
      const keys = groupKey === "weekdays" ? WEEKDAY_KEYS : WEEKEND_KEYS;
      const info = getGroupInfo(keys);
      openModal("TimePicker", {
        title: "Selecciona la hora",
        initialTime: info.baseEntry?.[field] || "10:00",
        helperText: showPersonalizado
          ? groupKey === "weekdays"
            ? "Modificaras el horario de todos los dias de Lunes a Viernes."
            : "Modificaras el horario de todos los dias de Fin de Semana."
          : undefined,
        onConfirm: (value) => updateGroupTime(groupKey, field, value),
      });
    },
    [getGroupInfo, openModal, updateGroupTime]
  );

  const openTimePicker = useCallback(
    (dayKey, field, currentValue) => {
      openModal("TimePicker", {
        title: "Selecciona la hora",
        initialTime: currentValue || "10:00",
        onConfirm: (value) => updateDayTime(dayKey, field, value),
      });
    },
    [openModal, updateDayTime]
  );
  const rawCiudad = String(direccionPayload?.ciudad || "");
  const summaryCiudad = toTitleCaseEs(
    (isBusiness
      ? rawCiudad || payloadCanton || payloadParroquia
      : rawCiudad || payloadParroquia || payloadCanton) || ""
  );
  const summaryCalle = direccionPayload?.calles
    ? `${toTitleCaseEs(direccionPayload.calles)}${
        direccionPayload?.house_number ? ` ${direccionPayload.house_number}` : ""
      }`.trim()
    : "";
  const hasProvincia = Boolean(payloadProvincia);
  const hasCiudad = Boolean(summaryCiudad);
  const hasCalle = Boolean(summaryCalle);
  const shouldShowCanton = isBusiness
    ? !hasCiudad && payloadCanton
    : (!hasProvincia || !hasCiudad) && payloadCanton;
  const shouldShowSector = isBusiness
    ? Boolean(direccionPayload?.sector)
    : (!hasCalle || !hasCiudad) && direccionPayload?.sector;

  const isManualFallback = mapStatus === "error";
  const hasTerritorySelection = Boolean(
    provinciaId && cantonId && parroquiaId
  );
  const shouldRenderMap = stage === "map" && isPrefillReady;
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



  useEffect(() => {
    if (!expandedGroup) return;
    const handleOutside = (event) => {
      const target = event.target;
      const insideWeekdays = weekdaysRef.current?.contains(target);
      const insideWeekend = weekendRef.current?.contains(target);
      if (!insideWeekdays && !insideWeekend) {
        setExpandedGroup(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [expandedGroup]);

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
      referencia: "",
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
      if (coords?.lat != null && coords?.lng != null) {
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
    <div className="relative rounded-lg border border-gray-200 overflow-hidden focus-within:border-[#5E30A5] focus-within:ring-2 focus-within:ring-[#5E30A5]/30">
      <PinOutlineIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4" />
      <input
        className={`w-full pl-9 pr-12 py-2 text-sm border-0 focus:outline-none ${
          searchValue.trim().length > 0 ? "rounded-none" : "rounded-lg"
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
          className="absolute right-0 top-0 h-full px-3 flex items-center justify-center border-l border-gray-200 bg-[#5E30A5] text-white disabled:opacity-40 rounded-none"
          aria-label="Buscar direcci¢n"
        >
          <SearchTiltIcon className="h-4 w-4 -rotate-12 text-white" />
        </button>
      )}
    </div>
  );

  const weekdayInfo = getGroupInfo(WEEKDAY_KEYS);
  const weekendInfo = getGroupInfo(WEEKEND_KEYS);

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
            className={`w-full text-left px-3 py-3 text-sm transition border-b border-gray-200/60 last:border-b-0 ${
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
        {!isPrefillReady || stage === "pending" ? (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
            Cargando dirección...
          </div>
        ) : stage === "map" ? (
          <AddressStepSearch
            open={searchModeActive}
            onBack={() => setIsSearchModeOpen(false)}
            variant="inline"
            className="h-full"
            headerClassName="pt-3"
            contentClassName="flex flex-col gap-3 px-0"
            childrenClassName="flex h-full flex-col"
            searchBar={
              <>
                <p className="text-sm text-gray-600 text-center">
                  {subtitle ||
                    "Ayúdanos a conectar tu negocio con personas cerca de ti."}
                </p>
                <div className="mt-3 -mx-3">{searchInput}</div>
              </>
            }
            results={searchResultsList}
            footer={
              <div className="pb-4 space-y-2">
                <button
                  type="button"
                  onClick={handleConfirmSearch}
                  disabled={!selectedSearchItem}
                  className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Confirmar
                </button>
                {onSkip && !isBusiness && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="w-full text-sm font-semibold text-gray-500"
                  >
                    Omitir por ahora
                  </button>
                )}
              </div>
            }
          >
            {!searchModeActive ? (
              <>
              <p className="text-sm text-gray-600 mt-3 mb-4 text-center">
                {subtitle ||
                  "Ayúdanos a conectar tu negocio con personas cerca de ti."}
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
                          Asegúrate de señalar el punto correcto y pulsa confirmar.
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
                      onClick={requestLocation}
                      className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-gray-700 z-[1000]"
                      aria-label="Reintentar ubicación"
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
                      label="Cantón"
                      placeholder="Selecciona Cantón"
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
                {onSkip && !isBusiness && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="w-full text-sm font-semibold text-gray-500 mt-2"
                  >
                    Omitir por ahora
                  </button>
                )}
              </div>
              </>
            ) : null}
          </AddressStepSearch>
        ) : (
          <>
            {(localError || reverseError || error) && (
              <ErrorBanner message={localError || reverseError || error} className="mb-3" />
            )}

            <div className="flex-1 -mt-1">
              <div className="-mx-3 rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-4 text-sm text-gray-700 space-y-2 shadow-[inset_0_0_0_1px_rgba(74,222,128,0.08),0_0_0_1px_rgba(74,222,128,0.2),0_0_12px_rgba(74,222,128,0.25)]">
                {hasProvincia && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0">Provincia:</span>
                    <span className="truncate">{payloadProvincia}</span>
                  </div>
                )}
                {hasCiudad && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0">Ciudad:</span>
                    <span className="truncate">{summaryCiudad}</span>
                  </div>
                )}
                {shouldShowCanton && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0">Canton:</span>
                    <span className="truncate">{payloadCanton}</span>
                  </div>
                )}
                {isBusiness && payloadParroquia && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0">Ciudad:</span>
                    <span className="truncate">{payloadParroquia}</span>
                  </div>
                )}
                {shouldShowSector && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0">Sector:</span>
                    <span className="truncate">{direccionPayload.sector}</span>
                  </div>
                )}
                {summaryCalle && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0">Calle:</span>
                    <span className="truncate">{summaryCalle}</span>
                  </div>
                )}
                {direccionPayload?.postcode && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0">Código postal:</span>
                    <span className="truncate">{direccionPayload.postcode}</span>
                  </div>
                )}
                {isBusiness ? (
                  <div className="space-y-1 pt-1">
                    <label className="block text-gray-500">
                      Referencia (opcional)
                    </label>
                    <input
                      type="text"
                      maxLength={200}
                      value={referenciaValue}
                      onChange={(event) =>
                        updateDireccionPayload({ referencia: event.target.value })
                      }
                      placeholder="Ej: Edificio azul, junto a la panadería"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <label className="block text-gray-500">
                      Nombre de la dirección
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CLIENT_ADDRESS_TAGS.map((tag) => {
                        const isSelected = activeTag === tag;
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleSelectTag(tag)}
                            className={`${badgeBase} ${
                              isSelected
                                ? "border-[#5E30A5] text-[#5E30A5] bg-[#F5F0FF]"
                                : "border-gray-300 text-gray-600"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                      <div className="basis-full flex">
                        {isCustomEditing ? (
                          <div
                            className={`${badgeBase} flex items-center gap-2 border-[#5E30A5] bg-[#F5F0FF] px-3 py-2 min-h-[38px] min-w-[180px]`}
                          >
                            <input
                              ref={customInputRef}
                              type="text"
                              value={customTagInput}
                              onChange={handleCustomChange}
                              placeholder="Otro"
                              className="bg-transparent text-[#5E30A5] placeholder:text-[#9C7BD5] text-xs focus:outline-none px-1"
                            />
                            {customTagValid && (
                              <button
                                type="button"
                                onClick={handleCustomConfirm}
                                className="text-[11px] font-semibold text-[#5E30A5]"
                              >
                                OK
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleStartCustom}
                            className={`${badgeBase} ${
                              activeTag === CLIENT_ADDRESS_CUSTOM_KEY
                                ? "border-[#5E30A5] text-[#5E30A5] bg-[#F5F0FF]"
                                : "border-gray-300 text-gray-600"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {customBadgeLabel}
                              <PencilIcon className="h-3 w-3" />
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {isBusiness && (
              <div className="mt-1 space-y-2 h-[240px] flex flex-col">
                <div className="text-sm font-semibold text-gray-900">Horario</div>
                <div className="space-y-3 overflow-y-auto pr-1">
                <div ref={weekdaysRef} className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    {(() => {
                      const isPrimaryActive =
                        expandedGroup === "weekdays"
                          ? Boolean(getEntry(WEEKDAY_KEYS[0]))
                          : weekdayInfo.anySelected;
                      return (
                        <button
                          type="button"
                          onClick={() =>
                            expandedGroup === "weekdays"
                              ? handleToggleDay(WEEKDAY_KEYS[0])
                              : toggleGroupSelection("weekdays")
                          }
                          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            isPrimaryActive
                              ? "bg-[#4ADE80] border-[#4ADE80]"
                              : "bg-gray-100 border-gray-200"
                          }`}
                          aria-label="Activar Lunes a Viernes"
                        >
                          {(expandedGroup === "weekdays" &&
                            Boolean(getEntry(WEEKDAY_KEYS[0]))) ||
                          (expandedGroup !== "weekdays" &&
                            weekdayInfo.allSelected) ? (
                            <CheckIcon className="h-3 w-3 text-white" />
                          ) : null}
                          {expandedGroup !== "weekdays" &&
                            weekdayInfo.partial && (
                              <MinusIcon className="h-3 w-3 text-white" />
                            )}
                        </button>
                      );
                    })()}
                    <span className="font-medium">
                      {expandedGroup === "weekdays" ? "Lunes" : "Lunes a Viernes"}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      {expandedGroup === "weekdays" ? (
                        (() => {
                          const entry = getEntry(WEEKDAY_KEYS[0]);
                          const openTime = entry?.abre || "--:--";
                          const closeTime = entry?.cierra || "--:--";
                          return (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  openTimePicker(WEEKDAY_KEYS[0], "abre", openTime)
                                }
                                className="text-gray-700"
                              >
                                {openTime}
                              </button>
                              <span className="text-gray-300">-</span>
                              <button
                                type="button"
                                onClick={() =>
                                  openTimePicker(WEEKDAY_KEYS[0], "cierra", closeTime)
                                }
                                className="text-gray-700"
                              >
                                {closeTime}
                              </button>
                            </>
                          );
                        })()
                      ) : weekdayInfo.showPersonalizado ? (
                        <button
                          type="button"
                          onClick={() =>
                            openGroupPicker(
                              "weekdays",
                              "abre",
                              weekdayInfo.timeLabel,
                              true
                            )
                          }
                          className="text-gray-700"
                        >
                          Personalizado
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              openGroupPicker(
                                "weekdays",
                                "abre",
                                weekdayInfo.timeLabel,
                                false
                              )
                            }
                            className="text-gray-700"
                          >
                            {weekdayInfo.anySelected
                              ? weekdayInfo.baseEntry?.abre || "--:--"
                              : "--:--"}
                          </button>
                          <span className="text-gray-300">-</span>
                          <button
                            type="button"
                            onClick={() =>
                              openGroupPicker(
                                "weekdays",
                                "cierra",
                                weekdayInfo.timeLabel,
                                false
                              )
                            }
                            className="text-gray-700"
                          >
                            {weekdayInfo.anySelected
                              ? weekdayInfo.baseEntry?.cierra || "--:--"
                              : "--:--"}
                          </button>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedGroup(
                          expandedGroup === "weekdays" ? null : "weekdays"
                        )
                      }
                      aria-label="Expandir Lunes a Viernes"
                    >
                      <ChevronIcon
                        className={`h-4 w-4 text-gray-400 transition ${
                          expandedGroup === "weekdays" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {expandedGroup === "weekdays" && (
                    <div className="space-y-3">
                      {WEEKDAY_KEYS.slice(1).map((dayKey) => {
                        const day = WEEK_DAYS.find((item) => item.key === dayKey);
                        const entry = getEntry(dayKey);
                        const isActive = Boolean(entry);
                        const openTime = entry?.abre || "--:--";
                        const closeTime = entry?.cierra || "--:--";
                        return (
                          <div
                            key={dayKey}
                            className="flex items-center gap-3 text-sm text-gray-700"
                          >
                            <button
                              type="button"
                              onClick={() => handleToggleDay(dayKey)}
                              className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                isActive
                                  ? "bg-[#4ADE80] border-[#4ADE80]"
                                  : "bg-gray-100 border-gray-200"
                              }`}
                              aria-label={`Activar ${day?.label || dayKey}`}
                            >
                              {isActive && (
                                <CheckIcon className="h-3 w-3 text-white" />
                              )}
                            </button>
                            <span className="w-20">{day?.label || dayKey}</span>
                            <button
                              type="button"
                              onClick={() =>
                                openTimePicker(dayKey, "abre", openTime)
                              }
                              className="ml-auto text-gray-700"
                            >
                              {openTime}
                            </button>
                            <span className="text-gray-300">-</span>
                            <button
                              type="button"
                              onClick={() =>
                                openTimePicker(dayKey, "cierra", closeTime)
                              }
                              className="text-gray-700"
                            >
                              {closeTime}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />

                <div ref={weekendRef} className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    {(() => {
                      const isPrimaryActive =
                        expandedGroup === "weekend"
                          ? Boolean(getEntry(WEEKEND_KEYS[0]))
                          : weekendInfo.anySelected;
                      return (
                        <button
                          type="button"
                          onClick={() =>
                            expandedGroup === "weekend"
                              ? handleToggleDay(WEEKEND_KEYS[0])
                              : toggleGroupSelection("weekend")
                          }
                          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            isPrimaryActive
                              ? "bg-[#4ADE80] border-[#4ADE80]"
                              : "bg-gray-100 border-gray-200"
                          }`}
                          aria-label="Activar Fin de Semana"
                        >
                          {(expandedGroup === "weekend" &&
                            Boolean(getEntry(WEEKEND_KEYS[0]))) ||
                          (expandedGroup !== "weekend" &&
                            weekendInfo.allSelected) ? (
                            <CheckIcon className="h-3 w-3 text-white" />
                          ) : null}
                          {expandedGroup !== "weekend" &&
                            weekendInfo.partial && (
                              <MinusIcon className="h-3 w-3 text-white" />
                            )}
                        </button>
                      );
                    })()}
                    <span className="font-medium">
                      {expandedGroup === "weekend" ? "Sabado" : "Fin de Semana"}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      {expandedGroup === "weekend" ? (
                        (() => {
                          const entry = getEntry(WEEKEND_KEYS[0]);
                          const openTime = entry?.abre || "--:--";
                          const closeTime = entry?.cierra || "--:--";
                          return (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  openTimePicker(WEEKEND_KEYS[0], "abre", openTime)
                                }
                                className="text-gray-700"
                              >
                                {openTime}
                              </button>
                              <span className="text-gray-300">-</span>
                              <button
                                type="button"
                                onClick={() =>
                                  openTimePicker(WEEKEND_KEYS[0], "cierra", closeTime)
                                }
                                className="text-gray-700"
                              >
                                {closeTime}
                              </button>
                            </>
                          );
                        })()
                      ) : weekendInfo.showPersonalizado ? (
                        <button
                          type="button"
                          onClick={() =>
                            openGroupPicker(
                              "weekend",
                              "abre",
                              weekendInfo.timeLabel,
                              true
                            )
                          }
                          className="text-gray-700"
                        >
                          Personalizado
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              openGroupPicker(
                                "weekend",
                                "abre",
                                weekendInfo.timeLabel,
                                false
                              )
                            }
                            className="text-gray-700"
                          >
                            {weekendInfo.anySelected
                              ? weekendInfo.baseEntry?.abre || "--:--"
                              : "--:--"}
                          </button>
                          <span className="text-gray-300">-</span>
                          <button
                            type="button"
                            onClick={() =>
                              openGroupPicker(
                                "weekend",
                                "cierra",
                                weekendInfo.timeLabel,
                                false
                              )
                            }
                            className="text-gray-700"
                          >
                            {weekendInfo.anySelected
                              ? weekendInfo.baseEntry?.cierra || "--:--"
                              : "--:--"}
                          </button>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedGroup(
                          expandedGroup === "weekend" ? null : "weekend"
                        )
                      }
                      aria-label="Expandir Fin de Semana"
                    >
                      <ChevronIcon
                        className={`h-4 w-4 text-gray-400 transition ${
                          expandedGroup === "weekend" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {expandedGroup === "weekend" && (
                    <div className="space-y-3">
                      {WEEKEND_KEYS.slice(1).map((dayKey) => {
                        const day = WEEK_DAYS.find((item) => item.key === dayKey);
                        const entry = getEntry(dayKey);
                        const isActive = Boolean(entry);
                        const openTime = entry?.abre || "--:--";
                        const closeTime = entry?.cierra || "--:--";
                        return (
                          <div
                            key={dayKey}
                            className="flex items-center gap-3 text-sm text-gray-700"
                          >
                            <button
                              type="button"
                              onClick={() => handleToggleDay(dayKey)}
                              className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                isActive
                                  ? "bg-[#4ADE80] border-[#4ADE80]"
                                  : "bg-gray-100 border-gray-200"
                              }`}
                              aria-label={`Activar ${day?.label || dayKey}`}
                            >
                              {isActive && (
                                <CheckIcon className="h-3 w-3 text-white" />
                              )}
                            </button>
                            <span className="w-20">{day?.label || dayKey}</span>
                            <button
                              type="button"
                              onClick={() =>
                                openTimePicker(dayKey, "abre", openTime)
                              }
                              className="ml-auto text-gray-700"
                            >
                              {openTime}
                            </button>
                            <span className="text-gray-300">-</span>
                            <button
                              type="button"
                              onClick={() =>
                                openTimePicker(dayKey, "cierra", closeTime)
                              }
                              className="text-gray-700"
                            >
                              {closeTime}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
              </div>
            </div>
            )}
            {isBusiness && (
              <label className="flex items-center gap-2 pt-2 pb-1 text-sm text-gray-700">
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
            )}

            <div className="mt-auto pt-4">
              <button
                onClick={onSubmit}
                disabled={!hasAnyHorario}
                className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {primaryLabel}
              </button>
              {onSkip && !isBusiness && (
                <button
                  type="button"
                  onClick={onSkip}
                  className="w-full text-sm font-semibold text-gray-500 mt-2"
                >
                  Omitir por ahora
                </button>
              )}
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
  const provincia = formatProvince(fields.provincia || item?.provincia || null);
  const parroquiaOrCiudad =
    fields.parroquia || fields.ciudad || item?.parroquia || item?.ciudad || null;
  const sector = fields.sector || item?.sector || null;
  const baseCalles = fields.calles || item?.calles || null;
  const houseNumber = fields.house_number || item?.house_number || null;
  const cantonFallback =
    !parroquiaOrCiudad ? fields.canton || item?.canton || null : null;
  let calles = fields.calles || null;
  if (!calles && baseCalles) {
    calles = baseCalles;
  }
  if (calles && houseNumber) {
    calles = `${calles} ${houseNumber}`.trim();
  }
  const locality = parroquiaOrCiudad || cantonFallback;
  const postcode = fields.postcode || item?.postcode || null;
  const sectorWithPostcode = [postcode, sector].filter((value) => value).join(" ").trim() || null;
  const fallback = [
    calles,
    locality,
    provincia,
    sectorWithPostcode,
  ].filter((value) => value);
  if (fallback.length > 0) return fallback.join(", ");
  const rawLabel = String(item?.label || "").trim();
  if (!rawLabel) return "";
  const country =
    String(fields.country || item?.country || "").trim() || "Ecuador";
  const countryRe = new RegExp(`,\\s*${country}\\s*$`, "i");
  return rawLabel.replace(countryRe, "").trim();
}

function formatProvince(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  return toTitleCaseEs(text);
}

function countDigits(value) {
  const match = String(value || "").match(/\d/g);
  return match ? match.length : 0;
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

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12l4 4 8-8" />
    </svg>
  );
}

function MinusIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12h12" />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
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

function PencilIcon({ className = "" }) {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
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











