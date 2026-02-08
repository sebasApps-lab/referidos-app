-- 20260208_000001_user_session_devices.sql
-- Device sessions registry + fail-closed session guard.

BEGIN;

CREATE TABLE IF NOT EXISTS public.user_session_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  session_id text NOT NULL,
  device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  label text,
  platform text NOT NULL DEFAULT 'web',
  ua_hash text,
  ip_hash text,
  approx_location text,
  CONSTRAINT user_session_devices_session_id_not_empty CHECK (length(trim(session_id)) > 0),
  CONSTRAINT user_session_devices_device_id_not_empty CHECK (length(trim(device_id)) > 0),
  CONSTRAINT user_session_devices_platform_not_empty CHECK (length(trim(platform)) > 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS user_session_devices_user_session_key
  ON public.user_session_devices (user_id, session_id);

CREATE INDEX IF NOT EXISTS user_session_devices_user_revoked_seen_idx
  ON public.user_session_devices (user_id, revoked_at, last_seen_at DESC);

ALTER TABLE public.user_session_devices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS user_session_devices_select_own ON public.user_session_devices;
CREATE POLICY user_session_devices_select_own
  ON public.user_session_devices
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Optional owner label updates (active sessions only).
DROP POLICY IF EXISTS user_session_devices_update_label_own ON public.user_session_devices;
CREATE POLICY user_session_devices_update_label_own
  ON public.user_session_devices
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND revoked_at IS NULL)
  WITH CHECK (auth.uid() = user_id AND revoked_at IS NULL);

CREATE OR REPLACE FUNCTION public.current_jwt_session_id()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT nullif(auth.jwt() ->> 'session_id', '');
$$;

CREATE OR REPLACE FUNCTION public.is_current_session_valid()
RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  current_session_id text := public.current_jwt_session_id();
BEGIN
  IF current_user_id IS NULL OR current_session_id IS NULL THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.user_session_devices usd
    WHERE usd.user_id = current_user_id
      AND usd.session_id = current_session_id
      AND usd.revoked_at IS NULL
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.current_jwt_session_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_current_session_valid() TO authenticated;

CREATE OR REPLACE FUNCTION public.prune_user_session_devices(p_user_id uuid DEFAULT NULL)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count bigint := 0;
BEGIN
  IF p_user_id IS NULL THEN
    DELETE FROM public.user_session_devices
    WHERE COALESCE(last_seen_at, created_at) < now() - interval '60 days';
  ELSE
    DELETE FROM public.user_session_devices
    WHERE user_id = p_user_id
      AND COALESCE(last_seen_at, created_at) < now() - interval '60 days';
  END IF;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

REVOKE ALL ON FUNCTION public.prune_user_session_devices(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.prune_user_session_devices(uuid) TO service_role;

-- Custom access token hook: ensures session_id claim is always available in JWT claims.
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  claims jsonb;
  sid jsonb;
BEGIN
  claims := COALESCE(event -> 'claims', '{}'::jsonb);
  sid := event -> 'session_id';

  IF sid IS NOT NULL AND sid <> 'null'::jsonb THEN
    claims := jsonb_set(claims, '{session_id}', sid, true);
  END IF;

  RETURN jsonb_set(event, '{claims}', claims, true);
END;
$$;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook(jsonb) TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook(jsonb) FROM PUBLIC, anon, authenticated;

-- Fail-closed guard on critical tables.
DO $$
DECLARE
  table_name text;
  critical_tables text[] := ARRAY[
    'usuarios',
    'negocios',
    'sucursales',
    'promos',
    'promos_sucursales',
    'direcciones',
    'qr_validos',
    'escaneos',
    'comentarios',
    'reportes'
  ];
BEGIN
  FOREACH table_name IN ARRAY critical_tables LOOP
    IF to_regclass('public.' || table_name) IS NOT NULL THEN
      EXECUTE format(
        'DROP POLICY IF EXISTS session_guard_authenticated ON public.%I',
        table_name
      );
      EXECUTE format(
        'CREATE POLICY session_guard_authenticated ON public.%I AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_current_session_valid()) WITH CHECK (public.is_current_session_valid())',
        table_name
      );
    END IF;
  END LOOP;
END;
$$;

COMMIT;
