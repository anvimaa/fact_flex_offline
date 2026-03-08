import { an as ensure_array_like, aB as stringify, ah as sanitize_props, ai as spread_props, ap as slot, _ as derived, az as attr_class } from './index-DPRpZFUH.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { b as Card_content, C as Card_header, a as Card_title } from './card-title-DxB_j2nk.js';
import { D as Decimal, f as formatCurrency, I as Icon } from './utils3-DjmiJAAD.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { B as Badge } from './badge-D-ySjlTn.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { i as invalidateAll } from './client2-CcJ2Tk7F.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { X } from './x-DpLJ1R1s.js';
import { S as Search } from './search-BCOKC9CO.js';
import { S as Shopping_cart } from './shopping-cart-DlXvsSgE.js';
import { M as Minus } from './minus-D8RMQh55.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { R as Receipt } from './receipt-DYJGkjI7.js';
import { C as Check } from './check-cM-2r8Wr.js';
import { L as Loader_circle } from './loader-circle-DcjdY4IS.js';
import './index-r8oPdwp5.js';
import './public-B844qK3e.js';
import './use-id-BeJs9ypc.js';
import './attrs-mduo83PF.js';
import './index2-Cz2gv4fD.js';
import './root-B0ubZxsu.js';
import './events-GtUqDgmb.js';
import './state.svelte-BwryGJJV.js';
import './noop-CfhljDhh.js';
import './mounted-Bmfh9OVK.js';
import './scroll-lock-DpPha3vp.js';
import './index-server-CziyT60N.js';
import './context-BAmjzoO_.js';
import './select-item-hENHecOH.js';
import './hidden-input-sNTj1t7e.js';
import './chevrons-up-down-CTdYsjBi.js';

function Scan($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { "d": "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { "d": "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { "d": "M7 21H5a2 2 0 0 1-2-2v-2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "scan" },
    $$sanitized_props,
    {
      /**
       * @component @name Scan
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyA3VjVhMiAyIDAgMCAxIDItMmgyIiAvPgogIDxwYXRoIGQ9Ik0xNyAzaDJhMiAyIDAgMCAxIDIgMnYyIiAvPgogIDxwYXRoIGQ9Ik0yMSAxN3YyYTIgMiAwIDAgMS0yIDJoLTIiIC8+CiAgPHBhdGggZD0iTTcgMjFINWEyIDIgMCAwIDEtMi0ydi0yIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/scan
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
    Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
    let { data } = $$props;
    const clienteItems = derived(() => data.clientes.map((c) => ({ value: c.id, label: `${c.nome} - ${c.nif}`, nif: c.nif })));
    let venda = {
      clienteId: "",
      cliente: null,
      itens: [],
      metodoPagamento: "dinheiro",
      observacoes: "",
      subtotal: new Decimal(0),
      totalDesconto: new Decimal(0),
      totalTaxa: new Decimal(0),
      total: new Decimal(0)
    };
    let clienteForm = {
      nome: "",
      telefone: "",
      email: "",
      nif: "",
      endereco: "",
      id: "",
      updatedAt: /* @__PURE__ */ new Date(),
      createdAt: /* @__PURE__ */ new Date(),
      tipo: "",
      empresaId: "",
      caixaPostal: "",
      cidade: "",
      fax: "",
      pais: "",
      telemovel: "",
      website: ""
    };
    let buscarProduto = "";
    let mostrarFormularioCliente = false;
    let searchingNif = false;
    const allProducts = derived(() => data.produtos.map((p) => ({
      ...p,
      precoUnitario: new Decimal(p.precoUnitario),
      desconto: new Decimal(p.desconto || 0)
    })));
    const produtosFiltrados = derived(() => {
      if (!buscarProduto) return allProducts();
      const searchTerms = buscarProduto.toLowerCase().split(" ").filter(Boolean);
      return allProducts().filter((produto) => {
        const text = `${produto.descricao} ${produto.codigo}`.toLowerCase();
        return searchTerms.every((term) => text.includes(term));
      });
    });
    async function consultarNIF() {
      if (!clienteForm.nif) {
        toast.error("Informe o NIF para consultar");
        return;
      }
      searchingNif = true;
      try {
        const res = await fetch(`/api/agt/consultar-nif?nif=${clienteForm.nif}`);
        const data2 = await res.json();
        if (res.ok && data2.ObterContribuinte?.contribuinte) {
          const info = data2.ObterContribuinte.contribuinte;
          clienteForm.nome = info.nome;
          toast.success("Dados do NIF carregados com sucesso");
        } else {
          toast.error(data2.error || data2.ObterContribuinte?.mensagem || "NIF não encontrado");
        }
      } catch (error) {
        console.error("Erro na consulta:", error);
        toast.error("Erro ao consultar NIF");
      } finally {
        searchingNif = false;
      }
    }
    async function salvarCliente() {
      try {
        const response = await fetch("/api/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clienteForm)
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          await invalidateAll();
          venda.cliente = result;
          venda.clienteId = result.id;
          mostrarFormularioCliente = false;
          toast.success("Cliente cadastrado com sucesso!");
          clienteForm = {
            nome: "",
            telefone: "",
            email: "",
            nif: "",
            endereco: "",
            id: "",
            updatedAt: /* @__PURE__ */ new Date(),
            createdAt: /* @__PURE__ */ new Date(),
            tipo: "",
            empresaId: "",
            caixaPostal: "",
            cidade: "",
            fax: "",
            pais: "",
            telemovel: "",
            website: ""
          };
        } else {
          toast.error("Erro ao salvar cliente");
        }
      } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        toast.error("Erro ao salvar cliente. Tente novamente.");
      }
    }
    const metodosPagamento = [
      { valor: "cash", label: "Dinheiro", icon: "💵" },
      { valor: "transferencia", label: "Transferência", icon: "🏦" },
      { valor: "deposito", label: "Deposito", icon: "💳" }
    ];
    function adicionarProduto(produto) {
      if (!produto.quantidade || produto.quantidade <= 0) {
        toast.error("Produto sem estoque");
        return;
      }
      const itemExistente = venda.itens.find((item) => item.produtoId === produto.id);
      if (itemExistente) {
        if (itemExistente.quantidade < produto.quantidade) {
          itemExistente.quantidade++;
          calcularItemTotal(itemExistente);
        } else {
          toast.error("Quantidade máxima atingida");
          return;
        }
      } else {
        const descontoPercentual = new Decimal(produto.desconto || 0);
        const taxaPercentual = new Decimal(produto.taxa?.valor || 0);
        const precoBase = new Decimal(produto.precoUnitario);
        const descontoValor = precoBase.mul(descontoPercentual.div(100));
        const subtotalComDesconto = precoBase.sub(descontoValor);
        const taxaValor = subtotalComDesconto.mul(taxaPercentual.div(100));
        const totalItem = subtotalComDesconto.add(taxaValor);
        venda.itens = [
          ...venda.itens,
          {
            produtoId: produto.id,
            produto,
            quantidade: 1,
            precoUnitario: new Decimal(produto.precoUnitario),
            desconto: descontoValor,
            descontoPercentual,
            taxaPercentual,
            taxaValor,
            total: totalItem
          }
        ];
      }
      calcularTotais();
      buscarProduto = "";
    }
    function calcularItemTotal(item) {
      const qty = new Decimal(item.quantidade);
      const price = item.precoUnitario;
      const precoBase = price.mul(qty);
      const descontoValor = precoBase.mul(item.descontoPercentual.div(100));
      const subtotalComDesconto = precoBase.sub(descontoValor);
      const taxaValor = subtotalComDesconto.mul(item.taxaPercentual.div(100));
      item.desconto = descontoValor;
      item.taxaValor = taxaValor;
      item.total = subtotalComDesconto.add(taxaValor);
    }
    function alterarQuantidade(index, delta) {
      const item = venda.itens[index];
      const novaQuantidade = item.quantidade + delta;
      if (novaQuantidade == 0) {
        return;
      }
      if (item.produto && novaQuantidade > item.produto.quantidade) {
        toast.error("Quantidade excede o estoque");
        return;
      }
      item.quantidade = novaQuantidade;
      calcularItemTotal(item);
      calcularTotais();
    }
    function removerItem(index) {
      venda.itens = venda.itens.filter((_, i) => i !== index);
      calcularTotais();
    }
    function calcularTotais() {
      venda.subtotal = venda.itens.reduce(
        (acc, item) => {
          return acc.add(item.precoUnitario.mul(new Decimal(item.quantidade)));
        },
        new Decimal(0)
      );
      venda.totalDesconto = venda.itens.reduce((acc, item) => acc.add(item.desconto), new Decimal(0));
      venda.totalTaxa = venda.itens.reduce((acc, item) => acc.add(item.taxaValor), new Decimal(0));
      venda.total = venda.itens.reduce((acc, item) => acc.add(item.total), new Decimal(0));
    }
    async function finalizarVenda() {
      if (!venda.clienteId) {
        toast.error("Selecione um cliente");
        return;
      }
      if (venda.itens.length === 0) {
        toast.error("Adicione pelo menos um item");
        return;
      }
      if (!venda.metodoPagamento) {
        toast.error("Selecione um método de pagamento");
        return;
      }
      try {
        const payload = {
          clienteId: venda.clienteId,
          metodoPagamento: venda.metodoPagamento,
          observacao: venda.observacoes,
          subtotal: venda.subtotal.toNumber(),
          desconto: venda.totalDesconto.toNumber(),
          total: venda.total.toNumber(),
          status: "FINALIZADA",
          itens: venda.itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario.toNumber(),
            desconto: item.desconto.toNumber(),
            descontoPercentual: item.descontoPercentual.toNumber(),
            total: item.total.toNumber()
          }))
        };
        const response = await fetch("/api/vendas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (response.ok) {
          toast.success("Venda finalizada com sucesso!");
          await invalidateAll();
          limparVenda();
        } else {
          toast.error(result.error || "Erro ao finalizar venda");
        }
      } catch (error) {
        console.error("Erro ao finalizar venda:", error);
        toast.error("Erro ao processar a venda. Tente novamente.");
      }
    }
    function limparVenda() {
      venda = {
        clienteId: "",
        cliente: null,
        itens: [],
        metodoPagamento: "dinheiro",
        observacoes: "",
        subtotal: new Decimal(0),
        totalDesconto: new Decimal(0),
        totalTaxa: new Decimal(0),
        total: new Decimal(0)
      };
      buscarProduto = "";
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex h-screen flex-col"><div class="flex items-center justify-between border-b px-6 py-4 shadow-sm"><div class="flex items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "sm",
        onclick: () => window.history.back(),
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <h1 class="text-2xl font-bold">Ponto de Venda</h1></div> <div class="flex items-center gap-3">`);
      Badge($$renderer3, {
        variant: "outline",
        class: "text-sm",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT"))}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "outline",
        size: "sm",
        onclick: limparVenda,
        children: ($$renderer4) => {
          X($$renderer4, { class: "mr-2 h-4 w-4" });
          $$renderer4.push(`<!----> Nova Venda`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="flex flex-1 overflow-hidden"><div class="flex flex-1 flex-col"><div class="border-b p-4"><div class="relative">`);
      Search($$renderer3, {
        class: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        type: "text",
        placeholder: "Buscar produto por nome ou código...",
        class: "h-12 pl-10 text-lg",
        get value() {
          return buscarProduto;
        },
        set value($$value) {
          buscarProduto = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        size: "sm",
        variant: "ghost",
        class: "absolute right-2 top-1/2 -translate-y-1/2 transform",
        children: ($$renderer4) => {
          Scan($$renderer4, { class: "h-4 w-4" });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="flex-1 overflow-y-auto p-4"><div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">`);
      const each_array = ensure_array_like(produtosFiltrados());
      if (each_array.length !== 0) {
        $$renderer3.push("<!--[-->");
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let produto = each_array[$$index];
          Card($$renderer3, {
            class: `cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${stringify(!produto.quantidade || produto.quantidade <= 0 ? "opacity-50" : "")}`,
            onclick: () => adicionarProduto(produto),
            children: ($$renderer4) => {
              Card_content($$renderer4, {
                class: "p-4 text-center",
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="mb-3 flex h-24 w-full items-center justify-center rounded-lg bg-gray-100">`);
                  Shopping_cart($$renderer5, { class: "h-8 w-8 text-gray-400" });
                  $$renderer5.push(`<!----></div> <h3 class="mb-1 line-clamp-2 text-sm font-semibold">${escape_html(produto.descricao)}</h3> <p class="mb-2 text-xs text-gray-500">${escape_html(produto.codigo)}</p> <p class="text-sm font-bold text-primary">${escape_html(formatCurrency(produto.precoUnitario))}</p> <p${attr_class(`text-xs ${stringify(produto.quantidade && produto.quantidade > 0 ? "text-green-600" : "text-red-500")}`)}>Estoque: ${escape_html(produto.quantidade || 0)}</p>`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
        }
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="col-span-5 text-center text-gray-500">Nenhum produto encontrado</div>`);
      }
      $$renderer3.push(`<!--]--></div></div></div> <div class="flex w-1/3 flex-col border-l"><div class="border-b p-4"><div class="space-y-4"><div class="flex items-center justify-between">`);
      Label($$renderer3, {
        class: "text-xs font-semibold uppercase tracking-wider text-gray-500",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cliente`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      if (venda.clienteId) {
        $$renderer3.push("<!--[-->");
        Button($$renderer3, {
          variant: "ghost",
          size: "sm",
          class: "h-auto p-0 text-xs text-red-500 hover:bg-transparent hover:text-red-700",
          onclick: () => {
            venda.clienteId = "";
            venda.cliente = null;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Limpar Seleção`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      Combobox_1($$renderer3, {
        items: clienteItems(),
        onSelect: (val) => {
          const cliente = data.clientes.find((c) => c.id === val);
          if (cliente) {
            venda.cliente = cliente;
          }
        },
        placeholder: "Pesquisar por NIF ou Nome...",
        emptyText: "Nenhum cliente encontrado.",
        createLabel: "Novo Cliente",
        onCreate: () => mostrarFormularioCliente = true,
        filter: (item, search) => item.label.toLowerCase().includes(search) || item.nif && item.nif.includes(search),
        get value() {
          return venda.clienteId;
        },
        set value($$value) {
          venda.clienteId = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> <div class="flex-1 overflow-y-auto">`);
      if (venda.itens.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-3 p-4"><!--[-->`);
        const each_array_1 = ensure_array_like(venda.itens);
        for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
          let item = each_array_1[index];
          $$renderer3.push(`<div class="flex items-center gap-3 rounded-lg border p-3"><div class="flex-1"><div class="text-sm font-medium">${escape_html(item.produto?.descricao)}</div> <div class="flex gap-2 text-xs text-gray-500"><span>${escape_html(formatCurrency(item.precoUnitario))} cada</span> `);
          if (item.descontoPercentual.gt(0)) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-orange-600">-${escape_html(item.descontoPercentual)}%</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (item.taxaPercentual.gt(0)) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-blue-600">+${escape_html(item.taxaPercentual)}% IVA</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></div> <div class="flex items-center gap-2">`);
          Button($$renderer3, {
            size: "sm",
            variant: "outline",
            onclick: () => alterarQuantidade(index, -1),
            class: "h-8 w-8 p-0",
            children: ($$renderer4) => {
              Minus($$renderer4, { class: "h-3 w-3" });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Input($$renderer3, {
            class: "h-8 w-24 text-center font-medium",
            min: "1",
            max: item.produto?.quantidade || 1,
            onkeyup: () => {
              if (item.quantidade > item.produto?.quantidade) {
                item.quantidade = item.produto?.quantidade;
                toast.error("Quantidade excede o estoque!");
                return;
              }
              calcularItemTotal(item);
              calcularTotais();
            },
            get value() {
              return item.quantidade;
            },
            set value($$value) {
              item.quantidade = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!----> `);
          Button($$renderer3, {
            size: "sm",
            variant: "outline",
            onclick: () => alterarQuantidade(index, 1),
            class: "h-8 w-8 p-0",
            children: ($$renderer4) => {
              Plus($$renderer4, { class: "h-3 w-3" });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></div> <div class="text-right"><div class="font-bold">${escape_html(formatCurrency(item.total))}</div> `);
          Button($$renderer3, {
            size: "sm",
            variant: "ghost",
            onclick: () => removerItem(index),
            class: "p-1 text-red-500 hover:text-red-700",
            children: ($$renderer4) => {
              Trash_2($$renderer4, { class: "h-3 w-3" });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="flex flex-1 items-center justify-center text-gray-500"><div class="text-center">`);
        Shopping_cart($$renderer3, { class: "mx-auto mb-3 h-12 w-12 text-gray-300" });
        $$renderer3.push(`<!----> <p>Carrinho vazio</p> <p class="text-sm">Adicione produtos para começar</p></div></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (venda.itens.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="border-t"><div class="space-y-2 p-4"><div class="flex justify-between text-sm"><span>Subtotal:</span> <span>${escape_html(formatCurrency(venda.subtotal))}</span></div> `);
        if (venda.totalDesconto.gt(0)) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex justify-between text-sm text-orange-600"><span>Desconto:</span> <span>-${escape_html(formatCurrency(venda.totalDesconto))}</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (venda.totalTaxa.gt(0)) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex justify-between text-sm text-blue-600"><span>Taxa/IVA:</span> <span>+${escape_html(formatCurrency(venda.totalTaxa))}</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        Separator($$renderer3, {});
        $$renderer3.push(`<!----> <div class="flex justify-between text-lg font-bold"><span>Total:</span> <span class="text-primary">${escape_html(formatCurrency(venda.total))}</span></div></div> <div class="p-4 pt-0"><div class="mb-4 grid grid-cols-2 gap-2"><!--[-->`);
        const each_array_2 = ensure_array_like(metodosPagamento);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let metodo = each_array_2[$$index_2];
          Button($$renderer3, {
            variant: venda.metodoPagamento === metodo.valor ? "default" : "outline",
            size: "sm",
            onclick: () => venda.metodoPagamento = metodo.valor,
            class: "text-xs",
            children: ($$renderer4) => {
              $$renderer4.push(`<span class="mr-1">${escape_html(metodo.icon)}</span> ${escape_html(metodo.label)}`);
            },
            $$slots: { default: true }
          });
        }
        $$renderer3.push(`<!--]--></div> `);
        Button($$renderer3, {
          class: "h-12 w-full text-lg font-bold",
          onclick: finalizarVenda,
          disabled: !venda.cliente || venda.itens.length === 0,
          children: ($$renderer4) => {
            Receipt($$renderer4, { class: "mr-2 h-5 w-5" });
            $$renderer4.push(`<!----> Finalizar Venda`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div></div> `);
      if (mostrarFormularioCliente) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">`);
        Card($$renderer3, {
          class: "mx-4 w-full max-w-md",
          children: ($$renderer4) => {
            Card_header($$renderer4, {
              children: ($$renderer5) => {
                Card_title($$renderer5, {
                  class: "flex items-center justify-between",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<span>Novo Cliente</span> `);
                    Button($$renderer6, {
                      size: "sm",
                      variant: "ghost",
                      onclick: () => mostrarFormularioCliente = false,
                      children: ($$renderer7) => {
                        X($$renderer7, { class: "h-4 w-4" });
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
            $$renderer4.push(`<!----> `);
            Card_content($$renderer4, {
              class: "space-y-4",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  for: "nif",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->NIF`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="flex gap-2">`);
                Input($$renderer5, {
                  id: "nif",
                  placeholder: "Número de identificação fiscal",
                  get value() {
                    return clienteForm.nif;
                  },
                  set value($$value) {
                    clienteForm.nif = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  type: "button",
                  variant: "secondary",
                  size: "icon",
                  onclick: consultarNIF,
                  disabled: searchingNif,
                  title: "Consultar NIF na AGT",
                  class: "shrink-0",
                  children: ($$renderer6) => {
                    if (searchingNif) {
                      $$renderer6.push("<!--[-->");
                      Loader_circle($$renderer6, { class: "h-4 w-4 animate-spin text-primary" });
                    } else {
                      $$renderer6.push("<!--[!-->");
                      Search($$renderer6, { class: "h-4 w-4" });
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  for: "nome",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Nome *`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "nome",
                  placeholder: "Nome completo",
                  required: true,
                  get value() {
                    return clienteForm.nome;
                  },
                  set value($$value) {
                    clienteForm.nome = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="flex gap-3 pt-4">`);
                Button($$renderer5, {
                  variant: "outline",
                  class: "flex-1",
                  onclick: () => mostrarFormularioCliente = false,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Cancelar`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  class: "flex-1",
                  onclick: salvarCliente,
                  disabled: !clienteForm.nome,
                  children: ($$renderer6) => {
                    Check($$renderer6, { class: "mr-2 h-4 w-4" });
                    $$renderer6.push(`<!----> Salvar`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
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
//# sourceMappingURL=_page.svelte-CieVb0M6.js.map
