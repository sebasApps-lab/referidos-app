begin;

create table if not exists public.version_env_validations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid references public.version_products(id) on delete set null,
  env_id uuid references public.version_environments(id) on delete set null,
  status text not null default 'failed',
  summary text not null default '',
  details jsonb not null default '{}'::jsonb,
  validated_by text not null default 'system',
  validated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint version_env_validations_status_check check (status in ('ok', 'failed')),
  constraint version_env_validations_validated_by_not_empty check (length(trim(validated_by)) > 0)
);

create index if not exists idx_version_env_validations_tenant_env_created
  on public.version_env_validations (tenant_id, env_id, created_at desc);

create index if not exists idx_version_env_validations_tenant_product_created
  on public.version_env_validations (tenant_id, product_id, created_at desc);

create or replace view public.version_env_validations_labeled as
select
  v.id,
  v.tenant_id,
  p.product_key,
  p.name as product_name,
  e.env_key,
  e.name as env_name,
  v.status,
  v.summary,
  v.details,
  v.validated_by,
  v.validated_at,
  v.created_at
from public.version_env_validations v
left join public.version_products p on p.id = v.product_id
left join public.version_environments e on e.id = v.env_id;

alter view public.version_env_validations_labeled set (security_invoker = true);

grant select, insert, update, delete on public.version_env_validations to authenticated;
grant select, insert, update, delete on public.version_env_validations to service_role;
grant select on public.version_env_validations_labeled to authenticated;
grant select on public.version_env_validations_labeled to service_role;

alter table public.version_env_validations enable row level security;

drop policy if exists version_env_validations_admin_all on public.version_env_validations;
create policy version_env_validations_admin_all
  on public.version_env_validations
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

commit;

