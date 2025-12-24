const AVATAR_FEMALE = "https://cdn-icons-png.flaticon.com/512/4474/4474849.png";
const AVATAR_MALE = "https://cdn-icons-png.flaticon.com/512/4474/4474855.png";
const AVATAR_NEUTRAL =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const TIER_META = {
  explorador: {
    label: "Explorador",
    accent: "#5E30A5",
    glow: "#EFE9FA",
    badge: "E",
  },
  impulsor: {
    label: "Impulsor",
    accent: "#4B2488",
    glow: "#E9E2F7",
    badge: "I",
  },
  embajador: {
    label: "Embajador",
    accent: "#2F1A55",
    glow: "#E4DAF2",
    badge: "B",
  },
};

const ROLE_LABELS = {
  cliente: "Cliente",
  negocio: "Negocio",
  admin: "Admin",
};

export function formatCompactNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "0";
  if (number < 1000) return `${number}`;
  if (number < 1000000) return `${(number / 1000).toFixed(1)}k`;
  return `${(number / 1000000).toFixed(1)}m`;
}

export function getUserAlias(usuario) {
  if (!usuario) return "Invitado";
  return (
    usuario.alias ||
    usuario.username ||
    usuario.nombre ||
    usuario.email?.split("@")[0] ||
    "Invitado"
  );
}

export function getUserShortName(usuario) {
  const base =
    usuario?.nombre ||
    usuario?.alias ||
    usuario?.username ||
    usuario?.email ||
    "Usuario";
  return base.split(" ")[0];
}

export function getRoleLabel(usuario) {
  return ROLE_LABELS[usuario?.role] || "Usuario";
}

export function getTierMeta(usuario) {
  const raw =
    (usuario?.tier || usuario?.nivel || usuario?.plan || "explorador")
      .toString()
      .toLowerCase();
  return TIER_META[raw] || TIER_META.explorador;
}

export function getTierProgress(usuario) {
  const pointsRaw =
    usuario?.puntos ||
    usuario?.puntosAcumulados ||
    usuario?.referidosCount ||
    0;
  const points = Number(pointsRaw) || 0;
  const nextGoal = points < 120 ? 120 : points < 320 ? 320 : 600;
  return {
    points,
    nextGoal,
    progress: Math.min(1, points / nextGoal),
  };
}

export function getAvatarSrc(usuario, explicit) {
  if (explicit) return explicit;
  if (usuario?.avatarUrl || usuario?.avatar) return usuario.avatarUrl || usuario.avatar;
  if (usuario?.genero === "f") return AVATAR_FEMALE;
  if (usuario?.genero === "m") return AVATAR_MALE;
  return AVATAR_NEUTRAL;
}

export function getInitials(usuario) {
  const base = usuario?.nombre || usuario?.alias || usuario?.username || "Usuario";
  return base
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function getVerificationStatus(usuario) {
  const emailVerified = Boolean(
    usuario?.email_verified ||
      usuario?.emailVerified ||
      usuario?.email_confirmed_at ||
      usuario?.emailConfirmedAt ||
      usuario?.verificado
  );
  const phoneVerified = Boolean(
    usuario?.telefono_verified ||
      usuario?.phoneVerified ||
      usuario?.phone_confirmed_at ||
      usuario?.phoneConfirmedAt ||
      usuario?.telefonoVerificado
  );
  const accountVerified = Boolean(
    usuario?.accountVerified ||
      usuario?.verificado ||
      (emailVerified && phoneVerified)
  );

  return { emailVerified, phoneVerified, accountVerified };
}

export function formatReadableDate(value) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getDisplayEmail(usuario) {
  return usuario?.email || "correo@ejemplo.com";
}

export function getDisplayPhone(usuario) {
  return usuario?.telefono || usuario?.phone || "000 000 000";
}

export function getDisplayLocation(usuario) {
  return usuario?.ubicacion || usuario?.ciudad || "Sin ubicacion";
}

export function getCercanasTitle(usuario) {
  const hasLocation = Boolean(
    usuario?.ubicacion || usuario?.ciudad || usuario?.sector || usuario?.lat
  );
  return hasLocation ? "Cerca de ti" : "Promociones sugeridas";
}

export function getSessionListFallback() {
  return [
    {
      id: "session-current",
      device: "Movil",
      location: "Tu ubicacion",
      lastActive: "Activa ahora",
      current: true,
    },
    {
      id: "session-laptop",
      device: "Laptop",
      location: "Quito, Ecuador",
      lastActive: "Hace 2 dias",
      current: false,
    },
  ];
}

export function getPlanFallback(role) {
  if (role === "negocio") {
    return {
      plan: "FREE",
      perks: ["Hasta 3 promos activas", "Soporte estandar", "Reportes basicos"],
      upgrades: ["Upgrade a PRO", "Upgrade a PLUS"],
    };
  }
  return {
    plan: "Explorador",
    perks: ["Promos destacadas", "Invitaciones ilimitadas", "Soporte prioritario"],
    upgrades: ["Impulsor", "Embajador"],
  };
}
