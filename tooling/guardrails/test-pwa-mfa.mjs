import assert from "node:assert/strict";
import { beforeEach, mock, test } from "node:test";

const authUserId = "test-user";
const factor = (id, status, friendly_name = "App autenticadora", factor_type = "totp") => ({
  id, status, friendly_name, factor_type,
});

let session;
let assurance;
let factors;
let patches;
let enrolledAt;
let foundProfile;
const auth = {
  getSession: mock.fn(async () => ({ data: { session } })),
  refreshSession: mock.fn(async () => ({ data: { session } })),
  mfa: {
    getAuthenticatorAssuranceLevel: mock.fn(async () => ({ data: assurance })),
    listFactors: mock.fn(async () => ({
      data: { all: factors, totp: factors.filter((item) => item.factor_type === "totp" && item.status === "verified") },
    })),
    enroll: mock.fn(async () => ({
      data: { id: "new-factor", totp: { uri: "otpauth://totp/Test?secret=TESTTEST", secret: "TESTTEST" } },
    })),
    unenroll: mock.fn(async ({ factorId }) => {
      factors = factors.filter((item) => item.id !== factorId);
      return { data: { id: factorId } };
    }),
    challengeAndVerify: mock.fn(async () => ({ data: {} })),
  },
};

const supabase = {
  auth,
  from: () => ({
    select: () => ({
      eq: () => ({ maybeSingle: async () => ({ data: foundProfile ? { mfa_enrolled_at: enrolledAt } : null }) }),
    }),
    update: (payload) => ({
      eq: (_field, id) => {
        patches.push({ id, payload });
        return { select: () => ({ maybeSingle: async () => ({ data: foundProfile ? { id_auth: id } : null }) }) };
      },
    }),
  }),
};

mock.module(new URL("../../apps/referidos-app/src/lib/supabaseClient.js", import.meta.url), {
  namedExports: { supabase },
});

const {
  challengeAndVerifyTotp,
  listMfaFactors,
  pickActiveTotpFactor,
  prepareTotpEnrollment,
  removeVerifiedTotp,
  resolveMfaAccess,
  sanitizeTotpCode,
  syncTotpFlags,
  verifyMfaSession,
} = await import("../../apps/referidos-app/src/services/mfaService.js");

beforeEach(() => {
  session = { user: { id: authUserId } };
  assurance = { currentLevel: "aal1", nextLevel: "aal1" };
  factors = [];
  patches = [];
  foundProfile = true;
  enrolledAt = null;
  for (const stub of [...Object.values(auth.mfa), auth.getSession, auth.refreshSession]) {
    stub.mock.resetCalls();
  }
});

test("AAL1 access depends on live verified factors and lookup failures keep it blocked", async () => {
  factors = [factor("pending", "unverified")];
  assert.deepEqual(await resolveMfaAccess(authUserId), { ok: true, data: { authUserId, required: false } });

  factors.push(factor("verified", "verified"));
  // The session's nextLevel remains stale at AAL1 after another session enables MFA.
  assert.deepEqual(await resolveMfaAccess(authUserId), { ok: true, data: { authUserId, required: true } });

  auth.mfa.listFactors.mock.mockImplementationOnce(async () => { throw new Error("offline"); });
  assert.equal((await resolveMfaAccess(authUserId)).ok, false);
  assert.equal((await resolveMfaAccess("stale-user")).ok, false);

  assurance = { currentLevel: null, nextLevel: null };
  assert.equal((await resolveMfaAccess(authUserId)).data.required, true);
  factors = [];
  assert.equal((await resolveMfaAccess(authUserId)).data.required, false);

  assurance = { currentLevel: "unknown", nextLevel: null };
  assert.equal((await resolveMfaAccess(authUserId)).ok, false);

  assurance = { currentLevel: "aal2", nextLevel: "aal2" };
  assert.equal((await resolveMfaAccess(authUserId)).data.required, false);
});

test("only verified TOTP factors can drive the profile toggle or login challenge", async () => {
  factors = [
    factor("pending-totp", "unverified"),
    factor("verified-phone", "verified", "Phone", "phone"),
  ];
  let list = await listMfaFactors(authUserId);
  assert.deepEqual(list.data.totp.map((item) => item.id), ["pending-totp"]);
  assert.equal(pickActiveTotpFactor(list.data.totp), null);

  factors.push(factor("verified-totp", "verified"));
  list = await listMfaFactors(authUserId);
  assert.equal(pickActiveTotpFactor(list.data.totp).id, "verified-totp");
});

test("enrollment replaces only this app's abandoned pending factor", async () => {
  factors = [factor("old", "unverified"), factor("unrelated", "unverified", "Other app")];
  const result = await prepareTotpEnrollment();
  assert.equal(result.ok, true);
  assert.equal(result.data.mode, "enroll");
  assert.equal(result.data.factorId, "new-factor");
  assert.deepEqual(auth.mfa.unenroll.mock.calls[0].arguments, [{ factorId: "old" }]);
  assert.equal(auth.mfa.unenroll.mock.callCount(), 1);
  assert.deepEqual(factors.map((item) => item.id), ["unrelated"]);
});

test("enrollment reuses a verified factor and stops on an unsuccessful lookup", async () => {
  factors = [factor("pending", "unverified"), factor("current", "verified")];
  assert.deepEqual((await prepareTotpEnrollment()).data, { authUserId, mode: "existing", factorId: "current" });
  auth.mfa.listFactors.mock.mockImplementationOnce(async () => ({ error: { message: "offline" } }));
  assert.equal((await prepareTotpEnrollment()).ok, false);
  assert.equal(auth.mfa.enroll.mock.callCount(), 0);
  assert.equal(auth.mfa.unenroll.mock.callCount(), 0);
});

test("confirmation rejects invalid codes and access still requires a verified session", async () => {
  const factorId = "verified-totp";
  assert.equal(sanitizeTotpCode("9 87654-3"), "987654");
  assert.equal((await challengeAndVerifyTotp({ factorId, code: "0123456", authUserId })).ok, false);
  assert.equal(auth.mfa.challengeAndVerify.mock.callCount(), 0);
  assert.equal((await challengeAndVerifyTotp({ factorId, code: "012345", authUserId })).ok, true);
  assert.equal((await verifyMfaSession(authUserId)).ok, false);
  assurance = { currentLevel: "aal2", nextLevel: "aal2" };
  assert.equal((await verifyMfaSession(authUserId)).ok, true);
});

test("disable requires AAL2 and derives profile flags from remaining factors", async () => {
  factors = [factor("first", "verified"), factor("other", "verified"), factor("pending", "unverified")];
  assert.equal((await removeVerifiedTotp({ factorId: "first", authUserId })).ok, false);
  assert.equal(auth.mfa.unenroll.mock.callCount(), 0);

  assurance = { currentLevel: "aal2", nextLevel: "aal2" };
  assert.equal((await removeVerifiedTotp({ factorId: "pending", authUserId })).ok, false);
  assert.equal((await removeVerifiedTotp({ factorId: "first", authUserId })).ok, true);
  enrolledAt = "2025-01-01T00:00:00Z";
  assert.equal((await syncTotpFlags({ authUserId })).data.enabled, true);
  assert.equal(patches[0].payload.mfa_enrolled_at, enrolledAt);

  await removeVerifiedTotp({ factorId: "other", authUserId });
  assert.equal((await syncTotpFlags({ authUserId, expectedFactorId: "other" })).ok, false);
  assert.equal((await syncTotpFlags({ authUserId })).data.enabled, false);
  assert.equal(patches[1].payload.mfa_enrolled_at, null);
  foundProfile = false;
  assert.equal((await syncTotpFlags({ authUserId })).ok, false);
});
