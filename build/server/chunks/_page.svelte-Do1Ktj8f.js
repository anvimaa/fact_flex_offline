import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { F as FAQSection, C as CTA } from './CTA-Bqvnzyxb.js';
import { W as Wave_divider } from './wave-divider-BXXULxVV.js';
import { S as SEO } from './SEO-BfGg61Oe.js';
import './index2-Cz2gv4fD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './theme-CG4ny1_k.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let mounted = false;
    const faqs = [
      {
        pergunta: "Quanto tempo demora para activar a minha conta?",
        resposta: "A activação é instantânea! Após o registo e confirmação do email, pode começar a emitir facturas imediatamente. O processo completo leva menos de 5 minutos.",
        aberto: false
      },
      {
        pergunta: "Como funciona o suporte técnico?",
        resposta: "Oferecemos suporte via email, chat ao vivo e telefone. O tempo médio de resposta é de 2 horas em dias úteis. Clientes Enterprise têm acesso a suporte 24/7 dedicado.",
        aberto: false
      },
      {
        pergunta: "Posso migrar dados de outro sistema?",
        resposta: "Sim! A nossa equipa técnica pode ajudar na migração de dados de outros sistemas de facturação. Este serviço é gratuito para planos Profissional e Enterprise.",
        aberto: false
      },
      {
        pergunta: "A FACT FLEXI está certificada pela AGT?",
        resposta: "Sim, somos totalmente certificados pela Administração Geral Tributária de Angola para emissão de facturas electrónicas. Cumprimos todas as normas fiscais vigentes.",
        aberto: false
      },
      {
        pergunta: "Oferecem formação para a minha equipa?",
        resposta: "Absolutamente! Oferecemos formação online gratuita para todos os planos, e formação presencial personalizada para clientes Enterprise.",
        aberto: false
      }
    ];
    SEO($$renderer2, {
      title: "FACT FLEXI - Contacto",
      description: "Entre em contacto com a FACT FLEXI. Estamos aqui para ajudar com todas as suas questões sobre facturação electrónica em Angola."
    });
    $$renderer2.push(`<!----> <main class="min-h-screen bg-gray-50 dark:bg-gray-900"><section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 lg:py-32"><div class="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div> <div class="absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div> <div class="absolute -right-20 top-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div> <div class="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"></div> <div class="container relative mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    Wave_divider($$renderer2);
    $$renderer2.push(`<!----></section> <section class="py-16 lg:py-24"><div class="container mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> `);
    FAQSection($$renderer2, { faqsData: faqs, title: "sobre contactos" });
    $$renderer2.push(`<!----> <section id="mapa" class="bg-white py-20 dark:bg-gray-900"><div class="container mx-auto max-w-6xl px-4">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> `);
    CTA($$renderer2, { mounted });
    $$renderer2.push(`<!----></main>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Do1Ktj8f.js.map
