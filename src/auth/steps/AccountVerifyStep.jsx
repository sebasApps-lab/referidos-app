import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { validarCedula } from "../../utils/validators";
import EmailVerificationBlock from "../blocks/EmailVerificationBlock";

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
  phone,
  ruc,
  emailConfirmed,
}) {
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (phone && ruc && emailConfirmed === false) return "email";
    return "contact";
  });
  const [savingPhone, setSavingPhone] = useState(false);
  const [savingRuc, setSavingRuc] = useState(false);
  const [editingPhone, setEditingPhone] = useState(!phone);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phoneConfirmed, setPhoneConfirmed] = useState(Boolean(phone));
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [rucValue, setRucValue] = useState(String(ruc || ""));
  const [rucConfirmed, setRucConfirmed] = useState(Boolean(ruc));
  const [rucMessage, setRucMessage] = useState("");
  const [rucError, setRucError] = useState("");

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
  const phoneValid = isEcuador
    ? normalizedDigits.length === 9
    : normalizedDigits.length >= 6;

  const normalizedRuc = rucValue.replace(/\D/g, "").slice(0, 13);
  const rucCore = normalizedRuc.slice(0, 10);
  const rucSuffix = normalizedRuc.slice(10);
  const rucValid =
    normalizedRuc.length === 13 &&
    rucSuffix === "001" &&
    validarCedula(rucCore);

  const canContinue = phoneConfirmed && rucConfirmed;

  const handleDigitsChange = (value) => {
    let next = String(value || "").replace(/\D/g, "");
    if (isEcuador) {
      if (next.startsWith("0")) {
        next = next.replace(/^0+/, "");
      }
      next = next.slice(0, 9);
    }
    setDigits(next);
    setPhoneConfirmed(false);
    setPhoneMessage("");
    setPhoneError("");
  };

  const handleSavePhone = async () => {
    if (!phoneValid || savingPhone) return;
    setSavingPhone(true);
    setPhoneMessage("");
    setPhoneError("");
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setPhoneError("No se pudo obtener sesion.");
        return;
      }
      const { error: updErr } = await supabase
        .from("usuarios")
        .update({ telefono: normalizedPhone })
        .eq("id_auth", userId);
      if (updErr) {
        setPhoneError(updErr.message || "No se pudo guardar el telefono.");
        return;
      }
      setPhoneConfirmed(true);
      setEditingPhone(false);
      setPhoneMessage("Telefono guardado.");
    } finally {
      setSavingPhone(false);
    }
  };

  const handleSaveRuc = async () => {
    if (!rucValid || savingRuc) return;
    setSavingRuc(true);
    setRucMessage("");
    setRucError("");
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setRucError("No se pudo obtener sesion.");
        return;
      }
      const { data: usuarioRow, error: usuarioErr } = await supabase
        .from("usuarios")
        .select("id")
        .eq("id_auth", userId)
        .maybeSingle();
      if (usuarioErr || !usuarioRow?.id) {
        setRucError("No se pudo obtener el usuario.");
        return;
      }
      const { data: negocioRow, error: negocioErr } = await supabase
        .from("negocios")
        .select("id")
        .eq("usuarioid", usuarioRow.id)
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (negocioErr || !negocioRow?.id) {
        setRucError("No se pudo obtener el negocio.");
        return;
      }
      const { data: existing, error: existingErr } = await supabase
        .from("verificacion_negocio")
        .select("id")
        .eq("negocio_id", negocioRow.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (existingErr) {
        setRucError(existingErr.message || "No se pudo validar el RUC.");
        return;
      }
      const payload = {
        negocio_id: negocioRow.id,
        ruc: normalizedRuc,
        estado: "pending",
        fuente: "manual",
      };
      if (existing?.id) {
        const { error: updErr } = await supabase
          .from("verificacion_negocio")
          .update(payload)
          .eq("id", existing.id);
        if (updErr) {
          setRucError(updErr.message || "No se pudo guardar el RUC.");
          return;
        }
      } else {
        const { error: insErr } = await supabase
          .from("verificacion_negocio")
          .insert(payload);
        if (insErr) {
          setRucError(insErr.message || "No se pudo guardar el RUC.");
          return;
        }
      }
      setRucConfirmed(true);
      setRucMessage("RUC guardado.");
    } finally {
      setSavingRuc(false);
    }
  };

  if (currentScreen === "email") {
    return (
      <div className="flex h-full flex-col pb-4" ref={innerRef}>
        <div className="flex-1">
          <EmailVerificationBlock email={""} />
        </div>
        <button
          type="button"
          onClick={() => (window.location.href = "/app")}
          className="mt-4 w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold"
        >
          Finalizar
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="space-y-6">
        <div className="space-y-2 text-sm text-gray-700">
          <div className="text-sm font-semibold text-gray-900">
            Verifica tu RUC
          </div>
          <div className="text-xs text-gray-500">
            Ingresalo para completar la verificacion del negocio.
          </div>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={normalizedRuc}
              onChange={(event) => {
                const next = event.target.value.replace(/\D/g, "").slice(0, 13);
                setRucValue(next);
                setRucConfirmed(false);
                setRucMessage("");
                setRucError("");
              }}
              placeholder="0000000000001"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-12 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            />
            <button
              type="button"
              onClick={handleSaveRuc}
              disabled={!rucValid || savingRuc}
              className="absolute right-0 top-0 h-full px-3 text-xs font-semibold text-[#5E30A5] border-l border-gray-200 disabled:text-gray-300"
            >
              OK
            </button>
          </div>
          {rucMessage && (
            <p className="text-xs text-green-600">{rucMessage}</p>
          )}
          {rucError && <p className="text-xs text-red-500">{rucError}</p>}
        </div>

        <div className="space-y-2 mt-10">
          <div className="text-sm font-semibold text-gray-900">
            Informacion de contacto
          </div>
          {!editingPhone && phoneConfirmed && phone ? (
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
              <label className="block text-xs text-gray-500 ml-1">
                Telefono
              </label>
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
                  placeholder="Numero celular"
                  className="flex-1 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSavePhone}
                  disabled={!phoneValid || savingPhone}
                  className="px-3 text-xs font-semibold text-[#5E30A5] border-l border-gray-200 disabled:text-gray-300"
                >
                  OK
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-36 rounded-lg border border-gray-200 bg-white shadow-lg z-20">
                    {COUNTRY_CODES.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(option.code);
                          setDropdownOpen(false);
                          setPhoneConfirmed(false);
                          setPhoneMessage("");
                          setPhoneError("");
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                      >
                        {option.code} {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {phoneMessage && (
            <p className="text-xs text-green-600">{phoneMessage}</p>
          )}
          {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
        </div>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => setCurrentScreen("email")}
          disabled={!canContinue}
          className="w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
