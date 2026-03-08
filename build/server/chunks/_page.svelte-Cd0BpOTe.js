import { av as head, an as ensure_array_like, aB as stringify, _ as derived, ai as spread_props } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { p as page } from './index5-D4hFMmqX.js';
import { L as List_documents } from './list-documents-B9BLJ0lt.js';
import { R as Root, T as Trigger, D as Dropdown_menu_content, a as Dropdown_menu_item } from './index6-Co-qiBWu.js';
import { C as ChevronRight } from './ChevronRight-C2c2Cx0G.js';
import { C as Circle_plus } from './circle-plus-B-WSFwuP.js';
import { F as Filter } from './filter-D_JAT5I9.js';
import { C as Chevrons_left, a as Chevrons_right } from './chevrons-right-BqjeZ3X9.js';
import { C as Chevron_left } from './chevron-left-DOf1aQ1b.js';
import { C as Chevron_down } from './chevron-down-DGXS3bh7.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './client-nuXUwqwr.js';
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
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './use-roving-focus.svelte-j4gb8sNV.js';
import './attrs-mduo83PF.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const documentos = derived(() => data.documentos);
    const filtros = derived(() => data.filtros), estatisticas = derived(() => data.estatisticas);
    let tipoFiltro = derived(() => filtros().tipoDocumento || "");
    let statusFiltro = derived(() => filtros().status || "");
    let dataInicioFiltro = derived(() => filtros().dataInicio || "");
    let dataFimFiltro = derived(() => filtros().dataFim || "");
    let searchFiltro = derived(() => page.url.searchParams.get("search") || "");
    function aplicarFiltros() {
      const params = new URLSearchParams();
      if (tipoFiltro()) params.set("tipo", tipoFiltro());
      if (statusFiltro()) params.set("status", statusFiltro());
      if (dataInicioFiltro()) params.set("dataInicio", dataInicioFiltro());
      if (dataFimFiltro()) params.set("dataFim", dataFimFiltro());
      if (searchFiltro()) params.set("search", searchFiltro());
      goto(`/documentos/fiscais?${params.toString()}`);
    }
    function limparFiltros() {
      tipoFiltro("");
      statusFiltro("");
      dataInicioFiltro("");
      dataFimFiltro("");
      searchFiltro("");
      goto();
    }
    let newDocs = [
      { url: "factura", label: "Factura" },
      { url: "pro-forma", label: "Pró-forma" },
      { url: "recibos", label: "Recibos" },
      { url: "notas-credito", label: "Nota de Crédito" },
      { url: "notas-debito", label: "Nota de Débito" },
      { url: "guias-remessa", label: "Guia Remessa" }
    ];
    const statusStats = derived(() => ({
      total: estatisticas().total,
      validado: estatisticas().porStatus.VALIDADO_AGT || 0,
      pendente: estatisticas().porStatus.PENDENTE_ENVIO || 0,
      rejeitado: estatisticas().porStatus.REJEITADO_AGT || 0
    }));
    let paginacao = derived(() => ({
      currentPage: data.paginacao.currentPage,
      itemsPerPage: data.paginacao.itemsPerPage,
      totalItems: data.paginacao.totalItems,
      totalPages: data.paginacao.totalPages
    }));
    function irParaPagina(pagina) {
      if (pagina < 1 || pagina > paginacao().totalPages) return;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", pagina.toString());
      goto(`/documentos/fiscais?${searchParams.toString()}`);
    }
    function alterarItensPorPagina(novoLimit) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("limit", novoLimit.toString());
      searchParams.set("page", "1");
      goto(`/documentos/fiscais?${searchParams.toString()}`);
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
      head("jt7ggy", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Documentos | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto space-y-6 py-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold tracking-tight">Documentos Fiscais</h1> <p class="text-muted-foreground">Gestão de documentos fiscalmente relevantes</p></div> <div class="flex gap-2"><!--[-->`);
      const each_array = ensure_array_like(newDocs.slice(0, 3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let doc = each_array[$$index];
        Button($$renderer3, {
          href: `/documentos/${stringify(doc.url)}/nova`,
          children: ($$renderer4) => {
            Circle_plus($$renderer4, { class: "mr-2 h-4 w-4" });
            $$renderer4.push(`<!----> ${escape_html(doc.label)}`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer3.push(`<!--]--> `);
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
                  const each_array_1 = ensure_array_like(newDocs.slice(3));
                  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                    let doc = each_array_1[$$index_1];
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
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Filter($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Filtros`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-4"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "search",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Busca`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "search",
                placeholder: "Nº Documento ou Cliente...",
                get value() {
                  return searchFiltro();
                },
                set value($$value) {
                  searchFiltro($$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "tipo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Tipo de Documento`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "tipo",
                  value: tipoFiltro(),
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Todos`);
                  });
                  $$renderer6.option({ value: "FACTURA" }, ($$renderer7) => {
                    $$renderer7.push(`Factura`);
                  });
                  $$renderer6.option({ value: "FACTURA_PROFORMA" }, ($$renderer7) => {
                    $$renderer7.push(`Pró-forma`);
                  });
                  $$renderer6.option({ value: "FACTURA_RECIBO" }, ($$renderer7) => {
                    $$renderer7.push(`Fatura-Recibo`);
                  });
                  $$renderer6.option({ value: "FACTURA_SIMPLIFICADA" }, ($$renderer7) => {
                    $$renderer7.push(`Fatura Simplificada`);
                  });
                  $$renderer6.option({ value: "FACTURA_ADIANTAMENTO" }, ($$renderer7) => {
                    $$renderer7.push(`Fatura Adiantamento`);
                  });
                  $$renderer6.option({ value: "FACTURA_GLOBAL" }, ($$renderer7) => {
                    $$renderer7.push(`Fatura Global`);
                  });
                  $$renderer6.option({ value: "RECIBO" }, ($$renderer7) => {
                    $$renderer7.push(`Recibo`);
                  });
                  $$renderer6.option({ value: "NOTA_CREDITO" }, ($$renderer7) => {
                    $$renderer7.push(`Nota de Crédito`);
                  });
                  $$renderer6.option({ value: "NOTA_DEBITO" }, ($$renderer7) => {
                    $$renderer7.push(`Nota de Débito`);
                  });
                  $$renderer6.option({ value: "GUIA_REMESSA" }, ($$renderer7) => {
                    $$renderer7.push(`Guia de Remessa`);
                  });
                }
              );
              $$renderer5.push(`</div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "status",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Status`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "status",
                  value: statusFiltro(),
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Todos`);
                  });
                  $$renderer6.option({ value: "EMITIDO" }, ($$renderer7) => {
                    $$renderer7.push(`Emitido`);
                  });
                  $$renderer6.option({ value: "VALIDADO_AGT" }, ($$renderer7) => {
                    $$renderer7.push(`Validado`);
                  });
                  $$renderer6.option({ value: "PENDENTE_ENVIO" }, ($$renderer7) => {
                    $$renderer7.push(`Pendente`);
                  });
                  $$renderer6.option({ value: "REJEITADO_AGT" }, ($$renderer7) => {
                    $$renderer7.push(`Rejeitado`);
                  });
                  $$renderer6.option({ value: "ANULADO" }, ($$renderer7) => {
                    $$renderer7.push(`Anulado`);
                  });
                }
              );
              $$renderer5.push(`</div> <div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "dataInicio",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Data Início`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "dataInicio",
                type: "date",
                get value() {
                  return dataInicioFiltro();
                },
                set value($$value) {
                  dataInicioFiltro($$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "dataFim",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Data Fim`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "dataFim",
                type: "date",
                get value() {
                  return dataFimFiltro();
                },
                set value($$value) {
                  dataFimFiltro($$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div></div> <div class="mt-4 flex gap-2">`);
              Button($$renderer5, {
                onclick: aplicarFiltros,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Aplicar Filtros`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                variant: "outline",
                onclick: limparFiltros,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Limpar`);
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
      $$renderer3.push(`<!----> <div class="flex items-center justify-between"><div>`);
      if (paginacao().totalItems === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`Nenhum dado encontrado.`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`Exibindo ${escape_html((paginacao().currentPage - 1) * paginacao().itemsPerPage + 1)} a ${escape_html(Math.min(paginacao().currentPage * paginacao().itemsPerPage, paginacao().totalItems))} de ${escape_html(paginacao().totalItems)} documentos${escape_html(paginacao().totalItems > 1 ? "s" : "")}`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (paginacao().totalItems > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex items-center gap-2"><label for="items-per-page" class="whitespace-nowrap text-sm text-muted-foreground">Itens por página:</label> `);
        $$renderer3.select(
          {
            id: "items-per-page",
            value: paginacao().itemsPerPage,
            onchange: (e) => alterarItensPorPagina(parseInt(e.target.value)),
            class: "h-8 w-16 rounded border bg-background px-2 text-sm"
          },
          ($$renderer4) => {
            $$renderer4.option({ value: 1 }, ($$renderer5) => {
              $$renderer5.push(`1`);
            });
            $$renderer4.option({ value: 5 }, ($$renderer5) => {
              $$renderer5.push(`5`);
            });
            $$renderer4.option({ value: 10 }, ($$renderer5) => {
              $$renderer5.push(`10`);
            });
            $$renderer4.option({ value: 25 }, ($$renderer5) => {
              $$renderer5.push(`25`);
            });
            $$renderer4.option({ value: 50 }, ($$renderer5) => {
              $$renderer5.push(`50`);
            });
            $$renderer4.option({ value: 100 }, ($$renderer5) => {
              $$renderer5.push(`100`);
            });
          }
        );
        $$renderer3.push(`</div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      List_documents($$renderer3, {
        documentos: documentos(),
        status: statusStats(),
        title: "Lista de Documentos",
        description: "Visualize e gerencie todos os documentos fiscais emitidos"
      });
      $$renderer3.push(`<!----> `);
      if (data.paginacao.totalPages > 1) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="mt-6 flex items-center justify-between rounded-lg bg-zinc-200 px-4 py-3 shadow-xl dark:bg-zinc-800/50"><div class="text-sm text-muted-foreground">Página ${escape_html(data.paginacao.currentPage)} de ${escape_html(data.paginacao.totalPages)}</div> <div class="flex items-center gap-1">`);
        Button($$renderer3, {
          variant: "outline",
          size: "sm",
          onclick: () => irParaPagina(1),
          disabled: data.paginacao.currentPage === 1,
          class: "h-8 w-8 p-0",
          children: ($$renderer4) => {
            Chevrons_left($$renderer4, { class: "h-4 w-4" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          variant: "outline",
          size: "sm",
          onclick: () => irParaPagina(data.paginacao.currentPage - 1),
          disabled: data.paginacao.currentPage === 1,
          class: "h-8 w-8 p-0",
          children: ($$renderer4) => {
            Chevron_left($$renderer4, { class: "h-4 w-4" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <!--[-->`);
        const each_array_2 = ensure_array_like(paginasVisiveis());
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let pagina = each_array_2[$$index_2];
          if (pagina === -1 || pagina === -2) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">…</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
            Button($$renderer3, {
              variant: pagina === data.paginacao.currentPage ? "default" : "outline",
              size: "sm",
              onclick: () => irParaPagina(pagina),
              class: "h-8 w-8 p-0",
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->${escape_html(pagina)}`);
              },
              $$slots: { default: true }
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--> `);
        Button($$renderer3, {
          variant: "outline",
          size: "sm",
          onclick: () => irParaPagina(data.paginacao.currentPage + 1),
          disabled: data.paginacao.currentPage === data.paginacao.totalPages,
          class: "h-8 w-8 p-0",
          children: ($$renderer4) => {
            ChevronRight($$renderer4, { class: "h-4 w-4" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          variant: "outline",
          size: "sm",
          onclick: () => irParaPagina(data.paginacao.totalPages),
          disabled: data.paginacao.currentPage === data.paginacao.totalPages,
          class: "h-8 w-8 p-0",
          children: ($$renderer4) => {
            Chevrons_right($$renderer4, { class: "h-4 w-4" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
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
//# sourceMappingURL=_page.svelte-Cd0BpOTe.js.map
