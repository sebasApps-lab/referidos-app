import React from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useAppStore } from "@shared/store/appStore";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export default function ScreenScaffold({ title, subtitle, children }: Props) {
  const route = useRoute();
  const role = useAppStore((state) => state.role);
  const routeName = route?.name || "";

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {role ? <Text style={styles.roleChip}>{role.toUpperCase()}</Text> : null}
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {!subtitle ? <Text style={styles.subtitle}>Ruta: {routeName}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#181B2A",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  roleChip: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#F5F3FF",
    color: "#5B21B6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#667085",
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
});
