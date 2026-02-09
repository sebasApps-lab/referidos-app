-- Daily retention cleanup for observability data.

BEGIN;

DO $do$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    -- Unschedule any existing job with same name (idempotent).
    PERFORM cron.unschedule(j.jobid)
    FROM cron.job j
    WHERE j.jobname = 'obs_cleanup_daily';

    PERFORM cron.schedule(
      'obs_cleanup_daily',
      '15 3 * * *',
      'select public.obs_cleanup(null, 30, 120);'
    );
  END IF;
END
$do$;

COMMIT;
