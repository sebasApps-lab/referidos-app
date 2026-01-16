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
  setHorarios,
  setSectorNegocio,
  setCalle1,
  setCalle2,
  setDireccionPayload,
  setIsAddressPrefillReady,
}) {
  const choiceOpenedRef = useRef(false);
  const direccionRequestRef = useRef(0);

  useEffect(() => {
    if (typeof usuario === "undefined") {
      choiceOpenedRef.current = false;
      setIsAddressPrefillReady?.(false);
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
    setIsAddressPrefillReady,
    setIsSucursalPrincipal,
    setOwnerPrefill,
    usuario,
  ]);

  useEffect(() => {
    if (typeof usuario === "undefined") return;

    const onboardingOk = onboarding?.ok === true;

    if (!usuario) {
      setIsAddressPrefillReady?.(false);
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
      setIsAddressPrefillReady?.(false);
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
      setIsAddressPrefillReady?.(true);
      return;
    }

    //Si no hay allowAccess: decidir siguientes pasos segÇ§n rol
    if (u.role === "admin") {
      setIsAddressPrefillReady?.(true);
      return;
    }

    if (u.role === "cliente") {
      setIsAddressPrefillReady?.(true);
      setStep(AUTH_STEPS.EMAIL_LOGIN);
      setEmailError(boot.reasons?.join(", ") || "Completa tu registro");
      return;
    }

    if (u.role === "negocio") {
      setIsAddressPrefillReady?.(false);
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
      setSectorNegocio(prefill.sectorNegocio);
      setCalle1(prefill.calle1);
      setCalle2(prefill.calle2);

      const requestId = ++direccionRequestRef.current;
      const finalizeDireccion = () => {
        if (requestId === direccionRequestRef.current) {
          setIsAddressPrefillReady?.(true);
        }
      };
      const loadSucursal = async () => {
        let negocioId = neg?.id || null;
        if (!negocioId && u?.id) {
          const { data: negRow } = await supabase
            .from("negocios")
            .select("id")
            .eq("usuarioid", u.id)
            .maybeSingle();
          negocioId = negRow?.id || null;
        }
        if (!negocioId) {
          finalizeDireccion();
          return;
        }

        const { data, error } = await supabase
          .from("sucursales")
          .select("id, direccion_id, status, tipo, horarios, fechacreacion")
          .eq("negocioid", negocioId)
          .order("fechacreacion", { ascending: false });

        if (requestId !== direccionRequestRef.current) return;
        if (error || !data) {
          finalizeDireccion();
          return;
        }

        const rows = Array.isArray(data) ? data : [];
        const draft = rows.find(
          (row) => String(row.status || "draft").toLowerCase() === "draft"
        );
        const principal = rows.find(
          (row) => String(row.tipo || "").toLowerCase() === "principal"
        );
        const picked = draft || principal || rows[0] || null;
        if (picked?.tipo) {
          setIsSucursalPrincipal(picked.tipo === "principal");
        }
        if (picked?.horarios) {
          setHorarios?.(picked.horarios);
        }
        if (picked?.direccion_id) {
          const { data: dirData, error: dirErr } = await supabase
            .from("direcciones")
            .select("calles, referencia, sector, ciudad, parroquia, parroquia_id, lat, lng, place_id, label, provider, provincia_id, canton_id")
            .eq("id", picked.direccion_id)
            .maybeSingle();

          if (requestId !== direccionRequestRef.current) return;
          if (dirErr || !dirData) {
            finalizeDireccion();
            return;
          }
          setCalle1(dirData.calles || "");
          setCalle2("");
          setSectorNegocio(dirData.sector || "");
          const hasUbicacion =
            Boolean(dirData.ciudad) ||
            Boolean(dirData.parroquia_id) ||
            Boolean(dirData.parroquia);
          const hasDireccionFields =
            Boolean(dirData.calles) &&
            hasUbicacion &&
            Boolean(dirData.sector) &&
            Boolean(dirData.provincia_id) &&
            Boolean(dirData.canton_id) &&
            dirData.lat != null &&
            dirData.lng != null;

          if (hasDireccionFields) {
            setDireccionPayload?.({
              place_id: dirData.place_id || "",
              label: dirData.label || "",
              display_label: dirData.label || "",
              provider: dirData.provider || "",
              lat: dirData.lat ?? null,
              lng: dirData.lng ?? null,
              provincia_id: dirData.provincia_id || "",
              canton_id: dirData.canton_id || "",
              parroquia_id: dirData.parroquia_id || "",
              parroquia: dirData.parroquia || "",
              ciudad: dirData.ciudad || "",
              sector: dirData.sector || "",
              calles: dirData.calles || "",
              house_number: "",
              postcode: "",
              referencia: dirData.referencia || "",
              provincia: "",
              canton: "",
              country: "",
            });
          }
          finalizeDireccion();
          return;
        }

        const { data: fallbackDir, error: fallbackErr } = await supabase
          .from("direcciones")
          .select("calles, referencia, sector, ciudad, parroquia, parroquia_id, lat, lng, place_id, label, provider, provincia_id, canton_id")
          .eq("owner_id", u.id)
          .eq("is_user_provided", true)
          .order("updated_at", { ascending: false })
          .order("created_at", { ascending: false })
          .maybeSingle();

        if (requestId !== direccionRequestRef.current) return;
        if (fallbackErr || !fallbackDir) {
          finalizeDireccion();
          return;
        }
        setCalle1(fallbackDir.calles || "");
        setCalle2("");
        setSectorNegocio(fallbackDir.sector || "");
        const hasUbicacion =
          Boolean(fallbackDir.ciudad) ||
          Boolean(fallbackDir.parroquia_id) ||
          Boolean(fallbackDir.parroquia);
        const hasDireccionFields =
          Boolean(fallbackDir.calles) &&
          hasUbicacion &&
          Boolean(fallbackDir.sector) &&
          Boolean(fallbackDir.provincia_id) &&
          Boolean(fallbackDir.canton_id) &&
          fallbackDir.lat != null &&
          fallbackDir.lng != null;

        if (hasDireccionFields) {
          setDireccionPayload?.({
            place_id: fallbackDir.place_id || "",
            label: fallbackDir.label || "",
            display_label: fallbackDir.label || "",
            provider: fallbackDir.provider || "",
            lat: fallbackDir.lat ?? null,
            lng: fallbackDir.lng ?? null,
            provincia_id: fallbackDir.provincia_id || "",
            canton_id: fallbackDir.canton_id || "",
            parroquia_id: fallbackDir.parroquia_id || "",
            parroquia: fallbackDir.parroquia || "",
            ciudad: fallbackDir.ciudad || "",
            sector: fallbackDir.sector || "",
            calles: fallbackDir.calles || "",
            house_number: "",
            postcode: "",
            referencia: fallbackDir.referencia || "",
            provincia: "",
            canton: "",
            country: "",
          });
        }
        finalizeDireccion();
      };

      loadSucursal().catch(() => finalizeDireccion());
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
    setIsAddressPrefillReady,
    setNombreNegocio,
    setOwnerPrefill,
    setIsSucursalPrincipal,
    setHorarios,
    setSectorNegocio,
    setTelefono,
    usuario,
    setHorarios,
  ]);
}
