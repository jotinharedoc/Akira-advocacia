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
  // Domínio final: SITE_URL (ex.: https://www.seudominio.com.br) tem prioridade; depois o domínio de produção da Vercel.
  const origin = (
    process.env.SITE_URL ||
    "https://" + (process.env.VERCEL_PROJECT_PRODUCTION_URL || "akira-kobayashi.vercel.app")
  ).replace(/\/$/, "");
  const { site, content } = await server.ssrLoadModule("/src/config/site.ts");
  // Dados estruturados (schema.org): escritório, advogado, área atendida, serviços e perguntas frequentes.
  // Sem endereço de rua nem cidade inventada: só o estado, até o escritório confirmar (SITE_CITY / SITE_AREAS).
  const attorney = {
    "@type": "Person",
    "@id": origin + "/#advogado",
    name: site.name,
    jobTitle: "Advogado criminalista",
    identifier: { "@type": "PropertyValue", propertyID: "OAB/SP", value: "330.377" },
    knowsAbout: ["Direito Penal", "Execução Penal", "Habeas corpus", "Tribunal do Júri", "Progressão de regime", "Revisão criminal"],
    sameAs: [site.instagram],
  };
  const services = [...content.practice.items.flatMap((area) => area.items)];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LegalService", "Attorney"],
        "@id": origin + "/#escritorio",
        name: "Akira Kobayashi Advogados",
        url: origin + "/",
        image: origin + "/photos/og.jpg",
        logo: origin + "/brand/logo-horizontal-marinho.svg",
        telephone: "+55 14 99788-4001",
        description: content.hero.description,
        address: {
          "@type": "PostalAddress",
          ...(process.env.SITE_CITY ? { addressLocality: process.env.SITE_CITY } : {}),
          addressRegion: "SP",
          addressCountry: "BR",
        },
        // SITE_AREAS="Bauru,São Paulo" acrescenta cidades atendidas, quando o escritório confirmar.
        areaServed: [
          ...String(process.env.SITE_AREAS || "")
            .split(",")
            .map((name) => name.trim())
            .filter(Boolean)
            .map((name) => ({ "@type": "City", name })),
          { "@type": "State", name: "São Paulo" },
        ],
        knowsLanguage: "pt-BR",
        founder: { "@id": origin + "/#advogado" },
        employee: { "@id": origin + "/#advogado" },
        sameAs: [site.instagram],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Áreas de atuação",
          itemListElement: services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      attorney,
      { "@type": "WebSite", "@id": origin + "/#site", url: origin + "/", name: "Akira Kobayashi Advogados", inLanguage: "pt-BR" },
      {
        "@type": "FAQPage",
        "@id": origin + "/#duvidas",
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
  const verification = process.env.GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${String(process.env.GOOGLE_SITE_VERIFICATION).replace(/[^A-Za-z0-9_-]/g, "")}" />`
    : "";
  const html = template
    .replace("<!--app-html-->", renderToString(createElement(App)))
    .replaceAll("https://akira-kobayashi.vercel.app", origin)
    .replace(
      "</head>",
      `${verification}<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></head>`,
    );
  writeFileSync("dist/index.html", html);
  const privacy = template
    .replace(
      "<!--app-html-->",
      renderToString(createElement(App, { privacy: true })),
    )
    .replace(
      /<title>[\s\S]*?<\/title>/,
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
  // Página 404 (a Vercel serve dist/404.html para endereços inexistentes). Fora do índice do Google.
  const notFound = template
    .replace(
      '<div id="root"><!--app-html--></div>',
      `<div id="root" data-page="404">${renderToString(createElement(App, { notFound: true }))}</div>`,
    )
    .replace(/<title>[\s\S]*?<\/title>/, "<title>Página não encontrada | Akira Kobayashi</title>")
    .replace(/<meta\s+name="robots"[^>]*>/, '<meta name="robots" content="noindex" />')
    .replace(/<link rel="canonical"[^>]*>/, "")
    .replace(/<link\s+rel="preload"\s+as="image"[^>]*>/, "")
    .replaceAll("https://akira-kobayashi.vercel.app", origin);
  if (!notFound.includes('data-page="404"')) throw new Error("404: marcador do root não encontrado");
  writeFileSync("dist/404.html", notFound);
  writeFileSync(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
  writeFileSync(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url><url><loc>${origin}/privacidade.html</loc></url></urlset>`,
  );
} finally {
  await server.close();
}
