import { useEffect, useMemo, useState } from "react";

const COUNTRY_CODES = [
  { code: "+593", label: "Ecuador" },
  { code: "+57", label: "Colombia" },
  { code: "+51", label: "Peru" },
  { code: "+1", label: "USA/Canada" },
  { code: "+34", label: "Espana" },
  { code: "+52", label: "Mexico" },
];

export default function useContactPhone({
  initialPhone = "",
  onSave,
  onStatusChange,
} = {}) {
  const [editingPhone, setEditingPhone] = useState(!initialPhone);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phoneConfirmed, setPhoneConfirmed] = useState(Boolean(initialPhone));
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [savingPhone, setSavingPhone] = useState(false);

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

  const handleSelectCountry = (code) => {
    setCountryCode(code);
    setDropdownOpen(false);
    setPhoneConfirmed(false);
    setPhoneMessage("");
    setPhoneError("");
  };

  const handleConfirmPhone = async () => {
    if (!phoneValid || savingPhone) return;
    setPhoneError("");
    setPhoneMessage("");
    if (!onSave) {
      setPhoneConfirmed(true);
      return;
    }
    setSavingPhone(true);
    try {
      const result = await onSave(normalizedPhone);
      if (result?.ok === false) {
        setPhoneError(result.error || "No se pudo guardar el telefono.");
        return;
      }
      setPhoneConfirmed(true);
      setEditingPhone(false);
      setPhoneMessage(result?.message || "Telefono guardado.");
    } finally {
      setSavingPhone(false);
    }
  };

  useEffect(() => {
    if (!onStatusChange) return;
    onStatusChange({
      confirmed: phoneConfirmed,
      phone: normalizedPhone,
    });
  }, [onStatusChange, phoneConfirmed, normalizedPhone]);

  return {
    COUNTRY_CODES,
    editingPhone,
    setEditingPhone,
    dropdownOpen,
    setDropdownOpen,
    phoneConfirmed,
    setPhoneConfirmed,
    phoneMessage,
    phoneError,
    savingPhone,
    countryCode,
    normalizedDigits,
    phoneValid,
    normalizedPhone,
    handleDigitsChange,
    handleSelectCountry,
    handleConfirmPhone,
  };
}
