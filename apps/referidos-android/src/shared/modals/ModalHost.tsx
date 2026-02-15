import React, { useEffect } from "react";
import {
  BackHandler,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useModalStore } from "@shared/store/modalStore";

function resolveToneStyle(tone?: "default" | "warning" | "danger") {
  if (tone === "warning") return { color: "#B45309", bg: "#FEF3C7" };
  if (tone === "danger") return { color: "#B91C1C", bg: "#FEE2E2" };
  return { color: "#5B21B6", bg: "#F4EEFF" };
}

export default function ModalHost() {
  const modal = useModalStore((state) => state.activeModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const confirm = useModalStore((state) => state.confirm);
  const cancel = useModalStore((state) => state.cancel);
  const acknowledge = useModalStore((state) => state.acknowledge);
  const pickOption = useModalStore((state) => state.pickOption);
  const applyPicker = useModalStore((state) => state.applyPicker);

  useEffect(() => {
    if (!modal) return undefined;
    const statusEntry = StatusBar.pushStackEntry({ barStyle: "light-content" });
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      const dismissible = modal.dismissible !== false;
      if (dismissible) {
        cancel();
      }
      return true;
    });
    return () => {
      sub.remove();
      StatusBar.popStackEntry(statusEntry);
    };
  }, [cancel, modal]);

  if (!modal) return null;

  const dismissible = modal.dismissible !== false;
  const tone = resolveToneStyle(modal.tone);

  return (
    <Modal
      transparent
      visible
      animationType="fade"
      onRequestClose={() => {
        if (dismissible) cancel();
      }}
    >
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          if (dismissible) cancel();
        }}
      >
        <Pressable style={styles.card} onPress={() => {}}>
          <View style={[styles.badge, { backgroundColor: tone.bg }]}>
            <Text style={[styles.badgeText, { color: tone.color }]}>Accion requerida</Text>
          </View>
          <Text style={styles.title}>{modal.title}</Text>
          {modal.message ? <Text style={styles.message}>{modal.message}</Text> : null}

          {modal.kind === "picker" ? (
            <>
              <ScrollView style={styles.pickerList}>
                {modal.options.map((option) => {
                  const selected = modal.selectedId === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      disabled={option.disabled}
                      onPress={() => pickOption(option.id)}
                      style={[
                        styles.pickerItem,
                        selected && styles.pickerItemSelected,
                        option.disabled && styles.pickerItemDisabled,
                      ]}
                    >
                      <Text
                        style={[styles.pickerLabel, option.disabled && styles.pickerLabelDisabled]}
                      >
                        {option.label}
                      </Text>
                      {option.description ? (
                        <Text
                          style={[
                            styles.pickerDescription,
                            option.disabled && styles.pickerLabelDisabled,
                          ]}
                        >
                          {option.description}
                        </Text>
                      ) : null}
                    </Pressable>
                  );
                })}
              </ScrollView>
              <View style={styles.actions}>
                <Pressable style={styles.secondaryButton} onPress={cancel}>
                  <Text style={styles.secondaryText}>
                    {modal.cancelLabel || "Cancelar"}
                  </Text>
                </Pressable>
                <Pressable style={styles.primaryButton} onPress={applyPicker}>
                  <Text style={styles.primaryText}>{modal.confirmLabel || "Aplicar"}</Text>
                </Pressable>
              </View>
            </>
          ) : null}

          {modal.kind === "confirm" ? (
            <View style={styles.actions}>
              <Pressable style={styles.secondaryButton} onPress={cancel}>
                <Text style={styles.secondaryText}>{modal.cancelLabel || "Cancelar"}</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={confirm}>
                <Text style={styles.primaryText}>{modal.confirmLabel || "Confirmar"}</Text>
              </Pressable>
            </View>
          ) : null}

          {modal.kind === "alert" ? (
            <View style={styles.actions}>
              <Pressable style={styles.primaryButton} onPress={acknowledge}>
                <Text style={styles.primaryText}>{modal.actionLabel || "Entendido"}</Text>
              </Pressable>
            </View>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(17,24,39,0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  title: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  message: {
    color: "#4B5563",
    fontSize: 13,
    lineHeight: 20,
  },
  pickerList: {
    maxHeight: 230,
  },
  pickerItem: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  pickerItemSelected: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  pickerItemDisabled: {
    opacity: 0.45,
  },
  pickerLabel: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
  },
  pickerDescription: {
    color: "#6B7280",
    fontSize: 11,
  },
  pickerLabelDisabled: {
    color: "#9CA3AF",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  secondaryText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 13,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});
