import legalIndexMd from "../../../../../docs/legal/README.md?raw";
import brandPolicyMd from "../../../../../docs/legal/brand-icon-policy.md?raw";
import brandManifestMd from "../../../../../docs/legal/brand-icon-manifest.md?raw";
import legalContentPrivacyEs from "../../../../../packages/legal-content/content/es/privacy.md?raw";
import legalContentTermsEs from "../../../../../packages/legal-content/content/es/terms.md?raw";
import legalContentDataDeletionEs from "../../../../../packages/legal-content/content/es/data-deletion.md?raw";
import legalContentPrivacyEn from "../../../../../packages/legal-content/content/en/privacy.md?raw";
import legalContentTermsEn from "../../../../../packages/legal-content/content/en/terms.md?raw";
import legalContentDataDeletionEn from "../../../../../packages/legal-content/content/en/data-deletion.md?raw";
import {
  BRAND_ICON_POLICY_META,
  getBrandIconPolicy,
} from "../observability/brandIconPolicy";

function extractMetaLine(markdown, key) {
  const pattern = new RegExp(`^${key}:\\s*(.+)$`, "im");
  const match = String(markdown || "").match(pattern);
  return match?.[1]?.trim() || null;
}

function extractDocMeta(markdown, fallback = {}) {
  return {
    version: extractMetaLine(markdown, "Version") || fallback.version || "n/a",
    documentId: extractMetaLine(markdown, "Document ID") || fallback.documentId || "n/a",
    updatedAt: extractMetaLine(markdown, "Last updated") || fallback.updatedAt || "n/a",
  };
}

function normalizeDateFromInput(rawValue) {
  const raw = String(rawValue || "").trim();
  if (!raw) return null;
  if (raw.toUpperCase() === "[TO BE SET]") return null;

  const isoMatch = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  const slashMatch = raw.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (slashMatch) {
    return `${slashMatch[3]}-${slashMatch[2]}-${slashMatch[1]}`;
  }
  return null;
}

function extractLegalLastUpdated(markdown) {
  const content = String(markdown || "");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (!lower.includes("updated") && !lower.includes("actualiz")) continue;
    const clean = line.replace(/\*\*/g, "");
    const value = clean.split(":").slice(1).join(":").trim();
    const normalized = normalizeDateFromInput(value);
    if (normalized) return normalized;
  }
  return null;
}

function stableHash(input) {
  const raw = String(input || "");
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

function buildLegalContentVersion(markdown, fallbackLabel = "content") {
  const updated = extractLegalLastUpdated(markdown);
  if (updated) return `rev-${updated}`;
  return `rev-${fallbackLabel}-${stableHash(markdown).slice(0, 8)}`;
}

function buildLegalContentDoc({
  id,
  title,
  pathLabel,
  markdown,
  documentId,
}) {
  const updatedAt = extractLegalLastUpdated(markdown) || "n/a";
  const version = buildLegalContentVersion(markdown, id.replace(/[^a-z0-9]/gi, "").toLowerCase());
  return {
    id,
    title,
    pathLabel,
    markdown,
    version,
    documentId,
    updatedAt,
  };
}

function collectPolicyRows() {
  const policy = getBrandIconPolicy();
  const groups = ["browsers", "providers", "os"];
  const rows = [];

  for (const group of groups) {
    const bucket = policy[group] || {};
    for (const [key, entry] of Object.entries(bucket)) {
      if (!entry || key === "unknown") continue;
      rows.push({
        group,
        key,
        label: entry.label || key,
        legalStatus: entry.legalStatus || "generic_fallback",
        legalReason: entry.legalReason || "unspecified",
        sourceUrl: entry.sourceUrl || null,
        hasLogo: Boolean(entry.iconUrl),
      });
    }
  }

  return rows.sort((a, b) =>
    `${a.group}.${a.key}`.localeCompare(`${b.group}.${b.key}`, "es", { sensitivity: "base" }),
  );
}

function summarizePolicyRows(rows) {
  const summary = {
    total: rows.length,
    withLogo: rows.filter((row) => row.hasLogo).length,
    withoutLogo: rows.filter((row) => !row.hasLogo).length,
    byStatus: {},
  };

  for (const row of rows) {
    summary.byStatus[row.legalStatus] = (summary.byStatus[row.legalStatus] || 0) + 1;
  }

  return summary;
}

function statusLabel(statusKey) {
  const key = String(statusKey || "").toLowerCase();
  if (key === "approved_public_brand_kit") return "Approved (public brand kit)";
  if (key === "approved_cc_by_attribution") return "Approved (CC BY attribution)";
  if (key === "restricted_license_required") return "Restricted (license required)";
  if (key === "conditional_review_required") return "Conditional (legal review required)";
  if (key === "generic_fallback") return "Generic fallback";
  return key;
}

function buildRuntimeSnapshotMarkdown(rows, summary) {
  const statusLines = Object.entries(summary.byStatus)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([status, count]) => `- ${statusLabel(status)}: ${count}`);

  const groupLabel = {
    browsers: "Browsers",
    providers: "Providers",
    os: "Operating systems",
  };

  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.group]) acc[row.group] = [];
    acc[row.group].push(row);
    return acc;
  }, {});

  const sections = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, items]) => {
      const lines = items
        .map((item) => {
          const logo = item.hasLogo ? "logo enabled" : "fallback";
          const source = item.sourceUrl ? ` | source: ${item.sourceUrl}` : "";
          return `- ${item.label} (${item.key}) -> ${statusLabel(item.legalStatus)} | ${logo}${source}`;
        })
        .join("\n");
      return `## ${groupLabel[group] || group}\n\n${lines}`;
    })
    .join("\n\n");

  return [
    "# Runtime Legal Policy Snapshot",
    `Version: ${BRAND_ICON_POLICY_META.version}`,
    "Document ID: legal.runtime_policy_snapshot",
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "This is a generated snapshot from runtime policy code.",
    "",
    "## Totals",
    `- Entries: ${summary.total}`,
    `- Logos enabled: ${summary.withLogo}`,
    `- Fallback-only: ${summary.withoutLogo}`,
    "",
    "## Status breakdown",
    ...statusLines,
    "",
    sections,
    "",
  ].join("\n");
}

const policyRows = collectPolicyRows();
const policySummary = summarizePolicyRows(policyRows);
const runtimeSnapshotMd = buildRuntimeSnapshotMarkdown(policyRows, policySummary);

const RAW_DOCS = [
  {
    id: "legal-index",
    title: "Indice legal",
    pathLabel: "docs/legal/README.md",
    markdown: legalIndexMd,
  },
  {
    id: "legal-brand-policy",
    title: "Politica legal de iconos",
    pathLabel: "docs/legal/brand-icon-policy.md",
    markdown: brandPolicyMd,
  },
  {
    id: "legal-brand-manifest",
    title: "Manifiesto legal de marcas",
    pathLabel: "docs/legal/brand-icon-manifest.md",
    markdown: brandManifestMd,
  },
  {
    id: "legal-runtime-snapshot",
    title: "Snapshot legal runtime",
    pathLabel: "runtime: brandIconPolicy.js",
    markdown: runtimeSnapshotMd,
  },
  buildLegalContentDoc({
    id: "legal-content-privacy-es",
    title: "Privacidad (ES)",
    pathLabel: "packages/legal-content/content/es/privacy.md",
    markdown: legalContentPrivacyEs,
    documentId: "legal.user.privacy.es",
  }),
  buildLegalContentDoc({
    id: "legal-content-terms-es",
    title: "Terminos y condiciones (ES)",
    pathLabel: "packages/legal-content/content/es/terms.md",
    markdown: legalContentTermsEs,
    documentId: "legal.user.terms.es",
  }),
  buildLegalContentDoc({
    id: "legal-content-data-deletion-es",
    title: "Borrado de datos (ES)",
    pathLabel: "packages/legal-content/content/es/data-deletion.md",
    markdown: legalContentDataDeletionEs,
    documentId: "legal.user.data_deletion.es",
  }),
  buildLegalContentDoc({
    id: "legal-content-privacy-en",
    title: "Privacy (EN)",
    pathLabel: "packages/legal-content/content/en/privacy.md",
    markdown: legalContentPrivacyEn,
    documentId: "legal.user.privacy.en",
  }),
  buildLegalContentDoc({
    id: "legal-content-terms-en",
    title: "Terms and conditions (EN)",
    pathLabel: "packages/legal-content/content/en/terms.md",
    markdown: legalContentTermsEn,
    documentId: "legal.user.terms.en",
  }),
  buildLegalContentDoc({
    id: "legal-content-data-deletion-en",
    title: "Data deletion (EN)",
    pathLabel: "packages/legal-content/content/en/data-deletion.md",
    markdown: legalContentDataDeletionEn,
    documentId: "legal.user.data_deletion.en",
  }),
];

export const LEGAL_DOCS = RAW_DOCS.map((doc) => {
  const meta = extractDocMeta(doc.markdown, {
    version: BRAND_ICON_POLICY_META.version,
    documentId: doc.id,
    updatedAt: new Date().toISOString().slice(0, 10),
  });
  return {
    ...doc,
    ...meta,
  };
});

export const LEGAL_POLICY_SUMMARY = {
  version: BRAND_ICON_POLICY_META.version,
  reviewIntervalDays: BRAND_ICON_POLICY_META.review_interval_days,
  owner: BRAND_ICON_POLICY_META.owner,
  totalEntries: policySummary.total,
  logosEnabled: policySummary.withLogo,
  fallbackOnly: policySummary.withoutLogo,
  statusCounts: policySummary.byStatus,
};
