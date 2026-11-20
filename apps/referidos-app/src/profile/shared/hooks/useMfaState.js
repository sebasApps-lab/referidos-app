import { useCallback, useEffect, useRef, useState } from "react";
import { listMfaFactors, pickActiveTotpFactor } from "../../../services/mfaService";
import { useAppStore } from "../../../store/appStore";

export default function useMfaState(explicitAuthUserId) {
  const profileAuthUserId = useAppStore((state) => state.usuario?.id_auth);
  const authUserId = explicitAuthUserId || profileAuthUserId;
  const [state, setState] = useState(null);
  const attemptRef = useRef(0);

  const refresh = useCallback(async () => {
    const attempt = ++attemptRef.current;
    setState(null);
    const result = await listMfaFactors(authUserId);
    if (attempt !== attemptRef.current) return result;
    setState({ authUserId, result });
    return result;
  }, [authUserId]);

  useEffect(() => {
    void refresh();
    return () => { attemptRef.current += 1; };
  }, [refresh]);

  const result = state?.authUserId === authUserId ? state?.result : null;
  const totpFactors = result?.data?.totp || [];
  const activeTotp = pickActiveTotpFactor(totpFactors);

  return {
    loading: !result,
    error: result?.error || "",
    totpEnabled: Boolean(activeTotp),
    totpFactorId: activeTotp?.id ?? null,
    totpStatus: activeTotp?.status || "",
    totpFactors,
    refresh,
  };
}
