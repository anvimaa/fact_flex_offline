import { an as ensure_array_like, aw as attr } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import './utils3-DjmiJAAD.js';
import { R as Root, T as Trigger, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_footer } from './index8-VEsRSQHH.js';
import { C as Card } from './card-ChfkAej9.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-B9KnjxJN.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import { U as Upload } from './upload-DVPyzTWg.js';
import { L as Loader_circle } from './loader-circle-DcjdY4IS.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { X } from './x-DpLJ1R1s.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './public-B844qK3e.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './context-BAmjzoO_.js';
import './attrs-mduo83PF.js';
import './noop-CfhljDhh.js';
import './scroll-lock-DpPha3vp.js';
import './events-GtUqDgmb.js';
import './index-server-CziyT60N.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './index2-Cz2gv4fD.js';
import './dialog-description2-CD_E6-6J.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let empresas = data.empresas;
    let loading = false;
    let dialogOpen = false;
    let previewUrl = "";
    let selectedFile = null;
    let isEditing = false;
    let formData = {
      nome: "",
      nif: "",
      endereco: "",
      email: "",
      telefone: "",
      website: "",
      pais: "",
      cidade: "",
      codigoRecomendacaoAplicado: ""
    };
    function resetForm() {
      formData = {
        id: "",
        nome: "",
        nif: "",
        endereco: "",
        email: "",
        telefone: "",
        website: "",
        pais: "",
        cidade: "",
        logo: "",
        codigoRecomendacaoAplicado: ""
      };
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = "";
      }
      selectedFile = null;
      isEditing = false;
    }
    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        selectedFile = file;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = URL.createObjectURL(file);
      }
    }
    function handleEdit(empresa) {
      isEditing = true;
      formData = {
        ...empresa,
        codigoRecomendacaoAplicado: empresa.codigoRecomendacaoAplicado || ""
      };
      if (empresa.logo) {
        previewUrl = empresa.logo;
      }
      dialogOpen = true;
    }
    async function handleDelete(id) {
      if (!confirm("Tem certeza que deseja excluir esta empresa?")) return;
      try {
        loading = true;
        const response = await fetch(`/api/admin/empresas/${id}`, { method: "DELETE" });
        if (!response.ok) {
          throw new Error("Falha ao excluir empresa");
        }
        empresas = empresas.filter((emp) => emp.id !== id);
        toast.success("Empresa excluída com sucesso!");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao excluir empresa");
      } finally {
        loading = false;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="container space-y-4 py-4"><div class="flex items-center justify-between"><div><h2 class="text-3xl font-bold tracking-tight">Empresas</h2> <p class="text-muted-foreground">Gerencie as empresas cadastradas no sistema</p></div> `);
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
                  $$renderer6.push(`<!---->Adicionar Empresa`);
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
                      $$renderer7.push(`<!---->${escape_html(isEditing ? "Editar" : "Adicionar")} Empresa`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(isEditing ? "Edite os dados da empresa no formulário abaixo." : "Preencha os dados da nova empresa no formulário abaixo.")}`);
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
                  $$renderer6.push(`<!---->Nome da Empresa *`);
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
                for: "nif",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->NIF *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "nif",
                required: true,
                get value() {
                  return formData.nif;
                },
                set value($$value) {
                  formData.nif = $$value;
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
                  $$renderer6.push(`<!---->Telefone *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "telefone",
                required: true,
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
                for: "website",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Website`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                type: "url",
                id: "website",
                get value() {
                  return formData.website;
                },
                set value($$value) {
                  formData.website = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "pais",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->País *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "pais",
                required: true,
                get value() {
                  return formData.pais;
                },
                set value($$value) {
                  formData.pais = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "cidade",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cidade *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "cidade",
                required: true,
                get value() {
                  return formData.cidade;
                },
                set value($$value) {
                  formData.cidade = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
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
                required: true,
                get value() {
                  return formData.endereco;
                },
                set value($$value) {
                  formData.endereco = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "codigoRecomendacaoAplicado",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Código Parceiro (Opcional)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "codigoRecomendacaoAplicado",
                placeholder: "Ex: PARCEIRO10",
                get value() {
                  return formData.codigoRecomendacaoAplicado;
                },
                set value($$value) {
                  formData.codigoRecomendacaoAplicado = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> <div class="grid gap-2">`);
              Label($$renderer5, {
                for: "logo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Logo da Empresa`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex flex-col gap-4"><div class="flex items-center gap-4">`);
              Avatar($$renderer5, {
                class: "h-[120px] w-[120px] rounded-lg",
                children: ($$renderer6) => {
                  if (previewUrl) {
                    $$renderer6.push("<!--[-->");
                    Avatar_image($$renderer6, { src: previewUrl, alt: "Preview" });
                  } else {
                    $$renderer6.push("<!--[!-->");
                    Avatar_fallback($$renderer6, {
                      class: "rounded-lg",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<div class="flex flex-col items-center justify-center text-muted-foreground">`);
                        Upload($$renderer7, { class: "mb-2 h-8 w-8" });
                        $$renderer7.push(`<!----> <span class="text-xs">Upload Logo</span></div>`);
                      },
                      $$slots: { default: true }
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex-1">`);
              Input($$renderer5, {
                type: "file",
                id: "logo",
                accept: "image/*",
                onchange: handleFileSelect,
                class: "hidden"
              });
              $$renderer5.push(`<!----> <p class="text-sm text-muted-foreground">Recomendado: PNG com fundo transparente.<br/> Tamanho máximo: 2MB</p> `);
              Button($$renderer5, {
                variant: "outline",
                class: "mt-2",
                onclick: () => document.getElementById("logo")?.click(),
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Escolher Arquivo`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div> `);
              if (selectedFile) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex items-center justify-between rounded-md bg-muted p-2"><div class="flex items-center gap-2">`);
                File_text($$renderer5, { class: "h-4 w-4" });
                $$renderer5.push(`<!----> <span class="text-sm">${escape_html(selectedFile.name)}</span></div> `);
                Button($$renderer5, {
                  variant: "ghost",
                  size: "icon",
                  onclick: () => {
                    selectedFile = null;
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                      previewUrl = "";
                    }
                  },
                  children: ($$renderer6) => {
                    X($$renderer6, { class: "h-4 w-4" });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div></div> `);
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
                      $$renderer7.push(`<!--]--> ${escape_html(isEditing ? "Salvar Alterações" : "Criar Empresa")}`);
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
                          $$renderer8.push(`<!---->Empresa`);
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
                          $$renderer8.push(`<!---->Telefone`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Cidade`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Table_head($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->País`);
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
                  const each_array = ensure_array_like(empresas);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let empresa = each_array[$$index];
                    Table_row($$renderer6, {
                      children: ($$renderer7) => {
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<div class="flex items-center gap-2">`);
                            if (empresa.logo) {
                              $$renderer8.push("<!--[-->");
                              $$renderer8.push(`<img${attr("src", empresa.logo)}${attr("alt", empresa.nome)} class="h-8 w-8 rounded-full object-contain"/>`);
                            } else {
                              $$renderer8.push("<!--[!-->");
                            }
                            $$renderer8.push(`<!--]--> <span class="font-medium">${escape_html(empresa.nome)}</span></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(empresa.email)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(empresa.telefone)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(empresa.cidade)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(empresa.pais)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        Table_cell($$renderer7, {
                          class: "text-right",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<div class="flex justify-end gap-2"><a${attr("href", `/admin/empresas/${empresa.id}`)}>`);
                            Button($$renderer8, {
                              variant: "ghost",
                              size: "sm",
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Detalhes`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----></a> `);
                            Button($$renderer8, {
                              variant: "ghost",
                              size: "sm",
                              onclick: () => handleEdit(empresa),
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Editar`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Button($$renderer8, {
                              variant: "ghost",
                              size: "sm",
                              onclick: () => handleDelete(empresa.id),
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
//# sourceMappingURL=_page.svelte-DVYqDHy6.js.map
