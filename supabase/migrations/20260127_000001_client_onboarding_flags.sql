-- 20260127_000001_client_onboarding_flags.sql
-- Flags para pasos opcionales de onboarding en clientes.

BEGIN;

ALTER TABLE public.usuarios
  ADD COLUMN IF NOT EXISTS cliente_profile_skipped boolean default false,
  ADD COLUMN IF NOT EXISTS cliente_address_skipped boolean default false;

COMMIT;
