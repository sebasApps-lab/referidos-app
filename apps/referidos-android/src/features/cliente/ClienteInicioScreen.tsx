import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";
import { fetchPromoFeed, formatDateTime, readFirst } from "@shared/services/entityQueries";
import { TAB_ROUTES } from "@navigation/routeKeys";

export default function ClienteInicioScreen() {
  const navigation = useNavigation<any>();
  const onboarding = useAppStore((state) => state.onboarding);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const openAlert = useModalStore((state) => state.openAlert);
  const [promosLoading, setPromosLoading] = useState(true);
  const [promos, setPromos] = useState<any[]>([]);
  const [error, setError] = useState("");

  const usuario = onboarding?.usuario || null;
  const alias = useMemo(
    () =>
      readFirst(
        usuario,
        ["alias", "apodo", "nombre", "email"],
        "Cliente",
      ),
    [usuario],
  );
  const tier = String(readFirst(usuario, ["tier", "plan", "nivel"], "explorador"));

  const loadPromos = useCallback(async () => {
    setPromosLoading(true);
    setError("");
    const result = await fetchPromoFeed(supabase, 8);
    if (!result.ok) {
      setError(result.error || "No se pudo cargar promociones");
      setPromos([]);
      setPromosLoading(false);
      return;
    }
    setPromos(result.data);
    setPromosLoading(false);
  }, []);

  useEffect(() => {
    loadPromos();
  }, [loadPromos]);

  const onRefresh = useCallback(async () => {
    await bootstrapAuth();
    await loadPromos();
  }, [bootstrapAuth, loadPromos]);

  const openPromoLink = useCallback(
    async (promo: any) => {
      const externalLink = String(
        readFirst(
          promo,
          ["deeplink", "deep_link", "wa_link", "url", "link", "web_url"],
          "",
        ),
      ).trim();

      if (!externalLink) {
        openAlert({
          title: "Promo sin enlace",
          message: "Esta promocion no tiene un enlace directo disponible por ahora.",
          tone: "warning",
        });
        return;
      }

      try {
        const canOpen = await Linking.canOpenURL(externalLink);
        if (!canOpen) {
          openAlert({
            title: "No se pudo abrir",
            message: "El enlace de la promocion no es valido en este dispositivo.",
            tone: "warning",
          });
          return;
        }
        await Linking.openURL(externalLink);
      } catch {
        openAlert({
          title: "Error al abrir",
          message: "No se pudo abrir el enlace de la promocion.",
          tone: "warning",
        });
      }
    },
    [openAlert],
  );

  return (
    <ScreenScaffold title="Inicio cliente" subtitle="Resumen de cuenta y promociones">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title={`Hola, ${String(alias).split(" ")[0]}`}
          subtitle="Resumen de cuenta"
          right={
            <Pressable onPress={onRefresh} style={styles.refreshButton}>
              <Text style={styles.refreshText}>Refrescar</Text>
            </Pressable>
          }
        >
          <View style={styles.kpiRow}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Estado</Text>
              <Text style={styles.kpiValue}>
                {onboarding?.allowAccess ? "activo" : "pendiente"}
              </Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Tier</Text>
              <Text style={styles.kpiValue}>{tier}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo:</Text>
            <Text style={styles.infoValue}>{readFirst(usuario, ["email"], "sin correo")}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Telefono:</Text>
            <Text style={styles.infoValue}>
              {readFirst(usuario, ["telefono", "phone"], "sin telefono")}
            </Text>
          </View>
          <View style={styles.quickActionsRow}>
            <Pressable
              onPress={() => navigation.navigate(TAB_ROUTES.CLIENTE.ESCANER)}
              style={styles.quickActionPrimary}
            >
              <Text style={styles.quickActionPrimaryText}>Ir a escaner</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(TAB_ROUTES.CLIENTE.HISTORIAL)}
              style={styles.quickActionSecondary}
            >
              <Text style={styles.quickActionSecondaryText}>Ver historial</Text>
            </Pressable>
          </View>
        </SectionCard>

        <SectionCard title="Promociones destacadas" subtitle="Datos en vivo desde backend">
          {promosLoading ? <BlockSkeleton lines={5} /> : null}
          {!promosLoading && error ? <Text style={styles.error}>{error}</Text> : null}
          {!promosLoading && !error && promos.length === 0 ? (
            <Text style={styles.emptyText}>No hay promociones para mostrar.</Text>
          ) : null}
          {!promosLoading && !error
            ? promos.map((promo, index) => {
                const title = readFirst(
                  promo,
                  ["titulo", "nombre", "title", "descripcion"],
                  `Promo ${index + 1}`,
                );
                const subtitle = readFirst(
                  promo,
                  ["categoria", "tipo", "estado"],
                  "sin categoria",
                );
                const createdAt = readFirst(
                  promo,
                  ["created_at", "fecha_creacion", "fechainicio"],
                  null,
                );
                return (
                  <View key={`${readFirst(promo, ["id", "public_id"], index)}-${index}`} style={styles.listItem}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {String(title)}
                    </Text>
                    <Text style={styles.itemSubtitle} numberOfLines={1}>
                      {String(subtitle)}
                    </Text>
                    <Text style={styles.itemMeta}>{formatDateTime(createdAt)}</Text>
                    <Pressable onPress={() => { void openPromoLink(promo); }} style={styles.itemAction}>
                      <Text style={styles.itemActionText}>Abrir promo</Text>
                    </Pressable>
                  </View>
                );
              })
            : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#F4EEFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  refreshText: {
    color: "#5B21B6",
    fontWeight: "700",
    fontSize: 12,
  },
  kpiRow: {
    flexDirection: "row",
    gap: 8,
  },
  kpiCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FAFBFF",
  },
  kpiLabel: {
    fontSize: 11,
    color: "#6B7280",
    textTransform: "uppercase",
  },
  kpiValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: "#181B2A",
  },
  infoRow: {
    flexDirection: "row",
    gap: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    width: 68,
  },
  infoValue: {
    flex: 1,
    fontSize: 12,
    color: "#111827",
  },
  quickActionsRow: {
    marginTop: 4,
    flexDirection: "row",
    gap: 8,
  },
  quickActionPrimary: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#6D28D9",
    paddingVertical: 10,
    alignItems: "center",
  },
  quickActionPrimaryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  quickActionSecondary: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    alignItems: "center",
  },
  quickActionSecondaryText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
  },
  error: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 12,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    gap: 2,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#181B2A",
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#4B5563",
  },
  itemMeta: {
    fontSize: 11,
    color: "#6B7280",
  },
  itemAction: {
    alignSelf: "flex-start",
    marginTop: 2,
    backgroundColor: "#F4EEFF",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  itemActionText: {
    fontSize: 11,
    color: "#5B21B6",
    fontWeight: "700",
  },
});
