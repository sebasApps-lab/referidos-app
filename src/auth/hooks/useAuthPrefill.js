import { useEffect, useRef } from "react";
import { AUTH_STEPS } from "../constants/authSteps";
import { mapNegocioPrefill } from "../utils/authMappers";
import { formatBirthdateForInput, normalizeOwnerName } from "../utils/ownerDataUtils";
import { supabase } from "../../lib/supabaseClient";

export default function useAuthPrefill({
  usuario,
  onboarding,
  setStep,
  setEmailError,
  setNombreDueno,
  setApellidoDueno,
  setTelefono,
  setFechaNacimiento,
  setOwnerPrefill,
  setRuc,
  setNombreNegocio,
  setCategoriaNegocio,
  setIsSucursalPrincipal,
  setSectorNegocio,
  setCalle1,
  setCalle2,
}) {
  const choiceOpenedRef = useRef(false);
  const direccionRequestRef = useRef(0);

  useEffect(() => {
    if (typeof usuario === "undefined") {
      choiceOpenedRef.current = false;
      setOwnerPrefill?.({ nombre: "", apellido: "", fechaNacimiento: "" });
      setCategoriaNegocio?.("");
      setIsSucursalPrincipal?.(false);
    }
  }, [setCategoriaNegocio, setIsSucursalPrincipal, setOwnerPrefill, usuario]);

  useEffect(() => {
    if (typeof usuario === "undefined") return;

    const onboardingOk = onboarding?.ok === true;

    if (!usuario) {
      setOwnerPrefill?.({ nombre: "", apellido: "", fechaNacimiento: "" });
      setCategoriaNegocio?.("");
      setIsSucursalPrincipal?.(false);
      if (onboardingOk && !choiceOpenedRef.current) {
        choiceOpenedRef.current = true;
        setStep(AUTH_STEPS.ROLE_SELECT);
      }
      return;
    }

    //1) Perfil existe pero SIN rol
    if (!usuario.role) {
      setOwnerPrefill?.({ nombre: "", apellido: "", fechaNacimiento: "" });
      setCategoriaNegocio?.("");
      setIsSucursalPrincipal?.(false);
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
      const missingOwner =
        !u.nombre || !u.apellido || !u.fecha_nacimiento;
      const prefillNombre = normalizeOwnerName(prefill.nombreDueno || "");
      const prefillApellido = normalizeOwnerName(prefill.apellidoDueno || "");
      const prefillFecha = formatBirthdateForInput(u.fecha_nacimiento);
      const prefillCategoria = prefill.categoriaNegocio || "";
      const prefillTipo = neg?.tipo || null;

      setStep(
        missingOwner ? AUTH_STEPS.OWNER_DATA : AUTH_STEPS.BUSINESS_DATA
      );

      setNombreDueno(prefillNombre);
      setApellidoDueno(prefillApellido);
      setTelefono(prefill.telefono);
      setFechaNacimiento(prefillFecha);
      setOwnerPrefill?.({
        nombre: prefillNombre,
        apellido: prefillApellido,
        fechaNacimiento: prefillFecha,
      });
      setRuc(prefill.ruc);
      setNombreNegocio(prefill.nombreNegocio);
      setCategoriaNegocio(prefillCategoria);
      setIsSucursalPrincipal(prefillTipo === "principal");
      setSectorNegocio(prefill.sectorNegocio);
      setCalle1(prefill.calle1);
      setCalle2(prefill.calle2);

      const direccionId =
        neg?.direccion_id || neg?.direccionId || neg?.direccionID || null;

      if (direccionId) {
        const requestId = ++direccionRequestRef.current;
        supabase
          .from("direcciones")
          .select("calle_1, calle_2, sector")
          .eq("id", direccionId)
          .maybeSingle()
          .then(({ data, error }) => {
            if (requestId !== direccionRequestRef.current) return;
            if (error || !data) return;
            setCalle1(data.calle_1 || "");
            setCalle2(data.calle_2 || "");
            setSectorNegocio(data.sector || "");
          })
          .catch(() => {});
      }
    }
  }, [
    onboarding,
    setApellidoDueno,
    setCalle1,
    setCalle2,
    setCategoriaNegocio,
    setEmailError,
    setStep,
    setNombreDueno,
    setFechaNacimiento,
    setNombreNegocio,
    setOwnerPrefill,
    setIsSucursalPrincipal,
    setRuc,
    setSectorNegocio,
    setTelefono,
    usuario,
  ]);
}
