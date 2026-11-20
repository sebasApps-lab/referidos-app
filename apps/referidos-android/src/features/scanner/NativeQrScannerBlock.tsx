import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";

type Props = {
  disabled: boolean;
  onDetected: (code: string) => void;
  onError: () => void;
};

const SCAN_INTERVAL_MS = 1000;
const FRAME_INSET = 24;

export default function NativeQrScannerBlock({ disabled, onDetected, onError }: Props) {
  const lastDetection = useRef(0);
  const [paused, setPaused] = useState(false);
  const [torch, setTorch] = useState(false);
  const [frameSize, setFrameSize] = useState(0);
  const active = !paused && !disabled;

  return (
    <View style={styles.container}>
      <View
        style={styles.preview}
        onLayout={(event) => setFrameSize(Math.max(0, Math.floor(event.nativeEvent.layout.width - FRAME_INSET * 2)))}
      >
        <Camera
          style={StyleSheet.absoluteFill}
          cameraType={CameraType.Back}
          scanBarcode
          allowedBarcodeTypes={["qr"]}
          scanThrottleDelay={SCAN_INTERVAL_MS}
          showFrame
          frameColor="transparent"
          laserColor="transparent"
          barcodeFrameSize={frameSize ? { width: frameSize, height: frameSize } : undefined}
          torchMode={torch && !paused ? "on" : "off"}
          onReadCode={(event) => {
            if (!active) return;
            const code = event.nativeEvent.codeStringValue.trim();
            const now = Date.now();
            if (code.length < 4 || now - lastDetection.current < SCAN_INTERVAL_MS) return;
            lastDetection.current = now;
            onDetected(code);
          }}
          onError={onError}
        />
        <View pointerEvents="none" style={styles.topLine} />
        <View pointerEvents="none" style={styles.guide} />
        {paused ? (
          <View pointerEvents="none" style={styles.pausedOverlay}>
            <Text style={styles.pausedText}>Escáner en pausa</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.hint}>Coloca el código QR dentro del marco.</Text>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" onPress={() => setPaused((value) => !value)} style={styles.control}>
          <Text style={styles.controlText}>{paused ? "Reanudar" : "Pausar"}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: torch }}
          accessibilityLabel="Linterna"
          onPress={() => setTorch((value) => !value)}
          style={[styles.control, torch && styles.controlActive]}
        >
          <Text style={styles.controlText}>{torch ? "Apagar linterna" : "Linterna"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: "center", width: "100%", maxWidth: 384, gap: 8 },
  preview: { width: "100%", aspectRatio: 1, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#171324" },
  topLine: { position: "absolute", top: 0, left: 0, right: 0, height: 4, backgroundColor: "#5E30A5" },
  guide: { position: "absolute", top: FRAME_INSET, left: FRAME_INSET, right: FRAME_INSET, bottom: FRAME_INSET, borderWidth: 1, borderColor: "#FFFFFF88", borderRadius: 16 },
  pausedOverlay: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center", backgroundColor: "#18112377" },
  pausedText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  hint: { textAlign: "center", color: "#64748B", fontSize: 13, lineHeight: 18 },
  actions: { justifyContent: "center", flexDirection: "row", flexWrap: "wrap", gap: 8 },
  control: { justifyContent: "center", minHeight: 44, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, paddingHorizontal: 12 },
  controlActive: { backgroundColor: "#F3EEFF" },
  controlText: { color: "#5E30A5", fontSize: 13, fontWeight: "600" },
});
