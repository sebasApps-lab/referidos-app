import TotpEnrollment from "../../components/auth/TotpEnrollment";

export default function AddTwoFAStep({ innerRef, onCancel, onContinue }) {
  return (
    <div className="flex h-full flex-col pb-4 text-gray-700" ref={innerRef}>
      <h2 className="text-center text-lg font-semibold text-gray-900">Activar 2FA</h2>
      <TotpEnrollment onCancel={onCancel} onComplete={onContinue} />
    </div>
  );
}
