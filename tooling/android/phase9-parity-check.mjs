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

function assertNotIncludes(content, needle, label) {
  if (content.includes(needle)) {
    throw new Error(`[FAIL] ${label}: "${needle}" should not exist`);
  }
}

function main() {
  const matrix = readText("docs/android-parity-certification-matrix.md");
  const playbook = readText("docs/android-phase-playbook.md");
  const app = readText("apps/referidos-android/src/app/App.tsx");
  const adminInicio = readText("apps/referidos-android/src/features/admin/AdminInicioScreen.tsx");
  const adminUsuarios = readText("apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx");
  const adminSoporte = readText("apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx");
  const soporteInbox = readText("apps/referidos-android/src/features/support/SoporteInboxScreen.tsx");

  assertIncludes(matrix, "Android RN Final Parity Certification Matrix", "phase9 matrix header");
  assertIncludes(matrix, "Certification Status: APPROVED", "phase9 matrix sign-off");
  assertIncludes(matrix, "Auth / Onboarding", "phase9 matrix auth section");
  assertIncludes(matrix, "Cliente", "phase9 matrix cliente section");
  assertIncludes(matrix, "Negocio", "phase9 matrix negocio section");
  assertIncludes(matrix, "Soporte", "phase9 matrix soporte section");
  assertIncludes(matrix, "Admin", "phase9 matrix admin section");
  assertIncludes(matrix, "Release Readiness Evidence", "phase9 matrix release evidence section");

  assertIncludes(playbook, "## Phase 9 - Closed", "phase9 playbook closure header");
  assertIncludes(playbook, "Phase 9 closure evidence", "phase9 playbook closure evidence");
  assertIncludes(playbook, "android:phase9:parity-check", "phase9 playbook parity command");
  assertIncludes(playbook, "android:phase9:release-check", "phase9 playbook release command");

  assertIncludes(app, "app_boot_ready", "phase9 startup performance event");
  assertIncludes(app, "app_first_route_ready", "phase9 first route performance event");

  assertIncludes(adminInicio, "Negocios (admin)", "phase9 admin negocios parity");
  assertIncludes(adminInicio, "Promos (admin)", "phase9 admin promos parity");
  assertIncludes(adminInicio, "QRs (admin)", "phase9 admin qrs parity");
  assertIncludes(adminInicio, "Reportes (admin)", "phase9 admin reportes parity");
  assertIncludes(adminInicio, "Sistema/Logs (admin)", "phase9 admin logs parity");
  assertNotIncludes(adminInicio, "FeaturePlaceholder", "phase9 admin inicio placeholder removed");

  assertIncludes(adminUsuarios, "mobileApi.support.createAdminUser", "phase9 admin users create account");
  assertNotIncludes(adminUsuarios, "FeaturePlaceholder", "phase9 admin users placeholder removed");

  assertIncludes(adminSoporte, "mobileApi.support.assignThread", "phase9 admin soporte assignment");
  assertIncludes(soporteInbox, "ObservabilityEventFeed", "phase9 support observability visibility");

  console.log("Phase 9 parity certification checks: OK");
}

main();
