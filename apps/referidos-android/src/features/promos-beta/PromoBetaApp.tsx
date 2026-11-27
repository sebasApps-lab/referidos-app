import React, { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, BackHandler, Keyboard, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PromoCard, { promoCardData, promoNative } from "./PromoCard";
import { BrandMark, palette, PromoButton } from "./PromoControls";
import PromoEditor from "./PromoEditor";
import { createLibraryWriter, duplicatePromo, emptyLibrary, isReady, newPromo, photoNames, readLibrary, removePromo, savePromo, storageKey, type Promo, type PromoChange, type PromoLibrary } from "./promoLibrary";

type Screen = { view: "create" | "library" } | { view: "editor"; promo: Promo; origin: "create" | "library" };
type Busy = "share" | "save" | "photo" | "date";
type Notice = { text: string; error?: boolean };

const example: Promo = {
  ...newPromo("Café Aurora", 0),
  title: "Tardes de café",
  offer: "2×1 en lattes",
  description: "Tu café favorito, ahora para compartir.",
};

export default function PromoBetaApp() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <PromoWorkspace />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function PromoWorkspace() {
  const [screen, setScreen] = useState<Screen>({ view: "create" });
  const [library, setLibrary] = useState(emptyLibrary);
  const [loading, setLoading] = useState<"loading" | "ready" | "error">("loading");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "error">("idle");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [busy, setBusy] = useState<Busy | null>(null);
  const [validation, setValidation] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const libraryRef = useRef(library);
  const saveId = useRef(0);
  const busyRef = useRef(false);
  const [writeLibrary] = useState(() => createLibraryWriter((value) => AsyncStorage.setItem(storageKey, value)));
  const scroll = useRef<ScrollView>(null);

  const loadLibrary = useCallback(async () => {
    setLoading("loading");
    try {
      const stored = readLibrary(await AsyncStorage.getItem(storageKey));
      libraryRef.current = stored;
      setLibrary(stored);
      setLoading("ready");
      // The native worker runs this before any subsequent photo import.
      void promoNative.prunePhotos(photoNames(stored)).catch(() => {});
    } catch {
      setLoading("error");
    }
  }, []);

  useEffect(() => { void loadLibrary(); }, [loadLibrary]);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboard(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboard(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  function persist(next: PromoLibrary) {
    libraryRef.current = next;
    setLibrary(next);
    setSaveState("saving");
    const id = ++saveId.current;
    void writeLibrary(next).then(
      () => { if (id === saveId.current) setSaveState("idle"); },
      () => { if (id === saveId.current) setSaveState("error"); },
    );
  }

  const navigate = useCallback((next: Screen) => {
    if (busyRef.current) return;
    Keyboard.dismiss();
    setNotice(null);
    setValidation(false);
    setScreen(next);
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (busyRef.current) return true;
      if (screen.view === "create") return false;
      navigate({ view: screen.view === "editor" ? screen.origin : "create" });
      return true;
    });
    return () => subscription.remove();
  }, [navigate, screen]);

  const origin = screen.view === "editor" ? screen.origin : screen.view;
  const draft = screen.view === "editor"
    ? library.promos.find(({ id }) => id === screen.promo.id) || screen.promo
    : null;

  function start() {
    navigate({ view: "editor", promo: newPromo(libraryRef.current.businessName), origin });
  }

  function update(promo: Promo, change: PromoChange) {
    const latest = libraryRef.current.promos.find(({ id }) => id === promo.id) || promo;
    persist(savePromo(libraryRef.current, { ...latest, ...change, updatedAt: Date.now() }, change.businessName !== undefined));
  }

  function duplicate(promo: Promo) {
    if (busyRef.current) return;
    const copy = duplicatePromo(promo);
    persist(savePromo(libraryRef.current, copy));
    navigate({ view: "editor", promo: copy, origin: "library" });
    setNotice({ text: "Copia creada. Puedes editarla aquí." });
  }

  function confirmDelete(promo: Promo) {
    Alert.alert("¿Eliminar esta promoción?", promo.title.trim() || "Borrador sin título", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => {
        persist(removePromo(libraryRef.current, promo.id));
        setNotice({ text: "Promoción eliminada." });
      } },
    ], { cancelable: true });
  }

  async function run(kind: Busy, action: () => Promise<void>, errorMessage: string) {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(kind);
    setNotice(null);
    Keyboard.dismiss();
    try {
      await action();
    } catch {
      setNotice({ text: errorMessage, error: true });
    } finally {
      busyRef.current = false;
      setBusy(null);
    }
  }

  function pick(promo: Promo, kind: "photo" | "date") {
    void run(kind, async () => {
      if (kind === "photo") {
        const photo = await promoNative.pickPhoto();
        if (photo) update(promo, { photo });
      } else {
        const expiration = await promoNative.pickDate(promo.expiration);
        if (expiration) update(promo, { expiration });
      }
    }, kind === "photo" ? "No pudimos abrir esa foto. Prueba con otra imagen." : "No pudimos abrir el calendario. Intenta de nuevo.");
  }

  function exportImage(promo: Promo, kind: "share" | "save") {
    if (!isReady(promo)) {
      if (screen.view !== "editor") navigate({ view: "editor", promo, origin: "library" });
      setValidation(true);
      setNotice(null);
      if (screen.view === "editor") scroll.current?.scrollTo({ y: 0, animated: true });
      return;
    }
    const data = promoCardData(promo);
    void run(kind, async () => {
      if (kind === "share") {
        await promoNative.shareImage(data);
        setNotice({ text: "Imagen preparada. Elige una app para compartirla." });
      } else {
        const destination = await promoNative.saveImage(data);
        if (destination) setNotice({ text: destination === "gallery" ? "PNG guardado en tu galería." : "PNG guardado en la ubicación elegida." });
      }
    }, "No se pudo exportar la imagen. Si la foto ya no carga, vuelve a seleccionarla.");
  }

  const isEditor = screen.view === "editor";
  const showNav = !keyboard && !isEditor && loading === "ready";
  const storedDraft = draft && library.promos.some(({ id }) => id === draft.id);
  const displayedNotice = notice ?? (validation && draft && !isReady(draft)
    ? { text: "Completa el título y el beneficio para exportar.", error: true }
    : null);

  return (
    <View style={styles.workspace}>
      <View style={styles.topbar}>
        <View style={styles.topbarInner}>
          {isEditor ? (
            <>
              <PromoButton label="‹ Volver" kind="text" onPress={() => navigate({ view: origin })} disabled={Boolean(busy)} />
              <Text accessibilityRole="header" style={styles.editorTitle}>Editar promoción</Text>
              <View style={styles.markSpacer} />
            </>
          ) : (
            <View style={styles.brand}>
              <BrandMark />
              <Text style={styles.brandName}>Referidos <Text style={styles.brandAccent}>Promos</Text></Text>
            </View>
          )}
        </View>
      </View>

      {loading !== "ready" ? (
        <View style={styles.loading}>
          <Text accessibilityLiveRegion="polite" style={styles.infoText}>
            {loading === "loading" ? "Abriendo tus promociones…" : "No pudimos abrir el almacenamiento de promociones."}
          </Text>
          {loading === "error" && <PromoButton label="Reintentar" onPress={() => void loadLibrary()} />}
        </View>
      ) : (
        <ScrollView key={screen.view === "editor" ? `editor-${screen.promo.id}` : screen.view} ref={scroll}
          style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {screen.view === "create" && <CreateHome last={library.promos[0]} onCreate={start}
            onResume={(promo) => navigate({ view: "editor", promo, origin: "create" })} />}
          {screen.view === "library" && <Library promos={library.promos} busy={Boolean(busy)} onCreate={start}
            onOpen={(promo) => navigate({ view: "editor", promo, origin: "library" })}
            onDuplicate={duplicate} onShare={(promo) => exportImage(promo, "share")} onDelete={confirmDelete} />}
          {draft && <PromoEditor promo={draft} validation={validation} busy={Boolean(busy)}
            change={(change) => update(draft, change)} pick={(kind) => pick(draft, kind)} />}
        </ScrollView>
      )}

      {saveState === "error" && (
        <View style={styles.notice}>
          <Text accessibilityLiveRegion="polite" style={styles.errorText}>No se guardaron los últimos cambios.</Text>
          <PromoButton label="Reintentar" kind="text" onPress={() => persist(libraryRef.current)} />
        </View>
      )}
      {displayedNotice && <View style={styles.notice}><Text accessibilityLiveRegion="polite" style={displayedNotice.error ? styles.errorText : styles.infoText}>{displayedNotice.text}</Text></View>}

      {draft && !keyboard && (
        <View style={styles.actionBar}>
          <Text accessibilityLiveRegion="polite" style={styles.localStatus}>
            {saveState === "saving" ? "Guardando cambios…" : storedDraft && saveState === "idle" ? "Guardada en este dispositivo" : ""}
          </Text>
          <View style={styles.actionRow}>
            <PromoButton label={busy === "save" ? "Generando PNG…" : "Guardar imagen"} kind="secondary" style={styles.equal}
              disabled={Boolean(busy)} onPress={() => exportImage(draft, "save")} />
            <PromoButton label={busy === "share" ? "Preparando imagen…" : "Compartir"} style={styles.equal}
              disabled={Boolean(busy)} onPress={() => exportImage(draft, "share")} />
          </View>
        </View>
      )}
      {showNav && (
        <View style={styles.nav}>
          <NavTab label="Crear" icon="＋" selected={screen.view === "create"} disabled={Boolean(busy)} onPress={() => navigate({ view: "create" })} />
          <NavTab label="Mis promociones" icon="▤" selected={screen.view === "library"} disabled={Boolean(busy)} onPress={() => navigate({ view: "library" })} />
        </View>
      )}
    </View>
  );
}

function NavTab({ label, icon, selected, disabled, onPress }: {
  label: string; icon: string; selected: boolean; disabled: boolean; onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected, disabled }}
      disabled={disabled} onPress={onPress} style={[styles.tab, selected && styles.tabSelected]}>
      <Text style={[styles.tabIcon, selected && styles.tabLabelSelected]}>{icon}</Text>
      <Text style={[styles.tabLabel, selected && styles.tabLabelSelected]}>{label}</Text>
    </Pressable>
  );
}

function CreateHome({ last, onCreate, onResume }: { last?: Promo; onCreate: () => void; onResume: (promo: Promo) => void }) {
  return (
    <>
      <View style={styles.hero}>
        <View style={styles.heroRing} importantForAccessibility="no" />
        <Text accessibilityRole="header" style={styles.headline}>Tu próxima oferta, lista para compartir</Text>
        <Text style={styles.heroCopy}>Escribe tu oferta, elige un estilo y compártela como imagen.</Text>
        <Pressable accessibilityRole="button" onPress={onCreate} style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
          <Text style={styles.heroButtonText}>Crear promoción</Text><Text style={styles.heroArrow} importantForAccessibility="no">→</Text>
        </Pressable>
      </View>
      {last ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Continuar: ${last.title.trim() || "Borrador sin título"}`}
          onPress={() => onResume(last)} style={styles.resume}>
          <View style={styles.resumePreview}><PromoCard promo={last} decorative /></View>
          <View style={styles.resumeText}>
            <Text style={styles.smallLabel}>Continuar editando</Text>
            <Text numberOfLines={2} style={styles.itemTitle}>{last.title.trim() || "Borrador sin título"}</Text>
          </View>
          <Text style={styles.arrow} importantForAccessibility="no">›</Text>
        </Pressable>
      ) : (
        <View style={styles.example}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>Así puede verse tu promoción</Text>
          <View style={styles.exampleCard}><PromoCard promo={example} /></View>
        </View>
      )}
    </>
  );
}

function Library({ promos, busy, onCreate, onOpen, onDuplicate, onShare, onDelete }: {
  promos: Promo[]; busy: boolean; onCreate: () => void;
  onOpen: (promo: Promo) => void; onDuplicate: (promo: Promo) => void; onShare: (promo: Promo) => void; onDelete: (promo: Promo) => void;
}) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const matches = promos.filter(({ title, offer, businessName }) => `${title} ${offer} ${businessName}`.toLowerCase().includes(search));

  return (
    <>
      <View style={styles.libraryHeading}>
        <Text accessibilityRole="header" style={styles.libraryTitle}>Mis promociones</Text>
        <Text style={styles.infoText}>Guardadas en este dispositivo.</Text>
      </View>
      {promos.length > 4 && <TextInput accessibilityLabel="Buscar promociones" placeholder="Buscar promociones"
        placeholderTextColor={palette.muted} value={query} onChangeText={setQuery} style={styles.search} />}
      {promos.length === 0 ? (
        <View style={styles.empty}>
          <BrandMark />
          <Text style={styles.itemTitle}>Aquí aparecerán tus promociones</Text>
          <PromoButton label="Crear promoción" onPress={onCreate} />
        </View>
      ) : (
        <>
          {matches.length === 0 && <Text style={styles.infoText}>No hay promociones que coincidan.</Text>}
          {matches.map((promo) => (
            <View key={promo.id} style={styles.libraryItem}>
              <Pressable accessibilityRole="button" accessibilityLabel={`Editar: ${promo.title.trim() || "Borrador sin título"}`}
                onPress={() => onOpen(promo)} disabled={busy} style={styles.itemTop}>
                <View style={styles.itemPreview}><PromoCard promo={promo} decorative /></View>
                <View style={styles.resumeText}>
                  <Text numberOfLines={2} style={styles.itemTitle}>{promo.title.trim() || "Borrador sin título"}</Text>
                  <Text numberOfLines={2} style={styles.infoText}>{isReady(promo) ? promo.offer : "Borrador"}</Text>
                </View>
                <Text style={styles.arrow} importantForAccessibility="no">›</Text>
              </Pressable>
              <View style={styles.itemActions}>
                <PromoButton label="Duplicar" kind="secondary" disabled={busy} onPress={() => onDuplicate(promo)} />
                <PromoButton label="Compartir" kind="text" disabled={busy} onPress={() => onShare(promo)} />
                <PromoButton label="Eliminar" kind="text" disabled={busy} onPress={() => onDelete(promo)} />
              </View>
            </View>
          ))}
          {promos.some(isReady) && <Text style={styles.cloudInfo}>Respaldo con cuenta previsto para una futura versión.</Text>}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.bg },
  workspace: { flex: 1, backgroundColor: palette.bg },
  topbar: { borderBottomWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  topbarInner: { width: "100%", maxWidth: 570, alignSelf: "center", minHeight: 58, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, gap: 8 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 58, paddingVertical: 8 },
  brandName: { flexShrink: 1, color: palette.ink, fontWeight: "900", fontSize: 18, letterSpacing: -0.4 },
  brandAccent: { color: palette.purple },
  editorTitle: { color: palette.ink, fontSize: 17, fontWeight: "800", textAlign: "center", flex: 1 },
  markSpacer: { width: 65 },
  scroll: { flex: 1 },
  content: { width: "100%", maxWidth: 570, alignSelf: "center", paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, gap: 13 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 12 },
  hero: { backgroundColor: "#32195C", borderRadius: 23, padding: 22, gap: 13, overflow: "hidden" },
  heroRing: { width: 230, height: 230, borderRadius: 115, borderWidth: 2, borderColor: "#694395", position: "absolute", right: -112, top: -87 },
  headline: { color: palette.paper, fontSize: 34, fontWeight: "900", letterSpacing: -1.15, maxWidth: 360 },
  heroCopy: { fontSize: 15, color: "#ECE0F8", maxWidth: 310 },
  heroButton: { backgroundColor: palette.green, minHeight: 54, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, marginTop: 4, gap: 12 },
  heroButtonText: { color: palette.ink, fontSize: 16, fontWeight: "800", flexShrink: 1 },
  heroArrow: { color: palette.ink, fontSize: 22, fontWeight: "700" },
  pressed: { opacity: 0.75 },
  example: { gap: 9 },
  exampleCard: { width: "100%", maxWidth: 280, alignSelf: "center" },
  sectionTitle: { color: palette.ink, fontSize: 15, fontWeight: "800", textAlign: "center" },
  resume: { flexDirection: "row", alignItems: "center", backgroundColor: palette.paper, borderWidth: 1, borderColor: palette.line, borderRadius: 17, padding: 10, gap: 12, minHeight: 66 },
  resumePreview: { width: 55 },
  resumeText: { flex: 1, gap: 3 },
  smallLabel: { color: palette.purple, fontWeight: "700", fontSize: 12 },
  arrow: { color: palette.purple, fontSize: 27, paddingHorizontal: 4 },
  libraryHeading: { gap: 4, paddingVertical: 3 },
  libraryTitle: { fontSize: 28, fontWeight: "900", letterSpacing: -0.6, color: palette.ink },
  empty: { backgroundColor: palette.paper, borderRadius: 20, borderWidth: 1, borderColor: palette.line, padding: 18, alignItems: "center", gap: 12 },
  search: { minHeight: 48, paddingHorizontal: 14, color: palette.ink, backgroundColor: palette.paper, borderWidth: 1, borderColor: palette.line, borderRadius: 12 },
  libraryItem: { padding: 12, backgroundColor: palette.paper, borderRadius: 18, borderWidth: 1, borderColor: palette.line, gap: 8 },
  itemTop: { flexDirection: "row", alignItems: "center", gap: 11 },
  itemPreview: { width: 66 },
  itemTitle: { fontSize: 16, fontWeight: "800", color: palette.ink },
  itemActions: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 4 },
  infoText: { color: palette.muted, fontSize: 14, flexShrink: 1 },
  cloudInfo: { fontSize: 13, color: palette.muted, padding: 9, textAlign: "center" },
  notice: { width: "100%", maxWidth: 570, alignSelf: "center", marginHorizontal: 16, paddingHorizontal: 19, paddingVertical: 9, backgroundColor: palette.lavender, flexDirection: "row", alignItems: "center", gap: 8 },
  errorText: { color: palette.danger, flexShrink: 1, fontSize: 14 },
  actionBar: { width: "100%", maxWidth: 570, alignSelf: "center", paddingHorizontal: 14, paddingTop: 5, paddingBottom: 9, backgroundColor: palette.paper, borderTopWidth: 1, borderColor: palette.line, gap: 4 },
  localStatus: { color: palette.muted, fontSize: 12, textAlign: "center" },
  actionRow: { flexDirection: "row", gap: 8 },
  equal: { flex: 1 },
  nav: { paddingHorizontal: 14, paddingVertical: 6, borderTopWidth: 1, borderColor: palette.line, backgroundColor: palette.paper, flexDirection: "row", gap: 7, width: "100%", maxWidth: 570, alignSelf: "center" },
  tab: { flex: 1, minHeight: 52, alignItems: "center", justifyContent: "center", gap: 2, borderRadius: 11 },
  tabSelected: { backgroundColor: palette.lavender },
  tabIcon: { color: palette.muted, fontSize: 19, fontWeight: "700", lineHeight: 21 },
  tabLabel: { color: palette.muted, fontSize: 12, fontWeight: "700", textAlign: "center" },
  tabLabelSelected: { color: palette.purple },
});
