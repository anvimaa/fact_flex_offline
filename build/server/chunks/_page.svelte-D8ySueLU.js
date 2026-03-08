import { av as head, _ as derived } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as List_documents } from './list-documents-B9BLJ0lt.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { S as Search } from './search-BCOKC9CO.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './state.svelte-BwryGJJV.js';
import './table-row-B-9FJQyf.js';
import './package-BKsm9DRA.js';
import './percent-DRPkZNWp.js';
import './tag-Z83dV6tm.js';
import './credit-card-BMaAHNh2.js';
import './badge-D-ySjlTn.js';
import './receipt-DYJGkjI7.js';
import './file-text-BeaU1KrO.js';
import './eye-BbooT3RA.js';
import './printer-Byrp_rev.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const recibos = derived(() => data.recibos), pagination = derived(() => data.pagination);
    let statusStats = derived(() => ({
      total: pagination().total,
      validado: recibos().filter((d) => d.status === "VALIDADO_AGT").length,
      pendente: recibos().filter((d) => d.status === "PENDENTE_ENVIO").length,
      rejeitado: recibos().filter((d) => d.status === "REJEITADO_AGT").length
    }));
    let termoBusca = "";
    let documentosFiltrados = derived(() => recibos().filter((doc) => doc.numero.toLowerCase().includes(termoBusca.toLowerCase()) || doc.cliente?.nome.toLowerCase().includes(termoBusca.toLowerCase())));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("aiflx5", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Recibos | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto space-y-6 py-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold tracking-tight">Recibos</h1> <p class="text-muted-foreground">Gerencie os recibos emitidos</p></div> `);
      Button($$renderer3, {
        href: "/documentos/recibos/nova",
        children: ($$renderer4) => {
          Plus($$renderer4, { class: "mr-2 h-4 w-4" });
          $$renderer4.push(`<!----> Emitir Recibo`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center justify-between">`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Histórico de Recibos`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="relative w-64">`);
              Search($$renderer5, {
                class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                placeholder: "Buscar recibo...",
                class: "pl-8",
                get value() {
                  return termoBusca;
                },
                set value($$value) {
                  termoBusca = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              List_documents($$renderer5, {
                documentos: documentosFiltrados(),
                status: statusStats(),
                title: "Recibos",
                description: "Lista de recibos emitidos"
              });
              $$renderer5.push(`<!----> <div class="mt-4 flex items-center justify-end space-x-2">`);
              Button($$renderer5, {
                variant: "outline",
                size: "sm",
                disabled: pagination().page <= 1,
                href: `?page=${pagination().page - 1}`,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Anterior`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <span class="text-sm text-muted-foreground">Página ${escape_html(pagination().page)} de ${escape_html(pagination().totalPages)}</span> `);
              Button($$renderer5, {
                variant: "outline",
                size: "sm",
                disabled: pagination().page >= pagination().totalPages,
                href: `?page=${pagination().page + 1}`,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Próxima`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D8ySueLU.js.map
