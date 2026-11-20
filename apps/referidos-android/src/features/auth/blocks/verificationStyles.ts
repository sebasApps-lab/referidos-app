import { StyleSheet } from "react-native";

export const verificationStyles = StyleSheet.create({
  container: { flexGrow: 1, gap: 24, paddingBottom: 4 },
  content: { flexGrow: 1, gap: 16 },
  footer: { marginTop: "auto", gap: 12 },
  heading: { color: "#111827", fontSize: 18, lineHeight: 28, fontWeight: "600", textAlign: "center" },
  body: { color: "#4B5563", fontSize: 14, lineHeight: 20 },
  caption: { color: "#6B7280", fontSize: 12, lineHeight: 16 },
  center: { textAlign: "center" },
  field: { gap: 6 },
  fieldLabel: { color: "#111827", fontSize: 14, lineHeight: 20, fontWeight: "600" },
  fieldFrame: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  fieldInput: { color: "#374151", fontSize: 14, flex: 1, paddingHorizontal: 12, paddingVertical: 8 },
  statusCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  ok: { color: "#059669", fontSize: 14, fontWeight: "600" },
  error: { color: "#DC2626", fontSize: 12, lineHeight: 16 },
});
