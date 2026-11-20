import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { staffIcons } from "./staffNavigation";

export default function StaffSelect<Id extends string>({ label, value, options, onSelect, disabled, appearance = "filter" }: {
  label: string;
  value: Id;
  options: readonly { id: Id; label: string }[];
  onSelect: (next: Id) => void;
  disabled?: boolean;
  appearance?: "filter" | "field";
}) {
  const [open, setOpen] = useState(false);
  const display = options.find((option) => option.id === value)?.label;
  const isFilter = appearance === "filter";
  const buttonLabel = isFilter && value === "todos" ? `${label}: todos` : display;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${display ?? value}`}
        accessibilityState={{ disabled: Boolean(disabled), expanded: open }}
        onPress={() => setOpen(true)}
        disabled={disabled}
        style={[styles.control, isFilter && styles.filter, disabled && styles.disabled]}
      >
        {isFilter && <Image source={staffIcons.filters} style={styles.icon} />}
        <Text style={styles.label}>{buttonLabel}</Text>
        <Image source={staffIcons.chevronDown} style={styles.icon} />
      </Pressable>
      <Modal visible={open} transparent onRequestClose={() => setOpen(false)} animationType="fade">
        <View style={styles.overlay}>
          <Pressable accessibilityRole="button" accessibilityLabel="Cerrar opciones" onPress={() => setOpen(false)} style={StyleSheet.absoluteFill} />
          <View accessibilityViewIsModal style={styles.panel}>
            <Text accessibilityRole="header" style={styles.title}>{label}</Text>
            <ScrollView keyboardShouldPersistTaps="handled">
              {options.map((option) => (
                <Pressable
                  key={option.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: option.id === value }}
                  style={[styles.option, option.id === value && styles.selected]}
                  onPress={() => { onSelect(option.id); setOpen(false); }}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  control: { flexGrow: 1, minHeight: 40, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FFFFFF", borderColor: "#E9E2F7", borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  filter: { backgroundColor: "#F8FAFC", borderColor: "#E2E8F0" },
  disabled: { opacity: 0.55 },
  label: { flex: 1, color: "#475569", fontSize: 14, fontWeight: "600", includeFontPadding: false },
  icon: { height: 14, width: 14, tintColor: "#64748B" },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24, backgroundColor: "#00000066" },
  panel: { width: "100%", maxWidth: 320, maxHeight: "86%", gap: 4, padding: 16, backgroundColor: "#FFFFFF", borderRadius: 16, elevation: 4 },
  title: { color: "#2F1A55", fontSize: 18, lineHeight: 28, fontWeight: "600", includeFontPadding: false },
  option: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12 },
  selected: { backgroundColor: "#F0EBFF" },
  optionText: { color: "#2F1A55", fontSize: 14, fontWeight: "600" },
});
