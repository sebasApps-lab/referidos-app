-- 20250220_add_account_status_drop_registro_estado.sql
-- Agrega account_status y elimina registro_estado sin romper usuarios existentes.

BEGIN;

-- 1) Quitar registro_estado (ya no se usa)
ALTER TABLE public.usuarios
  DROP COLUMN IF EXISTS registro_estado;

-- 2) Agregar account_status (nullable primero)
ALTER TABLE public.usuarios
  ADD COLUMN IF NOT EXISTS account_status text;

-- 3) Backfill para no bloquear usuarios existentes
UPDATE public.usuarios
  SET account_status = 'active'
  WHERE account_status IS NULL;

-- 4) Default + NOT NULL
ALTER TABLE public.usuarios
  ALTER COLUMN account_status SET DEFAULT 'pending',
  ALTER COLUMN account_status SET NOT NULL;

-- 5) Constraint (idempotente)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'usuarios_account_status_check'
  ) THEN
    ALTER TABLE public.usuarios
      ADD CONSTRAINT usuarios_account_status_check
      CHECK (account_status IN (
        'active',
        'pending',
        'expired',
        'blocked',
        'suspended',
        'deleted'
      ));
  END IF;
END$$;

-- 6) Indice parcial
CREATE INDEX IF NOT EXISTS idx_usuarios_account_status_active
  ON public.usuarios (id_auth)
  WHERE account_status = 'active';

COMMIT;
