import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  label?: string;
};

export default function GlobalLoader({ label = "Cargando..." }: Props) {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color="#6D28D9" />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F8FC",
    gap: 12,
  },
  text: {
    fontSize: 14,
    color: "#4B5563",
  },
});
