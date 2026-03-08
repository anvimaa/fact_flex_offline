import { aw as attr, an as ensure_array_like, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { m as Circle_alert, I as Icon } from './utils3-DjmiJAAD.js';
import { S as Search } from './search-BCOKC9CO.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import './events-GtUqDgmb.js';
import './public-B844qK3e.js';

function Calendar_days($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }
    ],
    ["path", { "d": "M3 10h18" }],
    ["path", { "d": "M8 14h.01" }],
    ["path", { "d": "M12 14h.01" }],
    ["path", { "d": "M16 14h.01" }],
    ["path", { "d": "M8 18h.01" }],
    ["path", { "d": "M12 18h.01" }],
    ["path", { "d": "M16 18h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "calendar-days" },
    $$sanitized_props,
    {
      /**
       * @component @name CalendarDays
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAydjQiIC8+CiAgPHBhdGggZD0iTTE2IDJ2NCIgLz4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik0zIDEwaDE4IiAvPgogIDxwYXRoIGQ9Ik04IDE0aC4wMSIgLz4KICA8cGF0aCBkPSJNMTIgMTRoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xNiAxNGguMDEiIC8+CiAgPHBhdGggZD0iTTggMThoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xMiAxOGguMDEiIC8+CiAgPHBhdGggZD0iTTE2IDE4aC4wMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/calendar-days
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
    let { data } = $$props;
    let startDate = "";
    let endDate = "";
    $$renderer2.push(`<div class="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-7xl"><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h1 class="text-2xl font-bold tracking-tight">Documentos Eletrónicos</h1> <p class="text-muted-foreground text-sm">Consulte as faturas enviadas eletronicamente para a AGT num determinado período.</p></div></div> `);
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
      $$renderer2.push(`<!--]--> <div class="bg-card border rounded-xl shadow-sm p-4"><h3 class="font-semibold text-lg mb-4 text-primary flex items-center gap-2">`);
      Calendar_days($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----> Filtro por Período</h3> <div class="flex flex-col sm:flex-row items-end gap-4"><div class="w-full sm:w-auto flex-1 max-w-[200px]"><label for="startDate" class="block text-sm font-medium mb-1">Data Inicial</label> <input type="date" id="startDate"${attr("value", startDate)} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/></div> <div class="w-full sm:w-auto flex-1 max-w-[200px]"><label for="endDate" class="block text-sm font-medium mb-1">Data Final</label> <input type="date" id="endDate"${attr("value", endDate)} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/></div> <button type="button" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto">`);
      Search($$renderer2, { class: "h-4 w-4 mr-2" });
      $$renderer2.push(`<!----> Filtrar</button></div></div> <div class="bg-card text-card-foreground border rounded-xl shadow-sm overflow-hidden flex flex-col h-full"><div class="p-6 border-b"><h3 class="font-semibold text-lg text-primary flex items-center gap-2">`);
      File_text($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----> Documentos Encontrados (${escape_html(data.invoices ? data.invoices.length : 0)})</h3></div> <div class="p-0 overflow-auto flex-1">`);
      if (data.invoices && data.invoices.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<table class="w-full text-sm text-left"><thead class="text-xs text-muted-foreground uppercase bg-muted/50"><tr><th class="px-6 py-3 font-medium">Nº Documento (AGT)</th><th class="px-6 py-3 font-medium">Data Emissão</th></tr></thead><tbody class="divide-y"><!--[-->`);
        const each_array = ensure_array_like(data.invoices);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let invoice = each_array[$$index];
          $$renderer2.push(`<tr class="hover:bg-muted/50 transition-colors"><td class="px-6 py-4 font-medium">${escape_html(invoice.documentNo)}</td><td class="px-6 py-4 text-muted-foreground">${escape_html(invoice.documentDate)}</td></tr>`);
        }
        $$renderer2.push(`<!--]--></tbody></table>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="p-8 text-center flex flex-col items-center justify-center h-full text-muted-foreground"><p>Nenhum documento encontrado neste período.</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-YhCSxJ8V.js.map
