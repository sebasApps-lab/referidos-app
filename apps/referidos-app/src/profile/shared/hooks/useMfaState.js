import { useCallback, useEffect, useState } from "react";
import { listMfaFactors, pickActiveTotpFactor } from "../../../services/mfaService";

export default function useMfaState() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totpFactors, setTotpFactors] = useState([]);
  const [activeTotp, setActiveTotp] = useState(null);
  const [totpStatus, setTotpStatus] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await listMfaFactors();
    if (!result.ok) {
      setError(result.error || "No se pudieron cargar factores");
      setTotpFactors([]);
      setActiveTotp(null);
      setLoading(false);
      return;
    }
    const factors = result.data?.totp || [];
    const picked = pickActiveTotpFactor(factors);
    const status = String(picked?.status || "").toLowerCase();
    setTotpFactors(factors);
    setActiveTotp(picked);
    setTotpStatus(status);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    loading,
    error,
    totpEnabled: ["verified", "active"].includes(totpStatus),
    totpFactorId: activeTotp?.id ?? null,
    totpStatus,
    totpFactors,
    refresh,
  };
}
