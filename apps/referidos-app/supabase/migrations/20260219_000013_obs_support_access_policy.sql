-- 20260217_000013_obs_support_access_policy.sql
-- Ajusta acceso de soporte a logs unificados por thread_id para casos anonimos.

begin;

create or replace function public.obs_support_can_access_thread(p_thread_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.support_threads t
    join public.usuarios u on u.id_auth = auth.uid()
    where t.id = p_thread_id
      and u.role = 'soporte'
      and (
        t.assigned_agent_id = u.id
        or t.created_by_agent_id = u.id
        or (t.status = 'new' and t.assigned_agent_id is null)
      )
  );
$$;

grant execute on function public.obs_support_can_access_thread(uuid) to authenticated;

drop policy if exists obs_events_select_admin_support on public.obs_events;
create policy obs_events_select_admin_support
  on public.obs_events
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (
      public.obs_is_admin()
      or (
        public.obs_is_support()
        and (
          (user_id is not null and public.obs_support_can_access_user(user_id))
          or (
            event_domain = 'support'
            and support_thread_id is not null
            and public.obs_support_can_access_thread(support_thread_id)
          )
        )
      )
    )
  );

commit;
