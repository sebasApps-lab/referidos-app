-- Synthetic post-migration data. Running 043 again would delete this date.
insert into public.ops_telemetry_ingest_dlq
  (source_project_ref, source_env_key, domain, reason, created_at, expires_at, payload_keys, payload_key_count)
values ('fixture-history', 'staging', 'observability', 'fixture only', '2026-04-10 12:00:00+00', '2026-04-30 00:00:00+00', array['fixture'], 1);

insert into public.ops_telemetry_ingest_dlq_purge_groups
  (purge_bucket_date, group_key, source_project_ref, source_env_key, domain, reason, event_count, total_payload_size_bytes)
values ('2026-04-30', 'fixture-history', 'fixture-history', 'staging', 'observability', 'fixture only', 1, 1);

create schema supabase_migrations;
create table supabase_migrations.schema_migrations (
  version text primary key,
  name text,
  statements text[]
);
