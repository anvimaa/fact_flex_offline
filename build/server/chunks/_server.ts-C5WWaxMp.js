async function GET() {
  const pages = [
    "sobre",
    "servicos",
    "servicos/faturacao-eletronica",
    "servicos/gestao-de-documentos",
    "servicos/integracao-erp",
    "planos",
    "carreiras",
    "parceiros",
    "contato",
    "privacidade",
    "termos",
    "cookies"
  ];
  const site = "https://www.factflexi.com";
  const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
        <loc>${site}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${pages.map(
    (page) => `
        <url>
          <loc>${site}/${page}</loc>
		  <priority>0.8</priority>
          <changefreq>weekly</changefreq>
        </url>
      `
  ).join("")}
    </urlset>`.trim();
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}

export { GET };
//# sourceMappingURL=_server.ts-C5WWaxMp.js.map
