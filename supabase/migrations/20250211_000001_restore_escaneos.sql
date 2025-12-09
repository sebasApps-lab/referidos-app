-- ============================================
-- Restaurar tabla escaneos (estructura original)
-- Se eliminó en la limpieza de 20250209_000001_qr_hmac.sql
-- ============================================

create table if not exists public.escaneos (
  id uuid primary key default gen_random_uuid(),
  qrvalidoid uuid references public.qr_validos(id) on delete cascade,
  clienteid text references public.usuarios(id) on delete set null,
  fechacreacion timestamptz default now()
);

create index if not exists idx_escaneos_qrvalidoid on public.escaneos(qrvalidoid);

alter table public.escaneos enable row level security;

-- Política original: cliente dueño puede insertar su escaneo
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'escaneos'
      and policyname = 'escaneos_insert_by_client'
  ) then
    create policy escaneos_insert_by_client on public.escaneos
      for insert to authenticated
      with check (
        exists (
          select 1
          from public.qr_validos q
          join public.usuarios u on u.id = q.cliente_id
          where q.id = escaneos.qrvalidoid
            and u.id_auth = auth.uid()
        )
      );
  end if;
end$$;
