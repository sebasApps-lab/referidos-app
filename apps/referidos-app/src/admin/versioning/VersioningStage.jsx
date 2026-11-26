import React from "react";
import { CheckCircle2, Circle, RefreshCw, XCircle } from "lucide-react";

const progressStyles = {
  success: { label: "Completado", Icon: CheckCircle2, color: "text-emerald-700" },
  error: { label: "Error", Icon: XCircle, color: "text-red-700" },
  running: { label: "En curso", Icon: RefreshCw, color: "text-[#5E30A5]" },
  pending: { label: "Pendiente", Icon: Circle, color: "text-slate-500" },
};

export function VersioningStageProgress({ progress, message }) {
  if (!progress && !message) return null;
  const { color } = progressStyles[progress?.status] || progressStyles.pending;
  return (
    <div role="status" className="space-y-2 border-t border-[#EEE8F8] pt-4 text-sm text-slate-700">
      {progress?.headline ? <p className={"font-semibold " + color}>{progress.headline}</p> : null}
      {[...new Set([message, progress?.detail].filter(Boolean))].map((line) => (
        <p className="break-words" key={line}>{line}</p>
      ))}
      {progress?.steps?.length ? (
        <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {progress.steps.map((step) => {
            const { label, Icon, color: stepColor } = progressStyles[step.status] || progressStyles.pending;
            return (
              <li key={step.key} className="flex items-start gap-2 rounded-lg bg-[#FAF8FF] px-2.5 py-2 text-xs">
                {React.createElement(Icon, { size: 14, className: "mt-0.5 shrink-0 " + stepColor + (step.status === "running" ? " animate-spin" : ""), "aria-hidden": true })}
                <span className="min-w-0 break-words">{step.label}<span className="block text-slate-600">{label}</span></span>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}

export default function VersioningStage({ title, target, next, action, secondaryAction, children }) {
  return (
    <section id="versioning-stage" aria-labelledby="versioning-stage-title" className="min-w-0 scroll-mt-4 space-y-4 rounded-2xl border border-[#E9E2F7] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id="versioning-stage-title" className="text-lg font-bold text-[#2F1A55]">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">{next}</p>
        </div>
        {action || secondaryAction ? (
          <div className="flex flex-wrap items-center gap-2">{secondaryAction}{action}</div>
        ) : null}
      </div>

      {target ? (
        <dl className="grid gap-2 sm:grid-cols-3">
          {[
            ["Rama GitHub", target.branch],
            ["Supabase de destino", target.supabase],
            ["Netlify", target.netlify || (target.branch === "dev" ? "Vista previa" : "Sin destino web")],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-xl border border-[#EEE8F8] bg-[#FAF8FF] px-3 py-2.5">
              <dt className="text-xs text-slate-600">{label}</dt>
              <dd className="mt-0.5 break-words font-mono text-sm font-semibold text-[#2F1A55]">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {children}
    </section>
  );
}
