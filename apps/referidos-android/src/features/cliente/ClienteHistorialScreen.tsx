import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useAppStore } from "@shared/store/appStore";
import HistoryCard, { HistoryDetail } from "./historial/HistoryCard";
import { HISTORY_TABS, getHistoryTab, loadClienteHistory, type HistoryRecord, type HistoryTab } from "./historial/historyData";

const PURPLE = "#5E30A5";
const qrIcon = require("./inicio/assets/qr-code.png");
const checkIcon = require("../auth/assets/check.png");
const crossIcon = require("../auth/assets/cross.png");
const badgeIcon = require("./historial/assets/badge-check.png");
const tabSeparator = require("./historial/assets/tab-separator.png");
const rowSeparator = require("./historial/assets/row-separator.png");
const EMPTY_RECORDS: HistoryRecord[] = [];

const EMPTY_LABELS: Record<HistoryTab, string> = {
  activos: "No tienes promos activas.",
  canjeados: "Canjea tu primera promo.",
  expirados: "Aquí se mostrarán tus promos expiradas.",
};

export default function ClienteHistorialScreen() {
  const clientId = useAppStore((state) => state.onboarding?.usuario?.id ?? null);
  const isFocused = useIsFocused();
  const [history, setHistory] = useState<{ clientId: typeof clientId; records: HistoryRecord[] } | null>(null);
  const [activeTab, setActiveTab] = useState<HistoryTab>("activos");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const loadedClient = useRef<typeof clientId | undefined>(undefined);
  const generation = useRef(0);
  const list = useRef<FlatList<HistoryRecord>>(null);

  const reload = useCallback(async (pullToRefresh = false) => {
    const request = ++generation.current;
    setError("");
    setRefreshing(pullToRefresh);
    setLoading(!pullToRefresh && loadedClient.current !== clientId);
    setNow(Date.now());
    try {
      const records = await loadClienteHistory(clientId);
      if (request !== generation.current) return;
      loadedClient.current = clientId;
      setHistory({ clientId, records });
      setNow(Date.now());
    } catch (failure) {
      if (request !== generation.current) return;
      setError(failure instanceof Error ? failure.message : "No se pudo cargar el historial.");
    } finally {
      if (request === generation.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [clientId]);

  useFocusEffect(useCallback(() => {
    void reload();
    return () => {
      generation.current += 1;
      setDetailId(null);
    };
  }, [reload]));

  const records = history && history.clientId === clientId ? history.records : EMPTY_RECORDS;
  const hasLiveCountdown = records.some((record) => record.expiresAt !== null && getHistoryTab(record, now) === "activos");
  useEffect(() => {
    if (!isFocused || !hasLiveCountdown) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [hasLiveCountdown, isFocused]);

  const visible = useMemo(
    () => records.filter((record) => getHistoryTab(record, now) === activeTab),
    [activeTab, now, records],
  );
  const detail = records.find((record) => record.id === detailId);

  function selectTab(tab: HistoryTab) {
    if (tab === activeTab) return;
    setActiveTab(tab);
    list.current?.scrollToOffset({ offset: 0, animated: false });
  }

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <Text style={styles.description}>
          Consulta tus códigos activos, canjeados{"\n"}o expirados.
        </Text>
        <View style={styles.tabs} accessibilityRole="tablist">
          {HISTORY_TABS.map(({ key, label }, index) => (
            <React.Fragment key={key}>
              {index > 0 && <Image source={tabSeparator} style={styles.tabSeparator} resizeMode="stretch" />}
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === key }}
                style={styles.tab}
                onPress={() => selectTab(key)}
              >
                <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.75} style={[styles.tabLabel, activeTab === key && styles.activeTab]}>
                  {label}
                </Text>
              </Pressable>
            </React.Fragment>
          ))}
        </View>
      </View>

      <FlatList
        ref={list}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={visible}
        keyExtractor={(record) => record.id}
        renderItem={({ item }) => <HistoryCard item={item} now={now} onOpen={setDetailId} />}
        ItemSeparatorComponent={HistorySeparator}
        ListHeaderComponent={error ? <HistoryError message={error} onRetry={() => void reload(true)} /> : visible.length ? HistorySeparator : null}
        ListFooterComponent={visible.length ? HistorySeparator : null}
        ListEmptyComponent={loading ? <HistorySkeleton /> : error ? null : <HistoryEmpty tab={activeTab} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void reload(true)} colors={[PURPLE]} />}
        showsVerticalScrollIndicator={false}
      />

      {detail && <HistoryDetail item={detail} now={now} onClose={() => setDetailId(null)} />}
    </View>
  );
}

function HistorySeparator() {
  return <Image source={rowSeparator} style={styles.separator} resizeMode="stretch" />;
}

function HistoryError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.errorWrap} accessibilityLiveRegion="polite">
      <Text style={styles.error}>{message}</Text>
      <Pressable accessibilityRole="button" onPress={onRetry} style={styles.retry}>
        <Text style={styles.retryLabel}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

function HistoryEmpty({ tab }: { tab: HistoryTab }) {
  const active = tab === "activos";
  const redeemed = tab === "canjeados";
  const tintColor = redeemed ? "#1DA1F2" : "#EF4444";
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        {active ? <Image source={badgeIcon} style={styles.emptyBadge} /> : (
          <>
            <Image source={qrIcon} style={[styles.emptyQr, { tintColor }]} />
            <View style={styles.emptyGlyphWrap}>
              <Image source={redeemed ? checkIcon : crossIcon} style={[styles.emptyGlyph, { tintColor }]} />
            </View>
          </>
        )}
      </View>
      <Text style={styles.emptyTitle}>{EMPTY_LABELS[tab]}</Text>
      {active && <Text style={styles.emptyCopy}>Tus códigos aparecerán aquí apenas se generen.</Text>}
    </View>
  );
}

function HistorySkeleton() {
  return (
    <View style={styles.skeleton} accessible accessibilityLabel="Cargando historial" accessibilityState={{ busy: true }}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.skeletonCard}>
          <View style={styles.skeletonHeadline}>
            <View style={[styles.skeletonLine, styles.skeletonTitle]} />
            <View style={[styles.skeletonLine, styles.skeletonStatus]} />
          </View>
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, styles.skeletonShort]} />
          <View style={styles.skeletonFoot}>
            <View style={[styles.skeletonLine, styles.skeletonStatus]} />
            <View style={[styles.skeletonLine, styles.skeletonStatus]} />
            <View style={[styles.skeletonLine, styles.skeletonStatus]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const text = { includeFontPadding: false };
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  hero: { backgroundColor: PURPLE, borderBottomLeftRadius: 21, borderBottomRightRadius: 21, zIndex: 1 },
  description: { ...text, alignSelf: "center", maxWidth: 325, marginHorizontal: 16, paddingTop: 8, paddingBottom: 4, textAlign: "center", color: "#FFFFFF", fontSize: 18, lineHeight: 25, fontWeight: "300" },
  tabs: {
    minHeight: 36, marginTop: 12, paddingHorizontal: 8, paddingVertical: 2, flexDirection: "row",
    alignItems: "center", justifyContent: "center", backgroundColor: "#FAF8FF", borderRadius: 999,
    borderWidth: 1, borderColor: "#FFFFFF99", elevation: 1,
  },
  tab: { alignItems: "center", justifyContent: "center", minHeight: 30, paddingHorizontal: 12, flexShrink: 1 },
  tabLabel: { ...text, color: "#94A3B8", fontSize: 13, fontWeight: "700", letterSpacing: 2.6, lineHeight: 19 },
  activeTab: { color: PURPLE },
  tabSeparator: { width: 1, height: 24, marginHorizontal: 4 },
  list: { flex: 1, backgroundColor: "#FFFFFF" },
  listContent: { flexGrow: 1 },
  separator: { height: 1, width: "100%" },
  empty: { paddingVertical: 100, paddingHorizontal: 16, alignItems: "center" },
  emptyIcon: { width: 64, height: 64, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: "#F3EEFF" },
  emptyBadge: { width: 48, height: 48 },
  emptyQr: { width: 56, height: 56 },
  emptyGlyphWrap: { position: "absolute", width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  emptyGlyph: { width: 14, height: 14 },
  emptyTitle: { ...text, marginTop: 12, fontSize: 17, lineHeight: 23, fontWeight: "600", textAlign: "center", color: "#2F1A55" },
  emptyCopy: { ...text, marginTop: 4, fontSize: 14, lineHeight: 20, textAlign: "center", color: "#62748E" },
  errorWrap: { alignItems: "center", padding: 16, gap: 8 },
  error: { ...text, color: "#B91C1C", fontSize: 14, lineHeight: 20, textAlign: "center" },
  retry: { minHeight: 36, justifyContent: "center", borderRadius: 8, backgroundColor: "#F3EEFF", paddingHorizontal: 16 },
  retryLabel: { ...text, color: PURPLE, fontSize: 14, fontWeight: "600" },
  skeleton: { padding: 16, gap: 12 },
  skeletonCard: { padding: 16, gap: 6, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16, backgroundColor: "#FFFFFF", elevation: 1 },
  skeletonHeadline: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  skeletonLine: { height: 10, borderRadius: 999, backgroundColor: "#F0EBF8" },
  skeletonTitle: { width: "45%", height: 12 },
  skeletonStatus: { width: "18%" },
  skeletonShort: { width: "70%" },
  skeletonFoot: { flexDirection: "row", gap: 8, marginTop: 6 },
});
