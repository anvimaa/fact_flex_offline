import { an as ensure_array_like } from './index-DPRpZFUH.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { D as Decimal, f as formatCurrency } from './utils3-DjmiJAAD.js';
import { P as Package } from './package-BKsm9DRA.js';
import { H as Hash, C as Calculator, P as Percent } from './percent-DRPkZNWp.js';
import { T as Tag } from './tag-Z83dV6tm.js';
import { C as Credit_card } from './credit-card-BMaAHNh2.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function List_sale_items($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { venda } = $$props;
    const calculateItemTotal = (item) => {
      const qty = new Decimal(item.quantidade);
      const price = new Decimal(item.precoUnitario);
      const subtotal = qty.mul(price);
      const descontoPercentual = new Decimal(item.desconto || 0);
      const descontoValor = subtotal.mul(descontoPercentual.div(100));
      const subtotalComDesconto = subtotal.sub(descontoValor);
      const taxaPercentual = new Decimal(item.produto.taxa?.valor || 0);
      const taxaValor = subtotalComDesconto.mul(taxaPercentual.div(100));
      return subtotalComDesconto.add(taxaValor).toNumber();
    };
    $$renderer2.push(`<div class="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl dark:bg-white/5 dark:ring-white/10 dark:hover:shadow-2xl"><div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/5 dark:to-white/5"></div> <div class="relative"><div class="flex items-center gap-3 border-b border-gray-100 px-6 py-4 dark:border-white/5"><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 ring-1 ring-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:ring-blue-500/30">`);
    Package($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div> <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Itens da Venda</h2></div> <div class="overflow-x-auto">`);
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
                            $$renderer6.push(`<!----> <span>Produto</span></div>`);
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
                const each_array = ensure_array_like(venda.itens || []);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let item = each_array[$$index];
                  const total = calculateItemTotal(item);
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
                              $$renderer6.push(`<!---->${escape_html(item.produto?.codigo || "N/A")}`);
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
                              $$renderer6.push(`<!---->${escape_html(item.produto?.descricao || "N/A")}`);
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
                              $$renderer6.push(`<!---->${escape_html(item.desconto || 0)}%`);
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
                              if (item.produto?.taxa) {
                                $$renderer6.push("<!--[-->");
                                $$renderer6.push(`<span class="text-blue-600 dark:text-blue-400">${escape_html(item.produto.taxa.valor)}%</span>`);
                              } else {
                                $$renderer6.push("<!--[!-->");
                                $$renderer6.push(`<span class="text-gray-400">-</span>`);
                              }
                              $$renderer6.push(`<!--]-->`);
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
                              $$renderer6.push(`<!---->${escape_html(formatCurrency(total))}`);
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
    $$renderer2.push(`</div> <div class="bg-gray-50/50 p-6 dark:bg-white/5">`);
    {
      $$renderer2.push("<!--[-->");
      const subtotal = venda?.itens?.reduce((acc, item) => acc.add(new Decimal(item.quantidade).mul(new Decimal(item.precoUnitario))), new Decimal(0)) || new Decimal(0);
      const totalDesconto = venda?.itens?.reduce(
        (acc, item) => {
          const itemSubtotal = new Decimal(item.quantidade).mul(new Decimal(item.precoUnitario));
          const descontoPercentual = new Decimal(item.desconto || 0);
          const descontoValor = itemSubtotal.mul(descontoPercentual.div(100));
          return acc.add(descontoValor);
        },
        new Decimal(0)
      ) || new Decimal(0);
      const totalTaxa = venda?.itens?.reduce(
        (acc, item) => {
          const itemSubtotal = new Decimal(item.quantidade).mul(new Decimal(item.precoUnitario));
          const descontoPercentual = new Decimal(item.desconto || 0);
          const descontoValor = itemSubtotal.mul(descontoPercentual.div(100));
          const subtotalComDesconto = itemSubtotal.sub(descontoValor);
          const taxaPercentual = new Decimal(item.produto.taxa?.valor || 0);
          const taxaValor = subtotalComDesconto.mul(taxaPercentual.div(100));
          return acc.add(taxaValor);
        },
        new Decimal(0)
      ) || new Decimal(0);
      $$renderer2.push(`<div class="ml-auto w-full max-w-sm space-y-3"><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Subtotal</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(formatCurrency(subtotal))}</span></div> `);
      if (totalDesconto.gt(0)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-between text-sm text-orange-600 dark:text-orange-400"><span>Desconto Total</span> <span class="font-medium">-${escape_html(formatCurrency(totalDesconto))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (totalTaxa.gt(0)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-between text-sm text-blue-600 dark:text-blue-400"><span>Taxa/IVA Total</span> <span class="font-medium">+${escape_html(formatCurrency(totalTaxa))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="my-2 border-t border-gray-200 dark:border-white/10"></div> <div class="flex justify-between text-base"><span class="font-bold text-gray-900 dark:text-white">Total</span> <span class="font-bold text-blue-600 dark:text-blue-400">${escape_html(formatCurrency(subtotal.sub(totalDesconto).add(totalTaxa)))}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}

export { List_sale_items as L };
//# sourceMappingURL=list-sale-items-BBciauIs.js.map
