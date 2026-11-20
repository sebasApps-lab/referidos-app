import React from "react";
import { type NavigationProp, type ParamListBase, useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, type ImageSourcePropType, View } from "react-native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import { staffIcons } from "@features/staff/staffNavigation";
import ObservabilityEventFeed from "@shared/ui/ObservabilityEventFeed";

export default function AdminObservabilidadScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <ScreenScaffold
      title="Observabilidad"
      subtitle="Issues, eventos y catálogo de errores"
    >
      <View style={styles.content}>
        <View style={styles.actions}>
          <NavCard title="Issues" primary icon={staffIcons.activity} onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.ISSUES)} />
          <NavCard title="Catálogo de errores" icon={staffIcons.alert} onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.ERROR_CODES)} />
          <NavCard title="Logs" icon={staffIcons.file} onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.LOGS)} />
        </View>
        <ObservabilityEventFeed
          title="Eventos recientes"
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
  icon,
  onPress,
  primary,
}: {
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.link, primary && styles.primaryLink]}>
      <Image source={icon} style={[styles.icon, primary && styles.primaryIcon]} />
      <Text style={[styles.linkText, primary && styles.primaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 12,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  primaryLink: { backgroundColor: "#5E30A5", borderColor: "#5E30A5" },
  icon: { width: 16, height: 16, tintColor: "#5E30A5" },
  primaryIcon: { tintColor: "#FFFFFF" },
  linkText: { color: "#5E30A5", fontSize: 13, fontWeight: "600" },
  primaryText: { color: "#FFFFFF" },
});
