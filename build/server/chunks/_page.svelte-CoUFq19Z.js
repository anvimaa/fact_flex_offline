import { av as head, an as ensure_array_like, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { f as formatCurrency, I as Icon, k as Circle_check_big } from './utils3-DjmiJAAD.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { P as Package } from './package-BKsm9DRA.js';
import { D as Dollar_sign } from './dollar-sign-oLGOq175.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';

function Triangle_alert($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
      }
    ],
    ["path", { "d": "M12 9v4" }],
    ["path", { "d": "M12 17h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "triangle-alert" },
    $$sanitized_props,
    {
      /**
       * @component @name TriangleAlert
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMjEuNzMgMTgtOC0xNGEyIDIgMCAwIDAtMy40OCAwbC04IDE0QTIgMiAwIDAgMCA0IDIxaDE2YTIgMiAwIDAgMCAxLjczLTMiIC8+CiAgPHBhdGggZD0iTTEyIDl2NCIgLz4KICA8cGF0aCBkPSJNMTIgMTdoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/triangle-alert
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
    function getStatusBadge(quantidade) {
      if (quantidade === 0) {
        return {
          variant: "destructive",
          label: "Sem Estoque",
          icon: Triangle_alert
        };
      } else if (quantidade <= 50) {
        return {
          variant: "secondary",
          label: "Estoque Baixo",
          icon: Triangle_alert
        };
      }
      return { variant: "default", label: "OK", icon: Circle_check_big };
    }
    head("1ti0028", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Gestão de Estoque</title>`);
      });
    });
    $$renderer2.push(`<div class="w-full p-4"><div class="mb-6 flex items-center justify-between"><div><h1 class="text-2xl font-bold">Gestão de Estoque</h1> <p class="text-sm text-muted-foreground">Visualize e gerencie o estoque de produtos</p></div> `);
    Button($$renderer2, {
      onclick: () => goto(),
      children: ($$renderer3) => {
        Plus($$renderer3, { class: "mr-2 h-4 w-4" });
        $$renderer3.push(`<!----> Entrada de Estoque`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "flex flex-row items-center justify-between space-y-0 pb-2",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-sm font-medium",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Total de Produtos`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Package($$renderer4, { class: "h-4 w-4 text-muted-foreground" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(data.estatisticas.totalProdutos)}</div>`);
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
                $$renderer5.push(`<!---->Sem Estoque`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Triangle_alert($$renderer4, { class: "h-4 w-4 text-red-500" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold text-red-500">${escape_html(data.estatisticas.produtosSemEstoque)}</div>`);
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
                $$renderer5.push(`<!---->Estoque Baixo`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Triangle_alert($$renderer4, { class: "h-4 w-4 text-orange-500" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-2xl font-bold text-orange-500">${escape_html(data.estatisticas.produtosEstoqueBaixo)}</div>`);
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
                $$renderer5.push(`<!---->Valor Total`);
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
            $$renderer4.push(`<div class="text-2xl font-bold">${escape_html(formatCurrency(data.estatisticas.valorTotalEstoque))}</div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Produtos em Estoque`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="overflow-x-auto"><table class="w-full"><thead class="border-b"><tr><th class="pb-3 text-left text-sm font-medium text-muted-foreground">Código</th><th class="pb-3 text-left text-sm font-medium text-muted-foreground">Produto</th><th class="pb-3 text-left text-sm font-medium text-muted-foreground">Categoria</th><th class="pb-3 text-right text-sm font-medium text-muted-foreground">Quantidade</th><th class="pb-3 text-right text-sm font-medium text-muted-foreground">Preço Unit.</th><th class="pb-3 text-center text-sm font-medium text-muted-foreground">Status</th></tr></thead><tbody class="divide-y"><!--[-->`);
            const each_array = ensure_array_like(data.produtos);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let produto = each_array[$$index];
              const status = getStatusBadge(produto.quantidade);
              $$renderer4.push(`<tr class="hover:bg-muted/50"><td class="py-3 text-sm">${escape_html(produto.codigo)}</td><td class="py-3"><div><p class="font-medium">${escape_html(produto.descricao)}</p> `);
              if (produto.fornecedor) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<p class="text-xs text-muted-foreground">${escape_html(produto.fornecedor.nome)}</p>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div></td><td class="py-3 text-sm">${escape_html(produto.categoria?.nome || "-")}</td><td class="py-3 text-right font-semibold">${escape_html(produto.quantidade)}</td><td class="py-3 text-right">${escape_html(formatCurrency(produto.precoUnitario))}</td><td class="py-3 text-center">`);
              Badge($$renderer4, {
                variant: status.variant,
                children: ($$renderer5) => {
                  if (status.icon) {
                    $$renderer5.push("<!--[-->");
                    status.icon($$renderer5, { class: "mr-1 h-3 w-3" });
                    $$renderer5.push("<!--]-->");
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push("<!--]-->");
                  }
                  $$renderer5.push(` ${escape_html(status.label)}`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></td></tr>`);
            }
            $$renderer4.push(`<!--]--></tbody></table> `);
            if (data.produtos.length === 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="py-12 text-center text-muted-foreground">`);
              Package($$renderer4, { class: "mx-auto mb-4 h-12 w-12" });
              $$renderer4.push(`<!----> <p>Nenhum produto encontrado</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CoUFq19Z.js.map
