// src/db/utils/idGen.js
// simple short id generator (synchronous) — not cryptographically secure but stable for dev
export function shortId(prefix = "") {
  const t = Date.now().toString(36).slice(-6);
  const r = Math.random().toString(36).slice(2, 6);
  return `${prefix}${t}${r}`.toUpperCase();
}

// helpers for prefixed ids
export function genId(type) {
  // type: 'USR','NEG','SUC','PRO','QRV','ESC','COM','REP'
  const suffix = shortId("").slice(0, 7);
  return `${type}_${suffix}`;
}
