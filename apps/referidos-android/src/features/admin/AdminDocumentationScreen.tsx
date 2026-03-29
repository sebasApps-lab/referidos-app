import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import { ADMIN_DOC_GROUPS, ADMIN_DOCS_REGISTRY } from "./adminContentRegistry";

export default function AdminDocumentationScreen() {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const term = query.trim().toLowerCase();
    return ADMIN_DOC_GROUPS.map((group) => ({
      ...group,
      docs: ADMIN_DOCS_REGISTRY.filter((doc) => doc.group === group.key).filter((doc) => {
        if (!term) return true;
        return `${doc.title} ${doc.pathLabel} ${doc.summary}`.toLowerCase().includes(term);
      }),
    })).filter((group) => group.docs.length > 0);
  }, [query]);

  return (
    <ScreenScaffold title="Admin Documentation" subtitle="Indice Android del set documental vigente">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Busqueda" subtitle="Filtra por titulo, path o resumen">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar documento"
            style={styles.input}
          />
        </SectionCard>

        {filteredGroups.map((group) => (
          <SectionCard
            key={group.key}
            title={group.label}
            subtitle={`${group.docs.length} documentos`}
            right={<Text style={styles.groupChip}>{group.key}</Text>}
          >
            {group.docs.map((doc) => (
              <View key={doc.id} style={styles.docCard}>
                <Text style={styles.docTitle}>{doc.title}</Text>
                <Text style={styles.pathText}>{doc.pathLabel}</Text>
                <Text style={styles.summaryText}>{doc.summary}</Text>
              </View>
            ))}
          </SectionCard>
        ))}

        {filteredGroups.length === 0 ? (
          <SectionCard title="Sin resultados">
            <Text style={styles.emptyText}>No hay documentos para el filtro actual.</Text>
          </SectionCard>
        ) : null}

        <SectionCard title="Nota operativa">
          <Text style={styles.summaryText}>
            En Android este panel actua como indice del set documental que en web se navega
            desde el panel admin. Los path apuntan al mismo repo y misma documentacion fuente.
          </Text>
          <Pressable onPress={() => setQuery("")} style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Limpiar filtro</Text>
          </Pressable>
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
  },
  groupChip: {
    borderRadius: 999,
    backgroundColor: "#F5F3FF",
    color: "#5B21B6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "700",
  },
  docCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 10,
    gap: 3,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  pathText: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "700",
  },
  summaryText: {
    fontSize: 12,
    color: "#64748B",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
});
