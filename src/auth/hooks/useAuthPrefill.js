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
  setGenero,
  setTelefono,
  setFechaNacimiento,
  setOwnerPrefill,
  setBusinessPrefill,
  setNombreNegocio,
  setCategoriaNegocio,
  setIsSucursalPrincipal,
  setSectorNegocio,
  setCalle1,
  setCalle2,
  setDireccionPayload,
}) {
  const choiceOpenedRef = useRef(false);
  const direccionRequestRef = useRef(0);

  useEffect(() => {
    if (typeof usuario === "undefined") {
      choiceOpenedRef.current = false;
      setOwnerPrefill?.({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "",
      });
      setGenero?.("no_especificar");
      setBusinessPrefill?.({
        nombreNegocio: "",
        ruc: "",
        categoriaNegocio: "",
      });
      setCategoriaNegocio?.("");
      setIsSucursalPrincipal?.(false);
      setDireccionPayload?.({
        place_id: "",
        label: "",
        display_label: "",
        provider: "",
        lat: null,
        lng: null,
        provincia_id: "",
        canton_id: "",
        parroquia_id: "",
        parroquia: "",
        ciudad: "",
        sector: "",
        calles: "",
        house_number: "",
        postcode: "",
        provincia: "",
        canton: "",
        country: "",
      });
    }
  }, [
    setBusinessPrefill,
    setCategoriaNegocio,
    setDireccionPayload,
    setGenero,
    setIsSucursalPrincipal,
    setOwnerPrefill,
    usuario,
  ]);

  useEffect(() => {
    if (typeof usuario === "undefined") return;

    const onboardingOk = onboarding?.ok === true;

    if (!usuario) {
      setOwnerPrefill?.({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "",
      });
      setGenero?.("no_especificar");
      setBusinessPrefill?.({
        nombreNegocio: "",
        ruc: "",
        categoriaNegocio: "",
      });
      setCategoriaNegocio?.("");
      setIsSucursalPrincipal?.(false);
      setDireccionPayload?.({
        place_id: "",
        label: "",
        display_label: "",
        provider: "",
        lat: null,
        lng: null,
        provincia_id: "",
        canton_id: "",
        parroquia_id: "",
        parroquia: "",
        ciudad: "",
        sector: "",
        calles: "",
        house_number: "",
        postcode: "",
        provincia: "",
        canton: "",
        country: "",
      });
      if (onboardingOk && !choiceOpenedRef.current) {
        choiceOpenedRef.current = true;
        setStep(AUTH_STEPS.ROLE_SELECT);
      }
      return;
    }

    //1) Perfil existe pero SIN rol
    if (!usuario.role) {
      setOwnerPrefill?.({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "",
      });
      setGenero?.("no_especificar");
      setBusinessPrefill?.({
        nombreNegocio: "",
        ruc: "",
        categoriaNegocio: "",
      });
      setCategoriaNegocio?.("");
      setIsSucursalPrincipal?.(false);
      setDireccionPayload?.({
        place_id: "",
        label: "",
        display_label: "",
        provider: "",
        lat: null,
        lng: null,
        provincia_id: "",
        canton_id: "",
        parroquia_id: "",
        parroquia: "",
        ciudad: "",
        sector: "",
        calles: "",
        house_number: "",
        postcode: "",
        provincia: "",
        canton: "",
        country: "",
      });
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
        !u.nombre || !u.apellido || !u.fecha_nacimiento || !u.genero;
      const reasons = boot.reasons || [];
      const missingBusinessRow = reasons.includes("missing_business_row");
      const missingBusinessFields =
        reasons.some((reason) => reason.startsWith("missing_business_fields"));
      const missingAddress =
        reasons.includes("missing_address_row") ||
        reasons.includes("missing_address_fields") ||
        reasons.includes("missing_sucursales_row") ||
        reasons.includes("missing_sucursales_fields");
      const prefillNombre = normalizeOwnerName(prefill.nombreDueno || "");
      const prefillApellido = normalizeOwnerName(prefill.apellidoDueno || "");
      const prefillFecha = formatBirthdateForInput(u.fecha_nacimiento);
      const prefillGenero = u.genero || "";
      const prefillCategoria = prefill.categoriaNegocio || "";
      const prefillTipo = neg?.tipo || null;

      if (missingOwner) {
        setStep(AUTH_STEPS.OWNER_DATA);
      } else if (missingBusinessRow || missingBusinessFields) {
        setStep(AUTH_STEPS.BUSINESS_DATA);
      } else if (missingAddress) {
        setStep(AUTH_STEPS.BUSINESS_ADDRESS);
      } else {
        setStep(AUTH_STEPS.BUSINESS_DATA);
      }

      setNombreDueno(prefillNombre);
      setApellidoDueno(prefillApellido);
      setTelefono(prefill.telefono);
      setFechaNacimiento(prefillFecha);
      setOwnerPrefill?.({
        nombre: prefillNombre,
        apellido: prefillApellido,
        fechaNacimiento: prefillFecha,
        genero: prefillGenero,
      });
      setGenero?.(prefillGenero || "no_especificar");
      setBusinessPrefill?.({
        nombreNegocio: prefill.nombreNegocio || "",
        ruc: prefill.ruc || "",
        categoriaNegocio: prefillCategoria,
      });
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
          .select("calles, sector, ciudad, parroquia, parroquia_id, lat, lng, place_id, label, provider, provincia_id, canton_id")
          .eq("id", direccionId)
          .maybeSingle()
          .then(({ data, error }) => {
            if (requestId !== direccionRequestRef.current) return;
            if (error || !data) return;
            setCalle1(data.calles || "");
            setCalle2("");
            setSectorNegocio(data.sector || "");
            setDireccionPayload?.({
              place_id: data.place_id || "",
              label: data.label || "",
              display_label: data.label || "",
              provider: data.provider || "",
              lat: data.lat ?? null,
              lng: data.lng ?? null,
              provincia_id: data.provincia_id || "",
              canton_id: data.canton_id || "",
              parroquia_id: data.parroquia_id || "",
              parroquia: data.parroquia || "",
              ciudad: data.ciudad || "",
              sector: data.sector || "",
              calles: data.calles || "",
              house_number: "",
              postcode: "",
              provincia: "",
              canton: "",
              country: "",
            });
          })
          .catch(() => {});
      }
    }
  }, [
    onboarding,
    setApellidoDueno,
    setBusinessPrefill,
    setCalle1,
    setCalle2,
    setCategoriaNegocio,
    setDireccionPayload,
    setEmailError,
    setStep,
    setNombreDueno,
    setFechaNacimiento,
    setGenero,
    setNombreNegocio,
    setOwnerPrefill,
    setIsSucursalPrincipal,
    setSectorNegocio,
    setTelefono,
    usuario,
  ]);
}
