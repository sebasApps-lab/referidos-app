import { StyleSheet } from "react-native";

export const adminRuntimeStyles = StyleSheet.create({
  listWrap: {
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 11,
    padding: 10,
    backgroundColor: "#F8FAFC",
    gap: 4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  listTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  metaText: {
    fontSize: 11,
    color: "#475569",
  },
  bodyText: {
    fontSize: 12,
    color: "#334155",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  warningBtn: {
    backgroundColor: "#B45309",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  warningBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  dangerBtn: {
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FFF1F2",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  dangerBtnText: {
    color: "#BE123C",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.55,
  },
  codePill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  codePillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#475569",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#F5F3FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#5B21B6",
  },
  jsonBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  jsonText: {
    fontSize: 11,
    color: "#334155",
    fontFamily: "monospace",
  },
});
