import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ModalHost() {
  return (
    <View pointerEvents="none" style={styles.root}>
      <Text style={styles.text}>ModalHost (RN migration scaffold)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 11,
    color: "#9CA3AF",
  },
});
