import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const template = readFileSync("dist/index.html", "utf8");
  const origin =
    "https://" +
    (process.env.VERCEL_PROJECT_PRODUCTION_URL || "akira-kobayashi.vercel.app");
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Akira Kobayashi Advogados",
    url: origin + "/",
    image: origin + "/photos/og.jpg",
    logo: origin + "/brand/logo-horizontal-marinho.svg",
    telephone: "+55 11 95658-4001",
    sameAs: ["https://www.instagram.com/adv_akira/"],
  };
  const html = template
    .replace("<!--app-html-->", renderToString(createElement(App)))
    .replaceAll("https://akira-kobayashi.vercel.app", origin)
    .replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`,
    );
  writeFileSync("dist/index.html", html);
  const privacy = template
    .replace(
      "<!--app-html-->",
      renderToString(createElement(App, { privacy: true })),
    )
    .replace(
      /<title>.*?<\/title>/,
      "<title>Privacidade | Akira Kobayashi</title>",
    )
    .replace(
      'href="https://akira-kobayashi.vercel.app/"',
      'href="https://akira-kobayashi.vercel.app/privacidade.html"',
    )
    .replace(
      'content="https://akira-kobayashi.vercel.app/"',
      'content="https://akira-kobayashi.vercel.app/privacidade.html"',
    )
    .replaceAll("https://akira-kobayashi.vercel.app", origin);
  writeFileSync("dist/privacidade.html", privacy);
  writeFileSync(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
  writeFileSync(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url><url><loc>${origin}/privacidade.html</loc></url></urlset>`,
  );
} finally {
  await server.close();
}
