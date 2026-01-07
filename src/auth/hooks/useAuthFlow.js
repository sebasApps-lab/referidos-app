import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export default function useAuthFlow({ initialEntryStep = "welcome" } = {}) {
  const [cardHeight, setCardHeight] = useState(null);
  const [sliderHeight, setSliderHeight] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [entryStep, setEntryStep] = useState(initialEntryStep);
  const [authTab, setAuthTab] = useState("login");
  const [page, setPage] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [welcomeError, setWelcomeError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthProvider, setOauthProvider] = useState(null);
  const [welcomeLoading, setWelcomeLoading] = useState(false);

  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const sliderRef = useRef(null);
  const regPage1Ref = useRef(null);
  const regPage2Ref = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codeChecking, setCodeChecking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [nombreDueno, setNombreDueno] = useState("");
  const [apellidoDueno, setApellidoDueno] = useState("");
  const [ruc, setRuc] = useState("");
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [sectorNegocio, setSectorNegocio] = useState("");
  const [calle1, setCalle1] = useState("");
  const [calle2, setCalle2] = useState("");

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

  const measureHeights = useCallback(
    (targetPage = page) => {
      const inner = cardInnerRef.current;
      const active = targetPage === 3 ? regPage2Ref.current : regPage1Ref.current;
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
    [page]
  );

  useLayoutEffect(() => {
    if (entryStep !== "form") return;
    measureHeights(page);
  }, [page, entryStep, measureHeights]);

  useEffect(() => {
    if (entryStep !== "form") return;
    const id = requestAnimationFrame(() => measureHeights(page));
    return () => cancelAnimationFrame(id);
  }, [page, entryStep, measureHeights]);

  useEffect(() => {
    if (entryStep !== "form") return;
    const active = page === 3 ? regPage2Ref.current : regPage1Ref.current;
    if (!active) return;
    const ro = new ResizeObserver(() => measureHeights(page));
    ro.observe(active);
    return () => ro.disconnect();
  }, [page, entryStep, measureHeights]);

  const goTo = useCallback((nextPage) => {
    setAnimating(true);
    setPage(nextPage);
    setTimeout(() => setAnimating(false), 360);
  }, []);

  return {
    cardHeight,
    sliderHeight,
    animating,
    entryStep,
    authTab,
    page,
    emailError,
    welcomeError,
    loginLoading,
    oauthLoading,
    oauthProvider,
    welcomeLoading,
    cardRef,
    cardInnerRef,
    sliderRef,
    regPage1Ref,
    regPage2Ref,
    email,
    password,
    passwordConfirm,
    telefono,
    codigo,
    codeChecking,
    showPassword,
    showPasswordConfirm,
    nombreDueno,
    apellidoDueno,
    ruc,
    nombreNegocio,
    sectorNegocio,
    calle1,
    calle2,
    containerStyle,
    setCardHeight,
    setSliderHeight,
    setAnimating,
    setEntryStep,
    setAuthTab,
    setPage,
    setEmailError,
    setWelcomeError,
    setLoginLoading,
    setOauthLoading,
    setOauthProvider,
    setWelcomeLoading,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setTelefono,
    setCodigo,
    setCodeChecking,
    setShowPassword,
    setShowPasswordConfirm,
    setNombreDueno,
    setApellidoDueno,
    setRuc,
    setNombreNegocio,
    setSectorNegocio,
    setCalle1,
    setCalle2,
    goTo,
  };
}
