import { MOCK_PROMOS } from "../inicio/InicioPromosPreview";

const HOUR_MS = 60 * 60 * 1000;
const now = Date.now();

const buildItem = (promo, index, variant) => {
  const status =
    variant === "canjeados"
      ? "canjeado"
      : variant === "expirados"
      ? "expirado"
      : "valido";

  const expiresAt =
    variant === "expirados"
      ? new Date(now - (index + 2) * HOUR_MS).toISOString()
      : new Date(now + (index + 2) * HOUR_MS).toISOString();

  const redeemedAt =
    variant === "canjeados"
      ? new Date(now - (index + 1) * HOUR_MS).toISOString()
      : null;

  return {
    id: `${variant}-${promo.id}`,
    code: `mock-${variant}-${index + 1}`,
    status,
    createdAt: new Date(now - (index + 1) * HOUR_MS).toISOString(),
    expiresAt,
    redeemedAt,
    promoId: promo.id,
    promo: {
      id: promo.id,
      titulo: promo.titulo,
      descripcion: promo.descripcion,
      imagen: promo.imagen,
      nombreLocal: promo.nombreLocal,
      sector: promo.ubicacion,
    },
    timeLeftMs: new Date(expiresAt).getTime() - now,
  };
};

const buildList = (variant) =>
  MOCK_PROMOS.map((promo, index) => buildItem(promo, index, variant));

export const HISTORIAL_PREVIEW_BY_TAB = {
  activos: buildList("activos"),
  canjeados: buildList("canjeados"),
  expirados: buildList("expirados"),
};
