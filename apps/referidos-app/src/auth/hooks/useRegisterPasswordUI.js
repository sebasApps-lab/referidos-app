import { useCallback, useState } from "react";

export default function useRegisterPasswordUI({
  password,
  passwordConfirm,
  passwordInputRef,
  confirmInputRef,
  hasMinLength,
  hasNumberAndSymbol,
}) {
  const [focusedField, setFocusedField] = useState(null);

  const onFocusField = useCallback((field) => {
    setFocusedField(field);
  }, []);

  const onBlurField = useCallback(() => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
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
  }, [passwordInputRef, confirmInputRef]);

  const showPasswordRules = focusedField === "new" || password.length > 0;
  const showPasswordErrors = focusedField !== "new" && password.length > 0;
  const showConfirmErrors =
    focusedField !== "confirm" && passwordConfirm.length > 0;
  const showConfirmRule =
    hasMinLength && hasNumberAndSymbol && passwordConfirm.length > 0;

  return {
    onFocusField,
    onBlurField,
    showPasswordRules,
    showPasswordErrors,
    showConfirmErrors,
    showConfirmRule,
  };
}
