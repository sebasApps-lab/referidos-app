import React, { useState } from "react";

export default function SupportFeedback() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const maxChars = 500;
  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Dejar un comentario
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Comparte tus ideas para mejorar la experiencia.
        </p>
      </div>
      <div className="space-y-4">
        <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value.slice(0, maxChars))}
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
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Correo (opcional)"
            className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-2xl bg-[#5E30A5] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
        >
          Enviar
        </button>
      </div>
    </section>
  );
}
