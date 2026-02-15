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
    throw new Error(`[FAIL] ${label}: "${needle}" must not be present`);
  }
}

function main() {
  const clientePerfil = readText("apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx");
  const negocioPerfil = readText("apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx");
  const soporteInbox = readText("apps/referidos-android/src/features/support/SoporteInboxScreen.tsx");
  const soporteTicket = readText("apps/referidos-android/src/features/support/SoporteTicketScreen.tsx");
  const soporteIrregular = readText("apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx");
  const soportePerfil = readText("apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx");
  const adminSoporte = readText("apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx");
  const adminInicio = readText("apps/referidos-android/src/features/admin/AdminInicioScreen.tsx");
  const adminUsuarios = readText("apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx");
  const roleTabs = readText("apps/referidos-android/src/navigation/RoleTabs.tsx");
  const playbook = readText("docs/android-phase-playbook.md");

  assertIncludes(clientePerfil, "mobileApi.support.createThread", "phase8 user support create thread (cliente)");
  assertIncludes(clientePerfil, "title=\"Mis tickets\"", "phase8 user support tickets list (cliente)");

  assertIncludes(negocioPerfil, "mobileApi.support.createThread", "phase8 user support create thread (negocio)");
  assertIncludes(negocioPerfil, "title=\"Mis tickets\"", "phase8 user support tickets list (negocio)");

  assertIncludes(soporteInbox, "fetchSupportInboxRows", "phase8 soporte inbox data source");
  assertIncludes(soporteInbox, "mobileApi.support.startSession", "phase8 soporte session start");
  assertIncludes(soporteInbox, "mobileApi.support.endSession", "phase8 soporte session end");
  assertIncludes(soporteInbox, "mobileApi.support.assignThread", "phase8 soporte take ticket");

  assertIncludes(soporteTicket, "mobileApi.support.updateStatus", "phase8 soporte ticket status transitions");
  assertIncludes(soporteTicket, "mobileApi.support.addNote", "phase8 soporte ticket notes");
  assertIncludes(soporteTicket, "mobileApi.support.closeThread", "phase8 soporte ticket close");

  assertIncludes(soporteIrregular, "mobileApi.support.createIrregular", "phase8 soporte irregular flow");

  assertIncludes(soportePerfil, "mobileApi.support.startSession", "phase8 soporte perfil request/start session");
  assertIncludes(soportePerfil, "mobileApi.support.endSession", "phase8 soporte perfil end session");
  assertIncludes(soportePerfil, "mobileApi.support.pingSession", "phase8 soporte perfil ping");

  assertIncludes(adminSoporte, "mobileApi.support.startAdminSession", "phase8 admin support start agent session");
  assertIncludes(adminSoporte, "mobileApi.support.endAdminSession", "phase8 admin support end agent session");
  assertIncludes(adminSoporte, "mobileApi.support.assignThread", "phase8 admin support assign/reassign");
  assertIncludes(adminSoporte, "support_agent_profiles", "phase8 admin support authorization controls");

  assertIncludes(adminInicio, "fetchSupportStatusSummary", "phase8 admin inicio support summary");
  assertIncludes(adminInicio, "RN_DEFERRED_MODULES", "phase8 admin scope decision surfacing");
  assertNotIncludes(adminInicio, "FeaturePlaceholder", "phase8 admin inicio placeholder removed");

  assertIncludes(adminUsuarios, "mobileApi.support.createAdminUser", "phase8 admin usuarios create support account");
  assertIncludes(adminUsuarios, "support_agent_profiles", "phase8 admin usuarios support authorization");
  assertNotIncludes(adminUsuarios, "FeaturePlaceholder", "phase8 admin usuarios placeholder removed");

  assertIncludes(roleTabs, "AdminInicioScreen", "phase8 admin tabs inicio");
  assertIncludes(roleTabs, "AdminUsuariosScreen", "phase8 admin tabs usuarios");
  assertIncludes(roleTabs, "AdminSoporteScreen", "phase8 admin tabs soporte");
  assertIncludes(roleTabs, "AdminObservabilidadScreen", "phase8 admin tabs observabilidad");

  assertIncludes(playbook, "## Phase 8 - Closed", "phase8 playbook closure section");
  assertIncludes(playbook, "Diferido (PWA-only", "phase8 playbook scope decision");

  console.log("Phase 8 support/admin checks: OK");
}

main();
