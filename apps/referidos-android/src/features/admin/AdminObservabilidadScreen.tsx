import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import ObservabilityEventFeed from "@shared/ui/ObservabilityEventFeed";

export default function AdminObservabilidadScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenScaffold
      title="Admin Observabilidad"
      subtitle="Issues, eventos y catalogo de errores para admin."
    >
      <View style={styles.content}>
        <SectionCard title="Rutas de observabilidad" subtitle="Equivalentes a issues/events/details web">
          <View style={styles.actions}>
            <NavCard
              title="Issues"
              description="Listado principal de issues."
              onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.ISSUES)}
            />
            <NavCard
              title="Error codes"
              description="Catalogo de errores observados."
              onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.ERROR_CODES)}
            />
            <NavCard
              title="Logs"
              description="Auditoria de eventos soporte/obs."
              onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.LOGS)}
            />
          </View>
        </SectionCard>
        <ObservabilityEventFeed
          title="Eventos recientes"
          subtitle="Incluye request_id, trace_id, session_id y contexto de ruta/pantalla."
          defaultDomain="all"
          allowedDomains={["observability", "support"]}
          limit={60}
          screenTag="admin_observabilidad"
        />
      </View>
    </ScreenScaffold>
  );
}

function NavCard({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>
      <Text style={styles.cardLink}>Abrir</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 12,
  },
  actions: {
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#F9F7FF",
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2F1A55",
  },
  cardText: {
    fontSize: 12,
    color: "#475569",
  },
  cardLink: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "700",
    color: "#5B21B6",
  },
});
