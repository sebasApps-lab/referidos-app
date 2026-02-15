import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { observability, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import NativeQrScannerBlock from "@features/scanner/NativeQrScannerBlock";
import {
  fetchBusinessByUserId,
  fetchCurrentUserRow,
  fetchQrHistoryByBusinessId,
  formatDateTime,
  readFirst,
  redeemValidQrCode,
} from "@shared/services/entityQueries";

type ScannerOutcome = "valido" | "canjeado" | "expirado" | "estatico" | "invalido";

function parseQrKind(code: string): "qrv" | "qrs" | "invalid" {
  const normalized = String(code || "").trim().toLowerCase();
  if (normalized.startsWith("qrv-")) return "qrv";
  if (normalized.startsWith("qrs-")) return "qrs";
  return "invalid";
}

function mapRedeemFailure(message: string): ScannerOutcome {
  const text = String(message || "").toLowerCase();
  if (text.includes("canjeado") || text.includes("redeemed")) return "canjeado";
  if (text.includes("expir") || text.includes("venc")) return "expirado";
  return "invalido";
}

export default function NegocioEscanerScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const [manualCode, setManualCode] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | { code: string; outcome: ScannerOutcome; note: string }>(null);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recent, setRecent] = useState<any[]>([]);

  const loadRecent = useCallback(async () => {
    setRecentLoading(true);
    const onboardingUserId = onboarding?.usuario?.id || null;
    let userId = onboardingUserId;
    if (!userId) {
      const current = await fetchCurrentUserRow(supabase);
      userId = current.ok ? current.data?.id : null;
    }
    if (!userId) {
      setRecent([]);
      setRecentLoading(false);
      return;
    }
    const businessResult = await fetchBusinessByUserId(supabase, userId);
    if (!businessResult.ok || !businessResult.data?.id) {
      setRecent([]);
      setRecentLoading(false);
      return;
    }
    const qrResult = await fetchQrHistoryByBusinessId(supabase, businessResult.data.id, 8);
    setRecent(qrResult.ok ? qrResult.data : []);
    setRecentLoading(false);
  }, [onboarding?.usuario?.id]);

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  const handleProcessCode = useCallback(async (incomingCode?: string) => {
    setResult(null);
    setError("");
    const clean = String(incomingCode ?? manualCode).trim();
    if (clean.length < 6) {
      setError("Ingresa un codigo valido para continuar.");
      return;
    }
    setManualCode(clean);

    const kind = parseQrKind(clean);
    if (kind === "invalid") {
      setError("QR no reconocido. Debe iniciar con qrv- o qrs-.");
      return;
    }
    if (kind === "qrs") {
      setResult({
        code: clean,
        outcome: "estatico",
        note: "QR estatico detectado. Solo los qrv-* son canjeables en negocio.",
      });
      return;
    }

    await observability.track({
      level: "info",
      category: "scanner",
      message: "negocio_scanner_redeem_attempt",
      context: { code_length: clean.length },
    });

    const redeem = await redeemValidQrCode(supabase, clean);
    if (!redeem.ok) {
      const mapped = mapRedeemFailure(redeem.error || "redeem_failed");
      setResult({
        code: clean,
        outcome: mapped,
        note:
          mapped === "canjeado"
            ? "Este QR ya fue canjeado previamente."
            : mapped === "expirado"
            ? "Este QR ya expiro y no puede canjearse."
            : (redeem.error || "No se pudo canjear el QR."),
      });
      return;
    }

    setResult({
      code: clean,
      outcome: "valido",
      note: `Canje exitoso para promo ${readFirst(redeem.data, ["promo_titulo", "promoTitulo"], "sin titulo")}.`,
    });
    await loadRecent();
  }, [loadRecent, manualCode]);

  return (
    <ScreenScaffold title="Escaner negocio" subtitle="Canje QR con fallback manual">
      <ScrollView contentContainerStyle={styles.content}>
        <NativeQrScannerBlock
          onDetected={(code) => {
            void handleProcessCode(code);
          }}
        />

        <SectionCard title="Validacion manual">
          <Text style={styles.helper}>
            Si no puedes usar camara, ingresa el codigo manualmente para canjear.
          </Text>
          <TextInput
            value={manualCode}
            onChangeText={setManualCode}
            style={styles.input}
            placeholder="Ej: qrv-XXXX-XXXX"
            autoCapitalize="characters"
          />
          <Pressable onPress={() => { void handleProcessCode(); }} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Procesar QR</Text>
          </Pressable>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </SectionCard>

        <SectionCard title="Resultado de escaneo">
          {!result && !error ? (
            <Text style={styles.emptyText}>Escanea o ingresa un codigo para ver el resultado.</Text>
          ) : null}
          {result ? (
            <View style={styles.resultBox}>
              <View style={styles.resultTop}>
                <Text style={styles.resultCode} numberOfLines={1}>
                  {result.code}
                </Text>
                <Text
                  style={[
                    styles.resultBadge,
                    result.outcome === "valido"
                      ? styles.resultBadgeValid
                      : result.outcome === "canjeado"
                      ? styles.resultBadgeRedeemed
                      : result.outcome === "expirado"
                      ? styles.resultBadgeExpired
                      : result.outcome === "estatico"
                      ? styles.resultBadgeStatic
                      : styles.resultBadgeInvalid,
                  ]}
                >
                  {result.outcome}
                </Text>
              </View>
              <Text style={styles.resultNote}>{result.note}</Text>
            </View>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Ultimos codigos de mi negocio"
          right={
            <Pressable onPress={loadRecent} style={styles.refreshButton}>
              <Text style={styles.refreshText}>Recargar</Text>
            </Pressable>
          }
        >
          {recentLoading ? <BlockSkeleton lines={4} compact /> : null}
          {!recentLoading && recent.length === 0 ? (
            <Text style={styles.emptyText}>Sin registros recientes.</Text>
          ) : null}
          {!recentLoading
            ? recent.map((row, index) => (
                <View key={`${readFirst(row, ["id"], index)}-${index}`} style={styles.item}>
                  <Text style={styles.itemTitle}>
                    {String(readFirst(row, ["code", "codigo"], "sin_codigo"))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {String(readFirst(row, ["status", "estado"], "sin_estado"))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {formatDateTime(readFirst(row, ["created_at", "updated_at"], null))}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 20,
  },
  helper: {
    color: "#4B5563",
    fontSize: 12,
    lineHeight: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  error: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  refreshButton: {
    backgroundColor: "#F4EEFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  refreshText: {
    color: "#5B21B6",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 12,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
    backgroundColor: "#FFFFFF",
  },
  resultTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  resultCode: {
    flex: 1,
    color: "#181B2A",
    fontWeight: "700",
    fontSize: 12,
  },
  resultBadge: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 10,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  resultBadgeValid: {
    color: "#047857",
    backgroundColor: "#DCFCE7",
  },
  resultBadgeRedeemed: {
    color: "#1D4ED8",
    backgroundColor: "#DBEAFE",
  },
  resultBadgeExpired: {
    color: "#B91C1C",
    backgroundColor: "#FEE2E2",
  },
  resultBadgeStatic: {
    color: "#92400E",
    backgroundColor: "#FEF3C7",
  },
  resultBadgeInvalid: {
    color: "#B91C1C",
    backgroundColor: "#FEE2E2",
  },
  resultNote: {
    color: "#4B5563",
    fontSize: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  itemTitle: {
    color: "#181B2A",
    fontWeight: "700",
    fontSize: 12,
  },
  itemMeta: {
    color: "#6B7280",
    fontSize: 11,
  },
});
