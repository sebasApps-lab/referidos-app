import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const COUNTRY_CODES = [
  { code: "+593", label: "Ecuador" },
  { code: "+57", label: "Colombia" },
  { code: "+51", label: "Peru" },
  { code: "+1", label: "USA/Canada" },
  { code: "+34", label: "Espana" },
  { code: "+52", label: "Mexico" },
];

function PencilIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function AccountVerifyStep({
  innerRef,
  email,
  emailConfirmed,
  phone,
  onSkip,
  onComplete,
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPhone, setEditingPhone] = useState(!phone);
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailValue, setEmailValue] = useState(email || "");
  const [showSentMessage, setShowSentMessage] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initialPhone = String(phone || "");
  const parsed = useMemo(() => {
    if (!initialPhone) {
      return { code: "+593", digits: "" };
    }
    const match = COUNTRY_CODES.find((c) => initialPhone.startsWith(c.code));
    if (match) {
      return { code: match.code, digits: initialPhone.slice(match.code.length) };
    }
    return { code: "+593", digits: initialPhone.replace(/\D/g, "") };
  }, [initialPhone]);

  const [countryCode, setCountryCode] = useState(parsed.code);
  const [digits, setDigits] = useState(parsed.digits);

  const normalizedDigits = digits.replace(/\D/g, "");
  const isEcuador = countryCode === "+593";
  const normalizedPhone = `${countryCode}${normalizedDigits}`;
  const hasPhone = Boolean(phone) || normalizedDigits.length > 0;
  const phoneValid = isEcuador ? normalizedDigits.length === 9 : normalizedDigits.length > 0;

  const handleDigitsChange = (value) => {
    let next = String(value || "").replace(/\D/g, "");
    if (isEcuador) {
      if (next.startsWith("0")) {
        next = next.replace(/^0+/, "");
      }
      next = next.slice(0, 9);
    }
    setDigits(next);
  };

  const handleSendEmail = async () => {
    setError("");
    setMessage("");
    setShowSentMessage(false);
    if (!emailValue) {
      setError("Ingresa un email valido");
      return;
    }
    setSending(true);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: emailValue,
      });
      if (resendError) throw resendError;
      setMessage("Te enviamos un correo de verificacion.");
      setShowSentMessage(true);
      setTimeout(() => setShowSentMessage(false), 5000);
    } catch (err) {
      setError(err?.message || "No se pudo enviar el codigo");
    } finally {
      setSending(false);
    }
  };

  const handleSave = async () => {
    setError("");
    setMessage("");
    if (!emailConfirmed) return;
    if (!hasPhone || !phoneValid) return;

    if (!editingPhone || (phone && normalizedPhone === phone)) {
      onComplete?.();
      return;
    }

    setSaving(true);
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setError("No hay sesion activa");
        return;
      }
      const { error: updErr } = await supabase
        .from("usuarios")
        .update({ telefono: normalizedPhone })
        .eq("id_auth", userId);
      if (updErr) {
        setError(updErr.message || "No se pudo guardar el telefono");
        return;
      }
      onComplete?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600 text-center">
          Esto es opcional, pero te ayudara a sacarle mas provecho a la app.
        </p>
        {!emailConfirmed ? (
          <div className="space-y-4 text-sm text-gray-700 mt-2">
            <div className="space-y-1">
            </div>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500 ml-1">
                Verifica tu correo electronico.
              </label>
              {!editingEmail ? (
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
                  <span>{emailValue || "Sin correo"}</span>
                  <button
                    type="button"
                    onClick={() => setEditingEmail(true)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Editar email"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(event) => setEmailValue(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-12 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
                    placeholder="tu@email.com"
                  />
                  {emailValue && emailValue.includes("@") && (
                    <button
                      type="button"
                      onClick={() => setEditingEmail(false)}
                      className="absolute right-0 top-0 h-full px-3 text-xs font-semibold text-[#5E30A5] border-l border-gray-200"
                    >
                      OK
                    </button>
                  )}
                </div>
              )}
            </div>
            {error && (
              <div className="text-center text-xs text-red-500">{error}</div>
            )}
            {message && (
              <div className="text-center text-xs text-emerald-500">
                {message}
              </div>
            )}
            <div className="text-center text-xs text-gray-500">
              {showSentMessage
                ? "Te enviaremos un codigo a este correo."
                : "Revisa tu bandeja de entrada o spam. Y sigue las instrucciones del correo."}
            </div>
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={sending}
              className="w-full text-sm font-semibold text-[#5E30A5] disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Enviar codigo"}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-4 text-sm text-gray-700">
            <div className="text-center text-sm font-semibold text-emerald-600">
              Correo verificado
            </div>
          </div>
        )}

        <div className="space-y-2 mt-4">
          <div className="text-sm font-semibold text-gray-900">
            Informacion de contacto
          </div>
          {!editingPhone && phone ? (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
              <span>{phone}</span>
              <button
                type="button"
                onClick={() => setEditingPhone(true)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Editar telefono"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
          <div className="space-y-1">
            <label className="block text-xs text-gray-500 ml-1">Telefono</label>
              <div className="relative flex items-stretch rounded-lg border border-gray-200 bg-white overflow-visible">
                <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 px-3 text-sm text-gray-400 border-r border-gray-200"
              >
                {countryCode}
                <ChevronIcon className="h-4 w-4 text-gray-400" />
              </button>
                <input
                  type="text"
                  inputMode="numeric"
                  value={normalizedDigits}
                  onChange={(event) => handleDigitsChange(event.target.value)}
                  placeholder="Ej: 987654321"
                  className="flex-1 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                />
                {dropdownOpen && (
                  <div className="absolute left-0 top-full z-[60] mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
                    {COUNTRY_CODES.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(item.code);
                          setDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {item.code} {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="mt-auto pt-6 space-y-3">
        <div className="text-xs text-gray-500 text-center">
          Si prefieres, tambien puedes continuar sin verificar.
          Podras publicar 1 promocion por una semana, aunque las cuentas
          verificadas aparecen con mas visibilidad para los usuarios.
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={!emailConfirmed || !hasPhone || !phoneValid || saving}
          className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Guardando..." : "Verificar"}
        </button>
        <button
          type="button"
          onClick={() => setShowSkipModal(true)}
          className="w-full text-sm font-semibold text-gray-500"
        >
          Saltar
        </button>
      </div>

      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
            <div className="text-center text-sm font-semibold text-gray-900">
              Al verificar tu cuenta podras:
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <div>Publicar hasta 2 promociones adicionales</div>
              <div>Obtener mayor visibilidad en la app</div>
              <div>Mostrar tu perfil como cuenta verificada</div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowSkipModal(false)}
                className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSkipModal(false);
                  onSkip?.();
                }}
                className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white"
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
