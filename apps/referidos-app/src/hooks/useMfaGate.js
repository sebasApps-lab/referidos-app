import { useCallback, useEffect, useRef, useState } from "react";
import { useModal } from "../modals/useModal";
import { useAppStore } from "../store/appStore";
import { getMfaAssuranceLevel } from "../services/mfaService";

export default function useMfaGate({ enabled = true } = {}) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const logout = useAppStore((s) => s.logout);
  const { openModal, activeModal } = useModal();
  const [checking, setChecking] = useState(false);
  const [required, setRequired] = useState(false);
  const mountedRef = useRef(true);

  const resetGate = useCallback(() => {
    setRequired(false);
    setChecking(false);
  }, []);

  const resolveGate = useCallback(async () => {
    if (!enabled || bootstrap || typeof usuario === "undefined") return;
    if (!usuario) {
      resetGate();
      return;
    }

    setChecking(true);
    const result = await getMfaAssuranceLevel();
    if (!mountedRef.current) return;
    setChecking(false);
    if (!result.ok) {
      setRequired(false);
      return;
    }
    const currentLevel = result.data?.currentLevel;
    const nextLevel = result.data?.nextLevel;
    const needsMfa = currentLevel === "aal1" && nextLevel === "aal2";
    setRequired(needsMfa);
  }, [bootstrap, enabled, resetGate, usuario]);

  useEffect(() => {
    mountedRef.current = true;
    resolveGate();
    return () => {
      mountedRef.current = false;
    };
  }, [resolveGate]);

  useEffect(() => {
    if (!required) return;
    if (activeModal) return;
    openModal("TwoFAVerify", {
      onVerified: () => {
        setRequired(false);
      },
      onCancel: async () => {
        await logout();
      },
    });
  }, [activeModal, logout, openModal, required]);

  return {
    checking,
    required,
    blockAccess: checking || required,
    refresh: resolveGate,
  };
}
