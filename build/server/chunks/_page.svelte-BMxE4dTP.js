import { av as head, an as ensure_array_like, aE as store_mutate, ax as store_get, ay as unsubscribe_stores, aw as attr } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import './utils3-DjmiJAAD.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-B9KnjxJN.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { b as Card_content, C as Card_header, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { R as Root, S as Select_trigger, a as Select_content, b as Select_item } from './index9-BnG82wbB.js';
import { S as Switch } from './switch-BLtRRuPD.js';
import { i as invalidateAll } from './client2-CcJ2Tk7F.js';
import './zod-vsheQqNr.js';
import { s as superForm } from './superForm-Bw4SE-EW.js';
import './utils-FiC4zhrQ.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { U as User } from './user-D18r-fvg.js';
import { C as Check } from './check-cM-2r8Wr.js';
import { S as Shield } from './shield-K6GxCAmv.js';
import { M as Mail } from './mail-B-m3CooH.js';
import { X } from './x-DpLJ1R1s.js';
import { C as Calendar } from './calendar-DG5mbrz5.js';
import { S as Square_pen } from './square-pen-DfZS8FUX.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { f as format } from './format-C_T_FT1v.js';
import { p as ptBR } from './pt-BR-BQdKBU8e.js';
import './index2-Cz2gv4fD.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './context-BAmjzoO_.js';
import './index-r8oPdwp5.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './mounted-Bmfh9OVK.js';
import './noop-CfhljDhh.js';
import './scroll-lock-DpPha3vp.js';
import './events-GtUqDgmb.js';
import './index-server-CziyT60N.js';
import './attrs-mduo83PF.js';
import './chevron-down-DGXS3bh7.js';
import './portal-ByHxxBCn.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import './index-BWA_9C9m.js';
import './parse-DXcVuhZ4.js';
import './types-C7xnNV5k.js';
import './stores-BBk2HDxH.js';
import './app-L81mENw7.js';
import './differenceInCalendarDays-DtxpX8GL.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let showEditDialog = false;
    let showCreateDialog = false;
    let editingUser = null;
    let isDeleting = false;
    let userToDelete = null;
    let showDeleteDialog = false;
    function handleCreate() {
      showCreateDialog = true;
      reset();
    }
    function handleEdit(user) {
      editingUser = { ...user };
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).id = user.id);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).name = user.name);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).email = user.email);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).role = user.role);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).active = user.active);
      store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).password = "");
      showEditDialog = true;
    }
    function handleDelete(user) {
      userToDelete = user;
      showDeleteDialog = true;
    }
    const { form, reset } = superForm(data.form, {
      onUpdated: ({ form: form2 }) => {
        if (form2.valid) {
          toast.success(form2.message);
          if (showCreateDialog) {
            showCreateDialog = false;
            reset();
          }
          if (showEditDialog) {
            showEditDialog = false;
            editingUser = null;
          }
          invalidateAll();
        } else {
          toast.error(form2.message);
        }
      }
    });
    async function confirmDelete() {
      if (!userToDelete) return;
      isDeleting = true;
      try {
        const formData = new FormData();
        formData.append("id", userToDelete.id);
        const response = await fetch("?/delete", { method: "POST", body: formData });
        const result = await response.json();
        console.log(result);
        if (result.type === "success") {
          toast.success(result.data.message || "Usuário excluído com sucesso");
          await invalidateAll();
          showDeleteDialog = false;
          userToDelete = null;
        } else {
          toast.error(result.error || "Erro ao excluir usuário");
        }
      } catch (error) {
        toast.error("Erro ao excluir usuário");
      } finally {
        isDeleting = false;
      }
    }
    function getStatusVariant(active) {
      return active ? "default" : "destructive";
    }
    function getStatusLabel(active) {
      return active ? "Ativo" : "Inativo";
    }
    function getRoleLabel(role) {
      const roles = {
        user: "Usuário",
        admin: "Administrador",
        superroot: "Super Admin"
      };
      return roles[role] || role;
    }
    function getRoleVariant(role) {
      const variants = {
        user: "secondary",
        admin: "default",
        superroot: "destructive"
      };
      return variants[role] || "secondary";
    }
    function canModifyUser(userId) {
      return data.currentUser?.id !== userId;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1wb6y1u", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Gestão de Usuários - ${escape_html(data.empresa?.nome)}</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto max-w-6xl px-4 py-8"><div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Usuários</h1> <p class="mt-2 text-gray-600 dark:text-gray-400">Gerencie os usuários da sua empresa</p></div> `);
      Button($$renderer3, {
        onclick: handleCreate,
        class: "flex items-center gap-2",
        children: ($$renderer4) => {
          Plus($$renderer4, { class: "h-4 w-4" });
          $$renderer4.push(`<!----> Adicionar Usuário`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_content($$renderer4, {
            class: "pt-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center"><div class="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">`);
              User($$renderer5, { class: "h-6 w-6 text-blue-600 dark:text-blue-400" });
              $$renderer5.push(`<!----></div> <div class="ml-4"><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Usuários</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(data.usuarios?.length || 0)}</p></div></div>`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_content($$renderer4, {
            class: "pt-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center"><div class="rounded-full bg-green-100 p-3 dark:bg-green-900/20">`);
              Check($$renderer5, { class: "h-6 w-6 text-green-600 dark:text-green-400" });
              $$renderer5.push(`<!----></div> <div class="ml-4"><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Ativos</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(data.usuarios?.filter((u) => u.active).length || 0)}</p></div></div>`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_content($$renderer4, {
            class: "pt-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center"><div class="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">`);
              Shield($$renderer5, {
                class: "text-orabg-orange-600 dark:text-orabg-orange-400 h-6 w-6"
              });
              $$renderer5.push(`<!----></div> <div class="ml-4"><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Inativos</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(data.usuarios?.filter((u) => u.active === false).length || 0)}</p></div></div>`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Lista de Usuários`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Gerencie todos os usuários da sua empresa`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              if (!data.usuarios || data.usuarios.length === 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex flex-col items-center justify-center py-12 text-center">`);
                User($$renderer5, { class: "mb-4 h-12 w-12 text-gray-400" });
                $$renderer5.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white">Nenhum usuário encontrado</h3> <p class="mt-1 text-gray-500 dark:text-gray-400">Não há usuários cadastrados na sua empresa.</p></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="rounded-md border">`);
                if (Table) {
                  $$renderer5.push("<!--[-->");
                  Table($$renderer5, {
                    children: ($$renderer6) => {
                      if (Table_header) {
                        $$renderer6.push("<!--[-->");
                        Table_header($$renderer6, {
                          children: ($$renderer7) => {
                            if (Table_row) {
                              $$renderer7.push("<!--[-->");
                              Table_row($$renderer7, {
                                children: ($$renderer8) => {
                                  if (Table_head) {
                                    $$renderer8.push("<!--[-->");
                                    Table_head($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Usuário`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
                                  $$renderer8.push(` `);
                                  if (Table_head) {
                                    $$renderer8.push("<!--[-->");
                                    Table_head($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Email`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
                                  $$renderer8.push(` `);
                                  if (Table_head) {
                                    $$renderer8.push("<!--[-->");
                                    Table_head($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Role`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
                                  $$renderer8.push(` `);
                                  if (Table_head) {
                                    $$renderer8.push("<!--[-->");
                                    Table_head($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Status`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
                                  $$renderer8.push(` `);
                                  if (Table_head) {
                                    $$renderer8.push("<!--[-->");
                                    Table_head($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Verificado`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
                                  $$renderer8.push(` `);
                                  if (Table_head) {
                                    $$renderer8.push("<!--[-->");
                                    Table_head($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Criado em`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
                                  $$renderer8.push(` `);
                                  if (Table_head) {
                                    $$renderer8.push("<!--[-->");
                                    Table_head($$renderer8, {
                                      class: "text-right",
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Ações`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
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
                      $$renderer6.push(` `);
                      if (Table_body) {
                        $$renderer6.push("<!--[-->");
                        Table_body($$renderer6, {
                          children: ($$renderer7) => {
                            $$renderer7.push(`<!--[-->`);
                            const each_array = ensure_array_like(data.usuarios);
                            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                              let user = each_array[$$index];
                              if (Table_row) {
                                $$renderer7.push("<!--[-->");
                                Table_row($$renderer7, {
                                  children: ($$renderer8) => {
                                    if (Table_cell) {
                                      $$renderer8.push("<!--[-->");
                                      Table_cell($$renderer8, {
                                        children: ($$renderer9) => {
                                          $$renderer9.push(`<div class="flex items-center gap-3">`);
                                          Avatar($$renderer9, {
                                            class: "h-10 w-10",
                                            children: ($$renderer10) => {
                                              Avatar_image($$renderer10, { src: user.image ?? "", alt: user.name });
                                              $$renderer10.push(`<!----> `);
                                              Avatar_fallback($$renderer10, {
                                                class: "bg-gradient-to-br from-blue-400 to-purple-500 text-white",
                                                children: ($$renderer11) => {
                                                  $$renderer11.push(`<!---->${escape_html(user.name?.[0]?.toUpperCase() || "U")}`);
                                                },
                                                $$slots: { default: true }
                                              });
                                              $$renderer10.push(`<!---->`);
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer9.push(`<!----> <div><div class="font-medium">${escape_html(user.name)}</div> <div class="text-sm text-gray-500 dark:text-gray-400">ID: ${escape_html(user.id.slice(0, 8))}...</div></div></div>`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer8.push("<!--]-->");
                                    } else {
                                      $$renderer8.push("<!--[!-->");
                                      $$renderer8.push("<!--]-->");
                                    }
                                    $$renderer8.push(` `);
                                    if (Table_cell) {
                                      $$renderer8.push("<!--[-->");
                                      Table_cell($$renderer8, {
                                        children: ($$renderer9) => {
                                          $$renderer9.push(`<div class="flex items-center gap-2">`);
                                          Mail($$renderer9, { class: "h-4 w-4 text-gray-400" });
                                          $$renderer9.push(`<!----> ${escape_html(user.email)}</div>`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer8.push("<!--]-->");
                                    } else {
                                      $$renderer8.push("<!--[!-->");
                                      $$renderer8.push("<!--]-->");
                                    }
                                    $$renderer8.push(` `);
                                    if (Table_cell) {
                                      $$renderer8.push("<!--[-->");
                                      Table_cell($$renderer8, {
                                        children: ($$renderer9) => {
                                          Badge($$renderer9, {
                                            variant: getRoleVariant(user.role),
                                            children: ($$renderer10) => {
                                              $$renderer10.push(`<!---->${escape_html(getRoleLabel(user.role))}`);
                                            },
                                            $$slots: { default: true }
                                          });
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer8.push("<!--]-->");
                                    } else {
                                      $$renderer8.push("<!--[!-->");
                                      $$renderer8.push("<!--]-->");
                                    }
                                    $$renderer8.push(` `);
                                    if (Table_cell) {
                                      $$renderer8.push("<!--[-->");
                                      Table_cell($$renderer8, {
                                        children: ($$renderer9) => {
                                          Badge($$renderer9, {
                                            variant: getStatusVariant(user.active),
                                            children: ($$renderer10) => {
                                              $$renderer10.push(`<!---->${escape_html(getStatusLabel(user.active))}`);
                                            },
                                            $$slots: { default: true }
                                          });
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer8.push("<!--]-->");
                                    } else {
                                      $$renderer8.push("<!--[!-->");
                                      $$renderer8.push("<!--]-->");
                                    }
                                    $$renderer8.push(` `);
                                    if (Table_cell) {
                                      $$renderer8.push("<!--[-->");
                                      Table_cell($$renderer8, {
                                        children: ($$renderer9) => {
                                          if (user.emailVerified) {
                                            $$renderer9.push("<!--[-->");
                                            $$renderer9.push(`<div class="flex items-center gap-2 text-green-600 dark:text-green-400">`);
                                            Check($$renderer9, { class: "h-4 w-4" });
                                            $$renderer9.push(`<!----> <span class="text-sm">Sim</span></div>`);
                                          } else {
                                            $$renderer9.push("<!--[!-->");
                                            $$renderer9.push(`<div class="flex items-center gap-2 text-amber-600 dark:text-amber-400">`);
                                            X($$renderer9, { class: "h-4 w-4" });
                                            $$renderer9.push(`<!----> <span class="text-sm">Não</span></div>`);
                                          }
                                          $$renderer9.push(`<!--]-->`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer8.push("<!--]-->");
                                    } else {
                                      $$renderer8.push("<!--[!-->");
                                      $$renderer8.push("<!--]-->");
                                    }
                                    $$renderer8.push(` `);
                                    if (Table_cell) {
                                      $$renderer8.push("<!--[-->");
                                      Table_cell($$renderer8, {
                                        children: ($$renderer9) => {
                                          $$renderer9.push(`<div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">`);
                                          Calendar($$renderer9, { class: "h-4 w-4" });
                                          $$renderer9.push(`<!----> ${escape_html(format(new Date(user.createdAt), "dd/MM/yyyy", { locale: ptBR }))}</div>`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer8.push("<!--]-->");
                                    } else {
                                      $$renderer8.push("<!--[!-->");
                                      $$renderer8.push("<!--]-->");
                                    }
                                    $$renderer8.push(` `);
                                    if (Table_cell) {
                                      $$renderer8.push("<!--[-->");
                                      Table_cell($$renderer8, {
                                        class: "text-right",
                                        children: ($$renderer9) => {
                                          $$renderer9.push(`<div class="flex justify-end gap-2">`);
                                          Button($$renderer9, {
                                            variant: "outline",
                                            size: "sm",
                                            onclick: () => handleEdit(user),
                                            disabled: !canModifyUser(user.id),
                                            title: !canModifyUser(user.id) ? "Não é possível modificar sua própria conta" : "Editar usuário",
                                            children: ($$renderer10) => {
                                              Square_pen($$renderer10, { class: "h-4 w-4" });
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer9.push(`<!----> `);
                                          Button($$renderer9, {
                                            variant: "outline",
                                            size: "sm",
                                            onclick: () => handleDelete(user),
                                            disabled: !canModifyUser(user.id),
                                            class: "text-destructive hover:text-destructive",
                                            title: !canModifyUser(user.id) ? "Não é possível excluir sua própria conta" : "Excluir usuário",
                                            children: ($$renderer10) => {
                                              Trash_2($$renderer10, { class: "h-4 w-4" });
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$renderer9.push(`<!----></div>`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer8.push("<!--]-->");
                                    } else {
                                      $$renderer8.push("<!--[!-->");
                                      $$renderer8.push("<!--]-->");
                                    }
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer7.push("<!--]-->");
                              } else {
                                $$renderer7.push("<!--[!-->");
                                $$renderer7.push("<!--]-->");
                              }
                            }
                            $$renderer7.push(`<!--]-->`);
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
                $$renderer5.push(`</div>`);
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> `);
      if (showDeleteDialog && userToDelete) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"><div class="flex items-center gap-3"><div class="rounded-full bg-red-100 p-2 dark:bg-red-900/20">`);
        Trash_2($$renderer3, { class: "h-6 w-6 text-red-600 dark:text-red-400" });
        $$renderer3.push(`<!----></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Excluir Usuário</h3> <p class="text-sm text-gray-500 dark:text-gray-400">Tem certeza que deseja excluir este usuário?</p></div></div> <div class="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700"><div class="flex items-center gap-3">`);
        Avatar($$renderer3, {
          class: "h-10 w-10",
          children: ($$renderer4) => {
            Avatar_image($$renderer4, { src: userToDelete.image ?? "", alt: userToDelete.name });
            $$renderer4.push(`<!----> `);
            Avatar_fallback($$renderer4, {
              class: "bg-gradient-to-br from-blue-400 to-purple-500 text-white",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(userToDelete.name?.[0]?.toUpperCase() || "U")}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div><div class="font-medium">${escape_html(userToDelete.name)}</div> <div class="text-sm text-gray-500 dark:text-gray-400">${escape_html(userToDelete.email)}</div></div></div></div> <div class="mt-6 flex justify-end gap-3">`);
        Button($$renderer3, {
          variant: "outline",
          onclick: () => {
            showDeleteDialog = false;
            userToDelete = null;
          },
          disabled: isDeleting,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cancelar`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          variant: "destructive",
          onclick: confirmDelete,
          disabled: isDeleting,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(isDeleting ? "Excluindo..." : "Excluir")}`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (showCreateDialog) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"><div class="flex items-center gap-3"><div class="rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">`);
        User($$renderer3, { class: "h-6 w-6 text-blue-600 dark:text-blue-400" });
        $$renderer3.push(`<!----></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Adicionar Novo Usuário</h3> <p class="text-sm text-gray-500 dark:text-gray-400">Informe os dados do novo usuário</p></div></div> <form method="POST" action="?/create" class="space-y-8"><div class="mt-6 space-y-4"><div class="space-y-2">`);
        Label($$renderer3, {
          for: "name",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Nome Completo *`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          name: "name",
          placeholder: "Digite o nome completo",
          get value() {
            return store_get($$store_subs ??= {}, "$form", form).name;
          },
          set value($$value) {
            store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).name = $$value);
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "email",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Email *`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          name: "email",
          type: "email",
          placeholder: "Digite o email",
          get value() {
            return store_get($$store_subs ??= {}, "$form", form).email;
          },
          set value($$value) {
            store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).email = $$value);
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "password",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Palavra-passe *`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          name: "password",
          type: "password",
          placeholder: "Digite a palavra-passe",
          get value() {
            return store_get($$store_subs ??= {}, "$form", form).password;
          },
          set value($$value) {
            store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).password = $$value);
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "role",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Função`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Root($$renderer3, {
          type: "single",
          name: "role",
          get value() {
            return store_get($$store_subs ??= {}, "$form", form).role;
          },
          set value($$value) {
            store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).role = $$value);
            $$settled = false;
          },
          children: ($$renderer4) => {
            Select_trigger($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Selecione a função`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Select_content($$renderer4, {
              children: ($$renderer5) => {
                Select_item($$renderer5, {
                  value: "user",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Usuário`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Select_item($$renderer5, {
                  value: "admin",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Administrador`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div> <div class="flex items-center justify-between">`);
        Label($$renderer3, {
          for: "active",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Usuário Ativo`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Switch($$renderer3, {
          id: "active",
          get checked() {
            return store_get($$store_subs ??= {}, "$form", form).active;
          },
          set checked($$value) {
            store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).active = $$value);
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div> <div class="mt-6 flex justify-end gap-3">`);
        Button($$renderer3, {
          variant: "outline",
          onclick: () => {
            showCreateDialog = false;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cancelar`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          disabled: !store_get($$store_subs ??= {}, "$form", form).name || !store_get($$store_subs ??= {}, "$form", form).email || !store_get($$store_subs ??= {}, "$form", form).password,
          type: "submit",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Criar Usuário`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></form></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (showEditDialog && editingUser) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"><div class="flex items-center gap-3"><div class="rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">`);
        Square_pen($$renderer3, { class: "h-6 w-6 text-blue-600 dark:text-blue-400" });
        $$renderer3.push(`<!----></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Editar Usuário</h3> <p class="text-sm text-gray-500 dark:text-gray-400">Alterar dados do usuário</p></div></div> <form method="POST" action="?/update" class="space-y-8"><input type="hidden" name="id"${attr("value", editingUser.id)}/> <div class="mt-6 space-y-4"><div class="space-y-2">`);
        Label($$renderer3, {
          for: "name",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Nome Completo *`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          name: "name",
          value: editingUser.name,
          placeholder: "Digite o nome completo"
        });
        $$renderer3.push(`<!----></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "email",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Email *`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          name: "email",
          type: "email",
          value: editingUser.email,
          placeholder: "Digite o email",
          readonly: true,
          class: "bg-gray-100 dark:bg-gray-700"
        });
        $$renderer3.push(`<!----></div> <div class="space-y-2">`);
        Label($$renderer3, {
          for: "role",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Função`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Root($$renderer3, {
          value: editingUser.role,
          type: "single",
          name: "role",
          children: ($$renderer4) => {
            Select_trigger($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Selecione a função`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Select_content($$renderer4, {
              children: ($$renderer5) => {
                Select_item($$renderer5, {
                  value: "user",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Usuário`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Select_item($$renderer5, {
                  value: "admin",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Administrador`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div> <div class="flex items-center justify-between">`);
        Label($$renderer3, {
          for: "active",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Usuário Ativo`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Switch($$renderer3, { id: "active", name: "active", checked: editingUser.active });
        $$renderer3.push(`<!----></div></div> <div class="mt-6 flex justify-end gap-3">`);
        Button($$renderer3, {
          variant: "outline",
          onclick: () => {
            showEditDialog = false;
            editingUser = null;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cancelar`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          type: "submit",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Salvar Alterações`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></form></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
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
//# sourceMappingURL=_page.svelte-BMxE4dTP.js.map
