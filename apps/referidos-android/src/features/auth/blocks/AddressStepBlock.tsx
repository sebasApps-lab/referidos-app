import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Region } from "react-native-maps";
import { mobileApi } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";

const FALLBACK_COORDS = {
  latitude: -0.2200934426615961,
  longitude: -78.51208009501421,
};

const FALLBACK_REGION: Region = {
  ...FALLBACK_COORDS,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

const CLOSE_REGION_DELTA = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

type AddressResult = {
  id?: string;
  lat?: number;
  lng?: number;
  display_label?: string;
  label?: string;
  provider?: string;
  raw_label?: string;
  display_fields?: Record<string, any>;
  [key: string]: any;
};

type TerritoryItem = {
  id: string;
  nombre: string;
};

type Props = {
  role: string | null;
  loading: boolean;
  value: {
    calles: string;
    ciudad: string;
    sector: string;
    provinciaId: string;
    cantonId: string;
    parroquiaId: string;
    parroquia: string;
    lat: string;
    lng: string;
    isSucursalPrincipal: boolean;
  };
  onChange: {
    setCalles: (v: string) => void;
    setCiudad: (v: string) => void;
    setSector: (v: string) => void;
    setProvinciaId: (v: string) => void;
    setCantonId: (v: string) => void;
    setParroquiaId: (v: string) => void;
    setParroquia: (v: string) => void;
    setLat: (v: string) => void;
    setLng: (v: string) => void;
    setIsSucursalPrincipal: (v: boolean) => void;
    setHorarios?: (v: any) => void;
  };
  onSubmit: () => Promise<boolean>;
  showError: (message: string) => void;
};

function parseStreetFromLabel(label: string) {
  const text = String(label || "").trim();
  if (!text) return "";
  const [first] = text.split(",");
  return String(first || "").trim();
}

function normalizeRegionTitle(value: string) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "";
  return raw
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildDefaultSchedule() {
  return {
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
}

function toTimeInput(value: string) {
  const clean = String(value || "").replace(/[^\d]/g, "").slice(0, 4);
  if (clean.length <= 2) return clean;
  return `${clean.slice(0, 2)}:${clean.slice(2)}`;
}

function toHourMinute(value: string, fallback: string) {
  const text = String(value || "").trim();
  if (/^\d{2}:\d{2}$/.test(text)) return text;
  return fallback;
}

export default function AddressStepBlock({
  role,
  loading,
  value,
  onChange,
  onSubmit,
  showError,
}: Props) {
  const initialHasAddress = Boolean(
    String(value.calles || "").trim() &&
      String(value.sector || "").trim() &&
      Number.isFinite(Number(value.lat)) &&
      Number.isFinite(Number(value.lng)),
  );

  const [phase, setPhase] = useState<"map" | "details">(initialHasAddress ? "details" : "map");
  const [region, setRegion] = useState<Region>(() => {
    const lat = Number(value.lat);
    const lng = Number(value.lng);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return {
        latitude: lat,
        longitude: lng,
        ...CLOSE_REGION_DELTA,
      };
    }
    return FALLBACK_REGION;
  });
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<AddressResult[]>([]);
  const [selected, setSelected] = useState<AddressResult | null>(null);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [resolvedAddress, setResolvedAddress] = useState<AddressResult | null>(null);
  const openPicker = useModalStore((state) => state.openPicker);

  const [territoryLoading, setTerritoryLoading] = useState(true);
  const [territoryError, setTerritoryError] = useState("");
  const [provincias, setProvincias] = useState<TerritoryItem[]>([]);
  const [cantones, setCantones] = useState<TerritoryItem[]>([]);
  const [parroquias, setParroquias] = useState<TerritoryItem[]>([]);
  const [loadingStoredGps, setLoadingStoredGps] = useState(false);

  const [askLocationModal, setAskLocationModal] = useState(false);
  const [deniedModal, setDeniedModal] = useState(false);
  const [unavailableModal, setUnavailableModal] = useState(false);

  const [weekdaysEnabled, setWeekdaysEnabled] = useState(true);
  const [weekendEnabled, setWeekendEnabled] = useState(false);
  const [weekdaysOpen, setWeekdaysOpen] = useState("10:00");
  const [weekdaysClose, setWeekdaysClose] = useState("18:00");
  const [weekendOpen, setWeekendOpen] = useState("10:00");
  const [weekendClose, setWeekendClose] = useState("18:00");

  useEffect(() => {
    if (phase !== "details") return;
    if (role !== "negocio") return;
    const weekly = {
      lunes: weekdaysEnabled ? [{ abre: toHourMinute(weekdaysOpen, "10:00"), cierra: toHourMinute(weekdaysClose, "18:00") }] : [],
      martes: weekdaysEnabled ? [{ abre: toHourMinute(weekdaysOpen, "10:00"), cierra: toHourMinute(weekdaysClose, "18:00") }] : [],
      miercoles: weekdaysEnabled ? [{ abre: toHourMinute(weekdaysOpen, "10:00"), cierra: toHourMinute(weekdaysClose, "18:00") }] : [],
      jueves: weekdaysEnabled ? [{ abre: toHourMinute(weekdaysOpen, "10:00"), cierra: toHourMinute(weekdaysClose, "18:00") }] : [],
      viernes: weekdaysEnabled ? [{ abre: toHourMinute(weekdaysOpen, "10:00"), cierra: toHourMinute(weekdaysClose, "18:00") }] : [],
      sabado: weekendEnabled ? [{ abre: toHourMinute(weekendOpen, "10:00"), cierra: toHourMinute(weekendClose, "18:00") }] : [],
      domingo: weekendEnabled ? [{ abre: toHourMinute(weekendOpen, "10:00"), cierra: toHourMinute(weekendClose, "18:00") }] : [],
    };
    onChange.setHorarios?.({ semanal: weekly, excepciones: [] });
  }, [
    onChange,
    phase,
    role,
    weekdaysClose,
    weekdaysEnabled,
    weekdaysOpen,
    weekendClose,
    weekendEnabled,
    weekendOpen,
  ]);

  useEffect(() => {
    if (initialHasAddress) {
      setResolvedAddress({
        display_fields: {
          calles: value.calles,
          ciudad: value.ciudad,
          sector: value.sector,
          provincia_id: value.provinciaId,
          canton_id: value.cantonId,
          parroquia_id: value.parroquiaId,
          parroquia: value.parroquia,
        },
      });
    }
  }, [initialHasAddress, value.calles, value.cantonId, value.ciudad, value.parroquia, value.parroquiaId, value.provinciaId, value.sector]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setTerritoryLoading(true);
      setTerritoryError("");
      const response = await mobileApi.address.fetchProvincias();
      if (!mounted) return;
      if (!response?.ok) {
        setTerritoryError(response?.error || "No se pudo cargar provincias.");
        setProvincias([]);
        setTerritoryLoading(false);
        return;
      }
      const rows = Array.isArray(response.data) ? response.data : [];
      setProvincias(
        rows.map((row: any) => ({
          id: String(row?.id || ""),
          nombre: String(row?.nombre || ""),
        })).filter((row) => row.id),
      );
      setTerritoryLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const provinciaId = String(value.provinciaId || "").trim();
    if (!provinciaId) {
      setCantones([]);
      if (value.cantonId) onChange.setCantonId("");
      if (value.parroquiaId) onChange.setParroquiaId("");
      return () => {
        mounted = false;
      };
    }

    (async () => {
      const response = await mobileApi.address.fetchCantones(provinciaId);
      if (!mounted) return;
      if (!response?.ok) {
        setCantones([]);
        setTerritoryError(response?.error || "No se pudo cargar cantones.");
        return;
      }
      const rows = Array.isArray(response.data) ? response.data : [];
      setCantones(
        rows.map((row: any) => ({
          id: String(row?.id || ""),
          nombre: String(row?.nombre || ""),
        })).filter((row) => row.id),
      );
      if (
        value.cantonId &&
        !rows.some((row: any) => String(row?.id || "") === String(value.cantonId))
      ) {
        onChange.setCantonId("");
        onChange.setParroquiaId("");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [onChange, value.cantonId, value.parroquiaId, value.provinciaId]);

  useEffect(() => {
    let mounted = true;
    const cantonId = String(value.cantonId || "").trim();
    if (!cantonId) {
      setParroquias([]);
      if (value.parroquiaId) onChange.setParroquiaId("");
      return () => {
        mounted = false;
      };
    }

    (async () => {
      const response = await mobileApi.address.fetchParroquias(cantonId);
      if (!mounted) return;
      if (!response?.ok) {
        setParroquias([]);
        setTerritoryError(response?.error || "No se pudo cargar parroquias.");
        return;
      }
      const rows = Array.isArray(response.data) ? response.data : [];
      setParroquias(
        rows.map((row: any) => ({
          id: String(row?.id || ""),
          nombre: String(row?.nombre || ""),
        })).filter((row) => row.id),
      );
      if (
        value.parroquiaId &&
        !rows.some((row: any) => String(row?.id || "") === String(value.parroquiaId))
      ) {
        onChange.setParroquiaId("");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [onChange, value.cantonId, value.parroquiaId]);

  useEffect(() => {
    let mounted = true;
    const hasCoords =
      Number.isFinite(Number(value.lat)) && Number.isFinite(Number(value.lng));
    if (phase !== "map" || hasCoords || selected) {
      return () => {
        mounted = false;
      };
    }

    (async () => {
      setLoadingStoredGps(true);
      const fallback = await mobileApi.address.getGpsFallback();
      if (!mounted) return;
      setLoadingStoredGps(false);
      if (!fallback?.ok || !fallback?.location) return;
      const lat = Number(fallback.location.lat);
      const lng = Number(fallback.location.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      setRegion({
        latitude: lat,
        longitude: lng,
        ...CLOSE_REGION_DELTA,
      });
    })();

    return () => {
      mounted = false;
    };
  }, [phase, selected, value.lat, value.lng]);

  const selectedProvinciaName = useMemo(
    () => provincias.find((item) => item.id === String(value.provinciaId || ""))?.nombre || "",
    [provincias, value.provinciaId],
  );

  const selectedCantonName = useMemo(
    () => cantones.find((item) => item.id === String(value.cantonId || ""))?.nombre || "",
    [cantones, value.cantonId],
  );

  const selectedParroquiaName = useMemo(
    () => parroquias.find((item) => item.id === String(value.parroquiaId || ""))?.nombre || "",
    [parroquias, value.parroquiaId],
  );

  const mapCanConfirm = useMemo(() => {
    const latChanged = Math.abs(region.latitude - FALLBACK_COORDS.latitude) > 0.0001;
    const lngChanged = Math.abs(region.longitude - FALLBACK_COORDS.longitude) > 0.0001;
    return latChanged || lngChanged || Boolean(selected);
  }, [region.latitude, region.longitude, selected]);

  const applyAddressResult = useCallback(
    (address: AddressResult) => {
      const fields = address?.display_fields || {};
      const label = String(address?.raw_label || address?.label || "");
      const street = fields.calles || address?.calles || address?.street || parseStreetFromLabel(label);
      const city = fields.ciudad || address?.ciudad || "";
      const sector = fields.sector || address?.sector || address?.city || "";
      const provinciaId = fields.provincia_id || address?.provincia_id || "";
      const cantonId = fields.canton_id || address?.canton_id || "";
      const parroquiaId = fields.parroquia_id || address?.parroquia_id || "";
      const parroquia = fields.parroquia || address?.parroquia || "";
      const nextProvinciaId = String(provinciaId || value.provinciaId || "").trim();
      const nextCantonId = String(cantonId || value.cantonId || "").trim();
      const nextParroquiaId = String(parroquiaId || value.parroquiaId || "").trim();
      const nextParroquiaLabel = String(
        parroquia || value.parroquia || selectedParroquiaName || "",
      ).trim();
      const lat = Number(address?.lat ?? region.latitude);
      const lng = Number(address?.lng ?? region.longitude);

      onChange.setCalles(String(street || "").trim());
      onChange.setCiudad(normalizeRegionTitle(String(city || "")));
      onChange.setSector(normalizeRegionTitle(String(sector || "")));
      onChange.setProvinciaId(nextProvinciaId);
      onChange.setCantonId(nextCantonId);
      onChange.setParroquiaId(nextParroquiaId);
      onChange.setParroquia(nextParroquiaLabel);
      onChange.setLat(String(lat));
      onChange.setLng(String(lng));

      setResolvedAddress(address);
      setRegion({
        latitude: lat,
        longitude: lng,
        ...CLOSE_REGION_DELTA,
      });
      setPhase("details");
    },
    [
      onChange,
      region.latitude,
      region.longitude,
      selectedParroquiaName,
      value.cantonId,
      value.parroquia,
      value.parroquiaId,
      value.provinciaId,
    ],
  );

  const handleSearch = useCallback(async () => {
    const query = String(searchText || "").trim();
    if (query.length < 4) {
      showError("Ingresa al menos 4 caracteres para buscar direccion.");
      return;
    }
    setSearching(true);
    const response = await mobileApi.address.search(query, {
      limit: 8,
      country: "ec",
      language: "es",
    });
    setSearching(false);
    if (!response?.ok) {
      showError(response?.error || "No se pudo buscar direcciones.");
      setResults([]);
      return;
    }
    setResults(Array.isArray(response.results) ? response.results : []);
  }, [searchText, showError]);

  const resolveCenterAddress = useCallback(async () => {
    setReverseLoading(true);
    const targetLat = selected?.lat ?? region.latitude;
    const targetLng = selected?.lng ?? region.longitude;
    const response = await mobileApi.address.reverse(targetLat, targetLng, {
      language: "es",
    });
    setReverseLoading(false);
    if (!response?.ok || !response?.data) {
      showError(response?.error || "No se pudo resolver la direccion del punto.");
      return;
    }

    const data = {
      ...response.data,
      lat: targetLat,
      lng: targetLng,
    };
    applyAddressResult(data);
  }, [applyAddressResult, region.latitude, region.longitude, selected?.lat, selected?.lng, showError]);

  const requestLocation = useCallback(async () => {
    if (Platform.OS !== "android") {
      setUnavailableModal(true);
      return;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!hasPermission) {
      setAskLocationModal(true);
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setRegion({
          latitude,
          longitude,
          ...CLOSE_REGION_DELTA,
        });
        await mobileApi.address.saveGpsFallback({ lat: latitude, lng: longitude });
      },
      (geoError) => {
        if (geoError?.code === 1) setDeniedModal(true);
        else setUnavailableModal(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 },
    );
  }, []);

  const handleGrantLocation = useCallback(async () => {
    setAskLocationModal(false);
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      setDeniedModal(true);
      return;
    }
    requestLocation();
  }, [requestLocation]);

  const openProvinciaPicker = useCallback(() => {
    if (!provincias.length) {
      showError("No hay provincias disponibles para seleccionar.");
      return;
    }
    openPicker({
      title: "Provincia",
      message: "Selecciona la provincia de la direccion.",
      selectedId: value.provinciaId || null,
      options: provincias.map((item) => ({
        id: item.id,
        label: item.nombre,
      })),
      confirmLabel: "Aplicar",
      cancelLabel: "Cancelar",
      onSelect: (id) => {
        if (String(id) === String(value.provinciaId || "")) return;
        onChange.setProvinciaId(String(id || ""));
        onChange.setCantonId("");
        onChange.setParroquiaId("");
      },
    });
  }, [onChange, openPicker, provincias, showError, value.provinciaId]);

  const openCantonPicker = useCallback(() => {
    if (!value.provinciaId) {
      showError("Selecciona primero una provincia.");
      return;
    }
    if (!cantones.length) {
      showError("No hay cantones disponibles para esta provincia.");
      return;
    }
    openPicker({
      title: "Canton",
      message: "Selecciona el canton de la direccion.",
      selectedId: value.cantonId || null,
      options: cantones.map((item) => ({
        id: item.id,
        label: item.nombre,
      })),
      confirmLabel: "Aplicar",
      cancelLabel: "Cancelar",
      onSelect: (id) => {
        if (String(id) === String(value.cantonId || "")) return;
        onChange.setCantonId(String(id || ""));
        onChange.setParroquiaId("");
      },
    });
  }, [cantones, onChange, openPicker, showError, value.cantonId, value.provinciaId]);

  const openParroquiaPicker = useCallback(() => {
    if (!value.cantonId) {
      showError("Selecciona primero un canton.");
      return;
    }
    if (!parroquias.length) {
      showError("No hay parroquias cargadas para este canton. Puedes escribirla manualmente.");
      return;
    }
    openPicker({
      title: "Parroquia",
      message: "Selecciona la parroquia o mantenla manual.",
      selectedId: value.parroquiaId || null,
      options: parroquias.map((item) => ({
        id: item.id,
        label: item.nombre,
      })),
      confirmLabel: "Aplicar",
      cancelLabel: "Cancelar",
      onSelect: (id) => {
        onChange.setParroquiaId(String(id || ""));
        const selected = parroquias.find((item) => item.id === String(id || ""));
        onChange.setParroquia(selected?.nombre || "");
      },
    });
  }, [onChange, openPicker, parroquias, showError, value.cantonId, value.parroquiaId]);

  const handleSubmitDetails = useCallback(async () => {
    if (role === "negocio") {
      const anyDayEnabled = weekdaysEnabled || weekendEnabled;
      if (!anyDayEnabled) {
        showError("Selecciona al menos un horario para la sucursal.");
        return;
      }
    }
    if (!String(value.provinciaId || "").trim() || !String(value.cantonId || "").trim()) {
      showError("Selecciona provincia y canton para completar la direccion.");
      return;
    }
    await onSubmit();
  }, [onSubmit, role, showError, value.cantonId, value.provinciaId, weekdaysEnabled, weekendEnabled]);

  return (
    <View style={styles.root}>
      {phase === "map" ? (
        <>
          <View style={styles.mapWrap}>
            <MapView
              style={styles.map}
              initialRegion={region}
              region={region}
              onRegionChangeComplete={(next) => setRegion(next)}
            />
            <View pointerEvents="none" style={styles.centerPinWrap}>
              <View style={styles.centerPinOuter}>
                <View style={styles.centerPinInner} />
              </View>
            </View>
            <Pressable style={styles.gpsButton} onPress={requestLocation}>
              <Text style={styles.gpsButtonText}>GPS</Text>
            </Pressable>
          </View>
          {loadingStoredGps ? (
            <Text style={styles.helperText}>Cargando ultima ubicacion GPS guardada...</Text>
          ) : null}
          {territoryError ? <Text style={styles.warningText}>{territoryError}</Text> : null}

          <Text style={styles.label}>Busca direccion</Text>
          <View style={styles.searchRow}>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
              placeholder="Busca la direccion si no la encuentras..."
            />
            <Pressable onPress={handleSearch} style={styles.searchButton} disabled={searching}>
              <Text style={styles.searchButtonText}>{searching ? "..." : "Buscar"}</Text>
            </Pressable>
          </View>

          {results.length ? (
            <View style={styles.resultsWrap}>
              <ScrollView style={styles.resultsScroll}>
                {results.map((item, index) => {
                  const key = String(item.id || `${index}`);
                  const selectedNow = selected?.id ? selected.id === item.id : false;
                  return (
                    <Pressable
                      key={key}
                      onPress={() => {
                        setSelected(item);
                        if (Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lng))) {
                          setRegion({
                            latitude: Number(item.lat),
                            longitude: Number(item.lng),
                            ...CLOSE_REGION_DELTA,
                          });
                        }
                      }}
                      style={[styles.resultItem, selectedNow && styles.resultItemSelected]}
                    >
                      <Text style={styles.resultTitle} numberOfLines={2}>
                        {String(item.display_label || item.label || item.raw_label || "Direccion")}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}

          <Pressable
            onPress={resolveCenterAddress}
            disabled={!mapCanConfirm || reverseLoading || loading}
            style={[
              styles.primaryButton,
              (!mapCanConfirm || reverseLoading || loading) && styles.primaryButtonDisabled,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {reverseLoading ? "Confirmando..." : "Confirmar"}
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Direccion confirmada</Text>
            <DetailRow
              label="Provincia"
              value={String(selectedProvinciaName || value.provinciaId || "-")}
            />
            <DetailRow label="Ciudad" value={String(value.ciudad || "-")} />
            <DetailRow
              label="Canton"
              value={String(selectedCantonName || value.cantonId || "-")}
            />
            <DetailRow label="Sector" value={String(value.sector || "-")} />
            <DetailRow label="Calle" value={String(value.calles || "-")} />
            <DetailRow
              label="Parroquia"
              value={String(selectedParroquiaName || value.parroquia || value.parroquiaId || "-")}
            />
            <DetailRow label="Lat/Lng" value={`${value.lat || "-"}, ${value.lng || "-"}`} />

            <View style={styles.territoryWrap}>
              <Text style={styles.territoryTitle}>Fallback territorial</Text>
              <Pressable
                onPress={openProvinciaPicker}
                style={[styles.territoryFieldBtn, territoryLoading && styles.territoryFieldBtnDisabled]}
                disabled={territoryLoading}
              >
                <Text style={styles.territoryFieldLabel}>Provincia</Text>
                <Text style={styles.territoryFieldValue}>
                  {selectedProvinciaName || value.provinciaId || "Seleccionar"}
                </Text>
              </Pressable>
              <Pressable
                onPress={openCantonPicker}
                style={[
                  styles.territoryFieldBtn,
                  (!value.provinciaId || territoryLoading) && styles.territoryFieldBtnDisabled,
                ]}
                disabled={!value.provinciaId || territoryLoading}
              >
                <Text style={styles.territoryFieldLabel}>Canton</Text>
                <Text style={styles.territoryFieldValue}>
                  {selectedCantonName || value.cantonId || "Seleccionar"}
                </Text>
              </Pressable>
              <Pressable
                onPress={openParroquiaPicker}
                style={[
                  styles.territoryFieldBtn,
                  (!value.cantonId || territoryLoading) && styles.territoryFieldBtnDisabled,
                ]}
                disabled={!value.cantonId || territoryLoading}
              >
                <Text style={styles.territoryFieldLabel}>Parroquia</Text>
                <Text style={styles.territoryFieldValue}>
                  {selectedParroquiaName || value.parroquia || value.parroquiaId || "Seleccionar"}
                </Text>
              </Pressable>
              <TextInput
                value={value.parroquia}
                onChangeText={(text) => {
                  onChange.setParroquia(text);
                  if (value.parroquiaId) onChange.setParroquiaId("");
                }}
                style={styles.territoryInput}
                placeholder="Parroquia manual (opcional)"
              />
            </View>
          </View>

          {role === "negocio" ? (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Horario</Text>
              <ScheduleRow
                label="Lunes a viernes"
                enabled={weekdaysEnabled}
                onToggle={setWeekdaysEnabled}
                open={weekdaysOpen}
                close={weekdaysClose}
                setOpen={setWeekdaysOpen}
                setClose={setWeekdaysClose}
              />
              <ScheduleRow
                label="Fin de semana"
                enabled={weekendEnabled}
                onToggle={setWeekendEnabled}
                open={weekendOpen}
                close={weekendClose}
                setOpen={setWeekendOpen}
                setClose={setWeekendClose}
              />
              <Pressable
                onPress={() => onChange.setIsSucursalPrincipal(!value.isSucursalPrincipal)}
                style={[styles.toggleChip, value.isSucursalPrincipal && styles.toggleChipActive]}
              >
                <Text style={[styles.toggleChipText, value.isSucursalPrincipal && styles.toggleChipTextActive]}>
                  {value.isSucursalPrincipal ? "Sucursal principal" : "Sucursal secundaria"}
                </Text>
              </Pressable>
            </View>
          ) : null}

          <View style={styles.detailActions}>
            <Pressable onPress={() => setPhase("map")} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Volver al mapa</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmitDetails}
              disabled={loading}
              style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
            >
              <Text style={styles.primaryButtonText}>{loading ? "Guardando..." : role === "negocio" ? "Entrar" : "Continuar"}</Text>
            </Pressable>
          </View>
        </>
      )}

      <Modal transparent visible={askLocationModal} animationType="fade" onRequestClose={() => setAskLocationModal(false)}>
        <ModalCard
          title="Ubicacion del negocio"
          text="Podemos usar tu ubicacion para centrar el mapa cerca de ti. Tambien puedes mover el mapa manualmente."
          primaryLabel="Usar ubicacion"
          secondaryLabel="Ahora no"
          onPrimary={handleGrantLocation}
          onSecondary={() => setAskLocationModal(false)}
        />
      </Modal>

      <Modal transparent visible={deniedModal} animationType="fade" onRequestClose={() => setDeniedModal(false)}>
        <ModalCard
          title="Ubicacion desactivada"
          text="El acceso a la ubicacion esta desactivado en tu dispositivo. Puedes activarlo o ingresar direccion manualmente."
          primaryLabel="Entiendo"
          onPrimary={() => setDeniedModal(false)}
        />
      </Modal>

      <Modal transparent visible={unavailableModal} animationType="fade" onRequestClose={() => setUnavailableModal(false)}>
        <ModalCard
          title="No pudimos obtener tu ubicacion"
          text="Intenta mover el mapa manualmente o buscar la direccion del negocio."
          primaryLabel="Entiendo"
          onPrimary={() => setUnavailableModal(false)}
        />
      </Modal>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue} numberOfLines={1}>
        {value || "-"}
      </Text>
    </View>
  );
}

function ScheduleRow({
  label,
  enabled,
  onToggle,
  open,
  close,
  setOpen,
  setClose,
}: {
  label: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  open: string;
  close: string;
  setOpen: (value: string) => void;
  setClose: (value: string) => void;
}) {
  return (
    <View style={styles.scheduleRow}>
      <Pressable onPress={() => onToggle(!enabled)} style={[styles.scheduleToggle, enabled && styles.scheduleToggleEnabled]}>
        <Text style={[styles.scheduleToggleText, enabled && styles.scheduleToggleTextEnabled]}>
          {enabled ? "ON" : "OFF"}
        </Text>
      </Pressable>
      <Text style={styles.scheduleLabel}>{label}</Text>
      <TextInput
        style={styles.timeInput}
        value={open}
        onChangeText={(v) => setOpen(toTimeInput(v))}
        keyboardType="number-pad"
        placeholder="10:00"
      />
      <Text style={styles.timeDash}>-</Text>
      <TextInput
        style={styles.timeInput}
        value={close}
        onChangeText={(v) => setClose(toTimeInput(v))}
        keyboardType="number-pad"
        placeholder="18:00"
      />
    </View>
  );
}

function ModalCard({
  title,
  text,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: {
  title: string;
  text: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}) {
  return (
    <View style={styles.modalBackdrop}>
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{text}</Text>
        <View style={styles.modalActions}>
          {secondaryLabel ? (
            <Pressable onPress={onSecondary} style={styles.modalSecondaryBtn}>
              <Text style={styles.modalSecondaryText}>{secondaryLabel}</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={onPrimary} style={styles.modalPrimaryBtn}>
            <Text style={styles.modalPrimaryText}>{primaryLabel}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 10,
  },
  mapWrap: {
    height: 260,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  map: {
    flex: 1,
  },
  centerPinWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  centerPinOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#6D28D9",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(109,40,217,0.15)",
  },
  centerPinInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6D28D9",
  },
  gpsButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  gpsButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
  },
  helperText: {
    color: "#6B7280",
    fontSize: 11,
  },
  warningText: {
    color: "#92400E",
    fontSize: 11,
    fontWeight: "600",
  },
  label: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    fontSize: 13,
    backgroundColor: "#FFFFFF",
  },
  searchButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 78,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  resultsWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    maxHeight: 170,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  resultsScroll: {
    paddingVertical: 4,
  },
  resultItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  resultItemSelected: {
    backgroundColor: "#F5F3FF",
  },
  resultTitle: {
    fontSize: 12,
    color: "#334155",
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  detailCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    gap: 8,
  },
  detailTitle: {
    color: "#181B2A",
    fontSize: 14,
    fontWeight: "700",
  },
  detailRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  detailLabel: {
    width: 82,
    color: "#6B7280",
    fontSize: 12,
  },
  detailValue: {
    flex: 1,
    color: "#111827",
    fontSize: 12,
  },
  territoryWrap: {
    marginTop: 6,
    gap: 8,
  },
  territoryTitle: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "700",
  },
  territoryFieldBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    gap: 2,
  },
  territoryFieldBtnDisabled: {
    opacity: 0.5,
  },
  territoryFieldLabel: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
  },
  territoryFieldValue: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "600",
  },
  territoryInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    color: "#111827",
    fontSize: 12,
    backgroundColor: "#FFFFFF",
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  scheduleToggle: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 44,
    alignItems: "center",
  },
  scheduleToggleEnabled: {
    backgroundColor: "#ECFDF3",
    borderColor: "#10B981",
  },
  scheduleToggleText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
  },
  scheduleToggleTextEnabled: {
    color: "#047857",
  },
  scheduleLabel: {
    flex: 1,
    color: "#334155",
    fontSize: 12,
  },
  timeInput: {
    width: 62,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  timeDash: {
    color: "#6B7280",
    fontSize: 12,
  },
  toggleChip: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  toggleChipActive: {
    borderColor: "#10B981",
    backgroundColor: "#ECFDF3",
  },
  toggleChipText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "600",
  },
  toggleChipTextActive: {
    color: "#047857",
  },
  detailActions: {
    gap: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(2,6,23,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 16,
    gap: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#181B2A",
  },
  modalText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 4,
  },
  modalPrimaryBtn: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  modalSecondaryBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  modalSecondaryText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 12,
  },
});
