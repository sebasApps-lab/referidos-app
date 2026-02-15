import { create } from "zustand";

export type ModalTone = "default" | "warning" | "danger";

export type ModalPickerOption = {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type BaseModal = {
  id: string;
  title: string;
  message?: string;
  dismissible?: boolean;
};

export type ConfirmModal = BaseModal & {
  kind: "confirm";
  tone?: ModalTone;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export type AlertModal = BaseModal & {
  kind: "alert";
  tone?: ModalTone;
  actionLabel?: string;
  onAcknowledge?: () => void;
};

export type PickerModal = BaseModal & {
  kind: "picker";
  tone?: ModalTone;
  options: ModalPickerOption[];
  selectedId?: string | null;
  confirmLabel?: string;
  cancelLabel?: string;
  onSelect?: (id: string) => void;
  onCancel?: () => void;
};

export type AppModal = ConfirmModal | AlertModal | PickerModal;

type ConfirmInput = Omit<ConfirmModal, "id" | "kind">;
type AlertInput = Omit<AlertModal, "id" | "kind">;
type PickerInput = Omit<PickerModal, "id" | "kind">;

type ModalState = {
  activeModal: AppModal | null;
  openConfirm: (payload: ConfirmInput) => void;
  openAlert: (payload: AlertInput) => void;
  openPicker: (payload: PickerInput) => void;
  closeModal: () => void;
  confirm: () => void;
  acknowledge: () => void;
  cancel: () => void;
  pickOption: (id: string) => void;
  applyPicker: () => void;
  reset: () => void;
};

function nextModalId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useModalStore = create<ModalState>((set, get) => ({
  activeModal: null,

  openConfirm: (payload) => {
    set({
      activeModal: {
        ...payload,
        id: nextModalId(),
        kind: "confirm",
      },
    });
  },

  openAlert: (payload) => {
    set({
      activeModal: {
        ...payload,
        id: nextModalId(),
        kind: "alert",
      },
    });
  },

  openPicker: (payload) => {
    const firstEnabled = payload.options.find((option) => !option.disabled);
    set({
      activeModal: {
        ...payload,
        id: nextModalId(),
        kind: "picker",
        selectedId: payload.selectedId ?? firstEnabled?.id ?? null,
      },
    });
  },

  closeModal: () => set({ activeModal: null }),

  confirm: () => {
    const active = get().activeModal;
    if (!active || active.kind !== "confirm") return;
    active.onConfirm?.();
    set({ activeModal: null });
  },

  acknowledge: () => {
    const active = get().activeModal;
    if (!active || active.kind !== "alert") return;
    active.onAcknowledge?.();
    set({ activeModal: null });
  },

  cancel: () => {
    const active = get().activeModal;
    if (!active) return;
    if (active.kind === "confirm") active.onCancel?.();
    if (active.kind === "picker") active.onCancel?.();
    set({ activeModal: null });
  },

  pickOption: (id) => {
    const active = get().activeModal;
    if (!active || active.kind !== "picker") return;
    set({ activeModal: { ...active, selectedId: id } });
  },

  applyPicker: () => {
    const active = get().activeModal;
    if (!active || active.kind !== "picker") return;
    if (active.selectedId) {
      active.onSelect?.(active.selectedId);
    }
    set({ activeModal: null });
  },

  reset: () => set({ activeModal: null }),
}));
