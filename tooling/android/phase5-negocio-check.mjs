import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function readText(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing file: ${relativePath}`);
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function assertIncludes(content, needle, label) {
  if (!content.includes(needle)) {
    throw new Error(`[FAIL] ${label}: "${needle}" not found`);
  }
}

function main() {
  const inicio = readText("apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx");
  const escaner = readText("apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx");
  const gestionar = readText("apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx");
  const perfil = readText("apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx");
  const entityQueries = readText("apps/referidos-android/src/shared/services/entityQueries.ts");

  assertIncludes(inicio, "normalizePromoStatus", "negocio inicio status normalization");
  assertIncludes(inicio, "Estado y avisos", "negocio inicio notices");
  assertIncludes(inicio, "Gestionar", "negocio inicio action to gestionar");
  assertIncludes(inicio, "Ir a escaner", "negocio inicio action to scanner");

  assertIncludes(escaner, "redeemValidQrCode", "negocio scanner redeem helper usage");
  assertIncludes(escaner, "parseQrKind", "negocio scanner parser");
  assertIncludes(escaner, "qrv-", "negocio scanner valid QR handling");
  assertIncludes(escaner, "qrs-", "negocio scanner static QR handling");
  assertIncludes(escaner, "Resultado de escaneo", "negocio scanner result state");

  assertIncludes(gestionar, 'type ManageTab = "promos" | "sucursales" | "seguridad"', "negocio gestionar tabs");
  assertIncludes(gestionar, "createPromoForBusiness", "negocio gestionar create promo flow");
  assertIncludes(gestionar, "updatePromoStatusById", "negocio gestionar status transition");
  assertIncludes(gestionar, "deletePromoById", "negocio gestionar delete promo flow");
  assertIncludes(gestionar, "linkPromoToBranch", "negocio gestionar promo-branch link");
  assertIncludes(gestionar, "updateBranchStateById", "negocio gestionar branch transition");

  assertIncludes(perfil, 'type ProfileTab = "cuenta" | "seguridad" | "ayuda"', "negocio perfil tabs");
  assertIncludes(perfil, "fetchSupportTicketsByUserPublicId", "negocio perfil owner-only tickets query");
  assertIncludes(perfil, "Solo tickets del usuario propietario del negocio", "negocio perfil owner-only tickets UI");
  assertIncludes(perfil, "visibleCategories", "negocio perfil role category visibility");

  assertIncludes(entityQueries, "redeemValidQrCode", "entityQueries redeem helper");
  assertIncludes(entityQueries, "createPromoForBusiness", "entityQueries promo create helper");
  assertIncludes(entityQueries, "updatePromoStatusById", "entityQueries promo status helper");
  assertIncludes(entityQueries, "deletePromoById", "entityQueries promo delete helper");
  assertIncludes(entityQueries, "linkPromoToBranch", "entityQueries promo-branch link helper");
  assertIncludes(entityQueries, "updateBranchStateById", "entityQueries branch transition helper");

  console.log("Phase 5 negocio parity checks: OK");
}

main();
