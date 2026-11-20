import React, { useCallback, useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@shared/services/mobileApi";
import QrCodeImage from "@shared/ui/QrCodeImage";

type ValidQr = { code?: string; expires_at?: string; status?: string; status_effective?: string };
type Promo = {
  titulo?: string;
  descripcion?: string;
  fin?: string;
  imagen?: string;
  negocios?: { nombre?: string; sector?: string; lat?: number; lng?: number };
};
type Detail = { promo: Promo; staticCode: string; active: ValidQr | null; qrError: string };

export default function ClientePromoDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const promoId = (route.params as { promoId?: string } | undefined)?.promoId || "";
  const [detail, setDetail] = useState<Detail | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(0);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setDetail(null);
    void (async () => {
      try {
        if (!promoId) throw new Error("Promoción no encontrada.");
        const result = await supabase.from("promos")
          .select("titulo,descripcion,fin,imagen,negocios(nombre,sector,lat,lng)")
          .eq("id", promoId)
          .maybeSingle();
        if (result.error || !result.data) throw new Error("No se pudo cargar esta promoción.");
        if (!active) return;
        const [staticQr, validQr] = await Promise.all([
          supabase.rpc("generate_promo_qr", { p_promo_id: promoId }),
          supabase.rpc("get_active_valid_qr", { p_promo_id: promoId }),
        ]);
        if (!active) return;
        setNow(Date.now());
        setDetail({
          promo: result.data as Promo,
          staticCode: typeof staticQr.data?.code === "string" ? staticQr.data.code : "",
          active: validQr.data || null,
          qrError: staticQr.error && validQr.error ? "No se pudo consultar el QR de esta promoción." : "",
        });
      } catch (failure) {
        if (active) setError(failure instanceof Error ? failure.message : "No se pudo cargar esta promoción.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [promoId, request]);

  const activeQr = detail?.active;
  const expires = (activeQr?.expires_at && Date.parse(activeQr.expires_at)) || 0;
  useEffect(() => {
    if (expires <= Date.now()) return;
    const ticker = setInterval(() => {
      const time = Date.now();
      setNow(time);
      if (time >= expires) clearInterval(ticker);
    }, 1000);
    return () => clearInterval(ticker);
  }, [expires]);

  const retry = useCallback(() => setRequest((key) => key + 1), []);
  const promo = detail?.promo;
  const shop = promo?.negocios;
  const image = promo?.imagen;
  const valid = expires > now && (activeQr?.status_effective || activeQr?.status) !== "canjeado"
    && (activeQr?.status_effective || activeQr?.status) !== "expirado"
    && typeof activeQr?.code === "string" && activeQr.code.startsWith("qrv-");
  const code = valid ? activeQr?.code : detail?.staticCode;
  const seconds = Math.max(0, Math.ceil((expires - now) / 1000));
  const date = /^(\d{4})-(\d{2})-(\d{2})/.exec(promo?.fin || "");
  const hasLocation = shop?.lat != null && shop?.lng != null
    && Number.isFinite(Number(shop.lat)) && Number.isFinite(Number(shop.lng));

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={styles.hero}>
          {image && /^https?:\/\//i.test(image) ? <Image source={{ uri: image }} style={StyleSheet.absoluteFill} /> : (
            !loading && promo ? <Text style={styles.emptyImage}>Imagen no disponible</Text> : null
          )}
          <Pressable accessibilityRole="button" accessibilityLabel="Volver" onPress={() => navigation.goBack()} style={styles.back}>
            <Image source={require("../auth/assets/back.png")} style={styles.backIcon} />
          </Pressable>
          {promo && (
            <View style={styles.shop}>
              <Text numberOfLines={1} style={styles.shopName}>{shop?.nombre || "Local sin nombre"}</Text>
              {hasLocation ? <Pressable accessibilityRole="link" onPress={() => {
                void Linking.openURL(`https://www.google.com/maps?q=${Number(shop?.lat)},${Number(shop?.lng)}`).catch(() => {});
              }} style={styles.inline}>
                <Image source={require("@navigation/assets/map-pin.png")} style={styles.pin} />
                <Text style={styles.mapAction}>Ver en Maps</Text>
              </Pressable> : <Text style={styles.metadata}>Ubicación no disponible</Text>}
            </View>
          )}
        </View>
        <View style={styles.body}>
          {loading ? <Text style={styles.metadata}>Cargando detalles...</Text> : null}
          {error ? (
            <>
              <Text style={styles.error}>{error}</Text>
              <Pressable accessibilityRole="button" onPress={retry}><Text style={styles.mapAction}>Reintentar</Text></Pressable>
            </>
          ) : null}
          {promo && (
            <>
              <View style={styles.metadataRow}>
                <Text style={styles.metadata}>{shop?.sector || "Sector no especificado"}</Text>
                <Text style={styles.metadata}>{date ? `Válido hasta ${date[3]}/${date[2]}/${date[1]}` : "Validez no disponible"}</Text>
              </View>
              <Text accessibilityRole="header" style={styles.title}>{promo.titulo || "Promoción"}</Text>
              <Text style={styles.description}>{promo.descripcion || "Sin descripción"}</Text>
              <View style={styles.qr}>
                <Text style={styles.qrHeading}>ACCEDE A LA PROMO</Text>
                {code ? (
                  <View style={styles.qrFrame}>
                    <QrCodeImage value={code} size={210} label="Código QR de esta promoción" />
                  </View>
                ) : (
                  <View style={styles.emptyQr}>
                    <Image source={require("@navigation/assets/tab-qr-code.png")} style={styles.qrPlaceholder} />
                    <Text style={styles.metadata}>{detail?.qrError || "Aún no hay un código QR para esta promo."}</Text>
                  </View>
                )}
                {valid && (
                  <Text style={styles.timer}>
                    Tiempo restante: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  hero: { height: 200, backgroundColor: "#F3ECFF", alignItems: "center", justifyContent: "center" },
  emptyImage: { color: "#5E30A5", fontSize: 18, fontWeight: "700" },
  back: {
    position: "absolute", top: 16, left: 16, height: 40, width: 40, borderRadius: 22, zIndex: 1,
    borderWidth: 1, borderColor: "#E8DBFF", alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", elevation: 3,
  },
  backIcon: { width: 24, height: 24 },
  shop: { position: "absolute", bottom: 0, left: 8, right: 8, padding: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#FFFFFFCA", borderRadius: 16 },
  shopName: { flex: 1, color: "#7C5CD6", fontSize: 16, letterSpacing: 1.28, fontWeight: "700", textTransform: "uppercase" },
  inline: { flexDirection: "row", alignItems: "center", gap: 4 },
  pin: { width: 16, height: 16, tintColor: "#5E30A5" },
  mapAction: { color: "#5E30A5", fontWeight: "600", fontSize: 14 },
  body: { alignSelf: "center", width: "100%", maxWidth: 896, paddingHorizontal: 20, paddingBottom: 24, paddingTop: 4, gap: 16 },
  metadataRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 },
  metadata: { color: "#6B6B6B", fontSize: 14 },
  title: { color: "#484848", fontSize: 24, fontWeight: "900" },
  description: { color: "#8A8A8A", fontSize: 18, lineHeight: 28 },
  error: { color: "#E7000B", fontSize: 14 },
  qr: { alignItems: "center", gap: 8, paddingTop: 8 },
  qrHeading: { color: "#5E30A5", fontSize: 13, fontWeight: "600", letterSpacing: 1.82 },
  qrFrame: { padding: 20, backgroundColor: "#FFFFFF", borderColor: "#E8DBFF", borderWidth: 1, borderRadius: 16, elevation: 3 },
  emptyQr: { alignItems: "center", gap: 8 },
  qrPlaceholder: { width: 154, height: 154, tintColor: "#9CA3AF" },
  timer: { color: "#364153", fontSize: 12, fontWeight: "600" },
});
