import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchCurrentUserRow,
  fetchQrHistoryByClientId,
  formatDateTime,
  readFirst,
  toDisplayStatus,
} from "@shared/services/entityQueries";

export default function ClienteHistorialScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError("");

    const userIdFromOnboarding = onboarding?.usuario?.id || null;
    let userId = userIdFromOnboarding;
    if (!userId) {
      const current = await fetchCurrentUserRow(supabase);
      if (!current.ok || !current.data?.id) {
        setLoading(false);
        setError(current.error || "No se pudo identificar usuario");
        setRows([]);
        return;
      }
      userId = current.data.id;
    }

    const history = await fetchQrHistoryByClientId(supabase, userId, 40);
    if (!history.ok) {
      setLoading(false);
      setError(history.error || "No se pudo cargar historial");
      setRows([]);
      return;
    }

    setRows(history.data);
    setLoading(false);
  }, [onboarding?.usuario?.id]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <ScreenScaffold title="Historial cliente" subtitle="Canjes y registros de QR">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Historial reciente"
          subtitle="Ultimos movimientos asociados a tu cuenta"
          right={
            <Pressable onPress={loadHistory} style={styles.refreshButton}>
              <Text style={styles.refreshText}>Recargar</Text>
            </Pressable>
          }
        >
          {loading ? <BlockSkeleton lines={6} compact /> : null}
          {!loading && error ? <Text style={styles.error}>{error}</Text> : null}
          {!loading && !error && rows.length === 0 ? (
            <Text style={styles.emptyText}>Todavia no hay movimientos en tu historial.</Text>
          ) : null}
          {!loading && !error
            ? rows.map((row, index) => {
                const status = toDisplayStatus(readFirst(row, ["status", "estado"], "sin_estado"));
                const code = readFirst(row, ["code", "codigo"], "sin_codigo");
                const promo = readFirst(row, ["promo_id", "promoid", "promoid"], "sin promo");
                const created = readFirst(
                  row,
                  ["created_at", "updated_at", "redeemed_at", "used_at"],
                  null,
                );
                return (
                  <View key={`${readFirst(row, ["id"], index)}-${index}`} style={styles.item}>
                    <View style={styles.itemTop}>
                      <Text style={styles.itemCode} numberOfLines={1}>
                        {String(code)}
                      </Text>
                      <Text style={styles.itemStatus}>{status}</Text>
                    </View>
                    <Text style={styles.itemMeta} numberOfLines={1}>
                      Promo: {String(promo)}
                    </Text>
                    <Text style={styles.itemMeta}>{formatDateTime(created)}</Text>
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
  error: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
    backgroundColor: "#FFFFFF",
  },
  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  itemCode: {
    flex: 1,
    fontWeight: "700",
    color: "#181B2A",
    fontSize: 12,
  },
  itemStatus: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "lowercase",
  },
  itemMeta: {
    color: "#6B7280",
    fontSize: 11,
  },
});
