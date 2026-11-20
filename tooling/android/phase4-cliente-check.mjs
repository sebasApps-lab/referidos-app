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
  const inicio = readText("apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx");
  const escaner = readText("apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx");
  const historial = readText("apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx");
  const historyData = readText("apps/referidos-android/src/features/cliente/historial/historyData.ts");
  const historyCard = readText("apps/referidos-android/src/features/cliente/historial/HistoryCard.tsx");
  const perfil = readText("apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx");
  const roleTabs = readText("apps/referidos-android/src/navigation/RoleTabs.tsx");
  const scanner = readText("apps/referidos-android/src/features/scanner/ScannerGateway.tsx");
  const entityQueries = readText("apps/referidos-android/src/shared/services/entityQueries.ts");

  assertIncludes(inicio, "navigation.navigate(TAB_ROUTES.CLIENTE.ESCANER)", "cliente inicio scanner navigation");
  assertIncludes(inicio, "onScan={onScan}", "cliente inicio scanner action wiring");
  assertIncludes(roleTabs, "name: TAB_ROUTES.CLIENTE.HISTORIAL", "cliente history navigation");
  assertIncludes(roleTabs, "component: ClienteHistorialScreen", "cliente history route component");
  assertIncludes(inicio, "openPromoLink", "cliente inicio deeplink action");

  assertIncludes(escaner, "<ScannerGateway onProcess=", "cliente escaner processing integration");
  assertIncludes(escaner, 'normalized.startsWith("qrv-")', "cliente escaner valid QR parser");
  assertIncludes(escaner, 'normalized.startsWith("qrs-")', "cliente escaner static QR parser");
  assertIncludes(scanner, "setFeedback(await onProcess(code))", "cliente escaner result state");
  assertIncludes(scanner, "<ScannerFeedbackCard feedback={feedback}", "cliente escaner result rendering");

  for (const category of ["activos", "canjeados", "expirados"]) {
    assertIncludes(historyData, `key: "${category}"`, `cliente historial filter ${category}`);
  }
  assertIncludes(historial, "HISTORY_TABS.map(", "cliente historial filter controls");
  assertIncludes(historial, "getHistoryTab(record, now) === activeTab", "cliente historial record filtering");
  assertIncludes(historyCard, "onOpen(item.id)", "cliente historial record selection");
  assertIncludes(historial, "onOpen={setDetailId}", "cliente historial selected detail state");
  assertIncludes(historial, "<HistoryDetail item={detail}", "cliente historial detail rendering");

  assertIncludes(perfil, "<ProfileSettingsLayout section={section} onSectionChange={setSection}", "cliente perfil section navigation");
  for (const section of ["personal", "access", "help", "tickets"]) {
    assertIncludes(perfil, `section === "${section}"`, `cliente perfil section ${section}`);
  }
  assertIncludes(perfil, "<AccessSecurityPanel", "cliente perfil security section");
  assertIncludes(perfil, "fetchSupportTicketsByUserPublicId(supabase, ownerPublicId", "cliente perfil owner-only query usage");

  assertIncludes(entityQueries, "fetchSupportTicketsByUserPublicId", "entityQueries owner-only ticket function");
  assertIncludes(entityQueries, '["user_public_id", "userPublicId"]', "entityQueries support owner column set");
  assertIncludes(entityQueries, ".eq(column, safeUserPublicId)", "entityQueries scopes tickets to owner");

  console.log("Phase 4 cliente parity checks: OK");
}

main();
