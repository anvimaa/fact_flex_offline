import { an as ensure_array_like, az as attr_class, aB as stringify, aA as attr_style } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { T as Table, a as Table_header, c as Table_body, b as Table_row, d as Table_head, e as Table_cell } from './table-row-B-9FJQyf.js';
import { k as Circle_check_big, N as Notebook_pen, l as Circle_x, n as getStatusConfig, o as getStatusLabel, j as getStatusBadgeVariant, f as formatCurrency, T as Timer, p as getRelativeDate } from './utils3-DjmiJAAD.js';
import { P as Package } from './package-BKsm9DRA.js';
import { H as Hash, C as Calculator, P as Percent } from './percent-DRPkZNWp.js';
import { T as Tag } from './tag-Z83dV6tm.js';
import { C as Credit_card } from './credit-card-BMaAHNh2.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { R as Receipt } from './receipt-DYJGkjI7.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { E as Eye } from './eye-BbooT3RA.js';
import { P as Printer } from './printer-Byrp_rev.js';

function List_document_items($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { documento } = $$props;
    $$renderer2.push(`<div class="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl dark:bg-white/5 dark:ring-white/10 dark:hover:shadow-2xl"><div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/5 dark:to-white/5"></div> <div class="relative"><div class="flex items-center gap-3 border-b border-gray-100 px-6 py-4 dark:border-white/5"><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 ring-1 ring-gray-200 dark:bg-white/10 dark:text-gray-300 dark:ring-white/10">`);
    Package($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div> <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Itens do Documento</h2></div> <div class="overflow-x-auto">`);
    if (Table) {
      $$renderer2.push("<!--[-->");
      Table($$renderer2, {
        children: ($$renderer3) => {
          if (Table_header) {
            $$renderer3.push("<!--[-->");
            Table_header($$renderer3, {
              children: ($$renderer4) => {
                if (Table_row) {
                  $$renderer4.push("<!--[-->");
                  Table_row($$renderer4, {
                    class: "bg-gray-50/50 hover:bg-gray-50/50 dark:bg-white/5 dark:hover:bg-white/5",
                    children: ($$renderer5) => {
                      if (Table_head) {
                        $$renderer5.push("<!--[-->");
                        Table_head($$renderer5, {
                          class: "w-[100px]",
                          children: ($$renderer6) => {
                            $$renderer6.push(`<div class="flex items-center gap-2">`);
                            Hash($$renderer6, { class: "h-3.5 w-3.5 text-gray-400" });
                            $$renderer6.push(`<!----> <span>Código</span></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Table_head) {
                        $$renderer5.push("<!--[-->");
                        Table_head($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<div class="flex items-center gap-2">`);
                            Tag($$renderer6, { class: "h-3.5 w-3.5 text-gray-400" });
                            $$renderer6.push(`<!----> <span>Descrição</span></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Table_head) {
                        $$renderer5.push("<!--[-->");
                        Table_head($$renderer5, {
                          class: "text-right",
                          children: ($$renderer6) => {
                            $$renderer6.push(`<div class="flex items-center justify-end gap-2">`);
                            Calculator($$renderer6, { class: "h-3.5 w-3.5 text-gray-400" });
                            $$renderer6.push(`<!----> <span>Qtd.</span></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Table_head) {
                        $$renderer5.push("<!--[-->");
                        Table_head($$renderer5, {
                          class: "text-right",
                          children: ($$renderer6) => {
                            $$renderer6.push(`<!---->Preço Unit.`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Table_head) {
                        $$renderer5.push("<!--[-->");
                        Table_head($$renderer5, {
                          class: "text-right",
                          children: ($$renderer6) => {
                            $$renderer6.push(`<div class="flex items-center justify-end gap-2">`);
                            Percent($$renderer6, { class: "h-3.5 w-3.5 text-gray-400" });
                            $$renderer6.push(`<!----> <span>Taxa</span></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Table_head) {
                        $$renderer5.push("<!--[-->");
                        Table_head($$renderer5, {
                          class: "text-right",
                          children: ($$renderer6) => {
                            $$renderer6.push(`<div class="flex items-center justify-end gap-2">`);
                            Percent($$renderer6, { class: "h-3.5 w-3.5 text-gray-400" });
                            $$renderer6.push(`<!----> <span>Desc.</span></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Table_head) {
                        $$renderer5.push("<!--[-->");
                        Table_head($$renderer5, {
                          class: "text-right",
                          children: ($$renderer6) => {
                            $$renderer6.push(`<div class="flex items-center justify-end gap-2">`);
                            Credit_card($$renderer6, { class: "h-3.5 w-3.5 text-gray-400" });
                            $$renderer6.push(`<!----> <span>Total</span></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
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
          $$renderer3.push(` `);
          if (Table_body) {
            $$renderer3.push("<!--[-->");
            Table_body($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<!--[-->`);
                const each_array = ensure_array_like(documento.itens || []);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let item = each_array[$$index];
                  if (Table_row) {
                    $$renderer4.push("<!--[-->");
                    Table_row($$renderer4, {
                      class: "transition-colors hover:bg-gray-50/50 dark:hover:bg-white/5",
                      children: ($$renderer5) => {
                        if (Table_cell) {
                          $$renderer5.push("<!--[-->");
                          Table_cell($$renderer5, {
                            class: "font-medium text-gray-900 dark:text-white",
                            children: ($$renderer6) => {
                              $$renderer6.push(`<!---->${escape_html(item.codigo)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                        $$renderer5.push(` `);
                        if (Table_cell) {
                          $$renderer5.push("<!--[-->");
                          Table_cell($$renderer5, {
                            class: "text-gray-600 dark:text-gray-300",
                            children: ($$renderer6) => {
                              $$renderer6.push(`<!---->${escape_html(item.descricao)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                        $$renderer5.push(` `);
                        if (Table_cell) {
                          $$renderer5.push("<!--[-->");
                          Table_cell($$renderer5, {
                            class: "text-right font-medium text-gray-900 dark:text-white",
                            children: ($$renderer6) => {
                              $$renderer6.push(`<!---->${escape_html(item.quantidade)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                        $$renderer5.push(` `);
                        if (Table_cell) {
                          $$renderer5.push("<!--[-->");
                          Table_cell($$renderer5, {
                            class: "text-right text-gray-600 dark:text-gray-300",
                            children: ($$renderer6) => {
                              $$renderer6.push(`<!---->${escape_html(formatCurrency(item.precoUnitario))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                        $$renderer5.push(` `);
                        if (Table_cell) {
                          $$renderer5.push("<!--[-->");
                          Table_cell($$renderer5, {
                            class: "text-right text-gray-600 dark:text-gray-300",
                            children: ($$renderer6) => {
                              $$renderer6.push(`<!---->${escape_html(item.taxa)}%`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                        $$renderer5.push(` `);
                        if (Table_cell) {
                          $$renderer5.push("<!--[-->");
                          Table_cell($$renderer5, {
                            class: "text-right text-gray-600 dark:text-gray-300",
                            children: ($$renderer6) => {
                              $$renderer6.push(`<!---->${escape_html(item.desconto)}%`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                        $$renderer5.push(` `);
                        if (Table_cell) {
                          $$renderer5.push("<!--[-->");
                          Table_cell($$renderer5, {
                            class: "text-right font-semibold text-gray-900 dark:text-white",
                            children: ($$renderer6) => {
                              $$renderer6.push(`<!---->${escape_html(formatCurrency(item.total))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push("<!--]-->");
                        } else {
                          $$renderer5.push("<!--[!-->");
                          $$renderer5.push("<!--]-->");
                        }
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push("<!--]-->");
                  } else {
                    $$renderer4.push("<!--[!-->");
                    $$renderer4.push("<!--]-->");
                  }
                }
                $$renderer4.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(`</div> <div class="bg-gray-50/50 p-6 dark:bg-white/5"><div class="ml-auto w-full max-w-sm space-y-3"><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Subtotal</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(formatCurrency(documento.subtotal))}</span></div> <div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Taxa/IVA Total</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(formatCurrency(documento.totalImpostos))}</span></div> <div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Desconto Total</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(formatCurrency(documento.totalDesconto))}</span></div> <div class="my-2 border-t border-gray-200 dark:border-white/10"></div> <div class="flex justify-between text-base"><span class="font-bold text-gray-900 dark:text-white">Total</span> <span class="font-bold text-blue-600 dark:text-blue-400">${escape_html(formatCurrency(documento.total))}</span></div></div></div></div></div>`);
  });
}
function List_documents($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      documentos,
      status,
      title = "Documentos Fiscais",
      description = "Registro de documentos emitidos no sistema"
    } = $$props;
    let hoveredIndex = null;
    let selectedDoc = null;
    $$renderer2.push(`<div class="group/card rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl ring-1 ring-gray-200/50 transition-all duration-500 hover:shadow-2xl dark:from-white/5 dark:to-white/[0.02] dark:ring-white/10"><div class="mb-6 flex items-center justify-between"><div class="space-y-1"><h3 class="text-xl font-bold text-gray-900 dark:text-white">${escape_html(title)}</h3> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(description)}</p></div> <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg shadow-gray-900/30 transition-all duration-300 group-hover/card:scale-110 group-hover/card:shadow-xl dark:from-gray-600 dark:to-gray-800">`);
    Receipt($$renderer2, {
      class: "h-6 w-6 transition-transform duration-300 group-hover/card:rotate-6"
    });
    $$renderer2.push(`<!----></div></div> <div class="mb-6 grid grid-cols-4 gap-3"><div class="rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 p-3 dark:from-white/10 dark:to-white/5"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 dark:bg-white/10">`);
    File_text($$renderer2, { class: "h-4 w-4 text-gray-600 dark:text-gray-400" });
    $$renderer2.push(`<!----></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Total</div> <div class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(status.total)}</div></div></div></div> <div class="rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 dark:from-emerald-500/20 dark:to-emerald-500/10"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-200 dark:bg-emerald-500/30">`);
    Circle_check_big($$renderer2, { class: "h-4 w-4 text-emerald-600 dark:text-emerald-400" });
    $$renderer2.push(`<!----></div> <div><div class="text-xs text-emerald-600 dark:text-emerald-400">Validado</div> <div class="text-lg font-bold text-emerald-700 dark:text-emerald-300">${escape_html(status.validado)}</div></div></div></div> <div class="rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 p-3 dark:from-blue-500/20 dark:to-blue-500/10"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-200 dark:bg-blue-500/30">`);
    Notebook_pen($$renderer2, { class: "h-4 w-4 text-blue-600 dark:text-blue-400" });
    $$renderer2.push(`<!----></div> <div><div class="text-xs text-blue-600 dark:text-blue-400">Pendente</div> <div class="text-lg font-bold text-blue-700 dark:text-blue-300">${escape_html(status.pendente)}</div></div></div></div> <div class="rounded-xl bg-gradient-to-br from-red-100 to-red-50 p-3 dark:from-red-500/20 dark:to-red-500/10"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-200 dark:bg-red-500/30">`);
    Circle_x($$renderer2, { class: "h-4 w-4 text-red-600 dark:text-red-400" });
    $$renderer2.push(`<!----></div> <div><div class="text-xs text-red-600 dark:text-red-400">Rejeitado</div> <div class="text-lg font-bold text-red-700 dark:text-red-300">${escape_html(status.rejeitado)}</div></div></div></div></div> <div class="space-y-2">`);
    const each_array = ensure_array_like(documentos);
    if (each_array.length !== 0) {
      $$renderer2.push("<!--[-->");
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let doc = each_array[index];
        const statusConfig = getStatusConfig(doc.status);
        const StatusIcon = statusConfig.icon;
        const isHovered = hoveredIndex === index;
        const isSelected = selectedDoc === index;
        $$renderer2.push(`<div role="button" tabindex="0"${attr_class(`group/item relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${stringify(isSelected ? "bg-blue-50 ring-2 ring-blue-500 dark:bg-blue-500/10" : isHovered ? "bg-gray-100 dark:bg-white/10" : "bg-gray-50/50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10")}`)}${attr_style(`animation: slideIn 0.4s ease-out ${stringify(index * 0.05)}s backwards;`)}><div class="p-4"><div class="flex items-center gap-4"><div${attr_class(`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${stringify(statusConfig.bg)} ${stringify(isHovered ? `shadow-lg ${statusConfig.glow} scale-110` : "")}`)}>`);
        if (StatusIcon) {
          $$renderer2.push("<!--[-->");
          StatusIcon($$renderer2, { class: `h-6 w-6 ${stringify(statusConfig.text)}` });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
        $$renderer2.push(`</div> <div class="min-w-0 flex-1"><div class="flex items-center justify-between gap-2"><div class="flex items-center gap-2"><span class="font-bold text-gray-900 dark:text-white">${escape_html(doc.numero)}</span> `);
        Badge($$renderer2, {
          variant: getStatusBadgeVariant(doc.status),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(getStatusLabel(doc.status))}`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----></div> <span class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(doc.total))}</span></div> <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">`);
        if (doc.referenciaOriginal) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1.5"><div class="text-xs text-gray-500 dark:text-gray-400">Ref. Orig.</div> <div class="font-medium text-gray-900 dark:text-white">#${escape_html(doc.referenciaOriginal)}</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex items-center gap-1.5">`);
        File_text($$renderer2, { class: "h-3.5 w-3.5" });
        $$renderer2.push(`<!----> <span class="max-w-[150px] truncate">${escape_html(doc.cliente?.nome || "Consumidor Final")}</span></div> <div class="flex items-center gap-1.5">`);
        Timer($$renderer2, { class: "h-3.5 w-3.5" });
        $$renderer2.push(`<!----> <span>${escape_html(new Date(doc.dataEmissao).toLocaleDateString("pt-PT"))}</span></div> <div class="flex items-center gap-1.5 text-xs opacity-75">`);
        Timer($$renderer2, { class: "h-3 w-3" });
        $$renderer2.push(`<!----> <span>${escape_html(getRelativeDate(doc.dataEmissao.toString()))}</span></div></div></div> <div${attr_class(`flex items-center gap-2 opacity-0 transition-all duration-300 ${stringify(isHovered || isSelected ? "opacity-100" : "")}`)}><button class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-all hover:scale-110 hover:bg-gray-300 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-white/20">`);
        Eye($$renderer2, { class: "h-4 w-4" });
        $$renderer2.push(`<!----></button> <button class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-all hover:scale-110 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30">`);
        Printer($$renderer2, { class: "h-4 w-4" });
        $$renderer2.push(`<!----></button></div></div></div> `);
        if (isSelected) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="border-t border-gray-200 bg-gray-100/50 px-4 py-3 dark:border-white/10 dark:bg-white/5" style="animation: expandIn 0.3s ease-out;"><div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-5"><div><div class="text-xs text-gray-500 dark:text-gray-400">Número</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(doc.numero)}</div></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Tipo</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(getStatusLabel(doc.tipoDocumento))}</div></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Cliente</div> <div class="truncate font-medium text-gray-900 dark:text-white">${escape_html(doc.cliente?.nome || "Consumidor Final")}</div></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Data de Emissão</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(new Date(doc.dataEmissao).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            weekday: "long"
          }))}</div></div> <div><div class="text-xs text-gray-500 dark:text-gray-400">Valor Total</div> <div${attr_class(`font-bold ${stringify(statusConfig.text)}`)}>${escape_html(formatCurrency(doc.total))}</div></div></div> <div class="mt-4">`);
          List_document_items($$renderer2, { documento: doc });
          $$renderer2.push(`<!----></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div${attr_class(`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${stringify(statusConfig.dot)} ${stringify(isHovered || isSelected ? "opacity-100" : "opacity-0")}`)}></div></div>`);
      }
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center py-16 text-center"><div class="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/10">`);
      File_text($$renderer2, { class: "h-10 w-10 text-gray-400" });
      $$renderer2.push(`<!----></div> <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Nenhum documento encontrado</h4> <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Os documentos recentes aparecerão aqui</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}

export { List_documents as L };
//# sourceMappingURL=list-documents-B9BLJ0lt.js.map
