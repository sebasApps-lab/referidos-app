import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

type Matrix = boolean[][];
const createQr = require("qr.js") as (value: string) => { modules: Matrix };

export default function QrCodeImage({ value, label, size = 168 }: {
  value: string;
  label: string;
  size?: number;
}) {
  const matrix = useMemo(() => createQr(value).modules, [value]);
  const unit = size / (matrix.length + 8);
  return (
    <View accessibilityRole="image" accessibilityLabel={label} style={{ width: size, height: size, backgroundColor: "#FFFFFF" }}>
      {matrix.flatMap((row, y) => {
        const bars = [];
        let start = -1;
        for (let x = 0; x <= row.length; x += 1) {
          if (row[x] && start < 0) start = x;
          if (!row[x] && start >= 0) {
            bars.push(
              <View key={`${y}-${start}`} style={[
                styles.bar,
                { left: (4 + start) * unit, top: (4 + y) * unit, width: (x - start) * unit, height: unit },
              ]} />,
            );
            start = -1;
          }
        }
        return bars;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { position: "absolute", backgroundColor: "#000000" },
});
