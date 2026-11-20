import React, { memo } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import QrCodeImage from "@shared/ui/QrCodeImage";
import { formatDateTime } from "@shared/services/entityQueries";
import { getActiveQr, getCountdown, getHistoryTab, getPastStatusLabel, type HistoryRecord } from "./historyData";

const RealQr = memo(QrCodeImage);
const mapPin = require("../inicio/assets/map-pin.png");
const shade = require("./assets/promo-shade.png");

type CardProps = {
  item: HistoryRecord;
  now: number;
  onOpen: (id: string) => void;
};

export default function HistoryCard({ item, now, onOpen }: CardProps) {
  const category = getHistoryTab(item, now);
  const active = category === "activos";
  const redeemed = category === "canjeados";
  const qrCode = getActiveQr(item, now);
  const timer = active ? getCountdown(item, now) : null;
  const timerColor = getTimerColor(timer?.progress ?? 1);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${item.title}`}
      onPress={() => onOpen(item.id)}
      style={({ pressed }) => [active ? styles.activeCard : styles.pastCard, pressed && styles.pressed]}
    >
      <View style={active ? styles.banner : styles.thumbnail}>
        {item.image ? <Image source={{ uri: item.image }} style={styles.cover} resizeMode="cover" /> : null}
        {item.business ? (
          <>
            <Image source={shade} style={styles.cover} resizeMode="stretch" />
            <Text numberOfLines={active ? 2 : 3} style={active ? styles.business : styles.businessSmall}>
              {item.business}
            </Text>
          </>
        ) : null}
        {active && qrCode ? (
          <View style={[styles.bannerQr, { borderColor: timerColor }]}>
            <RealQr value={qrCode} size={108} label="Código QR vigente" />
          </View>
        ) : null}
      </View>

      <View style={active ? styles.activeContent : styles.pastContent}>
        <Text numberOfLines={1} style={active ? styles.activeTitle : styles.pastTitle}>{item.title}</Text>
        {item.description ? (
          <Text numberOfLines={active ? 3 : 1} style={active ? styles.activeDescription : styles.pastDescription}>
            {item.description}
          </Text>
        ) : null}
        <View style={active ? styles.activeMeta : styles.pastMeta}>
          {item.location ? <Location value={item.location} active={active} /> : <View style={styles.emptyLocation} />}
          {timer && (
            <View style={[styles.timer, { borderColor: `${timerColor}66`, backgroundColor: `${timerColor}24` }]}>
              <Text style={[styles.timerLabel, { color: timerColor }]}>{timer.label}</Text>
            </View>
          )}
        </View>
      </View>

      {!active && (
        <View style={styles.statusGroup}>
          <Status redeemed={redeemed} item={item} />
          {redeemed && item.points !== null && <Text style={styles.redeemedPoints}>+{item.points} puntos</Text>}
          {!redeemed && <Text style={styles.expiredPoints}>sin puntos</Text>}
        </View>
      )}
    </Pressable>
  );
}

export function HistoryDetail({ item, now, onClose }: { item: HistoryRecord; now: number; onClose: () => void }) {
  const category = getHistoryTab(item, now);
  const active = category === "activos";
  const qrCode = getActiveQr(item, now);
  const timer = active ? getCountdown(item, now) : null;
  const fields = [
    { label: "Código", value: qrCode },
    { label: "Generado", value: item.createdAt !== null ? formatDateTime(item.createdAt) : "" },
    { label: "Expiración", value: item.expiresAt !== null ? formatDateTime(item.expiresAt) : "" },
    { label: "Canje", value: item.redeemedAt !== null ? formatDateTime(item.redeemedAt) : "" },
    { label: "Puntos", value: item.points !== null ? `${item.points}` : "" },
  ];

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose} visible>
      <View style={styles.modalOverlay}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} accessibilityElementsHidden importantForAccessibility="no" />
        <View style={styles.modalCard} accessibilityViewIsModal>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text accessibilityRole="header" style={styles.detailTitle}>{item.title}</Text>
            {item.business ? <Text style={styles.detailBusiness}>{item.business}</Text> : null}
            {item.description ? <Text style={styles.detailDescription}>{item.description}</Text> : null}
            {item.location ? <Location value={item.location} active /> : null}
            {active ? (
              <Text style={styles.detailActive}>{timer ? `QR activo · ${timer.label}` : "QR activo"}</Text>
            ) : <Status redeemed={category === "canjeados"} item={item} />}
            {qrCode ? (
              <View style={styles.detailQr}>
                <RealQr value={qrCode} size={210} label="Código QR vigente para canjear" />
              </View>
            ) : null}
            {fields.filter(({ value }) => value).map(({ label, value }) => (
              <Text key={label} style={styles.detailRow} selectable>
                <Text style={styles.detailLabel}>{label}: </Text>{value}
              </Text>
            ))}
          </ScrollView>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.close}>
            <Text style={styles.closeLabel}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function Location({ value, active }: { value: string; active: boolean }) {
  return (
    <View style={styles.location}>
      <Image source={mapPin} style={[styles.pin, active && styles.activePin]} />
      <Text numberOfLines={1} style={active ? styles.activeLocation : styles.pastLocation}>{value}</Text>
    </View>
  );
}

function Status({ redeemed, item }: { redeemed: boolean; item: HistoryRecord }) {
  return (
    <Text style={[styles.status, redeemed ? styles.redeemedStatus : styles.expiredStatus]}>
      {getPastStatusLabel(item, redeemed)}
    </Text>
  );
}

function getTimerColor(progress: number) {
  if (progress > 0.4) return "#15803D";
  if (progress > 0.15) return "#A85D02";
  return "#DC2626";
}

const text = { includeFontPadding: false };
const styles = StyleSheet.create({
  activeCard: { paddingHorizontal: 24, paddingTop: 36, paddingBottom: 24, gap: 12, backgroundColor: "#FFFFFF" },
  pastCard: { padding: 16, gap: 16, flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF" },
  pressed: { backgroundColor: "#FAF8FF" },
  banner: { width: "100%", aspectRatio: 2, minHeight: 132, overflow: "hidden", backgroundColor: "#F8F5FF", borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  cover: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  thumbnail: { width: 68, height: 68, borderRadius: 8, overflow: "hidden", backgroundColor: "#F8F5FF" },
  business: { ...text, position: "absolute", top: 8, left: 12, right: 12, color: "#D4A21C", fontSize: 20, lineHeight: 25, fontWeight: "700", letterSpacing: 0.2 },
  businessSmall: { ...text, position: "absolute", top: 4, left: 6, right: 4, color: "#FFD873", fontSize: 10, lineHeight: 12, fontWeight: "700", letterSpacing: 0.2 },
  bannerQr: { position: "absolute", right: 12, top: "50%", marginTop: -60, height: 120, width: 120, borderWidth: 1, borderRadius: 12, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  activeContent: { gap: 4, paddingLeft: 8, paddingRight: 12 },
  pastContent: { flex: 1 },
  activeTitle: { ...text, fontSize: 20, lineHeight: 27, color: "#5E30A5", fontWeight: "600" },
  pastTitle: { ...text, fontSize: 13, lineHeight: 19, color: "#2F1A55", fontWeight: "600" },
  activeDescription: { ...text, fontSize: 17, lineHeight: 24, color: "#62748E" },
  pastDescription: { ...text, fontSize: 11, lineHeight: 16, color: "#62748E" },
  activeMeta: { marginTop: 8, flexDirection: "row", alignItems: "center", gap: 8 },
  pastMeta: { marginTop: 8, flexDirection: "row", alignItems: "center" },
  location: { flexShrink: 1, flexDirection: "row", alignItems: "center", gap: 4 },
  emptyLocation: { flex: 1 },
  pin: { width: 12, height: 12, tintColor: "#5E30A5" },
  activePin: { height: 18, width: 18, tintColor: "#94A3B8" },
  activeLocation: { ...text, flexShrink: 1, fontSize: 16, lineHeight: 24, color: "#94A3B8" },
  pastLocation: { ...text, flexShrink: 1, fontSize: 10, lineHeight: 15, color: "#5E30A5", fontWeight: "600" },
  timer: { marginLeft: "auto", paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderRadius: 6 },
  timerLabel: { ...text, fontSize: 12, fontWeight: "600", fontVariant: ["tabular-nums"] },
  statusGroup: { alignItems: "center", gap: 4 },
  status: { ...text, alignSelf: "center", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, letterSpacing: 1.2, fontSize: 10, lineHeight: 14, fontWeight: "600" },
  redeemedStatus: { color: "#137CBF", backgroundColor: "#1DA1F247", borderColor: "#1DA1F26B" },
  expiredStatus: { color: "#C02727", backgroundColor: "#EF444447", borderColor: "#EF44446B" },
  redeemedPoints: { ...text, fontSize: 11, lineHeight: 16, color: "#1DA1F2", fontWeight: "600" },
  expiredPoints: { ...text, fontSize: 11, lineHeight: 16, color: "#EF4444", fontWeight: "600" },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#00000066" },
  modalCard: { width: "100%", maxWidth: 384, maxHeight: "92%", borderRadius: 16, backgroundColor: "#FFFFFF", elevation: 10 },
  modalContent: { padding: 20, gap: 8 },
  detailTitle: { ...text, fontSize: 20, lineHeight: 26, fontWeight: "700", color: "#5E30A5" },
  detailBusiness: { ...text, fontSize: 15, lineHeight: 21, color: "#2F1A55", fontWeight: "600" },
  detailDescription: { ...text, fontSize: 14, lineHeight: 20, color: "#62748E" },
  detailQr: { alignItems: "center" },
  detailActive: { ...text, alignSelf: "center", color: "#15803D", fontSize: 14, fontWeight: "600" },
  detailRow: { ...text, color: "#364153", fontSize: 13, lineHeight: 19 },
  detailLabel: { fontWeight: "600" },
  close: { marginHorizontal: 20, marginBottom: 20, minHeight: 40, alignItems: "center", justifyContent: "center", borderRadius: 8, backgroundColor: "#5E30A5" },
  closeLabel: { ...text, color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
});
