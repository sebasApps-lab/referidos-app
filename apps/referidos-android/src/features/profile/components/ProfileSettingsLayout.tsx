import React, { useCallback, useEffect, useState, type ReactNode } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const icons = {
  account: require("../../../navigation/assets/tab-user.png"),
  security: require("../../auth/assets/lock.png"),
  shield: require("../../auth/assets/shield-check.png"),
  benefits: require("../../../navigation/assets/tab-tag.png"),
  notifications: require("../../../navigation/assets/bell.png"),
  category: require("../../../navigation/assets/tab-layout-grid.png"),
  help: require("../../../navigation/assets/circle-help.png"),
  contact: require("../../auth/assets/mail.png"),
  logout: require("../../../navigation/assets/log-out.png"),
  back: require("../../auth/assets/back.png"),
};

const sections = {
  overview: { label: "Perfil", icon: icons.account },
  personal: { label: "Datos personales", icon: icons.account },
  manage: { label: "Gestionar cuenta", icon: icons.shield },
  access: { label: "Acceso", icon: icons.security },
  providers: { label: "Cuentas vinculadas", icon: icons.shield },
  sessions: { label: "Sesiones", icon: icons.security },
  benefits: { label: "Beneficios", icon: icons.benefits },
  notifications: { label: "Notificaciones", icon: icons.notifications },
  preferences: { label: "Apariencia e idioma", icon: icons.category },
  help: { label: "Ayuda", icon: icons.help },
  chat: { label: "Chatear con soporte", icon: icons.contact },
  tickets: { label: "Mis tickets", icon: icons.contact },
};

export type ProfileSection = keyof typeof sections;

export function useProfileSection() {
  const route = useRoute();
  const { profileSection, openAt } = (route.params || {}) as { profileSection?: ProfileSection; openAt?: number };
  const [section, setSection] = useState<ProfileSection | null>(null);
  useEffect(() => {
    if (profileSection && Object.prototype.hasOwnProperty.call(sections, profileSection)) setSection(profileSection);
  }, [profileSection, openAt]);
  return [section, setSection] as const;
}

export function profileVerificationLabel(status: string) {
  if (status === "verified") return "Verificada";
  if (status === "in_progress") return "En progreso";
  if (status === "skipped") return "Omitida";
  return "Pendiente";
}

const groups: { title: string; items: ProfileSection[] }[] = [
  { title: "Cuenta", items: ["overview", "personal", "manage"] },
  { title: "Seguridad", items: ["access", "providers", "sessions"] },
  { title: "Plan", items: ["benefits"] },
  { title: "Preferencias", items: ["notifications", "preferences"] },
  { title: "Soporte", items: ["help", "chat", "tickets"] },
];

function searchable(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

type Props = {
  section: ProfileSection | null;
  onSectionChange: (section: ProfileSection | null) => void;
  onSignOut: () => void;
  children: ReactNode;
};

export default function ProfileSettingsLayout({ section, onSectionChange, onSignOut, children }: Props) {
  const [query, setQuery] = useState("");
  const search = searchable(query.trim());
  const filtered = groups.map((group) => ({
    ...group,
    items: group.items.filter((key) => searchable(`${group.title} ${sections[key].label}`).includes(search)),
  })).filter((group) => group.items.length);
  const showSignOut = searchable("Cerrar sesión").includes(search);

  useFocusEffect(useCallback(() => {
    if (!section) return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      onSectionChange(null);
      return true;
    });
    return () => subscription.remove();
  }, [section, onSectionChange]));

  return (
    <ScrollView
      key={section || "menu"}
      keyboardShouldPersistTaps="handled"
      style={styles.page}
      contentContainerStyle={[styles.content, section && styles.detail]}
    >
      {section ? (
        <>
          <View style={styles.detailHeading}>
            <Pressable accessibilityRole="button" accessibilityLabel="Volver a configuración" onPress={() => onSectionChange(null)} style={styles.back}>
              <Image source={icons.back} style={styles.backIcon} />
            </Pressable>
            <Text accessibilityRole="header" style={styles.title}>{sections[section].label}</Text>
          </View>
          {children}
        </>
      ) : (
        <>
          <TextInput
            accessibilityLabel="Buscar en configuración"
            placeholder="Buscar en configuración"
            placeholderTextColor="#64748B"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            returnKeyType="search"
            style={styles.search}
          />
          {filtered.map((group) => (
            <View key={group.title} style={styles.group}>
              <Text accessibilityRole="header" style={styles.groupLabel}>{group.title}</Text>
              <View style={styles.menuCard}>
                {group.items.map((key, index) => (
                  <MenuRow key={key} label={sections[key].label} icon={sections[key].icon} divided={index > 0} onPress={() => onSectionChange(key)} />
                ))}
              </View>
            </View>
          ))}
          {showSignOut ? (
            <View style={[styles.menuCard, styles.dangerCard]}>
              <MenuRow label="Cerrar sesión" icon={icons.logout} danger onPress={onSignOut} />
            </View>
          ) : null}
          {!filtered.length && !showSignOut ? <Text style={styles.meta}>No hay resultados para esta búsqueda.</Text> : null}
        </>
      )}
    </ScrollView>
  );
}

function MenuRow({ label, icon, divided = false, danger = false, onPress }: {
  label: string;
  icon: number;
  divided?: boolean;
  danger?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.menuRow, divided && styles.divided, pressed && styles.pressed]}
    >
      <View style={[styles.iconBox, danger && styles.dangerIconBox]}>
        <Image source={icon} style={[styles.icon, danger && styles.dangerIcon]} />
      </View>
      <Text style={[styles.menuLabel, danger && styles.dangerText]}>{label}</Text>
    </Pressable>
  );
}

export function ProfileSettingsCard({ title, subtitle, right, children }: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeading}>
        <View style={styles.cardHeadingText}>
          <Text accessibilityRole="header" style={styles.cardTitle}>{title}</Text>
          {subtitle ? <Text style={styles.meta}>{subtitle}</Text> : null}
        </View>
        {right}
      </View>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

export function ProfileIdentityCard({ title, name, meta, avatar, verified }: {
  title: string;
  name: string;
  meta?: string;
  avatar?: string;
  verified: boolean;
}) {
  const [failedAvatar, setFailedAvatar] = useState("");
  const showImage = avatar && /^https?:\/\//i.test(avatar) && failedAvatar !== avatar;
  return (
    <View style={styles.identity}>
      <View style={styles.identityHeader}>
        <Text style={styles.identityLabel}>{title}</Text>
        {verified ? <Text style={styles.verified}>Verificado</Text> : null}
      </View>
      <View style={styles.identityRow}>
        <View style={styles.avatar}>
          {showImage ? (
            <Image accessibilityLabel={`Avatar de ${name}`} source={{ uri: avatar }} style={styles.avatarImage} onError={() => setFailedAvatar(avatar)} />
          ) : <Text style={styles.initial}>{name.trim().charAt(0).toUpperCase() || "?"}</Text>}
        </View>
        <View style={styles.cardHeadingText}>
          <Text style={styles.cardTitle}>{name}</Text>
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const PURPLE = "#5E30A5";
const INK = "#2F1A55";
const BORDER = "#E9E2F7";

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { width: "100%", maxWidth: 480, alignSelf: "center", paddingHorizontal: 16, paddingVertical: 16, gap: 16 },
  detail: { paddingHorizontal: 20, gap: 20 },
  search: { backgroundColor: "#FAF8FF", borderRadius: 16, minHeight: 44, borderWidth: 1, borderColor: BORDER, color: INK, fontSize: 14, paddingHorizontal: 16 },
  group: { gap: 8 },
  groupLabel: { paddingHorizontal: 8, color: "#765E93", fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 2.5 },
  menuCard: { borderWidth: 1, borderColor: BORDER, borderRadius: 16, overflow: "hidden", backgroundColor: "#FFFFFF" },
  menuRow: { minHeight: 56, flexDirection: "row", alignItems: "center" },
  divided: { borderTopWidth: 1, borderTopColor: "#F0E9FA" },
  pressed: { backgroundColor: "#F8F5FF" },
  iconBox: { width: 56, minHeight: 56, alignSelf: "stretch", alignItems: "center", justifyContent: "center", backgroundColor: "#F6F1FF" },
  icon: { width: 18, height: 18, tintColor: PURPLE },
  menuLabel: { flex: 1, color: "#65498A", fontSize: 14, lineHeight: 20, fontWeight: "600", paddingHorizontal: 16, paddingVertical: 12 },
  dangerCard: { borderColor: "#FECACA" },
  dangerIconBox: { backgroundColor: "#FEF2F2" },
  dangerIcon: { tintColor: "#B91C1C" },
  dangerText: { color: "#B91C1C" },
  detailHeading: { flexDirection: "row", alignItems: "center", gap: 8 },
  back: { height: 44, width: 44, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: "#F6F1FF" },
  backIcon: { width: 22, height: 22, tintColor: PURPLE },
  title: { flex: 1, color: INK, fontSize: 18, fontWeight: "600" },
  card: { padding: 16, gap: 12, borderWidth: 1, borderColor: BORDER, borderRadius: 16, backgroundColor: "#FFFFFF" },
  cardHeading: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardHeadingText: { flex: 1, gap: 4 },
  cardTitle: { color: INK, fontSize: 16, lineHeight: 22, fontWeight: "600" },
  cardBody: { gap: 10 },
  meta: { color: "#64748B", fontSize: 12, lineHeight: 17 },
  identity: { borderWidth: 1, borderColor: BORDER, borderRadius: 28, padding: 16, gap: 10, marginTop: 6 },
  identityHeader: { marginTop: -27, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  identityLabel: { paddingHorizontal: 8, color: "#765E93", backgroundColor: "#FFFFFF", fontSize: 12, lineHeight: 22, textTransform: "uppercase", letterSpacing: 2 },
  verified: { paddingHorizontal: 12, paddingVertical: 3, color: "#047857", backgroundColor: "#ECFDF5", borderRadius: 12, fontSize: 12, fontWeight: "600" },
  identityRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: { width: 80, height: 80, borderRadius: 16, backgroundColor: "#F6F1FF", borderWidth: 1, borderColor: BORDER, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  avatarImage: { width: "100%", height: "100%" },
  initial: { color: PURPLE, fontSize: 30, fontWeight: "600" },
});
