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
export type PromoTextField = keyof typeof limits;

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

export function createPromoIds(namespace: string) {
  let sequence = 0;
  return (library: PromoLibrary) => {
    const occupied = new Set(library.promos.map(({ id }) => id));
    let id: string;
    do { id = `${namespace}:${sequence++}`; } while (occupied.has(id));
    return id;
  };
}

export function newPromo(id: string, businessName: string, now = Date.now()): Promo {
  return {
    id,
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

export function duplicatePromo(promo: Promo, id: string, now = Date.now()): Promo {
  return { ...promo, id, updatedAt: now };
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

export function countCharacters(value: string) {
  return Array.from(value).length;
}

export function promoErrors(promo: Promo) {
  const errors: Partial<Record<PromoTextField, string>> = {};
  for (const field of ["title", "offer", "businessName", "description"] as const) {
    if (countCharacters(promo[field]) > limits[field]) {
      errors[field] = `Reduce el texto a ${limits[field]} caracteres.`;
    } else if (field === "title" && !promo.title.trim()) {
      errors.title = "Escribe el título de tu promoción.";
    } else if (field === "offer" && !promo.offer.trim()) {
      errors.offer = "Escribe qué ofreces.";
    }
  }
  return errors;
}

export function firstPromoError(promo: Promo): PromoTextField | undefined {
  if (!promo.title.trim()) return "title";
  if (!promo.offer.trim()) return "offer";
  return (Object.keys(promoErrors(promo)) as PromoTextField[])[0];
}

export function isReady(promo: Promo) {
  return firstPromoError(promo) === undefined;
}

export function formatExpiration(value: string | null) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function promoCardData(promo: Promo) {
  const { template, color, photo, expiration } = promo;
  return {
    title: promo.title.trim(), offer: promo.offer.trim(), description: promo.description.trim(),
    businessName: promo.businessName.trim(), template, color, photo, expirationLabel: formatExpiration(expiration),
  };
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
  const occupied = new Set(library.promos.map(({ id }) => id));
  const seen = new Set<string>();
  const promos = library.promos.map((promo) => {
    if (!seen.has(promo.id)) {
      seen.add(promo.id);
      return promo;
    }
    // Keep both records if an older snapshot contains the same ID twice.
    let suffix = 1;
    while (occupied.has(`${promo.id}:${suffix}`)) suffix++;
    const id = `${promo.id}:${suffix}`;
    occupied.add(id);
    return { ...promo, id };
  });
  return { ...library, promos };
}

export function createLibraryWriter(write: (value: string) => Promise<void>) {
  type Waiter = { resolve: () => void; reject: (error: unknown) => void };
  let writing = false;
  let pending: { library: PromoLibrary; waiters: Waiter[] } | undefined;

  async function flush() {
    writing = true;
    while (pending) {
      const { library, waiters } = pending;
      pending = undefined;
      try {
        await write(JSON.stringify(library));
        waiters.forEach(({ resolve }) => resolve());
      } catch (error) {
        waiters.forEach(({ reject }) => reject(error));
      }
    }
    writing = false;
  }

  return (library: PromoLibrary) => new Promise<void>((resolve, reject) => {
    if (pending) {
      pending.library = library;
      pending.waiters.push({ resolve, reject });
    } else {
      pending = { library, waiters: [{ resolve, reject }] };
    }
    if (!writing) void flush();
  });
}
