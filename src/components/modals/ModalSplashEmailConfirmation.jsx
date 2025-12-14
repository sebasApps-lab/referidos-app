// src/components/modals/ModalSplashEmailConfirmation.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useModal } from "../../modals/useModal";

export default function ModalSplashEmailConfirmation({
  email: initialEmail,
  initialError,
  onBack,
  onSend,
  onSkip,
  readOnlyEmail = false,
}) {
  const [email, setEmail] = useState(initialEmail || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    setEmail(initialEmail || "");
    setSignedUp(false);
  }, [initialEmail]);

  useEffect(() => {
    setError(initialError || "");
    setMessage("");
  }, [initialError]);

  const sendCode = async () => {
    setError("");
    setMessage("");
    if (!email) {
      setError("Ingresa un email valido");
      return;
    }
    setLoading(true);
    try {
      if (onSend && !signedUp) {
        const res = await onSend(email);
        if (!res?.ok) {
          setError(res?.error || "No se pudo enviar el codigo");
        } else {
          setSignedUp(true);
          setMessage(res?.message || "Te enviamos un correo de verificacion.");
        }
      } else {
        const { error: resendError } = await supabase.auth.resend({
          type: "signup",
          email,
        });
        if (resendError) throw resendError;
        setMessage("Codigo enviado. Revisa tu bandeja o spam.");
      }
    } catch (err) {
      setError(err?.message || "No se pudo enviar el codigo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#5E30A5] text-white flex items-center justify-center p-6 relative">
      {onSkip && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <button
            onClick={onSkip}
            className="pointer-events-auto px-5 py-3 rounded-2xl bg-white text-[#5E30A5] font-semibold shadow-xl active:scale-95"
          >
            Continuar sin confirmar email (temporal)
          </button>
        </div>
      )}
      <button
        onClick={() => (onBack ? onBack() : closeModal())}
        className="absolute left-8 w-9 h-25 rounded-xl bg-[#5624a1ff] text-white shadow-lg flex items-center justify-center active:scale-95 transition"
        style={{ top: "42%", transform: "translate(-50%, 0)", zIndex: 20 }}
        aria-label="Volver"
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
          <path d="M15 5L8 12L15 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className="w-full max-w-lg bg-white/8 backdrop-blur-xl rounded-3xl border border-white/15 shadow-2xl transition-all duration-300"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
      >
        <div className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">Verificacion de Email</p>
            <h1 className="text-2xl font-semibold text-white">Verifica que tu email sea correcto</h1>
            <p className="text-sm text-white/70">Te enviaremos un codigo a este correo.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-white/80">Email</label>
            {readOnlyEmail ? (
              <div className="w-full rounded-xl border border-[#5E30A5]/40 bg-white/80 text-[#5E30A5] px-4 py-3 text-sm font-semibold">
                {email || "Sin correo"}
              </div>
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#5E30A5]/40 bg-white/80 text-[#5E30A5] px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC21C] placeholder:text-[#5E30A5]/60"
                placeholder="tu@email.com"
              />
            )}
          </div>

          {error && <div className="text-center text-sm text-red-200">{error}</div>}
          {message && <div className="text-center text-sm text-emerald-200">{message}</div>}

          <div className="pt-2 flex gap-3">
            <button
              onClick={sendCode}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#FFC21C] text-[#0F172A] font-semibold shadow-lg shadow-[#ffc21c33] active:scale-95 disabled:opacity-70"
            >
              {loading ? "Enviando..." : "Enviar codigo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
