import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const appRoot = join(root, "app");
const uiPackagePath = join(root, "node_modules", "@mivama", "ui", "package.json");

const ignoredExports = new Set([
  ".",
  "./provider",
  "./forms",
  "./styles.css",
  "./tokens.css",
  "./themes.css",
]);

const primarySymbolOverrides = new Map([
  ["./typography", "Heading"],
  ["./toast", "Toaster"],
]);

function exportToPrimarySymbol(subpath) {
  const override = primarySymbolOverrides.get(subpath);
  if (override) return override;

  return subpath
    .replace(/^\.\//, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

async function collectTsxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTsxFiles(path)));
    } else if (entry.isFile() && path.endsWith(".tsx")) {
      files.push(path);
    }
  }

  return files;
}

function collectMivamaImports(source) {
  const imported = new Set();
  const expression = /import\s*\{([\s\S]*?)\}\s*from\s*["']@mivama\/ui["'];?/g;

  for (const match of source.matchAll(expression)) {
    for (const rawSpecifier of match[1].split(",")) {
      const specifier = rawSpecifier.trim().replace(/^type\s+/, "");
      if (!specifier) continue;
      const importedName = specifier.split(/\s+as\s+/)[0]?.trim();
      if (importedName) imported.add(importedName);
    }
  }

  return imported;
}

const uiPackage = JSON.parse(await readFile(uiPackagePath, "utf8"));
const componentExports = Object.keys(uiPackage.exports ?? {})
  .filter((subpath) => subpath.startsWith("./") && !ignoredExports.has(subpath) && !subpath.endsWith(".css"))
  .sort();

const files = await collectTsxFiles(appRoot);
const importedSymbols = new Set();

for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const imported of collectMivamaImports(source)) {
    importedSymbols.add(imported);
  }
}

const missing = componentExports.filter((subpath) => {
  const primarySymbol = exportToPrimarySymbol(subpath);
  return !importedSymbols.has(primarySymbol);
});

if (missing.length > 0) {
  console.error("Showcase coverage is missing @mivama/ui component families:");
  for (const subpath of missing) {
    console.error(`- ${subpath} (expected primary import: ${exportToPrimarySymbol(subpath)})`);
  }
  console.error("Add a representative preview import before updating the UI lock.");
  process.exit(1);
}

console.log(`Showcase covers all ${componentExports.length} visual @mivama/ui component exports.`);
