import { cp, lstat, mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { scenes } from "../static/js/comparison-scenes.js";
import { bundleSite, normalizeAssetBase } from "./bundle-site.mjs";

const source = fileURLToPath(new URL("../", import.meta.url));
const { values } = parseArgs({
  options: {
    out: { type: "string", default: "dist" },
    "no-assets": { type: "boolean" },
    "asset-base": { type: "string" },
  },
});
const destination = resolve(values.out);
const assetBase = normalizeAssetBase(
  values["asset-base"] ?? process.env.ASSET_BASE_URL ?? "https://ifradlin.github.io/storage/arrow/assets/",
);

function contained(root, path) {
  const name = relative(root, path);
  if (isAbsolute(name) || name === ".." || name.startsWith(`..${sep}`)) {
    throw new Error(`Path escapes asset directory: ${path}`);
  }
  return name;
}

function manifestPaths(value) {
  if (Array.isArray(value)) return value.flatMap(manifestPaths);
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, child]) =>
    key === "path" && typeof child === "string" ? [child] : manifestPaths(child),
  );
}

async function copyAssets(output) {
  const html = await readFile(resolve(source, "index.html"), "utf8");
  const urls = [
    ...[...html.matchAll(/data-manifest="([^"]+)"/g)].map((match) => match[1]),
    ...Object.values(scenes).flatMap((entries) =>
      entries.flatMap((scene) => Object.values(scene.predictions).map((prediction) => prediction.manifest)),
    ),
  ];
  const exports = resolve(source, "assets/exports/progressive");
  const bundles = new Set();
  for (const path of urls) {
    const url = new URL(path, pathToFileURL(resolve(source, "index.html")));
    if (url.protocol !== "file:") throw new Error(`Cannot package remote manifest: ${url}`);
    const manifest = fileURLToPath(url);
    contained(exports, manifest);
    if (basename(manifest) !== "manifest.json") throw new Error(`Invalid manifest: ${manifest}`);
    bundles.add(dirname(manifest));
  }
  await cp(resolve(source, "assets/images"), resolve(output, "assets/images"), { recursive: true, dereference: true });
  for (const bundle of [...bundles].sort()) {
    const manifest = JSON.parse(await readFile(resolve(bundle, "manifest.json"), "utf8"));
    const paths = [...manifestPaths(manifest), ...(manifest.previews || []).flat()];
    for (const path of paths) {
      if (isAbsolute(path)) throw new Error(`Absolute asset path: ${path}`);
      const asset = resolve(bundle, path);
      contained(bundle, asset);
      if (!(await stat(asset)).isFile()) throw new Error(`Missing scene asset: ${asset}`);
    }
    await cp(bundle, resolve(output, "assets/exports/progressive", contained(exports, bundle)), {
      recursive: true,
      dereference: true,
      filter: (path) => !["config.json", "publish.json"].includes(basename(path)),
    });
  }
  console.log(`Copied ${bundles.size} progressive exports and paper images.`);
}

let previous;
try {
  const existing = await lstat(destination);
  if (existing.isSymbolicLink() || !existing.isDirectory())
    throw new Error(`Output is not a regular directory: ${destination}`);
  await stat(resolve(destination, "index.html"));
  await stat(resolve(destination, ".nojekyll"));
  previous = true;
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  if (
    await lstat(destination).then(
      () => true,
      () => false,
    )
  ) {
    throw new Error(`Refusing to replace a directory that is not a website build: ${destination}`);
  }
}
if (destination === source || relative(destination, source).split(sep)[0] !== "..") {
  throw new Error("Output cannot be the project directory or one of its parents.");
}
await mkdir(dirname(destination), { recursive: true });
const staging = await mkdtemp(resolve(dirname(destination), ".arrow-build-"));
let backup;
let cleanupBackup = false;
try {
  await bundleSite(source, staging, { assetBase });
  if (!values["no-assets"] && !assetBase) await copyAssets(staging);
  await writeFile(resolve(staging, ".nojekyll"), "");
  if (previous) {
    backup = await mkdtemp(resolve(dirname(destination), ".arrow-previous-"));
    await rename(destination, resolve(backup, "site"));
  }
  try {
    await rename(staging, destination);
    cleanupBackup = true;
  } catch (error) {
    if (backup) {
      await rename(resolve(backup, "site"), destination);
      cleanupBackup = true;
    }
    throw error;
  }
  console.log(`Built ${destination}`);
} finally {
  await rm(staging, { recursive: true, force: true });
  if (backup && cleanupBackup) await rm(backup, { recursive: true, force: true });
}
