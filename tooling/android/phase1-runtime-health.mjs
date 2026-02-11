#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const repoRoot = path.resolve(process.cwd());
const appRoot = path.resolve(repoRoot, "apps/referidos-android");
const appRequire = createRequire(path.join(appRoot, "package.json"));

const rootNodeModules = path.resolve(repoRoot, "node_modules");
const appNodeModules = path.resolve(appRoot, "node_modules");
const rnPackageJsonPath = path.resolve(appRoot, "package.json");

const checks = [
  { name: "react" },
  { name: "react-native" },
  { name: "react-native-safe-area-context" },
  { name: "react-native-gesture-handler" },
  { name: "react-native-screens" },
  { name: "@react-navigation/native" },
  { name: "@react-navigation/native-stack" },
  { name: "@react-navigation/bottom-tabs" },
  { name: "@react-navigation/elements" },
  { name: "@react-navigation/core" },
  { name: "@react-navigation/routers" },
];

function asPosix(value) {
  return value.replace(/\\/g, "/");
}

function resolvePkg(name) {
  let pkgJsonPath = null;
  try {
    pkgJsonPath = appRequire.resolve(`${name}/package.json`);
  } catch {
    const entry = appRequire.resolve(name);
    let dir = path.dirname(entry);
    while (dir && dir !== path.dirname(dir)) {
      const candidate = path.join(dir, "package.json");
      if (fs.existsSync(candidate)) {
        try {
          const parsed = JSON.parse(fs.readFileSync(candidate, "utf8"));
          if (parsed?.name === name) {
            pkgJsonPath = candidate;
            break;
          }
        } catch {
          // continue climbing
        }
      }
      dir = path.dirname(dir);
    }
  }
  if (!pkgJsonPath) {
    throw new Error("package.json not resolvable");
  }
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  return {
    name,
    version: pkg.version,
    resolvedPath: asPosix(path.dirname(pkgJsonPath)),
  };
}

function preferredPathFor(name) {
  const appPath = path.resolve(appNodeModules, name);
  const rootPath = path.resolve(rootNodeModules, name);
  const selected = fs.existsSync(appPath) ? appPath : rootPath;
  return asPosix(selected);
}

function packageVersionAt(baseNodeModules, name) {
  const pkgPath = path.resolve(baseNodeModules, name, "package.json");
  if (!fs.existsSync(pkgPath)) return null;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    return pkg?.version || null;
  } catch {
    return null;
  }
}

function collectNativeDepsFromRnPackage() {
  if (!fs.existsSync(rnPackageJsonPath)) return [];
  const pkg = JSON.parse(fs.readFileSync(rnPackageJsonPath, "utf8"));
  const deps = Object.keys(pkg?.dependencies || {});
  return deps
    .filter((dep) => dep.startsWith("react-native-") || dep.startsWith("@react-native/"))
    .filter((dep) => dep !== "react-native")
    .sort();
}

function checkAutolinking() {
  const autolinkPath = path.resolve(
    appRoot,
    "android/build/generated/autolinking/autolinking.json",
  );
  if (!fs.existsSync(autolinkPath)) {
    return {
      ok: false,
      message:
        "autolinking.json no encontrado. Ejecuta: cd apps/referidos-android/android && gradlew.bat tasks",
    };
  }

  const data = JSON.parse(fs.readFileSync(autolinkPath, "utf8"));
  const deps = data?.dependencies || {};
  const nativeDeps = collectNativeDepsFromRnPackage();
  const expected = nativeDeps.map((dep) => ({
    key: dep,
    contains: preferredPathFor(dep),
  }));

  const errors = [];
  for (const item of expected) {
    const root = asPosix(deps?.[item.key]?.root || "");
    if (!root) {
      errors.push(`autolinking no contiene dependencia: ${item.key}`);
      continue;
    }
    if (!root.includes(item.contains)) {
      errors.push(
        `autolinking mismatch ${item.key}: esperado contiene "${item.contains}", actual "${root}"`,
      );
    }
  }

  return {
    ok: errors.length === 0,
    message: errors.join("\n"),
  };
}

const errors = [];
const rows = [];
const warnings = [];

for (const check of checks) {
  try {
    const resolved = resolvePkg(check.name);
    rows.push(resolved);
    const expectedPath = preferredPathFor(check.name);
    if (resolved.resolvedPath !== expectedPath) {
      errors.push(
        `${check.name}: resuelto en "${resolved.resolvedPath}" pero se esperaba "${expectedPath}"`,
      );
    }
  } catch (error) {
    errors.push(`${check.name}: no se pudo resolver (${String(error?.message || error)})`);
  }
}

const autolink = checkAutolinking();
if (!autolink.ok) {
  errors.push(autolink.message);
}

const criticalVersionChecks = [
  "react",
  "react-native",
  "@types/react",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-gesture-handler",
  "@react-navigation/native",
  "@react-navigation/elements",
  "@react-navigation/core",
  "@react-navigation/routers",
];

for (const dep of criticalVersionChecks) {
  const appVersion = packageVersionAt(appNodeModules, dep);
  const rootVersion = packageVersionAt(rootNodeModules, dep);
  if (appVersion && rootVersion && appVersion !== rootVersion) {
    errors.push(
      `${dep}: version mismatch app(${appVersion}) vs root(${rootVersion})`,
    );
  } else if (appVersion && rootVersion && dep !== "react" && dep !== "react-native") {
    warnings.push(`${dep}: duplicated location app+root (${appVersion})`);
  }
}

console.log("=== RN Phase 1 Runtime Health ===");
for (const row of rows) {
  console.log(`- ${row.name}@${row.version} -> ${row.resolvedPath}`);
}
if (warnings.length) {
  console.log("\n[WARN] Duplicados no bloqueantes detectados:");
  for (const warning of warnings) {
    console.log(`  - ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("\n[FAIL] Se detectaron inconsistencias:");
  for (const err of errors) {
    console.error(`  * ${err}`);
  }
  process.exit(1);
}

console.log("\n[OK] Resolucion y autolinking coherentes para paquetes criticos.");
