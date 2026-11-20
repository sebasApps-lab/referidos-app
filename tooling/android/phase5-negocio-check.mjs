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
  const roleTabs = readText("apps/referidos-android/src/navigation/RoleTabs.tsx");
  const scanner = readText("apps/referidos-android/src/features/scanner/ScannerGateway.tsx");
  const entityQueries = readText("apps/referidos-android/src/shared/services/entityQueries.ts");

  assertIncludes(inicio, 'readFirst(promo, ["estado", "status"]', "negocio inicio status normalization");
  assertIncludes(inicio, "result[promoStatus(promo)]", "negocio inicio status counts");
  assertIncludes(inicio, "{counts[status]}", "negocio inicio status counts rendering");
  assertIncludes(inicio, "promos.filter((promo) => promoStatus(promo) === filter)", "negocio inicio status filters");
  assertIncludes(inicio, "navigation.navigate(TAB_ROUTES.NEGOCIO.GESTIONAR)", "negocio inicio action to gestionar");
  assertIncludes(roleTabs, "name: TAB_ROUTES.NEGOCIO.ESCANER", "negocio scanner navigation");
  assertIncludes(roleTabs, "component: NegocioEscanerScreen", "negocio scanner route component");

  assertIncludes(escaner, "redeemValidQrCode", "negocio scanner redeem helper usage");
  assertIncludes(escaner, "<ScannerGateway isBusiness onProcess=", "negocio scanner processing integration");
  assertIncludes(escaner, 'normalized.startsWith("qrv-")', "negocio scanner valid QR parser");
  assertIncludes(escaner, 'normalized.startsWith("qrs-")', "negocio scanner static QR parser");
  assertIncludes(scanner, "setFeedback(await onProcess(code))", "negocio scanner result state");
  assertIncludes(scanner, "<ScannerFeedbackCard feedback={feedback}", "negocio scanner result rendering");

  assertIncludes(gestionar, "MANAGE_TABS.map(", "negocio gestionar controls");
  for (const tab of ["metricas", "grupos", "seguridad"]) {
    assertIncludes(gestionar, `activeTab === "${tab}"`, `negocio gestionar panel ${tab}`);
  }
  assertIncludes(gestionar, "createPromoForBusiness", "negocio gestionar create promo flow");
  assertIncludes(gestionar, "updatePromoStatusById", "negocio gestionar status transition");
  assertIncludes(gestionar, "deletePromoById", "negocio gestionar delete promo flow");
  assertIncludes(gestionar, "linkPromoToBranch", "negocio gestionar promo-branch link");
  assertIncludes(gestionar, "updateBranchStateById", "negocio gestionar branch transition");

  assertIncludes(perfil, "<ProfileSettingsLayout section={section} onSectionChange={setSection}", "negocio perfil section navigation");
  for (const section of ["personal", "access", "help", "tickets"]) {
    assertIncludes(perfil, `section === "${section}"`, `negocio perfil section ${section}`);
  }
  assertIncludes(perfil, "fetchSupportTicketsByUserPublicId(supabase, ownerPublicId", "negocio perfil owner-only tickets query");
  assertIncludes(entityQueries, ".eq(column, safeUserPublicId)", "entityQueries scopes tickets to owner");
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
