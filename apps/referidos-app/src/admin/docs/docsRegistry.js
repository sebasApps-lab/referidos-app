import repoRootReadme from "../../../../../README.md?raw";
import docsIndex from "../../../../../docs/README.md?raw";
import docsVersioningQuick from "../../../../../docs/versioning-system.md?raw";
import docsVersioningCore from "../../../../../docs/referidos-system/README.md?raw";
import pwaDocsReadme from "../../../docs/README.md?raw";
import prelaunchDocsReadme from "../../../../../apps/prelaunch/docs/README.md?raw";
import androidDocsReadme from "../../../../../apps/referidos-android/docs/README.md?raw";
import androidAppReadme from "../../../../../apps/referidos-android/README.md?raw";
import androidMigrationPlan from "../../../../../docs/android-migration-plan.md?raw";
import androidParityChecklist from "../../../../../docs/android-parity-checklist.md?raw";
import androidPhasePlaybook from "../../../../../docs/android-phase-playbook.md?raw";

export const DOC_GROUPS = [
  { key: "general", label: "General del repo" },
  { key: "referidos_app", label: "PWA principal" },
  { key: "prelaunch_web", label: "Prelaunch" },
  { key: "android_app", label: "Android" },
];

export const DOCS_REGISTRY = [
  {
    id: "repo-readme",
    group: "general",
    title: "README del monorepo",
    pathLabel: "README.md",
    markdown: repoRootReadme,
  },
  {
    id: "docs-index",
    group: "general",
    title: "Indice de documentacion",
    pathLabel: "docs/README.md",
    markdown: docsIndex,
  },
  {
    id: "docs-versioning-core",
    group: "general",
    title: "Versionado (guia completa)",
    pathLabel: "docs/referidos-system/README.md",
    markdown: docsVersioningCore,
  },
  {
    id: "docs-versioning-quick",
    group: "general",
    title: "Versionado (atajo)",
    pathLabel: "docs/versioning-system.md",
    markdown: docsVersioningQuick,
  },
  {
    id: "pwa-docs-readme",
    group: "referidos_app",
    title: "PWA: guia de la app",
    pathLabel: "apps/referidos-app/docs/README.md",
    markdown: pwaDocsReadme,
  },
  {
    id: "prelaunch-docs-readme",
    group: "prelaunch_web",
    title: "Prelaunch: guia de la app",
    pathLabel: "apps/prelaunch/docs/README.md",
    markdown: prelaunchDocsReadme,
  },
  {
    id: "android-docs-readme",
    group: "android_app",
    title: "Android: guia de la app",
    pathLabel: "apps/referidos-android/docs/README.md",
    markdown: androidDocsReadme,
  },
  {
    id: "android-readme",
    group: "android_app",
    title: "Android: README tecnico",
    pathLabel: "apps/referidos-android/README.md",
    markdown: androidAppReadme,
  },
  {
    id: "android-migration",
    group: "android_app",
    title: "Android migration plan",
    pathLabel: "docs/android-migration-plan.md",
    markdown: androidMigrationPlan,
  },
  {
    id: "android-parity",
    group: "android_app",
    title: "Android parity checklist",
    pathLabel: "docs/android-parity-checklist.md",
    markdown: androidParityChecklist,
  },
  {
    id: "android-phase-playbook",
    group: "android_app",
    title: "Android phase playbook",
    pathLabel: "docs/android-phase-playbook.md",
    markdown: androidPhasePlaybook,
  },
];

