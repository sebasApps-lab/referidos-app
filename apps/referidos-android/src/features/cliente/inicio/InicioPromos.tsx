import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, AppState, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export type PromoItem = {
  detailId?: string;
  id: string;
  title: string;
  description: string;
  local: string;
  location: string;
  image: string;
  expires: string;
  createdAt: number;
  redemptions: number;
  link: string;
};

type Variant = "nuevas" | "cercanas" | "hot";

function PromoImage({ uri }: { uri: string }) {
  return <View style={styles.imageSurface}>{uri ? <Image accessible={false} resizeMode="cover" source={{ uri }} style={StyleSheet.absoluteFill} /> : null}</View>;
}

const locationIcon = require("./assets/map-pin.png");
const calendarIcon = require("./assets/calendar.png");

export function PromoCard({ promo, variant, width, onPress }: { promo: PromoItem; variant: Variant; width?: number; onPress: () => void }) {
  if (variant === "hot") {
    return (
      <Pressable accessibilityRole="button" onPress={onPress} style={[styles.card, styles.hotCard, { width }]}>
        <View style={styles.hotPromoImage}><PromoImage uri={promo.image} /></View>
        <Image accessible={false} source={require("./assets/hot-sparkles-overlay.png")} resizeMode="cover" style={styles.hotSparkles} />
        <Image accessible={false} source={require("./assets/embers-bg.png")} resizeMode="cover" style={styles.embers} />
        <View style={styles.hotContent}>
          <View style={styles.hotBadgeRow}>
            <Image accessible={false} source={require("./assets/badge-promo-hot.png")} resizeMode="contain" style={styles.hotBadge} />
            <Text numberOfLines={1} style={styles.hotLocal}>{promo.local}</Text>
          </View>
          <Text numberOfLines={2} style={styles.hotTitle}>{promo.title}</Text>
          <Text numberOfLines={3} style={styles.hotDescription}>{promo.description}</Text>
          <View style={styles.hotDivider} />
          <View style={styles.metaRow}>
            <Image source={locationIcon} style={[styles.metaIcon, styles.hotPin]} />
            <Text numberOfLines={1} style={styles.hotMeta}>{promo.local}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  const nearby = variant === "cercanas";
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.card, nearby ? styles.nearbyCard : styles.newCard, { width }]}>
      <View style={nearby ? styles.nearbyImage : styles.newImage}>
        <PromoImage uri={promo.image} />
      </View>
      <View style={nearby ? styles.nearbyContent : styles.newContent}>
        <Text numberOfLines={nearby ? 2 : 1} style={[styles.title, nearby && styles.nearbyTitle]}>{promo.title}</Text>
        <Text numberOfLines={nearby ? 3 : 2} style={[styles.description, nearby && styles.nearbyDescription]}>{promo.description}</Text>
        {nearby && <View style={styles.divider} />}
        <Text numberOfLines={1} style={styles.local}>{promo.local}</Text>
        <View style={styles.metaList}>
          <View style={styles.metaRow}>
            <Image source={locationIcon} style={styles.metaIcon} />
            <Text numberOfLines={1} style={styles.meta}>{promo.location}</Text>
          </View>
          {nearby && promo.expires !== "" && (
            <View style={styles.metaRow}>
              <Image source={calendarIcon} style={styles.metaIcon} />
              <Text numberOfLines={1} style={styles.meta}>Hasta {promo.expires}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export function PromoSection({ title, variant, promos, viewportWidth, autoScroll = false, onOpenPromo }: {
  title: string;
  variant: Variant;
  promos: PromoItem[];
  viewportWidth: number;
  autoScroll?: boolean;
  onOpenPromo: (promo: PromoItem) => void;
}) {
  const row = useRef<ScrollView>(null);
  const position = useRef(0);
  const lastDragAt = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(true);
  const cardWidth = variant === "hot" ? Math.min(310, viewportWidth - 16)
    : variant === "nuevas" ? (viewportWidth >= 640 ? 420 : (viewportWidth - 16) * 0.9)
    : (viewportWidth >= 640 ? 340 : (viewportWidth - 16) * 0.88);
  const step = cardWidth + 8;
  const maxOffset = promos.length * step + 8 - viewportWidth;

  useEffect(() => {
    if (!autoScroll) return;
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReducedMotion(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReducedMotion);
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, [autoScroll]);

  useEffect(() => {
    if (!autoScroll || reducedMotion || maxOffset <= 0) return;
    const timer = setInterval(() => {
      if (AppState.currentState !== "active" || Date.now() - lastDragAt.current < 4000) return;
      const next = position.current >= maxOffset - 2 ? 0 : Math.min(maxOffset, position.current + step);
      row.current?.scrollTo({ x: next, animated: true });
    }, 5000);
    return () => clearInterval(timer);
  }, [autoScroll, reducedMotion, maxOffset, step]);

  if (promos.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        ref={row}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.row}
        scrollEventThrottle={64}
        onScroll={(event) => { position.current = event.nativeEvent.contentOffset.x; }}
        onScrollBeginDrag={() => { lastDragAt.current = Date.now(); }}
        onScrollEndDrag={() => { lastDragAt.current = Date.now(); }}
      >
        {promos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} width={cardWidth} variant={variant} onPress={() => onOpenPromo(promo)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  sectionTitle: { marginHorizontal: 8, marginBottom: 12, fontSize: 18, fontWeight: "600", lineHeight: 27, color: "#2F1A55", includeFontPadding: false },
  row: { gap: 8, paddingHorizontal: 8, paddingVertical: 8, alignItems: "stretch" },
  card: { overflow: "hidden", borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", elevation: 1 },
  imageSurface: { flex: 1, backgroundColor: "#F3EEFF" },
  nearbyCard: { minWidth: 0 },
  nearbyImage: { height: 160 },
  nearbyContent: { padding: 16 },
  newCard: { flexDirection: "row", aspectRatio: 2.5, minHeight: 124 },
  newImage: { width: 128 },
  newContent: { flex: 1, padding: 16 },
  title: { color: "#2F1A55", fontSize: 14, fontWeight: "600", lineHeight: 20, includeFontPadding: false },
  nearbyTitle: { fontSize: 16, lineHeight: 24 },
  description: { marginTop: 4, color: "#64748B", fontSize: 12, lineHeight: 16, includeFontPadding: false },
  nearbyDescription: { fontSize: 14, lineHeight: 20 },
  divider: { height: 1, marginTop: 12, backgroundColor: "#E9E2F7" },
  local: { marginTop: 12, color: "#5E30A5", fontSize: 14, fontWeight: "600", lineHeight: 20, includeFontPadding: false },
  metaList: { gap: 4, marginTop: 8 },
  metaRow: { flexDirection: "row", gap: 6, alignItems: "center" },
  metaIcon: { width: 12, height: 12, tintColor: "#64748B" },
  meta: { flexShrink: 1, color: "#64748B", fontSize: 11, lineHeight: 16, includeFontPadding: false },
  hotCard: { minHeight: 150, aspectRatio: 2, borderRadius: 20, borderWidth: 0, backgroundColor: "#2B0B0B", elevation: 5 },
  hotPromoImage: { position: "absolute", top: 0, left: 0, bottom: 0, width: "65%" },
  hotSparkles: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  embers: { position: "absolute", top: 0, right: 0, bottom: 0, width: "58%", height: "100%", opacity: 0.8 },
  hotContent: { marginLeft: "41%", paddingTop: 8, paddingHorizontal: 12, paddingBottom: 12 },
  hotBadgeRow: { marginLeft: -12, marginBottom: -4, flexDirection: "row", gap: 2, alignItems: "center" },
  hotBadge: { height: 32, width: 72 },
  hotLocal: { flexShrink: 1, textTransform: "uppercase", color: "#FFFFFFD9", fontSize: 12, fontWeight: "600", letterSpacing: 1.2, includeFontPadding: false },
  hotTitle: { minHeight: 31, color: "#FFFFFF", fontSize: 15, fontWeight: "700", lineHeight: 18, includeFontPadding: false },
  hotDescription: { minHeight: 39, color: "#FFFFFFD9", fontSize: 12, lineHeight: 14, includeFontPadding: false },
  hotDivider: { height: 1, marginVertical: 8, backgroundColor: "#FFFFFF73" },
  hotPin: { tintColor: "#F6C35B" },
  hotMeta: { flexShrink: 1, color: "#FFFFFFE6", fontSize: 12, fontWeight: "600", includeFontPadding: false },
});
