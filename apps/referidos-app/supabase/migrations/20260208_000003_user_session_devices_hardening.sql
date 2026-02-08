-- 20260208_000003_user_session_devices_hardening.sql
-- Harden table ACL and prevent direct client mutations.

BEGIN;

DROP POLICY IF EXISTS user_session_devices_update_label_own
  ON public.user_session_devices;

REVOKE INSERT, UPDATE, DELETE
  ON TABLE public.user_session_devices
  FROM anon, authenticated;

GRANT SELECT
  ON TABLE public.user_session_devices
  TO authenticated;

COMMIT;
