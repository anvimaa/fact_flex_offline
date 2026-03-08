import { av as head, an as ensure_array_like, ai as spread_props, _ as derived } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { D as Decimal } from './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as List_documents } from './list-documents-B9BLJ0lt.js';
import { R as Root, T as Trigger, D as Dropdown_menu_content, a as Dropdown_menu_item } from './index6-Co-qiBWu.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { p as page } from './index5-D4hFMmqX.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { S as Search } from './search-BCOKC9CO.js';
import { C as Chevrons_left, a as Chevrons_right } from './chevrons-right-BqjeZ3X9.js';
import { C as Chevron_left } from './chevron-left-DOf1aQ1b.js';
import { C as Chevron_right } from './chevron-right-BAItaPVX.js';
import { C as Circle_plus } from './circle-plus-B-WSFwuP.js';
import { C as Chevron_down } from './chevron-down-DGXS3bh7.js';
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
import './use-id-BeJs9ypc.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './use-roving-focus.svelte-j4gb8sNV.js';
import './attrs-mduo83PF.js';
import './index2-Cz2gv4fD.js';
import './client-nuXUwqwr.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
    let { data } = $$props;
    const documentos = derived(() => data.documentos.map((d) => {
      return {
        ...d,
        subtotal: new Decimal(d.subtotal),
        total: new Decimal(d.total),
        totalDesconto: new Decimal(d.totalDesconto),
        totalImpostos: new Decimal(d.totalImpostos),
        retencao: new Decimal(d.retencao),
        itens: d.itens.map((i) => {
          return {
            ...i,
            subtotal: new Decimal(i.subtotal),
            total: new Decimal(i.total),
            precoUnitario: new Decimal(i.precoUnitario),
            desconto: new Decimal(i.desconto),
            descontoValor: new Decimal(i.descontoValor),
            taxa: new Decimal(i.taxa),
            taxaValor: new Decimal(i.taxaValor)
          };
        })
      };
    }));
    let termoBusca = page.url.searchParams.get("search") || "";
    let newDocs = [
      { url: "fatura-recibo", label: "Fatura-Recibo" },
      { url: "fatura-global", label: "Fatura Global" },
      { url: "fatura-simplificada", label: "Fatura Simplificada" },
      { url: "fatura-adiantamento", label: "Fatura Adiantamento" }
    ];
    let statusStats = derived(() => ({
      total: documentos().length,
      validado: documentos().filter((d) => d.status === "VALIDADO_AGT").length,
      pendente: documentos().filter((d) => d.status === "PENDENTE_ENVIO" || d.status === "EMITIDO" || d.status === "RASCUNHO").length,
      rejeitado: documentos().filter((d) => d.status === "REJEITADO_AGT").length
    }));
    let paginacao = derived(() => ({
      currentPage: data.paginacao?.currentPage || 1,
      itemsPerPage: data.paginacao?.itemsPerPage || 10,
      totalItems: data.paginacao?.totalItems || 0,
      totalPages: data.paginacao?.totalPages || 1
    }));
    function irParaPagina(pagina) {
      if (pagina < 1 || pagina > paginacao().totalPages) return;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", pagina.toString());
      goto(`/documentos/factura?${searchParams.toString()}`);
    }
    function alterarItensPorPagina(novoLimit) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("limit", novoLimit.toString());
      searchParams.set("page", "1");
      goto(`/documentos/factura?${searchParams.toString()}`);
    }
    let paginasVisiveis = derived(() => {
      const { currentPage, totalPages } = paginacao();
      const paginas = [];
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          paginas.push(i);
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            paginas.push(i);
          }
          if (totalPages > 6) paginas.push(-1);
          paginas.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          paginas.push(1);
          if (totalPages > 6) paginas.push(-1);
          for (let i = totalPages - 4; i <= totalPages; i++) {
            paginas.push(i);
          }
        } else {
          paginas.push(1);
          if (currentPage > 3) paginas.push(-1);
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            paginas.push(i);
          }
          if (currentPage < totalPages - 2) paginas.push(-2);
          paginas.push(totalPages);
        }
      }
      return paginas;
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("11z4hjg", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Facturas | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto space-y-6 py-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold tracking-tight">Facturas</h1> <p class="text-muted-foreground">Gerencie suas facturas comerciais</p></div> <div class="flex gap-2">`);
      Button($$renderer3, {
        href: "/documentos/factura/nova",
        children: ($$renderer4) => {
          Plus($$renderer4, { class: "mr-2 h-4 w-4" });
          $$renderer4.push(`<!----> Nova Factura`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      if (Root) {
        $$renderer3.push("<!--[-->");
        Root($$renderer3, {
          children: ($$renderer4) => {
            {
              let child = function($$renderer5, { props }) {
                Button($$renderer5, spread_props([
                  { variant: "outline" },
                  props,
                  {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Mais `);
                      Chevron_down($$renderer6, { class: "ml-2 h-4 w-4" });
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  }
                ]));
              };
              if (Trigger) {
                $$renderer4.push("<!--[-->");
                Trigger($$renderer4, { child, $$slots: { child: true } });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            }
            $$renderer4.push(` `);
            if (Dropdown_menu_content) {
              $$renderer4.push("<!--[-->");
              Dropdown_menu_content($$renderer4, {
                align: "end",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!--[-->`);
                  const each_array = ensure_array_like(newDocs);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let doc = each_array[$$index];
                    if (Dropdown_menu_item) {
                      $$renderer5.push("<!--[-->");
                      Dropdown_menu_item($$renderer5, {
                        onclick: () => goto(`/documentos/${doc.url}/nova`),
                        children: ($$renderer6) => {
                          Circle_plus($$renderer6, { class: "mr-2 h-4 w-4" });
                          $$renderer6.push(`<!----> ${escape_html(doc.label)}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push("<!--]-->");
                    } else {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push("<!--]-->");
                    }
                  }
                  $$renderer5.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
          },
          $$slots: { default: true }
        });
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
      $$renderer3.push(`</div></div> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center justify-between">`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Listagem`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex items-center gap-4"><div class="relative w-64">`);
              Search($$renderer5, {
                class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                placeholder: "Buscar factura...",
                class: "pl-8",
                get value() {
                  return termoBusca;
                },
                set value($$value) {
                  termoBusca = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> `);
              if (paginacao().totalItems > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex items-center gap-2"><label for="items-per-page" class="whitespace-nowrap text-sm text-muted-foreground">Por pág:</label> `);
                $$renderer5.select(
                  {
                    id: "items-per-page",
                    value: paginacao().itemsPerPage,
                    onchange: (e) => alterarItensPorPagina(parseInt(e.target.value)),
                    class: "h-9 rounded-md border border-input bg-background px-2 text-sm"
                  },
                  ($$renderer6) => {
                    $$renderer6.option({ value: 5 }, ($$renderer7) => {
                      $$renderer7.push(`5`);
                    });
                    $$renderer6.option({ value: 10 }, ($$renderer7) => {
                      $$renderer7.push(`10`);
                    });
                    $$renderer6.option({ value: 20 }, ($$renderer7) => {
                      $$renderer7.push(`20`);
                    });
                    $$renderer6.option({ value: 50 }, ($$renderer7) => {
                      $$renderer7.push(`50`);
                    });
                  }
                );
                $$renderer5.push(`</div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              List_documents($$renderer5, {
                documentos: documentos(),
                status: statusStats(),
                title: "Facturas",
                description: "Lista de facturas emitidas"
              });
              $$renderer5.push(`<!----> `);
              if (paginacao().totalPages > 1) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="mt-4 flex items-center justify-between border-t pt-4"><div class="text-sm text-muted-foreground">Mostrando ${escape_html((paginacao().currentPage - 1) * paginacao().itemsPerPage + 1)} a ${escape_html(Math.min(paginacao().currentPage * paginacao().itemsPerPage, paginacao().totalItems))} de ${escape_html(paginacao().totalItems)} resultados</div> <div class="flex items-center gap-1">`);
                Button($$renderer5, {
                  variant: "outline",
                  size: "icon",
                  onclick: () => irParaPagina(1),
                  disabled: paginacao().currentPage === 1,
                  children: ($$renderer6) => {
                    Chevrons_left($$renderer6, { class: "h-4 w-4" });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  variant: "outline",
                  size: "icon",
                  onclick: () => irParaPagina(paginacao().currentPage - 1),
                  disabled: paginacao().currentPage === 1,
                  children: ($$renderer6) => {
                    Chevron_left($$renderer6, { class: "h-4 w-4" });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <!--[-->`);
                const each_array_1 = ensure_array_like(paginasVisiveis());
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let pagina = each_array_1[$$index_1];
                  if (pagina === -1 || pagina === -2) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<span class="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground">...</span>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    Button($$renderer5, {
                      variant: pagina === paginacao().currentPage ? "default" : "outline",
                      size: "icon",
                      onclick: () => irParaPagina(pagina),
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->${escape_html(pagina)}`);
                      },
                      $$slots: { default: true }
                    });
                  }
                  $$renderer5.push(`<!--]-->`);
                }
                $$renderer5.push(`<!--]--> `);
                Button($$renderer5, {
                  variant: "outline",
                  size: "icon",
                  onclick: () => irParaPagina(paginacao().currentPage + 1),
                  disabled: paginacao().currentPage === paginacao().totalPages,
                  children: ($$renderer6) => {
                    Chevron_right($$renderer6, { class: "h-4 w-4" });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  variant: "outline",
                  size: "icon",
                  onclick: () => irParaPagina(paginacao().totalPages),
                  disabled: paginacao().currentPage === paginacao().totalPages,
                  children: ($$renderer6) => {
                    Chevrons_right($$renderer6, { class: "h-4 w-4" });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]-->`);
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
//# sourceMappingURL=_page.svelte-p6KuLVPJ.js.map
