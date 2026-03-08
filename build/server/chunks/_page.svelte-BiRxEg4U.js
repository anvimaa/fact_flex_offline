import { av as head, _ as derived, ah as sanitize_props, ai as spread_props, ap as slot, aw as attr, aB as stringify } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { I as Icon } from './utils3-DjmiJAAD.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_footer } from './index8-VEsRSQHH.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { U as User } from './user-D18r-fvg.js';
import { M as Mail } from './mail-B-m3CooH.js';
import { G as Globe } from './globe-BbSquzP7.js';
import { P as Phone, M as Map_pin } from './phone-DEnZw48I.js';
import { P as Printer } from './printer-Byrp_rev.js';
import { C as Calendar } from './calendar-DG5mbrz5.js';
import { S as Square_pen } from './square-pen-DfZS8FUX.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './dialog-trigger-DAHFPuwQ.js';
import './dialog-overlay-B0LeiJFX.js';
import './context-BAmjzoO_.js';
import './noop-CfhljDhh.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './x-DpLJ1R1s.js';
import './dialog-content-d5prJdIN.js';
import './portal-ByHxxBCn.js';
import './dialog-description2-CD_E6-6J.js';

function Building($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      {
        "width": "16",
        "height": "20",
        "x": "4",
        "y": "2",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["path", { "d": "M9 22v-4h6v4" }],
    ["path", { "d": "M8 6h.01" }],
    ["path", { "d": "M16 6h.01" }],
    ["path", { "d": "M12 6h.01" }],
    ["path", { "d": "M12 10h.01" }],
    ["path", { "d": "M12 14h.01" }],
    ["path", { "d": "M16 10h.01" }],
    ["path", { "d": "M16 14h.01" }],
    ["path", { "d": "M8 10h.01" }],
    ["path", { "d": "M8 14h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "building" },
    $$sanitized_props,
    {
      /**
       * @component @name Building
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHg9IjQiIHk9IjIiIHJ4PSIyIiByeT0iMiIgLz4KICA8cGF0aCBkPSJNOSAyMnYtNGg2djQiIC8+CiAgPHBhdGggZD0iTTggNmguMDEiIC8+CiAgPHBhdGggZD0iTTE2IDZoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xMiA2aC4wMSIgLz4KICA8cGF0aCBkPSJNMTIgMTBoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xMiAxNGguMDEiIC8+CiAgPHBhdGggZD0iTTE2IDEwaC4wMSIgLz4KICA8cGF0aCBkPSJNMTYgMTRoLjAxIiAvPgogIDxwYXRoIGQ9Ik04IDEwaC4wMSIgLz4KICA8cGF0aCBkPSJNOCAxNGguMDEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/building
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
function Smartphone($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      {
        "width": "14",
        "height": "20",
        "x": "5",
        "y": "2",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["path", { "d": "M12 18h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "smartphone" },
    $$sanitized_props,
    {
      /**
       * @component @name Smartphone
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMjAiIHg9IjUiIHk9IjIiIHJ4PSIyIiByeT0iMiIgLz4KICA8cGF0aCBkPSJNMTIgMThoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/smartphone
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
    const cliente = derived(() => data.cliente);
    let isDeleting = false;
    let showDeleteDialog = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("ek0uj6", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(cliente().nome)} | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto max-w-6xl space-y-6 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "sm",
        href: "/cadastros/clientes",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">${escape_html(cliente().nome)}</h1> <div class="flex items-center gap-2 text-muted-foreground">`);
      if (cliente().tipo === "SINGULAR") {
        $$renderer3.push("<!--[-->");
        User($$renderer3, { class: "h-4 w-4" });
        $$renderer3.push(`<!----> <span>Cliente Singular</span>`);
      } else {
        $$renderer3.push("<!--[!-->");
        Building($$renderer3, { class: "h-4 w-4" });
        $$renderer3.push(`<!----> <span>Empresa</span>`);
      }
      $$renderer3.push(`<!--]--></div></div></div> `);
      Badge($$renderer3, {
        variant: "outline",
        class: "gap-2 px-3 py-1",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html(cliente().nif || "NIF Indefinido")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="grid gap-6 lg:grid-cols-3"><div class="space-y-6 lg:col-span-2">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  User($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Informações de Contato`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "grid gap-6 md:grid-cols-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-1"><div class="flex items-center gap-2 text-sm text-muted-foreground">`);
              Mail($$renderer5, { class: "h-4 w-4" });
              $$renderer5.push(`<!----> Email</div> <p class="font-medium">${escape_html(cliente().email || "Não informado")}</p></div> <div class="space-y-1"><div class="flex items-center gap-2 text-sm text-muted-foreground">`);
              Globe($$renderer5, { class: "h-4 w-4" });
              $$renderer5.push(`<!----> Website</div> <p class="font-medium">`);
              if (cliente().website) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<a${attr("href", cliente().website)} target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${escape_html(cliente().website)}</a>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`Não informado`);
              }
              $$renderer5.push(`<!--]--></p></div> <div class="space-y-1"><div class="flex items-center gap-2 text-sm text-muted-foreground">`);
              Phone($$renderer5, { class: "h-4 w-4" });
              $$renderer5.push(`<!----> Telefone</div> <p class="font-medium">${escape_html(cliente().telefone || "Não informado")}</p></div> <div class="space-y-1"><div class="flex items-center gap-2 text-sm text-muted-foreground">`);
              Smartphone($$renderer5, { class: "h-4 w-4" });
              $$renderer5.push(`<!----> Telemóvel</div> <p class="font-medium">${escape_html(cliente().telemovel || "Não informado")}</p></div> `);
              if (cliente().fax) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="space-y-1"><div class="flex items-center gap-2 text-sm text-muted-foreground">`);
                Printer($$renderer5, { class: "h-4 w-4" });
                $$renderer5.push(`<!----> Fax</div> <p class="font-medium">${escape_html(cliente().fax)}</p></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
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
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Map_pin($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Endereço`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-1"><p class="text-sm font-medium text-muted-foreground">Endereço Completo</p> <p class="text-lg">${escape_html(cliente().endereco || "Não informado")}</p></div> `);
              Separator($$renderer5, {});
              $$renderer5.push(`<!----> <div class="grid gap-6 md:grid-cols-3"><div class="space-y-1"><p class="text-sm font-medium text-muted-foreground">Cidade</p> <p class="font-medium">${escape_html(cliente().cidade || "Não informado")}</p></div> <div class="space-y-1"><p class="text-sm font-medium text-muted-foreground">País</p> <p class="font-medium">${escape_html(cliente().pais || "Não informado")}</p></div> <div class="space-y-1"><p class="text-sm font-medium text-muted-foreground">Caixa Postal</p> <p class="font-medium">${escape_html(cliente().caixaPostal || "Não informado")}</p></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Calendar($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Datas e Auditoria`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="grid gap-6 md:grid-cols-2"><div class="space-y-1"><p class="text-sm text-muted-foreground">Data de Criação</p> <p class="font-medium">${escape_html(new Date(cliente().createdAt).toLocaleDateString("pt-AO", { day: "2-digit", month: "long", year: "numeric" }))}</p></div> <div class="space-y-1"><p class="text-sm text-muted-foreground">Última Atualização</p> <p class="font-medium">${escape_html(new Date(cliente().updatedAt).toLocaleDateString("pt-AO", { day: "2-digit", month: "long", year: "numeric" }))}</p></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-6">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Ações`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-3",
            children: ($$renderer5) => {
              Button($$renderer5, {
                href: `/cadastros/clientes/editar/${stringify(cliente().id)}`,
                class: "w-full",
                children: ($$renderer6) => {
                  Square_pen($$renderer6, { class: "mr-2 h-4 w-4" });
                  $$renderer6.push(`<!----> Editar Cliente`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Separator($$renderer5, {});
              $$renderer5.push(`<!----> `);
              if (data.canDelete) {
                $$renderer5.push("<!--[-->");
                if (Root) {
                  $$renderer5.push("<!--[-->");
                  Root($$renderer5, {
                    get open() {
                      return showDeleteDialog;
                    },
                    set open($$value) {
                      showDeleteDialog = $$value;
                      $$settled = false;
                    },
                    children: ($$renderer6) => {
                      Button($$renderer6, {
                        variant: "destructive",
                        class: "w-full",
                        onclick: () => showDeleteDialog = true,
                        children: ($$renderer7) => {
                          Trash_2($$renderer7, { class: "mr-2 h-4 w-4" });
                          $$renderer7.push(`<!----> Excluir Cliente`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> `);
                      if (Dialog_content) {
                        $$renderer6.push("<!--[-->");
                        Dialog_content($$renderer6, {
                          children: ($$renderer7) => {
                            if (Dialog_header) {
                              $$renderer7.push("<!--[-->");
                              Dialog_header($$renderer7, {
                                children: ($$renderer8) => {
                                  if (Dialog_title) {
                                    $$renderer8.push("<!--[-->");
                                    Dialog_title($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Você tem certeza?`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer8.push("<!--]-->");
                                  } else {
                                    $$renderer8.push("<!--[!-->");
                                    $$renderer8.push("<!--]-->");
                                  }
                                  $$renderer8.push(` `);
                                  if (Dialog_description) {
                                    $$renderer8.push("<!--[-->");
                                    Dialog_description($$renderer8, {
                                      children: ($$renderer9) => {
                                        $$renderer9.push(`<!---->Esta ação não pode ser desfeita. Isso excluirá permanentemente o cliente <span class="font-medium text-foreground">${escape_html(cliente().nome)}</span> e todos os seus dados do sistema.`);
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
                            $$renderer7.push(` `);
                            if (Dialog_footer) {
                              $$renderer7.push("<!--[-->");
                              Dialog_footer($$renderer7, {
                                children: ($$renderer8) => {
                                  Button($$renderer8, {
                                    variant: "outline",
                                    onclick: () => showDeleteDialog = false,
                                    children: ($$renderer9) => {
                                      $$renderer9.push(`<!---->Cancelar`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer8.push(`<!----> <form method="POST" action="?/delete">`);
                                  Button($$renderer8, {
                                    type: "submit",
                                    variant: "destructive",
                                    disabled: isDeleting,
                                    children: ($$renderer9) => {
                                      $$renderer9.push(`<!---->${escape_html("Confirmar Exclusão")}`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer8.push(`<!----></form>`);
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
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="rounded-md bg-muted p-3 text-center text-sm text-muted-foreground">Este cliente não pode ser excluído pois possui faturas, vendas ou documentos fiscais
							associados.</div>`);
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
//# sourceMappingURL=_page.svelte-BiRxEg4U.js.map
