import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { authText } from "./AuthStartLayout";
import { onboardingColors } from "./OnboardingFormLayout";

const GROUPS = [
  {
    id: "weekdays", label: "Lunes a Viernes",
    days: [
      ["lunes", "Lunes"], ["martes", "Martes"], ["miercoles", "Miércoles"],
      ["jueves", "Jueves"], ["viernes", "Viernes"],
    ],
  },
  { id: "weekend", label: "Sábado y Domingo", days: [["sabado", "Sábado"], ["domingo", "Domingo"]] },
] as const;

const DEFAULT_SLOT = { abre: "10:00", cierra: "18:00" };
type Slot = typeof DEFAULT_SLOT;

export type BusinessSchedule = {
  semanal?: Record<string, Slot[]>;
  excepciones?: unknown[];
};

export function hasBusinessHours(value: BusinessSchedule) {
  return Object.values(value.semanal || {}).some((slots) => Array.isArray(slots) && slots.length > 0);
}

export function createBusinessSchedule(): BusinessSchedule {
  return {
    semanal: Object.fromEntries(GROUPS.flatMap((group) => group.days.map(([id]) =>
      [id, group.id === "weekdays" ? [{ ...DEFAULT_SLOT }] : []],
    ))),
    excepciones: [],
  };
}

export default function BusinessScheduleBlock({ value, onChange }: {
  value: BusinessSchedule;
  onChange: (value: BusinessSchedule) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const weekly = value.semanal || {};

  function updateDays(days: string[], edit: (oldSlots: Slot[]) => Slot[]) {
    const next = { ...weekly };
    for (const day of days) next[day] = edit(weekly[day] || []);
    onChange({ ...value, semanal: next });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horario</Text>
      {GROUPS.map(({ id, label, days }) => {
        const expandedNow = expanded === id;
        const dayIds = days.map(([day]) => day);
        const active = dayIds.filter((day) => weekly[day]?.length > 0);
        const allActive = active.length === days.length;
        const firstDay = dayIds[0];
        const first = expandedNow ? firstDay : active[0] || firstDay;
        const primary = weekly[first]?.[0] || DEFAULT_SLOT;
        const shownWeek = expandedNow ? [firstDay] : dayIds;
        const timeTargets = expandedNow ? active.filter((day) => day === firstDay) : active;
        return (
          <View key={id} style={styles.group}>
            <View style={styles.row}>
              <HourCheckbox
                label={label}
                checked={expandedNow ? Boolean(weekly[firstDay]?.length) : allActive}
                mixed={!expandedNow && active.length > 0 && !allActive}
                onPress={() => {
                  const deactivate = expandedNow ? Boolean(weekly[firstDay]?.length) : allActive;
                  updateDays(shownWeek, (slots) => deactivate ? [] : slots.length ? slots : [{ ...primary }]);
                }}
              />
              <Text style={styles.groupLabel}>{expandedNow ? days[0][1] : label}</Text>
              <TimeRange
                label={expandedNow ? days[0][1] : label}
                slot={timeTargets.length ? primary : undefined}
                onUpdate={(field, time) => updateDays(timeTargets, (slots) =>
                  [{ ...(slots[0] || DEFAULT_SLOT), [field]: time }, ...slots.slice(1)],
                )}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${expandedNow ? "Agrupar" : "Ver días de"} ${label}`}
                onPress={() => setExpanded(expandedNow ? null : id)}
                hitSlop={8}
                style={styles.chevronButton}
              >
                <Image source={require("../assets/back.png")} style={[styles.chevron, expandedNow && styles.chevronUp]} />
              </Pressable>
            </View>
            {expandedNow && days.slice(1).map(([day, dayLabel]) => (
              <View key={day} style={styles.row}>
                <HourCheckbox label={dayLabel} checked={Boolean(weekly[day]?.length)} onPress={() => {
                  updateDays([day], (slots) => slots.length ? [] : [{ ...DEFAULT_SLOT }]);
                }} />
                <Text style={styles.groupLabel}>{dayLabel}</Text>
                <TimeRange
                  label={dayLabel}
                  slot={weekly[day]?.[0]}
                  onUpdate={(field, time) => updateDays([day], (slots) =>
                    [{ ...(slots[0] || DEFAULT_SLOT), [field]: time }, ...slots.slice(1)],
                  )}
                />
                <View style={styles.chevronButton} />
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

function HourCheckbox({ label, checked, mixed = false, onPress }: {
  label: string;
  checked: boolean;
  mixed?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={`Activar ${label}`}
      accessibilityState={{ checked: mixed ? "mixed" : checked }}
      onPress={onPress}
      hitSlop={6}
      style={[styles.toggle, (checked || mixed) && styles.toggleEnabled]}
    >
      {checked && <Image source={require("../assets/check.png")} style={styles.tick} />}
      {mixed && <View style={styles.minus} />}
    </Pressable>
  );
}

function TimeRange({ label, slot, onUpdate }: {
  label: string;
  slot?: Slot;
  onUpdate: (field: keyof Slot, time: string) => void;
}) {
  return (
    <>
      <TimeField label={`Apertura: ${label}`} value={slot?.abre} onChange={(time) => onUpdate("abre", time)} />
      <Text style={styles.dash}>–</Text>
      <TimeField label={`Cierre: ${label}`} value={slot?.cierra} onChange={(time) => onUpdate("cierra", time)} />
    </>
  );
}

function TimeField({ label, value, onChange }: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <TextInput
      accessibilityLabel={label}
      editable={Boolean(value)}
      keyboardType="number-pad"
      maxLength={5}
      style={styles.time}
      value={draft ?? value ?? "--:--"}
      onBlur={() => setDraft(null)}
      onChangeText={(text) => {
        const digits = text.replace(/\D/g, "").slice(0, 4);
        const next = digits.length <= 2 ? digits : `${digits.slice(0, 2)}:${digits.slice(2)}`;
        setDraft(next);
        if (/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(next)) onChange(next);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  title: { ...authText.small, color: "#101828", fontWeight: "600" },
  group: { gap: 12, borderBottomWidth: 1, borderColor: onboardingColors.border, paddingBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 7 },
  groupLabel: { ...authText.small, flex: 1, color: onboardingColors.dark },
  toggle: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: onboardingColors.border,
    backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center",
  },
  toggleEnabled: { borderColor: "#4ADE80", backgroundColor: "#4ADE80" },
  tick: { width: 12, height: 12, tintColor: onboardingColors.white },
  minus: { width: 8, height: 1, backgroundColor: onboardingColors.white },
  time: { ...authText.small, minWidth: 42, paddingHorizontal: 0, paddingVertical: 3, color: onboardingColors.dark },
  dash: { ...authText.small, color: "#D1D5DC" },
  chevronButton: { width: 16, height: 20, alignItems: "center", justifyContent: "center" },
  chevron: { width: 16, height: 16, tintColor: onboardingColors.secondary, transform: [{ rotate: "-90deg" }] },
  chevronUp: { transform: [{ rotate: "90deg" }] },
});
