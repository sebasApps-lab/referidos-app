// src/store/appStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

// base de datos fake localStorage
const STORAGE_KEY = "referidos_demo_v0";

function getDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      usuario: null,

      // Ratings precalculados
      ratings: {},

      // Nuevo: historial de QR escaneados
      qrEscaneados: [],

      // ======================================================
      // Inicializar ratings (solo una vez)
      // ======================================================
      initRatings: (promos) => {
        const current = get().ratings;
        if (Object.keys(current).length > 0) return;

        const map = {};
        promos.forEach((p) => {
          map[p.id] =
            p.rating ||
            Math.round((3 + Math.random() * 2) * 10) / 10;
        });

        set({ ratings: map });
      },

      // ======================================================
      // SET USER
      // ======================================================
      setUser: (user) => set({ usuario: user }),

      // ======================================================
      // LOGIN LOCAL (fake)
      // ======================================================
      loginLocal: (email, password) => {
        const db = getDB();

        if (!db) {
          return { ok: false, error: "No existen usuarios registrados" };
        }

        // buscar admin
        if (
          db.admin &&
          db.admin.email === email &&
          db.admin.password === password
        ) {
          return { ok: true, user: db.admin };
        }

        // buscar usuarios normales
        const u1 = db.usuarios?.find(
          (u) => u.email === email && u.password === password
        );
        if (u1) return { ok: true, user: u1 };

        // buscar negocios
        const u2 = db.negocios?.find(
          (n) => n.email === email && n.password === password
        );
        if (u2) return { ok: true, user: u2 };

        return { ok: false, error: "Usuario o contraseña incorrectos" };
      },

      // ======================================================
      // LOGOUT
      // ======================================================
      logout: () => set({ usuario: null }),

      // ======================================================
      // NUEVO: Registrar QR escaneado
      // ======================================================
      addQR: (qrObject) => {
        const current = get().qrEscaneados;
        set({ qrEscaneados: [...current, qrObject] });
      },
    }),
    {
      name: "referidos_app_user",
    }
  )
);
