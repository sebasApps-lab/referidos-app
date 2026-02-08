import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AUTH_STEPS } from "../constants/authSteps";

export default function useAuthFlow({ initialStep = AUTH_STEPS.WELCOME } = {}) {
  const DEFAULT_HORARIOS = {
    semanal: {
      lunes: [{ abre: "10:00", cierra: "18:00" }],
      martes: [{ abre: "10:00", cierra: "18:00" }],
      miercoles: [{ abre: "10:00", cierra: "18:00" }],
      jueves: [{ abre: "10:00", cierra: "18:00" }],
      viernes: [{ abre: "10:00", cierra: "18:00" }],
      sabado: [],
      domingo: [],
    },
    excepciones: [],
  };
  const [cardHeight, setCardHeight] = useState(null);
  const [sliderHeight, setSliderHeight] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState(initialStep);
  const [emailError, setEmailError] = useState("");
  const [welcomeError, setWelcomeError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthProvider, setOauthProvider] = useState(null);
  const [welcomeLoading, setWelcomeLoading] = useState(false);
  const [isAddressSearchModeOpen, setIsAddressSearchModeOpen] = useState(false);
  const [isAddressPrefillReady, setIsAddressPrefillReady] = useState(false);

  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const sliderRef = useRef(null);
  const regPage1Ref = useRef(null);
  const regPage2Ref = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codeChecking, setCodeChecking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [nombreDueno, setNombreDueno] = useState("");
  const [apellidoDueno, setApellidoDueno] = useState("");
  const [genero, setGenero] = useState("no_especificar");
  const [ownerPrefill, setOwnerPrefill] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    genero: "",
  });
  const [businessPrefill, setBusinessPrefill] = useState({
    nombreNegocio: "",
    ruc: "",
    categoriaNegocio: "",
  });
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [categoriaNegocio, setCategoriaNegocio] = useState("");
  const [isSucursalPrincipal, setIsSucursalPrincipal] = useState(true);
  const [sectorNegocio, setSectorNegocio] = useState("");
  const [calle1, setCalle1] = useState("");
  const [calle2, setCalle2] = useState("");
  const [horarios, setHorarios] = useState(DEFAULT_HORARIOS);
  const [direccionPayload, setDireccionPayload] = useState({
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
    referencia: "",
    provincia: "",
    canton: "",
    country: "",
  });

  const sliderGap = 28;
  const containerStyle = useMemo(
    () => ({
      display: "flex",
      flexDirection: "column",
      gap: sliderGap,
      transition: "opacity 250ms ease",
      filter: animating ? "blur(1.2px)" : "none",
      opacity: animating ? 0.55 : 1,
      width: "100%",
      boxSizing: "border-box",
    }),
    [animating, sliderGap]
  );

  const getActiveFormRef = useCallback(
    (targetStep = step) =>
      [
        AUTH_STEPS.BUSINESS_DATA,
        AUTH_STEPS.BUSINESS_CATEGORY,
        AUTH_STEPS.USER_ADDRESS,
        AUTH_STEPS.BUSINESS_VERIFY,
        AUTH_STEPS.ACCOUNT_VERIFY,
        AUTH_STEPS.ACCOUNT_VERIFY_PROMPT,
        AUTH_STEPS.VERIFY_EMAIL,
        AUTH_STEPS.ACCOUNT_VERIFY_METHOD,
        AUTH_STEPS.ACCOUNT_VERIFY_READY,
        AUTH_STEPS.ADD_PASSWORD,
        AUTH_STEPS.ADD_MFA,
      ].includes(targetStep)
        ? regPage2Ref.current
        : regPage1Ref.current,
    [step]
  );

  const measureHeights = useCallback(
    (targetStep = step) => {
      if (
        targetStep !== AUTH_STEPS.USER_PROFILE &&
        targetStep !== AUTH_STEPS.BUSINESS_DATA
      ) {
        return;
      }
      const inner = cardInnerRef.current;
      const active = getActiveFormRef(targetStep);
      if (!inner || !active) return;
      const p2 = regPage1Ref.current;
      const p3 = regPage2Ref.current;

      const styles = window.getComputedStyle(inner);
      const pt = parseFloat(styles.paddingTop || "0");
      const pb = parseFloat(styles.paddingBottom || "0");
      const hActive = active.scrollHeight;
      const fallbackH = Math.max(p2?.scrollHeight || 0, p3?.scrollHeight || 0);
      const contentH = hActive > 0 ? hActive : fallbackH;

      setSliderHeight(Math.ceil(contentH));
      setCardHeight(Math.ceil(contentH + pt + pb));
    },
    [getActiveFormRef]
  );

  useLayoutEffect(() => {
    measureHeights(step);
  }, [step, measureHeights]);

  useEffect(() => {
    const id = requestAnimationFrame(() => measureHeights(step));
    return () => cancelAnimationFrame(id);
  }, [step, measureHeights]);

  useEffect(() => {
    const active = getActiveFormRef(step);
    if (!active) return;
    const ro = new ResizeObserver(() => measureHeights(step));
    ro.observe(active);
    return () => ro.disconnect();
  }, [getActiveFormRef, step, measureHeights]);

  const goToStep = useCallback((nextStep) => {
    setAnimating(true);
    setStep(nextStep);
    setTimeout(() => setAnimating(false), 360);
  }, []);

  return {
    cardHeight,
    sliderHeight,
    animating,
    step,
    emailError,
    welcomeError,
    loginLoading,
    oauthLoading,
    oauthProvider,
    welcomeLoading,
    isAddressSearchModeOpen,
    isAddressPrefillReady,
    cardRef,
    cardInnerRef,
    sliderRef,
    regPage1Ref,
    regPage2Ref,
    email,
    password,
    passwordConfirm,
    telefono,
    fechaNacimiento,
    codigo,
    codeChecking,
    showPassword,
    showPasswordConfirm,
    nombreDueno,
    apellidoDueno,
    genero,
    ownerPrefill,
    businessPrefill,
    nombreNegocio,
    categoriaNegocio,
    isSucursalPrincipal,
    sectorNegocio,
    calle1,
    calle2,
    horarios,
    direccionPayload,
    containerStyle,
    setCardHeight,
    setSliderHeight,
    setAnimating,
    setStep,
    setEmailError,
    setWelcomeError,
    setLoginLoading,
    setOauthLoading,
    setOauthProvider,
    setWelcomeLoading,
    setIsAddressSearchModeOpen,
    setIsAddressPrefillReady,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setTelefono,
    setFechaNacimiento,
    setCodigo,
    setCodeChecking,
    setShowPassword,
    setShowPasswordConfirm,
    setNombreDueno,
    setApellidoDueno,
    setGenero,
    setOwnerPrefill,
    setBusinessPrefill,
    setNombreNegocio,
    setCategoriaNegocio,
    setIsSucursalPrincipal,
    setSectorNegocio,
    setCalle1,
    setCalle2,
    setHorarios,
    setDireccionPayload,
    goToStep,
  };
}
