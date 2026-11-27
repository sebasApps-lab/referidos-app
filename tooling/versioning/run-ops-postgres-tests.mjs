import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout } from "node:timers/promises";

const port = Number(process.env.VERSIONING_TEST_POSTGRES_PORT);
if (!Number.isInteger(port) || port <= 1024 || port === 5432 || port > 65535) {
  throw new Error("Set VERSIONING_TEST_POSTGRES_PORT to a separate local PostgreSQL test instance.");
}

const psqlBinary = process.env.VERSIONING_TEST_PSQL || "psql";
const environment = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => !key.toUpperCase().startsWith("PG"))
);
environment.PGCONNECT_TIMEOUT = "5";
environment.PGOPTIONS = "-c client_min_messages=warning";
environment.PGSSLMODE = "disable";
if (process.env.VERSIONING_TEST_POSTGRES_PASSWORD) {
  environment.PGPASSWORD = process.env.VERSIONING_TEST_POSTGRES_PASSWORD;
}

const root = fileURLToPath(new URL("../..", import.meta.url));
const sqlDir = join(root, "tooling", "versioning", "sql");
const migrationDir = join(root, "apps", "referidos-ops", "supabase", "migrations");
const opsSqlFiles = readdirSync(migrationDir).filter((name) => name.endsWith(".sql"));
const migrationVersions = new Map();
for (const name of opsSqlFiles) {
  const version = /^(\d+)_/.exec(name)?.[1];
  if (!version) throw new Error(`OPS migration lacks a Supabase version prefix: ${name}`);
  if (migrationVersions.has(version)) {
    throw new Error(`Duplicate Supabase migration version ${version}: ${migrationVersions.get(version)} and ${name}`);
  }
  migrationVersions.set(version, name);
}
const migrationFiles = opsSqlFiles
  .filter((name) => /^\d{8}_\d+_(ops_)?versioning_.*\.sql$/.test(name))
  .sort();
const expectedMigrations = [
  "20261126_000044_versioning_durable_deploy_attempts.sql",
  "20261127_000045_versioning_require_staging_closure.sql",
];
for (const migration of expectedMigrations) {
  if (!migrationFiles.includes(migration)) {
    throw new Error(`Missing required OPS migration ${migration}.`);
  }
}

function psqlArgs(database) {
  return [
    "-X", "--no-password", "--quiet", "--set=ON_ERROR_STOP=1",
    "--host=127.0.0.1", `--port=${port}`, "--username=postgres", `--dbname=${database}`,
  ];
}

function psql(database, ...argumentsForPsql) {
  const result = spawnSync(
    psqlBinary,
    [...psqlArgs(database), ...argumentsForPsql],
    { env: environment, stdio: "inherit" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`psql failed with exit status ${result.status ?? result.signal}.`);
  }
}

function capture(database, ...args) {
  const result = spawnSync(psqlBinary, [...psqlArgs(database), "-At", ...args], {
    env: environment, encoding: "utf8",
  });
  if (result.error || result.status !== 0) throw new Error(result.error?.message ?? result.stderr);
  return result.stdout.trim();
}

function query(database, statement) {
  return capture(database, "--command", statement);
}

function checkReadOnlyPreflight(database, migrated) {
  const output = capture(database, `--file=${join(sqlDir, "ops-durable-preflight.sql")}`);
  const schema = JSON.parse(output.split(/\r?\n/, 1)[0]);
  assert.deepEqual(schema.missing_columns, []);
  assert.equal(schema.legacy_rpcs.every((rpc) => rpc.present && rpc.return_type_matches), true);
  assert.equal(schema.artifact_head_conflict_target_present, true);
  assert.equal(schema.durable_table_present, migrated);
  assert.equal(schema.durable_guards.length, migrated ? 2 : 0);
  if (migrated) {
    assert.equal(schema.durable_table_rls && schema.durable_table_service_read, true);
    assert.equal(schema.durable_table_service_mutation || schema.durable_table_auth_read || schema.durable_table_anon_read, false);
    assert.equal(schema.durable_rpcs.every((rpc) => rpc.present && rpc.security_definer &&
      rpc.service_role_execute && !rpc.authenticated_execute && !rpc.anon_execute), true);
  }
}

function session(database, name) {
  const process = spawn(psqlBinary, [...psqlArgs(database), "-At"], {
    env: { ...environment, PGAPPNAME: name, PGOPTIONS: environment.PGOPTIONS + " -c statement_timeout=20000" },
  });
  let stdout = "";
  let stderr = "";
  process.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
  process.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
  process.stdin.on("error", (error) => { stderr += error.message; });
  const completion = new Promise((resolve) => {
    process.on("error", (error) => resolve({ code: 1, stdout, stderr: error.message }));
    process.on("close", (code) => resolve({ code, stdout, stderr }));
  });
  return { stdin: process.stdin, completion };
}

async function waitFor(database, predicate, message) {
  const end = Date.now() + 5000;
  do {
    if (query(database, `select exists (select 1 from pg_stat_activity
      where datname = current_database() and (${predicate}));`) === "t") return;
    await setTimeout(50);
  } while (Date.now() < end);
  throw new Error(message);
}

async function checkContention(database, ownerQuery, contenderQuery, expectedOwner, expectedContender) {
  const owner = session(database, "versioning_owner");
  let contender;
  try {
    owner.stdin.write(`begin;\n${ownerQuery};\n`);
    await waitFor(database, "application_name = 'versioning_owner' and state = 'idle in transaction'",
      "First PostgreSQL session did not acquire the lock.");
    contender = session(database, "versioning_contender");
    contender.stdin.end(`${contenderQuery};\n`);
    await waitFor(database, "application_name = 'versioning_contender' and cardinality(pg_blocking_pids(pid)) > 0",
      "Second PostgreSQL session did not wait for the first transaction.");
    owner.stdin.end("commit;\n");
    const [first, second] = await Promise.all([owner.completion, contender.completion]);
    assert.equal(first.code, 0, first.stderr);
    assert.equal(second.code, 0, second.stderr);
    assert.equal(first.stdout.trim(), expectedOwner);
    assert.equal(second.stdout.trim(), expectedContender);
  } finally {
    if (!owner.stdin.writableEnded) owner.stdin.end("rollback;\n");
    await owner.completion;
    if (contender) await contender.completion;
  }
}

const database = `versioning_test_${randomBytes(8).toString("hex")}`;
psql("postgres", "--command", `CREATE DATABASE "${database}" TEMPLATE template0`);
try {
  psql(database, `--file=${join(sqlDir, "ops-postgres-fixture.sql")}`);
  for (const migration of migrationFiles) {
    if (migration === expectedMigrations[0]) checkReadOnlyPreflight(database, false);
    const transaction = expectedMigrations.includes(migration) ? ["--single-transaction"] : [];
    psql(database, ...transaction, `--file=${join(migrationDir, migration)}`);
  }
  checkReadOnlyPreflight(database, true);
  console.log("Read-only OPS preflight passed before and after the two durable migrations.");
  const regressionFiles = [
    join(sqlDir, "deploy-attempts.test.sql"),
    join(sqlDir, "promotion-guard.test.sql"),
  ];
  psql(database, ...regressionFiles.map((file) => `--file=${file}`));
  console.log(`Applied ${migrationFiles.length} OPS migrations. Both SQL regression suites passed.`);
  psql(database, `--file=${join(sqlDir, "deploy-attempts-concurrency.fixture.sql")}`);
  await checkContention(database, "select versioning_fixture.reserve(1)", "select versioning_fixture.reserve(2)",
    "reserved", "deploy_target_busy");
  const claim = "select public.versioning_begin_deploy_dispatch('gha-1795661244000-60000000') ->> 'duplicate'";
  await checkContention(database, claim, claim, "false", "true");
  assert.equal(query(database, "select count(*) from public.version_deploy_attempts"), "1");
  assert.equal(query(database, "select count(*) from public.version_deployments"), "1");
  console.log("Two-session PostgreSQL tests passed for target reservation and dispatch authorization.");
} finally {
  psql("postgres", "--command", `DROP DATABASE "${database}"`);
}
