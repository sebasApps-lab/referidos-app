-- ============================================
-- RLS para points_rules: solo admin
-- ============================================

alter table public.points_rules enable row level security;

drop policy if exists points_rules_admin_select on public.points_rules;
create policy points_rules_admin_select on public.points_rules
  for select to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = auth.uid()
        and u.role = 'admin'
    )
  );

-- Sin policies de write: se bloquea insert/update/delete desde el cliente.
-- Los cambios se deben hacer via RPC security definer.
