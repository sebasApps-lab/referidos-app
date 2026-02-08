-- Normalize support agent timezone defaults and fix agent event enum casting.

alter table public.support_agent_profiles
  alter column authorized_from
  set default (
    (date_trunc('day', now() at time zone 'America/Guayaquil') + interval '8 hours')
    at time zone 'America/Guayaquil'
  );

update public.support_agent_profiles
set authorized_from = authorized_from + interval '5 hours'
where authorized_from is not null
  and extract(hour from authorized_from at time zone 'UTC') = 8
  and extract(minute from authorized_from) = 0;

create or replace function public.log_support_agent_profile_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
  declare
  actor_usuario_id uuid;
begin
  select id into actor_usuario_id
  from public.usuarios
  where id_auth = auth.uid()
  limit 1;

  if new.authorized_for_work is distinct from old.authorized_for_work then
    insert into public.support_agent_events (agent_id, event_type, actor_id, details)
    values (
      new.user_id,
      case
        when new.authorized_for_work then 'agent_authorized'::public.support_event_type
        else 'agent_revoked'::public.support_event_type
      end,
      actor_usuario_id,
      jsonb_build_object('authorized_for_work', new.authorized_for_work)
    );
  end if;

  if new.blocked is distinct from old.blocked then
    insert into public.support_agent_events (agent_id, event_type, actor_id, details)
    values (
      new.user_id,
      case
        when new.blocked then 'agent_revoked'::public.support_event_type
        else 'agent_authorized'::public.support_event_type
      end,
      actor_usuario_id,
      jsonb_build_object('blocked', new.blocked, 'blocked_reason', new.blocked_reason)
    );
  end if;

  return new;
end;
$$;
