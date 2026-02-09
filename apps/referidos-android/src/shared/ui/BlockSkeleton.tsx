import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  lines?: number;
  compact?: boolean;
};

export default function BlockSkeleton({ lines = 4, compact = false }: Props) {
  return (
    <View style={styles.wrap}>
      {Array.from({ length: lines }).map((_, index) => (
        <View
          key={`s-${index}`}
          style={[
            styles.line,
            compact && styles.compactLine,
            index === 0 && styles.firstLine,
            index === lines - 1 && styles.lastLine,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  line: {
    height: 12,
    borderRadius: 8,
    backgroundColor: "#EEF1F6",
  },
  compactLine: {
    height: 10,
  },
  firstLine: {
    width: "68%",
  },
  lastLine: {
    width: "84%",
  },
});

