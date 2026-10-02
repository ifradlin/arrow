import { build } from "rolldown";
import { bundleAsync } from "lightningcss";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const threeRoot = resolve(dirname(require.resolve("three")), "..");
const localURL = (path) => `./${path.replaceAll("\\", "/")}`;

export function normalizeAssetBase(value) {
  if (!value) return "";
  const url = new URL(value);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.search ||
    url.hash ||
    url.username ||
    url.password ||
    /['"`<>\\]/.test(value)
  ) {
    throw new Error("Asset base must be an HTTP(S) directory URL without credentials, query or fragment.");
  }
  return `${url.href.replace(/\/+$/, "")}/`;
}

export async function bundleSite(source, destination, { assetBase = "" } = {}) {
  source = resolve(source);
  destination = resolve(destination);
  const html = await readFile(resolve(source, "index.html"), "utf8");
  const base = normalizeAssetBase(assetBase);
  const assetURLs = (text) => (base ? text.replace(/(?:\.\.?\/)+assets\//g, () => base) : text);
  const scripts = [...html.matchAll(/<script\b([^>]*?)\bsrc="(\.\/static\/js\/[^\"]+)"([^>]*)><\/script>/g)];
  const styles = [...html.matchAll(/<link\b[^>]*\bhref="(\.\/static\/css\/[^\"]+)"[^>]*>/g)];
  const entry = (url) => resolve(source, url.split("?")[0]);
  const common = {
    cwd: source,
    transform: { target: "es2022" },
    platform: "browser",
    onLog(level, log, defaultHandler) {
      if (log.code === "UNRESOLVED_IMPORT") throw new Error(log.message);
      defaultHandler(level, log);
    },
  };
  const output = {
    dir: resolve(destination, "static/js"),
    format: "esm",
    minify: true,
    entryFileNames: "[name]-[hash].js",
    chunkFileNames: "shared-[hash].js",
    hashCharacters: "hex",
    comments: { legal: true, annotation: false, jsdoc: false },
  };
  const paths = new Map();
  const record = (result) => {
    for (const chunk of result.output) {
      if (chunk.type === "chunk" && chunk.isEntry && chunk.facadeModuleId)
        paths.set(chunk.facadeModuleId, `static/js/${chunk.fileName}`);
    }
  };
  const worker = await build({
    ...common,
    input: resolve(source, "static/js/viewer-data-worker.js"),
    output,
  });
  record(worker);
  const workerName = basename(paths.get(resolve(source, "static/js/viewer-data-worker.js")));
  const browserImports = {
    name: "browser-imports",
    resolveId: {
      filter: { id: /^(https:\/\/cdn\.jsdelivr\.net\/npm\/three@0\.169\.0\/)|\?v=/ },
      handler(path, importer) {
        if (path.startsWith("https://")) return resolve(threeRoot, path.split("three@0.169.0/")[1]);
        return this.resolve(path.split("?")[0], importer, { skipSelf: true });
      },
    },
    load: {
      filter: { id: /\/static\/js\/[^/]+\.js$/ },
      async handler(path) {
        let code = assetURLs(await readFile(path, "utf8"));
        if (path.endsWith("/progressive-data.js"))
          code = code.replace(
            'new URL("./viewer-data-worker.js", import.meta.url)',
            `new URL("./${workerName}", import.meta.url)`,
          );
        return code;
      },
    },
  };
  const page = scripts;
  const siteEntry = resolve(source, "static/js/__site.js");
  const entries = {
    name: "site-entries",
    resolveId(id) {
      if (id === siteEntry) return id;
    },
    load(id) {
      const group = id === siteEntry ? page : null;
      if (group) return group.map(([, , url]) => `import ${JSON.stringify(entry(url))};`).join("\n");
    },
  };
  record(
    await build({
      ...common,
      input: { site: siteEntry, viewer: resolve(source, "static/js/viewer.js") },
      output: {
        ...output,
        codeSplitting: { groups: [{ name: "three", test: /[\\/]node_modules[\\/]three[\\/]/ }] },
      },
      plugins: [entries, browserImports],
    }),
  );
  const cssEntry = resolve(source, "static/css/__bundle.css");
  const css = await bundleAsync({
    filename: cssEntry,
    minify: true,
    resolver: {
      read(path) {
        return path === cssEntry
          ? styles.map(([, url]) => `@import "./${basename(entry(url))}";`).join("\n")
          : readFileSync(path, "utf8");
      },
    },
  });
  const stylesheet = Buffer.from(assetURLs(css.code.toString()));
  const cssName = `site-${createHash("sha256").update(stylesheet).digest("hex").slice(0, 12)}.css`;
  await mkdir(resolve(destination, "static/css"), { recursive: true });
  await writeFile(resolve(destination, "static/css", cssName), stylesheet);
  let released = html.replace(/\s*<script type="importmap">[^]*?<\/script>/, "");
  for (const [index, [tag]] of page.entries())
    released = released.replace(
      tag,
      index === 0 ? `<script type="module" src="${localURL(paths.get(siteEntry))}" fetchpriority="high"></script>` : "",
    );
  for (const [index, [tag]] of styles.entries()) {
    released = released.replace(tag, index === 0 ? `<link rel="stylesheet" href="./static/css/${cssName}" />` : "");
  }
  await writeFile(resolve(destination, "index.html"), assetURLs(released));
  console.log(`Bundled site, a separate viewer/data worker, and ${styles.length} stylesheets.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [source, destination] = process.argv.slice(2);
  if (!source || !destination) throw new Error("Usage: node scripts/bundle-site.mjs SOURCE DESTINATION");
  await bundleSite(source, destination);
}
