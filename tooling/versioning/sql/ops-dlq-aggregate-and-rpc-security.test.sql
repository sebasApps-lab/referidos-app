begin;

create function pg_temp.assert_dlq_aggregate(p_stage text)
returns void
language plpgsql
as $test$
begin
  if exists (
    with source_groups as (
      select public.ops_telemetry_ingest_dlq_purge_bucket_date(d.expires_at) as purge_bucket_date,
        public.ops_telemetry_ingest_dlq_group_key(d.source_project_ref, d.source_env_key, d.domain, d.reason) as group_key,
        count(*) as event_count,
        sum(greatest(coalesce(d.raw_event_size_bytes, 0), 0)) as raw_bytes,
        sum(greatest(coalesce(d.payload_size_bytes, 0), 0)) as payload_bytes,
        min(d.created_at) as first_created_at, max(d.created_at) as last_created_at,
        min(d.expires_at) as first_expires_at, max(d.expires_at) as last_expires_at
      from public.ops_telemetry_ingest_dlq d
      group by 1, 2
    ), preview_groups as (
      select g.purge_bucket_date, g.group_key, g.event_count,
        g.total_raw_event_size_bytes, g.total_payload_size_bytes,
        g.first_created_at, g.last_created_at, g.first_expires_at, g.last_expires_at
      from public.ops_telemetry_ingest_dlq_purge_groups g
    )
    (select * from source_groups except all select * from preview_groups)
    union all
    (select * from preview_groups except all select * from source_groups)
  ) then
    raise exception 'DLQ aggregates differ from their source after %', p_stage;
  end if;
end
$test$;

select pg_temp.assert_dlq_aggregate('backfill from the 043 fixture');

set local role service_role;

insert into public.ops_telemetry_ingest_dlq
  (source_project_ref, source_env_key, domain, reason, source_event_key, created_at, expires_at,
   raw_event_size_bytes, payload_size_bytes)
values
  ('fixture-046', 'staging', 'observability', 'aggregate test', 'earliest', '2026-04-16 08:00Z', null, 100, 10),
  ('fixture-046', 'staging', 'observability', 'aggregate test', 'middle',   '2026-04-17 08:00Z', null, 200, 20),
  ('fixture-046', 'staging', 'observability', 'aggregate test', 'latest',  '2026-04-18 08:00Z', null, 300, 30),
  ('fixture-046', 'staging', 'observability', 'aggregate test', 'anchor',  '2026-04-17 10:00Z', null, 400, 40);
select pg_temp.assert_dlq_aggregate('multi-row insert using the retention trigger');

-- Override the inserted retention defaults to place four distinct expiries in one Ecuador-local bucket.
update public.ops_telemetry_ingest_dlq
set expires_at = case source_event_key
  when 'earliest' then '2026-04-29 12:00Z'::timestamptz
  when 'middle' then '2026-04-29 14:00Z'::timestamptz
  when 'latest' then '2026-04-30 05:00Z'::timestamptz
  when 'anchor' then '2026-04-29 16:00Z'::timestamptz
end
where source_project_ref = 'fixture-046';
select pg_temp.assert_dlq_aggregate('moving four rows into the same daily bucket');

update public.ops_telemetry_ingest_dlq
set raw_event_size_bytes = 157, payload_size_bytes = 11
where source_project_ref = 'fixture-046' and source_event_key = 'earliest';
select pg_temp.assert_dlq_aggregate('changing byte totals without changing the group');

update public.ops_telemetry_ingest_dlq
set created_at = '2026-04-16 09:00Z', expires_at = '2026-04-29 13:00Z'
where source_project_ref = 'fixture-046' and source_event_key = 'earliest';
select pg_temp.assert_dlq_aggregate('moving the earliest bounds within the same daily bucket');

update public.ops_telemetry_ingest_dlq
set reason = 'new group'
where source_project_ref = 'fixture-046' and source_event_key = 'middle';
select pg_temp.assert_dlq_aggregate('moving a row to a different group');

update public.ops_telemetry_ingest_dlq
set expires_at = '2026-05-01 05:00Z'
where source_project_ref = 'fixture-046' and source_event_key = 'latest';
select pg_temp.assert_dlq_aggregate('moving the latest bounds to another daily bucket');

delete from public.ops_telemetry_ingest_dlq
where source_project_ref = 'fixture-046' and source_event_key = 'earliest';
select pg_temp.assert_dlq_aggregate('removing the earliest bounds while another row remains');

delete from public.ops_telemetry_ingest_dlq where source_project_ref = 'fixture-046';
select pg_temp.assert_dlq_aggregate('deleting the last rows in each bucket and group');

-- These functions are called with the service role by the authenticated Edge admin endpoint.
do $test$
begin
  perform * from public.ops_telemetry_ingest_dlq_summary_for_next_purge();
  perform * from public.ops_telemetry_ingest_dlq_groups_for_next_purge(1);
  perform * from public.ops_telemetry_ingest_dlq_events_for_next_purge(null, 1, 0);
end
$test$;

reset role;

do $test$
declare
  v_role text;
begin
  foreach v_role in array array['anon', 'authenticated'] loop
    execute format('set local role %I', v_role);
    begin
      perform * from public.ops_telemetry_ingest_dlq_events_for_next_purge(null, 1, 0);
      raise exception 'Unexpected DLQ events RPC access as %', v_role;
    exception when insufficient_privilege then
      null;
    end;
    reset role;
  end loop;
end
$test$;

rollback;
