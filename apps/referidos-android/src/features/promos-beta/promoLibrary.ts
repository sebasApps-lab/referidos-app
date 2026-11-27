export const templates = [
  { id: "signature", label: "Esencial" },
  { id: "editorial", label: "Editorial" },
  { id: "contrast", label: "Impacto" },
] as const;

export const colors = [
  { id: "grape", label: "Uva", swatch: "#633BA4" },
  { id: "forest", label: "Bosque", swatch: "#266755" },
  { id: "coral", label: "Coral", swatch: "#9A3956" },
  { id: "ocean", label: "Océano", swatch: "#325798" },
] as const;

export const limits = { title: 64, offer: 42, description: 144, businessName: 42 };

export type Promo = {
  id: string;
  title: string;
  offer: string;
  description: string;
  businessName: string;
  expiration: string | null;
  photo: string | null;
  template: (typeof templates)[number]["id"];
  color: (typeof colors)[number]["id"];
  updatedAt: number;
};

export type PromoChange = Partial<Omit<Promo, "id" | "updatedAt">>;

export type PromoLibrary = {
  version: 1;
  businessName: string;
  promos: Promo[];
};

export const storageKey = "@referidos-promos/library/v1";
export const emptyLibrary: PromoLibrary = { version: 1, businessName: "", promos: [] };

let nextId = 0;

export function newPromo(businessName: string, now = Date.now()): Promo {
  return {
    id: `${now}-${nextId++}`,
    title: "",
    offer: "",
    description: "",
    businessName,
    expiration: null,
    photo: null,
    template: "signature",
    color: "grape",
    updatedAt: now,
  };
}

export function duplicatePromo(promo: Promo, now = Date.now()): Promo {
  const copy = newPromo(promo.businessName, now);
  return { ...promo, id: copy.id, updatedAt: now };
}

export function savePromo(library: PromoLibrary, promo: Promo, rememberBusiness = false): PromoLibrary {
  return {
    ...library,
    businessName: rememberBusiness ? promo.businessName.trim() : library.businessName,
    promos: [promo, ...library.promos.filter((entry) => entry.id !== promo.id)],
  };
}

export function removePromo(library: PromoLibrary, id: string): PromoLibrary {
  return { ...library, promos: library.promos.filter((promo) => promo.id !== id) };
}

export function requiredFields(promo: Promo) {
  return { title: !promo.title.trim(), offer: !promo.offer.trim() };
}

export function isReady(promo: Promo) {
  const incomplete = requiredFields(promo);
  return !incomplete.title && !incomplete.offer;
}

export function formatExpiration(value: string | null) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function photoNames(library: PromoLibrary) {
  return [...new Set(library.promos.flatMap(({ photo }) => photo ? [photo] : []))];
}

export function readLibrary(raw: string | null): PromoLibrary {
  if (raw === null) return emptyLibrary;
  const library = JSON.parse(raw) as PromoLibrary | null;
  if (
    library?.version !== 1 ||
    typeof library.businessName !== "string" ||
    !Array.isArray(library.promos) ||
    !library.promos.every((promo) => promo &&
      typeof promo.id === "string" &&
      [promo.title, promo.offer, promo.description, promo.businessName].every((value) => typeof value === "string") &&
      Number.isFinite(promo.updatedAt) &&
      (promo.expiration === null || (typeof promo.expiration === "string" && /^\d{4}-\d{2}-\d{2}$/.test(promo.expiration))) &&
      (promo.photo === null || (typeof promo.photo === "string" && /^[a-f0-9-]{36}\.jpg$/.test(promo.photo))) &&
      templates.some(({ id }) => id === promo.template) &&
      colors.some(({ id }) => id === promo.color))
  ) {
    throw new Error("Invalid promotion library");
  }
  return library;
}

export function createLibraryWriter(write: (value: string) => Promise<void>) {
  let pending = Promise.resolve();
  return (library: PromoLibrary) => {
    const next = pending.then(() => write(JSON.stringify(library)));
    pending = next.catch(() => {});
    return next;
  };
}
