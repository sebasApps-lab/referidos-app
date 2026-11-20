import React, { useMemo, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions, type ImageSourcePropType } from "react-native";
import StaffScreenScaffold from "@features/staff/StaffScreenScaffold";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import { staffIcons } from "@features/staff/staffNavigation";
import { DocumentIndexEntry, DocumentSearch, DocumentSplit } from "./components/AdminDocumentControls";
import AdminMarkdownArticle from "./components/AdminMarkdownArticle";
import legal from "./components/adminLegalSnapshot.json";

const STATUS_LABELS: Record<string, string> = {
  approved_public_brand_kit: "Approved (public kit)",
  approved_cc_by_attribution: "Approved (CC BY)",
  restricted_license_required: "Restricted (license)",
  conditional_review_required: "Conditional (review)",
  generic_fallback: "Fallback",
};
const policy = legal.policy;

export default function AdminLegalScreen() {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [preferredId, setPreferredId] = useState(legal.docs[0]?.id || "");
  const scroll = useRef<ScrollView>(null);
  const readerOffset = useRef(0);
  const splitOffset = useRef(0);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return legal.docs.filter((doc) => [doc.title, doc.pathLabel, doc.documentId, doc.version].some((field) =>
      field.toLowerCase().includes(value),
    )).sort((left, right) => left.title.localeCompare(right.title, "es", { sensitivity: "base" }));
  }, [query]);
  const selected = filtered.find((doc) => doc.id === preferredId) || filtered[0];
  const metricStyle = width >= 1250 ? styles.metricQuarter : width >= 768 ? styles.metricHalf : styles.metricFull;

  function selectDocument(id: string) {
    setPreferredId(id);
    if (width < 1100) requestAnimationFrame(() => scroll.current?.scrollTo({
      y: splitOffset.current + readerOffset.current,
      animated: true,
    }));
  }

  return (
    <StaffScreenScaffold title="Legal" subtitle="Políticas de marca, fuentes oficiales y versiones de documentos legales">
      <ScrollView ref={scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.metrics}>
          {([
            ["Policy runtime", policy.version, `Owner: ${policy.owner}`, staffIcons.scale],
            ["Review cycle", `${policy.reviewIntervalDays} días`, "Revalidación obligatoria", staffIcons.shield],
            ["Logos activos", String(policy.logosEnabled), `Fallback: ${policy.fallbackOnly}`, staffIcons.tag],
            ["Docs legales", String(legal.docs.length), "Con versión explícita", staffIcons.file],
          ] as [string, string, string, ImageSourcePropType][]).map(([label, value, detail, icon]) => (
            <View key={label} style={[styles.metric, metricStyle]}>
              <View style={styles.metricHeading}><Image source={icon} style={styles.metricIcon} /><Text style={styles.metricLabel}>{label}</Text></View>
              <Text style={styles.metricValue}>{value}</Text>
              <Text style={styles.caption}>{detail}</Text>
            </View>
          ))}
        </View>

        <StaffSectionCard title="Estado legal por tipo">
          <View style={styles.chips}>
            {Object.entries(policy.statusCounts).sort(([left], [right]) => left.localeCompare(right)).map(([key, count]) => (
              <Text key={key} style={styles.status}><Text style={styles.statusLabel}>{STATUS_LABELS[key] || key}: </Text>{count}</Text>
            ))}
          </View>
        </StaffSectionCard>

        <View style={styles.searchCard}>
          <DocumentSearch value={query} onChange={setQuery} placeholder="Buscar por título, ruta, ID o versión…" />
        </View>

        <View onLayout={(event) => { splitOffset.current = event.nativeEvent.layout.y; }}>
          <DocumentSplit index={(
            <StaffSectionCard title="Documentos legales">
              {filtered.map((doc) => <DocumentIndexEntry key={doc.id} title={doc.title} path={doc.pathLabel}
                active={doc.id === selected?.id} onPress={() => selectDocument(doc.id)} detail={(
                  <View style={styles.entryFooter}>
                    <Text style={[styles.badge, styles.badgeVersion]}>{doc.version}</Text>
                    <Text style={styles.date}>{doc.updatedAt}</Text>
                  </View>
                )} />)}
              {!filtered.length && <Text style={styles.empty}>No hay documentos que coincidan con el filtro.</Text>}
            </StaffSectionCard>
          )} reader={selected ? (
            <View style={styles.reading}>
              <StaffSectionCard title={selected.title} subtitle={selected.pathLabel}>
                <View style={styles.chips}>
                  <Text style={[styles.badge, styles.badgeVersion]}>Versión: {selected.version}</Text>
                  <Text style={styles.badge}>Doc ID: {selected.documentId}</Text>
                  <Text style={styles.badge}>Actualizado: {selected.updatedAt}</Text>
                </View>
              </StaffSectionCard>
              <AdminMarkdownArticle blocks={selected.blocks} />
            </View>
          ) : (
            <StaffSectionCard title="Contenido"><Text style={styles.caption}>Selecciona un documento para visualizar su contenido.</Text></StaffSectionCard>
          )} onReaderLayout={(offset) => { readerOffset.current = offset; }} />
        </View>
      </ScrollView>
    </StaffScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 24 },
  metrics: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  metric: { padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", elevation: 1 },
  metricFull: { width: "100%" },
  metricHalf: { width: "48%" },
  metricQuarter: { width: "24%" },
  metricHeading: { flexDirection: "row", alignItems: "center", gap: 8 },
  metricIcon: { width: 14, height: 14, tintColor: "#64748B" },
  metricLabel: { fontSize: 12, textTransform: "uppercase", letterSpacing: 1.4, color: "#64748B" },
  metricValue: { fontSize: 18, lineHeight: 26, marginTop: 8, marginBottom: 4, color: "#2F1A55", fontWeight: "800" },
  caption: { color: "#64748B", fontSize: 12 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  status: { borderRadius: 999, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FCFBFF", paddingHorizontal: 12, paddingVertical: 4, color: "#334155", fontSize: 12, overflow: "hidden" },
  statusLabel: { color: "#5E30A5", fontWeight: "600" },
  searchCard: { borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", padding: 16, elevation: 1 },
  entryFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 6 },
  badge: { overflow: "hidden", borderRadius: 999, borderWidth: 1, borderColor: "#E2E8F0", backgroundColor: "#F8FAFC", color: "#475569", fontSize: 10, paddingHorizontal: 8, paddingVertical: 3 },
  badgeVersion: { backgroundColor: "#F8F3FF", borderColor: "#E4D6FF", color: "#5E30A5" },
  date: { fontSize: 10, color: "#64748B" },
  empty: { padding: 12, borderStyle: "dashed", borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, color: "#64748B", fontSize: 12 },
  reading: { gap: 12 },
});
