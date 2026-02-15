import { create } from "zustand";

export type ShellRoleKey = "cliente" | "negocio" | "admin" | "soporte";

type ActiveTabs = Record<ShellRoleKey, string | null>;

type ShellState = {
  cacheEpoch: number;
  activeTabs: ActiveTabs;
  setActiveTab: (role: ShellRoleKey, routeName: string) => void;
  clearSessionCache: () => void;
};

function createInitialTabs(): ActiveTabs {
  return {
    cliente: null,
    negocio: null,
    admin: null,
    soporte: null,
  };
}

export const useShellStore = create<ShellState>((set, get) => ({
  cacheEpoch: 0,
  activeTabs: createInitialTabs(),

  setActiveTab: (role, routeName) => {
    if (!routeName) return;
    const current = get().activeTabs[role];
    if (current === routeName) return;
    set((state) => ({
      activeTabs: { ...state.activeTabs, [role]: routeName },
    }));
  },

  clearSessionCache: () => {
    set((state) => ({
      cacheEpoch: state.cacheEpoch + 1,
      activeTabs: createInitialTabs(),
    }));
  },
}));
