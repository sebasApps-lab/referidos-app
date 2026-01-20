import useContactPhone from "../hooks/useContactPhone";

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

export default function ContactPhoneBlock({
  phone = "",
  email = "",
  showEmail = true,
  onEmailChange,
  onSave,
  onStatusChange,
}) {
  const phoneState = useContactPhone({
    initialPhone: phone,
    onSave,
    onStatusChange,
  });

  const showEmailInput = showEmail && !email;

  return (
    <div className="space-y-2 mt-10">
      <div className="text-sm font-semibold text-gray-900">
        Informacion de contacto
      </div>
      <div className="space-y-1">
        <label className="block text-xs text-gray-500 ml-1">
          Telefono
        </label>
        {!phoneState.editingPhone && phoneState.phoneConfirmed ? (
          <div className="flex items-center text-sm text-gray-700 gap-2 pl-1">
            <span>
              {phoneState.countryCode === "+593"
                ? `0${phoneState.normalizedDigits}`.replace(
                    /^(\d{3})(\d{3})(\d{0,4}).*$/,
                    (_, a, b, c) => [a, b, c].filter(Boolean).join(" ")
                  )
                : phoneState.normalizedDigits
                  ? `${phoneState.countryCode} ${phoneState.normalizedDigits}`
                  : ""}
            </span>
            <button
              type="button"
              onClick={() => phoneState.setEditingPhone(true)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Editar telefono"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            className={`relative flex items-stretch rounded-lg border bg-white overflow-visible ${
              phoneState.phoneError ? "border-red-300" : "border-gray-200"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                phoneState.setDropdownOpen((prev) => !prev)
              }
              className={`flex items-center gap-1 px-3 text-sm border-r ${
                phoneState.phoneError
                  ? "text-red-400 border-red-300"
                  : "text-gray-400 border-gray-200"
              }`}
            >
              {phoneState.countryCode}
              <ChevronIcon className="h-4 w-4 text-gray-400" />
            </button>
            <input
              type="text"
              inputMode="numeric"
              value={phoneState.normalizedDigits}
              onChange={(event) =>
                phoneState.handleDigitsChange(event.target.value)
              }
              placeholder="Ej: 987654321"
              className={`flex-1 px-3 py-2 pr-12 text-sm focus:outline-none ${
                phoneState.phoneError ? "text-red-500" : "text-gray-700"
              }`}
            />
            {phoneState.phoneValid && (
              <button
                type="button"
                onClick={phoneState.handleConfirmPhone}
                disabled={phoneState.savingPhone}
                className={`absolute right-0 top-0 h-full px-3 text-xs font-semibold border-l disabled:opacity-60 ${
                  phoneState.phoneError
                    ? "text-red-500 border-red-300"
                    : "text-[#5E30A5] border-gray-200"
                }`}
              >
                OK
              </button>
            )}
            {phoneState.dropdownOpen && (
              <div className="absolute left-0 top-full z-[60] mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
                {phoneState.COUNTRY_CODES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() =>
                      phoneState.handleSelectCountry(item.code)
                    }
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {item.code} {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {phoneState.phoneError && (
          <p className="text-xs text-red-500">{phoneState.phoneError}</p>
        )}
      </div>
      {showEmail ? (
        <div className="space-y-1">
          <label className="block text-xs text-gray-500 ml-1">
            Correo electronico
          </label>
          {showEmailInput ? (
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange?.(event.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            />
          ) : (
            <div className="text-sm text-gray-700">{email}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
