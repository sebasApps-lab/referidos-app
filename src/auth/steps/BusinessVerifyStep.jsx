import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import { validarCedula } from "../../utils/validators";
import ContactPhoneBlock from "../blocks/ContactPhoneBlock";

export default function BusinessVerifyStep({
  innerRef,
  phone,
  ruc,
  onContinue,
  onSkip,
}) {
  const [savingRuc, setSavingRuc] = useState(false);
  const [phoneConfirmed, setPhoneConfirmed] = useState(Boolean(phone));
  const [rucValue, setRucValue] = useState(String(ruc || ""));
  const [rucConfirmed, setRucConfirmed] = useState(Boolean(ruc));
  const [editingRuc, setEditingRuc] = useState(!ruc);
  const [rucError, setRucError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [skipError, setSkipError] = useState("");
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  const normalizedRuc = rucValue.replace(/\D/g, "").slice(0, 13);
  const rucCore = normalizedRuc.slice(0, 10);
  const rucSuffix = normalizedRuc.slice(10);
  const rucValid =
    normalizedRuc.length === 13 &&
    rucSuffix === "001" &&
    validarCedula(rucCore);

  const canContinue = phoneConfirmed && rucConfirmed;

  useEffect(() => {
    if (!ruc || rucValue) return;
    setRucValue(String(ruc));
    setRucConfirmed(true);
    setEditingRuc(false);
  }, [ruc, rucValue]);

  useEffect(() => {
    let active = true;
    if (emailValue) return () => {
      active = false;
    };
    (async () => {
      const { data } = await supabase.auth.getUser();
      const authEmail = data?.user?.email || "";
      if (active && authEmail) {
        setEmailValue(authEmail);
      }
    })();
    return () => {
      active = false;
    };
  }, [emailValue]);

  const handleSkipVerification = async () => {
    setSkipError("");
    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      setSkipError("No se pudo obtener sesión.");
      return;
    }
    const { error: updErr } = await supabase
      .from("usuarios")
      .update({ verification_status: "skipped" })
      .eq("id_auth", userId);
    if (updErr) {
      setSkipError("No se pudo actualizar el estado.");
      return;
    }
    await bootstrapAuth({ force: true });
    if (onSkip) {
      onSkip();
      return;
    }
    window.location.href = "/app";
  };

  const handleSavePhone = async (normalizedPhone) => {
    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      return { ok: false, error: "No se pudo obtener sesión." };
    }
    const { error: updErr } = await supabase
      .from("usuarios")
      .update({ telefono: normalizedPhone })
      .eq("id_auth", userId);
    if (updErr) {
      return {
        ok: false,
        error: updErr.message || "No se pudo guardar el teléfono.",
      };
    }
    return { ok: true, message: "Teléfono guardado." };
  };

  const handleSaveRuc = async () => {
    if (!rucValid || savingRuc) return;
    setSavingRuc(true);
    setRucError("");
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setRucError("No se pudo obtener sesión.");
        return;
      }
      const { data: usuarioRow, error: usuarioErr } = await supabase
        .from("usuarios")
        .select("id")
        .eq("id_auth", userId)
        .maybeSingle();
      if (usuarioErr || !usuarioRow?.id) {
        setRucError("No se pudo obtener el usuario.");
        return;
      }
      const { data: negocioRow, error: negocioErr } = await supabase
        .from("negocios")
        .select("id")
        .eq("usuarioid", usuarioRow.id)
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (negocioErr || !negocioRow?.id) {
        setRucError("No se pudo obtener el negocio.");
        return;
      }
      const { error: updErr } = await supabase
        .from("negocios")
        .update({ ruc: normalizedRuc })
        .eq("id", negocioRow.id);
      if (updErr) {
        setRucError(updErr.message || "No se pudo guardar el RUC.");
        return;
      }
      setRucConfirmed(true);
      setEditingRuc(false);
    } finally {
      setSavingRuc(false);
    }
  };

  return (
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-lg font-semibold text-gray-900 text-center">
            Verifiquemos tu negocio
          </div>
          <p className="text-sm text-gray-600 text-center">
            Ayúdanos a hacer la app más segura para ti y tus clientes.
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="text-sm font-semibold text-gray-900">RUC</div>
          {!editingRuc && rucConfirmed ? (
            <div className="flex items-center gap-2 text-sm text-gray-700 pl-1">
              <span>{normalizedRuc}</span>
              <button
                type="button"
                onClick={() => setEditingRuc(true)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Editar RUC"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={normalizedRuc}
                onChange={(event) => {
                  const next = event.target.value.replace(/\D/g, "").slice(0, 13);
                  setRucValue(next);
                  setRucConfirmed(false);
                  setRucError("");
                }}
                placeholder="Ej: 1791283465001"
                className={`w-full rounded-lg border px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30 ${
                  rucError
                    ? "border-red-300 text-red-500"
                    : "border-gray-200 text-gray-700"
                }`}
              />
              {normalizedRuc.length === 13 && (
                <button
                  type="button"
                  onClick={handleSaveRuc}
                  disabled={!rucValid || savingRuc}
                  className={`absolute right-0 top-0 h-full px-3 text-xs font-semibold border-l ${
                    rucError
                      ? "text-red-500 border-red-300"
                      : "text-[#5E30A5] border-gray-200"
                  } disabled:text-gray-300`}
                >
                  OK
                </button>
              )}
            </div>
          )}
          {rucError && <p className="text-xs text-red-500">{rucError}</p>}
        </div>

        <ContactPhoneBlock
          phone={phone}
          email={emailValue}
          showEmail={false}
          onEmailChange={setEmailValue}
          onSave={handleSavePhone}
          onStatusChange={({ confirmed }) => setPhoneConfirmed(confirmed)}
        />
      </div>

      <div className="mt-auto space-y-3">
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold disabled:opacity-50"
        >
          Continuar
        </button>
        <button
          type="button"
          onClick={handleSkipVerification}
          className="w-full text-sm font-semibold text-gray-500"
        >
          Verificar más tarde
        </button>
        {skipError && (
          <div className="mt-2 text-center text-xs text-red-500">
            {skipError}
          </div>
        )}
      </div>
    </div>
  );
}
