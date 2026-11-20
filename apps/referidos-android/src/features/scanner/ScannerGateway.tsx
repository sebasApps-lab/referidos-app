import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator, AppState, Image, Keyboard, Linking, PermissionsAndroid, Platform,
  Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from "react-native";
import NativeQrScannerBlock from "./NativeQrScannerBlock";
import ScannerFeedbackCard, { type ScannerFeedback } from "./ScannerFeedbackCard";
import ScannerHistory, { type ScannerHistoryProps } from "./ScannerHistory";

type CameraPermission = "granted" | "denied" | "blocked";
type Props = {
  isBusiness?: boolean;
  onProcess: (code: string) => Promise<ScannerFeedback>;
  history: ScannerHistoryProps;
};

const CAMERA_PERMISSION = PermissionsAndroid.PERMISSIONS.CAMERA;

export default function ScannerGateway({ isBusiness = false, onProcess, history }: Props) {
  const focused = useIsFocused();
  const [appActive, setAppActive] = useState(AppState.currentState === "active");
  const [permission, setPermission] = useState<CameraPermission | null>(null);
  const [prompted, setPrompted] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [cameraFailed, setCameraFailed] = useState(false);
  const [manual, setManual] = useState(false);
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState<ScannerFeedback | null>(null);
  const scroll = useRef<ScrollView>(null);
  const busy = useRef(false);
  const requestingRef = useRef(false);
  const scanFinished = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => setAppActive(state === "active"));
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!focused || !appActive || requesting) return;
    let cancelled = false;
    async function refreshPermission() {
      try {
        const granted = Platform.OS !== "android" || await PermissionsAndroid.check(CAMERA_PERMISSION);
        if (!cancelled) {
          setPermission((previous) => granted ? "granted" : previous === "blocked" ? "blocked" : "denied");
        }
      } catch {
        if (!cancelled) setPermission("denied");
      }
    }
    void refreshPermission();
    return () => { cancelled = true; };
  }, [focused, appActive, requesting]);

  async function activateCamera() {
    if (requestingRef.current) return;
    setPrompted(true);
    setCameraFailed(false);
    setManual(false);
    if (permission === "granted") return;

    requestingRef.current = true;
    setRequesting(true);
    try {
      if (permission === "blocked") {
        await Linking.openSettings();
        return;
      }
      const result = await PermissionsAndroid.request(CAMERA_PERMISSION);
      if (result === PermissionsAndroid.RESULTS.GRANTED) setPermission("granted");
      else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) setPermission("blocked");
      else setPermission("denied");
    } catch {
      setCameraFailed(true);
    } finally {
      requestingRef.current = false;
      setRequesting(false);
    }
  }

  const process = useCallback(async (value: string, fromCamera = false) => {
    if (busy.current || (fromCamera && scanFinished.current)) return;
    const code = value.trim();
    if (code.length < 6) {
      scanFinished.current = true;
      setFeedback({ message: "Ingresa un código válido de al menos seis caracteres.", tone: "error" });
      return;
    }

    busy.current = true;
    scanFinished.current = true;
    setProcessing(true);
    setFeedback(null);
    try {
      setFeedback(await onProcess(code));
    } catch {
      setFeedback({ message: "No se pudo procesar el código. Inténtalo de nuevo.", tone: "error" });
    } finally {
      busy.current = false;
      setProcessing(false);
    }
  }, [onProcess]);

  const showIntro = permission === "denied" && !prompted;
  const showCamera = permission === "granted" && !cameraFailed && !manual;
  const heading = manual || !showCamera ? "Ingresa el código manualmente" : isBusiness ? "Escáner de canje" : "";

  function startNextScan() {
    scanFinished.current = false;
    setFeedback(null);
    setInput("");
    scroll.current?.scrollTo({ y: 0, animated: true });
  }

  if (permission === null) {
    return <View style={styles.centered}><ActivityIndicator color="#5E30A5" accessibilityLabel="Comprobando permiso de cámara" /></View>;
  }

  if (showIntro) {
    return (
      <ScrollView style={styles.introBackground} contentContainerStyle={styles.intro}>
        <View style={styles.introCard}>
          <View style={styles.introIconBox}>
            <Image source={require("./assets/camera.png")} style={styles.introCamera} />
            <View style={styles.introBadge}>
              <Image source={require("../../navigation/assets/tab-qr-code.png")} style={styles.introQr} />
            </View>
          </View>
          <Text accessibilityRole="header" style={styles.introTitle}>Activa la cámara para escanear códigos</Text>
          <Text style={styles.introText}>Al permitir acceso a la cámara podrás leer los códigos en segundos.</Text>
          <View style={styles.introActions}>
            <ScannerButton label="Continuar" onPress={activateCamera} />
            <ScannerButton label="En otro momento" secondary onPress={() => setPrompted(true)} />
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView ref={scroll} style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {heading || processing ? (
        <View style={styles.header}>
          {heading ? <Text accessibilityRole="header" style={styles.heading}>{heading}</Text> : <View />}
          {processing ? <Text accessibilityLiveRegion="polite" style={styles.caption}>Procesando…</Text> : null}
        </View>
      ) : null}

      {showCamera ? (
        <>
          {focused && appActive ? (
            <NativeQrScannerBlock
              disabled={processing || Boolean(feedback)}
              onDetected={(code) => { void process(code, true); }}
              onError={() => setCameraFailed(true)}
            />
          ) : null}
          <ScannerButton label="Ingresar código" secondary disabled={processing} onPress={() => setManual(true)} />
        </>
      ) : (
        <View style={styles.manualContainer}>
          <View style={styles.manualHeader}>
            <View style={styles.smallCameraBox}><Image source={require("./assets/camera.png")} style={styles.smallCamera} /></View>
            <View style={styles.manualSummary}>
              <Text style={styles.cardTitle}>
                {cameraFailed ? "Cámara no disponible" : permission === "granted" ? "Ingreso manual" : "Cámara sin permiso"}
              </Text>
              <Text style={styles.caption}>Puedes usar la cámara o ingresar el código manualmente.</Text>
            </View>
          </View>
          <View style={styles.manualActions}>
            <ScannerButton
              label={permission === "blocked" ? "Abrir ajustes" : cameraFailed ? "Reintentar cámara" : permission === "granted" ? "Volver a la cámara" : "Activar cámara"}
              secondary
              disabled={processing || requesting}
              onPress={activateCamera}
            />
            {!manual ? <ScannerButton label="Ingresar código" disabled={requesting} onPress={() => setManual(true)} /> : null}
          </View>
          {manual ? (
            <View style={styles.manualForm}>
              <Text style={styles.manualHint}>Escribe o pega el código QR completo.</Text>
              <TextInput
                accessibilityLabel="Código QR completo"
                autoCapitalize="none"
                autoCorrect={false}
                value={input}
                onChangeText={setInput}
                editable={!processing}
                style={styles.input}
                placeholder="Ej. qrv-XXXX-XXXX"
                placeholderTextColor="#64748B"
                returnKeyType="go"
                onSubmitEditing={() => { if (input.trim().length >= 6) void process(input); }}
              />
              <ScannerButton
                label="Verificar"
                disabled={processing || input.trim().length < 6}
                onPress={() => {
                  Keyboard.dismiss();
                  void process(input);
                }}
              />
            </View>
          ) : null}
        </View>
      )}

      {feedback ? (
        <View
          style={styles.feedback}
          onLayout={(event) => {
            if (focused) scroll.current?.scrollTo({ y: Math.max(0, event.nativeEvent.layout.y - 16), animated: true });
          }}
        >
          <ScannerFeedbackCard feedback={feedback} />
          {showCamera ? <ScannerButton label="Escanear otro código" secondary onPress={startNextScan} /> : null}
        </View>
      ) : null}
      <ScannerHistory {...history} />
    </ScrollView>
  );
}

function ScannerButton({ label, secondary = false, disabled = false, onPress }: {
  label: string;
  secondary?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, disabled && styles.buttonDisabled, pressed && styles.buttonPressed]}
    >
      <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#FFFFFF" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  content: { width: "100%", maxWidth: 512, alignSelf: "center", paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  heading: { flex: 1, color: "#2F1A55", fontSize: 16, fontWeight: "600" },
  caption: { color: "#64748B", fontSize: 12, lineHeight: 17 },
  introBackground: { flex: 1, backgroundColor: "#F7F2FF" },
  intro: { flexGrow: 1, justifyContent: "center", padding: 24 },
  introCard: { width: "100%", maxWidth: 448, alignSelf: "center" },
  introIconBox: { width: 144, height: 144, alignSelf: "center", justifyContent: "center", alignItems: "center", borderRadius: 36, backgroundColor: "#F3EEFF", elevation: 8 },
  introCamera: { width: 62, height: 62, tintColor: "#5E30A5" },
  introBadge: { position: "absolute", right: -12, bottom: -12, width: 48, height: 48, borderWidth: 2, borderColor: "#FFFFFF", borderRadius: 24, backgroundColor: "#5E30A5", alignItems: "center", justifyContent: "center" },
  introQr: { width: 18, height: 18, tintColor: "#FFFFFF" },
  introTitle: { marginTop: 32, textAlign: "center", color: "#2F1A55", fontSize: 24, lineHeight: 32, fontWeight: "600" },
  introText: { marginTop: 12, textAlign: "center", color: "#64748B", fontSize: 15, lineHeight: 22 },
  introActions: { marginTop: 32, gap: 12 },
  button: { minHeight: 48, paddingHorizontal: 16, paddingVertical: 10, alignItems: "center", justifyContent: "center", borderRadius: 16, backgroundColor: "#5E30A5", borderWidth: 1, borderColor: "#5E30A5" },
  buttonSecondary: { borderColor: "#E9E2F7", backgroundColor: "#F9F6FF" },
  buttonDisabled: { opacity: 0.5 },
  buttonPressed: { opacity: 0.75 },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" },
  buttonTextSecondary: { color: "#5E30A5" },
  manualContainer: { borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", padding: 20, gap: 16, elevation: 1 },
  manualHeader: { flexDirection: "row", gap: 12 },
  smallCameraBox: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#F3EEFF" },
  smallCamera: { width: 18, height: 18, tintColor: "#5E30A5" },
  manualSummary: { flex: 1, gap: 4 },
  cardTitle: { color: "#2F1A55", fontSize: 14, fontWeight: "600" },
  manualActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  manualForm: { gap: 16 },
  manualHint: { color: "#64748B", fontSize: 13, textAlign: "center" },
  input: { minHeight: 44, borderRadius: 12, borderWidth: 1, borderColor: "#D8CFF2", paddingHorizontal: 12, color: "#5E30A5", fontSize: 16, fontWeight: "600" },
  feedback: { gap: 12 },
});
