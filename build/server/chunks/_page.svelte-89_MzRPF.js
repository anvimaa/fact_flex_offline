import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { F as FAQSection, C as CTA } from './CTA-Bqvnzyxb.js';
import { W as Wave_divider } from './wave-divider-BXXULxVV.js';
import './auth-client-DRWmmDkL.js';
import './utils3-DjmiJAAD.js';
import { S as SEO } from './SEO-BfGg61Oe.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './events-GtUqDgmb.js';
import './theme-CG4ny1_k.js';
import './index2-Cz2gv4fD.js';
import './index-CQZxJQQs.js';
import './public-B844qK3e.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let mounted = false;
    const faqs = [
      {
        pergunta: "Posso mudar de plano a qualquer momento?",
        resposta: "Sim! Pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas imediatamente.",
        aberto: false
      },
      {
        pergunta: "Existe período de fidelização?",
        resposta: "Não existe fidelização. Pode cancelar quando quiser. Nos planos anuais, oferecemos reembolso proporcional.",
        aberto: false
      },
      {
        pergunta: "Como funciona o período de teste?",
        resposta: "Todos os planos incluem 14 dias de teste grátis com acesso completo. Não precisa de cartão de crédito.",
        aberto: false
      },
      {
        pergunta: "Quais métodos de pagamento aceitam?",
        resposta: "Aceitamos Multicaixa Express, referência bancária, transferência bancária e cartões internacionais.",
        aberto: false
      },
      {
        pergunta: "Os meus dados estão seguros?",
        resposta: "Utilizamos encriptação de nível bancário (AES-256), backups redundantes e cumprimos todas as normas RGPD.",
        aberto: false
      }
    ];
    SEO($$renderer2, {
      title: "FACT FLEXI - Planos e Preços",
      description: "Escolha o plano FACT FLEXI ideal para o seu negócio. Facturação electrónica certificada pela AGT. Teste grátis 14 dias."
    });
    $$renderer2.push(`<!----> <main class="min-h-screen bg-gray-50 dark:bg-gray-900"><section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 lg:py-32"><div class="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div> <div class="absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div> <div class="absolute -right-20 top-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div> <div class="container relative mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    Wave_divider($$renderer2);
    $$renderer2.push(`<!----></section> <section class="relative mt-8 pb-24"><div class="container mx-auto max-w-7xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> <section class="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 dark:from-gray-800 dark:to-gray-800"><div class="container mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> <section class="bg-white py-20 dark:bg-gray-800"><div class="container mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> `);
    FAQSection($$renderer2, { faqsData: faqs, title: "sobre os planos" });
    $$renderer2.push(`<!----> `);
    CTA($$renderer2, {
      mounted,
      description: "Junte-se a milhares de empresas angolanas que já confiam na FACT FLEXI para a sua facturação.",
      btnLblSecundary: "Falar com Vendas",
      btnUrlSecundary: "/contato"
    });
    $$renderer2.push(`<!----></main>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-89_MzRPF.js.map
