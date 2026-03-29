-- 20260304_000023_support_macros_ops_hub.sql
-- Catalogo central de macros/categorias de soporte en OPS.

begin;

create extension if not exists "pgcrypto" with schema extensions;

create table if not exists public.support_macro_categories (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  code text not null check (length(trim(code)) > 0),
  label text not null check (length(trim(label)) > 0),
  description text,
  app_targets text[] not null default '{all}'::text[]
    check (
      cardinality(app_targets) > 0
      and app_targets <@ array['all', 'referidos_app', 'prelaunch_web', 'android_app']::text[]
    ),
  sort_order integer not null default 100,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create index if not exists idx_support_macro_categories_tenant_status
  on public.support_macro_categories (tenant_id, status, sort_order, created_at desc);

drop trigger if exists trg_support_macro_categories_touch_updated_at on public.support_macro_categories;
create trigger trg_support_macro_categories_touch_updated_at
before update on public.support_macro_categories
for each row execute function public.touch_updated_at();

create table if not exists public.support_macros (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  category_id uuid references public.support_macro_categories(id) on delete set null,
  code text not null check (length(trim(code)) > 0),
  title text not null check (length(trim(title)) > 0),
  body text not null check (length(trim(body)) > 0),
  thread_status text
    check (
      thread_status is null
      or thread_status in ('new', 'assigned', 'in_progress', 'waiting_user', 'queued', 'closed', 'cancelled')
    ),
  audience_roles text[] not null default '{cliente,negocio}'::text[]
    check (
      cardinality(audience_roles) > 0
      and audience_roles <@ array['cliente', 'negocio', 'soporte', 'admin']::text[]
    ),
  app_targets text[] not null default '{all}'::text[]
    check (
      cardinality(app_targets) > 0
      and app_targets <@ array['all', 'referidos_app', 'prelaunch_web', 'android_app']::text[]
    ),
  env_targets text[] not null default '{all}'::text[]
    check (
      cardinality(env_targets) > 0
      and env_targets <@ array['all', 'dev', 'staging', 'prod']::text[]
    ),
  sort_order integer not null default 100,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create index if not exists idx_support_macros_tenant_status
  on public.support_macros (tenant_id, status, sort_order, created_at desc);

create index if not exists idx_support_macros_tenant_category
  on public.support_macros (tenant_id, category_id, created_at desc);

drop trigger if exists trg_support_macros_touch_updated_at on public.support_macros;
create trigger trg_support_macros_touch_updated_at
before update on public.support_macros
for each row execute function public.touch_updated_at();

create or replace function public.trg_support_macros_validate_category_tenant()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_category_tenant_id uuid;
begin
  if new.category_id is null then
    return new;
  end if;

  select c.tenant_id
    into v_category_tenant_id
  from public.support_macro_categories c
  where c.id = new.category_id
  limit 1;

  if v_category_tenant_id is null then
    raise exception 'support_macros.category_id no existe';
  end if;

  if new.tenant_id <> v_category_tenant_id then
    raise exception 'support_macros.category_id no pertenece al mismo tenant';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_support_macros_validate_category_tenant on public.support_macros;
create trigger trg_support_macros_validate_category_tenant
before insert or update of tenant_id, category_id on public.support_macros
for each row execute function public.trg_support_macros_validate_category_tenant();

create table if not exists public.support_macro_change_log (
  seq bigint generated always as identity primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  entity_type text not null check (entity_type in ('category', 'macro')),
  entity_id uuid not null,
  op text not null check (op in ('upsert', 'delete')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_support_macro_change_log_tenant_seq
  on public.support_macro_change_log (tenant_id, seq);

create index if not exists idx_support_macro_change_log_created
  on public.support_macro_change_log (created_at desc);

create or replace function public.trg_support_macro_categories_change_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    insert into public.support_macro_change_log (
      tenant_id,
      entity_type,
      entity_id,
      op,
      payload
    )
    values (
      old.tenant_id,
      'category',
      old.id,
      'delete',
      jsonb_build_object(
        'id', old.id,
        'tenant_id', old.tenant_id
      )
    );
    return old;
  end if;

  insert into public.support_macro_change_log (
    tenant_id,
    entity_type,
    entity_id,
    op,
    payload
  )
  values (
    new.tenant_id,
    'category',
    new.id,
    'upsert',
    jsonb_strip_nulls(
      jsonb_build_object(
        'id', new.id,
        'tenant_id', new.tenant_id,
        'code', new.code,
        'label', new.label,
        'description', new.description,
        'app_targets', new.app_targets,
        'sort_order', new.sort_order,
        'status', new.status,
        'metadata', new.metadata,
        'updated_at', new.updated_at,
        'created_at', new.created_at
      )
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_support_macro_categories_change_log on public.support_macro_categories;
create trigger trg_support_macro_categories_change_log
after insert or update or delete on public.support_macro_categories
for each row execute function public.trg_support_macro_categories_change_log();

create or replace function public.trg_support_macros_change_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_category_code text;
begin
  if tg_op = 'DELETE' then
    insert into public.support_macro_change_log (
      tenant_id,
      entity_type,
      entity_id,
      op,
      payload
    )
    values (
      old.tenant_id,
      'macro',
      old.id,
      'delete',
      jsonb_build_object(
        'id', old.id,
        'tenant_id', old.tenant_id
      )
    );
    return old;
  end if;

  if new.category_id is not null then
    select c.code
      into v_category_code
    from public.support_macro_categories c
    where c.id = new.category_id
    limit 1;
  else
    v_category_code := null;
  end if;

  insert into public.support_macro_change_log (
    tenant_id,
    entity_type,
    entity_id,
    op,
    payload
  )
  values (
    new.tenant_id,
    'macro',
    new.id,
    'upsert',
    jsonb_strip_nulls(
      jsonb_build_object(
        'id', new.id,
        'tenant_id', new.tenant_id,
        'category_id', new.category_id,
        'category_code', v_category_code,
        'code', new.code,
        'title', new.title,
        'body', new.body,
        'thread_status', new.thread_status,
        'audience_roles', new.audience_roles,
        'app_targets', new.app_targets,
        'env_targets', new.env_targets,
        'sort_order', new.sort_order,
        'status', new.status,
        'metadata', new.metadata,
        'updated_at', new.updated_at,
        'created_at', new.created_at
      )
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_support_macros_change_log on public.support_macros;
create trigger trg_support_macros_change_log
after insert or update or delete on public.support_macros
for each row execute function public.trg_support_macros_change_log();

create or replace function public.support_macro_default_tenant_id(
  p_tenant_name text default 'ReferidosAPP'
)
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
begin
  select t.id
    into v_tenant_id
  from public.tenants t
  where lower(t.name) = lower(coalesce(trim(p_tenant_name), ''))
  order by t.created_at asc
  limit 1;

  if v_tenant_id is null then
    select t.id
      into v_tenant_id
    from public.tenants t
    order by t.created_at asc
    limit 1;
  end if;

  return v_tenant_id;
end;
$$;

grant execute on function public.support_macro_default_tenant_id(text) to authenticated;
grant execute on function public.support_macro_default_tenant_id(text) to service_role;

grant select on public.support_macro_categories to authenticated;
grant select on public.support_macros to authenticated;
grant select on public.support_macro_change_log to authenticated;

grant select, insert, update, delete on public.support_macro_categories to service_role;
grant select, insert, update, delete on public.support_macros to service_role;
grant select, insert, update, delete on public.support_macro_change_log to service_role;

alter table public.support_macro_categories enable row level security;
alter table public.support_macros enable row level security;
alter table public.support_macro_change_log enable row level security;

drop policy if exists support_macro_categories_select_support_admin on public.support_macro_categories;
create policy support_macro_categories_select_support_admin
  on public.support_macro_categories
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists support_macro_categories_admin_manage on public.support_macro_categories;
create policy support_macro_categories_admin_manage
  on public.support_macro_categories
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

drop policy if exists support_macros_select_support_admin on public.support_macros;
create policy support_macros_select_support_admin
  on public.support_macros
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists support_macros_admin_manage on public.support_macros;
create policy support_macros_admin_manage
  on public.support_macros
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

drop policy if exists support_macro_change_log_select_admin on public.support_macro_change_log;
create policy support_macro_change_log_select_admin
  on public.support_macro_change_log
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

with target_tenant as (
  select public.support_macro_default_tenant_id('ReferidosAPP') as tenant_id
)
insert into public.support_macro_categories (
  tenant_id,
  code,
  label,
  description,
  app_targets,
  sort_order,
  status,
  metadata,
  created_by,
  updated_by
)
select
  t.tenant_id,
  seed.code,
  seed.label,
  seed.description,
  seed.app_targets,
  seed.sort_order,
  'published',
  '{}'::jsonb,
  'migration:20260304_000023',
  'migration:20260304_000023'
from target_tenant t
join (
  values
    ('acceso', 'Acceso / Cuenta', 'Ingreso, contrasena o bloqueo.', '{all}'::text[], 10),
    ('verificacion', 'Verificacion', 'Correo, telefono o estado de cuenta.', '{all}'::text[], 20),
    ('qr', 'QR / Escaner', 'Lectura o validacion de QR.', '{all}'::text[], 30),
    ('promos', 'Promociones', 'Aplicacion de promos o visibilidad.', '{all}'::text[], 40),
    ('negocios_sucursales', 'Negocios / Sucursales', 'Datos de negocio, direcciones u horarios.', '{referidos_app,android_app}'::text[], 50),
    ('pagos_plan', 'Pagos / Plan', 'Facturacion, plan o upgrades.', '{referidos_app,android_app}'::text[], 60),
    ('tier_beneficios', 'Tier / Beneficios', 'Progreso, beneficios y referidos.', '{referidos_app,android_app}'::text[], 70),
    ('reporte_abuso', 'Reporte de abuso', 'Contenido indebido o fraude.', '{all}'::text[], 80),
    ('bug_performance', 'Bug / Rendimiento', 'Errores o lentitud.', '{all}'::text[], 90),
    ('sugerencia', 'Sugerencia', 'Mejoras o nuevas funciones.', '{all}'::text[], 100)
) as seed(code, label, description, app_targets, sort_order)
  on true
where t.tenant_id is not null
on conflict (tenant_id, code) do update
set
  label = excluded.label,
  description = excluded.description,
  app_targets = excluded.app_targets,
  sort_order = excluded.sort_order,
  updated_by = excluded.updated_by,
  updated_at = now();

commit;
