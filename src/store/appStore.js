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

      // Historial de QR escaneados
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
      // NUEVO: Registrar QR escaneado (con agrupación)
      // ======================================================
      addQR: (qrObject) => {
        const current = get().qrEscaneados;

        // Buscar si existe un registro con misma promoId y fechaExpira
        // y escaneado dentro de 60 segundos para agrupar userIds
        const foundIndex = current.findIndex((r) => {
          return (
            r.promoId === qrObject.promoId &&
            r.fechaExpira === qrObject.fechaExpira &&
            Math.abs(
              new Date(r.fechaEscaneo).getTime() -
                new Date(qrObject.fechaEscaneo).getTime()
            ) <= 60000
          );
        });

        if (foundIndex >= 0) {
          const existing = current[foundIndex];
          const merged = {
            ...existing,
            userIds: Array.from(
              new Set([...(existing.userIds || []), ...(qrObject.userIds || [])])
            ),
          };

          const next = [...current];
          next[foundIndex] = merged;
          set({ qrEscaneados: next });
        } else {
          // guardar nuevo QR
          set({ qrEscaneados: [...current, qrObject] });
        }
      },

      // ======================================================
      // NUEVO: marcar QR como canjeado
      // ======================================================
      markQRAsCanjeado: (qrId, byUserId) => {
        const current = get().qrEscaneados;
        const idx = current.findIndex((r) => r.id === qrId);
        if (idx === -1) return;

        const target = { ...current[idx] };
        target.canjeado = true;

        // asegurar que el usuario está en userIds
        target.userIds = Array.from(
          new Set([...(target.userIds || []), byUserId])
        );

        const next = [...current];
        next[idx] = target;

        set({ qrEscaneados: next });
      },
    }),
    {
      name: "referidos_app_user",
    }
  )
);
