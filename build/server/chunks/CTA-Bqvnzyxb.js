import { az as attr_class, aB as stringify, aw as attr, _ as derived, ax as store_get, ay as unsubscribe_stores } from './index-DPRpZFUH.js';
import { t as theme } from './theme-CG4ny1_k.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function FAQSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { faqsData, title = "sobre o FACT FLEXI" } = $$props;
    let darkMode = derived(() => store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? true : false);
    faqsData.map((faq) => ({ ...faq, aberto: false }));
    $$renderer2.push(`<section id="faq"${attr_class(
      `relative min-h-screen overflow-hidden py-8 ${stringify(darkMode() ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-white to-gray-50")}`,
      "svelte-pi5nal"
    )}><div${attr_class(`absolute left-0 top-1/4 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-indigo-500/10" : "bg-indigo-300/20")}`, "svelte-pi5nal")}></div> <div${attr_class(`absolute bottom-1/4 right-0 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-purple-500/10" : "bg-purple-300/20")}`, "svelte-pi5nal")}></div> <div class="container relative mx-auto px-6 lg:px-8 svelte-pi5nal">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function CTA($$renderer, $$props) {
  let {
    mounted = true,
    title = "Pronto para Começar?",
    description = "Experimente a FACT FLEXI gratuitamente durante 14 dias. Sem compromisso, sem cartão decrédito.",
    btnLblPrincipal = "Começar Teste Grátis",
    btnUrlPrincipal = "/cadastro",
    btnLblSecundary = "Ver Planos e Preços",
    btnUrlSecundary = "/planos"
  } = $$props;
  $$renderer.push(`<section class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-20"><div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div> <div class="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div> <div class="container relative mx-auto max-w-4xl px-4 text-center">`);
  if (mounted) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div><h2 class="mb-6 text-3xl font-bold text-white md:text-4xl">${escape_html(title)}</h2> <p class="mx-auto mb-8 max-w-2xl text-xl text-blue-100">${escape_html(description)}</p> <div class="flex flex-col justify-center gap-4 sm:flex-row"><a${attr("href", btnUrlPrincipal)} class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-xl shadow-black/10 transition-all hover:-translate-y-1 hover:shadow-2xl">${escape_html(btnLblPrincipal)} <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></a> <a${attr("href", btnUrlSecundary)} class="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-8 py-4 font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20">${escape_html(btnLblSecundary)}</a></div> <p class="mt-6 text-sm text-blue-200">✓ 14 dias grátis   ✓ Sem cartão de crédito   ✓ Cancelar a qualquer momento</p></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div></section>`);
}

export { CTA as C, FAQSection as F };
//# sourceMappingURL=CTA-Bqvnzyxb.js.map
