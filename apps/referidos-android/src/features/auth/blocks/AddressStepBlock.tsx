import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  Keyboard,
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
import { mobileApi } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";
import AddressMapPicker, { type AddressMapRegion } from "./AddressMapPicker";
import { authText } from "./AuthStartLayout";
import BusinessScheduleBlock, { createBusinessSchedule, hasBusinessHours, type BusinessSchedule } from "./BusinessScheduleBlock";
import {
  OnboardingInput,
  OnboardingPrimaryButton,
  OnboardingSkipButton,
  OnboardingSubtitle,
  onboardingColors,
} from "./OnboardingFormLayout";

const CLIENT_ADDRESS_TAGS = ["Casa", "Oficina", "Trabajo"];

const FALLBACK_COORDS = {
  latitude: -0.2200934426615961,
  longitude: -78.51208009501421,
};

const FALLBACK_REGION: AddressMapRegion = {
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
    referencia?: string;
    horarios?: BusinessSchedule;
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
    setHorarios?: (value: BusinessSchedule) => void;
    setReferencia?: (value: string) => void;
  };
  onSubmit: () => Promise<boolean>;
  onSkip?: () => void;
  searchModeOpen?: boolean;
  onSearchModeChange?: (open: boolean) => void;
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

export default function AddressStepBlock({
  role,
  loading,
  value,
  onChange,
  onSubmit,
  onSkip,
  searchModeOpen,
  onSearchModeChange,
  showError,
}: Props) {
  const { setCantonId, setParroquiaId, setHorarios } = onChange;
  const isBusiness = role === "negocio";
  const hasCoordinates = Boolean(value.lat.trim() && value.lng.trim()) &&
    Number.isFinite(Number(value.lat)) && Number.isFinite(Number(value.lng));
  const initialHasAddress = Boolean(
    value.calles.trim() && value.sector.trim() && hasCoordinates,
  );

  const [phase, setPhase] = useState<"map" | "details">(initialHasAddress ? "details" : "map");
  const [region, setRegion] = useState<AddressMapRegion>(() => {
    const lat = Number(value.lat);
    const lng = Number(value.lng);
    if (hasCoordinates) {
      return {
        latitude: lat,
        longitude: lng,
        ...CLOSE_REGION_DELTA,
      };
    }
    return FALLBACK_REGION;
  });
  const [searchText, setSearchText] = useState("");
  const [localSearchOpen, setLocalSearchOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<AddressResult[]>([]);
  const [selected, setSelected] = useState<AddressResult | null>(null);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [showMapHint, setShowMapHint] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const [editingTag, setEditingTag] = useState(false);
  const [localReference, setLocalReference] = useState("");
  const [postcode, setPostcode] = useState("");
  const [editingTerritory, setEditingTerritory] = useState(() => !value.provinciaId || !value.cantonId);
  const openPicker = useModalStore((state) => state.openPicker);
  const searchOpen = searchModeOpen ?? localSearchOpen;
  const reference = value.referencia ?? localReference;

  function changeReference(next: string) {
    setLocalReference(next);
    onChange.setReferencia?.(next);
  }

  const setSearchOpen = useCallback((open: boolean) => {
    setLocalSearchOpen(open);
    onSearchModeChange?.(open);
  }, [onSearchModeChange]);

  const [territoryLoading, setTerritoryLoading] = useState(true);
  const [territoryError, setTerritoryError] = useState("");
  const [provincias, setProvincias] = useState<TerritoryItem[]>([]);
  const [cantones, setCantones] = useState<TerritoryItem[]>([]);
  const [parroquias, setParroquias] = useState<TerritoryItem[]>([]);
  const [loadingStoredGps, setLoadingStoredGps] = useState(false);

  const [askLocationModal, setAskLocationModal] = useState(false);
  const [deniedModal, setDeniedModal] = useState(false);
  const [unavailableModal, setUnavailableModal] = useState(false);

  const [localSchedule, setLocalSchedule] = useState(createBusinessSchedule);
  const schedule = value.horarios ?? localSchedule;
  const hasHours = hasBusinessHours(schedule);

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
      if (value.cantonId) setCantonId("");
      if (value.parroquiaId) setParroquiaId("");
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
        setCantonId("");
        setParroquiaId("");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setCantonId, setParroquiaId, value.cantonId, value.parroquiaId, value.provinciaId]);

  useEffect(() => {
    let mounted = true;
    const cantonId = String(value.cantonId || "").trim();
    if (!cantonId) {
      setParroquias([]);
      if (value.parroquiaId) setParroquiaId("");
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
        setParroquiaId("");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setParroquiaId, value.cantonId, value.parroquiaId]);

  useEffect(() => {
    let mounted = true;
    if (phase !== "map" || hasCoordinates || selected) {
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
  }, [hasCoordinates, phase, selected]);

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
    const zoomed = region.latitudeDelta < FALLBACK_REGION.latitudeDelta * 0.75;
    return latChanged || lngChanged || zoomed || Boolean(selected);
  }, [region.latitude, region.latitudeDelta, region.longitude, selected]);

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

      setPostcode(String(fields.postcode || address?.postcode || ""));
      setEditingTerritory(!nextProvinciaId || !nextCantonId);
      setSearchOpen(false);
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
      setSearchOpen,
      value.cantonId,
      value.parroquia,
      value.parroquiaId,
      value.provinciaId,
    ],
  );

  const handleSearch = useCallback(async () => {
    const query = searchText.trim();
    if (query.length < 4) {
      showError("Ingresa al menos 4 caracteres para buscar direccion.");
      return;
    }
    setSearching(true);
    setSearchOpen(true);
    setHasSearched(false);
    setSelected(null);
    setResults([]);
    Keyboard.dismiss();
    try {
      const response = await mobileApi.address.search(`${query}, Ecuador`, {
        limit: 6,
        country: "ec",
        language: "es",
      });
      if (!response?.ok) {
        showError(response?.error || "No se pudo buscar direcciones.");
        return;
      }
      setHasSearched(true);
      setResults(Array.isArray(response.results) ? response.results : []);
    } catch {
      showError("No se pudo buscar direcciones.");
    } finally {
      setSearching(false);
    }
  }, [searchText, setSearchOpen, showError]);

  const resolveCenterAddress = useCallback(async () => {
    setReverseLoading(true);
    const targetLat = selected?.lat ?? region.latitude;
    const targetLng = selected?.lng ?? region.longitude;
    try {
      const response = await mobileApi.address.reverse(targetLat, targetLng, { language: "es" });
      if (!response?.ok || !response?.data) {
        showError(response?.error || "No se pudo resolver la dirección del punto.");
        return;
      }
      applyAddressResult({ ...response.data, lat: targetLat, lng: targetLng });
    } catch {
      showError("No se pudo resolver la dirección del punto.");
    } finally {
      setReverseLoading(false);
    }
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
        setShowMapHint(true);
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
    if (isBusiness && !hasHours) {
      showError("Selecciona al menos un horario para la sucursal.");
      return;
    }
    if (!String(value.provinciaId || "").trim() || !String(value.cantonId || "").trim()) {
      showError("Selecciona provincia y canton para completar la direccion.");
      return;
    }
    await onSubmit();
  }, [hasHours, isBusiness, onSubmit, showError, value.cantonId, value.provinciaId]);

  const customReference = reference && !CLIENT_ADDRESS_TAGS.includes(reference) ? reference : "";
  const customTagValid = customTag.trim().length >= 2;
  const territoryNeeded = editingTerritory || !value.provinciaId || !value.cantonId;
  const confirmDisabled = searchOpen ? !selected : !mapCanConfirm;

  return (
    <View style={styles.root}>
      {phase === "map" ? (
        <>
          <OnboardingSubtitle>
            {isBusiness
              ? "Ayúdanos a conectar tu negocio con personas cerca de ti."
              : "Encuentra lo que más te conviene según tu ubicación."}
          </OnboardingSubtitle>
          {!searchOpen && <View style={styles.mapWrap}>
            <AddressMapPicker
              region={region}
              onRegionChange={(next) => {
                const zoomHintThreshold = FALLBACK_REGION.latitudeDelta * 0.75;
                if (region.latitudeDelta >= zoomHintThreshold && next.latitudeDelta < zoomHintThreshold) {
                  setShowMapHint(true);
                }
                setRegion(next);
              }}
            />
            <View pointerEvents="none" style={styles.centerPinWrap}>
              <Image source={require("../assets/address-pin-filled.png")} style={styles.centerPin} />
            </View>
            {showMapHint && (
              <View style={styles.mapHint}>
                <Image source={require("../assets/address-pin.png")} style={styles.hintPin} />
                <Text style={styles.mapHintCopy}>Asegúrate de señalar el punto correcto y pulsa confirmar.</Text>
                <Pressable accessibilityRole="button" accessibilityLabel="Cerrar aviso" onPress={() => setShowMapHint(false)} hitSlop={8}>
                  <Image source={require("../assets/cross.png")} style={styles.hintClose} />
                </Pressable>
              </View>
            )}
            <Pressable accessibilityRole="button" accessibilityLabel="Reintentar ubicación" style={styles.gpsButton} onPress={requestLocation}>
              <Image source={require("../assets/address-compass.png")} style={styles.compass} />
            </Pressable>
          </View>}
          {!searchOpen && loadingStoredGps && <Text style={styles.helperText}>Cargando última ubicación…</Text>}

          <View style={styles.searchRow}>
            <Image source={require("../assets/address-pin.png")} style={styles.searchPin} />
            <TextInput
              accessibilityLabel="Buscar dirección"
              value={searchText}
              onFocus={() => setSearchOpen(true)}
              onChangeText={(next) => {
                setSearchText(next);
                setHasSearched(false);
                setResults([]);
                setSelected(null);
              }}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCorrect={false}
              style={styles.searchInput}
              placeholder="Busca la direccion si no la encuentras..."
              placeholderTextColor={onboardingColors.secondary}
            />
            {!!searchText.trim() && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Buscar dirección"
                onPress={handleSearch}
                style={[styles.searchButton, (searching || searchText.trim().length < 4) && styles.primaryButtonDisabled]}
                disabled={searching || searchText.trim().length < 4}
              >
                <Image source={require("../assets/address-search.png")} style={styles.searchIcon} />
              </Pressable>
            )}
          </View>

          {searchOpen && searching && <Text style={styles.helperText}>Buscando...</Text>}
          {searchOpen && hasSearched && !results.length && <Text style={styles.helperText}>No encontramos resultados.</Text>}
          {searchOpen && results.length > 0 && (
            <View style={styles.resultsWrap}>
              <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled" style={styles.resultsScroll}>
                {results.map((item, index) => {
                  const key = String(item.id || `${index}`);
                  const selectedNow = selected === item;
                  return (
                    <Pressable
                      key={key}
                      accessibilityRole="button"
                      accessibilityState={{ selected: selectedNow }}
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
                        {String(item.display_label || item.label || item.raw_label || "Dirección")}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <View style={styles.detailActions}>
            <OnboardingPrimaryButton
              label={reverseLoading ? "Confirmando..." : "Confirmar"}
              onPress={resolveCenterAddress}
              disabled={confirmDisabled || reverseLoading || loading}
            />
            {!isBusiness && onSkip && <OnboardingSkipButton onPress={onSkip} disabled={loading} />}
          </View>
        </>
      ) : (
        <>
          <View style={styles.detailCard}>
            <DetailRow label="Provincia" value={selectedProvinciaName} />
            <DetailRow label="Ciudad" value={selectedParroquiaName || value.parroquia || value.ciudad} />
            {selectedCantonName !== value.ciudad && <DetailRow label="Cantón" value={selectedCantonName} />}
            <DetailRow label="Sector" value={value.sector} />
            <DetailRow label="Calle" value={value.calles} />
            <DetailRow label="Código postal" value={postcode} />

            {territoryNeeded && <View style={styles.territoryWrap}>
              {territoryError ? <Text style={styles.warningText}>{territoryError}</Text> : null}
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
                <Text style={styles.territoryFieldLabel}>Cantón</Text>
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
                <Text style={styles.territoryFieldLabel}>Ciudad/sector</Text>
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
            </View>}

            {isBusiness ? (
              <View style={styles.references}>
                <Text style={styles.detailLabel}>Referencia (opcional)</Text>
                <OnboardingInput
                  accessibilityLabel="Referencia (opcional)"
                  maxLength={200}
                  placeholder="Ej: Edificio azul, junto a la panadería"
                  value={reference}
                  onChangeText={changeReference}
                />
              </View>
            ) : (
              <View style={styles.references}>
                <Text style={styles.detailLabel}>Nombre de la dirección</Text>
                <View style={styles.tags}>
                  {CLIENT_ADDRESS_TAGS.map((tag) => (
                    <Pressable
                      key={tag}
                      accessibilityRole="button"
                      accessibilityState={{ selected: reference === tag }}
                      onPress={() => {
                        changeReference(tag);
                        setEditingTag(false);
                      }}
                      style={[styles.tag, reference === tag && styles.tagActive]}
                    >
                      <Text style={[styles.tagText, reference === tag && styles.tagTextActive]}>{tag}</Text>
                    </Pressable>
                  ))}
                </View>
                {editingTag ? (
                  <View style={styles.customTag}>
                    <TextInput
                      autoFocus
                      accessibilityLabel="Otro nombre de la dirección"
                      maxLength={25}
                      value={customTag}
                      onChangeText={setCustomTag}
                      placeholder="Otro"
                      placeholderTextColor="#9C7BD5"
                      style={styles.customTagInput}
                    />
                    {customTagValid && <Pressable accessibilityRole="button" onPress={() => {
                      changeReference(customTag.trim());
                      setEditingTag(false);
                    }} hitSlop={8}>
                      <Text style={styles.customConfirm}>OK</Text>
                    </Pressable>}
                  </View>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Otro nombre de la dirección"
                    onPress={() => {
                      setCustomTag(customReference);
                      setEditingTag(true);
                    }}
                    style={[styles.tag, styles.otherTag, !!customReference && styles.tagActive]}
                  >
                    <Text style={[styles.tagText, !!customReference && styles.tagTextActive]}>{customReference || "Otro"}</Text>
                    <Image source={require("../assets/pencil.png")} style={styles.tagPencil} />
                  </Pressable>
                )}
              </View>
            )}
          </View>

          {isBusiness && (
            <View style={styles.scheduleCard}>
              <BusinessScheduleBlock
                value={schedule}
                onChange={(next) => {
                  setLocalSchedule(next);
                  setHorarios?.(next);
                }}
              />
              <Pressable
                onPress={() => onChange.setIsSucursalPrincipal(!value.isSucursalPrincipal)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: value.isSucursalPrincipal }}
                style={styles.branchCheck}
              >
                <View style={[styles.branchBox, value.isSucursalPrincipal && styles.branchBoxChecked]}>
                  {value.isSucursalPrincipal && <Image source={require("../assets/check.png")} style={styles.branchTick} />}
                </View>
                <Text style={styles.detailValue}>Este es mi sucursal principal</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.detailActions}>
            <OnboardingSkipButton label="Editar dirección" onPress={() => setPhase("map")} disabled={loading} />
            <OnboardingPrimaryButton
              label={isBusiness ? "Entrar" : "Continuar"}
              tone="green"
              onPress={handleSubmitDetails}
              disabled={loading || (isBusiness && !hasHours)}
            />
            {!isBusiness && onSkip && <OnboardingSkipButton onPress={onSkip} disabled={loading} />}
          </View>
        </>
      )}

      <Modal transparent visible={askLocationModal} animationType="fade" onRequestClose={() => setAskLocationModal(false)}>
        <ModalCard
          title="Usar tu ubicación"
          text="Podemos usar tu ubicación para centrar el mapa cerca de ti. También puedes moverlo manualmente."
          primaryLabel="Usar ubicación"
          secondaryLabel="Ahora no"
          onPrimary={handleGrantLocation}
          onSecondary={() => setAskLocationModal(false)}
        />
      </Modal>

      <Modal transparent visible={deniedModal} animationType="fade" onRequestClose={() => setDeniedModal(false)}>
        <ModalCard
          title="Ubicación desactivada"
          text="El acceso a la ubicación está desactivado en tu dispositivo. Puedes activarlo o buscar la dirección manualmente."
          primaryLabel="Entiendo"
          onPrimary={() => setDeniedModal(false)}
        />
      </Modal>

      <Modal transparent visible={unavailableModal} animationType="fade" onRequestClose={() => setUnavailableModal(false)}>
        <ModalCard
          title="No pudimos obtener tu ubicación"
          text="Intenta mover el mapa manualmente o buscar la dirección."
          primaryLabel="Entiendo"
          onPrimary={() => setUnavailableModal(false)}
        />
      </Modal>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue} numberOfLines={1}>
        {value}
      </Text>
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
  root: { flexGrow: 1, gap: 12, paddingBottom: 16 },
  mapWrap: { height: 320, marginHorizontal: -20, marginTop: -20, overflow: "hidden", borderColor: onboardingColors.border, borderTopWidth: 1, borderBottomWidth: 1 },
  centerPinWrap: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
  centerPin: { width: 36, height: 36, marginTop: -36, tintColor: onboardingColors.purple },
  mapHint: {
    position: "absolute", left: 0, right: 0, top: 4, flexDirection: "row", alignItems: "center", gap: 12,
    padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#A4F4CF", backgroundColor: "#ECFDF5",
  },
  mapHintCopy: { ...authText.caption, flex: 1, color: "#009966" },
  hintPin: { height: 24, width: 24, tintColor: onboardingColors.green },
  hintClose: { height: 16, width: 16, tintColor: "#34D399" },
  gpsButton: {
    position: "absolute", right: 12, bottom: 12, width: 36, height: 36,
    borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: onboardingColors.white, elevation: 4,
  },
  compass: { width: 24, height: 24 },
  helperText: { ...authText.caption, color: onboardingColors.muted },
  warningText: { ...authText.caption, color: onboardingColors.error },
  searchRow: {
    flexDirection: "row", alignItems: "center", marginHorizontal: -12, minHeight: 38,
    borderRadius: 8, borderWidth: 1, borderColor: onboardingColors.border, overflow: "hidden",
  },
  searchPin: { width: 16, height: 16, marginLeft: 12, marginRight: 6, tintColor: "#D1D5DC" },
  searchInput: { ...authText.small, flex: 1, minHeight: 36, paddingVertical: 7, paddingRight: 8, color: onboardingColors.dark },
  searchButton: {
    width: 40, alignSelf: "stretch", justifyContent: "center", alignItems: "center", backgroundColor: onboardingColors.purple,
  },
  searchIcon: { width: 16, height: 16, tintColor: onboardingColors.white, transform: [{ rotate: "-12deg" }] },
  resultsWrap: { borderRadius: 8, marginHorizontal: -12, maxHeight: 220, overflow: "hidden", backgroundColor: onboardingColors.white },
  resultsScroll: { paddingVertical: 4 },
  resultItem: { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: onboardingColors.border },
  resultItemSelected: { backgroundColor: onboardingColors.lavender },
  resultTitle: { ...authText.small, color: onboardingColors.dark },
  primaryButtonDisabled: { opacity: 0.6 },
  detailCard: {
    marginHorizontal: -12, borderWidth: 1, borderColor: "#BBE9CD", borderRadius: 16,
    backgroundColor: onboardingColors.white, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, gap: 8,
  },
  detailRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  detailLabel: { ...authText.small, color: onboardingColors.muted },
  detailValue: { ...authText.small, flex: 1, color: onboardingColors.dark },
  references: { gap: 8, paddingTop: 4 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { borderColor: "#D1D5DC", borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  tagActive: { borderColor: onboardingColors.purple, backgroundColor: onboardingColors.lavender },
  tagText: { ...authText.caption, color: "#4A5565" },
  tagTextActive: { color: onboardingColors.purple },
  otherTag: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start" },
  tagPencil: { width: 12, height: 12, tintColor: onboardingColors.muted },
  customTag: {
    alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, minHeight: 38, minWidth: 180,
    paddingHorizontal: 12, borderWidth: 1, borderRadius: 999, borderColor: onboardingColors.purple, backgroundColor: onboardingColors.lavender,
  },
  customTagInput: { ...authText.caption, flexGrow: 1, color: onboardingColors.purple, paddingVertical: 6 },
  customConfirm: { ...authText.caption, color: onboardingColors.purple, fontWeight: "600" },
  territoryWrap: { gap: 8, marginTop: 4 },
  territoryFieldBtn: { gap: 2 },
  territoryFieldBtnDisabled: { opacity: 0.5 },
  territoryFieldLabel: { ...authText.caption, color: onboardingColors.muted, marginLeft: 4 },
  territoryFieldValue: {
    ...authText.small, minHeight: 38, paddingHorizontal: 12, paddingVertical: 8,
    color: onboardingColors.dark, borderWidth: 1, borderColor: onboardingColors.border, borderRadius: 8,
  },
  territoryInput: {
    ...authText.small, minHeight: 38, paddingHorizontal: 12, paddingVertical: 8,
    color: onboardingColors.dark, borderWidth: 1, borderColor: onboardingColors.border, borderRadius: 8,
  },
  scheduleCard: { gap: 12, paddingTop: 4 },
  branchCheck: { flexDirection: "row", alignItems: "center", gap: 8, paddingTop: 8 },
  branchBox: { width: 16, height: 16, borderRadius: 4, borderWidth: 1, borderColor: "#D1D5DC", alignItems: "center", justifyContent: "center" },
  branchBoxChecked: { backgroundColor: onboardingColors.purple, borderColor: onboardingColors.purple },
  branchTick: { width: 12, height: 12, tintColor: onboardingColors.white },
  detailActions: { marginTop: "auto", paddingTop: 4, gap: 4 },
  modalBackdrop: { flex: 1, backgroundColor: "#00000066", alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  modalCard: { width: "100%", maxWidth: 384, borderRadius: 16, backgroundColor: onboardingColors.white, padding: 24, gap: 12 },
  modalTitle: { ...authText.normal, fontSize: 18, lineHeight: 24, fontWeight: "600", color: "#101828" },
  modalText: { ...authText.small, color: "#4A5565" },
  modalActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: 8, marginTop: 4 },
  modalPrimaryBtn: { backgroundColor: onboardingColors.purple, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  modalPrimaryText: { ...authText.small, color: onboardingColors.white, fontWeight: "600" },
  modalSecondaryBtn: { borderWidth: 1, borderColor: onboardingColors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 7 },
  modalSecondaryText: { ...authText.small, color: onboardingColors.dark, fontWeight: "600" },
});
