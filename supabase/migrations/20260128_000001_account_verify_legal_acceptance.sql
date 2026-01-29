-- 20260128_000001_account_verify_legal_acceptance.sql
-- Flags para aceptación de términos y políticas en usuarios.

BEGIN;

ALTER TABLE public.usuarios
  ADD COLUMN IF NOT EXISTS terms_accepted boolean default false,
  ADD COLUMN IF NOT EXISTS privacy_accepted boolean default false;

COMMIT;
