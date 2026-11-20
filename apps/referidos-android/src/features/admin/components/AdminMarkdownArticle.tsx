import React from "react";
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from "react-native";

type Block = { type: string; text?: string; level?: number; items?: string[]; code?: string; lang?: string };

function openLink(href: string) {
  const address = href.startsWith("/legal/") ? `https://referidos.app${href}` : href;
  if (!/^(https?:\/\/|mailto:)/i.test(address)) return;
  void Linking.openURL(address).catch(() => {
    Alert.alert("Enlace no disponible", "No se pudo abrir el enlace en este dispositivo.");
  });
}

function inline(text: string) {
  const tokens = /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  const parts: React.ReactNode[] = [];
  let offset = 0;
  for (const match of text.matchAll(tokens)) {
    const index = match.index ?? 0;
    const [, , label, href, bold, code, italic] = match;
    if (index > offset) parts.push(text.slice(offset, index));
    const linkable = /^(https?:\/\/|mailto:|\/legal\/)/i.test(href || "");
    if (label) parts.push(<Text key={index} style={styles.link} accessibilityRole={linkable ? "link" : undefined} onPress={linkable ? () => openLink(href) : undefined}>{label}</Text>);
    else if (bold) parts.push(<Text key={index} style={styles.bold}>{bold}</Text>);
    else if (code) parts.push(<Text key={index} style={styles.inlineCode}>{code}</Text>);
    else if (italic) parts.push(<Text key={index} style={styles.italic}>{italic}</Text>);
    offset = index + match[0].length;
  }
  if (offset < text.length) parts.push(text.slice(offset));
  return parts;
}

export default function AdminMarkdownArticle({ blocks }: { blocks: Block[] }) {
  return (
    <View style={styles.article}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const level = block.level || 1;
          const size = level === 1 ? 24 : level === 2 ? 20 : level === 3 ? 18 : 16;
          return <Text key={index} accessibilityRole="header" style={[styles.heading, { fontSize: size, lineHeight: size + 6 }]}>{inline(block.text || "")}</Text>;
        }
        if (block.type === "bullet" || block.type === "ordered") return (
          <View key={index} style={styles.list}>
            {(block.items || []).map((entry, number) => (
              <View key={number} style={styles.listRow}>
                <Text style={styles.body}>{block.type === "bullet" ? "•" : `${number + 1}.`}</Text>
                <Text selectable style={[styles.body, styles.listText]}>{inline(entry)}</Text>
              </View>
            ))}
          </View>
        );
        if (block.type === "code") return (
          <ScrollView horizontal key={index} style={styles.code}>
            <Text selectable style={styles.codeText}>{block.code}</Text>
          </ScrollView>
        );
        return <Text key={index} selectable style={styles.body}>{inline(block.text || "")}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  article: { gap: 12, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF" },
  heading: { marginTop: 4, color: "#0F172A", fontWeight: "700" },
  body: { fontSize: 14, lineHeight: 21, color: "#334155" },
  link: { color: "#5E30A5", textDecorationLine: "underline", fontWeight: "500" },
  bold: { color: "#0F172A", fontWeight: "600" },
  inlineCode: { fontFamily: "monospace", color: "#1E293B", backgroundColor: "#F1F5F9" },
  italic: { fontStyle: "italic" },
  list: { gap: 4, paddingLeft: 8 },
  listRow: { flexDirection: "row", gap: 6 },
  listText: { flex: 1 },
  code: { backgroundColor: "#0F172A", borderRadius: 10, padding: 12 },
  codeText: { fontFamily: "monospace", color: "#F1F5F9", fontSize: 12, lineHeight: 18 },
});
