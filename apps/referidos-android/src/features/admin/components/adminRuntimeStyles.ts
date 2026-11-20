import { StyleSheet } from "react-native";

export const adminRuntimeStyles = StyleSheet.create({
  listWrap: {
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FAF8FF",
    gap: 4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2F1A55",
  },
  listTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2F1A55",
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
    backgroundColor: "#5E30A5",
    borderRadius: 12,
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
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
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
