import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { validarCedula } from "../../utils/validators";
import ContactPhoneBlock from "../blocks/ContactPhoneBlock";
import EmailVerificationBlock from "../blocks/EmailVerificationBlock";

export default function AccountVerifyStep({
  innerRef,
  phone,
  ruc,
  emailConfirmed,
}) {
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (phone && ruc && emailConfirmed === false) return "email";
    return "contact";
  });
  const [savingRuc, setSavingRuc] = useState(false);
  const [phoneConfirmed, setPhoneConfirmed] = useState(Boolean(phone));
  const [rucValue, setRucValue] = useState(String(ruc || ""));
  const [rucConfirmed, setRucConfirmed] = useState(Boolean(ruc));
  const [rucMessage, setRucMessage] = useState("");
  const [rucError, setRucError] = useState("");

  const normalizedRuc = rucValue.replace(/\D/g, "").slice(0, 13);
  const rucCore = normalizedRuc.slice(0, 10);
  const rucSuffix = normalizedRuc.slice(10);
  const rucValid =
    normalizedRuc.length === 13 &&
    rucSuffix === "001" &&
    validarCedula(rucCore);

  const canContinue = phoneConfirmed && rucConfirmed;

  const handleSavePhone = async (normalizedPhone) => {
    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      return { ok: false, error: "No se pudo obtener sesion." };
    }
    const { error: updErr } = await supabase
      .from("usuarios")
      .update({ telefono: normalizedPhone })
      .eq("id_auth", userId);
    if (updErr) {
      return {
        ok: false,
        error: updErr.message || "No se pudo guardar el telefono.",
      };
    }
    return { ok: true, message: "Telefono guardado." };
  };

  const handleSaveRuc = async () => {
    if (!rucValid || savingRuc) return;
    setSavingRuc(true);
    setRucMessage("");
    setRucError("");
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setRucError("No se pudo obtener sesion.");
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
      const { data: existing, error: existingErr } = await supabase
        .from("verificacion_negocio")
        .select("id")
        .eq("negocio_id", negocioRow.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (existingErr) {
        setRucError(existingErr.message || "No se pudo validar el RUC.");
        return;
      }
      const payload = {
        negocio_id: negocioRow.id,
        ruc: normalizedRuc,
        estado: "pending",
        fuente: "manual",
      };
      if (existing?.id) {
        const { error: updErr } = await supabase
          .from("verificacion_negocio")
          .update(payload)
          .eq("id", existing.id);
        if (updErr) {
          setRucError(updErr.message || "No se pudo guardar el RUC.");
          return;
        }
      } else {
        const { error: insErr } = await supabase
          .from("verificacion_negocio")
          .insert(payload);
        if (insErr) {
          setRucError(insErr.message || "No se pudo guardar el RUC.");
          return;
        }
      }
      setRucConfirmed(true);
      setRucMessage("RUC guardado.");
    } finally {
      setSavingRuc(false);
    }
  };

  if (currentScreen === "email") {
    return (
      <div className="flex h-full flex-col pb-4" ref={innerRef}>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#5E30A5]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l7 3v6c0 5-3.5 9-7 12-3.5-3-7-7-7-12V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Lleva tu cuenta al siguiente nivel
          </div>
          <p className="text-sm text-gray-600">
            Es opcional, pero te permitira aprovechar mucho mas la app.
          </p>
          <EmailVerificationBlock email={""} />
        </div>
        <button
          type="button"
          onClick={() => (window.location.href = "/app")}
          className="mt-4 w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold"
        >
          Finalizar
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#5E30A5]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l7 3v6c0 5-3.5 9-7 12-3.5-3-7-7-7-12V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Lleva tu cuenta al siguiente nivel
          </div>
          <p className="text-sm text-gray-600">
            Es opcional, pero te permitira aprovechar mucho mas la app.
          </p>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="text-sm font-semibold text-gray-900">
            Verifica tu RUC
          </div>
          <div className="text-xs text-gray-500">
            Ingresalo para completar la verificacion del negocio.
          </div>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={normalizedRuc}
              onChange={(event) => {
                const next = event.target.value.replace(/\D/g, "").slice(0, 13);
                setRucValue(next);
                setRucConfirmed(false);
                setRucMessage("");
                setRucError("");
              }}
              placeholder="0000000000001"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-12 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            />
            <button
              type="button"
              onClick={handleSaveRuc}
              disabled={!rucValid || savingRuc}
              className="absolute right-0 top-0 h-full px-3 text-xs font-semibold text-[#5E30A5] border-l border-gray-200 disabled:text-gray-300"
            >
              OK
            </button>
          </div>
          {rucMessage && (
            <p className="text-xs text-green-600">{rucMessage}</p>
          )}
          {rucError && <p className="text-xs text-red-500">{rucError}</p>}
        </div>

        <ContactPhoneBlock
          phone={phone}
          onSave={handleSavePhone}
          onStatusChange={({ confirmed }) => setPhoneConfirmed(confirmed)}
        />
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => setCurrentScreen("email")}
          disabled={!canContinue}
          className="w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
