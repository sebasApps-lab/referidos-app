import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";
import { TAB_ROUTES } from "./routeKeys";

const PURPLE = "#5E30A5";
const ICONS = {
  location: require("./assets/map-pin.png"),
  notifications: require("./assets/bell.png"),
  queue: require("./assets/timer.png"),
  help: require("./assets/circle-help.png"),
  logout: require("./assets/log-out.png"),
};

type Panel = "location" | "notifications" | "queue" | "help";
const TITLES: Record<Panel, string> = {
  location: "Tu ubicación",
  notifications: "Notificaciones",
  queue: "En cola",
  help: "¿Necesitas ayuda?",
};

export default function MobileRoleHeader({ role, routeName, onNavigate }: {
  role: "cliente" | "negocio";
  routeName: string;
  onNavigate: (route: string, params?: { profileSection: "personal" | "help" }) => void;
}) {
  const { top, left, right } = useSafeAreaInsets();
  const [panel, setPanel] = useState<Panel | null>(null);
  const onboarding = useAppStore((state) => state.onboarding);
  const signOut = useAppStore((state) => state.signOut);
  const confirm = useModalStore((state) => state.openConfirm);
  const user = onboarding?.usuario;
  const isClient = role === "cliente";
  const profileRoute = isClient ? TAB_ROUTES.CLIENTE.PERFIL : TAB_ROUTES.NEGOCIO.PERFIL;
  const inProfile = routeName === profileRoute;
  const name = String(user?.alias || user?.nombre || user?.email?.split("@")[0] || (isClient ? "Cliente" : "Negocio")).trim().split(/\s+/)[0];
  const avatar = user?.avatar_url || user?.foto_perfil || user?.avatar;
  const tier = String(user?.tier || "explorador").toLowerCase();
  const notifications = Array.isArray(user?.notificaciones) ? user.notificaciones : [];
  const notificationCount = notifications.length || Number(user?.notificacionesCount) || 0;
  const place = onboarding?.address || onboarding?.direccion;

  function logout() {
    confirm({
      title: "Cerrar sesión",
      message: "¿Quieres cerrar la sesión en este dispositivo?",
      confirmLabel: "Cerrar sesión",
      cancelLabel: "Cancelar",
      onConfirm: signOut,
    });
  }

  const labels = {
    location: "Mostrar ubicación",
    notifications: "Notificaciones",
    queue: "En cola",
    help: "Soporte",
    logout: "Cerrar sesión",
  };
  const actions: (Panel | "logout")[] = isClient
    ? ["location", "notifications", "queue"]
    : ["help", "notifications", "logout"];

  function iconButton(name: Panel | "logout") {
    return (
      <Pressable
        key={name}
        accessibilityRole="button"
        accessibilityLabel={labels[name]}
        accessibilityState={name === "logout" ? undefined : { expanded: panel === name }}
        onPress={() => name === "logout" ? logout() : setPanel(name)}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Image source={ICONS[name]} style={styles.icon} />
        {name === "notifications" && notificationCount > 0 && (
          <Text style={styles.count}>{notificationCount > 99 ? "99+" : notificationCount}</Text>
        )}
      </Pressable>
    );
  }

  function navigateFromPanel(route: string, profileSection: "personal" | "help") {
    setPanel(null);
    onNavigate(route, { profileSection });
  }

  return (
    <View style={[styles.root, inProfile && styles.rounded, { paddingTop: top + 12, paddingLeft: left + 16, paddingRight: right + 16 }]}>
      <StatusBar barStyle="light-content" />
      {inProfile ? (
        <View style={styles.profileRow}>
          <Text accessibilityRole="header" style={styles.profileTitle}>Configuración</Text>
          <View style={styles.profileAction}>{iconButton("logout")}</View>
        </View>
      ) : (
        <View style={styles.row}>
          <Pressable accessibilityRole="button" accessibilityLabel={`Perfil de ${name}`} onPress={() => onNavigate(profileRoute)} style={styles.identity}>
            <View>
              <View style={[styles.avatar, isClient && styles.clientAvatar]}>
                {typeof avatar === "string" && /^https?:\/\//i.test(avatar)
                  ? <Image source={{ uri: avatar }} style={styles.avatarImage} />
                  : <Text style={[styles.initial, isClient && styles.clientInitial]}>{name[0]?.toUpperCase()}</Text>}
              </View>
              {isClient && <Text style={styles.tierBadge}>{tier[0]?.toUpperCase() || "E"}</Text>}
            </View>
            {isClient && <Text numberOfLines={1} style={styles.name}>{name}</Text>}
          </Pressable>
          {!isClient && <Text style={styles.brand}>Qrew</Text>}
          <View style={[styles.actions, !isClient && styles.businessActions]}>
            {actions.map(iconButton)}
          </View>
        </View>
      )}
      <Modal visible={panel !== null} transparent animationType="fade" onRequestClose={() => setPanel(null)}>
        <View style={styles.overlay}>
          <Pressable accessibilityLabel="Cerrar panel" style={StyleSheet.absoluteFill} onPress={() => setPanel(null)} />
          {panel && (
            <View accessibilityViewIsModal style={[styles.panel, { top: top + 60, right: right + 16 }]}>
              {panel !== "queue" && <Text accessibilityRole="header" style={styles.panelTitle}>{TITLES[panel]}</Text>}
              {panel === "location" && (
                <>
                  <Text style={styles.panelText}>{place?.sector || place?.ciudad || "Ubicación por definir"}</Text>
                  <PanelLink onPress={() => navigateFromPanel(profileRoute, "personal")}>Ir a configuración</PanelLink>
                </>
              )}
              {panel === "notifications" && (
                notifications.length ? (
                  <ScrollView style={styles.list}>
                    {notifications.map((item: any, index: number) => (
                      <Text key={item?.id || index} style={styles.panelText}>{String(item?.title || item?.message || item?.mensaje || "Notificación")}</Text>
                    ))}
                  </ScrollView>
                ) : <Text style={styles.panelText}>No tienes notificaciones.</Text>
              )}
              {panel === "queue" && <Text style={styles.panelText}>No tienes nada pendiente.</Text>}
              {panel === "help" && <PanelLink onPress={() => navigateFromPanel(profileRoute, "help")}>Ir a soporte</PanelLink>}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

function PanelLink({ children, onPress }: { children: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.panelLink}>
      <Text style={styles.panelLinkText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: PURPLE, paddingBottom: 8 },
  rounded: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  row: { minHeight: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  identity: { flexDirection: "row", alignItems: "center", gap: 12, minWidth: 40, flexShrink: 1 },
  avatar: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: "#FFFFFF33",
    backgroundColor: "#FFFFFF1A", alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  clientAvatar: { width: 36, height: 36, backgroundColor: "#FFFFFF", borderRadius: 16 },
  avatarImage: { width: "100%", height: "100%" },
  initial: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  clientInitial: { color: PURPLE },
  name: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", flexShrink: 1 },
  tierBadge: {
    position: "absolute", right: -4, bottom: -4, minWidth: 20, lineHeight: 20,
    borderRadius: 12, overflow: "hidden", textAlign: "center", backgroundColor: "#7C3AED", color: "#FFFFFF",
    fontSize: 10, fontWeight: "600", includeFontPadding: false,
  },
  brand: { flex: 1, color: "#FFFFFF", textAlign: "center", fontSize: 24, fontWeight: "800", textShadowColor: "#34195F", textShadowRadius: 2, textShadowOffset: { width: 1, height: 2 } },
  actions: { flexDirection: "row", alignItems: "center", gap: 4 },
  businessActions: { gap: 8 },
  iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  pressed: { backgroundColor: "#FFFFFF1A" },
  icon: { width: 18, height: 18, tintColor: "#FFFFFFCC" },
  count: {
    position: "absolute", right: -4, top: -4, minWidth: 20, lineHeight: 20, paddingHorizontal: 4,
    borderRadius: 12, overflow: "hidden", textAlign: "center", backgroundColor: "#FFFFFF", color: PURPLE,
    fontSize: 10, fontWeight: "600", includeFontPadding: false,
  },
  profileRow: { minHeight: 40, alignItems: "center", justifyContent: "center" },
  profileTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
  profileAction: { position: "absolute", right: 0 },
  overlay: { flex: 1 },
  panel: {
    position: "absolute", width: 240, padding: 12, gap: 6, backgroundColor: PURPLE,
    borderBottomLeftRadius: 16, borderBottomRightRadius: 16, elevation: 10,
  },
  panelTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  panelText: { color: "#FFFFFFDB", fontSize: 14, paddingVertical: 4 },
  list: { maxHeight: 240 },
  panelLink: { minHeight: 32, justifyContent: "center" },
  panelLinkText: { color: "#FFFFFFCC", fontSize: 12, fontWeight: "600" },
});
