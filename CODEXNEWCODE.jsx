// Reset del ref cuando el flujo de auth se reinicia
useEffect(() => {
  if (typeof usuario === "undefined") {
    choiceOpenedRef.current = false;
  }
}, [usuario]);

useEffect(() => {
  if (typeof usuario === "undefined") return; // bootstrap no resuelto

  // 1) Sesión válida pero SIN perfil
  if (usuario === null) {
    if (!choiceOpenedRef.current) {
      choiceOpenedRef.current = true;
      openChoiceOverlay();
    }
    return;
  }

  // 2) Perfil existe pero SIN rol
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

  // 3) Acceso completo → entrar a la app
  if (allowAccess) {
    navToApp();
    return;
  }

  // 4) Sin acceso: decidir siguientes pasos según rol
  if (u.role === "admin") return; // admin incompleto → esperar siguiente ciclo/guard

  if (u.role === "cliente") {
    setError(boot.reasons?.join(", ") || "Completa tu registro");
    navigate("/auth", { replace: true, state: { openChoice: true } });
    return;
  }

  if (u.role === "negocio") {
    const rawDir = neg?.direccion || "";
    const [c1, c2 = ""] = rawDir.split("|");

    const missingOwner = !u.nombre || !u.apellido || !u.telefono;
    const missingBusiness =
      !u.ruc || !neg || !neg?.nombre || !neg?.sector || !neg?.direccion;

    setEntryStep("form");
    setAuthTab("register");
    setPage(missingOwner ? 2 : 3);

    setNombreDueno(u.nombre || "");
    setApellidoDueno(u.apellido || "");
    setTelefono(u.telefono || "");
    setRuc(u.ruc || "");
    setNombreNegocio(neg?.nombre || "");
    setSectorNegocio(neg?.sector || "");
    setCalle1(c1);
    setCalle2(c2);
  }
}, [usuario, onboarding, navigate]);
