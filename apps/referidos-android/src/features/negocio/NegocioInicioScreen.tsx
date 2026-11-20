import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View,
  type ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { TAB_ROUTES } from "@navigation/routeKeys";
import {
  fetchBusinessByUserId, fetchBranchesByBusinessId, fetchCurrentUserRow,
  fetchPromosByBusinessId, formatDateTime, readFirst,
} from "@shared/services/entityQueries";

const PURPLE = "#5E30A5";
const TEXT = "#2F1A55";
const BORDER = "#E9E2F7";
const STATUS = {
  activo: { title: "Activas", label: "Activa", color: "#047857", tint: "#10B98122" },
  pendiente: { title: "Pendientes", label: "Pendiente", color: "#A15C05", tint: "#F59E0B22" },
  inactivo: { title: "Inactivas", label: "Inactiva", color: "#64748B", tint: "#94A3B822" },
};
type PromoStatus = keyof typeof STATUS;
const states = Object.keys(STATUS) as PromoStatus[];
const benefits = [
  { title: "Promos mejor posicionadas", description: "Destaca tus ofertas en momentos clave.", icon: require("@navigation/assets/sparkles.png"), color: PURPLE },
  { title: "Métricas claras", description: "Entiende el impacto de cada promoción.", icon: require("@navigation/assets/trending-up.png"), color: "#4B2488" },
  { title: "Soporte confiable", description: "Atención prioritaria para tu equipo.", icon: require("@navigation/assets/shield-check.png"), color: TEXT },
] as const;

function promoStatus(promo: any): PromoStatus {
  const status = String(readFirst(promo, ["estado", "status"], "")).trim().toLowerCase();
  if (status === "activo" || status === "active" || status === "activa") return "activo";
  if (status.startsWith("pend") || status === "draft") return "pendiente";
  return "inactivo";
}

export default function NegocioInicioScreen() {
  const navigation = useNavigation<any>();
  const onboarding = useAppStore((state) => state.onboarding);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [business, setBusiness] = useState<any>(onboarding?.negocio || null);
  const [branch, setBranch] = useState<any>(null);
  const [promos, setPromos] = useState<any[]>([]);
  const [filter, setFilter] = useState<PromoStatus | null>(null);
  const userId = onboarding?.usuario?.id;

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const currentUserId = userId || (await fetchCurrentUserRow(supabase)).data?.id;
      if (!currentUserId) throw new Error("No se pudo resolver tu cuenta de negocio.");
      const found = await fetchBusinessByUserId(supabase, currentUserId);
      if (!found.ok || !found.data?.id) throw new Error("No se encontró un negocio asociado.");
      setBusiness(found.data);
      const [branches, promotions] = await Promise.all([
        fetchBranchesByBusinessId(supabase, found.data.id, 20),
        fetchPromosByBusinessId(supabase, found.data.id, 12),
      ]);
      if (branches.ok) setBranch(branches.data[0] || null);
      if (!promotions.ok) throw new Error("No se pudieron cargar tus promos.");
      setPromos(promotions.data);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "No se pudieron cargar tus promos.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { void loadDashboard(); }, [loadDashboard]);

  async function refresh() {
    setRefreshing(true);
    try {
      await bootstrapAuth();
      await loadDashboard();
    } finally {
      setRefreshing(false);
    }
  }

  const counts = useMemo(() => {
    const result = { activo: 0, pendiente: 0, inactivo: 0 };
    for (const promo of promos) result[promoStatus(promo)] += 1;
    return result;
  }, [promos]);
  const visible = (filter ? promos.filter((promo) => promoStatus(promo) === filter) : promos).slice(0, 3);

  const name = String(readFirst(business, ["nombre"], "Tu negocio"));
  const category = String(readFirst(business, ["categoria", "sector"], "Sin sector"));
  const address = String(readFirst(branch?.direccion || onboarding?.address || business, ["calles", "direccion", "sector"], "Ubicación por definir"));
  const image = readFirst(business, ["imagen", "logo", "avatar_url"], null);
  const plan = String(readFirst(business || onboarding?.usuario, ["plan", "tier"], "Base"));
  const toManagement = () => navigation.navigate(TAB_ROUTES.NEGOCIO.GESTIONAR);
  const createPromotion = () => navigation.navigate(TAB_ROUTES.NEGOCIO.GESTIONAR, { createPromo: Date.now() });
  const toProfile = () => navigation.navigate(TAB_ROUTES.NEGOCIO.PERFIL, { profileSection: "benefits", openAt: Date.now() });

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={PURPLE} colors={[PURPLE]} />}
    >
      <View style={styles.hero}>
        <View style={styles.identity}>
          <Image
            source={typeof image === "string" && /^https?:\/\//i.test(image)
              ? { uri: image }
              : require("../../../../referidos-app/src/assets/bg-home.png")}
            style={styles.logo}
            accessibilityLabel={`Logo de ${name}`}
          />
          <View style={styles.business}>
            <View style={styles.between}>
              <Text accessibilityRole="header" style={styles.name} numberOfLines={2}>{name}</Text>
              <Text style={styles.role}>NEGOCIO</Text>
            </View>
            <View style={styles.locationRow}>
              <View style={styles.hintWithIcon}>
                <Image source={require("@navigation/assets/store.png")} style={styles.heroTinyIcon} />
                <Text style={styles.heroHint}>{category}</Text>
              </View>
              <View style={styles.hintWithIcon}>
                <Image source={require("@navigation/assets/map-pin.png")} style={styles.heroTinyIcon} />
                <Text style={styles.heroHint} numberOfLines={2}>{address}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.between}>
          <View style={styles.inline}>
            <Text style={styles.plan}>Plan {plan}</Text>
            <Action label="VER BENEFICIOS" onPress={toProfile} variant="link" />
          </View>
          <Action label="Mejorar" onPress={toProfile} variant="outlineLight" icon={require("@navigation/assets/crown.png")} iconColor="#FFC21C" />
        </View>
        <View style={styles.kpis}>
          {states.map((status) => (
            <View key={status} style={styles.heroKpi}>
              <Text style={styles.heroKpiLabel}>{STATUS[status].title}</Text>
              <Text style={styles.heroKpiValue}>{counts[status]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.heroActions}>
          <Action label="Crear promo" onPress={createPromotion} variant="white" />
          <View style={styles.inline}>
            <Action label="Gestionar" onPress={toManagement} variant="outlineLight" icon={require("@navigation/assets/tab-layout-grid.png")} />
            <Action label="Ver métricas" onPress={toManagement} variant="outlineLight" icon={require("@navigation/assets/chart.png")} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.between}>
          <View style={styles.flex}>
            <Text accessibilityRole="header" style={styles.sectionTitle}>Promos</Text>
            <Text style={styles.hint}>Resumen rápido de tus promociones actuales.</Text>
          </View>
          <Action label="Ver todas" onPress={toManagement} variant="outline" />
        </View>
        {loading && !promos.length ? (
          <BlockSkeleton lines={4} compact />
        ) : error ? (
          <View style={styles.card}>
            <Text style={styles.hint}>{error}</Text>
            <Action label="Reintentar" onPress={loadDashboard} />
          </View>
        ) : (
          <>
            <View style={styles.kpis}>
              {states.map((status) => (
                <Pressable key={status} accessibilityRole="button" accessibilityState={{ selected: status === filter }}
                  onPress={() => setFilter(status === filter ? null : status)} style={[styles.filter, status === filter && styles.selected]}>
                  <Text style={styles.filterLabel}>{STATUS[status].title}</Text>
                  <Text style={styles.filterValue}>{counts[status]}</Text>
                </Pressable>
              ))}
            </View>
            {visible.length ? visible.map((promo) => {
              const meta = STATUS[promoStatus(promo)];
              return (
                <View key={promo.id} style={styles.card}>
                  <View style={styles.between}>
                    <View style={styles.flex}>
                      <Text style={styles.cardTitle}>{promo.titulo || "Promo"}</Text>
                      <Text style={styles.hint} numberOfLines={2}>{promo.descripcion || "Sin descripción"}</Text>
                    </View>
                    <Text style={[styles.status, { color: meta.color, backgroundColor: meta.tint }]}>{meta.label}</Text>
                  </View>
                  <View style={styles.dateRow}>
                    <Image source={require("@navigation/assets/calendar.png")} style={styles.calendar} />
                    <Text style={styles.date}>{formatDateTime(promo.fechacreacion || promo.inicio)}</Text>
                  </View>
                </View>
              );
            }) : <Text style={styles.empty}>{filter ? "No hay promociones para este estado." : "Todavía no tienes promociones."}</Text>}
            <View style={styles.inline}>
              <Action label="Gestionar promos" onPress={toManagement} />
              <Action label="Crear promo" onPress={createPromotion} variant="outline" />
            </View>
          </>
        )}
      </View>
      {!error && (
        <View style={[styles.section, styles.benefits]}>
          <View style={styles.between}>
            <View style={styles.flex}>
              <Text accessibilityRole="header" style={styles.cardTitle}>Beneficios de tu plan</Text>
              <Text style={styles.hint}>Plan actual: {plan}</Text>
            </View>
            <Text style={styles.currentPlan}>Activo</Text>
          </View>
          {benefits.map(({ title, description, icon, color }) => (
            <View key={title} style={styles.card}>
              <View style={[styles.benefitIcon, { backgroundColor: color }]}>
                <Image source={icon} style={styles.benefitGlyph} />
              </View>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.hint}>{description}</Text>
            </View>
          ))}
          <View style={[styles.card, styles.between, styles.planCard]}>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Desbloquea más alcance</Text>
              <Text style={styles.hint}>Explora planes con mayor visibilidad.</Text>
            </View>
            <Action label="Ver planes" onPress={toProfile} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

type Variant = "solid" | "white" | "outlineLight" | "outline" | "link";
function Action({ label, onPress, variant = "solid", icon, iconColor = "#FFFFFF" }: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: ImageSourcePropType;
  iconColor?: string;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.action, actionStyles[variant]]}>
      {icon && <Image source={icon} style={[styles.actionIcon, { tintColor: iconColor }]} />}
      <Text style={[styles.actionText, (variant === "white" || variant === "outline") && styles.actionPurple]}>{label}</Text>
    </Pressable>
  );
}

const actionStyles = StyleSheet.create({
  solid: { backgroundColor: PURPLE },
  white: { backgroundColor: "#FFFFFF" },
  outlineLight: { backgroundColor: "#FFFFFF1A", borderColor: "#FFFFFF4D", borderWidth: 1 },
  outline: { borderColor: BORDER, borderWidth: 1, backgroundColor: "#FFFFFF" },
  link: { paddingHorizontal: 0 },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FAF8FF" },
  content: { paddingBottom: 28 },
  flex: { flex: 1 },
  hero: { backgroundColor: PURPLE, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20, gap: 16, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  identity: { flexDirection: "row", alignItems: "flex-start", gap: 16 },
  logo: { width: 64, height: 64, borderRadius: 16, backgroundColor: "#FFFFFF1A", borderWidth: 1, borderColor: "#FFFFFF33" },
  business: { flex: 1, gap: 4 },
  name: { flex: 1, color: "#FFFFFF", fontSize: 20, lineHeight: 25, fontWeight: "600" },
  role: { backgroundColor: "#3B1A66", paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, color: "#FFFFFF", fontSize: 10, fontWeight: "600", letterSpacing: 1.8 },
  heroHint: { fontSize: 11, color: "#FFFFFFBF" },
  locationRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  hintWithIcon: { flexDirection: "row", alignItems: "center", gap: 4 },
  heroTinyIcon: { width: 12, height: 12, tintColor: "#FFFFFFBF" },
  plan: { color: "#FFFFFFE6", backgroundColor: "#FFFFFF1A", borderColor: "#FFFFFF33", borderWidth: 1, borderRadius: 24, paddingHorizontal: 12, paddingVertical: 4, fontSize: 11, fontWeight: "600" },
  between: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  inline: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 12 },
  kpis: { flexDirection: "row", gap: 8 },
  heroKpi: { flex: 1, borderWidth: 1, borderColor: "#FFFFFF26", borderRadius: 16, backgroundColor: "#FFFFFF1A", padding: 8, alignItems: "center" },
  heroKpiLabel: { color: "#FFFFFF99", fontSize: 10, lineHeight: 15, textTransform: "uppercase", letterSpacing: 1.5 },
  heroKpiValue: { color: "#FFFFFF", fontSize: 18, lineHeight: 24, fontWeight: "600" },
  heroActions: { alignItems: "center", gap: 12, paddingTop: 4 },
  action: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingHorizontal: 14, borderRadius: 12, minHeight: 32, paddingVertical: 7 },
  actionText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  actionIcon: { width: 14, height: 14 },
  actionPurple: { color: PURPLE },
  section: { marginTop: 32, paddingHorizontal: 16, gap: 14 },
  sectionTitle: { color: TEXT, fontSize: 20, fontWeight: "700" },
  hint: { fontSize: 12, color: "#64748B", lineHeight: 18 },
  filter: { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: BORDER, backgroundColor: "#FFFFFF", alignItems: "center", paddingVertical: 12, gap: 4 },
  selected: { borderColor: PURPLE, backgroundColor: "#F3EEFF" },
  filterLabel: { fontSize: 10, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.3 },
  filterValue: { fontSize: 20, color: TEXT, fontWeight: "600" },
  card: { borderRadius: 16, borderWidth: 1, borderColor: BORDER, backgroundColor: "#FFFFFF", padding: 16, gap: 4, elevation: 1 },
  cardTitle: { fontSize: 14, color: TEXT, fontWeight: "600" },
  status: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, overflow: "hidden", fontSize: 10, fontWeight: "600" },
  date: { fontSize: 11, color: "#64748B" },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 8 },
  calendar: { width: 12, height: 12, tintColor: "#64748B" },
  empty: { paddingVertical: 24, paddingHorizontal: 16, textAlign: "center", backgroundColor: "#FFFFFF", borderRadius: 16, borderStyle: "dashed", borderWidth: 1, borderColor: BORDER, color: "#64748B", fontSize: 12 },
  benefits: { marginTop: 40 },
  currentPlan: { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: "#F3EEFF", color: PURPLE, borderRadius: 20, overflow: "hidden", fontSize: 11, fontWeight: "600" },
  benefitIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  benefitGlyph: { width: 18, height: 18, tintColor: "#FFFFFF" },
  planCard: { backgroundColor: "#F6F1FF" },
});
