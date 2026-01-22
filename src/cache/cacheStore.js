import { create } from "zustand";

const initialState = {
  views: {},
  order: {},
  activeKeys: {},
  preloadedScopes: {},
  scrollPositions: {},
};

export const useCacheStore = create((set, get) => ({
  ...initialState,
  mount: (key, element, scope) =>
    set((state) => {
      if (state.views[key]) return state;
      const nextOrder = { ...state.order };
      const scoped = nextOrder[scope] ? [...nextOrder[scope]] : [];
      scoped.push(key);
      nextOrder[scope] = scoped;
      return {
        views: {
          ...state.views,
          [key]: { element, scope },
        },
        order: nextOrder,
      };
    }),
  unmount: (key) =>
    set((state) => {
      if (!state.views[key]) return state;
      const { [key]: removed, ...restViews } = state.views;
      const nextOrder = {};
      Object.keys(state.order).forEach((scope) => {
        nextOrder[scope] = state.order[scope].filter((item) => item !== key);
      });
      const { [key]: removedScroll, ...restScroll } = state.scrollPositions;
      return {
        views: restViews,
        order: nextOrder,
        scrollPositions: restScroll,
      };
    }),
  setActive: (scope, key) =>
    set((state) => ({
      activeKeys: {
        ...state.activeKeys,
        [scope]: key,
      },
    })),
  preloadScope: (scope, entries) => {
    if (get().preloadedScopes[scope]) return;
    entries.forEach((entry) => {
      get().mount(entry.key, entry.element, scope);
    });
    set((state) => ({
      preloadedScopes: {
        ...state.preloadedScopes,
        [scope]: true,
      },
    }));
  },
  has: (key) => Boolean(get().views[key]),
  isPreloaded: (scope) => Boolean(get().preloadedScopes[scope]),
  setScrollPosition: (key, value) =>
    set((state) => ({
      scrollPositions: {
        ...state.scrollPositions,
        [key]: value,
      },
    })),
  getScrollPosition: (key) => get().scrollPositions[key] ?? 0,
  clearAll: () => set({ ...initialState }),
}));
