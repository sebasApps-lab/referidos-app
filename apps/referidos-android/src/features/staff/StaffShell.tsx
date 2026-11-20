import React, { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { Image, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View, type ImageSourcePropType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";
import { StaffLayoutContext, type StaffPage } from "./StaffLayoutContext";
import SupportQueueDock from "./SupportQueueDock";
import { STAFF_MENU, STAFF_TABS, staffIcons, type StaffRole } from "./staffNavigation";

const PURPLE = "#5E30A5";

function StaffIcon({ source, tintColor, size = 18 }: { source: ImageSourcePropType; tintColor: string; size?: number }) {
  return <Image source={source} resizeMode="contain" accessible={false} style={{ width: size, height: size, tintColor }} />;
}

function TopAction({ label, icon, onPress, tone = "neutral" }: { label: string; icon: ImageSourcePropType; onPress?: () => void; tone?: "neutral" | "purple" | "accent" }) {
  const accent = tone === "accent";
  const color = accent ? "#FFFFFF" : tone === "purple" ? PURPLE : "#64748B";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !onPress }}
      disabled={!onPress}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [styles.topAction, accent && styles.topActionAccent, (!onPress || pressed) && styles.actionInactive]}
    >
      <StaffIcon source={icon} size={tone === "purple" ? 18 : 16} tintColor={color} />
    </Pressable>
  );
}

function StaffMenu({ role, routeName, collapsed, onNavigate, onLogout }: { role: StaffRole; routeName?: string; collapsed: boolean; onNavigate: (route: string) => void; onLogout: () => void }) {
  const isAdmin = role === "admin";

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.menu, collapsed && styles.menuCollapsed]}>
      <View style={[styles.menuBrand, collapsed && styles.menuBrandCollapsed]}>
        <View style={styles.shieldPlate}><StaffIcon source={staffIcons.shield} tintColor={PURPLE} /></View>
        {!collapsed && (
          <>
            <Text numberOfLines={1} style={styles.menuBrandLabel}>{isAdmin ? "Referidos Admin" : "Referidos"}</Text>
            <Text style={styles.menuRole}>{isAdmin ? "Admin" : "Soporte"}</Text>
          </>
        )}
      </View>

      <View style={styles.groups}>
        {STAFF_MENU[role].map((group) => (
          <View key={group.title} style={styles.group}>
            {collapsed ? <View style={styles.groupDivider} /> : <Text style={styles.groupLabel}>{group.title}</Text>}
            {group.items.map((item) => {
              const selected = item.route === routeName || Boolean(routeName && item.matches?.includes(routeName));
              return (
                <Pressable
                  key={item.route}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected }}
                  onPress={() => onNavigate(item.route)}
                  style={({ pressed }) => [styles.menuItem, collapsed && styles.menuItemCollapsed, pressed && styles.menuItemPressed, selected && styles.menuItemSelected]}
                >
                  <StaffIcon source={item.icon} tintColor={selected ? PURPLE : "#475569"} />
                  {!collapsed && <Text style={[styles.menuItemText, selected && styles.menuItemTextSelected]}>{item.label}</Text>}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {isAdmin ? (
        <View style={[styles.menuFooter, collapsed && styles.menuFooterCollapsed]}>
          <View style={styles.secureIcon}><StaffIcon source={staffIcons.shield} tintColor={PURPLE} /></View>
          {!collapsed && <View style={styles.footerText}><Text style={styles.footerTitle}>Panel seguro</Text><Text style={styles.footerHint}>Acceso restringido</Text></View>}
        </View>
      ) : (
        <Pressable accessibilityRole="button" accessibilityLabel="Cerrar sesión" onPress={onLogout} style={[styles.menuFooter, collapsed && styles.menuFooterCollapsed]}>
          <View style={styles.secureIcon}><StaffIcon source={staffIcons.shield} tintColor={PURPLE} /></View>
          {!collapsed && <View style={styles.footerText}><Text style={styles.footerTitle}>Cerrar sesión</Text><Text style={styles.secureBadge}>Seguro</Text></View>}
        </Pressable>
      )}
    </ScrollView>
  );
}

export default function StaffShell({ role, children }: { role: StaffRole; children: ReactNode }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState<StaffPage | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const changedPreference = useRef(false);
  const user = useAppStore((state) => state.onboarding?.usuario);
  const signOut = useAppStore((state) => state.signOut);
  const openConfirm = useModalStore((state) => state.openConfirm);
  const openAlert = useModalStore((state) => state.openAlert);
  const modalOpen = useModalStore((state) => role === "soporte" && Boolean(state.activeModal));
  const wide = width >= 1024;
  const showIdentity = width >= 640;
  const expandedWidth = role === "admin" ? 256 : 240;
  const panelWidth = collapsed && wide ? 80 : expandedWidth;
  const preferenceKey = `staff.${role}.sidebar.collapsed`;
  const roleLabel = role === "admin" ? "Admin" : "Soporte";
  const name = String(user?.nombre || roleLabel).trim() || roleLabel;
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const registeredContext = useMemo(() => ({
    registerPage(next: StaffPage) {
      setPage(next);
      return () => setPage((current) => current === next ? null : current);
    },
  }), []);

  useEffect(() => {
    let mounted = true;
    void AsyncStorage.getItem(preferenceKey).then((saved) => {
      if (mounted && !changedPreference.current) setCollapsed(saved === "1");
    }).catch(() => undefined);
    return () => { mounted = false; };
  }, [preferenceKey]);

  useEffect(() => {
    if (wide) setMenuOpen(false);
  }, [wide]);

  function toggleCollapsed() {
    const next = !collapsed;
    changedPreference.current = true;
    setCollapsed(next);
    void AsyncStorage.setItem(preferenceKey, next ? "1" : "0").catch(() => undefined);
  }

  const navigate = useCallback((route: string) => {
    setMenuOpen(false);
    if (!page || page.route === route) return;
    const { navigation } = page;
    const tabGroup = STAFF_TABS[role];
    if (tabGroup.routes.includes(route) && navigation.getState().type === "stack") {
      navigation.dispatch(StackActions.popTo(tabGroup.root, { screen: route }));
      return;
    }
    navigation.navigate(route);
  }, [page, role]);

  function logout() {
    setMenuOpen(false);
    openConfirm({
      title: "Cerrar sesión",
      message: "¿Quieres cerrar la sesión en este dispositivo?",
      confirmLabel: "Cerrar sesión",
      onConfirm: signOut,
    });
  }

  function showAlerts() {
    const notifications = Array.isArray(user?.notificaciones) ? user.notificaciones : [];
    const lines = notifications.slice(0, 4).map((item: unknown) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const notice = item as Record<string, unknown>;
        return String(notice.titulo || notice.title || notice.mensaje || notice.message || "");
      }
      return "";
    }).filter(Boolean);
    const count = Number(user?.notificacionesCount || notifications.length);
    openAlert({ title: "Alertas", message: lines.join("\n\n") || (count > 0 ? `Alertas pendientes: ${count}.` : "No tienes alertas pendientes.") });
  }

  return (
    <StaffLayoutContext.Provider value={registeredContext}>
      <View style={styles.shell}>
        <StatusBar barStyle="dark-content" />
        {wide && (
          <View style={[styles.sideRail, { width: panelWidth + insets.left, paddingLeft: insets.left, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <StaffMenu role={role} routeName={page?.route} collapsed={collapsed} onNavigate={navigate} onLogout={logout} />
          </View>
        )}

        <View style={[styles.mainColumn, { paddingLeft: wide ? 0 : insets.left, paddingRight: insets.right, paddingBottom: insets.bottom }]}>
          <View style={[styles.topbar, { paddingTop: insets.top }]}>
            <View style={styles.topbarRow}>
              <View style={styles.headerLeft}>
                {!wide && <TopAction label="Abrir menú" icon={staffIcons.menu} onPress={() => setMenuOpen(true)} tone="purple" />}
                <View style={styles.headerText}>
                  <Text accessibilityRole="header" numberOfLines={2} style={styles.title}>{page?.title ?? "Inicio"}</Text>
                  {page?.subtitle && <Text numberOfLines={2} style={styles.subtitle}>{page.subtitle}</Text>}
                </View>
              </View>
              <View style={styles.headerActions}>
                {showIdentity && __DEV__ && <View style={styles.environment}><StaffIcon source={staffIcons.shield} size={14} tintColor={PURPLE} /><Text style={styles.envLabel}>Build de desarrollo</Text></View>}
                <TopAction label="Refrescar" icon={staffIcons.refresh} onPress={page?.onRefresh} />
                <TopAction label="Alertas" icon={staffIcons.bell} onPress={showAlerts} />
                {showIdentity && (
                  <View style={styles.identity}>
                    <View style={styles.initialPlate}><Text style={styles.initials}>{initials}</Text></View>
                    <View style={styles.identityText}>
                      <Text numberOfLines={1} style={styles.name}>{name}</Text>
                      <Text style={styles.role}>{roleLabel}</Text>
                    </View>
                  </View>
                )}
                <TopAction label="Cerrar sesión" icon={staffIcons.logout} onPress={logout} tone="accent" />
              </View>
            </View>
          </View>
          {role === "soporte" && (
            <SupportQueueDock
              agentId={String(user?.id || "").trim()}
              visible={Boolean(page && page.route !== STACK_ROUTES.SOPORTE.TICKET && !menuOpen && !modalOpen)}
              onOpenInbox={page?.route === TAB_ROUTES.SOPORTE.INBOX ? undefined : () => navigate(TAB_ROUTES.SOPORTE.INBOX)}
              onOpenTicket={(threadPublicId) => page?.navigation.navigate(STACK_ROUTES.SOPORTE.TICKET, { threadPublicId })}
            />
          )}
          <View style={styles.content}>{children}</View>
        </View>

        {wide && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={collapsed ? "Extender menú" : "Contraer menú"}
            onPress={toggleCollapsed}
            style={[styles.collapse, { left: panelWidth + insets.left - 22 }]}
          >
            <StaffIcon source={collapsed ? staffIcons.expand : staffIcons.collapse} tintColor={PURPLE} />
          </Pressable>
        )}

        <Modal visible={menuOpen && !wide} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={() => setMenuOpen(false)}>
          <View style={styles.drawerOverlay}>
            <Pressable accessibilityRole="button" accessibilityLabel="Cerrar menú" onPress={() => setMenuOpen(false)} style={StyleSheet.absoluteFill} />
            <View accessibilityViewIsModal style={[styles.drawerPanel, { width: Math.min(expandedWidth + insets.left, width - 48), paddingLeft: insets.left, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
              <StaffMenu role={role} routeName={page?.route} collapsed={false} onNavigate={navigate} onLogout={logout} />
            </View>
          </View>
        </Modal>
      </View>
    </StaffLayoutContext.Provider>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, flexDirection: "row", backgroundColor: "#F6F2FB" },
  content: { flex: 1 },
  mainColumn: { flex: 1 },
  topbar: { backgroundColor: "#F6F2FB", borderBottomWidth: 1, borderBottomColor: "#EEE7FA", zIndex: 1 },
  topbarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%", maxWidth: 1280, alignSelf: "center", paddingHorizontal: 16, paddingVertical: 12 },
  headerLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  headerText: { flex: 1 },
  title: { color: "#2F1A55", fontSize: 18, lineHeight: 28, fontWeight: "600", includeFontPadding: false },
  subtitle: { color: "#64748B", fontSize: 12, lineHeight: 16, includeFontPadding: false },
  headerActions: { flexDirection: "row", gap: 8, alignItems: "center" },
  topAction: { width: 34, height: 34, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, backgroundColor: "#FFFFFF", elevation: 1 },
  topActionAccent: { borderColor: PURPLE, backgroundColor: PURPLE },
  actionInactive: { opacity: 0.55 },
  identity: { flexDirection: "row", gap: 8, alignItems: "center", borderRadius: 999, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", paddingHorizontal: 8, paddingVertical: 4 },
  initialPlate: { width: 32, height: 32, borderRadius: 16, backgroundColor: PURPLE, alignItems: "center", justifyContent: "center" },
  initials: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  identityText: { maxWidth: 100 },
  name: { color: "#475569", fontSize: 12, fontWeight: "600" },
  role: { color: "#64748B", fontSize: 10, textTransform: "uppercase" },
  environment: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingVertical: 4, backgroundColor: "#FFFFFF", borderColor: "#E9E2F7", borderWidth: 1, borderRadius: 999 },
  envLabel: { color: PURPLE, fontSize: 12 },
  sideRail: { backgroundColor: "#FFFFFF", borderRightWidth: 1, borderRightColor: "#E9E2F7", elevation: 5, zIndex: 2 },
  collapse: { position: "absolute", top: "50%", marginTop: -25, height: 50, width: 36, borderRadius: 16, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#DCCEF6", alignItems: "center", justifyContent: "center", zIndex: 3, elevation: 6 },
  drawerOverlay: { flex: 1, backgroundColor: "#00000066", flexDirection: "row" },
  drawerPanel: { backgroundColor: "#FFFFFF", borderRightWidth: 1, borderRightColor: "#E9E2F7", elevation: 10 },
  menu: { flexGrow: 1, paddingHorizontal: 16, paddingVertical: 24 },
  menuCollapsed: { paddingHorizontal: 8 },
  menuBrand: { flexDirection: "row", alignItems: "center", gap: 8 },
  menuBrandCollapsed: { justifyContent: "center" },
  shieldPlate: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#F2ECFF" },
  menuBrandLabel: { flex: 1, color: PURPLE, fontSize: 18, fontWeight: "800", includeFontPadding: false },
  menuRole: { color: PURPLE, backgroundColor: "#F0EBFF", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, fontSize: 11, fontWeight: "600" },
  groups: { flexGrow: 1, gap: 24, marginTop: 24, marginBottom: 16 },
  group: { gap: 4 },
  groupLabel: { marginBottom: 4, fontSize: 11, color: "#64748B", letterSpacing: 2.2, textTransform: "uppercase" },
  groupDivider: { height: 1, backgroundColor: "#E9E2F7", marginHorizontal: 6 },
  menuItem: { minHeight: 36, flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  menuItemCollapsed: { justifyContent: "center" },
  menuItemSelected: { backgroundColor: "#F0EBFF" },
  menuItemPressed: { backgroundColor: "#F7F4FF" },
  menuItemText: { flex: 1, fontSize: 14, lineHeight: 20, color: "#475569", fontWeight: "600", includeFontPadding: false },
  menuItemTextSelected: { color: PURPLE },
  menuFooter: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#EFE9FA", borderRadius: 16, backgroundColor: "#FAF8FF", paddingHorizontal: 12, paddingVertical: 8 },
  menuFooterCollapsed: { justifyContent: "center", paddingHorizontal: 4 },
  secureIcon: { height: 36, width: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", elevation: 1 },
  footerText: { flex: 1 },
  footerTitle: { color: "#2F1A55", fontSize: 14, fontWeight: "600" },
  footerHint: { color: "#64748B", fontSize: 11 },
  secureBadge: { alignSelf: "flex-start", marginTop: 2, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, color: "#047857", backgroundColor: "#D1FAE5", fontSize: 10, fontWeight: "600" },
});
