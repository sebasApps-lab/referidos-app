-- 20260208_000002_user_session_devices_ua_hash_only.sql
-- Privacy hardening: keep only ua_hash as device fingerprint material.

BEGIN;

ALTER TABLE IF EXISTS public.user_session_devices
  DROP COLUMN IF EXISTS ip_hash,
  DROP COLUMN IF EXISTS approx_location;

COMMIT;
