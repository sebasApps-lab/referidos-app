// src/modals/modalStore.js
import { create } from "zustand";

export const useModalStore = create((set) => ({
  activeModal: null,
  modalProps: {},

  openModal: (name, props = {}) =>
    set({
      activeModal: name,
      modalProps: props,
    }),

  closeModal: () =>
    set({
      activeModal: null,
      modalProps: {},
    }),
}));
