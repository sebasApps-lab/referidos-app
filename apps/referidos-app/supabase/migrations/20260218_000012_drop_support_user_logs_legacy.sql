-- 20260217_000012_drop_support_user_logs_legacy.sql
-- Retira infraestructura legacy de support_user_logs.

begin;

create or replace function public.support_cleanup()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.support_threads
  where status = 'closed'
    and closed_at is not null
    and closed_at < now() - interval '90 days';
end;
$$;

drop table if exists public.support_user_logs;

do $$
begin
  if exists (select 1 from pg_type where typname = 'support_log_level') then
    begin
      drop type public.support_log_level;
    exception
      when dependent_objects_still_exist then
        null;
    end;
  end if;
end $$;

do $$
begin
  if exists (select 1 from pg_type where typname = 'support_log_category') then
    begin
      drop type public.support_log_category;
    exception
      when dependent_objects_still_exist then
        null;
    end;
  end if;
end $$;

commit;
