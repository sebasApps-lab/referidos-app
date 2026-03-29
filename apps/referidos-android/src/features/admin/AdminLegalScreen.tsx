import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import { ADMIN_LEGAL_DOCS, ADMIN_LEGAL_POLICY_SUMMARY } from "./adminContentRegistry";

export default function AdminLegalScreen() {
  return (
    <ScreenScaffold title="Admin Legal" subtitle="Indice legal y snapshot operativo del set actual">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Policy summary">
          <View style={styles.metricsWrap}>
            <MetricCard label="Docs totales" value={ADMIN_LEGAL_POLICY_SUMMARY.totalEntries} />
            <MetricCard label="Repo docs" value={ADMIN_LEGAL_POLICY_SUMMARY.repoDocs} />
            <MetricCard label="Content docs" value={ADMIN_LEGAL_POLICY_SUMMARY.contentDocs} />
            <MetricCard label="Revision (dias)" value={ADMIN_LEGAL_POLICY_SUMMARY.reviewIntervalDays} />
          </View>
          <Text style={styles.metaText}>owner: {ADMIN_LEGAL_POLICY_SUMMARY.owner}</Text>
        </SectionCard>

        <SectionCard title="Documentos legales" subtitle={`${ADMIN_LEGAL_DOCS.length} entradas`}>
          {ADMIN_LEGAL_DOCS.map((doc) => (
            <View key={doc.id} style={styles.docCard}>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.metaText}>
                {doc.documentId} | version: {doc.version}
              </Text>
              <Text style={styles.pathText}>{doc.pathLabel}</Text>
              <Text style={styles.summaryText}>{doc.summary}</Text>
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{String(value)}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  metricsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metricCard: {
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  metricLabel: {
    fontSize: 11,
    color: "#64748B",
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
  metaText: {
    fontSize: 11,
    color: "#475569",
  },
  pathText: {
    fontSize: 11,
    color: "#334155",
    fontWeight: "700",
  },
  summaryText: {
    fontSize: 12,
    color: "#64748B",
  },
});
