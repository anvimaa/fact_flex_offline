import { av as head, aw as attr } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function SEO($$renderer, $$props) {
  let {
    title = "FACT FLEXI - Sistema de Faturação Moderno e Intuitivo",
    description = "Sistema de faturação eletrônica completo com conformidade fiscal, automação e integrações. Simplifique sua gestão financeira com FACT FLEXI.",
    keywords = "faturação, fatura eletrônica, gestão financeira, SAF-T, conformidade fiscal, fact, flexi, fact flexi, agt",
    ogImage = "/images/og-image.jpg"
  } = $$props;
  head("ojxrft", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(title)}</title>`);
    });
    $$renderer2.push(`<meta name="description"${attr("content", description)}/> <meta name="keywords"${attr("content", keywords)}/> <meta property="og:type" content="website"/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:image"${attr("content", ogImage)}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", title)}/> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", ogImage)}/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta name="theme-color" content="#4F46E5"/> <link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://www.googletagmanager.com"/>`);
  });
}

export { SEO as S };
//# sourceMappingURL=SEO-BfGg61Oe.js.map
