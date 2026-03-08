import { av as head, aw as attr, an as ensure_array_like, aB as stringify, _ as derived } from './index-DPRpZFUH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { f as formatCurrency } from './utils3-DjmiJAAD.js';
import { L as Label } from './label-DVXSUDZH.js';
import { I as Input } from './input-XVWEGj5m.js';
import { T as Textarea } from './textarea-BSIF_PfD.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import './events-GtUqDgmb.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './index2-Cz2gv4fD.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    const clientes = derived(() => data.clientes), facturas = derived(() => data.facturas);
    let clienteId = "";
    let facturaId = "";
    let motivo = "";
    let observacao = "";
    let itens = [
      {
        codigo: "",
        descricao: "",
        quantidade: 1,
        precoUnitario: 0,
        unidade: "UN"
      }
    ];
    function adicionarItem() {
      itens.push({
        codigo: "",
        descricao: "",
        quantidade: 1,
        precoUnitario: 0,
        unidade: "UN"
      });
      itens = itens;
    }
    function removerItem(index) {
      itens.splice(index, 1);
      itens = itens;
    }
    function calcularTotal(item) {
      return item.quantidade * item.precoUnitario;
    }
    let totalGeral = derived(() => itens.reduce((sum, item) => sum + calcularTotal(item), 0));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("o424d2", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Notas de Débito | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto max-w-4xl space-y-6 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "sm",
        href: "/documentos/fiscais",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">Nova Nota de Débito</h1> <p class="text-muted-foreground">Emitir nota de débito para cobranças adicionais</p></div></div></div> <form method="POST" action="?/emitir"><input type="hidden" name="itens"${attr("value", JSON.stringify(itens))}/> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Informações Básicas`);
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
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
              Label($$renderer5, {
                for: "cliente",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cliente *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "cliente",
                  name: "clienteId",
                  value: clienteId,
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  required: true
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Selecione um cliente...`);
                  });
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(clientes());
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let cliente = each_array[$$index];
                    $$renderer6.option({ value: cliente.id }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(cliente.nome)}`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(`</div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "factura",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Factura (Opcional)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "factura",
                  name: "facturaId",
                  value: facturaId,
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Sem vínculo...`);
                  });
                  $$renderer6.push(`<!--[-->`);
                  const each_array_1 = ensure_array_like(facturas());
                  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                    let factura = each_array_1[$$index_1];
                    $$renderer6.option({ value: factura.id }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(factura.numero)} - ${escape_html(formatCurrency(factura.total))}`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(`</div></div>`);
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
              $$renderer5.push(`<div class="flex items-center justify-between"><div>`);
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Itens`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Adicione os itens da nota de débito (sem imposto)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> `);
              Button($$renderer5, {
                type: "button",
                variant: "outline",
                size: "sm",
                onclick: adicionarItem,
                children: ($$renderer6) => {
                  Plus($$renderer6, { class: "mr-2 h-4 w-4" });
                  $$renderer6.push(`<!----> Adicionar Item`);
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
              $$renderer5.push(`<!--[-->`);
              const each_array_2 = ensure_array_like(itens);
              for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
                let item = each_array_2[index];
                $$renderer5.push(`<div class="rounded-lg border p-4"><div class="mb-4 flex items-center justify-between"><h4 class="font-medium">Item ${escape_html(index + 1)}</h4> `);
                if (itens.length > 1) {
                  $$renderer5.push("<!--[-->");
                  Button($$renderer5, {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onclick: () => removerItem(index),
                    children: ($$renderer6) => {
                      Trash_2($$renderer6, { class: "h-4 w-4 text-destructive" });
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div> <div class="grid gap-4 md:grid-cols-2"><div class="space-y-2">`);
                Label($$renderer5, {
                  for: `codigo-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Código *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `codigo-${stringify(index)}`,
                  placeholder: "Ex: JUROS-001",
                  required: true,
                  get value() {
                    return item.codigo;
                  },
                  set value($$value) {
                    item.codigo = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: `unidade-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Unidade`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `unidade-${stringify(index)}`,
                  placeholder: "UN",
                  get value() {
                    return item.unidade;
                  },
                  set value($$value) {
                    item.unidade = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="col-span-2 space-y-2">`);
                Label($$renderer5, {
                  for: `descricao-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Descrição *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `descricao-${stringify(index)}`,
                  placeholder: "Ex: Juros de mora - atraso de 30 dias",
                  required: true,
                  get value() {
                    return item.descricao;
                  },
                  set value($$value) {
                    item.descricao = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: `quantidade-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Quantidade *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `quantidade-${stringify(index)}`,
                  type: "number",
                  min: "1",
                  step: "0.01",
                  required: true,
                  get value() {
                    return item.quantidade;
                  },
                  set value($$value) {
                    item.quantidade = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: `preco-${stringify(index)}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Preço Unitário *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: `preco-${stringify(index)}`,
                  type: "number",
                  min: "0",
                  step: "0.01",
                  required: true,
                  get value() {
                    return item.precoUnitario;
                  },
                  set value($$value) {
                    item.precoUnitario = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div></div> <div class="mt-4 flex justify-end"><div class="text-right"><p class="text-sm text-muted-foreground">Total do Item</p> <p class="text-lg font-bold">${escape_html(formatCurrency(calcularTotal(item)))}</p></div></div></div>`);
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
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Motivo e Observações`);
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
                for: "motivo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Motivo *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Textarea($$renderer5, {
                id: "motivo",
                name: "motivo",
                placeholder: "Ex: Juros de mora, Multa por atraso, Taxa administrativa...",
                rows: 3,
                required: true,
                get value() {
                  return motivo;
                },
                set value($$value) {
                  motivo = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
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
                placeholder: "Informações adicionais (opcional)",
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
                  $$renderer6.push(`<!---->Resumo`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-muted-foreground">Itens:</span> <span class="font-medium">${escape_html(itens.length)}</span></div> `);
              Separator($$renderer5, {});
              $$renderer5.push(`<!----> <div class="flex justify-between text-lg"><span class="font-bold">Total (sem imposto):</span> <span class="font-bold text-primary">${escape_html(formatCurrency(totalGeral()))}</span></div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="flex justify-end gap-2">`);
      Button($$renderer3, {
        type: "button",
        variant: "outline",
        href: "/documentos/fiscais",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancelar`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "submit",
        disabled: !clienteId,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html("Emitir Nota de Débito")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></form></div>`);
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
//# sourceMappingURL=_page.svelte-B6bSAeR4.js.map
