import { av as head, ax as store_get, aw as attr, aE as store_mutate, ay as unsubscribe_stores } from './index-DPRpZFUH.js';
import { i as invalidateAll } from './client2-CcJ2Tk7F.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { s as superForm } from './superForm-Bw4SE-EW.js';
import './zod-vsheQqNr.js';
import './utils-FiC4zhrQ.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_footer } from './index8-VEsRSQHH.js';
import { R as Root$1, S as Sheet_content } from './index7-DOCP8m-y.js';
import { T as TanStackTable, r as renderComponent } from './TanStackTable-DGVpG3eI.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import { S as Sheet_header, a as Sheet_footer, b as Sheet_title, c as Sheet_description } from './sheet-description-DMkL59aO.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './stores-BBk2HDxH.js';
import './index-server-CziyT60N.js';
import './app-L81mENw7.js';
import './parse-DXcVuhZ4.js';
import './index-BWA_9C9m.js';
import './types-C7xnNV5k.js';
import './utils3-DjmiJAAD.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './index-r8oPdwp5.js';
import './attrs-mduo83PF.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './context-BAmjzoO_.js';
import './noop-CfhljDhh.js';
import './scroll-lock-DpPha3vp.js';
import './x-DpLJ1R1s.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './eye-BbooT3RA.js';
import './refresh-cw-Cx_TEc4q.js';
import './search-BCOKC9CO.js';
import './chevrons-right-BqjeZ3X9.js';
import './chevron-left-DOf1aQ1b.js';
import './chevron-right-BAItaPVX.js';
import './dialog-description2-CD_E6-6J.js';

function Action_button($$renderer, $$props) {
  let { id, onDelete, onEdit } = $$props;
  $$renderer.push(`<div class="flex gap-2"><button class="rounded-lg bg-blue-600 px-3 py-1 text-white transition-colors hover:bg-blue-700">Editar</button> <button class="rounded-lg bg-red-600 px-3 py-1 text-white transition-colors hover:bg-red-700">Excluir</button></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let showDeleteDialog = false;
    let entitiToDelete = null;
    let showSheet = false;
    let editingEntiti = null;
    const { form, message } = superForm(data.form, {
      onUpdated: ({ form: form2 }) => {
        if (form2.valid) {
          showSheet = false;
          toast.success(store_get($$store_subs ??= {}, "$message", message));
          invalidateAll();
        }
      },
      resetForm: false
    });
    function handleEdit(entiti) {
      editingEntiti = entiti;
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).nome = entiti.nome);
      showSheet = true;
    }
    const columns = [
      {
        accessorFn: (row) => row.nome,
        id: "nome",
        header: "Nome",
        cell: (info) => info.getValue()
      },
      {
        accessorFn: (row) => row._count.produtos,
        id: "produtos",
        header: "Produtos",
        cell: (info) => info.getValue()
      },
      {
        id: "actions",
        header: "Ações",
        cell: (info) => renderComponent(Action_button, {
          id: info.row.original.id,
          onDelete: () => {
            entitiToDelete = info.row.original;
            showDeleteDialog = true;
          },
          onEdit: () => handleEdit(info.row.original)
        })
      }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("hrm2qr", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Categorias</title>`);
        });
      });
      $$renderer3.push(`<div class="flex items-center justify-between"><h1 class="text-2xl font-bold text-gray-800 dark:text-white">Categorias</h1> <button class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Nova Categoria</button></div> `);
      Separator($$renderer3, {});
      $$renderer3.push(`<!----> `);
      TanStackTable($$renderer3, { itens: data.categorias, columns });
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
                              $$renderer7.push(`<!---->Excluir categoria`);
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
                              $$renderer7.push(`<!---->Tem certeza que deseja excluir o categoria "${escape_html(entitiToDelete?.nome)}"? Esta ação não pode ser
				desfeita.`);
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
      $$renderer3.push(` `);
      if (Root$1) {
        $$renderer3.push("<!--[-->");
        Root$1($$renderer3, {
          get open() {
            return showSheet;
          },
          set open($$value) {
            showSheet = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            if (Sheet_content) {
              $$renderer4.push("<!--[-->");
              Sheet_content($$renderer4, {
                side: "right",
                class: "h-full w-1/2",
                children: ($$renderer5) => {
                  if (Sheet_header) {
                    $$renderer5.push("<!--[-->");
                    Sheet_header($$renderer5, {
                      children: ($$renderer6) => {
                        if (Sheet_title) {
                          $$renderer6.push("<!--[-->");
                          Sheet_title($$renderer6, {
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->${escape_html(editingEntiti ? "Editar" : "Novo")} categoria`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer6.push("<!--]-->");
                        } else {
                          $$renderer6.push("<!--[!-->");
                          $$renderer6.push("<!--]-->");
                        }
                        $$renderer6.push(` `);
                        if (Sheet_description) {
                          $$renderer6.push("<!--[-->");
                          Sheet_description($$renderer6, {
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->${escape_html(editingEntiti ? `Editando categoria ${editingEntiti.nome}` : "Preencha os dados do novo categoria")}`);
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
                  $$renderer5.push(` <form method="POST"${attr("action", editingEntiti ? `?/edit&id=${editingEntiti.id}` : "?/create")} class="space-y-4"><div class="grid gap-4"><div class="grid grid-cols-4 items-center gap-4">`);
                  Label($$renderer5, {
                    for: "nome",
                    class: "text-right",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Nome`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "nome",
                    name: "nome",
                    class: "col-span-3",
                    get value() {
                      return store_get($$store_subs ??= {}, "$form", form).nome;
                    },
                    set value($$value) {
                      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).nome = $$value);
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div></div> `);
                  if (Sheet_footer) {
                    $$renderer5.push("<!--[-->");
                    Sheet_footer($$renderer5, {
                      children: ($$renderer6) => {
                        Button($$renderer6, {
                          type: "button",
                          onclick: () => showSheet = false,
                          children: ($$renderer7) => {
                            $$renderer7.push(`<!---->Cancelar`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!----> `);
                        Button($$renderer6, {
                          type: "submit",
                          children: ($$renderer7) => {
                            $$renderer7.push(`<!---->Salvar`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push("<!--]-->");
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push("<!--]-->");
                  }
                  $$renderer5.push(`</form>`);
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
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dxt05gTW.js.map
