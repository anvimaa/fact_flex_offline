import { F as FAQSection, C as CTA } from './CTA-Bqvnzyxb.js';
import { W as Wave_divider } from './wave-divider-BXXULxVV.js';
import { S as SEO } from './SEO-BfGg61Oe.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './theme-CG4ny1_k.js';
import './index2-Cz2gv4fD.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let mounted = false;
    const faqs = [
      {
        pergunta: "Quanto tempo demora a configuração inicial?",
        resposta: "A configuração inicial é muito rápida! Em menos de 10 minutos pode ter a sua conta pronta para emitir facturas. Basta adicionar os dados da empresa e já pode começar.",
        aberto: false
      },
      {
        pergunta: "O sistema está certificado pela AGT?",
        resposta: "Sim! A FACT FLEXI está totalmente certificada pela Administração Geral Tributária de Angola para emissão de facturas electrónicas. Cumprimos todas as normas fiscais vigentes.",
        aberto: false
      },
      {
        pergunta: "Posso integrar com outros sistemas?",
        resposta: "Absolutamente! Oferecemos uma API robusta e documentada para integração com ERPs, sistemas de contabilidade e outras plataformas. Planos Profissional e Enterprise incluem acesso completo à API.",
        aberto: false
      },
      {
        pergunta: "Como funciona o backup dos dados?",
        resposta: "Realizamos backups automáticos em tempo real com redundância em múltiplos servidores. Os seus dados estão sempre seguros e podem ser recuperados a qualquer momento.",
        aberto: false
      },
      {
        pergunta: "Oferecem formação para a equipa?",
        resposta: "Sim! Todos os planos incluem acesso a tutoriais em vídeo e documentação completa. Para planos Enterprise, oferecemos formação presencial personalizada.",
        aberto: false
      }
    ];
    SEO($$renderer2, {
      title: "FACT FLEXI - Serviços",
      description: "Conheça os serviços FACT FLEXI: facturação electrónica, gestão de documentos e integração ERP. Soluções certificadas pela AGT para empresas angolanas."
    });
    $$renderer2.push(`<!----> <main class="min-h-screen bg-gray-50 dark:bg-gray-900"><section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 lg:py-32"><div class="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div> <div class="absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div> <div class="absolute -right-20 top-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div> <div class="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl"></div> <div class="absolute left-1/4 top-1/4 h-2 w-2 animate-ping rounded-full bg-blue-400"></div> <div class="absolute right-1/3 top-1/3 h-1.5 w-1.5 animate-ping rounded-full bg-purple-400" style="animation-delay: 0.5s;"></div> <div class="absolute bottom-1/3 left-1/2 h-1 w-1 animate-ping rounded-full bg-cyan-400" style="animation-delay: 1s;"></div> <div class="container relative mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    Wave_divider($$renderer2);
    $$renderer2.push(`<!----></section> <section class="relative py-24"><div class="container mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> <section class="bg-white py-24 dark:bg-gray-800"><div class="container mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> <section class="py-24"><div class="container mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> `);
    FAQSection($$renderer2, { faqsData: faqs, title: "sobre os serviçoes" });
    $$renderer2.push(`<!----> `);
    CTA($$renderer2, {
      mounted,
      title: "Pronto para Modernizar a Sua Facturação?",
      description: "Junte-se a milhares de empresas angolanas que já utilizam a FACT FLEXI. Experimente gratuitamente durante 14 dias.",
      btnLblSecundary: "Falar com um Consultor",
      btnUrlSecundary: "/contato"
    });
    $$renderer2.push(`<!----></main>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DsG-28R1.js.map
