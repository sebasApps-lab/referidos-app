import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export default function ScreenScaffold({ title, subtitle, children }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
