import { ax as store_get, ay as unsubscribe_stores, av as head, aB as stringify, aE as store_mutate, aw as attr, _ as derived } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { s as superForm } from './superForm-Bw4SE-EW.js';
import './zod-vsheQqNr.js';
import './utils-FiC4zhrQ.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { C as Checkbox } from './checkbox-5hPZTOsI.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import './utils3-DjmiJAAD.js';
import { R as Root, S as Select_trigger, a as Select_content, b as Select_item } from './index9-BnG82wbB.js';
import { t as taxExemptions } from './taxaExceptins-GD_SevWk.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { S as Save } from './save-mOlOBJLe.js';
import { P as Package } from './package-BKsm9DRA.js';
import { S as Sparkles } from './sparkles-CciqIUXu.js';
import { T as Tag } from './tag-Z83dV6tm.js';
import { L as List, S as Shield_check } from './shield-check-DGZWuC59.js';
import './index2-Cz2gv4fD.js';
import './stores-BBk2HDxH.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './state.svelte-BwryGJJV.js';
import './index-server-CziyT60N.js';
import './app-L81mENw7.js';
import './parse-DXcVuhZ4.js';
import './index-BWA_9C9m.js';
import './types-C7xnNV5k.js';
import './use-id-BeJs9ypc.js';
import './index-r8oPdwp5.js';
import './attrs-mduo83PF.js';
import './check-cM-2r8Wr.js';
import './minus-D8RMQh55.js';
import './context-BAmjzoO_.js';
import './noop-CfhljDhh.js';
import './hidden-input-sNTj1t7e.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './select-item-hENHecOH.js';
import './chevrons-up-down-CTdYsjBi.js';
import './plus-C65zNy9m.js';
import './public-B844qK3e.js';
import './chevron-down-DGXS3bh7.js';
import './portal-ByHxxBCn.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    const { form, errors, message, delayed } = superForm(data.form, {
      onUpdated: ({ form: form2 }) => {
        if (form2.valid) {
          toast.success(store_get($$store_subs ??= {}, "$message", message) || "Produto atualizado com sucesso!");
          goto(`/cadastros/produtos/${data.produto.id}`);
        }
      }
    });
    const categoriasItems = derived(() => data.categorias.map((c) => ({ value: c.id, label: c.nome })));
    const fornecedoresItems = derived(() => data.fornecedores.map((f) => ({ value: f.id, label: f.nome })));
    const taxasItems = derived(() => data.taxas.map((t) => ({ value: t.id, label: `${t.descricao} (${t.valor}%)` })));
    const motivosIsencaoItems = taxExemptions.data.TaxExemptions.map((e) => ({
      value: e.TaxExemption.TaxExemptionCode,
      label: `${e.TaxExemption.TaxExemptionCode} - ${e.TaxExemption.TaxExemptionReason}`
    }));
    let isIsento = store_get($$store_subs ??= {}, "$form", form).isento === "on";
    function generateSKU() {
      const prefix = store_get($$store_subs ??= {}, "$form", form).tipo === "S" ? "SRV" : "PRD";
      const date = (/* @__PURE__ */ new Date()).toISOString().slice(2, 10).replace(/-/g, "");
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).codigo = `${prefix}-${date}-${random}`);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("pzv3tc", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Editar ${escape_html(data.produto.descricao)} | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="flex flex-col gap-6 p-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "outline",
        size: "icon",
        href: `/cadastros/produtos/${stringify(data.produto.id)}`,
        class: "rounded-full",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">Editar Produto</h1> <p class="text-muted-foreground">Atualize as informações do item ou serviço</p></div></div> <div class="flex items-center gap-3">`);
      Button($$renderer3, {
        variant: "outline",
        href: `/cadastros/produtos/${stringify(data.produto.id)}`,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancelar`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "submit",
        form: "edit-product-form",
        disabled: store_get($$store_subs ??= {}, "$delayed", delayed),
        class: "gap-2",
        children: ($$renderer4) => {
          if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            Save($$renderer4, { class: "h-4 w-4" });
          }
          $$renderer4.push(`<!--]--> Salvar Alterações`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> `);
      Separator($$renderer3, {});
      $$renderer3.push(`<!----> <form id="edit-product-form" method="POST" action="?/update" class="grid gap-6 lg:grid-cols-3"><div class="space-y-6 lg:col-span-2">`);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              Package($$renderer5, { class: "h-5 w-5 text-blue-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Informações Básicas`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Detalhes essenciais do produto`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "codigo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Código / SKU`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex gap-2">`);
              Input($$renderer5, {
                id: "codigo",
                name: "codigo",
                placeholder: "Ex: PROD-001",
                error: store_get($$store_subs ??= {}, "$errors", errors).codigo,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).codigo;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).codigo = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                type: "button",
                variant: "secondary",
                size: "icon",
                onclick: generateSKU,
                title: "Gerar SKU aleatório",
                class: "shrink-0",
                children: ($$renderer6) => {
                  Sparkles($$renderer6, { class: "h-4 w-4" });
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "tipo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Tipo de Item`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              if (Root) {
                $$renderer5.push("<!--[-->");
                Root($$renderer5, {
                  name: "tipo",
                  type: "single",
                  required: true,
                  get value() {
                    return store_get($$store_subs ??= {}, "$form", form).tipo;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).tipo = $$value);
                    $$settled = false;
                  },
                  children: ($$renderer6) => {
                    if (Select_trigger) {
                      $$renderer6.push("<!--[-->");
                      Select_trigger($$renderer6, {
                        id: "tipo",
                        class: "w-full",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$form", form).tipo === "P" ? "Produto" : store_get($$store_subs ??= {}, "$form", form).tipo === "S" ? "Serviço" : "Selecione o tipo")}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push("<!--]-->");
                    } else {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push("<!--]-->");
                    }
                    $$renderer6.push(` `);
                    if (Select_content) {
                      $$renderer6.push("<!--[-->");
                      Select_content($$renderer6, {
                        children: ($$renderer7) => {
                          if (Select_item) {
                            $$renderer7.push("<!--[-->");
                            Select_item($$renderer7, {
                              value: "P",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Produto`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push("<!--]-->");
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push("<!--]-->");
                          }
                          $$renderer7.push(` `);
                          if (Select_item) {
                            $$renderer7.push("<!--[-->");
                            Select_item($$renderer7, {
                              value: "S",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Serviço`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push("<!--]-->");
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push("<!--]-->");
                          }
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
              $$renderer5.push(`</div></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "descricao",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Descrição`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "descricao",
                name: "descricao",
                placeholder: "Nome do produto ou serviço",
                error: store_get($$store_subs ??= {}, "$errors", errors).descricao,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).descricao;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).descricao = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              Tag($$renderer5, { class: "h-5 w-5 text-green-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Precificação e Estoque`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Valores monetários e controle de inventário`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-6 md:grid-cols-3",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                for: "precoUnitario",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Preço Unitário (AOA)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "precoUnitario",
                name: "precoUnitario",
                type: "number",
                step: "0.01",
                placeholder: "0,00",
                error: store_get($$store_subs ??= {}, "$errors", errors).precoUnitario,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).precoUnitario;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).precoUnitario = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "quantidade",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Qtd. em Estoque`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "quantidade",
                name: "quantidade",
                type: "number",
                placeholder: "0",
                error: store_get($$store_subs ??= {}, "$errors", errors).quantidade,
                disabled: true,
                class: "bg-muted",
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).quantidade;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).quantidade = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <p class="text-[0.8rem] text-muted-foreground">Editável via <a href="/estoque/entrada" class="underline hover:text-primary">Estoques</a></p></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "desconto",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Desconto Padrão (%)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "desconto",
                name: "desconto",
                type: "number",
                step: "0.01",
                placeholder: "0,00",
                error: store_get($$store_subs ??= {}, "$errors", errors).desconto,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).desconto;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).desconto = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              List($$renderer5, { class: "h-5 w-5 text-purple-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Classificação e Origem`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Organização e fornecedores`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-6 md:grid-cols-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                for: "categoria",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Categoria`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Combobox_1($$renderer5, {
                items: categoriasItems(),
                placeholder: "Selecione a categoria",
                className: "w-full",
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).categoriaId;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).categoriaId = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <input type="hidden" name="categoriaId"${attr("value", store_get($$store_subs ??= {}, "$form", form).categoriaId)}/> `);
              if (store_get($$store_subs ??= {}, "$errors", errors).categoriaId) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<p class="text-xs text-destructive">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).categoriaId)}</p>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "fornecedor",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Fornecedor`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Combobox_1($$renderer5, {
                items: fornecedoresItems(),
                placeholder: "Selecione o fornecedor",
                className: "w-full",
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).fornecedorId;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).fornecedorId = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <input type="hidden" name="fornecedorId"${attr("value", store_get($$store_subs ??= {}, "$form", form).fornecedorId)}/> `);
              if (store_get($$store_subs ??= {}, "$errors", errors).fornecedorId) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<p class="text-xs text-destructive">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).fornecedorId)}</p>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-6">`);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              Shield_check($$renderer5, { class: "h-5 w-5 text-orange-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Tributação`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Regras fiscais e taxas`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center space-x-2 rounded-lg border border-orange-100 bg-orange-50/50 p-3 dark:border-orange-900/20 dark:bg-orange-900/10">`);
              Checkbox($$renderer5, {
                id: "isento",
                name: "isento",
                get checked() {
                  return isIsento;
                },
                set checked($$value) {
                  isIsento = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <div class="grid gap-1.5 leading-none">`);
              Label($$renderer5, {
                for: "isento",
                class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Item Isento de Taxa`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <p class="text-xs text-muted-foreground">Marque se o item não paga IVA ou taxa.</p></div></div> `);
              if (isIsento) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  for: "motivoIsento",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Motivo de Isenção`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Combobox_1($$renderer5, {
                  items: motivosIsencaoItems,
                  placeholder: "Selecione o motivo",
                  className: "w-full",
                  get value() {
                    return store_get($$store_subs ??= {}, "$form", form).motivoIsento;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).motivoIsento = $$value);
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <input type="hidden" name="motivoIsento"${attr("value", store_get($$store_subs ??= {}, "$form", form).motivoIsento)}/> `);
                if (store_get($$store_subs ??= {}, "$errors", errors).motivoIsento) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<p class="text-xs text-destructive">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).motivoIsento)}</p>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  for: "taxa",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Taxa de Imposto`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Combobox_1($$renderer5, {
                  items: taxasItems(),
                  placeholder: "Selecione a taxa",
                  className: "w-full",
                  get value() {
                    return store_get($$store_subs ??= {}, "$form", form).taxaId;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).taxaId = $$value);
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <input type="hidden" name="taxaId"${attr("value", store_get($$store_subs ??= {}, "$form", form).taxaId)}/> `);
                if (store_get($$store_subs ??= {}, "$errors", errors).taxaId) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<p class="text-xs text-destructive">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).taxaId)}</p>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div>`);
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "border-none bg-blue-50/50 shadow-sm ring-1 ring-blue-100/50 dark:bg-blue-900/10 dark:ring-blue-900/20",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "text-sm",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Dicas de Edição`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "text-xs text-muted-foreground",
            children: ($$renderer5) => {
              $$renderer5.push(`<ul class="list-disc space-y-2 pl-4"><li>O código (SKU) deve ser único para cada produto.</li> <li>Produtos isentos exigem a seleção obrigatória de um motivo legal de isenção conforme
							normas da AGT.</li> <li>O preço unitário é o valor base antes de qualquer imposto ou desconto.</li></ul>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></form></div>`);
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
//# sourceMappingURL=_page.svelte-BRzUkCJG.js.map
