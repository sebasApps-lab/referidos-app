import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StaffScreenScaffold from "@features/staff/StaffScreenScaffold";
import { staffIcons } from "@features/staff/staffNavigation";
import { STACK_ROUTES } from "@navigation/routeKeys";
import { fetchLatestReleases } from "@shared/services/versioningService";
import { formatDateTime } from "@shared/services/entityQueries";
import { fetchDlqPreview, formatDlqBytes, type DlqGroup, type DlqPreview } from "./components/TelemetryDlqData";

const PRODUCTS = [
  { key: "prelaunch_web", label: "Prelaunch", subtitle: "Landing y funnel de pre-registro", ready: true },
  { key: "referidos_app", label: "Referidos App", subtitle: "App principal publicada en producción", ready: false },
] as const;

type Release = { product_key: string; version_label?: string; build_number?: number; created_at?: string };

export default function AdminDashboardScreen() {
  const navigation = useNavigation<any>();
  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);
  const [releaseError, setReleaseError] = useState(false);
  const [dlq, setDlq] = useState<DlqPreview | null>(null);
  const [dlqError, setDlqError] = useState(false);
  const pending = useRef(true);
  const refresh = useCallback(() => {
    if (pending.current) return;
    pending.current = true;
    setRefreshing(true);
    setRequest((value) => value + 1);
  }, []);

  useEffect(() => {
    let active = true;
    void Promise.allSettled([fetchLatestReleases("prod"), fetchDlqPreview()]).then(([versions, queue]) => {
      if (!active) return;
      setReleaseError(versions.status === "rejected");
      setDlqError(queue.status === "rejected");
      if (versions.status === "fulfilled") setReleases(Array.isArray(versions.value) ? versions.value : []);
      if (queue.status === "fulfilled") setDlq(queue.value);
      pending.current = false;
      setLoading(false);
      setRefreshing(false);
    });
    return () => { active = false; };
  }, [request]);

  const openEvents = (group?: DlqGroup) => navigation.navigate(STACK_ROUTES.ADMIN.DLQ, {
    groupKey: group?.group_key || "",
    group: group ? {
      group_key: group.group_key,
      reason: group.reason,
      domain: group.domain,
      source_project_ref: group.source_project_ref,
      source_env_key: group.source_env_key,
    } : undefined,
  });
  const updating = loading || refreshing;
  const metrics = [
    ["Siguiente purge", dlq?.summary?.next_purge_at ? formatDateTime(dlq.summary.next_purge_at) : "Sin programación"],
    ["Eventos", dlq?.summary?.total_events ?? 0],
    ["Grupos", dlq?.summary?.total_groups ?? 0],
    ["Peso aprox.", formatDlqBytes(dlq?.summary?.approx_raw_event_bytes ?? 0)],
  ];
  return (
    <StaffScreenScaffold title="Dashboard" subtitle="Acceso central al estado productivo y analytics por app" onRefresh={updating ? undefined : refresh}>
      <ScrollView contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
        <View style={[styles.card, styles.intro]}>
          <View>
            <Text style={styles.eyebrow}>Dashboard</Text>
            <Text accessibilityRole="header" style={[styles.headline, styles.headingSpace]}>Estado productivo por app</Text>
            <Text style={[styles.body, styles.introCopy]}>
              Este bloque muestra la versión que está realmente en línea en producción. Desde aquí puedes entrar al analytics del producto seleccionado.
            </Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityState={{ disabled: updating }} disabled={updating}
            onPress={refresh} style={[styles.refreshButton, updating && styles.disabled]}>
            <Image source={staffIcons.refresh} style={styles.refreshIcon} />
            <Text style={styles.refreshLabel}>{refreshing ? "Actualizando…" : "Actualizar"}</Text>
          </Pressable>
        </View>
        {releaseError ? <Text style={styles.error}>No se pudieron cargar las versiones de producción.</Text> : null}
        {loading && !releases.length ? (
          <View style={[styles.card, styles.loadingCard]}><Text style={styles.body}>Cargando versiones productivas…</Text></View>
        ) : (
          <View style={styles.products}>
            {PRODUCTS.map((product) => {
          const release = releases.find((row) => row.product_key === product.key);
          return (
            <Pressable key={product.key} accessibilityRole="button" style={[styles.card, styles.productCard]} onPress={() => navigation.navigate(
              STACK_ROUTES.ADMIN.ANALYTICS, { product: product.key },
            )}>
              <View style={[styles.row, styles.productHeader]}>
                <View style={styles.column}>
                  <Text style={styles.eyebrow}>Producción</Text>
                  <Text style={[styles.product, styles.productName]}>{product.label}</Text>
                  <Text style={styles.body}>{product.subtitle}</Text>
                </View>
                <View style={styles.mark}>
                  <Image source={product.key === "prelaunch_web"
                    ? require("@features/cliente/inicio/assets/rocket.png")
                    : require("@navigation/assets/monitor-smartphone.png")} style={styles.icon} />
                </View>
              </View>
              <View style={styles.version}>
                <Text style={styles.eyebrow}>Versión en línea</Text>
                <Text style={styles.release}>{release?.version_label || "Sin release prod"}</Text>
                <View style={styles.versionMeta}>
                  <Text style={styles.meta}>{release?.build_number ? `build ${release.build_number}` : "build —"}</Text>
                  <Text style={styles.meta}>Deploy: {release?.created_at ? formatDateTime(release.created_at) : "—"}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.productFooter]}>
                <Text style={[styles.body, styles.footerCopy]}>{product.ready ? "Abrir analytics" : "Analytics de esta app próximamente"}</Text>
                <View style={styles.panelAction}>
                  <Text style={styles.action}>Ir al panel</Text>
                  <Image source={require("@features/cliente/inicio/assets/arrow-left.png")} style={styles.forwardIcon} />
                </View>
              </View>
            </Pressable>
          );
            })}
          </View>
        )}

        <View style={[styles.card, styles.queue]}>
          <Text style={styles.queueTag}>BORRADO DLQ</Text>
          <Text accessibilityRole="header" style={[styles.headline, styles.orange]}>Errores que se borran en el siguiente ciclo</Text>
          <Text style={styles.body}>Vista previa de los eventos fallidos de telemetría que cumplieron el período de retención.</Text>
          {dlqError ? <Text style={styles.error}>No se pudo cargar la vista previa.</Text> : null}
          {dlq && (
            <>
              {metrics.map(([label, value]) => (
                <View key={label} style={styles.queueCard}>
                  <Text style={styles.eyebrow}>{label}</Text>
                  <Text style={[styles.product, styles.orange]}>{value}</Text>
                </View>
              ))}
              {(Array.isArray(dlq.groups) ? dlq.groups : []).map((group) => (
                <Pressable key={group.group_key} accessibilityRole="button" style={styles.queueCard} onPress={() => openEvents(group)}>
                  <Text style={[styles.group, styles.orange]}>{group.reason || "Sin motivo reportado"}</Text>
                  <View style={styles.versionMeta}>
                    <Text style={styles.meta}>Dominio: {group.domain || "Sin dominio"}</Text>
                    <Text style={styles.meta}>Proyecto: {group.source_project_ref || "Sin proyecto"}</Text>
                    <Text style={styles.meta}>Entorno: {group.source_env_key || "Sin entorno"}</Text>
                  </View>
                  <Text style={styles.body}>{group.event_count ?? 0} eventos · {formatDlqBytes(group.approx_raw_event_bytes)}</Text>
                  <Text style={[styles.action, styles.orange]}>Ver eventos ›</Text>
                </Pressable>
              ))}
            </>
          )}
          <Pressable accessibilityRole="button" onPress={() => openEvents()}><Text style={[styles.action, styles.orange]}>Ver todos los eventos</Text></Pressable>
        </View>
      </ScrollView>
    </StaffScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: { gap: 24, paddingBottom: 24 },
  card: { borderRadius: 24, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", padding: 20, gap: 12, elevation: 1 },
  intro: { gap: 16 },
  headingSpace: { marginTop: 8 },
  introCopy: { marginTop: 8 },
  refreshButton: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingVertical: 8 },
  refreshIcon: { width: 16, height: 16, tintColor: "#2F1A55" },
  refreshLabel: { color: "#2F1A55", fontSize: 14, lineHeight: 20, fontWeight: "600" },
  disabled: { opacity: 0.6 },
  loadingCard: { borderRadius: 16, padding: 24 },
  products: { gap: 16 },
  productCard: { gap: 0 },
  eyebrow: { color: "#94A3B8", fontSize: 11, lineHeight: 16, fontWeight: "600", letterSpacing: 2, textTransform: "uppercase", includeFontPadding: false },
  headline: { color: "#2F1A55", fontSize: 24, lineHeight: 30, fontWeight: "800" },
  product: { color: "#2F1A55", fontSize: 20, lineHeight: 28, fontWeight: "800" },
  productHeader: { alignItems: "flex-start", gap: 16 },
  productName: { marginTop: 4 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  column: { flex: 1, gap: 4 },
  mark: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#F4EEFF", alignItems: "center", justifyContent: "center" },
  icon: { width: 22, height: 22, tintColor: "#5E30A5" },
  body: { color: "#64748B", fontSize: 14, lineHeight: 20, includeFontPadding: false },
  version: { marginTop: 20, borderRadius: 16, borderWidth: 1, borderColor: "#EFE8FB", backgroundColor: "#FBF9FF", padding: 16, gap: 8 },
  versionMeta: { flexDirection: "row", flexWrap: "wrap", columnGap: 16, rowGap: 4 },
  meta: { color: "#64748B", fontSize: 12, lineHeight: 16, includeFontPadding: false },
  release: { color: "#5E30A5", fontSize: 24, lineHeight: 32, fontWeight: "800", includeFontPadding: false },
  productFooter: { marginTop: 16 },
  footerCopy: { flexShrink: 1 },
  panelAction: { flexDirection: "row", alignItems: "center", gap: 8 },
  forwardIcon: { width: 16, height: 16, tintColor: "#5E30A5", transform: [{ rotate: "180deg" }] },
  action: { color: "#5E30A5", fontWeight: "700", fontSize: 14 },
  error: { color: "#B91C1C", backgroundColor: "#FEF2F2", borderRadius: 12, padding: 12 },
  queue: { borderColor: "#F1DCCB", backgroundColor: "#FFF8F2" },
  queueCard: { borderColor: "#F1DCCB", borderWidth: 1, borderRadius: 16, backgroundColor: "#FFFFFF", padding: 16, gap: 4 },
  queueTag: { color: "#9A3412", fontSize: 11, fontWeight: "700", letterSpacing: 1.6 },
  orange: { color: "#7C2D12" },
  group: { fontSize: 15, fontWeight: "700" },
});
