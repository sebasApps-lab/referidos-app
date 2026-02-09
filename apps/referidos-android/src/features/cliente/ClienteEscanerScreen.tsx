import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchCurrentUserRow,
  fetchQrHistoryByClientId,
  formatDateTime,
  readFirst,
} from "@shared/services/entityQueries";

export default function ClienteEscanerScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const [manualCode, setManualCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recent, setRecent] = useState<any[]>([]);

  const loadRecent = useCallback(async () => {
    setLoadingRecent(true);
    const onboardingUserId = onboarding?.usuario?.id || null;
    let userId = onboardingUserId;
    if (!userId) {
      const current = await fetchCurrentUserRow(supabase);
      userId = current.ok ? current.data?.id : null;
    }
    if (!userId) {
      setRecent([]);
      setLoadingRecent(false);
      return;
    }
    const history = await fetchQrHistoryByClientId(supabase, userId, 8);
    setRecent(history.ok ? history.data : []);
    setLoadingRecent(false);
  }, [onboarding?.usuario?.id]);

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  const handleValidatePreview = useCallback(async () => {
    setMessage("");
    setMessageError("");
    const clean = manualCode.trim();
    if (clean.length < 6) {
      setMessageError("Ingresa un codigo valido (minimo 6 caracteres).");
      return;
    }

    await observability.track({
      level: "info",
      category: "scanner",
      message: "scanner_manual_preview",
      context: { code_length: clean.length },
    });

    const data = await mobileApi.auth.runOnboardingCheck();
    if (!data?.ok) {
      setMessageError("No se pudo validar sesion para previsualizar el QR.");
      return;
    }

    setMessage(
      "Codigo recibido. El escaneo nativo de camara se completa en la fase 8; por ahora usa previsualizacion manual.",
    );
  }, [manualCode]);

  return (
    <ScreenScaffold title="Escaner cliente" subtitle="Flujo base listo para migracion de camara nativa">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Ingreso manual de codigo">
          <Text style={styles.helper}>
            Puedes validar el flujo escribiendo un codigo. El escaneo por camara se conecta en la fase 8.
          </Text>
          <TextInput
            value={manualCode}
            onChangeText={setManualCode}
            style={styles.input}
            placeholder="Ej: QR-XXXX-XXXX"
            autoCapitalize="characters"
          />
          <Pressable onPress={handleValidatePreview} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Validar previsualizacion</Text>
          </Pressable>
          {message ? <Text style={styles.ok}>{message}</Text> : null}
          {messageError ? <Text style={styles.error}>{messageError}</Text> : null}
        </SectionCard>

        <SectionCard
          title="Ultimos codigos detectados"
          subtitle="Referencia rapida mientras llega scanner nativo"
          right={
            <Pressable onPress={loadRecent} style={styles.refreshButton}>
              <Text style={styles.refreshText}>Recargar</Text>
            </Pressable>
          }
        >
          {loadingRecent ? <BlockSkeleton lines={4} compact /> : null}
          {!loadingRecent && recent.length === 0 ? (
            <Text style={styles.emptyText}>No hay codigos recientes.</Text>
          ) : null}
          {!loadingRecent
            ? recent.map((row, index) => {
                const code = readFirst(row, ["code", "codigo"], "sin_codigo");
                const status = readFirst(row, ["status", "estado"], "sin_estado");
                const created = readFirst(row, ["created_at", "updated_at"], null);
                return (
                  <View key={`${readFirst(row, ["id"], index)}-${index}`} style={styles.item}>
                    <Text style={styles.itemTitle}>{String(code)}</Text>
                    <Text style={styles.itemMeta}>{String(status)}</Text>
                    <Text style={styles.itemMeta}>{formatDateTime(created)}</Text>
                  </View>
                );
              })
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
    backgroundColor: "#FFFFFF",
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
