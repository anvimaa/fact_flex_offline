import { av as head, an as ensure_array_like, aw as attr, _ as derived } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, b as Card_content, a as Card_title } from './card-title-DxB_j2nk.js';
import './utils3-DjmiJAAD.js';
import { L as Label } from './label-DVXSUDZH.js';
import { I as Input } from './input-XVWEGj5m.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { P as Package } from './package-BKsm9DRA.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { H as History } from './history-DbDPS9Da.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './events-GtUqDgmb.js';
import './index2-Cz2gv4fD.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './attrs-mduo83PF.js';
import './chevrons-up-down-CTdYsjBi.js';
import './check-cM-2r8Wr.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let items = [];
    let motivo = "COMPRA";
    let observacao = "";
    let currentProdutoId = "";
    let currentQuantidade = null;
    const motivos = [
      { value: "COMPRA", label: "Compra" },
      { value: "AJUSTE", label: "Ajuste de Inventário" },
      { value: "DEVOLUCAO", label: "Devolução" },
      { value: "OUTRO", label: "Outro" }
    ];
    let produtoOptions = derived(() => data.produtos.map((p) => ({ value: p.id, label: `${p.codigo} - ${p.descricao}` })));
    function formatDate(date) {
      return new Date(date).toLocaleString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function addItem() {
      if (!currentProdutoId || !currentQuantidade || currentQuantidade <= 0) {
        toast.error("Selecione um produto e uma quantidade válida");
        return;
      }
      const existingItemIndex = items.findIndex((i) => i.produtoId === currentProdutoId);
      const produto = data.produtos.find((p) => p.id === currentProdutoId);
      if (!produto) return;
      if (existingItemIndex >= 0) {
        items[existingItemIndex].quantidade += currentQuantidade;
        items = [...items];
      } else {
        items = [
          ...items,
          {
            produtoId: currentProdutoId,
            produtoNome: `${produto.codigo} - ${produto.descricao}`,
            quantidade: currentQuantidade
          }
        ];
      }
      currentProdutoId = "";
      currentQuantidade = null;
    }
    function removeItem(index) {
      items = items.filter((_, i) => i !== index);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("l1wa8s", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Entrada de Estoque</title>`);
        });
      });
      $$renderer3.push(`<div class="w-full p-4"><div class="mb-6 flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "sm",
        href: "/estoque",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="text-2xl font-bold">Entrada de Estoque</h1> <p class="text-sm text-muted-foreground">Adicione produtos ao estoque em lote</p></div></div> <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Package($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Registrar Entrada`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<form method="POST" action="?/registrarEntrada"><div class="space-y-6"><div class="grid gap-4 md:grid-cols-2"><div>`);
              Label($$renderer5, {
                for: "motivo",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Motivo *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "motivo",
                  name: "motivo",
                  value: motivo,
                  required: true,
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                },
                ($$renderer6) => {
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(motivos);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let m = each_array[$$index];
                    $$renderer6.option({ value: m.value }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(m.label)}`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(`</div> <div>`);
              Label($$renderer5, {
                for: "observacao",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Observação`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "observacao",
                name: "observacao",
                placeholder: "Opcional",
                get value() {
                  return observacao;
                },
                set value($$value) {
                  observacao = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> <div class="rounded-lg border bg-muted/20 p-4"><h3 class="mb-4 text-sm font-medium">Adicionar Produtos</h3> <div class="grid gap-4 md:grid-cols-[1fr,150px,auto]"><div>`);
              Label($$renderer5, {
                class: "mb-1.5 block",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Produto`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Combobox_1($$renderer5, {
                items: produtoOptions(),
                placeholder: "Selecione um produto...",
                emptyText: "Produto não encontrado",
                get value() {
                  return currentProdutoId;
                },
                set value($$value) {
                  currentProdutoId = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div>`);
              Label($$renderer5, {
                class: "mb-1.5 block",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Quantidade`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                type: "number",
                min: "1",
                step: "1",
                placeholder: "0",
                onkeydown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem();
                  }
                },
                get value() {
                  return currentQuantidade;
                },
                set value($$value) {
                  currentQuantidade = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="flex items-end">`);
              Button($$renderer5, {
                type: "button",
                onclick: addItem,
                disabled: !currentProdutoId,
                children: ($$renderer6) => {
                  Plus($$renderer6, { class: "h-4 w-4" });
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div></div> `);
              if (items.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="rounded-md border"><div class="p-4"><h3 class="mb-2 text-sm font-medium">Itens a adicionar (${escape_html(items.length)})</h3> <div class="space-y-2"><!--[-->`);
                const each_array_1 = ensure_array_like(items);
                for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                  let item = each_array_1[i];
                  $$renderer5.push(`<div class="flex items-center justify-between gap-4 rounded-md bg-secondary/20 p-2 text-sm"><div class="flex-1"><p class="font-medium">${escape_html(item.produtoNome)}</p></div> <div class="w-24">`);
                  Input($$renderer5, {
                    type: "number",
                    min: "1",
                    step: "1",
                    class: "h-8",
                    get value() {
                      return item.quantidade;
                    },
                    set value($$value) {
                      item.quantidade = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> `);
                  Button($$renderer5, {
                    variant: "ghost",
                    size: "icon",
                    class: "h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive",
                    onclick: () => removeItem(i),
                    children: ($$renderer6) => {
                      Trash_2($$renderer6, { class: "h-4 w-4" });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----></div>`);
                }
                $$renderer5.push(`<!--]--></div></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <input type="hidden" name="items"${attr("value", JSON.stringify(items))}/> `);
              Button($$renderer5, {
                type: "submit",
                class: "w-full",
                disabled: items.length === 0,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(`Registrar Entrada (${items.length} itens)`)}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></form>`);
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
                  History($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Movimentos Recentes`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="space-y-3"><!--[-->`);
              const each_array_2 = ensure_array_like(data.movimentosRecentes);
              for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                let movimento = each_array_2[$$index_2];
                $$renderer5.push(`<div class="flex items-start justify-between border-b pb-3 last:border-0"><div class="flex-1"><p class="font-medium">${escape_html(movimento.produto.descricao)}</p> <p class="text-xs text-muted-foreground">${escape_html(movimento.usuario.name)} • ${escape_html(formatDate(movimento.criadoEm))}</p> `);
                if (movimento.motivo) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<p class="text-xs text-muted-foreground">${escape_html(movimento.motivo)}</p>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div> <div class="text-right">`);
                Badge($$renderer5, {
                  variant: movimento.tipo === "ENTRADA" ? "default" : "secondary",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(movimento.tipo === "ENTRADA" ? "+" : "-")}${escape_html(movimento.quantidade)}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div>`);
              }
              $$renderer5.push(`<!--]--> `);
              if (data.movimentosRecentes.length === 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<p class="py-8 text-center text-sm text-muted-foreground">Nenhum movimento registrado</p>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div>`);
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
//# sourceMappingURL=_page.svelte-BPo8ZWTH.js.map
