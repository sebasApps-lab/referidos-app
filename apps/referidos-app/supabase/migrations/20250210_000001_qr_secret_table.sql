-- ============================================
-- Secreto para QR sin SUPERUSER: tabla privada + setter seguro
-- ============================================

-- Esquema privado
create schema if not exists app_private;

-- Tabla singleton para el secreto
create table if not exists app_private.qr_secrets (
  id int primary key default 1 check (id = 1),
  secret text not null,
  updated_at timestamptz not null default now()
);

-- Fila inicial placeholder (obligatorio tener una fila)
insert into app_private.qr_secrets (id, secret)
values (1, 'SET_ME')
on conflict (id) do nothing;

-- Permisos: nadie externo puede leer; solo roles altos
revoke all on schema app_private from public, authenticated, anon;
revoke all on all tables in schema app_private from public, authenticated, anon;
grant usage on schema app_private to supabase_admin, postgres;
grant select, update on app_private.qr_secrets to supabase_admin, postgres;

-- Setter seguro (solo supabase_admin/postgres)
create or replace function public.set_qr_secret(p_secret text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_secret is null or length(p_secret) < 24 then
    raise exception 'El secreto debe tener al menos 24 caracteres';
  end if;

  update app_private.qr_secrets
    set secret = p_secret, updated_at = now()
    where id = 1;

  if not found then
    insert into app_private.qr_secrets(id, secret)
    values (1, p_secret);
  end if;
end;
$$;

revoke all on function public.set_qr_secret(text) from public, authenticated, anon;
grant execute on function public.set_qr_secret(text) to supabase_admin, postgres;

-- Reemplazar sign_qr para leer el secreto desde la tabla privada (fallback opcional al GUC)
create or replace function public.sign_qr(payload text, length int default 8)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  secret text;
  sig text;
begin
  select qs.secret into secret
  from app_private.qr_secrets qs
  where qs.id = 1;

  if (secret is null or secret = '') then
    secret := current_setting('app.qr_secret', true);
  end if;

  if secret is null or secret = '' then
    raise exception 'QR secret no configurado. Usa set_qr_secret(...) con supabase_admin.';
  end if;

  sig := public.base64url_encode(extensions.hmac(payload::bytea, secret::bytea, 'sha256'));
  sig := regexp_replace(sig, '=', '', 'g');
  return substr(sig, 1, length);
end;
$$;
