import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const shouldPrint = args.has("--print");
const shouldSnapshot = args.has("--snapshot");
const baselinePath = path.resolve(
  process.cwd(),
  "tooling/guardrails/.android-guardrail-baseline",
);

const ALLOWED_PREFIXES = [
  "apps/referidos-android/",
  "packages/mobile-",
  "tooling/guardrails/",
  "docs/android-",
  "package.json",
  "package-lock.json",
];

function readChangedFiles() {
  try {
    const raw = execFileSync("git", ["diff", "--name-only"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (!raw) return [];
    return raw.split("\n").map((line) => line.trim()).filter(Boolean);
  } catch (error) {
    const fallback = String(process.env.ANDROID_GUARDRAIL_FILES || "").trim();
    if (!fallback) {
      console.warn(
        "Guardrail Android: git diff no disponible en este entorno. Usando lista vacia.",
      );
      return [];
    }
    return fallback
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
}

function isAllowed(filePath) {
  return ALLOWED_PREFIXES.some((prefix) =>
    prefix.endsWith("/") ? filePath.startsWith(prefix) : filePath === prefix,
  );
}

const changed = readChangedFiles();
let baseline = [];
if (fs.existsSync(baselinePath)) {
  baseline = fs
    .readFileSync(baselinePath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
if (shouldSnapshot) {
  fs.writeFileSync(baselinePath, `${changed.join("\n")}\n`, "utf8");
  console.log(`Guardrail Android: baseline actualizado (${changed.length} rutas).`);
  process.exit(0);
}

const baselineSet = new Set(baseline);
const scopedChanged = changed.filter((filePath) => !baselineSet.has(filePath));
const outOfScope = scopedChanged.filter((filePath) => !isAllowed(filePath));

if (shouldPrint) {
  if (scopedChanged.length === 0) {
    console.log("No hay cambios en el working tree.");
  } else {
    console.log("Cambios detectados:");
    scopedChanged.forEach((filePath) => console.log(`- ${filePath}`));
  }
}

if (outOfScope.length > 0) {
  console.error("Guardrail Android: hay cambios fuera de alcance.");
  outOfScope.forEach((filePath) => console.error(`- ${filePath}`));
  process.exit(1);
}

console.log("Guardrail Android: OK.");
