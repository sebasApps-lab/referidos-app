import React, { useCallback, useEffect, useMemo, useState } from "react";
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

type HistoryFilter = "todos" | "activos" | "canjeados" | "expirados";

function toHistoryCategory(row: any): Exclude<HistoryFilter, "todos"> {
  const rawStatus = String(readFirst(row, ["status", "estado"], "")).trim().toLowerCase();
  if (rawStatus.includes("canje") || rawStatus.includes("redeem") || rawStatus.includes("used")) {
    return "canjeados";
  }
  if (rawStatus.includes("expir") || rawStatus.includes("venc")) {
    return "expirados";
  }
  if (rawStatus.includes("activo") || rawStatus.includes("valid") || rawStatus.includes("new")) {
    return "activos";
  }

  const expiresAt = readFirst(row, ["expires_at", "expira_at", "fecha_expiracion"], null);
  if (expiresAt) {
    const expiresTime = new Date(expiresAt).getTime();
    if (!Number.isNaN(expiresTime) && expiresTime <= Date.now()) return "expirados";
  }
  return "activos";
}

export default function ClienteHistorialScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<HistoryFilter>("todos");
  const [detailKey, setDetailKey] = useState<string | null>(null);

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

  const listRows = useMemo(
    () =>
      rows.map((row, index) => {
        const category = toHistoryCategory(row);
        const statusLabel = toDisplayStatus(readFirst(row, ["status", "estado"], "sin_estado"));
        const code = String(readFirst(row, ["code", "codigo"], "sin_codigo"));
        const promo = String(readFirst(row, ["promo_id", "promoid"], "sin promo"));
        const created = readFirst(
          row,
          ["created_at", "updated_at", "redeemed_at", "used_at"],
          null,
        );
        const key = `${readFirst(row, ["id", "public_id", "code", "codigo"], index)}-${index}`;
        return {
          key,
          row,
          category,
          statusLabel,
          code,
          promo,
          created,
        };
      }),
    [rows],
  );

  const filteredRows = useMemo(() => {
    if (filter === "todos") return listRows;
    return listRows.filter((item) => item.category === filter);
  }, [filter, listRows]);

  const detailItem = useMemo(
    () => listRows.find((item) => item.key === detailKey) || null,
    [detailKey, listRows],
  );

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
          <View style={styles.filterRow}>
            {(["todos", "activos", "canjeados", "expirados"] as HistoryFilter[]).map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setFilter(item);
                  setDetailKey(null);
                }}
                style={[styles.filterChip, filter === item && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, filter === item && styles.filterChipTextActive]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          {loading ? <BlockSkeleton lines={6} compact /> : null}
          {!loading && error ? <Text style={styles.error}>{error}</Text> : null}
          {!loading && !error && filteredRows.length === 0 ? (
            <Text style={styles.emptyText}>Todavia no hay movimientos en tu historial.</Text>
          ) : null}

          {!loading && !error && detailItem ? (
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Detalle de movimiento</Text>
              <Text style={styles.detailLine}>Codigo: {detailItem.code}</Text>
              <Text style={styles.detailLine}>Estado: {detailItem.statusLabel}</Text>
              <Text style={styles.detailLine}>Promo: {detailItem.promo}</Text>
              <Text style={styles.detailLine}>Fecha: {formatDateTime(detailItem.created)}</Text>
              <Pressable onPress={() => setDetailKey(null)} style={styles.detailBackBtn}>
                <Text style={styles.detailBackBtnText}>Volver a la lista</Text>
              </Pressable>
            </View>
          ) : null}

          {!loading && !error && !detailItem
            ? filteredRows.map((item) => (
                <View key={item.key} style={styles.item}>
                  <View style={styles.itemTop}>
                    <Text style={styles.itemCode} numberOfLines={1}>
                      {item.code}
                    </Text>
                    <Text
                      style={[
                        styles.itemStatus,
                        item.category === "activos"
                          ? styles.itemStatusActive
                          : item.category === "canjeados"
                          ? styles.itemStatusRedeemed
                          : styles.itemStatusExpired,
                      ]}
                    >
                      {item.statusLabel}
                    </Text>
                  </View>
                  <Text style={styles.itemMeta} numberOfLines={1}>
                    Promo: {item.promo}
                  </Text>
                  <Text style={styles.itemMeta}>{formatDateTime(item.created)}</Text>
                  <Pressable onPress={() => setDetailKey(item.key)} style={styles.detailLinkBtn}>
                    <Text style={styles.detailLinkText}>Ver detalle</Text>
                  </Pressable>
                </View>
              ))
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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  filterChipActive: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  filterChipText: {
    textTransform: "uppercase",
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "700",
  },
  filterChipTextActive: {
    color: "#5B21B6",
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
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  itemStatusActive: {
    color: "#047857",
    backgroundColor: "#DCFCE7",
  },
  itemStatusRedeemed: {
    color: "#1D4ED8",
    backgroundColor: "#DBEAFE",
  },
  itemStatusExpired: {
    color: "#B91C1C",
    backgroundColor: "#FEE2E2",
  },
  itemMeta: {
    color: "#6B7280",
    fontSize: 11,
  },
  detailLinkBtn: {
    alignSelf: "flex-start",
    marginTop: 2,
    backgroundColor: "#F4EEFF",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  detailLinkText: {
    color: "#5B21B6",
    fontSize: 11,
    fontWeight: "700",
  },
  detailBox: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    borderRadius: 10,
    backgroundColor: "#FAF8FF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
  },
  detailTitle: {
    fontSize: 13,
    color: "#181B2A",
    fontWeight: "700",
  },
  detailLine: {
    color: "#4B5563",
    fontSize: 12,
  },
  detailBackBtn: {
    alignSelf: "flex-start",
    marginTop: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "#FFFFFF",
  },
  detailBackBtnText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
  },
});
