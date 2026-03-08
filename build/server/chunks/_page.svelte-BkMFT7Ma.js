import { av as head, an as ensure_array_like, az as attr_class, aB as stringify, _ as derived } from './index-DPRpZFUH.js';
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
import { a as toast } from './Toaster.svelte_svelte_type_style_lang-OM98s5RX.js';
import { f as formatCurrency } from './utils3-DjmiJAAD.js';
import { C as Combobox_1 } from './combobox-BTJ3pIs7.js';
import { F as File_text } from './file-text-BeaU1KrO.js';
import { C as Calendar } from './calendar-DG5mbrz5.js';
import { C as Check } from './check-cM-2r8Wr.js';
import { A as Arrow_right } from './arrow-right-DEHhXJ9q.js';
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
import './plus-C65zNy9m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let startDate = "";
    let endDate = "";
    let clienteId = "";
    let selectedDocIds = [];
    let documentosFiltrados = derived(() => {
      if (!startDate || !endDate) return data.documentosElegiveis;
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      return data.documentosElegiveis.filter((doc) => {
        const docDate = new Date(doc.createdAt);
        return docDate >= start && docDate <= end;
      });
    });
    let documentosSelecionados = derived(() => {
      return data.documentosElegiveis.filter((doc) => selectedDocIds.includes(doc.id));
    });
    let totaisConsolidados = derived(() => {
      let subtotal = 0;
      let impostos = 0;
      documentosSelecionados().forEach((doc) => {
        subtotal += doc.subtotal || 0;
        impostos += doc.totalImpostos || 0;
      });
      return {
        subtotal,
        impostos,
        total: subtotal + impostos,
        quantidade: documentosSelecionados().length
      };
    });
    function selecionarTodos() {
      selectedDocIds = documentosFiltrados().map((doc) => doc.id);
    }
    function limparSelecao() {
      selectedDocIds = [];
    }
    function avancar() {
      if (selectedDocIds.length === 0) {
        toast.error("Selecione pelo menos um documento para consolidar");
        return;
      }
      if (!clienteId) {
        toast.error("Selecione o cliente para a Fatura Global");
        return;
      }
      const referencias = documentosSelecionados().map((doc) => doc.numero).join(", ");
      const params = new URLSearchParams({
        start: startDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        end: endDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        refs: referencias,
        clienteId,
        docIds: selectedDocIds.join(","),
        subtotal: totaisConsolidados().subtotal.toString(),
        impostos: totaisConsolidados().impostos.toString(),
        total: totaisConsolidados().total.toString()
      });
      goto(`/documentos/fatura-global/nova?${params.toString()}`);
    }
    const clienteItems = derived(() => data.clientes.map((c) => ({ value: c.id, label: c.nome, nif: c.nif })));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("jq1j7y", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Consolidar Documentos | FACT FLEXI</title>`);
        });
      });
      $$renderer3.push(`<div class="mx-auto max-w-5xl space-y-6 py-8">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              Card_title($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  File_text($$renderer6, { class: "h-5 w-5" });
                  $$renderer6.push(`<!----> Nova Fatura Global`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Selecione os documentos a consolidar numa única fatura. Ideal para vendas a dinheiro, talões
				ou guias de remessa de um período.`);
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
              $$renderer5.push(`<div class="grid gap-4 md:grid-cols-3"><div class="space-y-2">`);
              Label($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Calendar($$renderer6, { class: "h-4 w-4" });
                  $$renderer6.push(`<!----> Período Início`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                type: "date",
                get value() {
                  return startDate;
                },
                set value($$value) {
                  startDate = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                class: "flex items-center gap-2",
                children: ($$renderer6) => {
                  Calendar($$renderer6, { class: "h-4 w-4" });
                  $$renderer6.push(`<!----> Período Fim`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                type: "date",
                get value() {
                  return endDate;
                },
                set value($$value) {
                  endDate = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="space-y-2">`);
              Label($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cliente da Fatura Global *`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Combobox_1($$renderer5, {
                items: clienteItems(),
                placeholder: "Selecione o cliente...",
                emptyText: "Nenhum cliente encontrado.",
                get value() {
                  return clienteId;
                },
                set value($$value) {
                  clienteId = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> `);
              Separator($$renderer5, {});
              $$renderer5.push(`<!----> <div class="space-y-4"><div class="flex items-center justify-between"><h3 class="font-semibold">Documentos Elegíveis (${escape_html(documentosFiltrados().length)})</h3> <div class="flex gap-2">`);
              Button($$renderer5, {
                variant: "outline",
                size: "sm",
                onclick: selecionarTodos,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Selecionar Todos`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                variant: "ghost",
                size: "sm",
                onclick: limparSelecao,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Limpar`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div> `);
              if (documentosFiltrados().length === 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="rounded-lg border border-dashed p-8 text-center text-muted-foreground">Nenhum documento elegível encontrado para o período selecionado.</div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="max-h-[400px] space-y-2 overflow-y-auto rounded-lg border p-2"><!--[-->`);
                const each_array = ensure_array_like(documentosFiltrados());
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let doc = each_array[$$index];
                  $$renderer5.push(`<button type="button"${attr_class(`flex w-full cursor-pointer items-center justify-between rounded-md border p-3 transition-colors hover:bg-muted/50 ${stringify(selectedDocIds.includes(doc.id) ? "border-primary bg-primary/10" : "border-transparent")}`)}><div class="flex items-center gap-3"><div${attr_class(`flex h-6 w-6 items-center justify-center rounded-full border-2 ${stringify(selectedDocIds.includes(doc.id) ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground")}`)}>`);
                  if (selectedDocIds.includes(doc.id)) {
                    $$renderer5.push("<!--[-->");
                    Check($$renderer5, { class: "h-4 w-4" });
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--></div> <div class="text-left"><p class="font-medium">${escape_html(doc.numero)}</p> <p class="text-xs text-muted-foreground">${escape_html(new Date(doc.createdAt).toLocaleDateString())} •
											${escape_html(doc.cliente?.nome || "Consumidor Final")}</p></div></div> <div class="text-right"><p class="font-semibold">${escape_html(formatCurrency(doc.total))}</p> <p class="text-xs text-muted-foreground">${escape_html(doc.serie)}</p></div></button>`);
                }
                $$renderer5.push(`<!--]--></div>`);
              }
              $$renderer5.push(`<!--]--></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Card_footer($$renderer4, {
            class: "flex-col gap-4 border-t pt-6",
            children: ($$renderer5) => {
              if (selectedDocIds.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="w-full rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm"><div class="flex justify-between"><span>Documentos selecionados:</span> <strong>${escape_html(totaisConsolidados().quantidade)}</strong></div> <div class="flex justify-between"><span>Subtotal:</span> <span>${escape_html(formatCurrency(totaisConsolidados().subtotal))}</span></div> <div class="flex justify-between"><span>Impostos:</span> <span>${escape_html(formatCurrency(totaisConsolidados().impostos))}</span></div> `);
                Separator($$renderer5, { class: "my-2" });
                $$renderer5.push(`<!----> <div class="flex justify-between text-lg font-bold text-primary"><span>Total Consolidado:</span> <span>${escape_html(formatCurrency(totaisConsolidados().total))}</span></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <div class="flex w-full justify-between">`);
              Button($$renderer5, {
                variant: "outline",
                onclick: () => goto(),
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cancelar`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                onclick: avancar,
                disabled: selectedDocIds.length === 0 || !clienteId,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Continuar para Emissão `);
                  Arrow_right($$renderer6, { class: "ml-2 h-4 w-4" });
                  $$renderer6.push(`<!---->`);
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
//# sourceMappingURL=_page.svelte-BkMFT7Ma.js.map
