import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BlockSkeleton from "@shared/ui/BlockSkeleton";

type Props = {
  feature: string;
  description: string;
  loadingMs?: number;
};

export default function FeaturePlaceholder({
  feature,
  description,
  loadingMs = 550,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => setReady(true), loadingMs);
    return () => clearTimeout(timer);
  }, [feature, loadingMs]);

  return (
    <View style={styles.card}>
      {!ready ? (
        <BlockSkeleton lines={3} />
      ) : (
        <>
          <Text style={styles.feature}>{feature}</Text>
          <Text style={styles.description}>{description}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  feature: {
    color: "#5B21B6",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    color: "#4B5563",
    fontSize: 13,
    lineHeight: 20,
  },
});
