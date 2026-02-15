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
  const addressBlock = readText("apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx");
  const scannerBlock = readText("apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx");
  const securityService = readText("apps/referidos-android/src/shared/security/localAccessSecurity.ts");
  const securityStore = readText("apps/referidos-android/src/shared/store/securityStore.ts");
  const appStore = readText("apps/referidos-android/src/shared/store/appStore.ts");
  const clienteProfile = readText("apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx");
  const negocioProfile = readText("apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx");
  const createMobileApi = readText("packages/api-client/src/createMobileApi.js");
  const territoryApi = readText("packages/api-client/src/address/territory.js");

  assertIncludes(addressBlock, "MapView", "phase6 map native integration");
  assertIncludes(addressBlock, "mobileApi.address.getGpsFallback()", "phase6 gps fallback load");
  assertIncludes(addressBlock, "fetchProvincias", "phase6 territory provincias wiring");
  assertIncludes(addressBlock, "fetchCantones", "phase6 territory cantones wiring");
  assertIncludes(addressBlock, "fetchParroquias", "phase6 territory parroquias wiring");
  assertIncludes(addressBlock, "Fallback territorial", "phase6 territory fallback UI");

  assertIncludes(scannerBlock, "scanThrottleDelay", "phase6 scanner throttle");
  assertIncludes(scannerBlock, "torchMode", "phase6 scanner torch mode");
  assertIncludes(scannerBlock, "onError={handleCameraError}", "phase6 scanner error fallback");
  assertIncludes(scannerBlock, "setPaused", "phase6 scanner pause resume");
  assertIncludes(scannerBlock, "Linterna", "phase6 scanner low-light control");

  assertIncludes(securityService, "configurePinAccess", "phase6 pin setup service");
  assertIncludes(securityService, "verifyPinAndUnlock", "phase6 pin unlock service");
  assertIncludes(securityService, "enrollBiometricAccess", "phase6 biometric enroll service");
  assertIncludes(securityService, "unlockWithBiometricAccess", "phase6 biometric unlock service");
  assertIncludes(securityService, "sendSensitiveReauthEmail", "phase6 sensitive reauth service");
  assertIncludes(securityService, "requireSecurityForAction", "phase6 action guard service");

  assertIncludes(securityStore, "UNLOCK_LOCAL_TTL_MS", "phase6 local unlock ttl");
  assertIncludes(securityStore, "REAUTH_SENSITIVE_TTL_MS", "phase6 sensitive unlock ttl");
  assertIncludes(securityStore, "requireAction", "phase6 action-level guard in store");
  assertIncludes(securityStore, "pendingMethod", "phase6 pending verification method state");

  assertIncludes(appStore, "accessMethods", "phase6 access methods in app store");
  assertIncludes(appStore, "setAccessMethods", "phase6 access methods updater");
  assertIncludes(appStore, "useSecurityStore.getState().reset()", "phase6 security reset lifecycle");

  assertIncludes(clienteProfile, "AccessSecurityPanel", "phase6 cliente security panel integration");
  assertIncludes(negocioProfile, "AccessSecurityPanel", "phase6 negocio security panel integration");

  assertIncludes(createMobileApi, "fetchProvincias", "phase6 api expose provincias");
  assertIncludes(createMobileApi, "fetchCantones", "phase6 api expose cantones");
  assertIncludes(createMobileApi, "fetchParroquias", "phase6 api expose parroquias");
  assertIncludes(territoryApi, "fetchProvincias", "phase6 territory api file");
  assertIncludes(territoryApi, "fetchCantonesByProvincia", "phase6 territory cantones implementation");
  assertIncludes(territoryApi, "fetchParroquiasByCanton", "phase6 territory parroquias implementation");

  console.log("Phase 6 native parity checks: OK");
}

main();
