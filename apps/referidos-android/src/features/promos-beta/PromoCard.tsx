import React from "react";
import { NativeModules, requireNativeComponent, StyleSheet, type ViewProps } from "react-native";
import { formatExpiration, type Promo } from "./promoLibrary";

type CardData = Pick<Promo, "title" | "offer" | "description" | "businessName" | "template" | "color" | "photo"> & {
  expirationLabel: string;
};

export function promoCardData(promo: Promo): CardData {
  const { title, offer, description, businessName, template, color, photo, expiration } = promo;
  return { title, offer, description, businessName, template, color, photo, expirationLabel: formatExpiration(expiration) };
}

export const promoNative: {
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
    data.businessName || "Tu negocio",
    data.title || "Tu próxima promoción",
    data.offer || "20% de descuento",
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
