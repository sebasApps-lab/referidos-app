import React, { useMemo, useState } from "react";
import { useModal } from "../../modals/useModal";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];

const parseTime = (value) => {
  const text = String(value || "").trim();
  if (!text) return { hour: "10", minute: "00" };
  const [hour, minute] = text.split(":");
  return {
    hour: hour?.padStart(2, "0") || "10",
    minute: minute?.padStart(2, "0") || "00",
  };
};

export default function ModalTimePicker({
  title = "Selecciona la hora",
  initialTime = "10:00",
  onConfirm,
}) {
  const { closeModal } = useModal();
  const initial = useMemo(() => parseTime(initialTime), [initialTime]);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
      <div className="text-base font-semibold text-[#2F1A55]">{title}</div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <select
          value={hour}
          onChange={(event) => setHour(event.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none"
        >
          {HOURS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-400">:</span>
        <select
          value={minute}
          onChange={(event) => setMinute(event.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none"
        >
          {MINUTES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm?.(`${hour}:${minute}`);
            closeModal();
          }}
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4B2488]"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
