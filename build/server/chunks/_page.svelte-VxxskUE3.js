import { an as ensure_array_like } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import './utils3-DjmiJAAD.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './index2-Cz2gv4fD.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let users = [];
    let loading = false;
    async function loadUsers() {
      try {
        const response = await fetch("/api/admin/users");
        users = await response.json();
      } catch (error) {
        toast.error("Erro ao carregar usuários");
      }
    }
    async function handleToggleStatus(userId, currentStatus) {
      loading = true;
      try {
        const response = await fetch(`/api/admin/users/${userId}/toggle-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: !currentStatus })
        });
        if (!response.ok) throw new Error("Falha ao atualizar status do usuário");
        toast.success(`Usuário ${currentStatus ? "desativado" : "ativado"} com sucesso!`);
        await loadUsers();
      } catch (error) {
        toast.error("Erro ao atualizar status do usuário");
      } finally {
        loading = false;
      }
    }
    function getStatusBadgeVariant(active) {
      return active ? "default" : "destructive";
    }
    function formatStatus(active) {
      return active ? "Ativo" : "Inativo";
    }
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="flex items-center justify-between"><div>`);
            Card_title($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Gerenciar Usuários`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Gerencie os usuários do sistema`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div> `);
            Button($$renderer4, {
              variant: "outline",
              size: "sm",
              onclick: async () => {
                await loadUsers();
              },
              disabled: loading,
              children: ($$renderer5) => {
                $$renderer5.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg> Atualizar`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            if (users.length === 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="flex flex-col items-center justify-center py-12 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4 text-muted-foreground"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> <p class="text-xl font-medium">Nenhum usuário encontrado</p> <p class="text-sm text-muted-foreground">Não há usuários cadastrados no sistema.</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`<div class="space-y-4">`);
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
                              $$renderer8.push(`<!---->Status`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> `);
                          Table_head($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->Data de Cadastro`);
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
                      const each_array = ensure_array_like(users);
                      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                        let user = each_array[$$index];
                        Table_row($$renderer6, {
                          children: ($$renderer7) => {
                            Table_cell($$renderer7, {
                              class: "font-medium",
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->${escape_html(user.name)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            Table_cell($$renderer7, {
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->${escape_html(user.email)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            Table_cell($$renderer7, {
                              children: ($$renderer8) => {
                                Badge($$renderer8, {
                                  variant: getStatusBadgeVariant(user.active),
                                  children: ($$renderer9) => {
                                    $$renderer9.push(`<!---->${escape_html(formatStatus(user.active))}`);
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            Table_cell($$renderer7, {
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->${escape_html(new Date(user.createdAt).toLocaleDateString("pt-BR"))}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!----> `);
                            Table_cell($$renderer7, {
                              class: "text-right",
                              children: ($$renderer8) => {
                                Button($$renderer8, {
                                  variant: user.active ? "destructive" : "default",
                                  size: "sm",
                                  disabled: loading,
                                  onclick: () => handleToggleStatus(user.id, user.active),
                                  children: ($$renderer9) => {
                                    if (loading) {
                                      $$renderer9.push("<!--[-->");
                                      $$renderer9.push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"></path></svg>`);
                                    } else {
                                      $$renderer9.push("<!--[!-->");
                                    }
                                    $$renderer9.push(`<!--]-->${escape_html(user.active ? "Desativar" : "Ativar")}`);
                                  },
                                  $$slots: { default: true }
                                });
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
              $$renderer4.push(`<!----></div>`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-VxxskUE3.js.map
