// src/modals/useModal.js
import { useModalStore } from "./modalStore";

export function useModal() {
  return {
    activeModal: useModalStore((s) => s.activeModal),
    modalProps: useModalStore((s) => s.modalProps),
    openModal: useModalStore((s) => s.openModal),
    closeModal: useModalStore((s) => s.closeModal),
  };
}
