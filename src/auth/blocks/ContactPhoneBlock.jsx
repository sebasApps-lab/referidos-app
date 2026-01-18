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
  onSave,
  onStatusChange,
}) {
  const phoneState = useContactPhone({
    initialPhone: phone,
    onSave,
    onStatusChange,
  });

  return (
    <div className="space-y-2 mt-10">
      <div className="text-sm font-semibold text-gray-900">
        Informacion de contacto
      </div>
      <div className="space-y-1">
        <label className="block text-xs text-gray-500 ml-1">
          Telefono
        </label>
        {!phoneState.editingPhone &&
        phoneState.phoneConfirmed &&
        phone ? (
          <div className="flex items-stretch rounded-lg border border-gray-200 bg-white text-sm text-gray-700 overflow-hidden">
            <span className="px-3 py-2 text-gray-400">
              {phoneState.countryCode}
            </span>
            <span className="w-px bg-gray-200" />
            <span className="flex-1 px-3 py-2">
              {phoneState.countryCode === "+593"
                ? phone
                    .replace(phoneState.countryCode, "")
                    .replace(/\D/g, "")
                    .replace(/^(\d{2})(\d{3})(\d{0,4}).*$/, (_, a, b, c) =>
                      [a, b, c].filter(Boolean).join(" ")
                    )
                : phone.replace(phoneState.countryCode, "").trim()}
            </span>
            <span className="w-px bg-gray-200" />
            <button
              type="button"
              onClick={() => phoneState.setEditingPhone(true)}
              className="px-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Editar telefono"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="relative flex items-stretch rounded-lg border border-gray-200 bg-white overflow-visible">
            <button
              type="button"
              onClick={() =>
                phoneState.setDropdownOpen((prev) => !prev)
              }
              className="flex items-center gap-1 px-3 text-sm text-gray-400 border-r border-gray-200"
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
              className="flex-1 px-3 py-2 pr-12 text-sm text-gray-700 focus:outline-none"
            />
            {phoneState.phoneValid && (
              <button
                type="button"
                onClick={phoneState.handleConfirmPhone}
                disabled={phoneState.savingPhone}
                className="absolute right-0 top-0 h-full px-3 text-xs font-semibold text-[#5E30A5] border-l border-gray-200 disabled:opacity-60"
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
      </div>
    </div>
  );
}
