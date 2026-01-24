-- Normalize support agent schedule defaults to Ecuador time.

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
