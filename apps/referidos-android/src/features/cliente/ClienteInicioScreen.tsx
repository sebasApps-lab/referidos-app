import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Linking, RefreshControl, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { useIsFocused, useNavigation, type NavigationProp, type ParamListBase } from "@react-navigation/native";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";
import { fetchPromoFeed, readFirst } from "@shared/services/entityQueries";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";
import { InicioBeneficios, InicioHero } from "./inicio/InicioHero";
import { PromoSection, type PromoItem } from "./inicio/InicioPromos";
import InicioSearch, { InicioEmptyState, InicioSearchTrigger } from "./inicio/InicioSearch";

function mapPromo(row: Record<string, unknown>, index: number): PromoItem {
  const rawDate = String(readFirst(row, ["fin", "fecha_fin", "expires_at"], ""));
  const date = /^(\d{4})-(\d{2})-(\d{2})/.exec(rawDate);
  const createdAt = Date.parse(String(readFirst(row, ["created_at", "fecha_creacion", "fechacreacion", "fechaCreacion", "inicio"], "")));
  return {
    id: String(readFirst(row, ["id", "public_id"], index)),
    detailId: String(readFirst(row, ["id"], "")).trim() || undefined,
    title: String(readFirst(row, ["titulo", "nombre", "title", "descripcion"], `Promo ${index + 1}`)),
    description: String(readFirst(row, ["descripcion", "description"], "Sin descripción")),
    local: String(readFirst(row, ["nombreLocal", "nombre_local", "local", "negocio_nombre"], "Local")),
    location: String(readFirst(row, ["ubicacion", "sector", "ciudad", "direccion"], "Ubicación")),
    image: String(readFirst(row, ["imagen", "image_url"], "")).trim(),
    expires: date ? `${date[3]}/${date[2]}/${date[1]}` : "",
    createdAt: Number.isFinite(createdAt) ? createdAt : 0,
    redemptions: Number(readFirst(row, ["canjeados_count", "canjeadosCount", "canjeadoscount"], 0)) || 0,
    link: String(readFirst(row, ["deeplink", "deep_link", "wa_link", "url", "link", "web_url"], "")).trim(),
  };
}

function comparableLocation(value: unknown) {
  return typeof value === "string" ? value.trim().toLocaleLowerCase("es") : "";
}

export default function ClienteInicioScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();
  const user = useAppStore((state) => state.onboarding?.usuario ?? null);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const openAlert = useModalStore((state) => state.openAlert);
  const [promosLoading, setPromosLoading] = useState(true);
  const [promos, setPromos] = useState<PromoItem[]>([]);
  const [hasError, setHasError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchDocked, setSearchDocked] = useState(false);
  const heroHeight = useRef(0);
  const mounted = useRef(false);
  const inFlight = useRef<Promise<void> | null>(null);

  const loadPromos = useCallback(() => {
    if (inFlight.current) return inFlight.current;
    setHasError(false);
    setPromosLoading(true);
    const request = (async () => {
      try {
        const result = await fetchPromoFeed(supabase, 8);
        if (!mounted.current) return;
        if (result.ok) setPromos(result.data.map(mapPromo));
        else setHasError(true);
      } catch {
        if (mounted.current) setHasError(true);
      } finally {
        inFlight.current = null;
        if (mounted.current) setPromosLoading(false);
      }
    })();
    inFlight.current = request;
    return request;
  }, []);

  useEffect(() => {
    mounted.current = true;
    void loadPromos();
    return () => { mounted.current = false; };
  }, [loadPromos]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await bootstrapAuth();
      if (mounted.current) await loadPromos();
    } finally {
      if (mounted.current) setRefreshing(false);
    }
  }, [bootstrapAuth, loadPromos]);

  const openPromoLink = useCallback(async (promo: PromoItem) => {
    setSearchOpen(false);
    if (promo.detailId) {
      navigation.navigate(STACK_ROUTES.CLIENTE.PROMO_DETAIL, { promoId: promo.detailId });
      return;
    }
    if (!promo.link) {
      openAlert({
        title: "Promo sin enlace",
        message: "Esta promoción no tiene un enlace directo disponible por ahora.",
        tone: "warning",
      });
      return;
    }

    try {
      if (!(await Linking.canOpenURL(promo.link))) {
        openAlert({
          title: "No se pudo abrir",
          message: "El enlace de la promoción no es válido en este dispositivo.",
          tone: "warning",
        });
        return;
      }
      await Linking.openURL(promo.link);
    } catch {
      openAlert({
        title: "Error al abrir",
        message: "No se pudo abrir el enlace de la promoción.",
        tone: "warning",
      });
    }
  }, [navigation, openAlert]);

  const onScan = useCallback(() => {
    setSearchOpen(false);
    navigation.navigate(TAB_ROUTES.CLIENTE.ESCANER);
  }, [navigation]);

  const sections = useMemo(() => {
    const newest = [...promos].sort((left, right) => right.createdAt - left.createdAt);
    const territory = [user?.sector, user?.ciudad, user?.ubicacion].map(comparableLocation).filter(Boolean);
    const nearby = promos.filter((promo) => territory.includes(comparableLocation(promo.location)));
    const hot = promos.filter(({ redemptions }) => redemptions > 0).sort((left, right) => right.redemptions - left.redemptions);

    return {
      newest: newest.slice(0, 5),
      nearby: (nearby.length > 0 ? nearby : promos).slice(0, 5),
      nearbyTitle: nearby.length > 0 ? "Cerca de ti" : "Promociones sugeridas",
      hot: hot.slice(0, 5),
    };
  }, [promos, user]);

  const initialLoading = promosLoading && promos.length === 0;

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#5E30A5"]} tintColor="#5E30A5" />}
        scrollEventThrottle={32}
        onScroll={({ nativeEvent }) => {
          const next = heroHeight.current > 0 && nativeEvent.contentOffset.y >= heroHeight.current + 12;
          setSearchDocked((previous) => previous === next ? previous : next);
        }}
      >
        {initialLoading ? (
          <View style={styles.skeleton} accessibilityLabel="Cargando promociones" accessibilityState={{ busy: true }}>
            <View style={[styles.placeholder, styles.skeletonHero]} />
            <View style={[styles.placeholder, styles.skeletonSearch]} />
            <View style={[styles.placeholder, styles.skeletonHeading]} />
            <View style={[styles.placeholder, styles.skeletonPromo]} />
            <View style={[styles.placeholder, styles.skeletonHeading]} />
            <View style={[styles.placeholder, styles.skeletonNearby]} />
          </View>
        ) : (
          <>
            <View onLayout={({ nativeEvent }) => { heroHeight.current = nativeEvent.layout.height; }}>
              <InicioHero user={user} search={<InicioSearchTrigger onPress={() => setSearchOpen(true)} />} />
            </View>
            {hasError && (
              <InicioEmptyState kind="error" onPrimary={() => { void loadPromos(); }} onScan={onScan} />
            )}
            {!hasError && promos.length === 0 && (
              <InicioEmptyState kind="promos" onPrimary={() => setSearchOpen(true)} onScan={onScan} />
            )}
            {promos.length > 0 && (
              <View style={styles.sections}>
                <PromoSection title="Nuevas" variant="nuevas" promos={sections.newest} viewportWidth={width} autoScroll={isFocused && !searchOpen} onOpenPromo={openPromoLink} />
                <PromoSection title={sections.nearbyTitle} variant="cercanas" promos={sections.nearby} viewportWidth={width} onOpenPromo={openPromoLink} />
                <PromoSection title="Hot" variant="hot" promos={sections.hot} viewportWidth={width} onOpenPromo={openPromoLink} />
              </View>
            )}
            <InicioBeneficios user={user} />
          </>
        )}
      </ScrollView>
      {searchDocked && !initialLoading && (
        <View style={styles.searchDock}>
          <InicioSearchTrigger onPress={() => setSearchOpen(true)} />
        </View>
      )}
      {searchOpen && (
        <InicioSearch promos={promos} hotPromos={sections.hot} viewportWidth={width} onClose={() => setSearchOpen(false)} onOpenPromo={openPromoLink} onScan={onScan} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FAF8FF" },
  content: { paddingBottom: 64 },
  sections: { marginTop: 24 },
  searchDock: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: "#5E30A5", borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingHorizontal: 16, paddingBottom: 12, elevation: 3 },
  skeleton: { paddingHorizontal: 16, paddingTop: 16 },
  placeholder: { backgroundColor: "#EEEAF6" },
  skeletonHero: { height: 140, borderRadius: 32 },
  skeletonSearch: { height: 36, borderRadius: 18, marginTop: 16 },
  skeletonHeading: { width: 120, height: 12, borderRadius: 6, marginTop: 24 },
  skeletonPromo: { height: 112, width: "90%", borderRadius: 16, marginTop: 12 },
  skeletonNearby: { height: 220, width: "88%", borderRadius: 16, marginTop: 12 },
});
