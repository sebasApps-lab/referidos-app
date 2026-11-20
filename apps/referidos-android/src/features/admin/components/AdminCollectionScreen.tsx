import React, { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";

type Metric = {
  label: string;
  value: string | number;
};

type FilterOption = {
  id: string;
  label: string;
};

type FilterGroup = {
  title: string;
  selectedId: string;
  options: FilterOption[];
  onSelect: (id: string) => void;
};

type Props = {
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  query?: string;
  onQueryChange?: (value: string) => void;
  loading?: boolean;
  refreshing?: boolean;
  error?: string;
  emptyText?: string;
  metrics?: Metric[];
  filters?: FilterGroup[];
  onRefresh?: () => void;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export default function AdminCollectionScreen({
  title,
  subtitle,
  searchPlaceholder = "Buscar",
  query = "",
  onQueryChange,
  loading = false,
  refreshing = false,
  error = "",
  emptyText = "",
  metrics = [],
  filters = [],
  onRefresh,
  headerActions,
  footer,
  children,
}: Props) {
  const hasTopBar = Boolean(onQueryChange || onRefresh || headerActions);
  const hasFilters = filters.length > 0;
  const metricsCount = metrics.length;
  const hasMeta = metricsCount > 0 || hasFilters || Boolean(error) || Boolean(emptyText);

  const metricRows = useMemo(() => metrics.slice(0, 8), [metrics]);

  return (
    <ScreenScaffold title={title} subtitle={subtitle} onRefresh={refreshing || loading ? undefined : onRefresh}>
      <ScrollView contentContainerStyle={styles.content}>
        {hasTopBar ? (
          <SectionCard
            title="Controles"
            right={
              onRefresh ? (
                <Pressable
                  onPress={onRefresh}
                  disabled={refreshing}
                  style={[styles.secondaryBtn, refreshing && styles.btnDisabled]}
                >
                  <Text style={styles.secondaryBtnText}>
                    {refreshing ? "..." : "Recargar"}
                  </Text>
                </Pressable>
              ) : null
            }
          >
            {onQueryChange ? (
              <TextInput
                value={query}
                onChangeText={onQueryChange}
                placeholder={searchPlaceholder}
                style={styles.input}
              />
            ) : null}
            {headerActions ? <View style={styles.actionsRow}>{headerActions}</View> : null}
          </SectionCard>
        ) : null}

        {hasMeta ? (
          <SectionCard title="Resumen" subtitle="Estado actual del modulo">
            {loading ? <BlockSkeleton lines={4} compact /> : null}
            {!loading && metricRows.length > 0 ? (
              <View style={styles.metricsGrid}>
                {metricRows.map((metric) => (
                  <View key={metric.label} style={styles.metricCard}>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            {!loading && hasFilters ? (
              <View style={styles.filtersWrap}>
                {filters.map((filter) => (
                  <View key={filter.title} style={styles.filterGroup}>
                    <Text style={styles.filterTitle}>{filter.title}</Text>
                    <View style={styles.chipWrap}>
                      {filter.options.map((option) => {
                        const active = option.id === filter.selectedId;
                        return (
                          <Pressable
                            key={`${filter.title}-${option.id}`}
                            onPress={() => filter.onSelect(option.id)}
                            style={[styles.chip, active && styles.chipActive]}
                          >
                            <Text style={[styles.chipText, active && styles.chipTextActive]}>
                              {option.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            ) : null}
            {!loading && error ? <Text style={styles.errorText}>{error}</Text> : null}
            {!loading && !error && emptyText ? (
              <Text style={styles.emptyText}>{emptyText}</Text>
            ) : null}
          </SectionCard>
        ) : null}

        {children}
        {footer}
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 48,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    color: "#2F1A55",
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    backgroundColor: "#F0EBFF",
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#5E30A5",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.55,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metricCard: {
    minWidth: 104,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 12,
    backgroundColor: "#FAF8FF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2F1A55",
  },
  metricLabel: {
    fontSize: 11,
    color: "#475569",
  },
  filtersWrap: {
    gap: 10,
  },
  filterGroup: {
    gap: 6,
  },
  filterTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipActive: {
    borderColor: "#5E30A5",
    backgroundColor: "#F0EBFF",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  chipTextActive: {
    color: "#5E30A5",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
});
