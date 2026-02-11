import {
  AUTH_STEPS,
  getUserProfileStatus,
  isPhoneValidForCountry,
  parsePhoneWithCountry,
  resolveRegistrationStep,
  resolveVerificationStep,
  toStoragePhone,
  validateRucFromCedula,
} from "../../packages/domain/src/index.js";

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected "${expected}" but got "${actual}"`);
  }
}

function assertTrue(value, label) {
  if (!value) throw new Error(`${label}: expected true but got false`);
}

function assertFalse(value, label) {
  if (value) throw new Error(`${label}: expected false but got true`);
}

function runRegistrationMatrix() {
  const base = { ok: true };

  assertEqual(
    resolveRegistrationStep({ onboarding: base, role: null }),
    AUTH_STEPS.ROLE_SELECT,
    "reg:no-role",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "cliente" },
        client_steps: {
          profile: { completed: false, skipped: false },
          address: { completed: false, skipped: false },
        },
      },
      role: "cliente",
    }),
    AUTH_STEPS.USER_PROFILE,
    "reg:cliente-profile-pending",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "cliente" },
        client_steps: {
          profile: { completed: true, skipped: false },
          address: { completed: false, skipped: false },
        },
      },
      role: "cliente",
    }),
    AUTH_STEPS.USER_ADDRESS,
    "reg:cliente-address-pending",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "negocio" },
        reasons: ["missing_owner_fields:nombre,apellido"],
      },
      role: "negocio",
    }),
    AUTH_STEPS.USER_PROFILE,
    "reg:negocio-owner-missing",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "negocio" },
        reasons: ["missing_business_row"],
      },
      role: "negocio",
    }),
    AUTH_STEPS.BUSINESS_DATA,
    "reg:negocio-business-missing",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "negocio" },
        reasons: ["missing_address_row"],
      },
      role: "negocio",
    }),
    AUTH_STEPS.USER_ADDRESS,
    "reg:negocio-address-missing",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "soporte" },
        reasons: ["missing_support_fields:nombre,apellido,fecha_nacimiento"],
      },
      role: "soporte",
    }),
    AUTH_STEPS.USER_PROFILE,
    "reg:soporte-missing-fields",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "soporte" },
        reasons: [],
      },
      role: "soporte",
    }),
    AUTH_STEPS.PENDING,
    "reg:soporte-complete",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "admin" },
        reasons: [],
      },
      role: "admin",
    }),
    AUTH_STEPS.PENDING,
    "reg:admin-complete",
  );

  assertEqual(
    resolveRegistrationStep({
      onboarding: {
        ...base,
        usuario: { role: "cliente" },
        client_steps: {
          profile: { completed: true, skipped: false },
          address: { completed: true, skipped: false },
        },
      },
      role: "cliente",
    }),
    AUTH_STEPS.ACCOUNT_VERIFY_PROMPT,
    "reg:cliente-existing-partial-ready-for-verify",
  );
}

function runVerificationMatrix() {
  assertEqual(
    resolveVerificationStep({
      onboarding: { allowAccess: true, verification_status: "unverified" },
      role: "cliente",
    }),
    AUTH_STEPS.ACCOUNT_VERIFY_PROMPT,
    "verify:cliente-unverified",
  );

  assertEqual(
    resolveVerificationStep({
      onboarding: { allowAccess: true, verification_status: "in_progress" },
      role: "negocio",
    }),
    AUTH_STEPS.BUSINESS_VERIFY,
    "verify:negocio-in-progress",
  );

  assertEqual(
    resolveVerificationStep({
      onboarding: {
        allowAccess: true,
        verification_status: "in_progress",
        email_confirmed: false,
      },
      role: "cliente",
    }),
    AUTH_STEPS.VERIFY_EMAIL,
    "verify:cliente-email-pending",
  );

  assertEqual(
    resolveVerificationStep({
      onboarding: {
        allowAccess: true,
        verification_status: "in_progress",
        email_confirmed: true,
      },
      role: "cliente",
    }),
    AUTH_STEPS.ACCOUNT_VERIFY_METHOD,
    "verify:cliente-method",
  );

  assertEqual(
    resolveVerificationStep({
      onboarding: { allowAccess: true, verification_status: "verified" },
      role: "cliente",
    }),
    AUTH_STEPS.ACCOUNT_VERIFY_READY,
    "verify:cliente-verified",
  );

  assertEqual(
    resolveVerificationStep({
      onboarding: { allowAccess: true, verification_status: "unverified" },
      role: "soporte",
    }),
    AUTH_STEPS.PENDING,
    "verify:soporte-bypass",
  );

  assertEqual(
    resolveVerificationStep({
      onboarding: { allowAccess: true, verification_status: "unverified" },
      role: "admin",
    }),
    AUTH_STEPS.PENDING,
    "verify:admin-bypass",
  );

  assertEqual(
    resolveVerificationStep({
      onboarding: {
        allowAccess: true,
        verification_status: "verified",
        email_confirmed: true,
      },
      role: "negocio",
    }),
    AUTH_STEPS.ACCOUNT_VERIFY_READY,
    "verify:existing-verified-direct-access",
  );
}

function runValidationMatrix() {
  const ec = parsePhoneWithCountry("0961234567");
  assertEqual(ec.code, "+593", "phone:ec-code");
  assertEqual(ec.digits, "961234567", "phone:ec-digits");
  assertTrue(isPhoneValidForCountry(ec.code, ec.digits), "phone:ec-valid");
  assertEqual(toStoragePhone(ec.code, ec.digits), "+593961234567", "phone:ec-storage");

  const intl = parsePhoneWithCountry("+573001112233");
  assertEqual(intl.code, "+57", "phone:intl-code");
  assertTrue(isPhoneValidForCountry(intl.code, intl.digits), "phone:intl-valid");

  const profileOk = getUserProfileStatus({
    nombre: "Juan",
    apellido: "Perez",
    genero: "masculino",
    fechaNacimiento: "01/01/1990",
    minAge: 18,
  });
  assertTrue(profileOk.canSubmit, "profile:valid");

  const profileUnderage = getUserProfileStatus({
    nombre: "Ana",
    apellido: "Diaz",
    genero: "femenino",
    fechaNacimiento: "01/01/2020",
    minAge: 18,
  });
  assertFalse(profileUnderage.canSubmit, "profile:underage");

  assertTrue(validateRucFromCedula("1710034065001"), "ruc:valid");
  assertFalse(validateRucFromCedula("1710034065002"), "ruc:invalid");
}

function main() {
  runRegistrationMatrix();
  runVerificationMatrix();
  runValidationMatrix();
  console.log("Phase 2 auth/onboarding parity logic checks: OK");
}

main();
