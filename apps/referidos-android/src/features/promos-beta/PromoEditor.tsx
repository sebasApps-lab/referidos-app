import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import PromoCard from "./PromoCard";
import { palette, PromoButton } from "./PromoControls";
import { colors, formatExpiration, limits, requiredFields, templates, type Promo, type PromoChange } from "./promoLibrary";

type EditorProps = {
  promo: Promo;
  validation: boolean;
  busy: boolean;
  change: (change: PromoChange) => void;
  pick: (kind: "photo" | "date") => void;
};

function PromoField({ label, placeholder, value, onChangeText, maxLength, error, multiline = false }: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  maxLength: number;
  error?: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize="sentences"
        style={[styles.input, multiline && styles.multiline, Boolean(error) && styles.invalid]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#716582"
        maxLength={maxLength}
        multiline={multiline}
      />
      {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
    </View>
  );
}

export default function PromoEditor({ promo, validation, busy, change, pick }: EditorProps) {
  const [details, setDetails] = useState(false);
  const missing = requiredFields(promo);

  return (
    <>
      <View style={styles.previewHeader}>
        <Text accessibilityRole="header" style={styles.heading}>Vista previa</Text>
        <Text style={styles.previewHint}>Imagen cuadrada</Text>
      </View>
      <View style={styles.preview}>
        <PromoCard promo={promo} />
      </View>

      <View style={styles.panel}>
        <Text accessibilityRole="header" style={styles.heading}>Tu oferta</Text>
        <PromoField label="Título" placeholder="Ej. Combo de hamburguesa" value={promo.title}
          onChangeText={(title) => change({ title })} maxLength={limits.title}
          error={validation && missing.title ? "Escribe el título de tu promoción." : undefined} />
        <PromoField label="Beneficio" placeholder="Ej. 2×1, 20% menos o bebida gratis" value={promo.offer}
          onChangeText={(offer) => change({ offer })} maxLength={limits.offer}
          error={validation && missing.offer ? "Escribe qué ofreces." : undefined} />
        <PromoField label="Nombre del negocio" placeholder="Ej. Café Aurora" value={promo.businessName}
          onChangeText={(businessName) => change({ businessName })} maxLength={limits.businessName} />
      </View>

      <View style={styles.panel}>
        <Text accessibilityRole="header" style={styles.heading}>Estilo de la tarjeta</Text>
        <View style={styles.templateRow}>
          {templates.map((option) => (
            <Pressable
              key={option.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: promo.template === option.id }}
              onPress={() => change({ template: option.id })}
              style={[styles.template, promo.template === option.id && styles.templateActive]}
            >
              <View style={[styles.templateIcon, styles[option.id]]}>
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
              accessibilityState={{ checked: promo.color === option.id }}
              onPress={() => change({ color: option.id })} style={styles.colorTouch}>
              <View style={[styles.colorDot, { backgroundColor: option.swatch }, promo.color === option.id && styles.colorSelected]}>
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

      <View style={styles.panel}>
        <Pressable accessibilityRole="button" accessibilityState={{ expanded: details }}
          onPress={() => setDetails(!details)} style={styles.detailsToggle}>
          <Text style={styles.heading}>Detalles opcionales</Text>
          <Text style={styles.toggleMark} importantForAccessibility="no">{details ? "−" : "+"}</Text>
        </Pressable>
        {details && (
          <>
            <PromoField label="Descripción y condiciones" placeholder="Ej. Válida de lunes a viernes. Hasta agotar existencias."
              value={promo.description} onChangeText={(description) => change({ description })} maxLength={limits.description} multiline />
            <Text style={styles.label}>Fecha de vencimiento</Text>
            <View style={styles.mediaRow}>
              <PromoButton label={formatExpiration(promo.expiration) || "Elegir fecha"} kind="secondary"
                onPress={() => pick("date")} disabled={busy} style={styles.grow} />
              {promo.expiration && <PromoButton label="Quitar fecha" kind="text" onPress={() => change({ expiration: null })} disabled={busy} />}
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  previewHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  previewHint: { fontSize: 12, color: palette.muted, flexShrink: 1, textAlign: "right" },
  preview: { width: "100%", maxWidth: 280, alignSelf: "center" },
  panel: { backgroundColor: palette.paper, borderRadius: 20, borderWidth: 1, borderColor: palette.line, padding: 15, gap: 12 },
  heading: { fontSize: 17, fontWeight: "800", color: palette.ink, flexShrink: 1 },
  field: { gap: 6 },
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
