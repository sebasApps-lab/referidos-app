import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PermissionsAndroid, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Camera } from "react-native-camera-kit";

type Props = {
  onDetected: (code: string) => void;
  title?: string;
  helper?: string;
};

export default function NativeQrScannerBlock({
  onDetected,
  title = "Escaneo con camara",
  helper = "Apunta al codigo QR para capturarlo automaticamente.",
}: Props) {
  const MIN_SCAN_INTERVAL_MS = 900;
  const DUPLICATE_COOLDOWN_MS = 2200;

  const [hasPermission, setHasPermission] = useState<boolean>(Platform.OS !== "android");
  const [permissionChecked, setPermissionChecked] = useState<boolean>(Platform.OS !== "android");
  const [cameraError, setCameraError] = useState("");
  const [paused, setPaused] = useState(false);
  const [torchMode, setTorchMode] = useState<"on" | "off">("off");
  const [lastCode, setLastCode] = useState("");
  const [lastDetectedAt, setLastDetectedAt] = useState<number | null>(null);

  const lastEmitRef = useRef<{ code: string; at: number }>({ code: "", at: 0 });

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (Platform.OS !== "android") {
        setPermissionChecked(true);
        setHasPermission(true);
        return;
      }
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (!mounted) return;
      setHasPermission(granted);
      setPermissionChecked(true);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const requestCameraPermission = useCallback(async () => {
    setCameraError("");
    if (Platform.OS !== "android") {
      setHasPermission(true);
      setPermissionChecked(true);
      return;
    }

    const current = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (current) {
      setHasPermission(true);
      setPermissionChecked(true);
      return;
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Permiso de camara",
        message: "Necesitamos acceso a la camara para escanear codigos QR.",
        buttonPositive: "Permitir",
        buttonNegative: "Cancelar",
      },
    );
    setHasPermission(result === PermissionsAndroid.RESULTS.GRANTED);
    setPermissionChecked(true);
  }, []);

  const onReadCode = useCallback(
    (event: any) => {
      if (paused || cameraError) return;
      const code = String(event?.nativeEvent?.codeStringValue || "").trim();
      if (!code || code.length < 4) return;
      const now = Date.now();
      const isSameCode = lastEmitRef.current.code === code;
      const elapsed = now - lastEmitRef.current.at;
      if (elapsed < MIN_SCAN_INTERVAL_MS) return;
      if (isSameCode && elapsed < DUPLICATE_COOLDOWN_MS) return;

      lastEmitRef.current = { code, at: now };
      setLastCode(code);
      setLastDetectedAt(now);
      onDetected(code);
    },
    [cameraError, onDetected, paused],
  );

  const permissionText = useMemo(() => {
    if (!permissionChecked) return "Activa permiso de camara para iniciar el scanner.";
    if (hasPermission) return "";
    return "Sin permiso de camara. Puedes seguir con ingreso manual.";
  }, [hasPermission, permissionChecked]);

  const handleCameraError = useCallback((event: any) => {
    const message = String(event?.nativeEvent?.errorMessage || "").trim();
    setCameraError(message || "La camara no pudo iniciarse. Puedes reintentar o usar ingreso manual.");
  }, []);

  const resetCamera = useCallback(() => {
    setCameraError("");
    setPaused(false);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.helper}>{helper}</Text>

      {hasPermission && !cameraError ? (
        <View style={styles.cameraWrap}>
          <Camera
            style={styles.camera}
            scanBarcode
            scanThrottleDelay={1000}
            torchMode={torchMode}
            onReadCode={onReadCode}
            onError={handleCameraError}
            showFrame
            laserColor="#6D28D9"
            frameColor="#A855F7"
          />
          {paused ? (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Scanner en pausa</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {hasPermission && cameraError ? (
        <View style={styles.permissionWrap}>
          <Text style={styles.permissionText}>{cameraError}</Text>
          <Pressable onPress={resetCamera} style={styles.permissionBtn}>
            <Text style={styles.permissionBtnText}>Reintentar camara</Text>
          </Pressable>
        </View>
      ) : null}

      {!hasPermission ? (
        <View style={styles.permissionWrap}>
          <Text style={styles.permissionText}>{permissionText}</Text>
          <Pressable onPress={requestCameraPermission} style={styles.permissionBtn}>
            <Text style={styles.permissionBtnText}>Activar camara</Text>
          </Pressable>
        </View>
      ) : null}

      {hasPermission ? (
        <View style={styles.controlsRow}>
          <Pressable onPress={() => setPaused((prev) => !prev)} style={styles.controlBtn}>
            <Text style={styles.controlBtnText}>{paused ? "Reanudar" : "Pausar"}</Text>
          </Pressable>
          <Pressable
            onPress={() => setTorchMode((prev) => (prev === "on" ? "off" : "on"))}
            style={[styles.controlBtn, torchMode === "on" && styles.controlBtnActive]}
          >
            <Text style={[styles.controlBtnText, torchMode === "on" && styles.controlBtnTextActive]}>
              {torchMode === "on" ? "Linterna ON" : "Linterna"}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {hasPermission && torchMode === "off" ? (
        <Text style={styles.hintText}>
          Si hay poca luz, activa la linterna para mejorar la lectura.
        </Text>
      ) : null}

      {lastCode ? (
        <Text style={styles.lastCode} numberOfLines={1}>
          Ultimo codigo: {lastCode}
        </Text>
      ) : null}
      {lastDetectedAt ? (
        <Text style={styles.lastCode}>
          Ultima deteccion: {new Date(lastDetectedAt).toLocaleTimeString()}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    gap: 8,
  },
  title: {
    color: "#181B2A",
    fontSize: 14,
    fontWeight: "700",
  },
  helper: {
    color: "#4B5563",
    fontSize: 12,
    lineHeight: 18,
  },
  cameraWrap: {
    height: 220,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#000000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(15,23,42,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  permissionWrap: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 10,
  },
  permissionText: {
    color: "#6B7280",
    fontSize: 12,
  },
  permissionBtn: {
    alignSelf: "flex-start",
    borderRadius: 8,
    backgroundColor: "#6D28D9",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  permissionBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  controlsRow: {
    flexDirection: "row",
    gap: 8,
  },
  controlBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  controlBtnActive: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  controlBtnText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
  },
  controlBtnTextActive: {
    color: "#5B21B6",
  },
  hintText: {
    color: "#6B7280",
    fontSize: 11,
  },
  lastCode: {
    color: "#374151",
    fontSize: 11,
  },
});
