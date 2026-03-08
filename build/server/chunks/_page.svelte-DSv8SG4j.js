import { av as head, aw as attr, _ as derived, an as ensure_array_like, az as attr_class, aB as stringify, aq as bind_props } from './index-DPRpZFUH.js';
import { g as goto } from './client2-CcJ2Tk7F.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { D as Decimal, m as Circle_alert, f as formatCurrency, u as Circle_check, h as cn } from './utils3-DjmiJAAD.js';
import { L as Label } from './label-DVXSUDZH.js';
import { I as Input } from './input-XVWEGj5m.js';
import { C as Checkbox } from './checkbox-5hPZTOsI.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { T as Textarea } from './textarea-BSIF_PfD.js';
import { m as motivosNC } from './constants-DhttDS3t.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './state.svelte-BwryGJJV.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './check-cM-2r8Wr.js';
import './minus-D8RMQh55.js';
import './context-BAmjzoO_.js';
import './attrs-mduo83PF.js';
import './noop-CfhljDhh.js';
import './hidden-input-sNTj1t7e.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './select-item-hENHecOH.js';
import './chevrons-up-down-CTdYsjBi.js';
import './plus-C65zNy9m.js';

function Autocomplete($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      items = [],
      value = void 0,
      placeholder = "",
      name,
      required,
      className,
      multiline = false,
      rows = 3,
      onSelect
    } = $$props;
    let open = false;
    const filteredItems = derived(() => {
      if (!value) return items;
      const search = value.toLowerCase();
      return items.filter((item) => item.label.toLowerCase().includes(search) || item.value.toLowerCase().includes(search));
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="relative w-full">`);
      if (multiline) {
        $$renderer3.push("<!--[-->");
        Textarea($$renderer3, {
          name,
          id: name,
          required,
          placeholder,
          rows,
          class: cn("w-full", className),
          oninput: () => {
            if (filteredItems().length > 0 && !open) open = true;
          },
          onfocus: () => {
            if (filteredItems().length > 0 && !open) open = true;
          },
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          }
        });
      } else {
        $$renderer3.push("<!--[!-->");
        Input($$renderer3, {
          name,
          id: name,
          required,
          placeholder,
          class: cn("w-full", className),
          oninput: () => {
            if (filteredItems().length > 0 && !open) open = true;
          },
          onfocus: () => {
            if (filteredItems().length > 0 && !open) open = true;
          },
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          }
        });
      }
      $$renderer3.push(`<!--]--> `);
      if (open) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none"><div class="max-h-[250px] overflow-y-auto">`);
        if (filteredItems().length === 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="px-4 py-2 text-sm text-muted-foreground">Sem sugestões</div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(filteredItems());
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let item = each_array[$$index];
            $$renderer3.push(`<button type="button" class="flex w-full items-center rounded-sm px-2 py-2 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">${escape_html(item.label)}</button>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
    let { data } = $$props;
    const facturas = derived(() => data.facturas), facturaSelecionada = derived(() => data.facturaSelecionada);
    let totalNotaCredito = new Decimal(0);
    let subtotal = new Decimal(0);
    let totalDesconto = new Decimal(0);
    let totalImpostos = new Decimal(0);
    let itensSelecionados = /* @__PURE__ */ new Map();
    let motivo = "";
    let facturaId = derived(() => data.facturaSelecionada?.id || "");
    const facturasItems = derived(() => facturas().map((f) => ({
      value: f.id,
      label: `${f.numero} - ${f.cliente?.nome || "Sem cliente"} - ${formatCurrency(f.total)}`
    })));
    const todosSelecionados = derived(() => facturaSelecionada() && facturaSelecionada().itens.length > 0 && itensSelecionados.size === facturaSelecionada().itens.length);
    function selecionarFactura(id) {
      if (id) {
        goto();
      }
    }
    function toggleItem(itemId, item) {
      const novosItens = new Map(itensSelecionados);
      if (novosItens.has(itemId)) {
        novosItens.delete(itemId);
      } else {
        const qty = new Decimal(item.quantidade);
        const price = new Decimal(item.precoUnitario);
        const discountPerc = new Decimal(item.desconto || 0);
        const fatorDesconto = new Decimal(1).sub(discountPerc.div(100));
        const precoLiquido = price.mul(fatorDesconto);
        const subtotalItem = precoLiquido.mul(qty);
        const taxaPerc = new Decimal(item.taxa || 0);
        const taxaValor = subtotalItem.mul(taxaPerc.div(100));
        const valorItem = subtotalItem.add(taxaValor);
        const descontoValorItem = price.mul(qty).sub(subtotalItem);
        novosItens.set(itemId, {
          quantidade: item.quantidade,
          descontoPerc: item.desconto || 0,
          valorCredito: valorItem,
          taxaValor,
          subtotalItem,
          descontoValorItem
        });
      }
      itensSelecionados = novosItens;
    }
    function toggleTodos() {
      if (todosSelecionados()) {
        itensSelecionados = /* @__PURE__ */ new Map();
      } else if (facturaSelecionada()) {
        const novosItens = /* @__PURE__ */ new Map();
        facturaSelecionada().itens.forEach((item) => {
          const qty = new Decimal(item.quantidade);
          const price = new Decimal(item.precoUnitario);
          const discountPerc = new Decimal(item.desconto || 0);
          const fatorDesconto = new Decimal(1).sub(discountPerc.div(100));
          const precoLiquido = price.mul(fatorDesconto);
          const subtotalItem = precoLiquido.mul(qty);
          const taxaPerc = new Decimal(item.taxa || 0);
          const taxaValor = subtotalItem.mul(taxaPerc.div(100));
          const valorItem = subtotalItem.add(taxaValor);
          const descontoValorItem = price.mul(qty).sub(subtotalItem);
          novosItens.set(item.id, {
            quantidade: item.quantidade,
            descontoPerc: item.desconto || 0,
            valorCredito: valorItem,
            taxaValor,
            subtotalItem,
            descontoValorItem
          });
        });
        itensSelecionados = novosItens;
      }
    }
    function atualizarItem(itemId, novaQuantidade, novoDescontoPerc, item) {
      const novosItens = new Map(itensSelecionados);
      if (novosItens.has(itemId)) {
        const qty = new Decimal(novaQuantidade);
        const price = new Decimal(item.precoUnitario);
        const discountPerc = new Decimal(novoDescontoPerc);
        const fatorDesconto = new Decimal(1).sub(discountPerc.div(100));
        const precoLiquido = price.mul(fatorDesconto);
        const subtotalItem = precoLiquido.mul(qty);
        const taxaPerc = new Decimal(item.taxa || 0);
        const taxaValor = subtotalItem.mul(taxaPerc.div(100));
        const valorItem = subtotalItem.add(taxaValor);
        const descontoValorItem = price.mul(qty).sub(subtotalItem);
        novosItens.set(itemId, {
          quantidade: novaQuantidade,
          descontoPerc: novoDescontoPerc,
          valorCredito: valorItem,
          taxaValor,
          subtotalItem,
          descontoValorItem
        });
        itensSelecionados = novosItens;
      }
    }
    function prepararItens() {
      return Array.from(itensSelecionados.entries()).map(([itemId, dados]) => ({
        itemId,
        quantidade: dados.quantidade,
        descontoOriginal: dados.descontoPerc,
        valorCredito: dados.valorCredito.toNumber()
      }));
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1wx0ym7", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Notas de Crédito | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="container mx-auto max-w-7xl space-y-6 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "sm",
        href: "/documentos/fiscais",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-3xl font-bold tracking-tight">Nova Nota de Crédito</h1> <p class="text-muted-foreground">Emitir nota de crédito para anular ou rectificar factura</p></div></div></div> `);
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
                    $$renderer6.push(`<!---->Escolha a factura que deseja creditar`);
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
        $$renderer3.push(`<form method="POST" action="?/emitir" class="space-y-6"><input type="hidden" name="facturaId"${attr("value", facturaSelecionada().id)}/> <input type="hidden" name="itens"${attr("value", JSON.stringify(prepararItens()))}/> <div class="grid gap-6 lg:grid-cols-3 items-start"><div class="space-y-6 lg:col-span-2">`);
        Card($$renderer3, {
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
                      href: "/documentos/notas-credito/nova",
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
              class: "space-y-4",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="grid gap-4 md:grid-cols-3"><div><p class="text-sm text-muted-foreground">Número</p> <p class="font-medium">${escape_html(facturaSelecionada().numero)}</p></div> <div><p class="text-sm text-muted-foreground">Cliente</p> <p class="font-medium">${escape_html(facturaSelecionada().cliente?.nome || "-")}</p></div> <div><p class="text-sm text-muted-foreground">Total</p> <p class="font-medium">${escape_html(formatCurrency(facturaSelecionada().total))}</p></div></div>`);
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
              class: "flex flex-row items-center justify-between space-y-0 pb-2",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="space-y-1">`);
                Card_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Itens para Creditar`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Card_description($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Selecione os itens que deseja incluir na nota de crédito`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> `);
                if (facturaSelecionada().itens.length > 0) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="flex items-center space-x-2">`);
                  Checkbox($$renderer5, {
                    id: "selecionar-todos",
                    checked: todosSelecionados(),
                    onCheckedChange: toggleTodos
                  });
                  $$renderer5.push(`<!----> `);
                  Label($$renderer5, {
                    for: "selecionar-todos",
                    class: "cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Selecionar Todos`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="space-y-4"><!--[-->`);
                const each_array = ensure_array_like(facturaSelecionada().itens);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let item = each_array[$$index];
                  const itemSelecionado = itensSelecionados.has(item.id);
                  const price = new Decimal(item.precoUnitario);
                  const discountPerc = new Decimal(item.desconto || 0);
                  const fatorDesconto = new Decimal(1).sub(discountPerc.div(100));
                  const precoLiquido = price.mul(fatorDesconto);
                  const subtotalItem = precoLiquido.mul(new Decimal(item.quantidade));
                  const taxaPerc = new Decimal(item.taxa || 0);
                  const taxaValor = subtotalItem.mul(taxaPerc.div(100));
                  const valorItem = subtotalItem.add(taxaValor);
                  $$renderer5.push(`<div${attr_class("rounded-lg border p-4 transition-all duration-200", void 0, {
                    "border-primary": itemSelecionado,
                    "ring-1": itemSelecionado,
                    "ring-primary": itemSelecionado,
                    "bg-primary-10": itemSelecionado,
                    "shadow-sm": itemSelecionado,
                    "hover:border-primary-50": !itemSelecionado,
                    "hover:bg-primary-50": !itemSelecionado
                  })}><div class="flex items-start gap-4">`);
                  Checkbox($$renderer5, {
                    checked: itemSelecionado,
                    onCheckedChange: () => toggleItem(item.id, item),
                    class: "mt-1"
                  });
                  $$renderer5.push(`<!----> <div class="flex-1 space-y-2"><div class="flex items-start justify-between"><div><p class="font-medium">${escape_html(item.descricao)}</p> <p class="text-sm text-muted-foreground">Código: ${escape_html(item.codigo)}</p></div> <p class="font-semibold">${escape_html(formatCurrency(valorItem))}</p></div> `);
                  if (itemSelecionado) {
                    $$renderer5.push("<!--[-->");
                    const dadosAtuais = itensSelecionados.get(item.id);
                    $$renderer5.push(`<div class="grid gap-4 md:grid-cols-4 mt-4 bg-muted/20 p-4 rounded-md"><div>`);
                    Label($$renderer5, {
                      for: `qtd-${stringify(item.id)}`,
                      class: "text-xs",
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Qtd a Creditar`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> `);
                    Input($$renderer5, {
                      id: `qtd-${stringify(item.id)}`,
                      type: "number",
                      min: "1",
                      max: item.quantidade,
                      value: dadosAtuais.quantidade,
                      oninput: (e) => atualizarItem(item.id, parseFloat(e.currentTarget.value) || 1, dadosAtuais.descontoPerc, item),
                      class: "h-8 mt-1"
                    });
                    $$renderer5.push(`<!----> <p class="mt-1 text-xs text-muted-foreground">Máx: ${escape_html(item.quantidade)}</p></div> <div>`);
                    Label($$renderer5, {
                      for: `desc-${stringify(item.id)}`,
                      class: "text-xs",
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Desconto (%)`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> `);
                    Input($$renderer5, {
                      id: `desc-${stringify(item.id)}`,
                      type: "number",
                      min: "0",
                      max: "100",
                      step: "0.01",
                      value: dadosAtuais.descontoPerc,
                      oninput: (e) => atualizarItem(item.id, dadosAtuais.quantidade, parseFloat(e.currentTarget.value) || 0, item),
                      class: "h-8 mt-1"
                    });
                    $$renderer5.push(`<!----> <p class="mt-1 text-xs text-muted-foreground">Original: ${escape_html(item.desconto || 0)}%</p></div> <div>`);
                    Label($$renderer5, {
                      class: "text-xs",
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Imposto (IVA)`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> <p class="text-sm mt-3 h-8 flex items-center">${escape_html(item.taxa)}% (${escape_html(formatCurrency(dadosAtuais.taxaValor))})</p></div> <div>`);
                    Label($$renderer5, {
                      class: "text-xs",
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Valor Líquido`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> <p class="text-sm mt-3 font-semibold h-8 flex items-center">${escape_html(formatCurrency(dadosAtuais.subtotalItem))}</p></div></div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--></div></div></div>`);
                }
                $$renderer5.push(`<!--]--></div> `);
                if (itensSelecionados.size === 0) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="mt-4 rounded-lg border border-orange-500 bg-orange-50 p-4 dark:bg-orange-950/20"><div class="flex gap-2">`);
                  Circle_alert($$renderer5, { class: "h-5 w-5 text-orange-600 dark:text-orange-400" });
                  $$renderer5.push(`<!----> <p class="text-sm text-orange-700 dark:text-orange-300">Selecione pelo menos um item para continuar</p></div></div>`);
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
        $$renderer3.push(`<!----></div> <div class="space-y-6 sticky top-6">`);
        Card($$renderer3, {
          children: ($$renderer4) => {
            Card_header($$renderer4, {
              children: ($$renderer5) => {
                Card_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Motivo da Emissão`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Card_description($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Informe o motivo para emissão da nota de crédito`);
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
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  for: "motivo",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Motivo *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Autocomplete($$renderer5, {
                  name: "motivo",
                  items: motivosNC,
                  placeholder: "Ex: Devolução de mercadoria, Erro de facturação, Desconto comercial...",
                  multiline: true,
                  rows: 4,
                  required: true,
                  get value() {
                    return motivo;
                  },
                  set value($$value) {
                    motivo = $$value;
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
                $$renderer5.push(`<div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-muted-foreground">Itens selecionados:</span> <span class="font-medium">${escape_html(itensSelecionados.size)}</span></div> <div class="flex justify-between text-sm"><span class="text-muted-foreground">Subtotal:</span> <span class="font-medium">${escape_html(formatCurrency(subtotal))}</span></div> <div class="flex justify-between text-sm"><span class="text-muted-foreground">Desconto Comercial:</span> <span class="font-medium text-destructive">-${escape_html(formatCurrency(totalDesconto))}</span></div> <div class="flex justify-between text-sm"><span class="text-muted-foreground">Total Impostos:</span> <span class="font-medium">${escape_html(formatCurrency(totalImpostos))}</span></div> `);
                Separator($$renderer5, {});
                $$renderer5.push(`<!----> <div class="flex justify-between text-lg"><span class="font-bold">Total a Creditar:</span> <span class="font-bold text-primary">${escape_html(formatCurrency(totalNotaCredito))}</span></div></div> `);
                if (totalNotaCredito.gte(facturaSelecionada().total)) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="mt-4 rounded-lg border border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20"><div class="flex gap-2">`);
                  Circle_check($$renderer5, { class: "h-5 w-5 text-blue-600 dark:text-blue-400" });
                  $$renderer5.push(`<!----> <p class="text-sm text-blue-700 dark:text-blue-300">Esta nota de crédito <strong>anulará totalmente</strong> a factura original.</p></div></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  $$renderer5.push(`<div class="mt-4 rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950/20"><div class="flex gap-2">`);
                  Circle_alert($$renderer5, { class: "h-5 w-5 text-yellow-600 dark:text-yellow-400" });
                  $$renderer5.push(`<!----> <p class="text-sm text-yellow-700 dark:text-yellow-300">Esta nota de crédito <strong>rectificará parcialmente</strong> a factura original.</p></div></div>`);
                }
                $$renderer5.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <div class="flex flex-col gap-3 pt-2">`);
        Button($$renderer3, {
          type: "submit",
          size: "lg",
          class: "w-full text-base font-medium",
          disabled: itensSelecionados.size === 0 || !motivo,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html("Emitir Nota de Crédito")}`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          type: "button",
          variant: "outline",
          class: "w-full",
          href: "/documentos/fiscais",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cancelar`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></div></div></form>`);
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
//# sourceMappingURL=_page.svelte-DSv8SG4j.js.map
