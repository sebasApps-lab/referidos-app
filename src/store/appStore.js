// src/store/appStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../lib/supabaseClient";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForUser(id_auth, attempts = 8, delay = 400) {
  // intenta varias veces hasta que el trigger cree la fila en public.usuarios
  for (let i = 0; i < attempts; i++) {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", id_auth)
      .maybeSingle(); // evita el error "cannot coerce..."
    if (error) {
      // si hay error real en la consulta, salir
      break;
    }
    if (data) return data;
    await wait(delay);
  }
  return null;
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      // =====================================================
      // ESTADO
      // =====================================================
      usuario: null,
      ratings: {},
      promos: [],
      negocios: [],
      loading: false,
      error: null,

      // =====================================================
      // AUTH: LOGIN CON SUPABASE
      // =====================================================
      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          // 1. Login en Supabase Auth (v2)
          const {
            data: signInData,
            error: signInError
          } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) throw signInError;
          if (!signInData || !signInData.user) {
            throw new Error("No se pudo iniciar sesión");
          }

          const authUserId = signInData.user.id;

          // 2. Obtener datos del usuario desde tabla usuarios (polling por si trigger tarda)
          const userData = await waitForUser(authUserId);

          if (!userData) {
            set({ loading: false, error: "No se encontró el perfil de usuario" });
            return { ok: false, error: "No se encontró el perfil de usuario" };
          }

          set({ usuario: userData, loading: false });
          return { ok: true, user: userData };
        } catch (error) {
          set({ error: error.message ?? String(error), loading: false });
          return { ok: false, error: error.message ?? String(error) };
        }
      },

      // =====================================================
      // AUTH: REGISTRO CON SUPABASE
      // =====================================================
      register: async ({ email, password, telefono, nombre, role = "cliente" }) => {
        set({ loading: true, error: null });

        try {
          // 1. Crear usuario en Supabase Auth (dejamos que el trigger cree la fila en public.usuarios)
          const {
            data: signUpData,
            error: signUpError
          } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                role,
                nombre,
                telefono,
              },
            },
          });

          if (signUpError) throw signUpError;
          if (!signUpData || !signUpData.user) {
            throw new Error("No se pudo crear la cuenta");
          }

          const sessionAfterSignUp =
            signUpData.session ??
            (await supabase.auth.getSession()).data.session;

          if (!sessionAfterSignUp) {
            set({ loading: false, error: "Cuenta creada. Revisa tu email para confirmar y luego inicia sesión." });
            return { ok: false, error: "Cuenta creada. Confirma tu email para continuar." };
          }

          const authUserId = sessionAfterSignUp.user.id;

          // 2. Esperar a que el trigger cree la fila en usuarios
          const userData = await waitForUser(authUserId);

          if (!userData) {
            set({ loading: false, error: "No se creó el perfil del usuario" });
            return { ok: false, error: "No se creó el perfil del usuario" };
          }

          set({ usuario: userData, loading: false });
          return { ok: true, user: userData };
        } catch (error) {
          set({ error: error.message ?? String(error), loading: false });
          return { ok: false, error: error.message ?? String(error) };
        }
      },

      // =====================================================
      // AUTH: LOGOUT
      // =====================================================
      logout: async () => {
        await supabase.auth.signOut();
        set({ usuario: null, promos: [], negocios: [] });
      },

      // =====================================================
      // AUTH: RESTAURAR SESIÓN AL CARGAR APP
      // =====================================================
      restoreSession: async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session) {
            const { data: userData } = await supabase
              .from("usuarios")
              .select("*")
              .eq("id_auth", session.user.id)
              .maybeSingle();

            if (userData) set({ usuario: userData });
          }
        } catch (error) {
          // no bloquear
          console.warn("restoreSession error", error);
        }
      },

      // =====================================================
      // PROMOS: CARGAR DESDE SUPABASE
      // =====================================================
      loadPromos: async () => {
        set({ loading: true });

        try {
          const { data, error } = await supabase
            .from("promos")
            .select(`
              *,
              negocios!inner(nombre, sector, lat, lng, imagen)
            `)
            .eq("estado", "activo")
            .order("fechaCreacion", { ascending: false });

          if (error) throw error;

          // Transformar datos para compatibilidad con componentes
          const promosFormateadas = data.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            descripcion: p.descripcion,
            inicio: p.inicio,
            fin: p.fin,
            imagen: p.imagen,
            nombreLocal: p.negocios.nombre,
            sector: p.negocios.sector,
            lat: p.negocios.lat,
            lng: p.negocios.lng,
            negocioId: p.negocioId,
          }));

          set({ promos: promosFormateadas, loading: false });
          return { ok: true, data: promosFormateadas };
        } catch (error) {
          set({ error: error.message ?? String(error), loading: false });
          return { ok: false, error: error.message ?? String(error) };
        }
      },

      // =====================================================
      // RATINGS: INICIALIZAR (MANTENER EN MEMORIA)
      // =====================================================
      initRatings: (promos) => {
        const current = get().ratings;
        if (Object.keys(current).length > 0) return;

        const map = {};
        promos.forEach((p) => {
          map[p.id] = Math.round((3 + Math.random() * 2) * 10) / 10;
        });
        set({ ratings: map });
      },

      // =====================================================
      // QR: CREAR QR VÁLIDO
      // =====================================================
      createQR: async ({ promoId, clienteId, negocioId, sucursalId }) => {
        try {
          const fechaExpira = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hora

          const { data, error } = await supabase
            .from("qr_validos")
            .insert({
              id: `QRV_${Date.now().toString(36)}`,
              promoId,
              clienteId,
              negocioId,
              sucursalId,
              fechaExpira,
              canjeado: false,
            })
            .select()
            .maybeSingle();

          if (error) throw error;
          return { ok: true, data };
        } catch (error) {
          return { ok: false, error: error.message ?? String(error) };
        }
      },

      // =====================================================
      // QR: MARCAR COMO CANJEADO
      // =====================================================
      markQRAsUsed: async (qrId) => {
        try {
          const { data, error } = await supabase
            .from("qr_validos")
            .update({ canjeado: true, fechaCanje: new Date().toISOString() })
            .eq("id", qrId)
            .select()
            .maybeSingle();

          if (error) throw error;
          return { ok: true, data };
        } catch (error) {
          return { ok: false, error: error.message ?? String(error) };
        }
      },

      // =====================================================
      // COMENTARIOS: AÑADIR
      // =====================================================
      addComentario: async ({ promoId, clienteId, estrellas, texto }) => {
        try {
          const { data, error } = await supabase
            .from("comentarios")
            .insert({
              id: `COM_${Date.now().toString(36)}`,
              promoId,
              clienteId,
              estrellas,
              texto,
            })
            .select()
            .maybeSingle();

          if (error) throw error;
          return { ok: true, data };
        } catch (error) {
          return { ok: false, error: error.message ?? String(error) };
        }
      },
    }),
    {
      name: "referidos_app_user",
      // Solo persistir usuario, no promos (se cargan desde Supabase)
      partialize: (state) => ({ usuario: state.usuario }),
    }
  )
);
