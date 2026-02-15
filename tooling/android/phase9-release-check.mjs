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

function assertFileExists(relativePath, label) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`[FAIL] ${label}: file not found (${relativePath})`);
  }
  return absolutePath;
}

function assertFileSize(relativePath, minBytes, label) {
  const absolutePath = assertFileExists(relativePath, label);
  const size = fs.statSync(absolutePath).size;
  if (size < minBytes) {
    throw new Error(`[FAIL] ${label}: size ${size} bytes is smaller than expected ${minBytes}`);
  }
}

function main() {
  const packageJson = readText("package.json");
  const buildGradle = readText("apps/referidos-android/android/app/build.gradle");
  const gitignore = readText(".gitignore");
  const envExample = readText("apps/referidos-android/env.example.json");
  const envDev = readText("apps/referidos-android/env.development.example.json");
  const envStaging = readText("apps/referidos-android/env.staging.example.json");
  const envProd = readText("apps/referidos-android/env.production.example.json");
  const runbook = readText("docs/android-console-runbook.md");

  assertIncludes(packageJson, "android:assemble:debug", "phase9 debug assemble script");
  assertIncludes(packageJson, "android:assemble:release", "phase9 release assemble script");
  assertIncludes(packageJson, "android:phase9:parity-check", "phase9 parity script");
  assertIncludes(packageJson, "android:phase9:release-check", "phase9 release script");

  assertIncludes(buildGradle, "android.enableProguardInReleaseBuilds", "phase9 release minify toggle");
  assertIncludes(buildGradle, "hasReleaseSigning", "phase9 release signing condition");
  assertIncludes(buildGradle, "signingConfig hasReleaseSigning ? signingConfigs.release : signingConfigs.debug", "phase9 release signing config path");
  assertIncludes(buildGradle, "minifyEnabled enableProguardInReleaseBuilds", "phase9 release proguard enabled path");

  assertIncludes(gitignore, "apps/referidos-android/env.json", "phase9 local env ignored");
  assertIncludes(gitignore, "/.android-local/", "phase9 local keystore cache ignored");

  assertIncludes(envExample, "SUPABASE_URL", "phase9 env example supabase url");
  assertIncludes(envExample, "SUPABASE_ANON_KEY", "phase9 env example supabase anon key");
  assertIncludes(envExample, "AUTH_REDIRECT_URL", "phase9 env example redirect");
  assertIncludes(envDev, "SUPABASE_URL", "phase9 env development template");
  assertIncludes(envStaging, "SUPABASE_URL", "phase9 env staging template");
  assertIncludes(envProd, "SUPABASE_URL", "phase9 env production template");

  assertIncludes(runbook, "android:assemble:release", "phase9 runbook release command");

  assertFileSize("apps/referidos-android/android/app/build/outputs/apk/debug/app-debug.apk", 1_000_000, "phase9 debug apk output");
  assertFileSize("apps/referidos-android/android/app/build/outputs/apk/release/app-release.apk", 1_000_000, "phase9 release apk output");
  assertFileExists("apps/referidos-android/android/app/build/outputs/mapping/release/mapping.txt", "phase9 release proguard mapping");
  assertFileExists("apps/referidos-android/android/app/build/intermediates/signing_config_versions/release/writeReleaseSigningConfigVersions/signing-config-versions.json", "phase9 release signing metadata");

  console.log("Phase 9 release readiness checks: OK");
}

main();
