import { create } from "zustand";

type SupportDeskState = {
  selectedThreadPublicId: string | null;
  setSelectedThreadPublicId: (value: string | null) => void;
  clearSelectedThread: () => void;
};

export const useSupportDeskStore = create<SupportDeskState>((set) => ({
  selectedThreadPublicId: null,
  setSelectedThreadPublicId: (value) =>
    set({
      selectedThreadPublicId: value ? String(value).trim() : null,
    }),
  clearSelectedThread: () => set({ selectedThreadPublicId: null }),
}));
