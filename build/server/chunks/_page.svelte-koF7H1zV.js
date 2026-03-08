import { an as ensure_array_like, az as attr_class, _ as derived } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { S as Switch } from './switch-BLtRRuPD.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import './utils3-DjmiJAAD.js';
import { R as Root, T as Trigger, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_footer } from './index8-VEsRSQHH.js';
import { C as Card } from './card-ChfkAej9.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import { L as Loader_circle } from './loader-circle-DcjdY4IS.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './context-BAmjzoO_.js';
import './attrs-mduo83PF.js';
import './noop-CfhljDhh.js';
import './hidden-input-sNTj1t7e.js';
import './public-B844qK3e.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './scroll-lock-DpPha3vp.js';
import './events-GtUqDgmb.js';
import './index-server-CziyT60N.js';
import './x-DpLJ1R1s.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './index2-Cz2gv4fD.js';
import './dialog-description2-CD_E6-6J.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let parceiros = derived(() => data.parceiros);
    let loading = false;
    let dialogOpen = false;
    let isEditing = false;
    let formData = {
      nome: "",
      email: "",
      telefone: "",
      codigoRecomendacao: "",
      percentagemComissao: 10,
      ativo: true
    };
    function resetForm() {
      formData = {
        id: "",
        nome: "",
        email: "",
        telefone: "",
        codigoRecomendacao: "",
        percentagemComissao: 10,
        ativo: true
      };
      isEditing = false;
    }
    function handleEdit(parceiro) {
      isEditing = true;
      formData = {
        ...parceiro,
        percentagemComissao: Number(parceiro.percentagemComissao)
      };
      dialogOpen = true;
    }
    async function handleDelete(id) {
      if (!confirm("Tem certeza que deseja excluir este parceiro?")) return;
      try {
        loading = true;
        const submitData = new FormData();
        submitData.append("id", id);
        const response = await fetch(`?/delete`, { method: "POST", body: submitData });
        if (response.ok) {
          toast.success("Parceiro excluído com sucesso!");
          window.location.reload();
        } else {
          throw new Error("Falha ao excluir parceiro");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao excluir parceiro");
      } finally {
        loading = false;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="container space-y-4 py-4"><div class="flex items-center justify-between"><div><h2 class="text-3xl font-bold tracking-tight">Parceiros</h2> <p class="text-muted-foreground">Gerencie o sistema de recomendações por parceiros.</p></div> `);
      Root($$renderer3, {
        get open() {
          return dialogOpen;
        },
        set open($$value) {
          dialogOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          Trigger($$renderer4, {
            children: ($$renderer5) => {
              Button($$renderer5, {
                onclick: resetForm,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Adicionar Parceiro`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Dialog_content($$renderer4, {
            class: "max-w-2xl",
            children: ($$renderer5) => {
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(isEditing ? "Editar" : "Adicionar")} Parceiro`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(isEditing ? "Edite os dados do parceiro no formulário abaixo." : "Preencha os dados do novo parceiro no formulário abaixo.")}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <form class="space-y-6"><div class="grid grid-cols-2 gap-4"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "nome",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Nome *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "nome",
                required: true,
                get value() {
                  return formData.nome;
                },
                set value($$value) {
                  formData.nome = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "email",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Email *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                type: "email",
                id: "email",
                required: true,
                get value() {
                  return formData.email;
                },
                set value($$value) {
                  formData.email = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "telefone",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Telefone`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "telefone",
                get value() {
                  return formData.telefone;
                },
                set value($$value) {
                  formData.telefone = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "codigoRecomendacao",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Código de Recomendação *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "codigoRecomendacao",
                required: true,
                placeholder: "Ex: PARCEIRO10",
                get value() {
                  return formData.codigoRecomendacao;
                },
                set value($$value) {
                  formData.codigoRecomendacao = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "percentagemComissao",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Comissão (%) *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                type: "number",
                step: "0.01",
                min: "0",
                max: "100",
                id: "percentagemComissao",
                required: true,
                get value() {
                  return formData.percentagemComissao;
                },
                set value($$value) {
                  formData.percentagemComissao = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2 flex flex-col justify-end pb-2"><div class="flex items-center space-x-2">`);
              Switch($$renderer5, {
                id: "ativo",
                get checked() {
                  return formData.ativo;
                },
                set checked($$value) {
                  formData.ativo = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> `);
              Label($$renderer5, {
                for: "ativo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Parceiro Ativo`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div></div> `);
              Dialog_footer($$renderer5, {
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    type: "submit",
                    disabled: loading,
                    children: ($$renderer7) => {
                      if (loading) {
                        $$renderer7.push("<!--[-->");
                        Loader_circle($$renderer7, { class: "mr-2 h-4 w-4 animate-spin" });
                      } else {
                        $$renderer7.push("<!--[!-->");
                      }
                      $$renderer7.push(`<!--]--> ${escape_html(isEditing ? "Salvar Alterações" : "Criar Parceiro")}`);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></form>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="rounded-md border">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Table($$renderer4, {
            children: ($$renderer5) => {
              Table_header($$renderer5, {
                children: ($$renderer6) => {
                  Table_row($$renderer6, {
                    children: ($$renderer7) => {
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Nome`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Email`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Código`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Comissão`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Empresas`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Ativo`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        class: "text-right",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Ações`);
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
                  const each_array = ensure_array_like(parceiros());
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let parceiro = each_array[$$index];
                    Table_row($$renderer6, {
                      children: ($$renderer7) => {
                        Table_cell($$renderer7, {
                          class: "font-medium",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(parceiro.nome)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(parceiro.email)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<span class="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10">${escape_html(parceiro.codigoRecomendacao)}</span>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(parceiro.percentagemComissao)}%`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(parceiro._count.empresas)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<span${attr_class(`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${parceiro.ativo ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400" : "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400"}`)}>${escape_html(parceiro.ativo ? "Sim" : "Não")}</span>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          class: "text-right",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<div class="flex justify-end gap-2">`);
                            Button($$renderer8, {
                              variant: "ghost",
                              size: "sm",
                              onclick: () => handleEdit(parceiro),
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Editar`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Button($$renderer8, {
                              variant: "ghost",
                              size: "sm",
                              onclick: () => handleDelete(parceiro.id),
                              class: "text-destructive hover:text-destructive",
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Excluir`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                  }
                  $$renderer6.push(`<!--]--> `);
                  if (parceiros().length === 0) {
                    $$renderer6.push("<!--[-->");
                    Table_row($$renderer6, {
                      children: ($$renderer7) => {
                        Table_cell($$renderer7, {
                          colspan: 7,
                          class: "h-24 text-center",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Nenhum parceiro encontrado.`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$renderer6.push("<!--[!-->");
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
      $$renderer3.push(`<!----></div></div>`);
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
//# sourceMappingURL=_page.svelte-koF7H1zV.js.map
