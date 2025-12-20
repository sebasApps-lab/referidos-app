BEGIN;

-- 1
ALTER TABLE public.usuarios
    DROP COLUMN IF EXISTS registro_estado;

--2
ALTER TABLE public.usuarios
    ADD COLUMN IF NOT EXISTS account_status text;

--3
UPDATE public.usuarios
    SET account_status = 'active',
    WHERE account_status IS NULL;

--4
ALTER TABLE public.usuarios
    ALTER COLUMN account_status SET DEFAULT 'pending',
    ALTER COLUMN account_status SET NOT NULL;

--5
DO$$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraints
        WHERE conname = "usuario_account_status_check"
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

--6
CREATE INDEX IF NOT EXISTS idx_usuarios_account_active
    ON public.usuarios (id_auth)
    WHERE account_status = 'active';

COMMIT;