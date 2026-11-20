import { useState, useRef } from "react";
import { challengeAndVerifyTotp, isTotpCode, sanitizeTotpCode } from "../services/mfaService";

export default function useTotpConfirmation() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [verification, setVerification] = useState(null);
  const inFlightRef = useRef(false);

  const updateCode = (value) => {
    setCode(sanitizeTotpCode(value));
    setError("");
  };

  const run = async (action) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    setError("");
    try {
      const result = await action();
      if (result?.ok === false) setError(result.error);
    } catch (error) {
      setError(error?.message || "No se pudo completar la verificación.");
    } finally {
      inFlightRef.current = false;
      setBusy(false);
    }
  };

  const confirm = ({ factorId, authUserId, complete }) => run(async () => {
    let confirmed = verification;
    if (!confirmed) {
      if (!factorId || !isTotpCode(code)) return;
      setCode("");
      const result = await challengeAndVerifyTotp({ factorId, authUserId, code });
      if (!result.ok) return result;
      confirmed = result.data;
      setVerification(confirmed);
    }
    return complete(confirmed.authUserId);
  });

  return { busy, code, updateCode, error, verified: Boolean(verification), confirm, run };
}
