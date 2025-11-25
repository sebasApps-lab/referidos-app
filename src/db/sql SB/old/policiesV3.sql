------------------------------------------------------
-- HABILITAR RLS
------------------------------------------------------
alter table usuarios enable row level security;
alter table negocios enable row level security;
alter table promos enable row level security;
alter table qr_validos enable row level security;
alter table comentarios enable row level security;
alter table escaneos enable row level security;
alter table reportes enable row level security;
alter table sucursales enable row level security;
alter table promos_sucursales enable row level security;

------------------------------------------------------
-- USUARIOS
------------------------------------------------------

create policy "usuarios_select_self" on usuarios
  for select
  using ( id_auth = auth.uid() );

create policy "usuarios_insert_any" on usuarios
  for insert
  with check ( true );

create policy "usuarios_update_self" on usuarios
  for update
  using ( id_auth = auth.uid() )
  with check ( id_auth = auth.uid() );

------------------------------------------------------
-- PROMOS
------------------------------------------------------

create policy "promos_public_select" on promos
  for select
  using ( true );

create policy "promos_manage_service_role" on promos
  for all
  using ( false )
  with check ( false );

------------------------------------------------------
-- QR_VALIDOS
------------------------------------------------------

create policy "qr_select_by_client_or_business" on qr_validos
  for select
  using (
    (
      clienteId is not null and
      exists (
        select 1 from usuarios u
        where u.id = qr_validos.clienteId
        and u.id_auth = auth.uid()
      )
    )
    or
    (
      negocioId is not null and
      exists (
        select 1
        from negocios n
        join usuarios u on u.id = n.usuarioId
        where n.id = qr_validos.negocioId
        and u.id_auth = auth.uid()
      )
    )
  );

create policy "qr_insert_by_client" on qr_validos
  for insert
  with check (
    exists (
      select 1 from usuarios u
      where u.id = clienteId
      and u.id_auth = auth.uid()
    )
  );

create policy "qr_update_by_business" on qr_validos
  for update
  using (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = qr_validos.negocioId
      and u.id_auth = auth.uid()
    )
  )
  with check ( true );

------------------------------------------------------
-- COMENTARIOS
------------------------------------------------------

create policy "coment_insert_client" on comentarios
  for insert
  with check (
    exists (
      select 1 from usuarios u
      where u.id = clienteId
      and u.id_auth = auth.uid()
    )
  );

create policy "coment_select_public" on comentarios
  for select
  using ( true );

------------------------------------------------------
-- ESCANEOS
------------------------------------------------------

create policy "escaneos_insert_check" on escaneos
  for insert
  with check (
    exists (
      select 1 from usuarios u
      where u.id = clienteId
      and u.id_auth = auth.uid()
    )
  );

------------------------------------------------------
-- REPORTES
------------------------------------------------------

create policy "reportes_insert_auth" on reportes
  for insert
  with check (
    exists (
      select 1 from usuarios u
      where u.id = reporterId
      and u.id_auth = auth.uid()
    )
  );
