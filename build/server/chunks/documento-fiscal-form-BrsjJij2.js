import { an as ensure_array_like, az as attr_class, aB as stringify, aw as attr, _ as derived } from './index-DPRpZFUH.js';
import { t as tick } from './index-server-CziyT60N.js';
import { B as Button } from './button-DjcfiVkK.js';
import { C as Card } from './card-ChfkAej9.js';
import { C as Card_header, a as Card_title, b as Card_content } from './card-title-DxB_j2nk.js';
import { C as Card_description } from './card-description-BQA4H5z9.js';
import { C as Card_footer } from './card-footer-DiKIAxQs.js';
import { I as Input } from './input-XVWEGj5m.js';
import { L as Label } from './label-DVXSUDZH.js';
import { T as Textarea } from './textarea-BSIF_PfD.js';
import { S as Separator } from './separator-DYGMnC9J.js';
import { D as Decimal, f as formatCurrency } from './utils3-DjmiJAAD.js';
import './root-B0ubZxsu.js';
import './state.svelte-BwryGJJV.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_footer } from './index8-VEsRSQHH.js';
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { C as Check } from './check-cM-2r8Wr.js';
import { A as Arrow_right } from './arrow-right-DEHhXJ9q.js';
import { T as Trash_2 } from './trash-2-HZQLO-FJ.js';
import { P as Plus } from './plus-C65zNy9m.js';
import { U as User } from './user-D18r-fvg.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { S as Shopping_cart } from './shopping-cart-DlXvsSgE.js';
import { A as Arrow_left } from './arrow-left-B04jSFwd.js';
import { D as Dialog_description } from './dialog-description-B25dU-Nc.js';
import { S as Search } from './search-BCOKC9CO.js';
import { L as Loader_circle } from './loader-circle-DcjdY4IS.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function Documento_fiscal_form($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      clientes = [],
      produtos = [],
      tipoDocumento = "FACTURA",
      titulo = "Novo Documento",
      descricao = "Preencha os dados para emitir o documento",
      loading = false,
      onCancel = () => {
      },
      config = {
        clienteOpcional: false,
        pagamentoObrigatorio: false,
        // Facturas normais não exigem pagamento na emissão
        itensSimples: false,
        modoGlobal: false,
        isAdiantamento: false,
        mostraRetencao: true
      },
      serie
    } = $$props;
    let step = 1;
    const totalSteps = 4;
    let clienteId = "";
    let dataEmissao = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let dataVencimento = new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 30)).toISOString().split("T")[0];
    let moeda = "AOA";
    let observacao = "";
    let formaPagamento = "NUMERARIO";
    let retencao = 0;
    let showCreateClient = false;
    let newClientName = "";
    let newClientNif = "";
    let creatingClient = false;
    let searchingNif = false;
    async function consultarNIF() {
      if (!newClientNif) {
        toast.error("Informe o NIF para consultar");
        return;
      }
      searchingNif = true;
      try {
        const res = await fetch(`/api/agt/consultar-nif?nif=${newClientNif}`);
        const data = await res.json();
        if (res.ok && data.ObterContribuinte?.contribuinte) {
          const info = data.ObterContribuinte.contribuinte;
          newClientName = info.nome;
          toast.success("Dados do NIF carregados com sucesso");
        } else {
          toast.error(data.error || data.ObterContribuinte?.mensagem || "NIF não encontrado");
        }
      } catch (error) {
        console.error("Erro na consulta:", error);
        toast.error("Erro ao consultar NIF");
      } finally {
        searchingNif = false;
      }
    }
    let itens = [
      {
        codigo: "",
        descricao: "",
        quantidade: 1,
        precoUnitario: new Decimal(0),
        desconto: new Decimal(0),
        taxa: new Decimal(0),
        unidade: "UN"
      }
    ];
    function calcularItem(item) {
      const qty = new Decimal(item.quantidade);
      const subtotal = qty.mul(item.precoUnitario);
      const descontoValor = subtotal.mul(item.desconto.div(100));
      const baseImposto = subtotal.sub(descontoValor);
      const impostoValor = baseImposto.mul(item.taxa.div(100));
      const total = baseImposto.add(impostoValor);
      return { subtotal, descontoValor, impostoValor, total };
    }
    let totais = derived(() => {
      let sub = new Decimal(0);
      let desc = new Decimal(0);
      let imp = new Decimal(0);
      let tot = new Decimal(0);
      itens.forEach((item) => {
        const calc = calcularItem(item);
        sub = sub.add(calc.subtotal);
        desc = desc.add(calc.descontoValor);
        imp = imp.add(calc.impostoValor);
        tot = tot.add(calc.total);
      });
      return { subtotal: sub, desconto: desc, impostos: imp, total: tot };
    });
    async function adicionarItem() {
      itens.push({
        codigo: "",
        descricao: "",
        quantidade: 1,
        precoUnitario: new Decimal(0),
        desconto: new Decimal(0),
        taxa: new Decimal(0),
        unidade: "UN"
      });
      await tick();
    }
    function removerItem(index) {
      if (itens.length > 1) {
        itens.splice(index, 1);
      }
    }
    function selecionarProduto(index, produtoId) {
      const produto = produtos.find((p) => p.id === produtoId);
      if (produto) {
        itens[index] = {
          produtoId: produto.id,
          codigo: produto.codigo || "PROD",
          descricao: `${produto.codigo} - ${produto.descricao}`,
          quantidade: 1,
          precoUnitario: new Decimal(produto.precoUnitario),
          desconto: new Decimal(produto.desconto || 0),
          taxa: new Decimal(produto.taxa?.valor || 0),
          unidade: "UN"
        };
      }
    }
    function getMaxQuantity(produtoId) {
      if (!produtoId) return 999999;
      const produto = produtos.find((p) => p.id === produtoId);
      return produto?.quantidade || 0;
    }
    async function handleCreateClient() {
      if (!newClientName || !newClientNif) {
        toast.error("Preencha o nome e o NIF");
        return;
      }
      creatingClient = true;
      try {
        const res = await fetch("/api/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: newClientName, nif: newClientNif })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Erro ao criar cliente");
        }
        clientes = [...clientes, data];
        clienteId = data.id;
        showCreateClient = false;
        newClientName = "";
        newClientNif = "";
        toast.success("Cliente criado com sucesso");
      } catch (error) {
        toast.error(error.message);
      } finally {
        creatingClient = false;
      }
    }
    function nextStep() {
      if (step < totalSteps) step++;
    }
    function prevStep() {
      if (step > 1) step--;
    }
    function validarPasso(passo) {
      if (passo === 1) {
        const clienteValido = config.clienteOpcional ? true : !!clienteId;
        return clienteValido && !!dataEmissao && !!serie;
      }
      if (passo === 2) return itens.length > 0 && itens.every((i) => i.descricao && i.quantidade > 0 && i.precoUnitario.gte(0));
      if (passo === 3) {
        if (config.pagamentoObrigatorio && !formaPagamento) ;
        return true;
      }
      return true;
    }
    const clienteItems = derived(() => clientes.map((c) => ({ value: c.id, label: c.nome, nif: c.nif })));
    function getAvailableProducts(currentItemId) {
      return produtos.filter((p) => {
        if ((p.quantidade || 0) <= 0) return false;
        if (p.id === currentItemId) return true;
        const isSelected = itens.some((item) => item.produtoId === p.id);
        return !isSelected;
      }).map((p) => ({
        value: p.id,
        label: `${p.codigo} - ${p.descricao}`,
        codigo: p.codigo,
        descricao: p.descricao
      }));
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="mx-auto w-[75%]"><div class="mb-8"><div class="relative flex items-center justify-between"><div class="absolute left-0 top-1/2 -z-10 h-0.5 w-full bg-muted"></div> <!--[-->`);
      const each_array = ensure_array_like([1, 2, 3, 4]);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let s = each_array[$$index];
        $$renderer3.push(`<div class="flex flex-col items-center gap-2 bg-background px-2"><div${attr_class(`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${stringify(step >= s ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground text-muted-foreground")}`)}>`);
        if (step > s) {
          $$renderer3.push("<!--[-->");
          Check($$renderer3, { class: "h-6 w-6" });
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<span class="font-bold">${escape_html(s)}</span>`);
        }
        $$renderer3.push(`<!--]--></div> <span${attr_class(`text-xs font-medium ${stringify(step >= s ? "text-primary" : "text-muted-foreground")}`)}>`);
        if (s === 1) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`Dados Gerais`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (s === 2) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`Itens`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (s === 3) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`Pagamento`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (s === 4) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`Confirmação`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></span></div>`);
      }
      $$renderer3.push(`<!--]--></div></div> <form method="POST" action="?/emitir"><input type="hidden" name="clienteId"${attr("value", clienteId)}/> <input type="hidden" name="dataEmissao"${attr("value", dataEmissao)}/> <input type="hidden" name="dataVencimento"${attr("value", dataVencimento)}/> <input type="hidden" name="moeda"${attr("value", moeda)}/> <input type="hidden" name="observacao"${attr("value", observacao)}/> <input type="hidden" name="formaPagamento"${attr("value", formaPagamento)}/> <input type="hidden" name="retencao"${attr("value", retencao)}/> <input type="hidden" name="itens"${attr("value", JSON.stringify(itens))}/> <input type="hidden" name="serie"${attr("value", serie)}/> `);
      Card($$renderer3, {
        class: "flex min-h-[500px] w-full flex-col",
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(titulo)}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(descricao)}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_content($$renderer4, {
            class: "flex-1",
            children: ($$renderer5) => {
              if (step === 1) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Cliente ${escape_html(config.clienteOpcional ? "(Opcional/Consumidor Final)" : "*")}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Combobox_1($$renderer5, {
                  items: clienteItems(),
                  placeholder: "Selecione ou pesquise um cliente...",
                  emptyText: "Nenhum cliente encontrado.",
                  createLabel: "Criar novo cliente",
                  onCreate: () => showCreateClient = true,
                  filter: (item, search) => item.label.toLowerCase().includes(search) || item.nif && item.nif.includes(search),
                  get value() {
                    return clienteId;
                  },
                  set value($$value) {
                    clienteId = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="grid gap-6 animate-in fade-in slide-in-from-right-4 md:grid-cols-2">`);
                if (config.modoGlobal) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="col-span-2 rounded-md bg-blue-50 p-4 text-blue-800"><strong>Modo Fatura Global:</strong> As datas e itens devem refletir o período consolidado.</div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--> <div class="space-y-2">`);
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
                    class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                $$renderer5.push(`</div> <div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Série`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "text",
                  placeholder: "Digite a série",
                  get value() {
                    return serie;
                  },
                  set value($$value) {
                    serie = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Data de Emissão`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "date",
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
                    $$renderer6.push(`<!---->Data de Vencimento`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "date",
                  get value() {
                    return dataVencimento;
                  },
                  set value($$value) {
                    dataVencimento = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> `);
              if (step === 2) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="space-y-4 animate-in fade-in slide-in-from-right-4"><div class="max-h-[400px] space-y-4 overflow-y-auto pr-2"><!--[-->`);
                const each_array_1 = ensure_array_like(itens);
                for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                  let item = each_array_1[i];
                  $$renderer5.push(`<div class="group relative grid gap-4 rounded-lg border bg-muted/20 p-4">`);
                  Button($$renderer5, {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    class: "absolute right-2 top-2 text-destructive opacity-0 transition-opacity group-hover:opacity-100",
                    onclick: () => removerItem(i),
                    children: ($$renderer6) => {
                      Trash_2($$renderer6, { class: "h-4 w-4" });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> <div class="grid gap-4 md:grid-cols-12"><div class="space-y-2 md:col-span-4">`);
                  Label($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Produto / Descrição`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Combobox_1($$renderer5, {
                    items: getAvailableProducts(item.produtoId),
                    value: item.produtoId,
                    onSelect: (val) => selecionarProduto(i, val),
                    placeholder: "Pesquisar produto...",
                    emptyText: "Produto não encontrado ou sem stock.",
                    filter: (item2, search) => item2.label.toLowerCase().includes(search) || item2.codigo.toLowerCase().includes(search)
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    type: "hidden",
                    placeholder: "Descrição do item",
                    get value() {
                      return item.descricao;
                    },
                    set value($$value) {
                      item.descricao = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> <div class="space-y-2 md:col-span-2">`);
                  Label($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Qtd`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    type: "number",
                    min: "1",
                    max: getMaxQuantity(item.produtoId),
                    step: "1",
                    get value() {
                      return item.quantidade;
                    },
                    set value($$value) {
                      item.quantidade = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----> `);
                  if (item.produtoId) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<p class="text-xs text-muted-foreground">Max: ${escape_html(getMaxQuantity(item.produtoId))}</p>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--></div> <div class="space-y-2 md:col-span-2">`);
                  Label($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Preço Unit.`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    disabled: true,
                    type: "number",
                    min: "0",
                    step: "0.01",
                    value: item.precoUnitario.toNumber()
                  });
                  $$renderer5.push(`<!----></div> <div class="space-y-2 md:col-span-2">`);
                  Label($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Desc %`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    type: "number",
                    min: "0",
                    max: "100",
                    value: item.desconto.toNumber(),
                    oninput: (e) => item.desconto = new Decimal(e.target.value || 0)
                  });
                  $$renderer5.push(`<!----></div> <div class="space-y-2 md:col-span-2">`);
                  Label($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Taxa %`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    disabled: true,
                    type: "number",
                    min: "0",
                    max: "100",
                    value: item.taxa.toNumber()
                  });
                  $$renderer5.push(`<!----></div></div> <div class="flex justify-end text-sm text-muted-foreground">Total Item: <span class="ml-2 font-bold text-foreground">${escape_html(formatCurrency(calcularItem(item).total))}</span></div></div>`);
                }
                $$renderer5.push(`<!--]--></div> <div class="flex justify-end">`);
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
                $$renderer5.push(`<!----></div> <div class="flex justify-end border-t pt-4"><div class="space-y-1 text-right"><div class="text-sm text-muted-foreground">Subtotal: ${escape_html(formatCurrency(totais().subtotal))}</div> <div class="text-sm text-muted-foreground">Descontos: ${escape_html(formatCurrency(totais().desconto))}</div> <div class="text-sm text-muted-foreground">Impostos: ${escape_html(formatCurrency(totais().impostos))}</div> <div class="text-xl font-bold text-primary">Total: ${escape_html(formatCurrency(totais().total))}</div></div></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> `);
              if (step === 3) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="grid gap-6 animate-in fade-in slide-in-from-right-4 md:grid-cols-2"><div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Forma de Pagamento ${escape_html(config.pagamentoObrigatorio ? "*" : "")}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                $$renderer5.select(
                  {
                    value: formaPagamento,
                    class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  },
                  ($$renderer6) => {
                    $$renderer6.option({ value: "NUMERARIO" }, ($$renderer7) => {
                      $$renderer7.push(`Numerário`);
                    });
                    $$renderer6.option({ value: "MULTICAIXA" }, ($$renderer7) => {
                      $$renderer7.push(`Multicaixa`);
                    });
                    $$renderer6.option({ value: "TRANSFERENCIA" }, ($$renderer7) => {
                      $$renderer7.push(`Transferência Bancária`);
                    });
                    $$renderer6.option({ value: "CREDITO" }, ($$renderer7) => {
                      $$renderer7.push(`A Prazo (Crédito)`);
                    });
                  }
                );
                $$renderer5.push(`</div> <div class="space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Retenção na Fonte (%)`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "number",
                  min: "0",
                  max: "100",
                  step: "0.1",
                  get value() {
                    return retencao;
                  },
                  set value($$value) {
                    retencao = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <p class="text-xs text-muted-foreground">Aplicável apenas para serviços sujeitos a retenção.</p></div> <div class="col-span-2 space-y-2">`);
                Label($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Observações ${escape_html(config.modoGlobal ? "(Obrigatório Referências)" : "")}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Textarea($$renderer5, {
                  placeholder: config.modoGlobal ? "Liste as referências dos documentos de origem (ex: VD 2024/001 a VD 2024/050)" : "Instruções de entrega, dados bancários, etc.",
                  rows: 4,
                  get value() {
                    return observacao;
                  },
                  set value($$value) {
                    observacao = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> `);
              if (step === 4) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="space-y-6 animate-in fade-in slide-in-from-right-4"><div class="grid gap-8 md:grid-cols-2"><div><h3 class="mb-2 flex items-center gap-2 font-semibold">`);
                User($$renderer5, { class: "h-4 w-4" });
                $$renderer5.push(`<!----> Cliente</h3> <div class="rounded-lg border bg-muted/20 p-4">`);
                if (clienteId) {
                  $$renderer5.push("<!--[-->");
                  const cliente = clientes.find((c) => c.id === clienteId);
                  $$renderer5.push(`<p class="font-medium">${escape_html(cliente?.nome)}</p> <p class="text-sm text-muted-foreground">NIF: ${escape_html(cliente?.nif)}</p> <p class="text-sm text-muted-foreground">${escape_html(cliente?.endereco || "Sem endereço")}</p>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  $$renderer5.push(`<p class="text-muted-foreground">Cliente não selecionado</p>`);
                }
                $$renderer5.push(`<!--]--></div></div> <div><h3 class="mb-2 flex items-center gap-2 font-semibold">`);
                File_text($$renderer5, { class: "h-4 w-4" });
                $$renderer5.push(`<!----> Detalhes</h3> <div class="space-y-1 rounded-lg border bg-muted/20 p-4"><div class="flex justify-between text-sm"><span class="text-muted-foreground">Tipo:</span> <span class="font-medium">${escape_html(tipoDocumento)}</span></div> <div class="flex justify-between text-sm"><span class="text-muted-foreground">Série:</span> <span class="font-medium">${escape_html(serie)}</span></div> <div class="flex justify-between text-sm"><span class="text-muted-foreground">Emissão:</span> <span class="font-medium">${escape_html(new Date(dataEmissao).toLocaleDateString())}</span></div> <div class="flex justify-between text-sm"><span class="text-muted-foreground">Vencimento:</span> <span class="font-medium">${escape_html(new Date(dataVencimento).toLocaleDateString())}</span></div> <div class="flex justify-between text-sm"><span class="text-muted-foreground">Pagamento:</span> <span class="font-medium">${escape_html(formaPagamento)}</span></div></div></div></div> <div><h3 class="mb-2 flex items-center gap-2 font-semibold">`);
                Shopping_cart($$renderer5, { class: "h-4 w-4" });
                $$renderer5.push(`<!----> Itens (${escape_html(itens.length)})</h3> <div class="overflow-hidden rounded-lg border"><table class="w-full text-sm"><thead class="bg-muted"><tr><th class="p-2 text-left">Descrição</th><th class="p-2 text-right">Qtd</th><th class="p-2 text-right">Preço</th><th class="p-2 text-right">Total</th></tr></thead><tbody><!--[-->`);
                const each_array_2 = ensure_array_like(itens);
                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                  let item = each_array_2[$$index_2];
                  $$renderer5.push(`<tr class="border-t"><td class="p-2">${escape_html(item.descricao)}</td><td class="p-2 text-right">${escape_html(item.quantidade)}</td><td class="p-2 text-right">${escape_html(formatCurrency(item.precoUnitario))}</td><td class="p-2 text-right font-medium">${escape_html(formatCurrency(calcularItem(item).total))}</td></tr>`);
                }
                $$renderer5.push(`<!--]--></tbody></table></div></div> <div class="flex justify-end"><div class="w-full space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-4 md:w-1/3"><div class="flex justify-between text-sm"><span>Subtotal</span> <span>${escape_html(formatCurrency(totais().subtotal))}</span></div> <div class="flex justify-between text-sm text-muted-foreground"><span>Descontos</span> <span>-${escape_html(formatCurrency(totais().desconto))}</span></div> <div class="flex justify-between text-sm text-muted-foreground"><span>Impostos</span> <span>+${escape_html(formatCurrency(totais().impostos))}</span></div> `);
                if (retencao > 0) {
                  $$renderer5.push("<!--[-->");
                  const retencaoDecimal = new Decimal(retencao).div(100);
                  const valorRetencao = totais().subtotal.mul(retencaoDecimal);
                  $$renderer5.push(`<div class="flex justify-between text-sm text-amber-600"><span>Retenção (${escape_html(retencao)}%)</span> <span>-${escape_html(formatCurrency(valorRetencao))}</span></div> `);
                  Separator($$renderer5, { class: "my-2" });
                  $$renderer5.push(`<!----> <div class="flex justify-between text-lg font-bold text-primary"><span>Total a Pagar</span> <span>${escape_html(formatCurrency(totais().total.sub(valorRetencao)))}</span></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  Separator($$renderer5, { class: "my-2" });
                  $$renderer5.push(`<!----> <div class="flex justify-between text-lg font-bold text-primary"><span>Total a Pagar</span> <span>${escape_html(formatCurrency(totais().total))}</span></div>`);
                }
                $$renderer5.push(`<!--]--></div></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_footer($$renderer4, {
            class: "flex justify-between border-t p-6",
            children: ($$renderer5) => {
              Button($$renderer5, {
                type: "button",
                variant: "outline",
                onclick: () => step === 1 ? onCancel() : prevStep(),
                disabled: loading,
                children: ($$renderer6) => {
                  if (step === 1) {
                    $$renderer6.push("<!--[-->");
                    $$renderer6.push(`Cancelar`);
                  } else {
                    $$renderer6.push("<!--[!-->");
                    Arrow_left($$renderer6, { class: "mr-2 h-4 w-4" });
                    $$renderer6.push(`<!----> Voltar`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              if (step < totalSteps) {
                $$renderer5.push("<!--[-->");
                Button($$renderer5, {
                  type: "button",
                  onclick: nextStep,
                  disabled: !validarPasso(step),
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Próximo `);
                    Arrow_right($$renderer6, { class: "ml-2 h-4 w-4" });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
              } else {
                $$renderer5.push("<!--[!-->");
                Button($$renderer5, {
                  type: "submit",
                  disabled: loading,
                  children: ($$renderer6) => {
                    if (loading) {
                      $$renderer6.push("<!--[-->");
                      $$renderer6.push(`Emitindo...`);
                    } else {
                      $$renderer6.push("<!--[!-->");
                      Check($$renderer6, { class: "mr-2 h-4 w-4" });
                      $$renderer6.push(`<!----> Emitir Documento`);
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></form> `);
      if (Root) {
        $$renderer3.push("<!--[-->");
        Root($$renderer3, {
          get open() {
            return showCreateClient;
          },
          set open($$value) {
            showCreateClient = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            if (Dialog_content) {
              $$renderer4.push("<!--[-->");
              Dialog_content($$renderer4, {
                children: ($$renderer5) => {
                  if (Dialog_header) {
                    $$renderer5.push("<!--[-->");
                    Dialog_header($$renderer5, {
                      children: ($$renderer6) => {
                        if (Dialog_title) {
                          $$renderer6.push("<!--[-->");
                          Dialog_title($$renderer6, {
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->Novo Cliente`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer6.push("<!--]-->");
                        } else {
                          $$renderer6.push("<!--[!-->");
                          $$renderer6.push("<!--]-->");
                        }
                        $$renderer6.push(` `);
                        if (Dialog_description) {
                          $$renderer6.push("<!--[-->");
                          Dialog_description($$renderer6, {
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->Preencha os dados básicos para criar um novo cliente rapidamente.`);
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
                  $$renderer5.push(` <div class="grid gap-4 py-4"><div class="grid gap-2">`);
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
                    placeholder: "Número de Identificação Fiscal",
                    get value() {
                      return newClientNif;
                    },
                    set value($$value) {
                      newClientNif = $$value;
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
                  $$renderer5.push(`<!----></div></div> <div class="grid gap-2">`);
                  Label($$renderer5, {
                    for: "name",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Nome`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "name",
                    placeholder: "Nome do cliente",
                    get value() {
                      return newClientName;
                    },
                    set value($$value) {
                      newClientName = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div></div> `);
                  if (Dialog_footer) {
                    $$renderer5.push("<!--[-->");
                    Dialog_footer($$renderer5, {
                      children: ($$renderer6) => {
                        Button($$renderer6, {
                          variant: "outline",
                          onclick: () => showCreateClient = false,
                          children: ($$renderer7) => {
                            $$renderer7.push(`<!---->Cancelar`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!----> `);
                        Button($$renderer6, {
                          onclick: handleCreateClient,
                          disabled: creatingClient,
                          children: ($$renderer7) => {
                            if (creatingClient) {
                              $$renderer7.push("<!--[-->");
                              Loader_circle($$renderer7, { class: "mr-2 h-4 w-4 animate-spin" });
                              $$renderer7.push(`<!----> Criando...`);
                            } else {
                              $$renderer7.push("<!--[!-->");
                              $$renderer7.push(`Criar Cliente`);
                            }
                            $$renderer7.push(`<!--]-->`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push("<!--]-->");
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push("<!--]-->");
                  }
                },
                $$slots: { default: true }
              });
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
          },
          $$slots: { default: true }
        });
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
      $$renderer3.push(`</div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { Documento_fiscal_form as D };
//# sourceMappingURL=documento-fiscal-form-BrsjJij2.js.map
