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

      // ======================================================
      // SET USER (global)
      // ======================================================
      setUser: (user) => set({ usuario: user }),

      // ======================================================
      // LOGIN LOCAL (fake serverless)
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
      // NOTA:
      // Para SUPABASE / NETLIFY haremos login real aquí,
      // pero esta estructura ya está lista.
      // ======================================================
    }),
    {
      name: "referidos_app_user", // nombre del localStorage para ZUSTAND
    }
  )
);
