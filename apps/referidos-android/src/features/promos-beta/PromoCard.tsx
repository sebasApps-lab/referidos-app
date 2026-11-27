import React from "react";
import { NativeModules, requireNativeComponent, StyleSheet, type ViewProps } from "react-native";
import { promoCardData, type Promo } from "./promoLibrary";

type CardData = ReturnType<typeof promoCardData>;

export const promoNative: {
  sessionId: string;
  pickPhoto(): Promise<string | null>;
  pickDate(value: string | null): Promise<string | null>;
  saveImage(data: CardData): Promise<"gallery" | "document" | null>;
  shareImage(data: CardData): Promise<"chooser_opened">;
  prunePhotos(retained: string[]): Promise<void>;
} = NativeModules.ReferidosPromoBeta;

const NativePromoCard = requireNativeComponent<ViewProps & { cardData: CardData }>("ReferidosPromoCard");

export default function PromoCard({ promo, decorative = false }: { promo: Promo; decorative?: boolean }) {
  const data = { ...promoCardData(promo), thumbnail: decorative };
  const label = [
    "Vista previa de la promoción",
    data.businessName,
    data.title,
    data.offer,
    data.description,
    data.expirationLabel && `Válida hasta ${data.expirationLabel}`,
  ].filter(Boolean).join(". ");
  return (
    <NativePromoCard
      accessible={!decorative}
      accessibilityRole="image"
      accessibilityLabel={decorative ? undefined : label}
      importantForAccessibility={decorative ? "no-hide-descendants" : "yes"}
      style={[styles.card, decorative && styles.thumbnail]}
      cardData={data}
    />
  );
}

const styles = StyleSheet.create({
  card: { width: "100%", aspectRatio: 1, backgroundColor: "#ECE3F8" },
  thumbnail: { borderRadius: 8, overflow: "hidden" },
});
