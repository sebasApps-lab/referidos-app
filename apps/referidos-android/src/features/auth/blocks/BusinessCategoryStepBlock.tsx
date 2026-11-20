import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_SUBCATEGORIES,
} from "../../../../../referidos-app/src/auth/constants/businessCategories.js";
import categoryIconIndex from "../assets/category-icon-index.json";
import { authText } from "./AuthStartLayout";
import {
  OnboardingLabel,
  OnboardingPrimaryButton,
  OnboardingSubtitle,
  onboardingColors,
} from "./OnboardingFormLayout";

type Props = {
  currentCategory: string;
  onConfirmCategory: (label: string) => void;
};

type CategoryIcon = { viewBox: string; paths: string[] };
type Category = { id: string; label: string; icon: CategoryIcon };

const subcategories: Record<string, Category[]> = BUSINESS_SUBCATEGORIES;
const defaultIcon = "0 0 24 24|M5 7h14v10H5z|M8 10h8|M8 13h6";
const tileGap = 8;

function getSelection(label: string) {
  for (const [parentId, options] of Object.entries(subcategories)) {
    const match = options.find((item) => item.label === label);
    if (match) return { parentId, subId: match.id };
  }

  const parent = BUSINESS_CATEGORIES.find((item) => item.label === label);
  return { parentId: parent?.id || "", subId: "" };
}

export default function BusinessCategoryStepBlock({ currentCategory, onConfirmCategory }: Props) {
  const [selection, setSelection] = useState(() => getSelection(currentCategory));
  const [gridWidth, setGridWidth] = useState(0);
  const parent = BUSINESS_CATEGORIES.find((item) => item.id === selection.parentId);
  const children = subcategories[selection.parentId] || [];
  const showChildren = Boolean(parent && children.length);
  const options = showChildren && parent ? [parent, ...children] : BUSINESS_CATEGORIES;
  const choice = children.length ? children.find((item) => item.id === selection.subId) : parent;
  const tileWidth = (gridWidth - tileGap * 2) / 3;

  return (
    <View style={styles.root}>
      <OnboardingSubtitle>No te preocupes, puedes cambiarlo después</OnboardingSubtitle>
      <OnboardingLabel>Así podremos mostrar tus promos a las personas correctas.</OnboardingLabel>

      <View onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)} style={styles.grid}>
        {gridWidth > 0 && options.map((item, index) => {
          const isParent = !showChildren || index === 0;
          const active = item.id === (isParent ? selection.parentId : selection.subId);
          return (
            <View key={`${isParent ? "parent" : "sub"}-${item.id}`} style={{ width: tileWidth }}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => {
                  if (isParent) {
                    if (!active) setSelection({ parentId: item.id, subId: "" });
                  } else {
                    setSelection({ parentId: selection.parentId, subId: item.id });
                  }
                }}
                style={[styles.tile, active && styles.tileActive]}
              >
                <View style={styles.iconSlot}><CategoryImage icon={item.icon} active={active} /></View>
                <Text style={styles.tileLabel}>{item.label}</Text>
              </Pressable>
              {isParent && active && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Quitar categoría"
                  onPress={() => setSelection({ parentId: "", subId: "" })}
                  hitSlop={6}
                  style={styles.clear}
                >
                  <Text style={styles.clearLabel}>×</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <OnboardingPrimaryButton
          label="Continuar"
          tone={choice ? "green" : "neutral"}
          disabled={!choice}
          onPress={() => {
            if (choice) onConfirmCategory(choice.label);
          }}
        />
      </View>
    </View>
  );
}

function CategoryImage({ icon, active }: { icon: CategoryIcon; active: boolean }) {
  const key = `${icon.viewBox}|${icon.paths.join("|")}`;
  const index = categoryIconIndex.indexOf(key);
  const row = index < 0 ? categoryIconIndex.indexOf(defaultIcon) : index;

  return (
    <View style={styles.iconCrop}>
      <Image
        source={require("../assets/category-icons.png")}
        style={[
          styles.iconSprite,
          { top: -row * 20, tintColor: active ? onboardingColors.purple : onboardingColors.muted },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexGrow: 1, paddingBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: tileGap, marginTop: 16 },
  tile: {
    aspectRatio: 4 / 3,
    minHeight: 64,
    padding: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: onboardingColors.border,
    backgroundColor: onboardingColors.white,
    borderRadius: 12,
  },
  tileActive: { borderColor: onboardingColors.purple, backgroundColor: "#EFEAF6" },
  tileLabel: { ...authText.normal, color: onboardingColors.dark, fontSize: 11, lineHeight: 12, fontWeight: "600", textAlign: "center", marginTop: 2 },
  iconSlot: { width: 32, height: 32, marginTop: 2, justifyContent: "center", alignItems: "center" },
  iconCrop: { width: 20, height: 20, overflow: "hidden" },
  iconSprite: { position: "absolute", width: 20, height: categoryIconIndex.length * 20 },
  clear: {
    position: "absolute",
    top: 4,
    right: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: onboardingColors.purple,
    backgroundColor: onboardingColors.white,
  },
  clearLabel: { ...authText.caption, color: onboardingColors.purple },
  footer: { marginTop: "auto", paddingTop: 16 },
});
