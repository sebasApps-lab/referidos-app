import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const subsetFont = require("subset-font");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

const SOURCE_ROOT = path.join(repoRoot, "apps", "prelaunch", "src");
const INDEX_HTML = path.join(repoRoot, "apps", "prelaunch", "index.html");
const SOURCE_FONTS_ROOT = path.join(repoRoot, "assets", "fonts");
const OUTPUT_FONTS_ROOT = path.join(repoRoot, "apps", "prelaunch", "src", "assets", "fonts");

const TEXT_FILE_EXTENSIONS = new Set([".js", ".jsx", ".css", ".html", ".json", ".md"]);

const REQUIRED_CHARACTERS =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~" +
  "\u00a1\u00bf\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00dc\u00fc\u201c\u201d\u2018\u2019\u2022\u2026\u2013\u2014\u00b0\u00ba\u00aa\u00a9\u00ae\u2122\u20ac";

const FONT_TASKS = [
  {
    source: path.join(SOURCE_FONTS_ROOT, "poppins", "Poppins-ExtraLight.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "poppins", "poppins-200-subset.woff2"),
  },
  {
    source: path.join(SOURCE_FONTS_ROOT, "poppins", "Poppins-Light.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "poppins", "poppins-300-subset.woff2"),
  },
  {
    source: path.join(SOURCE_FONTS_ROOT, "poppins", "Poppins-Regular.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "poppins", "poppins-400-subset.woff2"),
  },
  {
    source: path.join(SOURCE_FONTS_ROOT, "poppins", "Poppins-Medium.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "poppins", "poppins-500-subset.woff2"),
  },
  {
    source: path.join(SOURCE_FONTS_ROOT, "poppins", "Poppins-SemiBold.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "poppins", "poppins-600-subset.woff2"),
  },
  {
    source: path.join(SOURCE_FONTS_ROOT, "poppins", "Poppins-Bold.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "poppins", "poppins-700-subset.woff2"),
  },
  {
    source: path.join(SOURCE_FONTS_ROOT, "roboto", "Roboto-Regular.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "roboto", "roboto-400-subset.woff2"),
  },
  {
    source: path.join(SOURCE_FONTS_ROOT, "roboto", "Roboto-Medium.ttf"),
    output: path.join(OUTPUT_FONTS_ROOT, "roboto", "roboto-500-subset.woff2"),
  },
];

async function collectTextFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTextFiles(fullPath)));
      continue;
    }

    if (TEXT_FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function buildSubsetText() {
  const files = await collectTextFiles(SOURCE_ROOT);
  files.push(INDEX_HTML);

  const characters = new Set(REQUIRED_CHARACTERS);

  for (const filePath of files) {
    const content = await fs.readFile(filePath, "utf8");
    for (const char of content) {
      const codePoint = char.codePointAt(0);
      if (codePoint >= 0x20 || char === "\n" || char === "\r" || char === "\t") {
        characters.add(char);
      }
    }
  }

  return Array.from(characters).join("");
}

async function main() {
  const subsetText = await buildSubsetText();

  for (const task of FONT_TASKS) {
    await fs.mkdir(path.dirname(task.output), { recursive: true });

    const inputBuffer = await fs.readFile(task.source);
    const outputBuffer = await subsetFont(inputBuffer, subsetText, {
      targetFormat: "woff2",
      preserveNameIds: [1, 2, 4, 6],
    });

    await fs.writeFile(task.output, outputBuffer);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
