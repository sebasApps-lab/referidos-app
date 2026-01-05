import React from "react";

export default function SupportFeedbackForm({
  message,
  email,
  maxChars = 500,
  onChangeMessage,
  onChangeEmail,
  onSubmit,
  submitLabel = "Enviar",
}) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
        <textarea
          value={message}
          onChange={(event) => onChangeMessage?.(event.target.value.slice(0, maxChars))}
          rows={5}
          placeholder="Escribe tu comentario"
          className="w-full resize-none bg-transparent text-sm text-slate-600 focus:outline-none"
        />
        <div className="mt-2 text-right text-[11px] text-slate-400">
          {message.length}/{maxChars}
        </div>
      </div>
      <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
        <input
          type="email"
          value={email}
          onChange={(event) => onChangeEmail?.(event.target.value)}
          placeholder="Correo (opcional)"
          className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="w-full rounded-2xl bg-[#5E30A5] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
      >
        {submitLabel}
      </button>
    </div>
  );
}
