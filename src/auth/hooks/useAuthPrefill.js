import { useEffect, useRef } from "react";
import { AUTH_STEPS } from "../constants/authSteps";
import { mapNegocioPrefill } from "../utils/authMappers";

export default function useAuthPrefill({
  usuario,
  onboarding,
  setStep,
  setEmailError,
  setNombreDueno,
  setApellidoDueno,
  setTelefono,
  setRuc,
  setNombreNegocio,
  setSectorNegocio,
  setCalle1,
  setCalle2,
}) {
  const choiceOpenedRef = useRef(false);

  useEffect(() => {
    if (typeof usuario === "undefined") {
      choiceOpenedRef.current = false;
    }
  }, [usuario]);

  useEffect(() => {
    if (typeof usuario === "undefined") return;

    const onboardingOk = onboarding?.ok === true;

    if (!usuario) {
      if (onboardingOk && !choiceOpenedRef.current) {
        choiceOpenedRef.current = true;
        setStep(AUTH_STEPS.ROLE_SELECT);
      }
      return;
    }

    //1) Perfil existe pero SIN rol
    if (!usuario.role) {
      if (!choiceOpenedRef.current) {
        choiceOpenedRef.current = true;
        setStep(AUTH_STEPS.ROLE_SELECT);
      }
      return;
    }

    const u = usuario;
    const boot = onboarding || {};
    const neg = boot.negocio ?? null;
    const allowAccess = !!boot.allowAccess;

    if (allowAccess) {
      return;
    }

    //Si no hay allowAccess: decidir siguientes pasos segÇ§n rol
    if (u.role === "admin") return;

    if (u.role === "cliente") {
      setStep(AUTH_STEPS.EMAIL_LOGIN);
      setEmailError(boot.reasons?.join(", ") || "Completa tu registro");
      return;
    }

    if (u.role === "negocio") {
      const prefill = mapNegocioPrefill({ usuario: u, onboarding: boot });
      const missingOwner = !u.nombre || !u.apellido || !u.telefono;

      setStep(
        missingOwner ? AUTH_STEPS.OWNER_DATA : AUTH_STEPS.BUSINESS_DATA
      );

      setNombreDueno(prefill.nombreDueno);
      setApellidoDueno(prefill.apellidoDueno);
      setTelefono(prefill.telefono);
      setRuc(prefill.ruc);
      setNombreNegocio(prefill.nombreNegocio);
      setSectorNegocio(prefill.sectorNegocio);
      setCalle1(prefill.calle1);
      setCalle2(prefill.calle2);
    }
  }, [
    onboarding,
    setApellidoDueno,
    setCalle1,
    setCalle2,
    setEmailError,
    setStep,
    setNombreDueno,
    setNombreNegocio,
    setRuc,
    setSectorNegocio,
    setTelefono,
    usuario,
  ]);
}
