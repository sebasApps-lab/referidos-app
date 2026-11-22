import React from "react";
import { ArrowRight, GitBranch, GitPullRequest, PackageCheck, Rocket } from "lucide-react";

const environments = {
  dev: { name: "Desarrollo", branch: "dev", Icon: GitBranch },
  staging: { name: "Staging", branch: "staging", Icon: GitPullRequest },
  prod: { name: "Producción", branch: "main", Icon: Rocket },
};

export default function VersioningSummary({ releases, nextStep, onOpenEnvironment }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E9E2F7] bg-white p-5">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[#2F1A55]">Estado por entorno</h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">{nextStep.detail}</p>
        </div>
        {nextStep.onClick ? (
          <button type="button" onClick={nextStep.onClick} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#5E30A5] px-4 text-sm font-semibold text-white hover:bg-[#4C2686]">
            {nextStep.label}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <ol className="grid gap-3 md:grid-cols-3" aria-label="Desarrollo, staging y producción">
        {releases.map(({ envKey, version, commit, build, status, statusClass }) => {
          const { name, branch, Icon } = environments[envKey];
          return (
            <li key={envKey} className="flex min-w-0 flex-col rounded-2xl border border-[#E9E2F7] bg-white p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F2ECFF] text-[#5E30A5]">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-[#2F1A55]">{name}</h3>
                  <code className="text-xs text-slate-600">{branch}</code>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-xl font-bold text-[#2F1A55]">{version || "Sin release"}</span>
                <span className={"rounded-full px-2.5 py-1 text-xs font-semibold " + statusClass}>{status}</span>
              </div>
              <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                {build ? (
                  <div className="inline-flex items-center gap-1">
                    <PackageCheck size={14} aria-hidden="true" />
                    <dt>Build</dt><dd className="font-semibold text-slate-700">{build}</dd>
                  </div>
                ) : null}
                {commit ? (
                  <div className="inline-flex items-center gap-1">
                    <dt>Commit</dt><dd><code title={commit}>{commit.slice(0, 8)}</code></dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-auto pt-4">
                <button type="button" onClick={() => onOpenEnvironment(envKey)} className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-[#5E30A5] hover:underline" aria-label={"Ver operaciones de " + name}>
                  Ver operaciones <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
