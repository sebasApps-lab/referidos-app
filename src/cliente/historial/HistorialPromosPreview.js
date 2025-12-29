import { MOCK_PROMOS } from "../inicio/InicioPromosPreview";

const MINUTE_MS = 60 * 1000;

const createSeededRng = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const seedFromString = (value) =>
  value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const shuffleWithSeed = (list, seed) => {
  const rng = createSeededRng(seed);
  const items = [...list];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

const buildItem = (promo, index, variant, now, timeRng) => {
  const status =
    variant === "canjeados"
      ? "canjeado"
      : variant === "expirados"
      ? "expirado"
      : "valido";

  const activeOffset = Math.floor(timeRng() * (4 * MINUTE_MS));
  const activeStartedAt = now - activeOffset;
  const expiresAt =
    variant === "expirados"
      ? new Date(now - 5 * MINUTE_MS).toISOString()
      : new Date(activeStartedAt + 5 * MINUTE_MS).toISOString();

  const redeemedAt =
    variant === "canjeados"
      ? new Date(now - (2 + Math.floor(timeRng() * 3)) * MINUTE_MS).toISOString()
      : null;

  return {
    id: `${variant}-${promo.id}`,
    code: `mock-${variant}-${index + 1}`,
    status,
    createdAt:
      variant === "activos"
        ? new Date(activeStartedAt).toISOString()
        : new Date(now - 5 * MINUTE_MS).toISOString(),
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

export const buildHistorialPreview = ({
  seed = Date.now(),
  baseTime = Date.now(),
} = {}) => {
  const seedBase = seed;
  const buildList = (variant) => {
    const seed = seedBase + seedFromString(variant);
    const shuffled = shuffleWithSeed(MOCK_PROMOS, seed);
    const timeSeed = seedBase + seedFromString(`${variant}-time`);
    const timeRng = createSeededRng(timeSeed);
    return shuffled.map((promo, index) =>
      buildItem(promo, index, variant, baseTime, timeRng)
    );
  };

  return {
    activos: buildList("activos"),
    canjeados: buildList("canjeados"),
    expirados: buildList("expirados"),
  };
};

export const HISTORIAL_PREVIEW_BY_TAB = buildHistorialPreview();
