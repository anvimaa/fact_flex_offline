import { av as head, aw as attr, _ as derived, an as ensure_array_like } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { b as Card_content, C as Card_header, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { C as Card_footer } from './card-footer-DiKIAxQs.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { T as Textarea } from './textarea-BSIF_PfD.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { m as Circle_alert, f as formatCurrency } from './utils3-DjmiJAAD.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { C as Check } from './check-cM-2r8Wr.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './public-B844qK3e.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let dataEmissao = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let dataVencimento = new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 30)).toISOString().split("T")[0];
    let moeda = "AOA";
    let observacao = "";
    let loading = false;
    const initialData = derived(() => data.initialData);
    const itensConsolidados = derived(() => initialData()?.itensConsolidados || []);
    const referenciasOrigem = derived(() => initialData()?.refs || "");
    const periodoInicio = derived(() => initialData()?.start || dataEmissao);
    const periodoFim = derived(() => initialData()?.end || dataEmissao);
    const clienteId = derived(() => initialData()?.clienteId || "");
    const clienteSelecionado = derived(() => initialData()?.clienteSelecionado);
    let totais = derived(() => () => {
      let subtotal = 0;
      let impostos = 0;
      itensConsolidados().forEach((item) => {
        subtotal += item.valorTotal;
        impostos += item.valorTotal * (item.taxa / 100);
      });
      return { subtotal, impostos, total: subtotal + impostos };
    });
    const temDadosSelecao = derived(() => itensConsolidados().length > 0 && !!clienteId());
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("w5v7gm", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Emitir Fatura Global | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="mx-auto max-w-3xl py-8">`);
      if (!temDadosSelecao()) {
        $$renderer3.push("<!--[-->");
        Card($$renderer3, {
          class: "border-amber-500",
          children: ($$renderer4) => {
            Card_content($$renderer4, {
              class: "flex items-center gap-4 py-6",
              children: ($$renderer5) => {
                Circle_alert($$renderer5, { class: "h-8 w-8 text-amber-500" });
                $$renderer5.push(`<!----> <div><p class="font-semibold">Seleção Necessária</p> <p class="text-sm text-muted-foreground">Para emitir uma Fatura Global, primeiro selecione os documentos a consolidar.</p></div> `);
                Button($$renderer5, {
                  onclick: () => goto(),
                  class: "ml-auto",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Ir para Seleção`);
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
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<form method="POST" action="?/emitir"><input type="hidden" name="clienteId"${attr("value", clienteId())}/> <input type="hidden" name="periodoInicio"${attr("value", periodoInicio())}/> <input type="hidden" name="periodoFim"${attr("value", periodoFim())}/> <input type="hidden" name="referenciasOrigem"${attr("value", referenciasOrigem())}/> <input type="hidden" name="itens"${attr("value", JSON.stringify(itensConsolidados()))}/> `);
        Card($$renderer3, {
          children: ($$renderer4) => {
            Card_header($$renderer4, {
              children: ($$renderer5) => {
                Card_title($$renderer5, {
                  class: "flex items-center gap-2",
                  children: ($$renderer6) => {
                    File_text($$renderer6, { class: "h-5 w-5" });
                    $$renderer6.push(`<!----> Emitir Fatura Global`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Card_description($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Confirme os dados da consolidação antes de emitir.`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_content($$renderer4, {
              class: "space-y-6",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="rounded-lg bg-muted/50 p-4"><div class="grid gap-4 md:grid-cols-2"><div>`);
                Label($$renderer5, {
                  class: "text-xs text-muted-foreground",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Cliente`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <p class="font-semibold">${escape_html(clienteSelecionado()?.nome || "N/A")}</p> <p class="text-sm text-muted-foreground">NIF: ${escape_html(clienteSelecionado()?.nif || "N/A")}</p></div> <div>`);
                Label($$renderer5, {
                  class: "text-xs text-muted-foreground",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Período Consolidado`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <p class="font-semibold">${escape_html(new Date(periodoInicio()).toLocaleDateString())} a 
									${escape_html(new Date(periodoFim()).toLocaleDateString())}</p></div></div></div> `);
                Separator($$renderer5, {});
                $$renderer5.push(`<!----> <div class="grid gap-4 md:grid-cols-3"><div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Data de Emissão *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "date",
                  name: "dataEmissao",
                  get value() {
                    return dataEmissao;
                  },
                  set value($$value) {
                    dataEmissao = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Data de Vencimento *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "date",
                  name: "dataVencimento",
                  get value() {
                    return dataVencimento;
                  },
                  set value($$value) {
                    dataVencimento = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Moeda`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                $$renderer5.select(
                  {
                    value: moeda,
                    name: "moeda",
                    class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  },
                  ($$renderer6) => {
                    $$renderer6.option({ value: "AOA" }, ($$renderer7) => {
                      $$renderer7.push(`Kwanza (AOA)`);
                    });
                    $$renderer6.option({ value: "USD" }, ($$renderer7) => {
                      $$renderer7.push(`Dólar (USD)`);
                    });
                    $$renderer6.option({ value: "EUR" }, ($$renderer7) => {
                      $$renderer7.push(`Euro (EUR)`);
                    });
                  }
                );
                $$renderer5.push(`</div></div> `);
                Separator($$renderer5, {});
                $$renderer5.push(`<!----> <div class="space-y-4"><h3 class="font-semibold">Itens Consolidados por Taxa</h3> <div class="overflow-hidden rounded-lg border"><table class="w-full text-sm"><thead class="bg-muted"><tr><th class="p-3 text-left">Descrição</th><th class="p-3 text-right">Taxa</th><th class="p-3 text-right">Base</th><th class="p-3 text-right">IVA</th><th class="p-3 text-right">Total</th></tr></thead><tbody><!--[-->`);
                const each_array = ensure_array_like(itensConsolidados());
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let item = each_array[$$index];
                  $$renderer5.push(`<tr class="border-t"><td class="p-3">${escape_html(item.descricao)}</td><td class="p-3 text-right">${escape_html(item.taxa)}%</td><td class="p-3 text-right">${escape_html(formatCurrency(item.valorTotal))}</td><td class="p-3 text-right">${escape_html(formatCurrency(item.valorTotal * (item.taxa / 100)))}</td><td class="p-3 text-right font-medium">${escape_html(formatCurrency(item.valorTotal * (1 + item.taxa / 100)))}</td></tr>`);
                }
                $$renderer5.push(`<!--]--></tbody><tfoot class="border-t bg-muted/50"><tr><td colspan="2" class="p-3 font-semibold">TOTAIS</td><td class="p-3 text-right font-semibold">${escape_html(formatCurrency(totais()().subtotal))}</td><td class="p-3 text-right font-semibold">${escape_html(formatCurrency(totais()().impostos))}</td><td class="p-3 text-right text-lg font-bold text-primary">${escape_html(formatCurrency(totais()().total))}</td></tr></tfoot></table></div></div> `);
                Separator($$renderer5, {});
                $$renderer5.push(`<!----> <div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Referências aos Documentos de Origem`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="rounded-md border bg-muted/30 p-3 text-sm">${escape_html(referenciasOrigem() || "Nenhuma referência")}</div></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Observações Adicionais`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Textarea($$renderer5, {
                  name: "observacao",
                  placeholder: "Informações adicionais para o documento...",
                  rows: 3,
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
            $$renderer4.push(`<!----> `);
            Card_footer($$renderer4, {
              class: "flex justify-between border-t pt-6",
              children: ($$renderer5) => {
                Button($$renderer5, {
                  type: "button",
                  variant: "outline",
                  onclick: () => goto(),
                  disabled: loading,
                  children: ($$renderer6) => {
                    Arrow_left($$renderer6, { class: "mr-2 h-4 w-4" });
                    $$renderer6.push(`<!----> Voltar à Seleção`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  type: "submit",
                  disabled: loading,
                  children: ($$renderer6) => {
                    {
                      $$renderer6.push("<!--[!-->");
                      Check($$renderer6, { class: "mr-2 h-4 w-4" });
                      $$renderer6.push(`<!----> Emitir Fatura Global`);
                    }
                    $$renderer6.push(`<!--]-->`);
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
        $$renderer3.push(`<!----></form>`);
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
//# sourceMappingURL=_page.svelte-DLOAq33J.js.map
