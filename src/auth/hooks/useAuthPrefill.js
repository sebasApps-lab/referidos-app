import { useEffect, useRef } from "react";
import { mapNegocioPrefill } from "../utils/authMappers";

export default function useAuthPrefill({
  usuario,
  onboarding,
  setEntryStep,
  setAuthTab,
  setPage,
  setEmailError,
  setNombreDueno,
  setApellidoDueno,
  setTelefono,
  setRuc,
  setNombreNegocio,
  setSectorNegocio,
  setCalle1,
  setCalle2,
  openChoiceOverlay,
}) {
  const choiceOpenedRef = useRef(false);

  useEffect(() => {
    if (typeof usuario === "undefined") {
      choiceOpenedRef.current = false;
    }
  }, [usuario]);

  useEffect(() => {
    if (typeof usuario === "undefined") return;

    if (!usuario) return;

    //1) Perfil existe pero SIN rol
    if (!usuario.role) {
      if (!choiceOpenedRef.current) {
        choiceOpenedRef.current = true;
        openChoiceOverlay();
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
      setEntryStep("email");
      setAuthTab("login");
      setPage(1);
      setEmailError(boot.reasons?.join(", ") || "Completa tu registro");
      return;
    }

    if (u.role === "negocio") {
      const prefill = mapNegocioPrefill({ usuario: u, onboarding: boot });
      const missingOwner = !u.nombre || !u.apellido || !u.telefono;

      setEntryStep("form");
      setAuthTab("register");
      setPage(missingOwner ? 2 : 3);

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
    openChoiceOverlay,
    setApellidoDueno,
    setAuthTab,
    setCalle1,
    setCalle2,
    setEmailError,
    setEntryStep,
    setNombreDueno,
    setNombreNegocio,
    setPage,
    setRuc,
    setSectorNegocio,
    setTelefono,
    usuario,
  ]);
}
