-- Run only against a fresh isolated test database. No external accounts or data.
\set ON_ERROR_STOP on
CREATE ROLE anon NOLOGIN;
CREATE ROLE authenticated NOLOGIN;
CREATE ROLE service_role NOLOGIN BYPASSRLS;
CREATE ROLE supabase_auth_admin NOLOGIN;
CREATE SCHEMA auth;

CREATE FUNCTION auth.jwt() RETURNS jsonb LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('request.jwt.claims', true), '')::jsonb;
$$;
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT (auth.jwt() ->> 'sub')::uuid;
$$;
GRANT USAGE ON SCHEMA auth TO anon, authenticated;

-- Keep the traditional profile table empty to model a lightweight identity.
CREATE TABLE public.usuarios (id uuid PRIMARY KEY);
\ir ../../referidos-app/supabase/migrations/20260206_000001_user_session_devices.sql

-- Effective DEV policy, in addition to the policies in the original migration.
CREATE POLICY user_session_devices_session_guard ON public.user_session_devices
  AS RESTRICTIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id AND public.current_jwt_session_id() IS NOT NULL);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_session_devices TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_session_devices TO service_role;

SET ROLE service_role;
INSERT INTO public.user_session_devices (user_id, session_id, device_id, revoked_at) VALUES
  ('00000000-0000-4000-8000-000000000001', 'active', 'fixture-a', NULL),
  ('00000000-0000-4000-8000-000000000001', 'revoked', 'fixture-b', now()),
  ('00000000-0000-4000-8000-000000000002', 'other', 'fixture-c', NULL);
RESET ROLE;

\ir ../docs/sql/promos-phase1-session-grants-dev.draft.sql

SET ROLE authenticated;
SET request.jwt.claims = '{"sub":"00000000-0000-4000-8000-000000000001","session_id":"active"}';
DO $$
BEGIN
  IF NOT public.is_current_session_valid() THEN
    RAISE EXCEPTION 'A registered lightweight user should pass without a profile';
  END IF;
  IF (SELECT count(*) FROM public.user_session_devices) <> 2 THEN
    RAISE EXCEPTION 'Only this user session rows should be visible';
  END IF;
  BEGIN
    UPDATE public.user_session_devices SET label = 'changed from client';
    RAISE EXCEPTION 'Direct client update was allowed';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
  BEGIN
    INSERT INTO public.user_session_devices(user_id, session_id, device_id)
    VALUES (auth.uid(), 'new', 'fixture-new');
    RAISE EXCEPTION 'Direct client insert was allowed';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
  BEGIN
    DELETE FROM public.user_session_devices;
    RAISE EXCEPTION 'Direct client delete was allowed';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END;
$$;

DO $$
DECLARE
  claim text;
BEGIN
  FOREACH claim IN ARRAY ARRAY['revoked', 'other', 'unregistered', ''] LOOP
    PERFORM set_config(
      'request.jwt.claims',
      jsonb_build_object('sub', '00000000-0000-4000-8000-000000000001', 'session_id', claim)::text,
      false
    );
    IF public.is_current_session_valid() THEN
      RAISE EXCEPTION 'Guard accepted disallowed session %', claim;
    END IF;
  END LOOP;
END;
$$;
RESET ROLE;

SET ROLE service_role;
UPDATE public.user_session_devices SET revoked_at = now() WHERE session_id = 'active';
RESET ROLE;
SET ROLE authenticated;
SET request.jwt.claims = '{"sub":"00000000-0000-4000-8000-000000000001","session_id":"active"}';
DO $$
BEGIN
  IF public.is_current_session_valid() THEN
    RAISE EXCEPTION 'Revocation by the server should cut access';
  END IF;
END;
$$;
RESET ROLE;
