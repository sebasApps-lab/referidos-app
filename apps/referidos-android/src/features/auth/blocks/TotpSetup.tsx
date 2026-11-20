import React, { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@shared/services/mobileApi";
import QrCodeImage from "@shared/ui/QrCodeImage";
import AddMfaStepBlock from "./AddMfaStepBlock";

const FACTOR_NAME = "Referidos Android";
type Factor = { id: string; secret?: string; uri?: string };

export default function TotpSetup({ onDone, onCancel }: {
  onDone: () => void | Promise<void>;
  onCancel: () => void;
}) {
  const [factor, setFactor] = useState<Factor | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const alive = useRef(false);
  const pending = useRef(false);
  const confirmed = useRef(false);

  const prepare = useCallback(async () => {
    if (pending.current) return;
    pending.current = true;
    confirmed.current = false;
    setLoading(true);
    setEnrollError("");
    setVerifyError("");
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      const active = data.totp.find((item) => item.status === "verified");
      if (!alive.current) return;
      if (active) {
        setFactor({ id: active.id });
        return;
      }

      // Only clear unfinished setups made by this Android flow. Existing verified factors stay available.
      const unfinished = data.all.filter((item) =>
        item.factor_type === "totp" && item.status === "unverified" && item.friendly_name === FACTOR_NAME,
      );
      for (const item of unfinished) {
        const { error: removalError } = await supabase.auth.mfa.unenroll({ factorId: item.id });
        if (removalError) throw removalError;
      }
      if (!alive.current) return;
      const { data: enrolled, error: enrollFailure } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        issuer: "Referidos",
        friendlyName: FACTOR_NAME,
      });
      if (enrollFailure) throw enrollFailure;
      if (alive.current) setFactor({ id: enrolled.id, secret: enrolled.totp.secret, uri: enrolled.totp.uri });
    } catch {
      if (alive.current) setEnrollError("No se pudo preparar la autenticación en dos pasos.");
    } finally {
      pending.current = false;
      if (alive.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    alive.current = true;
    void prepare();
    return () => { alive.current = false; };
  }, [prepare]);

  async function verify(code: string) {
    if (!factor || pending.current || !/^\d{6}$/.test(code)) return;
    pending.current = true;
    setSubmitting(true);
    setVerifyError("");
    try {
      if (!confirmed.current) {
        const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code });
        if (error) {
          setVerifyError("El código no se pudo verificar. Revisa el código actual de tu app autenticadora.");
          return;
        }
        confirmed.current = true;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user.id) throw new Error("no_session");
      const { data: profile, error: saveError } = await supabase.from("usuarios")
        .update({
          mfa_totp_enabled: true,
          mfa_method: "totp",
          mfa_primary_method: "totp",
          mfa_enrolled_at: new Date().toISOString(),
        })
        .eq("id_auth", session.user.id)
        .select("id")
        .maybeSingle();
      if (saveError || !profile) throw saveError ?? new Error("missing_profile");
      if (alive.current) await onDone();
    } catch {
      if (alive.current) setVerifyError("No se pudo guardar la verificación. Reintenta para continuar.");
    } finally {
      pending.current = false;
      if (alive.current) setSubmitting(false);
    }
  }

  return (
    <AddMfaStepBlock
      mode={factor?.secret ? "enroll" : "existing"}
      factorReady={Boolean(factor)}
      qr={factor?.uri ? <QrCodeImage value={factor.uri} label="QR para configurar la aplicación autenticadora" /> : null}
      secret={factor?.secret}
      loading={loading}
      submitting={submitting}
      enrollError={enrollError}
      verifyError={verifyError}
      onRetry={prepare}
      onVerify={verify}
      onCancel={onCancel}
    />
  );
}
