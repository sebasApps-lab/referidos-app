import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { fetchPromoFeed, formatDateTime, readFirst } from "@shared/services/entityQueries";

export default function ClienteInicioScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
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

  return (
    <ScreenScaffold title="Inicio cliente" subtitle="Base funcional Android (fase 3)">
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
});
