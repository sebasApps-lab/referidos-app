export const BUSINESS_NAME_MAX = 38;

const NAME_CLEAN_RE = /[^\p{L}\p{N} ]+/gu;
const MULTI_SPACE_RE = /\s+/g;
const RUC_CLEAN_RE = /\D/g;

export function normalizeBusinessName(value = "") {
  const cleaned = value
    .replace(NAME_CLEAN_RE, "")
    .replace(MULTI_SPACE_RE, " ")
    .trimStart();
  return cleaned.slice(0, BUSINESS_NAME_MAX);
}

export function normalizeBusinessRuc(value = "") {
  return value.replace(RUC_CLEAN_RE, "").slice(0, 13);
}

export function getBusinessDataStatus({ nombreNegocio, ruc, categoriaNegocio }) {
  const nombreValue = normalizeBusinessName(nombreNegocio || "");
  const rucValue = normalizeBusinessRuc(ruc || "");
  const categoriaValue = String(categoriaNegocio || "").trim();
  const hasNombre = nombreValue.trim().length > 0;
  const hasRuc = rucValue.trim().length > 0;
  const hasCategoria = categoriaValue.length > 0;

  return {
    nombre: nombreValue,
    ruc: rucValue,
    categoria: categoriaValue,
    canSubmit: hasNombre && hasRuc && hasCategoria,
  };
}
