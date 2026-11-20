import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useModal } from "../modals/useModal";
import { useAppStore } from "../store/appStore";
import { isVerifiedFactor, resolveMfaAccess, verifyMfaSession } from "../services/mfaService";

const readSessionLevel = (token) => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).aal;
  } catch {
    return null;
  }
};

export default function useMfaGate({ enabled = true } = {}) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const logout = useAppStore((s) => s.logout);
  const { openModal, closeModal, activeModal } = useModal();
  const [authRevision, setAuthRevision] = useState(0);
  const [result, setResult] = useState(null);
  const attemptRef = useRef(0);
  const sessionRef = useRef({ token: null, level: null, hasVerifiedFactors: false });
  const authUserId = usuario?.id_auth;
  const accountKey = authUserId || usuario?.id;
  const shouldCheck = enabled && Boolean(usuario) && !bootstrap;
  const checkKey = shouldCheck ? `${accountKey || "session"}:${authRevision}` : null;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const token = session?.access_token || null;
      const level = token ? readSessionLevel(token) : null;
      const hasVerifiedFactors = Boolean(session?.user?.factors?.some(isVerifiedFactor));
      const previous = sessionRef.current;
      const authChanged = ["SIGNED_IN", "SIGNED_OUT"].includes(event) && token !== previous.token;
      const factorAdded = event === "TOKEN_REFRESHED" && hasVerifiedFactors && !previous.hasVerifiedFactors;
      // A refreshed token can lose AAL2 when a verified factor is removed.
      // Decode only to trigger a fresh check. Access is resolved through Supabase.
      const assuranceDropped = event === "TOKEN_REFRESHED" && previous.level === "aal2" && level !== "aal2";
      if (authChanged || factorAdded || assuranceDropped) {
        setAuthRevision((revision) => revision + 1);
      }
      sessionRef.current = { token, level, hasVerifiedFactors };
    });
    return () => subscription.unsubscribe();
  }, []);

  const refresh = useCallback(async () => {
    if (!checkKey) return;
    const attempt = ++attemptRef.current;
    setResult(null);
    const access = await resolveMfaAccess(authUserId);
    if (attempt !== attemptRef.current) return;
    setResult(access.ok ? { checkKey, ...access.data } : { checkKey, error: access.error });
  }, [authUserId, checkKey]);

  useEffect(() => {
    if (!checkKey) setResult(null);
    else void refresh();
    return () => { attemptRef.current += 1; };
  }, [checkKey, refresh]);

  const current = result?.checkKey === checkKey ? result : null;
  const checking = Boolean(checkKey && !current);
  const required = Boolean(current?.required);
  const error = current?.error ?? "";
  const checkedAuthUserId = current?.authUserId;

  useEffect(() => {
    if (!required) {
      if (activeModal === "TwoFAVerify") closeModal();
      return;
    }
    if (activeModal) return;
    const attempt = attemptRef.current;
    openModal("TwoFAVerify", {
      authUserId: checkedAuthUserId,
      onVerified: async () => {
        const assurance = await verifyMfaSession(checkedAuthUserId);
        if (!assurance.ok) return assurance;
        if (attempt !== attemptRef.current) {
          return { ok: false, error: "La sesión cambió. Vuelve a iniciar sesión." };
        }
        setResult({ checkKey, required: false });
        return assurance;
      },
      onCancel: logout,
    });
  }, [activeModal, checkedAuthUserId, checkKey, closeModal, logout, openModal, required]);

  return { checking, required, error, blockAccess: checking || required || Boolean(error), refresh };
}
