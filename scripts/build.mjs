/* Builds the site: `npm run build`.

   The pages used to compile themselves in the visitor's browser — Babel
   turned the JSX into JavaScript, the Tailwind Play CDN generated the CSS,
   and React and Framer Motion arrived as development builds. That is
   several megabytes and seconds of work before the first screen could
   draw. This script does all of it once, here:

   - The components are bundled, minified, into one script per page
     under dist/, with production React and only the parts of Framer
     Motion that are used. The file name carries a hash of its contents,
     so a deploy is always a new URL and nothing has to be bumped by hand.
   - Tailwind compiles the classes the components use into a static
     stylesheet, joined with fonts.css and system.css and inlined into the
     page, so no stylesheet request stands between the HTML and the first
     paint.
   - Each page is rendered to HTML, so the first screen is in the
     document itself. React then hydrates it: the markup on screen
     becomes the live app without being drawn a second time.

   The component files are unchanged in shape — each is still a script
   that publishes onto `window` — so this bundles them in the order the
   pages list them, exactly as the browser used to run them.

   Output: index.html, project.html (from src/) and dist/. All three are
   committed, because GitHub Pages serves the repository as it is. */
import { build } from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

/* Shared by both pages, in dependency order: a file may only read a
   `window` global published by a file above it. */
const SHARED = [
  "Icons", "Motion", "Kicker", "GlassImage", "FadingVideo", "BlurText",
  "TopBar", "BottomNav"
];

const PAGES = [
  {
    name: "index",
    root: "App",
    components: [
      ...SHARED,
      "ContactModal", "LeaveSiteModal", "Hero", "WebsitePortfolio",
      "GuidelinesCarousel", "OakNationalAcademy", "VisualDesign", "CaseStudies",
      "LearnToDesignModal", "LearnToDesign", "Skills", "Footer", "App"
    ]
  },
  {
    name: "project",
    root: "ProjectPage",
    components: [
      ...SHARED,
      "Footer",
      "case/Primitives", "case/MethodBlock", "case/Prose", "case/FlowSteps",
      "case/JourneyMap", "case/BusinessModelCanvas", "case/CompetitiveMatrix",
      "case/PersonaCard", "case/BrandAttributes", "case/MoodBoard",
      "case/PrototypeShowcase", "case/UXSummary", "case/MethodBody",
      "case/ProjectData", "case/ProjectPage"
    ]
  }
];

/* The first screen's faces, fetched alongside the HTML rather than
   discovered once the CSS has been parsed. */
const PRELOAD_FONTS = ["instrument-serif-italic", "barlow-300", "barlow-500"];

/* What the components expect to find on `window` before they run. */
const CLIENT_GLOBALS = `
import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
window.React = React;
window.ReactDOM = { createRoot, hydrateRoot, createPortal };
window.Motion = { motion, AnimatePresence };
`;

const SERVER_GLOBALS = `
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
globalThis.window = globalThis;
globalThis.React = React;
globalThis.ReactDOM = { createPortal };
globalThis.Motion = { motion, AnimatePresence };
`;

const componentImports = (page) =>
  page.components
    .map((c) => `import ${JSON.stringify(path.join(ROOT, "components", c + ".js"))};`)
    .join("\n");

const COMMON = {
  bundle: true,
  loader: { ".js": "jsx" },
  jsx: "transform",
  legalComments: "none",
  logLevel: "warning"
};

async function bundleClient(page) {
  const result = await build({
    ...COMMON,
    stdin: {
      contents: `import "./globals";\n${componentImports(page)}`,
      resolveDir: ROOT,
      loader: "js"
    },
    plugins: [virtual("./globals", CLIENT_GLOBALS)],
    format: "iife",
    target: ["es2019"],
    minify: true,
    define: { "process.env.NODE_ENV": '"production"' },
    entryNames: `${page.name}-[hash]`,
    outdir: DIST,
    write: true,
    metafile: true
  });
  const out = Object.keys(result.metafile.outputs).find((f) => f.endsWith(".js"));
  return path.relative(ROOT, path.resolve(ROOT, out)).split(path.sep).join("/");
}

async function renderPage(page) {
  const file = path.join(DIST, `.ssr-${page.name}.mjs`);
  await build({
    ...COMMON,
    stdin: {
      contents:
        `import "./globals";\n${componentImports(page)}\n` +
        `import { renderToString } from "react-dom/server";\n` +
        `export default () => renderToString(React.createElement(window.${page.root}));\n`,
      resolveDir: ROOT,
      loader: "js"
    },
    plugins: [virtual("./globals", SERVER_GLOBALS)],
    platform: "node",
    packages: "external",
    format: "esm",
    define: { "process.env.NODE_ENV": '"production"' },
    outfile: file,
    write: true
  });
  try {
    const mod = await import(pathToFileURL(file).href + "?" + Date.now());
    return mod.default();
  } finally {
    await fs.rm(file, { force: true });
  }
}

async function compileCss() {
  const postcss = require("postcss");
  const tailwind = require("tailwindcss");
  const config = require(path.join(ROOT, "styles/tailwind.config.js"));
  config.content = config.content.map((glob) => path.join(ROOT, glob));

  const utilities = await postcss([tailwind(config)]).process(
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
    { from: undefined }
  );

  /* The order the pages always had: Tailwind first, then the design
     system, so a system class beats a utility of equal weight. */
  const css = [
    utilities.css,
    await fs.readFile(path.join(ROOT, "styles/fonts.css"), "utf8"),
    await fs.readFile(path.join(ROOT, "styles/system.css"), "utf8")
  ].join("\n");

  const { transform } = await import("esbuild");
  const min = await transform(css, { loader: "css", minify: true, target: ["chrome90", "safari14", "firefox90"] });
  return min.code.trim();
}

function virtual(name, contents) {
  return {
    name: "virtual",
    setup(b) {
      b.onResolve({ filter: new RegExp("^" + name.replace(/[./]/g, "\\$&") + "$") }, () => ({
        path: name,
        namespace: "virtual"
      }));
      b.onLoad({ filter: /.*/, namespace: "virtual" }, () => ({
        contents,
        resolveDir: ROOT,
        loader: "js"
      }));
    }
  };
}

async function main() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  const css = await compileCss();

  for (const page of PAGES) {
    const [script, markup] = await Promise.all([bundleClient(page), renderPage(page)]);

    const head = [
      ...PRELOAD_FONTS.map(
        (f) => `<link rel="preload" href="assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin />`
      ),
      `<style>${css}</style>`,
      `<script defer src="${script}"></script>`
    ].join("\n");

    const template = await fs.readFile(path.join(ROOT, "src", page.name + ".html"), "utf8");
    const html = template
      .replace(/<!--[^]*?-->\n(?=<html)/, "")
      .replace("<!-- build:head -->", () => head)
      .replace("<!-- build:root -->", () => markup);

    if (html.includes("<!-- build:")) throw new Error(`${page.name}: unfilled placeholder`);
    await fs.writeFile(path.join(ROOT, page.name + ".html"), html);

    const size = (await fs.stat(path.join(ROOT, script))).size;
    console.log(`${page.name}.html  ${(html.length / 1024).toFixed(1)} KB   ${script}  ${(size / 1024).toFixed(1)} KB`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
