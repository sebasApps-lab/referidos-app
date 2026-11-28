-- The guard and the historical schema fixture share one local scratch transaction.
do $$
begin
  if current_database() !~ '^versioning_test_[a-f0-9]{16}$' then
    raise exception 'historic schema fixture requires the isolated versioning test database';
  end if;
end;
$$;

lock table public.ops_telemetry_ingest_dlq, public.ops_telemetry_ingest_dlq_purge_groups in access exclusive mode;

do $$
begin
  if exists (select 1 from public.ops_telemetry_ingest_dlq)
    or exists (select 1 from public.ops_telemetry_ingest_dlq_purge_groups) then
    raise exception 'historic schema fixture requires empty DLQ and aggregate tables';
  end if;
end;
$$;
