import { az as attr_class, aB as stringify, aA as attr_style, an as ensure_array_like, _ as derived, ax as store_get, ay as unsubscribe_stores } from './index-DPRpZFUH.js';
import { o as onDestroy } from './index-server-CziyT60N.js';
import { t as theme } from './theme-CG4ny1_k.js';
import { W as Wave_divider } from './wave-divider-BXXULxVV.js';
import { F as FAQSection, C as CTA } from './CTA-Bqvnzyxb.js';
import { f as faqs } from './constants-DhttDS3t.js';
import { S as SEO } from './SEO-BfGg61Oe.js';
import './escaping-CqgfEcN3.js';
import './index2-Cz2gv4fD.js';

function HeroSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let darkMode = derived(() => store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? true : false);
    let mouseX = 0;
    let mouseY = 0;
    onDestroy(() => {
    });
    $$renderer2.push(`<section${attr_class(
      `relative min-h-[100vh] overflow-hidden ${stringify(darkMode() ? "bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950" : "bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800")}`,
      "svelte-tibptj"
    )} aria-roledescription="herro"><div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10 svelte-tibptj"></div> <div${attr_class(`absolute -left-40 -top-40 h-96 w-96 rounded-full blur-3xl transition-transform duration-1000 ${stringify(darkMode() ? "bg-blue-500/20" : "bg-white/20")}`, "svelte-tibptj")}${attr_style(`transform: translate(${stringify(mouseX * 2)}px, ${stringify(mouseY * 2)}px)`)}></div> <div${attr_class(`absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl transition-transform duration-1000 ${stringify(darkMode() ? "bg-purple-500/20" : "bg-yellow-300/20")}`, "svelte-tibptj")}${attr_style(`transform: translate(${stringify(mouseX * -2)}px, ${stringify(mouseY * -2)}px)`)}></div> <div${attr_class(`absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${stringify(darkMode() ? "bg-cyan-500/10" : "bg-blue-300/20")}`, "svelte-tibptj")}></div> <div class="absolute inset-0 overflow-hidden svelte-tibptj"><!--[-->`);
    const each_array = ensure_array_like(Array(20));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$renderer2.push(`<div${attr_class(`absolute h-1 w-1 rounded-full ${stringify(darkMode() ? "bg-blue-400/40" : "bg-white/40")}`, "svelte-tibptj")}${attr_style(` left: ${stringify(Math.random() * 100)}%; top: ${stringify(Math.random() * 100)}%; animation: float ${stringify(3 + Math.random() * 4)}s ease-in-out infinite; animation-delay: ${stringify(Math.random() * 2)}s; `)}></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28 svelte-tibptj"><div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 svelte-tibptj"><div class="relative z-10 text-center lg:text-left svelte-tibptj">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="relative hidden lg:block svelte-tibptj">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    Wave_divider($$renderer2);
    $$renderer2.push(`<!----></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function RecursosSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let darkMode = derived(() => store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? true : false);
    $$renderer2.push(`<section id="recursos"${attr_class(`relative min-h-screen overflow-hidden py-24 ${stringify(darkMode() ? "bg-gray-900" : "bg-gray-50")}`, "svelte-1px4h43")}><div${attr_class(`absolute -left-40 top-0 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-blue-500/10" : "bg-blue-400/20")}`, "svelte-1px4h43")}></div> <div${attr_class(`absolute -right-40 bottom-0 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-purple-500/10" : "bg-purple-400/20")}`, "svelte-1px4h43")}></div> <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 svelte-1px4h43">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-16 text-center svelte-1px4h43"><a href="/planos"${attr_class(
      `group inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stringify(darkMode() ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700")}`,
      "svelte-1px4h43"
    )}>Ver Planos <svg class="h-5 w-5 transition-transform group-hover:translate-x-1 svelte-1px4h43" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" class="svelte-1px4h43"></path></svg></a></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function ServicosSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let darkMode = derived(() => store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? true : false);
    $$renderer2.push(`<section id="servicos"${attr_class(
      `relative min-h-screen overflow-hidden py-24 ${stringify(darkMode() ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-white to-gray-50")}`,
      "svelte-6vertl"
    )}><div${attr_class(`absolute left-1/4 top-0 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-blue-500/10" : "bg-blue-300/20")}`, "svelte-6vertl")}></div> <div${attr_class(`absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-purple-500/10" : "bg-purple-300/20")}`, "svelte-6vertl")}></div> <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 svelte-6vertl">`);
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
function TestemunhosSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let darkMode = derived(() => store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? true : false);
    function stopAutoplay() {
    }
    onDestroy(stopAutoplay);
    $$renderer2.push(`<section${attr_class(
      `relative min-h-screen overflow-hidden py-24 ${stringify(darkMode() ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-50 to-white")}`,
      "svelte-pfqzik"
    )}><div${attr_class(`absolute -left-20 top-1/4 h-72 w-72 rounded-full blur-3xl ${stringify(darkMode() ? "bg-cyan-500/10" : "bg-cyan-300/20")}`, "svelte-pfqzik")}></div> <div${attr_class(`absolute -right-20 bottom-1/4 h-72 w-72 rounded-full blur-3xl ${stringify(darkMode() ? "bg-pink-500/10" : "bg-pink-300/20")}`, "svelte-pfqzik")}></div> <div class="container relative mx-auto px-6 lg:px-8 svelte-pfqzik">`);
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let mounted = false;
    SEO($$renderer2, {
      title: "FACT FLEXI",
      description: "A plataforma líder de facturação electrónica em Angola."
    });
    $$renderer2.push(`<!----> `);
    HeroSection($$renderer2);
    $$renderer2.push(`<!----> `);
    RecursosSection($$renderer2);
    $$renderer2.push(`<!----> `);
    ServicosSection($$renderer2);
    $$renderer2.push(`<!----> `);
    TestemunhosSection($$renderer2);
    $$renderer2.push(`<!----> `);
    FAQSection($$renderer2, { faqsData: faqs });
    $$renderer2.push(`<!----> `);
    CTA($$renderer2, {
      mounted,
      title: "Pronto para Modernizar a Sua Facturação?",
      description: "Junte-se a milhares de empresas angolanas que já utilizam a FACT FLEXI. Experimente gratuitamente durante 14 dias.",
      btnLblSecundary: "Falar com um Consultor",
      btnUrlSecundary: "/contato"
    });
    $$renderer2.push(`<!---->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-2o4rm8Z-.js.map
