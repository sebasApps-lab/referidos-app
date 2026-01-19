do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'usuarios'
      and column_name = 'emailConfirmado'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'usuarios'
      and column_name = 'email_verificado'
  ) then
    alter table public.usuarios rename column "emailConfirmado" to email_verificado;
  end if;
end $$;

create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
declare
  new_id text;
  role text;
  nombre_meta text;
  telefono_meta text;
begin
  role := coalesce(new.raw_user_meta_data->>'role', 'cliente');
  nombre_meta := coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email,'@',1));
  telefono_meta := coalesce(new.raw_user_meta_data->>'telefono', new.phone, '');
  new_id := coalesce(new.raw_user_meta_data->>'id', 'USR_' || substr(md5(new.id::text), 1, 12));

  insert into usuarios (
    id, id_auth, email, telefono, nombre, apellido, role, email_verificado
  ) values (
    new_id,
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

create or replace function public.sync_auth_user_to_usuarios()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
begin
  update usuarios
  set email_verificado = (new.email_confirmed_at is not null)
  where id_auth = new.id;
  return new;
end $$;

drop policy if exists qr_insert_by_client on public.qr_validos;
create policy qr_insert_by_client on public.qr_validos
  for insert to authenticated
  with check (
    exists (
      select 1
      from usuarios u
      where u.id = clienteId
        and u.id_auth = auth.uid()
        and u.email_verificado = true
    )
  );

drop policy if exists coment_insert_by_client on public.comentarios;
create policy coment_insert_by_client on public.comentarios
  for insert to authenticated
  with check (
    exists (
      select 1
      from usuarios u
      where u.id = clienteId
        and u.id_auth = auth.uid()
        and u.email_verificado = true
    )
  );
