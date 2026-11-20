import { useId } from "react";

export default function TotpCodeField({ value, onChange, disabled }) {
  const id = useId();
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="ml-1 block text-xs text-gray-500">
        Código de 6 dígitos
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
        placeholder="123456"
        disabled={disabled}
      />
    </div>
  );
}
