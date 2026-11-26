import React, { useId } from "react";
import { ArrowRight, Check, ChevronRight, GitBranch, GitPullRequest, Rocket } from "lucide-react";

const ENVIRONMENTS = {
  dev: { name: "Desarrollo", branch: "dev", Icon: GitBranch },
  staging: { name: "Staging", branch: "staging", Icon: GitPullRequest },
  prod: { name: "Producción", branch: "main", Icon: Rocket },
};

function EnvironmentCard({ release, selected, onSelect }) {
  const id = useId();
  const { envKey, version, versionLabel, commit, build, status, statusClass, buildDetail } = release;
  const { name, branch, Icon } = ENVIRONMENTS[envKey] || { name: envKey, Icon: GitBranch };
  const commitHash = String(commit || "").trim();
  const hasBuild = Boolean(build || buildDetail);

  return (
    <li
      data-environment={envKey}
      className={`relative min-w-0 rounded-2xl border p-4 sm:p-5 ${
        selected ? "border-[#8C65C4] bg-[#FCFAFF] ring-1 ring-[#E9DFF6]" : "border-[#E9E2F7] bg-white"
      } ${onSelect ? "focus-within:ring-2 focus-within:ring-[#5E30A5] focus-within:ring-offset-2 hover:border-[#A986D6]" : ""}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F2ECFF] text-[#5E30A5]">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0 grow">
          <h3 className="break-words font-semibold text-[#2F1A55]">
            {onSelect ? (
              <button
                type="button"
                data-env={envKey}
                onClick={() => onSelect(envKey)}
                aria-pressed={selected}
                aria-describedby={`${id}-version ${id}-status`}
                className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
              >
                {name}
              </button>
            ) : name}
          </h3>
          {branch ? <code className="text-xs text-slate-600">{branch}</code> : null}
        </div>
        {onSelect ? (
          selected ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F2ECFF] px-2 py-1 text-xs font-semibold text-[#5E30A5]" aria-hidden="true">
              <Check size={13} /> Seleccionado
            </span>
          ) : (
            <ChevronRight size={18} className="mt-1 shrink-0 text-[#5E30A5]" aria-hidden="true" />
          )
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
        <div id={`${id}-version`} className="min-w-0">
          <p className="text-xs text-slate-600">{versionLabel || "Versión registrada"}</p>
          <p className="break-words text-xl font-bold text-[#2F1A55]">{version || "Sin release"}</p>
        </div>
        <p id={`${id}-status`} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass || "bg-slate-100 text-slate-700"}`}>
          {status || "Sin estado"}
        </p>
      </div>

      {hasBuild || commitHash ? (
        <dl className="mt-3 grid gap-1.5 text-xs">
          {hasBuild ? (
            <div className="flex min-w-0 items-baseline gap-2">
              <dt className="text-slate-600">Build</dt>
              <dd className="min-w-0 break-words font-semibold text-slate-700">{build || "—"}</dd>
            </div>
          ) : null}
          {commitHash ? (
            <div className="flex items-baseline gap-2">
              <dt className="text-slate-600">Commit</dt>
              <dd className="relative z-10 font-mono text-slate-700" title={commitHash}>
                <span aria-hidden="true">{commitHash.slice(0, 8)}</span>
                <span className="sr-only">{commitHash}</span>
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      {buildDetail ? <p className="mt-3 break-words border-t border-[#E9E2F7] pt-2 text-xs text-slate-600">{buildDetail}</p> : null}
    </li>
  );
}

export default function VersioningSummary({
  releases = [],
  nextStep,
  selectedEnv,
  onOpenEnvironment,
  heading = "Estado por entorno",
}) {
  const canSelect = typeof onOpenEnvironment === "function";
  const showAction = Boolean(nextStep?.label && typeof nextStep?.onClick === "function");

  return (
    <div className="space-y-3">
      {nextStep?.detail || showAction ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 sm:p-5">
          <div className="min-w-0">
            {heading ? <h2 className="text-lg font-bold text-[#2F1A55]">{heading}</h2> : null}
            {nextStep?.detail ? <p className="max-w-xl text-sm text-slate-600">{nextStep.detail}</p> : null}
          </div>
          {showAction ? (
            <button type="button" onClick={nextStep.onClick} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#5E30A5] px-4 text-sm font-semibold text-white hover:bg-[#4C2686] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E30A5]">
              {nextStep.label}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : heading ? (
        <h2 className="text-lg font-bold text-[#2F1A55]">{heading}</h2>
      ) : null}

      <ol className="grid gap-3 md:grid-cols-3" aria-label="Entornos de publicación">
        {releases.map((release) => (
          <EnvironmentCard
            key={release.envKey}
            release={release}
            selected={canSelect && selectedEnv === release.envKey}
            onSelect={canSelect ? onOpenEnvironment : undefined}
          />
        ))}
      </ol>
    </div>
  );
}
