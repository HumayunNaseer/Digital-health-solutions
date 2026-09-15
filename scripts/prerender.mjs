import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer, loadEnv } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";

const env = loadEnv("production", process.cwd(), "VITE_");
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  mode: "production",
});
const routes = [
  "/",
  "/work/neuronest/",
  "/work/learnme/",
  "/work/reactneuro/",
  "/contact/",
  "/privacy/",
  "/404/",
];
const escape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
try {
  const { App, getPageMeta } = await server.ssrLoadModule("/src/App.tsx");
  const template = await readFile(resolve("dist/index.html"), "utf8");
  const origin = env.VITE_SITE_URL ? new URL(env.VITE_SITE_URL).origin : null;
  for (const route of routes) {
    const meta = getPageMeta(route);
    const app = renderToString(React.createElement(App, { path: route }));
    let html = template
      .replace("<!--app-html-->", app)
      .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/,
        `$1${escape(meta.description)}$2`,
      )
      .replace(
        /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/,
        `$1${escape(meta.title)}$2`,
      )
      .replace(
        /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/,
        `$1${escape(meta.description)}$2`,
      );
    if (origin && route !== "/404/")
      html = html.replace(
        "</head>",
        `<link rel="canonical" href="${escape(origin + route)}"/><meta property="og:url" content="${escape(origin + route)}"/></head>`,
      );
    if (route === "/404/")
      html = html.replace(
        "</head>",
        '<meta name="robots" content="noindex"/></head>',
      );
    const directory = resolve("dist", `.${route}`);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, "index.html"), html);
    if (route === "/404/") await writeFile(resolve("dist/404.html"), html);
  }
  if (origin) {
    const urls = routes
      .filter((route) => route !== "/404/")
      .map((route) => `<url><loc>${escape(origin + route)}</loc></url>`)
      .join("");
    await writeFile(
      resolve("dist/sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    );
    await writeFile(
      resolve("dist/robots.txt"),
      `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
    );
  } else
    await writeFile(resolve("dist/robots.txt"), "User-agent: *\nAllow: /\n");
  console.log(
    `Pre-rendered ${routes.length} routes with page-specific content and metadata.`,
  );
} finally {
  await server.close();
}
