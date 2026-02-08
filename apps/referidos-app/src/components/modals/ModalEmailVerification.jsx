import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useModal } from "../../modals/useModal";
import EmailVerificationBlock from "../../auth/blocks/EmailVerificationBlock";

export default function ModalEmailVerification({ email }) {
  const { closeModal } = useModal();
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;
      if (!error) {
        setEmailConfirmed(Boolean(data?.user?.email_confirmed_at));
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">
          Verifica tu correo
        </span>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
      <div className="mt-4">
        <EmailVerificationBlock
          email={email}
          emailConfirmed={emailConfirmed}
        />
      </div>
    </div>
  );
}
