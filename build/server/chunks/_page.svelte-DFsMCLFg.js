import { _ as derived, aw as attr, an as ensure_array_like, az as attr_class, aB as stringify, ah as sanitize_props, ai as spread_props, ap as slot } from './index-DPRpZFUH.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { f as formatCurrency, j as getStatusBadgeVariant, I as Icon } from './utils3-DjmiJAAD.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { B as Button } from './button-DjcfiVkK.js';
import { T as Table, a as Table_header, b as Table_row, d as Table_head, c as Table_body, e as Table_cell } from './table-row-B-9FJQyf.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-B9KnjxJN.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { R as Root, T as Trigger, D as Dialog_content, a as Dialog_header, c as Dialog_footer, b as Dialog_title } from './index8-VEsRSQHH.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { M as Map_pin, P as Phone } from './phone-DEnZw48I.js';
import { M as Mail } from './mail-B-m3CooH.js';
import { G as Globe } from './globe-BbSquzP7.js';
import { X } from './x-DpLJ1R1s.js';
import { U as Users } from './users-CSW0O0kd.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { P as Package } from './package-BKsm9DRA.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { f as format } from './format-C_T_FT1v.js';
import { p as ptBR } from './pt-BR-BQdKBU8e.js';
import { d as differenceInDays } from './differenceInDays-DxuNzxW_.js';
import './public-B844qK3e.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './context-BAmjzoO_.js';
import './index2-Cz2gv4fD.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './attrs-mduo83PF.js';
import './noop-CfhljDhh.js';
import './scroll-lock-DpPha3vp.js';
import './events-GtUqDgmb.js';
import './index-server-CziyT60N.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './differenceInCalendarDays-DtxpX8GL.js';

function User_plus($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    ["line", { "x1": "19", "x2": "19", "y1": "8", "y2": "14" }],
    ["line", { "x1": "22", "x2": "16", "y1": "11", "y2": "11" }]
  ];
  Icon($$renderer, spread_props([
    { name: "user-plus" },
    $$sanitized_props,
    {
      /**
       * @component @name UserPlus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iNyIgcj0iNCIgLz4KICA8bGluZSB4MT0iMTkiIHgyPSIxOSIgeTE9IjgiIHkyPSIxNCIgLz4KICA8bGluZSB4MT0iMjIiIHgyPSIxNiIgeTE9IjExIiB5Mj0iMTEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/user-plus
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const empresa = derived(() => data.empresa);
    const availableUsers = derived(() => data.availableUsers);
    const allPartners = derived(() => data.allPartners);
    let loading = false;
    let selectedUserToAdd = "";
    let isCreateUserDialogOpen = false;
    let isAssociatePartnerDialogOpen = false;
    let selectedPartnerId = derived(() => empresa().parceiroId || "");
    let newUserForm = { name: "", email: "", password: "", role: "user" };
    async function handleAssociateUser() {
      return;
    }
    async function handleRemoveUser(userId) {
      if (!confirm("Deseja realmente desassociar este utilizador da empresa?")) return;
      loading = true;
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        const res = await fetch("?/removeUser", { method: "POST", body: formData });
        if (res.ok) {
          toast.success("Utilizador removido com sucesso!");
          window.location.reload();
        } else {
          toast.error("Erro ao remover utilizador.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro de servidor.");
      } finally {
        loading = false;
      }
    }
    let isCreateSubscriptionDialogOpen = false;
    let newSubscriptionForm = {
      planType: "starter",
      periodType: "mensal",
      amount: "",
      durationMonths: 1,
      startDate: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")
    };
    async function handleAssociatePartner() {
      if (!selectedPartnerId()) return;
      loading = true;
      try {
        const formData = new FormData();
        formData.append("partnerId", selectedPartnerId());
        const res = await fetch("?/associatePartner", { method: "POST", body: formData });
        if (res.ok) {
          toast.success("Parceiro associado com sucesso!");
          isAssociatePartnerDialogOpen = false;
          window.location.reload();
        } else {
          toast.error("Erro ao associar parceiro.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro de servidor.");
      } finally {
        loading = false;
      }
    }
    async function handleRemovePartner() {
      if (!confirm("Deseja desassociar o parceiro desta empresa?")) return;
      loading = true;
      try {
        const res = await fetch("?/removePartner", { method: "POST" });
        if (res.ok) {
          toast.success("Parceiro removido com sucesso!");
          window.location.reload();
        } else {
          toast.error("Erro ao remover parceiro.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro de servidor.");
      } finally {
        loading = false;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex-1 space-y-6 p-8 pt-6"><div class="flex items-center space-x-4 mb-2"><a href="/admin/empresas">`);
      Button($$renderer3, {
        variant: "outline",
        size: "icon",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></a> <div><h2 class="text-3xl font-bold tracking-tight">Perfl da Empresa</h2> <p class="text-muted-foreground">Monitorize e gira todos os detalhes de ${escape_html(empresa().nome)}</p></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6">`);
      Card($$renderer3, {
        class: "col-span-1 border-muted md:col-span-1 shadow-sm",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "flex flex-row items-center gap-4",
            children: ($$renderer5) => {
              Avatar($$renderer5, {
                class: "h-16 w-16 border rounded-lg shadow-sm",
                children: ($$renderer6) => {
                  if (empresa().logo) {
                    $$renderer6.push("<!--[-->");
                    Avatar_image($$renderer6, { src: empresa().logo, alt: empresa().nome });
                  } else {
                    $$renderer6.push("<!--[!-->");
                  }
                  $$renderer6.push(`<!--]--> `);
                  Avatar_fallback($$renderer6, {
                    class: "bg-primary/10 text-primary font-bold text-xl rounded-lg",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(empresa().nome.substring(0, 2).toUpperCase())}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div>`);
              Card_title($$renderer5, {
                class: "text-xl",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(empresa().nome)}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->NIF: ${escape_html(empresa().nif)}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-3 mt-2 text-sm"><div class="flex items-center gap-3 text-muted-foreground">`);
              Map_pin($$renderer5, { class: "h-4 w-4 text-foreground/70" });
              $$renderer5.push(`<!----> <span class="flex-1 truncate">${escape_html(empresa().endereco)}, ${escape_html(empresa().cidade)} - ${escape_html(empresa().pais)}</span></div> `);
              if (empresa().email) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex items-center gap-3 text-muted-foreground">`);
                Mail($$renderer5, { class: "h-4 w-4 text-foreground/70" });
                $$renderer5.push(`<!----> <span class="flex-1 truncate">${escape_html(empresa().email)}</span></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> `);
              if (empresa().telefone) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex items-center gap-3 text-muted-foreground">`);
                Phone($$renderer5, { class: "h-4 w-4 text-foreground/70" });
                $$renderer5.push(`<!----> <span>${escape_html(empresa().telefone)}</span></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> `);
              if (empresa().website) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex items-center gap-3 text-muted-foreground">`);
                Globe($$renderer5, { class: "h-4 w-4 text-foreground/70" });
                $$renderer5.push(`<!----> <a${attr("href", empresa().website)} target="_blank" rel="noreferrer" class="text-primary hover:underline truncate w-full">${escape_html(empresa().website)}</a></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div> `);
              if (empresa().parceiro) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="mt-6 pt-4 border-t"><div class="flex items-center justify-between mb-3"><p class="text-xs font-semibold uppercase text-muted-foreground">Parceiro Associado</p> `);
                Button($$renderer5, {
                  variant: "ghost",
                  size: "icon",
                  class: "h-6 w-6 text-muted-foreground hover:text-destructive",
                  onclick: handleRemovePartner,
                  children: ($$renderer6) => {
                    X($$renderer6, { class: "h-3 w-3" });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex items-center gap-2">`);
                Badge($$renderer5, {
                  variant: "secondary",
                  class: "font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(empresa().parceiro.codigoRecomendacao)}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <span class="text-sm text-foreground/80 font-medium">(${escape_html(empresa().parceiro.nome)})</span></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="mt-6 pt-4 border-t"><p class="text-xs font-semibold uppercase text-muted-foreground mb-3">Parceiro</p> `);
                Root($$renderer5, {
                  get open() {
                    return isAssociatePartnerDialogOpen;
                  },
                  set open($$value) {
                    isAssociatePartnerDialogOpen = $$value;
                    $$settled = false;
                  },
                  children: ($$renderer6) => {
                    Trigger($$renderer6, {
                      children: ($$renderer7) => {
                        Button($$renderer7, {
                          variant: "outline",
                          size: "sm",
                          class: "w-full",
                          children: ($$renderer8) => {
                            Plus($$renderer8, { class: "w-4 h-4 mr-2" });
                            $$renderer8.push(`<!----> Associar Parceiro`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Dialog_content($$renderer6, {
                      children: ($$renderer7) => {
                        Dialog_header($$renderer7, {
                          children: ($$renderer8) => {
                            Dialog_title($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Associar Parceiro à Empresa`);
                              },
                              $$slots: { default: true }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> <div class="space-y-4 py-4"><div class="space-y-2">`);
                        Label($$renderer7, {
                          for: "partnerSelect",
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->Selecionar Parceiro`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----> `);
                        $$renderer7.select(
                          {
                            id: "partnerSelect",
                            value: selectedPartnerId(),
                            class: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          },
                          ($$renderer8) => {
                            $$renderer8.option({ value: "", disabled: true }, ($$renderer9) => {
                              $$renderer9.push(`Selecione um parceiro ativo...`);
                            });
                            $$renderer8.push(`<!--[-->`);
                            const each_array = ensure_array_like(allPartners());
                            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                              let partner = each_array[$$index];
                              $$renderer8.option({ value: partner.id }, ($$renderer9) => {
                                $$renderer9.push(`${escape_html(partner.nome)} (${escape_html(partner.codigoRecomendacao)})`);
                              });
                            }
                            $$renderer8.push(`<!--]-->`);
                          }
                        );
                        $$renderer7.push(`</div> `);
                        Dialog_footer($$renderer7, {
                          children: ($$renderer8) => {
                            Button($$renderer8, {
                              type: "button",
                              variant: "outline",
                              onclick: () => isAssociatePartnerDialogOpen = false,
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Cancelar`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Button($$renderer8, {
                              type: "button",
                              disabled: !selectedPartnerId() || loading,
                              onclick: handleAssociatePartner,
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Associar Agora`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!---->`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!----></div>`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              }
              $$renderer5.push(`<!--]--> <div class="pt-4 border-t"><p class="text-xs text-muted-foreground">Registado em: ${escape_html(format(new Date(empresa().createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR }))}</p></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="col-span-1 md:col-span-2 space-y-6"><div class="grid grid-cols-2 lg:grid-cols-4 gap-4">`);
      Card($$renderer3, {
        class: "shadow-sm",
        children: ($$renderer4) => {
          Card_content($$renderer4, {
            class: "p-4 flex items-center gap-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="bg-primary/10 p-3 rounded-full">`);
              Users($$renderer5, { class: "h-5 w-5 text-primary" });
              $$renderer5.push(`<!----></div> <div><p class="text-sm font-medium text-muted-foreground">Utilizadores</p> <h4 class="text-2xl font-bold">${escape_html(empresa().users.length)}</h4></div>`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "shadow-sm",
        children: ($$renderer4) => {
          Card_content($$renderer4, {
            class: "p-4 flex items-center gap-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="bg-blue-500/10 p-3 rounded-full">`);
              Users($$renderer5, { class: "h-5 w-5 text-blue-500" });
              $$renderer5.push(`<!----></div> <div><p class="text-sm font-medium text-muted-foreground">Clientes</p> <h4 class="text-2xl font-bold">${escape_html(empresa()._count.clientes)}</h4></div>`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "shadow-sm",
        children: ($$renderer4) => {
          Card_content($$renderer4, {
            class: "p-4 flex items-center gap-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="bg-green-500/10 p-3 rounded-full">`);
              File_text($$renderer5, { class: "h-5 w-5 text-green-500" });
              $$renderer5.push(`<!----></div> <div><p class="text-sm font-medium text-muted-foreground">Faturas emitidas</p> <h4 class="text-2xl font-bold">${escape_html(empresa()._count.facturas)}</h4></div>`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "shadow-sm",
        children: ($$renderer4) => {
          Card_content($$renderer4, {
            class: "p-4 flex items-center gap-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="bg-orange-500/10 p-3 rounded-full">`);
              Package($$renderer5, { class: "h-5 w-5 text-orange-500" });
              $$renderer5.push(`<!----></div> <div><p class="text-sm font-medium text-muted-foreground">Produtos</p> <h4 class="text-2xl font-bold">${escape_html(empresa()._count.produtos)}</h4></div>`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> `);
      Card($$renderer3, {
        class: "shadow-sm",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "flex flex-row items-center justify-between py-4 border-b",
            children: ($$renderer5) => {
              $$renderer5.push(`<div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Utilizadores da Empresa`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Pessoas com acesso à conta (${escape_html(empresa().nome)})`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> <div class="flex items-center gap-2">`);
              $$renderer5.select(
                {
                  class: "flex h-9 w-[250px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  value: selectedUserToAdd
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "", disabled: true }, ($$renderer7) => {
                    $$renderer7.push(`Selecionar utilizador órfão...`);
                  });
                  $$renderer6.push(`<!--[-->`);
                  const each_array_1 = ensure_array_like(availableUsers());
                  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                    let user = each_array_1[$$index_1];
                    $$renderer6.option({ value: user.id }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(user.name)} (${escape_html(user.email)})`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(` `);
              Button($$renderer5, {
                variant: "secondary",
                size: "sm",
                disabled: !selectedUserToAdd,
                onclick: handleAssociateUser,
                children: ($$renderer6) => {
                  User_plus($$renderer6, { class: "w-4 h-4 mr-2" });
                  $$renderer6.push(`<!----> Adicionar Existente`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Root($$renderer5, {
                get open() {
                  return isCreateUserDialogOpen;
                },
                set open($$value) {
                  isCreateUserDialogOpen = $$value;
                  $$settled = false;
                },
                children: ($$renderer6) => {
                  Trigger($$renderer6, {
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        size: "sm",
                        children: ($$renderer8) => {
                          Plus($$renderer8, { class: "w-4 h-4 mr-2" });
                          $$renderer8.push(`<!----> Criar Novo`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Dialog_content($$renderer6, {
                    children: ($$renderer7) => {
                      Dialog_header($$renderer7, {
                        children: ($$renderer8) => {
                          Dialog_title($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Criar Novo Utilizador`);
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <form class="space-y-4 py-4"><div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "name",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Nome *`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Input($$renderer7, {
                        id: "name",
                        required: true,
                        get value() {
                          return newUserForm.name;
                        },
                        set value($$value) {
                          newUserForm.name = $$value;
                          $$settled = false;
                        }
                      });
                      $$renderer7.push(`<!----></div> <div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "email",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Email *`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Input($$renderer7, {
                        type: "email",
                        id: "email",
                        required: true,
                        get value() {
                          return newUserForm.email;
                        },
                        set value($$value) {
                          newUserForm.email = $$value;
                          $$settled = false;
                        }
                      });
                      $$renderer7.push(`<!----></div> <div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "password",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Palavra-passe *`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Input($$renderer7, {
                        type: "password",
                        id: "password",
                        required: true,
                        minlength: 6,
                        get value() {
                          return newUserForm.password;
                        },
                        set value($$value) {
                          newUserForm.password = $$value;
                          $$settled = false;
                        }
                      });
                      $$renderer7.push(`<!----></div> <div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "role",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Cargo`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      $$renderer7.select(
                        {
                          id: "role",
                          value: newUserForm.role,
                          class: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        },
                        ($$renderer8) => {
                          $$renderer8.option({ value: "user" }, ($$renderer9) => {
                            $$renderer9.push(`Utilizador`);
                          });
                          $$renderer8.option({ value: "manager" }, ($$renderer9) => {
                            $$renderer9.push(`Gestor`);
                          });
                          $$renderer8.option({ value: "admin" }, ($$renderer9) => {
                            $$renderer9.push(`Administrador (Empresa)`);
                          });
                        }
                      );
                      $$renderer7.push(`</div> `);
                      Dialog_footer($$renderer7, {
                        children: ($$renderer8) => {
                          Button($$renderer8, {
                            type: "button",
                            variant: "outline",
                            onclick: () => isCreateUserDialogOpen = false,
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Cancelar`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Button($$renderer8, {
                            type: "submit",
                            disabled: loading,
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Criar e Associar`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----></form>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "p-0",
            children: ($$renderer5) => {
              Table($$renderer5, {
                children: ($$renderer6) => {
                  Table_header($$renderer6, {
                    children: ($$renderer7) => {
                      Table_row($$renderer7, {
                        children: ($$renderer8) => {
                          Table_head($$renderer8, {
                            class: "pl-6",
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Nome`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Email`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Role`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Status`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Table_head($$renderer8, { class: "text-right pr-6" });
                          $$renderer8.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Table_body($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!--[-->`);
                      const each_array_2 = ensure_array_like(empresa().users);
                      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                        let user = each_array_2[$$index_2];
                        Table_row($$renderer7, {
                          children: ($$renderer8) => {
                            Table_cell($$renderer8, {
                              class: "font-medium pl-6",
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->${escape_html(user.name)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_cell($$renderer8, {
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->${escape_html(user.email)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_cell($$renderer8, {
                              children: ($$renderer9) => {
                                Badge($$renderer9, {
                                  variant: "outline",
                                  class: "font-mono text-xs",
                                  children: ($$renderer10) => {
                                    $$renderer10.push(`<!---->${escape_html(user.role)}`);
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_cell($$renderer8, {
                              children: ($$renderer9) => {
                                Badge($$renderer9, {
                                  variant: user.active ? "default" : "destructive",
                                  children: ($$renderer10) => {
                                    $$renderer10.push(`<!---->${escape_html(user.active ? "Ativo" : "Inativo")}`);
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!----> `);
                            Table_cell($$renderer8, {
                              class: "text-right pr-6",
                              children: ($$renderer9) => {
                                if (user.role !== "admin") {
                                  $$renderer9.push("<!--[-->");
                                  Button($$renderer9, {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "text-muted-foreground hover:text-destructive h-8 w-8",
                                    onclick: () => handleRemoveUser(user.id),
                                    children: ($$renderer10) => {
                                      X($$renderer10, { class: "w-4 h-4" });
                                    },
                                    $$slots: { default: true }
                                  });
                                } else {
                                  $$renderer9.push("<!--[!-->");
                                }
                                $$renderer9.push(`<!--]-->`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!---->`);
                          },
                          $$slots: { default: true }
                        });
                      }
                      $$renderer7.push(`<!--]--> `);
                      if (empresa().users.length === 0) {
                        $$renderer7.push("<!--[-->");
                        Table_row($$renderer7, {
                          children: ($$renderer8) => {
                            Table_cell($$renderer8, {
                              colspan: 5,
                              class: "text-center py-6 text-muted-foreground",
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->Nenhum utilizador associado à empresa.`);
                              },
                              $$slots: { default: true }
                            });
                          },
                          $$slots: { default: true }
                        });
                      } else {
                        $$renderer7.push("<!--[!-->");
                      }
                      $$renderer7.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "shadow-sm",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "border-b py-4 flex flex-row items-center justify-between space-y-0",
            children: ($$renderer5) => {
              $$renderer5.push(`<div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Histórico de Assinaturas`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Planos ativos e pagamentos efetuados`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> `);
              Root($$renderer5, {
                get open() {
                  return isCreateSubscriptionDialogOpen;
                },
                set open($$value) {
                  isCreateSubscriptionDialogOpen = $$value;
                  $$settled = false;
                },
                children: ($$renderer6) => {
                  Trigger($$renderer6, {
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        size: "sm",
                        variant: "outline",
                        children: ($$renderer8) => {
                          Plus($$renderer8, { class: "w-4 h-4 mr-2" });
                          $$renderer8.push(`<!----> Nova Assinatura`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Dialog_content($$renderer6, {
                    children: ($$renderer7) => {
                      Dialog_header($$renderer7, {
                        children: ($$renderer8) => {
                          Dialog_title($$renderer8, {
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Activação Manual de Assinatura`);
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <form class="space-y-4 py-4"><div class="grid grid-cols-2 gap-4"><div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "planType",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Tipo de Plano`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      $$renderer7.select(
                        {
                          id: "planType",
                          value: newSubscriptionForm.planType,
                          class: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        },
                        ($$renderer8) => {
                          $$renderer8.option({ value: "starter" }, ($$renderer9) => {
                            $$renderer9.push(`Starter`);
                          });
                          $$renderer8.option({ value: "professional" }, ($$renderer9) => {
                            $$renderer9.push(`Profissional`);
                          });
                          $$renderer8.option({ value: "premium" }, ($$renderer9) => {
                            $$renderer9.push(`Premium`);
                          });
                        }
                      );
                      $$renderer7.push(`</div> <div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "periodType",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Período`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      $$renderer7.select(
                        {
                          id: "periodType",
                          value: newSubscriptionForm.periodType,
                          class: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        },
                        ($$renderer8) => {
                          $$renderer8.option({ value: "mensal" }, ($$renderer9) => {
                            $$renderer9.push(`Mensal`);
                          });
                          $$renderer8.option({ value: "trimestral" }, ($$renderer9) => {
                            $$renderer9.push(`Trimestral`);
                          });
                          $$renderer8.option({ value: "semestral" }, ($$renderer9) => {
                            $$renderer9.push(`Semestral`);
                          });
                          $$renderer8.option({ value: "anual" }, ($$renderer9) => {
                            $$renderer9.push(`Anual`);
                          });
                        }
                      );
                      $$renderer7.push(`</div></div> <div class="grid grid-cols-2 gap-4"><div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "amount",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Valor Pago`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Input($$renderer7, {
                        type: "number",
                        id: "amount",
                        step: "0.01",
                        required: true,
                        get value() {
                          return newSubscriptionForm.amount;
                        },
                        set value($$value) {
                          newSubscriptionForm.amount = $$value;
                          $$settled = false;
                        }
                      });
                      $$renderer7.push(`<!----></div> <div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "durationMonths",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Duração (Meses)`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Input($$renderer7, {
                        type: "number",
                        id: "durationMonths",
                        min: "1",
                        required: true,
                        disabled: true,
                        get value() {
                          return newSubscriptionForm.durationMonths;
                        },
                        set value($$value) {
                          newSubscriptionForm.durationMonths = $$value;
                          $$settled = false;
                        }
                      });
                      $$renderer7.push(`<!----> <p class="text-[10px] text-muted-foreground italic">* Ajustado automaticamente pelo período</p></div></div> <div class="space-y-2">`);
                      Label($$renderer7, {
                        for: "startDate",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->Data de Início`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> `);
                      Input($$renderer7, {
                        type: "date",
                        id: "startDate",
                        required: true,
                        get value() {
                          return newSubscriptionForm.startDate;
                        },
                        set value($$value) {
                          newSubscriptionForm.startDate = $$value;
                          $$settled = false;
                        }
                      });
                      $$renderer7.push(`<!----></div> `);
                      Dialog_footer($$renderer7, {
                        children: ($$renderer8) => {
                          Button($$renderer8, {
                            type: "button",
                            variant: "outline",
                            onclick: () => isCreateSubscriptionDialogOpen = false,
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Cancelar`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!----> `);
                          Button($$renderer8, {
                            type: "submit",
                            disabled: loading,
                            children: ($$renderer9) => {
                              $$renderer9.push(`<!---->Activar Plano`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer8.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----></form>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "p-0",
            children: ($$renderer5) => {
              if (empresa().subscriptions.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex flex-col"><!--[-->`);
                const each_array_3 = ensure_array_like(empresa().subscriptions);
                for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
                  let sub = each_array_3[$$index_4];
                  $$renderer5.push(`<div class="p-6 border-b last:border-0 grid grid-cols-1 md:grid-cols-4 gap-6"><div class="col-span-1 space-y-2"><div class="flex items-center gap-2">`);
                  Badge($$renderer5, {
                    variant: sub.status === "ACTIVE" ? "default" : sub.status === "CANCELLED" || sub.status === "REJECTED" || sub.status === "EXPIRED" ? "destructive" : "secondary",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(sub.status === "ACTIVE" ? "Ativo" : sub.status === "CANCELLED" ? "Cancelado" : sub.status === "EXPIRED" ? "Expirado" : sub.status === "REJECTED" ? "Rejeitado" : sub.status)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> <span class="font-bold">${escape_html(sub.planType === "MONTHLY" || sub.planType === "basic" ? "Plano Mensal" : "Plano Anual")}</span></div> <p class="text-sm text-muted-foreground">Vencimento: <span class="font-medium text-foreground">${escape_html(sub.endDate ? format(new Date(sub.endDate), "dd/MM/yyyy") : "N/A")}</span></p> `);
                  if (sub.status === "ACTIVE" && sub.endDate) {
                    $$renderer5.push("<!--[-->");
                    const daysLeft = differenceInDays(new Date(sub.endDate), /* @__PURE__ */ new Date());
                    $$renderer5.push(`<p${attr_class(`text-xs font-medium ${stringify(daysLeft <= 5 ? "text-destructive" : "text-primary")}`)}>${escape_html(daysLeft)} dia(s) restante(s)</p>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--></div> <div class="col-span-3">`);
                  if (sub.payments && sub.payments.length > 0) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="rounded-md border bg-muted/20">`);
                    Table($$renderer5, {
                      children: ($$renderer6) => {
                        Table_header($$renderer6, {
                          children: ($$renderer7) => {
                            Table_row($$renderer7, {
                              children: ($$renderer8) => {
                                Table_head($$renderer8, {
                                  class: "text-xs",
                                  children: ($$renderer9) => {
                                    $$renderer9.push(`<!---->Data Pagamento`);
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer8.push(`<!----> `);
                                Table_head($$renderer8, {
                                  class: "text-xs",
                                  children: ($$renderer9) => {
                                    $$renderer9.push(`<!---->Valor`);
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer8.push(`<!----> `);
                                Table_head($$renderer8, {
                                  class: "text-xs text-right",
                                  children: ($$renderer9) => {
                                    $$renderer9.push(`<!---->Status`);
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer8.push(`<!---->`);
                              },
                              $$slots: { default: true }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!----> `);
                        Table_body($$renderer6, {
                          children: ($$renderer7) => {
                            $$renderer7.push(`<!--[-->`);
                            const each_array_4 = ensure_array_like(sub.payments);
                            for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
                              let payment = each_array_4[$$index_3];
                              Table_row($$renderer7, {
                                class: "h-10",
                                children: ($$renderer8) => {
                                  Table_cell($$renderer8, {
                                    class: "text-xs py-2",
                                    children: ($$renderer9) => {
                                      $$renderer9.push(`<!---->${escape_html(format(new Date(payment.createdAt), "dd/MM/yyyy HH:mm"))}`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer8.push(`<!----> `);
                                  Table_cell($$renderer8, {
                                    class: "text-xs py-2 font-medium",
                                    children: ($$renderer9) => {
                                      $$renderer9.push(`<!---->${escape_html(formatCurrency(payment.amount))}`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer8.push(`<!----> `);
                                  Table_cell($$renderer8, {
                                    class: "text-xs py-2 text-right",
                                    children: ($$renderer9) => {
                                      Badge($$renderer9, {
                                        variant: getStatusBadgeVariant(payment.status),
                                        class: "text-[10px] px-1 py-0 shadow-none",
                                        children: ($$renderer10) => {
                                          $$renderer10.push(`<!---->${escape_html(payment.status === "APPROVED" ? "Aprovado" : payment.status === "PENDING" ? "Pendente" : "Rejeitado")}`);
                                        },
                                        $$slots: { default: true }
                                      });
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer8.push(`<!---->`);
                                },
                                $$slots: { default: true }
                              });
                            }
                            $$renderer7.push(`<!--]-->`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----></div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push(`<p class="text-sm text-muted-foreground italic">Nenhum pagamento registado para esta assinatura.</p>`);
                  }
                  $$renderer5.push(`<!--]--></div></div>`);
                }
                $$renderer5.push(`<!--]--></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="p-8 text-center text-muted-foreground">Nenhuma assinatura encontrada para esta empresa.</div>`);
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div></div>`);
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
//# sourceMappingURL=_page.svelte-DFsMCLFg.js.map
