import { av as head, aw as attr, an as ensure_array_like, _ as derived } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { C as Card_footer } from './card-footer-DiKIAxQs.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { f as formatCurrency } from './utils3-DjmiJAAD.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { R as Receipt } from './receipt-DYJGkjI7.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import './index-r8oPdwp5.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './public-B844qK3e.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './chevrons-up-down-CTdYsjBi.js';
import './check-cM-2r8Wr.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let clienteId = "";
    let moeda = "AOA";
    let itens = [{ descricao: "", quantidade: 1, precoUnitario: 0, taxa: 14 }];
    let totais = derived(() => {
      let subtotal = 0;
      let impostos = 0;
      itens.forEach((item) => {
        const base = item.quantidade * item.precoUnitario;
        subtotal += base;
        impostos += base * (item.taxa / 100);
      });
      return { subtotal, impostos, total: subtotal + impostos };
    });
    function adicionarItem() {
      itens = [
        ...itens,
        { descricao: "", quantidade: 1, precoUnitario: 0, taxa: 14 }
      ];
    }
    function removerItem(index) {
      if (itens.length > 1) {
        itens = itens.filter((_, i) => i !== index);
      }
    }
    function selecionarProduto(index, produtoId) {
      const produto = data.produtos.find((p) => p.id === produtoId);
      if (produto) {
        itens[index] = {
          produtoId: produto.id,
          descricao: produto.descricao,
          quantidade: 1,
          precoUnitario: produto.precoUnitario.toNumber(),
          taxa: produto.taxa?.valor.toNumber() || 14
        };
      }
    }
    const clienteItems = derived(() => data.clientes.map((c) => ({ value: c.id, label: c.nome, nif: c.nif })));
    const produtoItems = derived(() => data.produtos.map((p) => ({
      value: p.id,
      label: `${p.codigo} - ${p.descricao}`,
      preco: p.precoUnitario
    })));
    function podeEmitir() {
      return itens.length > 0 && itens.every((i) => i.descricao && i.quantidade > 0 && i.precoUnitario > 0);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("mlrm67", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Fatura Simplificada | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="mx-auto max-w-3xl py-6"><form method="POST" action="?/emitir"><input type="hidden" name="clienteId"${attr("value", clienteId)}/> <input type="hidden" name="moeda"${attr("value", moeda)}/> <input type="hidden" name="itens"${attr("value", JSON.stringify(itens))}/> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            class: "pb-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">`);
              Receipt($$renderer5, { class: "h-5 w-5 text-primary" });
              $$renderer5.push(`<!----></div> <div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Fatura Simplificada`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Venda rápida ao consumidor final`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "space-y-6",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cliente (Opcional)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Combobox_1($$renderer5, {
                items: clienteItems(),
                placeholder: "Consumidor Final",
                emptyText: "Deixe vazio para Consumidor Final",
                get value() {
                  return clienteId;
                },
                set value($$value) {
                  clienteId = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <p class="text-xs text-muted-foreground">Se vazio, será emitido para "Consumidor Final"</p></div> <div class="space-y-2">`);
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
              $$renderer5.push(`<!----> <div class="space-y-4"><div class="flex items-center justify-between">`);
              Label($$renderer5, {
                class: "text-base font-semibold",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Itens`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                type: "button",
                variant: "outline",
                size: "sm",
                onclick: adicionarItem,
                children: ($$renderer6) => {
                  Plus($$renderer6, { class: "mr-1 h-4 w-4" });
                  $$renderer6.push(`<!----> Adicionar`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-3"><!--[-->`);
              const each_array = ensure_array_like(itens);
              for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                let item = each_array[i];
                $$renderer5.push(`<div class="group relative grid gap-3 rounded-lg border bg-muted/20 p-4 md:grid-cols-12"><div class="space-y-1 md:col-span-5">`);
                Label($$renderer5, {
                  class: "text-xs",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Produto/Descrição`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Combobox_1($$renderer5, {
                  items: produtoItems(),
                  value: item.produtoId,
                  onSelect: (val) => selecionarProduto(i, val),
                  placeholder: "Selecionar produto...",
                  emptyText: "Produto não encontrado"
                });
                $$renderer5.push(`<!----></div> <div class="space-y-1 md:col-span-2">`);
                Label($$renderer5, {
                  class: "text-xs",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Qtd`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "number",
                  min: "1",
                  get value() {
                    return item.quantidade;
                  },
                  set value($$value) {
                    item.quantidade = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-1 md:col-span-2">`);
                Label($$renderer5, {
                  class: "text-xs",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Preço`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "number",
                  min: "0",
                  step: "0.01",
                  get value() {
                    return item.precoUnitario;
                  },
                  set value($$value) {
                    item.precoUnitario = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-1 md:col-span-2">`);
                Label($$renderer5, {
                  class: "text-xs",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->IVA %`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                $$renderer5.select(
                  {
                    value: item.taxa,
                    class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  },
                  ($$renderer6) => {
                    $$renderer6.option({ value: 14 }, ($$renderer7) => {
                      $$renderer7.push(`14%`);
                    });
                    $$renderer6.option({ value: 5 }, ($$renderer7) => {
                      $$renderer7.push(`5%`);
                    });
                    $$renderer6.option({ value: 0 }, ($$renderer7) => {
                      $$renderer7.push(`Isento`);
                    });
                  }
                );
                $$renderer5.push(`</div> <div class="flex items-end md:col-span-1">`);
                Button($$renderer5, {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  class: "text-destructive",
                  onclick: () => removerItem(i),
                  disabled: itens.length === 1,
                  children: ($$renderer6) => {
                    Trash_2($$renderer6, { class: "h-4 w-4" });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div>`);
              }
              $$renderer5.push(`<!--]--></div></div> `);
              Separator($$renderer5, {});
              $$renderer5.push(`<!----> <div class="flex justify-end"><div class="w-full space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-4 md:w-1/2"><div class="flex justify-between text-sm"><span>Subtotal</span> <span>${escape_html(formatCurrency(totais().subtotal))}</span></div> <div class="flex justify-between text-sm text-muted-foreground"><span>IVA</span> <span>+${escape_html(formatCurrency(totais().impostos))}</span></div> `);
              Separator($$renderer5, { class: "my-2" });
              $$renderer5.push(`<!----> <div class="flex justify-between text-xl font-bold text-primary"><span>Total</span> <span>${escape_html(formatCurrency(totais().total))}</span></div></div></div>`);
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
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cancelar`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                type: "submit",
                disabled: !podeEmitir(),
                children: ($$renderer6) => {
                  {
                    $$renderer6.push("<!--[!-->");
                    Receipt($$renderer6, { class: "mr-2 h-4 w-4" });
                    $$renderer6.push(`<!----> Emitir Fatura`);
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
      $$renderer3.push(`<!----></form></div>`);
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
//# sourceMappingURL=_page.svelte-BJs9_-YC.js.map
