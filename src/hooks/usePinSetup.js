import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function usePinSetup({ onSavePin } = {}) {
  const [pinValue, setPinValue] = useState("");
  const [pinFirst, setPinFirst] = useState("");
  const [pinStep, setPinStep] = useState("create");
  const [pinReveal, setPinReveal] = useState([false, false, false, false]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const pinInputRefs = useRef([]);
  const pinRevealTimersRef = useRef([]);
  const focusLockRef = useRef(null);

  const sanitizedPin = useMemo(
    () => pinValue.replace(/[^0-9]/g, "").slice(0, 4),
    [pinValue],
  );
  const pinSlots = useMemo(
    () => Array(4).fill("").map((_, index) => sanitizedPin[index] || ""),
    [sanitizedPin],
  );
  const pinComplete = pinSlots.every(Boolean);
  const pinMatches = pinValue === pinFirst;

  const getFirstEmptyPinIndex = () => pinSlots.findIndex((char) => !char);
  const getLastFilledPinIndex = () => {
    for (let i = pinSlots.length - 1; i >= 0; i -= 1) {
      if (pinSlots[i]) return i;
    }
    return -1;
  };

  const focusPinInput = useCallback((index) => {
    focusLockRef.current = index;
    window.requestAnimationFrame(() => {
      pinInputRefs.current[index]?.focus();
    });
  }, []);

  const setPinRevealIndex = useCallback((index) => {
    setPinReveal((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    if (pinRevealTimersRef.current[index]) {
      clearTimeout(pinRevealTimersRef.current[index]);
    }
    pinRevealTimersRef.current[index] = setTimeout(() => {
      setPinReveal((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }, 400);
  }, []);

  const updatePinSlot = (nextValue) => {
    const cleaned = (nextValue || "").replace(/[^0-9]/g, "");
    if (!cleaned) return;
    const chars = cleaned.split("");
    const nextSlots = [...pinSlots];
    const firstEmpty = getFirstEmptyPinIndex();
    let cursor = firstEmpty === -1 ? nextSlots.length - 1 : firstEmpty;
    chars.forEach((char) => {
      if (cursor < nextSlots.length) {
        nextSlots[cursor] = char;
        setPinRevealIndex(cursor);
        cursor += 1;
      }
    });
    setPinValue(nextSlots.join(""));
    if (cursor < nextSlots.length) {
      focusPinInput(cursor);
    } else {
      pinInputRefs.current[nextSlots.length - 1]?.blur();
    }
  };

  const handlePinKeyDown = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      const lastFilled = getLastFilledPinIndex();
      if (lastFilled === -1) return;
      const nextSlots = [...pinSlots];
      nextSlots[lastFilled] = "";
      setPinValue(nextSlots.join(""));
      focusPinInput(lastFilled);
    }
  };

  const handlePinFocus = (index) => {
    if (focusLockRef.current === index) {
      focusLockRef.current = null;
      return;
    }
    const firstEmpty = getFirstEmptyPinIndex();
    if (firstEmpty === -1 || index === firstEmpty) return;
    focusPinInput(firstEmpty);
  };

  const registerPinRef = (index) => (el) => {
    pinInputRefs.current[index] = el;
  };

  const resetPinForm = useCallback(() => {
    setPinValue("");
    setPinFirst("");
    setPinStep("create");
    setPinReveal([false, false, false, false]);
    setError("");
    pinRevealTimersRef.current.forEach((timer) => {
      if (timer) clearTimeout(timer);
    });
    pinRevealTimersRef.current = [];
    document.activeElement?.blur();
  }, []);

  const handlePinNext = () => {
    if (!pinComplete) return;
    setPinFirst(pinValue);
    setPinValue("");
    setPinStep("confirm");
    setPinReveal([false, false, false, false]);
    focusPinInput(0);
  };

  const handlePinConfirm = useCallback(async () => {
    if (!pinComplete || !pinMatches || saving) return { ok: false };
    setSaving(true);
    setError("");
    try {
      if (onSavePin) {
        const result = await onSavePin(pinValue);
        if (!result?.ok) {
          setError(result?.error || "No se pudo guardar el PIN.");
          return { ok: false };
        }
      }
      return { ok: true };
    } finally {
      setSaving(false);
    }
  }, [onSavePin, pinComplete, pinMatches, pinValue, saving]);

  useEffect(() => {
    return () => {
      pinRevealTimersRef.current.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  return {
    pinSlots,
    pinReveal,
    pinStep,
    pinComplete,
    pinMatches,
    saving,
    error,
    setError,
    updatePinSlot,
    handlePinKeyDown,
    handlePinFocus,
    registerPinRef,
    resetPinForm,
    handlePinNext,
    handlePinConfirm,
    focusPinInput,
  };
}
