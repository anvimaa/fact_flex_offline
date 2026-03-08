import { av as head, an as ensure_array_like, aA as attr_style, aB as stringify, _ as derived, ah as sanitize_props, ai as spread_props, ap as slot, aw as attr } from './index-DPRpZFUH.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { f as formatCurrency, D as Decimal, I as Icon, j as getStatusBadgeVariant } from './utils3-DjmiJAAD.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { T as Table, a as Table_header, b as Table_row, c as Table_body, d as Table_head, e as Table_cell } from './table-row-B-9FJQyf.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-B9KnjxJN.js';
import { D as Dollar_sign } from './dollar-sign-oLGOq175.js';
import { A as Activity } from './activity-0wvLMWe1.js';
import { B as Building_2 } from './building-2-iv7t62nJ.js';
import { T as Trending_up } from './trending-up-suqfe4Iy.js';
import { U as Users } from './users-CSW0O0kd.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './public-B844qK3e.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './context-BAmjzoO_.js';

function Arrow_up_right($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M7 7h10v10" }],
    ["path", { "d": "M7 17 17 7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-up-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowUpRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNyA3aDEwdjEwIiAvPgogIDxwYXRoIGQ9Ik03IDE3IDE3IDciIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/arrow-up-right
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
    const stats = derived(() => data.stats);
    const monthlyData = derived(() => data.monthlyData);
    const recentPayments = derived(() => data.recentPayments);
    function formatStatus(status) {
      const statusMap = {
        PENDING: "Pendente",
        APPROVED: "Aprovado",
        REJECTED: "Rejeitado"
      };
      return statusMap[status] || status;
    }
    const maxRevenue = derived(() => monthlyData().reduce(
      (max, curr) => {
        const revenue = new Decimal(curr.revenue);
        return revenue.gt(max) ? revenue : max;
      },
      new Decimal(0)
    ));
    head("j6cdpt", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard Administrativo | FACT FLEXI</title>`);
      });
    });
    $$renderer2.push(`<div class="flex-1 space-y-8 p-8 pt-6"><div class="flex items-center justify-between space-y-2"><div><h2 class="text-3xl font-bold tracking-tight">Dashboard</h2> <p class="text-muted-foreground">Bem-vindo ao painel de controlo administrativo.</p></div></div> <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Receita Total`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Dollar_sign($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(formatCurrency(stats().totalRevenue))}</div> <p class="text-xs text-muted-foreground">+20.1% em relação ao último trimestre</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Assinaturas Ativas`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Activity($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(stats().activeSubscriptions)}</div> <p class="text-xs text-muted-foreground flex gap-2 mt-1"><span class="text-blue-500 font-medium">${escape_html(stats().monthlySubscriptions)} Mensais</span> <span class="text-purple-500 font-medium">${escape_html(stats().annualSubscriptions)} Anuais</span></p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Empresas Registadas`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Building_2($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(stats().totalCompanies)}</div> <p class="text-xs text-muted-foreground text-green-500 flex items-center font-medium">`);
            Trending_up($$renderer4, { class: "w-3 h-3 mr-1" });
            $$renderer4.push(`<!----> +12 este mês</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Total Utilizadores`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Users($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(stats().totalUsers)}</div> <p class="mt-1 flex items-center gap-2 text-xs"><span class="text-green-500 font-medium">${escape_html(stats().totalUsers - stats().totalUsersInactive)} ativos</span> <span>/</span> <span class="text-red-500 font-medium">${escape_html(stats().totalUsersInactive)} inativos</span></p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-7">`);
    Card($$renderer2, {
      class: "col-span-4 lg:col-span-4 shadow-sm border-muted/60",
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-lg font-semibold",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Visão Geral de Receitas`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Acompanhamento dos últimos 6 meses`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="h-[280px] w-full pt-6 relative flex flex-col justify-end"><div class="absolute inset-0 flex flex-col justify-between pt-6 pb-6 z-0"><!--[-->`);
            const each_array = ensure_array_like(Array(5));
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              each_array[$$index];
              $$renderer4.push(`<div class="w-full border-b border-dashed border-muted-foreground/20"></div>`);
            }
            $$renderer4.push(`<!--]--></div> <div class="relative z-10 flex h-full w-full items-end justify-between px-2 pb-6 pt-6"><!--[-->`);
            const each_array_1 = ensure_array_like(monthlyData());
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let data2 = each_array_1[$$index_1];
              const heightPercent = maxRevenue().isZero() ? 0 : new Decimal(data2.revenue).div(maxRevenue()).toNumber() * 100;
              $$renderer4.push(`<div class="group relative flex w-full max-w-[48px] flex-col items-center justify-end h-full"><div class="absolute -top-10 z-20 hidden whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all duration-200 group-hover:block dark:bg-slate-100 dark:text-slate-900">${escape_html(formatCurrency(data2.revenue))} <div class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900 dark:bg-slate-100"></div></div> <div class="w-full rounded-t-md bg-primary/80 transition-all duration-300 hover:bg-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)]"${attr_style(`height: ${stringify(heightPercent)}%; min-height: ${stringify(heightPercent > 0 ? "4px" : "0")};`)}><div class="h-full w-full rounded-t-md bg-gradient-to-t from-transparent to-white/20"></div></div> <span class="absolute -bottom-6 mt-2 text-xs font-medium text-muted-foreground">${escape_html(data2.month)}</span></div>`);
            }
            $$renderer4.push(`<!--]--></div></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "col-span-3 lg:col-span-3",
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Status dos Pagamentos`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Resumo de todas as transações efetuadas na plataforma`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="space-y-8 mt-4"><div class="flex items-center"><div class="flex flex-col gap-2 w-full relative"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div> <span class="text-sm font-semibold">Aprovados</span></div> <span class="text-sm font-medium">${escape_html(stats().approvedPayments)}</span></div> <div class="h-3 w-full bg-secondary rounded-full overflow-hidden border"><div class="h-full bg-green-500 transition-all duration-1000 ease-out"${attr_style(`width: ${stringify(stats().totalPayments === 0 ? 0 : stats().approvedPayments / stats().totalPayments * 100)}%`)}></div></div> <div class="flex items-center justify-between text-xs text-muted-foreground"><span>${escape_html(stats().totalPayments === 0 ? 0 : Math.round(stats().approvedPayments / stats().totalPayments * 100))}% do total</span> <span>Sucesso</span></div></div></div> <div class="flex items-center"><div class="flex flex-col gap-2 w-full relative"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div> <span class="text-sm font-semibold">Pendentes</span></div> <span class="text-sm font-medium">${escape_html(stats().pendingPayments)}</span></div> <div class="h-3 w-full bg-secondary rounded-full overflow-hidden border"><div class="h-full bg-yellow-500 transition-all duration-1000 ease-out"${attr_style(`width: ${stringify(stats().totalPayments === 0 ? 0 : stats().pendingPayments / stats().totalPayments * 100)}%`)}></div></div> <div class="flex items-center justify-between text-xs text-muted-foreground"><span>${escape_html(stats().totalPayments === 0 ? 0 : Math.round(stats().pendingPayments / stats().totalPayments * 100))}% do total</span> <span>Aguardando</span></div></div></div> <div class="flex items-center"><div class="flex flex-col gap-2 w-full relative"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div> <span class="text-sm font-semibold">Rejeitados</span></div> <span class="text-sm font-medium">${escape_html(stats().rejectedPayments)}</span></div> <div class="h-3 w-full bg-secondary rounded-full overflow-hidden border"><div class="h-full bg-red-500 transition-all duration-1000 ease-out"${attr_style(`width: ${stringify(stats().totalPayments === 0 ? 0 : stats().rejectedPayments / stats().totalPayments * 100)}%`)}></div></div> <div class="flex items-center justify-between text-xs text-muted-foreground"><span>${escape_html(stats().totalPayments === 0 ? 0 : Math.round(stats().rejectedPayments / stats().totalPayments * 100))}% do total</span> <span>Falhas</span></div></div></div></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-1">`);
    Card($$renderer2, {
      class: "shadow-sm",
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between border-b pb-4",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="space-y-1">`);
            Card_title($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Pagamentos Recentes`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->As últimas transações processadas na plataforma.`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div> <a href="/admin/pagamentos">`);
            Badge($$renderer4, {
              variant: "secondary",
              class: "font-normal cursor-pointer hover:bg-muted py-1.5 px-3",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Ver todos `);
                Arrow_up_right($$renderer5, { class: "ml-1 w-3 h-3" });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></a>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          class: "p-0",
          children: ($$renderer4) => {
            Table($$renderer4, {
              children: ($$renderer5) => {
                Table_header($$renderer5, {
                  children: ($$renderer6) => {
                    Table_row($$renderer6, {
                      class: "bg-muted/50 hover:bg-muted/50",
                      children: ($$renderer7) => {
                        Table_head($$renderer7, {
                          class: "pl-6",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Empresa`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Operação`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Data`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Montante`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_head($$renderer7, {
                          class: "text-right pr-6",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Status`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Table_body($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!--[-->`);
                    const each_array_2 = ensure_array_like(recentPayments());
                    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                      let payment = each_array_2[$$index_2];
                      Table_row($$renderer6, {
                        children: ($$renderer7) => {
                          Table_cell($$renderer7, {
                            class: "pl-6 py-4",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<div class="flex items-center gap-3">`);
                              Avatar($$renderer8, {
                                class: "h-9 w-9 border",
                                children: ($$renderer9) => {
                                  if (payment.subscription.empresa?.logo) {
                                    $$renderer9.push("<!--[-->");
                                    Avatar_image($$renderer9, { src: payment.subscription.empresa?.logo, alt: "Logo" });
                                  } else {
                                    $$renderer9.push("<!--[!-->");
                                  }
                                  $$renderer9.push(`<!--]--> `);
                                  Avatar_fallback($$renderer9, {
                                    class: "bg-primary/10 text-primary uppercase font-semibold",
                                    children: ($$renderer10) => {
                                      $$renderer10.push(`<!---->${escape_html(payment.subscription.empresa?.nome?.substring(0, 2) || "EM")}`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer9.push(`<!---->`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!----> <div class="flex flex-col"><span class="font-medium">${escape_html(payment.subscription.empresa?.nome || "Empresa desconhecida")}</span> <span class="text-xs text-muted-foreground">${escape_html(payment.subscription.empresa?.email || "Sem email")}</span></div></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<div class="flex flex-col"><span class="font-medium">Assinatura ${escape_html(payment.subscription.planType === "MONTHLY" ? "Mensal" : "Anual")}</span> <span class="text-xs text-muted-foreground line-clamp-1 truncate max-w-[150px] font-mono"${attr("title", payment.id)}>${escape_html(payment.id)}</span></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "text-muted-foreground font-medium",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(new Date(payment.createdAt).toLocaleDateString("pt", { day: "2-digit", month: "short", year: "numeric" }))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "font-bold text-foreground",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(formatCurrency(payment.amount))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_cell($$renderer7, {
                            class: "text-right pr-6",
                            children: ($$renderer8) => {
                              Badge($$renderer8, {
                                variant: getStatusBadgeVariant(payment.status),
                                class: "capitalize font-medium shadow-sm",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<!---->${escape_html(formatStatus(payment.status))}`);
                                },
                                $$slots: { default: true }
                              });
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-r8IFpBRr.js.map
