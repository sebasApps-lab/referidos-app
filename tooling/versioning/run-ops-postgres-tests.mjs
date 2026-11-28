import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
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
const dlqGuard = "20260415_000043_ops_telemetry_dlq_history_guard.sql";
const dlqArchive = join(migrationDir, "../migration-history", "20260415_000043_ops_telemetry_dlq_metadata_only.sql");
const dlqStatementsSha256 = "76362c9af3c7df2c9c29b6def9cd581cbdca43e8a22bcb1e3740bb0f0c83a4b2";
const dlqPrerequisites = new Set([
  "20260301_000020_ops_telemetry_hub.sql",
  "20260318_000034_ops_telemetry_versioning_domain.sql",
  "20260412_000040_ops_telemetry_dlq_retention_and_dashboard.sql",
  "20260413_000041_ops_telemetry_dlq_preview_lightweight.sql",
  "20260414_000042_ops_telemetry_dlq_preview_aggregate.sql",
]);
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
  .filter((name) => /^\d{8}_\d+_(ops_)?versioning_.*\.sql$/.test(name) || dlqPrerequisites.has(name))
  .sort();
const expectedMigrations = [
  "20261126_000044_versioning_durable_deploy_attempts.sql",
  "20261127_000045_versioning_require_staging_closure.sql",
];
for (const migration of [...dlqPrerequisites, ...expectedMigrations]) {
  if (!migrationFiles.includes(migration)) {
    throw new Error(`Missing required OPS migration ${migration}.`);
  }
}
assert.equal(migrationVersions.get("20260415"), dlqGuard, "Exactly one active OPS file must represent version 20260415");

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

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function historicalDlqStatements() {
  const archive = readFileSync(dlqArchive);
  assert.equal(sha256(archive), "22c9fa5b456d28dfe27ba96a339af640ed0c609120a28d9fffa58dbbd6b7328a",
    "Historical 000043 archive bytes must match the recovered source file");
  const sql = archive.toString("utf8");
  // These column-one boundaries apply only to the archive pinned above.
  const boundaries = Array.from(sql.matchAll(/^(alter|create|drop|grant|insert|update|delete|truncate) /gim), (match) => match.index);
  assert.equal(boundaries.length, 20);
  boundaries[0] = 0;
  const statements = boundaries.map((start, index) => {
    const statement = sql.slice(start, boundaries[index + 1]).trim();
    assert.ok(statement.endsWith(";"));
    return statement.slice(0, -1).trim();
  });
  const orderedJson = JSON.stringify(statements);
  assert.equal(sha256(orderedJson), dlqStatementsSha256, "Historical 000043 statements must match the verified OPS ledger");
  return orderedJson;
}

function dlqCatalog(database) {
  return JSON.parse(query(database, `
    select json_build_object(
      'raw_column', exists (select 1 from pg_attribute
        where attrelid = 'public.ops_telemetry_ingest_dlq'::regclass and attname = 'raw_event' and not attisdropped),
      'metadata_columns', (select count(*) from pg_attribute
        where attrelid = 'public.ops_telemetry_ingest_dlq'::regclass and not attisdropped
        and attname in ('source_table','source_row_id','source_app_id','event_type','retention_tier','occurred_at',
          'ingest_mode','panel_key','payload_type','payload_keys','payload_key_count','payload_size_bytes','raw_event_size_bytes')),
      'aggregate_columns', (select count(*) from pg_attribute
        where attrelid = 'public.ops_telemetry_ingest_dlq_purge_groups'::regclass and not attisdropped
        and attname in ('total_payload_size_bytes','total_raw_event_size_bytes')),
      'aggregate_trigger', exists (select 1 from pg_trigger
        where tgrelid = 'public.ops_telemetry_ingest_dlq'::regclass
        and tgname = 'trg_ops_telemetry_ingest_dlq_purge_groups_sync' and tgenabled <> 'D'),
      'events_rpc_result', pg_get_function_result(p.oid),
      'events_rpc_security_definer', p.prosecdef,
      'events_rpc_service_role_direct_grant', exists (
        select 1 from aclexplode(p.proacl) a join pg_roles r on r.oid = a.grantee
        where r.rolname = 'service_role' and a.privilege_type = 'EXECUTE'),
      'events_rpc_anon_effective_execute', has_function_privilege('anon', p.oid, 'EXECUTE'),
      'events_rpc_authenticated_effective_execute', has_function_privilege('authenticated', p.oid, 'EXECUTE'),
      'events_rpc_service_role_effective_execute', has_function_privilege('service_role', p.oid, 'EXECUTE'))
    from pg_proc p where p.oid = 'public.ops_telemetry_ingest_dlq_events_for_next_purge(text,integer,integer)'::regprocedure;
  `));
}

function checkDlqHistory(database, orderedJson) {
  const before = dlqCatalog(database);
  assert.equal(before.raw_column, true);
  assert.equal(before.aggregate_trigger, true);
  assert.equal(before.events_rpc_service_role_direct_grant, true);
  const result = spawnSync(psqlBinary, [
    ...psqlArgs(database), "--set=VERBOSITY=verbose", "--single-transaction", `--file=${join(migrationDir, dlqGuard)}`,
  ], { env: environment, encoding: "utf8" });
  if (result.error) throw result.error;
  assert.equal(result.status, 3);
  assert.match(result.stderr, /55000:.*ops_000043_requires_verified_history/);
  assert.deepEqual(dlqCatalog(database), before);

  // Replay historic DDL only on the isolated, locked, empty tables verified by this fixture.
  psql(database, "--single-transaction", `--file=${join(sqlDir, "ops-dlq-history-empty-guard.sql")}`, `--file=${dlqArchive}`);
  const catalog = dlqCatalog(database);
  assert.equal(catalog.raw_column, false);
  assert.equal(catalog.metadata_columns, 13);
  assert.equal(catalog.aggregate_columns, 2);
  assert.equal(catalog.aggregate_trigger, false);
  assert.match(catalog.events_rpc_result, /payload_keys text\[\]/);
  assert.doesNotMatch(catalog.events_rpc_result, /\braw_event jsonb/);
  assert.equal(catalog.events_rpc_security_definer, true);
  assert.equal(catalog.events_rpc_service_role_direct_grant, false);
  assert.equal(catalog.events_rpc_anon_effective_execute, true);
  assert.equal(catalog.events_rpc_authenticated_effective_execute, true);
  assert.equal(catalog.events_rpc_service_role_effective_execute, true);
  console.log("043 guard rejected a fresh ledger. Empty-table archive replay confirmed the historic catalog and fixture ACL exposure.");

  psql(database, "--single-transaction", `--file=${join(sqlDir, "ops-dlq-history-existing.fixture.sql")}`);
  const body = "$ops_000043_fixture_json$";
  assert.ok(!orderedJson.includes(body));
  const seed = spawnSync(psqlBinary, psqlArgs(database), { env: environment, encoding: "utf8",
    input: `insert into supabase_migrations.schema_migrations (version, name, statements)
      select '20260415', '000043_ops_telemetry_dlq_metadata_only', array_agg(statement order by ordinal)
      from jsonb_array_elements_text(${body}${orderedJson}${body}::jsonb) with ordinality as files(statement, ordinal);\n`,
  });
  if (seed.error) throw seed.error;
  assert.equal(seed.status, 0, seed.stderr);
  assert.equal(query(database, "select encode(sha256(convert_to(array_to_json(statements)::text, 'UTF8')), 'hex') from supabase_migrations.schema_migrations where version = '20260415';"), dlqStatementsSha256);
  const applied = new Set(query(database, "select version from supabase_migrations.schema_migrations order by version;").split(/\r?\n/));
  const pending = [...migrationVersions]
    .filter(([version]) => version >= "20260415" && !applied.has(version))
    .map(([, name]) => name).sort();
  assert.deepEqual(pending, expectedMigrations);
}

function dlqSnapshot(database) {
  return query(database, `
    select jsonb_build_object(
      'ledger', (select to_jsonb(m) from supabase_migrations.schema_migrations m where version = '20260415'),
      'dlq', (select jsonb_agg(to_jsonb(d) order by d.id) from public.ops_telemetry_ingest_dlq d),
      'aggregate', (select jsonb_agg(to_jsonb(g) order by g.purge_bucket_date, g.group_key)
        from public.ops_telemetry_ingest_dlq_purge_groups g)
    );
  `);
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

const orderedDlqStatements = historicalDlqStatements();
const database = `versioning_test_${randomBytes(8).toString("hex")}`;
psql("postgres", "--command", `CREATE DATABASE "${database}" TEMPLATE template0`);
try {
  assert.equal(query(database, "select not exists (select 1 from pg_available_extensions where name = 'pg_cron');"), "t",
    "Run the historical telemetry replay on disposable PostgreSQL without pg_cron");
  psql(database, `--file=${join(sqlDir, "ops-postgres-fixture.sql")}`);
  let historySnapshot;
  for (const migration of migrationFiles) {
    if (migration === expectedMigrations[0]) {
      checkDlqHistory(database, orderedDlqStatements);
      historySnapshot = dlqSnapshot(database);
      checkReadOnlyPreflight(database, false);
    }
    const transaction = expectedMigrations.includes(migration) ? ["--single-transaction"] : [];
    psql(database, ...transaction, `--file=${join(migrationDir, migration)}`);
  }
  assert.equal(dlqSnapshot(database), historySnapshot, "044 and 045 must preserve the prior DLQ rows, aggregates and ledger");
  console.log("044 and 045 preserved the registered 043 statements and synthetic DLQ rows.");
  checkReadOnlyPreflight(database, true);
  console.log("Read-only OPS preflight passed before and after the two durable migrations.");
  const regressionFiles = [
    join(sqlDir, "deploy-attempts.test.sql"),
    join(sqlDir, "promotion-guard.test.sql"),
  ];
  psql(database, ...regressionFiles.map((file) => `--file=${file}`));
  console.log(`Applied ${migrationFiles.length} OPS versioning/telemetry migrations and replayed archive 043 on empty tables. Both SQL regression suites passed.`);
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
