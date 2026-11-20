import React, { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { fetchComponentCatalog, fetchComponentHistory, formatVersionLabel } from "@shared/services/versioningService";

const ENV_ORDER = ["dev", "staging", "prod"];
const EMPTY_COMPONENT_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

type Option = { id: string; label: string };
type ReleaseGroup = { label: string; rows: any[]; canonical: any };

export function releaseIdentity(row: any) {
  return String(row?.id || row?.release_id || "");
}

export function versionLabel(row: any) {
  if ([row?.semver_major, row?.semver_minor, row?.semver_patch].every((value) =>
    value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)),
  )) return formatVersionLabel(row);
  return String(row?.version_label || row?.semver || "-");
}

function environment(row: any) {
  return String(row?.env_key || "").toLowerCase();
}

export function groupVersioningReleases(rows: any[]): ReleaseGroup[] {
  const sorted = [...rows].sort((left, right) => {
    for (const field of ["semver_major", "semver_minor", "semver_patch", "prerelease_no"]) {
      const difference = Number(right?.[field] || 0) - Number(left?.[field] || 0);
      if (difference) return difference;
    }
    return (Date.parse(right?.created_at) || 0) - (Date.parse(left?.created_at) || 0);
  });
  const groups = new Map<string, any[]>();
  const usedIds = new Set<string>();
  for (const row of sorted) {
    const id = releaseIdentity(row);
    if (!id || usedIds.has(id)) continue;
    usedIds.add(id);
    const label = versionLabel(row);
    const group = groups.get(label) || [];
    group.push(row);
    groups.set(label, group);
  }
  return [...groups.entries()].map(([label, entries]) => {
    const canonical = [...entries].sort((left, right) =>
      ENV_ORDER.indexOf(environment(right)) - ENV_ORDER.indexOf(environment(left)))[0];
    entries.sort((left, right) => ENV_ORDER.indexOf(environment(left)) - ENV_ORDER.indexOf(environment(right)));
    return { label, rows: entries, canonical };
  });
}

type Props = {
  product: string;
  productOptions: Option[];
  onProductChange: (product: string) => void;
  isInitialized: boolean;
  releases: any[];
  selectedReleaseId: string;
  onReleaseChange: (release: any) => void;
  snapshot: any;
  components: any[];
  loading: boolean;
  detailLoading: boolean;
};

export default function VersioningReleaseDetail({
  product,
  productOptions,
  onProductChange,
  isInitialized,
  releases,
  selectedReleaseId,
  onReleaseChange,
  snapshot,
  components,
  loading,
  detailLoading,
}: Props) {
  const groups = useMemo(() => groupVersioningReleases(releases), [releases]);
  const selected = groups.find((group) => group.rows.some((row) => releaseIdentity(row) === selectedReleaseId));
  const selectedRelease = selected?.rows.find((row) => releaseIdentity(row) === selectedReleaseId);
  const [catalog, setCatalog] = useState<{ product: string; rows: any[] } | null>(null);
  const [preferredComponent, setPreferredComponent] = useState("");
  const [history, setHistory] = useState<{ id: string; rows: any[] } | null>(null);
  const [catalogError, setCatalogError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const fallback = Boolean(product && isInitialized && !groups.length && !loading);
  const rows = fallback ? catalog?.product === product ? catalog.rows : [] : components;
  const catalogLoading = fallback && catalog?.product !== product && !catalogError;
  const selectedComponent = rows.find((row) => componentIdentity(row) === preferredComponent) || rows[0];
  const componentId = componentIdentity(selectedComponent);

  useEffect(() => {
    if (!fallback) return;
    let current = true;
    setCatalogError("");
    fetchComponentCatalog(product).then((response) => {
      if (current) setCatalog({ product, rows: Array.isArray(response) ? response : [] });
    }, (failure) => {
      if (current) setCatalogError(failure?.message || "No se pudieron cargar los componentes.");
    });
    return () => { current = false; };
  }, [fallback, product]);

  useEffect(() => {
    if (!componentId) return;
    let current = true;
    setHistoryError("");
    fetchComponentHistory(componentId, 30).then((response) => {
      if (current) setHistory({ id: componentId, rows: Array.isArray(response) ? response : [] });
    }, (failure) => {
      if (current) setHistoryError(failure?.message || "No se pudo cargar el historial del componente.");
    });
    return () => { current = false; };
  }, [componentId]);

  return (
    <>
      <View style={styles.selectors}>
        <Select title="Aplicación" value={product} options={productOptions} onSelect={onProductChange} disabled={loading} />
        <Select
          title="Release"
          value={selected?.label || ""}
          placeholder="Sin release (pendiente)"
          options={groups.map((group) => ({ id: group.label, label: groupLabel(group) }))}
          disabled={loading || !groups.length}
          onSelect={(label) => {
            const group = groups.find((item) => item.label === label);
            if (group) onReleaseChange(group.canonical);
          }}
        />
      </View>

      {!loading && productOptions.length > 0 && !isInitialized && (
        <Text style={styles.notice}>Esta app aún no está inicializada en versionado.</Text>
      )}

      <StaffSectionCard title="Snapshot de componentes" subtitle={`Release seleccionada: ${selected ? groupLabel(selected) : "—"}`}>
        {selected && selected.rows.length > 1 && (
          <View style={styles.environments}>
            {selected.rows.map((row) => {
              const id = releaseIdentity(row);
              const active = id === selectedReleaseId;
              const name = environment(row).toUpperCase();
              const repeatedEnvironment = selected.rows.filter((entry) => environment(entry) === environment(row)).length > 1;
              return (
                <Pressable key={id} accessibilityRole="tab" accessibilityState={{ selected: active }}
                  onPress={() => onReleaseChange(row)} style={[styles.env, active && styles.envActive]}>
                  <Text style={[styles.envLabel, active && styles.envLabelActive]}>
                    {repeatedEnvironment ? `${name} · ${row.build_number || dateLabel(row.created_at)}` : name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
        {selectedRelease ? (
          <View style={styles.releaseMetadata}>
            <Text style={styles.caption}>Estado: {selectedRelease.status || "—"} · Canal: {selectedRelease.channel || environment(selectedRelease) || "—"}</Text>
            <Text style={styles.caption}>Creado: {dateLabel(selectedRelease.created_at)}</Text>
            <Text selectable style={styles.caption}>Commit: {selectedRelease.source_commit_sha || "—"}</Text>
          </View>
        ) : null}
        {snapshot?.env_key ? <Text style={styles.caption}>Entorno del snapshot: {String(snapshot.env_key).toUpperCase()}</Text> : null}
        {catalogError ? <Text accessibilityLiveRegion="polite" style={styles.error}>{catalogError}</Text> : null}
        {loading || detailLoading || catalogLoading ? <BlockSkeleton lines={4} compact /> : rows.length ? (
          <RevisionTable rows={rows} selectedId={componentId} onSelect={setPreferredComponent} />
        ) : !catalogError && <Text style={styles.caption}>Sin componentes para esta selección.</Text>}
      </StaffSectionCard>

      <StaffSectionCard title="Historial del componente" subtitle={`Componente seleccionado: ${selectedComponent?.component_key || componentId || "—"}`}>
        {historyError ? <Text accessibilityLiveRegion="polite" style={styles.error}>{historyError}</Text> : null}
        {componentId && history?.id !== componentId && !historyError ? <BlockSkeleton lines={4} compact /> : (
          history?.id === componentId && history?.rows.length ? <RevisionTable rows={history.rows} />
            : !historyError && <Text style={styles.caption}>{componentId ? "Sin revisiones disponibles." : "Selecciona un componente para ver sus revisiones."}</Text>
        )}
      </StaffSectionCard>
    </>
  );
}

function componentIdentity(row: any) {
  return String(row?.component_id || row?.id || "");
}

function groupLabel(group: ReleaseGroup) {
  const environments = [...new Set(group.rows.map((row) => environment(row).toUpperCase()).filter(Boolean))];
  return environments.length ? `${group.label} [${environments.join(" / ")}]` : group.label;
}

function Select({ title, placeholder, value, options, onSelect, disabled }: {
  title: string; placeholder?: string; value: string; options: Option[];
  onSelect: (id: string) => void; disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const label = options.find((option) => option.id === value)?.label || placeholder || title;

  return (
    <>
      <Pressable accessibilityRole="button" accessibilityLabel={`${title}: ${label}`} disabled={disabled}
        onPress={() => setOpen(true)} style={[styles.select, disabled && styles.selectDisabled]}>
        <Text style={styles.selectLabel} numberOfLines={2}>{label}</Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.scrim}>
          <Pressable onPress={() => setOpen(false)} style={StyleSheet.absoluteFillObject} accessible={false} />
          <View accessibilityViewIsModal style={styles.modal}>
            <Text accessibilityRole="header" style={styles.modalTitle}>{title}</Text>
            <ScrollView keyboardShouldPersistTaps="handled">
              {options.map((option) => (
                <Pressable key={option.id} accessibilityRole="button" accessibilityState={{ selected: option.id === value }}
                  onPress={() => { setOpen(false); onSelect(option.id); }} style={[styles.option, option.id === value && styles.optionActive]}>
                  <Text style={styles.selectLabel}>{option.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable accessibilityRole="button" onPress={() => setOpen(false)} style={styles.option}>
              <Text style={styles.selectLabel}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const SNAPSHOT_COLUMNS = ["Componente", "Tipo", "Estado", "Revisión", "Bump", "Commit", "Hash"];
const HISTORY_COLUMNS = ["Revisión", "Estado", "Bump", "Rama", "Commit", "Fecha"];

function RevisionTable({ rows, selectedId, onSelect }: { rows: any[]; selectedId?: string; onSelect?: (id: string) => void }) {
  const snapshot = Boolean(onSelect);
  const columns = snapshot ? SNAPSHOT_COLUMNS : HISTORY_COLUMNS;
  return (
    <ScrollView horizontal style={styles.table}>
      <View>
        <View style={[styles.row, styles.tableHeader]}>
          {columns.map((column) => <Text key={column} style={[styles.cell, styles.column]}>{column}</Text>)}
        </View>
        {rows.map((row, index) => {
          const id = componentIdentity(row);
          const revision = row?.revision_no != null ? `r${row.revision_no}` : row?.version_label || row?.version || row?.revision;
          const selected = Boolean(selectedId && id === selectedId);
          const content = snapshot ? [row?.component_key || row?.name || id, row?.component_type, revision, row?.bump_level,
            row?.source_commit_sha, row?.checksum || row?.hash || row?.artifact_sha || row?.content_hash]
            : [revision, row?.bump_level, row?.source_branch, row?.source_commit_sha, dateLabel(row?.created_at)];
          const stateIndex = snapshot ? 2 : 1;
          const cells = [...content.slice(0, stateIndex), null, ...content.slice(stateIndex)];
          return (
            <Pressable key={`${row?.id || id}-${index}`} disabled={!onSelect || !id} accessibilityRole={onSelect ? "button" : undefined}
              accessibilityState={onSelect ? { selected } : undefined} onPress={() => onSelect?.(id)} style={[styles.row, selected && styles.selectedRow]}>
              {cells.map((cell, idx) => idx === stateIndex ? (
                <View key={columns[idx]} style={styles.cell}><ComponentBadge row={row} /></View>
              ) : <Text key={columns[idx]} numberOfLines={2} selectable={!onSelect} style={styles.cell}>{String(cell || "—")}</Text>)}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

function dateLabel(value: any) {
  const date = new Date(value);
  return value && Number.isFinite(date.getTime()) ? date.toLocaleString("es-EC", { timeZone: "America/Guayaquil" }) : "—";
}

function ComponentBadge({ row }: { row: any }) {
  const deleted = row?.content_hash === EMPTY_COMPONENT_HASH;
  const created = Number(row?.revision_no) === 1 && String(row?.source_branch || "").toLowerCase() !== "bootstrap"
    && !String(row?.source_commit_sha || "").toLowerCase().startsWith("baseline-");
  return (
    <Text style={[styles.badge, deleted ? styles.deleted : created ? styles.created : styles.normalBadge]}>
      {deleted ? "Eliminado" : created ? "Nuevo" : "Activo"}
    </Text>
  );
}

const styles = StyleSheet.create({
  selectors: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  select: { flexGrow: 1, flexBasis: 142, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8, paddingHorizontal: 12, minHeight: 40, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, backgroundColor: "#FFFFFF" },
  selectDisabled: { opacity: 0.55 },
  selectLabel: { flexShrink: 1, fontSize: 12, color: "#334155" },
  chevron: { color: "#64748B", fontSize: 16 },
  notice: { fontSize: 12, color: "#475569", borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, backgroundColor: "#FAF8FF", padding: 10 },
  caption: { fontSize: 12, color: "#64748B" },
  releaseMetadata: { gap: 3 },
  error: { fontSize: 12, color: "#B91C1C" },
  environments: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  env: { borderRadius: 999, borderWidth: 1, borderColor: "#E9E2F7", paddingHorizontal: 10, paddingVertical: 6 },
  envActive: { backgroundColor: "#2F1A55", borderColor: "#2F1A55" },
  envLabel: { fontSize: 11, color: "#2F1A55", fontWeight: "600" },
  envLabelActive: { color: "#FFFFFF" },
  table: { borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 10 },
  row: { flexDirection: "row", alignItems: "center", minHeight: 42, borderBottomWidth: 1, borderBottomColor: "#EEE8F8", backgroundColor: "#FFFFFF" },
  tableHeader: { backgroundColor: "#FAF8FF", minHeight: 36 },
  selectedRow: { backgroundColor: "#F4EEFF" },
  cell: { width: 99, paddingHorizontal: 8, paddingVertical: 8, fontSize: 12, color: "#334155" },
  column: { fontWeight: "600", color: "#2F1A55" },
  badge: { alignSelf: "flex-start", borderRadius: 12, paddingHorizontal: 6, paddingVertical: 4, fontSize: 11, fontWeight: "600", overflow: "hidden" },
  deleted: { color: "#B91C1C", backgroundColor: "#FEE2E2" },
  created: { color: "#047857", backgroundColor: "#D1FAE5" },
  normalBadge: { color: "#475569", backgroundColor: "#F1F5F9" },
  scrim: { flex: 1, justifyContent: "center", backgroundColor: "#00000066", paddingHorizontal: 20 },
  modal: { padding: 16, borderRadius: 16, gap: 8, maxHeight: "75%", backgroundColor: "#FFFFFF" },
  modalTitle: { fontSize: 16, fontWeight: "600", color: "#2F1A55" },
  option: { borderRadius: 8, padding: 10, marginVertical: 2 },
  optionActive: { backgroundColor: "#F4EEFF" },
});
