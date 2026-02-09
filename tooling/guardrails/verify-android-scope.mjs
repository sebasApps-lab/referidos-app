import { execSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const shouldPrint = args.has("--print");

const ALLOWED_PREFIXES = [
  "apps/referidos-android/",
  "packages/mobile-",
  "tooling/guardrails/",
  "docs/android-",
  "package.json",
  "package-lock.json",
];

function readChangedFiles() {
  const raw = execSync("git diff --name-only", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
  if (!raw) return [];
  return raw.split("\n").map((line) => line.trim()).filter(Boolean);
}

function isAllowed(filePath) {
  return ALLOWED_PREFIXES.some((prefix) =>
    prefix.endsWith("/") ? filePath.startsWith(prefix) : filePath === prefix,
  );
}

const changed = readChangedFiles();
const outOfScope = changed.filter((filePath) => !isAllowed(filePath));

if (shouldPrint) {
  if (changed.length === 0) {
    console.log("No hay cambios en el working tree.");
  } else {
    console.log("Cambios detectados:");
    changed.forEach((filePath) => console.log(`- ${filePath}`));
  }
}

if (outOfScope.length > 0) {
  console.error("Guardrail Android: hay cambios fuera de alcance.");
  outOfScope.forEach((filePath) => console.error(`- ${filePath}`));
  process.exit(1);
}

console.log("Guardrail Android: OK.");
