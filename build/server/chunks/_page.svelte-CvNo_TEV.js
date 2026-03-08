import { av as head, ax as store_get, aE as store_mutate, ay as unsubscribe_stores } from './index-DPRpZFUH.js';
import { s as superForm } from './superForm-Bw4SE-EW.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './zod-vsheQqNr.js';
import './utils-FiC4zhrQ.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import './utils3-DjmiJAAD.js';
import { R as Root, S as Select_trigger, a as Select_content, b as Select_item } from './index9-BnG82wbB.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { S as Save } from './save-mOlOBJLe.js';
import { U as User } from './user-D18r-fvg.js';
import { S as Search } from './search-BCOKC9CO.js';
import { M as Map_pin, P as Phone } from './phone-DEnZw48I.js';
import './index2-Cz2gv4fD.js';
import './stores-BBk2HDxH.js';
import './index-server-CziyT60N.js';
import './client2-CcJ2Tk7F.js';
import './app-L81mENw7.js';
import './parse-DXcVuhZ4.js';
import './index-BWA_9C9m.js';
import './types-C7xnNV5k.js';
import './events-GtUqDgmb.js';
import './use-id-BeJs9ypc.js';
import './index-r8oPdwp5.js';
import './attrs-mduo83PF.js';
import './public-B844qK3e.js';
import './check-cM-2r8Wr.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './mounted-Bmfh9OVK.js';
import './noop-CfhljDhh.js';
import './scroll-lock-DpPha3vp.js';
import './context-BAmjzoO_.js';
import './chevron-down-DGXS3bh7.js';
import './portal-ByHxxBCn.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    const { form, errors, delayed } = superForm(data.form, {
      resetForm: false,
      onUpdated: ({ form: form2 }) => {
        if (form2.valid) {
          toast.success("Cliente atualizado com sucesso");
        }
      }
    });
    let searchingNif = false;
    async function consultarNIF() {
      if (!store_get($$store_subs ??= {}, "$form", form).nif) {
        toast.error("Informe o NIF para consultar");
        return;
      }
      searchingNif = true;
      try {
        const res = await fetch(`/api/agt/consultar-nif?nif=${store_get($$store_subs ??= {}, "$form", form).nif}`);
        const data2 = await res.json();
        if (res.ok && data2.ObterContribuinte?.contribuinte) {
          const info = data2.ObterContribuinte.contribuinte;
          store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).nome = info.nome);
          store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).tipo = info.tipoContribuinte === "SINGULAR" ? "SINGULAR" : "EMPRESA");
          toast.success("Dados do NIF carregados com sucesso");
        } else {
          toast.error(data2.error || data2.ObterContribuinte?.mensagem);
        }
      } catch (error) {
        console.error("Erro na consulta:", error);
        toast.error("Erro ao consultar NIF");
      } finally {
        searchingNif = false;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("ht07dq", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Editar Cliente | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="flex flex-col gap-6 p-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "outline",
        size: "icon",
        href: "/cadastros/clientes",
        class: "rounded-full",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">Editar Cliente</h1> <p class="text-muted-foreground">Atualize as informações do cliente no seu sistema</p></div></div> <div class="flex items-center gap-3">`);
      Button($$renderer3, {
        variant: "outline",
        href: "/cadastros/clientes",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancelar`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "submit",
        form: "edit-client-form",
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
      $$renderer3.push(`<!----> <form id="edit-client-form" method="POST" class="grid gap-6 lg:grid-cols-3"><div class="space-y-6 lg:col-span-2">`);
      Card($$renderer3, {
        class: "border-none shadow-sm ring-1 ring-gray-200/50 dark:ring-white/10",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-2">`);
              User($$renderer5, { class: "h-5 w-5 text-blue-500" });
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
                  $$renderer6.push(`<!---->Dados de identificação do cliente`);
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
                for: "nif",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->NIF *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex gap-2">`);
              Input($$renderer5, {
                id: "nif",
                name: "nif",
                placeholder: "Ex: 5417...",
                error: store_get($$store_subs ??= {}, "$errors", errors).nif,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).nif;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).nif = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                type: "button",
                variant: "secondary",
                size: "icon",
                onclick: consultarNIF,
                disabled: searchingNif,
                title: "Consultar NIF na AGT",
                class: "shrink-0",
                children: ($$renderer6) => {
                  if (searchingNif) {
                    $$renderer6.push("<!--[-->");
                    $$renderer6.push(`<div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>`);
                  } else {
                    $$renderer6.push("<!--[!-->");
                    Search($$renderer6, { class: "h-4 w-4" });
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "tipo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Tipo de Cliente`);
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
                          $$renderer7.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$form", form).tipo === "SINGULAR" ? "Singular" : store_get($$store_subs ??= {}, "$form", form).tipo === "EMPRESA" ? "Empresa" : "Selecione o tipo")}`);
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
                              value: "SINGULAR",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Singular`);
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
                              value: "EMPRESA",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->Empresa`);
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
                for: "nome",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Nome / Razão Social *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "nome",
                name: "nome",
                placeholder: "Nome completo do cliente",
                error: store_get($$store_subs ??= {}, "$errors", errors).nome,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).nome;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).nome = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "email",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->E-mail`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "email",
                name: "email",
                type: "email",
                placeholder: "cliente@exemplo.com",
                error: store_get($$store_subs ??= {}, "$errors", errors).email,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).email;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).email = $$value);
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
              Map_pin($$renderer5, { class: "h-5 w-5 text-green-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Endereço e Localização`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Dados de localização do cliente`);
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
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                for: "endereco",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Endereço *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "endereco",
                name: "endereco",
                placeholder: "Rua, Bairro, Nº",
                error: store_get($$store_subs ??= {}, "$errors", errors).endereco,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).endereco;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).endereco = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "cidade",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cidade`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "cidade",
                name: "cidade",
                placeholder: "Cidade",
                error: store_get($$store_subs ??= {}, "$errors", errors).cidade,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).cidade;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).cidade = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "pais",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->País`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "pais",
                name: "pais",
                placeholder: "Angola",
                error: store_get($$store_subs ??= {}, "$errors", errors).pais,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).pais;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).pais = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> <div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "caixaPostal",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Caixa Postal`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "caixaPostal",
                name: "caixaPostal",
                placeholder: "C.P.",
                error: store_get($$store_subs ??= {}, "$errors", errors).caixaPostal,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).caixaPostal;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).caixaPostal = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "website",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Website`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "website",
                name: "website",
                type: "url",
                placeholder: "https://...",
                error: store_get($$store_subs ??= {}, "$errors", errors).website,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).website;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).website = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div>`);
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
              Phone($$renderer5, { class: "h-5 w-5 text-purple-500" });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Contatos`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Telefones e outros meios`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2">`);
              Label($$renderer5, {
                for: "telemovel",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Telemóvel`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "telemovel",
                name: "telemovel",
                type: "tel",
                placeholder: "+244...",
                error: store_get($$store_subs ??= {}, "$errors", errors).telemovel,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).telemovel;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).telemovel = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "telefone",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Telefone Fixo`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "telefone",
                name: "telefone",
                type: "tel",
                placeholder: "Telefone fixo",
                error: store_get($$store_subs ??= {}, "$errors", errors).telefone,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).telefone;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).telefone = $$value);
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "fax",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Fax`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "fax",
                name: "fax",
                type: "tel",
                placeholder: "Fax",
                error: store_get($$store_subs ??= {}, "$errors", errors).fax,
                get value() {
                  return store_get($$store_subs ??= {}, "$form", form).fax;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).fax = $$value);
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
              $$renderer5.push(`<ul class="list-disc space-y-2 pl-4"><li>A busca por NIF pode ser usada para atualizar rapidamente o nome e tipo do cliente.</li> <li>Mantenha as informações de endereço atualizadas para garantir a conformidade fiscal.</li> <li>O e-mail é fundamental para o envio automático de faturas e notificações.</li></ul>`);
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
//# sourceMappingURL=_page.svelte-CvNo_TEV.js.map
