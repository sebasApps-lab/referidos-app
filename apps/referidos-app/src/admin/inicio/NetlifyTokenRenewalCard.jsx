import React, { useEffect, useMemo, useState } from "react";
import { KeyRound, RefreshCw } from "lucide-react";

const STORAGE_KEY = "admin.versioning.netlify_auth_token.last_renewed_at";
const TOKEN_VALID_DAYS = 45;
const DAY_MS = 24 * 60 * 60 * 1000;

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseStoredDate(value) {
  if (!value || typeof value !== "string") return null;
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export default function NetlifyTokenRenewalCard() {
  const [lastRenewedInput, setLastRenewedInput] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLastRenewedInput(stored);
    }
  }, []);

  const computed = useMemo(() => {
    const baseDate = parseStoredDate(lastRenewedInput);
    if (!baseDate) {
      return {
        hasDate: false,
        nextDate: null,
        remainingDays: null,
        expired: false,
      };
    }

    const nextDate = new Date(baseDate.getTime() + TOKEN_VALID_DAYS * DAY_MS);
    const now = new Date();
    const remaining = Math.ceil((nextDate.getTime() - now.getTime()) / DAY_MS);

    return {
      hasDate: true,
      nextDate,
      remainingDays: remaining,
      expired: remaining <= 0,
    };
  }, [lastRenewedInput]);

  const persistDate = (value) => {
    if (!value) {
      window.localStorage.removeItem(STORAGE_KEY);
      setLastRenewedInput("");
      setSavedMessage("Fecha eliminada.");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, value);
    setLastRenewedInput(value);
    setSavedMessage("Fecha guardada.");
  };

  const handleSaveDate = () => {
    persistDate(lastRenewedInput);
  };

  const handleRenewToday = () => {
    const today = toDateInputValue(new Date());
    persistDate(today);
    setSavedMessage("Token marcado como renovado hoy.");
  };

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4FF] text-[#5E30A5]">
            <KeyRound size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">
              Netlify Auth Token
            </div>
            <div className="text-xs text-slate-500">
              Renovacion recomendada cada {TOKEN_VALID_DAYS} dias
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRenewToday}
          className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-[#F7F2FF] px-2 py-1 text-[11px] font-semibold text-[#5E30A5]"
          title="Reiniciar ciclo de 45 dias"
        >
          <RefreshCw size={12} />
          Renovado hoy
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[220px_1fr]">
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            Ultima renovacion
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={lastRenewedInput}
              onChange={(event) => setLastRenewedInput(event.target.value)}
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5]"
            />
            <button
              type="button"
              onClick={handleSaveDate}
              className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]"
            >
              Guardar
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2">
          {computed.hasDate ? (
            <>
              <div className="text-xs text-slate-600">
                Proxima renovacion:{" "}
                <strong className="text-slate-700">
                  {computed.nextDate?.toLocaleDateString("es-EC")}
                </strong>
              </div>
              <div className="mt-1 text-xs">
                {computed.expired ? (
                  <span className="rounded-full bg-red-100 px-2 py-1 font-semibold text-red-700">
                    Vencido hace {Math.abs(computed.remainingDays || 0)} dias
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                    Faltan {computed.remainingDays} dias
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="text-xs text-slate-600">
              Aun no registras la fecha de renovacion. Guarda una fecha o usa{" "}
              <strong>Renovado hoy</strong>.
            </div>
          )}
          {savedMessage ? (
            <div className="mt-2 text-[11px] text-slate-500">{savedMessage}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
