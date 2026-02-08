import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function usePasswordAccess({ provider = "email" } = {}) {
  const [passwordMode, setPasswordMode] = useState("add");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordAttempted, setPasswordAttempted] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const passwordFormRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmInputRef = useRef(null);

  const hasPassword = provider === "email" || provider === "password";
  const passwordActive = passwordEnabled ?? hasPassword;

  useEffect(() => {
    if (!hasPassword) {
      setShowPasswordForm(true);
      setPasswordMode("add");
    }
  }, [hasPassword]);

  const handlePasswordFocus = useCallback((field) => {
    setFocusedField(field);
  }, []);

  const handlePasswordBlur = useCallback(() => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active === currentPasswordRef.current) {
        setFocusedField("current");
        return;
      }
      if (active === passwordInputRef.current) {
        setFocusedField("new");
        return;
      }
      if (active === confirmInputRef.current) {
        setFocusedField("confirm");
        return;
      }
      setFocusedField(null);
    });
  }, []);

  const hasMinLength = passwordValue.length >= 8;
  const hasNumber = /\d/.test(passwordValue);
  const hasSymbol = /[^A-Za-z0-9]/.test(passwordValue);
  const hasNumberAndSymbol = hasNumber && hasSymbol;
  const passwordsMatch =
    passwordValue.length > 0 &&
    passwordConfirm.length > 0 &&
    passwordValue === passwordConfirm;
  const showPasswordRules = focusedField === "new" || passwordValue.length > 0;
  const showPasswordErrors = focusedField !== "new" && passwordValue.length > 0;
  const showConfirmErrors =
    focusedField !== "confirm" && passwordConfirm.length > 0;
  const showConfirmRule =
    hasMinLength && hasNumberAndSymbol && passwordConfirm.length > 0;
  const canSavePassword = hasMinLength && hasNumberAndSymbol && passwordsMatch;
  const showCurrentPasswordError =
    passwordMode === "change" && passwordAttempted && !currentPassword.trim();

  const handlePasswordCancel = () => {
    setPasswordValue("");
    setPasswordConfirm("");
    setCurrentPassword("");
    setFocusedField(null);
    setPasswordMode("add");
    setPasswordAttempted(false);
    setShowPasswordForm(false);
    setError("");
    setMessage("");
    document.activeElement?.blur();
  };

  const handlePasswordSave = useCallback(async () => {
    setPasswordAttempted(true);
    setError("");
    setMessage("");
    if (!canSavePassword) return;
    if (passwordMode === "change" && !currentPassword.trim()) return;
    setSaving(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke(
        "set-password",
        {
          body: { password: passwordValue },
        },
      );
      if (fnErr || data?.ok === false) {
        setError(
          fnErr?.message || data?.message || "No se pudo guardar la contrasena.",
        );
        return { ok: false };
      }
      setPasswordEnabled(true);
      setShowPasswordForm(false);
      setPasswordMode("add");
      setPasswordAttempted(false);
      setMessage("Contrasena guardada.");
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (userId) {
        await supabase
          .from("usuarios")
          .update({ has_password: true, must_change_password: false })
          .eq("id_auth", userId);
      }
      return { ok: true };
    } finally {
      setSaving(false);
    }
  }, [canSavePassword, currentPassword, passwordMode, passwordValue]);

  const openAddPassword = () => {
    setPasswordMode("add");
    setCurrentPassword("");
    setPasswordValue("");
    setPasswordConfirm("");
    setPasswordAttempted(false);
    setShowPasswordForm(true);
  };

  const openChangePassword = () => {
    setPasswordMode("change");
    setCurrentPassword("");
    setPasswordValue("");
    setPasswordConfirm("");
    setPasswordAttempted(false);
    setShowPasswordForm(true);
  };

  const removePassword = () => {
    setPasswordEnabled(false);
    setShowPasswordForm(false);
  };

  const passwordSaved = passwordEnabled === true;

  return {
    passwordActive,
    showPasswordForm,
    passwordMode,
    currentPassword,
    passwordValue,
    passwordConfirm,
    showPassword,
    showPasswordConfirm,
    showCurrentPassword,
    hasMinLength,
    hasNumberAndSymbol,
    passwordsMatch,
    showPasswordRules,
    showPasswordErrors,
    showConfirmErrors,
    showConfirmRule,
    canSavePassword,
    showCurrentPasswordError,
    onPasswordCancel: handlePasswordCancel,
    onPasswordSave: handlePasswordSave,
    onOpenAdd: openAddPassword,
    onOpenChange: openChangePassword,
    onRemovePassword: removePassword,
    onToggleShowPassword: () => setShowPassword((prev) => !prev),
    onToggleShowPasswordConfirm: () => setShowPasswordConfirm((prev) => !prev),
    onToggleShowCurrentPassword: () =>
      setShowCurrentPassword((prev) => !prev),
    onChangeCurrentPassword: (event) => setCurrentPassword(event.target.value),
    onChangePasswordValue: (event) => setPasswordValue(event.target.value),
    onChangePasswordConfirm: (event) => setPasswordConfirm(event.target.value),
    onFocusField: handlePasswordFocus,
    onBlurField: handlePasswordBlur,
    passwordFormRef,
    currentPasswordRef,
    passwordInputRef,
    confirmInputRef,
    passwordSaved,
    saving,
    error,
    message,
  };
}
