do $$
begin
  begin
    create extension if not exists pg_cron;
  exception
    when others then
      return;
  end;
end $$;

do $$
declare
  job_id int;
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    select jobid into job_id
    from cron.job
    where jobname = 'support_cleanup_daily'
    limit 1;

    if job_id is not null then
      perform cron.unschedule(job_id);
    end if;

    -- 00:00 America/Sao_Paulo ~= 03:00 UTC
    perform cron.schedule(
      'support_cleanup_daily',
      '0 3 * * *',
      'select public.support_cleanup();'
    );
  end if;
exception
  when others then
    null;
end $$;
