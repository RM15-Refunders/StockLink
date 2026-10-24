import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
/** @param {string} name */
const read = (name) => readFileSync(path.join(root, name), "utf8");
/** @param {string} name */
const requirePath = (name) => assert(existsSync(path.join(root, name)), `Missing path: ${name}`);
for (const name of ["src/artifacts/stocklink/src/App.tsx", "src/artifacts/stocklink/public/stocklink-logo.jpg", "src/scripts/post-merge.sh", "docs", "submission"]) requirePath(name);
for (const name of ["artifacts", "lib", "scripts"]) assert(!existsSync(path.join(root, name)), `Legacy root source folder: ${name}`);
const workspace = read("pnpm-workspace.yaml");
for (const name of ["src/artifacts/*", "src/lib/*", "src/lib/integrations/*", "src/scripts"]) assert(workspace.includes(`- ${name}`), `Missing workspace glob: ${name}`);
const lock = read("pnpm-lock.yaml");
for (const section of ["artifacts", "lib", "scripts"]) {
  const parent = path.join(root, "src", section);
  const packages = section === "scripts" ? [parent] : readdirSync(parent, { withFileTypes: true }).filter((x) => x.isDirectory()).map((x) => path.join(parent, x.name));
  for (const folder of packages) {
    if (!existsSync(path.join(folder, "package.json"))) continue;
    const relative = path.relative(root, folder).split(path.sep).join("/");
    assert(lock.includes(`  ${relative}:`), `Lockfile missing importer: ${relative}`);
    const config = path.join(folder, "tsconfig.json");
    if (existsSync(config)) {
      const parsed = JSON.parse(readFileSync(config, "utf8"));
      assert(existsSync(path.resolve(folder, parsed.extends)), `Broken tsconfig extends: ${relative}`);
      for (const ref of parsed.references ?? []) assert(existsSync(path.resolve(folder, ref.path, "tsconfig.json")), `Broken TypeScript reference: ${relative} -> ${ref.path}`);
    }
  }
}
const references = JSON.parse(read("tsconfig.json")).references;
for (const ref of references) requirePath(`${ref.path}/tsconfig.json`);
assert(read(".replit").includes('publicDir = "src/artifacts/stocklink/dist/public"'));
assert(read(".replit").includes('path = "src/scripts/post-merge.sh"'));
assert(!read("src/artifacts/stocklink/index.html").includes("Update this description"));
console.log("Source layout, lockfile importers, TypeScript references and Replit paths verified.");
