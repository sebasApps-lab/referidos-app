import React, { type ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const TIERS = [
  { key: "explorador", label: "Explorador", badge: "E", icon: require("./assets/compass.png") },
  { key: "conector", label: "Conector", badge: "C", icon: require("./assets/link-2.png") },
  { key: "impulsor", label: "Impulsor", badge: "I", icon: require("./assets/rocket.png") },
  { key: "embajador", label: "Embajador", badge: "B", icon: require("./assets/crown.png") },
];

const BENEFITS = [
  { title: "Promos curadas", description: "Recomendaciones simples según tu actividad.", icon: require("./assets/sparkles.png"), color: "#5E30A5" },
  { title: "Invita y suma", description: "Cada referido te acerca a beneficios.", icon: require("./assets/gift.png"), color: "#4B2488" },
  { title: "Explora rápido", description: "Filtra por sector sin fricciones.", icon: require("./assets/compass.png"), color: "#2F1A55" },
  { title: "Cuenta segura", description: "Controla accesos y notificaciones.", icon: require("./assets/shield-check.png"), color: "#5E30A5" },
];

type ClienteTierData = {
  tier?: string;
  nivel?: string;
  plan?: string;
  puntos?: number | string;
  puntosAcumulados?: number | string;
  referidosCount?: number | string;
} | null;

function tierIndex(user: ClienteTierData) {
  const current = String(user?.tier || user?.nivel || user?.plan || "explorador").toLowerCase();
  return Math.max(0, TIERS.findIndex(({ key }) => key === current));
}

function compactNumber(number: number) {
  if (number < 1000) return String(number);
  if (number < 1000000) return `${(number / 1000).toFixed(1)}k`;
  return `${(number / 1000000).toFixed(1)}m`;
}

export function InicioHero({ user, search }: { user: ClienteTierData; search: ReactNode }) {
  const currentIndex = tierIndex(user);
  const current = TIERS[currentIndex];
  const next = TIERS[Math.min(currentIndex + 1, TIERS.length - 1)];
  const rawPoints = Number(user?.puntos || user?.puntosAcumulados || user?.referidosCount || 0);
  const points = Number.isFinite(rawPoints) ? Math.max(0, rawPoints) : 0;
  const goal = points < 120 ? 120 : points < 320 ? 320 : 600;
  const progress = Math.min(100, Math.round((points / goal) * 100));
  const referrals = Math.min(99, Math.max(0, Number(user?.referidosCount) || 0));

  return (
    <View style={styles.hero}>
      <View style={styles.heroContent}>
        <View style={styles.progress} accessibilityRole="progressbar" accessibilityValue={{ min: 0, now: Math.min(points, goal), max: goal }}>
          <Image
            source={require("./assets/progress-fill.png")}
            resizeMode="stretch"
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
          <Text style={styles.progressLabel}>{compactNumber(points)} / {compactNumber(goal)}</Text>
        </View>

        <View style={styles.tierRow}>
          <View style={styles.tierColumn}>
            <View style={styles.tierNameRow}>
              <Image source={current.icon} style={styles.tierIcon} />
              <Text style={styles.tierName} numberOfLines={1}>{current.label}</Text>
            </View>
            <Text style={styles.tierCaption}>ACTUAL</Text>
          </View>
          <View style={styles.referrals}>
            <Text style={styles.referralsText}>Referidos</Text>
            <Text style={styles.referralsText}>{referrals}</Text>
          </View>
          <View style={[styles.tierColumn, styles.nextTier]}>
            <View style={[styles.tierNameRow, styles.nextTierName]}>
              <Image source={next.icon} style={styles.tierIcon} />
              <Text style={styles.tierName} numberOfLines={1}>{next.label}</Text>
            </View>
            <Text style={styles.tierCaption}>SIGUIENTE</Text>
          </View>
        </View>

        <Text style={styles.heroCopy}>Encuentra promos y suma puntos sin complicarte.</Text>
        <View style={styles.heroSearch}>{search}</View>
      </View>
    </View>
  );
}

export function InicioBeneficios({ user }: { user: ClienteTierData }) {
  const tier = TIERS[tierIndex(user)];

  return (
    <View style={styles.benefits}>
      <View style={styles.benefitsHeader}>
        <View style={styles.benefitDescription}>
          <Text style={styles.benefitTitle}>Beneficios de tu tier</Text>
          <Text style={styles.benefitCopy}>Nivel actual: {tier.label}</Text>
        </View>
        <Text style={styles.activeBadge}>{tier.badge} Activo</Text>
      </View>
      <View style={styles.benefitList}>
        {BENEFITS.map((benefit, index) => (
          <View key={benefit.title} style={[styles.benefit, index > 0 && styles.benefitDivider]}>
            <View style={[styles.benefitIconBox, { backgroundColor: benefit.color }]}>
              <Image source={benefit.icon} style={styles.benefitIcon} />
            </View>
            <View style={styles.benefitDescription}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={[styles.benefitCopy, styles.benefitDetails]}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#5E30A5",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 1,
  },
  heroContent: { alignSelf: "center", width: "100%", maxWidth: 1152, paddingHorizontal: 16, paddingBottom: 12 },
  progress: { height: 20, borderRadius: 10, backgroundColor: "#FFFFFF26", overflow: "hidden", justifyContent: "center", alignItems: "flex-end" },
  progressFill: { position: "absolute", left: 0, top: 0, bottom: 0, height: "100%", borderRadius: 10 },
  progressLabel: { paddingRight: 12, color: "#FFFFFFD9", fontSize: 11, fontWeight: "500", lineHeight: 16, includeFontPadding: false },
  tierRow: { flexDirection: "row", alignItems: "flex-end", gap: 12, marginTop: 12 },
  tierColumn: { flex: 1, gap: 4, alignItems: "flex-start" },
  nextTier: { alignItems: "flex-end" },
  tierNameRow: { flexDirection: "row", gap: 8, alignItems: "center", maxWidth: "100%" },
  nextTierName: { opacity: 0.7 },
  tierIcon: { width: 14, height: 14, tintColor: "#FFFFFF" },
  tierName: { flexShrink: 1, color: "#FFFFFF", fontSize: 12, fontWeight: "600", lineHeight: 16, includeFontPadding: false },
  tierCaption: { color: "#FFFFFF99", fontSize: 9, letterSpacing: 1.8, lineHeight: 14, includeFontPadding: false },
  referrals: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12, borderRadius: 999, borderWidth: 1, borderColor: "#FFFFFF40", backgroundColor: "#FFFFFF1A", paddingHorizontal: 10, paddingVertical: 2 },
  referralsText: { color: "#E5D6FF", fontSize: 11, fontWeight: "600", lineHeight: 16, includeFontPadding: false },
  heroCopy: { alignSelf: "center", maxWidth: 275, marginTop: 16, color: "#FFFFFF", fontSize: 18, fontWeight: "300", lineHeight: 25, textAlign: "center", includeFontPadding: false },
  heroSearch: { marginTop: 20 },
  benefits: { marginTop: 40, paddingHorizontal: 16, paddingBottom: 24 },
  benefitsHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  benefitDescription: { flex: 1 },
  benefitTitle: { fontSize: 14, lineHeight: 20, fontWeight: "600", color: "#2F1A55", includeFontPadding: false },
  benefitCopy: { fontSize: 12, lineHeight: 16, color: "#64748B", includeFontPadding: false },
  benefitDetails: { marginTop: 4, lineHeight: 19 },
  activeBadge: { borderRadius: 999, borderWidth: 1, borderColor: "#E9E2F7", paddingHorizontal: 12, paddingVertical: 4, backgroundColor: "#F3EEFF", color: "#5E30A5", fontSize: 11, fontWeight: "600", lineHeight: 16, includeFontPadding: false },
  benefitList: { marginTop: 16 },
  benefit: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 12 },
  benefitDivider: { borderTopWidth: 1, borderTopColor: "#E9E2F7" },
  benefitIconBox: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  benefitIcon: { width: 18, height: 18, tintColor: "#FFFFFF" },
});
