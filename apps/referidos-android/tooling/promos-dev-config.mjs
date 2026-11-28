import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

export const promosBackendAsset = "promos-backend.json";

export const promosDev = Object.freeze({
  environment: "dev",
  projectRef: "btvrtxdizqsqrzdsgvsj",
  supabaseUrl: "https://btvrtxdizqsqrzdsgvsj.supabase.co",
  authRedirectUrl: "referidospromosbeta://auth/callback",
});

// SHA-256 of the public anon key verified against DEV Auth. Never load pins from local inputs.
const devPublicKeyFingerprint = "4e85fbfd998164c76b6ba24882b2dfa6404467f2f513cec93a4a2a6aa7607e70";
const fields = [...Object.keys(promosDev), "publicKey"];

function isPublicKeyForDev(key) {
  if (typeof key !== "string") return false;
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) return true;
  if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(key)) return false;

  try {
    const claims = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString("utf8"));
    return claims.role === "anon" && claims.ref === promosDev.projectRef;
  } catch {
    return false;
  }
}

export function validatePromosDevConfig(input, publicKeyFingerprint = devPublicKeyFingerprint) {
  if (!input || typeof input !== "object" || Array.isArray(input) ||
    Object.keys(input).length !== fields.length || !fields.every((field) => Object.hasOwn(input, field))) {
    throw new Error("Expected exactly environment, projectRef, supabaseUrl, authRedirectUrl and publicKey.");
  }

  for (const [field, expected] of Object.entries(promosDev)) {
    if (input[field] !== expected) {
      throw new Error(`Invalid ${field} for the Promos DEV build.`);
    }
  }

  const { publicKey } = input;
  if (!isPublicKeyForDev(publicKey) || createHash("sha256").update(publicKey).digest("hex") !== publicKeyFingerprint) {
    throw new Error("Expected a verified public key for the Promos DEV project.");
  }
  return { ...promosDev, publicKey };
}

function readConfig(source) {
  try {
    return JSON.parse(readFileSync(source, "utf8").replace(/^\uFEFF/, ""));
  } catch {
    throw new Error("Cannot read Promos DEV configuration as JSON.");
  }
}

function main([mode, inputFile, outputDir]) {
  const checking = mode === "check-stdin" && !inputFile;
  const generating = mode === "generate" && inputFile && outputDir;
  if (!checking && !generating) {
    throw new Error("Usage: promos-dev-config.mjs generate <config-file> <assets-dir> | check-stdin");
  }

  const config = validatePromosDevConfig(readConfig(checking ? 0 : inputFile));
  if (generating) {
    mkdirSync(outputDir, { recursive: true });
    writeFileSync(join(outputDir, promosBackendAsset), `${JSON.stringify(config)}\n`, "utf8");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Promos DEV configuration rejected. ${error.message}`);
    process.exitCode = 1;
  }
}
