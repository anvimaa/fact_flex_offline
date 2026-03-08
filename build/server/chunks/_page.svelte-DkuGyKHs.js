import { aw as attr, aB as stringify, al as attributes, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { R as Root, T as Trigger, D as Dropdown_menu_content, G as Group, a as Dropdown_menu_item } from './index6-Co-qiBWu.js';
import { D as Dropdown_menu_separator } from './dropdown-menu-separator-BmVC_xsa.js';
import { I as Icon } from './utils3-DjmiJAAD.js';
import { P as Pencil } from './pencil-B1KNOvi6.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { T as TanStackTable, r as renderComponent } from './TanStackTable-DGVpG3eI.js';
import './escaping-CqgfEcN3.js';
import './use-id-BeJs9ypc.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './events-GtUqDgmb.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './use-roving-focus.svelte-j4gb8sNV.js';
import './attrs-mduo83PF.js';
import './public-B844qK3e.js';
import './index2-Cz2gv4fD.js';
import './eye-BbooT3RA.js';
import './refresh-cw-Cx_TEc4q.js';
import './search-BCOKC9CO.js';
import './chevrons-right-BqjeZ3X9.js';
import './chevron-left-DOf1aQ1b.js';
import './chevron-right-BAItaPVX.js';

function Info($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M12 16v-4" }],
    ["path", { "d": "M12 8h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "info" },
    $$sanitized_props,
    {
      /**
       * @component @name Info
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgMTZ2LTQiIC8+CiAgPHBhdGggZD0iTTEyIDhoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/info
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
function Action_button($$renderer, $$props) {
  let { id } = $$props;
  if (Root) {
    $$renderer.push("<!--[-->");
    Root($$renderer, {
      children: ($$renderer2) => {
        {
          let child = function($$renderer3, { props }) {
            $$renderer3.push(`<button${attributes({
              class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
              ...props
            })}><div class="grid flex-1 text-left text-sm leading-tight">...</div></button>`);
          };
          if (Trigger) {
            $$renderer2.push("<!--[-->");
            Trigger($$renderer2, { child, $$slots: { child: true } });
            $$renderer2.push("<!--]-->");
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push("<!--]-->");
          }
        }
        $$renderer2.push(` `);
        if (Dropdown_menu_content) {
          $$renderer2.push("<!--[-->");
          Dropdown_menu_content($$renderer2, {
            class: "w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg",
            side: "left",
            align: "start",
            sideOffset: 4,
            children: ($$renderer3) => {
              if (Dropdown_menu_separator) {
                $$renderer3.push("<!--[-->");
                Dropdown_menu_separator($$renderer3, {});
                $$renderer3.push("<!--]-->");
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push("<!--]-->");
              }
              $$renderer3.push(` `);
              if (Group) {
                $$renderer3.push("<!--[-->");
                Group($$renderer3, {
                  children: ($$renderer4) => {
                    $$renderer4.push(`<a${attr("href", `/cadastros/clientes/${stringify(id)}`)} class="hover:cursor-pointer">`);
                    if (Dropdown_menu_item) {
                      $$renderer4.push("<!--[-->");
                      Dropdown_menu_item($$renderer4, {
                        class: "",
                        children: ($$renderer5) => {
                          Info($$renderer5, {});
                          $$renderer5.push(`<!----> Detalhes do Cliente`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer4.push("<!--]-->");
                    } else {
                      $$renderer4.push("<!--[!-->");
                      $$renderer4.push("<!--]-->");
                    }
                    $$renderer4.push(`</a> <a${attr("href", `/cadastros/clientes/editar/${stringify(id)}`)} class="hover:cursor-pointer">`);
                    if (Dropdown_menu_item) {
                      $$renderer4.push("<!--[-->");
                      Dropdown_menu_item($$renderer4, {
                        class: "",
                        children: ($$renderer5) => {
                          Pencil($$renderer5, {});
                          $$renderer5.push(`<!----> Editar Cliente`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer4.push("<!--]-->");
                    } else {
                      $$renderer4.push("<!--[!-->");
                      $$renderer4.push("<!--]-->");
                    }
                    $$renderer4.push(`</a> <a${attr("href", `/cadastros/clientes/delete/${stringify(id)}`)} class="hover:cursor-pointer">`);
                    if (Dropdown_menu_item) {
                      $$renderer4.push("<!--[-->");
                      Dropdown_menu_item($$renderer4, {
                        class: "",
                        children: ($$renderer5) => {
                          Trash_2($$renderer5, {});
                          $$renderer5.push(`<!----> Excluir Cliente`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer4.push("<!--]-->");
                    } else {
                      $$renderer4.push("<!--[!-->");
                      $$renderer4.push("<!--]-->");
                    }
                    $$renderer4.push(`</a>`);
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
      },
      $$slots: { default: true }
    });
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const columns = [
      {
        accessorFn: (row) => `${row.nome}`,
        id: "Nome",
        header: "Nome",
        cell: (info) => info.getValue()
      },
      {
        accessorFn: (row) => `${row.nif}`,
        id: "NIF",
        header: "NIF",
        cell: (info) => info.getValue()
      },
      {
        accessorFn: (row) => `${row.telefone || "S/N"}`,
        id: "Telefone",
        header: "Telefone",
        cell: (info) => info.getValue()
      },
      {
        id: "actions",
        header: "Ações",
        cell: (info) => renderComponent(Action_button, { id: info.row.original.id })
      }
    ];
    $$renderer2.push(`<div class="p-4 dark:bg-gray-900"><div class="mb-6 flex items-center justify-between"><h1 class="text-2xl font-bold text-gray-800 dark:text-white">Clientes</h1> <a href="/cadastros/clientes/novo" class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Novo Cliente</a></div></div> `);
    TanStackTable($$renderer2, { itens: data.clientes, columns });
    $$renderer2.push(`<!---->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DkuGyKHs.js.map
