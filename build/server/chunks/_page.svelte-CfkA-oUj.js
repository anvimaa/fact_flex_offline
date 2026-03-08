import { av as head, aw as attr, _ as derived } from './index-DPRpZFUH.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { m as Circle_alert, f as formatCurrency } from './utils3-DjmiJAAD.js';
import { L as Label } from './label-DVXSUDZH.js';
import { I as Input } from './input-XVWEGj5m.js';
import { T as Textarea } from './textarea-BSIF_PfD.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { C as Calendar } from './calendar-DG5mbrz5.js';
import { C as Credit_card } from './credit-card-BMaAHNh2.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './attrs-mduo83PF.js';
import './chevrons-up-down-CTdYsjBi.js';
import './plus-C65zNy9m.js';
import './check-cM-2r8Wr.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const facturas = derived(() => data.facturas);
    const facturaSelecionada = derived(() => data.facturaSelecionada);
    let facturaId = derived(() => data.facturaSelecionada?.id || "");
    let valorPago = derived(() => data.facturaSelecionada?.saldo || 0);
    let retencao = 0;
    let dataPagamento = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let formaPagamento = "";
    let observacao = "";
    const facturasItems = derived(() => facturas().map((f) => ({
      value: f.id,
      label: `${f.numero} - ${f.cliente?.nome || "Sem cliente"} - Saldo: ${formatCurrency(f.saldo)}`
    })));
    function selecionarFactura() {
      if (facturaId()) {
        goto(`/documentos/recibos/nova?factura=${facturaId()}`);
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1ym7pkw", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Recibos | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto max-w-4xl space-y-6 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "sm",
        onclick: () => history.back(),
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">Emitir Recibo</h1> <p class="text-muted-foreground">Registar pagamento de factura</p></div></div></div> `);
      if (!facturaSelecionada()) {
        $$renderer3.push("<!--[-->");
        Card($$renderer3, {
          children: ($$renderer4) => {
            Card_header($$renderer4, {
              children: ($$renderer5) => {
                Card_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Selecionar Factura`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Card_description($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Escolha a factura para a qual deseja emitir recibo`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_content($$renderer4, {
              class: "space-y-4",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  for: "factura",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Factura *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Combobox_1($$renderer5, {
                  items: facturasItems(),
                  placeholder: "Selecione uma factura...",
                  onSelect: selecionarFactura,
                  get value() {
                    return facturaId();
                  },
                  set value($$value) {
                    facturaId($$value);
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> `);
                if (facturas().length === 0) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950/20"><div class="flex gap-2">`);
                  Circle_alert($$renderer5, { class: "h-5 w-5 text-yellow-600 dark:text-yellow-400" });
                  $$renderer5.push(`<!----> <div class="text-sm text-yellow-700 dark:text-yellow-300"><p class="font-semibold">Nenhuma factura disponível</p> <p class="mt-1">Não há facturas emitidas que possam gerar notas de crédito no momento.</p></div></div></div>`);
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
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<form method="POST" action="?/emitir"><input type="hidden" name="facturaId"${attr("value", facturaSelecionada().id)}/> <div class="grid gap-6 md:grid-cols-2">`);
        Card($$renderer3, {
          class: "md:col-span-2",
          children: ($$renderer4) => {
            Card_header($$renderer4, {
              children: ($$renderer5) => {
                Card_title($$renderer5, {
                  class: "flex items-center gap-2",
                  children: ($$renderer6) => {
                    File_text($$renderer6, { class: "h-5 w-5" });
                    $$renderer6.push(`<!----> Factura Original`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Card_description($$renderer5, {
                  children: ($$renderer6) => {
                    Button($$renderer6, {
                      variant: "link",
                      class: "h-auto p-0",
                      href: "/documentos/recibos/nova",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Alterar factura`);
                      },
                      $$slots: { default: true }
                    });
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
                $$renderer5.push(`<div class="grid gap-4 sm:grid-cols-4"><div><p class="text-sm text-muted-foreground">Número</p> <p class="font-medium">${escape_html(facturaSelecionada().numero)}</p></div> <div><p class="text-sm text-muted-foreground">Cliente</p> <p class="font-medium">${escape_html(facturaSelecionada().cliente?.nome || "-")}</p></div> <div><p class="text-sm text-muted-foreground">Total da Factura</p> <p class="font-medium">${escape_html(formatCurrency(facturaSelecionada().total))}</p></div> <div><p class="text-sm text-muted-foreground">Saldo Devedor</p> <p class="font-bold text-red-600 dark:text-red-400">${escape_html(formatCurrency(facturaSelecionada().saldo))}</p></div></div>`);
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
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Pagamento`);
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
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  for: "valorPago",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Valor a Pagar *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="relative"><span class="absolute left-3 top-2.5 text-muted-foreground">Kz</span> `);
                Input($$renderer5, {
                  id: "valorPago",
                  name: "valorPago",
                  type: "number",
                  step: "0.01",
                  min: "0.01",
                  max: facturaSelecionada().saldo,
                  class: "pl-9 font-semibold",
                  required: true,
                  get value() {
                    return valorPago();
                  },
                  set value($$value) {
                    valorPago($$value);
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <p class="text-xs text-muted-foreground">Máximo: ${escape_html(formatCurrency(facturaSelecionada().saldo))}</p></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: "dataPagamento",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Data do Pagamento *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="relative">`);
                Calendar($$renderer5, {
                  class: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "dataPagamento",
                  name: "dataPagamento",
                  type: "date",
                  class: "pl-9",
                  required: true,
                  get value() {
                    return dataPagamento;
                  },
                  set value($$value) {
                    dataPagamento = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: "formaPagamento",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Forma de Pagamento *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                $$renderer5.select(
                  {
                    id: "formaPagamento",
                    name: "formaPagamento",
                    value: formaPagamento,
                    class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    required: true
                  },
                  ($$renderer6) => {
                    $$renderer6.option({ value: "" }, ($$renderer7) => {
                      $$renderer7.push(`Selecione...`);
                    });
                    $$renderer6.option({ value: "NU" }, ($$renderer7) => {
                      $$renderer7.push(`Numerário`);
                    });
                    $$renderer6.option({ value: "CC" }, ($$renderer7) => {
                      $$renderer7.push(`Multicaixa`);
                    });
                    $$renderer6.option({ value: "TB" }, ($$renderer7) => {
                      $$renderer7.push(`Transferência Bancária`);
                    });
                    $$renderer6.option({ value: "CH" }, ($$renderer7) => {
                      $$renderer7.push(`Cheque`);
                    });
                    $$renderer6.option({ value: "OU" }, ($$renderer7) => {
                      $$renderer7.push(`Outro`);
                    });
                  }
                );
                $$renderer5.push(`</div>`);
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
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Detalhes Adicionais`);
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
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  for: "retencao",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Retenção na Fonte (opcional)`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="relative"><span class="absolute left-3 top-2.5 text-muted-foreground">Kz</span> `);
                Input($$renderer5, {
                  id: "retencao",
                  name: "retencao",
                  type: "number",
                  step: "0.01",
                  min: "0",
                  class: "pl-9",
                  get value() {
                    return retencao;
                  },
                  set value($$value) {
                    retencao = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: "observacao",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Observações`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Textarea($$renderer5, {
                  id: "observacao",
                  name: "observacao",
                  placeholder: "Ex: Referência do comprovativo...",
                  rows: 4,
                  get value() {
                    return observacao;
                  },
                  set value($$value) {
                    observacao = $$value;
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
        $$renderer3.push(`<!----></div> <div class="mt-6 flex justify-end gap-2">`);
        Button($$renderer3, {
          type: "button",
          variant: "outline",
          href: "/documentos/recibos",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cancelar`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          type: "submit",
          disabled: !formaPagamento,
          children: ($$renderer4) => {
            Credit_card($$renderer4, { class: "mr-2 h-4 w-4" });
            $$renderer4.push(`<!----> ${escape_html("Emitir Recibo")}`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></form>`);
      }
      $$renderer3.push(`<!--]--></div>`);
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
//# sourceMappingURL=_page.svelte-CfkA-oUj.js.map
