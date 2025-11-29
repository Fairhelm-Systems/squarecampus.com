// scripts/find-unused-src-files.ts
//
// Small reconnaissance agent that walks your src/, starts from pages/layouts,
// and marks every module that is never pulled into the operation.

import fs from "fs";
import path from "path";
import ts from "typescript";

type TsConfig = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
};

const PROJECT_ROOT = process.cwd();
const SRC_DIR = path.join(PROJECT_ROOT, "src");

const CODE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];
const INDEX_NAMES = ["index", "page"];

// ---------- Utilities -------------------------------------------------------

function readTsConfig(): TsConfig {
  const tsconfigPath = path.join(PROJECT_ROOT, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) {
    console.warn("tsconfig.json not found, path aliases will not be resolved.");
    return {};
  }
  const raw = fs.readFileSync(tsconfigPath, "utf8");
  return JSON.parse(raw) as TsConfig;
}

function isCodeFile(filePath: string): boolean {
  return CODE_EXTENSIONS.some((ext) => filePath.endsWith(ext));
}

function walkDir(dir: string): string[] {
  const result: string[] = [];
  if (!fs.existsSync(dir)) return result;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkDir(full));
    } else if (entry.isFile() && isCodeFile(full)) {
      result.push(full);
    }
  }
  return result;
}

function isRootPageOrLayout(filePath: string): boolean {
  const rel = path.relative(SRC_DIR, filePath).replace(/\\/g, "/");

  // App router (app directory)
  if (/^app\/.+\/(page|layout)\.(ts|tsx|js|jsx|mdx)$/.test(rel)) return true;

  // Pages router
  if (/^pages\/.+\.(ts|tsx|js|jsx)$/.test(rel)) return true;

  return false;
}

// Normalize a file path to a "module key" (no extension, posix separators)
function toModuleKey(filePath: string): string {
  const rel = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, "/");
  const ext = path.extname(rel);
  return rel.slice(0, -ext.length);
}

// Try resolving an import specifier to an absolute file path in src/
function resolveImport(
  fromFile: string,
  specifier: string,
  tsconfig: TsConfig,
  allFilesSet: Set<string>
): string | null {
  // ignore non-local imports (node_modules and such)
  if (!specifier.startsWith(".") && !specifier.startsWith("/")) {
    // may still be a tsconfig path alias; we handle that separately
  }

  const tryPaths: string[] = [];

  const fromDir = path.dirname(fromFile);

  // 1. Relative import
  if (specifier.startsWith(".")) {
    const base = path.resolve(fromDir, specifier);
    collectCandidateFiles(base, tryPaths);
  }

  const compilerOptions = tsconfig.compilerOptions || {};

  // 2. Path aliases from tsconfig (e.g. "@/components/*": ["./src/components/*"])
  if (compilerOptions.paths && !specifier.startsWith(".")) {
    for (const [pattern, targets] of Object.entries(compilerOptions.paths)) {
      const starIndex = pattern.indexOf("*");
      if (starIndex === -1) {
        if (pattern === specifier) {
          for (const target of targets) {
            const mapped = path.resolve(
              PROJECT_ROOT,
              (compilerOptions.baseUrl || ""),
              target
            );
            collectCandidateFiles(mapped, tryPaths);
          }
        }
      } else {
        const prefix = pattern.slice(0, starIndex);
        const suffix = pattern.slice(starIndex + 1); // usually ""
        if (specifier.startsWith(prefix) && specifier.endsWith(suffix)) {
          const middle = specifier.slice(prefix.length, specifier.length - suffix.length);
          for (const target of targets) {
            const targetPatternStarIndex = target.indexOf("*");
            let mapped: string;
            if (targetPatternStarIndex === -1) {
              mapped = path.resolve(
                PROJECT_ROOT,
                (compilerOptions.baseUrl || ""),
                target
              );
            } else {
              const targetPrefix = target.slice(0, targetPatternStarIndex);
              const targetSuffix = target.slice(targetPatternStarIndex + 1);
              mapped = path.resolve(
                PROJECT_ROOT,
                (compilerOptions.baseUrl || ""),
                targetPrefix + middle + targetSuffix
              );
            }
            collectCandidateFiles(mapped, tryPaths);
          }
        }
      }
    }
  }

  // 3. baseUrl absolute-like imports (e.g. "components/xyz")
  if (!specifier.startsWith(".") && compilerOptions.baseUrl) {
    const base = path.resolve(
      PROJECT_ROOT,
      compilerOptions.baseUrl,
      specifier
    );
    collectCandidateFiles(base, tryPaths);
  }

  // Now try each candidate and return the first actual file under src/
  for (const candidate of tryPaths) {
    const normalized = candidate.replace(/\\/g, "/");
    if (allFilesSet.has(candidate) && normalized.includes("/src/")) {
      return candidate;
    }
  }

  return null;
}

// Given a base path without extension, add candidate file names into collector
function collectCandidateFiles(base: string, out: string[]) {
  for (const ext of CODE_EXTENSIONS) {
    const direct = base + ext;
    out.push(direct);
  }

  // index.ts, index.tsx, page.tsx, etc.
  for (const name of INDEX_NAMES) {
    for (const ext of CODE_EXTENSIONS) {
      out.push(path.join(base, name + ext));
    }
  }
}

// Extract import specifiers from a TS/JS file using TypeScript's parser
function getImportSpecifiers(filePath: string): string[] {
  const sourceText = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.ESNext,
    true,
    filePath.endsWith(".tsx") || filePath.endsWith(".jsx")
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS
  );

  const specifiers = new Set<string>();

  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      const moduleExpr = (node as ts.ImportDeclaration | ts.ExportDeclaration)
        .moduleSpecifier;
      if (moduleExpr && ts.isStringLiteral(moduleExpr)) {
        specifiers.add(moduleExpr.text);
      }
    }

    // Dynamic import("x")
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specifiers.add((node.arguments[0] as ts.StringLiteral).text);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return Array.from(specifiers);
}

// ---------- Main graph building --------------------------------------------

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`src directory not found at ${SRC_DIR}`);
    process.exit(1);
  }

  const tsconfig = readTsConfig();
  const allFiles = walkDir(SRC_DIR);
  const allFilesSet = new Set(allFiles);

  // Map moduleKey -> file path for quick reverse lookup if ever needed
  const moduleKeyToFile = new Map<string, string>();
  for (const f of allFiles) {
    moduleKeyToFile.set(toModuleKey(f), f);
  }

  // Build adjacency list: file -> set of imported files (absolute paths)
  const graph = new Map<string, Set<string>>();

  for (const file of allFiles) {
    const imports = getImportSpecifiers(file);
    const resolvedTargets = new Set<string>();

    for (const spec of imports) {
      const resolved = resolveImport(file, spec, tsconfig, allFilesSet);
      if (resolved) {
        resolvedTargets.add(path.resolve(resolved));
      }
    }

    graph.set(path.resolve(file), resolvedTargets);
  }

  // Determine root files: every page/layout under src/app or src/pages.
  const roots: string[] = [];
  for (const file of allFiles) {
    if (isRootPageOrLayout(file)) {
      roots.push(path.resolve(file));
    }
  }

  if (roots.length === 0) {
    console.warn("No page/layout files found under src/app or src/pages.");
  }

  // DFS/BFS from roots to find reachable modules
  const visited = new Set<string>();
  const queue: string[] = [...roots];

  while (queue.length > 0) {
    const current = queue.pop() as string;
    if (visited.has(current)) continue;
    visited.add(current);

    const neighbors = graph.get(current);
    if (!neighbors) continue;

    for (const next of neighbors) {
      if (!visited.has(next)) {
        queue.push(next);
      }
    }
  }

  // Any file in src that is not visited is unused (not pulled by any page/layout)
  const unused = allFiles
    .map((f) => path.resolve(f))
    .filter((f) => !visited.has(f));

  // You may want to filter out storybook/test files, etc., here if needed.
  const filteredUnused = unused.filter((f) => {
    const rel = path.relative(PROJECT_ROOT, f).replace(/\\/g, "/");
    if (rel.includes(".stories.")) return false;
    if (rel.includes(".test.") || rel.includes(".spec.")) return false;
    return true;
  });

  console.log("\n=== Unused files (not reachable from any page/layout) ===\n");
  if (filteredUnused.length === 0) {
    console.log("No unused files detected 🎉");
  } else {
    for (const file of filteredUnused) {
      const rel = path.relative(PROJECT_ROOT, file).replace(/\\/g, "/");
      console.log(rel);
    }
    console.log(`\nTotal: ${filteredUnused.length} file(s).\n`);
  }
}

main();
