# Referidos App - Notas de desarrollo

- Entorno local: define `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en `.env.local` (no lo subas al repo). La `SUPABASE_SERVICE_ROLE_KEY` se usa solo para scripts CLI locales.
- Usuarios seed (después de correr migraciones y `scripts/migrate_auth_and_sync.js`):
  - Cliente: `user@gmail.com` / `user`
  - Negocio: `tienda@gmail.com` / `tienda`
  - Admin: `admin@gmail.com` / `admin`
- Para producción, configura las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en el proveedor de hosting; no incluyas la service key en el frontend.
