import { aw as attr, an as ensure_array_like, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { S as SEO } from './SEO-BfGg61Oe.js';
import { m as Circle_alert, u as Circle_check, I as Icon } from './utils3-DjmiJAAD.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { C as Check } from './check-cM-2r8Wr.js';
import './events-GtUqDgmb.js';
import './public-B844qK3e.js';
import './index2-Cz2gv4fD.js';

function Copy($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      {
        "width": "14",
        "height": "14",
        "x": "8",
        "y": "8",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "path",
      {
        "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "copy" },
    $$sanitized_props,
    {
      /**
       * @component @name Copy
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHg9IjgiIHk9IjgiIHJ4PSIyIiByeT0iMiIgLz4KICA8cGF0aCBkPSJNNCAxNmMtMS4xIDAtMi0uOS0yLTJWNGMwLTEuMS45LTIgMi0yaDEwYzEuMSAwIDIgLjkgMiAyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/copy
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let isSubmitting = false;
    const documentTypes = [
      { value: "FT", label: "Factura" },
      { value: "FR", label: "Factura/Recibo" },
      { value: "RC", label: "Recibo" },
      { value: "NC", label: "Nota de Crédito" },
      { value: "ND", label: "Nota de Débito" },
      { value: "RG", label: "Recibo Geral" }
    ];
    let copiedId = null;
    SEO($$renderer2, {
      title: "Séries de Documentos",
      description: "Consulte as séries ativas na AGT ou solicite a criação de novas séries."
    });
    $$renderer2.push(`<!----> <div class="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-7xl"><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h1 class="text-2xl font-bold tracking-tight">Séries de Documentos</h1> <p class="text-muted-foreground text-sm">Consulte as séries ativas na AGT ou solicite a criação de novas séries.</p></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
      if (data.error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-destructive/15 text-destructive border-destructive/20 border rounded-md p-4 flex items-center gap-3">`);
        Circle_alert($$renderer2, { class: "h-5 w-5" });
        $$renderer2.push(`<!----> <p class="text-sm font-medium">${escape_html(data.error)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (form?.error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-destructive/15 text-destructive border-destructive/20 border rounded-md p-4 flex items-center gap-3">`);
        Circle_alert($$renderer2, { class: "h-5 w-5" });
        $$renderer2.push(`<!----> <p class="text-sm font-medium">${escape_html(form.error)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (form?.success) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-emerald-500/15 text-emerald-600 border-emerald-500/20 border rounded-md p-4 flex items-center gap-3">`);
        Circle_check($$renderer2, { class: "h-5 w-5" });
        $$renderer2.push(`<!----> <p class="text-sm font-medium">${escape_html(form.message)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-1"><div class="bg-card text-card-foreground border rounded-xl shadow-sm"><div class="p-6"><h3 class="font-semibold text-lg mb-4 text-primary">Solicitar Nova Série</h3> <form method="POST" action="?/requestSeries" class="space-y-4"><div class="space-y-2"><label for="seriesYear" class="text-sm font-medium leading-none">Ano da Série</label> <input type="number" id="seriesYear" name="seriesYear" required=""${attr("value", (/* @__PURE__ */ new Date()).getFullYear())} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/></div> <div class="space-y-2"><label for="documentType" class="text-sm font-medium leading-none">Tipo de Documento</label> <select id="documentType" name="documentType" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"><!--[-->`);
      const each_array = ensure_array_like(documentTypes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let type = each_array[$$index];
        $$renderer2.option({ value: type.value }, ($$renderer3) => {
          $$renderer3.push(`${escape_html(type.label)} (${escape_html(type.value)})`);
        });
      }
      $$renderer2.push(`<!--]--></select></div> <div class="space-y-2"><label for="establishmentNumber" class="text-sm font-medium leading-none">Nº Estabelecimento</label> <input type="text" id="establishmentNumber" name="establishmentNumber" required="" value="SEDE" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/> <p class="text-[0.8rem] text-muted-foreground">Normalmente "SEDE" para ambiente de testes ou sede principal.</p></div> <div class="space-y-2"><label for="seriesContingencyIndicator" class="text-sm font-medium leading-none">Indicador de Contingência</label> <select id="seriesContingencyIndicator" name="seriesContingencyIndicator" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">`);
      $$renderer2.option({ value: "N" }, ($$renderer3) => {
        $$renderer3.push(`Normal`);
      });
      $$renderer2.option({ value: "C" }, ($$renderer3) => {
        $$renderer3.push(`Contingência`);
      });
      $$renderer2.push(`</select></div> <button type="submit"${attr("disabled", isSubmitting, true)} class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Solicitar Série`);
      }
      $$renderer2.push(`<!--]--></button></form></div></div></div> <div class="lg:col-span-2"><div class="bg-card text-card-foreground border rounded-xl shadow-sm overflow-hidden flex flex-col h-full"><div class="p-6 border-b"><h3 class="font-semibold text-lg text-primary">Séries Disponíveis na AGT</h3></div> <div class="p-0 overflow-auto flex-1">`);
      if (data.series && data.series.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<table class="w-full text-sm text-left"><thead class="text-xs text-muted-foreground uppercase bg-muted/50"><tr><th class="px-6 py-3 font-medium">Série</th><th class="px-6 py-3 font-medium">Tipo</th><th class="px-6 py-3 font-medium">Status</th><th class="px-6 py-3 font-medium">1º Doc. Aprovado</th></tr></thead><tbody class="divide-y"><!--[-->`);
        const each_array_1 = ensure_array_like(data.series);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let serie = each_array_1[$$index_1];
          $$renderer2.push(`<tr class="hover:bg-muted/50 transition-colors"><td class="px-6 py-4 font-medium whitespace-nowrap group/cell"><div class="flex items-center gap-2"><span>${escape_html(serie.seriesCode)}</span> <button class="opacity-0 group-hover/cell:opacity-100 p-1 hover:bg-muted rounded-md transition-all duration-200 text-muted-foreground hover:text-primary" title="Copiar código">`);
          if (copiedId === serie.seriesCode) {
            $$renderer2.push("<!--[-->");
            Check($$renderer2, { size: 14, class: "text-emerald-500" });
          } else {
            $$renderer2.push("<!--[!-->");
            Copy($$renderer2, { size: 14 });
          }
          $$renderer2.push(`<!--]--></button></div> <span class="text-xs text-muted-foreground block font-norma">Ano: ${escape_html(serie.seriesYear)}</span></td><td class="px-6 py-4"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">${escape_html(documentTypes.find((doc) => doc.value === serie.documentType)?.label)}</span></td><td class="px-6 py-4">`);
          if (serie.seriesStatus === "A" || serie.seriesStatus === "U") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">${escape_html(serie.seriesStatus === "A" ? "Aberta" : "Em utilização")}</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">Fechada (${escape_html(serie.seriesStatus)})</span>`);
          }
          $$renderer2.push(`<!--]--></td><td class="px-6 py-4 text-muted-foreground">${escape_html(serie.firstDocumentApproved || "-")} `);
          if (serie.lastDocumentApproved) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`até ${escape_html(serie.lastDocumentApproved)}`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></td></tr>`);
        }
        $$renderer2.push(`<!--]--></tbody></table>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="p-8 text-center flex flex-col items-center justify-center h-full text-muted-foreground"><p>Nenhuma série encontrada.</p> <p class="text-sm mt-1">Utilize o formulário ao lado para solicitar uma nova série.</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-U-yLC3rF.js.map
