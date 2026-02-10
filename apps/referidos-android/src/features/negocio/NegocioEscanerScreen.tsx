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
} from "@shared/services/entityQueries";

export default function NegocioEscanerScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const [manualCode, setManualCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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

  const handlePreview = useCallback(async (incomingCode?: string) => {
    setMessage("");
    setError("");
    const clean = String(incomingCode ?? manualCode).trim();
    if (clean.length < 6) {
      setError("Ingresa un codigo valido para previsualizar.");
      return;
    }
    setManualCode(clean);

    await observability.track({
      level: "info",
      category: "scanner",
      message: "negocio_scanner_manual_preview",
      context: { code_length: clean.length },
    });

    setMessage(
      "Codigo capturado. El escaneo nativo con camara se integra en la fase 8.",
    );
  }, [manualCode]);

  return (
    <ScreenScaffold title="Escaner negocio" subtitle="Preview manual y movimientos recientes">
      <ScrollView contentContainerStyle={styles.content}>
        <NativeQrScannerBlock
          onDetected={(code) => {
            void handlePreview(code);
          }}
        />

        <SectionCard title="Validacion manual">
          <Text style={styles.helper}>
            Usa este bloque para validar flujo mientras se conecta el escaner nativo.
          </Text>
          <TextInput
            value={manualCode}
            onChangeText={setManualCode}
            style={styles.input}
            placeholder="Ej: QR-ABCD-1234"
            autoCapitalize="characters"
          />
          <Pressable onPress={() => { void handlePreview(); }} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Validar previsualizacion</Text>
          </Pressable>
          {message ? <Text style={styles.ok}>{message}</Text> : null}
          {error ? <Text style={styles.error}>{error}</Text> : null}
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
  ok: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
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
