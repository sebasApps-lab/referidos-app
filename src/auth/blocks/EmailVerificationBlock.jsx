import useEmailVerification from "../hooks/useEmailVerification";

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

export default function EmailVerificationBlock({ email = "" }) {
  const {
    emailValue,
    setEmailValue,
    editingEmail,
    setEditingEmail,
    message,
    error,
    sending,
    emailSent,
    handleSendEmail,
  } = useEmailVerification({ initialEmail: email });

  return (
    <div className="space-y-4 text-sm text-gray-700">
      {!emailSent ? (
        <>
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
          <div className="text-center text-xs text-gray-500">
            Te enviaremos un codigo a este correo.
          </div>
          <button
            type="button"
            onClick={handleSendEmail}
            disabled={sending}
            className="w-full text-sm font-semibold text-[#5E30A5] disabled:opacity-60"
          >
            {sending ? "Enviando..." : "Enviar correo"}
          </button>
        </>
      ) : (
        <>
          {message && (
            <div className="text-center text-xs text-emerald-500">
              {message}
            </div>
          )}
          <div className="text-center text-xs text-gray-500">
            Revisa tu bandeja de entrada o spam. Y sigue las instrucciones del
            correo.
          </div>
        </>
      )}
    </div>
  );
}
