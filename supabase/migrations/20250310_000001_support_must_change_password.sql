alter table public.usuarios
  add column if not exists must_change_password boolean default false;

do $$
begin
  begin
    alter type public.support_thread_status add value 'cancelled';
  exception
    when duplicate_object then null;
  end;
  begin
    alter type public.support_event_type add value 'cancelled';
  exception
    when duplicate_object then null;
  end;
end $$;

alter table public.support_threads
  add column if not exists cancelled_at timestamptz,
  add column if not exists cancelled_by text references public.usuarios(id) on delete set null;

-- ------------------------------------------------------------
-- UUID migration for core entities
-- ------------------------------------------------------------
create extension if not exists "uuid-ossp";

create or replace function public.text_to_uuid(p_text text)
returns uuid
language sql
immutable
as $$
  select case
    when p_text ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      then p_text::uuid
    else (
      substr(md5(p_text), 1, 8) || '-' ||
      substr(md5(p_text), 9, 4) || '-' ||
      substr(md5(p_text), 13, 4) || '-' ||
      substr(md5(p_text), 17, 4) || '-' ||
      substr(md5(p_text), 21, 12)
    )::uuid
  end;
$$;

create or replace function public.drop_fk_constraint(p_table text, p_column text)
returns void
language plpgsql
as $$
declare
  rec record;
begin
  for rec in
    select c.conname
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = p_table
      and c.contype = 'f'
      and exists (
        select 1
        from unnest(c.conkey) as k(attnum)
        join pg_attribute a on a.attrelid = t.oid and a.attnum = k.attnum
        where a.attname = p_column
      )
  loop
    execute format('alter table public.%I drop constraint %I', p_table, rec.conname);
  end loop;
end;
$$;

-- ------------------------------------------------------------
-- Cache and drop policies before altering column types
-- ------------------------------------------------------------
create temp table if not exists policy_cache (
  policy_sql text not null
);

do $$
declare
  p record;
  roles_list text;
  using_clause text;
  check_clause text;
begin
  for p in
    select * from pg_policies where schemaname = 'public'
  loop
    if p.roles is null or array_length(p.roles, 1) is null then
      roles_list := 'public';
    else
      select string_agg(quote_ident(r), ', ') into roles_list
      from unnest(p.roles) as r;
    end if;

    using_clause := case when p.qual is null then '' else format(' using (%s)', p.qual) end;
    check_clause := case when p.with_check is null then '' else format(' with check (%s)', p.with_check) end;

    insert into policy_cache(policy_sql)
    values (
      format(
        'create policy %I on %I.%I as %s for %s to %s%s%s',
        p.policyname,
        p.schemaname,
        p.tablename,
        case
          when p.permissive in ('PERMISSIVE','permissive','t','true','TRUE') then 'permissive'
          else 'restrictive'
        end,
        p.cmd,
        roles_list,
        using_clause,
        check_clause
      )
    );

    execute format('drop policy if exists %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- ------------------------------------------------------------
-- Cache and drop views before altering column types
-- ------------------------------------------------------------
create temp table if not exists view_cache (
  view_sql text not null
);

do $$
declare
  v record;
  view_def text;
  invoker_clause text;
begin
  for v in
    select c.oid, n.nspname, c.relname, c.reloptions
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'v'
  loop
    view_def := pg_get_viewdef(v.oid, true);
  invoker_clause := '';
  if v.reloptions is not null and v.reloptions @> array['security_invoker=true'] then
    invoker_clause := ' with (security_invoker=true)';
  end if;
    insert into view_cache(view_sql)
    values (
      format('create or replace view %I.%I%s as %s', v.nspname, v.relname, invoker_clause, view_def)
    );
    execute format('drop view if exists %I.%I', v.nspname, v.relname);
  end loop;
end $$;

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'negocios' and column_name = 'usuarioid') then
    perform public.drop_fk_constraint('negocios', 'usuarioid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'negocios' and column_name = 'direccion_id') then
    perform public.drop_fk_constraint('negocios', 'direccion_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'sucursales' and column_name = 'negocioid') then
    perform public.drop_fk_constraint('sucursales', 'negocioid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'sucursales' and column_name = 'direccion_id') then
    perform public.drop_fk_constraint('sucursales', 'direccion_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos' and column_name = 'negocioid') then
    perform public.drop_fk_constraint('promos', 'negocioid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos_sucursales' and column_name = 'promoid') then
    perform public.drop_fk_constraint('promos_sucursales', 'promoid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos_sucursales' and column_name = 'sucursalid') then
    perform public.drop_fk_constraint('promos_sucursales', 'sucursalid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'promo_id') then
    perform public.drop_fk_constraint('qr_validos', 'promo_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'negocio_id') then
    perform public.drop_fk_constraint('qr_validos', 'negocio_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'cliente_id') then
    perform public.drop_fk_constraint('qr_validos', 'cliente_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'redeemed_by') then
    perform public.drop_fk_constraint('qr_validos', 'redeemed_by');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'escaneos' and column_name = 'qrvalidoid') then
    perform public.drop_fk_constraint('escaneos', 'qrvalidoid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'escaneos' and column_name = 'clienteid') then
    perform public.drop_fk_constraint('escaneos', 'clienteid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'comentarios' and column_name = 'promoid') then
    perform public.drop_fk_constraint('comentarios', 'promoid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'comentarios' and column_name = 'clienteid') then
    perform public.drop_fk_constraint('comentarios', 'clienteid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'reportes' and column_name = 'reporterid') then
    perform public.drop_fk_constraint('reportes', 'reporterid');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'codigos_registro' and column_name = 'used_by_user_id') then
    perform public.drop_fk_constraint('codigos_registro', 'used_by_user_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'codigos_registro' and column_name = 'created_by') then
    perform public.drop_fk_constraint('codigos_registro', 'created_by');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'usuarios' and column_name = 'direccion_id') then
    perform public.drop_fk_constraint('usuarios', 'direccion_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'direcciones' and column_name = 'owner_id') then
    perform public.drop_fk_constraint('direcciones', 'owner_id');
  end if;
end $$;

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'referrer_id') then
    perform public.drop_fk_constraint('grupos', 'referrer_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'negocio_id') then
    perform public.drop_fk_constraint('grupos', 'negocio_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'promo_id') then
    perform public.drop_fk_constraint('grupos', 'promo_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'miembros' and column_name = 'cliente_id') then
    perform public.drop_fk_constraint('miembros', 'cliente_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupo_canjeos' and column_name = 'cliente_id') then
    perform public.drop_fk_constraint('grupo_canjeos', 'cliente_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupo_canjeos' and column_name = 'qr_valido_id') then
    perform public.drop_fk_constraint('grupo_canjeos', 'qr_valido_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'referrals' and column_name = 'referrer_id') then
    perform public.drop_fk_constraint('referrals', 'referrer_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'referrals' and column_name = 'referred_id') then
    perform public.drop_fk_constraint('referrals', 'referred_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'points_ledger' and column_name = 'user_id') then
    perform public.drop_fk_constraint('points_ledger', 'user_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'user_rank_state' and column_name = 'user_id') then
    perform public.drop_fk_constraint('user_rank_state', 'user_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'user_id') then
    perform public.drop_fk_constraint('support_threads', 'user_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'assigned_agent_id') then
    perform public.drop_fk_constraint('support_threads', 'assigned_agent_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'created_by_user_id') then
    perform public.drop_fk_constraint('support_threads', 'created_by_user_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'created_by_agent_id') then
    perform public.drop_fk_constraint('support_threads', 'created_by_agent_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'cancelled_by') then
    perform public.drop_fk_constraint('support_threads', 'cancelled_by');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_thread_notes' and column_name = 'author_id') then
    perform public.drop_fk_constraint('support_thread_notes', 'author_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_profiles' and column_name = 'user_id') then
    perform public.drop_fk_constraint('support_agent_profiles', 'user_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_sessions' and column_name = 'agent_id') then
    perform public.drop_fk_constraint('support_agent_sessions', 'agent_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_sessions' and column_name = 'authorized_by') then
    perform public.drop_fk_constraint('support_agent_sessions', 'authorized_by');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_events' and column_name = 'agent_id') then
    perform public.drop_fk_constraint('support_agent_events', 'agent_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_user_logs' and column_name = 'user_id') then
    perform public.drop_fk_constraint('support_user_logs', 'user_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'verificacion_negocio' and column_name = 'negocio_id') then
    perform public.drop_fk_constraint('verificacion_negocio', 'negocio_id');
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'flags_confianza' and column_name = 'negocio_id') then
    perform public.drop_fk_constraint('flags_confianza', 'negocio_id');
  end if;
end $$;

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'usuarios' and column_name = 'id' and data_type = 'text') then
    alter table public.usuarios
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'usuarios' and column_name = 'direccion_id' and data_type = 'text') then
    alter table public.usuarios
      alter column direccion_id type uuid using public.text_to_uuid(direccion_id);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'negocios' and column_name = 'id' and data_type = 'text') then
    alter table public.negocios
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'negocios' and column_name = 'usuarioid' and data_type = 'text') then
    alter table public.negocios
      alter column usuarioid type uuid using public.text_to_uuid(usuarioid);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'negocios' and column_name = 'direccion_id' and data_type = 'text') then
    alter table public.negocios
      alter column direccion_id type uuid using public.text_to_uuid(direccion_id);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'sucursales' and column_name = 'id' and data_type = 'text') then
    alter table public.sucursales
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'sucursales' and column_name = 'negocioid' and data_type = 'text') then
    alter table public.sucursales
      alter column negocioid type uuid using public.text_to_uuid(negocioid);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'sucursales' and column_name = 'direccion_id' and data_type = 'text') then
    alter table public.sucursales
      alter column direccion_id type uuid using public.text_to_uuid(direccion_id);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos' and column_name = 'id' and data_type = 'text') then
    alter table public.promos
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos' and column_name = 'negocioid' and data_type = 'text') then
    alter table public.promos
      alter column negocioid type uuid using public.text_to_uuid(negocioid);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos_sucursales' and column_name = 'promoid' and data_type = 'text') then
    alter table public.promos_sucursales
      alter column promoid type uuid using public.text_to_uuid(promoid);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos_sucursales' and column_name = 'sucursalid' and data_type = 'text') then
    alter table public.promos_sucursales
      alter column sucursalid type uuid using public.text_to_uuid(sucursalid);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'id' and data_type = 'text') then
    alter table public.qr_validos
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'promo_id' and data_type = 'text') then
    alter table public.qr_validos
      alter column promo_id type uuid using public.text_to_uuid(promo_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'negocio_id' and data_type = 'text') then
    alter table public.qr_validos
      alter column negocio_id type uuid using public.text_to_uuid(negocio_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'cliente_id' and data_type = 'text') then
    alter table public.qr_validos
      alter column cliente_id type uuid using public.text_to_uuid(cliente_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'redeemed_by' and data_type = 'text') then
    alter table public.qr_validos
      alter column redeemed_by type uuid using public.text_to_uuid(redeemed_by);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'escaneos' and column_name = 'clienteid' and data_type = 'text') then
    alter table public.escaneos
      alter column clienteid type uuid using public.text_to_uuid(clienteid);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'comentarios' and column_name = 'id' and data_type = 'text') then
    alter table public.comentarios
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'comentarios' and column_name = 'promoid' and data_type = 'text') then
    alter table public.comentarios
      alter column promoid type uuid using public.text_to_uuid(promoid);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'comentarios' and column_name = 'clienteid' and data_type = 'text') then
    alter table public.comentarios
      alter column clienteid type uuid using public.text_to_uuid(clienteid);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'reportes' and column_name = 'id' and data_type = 'text') then
    alter table public.reportes
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'reportes' and column_name = 'reporterid' and data_type = 'text') then
    alter table public.reportes
      alter column reporterid type uuid using public.text_to_uuid(reporterid);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'direcciones' and column_name = 'id' and data_type = 'text') then
    alter table public.direcciones
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'direcciones' and column_name = 'owner_id' and data_type = 'text') then
    alter table public.direcciones
      alter column owner_id type uuid using public.text_to_uuid(owner_id);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'codigos_registro' and column_name = 'id' and data_type = 'text') then
    alter table public.codigos_registro
      alter column id drop default,
      alter column id type uuid using public.text_to_uuid(id),
      alter column id set default gen_random_uuid();
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'codigos_registro' and column_name = 'used_by_user_id' and data_type = 'text') then
    alter table public.codigos_registro
      alter column used_by_user_id type uuid using public.text_to_uuid(used_by_user_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'codigos_registro' and column_name = 'created_by' and data_type = 'text') then
    alter table public.codigos_registro
      alter column created_by type uuid using public.text_to_uuid(created_by);
  end if;
end $$;

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'points_ledger' and column_name = 'user_id' and data_type = 'text') then
    alter table public.points_ledger
      alter column user_id type uuid using public.text_to_uuid(user_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'user_rank_state' and column_name = 'user_id' and data_type = 'text') then
    alter table public.user_rank_state
      alter column user_id type uuid using public.text_to_uuid(user_id);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'referrer_id' and data_type = 'text') then
    alter table public.grupos
      alter column referrer_id type uuid using public.text_to_uuid(referrer_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'negocio_id' and data_type = 'text') then
    alter table public.grupos
      alter column negocio_id type uuid using public.text_to_uuid(negocio_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'promo_id' and data_type = 'text') then
    alter table public.grupos
      alter column promo_id type uuid using public.text_to_uuid(promo_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'miembros' and column_name = 'cliente_id' and data_type = 'text') then
    alter table public.miembros
      alter column cliente_id type uuid using public.text_to_uuid(cliente_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupo_canjeos' and column_name = 'cliente_id' and data_type = 'text') then
    alter table public.grupo_canjeos
      alter column cliente_id type uuid using public.text_to_uuid(cliente_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'referrals' and column_name = 'referrer_id' and data_type = 'text') then
    alter table public.referrals
      alter column referrer_id type uuid using public.text_to_uuid(referrer_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'referrals' and column_name = 'referred_id' and data_type = 'text') then
    alter table public.referrals
      alter column referred_id type uuid using public.text_to_uuid(referred_id);
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'user_id' and data_type = 'text') then
    alter table public.support_threads
      alter column user_id type uuid using public.text_to_uuid(user_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'assigned_agent_id' and data_type = 'text') then
    alter table public.support_threads
      alter column assigned_agent_id type uuid using public.text_to_uuid(assigned_agent_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'created_by_user_id' and data_type = 'text') then
    alter table public.support_threads
      alter column created_by_user_id type uuid using public.text_to_uuid(created_by_user_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'created_by_agent_id' and data_type = 'text') then
    alter table public.support_threads
      alter column created_by_agent_id type uuid using public.text_to_uuid(created_by_agent_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'cancelled_by' and data_type = 'text') then
    alter table public.support_threads
      alter column cancelled_by type uuid using public.text_to_uuid(cancelled_by);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_thread_notes' and column_name = 'author_id' and data_type = 'text') then
    alter table public.support_thread_notes
      alter column author_id type uuid using public.text_to_uuid(author_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_thread_events' and column_name = 'actor_id' and data_type = 'text') then
    alter table public.support_thread_events
      alter column actor_id type uuid using public.text_to_uuid(actor_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_profiles' and column_name = 'user_id' and data_type = 'text') then
    alter table public.support_agent_profiles
      alter column user_id type uuid using public.text_to_uuid(user_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_sessions' and column_name = 'agent_id' and data_type = 'text') then
    alter table public.support_agent_sessions
      alter column agent_id type uuid using public.text_to_uuid(agent_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_sessions' and column_name = 'authorized_by' and data_type = 'text') then
    alter table public.support_agent_sessions
      alter column authorized_by type uuid using public.text_to_uuid(authorized_by);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_events' and column_name = 'agent_id' and data_type = 'text') then
    alter table public.support_agent_events
      alter column agent_id type uuid using public.text_to_uuid(agent_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_events' and column_name = 'actor_id' and data_type = 'text') then
    alter table public.support_agent_events
      alter column actor_id type uuid using public.text_to_uuid(actor_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_user_logs' and column_name = 'user_id' and data_type = 'text') then
    alter table public.support_user_logs
      alter column user_id type uuid using public.text_to_uuid(user_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_user_logs' and column_name = 'thread_id' and data_type = 'text') then
    alter table public.support_user_logs
      alter column thread_id type uuid using public.text_to_uuid(thread_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'verificacion_negocio' and column_name = 'negocio_id' and data_type = 'text') then
    alter table public.verificacion_negocio
      alter column negocio_id type uuid using public.text_to_uuid(negocio_id);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'flags_confianza' and column_name = 'negocio_id' and data_type = 'text') then
    alter table public.flags_confianza
      alter column negocio_id type uuid using public.text_to_uuid(negocio_id);
  end if;
end $$;

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'negocios' and column_name = 'usuarioid') then
    alter table public.negocios
      add constraint negocios_usuarioid_fkey foreign key (usuarioid)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'sucursales' and column_name = 'negocioid') then
    alter table public.sucursales
      add constraint sucursales_negocioid_fkey foreign key (negocioid)
      references public.negocios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'sucursales' and column_name = 'direccion_id') then
    alter table public.sucursales
      add constraint sucursales_direccion_id_fkey foreign key (direccion_id)
      references public.direcciones(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos' and column_name = 'negocioid') then
    alter table public.promos
      add constraint promos_negocioid_fkey foreign key (negocioid)
      references public.negocios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos_sucursales' and column_name = 'promoid') then
    alter table public.promos_sucursales
      add constraint promos_sucursales_promoid_fkey foreign key (promoid)
      references public.promos(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'promos_sucursales' and column_name = 'sucursalid') then
    alter table public.promos_sucursales
      add constraint promos_sucursales_sucursalid_fkey foreign key (sucursalid)
      references public.sucursales(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'promo_id') then
    alter table public.qr_validos
      add constraint qr_validos_promo_id_fkey foreign key (promo_id)
      references public.promos(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'negocio_id') then
    alter table public.qr_validos
      add constraint qr_validos_negocio_id_fkey foreign key (negocio_id)
      references public.negocios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'cliente_id') then
    alter table public.qr_validos
      add constraint qr_validos_cliente_id_fkey foreign key (cliente_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'qr_validos' and column_name = 'redeemed_by') then
    alter table public.qr_validos
      add constraint qr_validos_redeemed_by_fkey foreign key (redeemed_by)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'escaneos' and column_name = 'qrvalidoid') then
    alter table public.escaneos
      add constraint escaneos_qrvalidoid_fkey foreign key (qrvalidoid)
      references public.qr_validos(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'escaneos' and column_name = 'clienteid') then
    alter table public.escaneos
      add constraint escaneos_clienteid_fkey foreign key (clienteid)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'comentarios' and column_name = 'promoid') then
    alter table public.comentarios
      add constraint comentarios_promoid_fkey foreign key (promoid)
      references public.promos(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'comentarios' and column_name = 'clienteid') then
    alter table public.comentarios
      add constraint comentarios_clienteid_fkey foreign key (clienteid)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'reportes' and column_name = 'reporterid') then
    alter table public.reportes
      add constraint reportes_reporterid_fkey foreign key (reporterid)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'codigos_registro' and column_name = 'used_by_user_id') then
    alter table public.codigos_registro
      add constraint codigos_registro_used_by_user_id_fkey foreign key (used_by_user_id)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'codigos_registro' and column_name = 'created_by') then
    alter table public.codigos_registro
      add constraint codigos_registro_created_by_fkey foreign key (created_by)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'usuarios' and column_name = 'direccion_id') then
    alter table public.usuarios
      add constraint usuarios_direccion_id_fkey foreign key (direccion_id)
      references public.direcciones(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'direcciones' and column_name = 'owner_id') then
    alter table public.direcciones
      add constraint direcciones_owner_id_fkey foreign key (owner_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'referrer_id') then
    alter table public.grupos
      add constraint grupos_referrer_id_fkey foreign key (referrer_id)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'negocio_id') then
    alter table public.grupos
      add constraint grupos_negocio_id_fkey foreign key (negocio_id)
      references public.negocios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupos' and column_name = 'promo_id') then
    alter table public.grupos
      add constraint grupos_promo_id_fkey foreign key (promo_id)
      references public.promos(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'miembros' and column_name = 'cliente_id') then
    alter table public.miembros
      add constraint miembros_cliente_id_fkey foreign key (cliente_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupo_canjeos' and column_name = 'cliente_id') then
    alter table public.grupo_canjeos
      add constraint grupo_canjeos_cliente_id_fkey foreign key (cliente_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'grupo_canjeos' and column_name = 'qr_valido_id') then
    alter table public.grupo_canjeos
      add constraint grupo_canjeos_qr_valido_id_fkey foreign key (qr_valido_id)
      references public.qr_validos(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'referrals' and column_name = 'referrer_id') then
    alter table public.referrals
      add constraint referrals_referrer_id_fkey foreign key (referrer_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'referrals' and column_name = 'referred_id') then
    alter table public.referrals
      add constraint referrals_referred_id_fkey foreign key (referred_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'points_ledger' and column_name = 'user_id') then
    alter table public.points_ledger
      add constraint points_ledger_user_id_fkey foreign key (user_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'user_rank_state' and column_name = 'user_id') then
    alter table public.user_rank_state
      add constraint user_rank_state_user_id_fkey foreign key (user_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'user_id') then
    alter table public.support_threads
      add constraint support_threads_user_id_fkey foreign key (user_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'assigned_agent_id') then
    alter table public.support_threads
      add constraint support_threads_assigned_agent_id_fkey foreign key (assigned_agent_id)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'created_by_user_id') then
    alter table public.support_threads
      add constraint support_threads_created_by_user_id_fkey foreign key (created_by_user_id)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'created_by_agent_id') then
    alter table public.support_threads
      add constraint support_threads_created_by_agent_id_fkey foreign key (created_by_agent_id)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_threads' and column_name = 'cancelled_by') then
    alter table public.support_threads
      add constraint support_threads_cancelled_by_fkey foreign key (cancelled_by)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_thread_notes' and column_name = 'author_id') then
    alter table public.support_thread_notes
      add constraint support_thread_notes_author_id_fkey foreign key (author_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_profiles' and column_name = 'user_id') then
    alter table public.support_agent_profiles
      add constraint support_agent_profiles_user_id_fkey foreign key (user_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_sessions' and column_name = 'agent_id') then
    alter table public.support_agent_sessions
      add constraint support_agent_sessions_agent_id_fkey foreign key (agent_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_sessions' and column_name = 'authorized_by') then
    alter table public.support_agent_sessions
      add constraint support_agent_sessions_authorized_by_fkey foreign key (authorized_by)
      references public.usuarios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_agent_events' and column_name = 'agent_id') then
    alter table public.support_agent_events
      add constraint support_agent_events_agent_id_fkey foreign key (agent_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'support_user_logs' and column_name = 'user_id') then
    alter table public.support_user_logs
      add constraint support_user_logs_user_id_fkey foreign key (user_id)
      references public.usuarios(id) on delete cascade;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'verificacion_negocio' and column_name = 'negocio_id') then
    alter table public.verificacion_negocio
      add constraint verificacion_negocio_negocio_id_fkey foreign key (negocio_id)
      references public.negocios(id) on delete set null;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'flags_confianza' and column_name = 'negocio_id') then
    alter table public.flags_confianza
      add constraint flags_confianza_negocio_id_fkey foreign key (negocio_id)
      references public.negocios(id) on delete cascade;
  end if;
end $$;

-- ------------------------------------------------------------
-- Restore policies after type changes
-- ------------------------------------------------------------
do $$
declare
  r record;
begin
  for r in select policy_sql from policy_cache loop
    execute r.policy_sql;
  end loop;
end $$;

drop table if exists policy_cache;

do $$
declare
  v record;
begin
  for v in select view_sql from view_cache loop
    execute v.view_sql;
  end loop;
end $$;

drop table if exists view_cache;

drop function if exists public.current_usuario_id();

create or replace function public.current_usuario_id()
returns uuid
language sql
stable
as $$
  select u.id from public.usuarios u where u.id_auth = auth.uid();
$$;

create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
declare
  role text;
  nombre_meta text;
  telefono_meta text;
begin
  role := coalesce(new.raw_user_meta_data->>'role', 'cliente');
  nombre_meta := coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email,'@',1));
  telefono_meta := coalesce(new.raw_user_meta_data->>'telefono', new.phone, '');

  insert into usuarios (
    id, id_auth, email, telefono, nombre, apellido, role, email_verificado
  ) values (
    gen_random_uuid(),
    new.id,
    new.email,
    telefono_meta,
    nombre_meta,
    '',
    role,
    new.email_confirmed_at is not null
  ) on conflict (email) do update set
    id_auth = excluded.id_auth,
    telefono = excluded.telefono,
    nombre = excluded.nombre,
    role = excluded.role,
    email_verificado = excluded.email_verificado;

  return new;
end $$;

drop function if exists public.drop_fk_constraint(text, text);

