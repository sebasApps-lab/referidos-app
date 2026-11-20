import TotpEnrollment from "../auth/TotpEnrollment";
import { useModal } from "../../modals/useModal";

export default function ModalTwoFAEnroll({ onComplete }) {
  const { closeModal } = useModal();
  const handleComplete = async () => {
    const result = await onComplete?.();
    if (result?.ok === false) return result;
    closeModal();
  };
  const handleCancel = async ({ verified }) => {
    if (verified) await onComplete?.();
    closeModal();
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl" role="dialog" aria-modal="true" aria-label="Activar verificación en dos pasos">
      <TotpEnrollment modal onCancel={handleCancel} onComplete={handleComplete} />
    </div>
  );
}
