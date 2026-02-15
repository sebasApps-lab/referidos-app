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
  const perfil = readText("apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx");
  const entityQueries = readText("apps/referidos-android/src/shared/services/entityQueries.ts");

  assertIncludes(inicio, "Ir a escaner", "cliente inicio quick action");
  assertIncludes(inicio, "Ver historial", "cliente inicio quick action");
  assertIncludes(inicio, "openPromoLink", "cliente inicio deeplink action");

  assertIncludes(escaner, "resolveScannerOutcome", "cliente escaner parser");
  assertIncludes(escaner, "qrv-", "cliente escaner valid QR flow");
  assertIncludes(escaner, "qrs-", "cliente escaner static QR flow");
  assertIncludes(escaner, "Resultado de escaneo", "cliente escaner result state");

  assertIncludes(historial, 'type HistoryFilter = "todos" | "activos" | "canjeados" | "expirados"', "cliente historial filters");
  assertIncludes(historial, "filterChip", "cliente historial filter chips");
  assertIncludes(historial, "Ver detalle", "cliente historial detail navigation");

  assertIncludes(perfil, 'type ProfileTab = "cuenta" | "seguridad" | "ayuda"', "cliente perfil tabs");
  assertIncludes(perfil, "Acceso y seguridad", "cliente perfil security section");
  assertIncludes(perfil, "Solo tickets del usuario autenticado", "cliente perfil owner-only tickets UI");
  assertIncludes(perfil, "fetchSupportTicketsByUserPublicId", "cliente perfil owner-only query usage");

  assertIncludes(entityQueries, "fetchSupportTicketsByUserPublicId", "entityQueries owner-only ticket function");
  assertIncludes(entityQueries, '["user_public_id", "userPublicId"]', "entityQueries support owner column set");

  console.log("Phase 4 cliente parity checks: OK");
}

main();
