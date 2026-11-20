import React, { useMemo, useRef, useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import StaffScreenScaffold from "@features/staff/StaffScreenScaffold";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import { ADMIN_DOCS_REGISTRY } from "./adminContentRegistry";
import { DocumentIndexEntry, DocumentSearch, DocumentSplit } from "./components/AdminDocumentControls";
import catalog from "./components/adminDocumentationIndex.json";

const PWA_DOCUMENTATION = "https://referidos.app/admin/documentacion";
const summaries = new Map(ADMIN_DOCS_REGISTRY.map((row) => [row.id as string, row.summary] as const));

export default function AdminDocumentationScreen() {
  const { width } = useWindowDimensions();
  const [activeGroup, setActiveGroup] = useState(catalog.groups[0].key);
  const [query, setQuery] = useState("");
  const [preferredId, setPreferredId] = useState("");
  const scroll = useRef<ScrollView>(null);
  const readerOffset = useRef(0);
  const splitOffset = useRef(0);
  const visible = useMemo(() => {
    const filter = query.trim().toLowerCase();
    return catalog.docs.filter((doc) => doc.group === activeGroup && [doc.title, doc.pathLabel, summaries.get(doc.id)].some((part) =>
      part?.toLowerCase().includes(filter),
    )).sort((left, right) => left.title.localeCompare(right.title, "es", { sensitivity: "base" }));
  }, [activeGroup, query]);
  const selected = visible.find((doc) => doc.id === preferredId) || visible[0];

  function chooseDoc(id: string) {
    setPreferredId(id);
    if (width < 1100) requestAnimationFrame(() => scroll.current?.scrollTo({
      y: splitOffset.current + readerOffset.current,
      animated: true,
    }));
  }

  function openReader() {
    void Linking.openURL(PWA_DOCUMENTATION).catch(() => {
      Alert.alert("Documentación", "No se pudo abrir el lector de la PWA.");
    });
  }

  return (
    <StaffScreenScaffold title="Documentación" subtitle="Guías del repo organizadas por ámbito general y por app">
      <ScrollView ref={scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.filters}>
          <View accessibilityRole="tablist" style={styles.groups}>
            {catalog.groups.map(({ key, label }) => {
              const active = key === activeGroup;
              return (
                <Pressable key={key} accessibilityRole="tab" accessibilityState={{ selected: active }}
                  onPress={() => setActiveGroup(key)} style={[styles.group, active && styles.groupActive]}>
                  <Text style={[styles.groupLabel, active && styles.groupLabelActive]}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
          <DocumentSearch value={query} onChange={setQuery} placeholder="Buscar por título, ruta o resumen…" />
        </View>

        <View onLayout={(event) => { splitOffset.current = event.nativeEvent.layout.y; }}>
          <DocumentSplit index={(
            <StaffSectionCard title="Documentos">
              {visible.map((doc) => (
                <DocumentIndexEntry key={doc.id} title={doc.title} path={doc.pathLabel} active={selected?.id === doc.id}
                  onPress={() => chooseDoc(doc.id)} />
              ))}
              {!visible.length && <Text style={styles.empty}>No hay documentos que coincidan con el filtro.</Text>}
            </StaffSectionCard>
          )} reader={selected ? (
            <StaffSectionCard title={selected.title} subtitle={selected.pathLabel}>
              <Text style={styles.summary}>{summaries.get(selected.id)}</Text>
              <Pressable accessibilityRole="link" onPress={openReader} style={styles.readerLink}>
                <Text style={styles.readerLinkText}>Abrir lector de la PWA</Text>
              </Pressable>
            </StaffSectionCard>
          ) : <StaffSectionCard title="Contenido"><Text style={styles.summary}>Selecciona un documento para visualizar su información.</Text></StaffSectionCard>}
            onReaderLayout={(offset) => { readerOffset.current = offset; }} />
        </View>
      </ScrollView>
    </StaffScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 24 },
  filters: { gap: 12, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", elevation: 1 },
  groups: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  group: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, backgroundColor: "#FFFFFF" },
  groupActive: { borderColor: "#5E30A5", backgroundColor: "#F4EEFF" },
  groupLabel: { color: "#475569", fontSize: 12, fontWeight: "600" },
  groupLabelActive: { color: "#5E30A5" },
  empty: { padding: 12, borderStyle: "dashed", borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, color: "#64748B", fontSize: 12 },
  summary: { color: "#475569", fontSize: 14, lineHeight: 21 },
  readerLink: { alignSelf: "flex-start", borderRadius: 12, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FAF8FF", paddingHorizontal: 12, paddingVertical: 8, marginTop: 4 },
  readerLinkText: { color: "#5E30A5", fontSize: 12, fontWeight: "600" },
});
