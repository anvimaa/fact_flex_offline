import { av as head, aw as attr, aB as stringify } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { B as Button } from './button-DjcfiVkK.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { T as TanStackTable, r as renderComponent } from './TanStackTable-DGVpG3eI.js';
import { R as Root$1, T as Trigger, D as Dropdown_menu_content, G as Group, a as Dropdown_menu_item } from './index6-Co-qiBWu.js';
import { D as Dropdown_menu_separator } from './dropdown-menu-separator-BmVC_xsa.js';
import { P as Pencil } from './pencil-B1KNOvi6.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_footer } from './index8-VEsRSQHH.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './utils3-DjmiJAAD.js';
import './public-B844qK3e.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './eye-BbooT3RA.js';
import './refresh-cw-Cx_TEc4q.js';
import './search-BCOKC9CO.js';
import './chevrons-right-BqjeZ3X9.js';
import './chevron-left-DOf1aQ1b.js';
import './chevron-right-BAItaPVX.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './use-roving-focus.svelte-j4gb8sNV.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './x-DpLJ1R1s.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './dialog-description2-CD_E6-6J.js';

function Action_button($$renderer, $$props) {
  let { id, onDelete, onEdit } = $$props;
  if (Root$1) {
    $$renderer.push("<!--[-->");
    Root$1($$renderer, {
      children: ($$renderer2) => {
        if (Trigger) {
          $$renderer2.push("<!--[-->");
          Trigger($$renderer2, {
            children: ($$renderer3) => {
              $$renderer3.push(`<button class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"><div class="grid flex-1 text-left text-sm leading-tight">...</div></button>`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
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
                    $$renderer4.push(`<a${attr("href", `/cadastros/produtos/${stringify(id)}`)} class="hover:cursor-pointer">`);
                    if (Dropdown_menu_item) {
                      $$renderer4.push("<!--[-->");
                      Dropdown_menu_item($$renderer4, {
                        children: ($$renderer5) => {
                          Pencil($$renderer5, { class: "mr-2 h-4 w-4" });
                          $$renderer5.push(`<!----> Editar / Detalhes`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer4.push("<!--]-->");
                    } else {
                      $$renderer4.push("<!--[!-->");
                      $$renderer4.push("<!--]-->");
                    }
                    $$renderer4.push(`</a> `);
                    if (Dropdown_menu_item) {
                      $$renderer4.push("<!--[-->");
                      Dropdown_menu_item($$renderer4, {
                        class: "text-red-600 hover:text-red-700",
                        onclick: onDelete,
                        children: ($$renderer5) => {
                          Trash_2($$renderer5, { class: "mr-2 h-4 w-4" });
                          $$renderer5.push(`<!----> Excluir`);
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
    let showDeleteDialog = false;
    let productToDelete = null;
    const columns = [
      { accessorKey: "codigo", header: "Código" },
      { accessorKey: "descricao", header: "Descrição" },
      { accessorKey: "categoria.nome", header: "Categoria" },
      {
        accessorKey: "tipo",
        header: "Tipo",
        cell: (info) => info.getValue() === "P" ? "Produto" : "Serviço"
      },
      { accessorKey: "precoUnitario", header: "Preço Unitário" },
      {
        accessorKey: "taxa.valor",
        header: "Taxa (%)",
        cell: (info) => info.row.original.isento === "on" ? `Isento ${info.row.original.motivoIsento}` : info.getValue()
      },
      { accessorKey: "fornecedor.nome", header: "Fornecedor" },
      {
        id: "actions",
        header: "Ações",
        cell: (info) => renderComponent(Action_button, {
          id: info.row.original.id,
          onDelete: () => {
            productToDelete = info.row.original;
            showDeleteDialog = true;
          },
          onEdit: () => {
          }
          // Not used anymore as it links directly
        })
      }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1ya3k3x", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Produtos</title>`);
        });
      });
      $$renderer3.push(`<div class="flex items-center justify-between"><h1 class="text-2xl font-bold text-gray-800 dark:text-white">Produtos</h1> `);
      Button($$renderer3, {
        href: "/cadastros/produtos/novo",
        class: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Novo Produto`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> `);
      Separator($$renderer3, {});
      $$renderer3.push(`<!----> `);
      TanStackTable($$renderer3, { itens: data.produtos, columns });
      $$renderer3.push(`<!----> `);
      if (Root) {
        $$renderer3.push("<!--[-->");
        Root($$renderer3, {
          get open() {
            return showDeleteDialog;
          },
          set open($$value) {
            showDeleteDialog = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            if (Dialog_content) {
              $$renderer4.push("<!--[-->");
              Dialog_content($$renderer4, {
                class: "sm:max-w-[425px]",
                children: ($$renderer5) => {
                  if (Dialog_header) {
                    $$renderer5.push("<!--[-->");
                    Dialog_header($$renderer5, {
                      children: ($$renderer6) => {
                        if (Dialog_title) {
                          $$renderer6.push("<!--[-->");
                          Dialog_title($$renderer6, {
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->Excluir Produto`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer6.push("<!--]-->");
                        } else {
                          $$renderer6.push("<!--[!-->");
                          $$renderer6.push("<!--]-->");
                        }
                        $$renderer6.push(` `);
                        if (Dialog_description) {
                          $$renderer6.push("<!--[-->");
                          Dialog_description($$renderer6, {
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->Tem certeza que deseja excluir o produto "${escape_html(productToDelete?.descricao)}"? Esta ação não pode
				ser desfeita.`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer6.push("<!--]-->");
                        } else {
                          $$renderer6.push("<!--[!-->");
                          $$renderer6.push("<!--]-->");
                        }
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push("<!--]-->");
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push("<!--]-->");
                  }
                  $$renderer5.push(` `);
                  if (Dialog_footer) {
                    $$renderer5.push("<!--[-->");
                    Dialog_footer($$renderer5, {
                      children: ($$renderer6) => {
                        $$renderer6.push(`<button class="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300">Cancelar</button> <button class="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">Excluir</button>`);
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
//# sourceMappingURL=_page.svelte-DsZaW_j0.js.map
