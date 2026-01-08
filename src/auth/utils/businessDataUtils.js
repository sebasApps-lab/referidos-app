export const BUSINESS_NAME_MAX = 38;

const NAME_CLEAN_RE = /[^\p{L}\p{N} ]+/gu;
const MULTI_SPACE_RE = /\s+/g;

export function normalizeBusinessName(value = "") {
  const cleaned = value
    .replace(NAME_CLEAN_RE, "")
    .replace(MULTI_SPACE_RE, " ")
    .trimStart();
  return cleaned.slice(0, BUSINESS_NAME_MAX);
}
