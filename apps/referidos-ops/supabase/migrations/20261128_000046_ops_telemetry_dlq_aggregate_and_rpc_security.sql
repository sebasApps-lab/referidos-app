-- Restore synchronization of the metadata-only DLQ projection from 000043.
-- The Supabase migrator runs these statements and its ledger write in one transaction.
set local lock_timeout = '5s';

lock table public.ops_telemetry_ingest_dlq in share row exclusive mode;
lock table public.ops_telemetry_ingest_dlq_purge_groups in share row exclusive mode;

create or replace function public.trg_ops_telemetry_ingest_dlq_purge_groups_sync()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
declare
  v_bucket_date date;
  v_group_key text;
begin
  if tg_op = 'UPDATE' and
    row(old.source_project_ref, old.source_env_key, old.domain, old.reason,
      old.created_at, old.expires_at, old.raw_event_size_bytes, old.payload_size_bytes)
    is not distinct from
    row(new.source_project_ref, new.source_env_key, new.domain, new.reason,
      new.created_at, new.expires_at, new.raw_event_size_bytes, new.payload_size_bytes)
  then
    return null;
  end if;

  if tg_op in ('UPDATE', 'DELETE') then
    v_bucket_date := public.ops_telemetry_ingest_dlq_purge_bucket_date(old.expires_at);
    v_group_key := public.ops_telemetry_ingest_dlq_group_key(
      old.source_project_ref, old.source_env_key, old.domain, old.reason
    );

    perform public.ops_telemetry_ingest_dlq_purge_groups_remove_row(
      old.source_project_ref, old.source_env_key, old.domain, old.reason,
      old.expires_at, old.raw_event_size_bytes, old.payload_size_bytes
    );

    -- The removal holds the projection row lock. Refresh surviving groups
    -- whose extrema could have changed using a fresh snapshot of the DLQ.
    if exists (
      select 1
      from public.ops_telemetry_ingest_dlq_purge_groups g
      where g.purge_bucket_date = v_bucket_date and g.group_key = v_group_key
        and (old.created_at in (g.first_created_at, g.last_created_at)
          or old.expires_at in (g.first_expires_at, g.last_expires_at))
    ) then
      update public.ops_telemetry_ingest_dlq_purge_groups g
      set (first_created_at, last_created_at, first_expires_at, last_expires_at) =
        (select min(d.created_at), max(d.created_at), min(d.expires_at), max(d.expires_at)
         from public.ops_telemetry_ingest_dlq d
         where public.ops_telemetry_ingest_dlq_purge_bucket_date(d.expires_at) = v_bucket_date
           and public.ops_telemetry_ingest_dlq_group_key(
             d.source_project_ref, d.source_env_key, d.domain, d.reason
           ) = v_group_key)
      where g.purge_bucket_date = v_bucket_date and g.group_key = v_group_key;
    end if;
  end if;

  if tg_op in ('INSERT', 'UPDATE') then
    perform public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(
      new.source_project_ref, new.source_env_key, new.domain, new.reason,
      new.created_at, new.expires_at, new.raw_event_size_bytes, new.payload_size_bytes
    );
  end if;

  return null;
end;
$$;

create or replace trigger trg_ops_telemetry_ingest_dlq_purge_groups_sync
after insert or update or delete on public.ops_telemetry_ingest_dlq
for each row execute function public.trg_ops_telemetry_ingest_dlq_purge_groups_sync();

alter table public.ops_telemetry_ingest_dlq
  enable trigger trg_ops_telemetry_ingest_dlq_purge_groups_sync;

-- Keep the historical grouping contract. Require exactly one dimension tuple
-- per bucket/key before reconciling the projection.
create temporary table ops_dlq_000046_expected on commit drop as
  select
    public.ops_telemetry_ingest_dlq_purge_bucket_date(d.expires_at) as purge_bucket_date,
    public.ops_telemetry_ingest_dlq_group_key(
      d.source_project_ref, d.source_env_key, d.domain, d.reason
    ) as group_key,
    d.source_project_ref, d.source_env_key, d.domain, d.reason,
    count(*) as event_count,
    sum(greatest(d.raw_event_size_bytes, 0)) as total_raw_event_size_bytes,
    sum(greatest(d.payload_size_bytes, 0)) as total_payload_size_bytes,
    min(d.created_at) as first_created_at, max(d.created_at) as last_created_at,
    min(d.expires_at) as first_expires_at, max(d.expires_at) as last_expires_at
  from public.ops_telemetry_ingest_dlq d
  group by 1, 2, 3, 4, 5, 6;

alter table pg_temp.ops_dlq_000046_expected add primary key (purge_bucket_date, group_key);

insert into public.ops_telemetry_ingest_dlq_purge_groups as g (
    purge_bucket_date, group_key, source_project_ref, source_env_key, domain, reason,
    event_count, total_raw_event_size_bytes, total_payload_size_bytes,
    first_created_at, last_created_at, first_expires_at, last_expires_at
  )
  select purge_bucket_date, group_key, source_project_ref, source_env_key, domain, reason,
    event_count, total_raw_event_size_bytes, total_payload_size_bytes,
    first_created_at, last_created_at, first_expires_at, last_expires_at
  from pg_temp.ops_dlq_000046_expected
  on conflict (purge_bucket_date, group_key) do update set
    source_project_ref = excluded.source_project_ref,
    source_env_key = excluded.source_env_key,
    domain = excluded.domain,
    reason = excluded.reason,
    event_count = excluded.event_count,
    total_raw_event_size_bytes = excluded.total_raw_event_size_bytes,
    total_payload_size_bytes = excluded.total_payload_size_bytes,
    first_created_at = excluded.first_created_at,
    last_created_at = excluded.last_created_at,
    first_expires_at = excluded.first_expires_at,
    last_expires_at = excluded.last_expires_at,
    updated_at = now()
  where row(g.source_project_ref, g.source_env_key, g.domain, g.reason, g.event_count,
    g.total_raw_event_size_bytes, g.total_payload_size_bytes,
    g.first_created_at, g.last_created_at, g.first_expires_at, g.last_expires_at)
    is distinct from
    row(excluded.source_project_ref, excluded.source_env_key, excluded.domain, excluded.reason,
    excluded.event_count, excluded.total_raw_event_size_bytes, excluded.total_payload_size_bytes,
    excluded.first_created_at, excluded.last_created_at, excluded.first_expires_at, excluded.last_expires_at);

delete from public.ops_telemetry_ingest_dlq_purge_groups g
where not exists (
  select 1 from pg_temp.ops_dlq_000046_expected e
  where e.purge_bucket_date = g.purge_bucket_date and e.group_key = g.group_key
);

revoke execute on function public.ops_telemetry_ingest_dlq_events_for_next_purge(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.ops_telemetry_ingest_dlq_events_for_next_purge(text, integer, integer)
  to service_role;

-- Explicit grants and inherited privileges are separate. Abort the
-- migration if a client role still reaches the RPC through another role.
do $$
declare
  v_rpc regprocedure := 'public.ops_telemetry_ingest_dlq_events_for_next_purge(text,integer,integer)';
begin
  if has_function_privilege('anon', v_rpc, 'EXECUTE')
    or has_function_privilege('authenticated', v_rpc, 'EXECUTE')
    or not has_function_privilege('service_role', v_rpc, 'EXECUTE')
  then
    raise exception 'ops_000046_unexpected_dlq_details_rpc_privileges';
  end if;
end;
$$;
