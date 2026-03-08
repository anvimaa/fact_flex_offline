import { av as head, _ as derived, an as ensure_array_like } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { f as formatCurrency } from './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { P as Printer } from './printer-Byrp_rev.js';
import { F as Filter } from './filter-D_JAT5I9.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const relatorio = derived(() => data.relatorio), filtrosAtuais = derived(() => data.filtrosAtuais);
    let dataInicio = derived(() => data.filtrosAtuais.dataInicio);
    let dataFim = derived(() => data.filtrosAtuais.dataFim);
    let tipoDocumento = derived(() => data.filtrosAtuais.tipoDocumento);
    let status = derived(() => data.filtrosAtuais.status);
    function aplicarFiltros() {
      const params = new URLSearchParams();
      params.set("dataInicio", dataInicio());
      params.set("dataFim", dataFim());
      if (tipoDocumento()) params.set("tipoDocumento", tipoDocumento());
      if (status()) params.set("status", status());
      goto(`?${params.toString()}`);
    }
    function imprimir() {
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1o1c806", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Relatorios | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto space-y-6 py-6 print:p-0 svelte-1o1c806"><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between print:hidden"><div><h1 class="text-3xl font-bold tracking-tight">Relatórios Fiscais</h1> <p class="text-muted-foreground">Análise detalhada de documentos emitidos</p></div> <div class="flex gap-2">`);
      Button($$renderer3, {
        variant: "outline",
        onclick: imprimir,
        children: ($$renderer4) => {
          Printer($$renderer4, { class: "mr-2 h-4 w-4" });
          $$renderer4.push(`<!----> Imprimir`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> `);
      Card($$renderer3, {
        class: "print:hidden",
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
                for: "dataInicio",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Data Início`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                type: "date",
                id: "dataInicio",
                get value() {
                  return dataInicio();
                },
                set value($$value) {
                  dataInicio($$value);
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
                type: "date",
                id: "dataFim",
                get value() {
                  return dataFim();
                },
                set value($$value) {
                  dataFim($$value);
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
                  value: tipoDocumento(),
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Todos`);
                  });
                  $$renderer6.option({ value: "FACTURA" }, ($$renderer7) => {
                    $$renderer7.push(`Factura`);
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
                  $$renderer6.push(`<!---->Estado`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "status",
                  value: status(),
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Todos`);
                  });
                  $$renderer6.option({ value: "EMITIDO" }, ($$renderer7) => {
                    $$renderer7.push(`Emitido`);
                  });
                  $$renderer6.option({ value: "ANULADO" }, ($$renderer7) => {
                    $$renderer7.push(`Anulado`);
                  });
                  $$renderer6.option({ value: "RASCUNHO" }, ($$renderer7) => {
                    $$renderer7.push(`Rascunho`);
                  });
                }
              );
              $$renderer5.push(`</div></div> <div class="mt-4 flex justify-end">`);
              Button($$renderer5, {
                onclick: aplicarFiltros,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Aplicar Filtros`);
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
      $$renderer3.push(`<!----> <div class="mb-8 hidden print:block"><h1 class="text-center text-2xl font-bold">Relatório de Documentos Fiscais</h1> <p class="text-center text-sm text-muted-foreground">Período: ${escape_html(filtrosAtuais().dataInicio)} a ${escape_html(filtrosAtuais().dataFim)}</p></div> <div class="grid gap-4 md:grid-cols-4 print:grid-cols-4">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "pb-2",
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "text-sm font-medium",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Total Documentos`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="text-2xl font-bold">${escape_html(relatorio().resumo.totalDocumentos)}</div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "pb-2",
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "text-sm font-medium",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Total Bruto`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="text-2xl font-bold">${escape_html(formatCurrency(relatorio().resumo.valorTotalBruto))}</div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "pb-2",
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "text-sm font-medium",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Total Impostos`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="text-2xl font-bold">${escape_html(formatCurrency(relatorio().resumo.valorTotalImpostos))}</div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "pb-2",
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "text-sm font-medium",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Total Líquido`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="text-2xl font-bold text-primary">${escape_html(formatCurrency(relatorio().resumo.valorTotalLiquido))}</div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Detalhe dos Documentos`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              Table($$renderer5, {
                children: ($$renderer6) => {
                  Table_header($$renderer6, {
                    children: ($$renderer7) => {
                      Table_row($$renderer7, {
                        children: ($$renderer8) => {
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Data`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Número`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Tipo`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Cliente`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->NIF`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            class: "text-right",
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Total`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Estado`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Table_body($$renderer6, {
                    children: ($$renderer7) => {
                      if (relatorio().documentos.length === 0) {
                        $$renderer7.push("<!--[-->");
                        Table_row($$renderer7, {
                          children: ($$renderer8) => {
                            Table_cell($$renderer8, {
                              colspan: 7,
                              class: "h-24 text-center text-muted-foreground",
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Nenhum documento encontrado no período.`);
                              },
                              $$slots: { default: true }
                            });
                          },
                          $$slots: { default: true }
                        });
                      } else {
                        $$renderer7.push("<!--[!-->");
                        $$renderer7.push(`<!--[-->`);
                        const each_array = ensure_array_like(relatorio().documentos);
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          let doc = each_array[$$index];
                          Table_row($$renderer7, {
                            children: ($$renderer8) => {
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(new Date(doc.dataEmissao).toLocaleDateString("pt-AO"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                class: "font-medium",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(doc.numero)}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(doc.tipoDocumento)}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(doc.cliente?.nome || "Consumidor Final")}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(doc.cliente?.nif || "-")}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                class: "text-right",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(formatCurrency(doc.total))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> `);
                              Table_cell($$renderer8, {
                                children: ($$renderer9) => {
                                  Badge($$renderer9, {
                                    variant: doc.status === "EMITIDO" ? "default" : "secondary",
                                    children: ($$renderer10) => {
                                      $$renderer10.push(`<!---->${escape_html(doc.status)}`);
                                    },
                                    $$slots: { default: true }
                                  });
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$renderer7.push(`<!--]-->`);
                      }
                      $$renderer7.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="mt-8 hidden border-t pt-4 text-center text-xs text-muted-foreground print:block"><p>Processado por FACT FLEXI - Software Certificado</p> <p>Data de geração: ${escape_html((/* @__PURE__ */ new Date()).toLocaleString("pt-AO"))}</p></div></div>`);
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
//# sourceMappingURL=_page.svelte-CZ5shQjd.js.map
