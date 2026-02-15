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
  const sdkClient = readText("packages/observability-sdk/src/createMobileObservabilityClient.js");
  const appFile = readText("apps/referidos-android/src/app/App.tsx");
  const entityQueries = readText("apps/referidos-android/src/shared/services/entityQueries.ts");
  const adminObsScreen = readText("apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx");
  const soporteInboxScreen = readText("apps/referidos-android/src/features/support/SoporteInboxScreen.tsx");

  assertIncludes(sdkClient, "function scrubUnknown", "phase7 pii scrub parity");
  assertIncludes(sdkClient, "shouldDedupe", "phase7 dedupe fingerprint parity");
  assertIncludes(sdkClient, "normalizeSampling", "phase7 sampling parity");
  assertIncludes(sdkClient, "perLevelPerMinute", "phase7 rate limit parity");
  assertIncludes(sdkClient, "request_id", "phase7 request correlation id");
  assertIncludes(sdkClient, "session_id", "phase7 session correlation id");
  assertIncludes(sdkClient, "setContext(", "phase7 runtime context setter");
  assertIncludes(sdkClient, "setContextProvider", "phase7 runtime context provider");

  assertIncludes(appFile, "useNavigationContainerRef", "phase7 navigation context wiring");
  assertIncludes(appFile, "installGlobalErrorTracking", "phase7 global error instrumentation");
  assertIncludes(appFile, "onStateChange={syncRouteContext}", "phase7 route/screen context updates");
  assertIncludes(appFile, "device_summary", "phase7 device summary context");
  assertIncludes(appFile, "network", "phase7 network summary context");

  assertIncludes(entityQueries, "fetchObservabilityEvents", "phase7 obs events query service");
  assertIncludes(entityQueries, ".from(\"obs_events\")", "phase7 obs_events source query");

  assertIncludes(adminObsScreen, "ObservabilityEventFeed", "phase7 admin log readability surface");
  assertIncludes(soporteInboxScreen, "ObservabilityEventFeed", "phase7 support log readability surface");

  console.log("Phase 7 observability checks: OK");
}

main();
