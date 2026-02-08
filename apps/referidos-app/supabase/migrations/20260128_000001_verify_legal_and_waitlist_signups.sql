-- 20260128_000001_verify_legal_and_waitlist_signups.sql
-- Legal acceptance flags + waitlist signups table.

BEGIN;

ALTER TABLE public.usuarios
  ADD COLUMN IF NOT EXISTS terms_accepted boolean default false,
  ADD COLUMN IF NOT EXISTS privacy_accepted boolean default false;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'waitlist_role'
  ) THEN
    CREATE TYPE public.waitlist_role AS ENUM ('cliente', 'negocio_interest');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  role public.waitlist_role NOT NULL DEFAULT 'cliente',
  source text,
  consent_version text,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_signups_email_lower CHECK (email = lower(email))
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_signups_email_key
  ON public.waitlist_signups (email);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

COMMIT;
