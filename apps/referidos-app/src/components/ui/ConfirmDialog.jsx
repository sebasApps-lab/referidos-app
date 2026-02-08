// src/components/ui/ConfirmDialog.jsx
import React from "react";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  tone = "danger",
}) {
  if (!open) return null;

  const toneClasses =
    tone === "danger"
      ? "bg-rose-600 hover:bg-rose-700"
      : "bg-[#5E30A5] hover:bg-[#4B2488]";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="text-lg font-semibold text-[#2F1A55]">{title}</div>
        {description && (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        )}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-500"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${toneClasses}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
