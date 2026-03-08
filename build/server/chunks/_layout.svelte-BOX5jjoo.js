import { av as head, az as attr_class, am as clsx, ax as store_get, ay as unsubscribe_stores, aB as stringify, an as ensure_array_like, aw as attr, _ as derived } from './index-DPRpZFUH.js';
import { L as Logo } from './Logo-SUsePnoR.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { p as page } from './stores-BBk2HDxH.js';
import { t as theme } from './theme-CG4ny1_k.js';
import { S as SEO } from './SEO-BfGg61Oe.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './state.svelte-BwryGJJV.js';
import './index2-Cz2gv4fD.js';

function Btn_theme($$renderer) {
  var $$store_subs;
  $$renderer.push(`<button class="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" aria-label="Alternar tema">`);
  if (store_get($$store_subs ??= {}, "$theme", theme) === "dark") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
  }
  $$renderer.push(`<!--]--></button>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let mobileMenuOpen = false;
    const navLinks = [
      { href: "/", label: "Início" },
      { href: "/sobre", label: "Sobre" },
      {
        href: "/servicos",
        label: "Serviços",
        hasDropdown: true,
        children: [
          {
            href: "/servicos/faturacao-eletronica",
            label: "Facturação Electrónica",
            icon: "📄",
            description: "Emita facturas em conformidade com a AGT"
          },
          {
            href: "/servicos/gestao-de-documentos",
            label: "Gestão de Documentos",
            icon: "📁",
            description: "Organize todos os seus documentos fiscais"
          },
          {
            href: "/servicos/integracao-erp",
            label: "Integração ERP",
            icon: "🔗",
            description: "Conecte com o seu sistema existente"
          }
        ]
      },
      { href: "/planos", label: "Planos" },
      { href: "/carreiras", label: "Carreiras" },
      { href: "/parceiros", label: "Parceiros" },
      { href: "/contato", label: "Contacto" }
    ];
    function isActive(href, currentPath) {
      if (href === "/") return currentPath === "/";
      return currentPath.startsWith(href);
    }
    $$renderer2.push(`<header${attr_class(`fixed top-0 z-50 w-full transition-all duration-300 ${stringify("bg-transparent")}`)}><div class="container mx-auto px-4 lg:px-6"><div class="flex h-16 items-center justify-between lg:h-20"><a href="/" class="relative z-10 flex items-center gap-2">`);
    Logo($$renderer2);
    $$renderer2.push(`<!----></a> <nav class="hidden items-center gap-1 lg:flex"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let link = each_array[$$index_1];
      if (link.hasDropdown) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="relative" role="navigation" aria-label="Menu de serviços"><a${attr("href", link.href)}${attr_class(`group flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${stringify(isActive(link.href, store_get($$store_subs ??= {}, "$page", page).url.pathname) ? "text-blue-600 dark:text-blue-400" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400")}`)}>${escape_html(link.label)} <svg${attr_class(`h-4 w-4 transition-transform duration-200 ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a> `);
        {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<a${attr("href", link.href)}${attr_class(`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${stringify(isActive(link.href, store_get($$store_subs ??= {}, "$page", page).url.pathname) ? "text-blue-600 dark:text-blue-400" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400")}`)}>${escape_html(link.label)}</a>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="hidden items-center gap-3 lg:flex">`);
    Btn_theme($$renderer2);
    $$renderer2.push(`<!----> <a href="/login" class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Entrar</a> <a href="/cadastro" class="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"><span>Teste Grátis</span> <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></a></div> <div class="flex items-center gap-2 lg:hidden"><button class="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" aria-label="Alternar tema">`);
    if (store_get($$store_subs ??= {}, "$theme", theme) === "dark") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button> <button class="relative z-[100] flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"${attr("aria-expanded", mobileMenuOpen)} aria-controls="mobile-menu"${attr("aria-label", "Abrir menu")}><div class="flex h-5 w-5 flex-col items-center justify-center gap-1.5"><span${attr_class(`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${stringify("")}`)}></span> <span${attr_class(`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${stringify("")}`)}></span> <span${attr_class(`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${stringify("")}`)}></span></div></button></div></div></div></header> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="h-16 lg:h-20"></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let darkMode = derived(() => store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? true : false);
    (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white text-gray-700 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:text-gray-300 svelte-jz8lnl"><div${attr_class(`absolute -left-40 top-0 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-blue-500/10" : "bg-blue-400/20")}`, "svelte-jz8lnl")}></div> <div${attr_class(`absolute -right-40 bottom-0 h-96 w-96 rounded-full blur-3xl ${stringify(darkMode() ? "bg-purple-500/10" : "bg-purple-400/20")}`, "svelte-jz8lnl")}></div> <div${attr_class(`absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl ${stringify(darkMode() ? "bg-cyan-500/10" : "bg-indigo-400/15")}`, "svelte-jz8lnl")}></div> <div class="container relative mx-auto px-4 py-20 lg:px-6 svelte-jz8lnl">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div${attr_class(
      `border-t backdrop-blur-sm ${stringify(darkMode() ? "border-white/10 bg-black/20" : "border-gray-200 bg-gray-100/50")}`,
      "svelte-jz8lnl"
    )}><div class="container mx-auto px-4 py-6 lg:px-6 svelte-jz8lnl">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></footer>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  var $$store_subs;
  let { children } = $$props;
  head("175vhok", $$renderer, ($$renderer2) => {
    $$renderer2.push(`<script>
		(function (d, w, c) {
			w.BrevoConversationsID = '664eb86e43e0c5751b2a16b3';
			w[c] =
				w[c] ||
				function () {
					(w[c].q = w[c].q || []).push(arguments);
				};
			var s = d.createElement('script');
			s.async = true;
			s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
			if (d.head) d.head.appendChild(s);
		})(document, window, 'BrevoConversations');
	<\/script>`);
    $$renderer2.push(`<!---->`);
  });
  SEO($$renderer, {});
  $$renderer.push(`<!----> <div${attr_class(clsx(store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? "dark" : ""))}><div class="min-h-screen bg-white transition-colors duration-200 dark:bg-gray-900">`);
  Header($$renderer);
  $$renderer.push(`<!----> `);
  children($$renderer);
  $$renderer.push(`<!----> `);
  Footer($$renderer);
  $$renderer.push(`<!----></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-BOX5jjoo.js.map
