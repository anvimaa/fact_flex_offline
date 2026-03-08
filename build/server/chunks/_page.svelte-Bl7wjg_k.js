import { av as head, ax as store_get, aw as attr, aE as store_mutate, ay as unsubscribe_stores, aq as bind_props, _ as derived, an as ensure_array_like } from './index-DPRpZFUH.js';
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
import { R as Root$2, S as Select_trigger, a as Select_content, G as Group, b as Select_item } from './index9-BnG82wbB.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import { S as Sheet_header, b as Sheet_title, c as Sheet_description, a as Sheet_footer } from './sheet-description-DMkL59aO.js';
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
import './check-cM-2r8Wr.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './mounted-Bmfh9OVK.js';
import './chevron-down-DGXS3bh7.js';
import './dialog-description2-CD_E6-6J.js';

function Action_button($$renderer, $$props) {
  let { id, onDelete, onEdit } = $$props;
  $$renderer.push(`<div class="flex gap-2"><button class="rounded-lg bg-blue-600 px-3 py-1 text-white transition-colors hover:bg-blue-700">Editar</button> <button class="rounded-lg bg-red-600 px-3 py-1 text-white transition-colors hover:bg-red-700">Excluir</button></div>`);
}
function Select_input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = "", data, name, placeholder = "" } = $$props;
    const triggerContent = derived(() => data.find((f) => f.value === value)?.label ?? "Selecione um item");
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Label($$renderer3, {
        for: "position",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html(placeholder)}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      if (Root$2) {
        $$renderer3.push("<!--[-->");
        Root$2($$renderer3, {
          type: "single",
          name,
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            if (Select_trigger) {
              $$renderer4.push("<!--[-->");
              Select_trigger($$renderer4, {
                class: "w-full",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->${escape_html(triggerContent())}`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
            $$renderer4.push(` `);
            if (Select_content) {
              $$renderer4.push("<!--[-->");
              Select_content($$renderer4, {
                children: ($$renderer5) => {
                  if (Group) {
                    $$renderer5.push("<!--[-->");
                    Group($$renderer5, {
                      children: ($$renderer6) => {
                        Label($$renderer6, {
                          children: ($$renderer7) => {
                            $$renderer7.push(`<!---->${escape_html(placeholder)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!----> <!--[-->`);
                        const each_array = ensure_array_like(data);
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          let fruit = each_array[$$index];
                          if (Select_item) {
                            $$renderer6.push("<!--[-->");
                            Select_item($$renderer6, {
                              value: fruit.value,
                              label: fruit.label,
                              children: ($$renderer7) => {
                                $$renderer7.push(`<!---->${escape_html(fruit.label)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer6.push("<!--]-->");
                          } else {
                            $$renderer6.push("<!--[!-->");
                            $$renderer6.push("<!--]-->");
                          }
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
    bind_props($$props, { value });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let showDeleteDialog = false;
    let taxToDelete = null;
    let showSheet = false;
    let editingTax = null;
    const { form, errors, message } = superForm(data.form, {
      onUpdated: ({ form: form2 }) => {
        if (form2.valid) {
          showSheet = false;
          toast.success(store_get($$store_subs ??= {}, "$message", message));
          invalidateAll();
        }
      },
      resetForm: false
    });
    function handleEdit(taxa) {
      editingTax = taxa;
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).tipo = taxa.tipo);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).regiao = taxa.regiao);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).descricao = taxa.descricao);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).valor = taxa.valor.toNumber());
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).observacao = taxa.observacao);
      showSheet = true;
    }
    const columns = [
      { accessorKey: "descricao", header: "Descrição" },
      { accessorKey: "tipo", header: "Tipo" },
      { accessorKey: "codigo", header: "Codigo" },
      { accessorKey: "regiao", header: "Região" },
      { accessorKey: "valor", header: "Valor" },
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
            taxToDelete = info.row.original;
            showDeleteDialog = true;
          },
          onEdit: () => handleEdit(info.row.original)
        })
      }
    ];
    const tiposTaxa = [
      { value: "IVA", label: "Imposto Sobre Valor Acrescentado" },
      { value: "IS", label: "Imposto de Selo" },
      { value: "NS", label: "Não Sujeito ao IVA ou IS" }
    ];
    const codigosTaxa = [
      { value: "NOR", label: "Taxa normal" },
      { value: "ISE", label: "Isenta" },
      { value: "OUT", label: "Outros" },
      { value: "NS", label: "NS" },
      { value: "NA", label: "NA" }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1mq1twc", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Taxas</title>`);
        });
      });
      $$renderer3.push(`<div class="flex items-center justify-between"><h1 class="text-2xl font-bold text-gray-800 dark:text-white">Taxas</h1> <button class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Nova Taxa</button></div> `);
      Separator($$renderer3, {});
      $$renderer3.push(`<!----> `);
      TanStackTable($$renderer3, { itens: data.taxas, columns });
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
                              $$renderer7.push(`<!---->Excluir Taxa`);
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
                              $$renderer7.push(`<!---->Tem certeza que deseja excluir a taxa "${escape_html(taxToDelete?.descricao)}"? Esta ação não pode ser
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
                              $$renderer7.push(`<!---->${escape_html(editingTax ? "Editar" : "Nova")} Taxa`);
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
                              $$renderer7.push(`<!---->${escape_html(editingTax ? `Editando taxa ${editingTax.descricao}` : "Preencha os dados da nova taxa")}`);
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
                  $$renderer5.push(` <form method="POST"${attr("action", editingTax ? `?/edit&id=${editingTax.id}` : "?/create")} class="space-y-4"><div class="grid gap-4"><div class="grid grid-cols-4 items-center gap-4">`);
                  Label($$renderer5, {
                    for: "descricao",
                    class: "text-right",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Descrição`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "descricao",
                    name: "descricao",
                    class: "col-span-3",
                    error: store_get($$store_subs ??= {}, "$errors", errors).descricao?.join(", "),
                    get value() {
                      return store_get($$store_subs ??= {}, "$form", form).descricao;
                    },
                    set value($$value) {
                      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).descricao = $$value);
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> <div class="grid items-center gap-4">`);
                  Select_input($$renderer5, {
                    name: "tipo",
                    data: tiposTaxa,
                    placeholder: "Tipo",
                    get value() {
                      return store_get($$store_subs ??= {}, "$form", form).tipo;
                    },
                    set value($$value) {
                      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).tipo = $$value);
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> <div class="grid items-center gap-4">`);
                  Select_input($$renderer5, {
                    name: "codigo",
                    data: codigosTaxa,
                    placeholder: "Codigo",
                    get value() {
                      return store_get($$store_subs ??= {}, "$form", form).codigo;
                    },
                    set value($$value) {
                      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).codigo = $$value);
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> <div class="grid grid-cols-4 items-center gap-4">`);
                  Label($$renderer5, {
                    for: "regiao",
                    class: "text-right",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Regiao`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "regiao",
                    name: "regiao",
                    class: "col-span-3",
                    error: store_get($$store_subs ??= {}, "$errors", errors).regiao?.join(", "),
                    get value() {
                      return store_get($$store_subs ??= {}, "$form", form).regiao;
                    },
                    set value($$value) {
                      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).regiao = $$value);
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> <div class="grid grid-cols-4 items-center gap-4">`);
                  Label($$renderer5, {
                    for: "valor",
                    class: "text-right",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Valor (%)`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "valor",
                    name: "valor",
                    type: "number",
                    class: "col-span-3",
                    error: store_get($$store_subs ??= {}, "$errors", errors).valor?.join(", "),
                    get value() {
                      return store_get($$store_subs ??= {}, "$form", form).valor;
                    },
                    set value($$value) {
                      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).valor = $$value);
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> <div class="grid grid-cols-4 items-center gap-4">`);
                  Label($$renderer5, {
                    for: "observacao",
                    class: "text-right",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Observação`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "observacao",
                    name: "observacao",
                    class: "col-span-3",
                    error: store_get($$store_subs ??= {}, "$errors", errors).observacao?.join(", "),
                    get value() {
                      return store_get($$store_subs ??= {}, "$form", form).observacao;
                    },
                    set value($$value) {
                      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).observacao = $$value);
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
//# sourceMappingURL=_page.svelte-Bl7wjg_k.js.map
