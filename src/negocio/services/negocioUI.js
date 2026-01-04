const AVATAR_FEMALE = "https://cdn-icons-png.flaticon.com/512/4474/4474849.png";
const AVATAR_MALE = "https://cdn-icons-png.flaticon.com/512/4474/4474855.png";
const AVATAR_NEUTRAL =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const PLAN_META = {
  free: { label: "FREE", badge: "F", accent: "#5E30A5" },
  plus: { label: "PLUS", badge: "P", accent: "#4B2488" },
  pro: { label: "PRO", badge: "P", accent: "#2F1A55" },
};

export function formatCompactNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "0";
  if (number < 1000) return `${number}`;
  if (number < 1000000) return `${(number / 1000).toFixed(1)}k`;
  return `${(number / 1000000).toFixed(1)}m`;
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

export function getNegocioRoleLabel(usuario) {
  const role = usuario?.role?.toString().toLowerCase();
  if (role === "empleado") return "Empleado";
  if (role === "negocio") return "Propietario";
  return "Propietario";
}

export function getAvatarSrc(usuario, explicit) {
  if (explicit) return explicit;
  if (usuario?.avatarUrl || usuario?.avatar) return usuario.avatarUrl || usuario.avatar;
  if (usuario?.genero === "f") return AVATAR_FEMALE;
  if (usuario?.genero === "m") return AVATAR_MALE;
  return AVATAR_NEUTRAL;
}

export function getNegocioPlanMeta({ negocio, usuario, plan } = {}) {
  const raw =
    plan ||
    negocio?.plan ||
    negocio?.suscripcion ||
    usuario?.plan ||
    usuario?.suscripcion ||
    "free";
  const key = raw.toString().toLowerCase();
  return PLAN_META[key] || PLAN_META.free;
}

export function getNegocioNombre({ negocio, usuario } = {}) {
  return (
    negocio?.nombre ||
    usuario?.negocioNombre ||
    usuario?.negocio ||
    "Tu negocio"
  );
}

export function getNegocioSector({ negocio, usuario } = {}) {
  return negocio?.sector || usuario?.sector || "Sin sector";
}

export function getNegocioDireccion({ negocio, usuario } = {}) {
  const raw =
    (negocio?.direccion || negocio?.ubicacion || usuario?.direccion || "").trim();
  if (!raw) return "Sin ubicacion";
  const parts = raw
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  if (parts.length >= 2) return `${parts[0]} / ${parts[1]}`;
  return raw;
}

export function getNegocioImagen({ negocio, usuario } = {}) {
  return negocio?.imagen || negocio?.logo || usuario?.negocioImagen || "";
}

export function getNegocioReferidos({ negocio, usuario } = {}) {
  const raw =
    negocio?.referidosCount ||
    negocio?.referidos ||
    usuario?.referidosCount ||
    0;
  return Number(raw) || 0;
}
