import { av as head, _ as derived, aw as attr, aB as stringify } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { z as formatDates, f as formatCurrency } from './utils3-DjmiJAAD.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { L as List_sale_items } from './list-sale-items-BBciauIs.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { F as File_check } from './file-check-CmnhUGqR.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { U as User } from './user-D18r-fvg.js';
import { R as Receipt } from './receipt-DYJGkjI7.js';
import { D as Dollar_sign } from './dollar-sign-oLGOq175.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './table-row-B-9FJQyf.js';
import './package-BKsm9DRA.js';
import './percent-DRPkZNWp.js';
import './tag-Z83dV6tm.js';
import './credit-card-BMaAHNh2.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    const venda = derived(() => data.venda);
    let mostrarDialogoConversao = false;
    let convertendo = false;
    function abrirDialogoConversao() {
      mostrarDialogoConversao = true;
    }
    function fecharDialogoConversao() {
      mostrarDialogoConversao = false;
    }
    head("3jdt0g", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Venda ${escape_html(venda().codigo)}</title>`);
      });
    });
    $$renderer2.push(`<div class="w-full p-4"><div class="mb-6 flex items-center justify-between"><div class="flex items-center gap-4">`);
    Button($$renderer2, {
      variant: "ghost",
      size: "sm",
      href: "/venda",
      children: ($$renderer3) => {
        Arrow_left($$renderer3, { class: "h-4 w-4" });
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div><h1 class="text-2xl font-bold">Detalhes da Venda</h1> <p class="text-sm text-muted-foreground">${escape_html(venda().codigo)}</p></div></div> <div class="flex gap-2">`);
    if (venda().status === "FINALIZADA") {
      $$renderer2.push("<!--[-->");
      Button($$renderer2, {
        onclick: abrirDialogoConversao,
        children: ($$renderer3) => {
          File_check($$renderer3, { class: "mr-2 h-4 w-4" });
          $$renderer3.push(`<!----> Emitir Fatura`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-1 gap-6 lg:grid-cols-3"><div class="space-y-6 lg:col-span-2">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                File_text($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Informações da Venda`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          class: "space-y-4",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="grid grid-cols-2 gap-4"><div><p class="text-sm text-muted-foreground">Código</p> <p class="font-semibold">${escape_html(venda().codigo)}</p></div> <div><p class="text-sm text-muted-foreground">Status</p> `);
            Badge($$renderer4, {
              variant: venda().status === "FINALIZADA" ? "default" : "secondary",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(venda().status)}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div> <div><p class="text-sm text-muted-foreground">Data</p> <p class="font-semibold">${escape_html(formatDates(venda().criadoEm))}</p></div> <div><p class="text-sm text-muted-foreground">Vendedor</p> <p class="font-semibold">${escape_html(venda().usuario?.name || "N/A")}</p></div></div> `);
            if (venda().observacao) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div><p class="text-sm text-muted-foreground">Observações</p> <p class="mt-1">${escape_html(venda().observacao)}</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    List_sale_items($$renderer2, { venda: venda() });
    $$renderer2.push(`<!----></div> <div class="space-y-6">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                User($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Cliente`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            if (venda().cliente) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="space-y-3"><div><p class="text-sm text-muted-foreground">Nome</p> <p class="font-semibold">${escape_html(venda().cliente.nome)}</p></div> `);
              if (venda().cliente.nif) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div><p class="text-sm text-muted-foreground">NIF</p> <p>${escape_html(venda().cliente.nif)}</p></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (venda().cliente.telefone) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div><p class="text-sm text-muted-foreground">Telefone</p> <p>${escape_html(venda().cliente.telefone)}</p></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (venda().cliente.email) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div><p class="text-sm text-muted-foreground">Email</p> <p class="text-sm">${escape_html(venda().cliente.email)}</p></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (venda().cliente.endereco) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div><p class="text-sm text-muted-foreground">Endereço</p> <p class="text-sm">${escape_html(venda().cliente.endereco)}</p></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`<p class="text-sm text-muted-foreground">Cliente não informado</p>`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    if (venda().facturaId) {
      $$renderer2.push("<!--[-->");
      Card($$renderer2, {
        children: ($$renderer3) => {
          Card_header($$renderer3, {
            children: ($$renderer4) => {
              Card_title($$renderer4, {
                class: "flex items-center gap-2",
                children: ($$renderer5) => {
                  Receipt($$renderer5, { class: "h-5 w-5" });
                  $$renderer5.push(`<!----> Detalhes da Factura`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Card_content($$renderer3, {
            children: ($$renderer4) => {
              if (venda().cliente) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="space-y-3"><div><p class="text-sm text-muted-foreground">Número</p> <p class="font-semibold"><a${attr("href", `/documentos/fiscais/${stringify(venda().facturaId)}`)}>${escape_html(venda().facturaRef)}</a></p></div></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<p class="text-sm text-muted-foreground">Cliente não informado</p>`);
              }
              $$renderer4.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "flex items-center gap-2",
              children: ($$renderer5) => {
                Dollar_sign($$renderer5, { class: "h-5 w-5" });
                $$renderer5.push(`<!----> Resumo`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          class: "space-y-3",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="flex items-center justify-between"><span class="text-sm text-muted-foreground">Total de Itens</span> <span class="font-semibold">${escape_html(venda().itens.length)}</span></div> <div class="flex items-center justify-between"><span class="text-sm text-muted-foreground">Quantidade Total</span> <span class="font-semibold">${escape_html(venda().itens.reduce((acc, item) => acc + item.quantidade, 0))}</span></div> `);
            Separator($$renderer4, {});
            $$renderer4.push(`<!----> <div class="flex items-center justify-between"><span class="text-sm font-medium">Valor Total</span> <span class="text-lg font-bold text-primary">${escape_html(formatCurrency(venda().total))}</span></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div> `);
    if (mostrarDialogoConversao) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg"><h2 class="mb-4 text-xl font-bold">Emitir Fatura</h2> <p class="mb-6 text-sm text-muted-foreground">Tem certeza que deseja emitir uma factura para esta venda? Esta ação criará uma nova fatura
				com os dados desta venda.</p> <form method="POST" action="?/emitirFatura"><div class="flex justify-end gap-2">`);
      Button($$renderer2, {
        type: "button",
        variant: "outline",
        onclick: fecharDialogoConversao,
        disabled: convertendo,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Cancelar`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        type: "submit",
        disabled: convertendo,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html("Confirmar")}`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></form></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-bGSGmtWD.js.map
