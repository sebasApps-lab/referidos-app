import React, { useEffect, useRef, useState, type RefObject } from "react";
import { AccessibilityInfo, findNodeHandle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PromoCard from "./PromoCard";
import { palette, PromoButton } from "./PromoControls";
import { colors, countCharacters, formatExpiration, limits, promoErrors, templates, type Promo, type PromoChange, type PromoTextField } from "./promoLibrary";

type EditorProps = {
  promo: Promo;
  validation: boolean;
  focusRequest: { field: PromoTextField } | null;
  scroll: RefObject<ScrollView | null>;
  personalizing: boolean;
  personalize: () => void;
  busy: boolean;
  change: (change: PromoChange) => void;
  pick: (kind: "photo" | "date") => void;
};

function PromoField({ label, placeholder, value, onChangeText, limit, error, input, container, next, multiline = false, busy }: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  limit: number;
  error?: string;
  input: RefObject<TextInput | null>;
  container: RefObject<View | null>;
  next?: () => void;
  multiline?: boolean;
  busy: boolean;
}) {
  const length = countCharacters(value);
  return (
    <View ref={container} collapsable={false} style={styles.field}>
      <View style={styles.fieldHeader}>
        <Text style={styles.label}>{label}</Text>
        <Text importantForAccessibility="no" style={[styles.counter, length > limit && styles.error]}>{length}/{limit}</Text>
      </View>
      <TextInput
        ref={input}
        accessibilityLabel={label}
        accessibilityHint={error || `Máximo ${limit} caracteres.`}
        autoCapitalize="sentences"
        style={[styles.input, multiline && styles.multiline, Boolean(error) && styles.invalid]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#716582"
        editable={!busy}
        returnKeyType={next ? "next" : multiline ? "default" : "done"}
        submitBehavior={next ? "submit" : undefined}
        onSubmitEditing={next}
        multiline={multiline}
      />
      {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
    </View>
  );
}

export default function PromoEditor({ promo, validation, focusRequest, scroll, personalizing, personalize, busy, change, pick }: EditorProps) {
  const [details, setDetails] = useState(false);
  const handledRequest = useRef<EditorProps["focusRequest"]>(null);
  const content = useRef<View>(null);
  const inputs = useRef({ title: React.createRef<TextInput>(), offer: React.createRef<TextInput>(),
    businessName: React.createRef<TextInput>(), description: React.createRef<TextInput>() }).current;
  const fields = useRef({ title: React.createRef<View>(), offer: React.createRef<View>(),
    businessName: React.createRef<View>(), description: React.createRef<View>() }).current;
  const errors = promoErrors(promo);

  useEffect(() => {
    if (!focusRequest || personalizing || handledRequest.current === focusRequest) return;
    const { field } = focusRequest;
    if (field === "description" && !details) {
      setDetails(true);
      return;
    }
    const frame = requestAnimationFrame(() => {
      const input = inputs[field].current;
      const anchor = content.current;
      const focus = () => {
        handledRequest.current = focusRequest;
        input?.focus();
        const tag = findNodeHandle(input);
        if (tag !== null) AccessibilityInfo.setAccessibilityFocus(tag);
      };
      if (!anchor || !fields[field].current) {
        focus();
        return;
      }
      fields[field].current.measureLayout(anchor, (_x, y) => {
        scroll.current?.scrollTo({ y: Math.max(0, y - 8), animated: false });
        focus();
      }, focus);
    });
    return () => cancelAnimationFrame(frame);
  }, [details, fields, focusRequest, inputs, personalizing, scroll]);

  function fieldProps(field: PromoTextField) {
    return {
      value: promo[field], limit: limits[field], input: inputs[field], container: fields[field], busy,
      error: validation || countCharacters(promo[field]) > limits[field] ? errors[field] : undefined,
      onChangeText: (value: string) => change({ [field]: value }),
    };
  }

  if (personalizing) return (
      <View style={styles.panel}>
        <Text accessibilityRole="header" style={styles.heading}>Estilo de la tarjeta</Text>
        <View style={styles.templateRow}>
          {templates.map((option) => (
            <Pressable
              key={option.id}
              accessibilityRole="radio"
              accessibilityLabel={option.label}
              accessibilityState={{ checked: promo.template === option.id, disabled: busy }}
              disabled={busy}
              onPress={() => change({ template: option.id })}
              style={[styles.template, promo.template === option.id && styles.templateActive]}
            >
              <View importantForAccessibility="no-hide-descendants" style={[styles.templateIcon, styles[option.id]]}>
                <Text style={[styles.templateGlyph, option.id === "editorial" && styles.editorialGlyph]}>{option.id === "contrast" ? "≋" : "✦"}</Text>
              </View>
              <Text style={styles.templateLabel}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.label}>Color</Text>
        <View style={styles.colorRow}>
          {colors.map((option) => (
            <Pressable key={option.id} accessibilityRole="radio" accessibilityLabel={option.label}
              accessibilityState={{ checked: promo.color === option.id, disabled: busy }} disabled={busy}
              onPress={() => change({ color: option.id })} style={styles.colorTouch}>
              <View importantForAccessibility="no-hide-descendants" style={[styles.colorDot, { backgroundColor: option.swatch }, promo.color === option.id && styles.colorSelected]}>
                {promo.color === option.id && <Text style={styles.colorCheck}>✓</Text>}
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.mediaRow}>
          <PromoButton label={promo.photo ? "Cambiar foto" : "Añadir foto"} kind="secondary"
            onPress={() => pick("photo")} disabled={busy} style={styles.grow} />
          {promo.photo && <PromoButton label="Quitar foto" kind="text" onPress={() => change({ photo: null })} disabled={busy} />}
        </View>
      </View>
  );

  return (
    <View ref={content} collapsable={false} style={styles.content}>
      <View style={styles.previewHeader}>
        <Text accessibilityRole="header" style={styles.heading}>Vista previa</Text>
        <PromoButton label="Personalizar" kind="secondary" onPress={personalize} disabled={busy} />
      </View>
      <View style={styles.preview}>
        <PromoCard promo={promo} />
      </View>

      <View style={styles.panel}>
        <Text accessibilityRole="header" style={styles.heading}>Tu oferta</Text>
        <PromoField label="Título" placeholder="Ej. Combo de hamburguesa" {...fieldProps("title")}
          next={() => inputs.offer.current?.focus()} />
        <PromoField label="Beneficio" placeholder="Ej. 2×1, 20% menos o bebida gratis" {...fieldProps("offer")}
          next={() => inputs.businessName.current?.focus()} />
        <PromoField label="Nombre del negocio" placeholder="Ej. Café Aurora" {...fieldProps("businessName")} />
      </View>

      <View style={styles.panel}>
        <Pressable accessibilityRole="button" accessibilityLabel="Detalles opcionales" accessibilityState={{ expanded: details, disabled: busy }}
          disabled={busy} onPress={() => setDetails(!details)} style={styles.detailsToggle}>
          <Text style={styles.heading}>Detalles opcionales</Text>
          <Text style={styles.toggleMark} importantForAccessibility="no">{details ? "−" : "+"}</Text>
        </Pressable>
        {details && (
          <>
            <PromoField label="Descripción y condiciones" placeholder="Ej. Válida de lunes a viernes. Hasta agotar existencias."
              {...fieldProps("description")} multiline />
            <Text style={styles.label}>Fecha de vencimiento</Text>
            <View style={styles.mediaRow}>
              <PromoButton label={formatExpiration(promo.expiration) || "Elegir fecha"} kind="secondary"
                onPress={() => pick("date")} disabled={busy} style={styles.grow} />
              {promo.expiration && <PromoButton label="Quitar fecha" kind="text" onPress={() => change({ expiration: null })} disabled={busy} />}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { gap: 13 },
  previewHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  preview: { width: "100%", maxWidth: 280, alignSelf: "center" },
  panel: { backgroundColor: palette.paper, borderRadius: 20, borderWidth: 1, borderColor: palette.line, padding: 15, gap: 12 },
  heading: { fontSize: 17, fontWeight: "800", color: palette.ink, flexShrink: 1 },
  field: { gap: 6 },
  fieldHeader: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: 8 },
  counter: { fontSize: 12, color: palette.muted },
  label: { fontSize: 13, fontWeight: "700", color: palette.ink },
  input: { minHeight: 48, borderWidth: 1, borderColor: palette.line, borderRadius: 12, backgroundColor: palette.bg, paddingHorizontal: 12, fontSize: 15, color: palette.ink },
  multiline: { minHeight: 86, paddingTop: 12, textAlignVertical: "top" },
  invalid: { borderColor: palette.danger },
  error: { color: palette.danger, fontSize: 13 },
  templateRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  template: { flexBasis: 80, flexGrow: 1, minHeight: 62, borderWidth: 1, borderColor: palette.line, borderRadius: 12, alignItems: "center", paddingVertical: 7, paddingHorizontal: 3, gap: 5 },
  templateActive: { borderColor: palette.purple, backgroundColor: palette.lavender },
  templateIcon: { width: 34, height: 21, alignItems: "center", justifyContent: "center", borderRadius: 5 },
  signature: { backgroundColor: "#563291" },
  editorial: { backgroundColor: "#EEE3FA" },
  contrast: { backgroundColor: "#301858" },
  templateGlyph: { color: palette.green, fontSize: 16, includeFontPadding: false },
  editorialGlyph: { color: palette.purple },
  templateLabel: { color: palette.ink, fontSize: 12, fontWeight: "700", textAlign: "center" },
  colorRow: { flexDirection: "row", flexWrap: "wrap" },
  colorTouch: { minHeight: 48, minWidth: 48, alignItems: "center", justifyContent: "center" },
  colorDot: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  colorSelected: { borderWidth: 2, borderColor: palette.ink },
  colorCheck: { color: palette.paper, fontSize: 15, fontWeight: "800", includeFontPadding: false },
  mediaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  grow: { flexGrow: 1 },
  detailsToggle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: 48, gap: 8 },
  toggleMark: { color: palette.purple, fontSize: 25 },
});
