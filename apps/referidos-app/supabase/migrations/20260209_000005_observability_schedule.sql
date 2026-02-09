-- Daily retention cleanup for observability data.

BEGIN;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.unschedule('obs_cleanup_daily');

    PERFORM cron.schedule(
      'obs_cleanup_daily',
      '15 3 * * *',
      $$select public.obs_cleanup(null, 30, 120);$$
    );
  END IF;
END $$;

COMMIT;
