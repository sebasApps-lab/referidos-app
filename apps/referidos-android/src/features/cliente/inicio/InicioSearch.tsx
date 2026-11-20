import React, { useRef, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PromoCard, PromoSection, type PromoItem } from "./InicioPromos";

const SUGGESTIONS = ["Pizza", "Café", "Sushi", "Cine", "Gym", "Descuento"];
const searchIcon = require("./assets/search.png");
const qrIcon = require("./assets/qr-code.png");

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function InicioSearchTrigger({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="search" onPress={onPress} style={styles.searchPill}>
      <Image source={searchIcon} style={styles.searchIcon} />
      <Text style={styles.placeholder}>Buscar local</Text>
    </Pressable>
  );
}

export function InicioEmptyState({ kind, onPrimary, onScan }: {
  kind: "promos" | "search" | "error";
  onPrimary: () => void;
  onScan: () => void;
}) {
  const isSearch = kind === "search";
  const hasError = kind === "error";
  const title = isSearch ? "No encontramos coincidencias" : hasError ? "No se pudieron cargar las promos" : "Aún no hay promos activas";
  const description = isSearch ? "Prueba con otro término para ver más resultados."
    : hasError ? "Comprueba tu conexión y vuelve a intentarlo."
    : "Estamos preparando nuevas ofertas para tu zona. Mientras tanto, explora otras opciones.";
  const primaryLabel = isSearch ? "Limpiar búsqueda" : hasError ? "Reintentar" : "Explorar promos";

  return (
    <View style={styles.empty} accessibilityLiveRegion="polite">
      <View style={styles.emptyIconWrap}>
        <Image source={require("./assets/sparkles.png")} style={styles.emptyIcon} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyCopy}>{description}</Text>
      <View style={styles.emptyActions}>
        <Pressable accessibilityRole="button" onPress={onPrimary} style={styles.secondaryButton}>
          <Image source={searchIcon} style={styles.smallIcon} />
          <Text style={styles.secondaryLabel}>{primaryLabel}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onScan} style={styles.primaryButton}>
          <Image source={qrIcon} style={[styles.smallIcon, styles.whiteIcon]} />
          <Text style={styles.primaryLabel}>Escanear QR</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function InicioSearch({ promos, hotPromos, viewportWidth, onClose, onOpenPromo, onScan }: {
  promos: PromoItem[];
  hotPromos: PromoItem[];
  viewportWidth: number;
  onClose: () => void;
  onOpenPromo: (promo: PromoItem) => void;
  onScan: () => void;
}) {
  const input = useRef<TextInput>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const term = normalizeSearch(query);
  const results = term ? promos.filter((promo) => (
    [promo.title, promo.description, promo.local, promo.location].some((value) => normalizeSearch(value).includes(term))
  )) : [];

  return (
    <Modal visible animationType="fade" onShow={() => input.current?.focus()} onRequestClose={onClose}>
      <SafeAreaView edges={["left", "right", "bottom"]} style={styles.searchRoot}>
        <View style={styles.searchHeader}>
          <View style={styles.searchTitleRow}>
            <Pressable accessibilityRole="button" accessibilityLabel="Volver" onPress={onClose} style={styles.backButton}>
              <Image source={require("./assets/arrow-left.png")} style={styles.backIcon} />
            </Pressable>
            <Text accessible={false} style={styles.searchTitle}>Qrew</Text>
          </View>
          <View style={[styles.searchPill, focused && styles.searchPillFocused]}>
            <Image source={searchIcon} style={[styles.searchIcon, focused && styles.searchIconFocused]} />
            <TextInput
              ref={input}
              accessibilityLabel="Buscar local"
              value={query}
              onChangeText={setQuery}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              returnKeyType="search"
              placeholder="Buscar local"
              placeholderTextColor={focused ? "#5E30A5" : "#9A7CC5"}
              style={styles.searchInput}
            />
            {query !== "" && (
              <Pressable accessibilityRole="button" accessibilityLabel="Borrar búsqueda" onPress={() => setQuery("")} hitSlop={8}>
                <Image source={require("./assets/x.png")} style={styles.clearIcon} />
              </Pressable>
            )}
          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" showsVerticalScrollIndicator={false} contentContainerStyle={styles.searchContent}>
          {term ? (
            <View style={styles.results}>
              <Text accessibilityRole="header" style={styles.resultsTitle}>Resultados</Text>
              {results.length > 0 ? results.map((promo) => (
                <PromoCard key={promo.id} promo={promo} variant="cercanas" onPress={() => onOpenPromo(promo)} />
              )) : <InicioEmptyState kind="search" onPrimary={onClose} onScan={onScan} />}
            </View>
          ) : (
            <>
              <PromoSection title="Hot" variant="hot" promos={hotPromos} viewportWidth={viewportWidth} autoScroll onOpenPromo={onOpenPromo} />
              <View style={styles.suggestions}>
                <Text accessibilityRole="header" style={styles.suggestionsTitle}>Búsquedas sugeridas</Text>
                <View style={styles.suggestionList}>
                  {SUGGESTIONS.map((suggestion) => (
                    <Pressable key={suggestion} accessibilityRole="button" onPress={() => setQuery(suggestion)} style={styles.suggestion}>
                      <Text style={styles.suggestionLabel}>{suggestion}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  searchRoot: { flex: 1, backgroundColor: "#FFFFFF" },
  searchHeader: { borderBottomLeftRadius: 40, borderBottomRightRadius: 40, backgroundColor: "#5E30A5", paddingTop: 12, paddingBottom: 12, paddingHorizontal: 16, elevation: 1 },
  searchTitleRow: { minHeight: 40, flexDirection: "row", alignItems: "center", marginBottom: 8 },
  searchTitle: { position: "absolute", left: 40, right: 40, textAlign: "center", fontSize: 24, fontWeight: "800", letterSpacing: 2.4, color: "#FFFFFF", textShadowColor: "#D7BAFF", textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 3 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF26", alignItems: "center", justifyContent: "center", marginLeft: -8 },
  backIcon: { width: 17, height: 17, tintColor: "#FFFFFFE6" },
  searchPill: { minHeight: 40, marginHorizontal: 2, borderRadius: 999, borderWidth: 1, borderColor: "transparent", backgroundColor: "#F5F5F7", flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 7 },
  searchPillFocused: { borderColor: "#2F1A55" },
  searchIcon: { height: 20, width: 20, tintColor: "#5E30A5", opacity: 0.6, marginRight: 10 },
  searchIconFocused: { opacity: 1 },
  searchInput: { flex: 1, color: "#5E30A5", fontSize: 16, fontWeight: "600", lineHeight: 24, padding: 0, includeFontPadding: false },
  placeholder: { color: "#9A7CC5", fontSize: 16, fontWeight: "600", lineHeight: 24, includeFontPadding: false },
  clearIcon: { width: 18, height: 18, tintColor: "#6B6B6B", marginLeft: 6 },
  searchContent: { paddingTop: 32, paddingBottom: 24 },
  results: { paddingHorizontal: 16, gap: 16 },
  resultsTitle: { fontSize: 14, lineHeight: 20, fontWeight: "600", color: "#2F1A55", includeFontPadding: false },
  suggestions: { paddingHorizontal: 16 },
  suggestionsTitle: { fontSize: 18, lineHeight: 27, fontWeight: "600", color: "#2F1A55", marginBottom: 12, includeFontPadding: false },
  suggestionList: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  suggestion: { backgroundColor: "#FFFFFF", borderColor: "#E9E2F7", borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  suggestionLabel: { color: "#5E30A5", fontSize: 12, fontWeight: "600", lineHeight: 16, includeFontPadding: false },
  empty: { alignSelf: "center", alignItems: "center", paddingHorizontal: 16, marginTop: 32, width: "100%", maxWidth: 384 },
  emptyIconWrap: { height: 56, width: 56, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#F3EEFF" },
  emptyIcon: { height: 22, width: 22, tintColor: "#5E30A5" },
  emptyTitle: { color: "#2F1A55", fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 16, includeFontPadding: false },
  emptyCopy: { color: "#64748B", fontSize: 12, lineHeight: 16, textAlign: "center", marginTop: 8, includeFontPadding: false },
  emptyActions: { flexDirection: "row", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 20 },
  secondaryButton: { flexDirection: "row", gap: 8, borderRadius: 12, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingVertical: 8, alignItems: "center" },
  primaryButton: { flexDirection: "row", gap: 8, borderRadius: 12, borderWidth: 1, borderColor: "#5E30A5", backgroundColor: "#5E30A5", paddingHorizontal: 16, paddingVertical: 8, alignItems: "center", elevation: 1 },
  smallIcon: { width: 14, height: 14, tintColor: "#64748B" },
  whiteIcon: { tintColor: "#FFFFFF" },
  secondaryLabel: { color: "#64748B", fontSize: 12, fontWeight: "600", lineHeight: 16, includeFontPadding: false },
  primaryLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "600", lineHeight: 16, includeFontPadding: false },
});
