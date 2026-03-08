import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import SectionCard from "@shared/ui/SectionCard";
import { getFaqSectionsForAudience } from "../profileFaqContent";

export function ProfileFaqSection({
  audience,
}: {
  audience: "cliente" | "negocio";
}) {
  const sections = useMemo(() => getFaqSectionsForAudience(audience), [audience]);
  const [expandedId, setExpandedId] = useState("");

  return (
    <SectionCard title="Preguntas frecuentes" subtitle="Contenido equivalente al FAQ web">
      <View style={styles.stack}>
        {sections.map((section) => (
          <View key={section.id} style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => {
              const expanded = expandedId === item.id;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => setExpandedId(expanded ? "" : item.id)}
                  style={styles.questionCard}
                >
                  <Text style={styles.questionText}>{item.question}</Text>
                  {expanded ? (
                    <View style={styles.answerWrap}>
                      {item.answer.map((line) => (
                        <Text key={`${item.id}-${line}`} style={styles.answerText}>
                          - {line}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </SectionCard>
  );
}

export function ProfileBenefitsSection({
  role,
  accountLabel,
  accountHelper,
}: {
  role: "cliente" | "negocio";
  accountLabel: string;
  accountHelper: string;
}) {
  return (
    <SectionCard
      title={role === "cliente" ? "Beneficios y tier" : "Plan y beneficios"}
      subtitle="Resumen funcional equivalente al perfil web"
    >
      <View style={styles.stack}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>{accountLabel}</Text>
          <Text style={styles.infoText}>{accountHelper}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            {role === "cliente" ? "Progreso de tier" : "Estado del plan"}
          </Text>
          <Text style={styles.infoText}>
            {role === "cliente"
              ? "Completar perfil y verificar correo habilita mas promociones, avance y referidos."
              : "Completar datos del negocio y mantener informacion actualizada mejora visibilidad y operaciones."}
          </Text>
        </View>
      </View>
    </SectionCard>
  );
}

export function ProfilePreferencesSection({
  role,
}: {
  role: "cliente" | "negocio";
}) {
  const [theme, setTheme] = useState("sistema");
  const [language, setLanguage] = useState("es");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <View style={styles.stack}>
      <SectionCard title="Apariencia" subtitle="Preferencia local del canal Android">
        <View style={styles.chipRow}>
          {["sistema", "claro", "oscuro"].map((item) => {
            const active = item === theme;
            return (
              <Pressable
                key={item}
                onPress={() => setTheme(item)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="Idioma" subtitle="Preferencia visible en perfil">
        <View style={styles.chipRow}>
          {[
            { id: "es", label: "Espanol" },
            { id: "en", label: "English" },
          ].map((item) => {
            const active = item.id === language;
            return (
              <Pressable
                key={item.id}
                onPress={() => setLanguage(item.id)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="Dejar un comentario" subtitle={`Feedback de ${role}`}>
        <TextInput
          value={feedbackMessage}
          onChangeText={(value) => {
            setFeedbackSent(false);
            setFeedbackMessage(value.slice(0, 500));
          }}
          placeholder="Escribe tu comentario"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          style={[styles.input, styles.textArea]}
        />
        <TextInput
          value={feedbackEmail}
          onChangeText={(value) => {
            setFeedbackSent(false);
            setFeedbackEmail(value);
          }}
          placeholder="Correo (opcional)"
          style={styles.input}
        />
        <Pressable
          onPress={() => setFeedbackSent(Boolean(feedbackMessage.trim()))}
          style={styles.primaryBtn}
        >
          <Text style={styles.primaryBtnText}>Enviar comentario</Text>
        </Pressable>
        {feedbackSent ? (
          <Text style={styles.okText}>Comentario listo para enviar desde Android.</Text>
        ) : null}
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
  sectionWrap: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  questionCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 6,
  },
  questionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  answerWrap: {
    gap: 4,
  },
  answerText: {
    fontSize: 12,
    color: "#475569",
  },
  infoCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 4,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  infoText: {
    fontSize: 12,
    color: "#475569",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  chipActive: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  chipTextActive: {
    color: "#5B21B6",
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
  textArea: {
    minHeight: 110,
  },
  primaryBtn: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  okText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
});
