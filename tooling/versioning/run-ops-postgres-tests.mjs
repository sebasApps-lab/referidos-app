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
const migrationFiles = readdirSync(migrationDir)
  .filter((name) => /^\d{8}_\d+_(ops_)?versioning_.*\.sql$/.test(name))
  .sort();
const expectedMigrations = [
  "20261126_000044_versioning_durable_deploy_attempts.sql",
  "20261126_000045_versioning_require_staging_closure.sql",
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

function query(database, statement) {
  const result = spawnSync(psqlBinary, [...psqlArgs(database), "-At", "--command", statement], {
    env: environment, encoding: "utf8",
  });
  if (result.error || result.status !== 0) throw new Error(result.error?.message ?? result.stderr);
  return result.stdout.trim();
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
  const files = [
    join(sqlDir, "ops-postgres-fixture.sql"),
    ...migrationFiles.map((name) => join(migrationDir, name)),
    join(sqlDir, "deploy-attempts.test.sql"),
    join(sqlDir, "promotion-guard.test.sql"),
  ];
  psql(database, ...files.map((file) => `--file=${file}`));
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
