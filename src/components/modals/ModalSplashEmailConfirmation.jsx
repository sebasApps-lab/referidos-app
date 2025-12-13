// src/components/modals/ModalSplashEmailConfirmation.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useModal } from "../../modals/useModal";

export default function ModalSplashEmailConfirmation({ email: initialEmail, initialError, onBack }) {
  const [email, setEmail] = useState(initialEmail || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    setEmail(initialEmail || "");
  }, [initialEmail]);

  useEffect(() => {
    setError(initialError || "");
    setMessage("");
  }, [initialError]);

  const sendCode = async () => {
    setError("");
    setMessage("");
    if (!email) {
      setError("Ingresa un email válido");
      return;
    }
    setLoading(true);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (resendError) throw resendError;
      setMessage("Código enviado. Revisa tu bandeja o spam.");
    } catch (err) {
      setError(err?.message || "No se pudo enviar el código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#5E30A5] text-white flex items-center justify-center p-6 relative">
      <button
        onClick={() => (onBack ? onBack() : closeModal())}
        className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#4B1E90] text-white shadow-lg flex items-center justify-center active:scale-95 transition"
        aria-label="Volver"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 5L8 12L15 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className="w-full max-w-lg bg-white/8 backdrop-blur-xl rounded-3xl border border-white/15 shadow-2xl transition-all duration-300"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
      >
        <div className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">Verificación de Email</p>
            <h1 className="text-2xl font-semibold text-white">Verifica que tu email sea correcto</h1>
            <p className="text-sm text-white/70">Te enviaremos un código a este correo. Puedes editarlo si necesitas.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#5E30A5]/40 bg-white/80 text-[#5E30A5] px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC21C] placeholder:text-[#5E30A5]/60"
              placeholder="tu@email.com"
            />
          </div>

          {error && <div className="text-center text-sm text-red-200">{error}</div>}
          {message && <div className="text-center text-sm text-emerald-200">{message}</div>}

          <div className="pt-2 flex gap-3">
            <button
              onClick={sendCode}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#FFC21C] text-[#0F172A] font-semibold shadow-lg shadow-[#ffc21c33] active:scale-95 disabled:opacity-70"
            >
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
