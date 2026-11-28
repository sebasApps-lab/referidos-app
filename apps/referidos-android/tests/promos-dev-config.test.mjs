import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import test from "node:test";
import { promosDev, validatePromosDevConfig } from "../tooling/promos-dev-config.mjs";

const publishableFixture = "sb_publishable_synthetic_test_key";
const valid = { ...promosDev, publicKey: publishableFixture };
const fingerprint = (key) => createHash("sha256").update(key).digest("hex");
const validate = (candidate) => validatePromosDevConfig(candidate, fingerprint(publishableFixture));

function jwtFixture(role, ref = promosDev.projectRef) {
  const chunk = (data) => Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${chunk({ alg: "HS256" })}.${chunk({ role, ref })}.synthetic`;
}

test("DEV accepts a verified publishable key and exact pinned endpoints", () => {
  assert.deepEqual(validate(valid), valid);
});

test("DEV accepts a pinned legacy anon key for DEV", () => {
  const publicKey = jwtFixture("anon");
  assert.deepEqual(
    validatePromosDevConfig({ ...valid, publicKey }, fingerprint(publicKey)),
    { ...valid, publicKey },
  );
});

test("DEV rejects STAGING, PROD and OPS even with a verified DEV key", () => {
  for (const [environment, projectRef] of [
    ["staging", "iegjfeaadayfvqockwov"],
    ["prod", "ztcsrfwvjgqnmhnlpeye"],
    ["ops", "ymhaveuksdzlfuecvkmx"],
  ]) {
    const supabaseUrl = `https://${projectRef}.supabase.co`;
    assert.throws(() => validate({ ...valid, environment }), /environment/);
    assert.throws(() => validate({ ...valid, projectRef }), /projectRef/);
    assert.throws(() => validate({ ...valid, supabaseUrl }), /supabaseUrl/);
  }
});

test("DEV rejects alternate URLs and callbacks", () => {
  for (const supabaseUrl of [
    "http://btvrtxdizqsqrzdsgvsj.supabase.co",
    "https://btvrtxdizqsqrzdsgvsj.supabase.co/",
    "https://btvrtxdizqsqrzdsgvsj.supabase.co.example.org",
    "https://btvrtxdizqsqrzdsgvsj.supabase.co@elsewhere.example",
  ]) {
    assert.throws(() => validate({ ...valid, supabaseUrl }), /supabaseUrl/);
  }
  for (const authRedirectUrl of [
    "referidosandroid://auth/callback",
    "referidospromosbeta://auth/callback-extra",
    "referidospromosbeta://auth/callback?other=1",
  ]) {
    assert.throws(() => validate({ ...valid, authRedirectUrl }), /authRedirectUrl/);
  }
});

test("DEV rejects unverified, privileged and wrong-project keys without reporting key material", () => {
  for (const publicKey of [
    "sb_publishable_unverified_fixture",
    "sb_secret_synthetic_fixture",
    jwtFixture("service_role"),
    jwtFixture("anon", "iegjfeaadayfvqockwov"),
  ]) {
    assert.throws(() => validate({ ...valid, publicKey }), (error) =>
      /public key/.test(error.message) && !error.message.includes(publicKey));
  }
  for (const publicKey of [
    "sb_secret_synthetic_fixture",
    jwtFixture("service_role"),
    jwtFixture("anon", "iegjfeaadayfvqockwov"),
  ]) {
    assert.throws(() => validatePromosDevConfig({ ...valid, publicKey }, fingerprint(publicKey)), /public key/);
  }
  assert.throws(() => validatePromosDevConfig(valid), /public key/);
});

test("DEV rejects absent, partial or extra settings", () => {
  assert.throws(() => validate(null), /exactly/);
  assert.throws(() => validate(promosDev), /exactly/);
  assert.throws(() => validate({ ...valid, jwtSecret: "synthetic" }), /exactly/);
});
